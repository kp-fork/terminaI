/**
 * @license
 * Copyright 2025 Google LLC
 * Portions Copyright 2025 TerminaI Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  type CountTokensResponse,
  type GenerateContentParameters,
  type CountTokensParameters,
  type EmbedContentResponse,
  type EmbedContentParameters,
  type Content,
  type ContentUnion,
  GenerateContentResponse,
  type Candidate,
  type FinishReason,
  type Tool,
  type ToolListUnion,
  type Schema,
} from '@google/genai';
import type { ContentGenerator } from './contentGenerator.js';
import type { OpenAIChatGptOAuthConfig } from './providerTypes.js';
import type { Config } from '../config/config.js';
import { toContents } from '../code_assist/converter.js';
import { ProxyAgent } from 'undici';
import { estimateTokenCountSync } from '../utils/tokenCalculation.js';
import {
  CHATGPT_CODEX_RESPONSES_PATH,
  CODEX_ORIGINATOR,
} from '../openai_chatgpt/constants.js';
import { ChatGptOAuthCredentialStorage } from '../openai_chatgpt/credentialStorage.js';
import { ChatGptOAuthClient } from '../openai_chatgpt/oauthClient.js';
import {
  tryImportFromCodexCli,
  tryImportFromOpenCode,
} from '../openai_chatgpt/imports.js';
import type { ChatGptOAuthStoredCredentials } from '../openai_chatgpt/types.js';

interface ResponsesTool {
  type: 'function';
  name: string;
  description?: string;
  parameters?: Record<string, unknown>;
}

interface ChatGptCodexResponseOutputItem {
  type?: unknown;
  name?: unknown;
  arguments?: unknown;
  call_id?: unknown;
  content?: unknown;
}

interface ChatGptCodexResponse {
  output?: unknown;
}

export class ChatGptCodexContentGenerator implements ContentGenerator {
  private readonly oauthClient = new ChatGptOAuthClient();

  // Maps sanitized tool names back to original Gemini names (e.g. "ui_click" → "ui.click")
  private toolNameMap: Map<string, string> = new Map();

  constructor(
    private readonly providerConfig: OpenAIChatGptOAuthConfig,
    private readonly globalConfig: Config,
  ) {}

  private hasUnsupportedModalities(contents: Content[]): boolean {
    for (const content of contents) {
      if (content.parts) {
        for (const part of content.parts) {
          if (part && typeof part === 'object') {
            if ('inlineData' in part || 'fileData' in part) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  private partUnionToText(part: unknown): string {
    if (typeof part === 'string') return part;
    if (part && typeof part === 'object') {
      const maybe = part as { text?: unknown };
      if (typeof maybe.text === 'string') return maybe.text;
    }
    return '';
  }

  private contentUnionToText(content: ContentUnion | undefined): string {
    if (!content) return '';
    if (typeof content === 'string') return content;
    if (Array.isArray(content)) {
      return content.map((p) => this.partUnionToText(p)).join('');
    }
    if (content && typeof content === 'object') {
      const maybeContent = content as { parts?: unknown };
      if (Array.isArray(maybeContent.parts)) {
        return maybeContent.parts.map((p) => this.partUnionToText(p)).join('');
      }
      return this.partUnionToText(content);
    }
    return '';
  }

  private isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  private getParametersJsonSchema(fn: unknown): Record<string, unknown> | null {
    if (!this.isPlainObject(fn)) return null;
    const parametersJsonSchema = fn['parametersJsonSchema'];
    return this.isPlainObject(parametersJsonSchema)
      ? parametersJsonSchema
      : null;
  }

  private parseToolArguments(value: unknown): Record<string, unknown> | null {
    if (value === undefined || value === null) return null;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) return null;
      const parsed = JSON.parse(trimmed) as unknown;
      return this.isPlainObject(parsed) ? parsed : {};
    }
    return this.isPlainObject(value) ? value : null;
  }

  private normalizeTools(tools: ToolListUnion | undefined): Tool[] {
    if (!tools) return [];
    return Array.isArray(tools) ? (tools as Tool[]) : [tools as Tool];
  }

  async generateContent(
    request: GenerateContentParameters,
    _userPromptId: string,
  ): Promise<GenerateContentResponse> {
    const stream = await this.generateContentStream(request, _userPromptId);
    let last: GenerateContentResponse | null = null;
    for await (const chunk of stream) {
      last = chunk;
    }
    if (!last) {
      throw new Error('No response from ChatGPT Codex backend');
    }
    return last;
  }

  async generateContentStream(
    request: GenerateContentParameters,
    _userPromptId: string,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    const contents = toContents(request.contents);
    if (this.hasUnsupportedModalities(contents)) {
      throw new Error(
        'This provider is configured for text-only. Images and files are not supported.',
      );
    }

    const instructions = this.contentUnionToText(
      request.config?.systemInstruction,
    );

    const tools = this.normalizeTools(request.config?.tools);

    const body: Record<string, unknown> = {
      model: request.model || this.providerConfig.model,
      store: false,
      stream: true,
      include: ['reasoning.encrypted_content'],
      ...(instructions ? { instructions } : {}),
      input: this.convertContentsToResponsesInput(contents),
      ...(tools.length > 0 ? { tools: this.convertTools(tools) } : {}),
    };

    const debugMode = this.globalConfig.getDebugMode();

    const response = await this.fetchWithAuthRecovery(
      CHATGPT_CODEX_RESPONSES_PATH,
      body,
      request.config?.abortSignal,
    );

    if (!response.body) {
      throw new Error('No response body from ChatGPT Codex stream');
    }

    const toolNameMap = this.toolNameMap;
    const parseToolArguments = (value: unknown) =>
      this.parseToolArguments(value);

    return async function* (this: ChatGptCodexContentGenerator) {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let terminalResponse: ChatGptCodexResponse | null = null;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            if (!trimmed.startsWith('data:')) continue;

            const dataText = trimmed.slice('data:'.length).trim();
            if (!dataText || dataText === '[DONE]') continue;

            let event: unknown;
            try {
              event = JSON.parse(dataText) as unknown;
            } catch (e) {
              if (debugMode) {
                console.error('[ChatGPT OAuth] Failed to parse SSE JSON:', e);
              }
              continue;
            }

            if (!this.isPlainObject(event)) continue;

            const type = event['type'];
            const delta = event['delta'];
            if (
              type === 'response.output_text.delta' &&
              typeof delta === 'string'
            ) {
              const resp = new GenerateContentResponse();
              resp.candidates = [
                {
                  content: { role: 'model', parts: [{ text: delta }] },
                },
              ];
              yield resp;
            }

            if (
              (type === 'response.completed' ||
                type === 'response.done' ||
                type === 'response.completed_event') &&
              this.isPlainObject(event['response'])
            ) {
              terminalResponse = event['response'] as ChatGptCodexResponse;
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

      if (!terminalResponse) {
        throw new Error('ChatGPT Codex stream ended without terminal response');
      }

      const { text, toolCalls } =
        this.extractTextAndToolCallsFromResponse(terminalResponse);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parts: any[] = [];
      if (text) parts.push({ text });

      for (const tc of toolCalls) {
        try {
          const args = parseToolArguments(tc.arguments) ?? {};
          const originalName = toolNameMap.get(tc.name) || tc.name;
          parts.push({
            functionCall: {
              ...(tc.id ? { id: tc.id } : {}),
              name: originalName,
              args,
            },
          });
        } catch (e) {
          if (debugMode) {
            console.error('[ChatGPT OAuth] Failed to parse tool arguments:', e);
          }
        }
      }

      const candidate: Candidate = {
        content: { role: 'model', parts },
        finishReason: 'STOP' as FinishReason,
      };

      const final = new GenerateContentResponse();
      final.candidates = [candidate];
      yield final;
    }.call(this);
  }

  async countTokens(
    request: CountTokensParameters,
  ): Promise<CountTokensResponse> {
    const contents = toContents(request.contents);
    let totalTokens = 0;
    for (const content of contents) {
      if (content.parts) {
        totalTokens += estimateTokenCountSync(content.parts);
      }
    }
    return { totalTokens };
  }

  async embedContent(
    _request: EmbedContentParameters,
  ): Promise<EmbedContentResponse> {
    throw new Error('Embeddings not supported for ChatGPT OAuth provider yet.');
  }

  private async fetchWithAuthRecovery(
    pathSuffix: string,
    body: Record<string, unknown>,
    signal?: AbortSignal,
  ): Promise<Response> {
    let credentials = await this.loadOrImportCredentials();

    const doFetch = async (
      accessToken: string,
      accountId: string,
    ): Promise<Response> => {
      const baseUrl = normalizeBaseUrl(this.providerConfig.baseUrl);
      const url = `${baseUrl}/${pathSuffix}`;

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'ChatGPT-Account-ID': accountId,
        originator: CODEX_ORIGINATOR,
        session_id: this.globalConfig.getSessionId(),
        ...this.providerConfig.headers,
      };

      if (
        process.env['TERMINAI_OPENAI_CHATGPT_BETA_RESPONSES_EXPERIMENTAL'] ===
        'true'
      ) {
        headers['OpenAI-Beta'] = 'responses=experimental';
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options: any = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal,
      };

      const proxy = this.globalConfig.getProxy();
      if (proxy) {
        options.dispatcher = new ProxyAgent(proxy);
      }

      return fetch(url, options);
    };

    const attemptWithCreds = async (): Promise<Response> => {
      const stalenessRefresh = this.oauthClient.shouldRefreshByStaleness(
        credentials.lastRefresh,
      );
      if (stalenessRefresh) {
        const refreshed = await this.oauthClient.refresh({
          refreshToken: credentials.token.refreshToken ?? '',
          existingRefreshToken: credentials.token.refreshToken ?? undefined,
        });
        await ChatGptOAuthCredentialStorage.save(refreshed);
        const reloaded = await ChatGptOAuthCredentialStorage.load();
        if (reloaded) credentials = reloaded;
      }

      const accountId =
        this.oauthClient.deriveAccountId({
          accountId: credentials.accountId,
          idToken: credentials.idToken,
          accessToken: credentials.token.accessToken,
        }) ?? credentials.accountId;

      if (!accountId) {
        throw new Error(
          'ChatGPT OAuth account id is missing. Re-authenticate to obtain an id_token with chatgpt_account_id.',
        );
      }

      return doFetch(credentials.token.accessToken, accountId);
    };

    // 401 recovery: reload -> retry -> refresh -> retry -> fail
    let response = await attemptWithCreds();
    if (response.status !== 401) {
      return ensureOk(response);
    }

    {
      const reloaded = await ChatGptOAuthCredentialStorage.load().catch(
        () => null,
      );
      if (reloaded) credentials = reloaded;
    }
    response = await attemptWithCreds();
    if (response.status !== 401) {
      return ensureOk(response);
    }

    const refreshed = await this.oauthClient.refresh({
      refreshToken: credentials.token.refreshToken ?? '',
      existingRefreshToken: credentials.token.refreshToken ?? undefined,
    });
    await ChatGptOAuthCredentialStorage.save(refreshed);
    {
      const reloaded = await ChatGptOAuthCredentialStorage.load();
      if (reloaded) credentials = reloaded;
    }

    response = await attemptWithCreds();
    if (response.status !== 401) {
      return ensureOk(response);
    }

    throw new Error('ChatGPT OAuth unauthorized. Login required.');
  }

  private async loadOrImportCredentials(): Promise<ChatGptOAuthStoredCredentials> {
    // Attempt import-first if missing (best-effort; avoids loopback/OAuth churn)
    const loaded = await ChatGptOAuthCredentialStorage.load().catch(() => null);
    if (loaded) return loaded;

    const imported =
      (await tryImportFromCodexCli(this.oauthClient)) ??
      (await tryImportFromOpenCode(this.oauthClient));

    // Only save imported credentials if they have a valid accountId
    if (imported && imported.accountId) {
      await ChatGptOAuthCredentialStorage.save(imported);
      const reloaded = await ChatGptOAuthCredentialStorage.load().catch(
        () => null,
      );
      if (reloaded) return reloaded;
    }

    throw new Error(
      'ChatGPT OAuth credentials not found. Import from Codex/OpenCode or complete OAuth login.',
    );
  }

  private convertTools(tools: Tool[]): ResponsesTool[] {
    const out: ResponsesTool[] = [];
    for (const tool of tools) {
      if (tool.functionDeclarations) {
        for (const fn of tool.functionDeclarations) {
          const parametersFromJsonSchema = this.getParametersJsonSchema(fn);
          out.push({
            type: 'function',
            name: this.sanitizeToolName(fn.name || 'unknown_tool'),
            description: fn.description,
            parameters:
              parametersFromJsonSchema ??
              (fn.parameters
                ? this.convertSchemaToJsonSchema(fn.parameters)
                : undefined),
          });
        }
      }
    }
    return out;
  }

  private sanitizeToolName(name: string): string {
    let sanitized = name.replace(/[^a-zA-Z0-9_-]/g, '_');
    if (/^[0-9]/.test(sanitized)) {
      sanitized = '_' + sanitized;
    }
    if (sanitized !== name) {
      this.toolNameMap.set(sanitized, name);
    }
    return sanitized;
  }

  private convertSchemaToJsonSchema(schema: Schema): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    if (schema.type) {
      result['type'] = String(schema.type).toLowerCase();
    }
    if (schema.description) {
      result['description'] = schema.description;
    }
    if (schema.enum) {
      result['enum'] = schema.enum;
    }
    if (schema.properties) {
      const convertedProperties: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(schema.properties)) {
        convertedProperties[key] = this.convertSchemaToJsonSchema(value);
      }
      result['properties'] = convertedProperties;
    }
    if (schema.required) {
      result['required'] = schema.required;
    }
    if (schema.items) {
      result['items'] = this.convertSchemaToJsonSchema(schema.items);
    }
    if (schema.nullable !== undefined) {
      result['nullable'] = schema.nullable;
    }
    if (schema.format) {
      result['format'] = schema.format;
    }

    return result;
  }

  private convertContentsToResponsesInput(contents: Content[]): unknown[] {
    // MVP: represent conversation as role+text. Tool calls/outputs are included as text lines.
    // This keeps the request shape stable across backend variants while we harden full Responses input-item typing.
    const items: Array<{
      role: 'user' | 'assistant' | 'system';
      content: string;
    }> = [];

    for (const content of contents) {
      const role: 'user' | 'assistant' | 'system' =
        content.role === 'model'
          ? 'assistant'
          : content.role === 'system'
            ? 'system'
            : 'user';

      const parts = content.parts ?? [];
      const lines: string[] = [];
      for (const part of parts) {
        if (part.text) {
          lines.push(part.text);
        } else if (part.functionCall?.name) {
          lines.push(
            `Tool call: ${part.functionCall.name}(${JSON.stringify(part.functionCall.args ?? {})})`,
          );
        } else if (part.functionResponse?.name) {
          lines.push(
            `Tool result: ${part.functionResponse.name} -> ${JSON.stringify(part.functionResponse.response ?? {})}`,
          );
        }
      }

      items.push({ role, content: lines.join('') });
    }

    return items.map((m) => ({
      role: m.role,
      content: [
        {
          type: m.role === 'assistant' ? 'output_text' : 'input_text',
          text: m.content,
        },
      ],
    }));
  }

  private extractTextAndToolCallsFromResponse(response: ChatGptCodexResponse): {
    text: string;
    toolCalls: Array<{ id?: string; name: string; arguments: string }>;
  } {
    const toolCalls: Array<{ id?: string; name: string; arguments: string }> =
      [];
    let text = '';

    const output = response.output;
    if (!Array.isArray(output)) {
      return { text: '', toolCalls: [] };
    }

    for (const item of output as unknown[]) {
      if (!this.isPlainObject(item)) continue;
      const typed = item as ChatGptCodexResponseOutputItem;
      const type = typed.type;
      if (type === 'message') {
        const content = typed.content;
        if (Array.isArray(content)) {
          for (const c of content) {
            if (!this.isPlainObject(c)) continue;
            if (c['type'] === 'output_text' && typeof c['text'] === 'string') {
              text += c['text'];
            }
          }
        }
      } else if (type === 'function_call') {
        const name = typeof typed.name === 'string' ? typed.name : '';
        const args =
          typeof typed.arguments === 'string' ? typed.arguments : '{}';
        const id =
          typeof typed.call_id === 'string' ? typed.call_id : undefined;
        if (name) {
          toolCalls.push({ id, name, arguments: args });
        }
      }
    }

    return { text, toolCalls };
  }
}

function normalizeBaseUrl(raw: string): string {
  const trimmed = raw.trim().replace(/\/+$/, '');
  if (!/^https?:\/\//i.test(trimmed)) {
    throw new Error(
      `ChatGPT Codex baseUrl must start with http:// or https:// (got "${raw}").`,
    );
  }
  return trimmed;
}

async function ensureOk(response: Response): Promise<Response> {
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `ChatGPT Codex backend error (${response.status}): ${text}`,
    );
  }
  return response;
}

/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Server } from 'node:http';
import {
  createApp,
  updateCoderAgentCardUrl,
  createRemoteAuthState,
  getRemoteAuthPath,
  loadRemoteAuthState,
  saveRemoteAuthState,
} from '@google/gemini-cli-a2a-server';
import crypto from 'node:crypto';
import net from 'node:net';

export type WebRemoteServerOptions = {
  host: string;
  port: number;
  allowedOrigins: string[];
  tokenOverride?: string;
  rotateToken?: boolean;
};

export type WebRemoteAuthResult = {
  token: string | null;
  tokenSource: 'override' | 'generated' | 'env' | 'existing';
  authPath: string;
};

export function isLoopbackHost(host: string): boolean {
  const normalized = host.trim().toLowerCase();
  if (normalized === 'localhost') {
    return true;
  }
  const ipVersion = net.isIP(normalized);
  if (ipVersion === 4) {
    return normalized.startsWith('127.');
  }
  if (ipVersion === 6) {
    return normalized === '::1';
  }
  return false;
}

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function ensureWebRemoteAuth(
  options: WebRemoteServerOptions,
): Promise<WebRemoteAuthResult> {
  const authPath = getRemoteAuthPath();
  const envToken = process.env['GEMINI_WEB_REMOTE_TOKEN'];
  if (options.tokenOverride) {
    process.env['GEMINI_WEB_REMOTE_TOKEN'] = options.tokenOverride;
    return { token: options.tokenOverride, tokenSource: 'override', authPath };
  }
  if (options.rotateToken) {
    const token = generateToken();
    const state = createRemoteAuthState(token);
    await saveRemoteAuthState(state);
    return { token, tokenSource: 'generated', authPath };
  }
  if (envToken) {
    return { token: null, tokenSource: 'env', authPath };
  }

  const existing = await loadRemoteAuthState();
  if (existing) {
    return { token: null, tokenSource: 'existing', authPath };
  }

  const token = generateToken();
  const state = createRemoteAuthState(token);
  await saveRemoteAuthState(state);
  return { token, tokenSource: 'generated', authPath };
}

export async function startWebRemoteServer(
  options: WebRemoteServerOptions,
): Promise<{ server: Server; port: number }> {
  if (options.allowedOrigins.length > 0) {
    process.env['GEMINI_WEB_REMOTE_ALLOWED_ORIGINS'] =
      options.allowedOrigins.join(',');
  }

  const app = await createApp();
  const server = app.listen(options.port, options.host);
  const address = server.address();
  const actualPort =
    typeof address === 'string' || !address ? options.port : address.port;
  updateCoderAgentCardUrl(actualPort, options.host);
  return { server, port: actualPort };
}

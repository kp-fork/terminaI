/**
 * @license
 * Copyright 2025 Google LLC
 * Portions Copyright 2025 TerminaI Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { SafetyCheckInput, ConversationTurn } from './protocol.js';
import type { Config } from '../config/config.js';
import type { RuntimeContext } from '../computer/RuntimeContext.js';

/**
 * Builds context objects for safety checkers, ensuring sensitive data is filtered.
 */
export class ContextBuilder {
  constructor(
    private readonly config: Config,
    private readonly conversationHistory: ConversationTurn[] = [],
    private readonly runtimeContext?: RuntimeContext,
  ) {}

  setRuntimeContext(context: RuntimeContext): void {
    // @ts-ignore - write to readonly for setter injection pattern if needed,
    // or better, just allow it if not readonly.
    // Since it's defined in constructor as private readonly, I should change it.
    (this as any).runtimeContext = context;
  }

  /**
   * Builds the full context object with all available data.
   */
  buildFullContext(): SafetyCheckInput['context'] {
    return {
      environment: {
        cwd: process.cwd(),
        workspaces: this.config
          .getWorkspaceContext()
          .getDirectories() as string[],
      },
      history: {
        turns: this.conversationHistory,
      },
      runtime: this.runtimeContext
        ? {
            isIsolated: this.runtimeContext.isIsolated,
          }
        : undefined,
    };
  }

  /**
   * Builds a minimal context with only the specified keys.
   */
  buildMinimalContext(
    requiredKeys: Array<keyof SafetyCheckInput['context']>,
  ): SafetyCheckInput['context'] {
    const fullContext = this.buildFullContext();
    const minimalContext: Partial<SafetyCheckInput['context']> = {};

    for (const key of requiredKeys) {
      if (key in fullContext) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (minimalContext as any)[key] = fullContext[key];
      }
    }

    return minimalContext as SafetyCheckInput['context'];
  }
}

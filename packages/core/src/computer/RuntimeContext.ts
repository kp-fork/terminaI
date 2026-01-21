/**
 * @license
 * Copyright 2025 Google LLC
 * Portions Copyright 2025 TerminaI Authors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * RuntimeContext provides a uniform interface for different execution tiers.
 *
 * Tiers:
 * - Tier 1 (Container): Docker/Podman with pre-installed T-APTS
 * - Tier 2 (Local): System Python + managed venv
 * - Tier 1.5 (Micro-VM): Lightweight VM with isolation (future)
 */
export interface RuntimeContext {
  /** Runtime tier type */
  readonly type: 'container' | 'local' | 'windows-appcontainer' | 'microvm';

  /** Whether execution is isolated from host filesystem */
  readonly isIsolated: boolean;

  /** Human-readable name for logging/telemetry */
  readonly displayName: string;

  /** Absolute path to Python executable */
  readonly pythonPath: string;

  /** T-APTS version available in this runtime */
  readonly taptsVersion: string;

  /** Verify runtime is functional */
  healthCheck(): Promise<{ ok: boolean; error?: string }>;

  /** Clean up resources (containers, temp files) */
  dispose(): Promise<void>;
}

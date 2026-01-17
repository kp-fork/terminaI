/**
 * @license
 * Copyright 2025 Google LLC
 * Portions Copyright 2025 TerminaI Authors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Runtime type enumeration
 */
export type Runtime = 'node' | 'bun' | 'unknown';

/**
 * Detects the current JavaScript runtime
 * @returns The detected runtime type
 */
export function detectRuntime(): Runtime {
  if (typeof Bun !== 'undefined') return 'bun';
  if (typeof process !== 'undefined' && process.versions?.node) return 'node';
  return 'unknown';
}

/**
 * Checks if the current runtime is Bun
 * @returns true if running in Bun
 */
export function isBun(): boolean {
  return detectRuntime() === 'bun';
}

/**
 * Checks if the current runtime is Node.js
 * @returns true if running in Node.js
 */
export function isNode(): boolean {
  return detectRuntime() === 'node';
}

/**
 * Gets heap statistics safely across runtimes
 * In Node.js, this uses v8.getHeapStatistics()
 * In Bun, returns default values as Bun doesn't expose v8 API
 * @returns Heap statistics object
 */
export function getHeapStatistics(): {
  total_heap_size: number;
  used_heap_size: number;
  heap_size_limit: number;
} {
  try {
    if (isNode()) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const v8 = require('node:v8');
      return v8.getHeapStatistics();
    }
  } catch {
    // Fall through to default values
  }
  // Default values for Bun or error cases
  return {
    total_heap_size: 0,
    used_heap_size: 0,
    heap_size_limit: 0,
  };
}

/**
 * Safely imports the v8 module (Node.js only)
 * Returns null in Bun or if module is unavailable
 * @returns v8 module or null
 */
export async function importV8() {
  try {
    if (isNode()) {
      return await import('node:v8');
    }
  } catch {
    // Module not available
  }
  return null;
}

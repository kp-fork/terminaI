/**
 * @license
 * Copyright 2025 Google LLC
 * Portions Copyright 2025 TerminaI Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { execSync } from 'node:child_process';

import * as path from 'node:path';
import * as os from 'node:os';
import { createInterface } from 'node:readline';
import process from 'node:process';
import type { RuntimeContext } from '@terminai/core';
import { LocalRuntimeContext } from './LocalRuntimeContext.js';
import { MicroVMRuntimeContext } from '@terminai/microvm';

// Conditionally import Windows-specific module
// WindowsBrokerContext import moved to method to avoid Top-Level Await
let WindowsBrokerContextClass:
  | typeof import('./windows/WindowsBrokerContext.js').WindowsBrokerContext
  | null = null;

export class RuntimeManager {
  private readonly cliVersion: string;
  private cachedContext?: RuntimeContext;

  constructor(cliVersion: string) {
    this.cliVersion = cliVersion;
  }

  /**
   * Returns the best available runtime for this system.
   * Priority:
   *   1. Container (Docker/Podman) - Cross-platform
   *   2. Windows AppContainer - Windows only, trusted by Defender
   *   3. Managed Local - Fallback with explicit user consent
   */
  async getContext(): Promise<RuntimeContext> {
    if (this.cachedContext) {
      return this.cachedContext;
    }

    // Tier 1 (Priority): Micro-VM (Linux only)
    if (await this.isMicroVMAvailable()) {
      console.log('[RuntimeManager] Using Sovereign Micro-VM (Phase 1.5)');
      const context = new MicroVMRuntimeContext();
      await context.initialize();
      this.cachedContext = context;
      return context;
    }

    // Tier 2: Container (Docker/Podman) - Preferred for all platforms
    if (await this.isContainerRuntimeAvailable()) {
      // return new ContainerRuntimeContext(this.cliVersion);
      throw new Error('ContainerRuntimeContext not implemented');
    }

    // Tier 1.5 (Windows only): AppContainer Broker
    // Uses process isolation trusted by Windows Defender
    // Tier 1.5 (Windows only): AppContainer Broker
    // Uses process isolation trusted by Windows Defender
    if ((await this.isWindowsBrokerAvailable()) && WindowsBrokerContextClass) {
      console.log('[RuntimeManager] Using Windows AppContainer sandbox');
      const context = new WindowsBrokerContextClass({
        cliVersion: this.cliVersion,
        workspacePath: path.join(os.homedir(), '.terminai', 'workspace'),
      });
      await context.initialize();
      this.cachedContext = context;
      return context;
    }

    // Tier 2: Managed Local (Fallback) - Requires explicit consent
    if (await this.isSystemPythonAvailable()) {
      const pythonPath = this.findPythonExecutable();
      if (pythonPath) {
        const allowed = await this.promptForDirectHostAccess();
        if (!allowed) {
          throw new Error('Direct host access denied by user or policy.');
        }

        const localContext = new LocalRuntimeContext(
          pythonPath,
          this.cliVersion,
        );
        await localContext.initialize();
        this.cachedContext = localContext;
        return localContext;
      }
    }

    throw new Error(
      'No suitable runtime found. Install Docker or Python 3.10+.',
    );
  }

  /**
   * Task 32: Check if Micro-VM is available
   */
  private async isMicroVMAvailable(): Promise<boolean> {
    return MicroVMRuntimeContext.isAvailable();
  }

  /**
   * Task 46: Check if Windows AppContainer Broker is available.
   * This is only true on Windows with the native module built.
   */
  private async isWindowsBrokerAvailable(): Promise<boolean> {
    // Only available on Windows
    if (process.platform !== 'win32') {
      return false;
    }

    try {
      if (!WindowsBrokerContextClass) {
        const mod = await import('./windows/WindowsBrokerContext.js');
        WindowsBrokerContextClass = mod.WindowsBrokerContext;
      }
    } catch {
      // Module missing
      console.log('[RuntimeManager] Windows AppContainer module not found');
      return false;
    }

    // Check if WindowsBrokerContext reports it's available
    if (
      !WindowsBrokerContextClass ||
      !(await WindowsBrokerContextClass.isAvailable())
    ) {
      console.log('[RuntimeManager] Windows AppContainer not available');
      return false;
    }

    return true;
  }

  /**
   * Task 5: Implement container detection logic
   * Checks for docker or podman
   */
  private async isContainerRuntimeAvailable(): Promise<boolean> {
    try {
      execSync('docker --version', { stdio: 'ignore' });
      return true;
    } catch {
      try {
        execSync('podman --version', { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    }
  }

  /**
   * Task 6: Implement Python discovery logic
   * Checks for python3 or python availability
   */
  private async isSystemPythonAvailable(): Promise<boolean> {
    try {
      // Check for python3 first (standard on Linux/macOS)
      execSync('python3 --version', { stdio: 'ignore' });
      return true;
    } catch {
      try {
        // Fallback to python (Windows or some Linux distros)
        execSync('python --version', { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    }
  }

  /**
   * Helper to find the actual executable path
   */
  private findPythonExecutable(): string | null {
    try {
      const result = execSync('which python3 || which python', {
        encoding: 'utf-8',
      }).trim();
      return result || null;
    } catch {
      return null;
    }
  }
  /**
   * Task 13: Direct Host Access UI
   */
  private async promptForDirectHostAccess(): Promise<boolean> {
    if (process.env['TERMINAI_ALLOW_DIRECT_HOST'] === 'true') {
      return true;
    }

    if (!process.stdin.isTTY) {
      console.error(
        'Error: Tier 2 (Direct Host Access) requires explicit opt-in via TERMINAI_ALLOW_DIRECT_HOST=true in non-interactive environments.',
      );
      return false;
    }

    console.warn('\n\x1b[33m[WARNING] Direct Host Access Mode Detected\x1b[0m');
    console.warn(
      'You are about to allow TerminaI to execute code directly on your host machine.',
    );
    console.warn(
      'This grants the agent full access to your files and network with your user privileges.',
    );
    console.warn(
      'For better isolation, please install Docker or Podman (Tier 1).',
    );

    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(
        '\nType "yes" to proceed with Direct Host Access: ',
        (answer) => {
          rl.close();
          resolve(answer.trim().toLowerCase() === 'yes');
        },
      );
    });
  }
}

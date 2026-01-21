/**
 * @license
 * Copyright 2025 Google LLC
 * Portions Copyright 2025 TerminaI Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { RuntimeContext } from '@terminai/core';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';

export class LocalRuntimeContext implements RuntimeContext {
  readonly type = 'local';
  readonly isIsolated = false;
  readonly displayName = 'Host Python (Direct Access)';

  readonly pythonPath: string;
  readonly taptsVersion: string;

  private venvPath: string | null = null;

  constructor(pythonExecutable: string, cliVersion: string) {
    this.pythonPath = pythonExecutable;
    this.taptsVersion = cliVersion;
  }

  /**
   * Bootstraps the local environment:
   * 1. Checks for cached venv
   * 2. Creates if missing
   * 3. Installs/Updates T-APTS
   */
  async initialize(): Promise<void> {
    const terminaiDir = path.join(os.homedir(), '.terminai');
    const envsDir = path.join(terminaiDir, 'envs');
    // Use a hash of the python path + version to handle upgrades, or just 'default' for now.
    // 'default' is simpler for Phase 1.
    const venvName = 'default';
    this.venvPath = path.join(envsDir, venvName);

    if (!fs.existsSync(envsDir)) {
      fs.mkdirSync(envsDir, { recursive: true });
    }

    if (!fs.existsSync(this.venvPath)) {
      // Create venv
      const { execSync } = await import('node:child_process');
      try {
        execSync(`"${this.pythonPath}" -m venv "${this.venvPath}"`, {
          stdio: 'ignore',
        });
      } catch (e) {
        throw new Error(
          `Failed to create managed venv at ${this.venvPath}: ${e}`,
        );
      }
    }

    // Update pythonPath to point to the venv python
    // This effectively "activates" the venv for subsequent usages
    const venvPython =
      os.platform() === 'win32'
        ? path.join(this.venvPath, 'Scripts', 'python.exe')
        : path.join(this.venvPath, 'bin', 'python3');

    // @ts-ignore: readonly property override for venv
    this.pythonPath = venvPython;

    // Task 9: Bootstrap T-APTS
    await this.installTapts(this.pythonPath);
  }

  private async installTapts(pythonExecutable: string): Promise<void> {
    const aptsPath = this.resolveAptsPath();
    if (!aptsPath) {
      // In production/Phase 1, we might not have the package available yet.
      // Warn but proceed if it's not critical (or throw if it is).
      console.warn(
        'Warning: T-APTS package not found. Runtime functionality may be limited.',
      );
      return;
    }

    const { execSync } = await import('node:child_process');
    try {
      // Upgrade pip first
      execSync(`"${pythonExecutable}" -m pip install --upgrade pip`, {
        stdio: 'ignore',
      });
      // Install T-APTS
      execSync(`"${pythonExecutable}" -m pip install "${aptsPath}"`, {
        stdio: 'ignore',
      });
    } catch (e) {
      throw new Error(`Failed to install T-APTS from ${aptsPath}: ${e}`);
    }
  }

  private resolveAptsPath(): string | null {
    // Try to resolve relative to this file (works in dev/monorepo)
    // packages/cli/src/runtime -> packages/sandbox-image/python
    const candidates = [
      path.resolve(__dirname, '../../../../sandbox-image/python'), // From src
      path.resolve(__dirname, '../../../sandbox-image/python'), // From dist (maybe?)
      path.resolve(process.cwd(), 'packages/sandbox-image/python'), // Fallback to repo root
    ];

    for (const p of candidates) {
      if (fs.existsSync(path.join(p, 'pyproject.toml'))) {
        return p;
      }
    }
    return null;
  }

  async healthCheck(): Promise<{ ok: boolean; error?: string }> {
    if (!fs.existsSync(this.pythonPath)) {
      return {
        ok: false,
        error: `Python executable not found at ${this.pythonPath}`,
      };
    }
    return { ok: true };
  }

  async dispose(): Promise<void> {
    // Nothing to dispose for local runtime yet
  }
}

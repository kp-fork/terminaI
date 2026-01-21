/**
 * @license
 * Copyright 2025 Google LLC
 * Portions Copyright 2025 TerminaI Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuntimeContext } from '@terminai/core/computer';
import { execSync } from 'node:child_process';

export class ContainerRuntimeContext implements RuntimeContext {
  readonly type = 'container';
  readonly isIsolated = true;
  readonly displayName = 'Docker Container';

  // In the container, Python is at a fixed path (guaranteed by the image)
  readonly pythonPath = '/usr/bin/python3';
  readonly taptsVersion: string;

  constructor(cliVersion: string) {
    // Ideally we'd validte the container image version here
    // For now, we assume implicit compatibility
    this.taptsVersion = cliVersion;
  }

  async healthCheck(): Promise<{ ok: boolean; error?: string }> {
    try {
      // Check if container is running or accessible
      // Since this class represents the *context*, and the actual running
      // might happen via PersistentShell wrapping a docker command,
      // we need to clarify if this Context implies "running inside" or "managing from outside".

      // Architecture implication:
      // This context manages the runtime.
      // If we are using standard docker/podman, we might just check if the daemon is up.

      execSync('docker info', { stdio: 'ignore' });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Docker daemon not reachable' };
    }
  }

  async dispose(): Promise<void> {
    // Cleanup any containers if we started them (roadmap item)
    // Currently we rely on PersistentShell to manage the process,
    // so there's not much state here yet.
  }
}

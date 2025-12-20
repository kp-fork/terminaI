/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { TtsProvider } from './tts/types.js';

export class VoiceController {
  private readonly ttsProvider: TtsProvider | null;
  private speaking = false;

  constructor(ttsProvider: TtsProvider | null) {
    this.ttsProvider = ttsProvider;
  }

  isSpeaking(): boolean {
    return this.speaking;
  }

  async speak(text: string): Promise<void> {
    if (!this.ttsProvider) {
      return;
    }
    if (this.speaking) {
      this.stopSpeaking();
    }
    this.speaking = true;
    try {
      await this.ttsProvider.speak(text);
    } finally {
      this.speaking = false;
    }
  }

  stopSpeaking(): void {
    if (!this.ttsProvider?.stop) {
      this.speaking = false;
      return;
    }
    this.ttsProvider.stop();
    this.speaking = false;
  }
}

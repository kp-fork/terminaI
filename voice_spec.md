# Phase 6 (Opt-in): Voice Mode — Specification

## Summary

Voice Mode adds an **optional** speech interface to the existing CLI without
changing the core tool/policy model. It is **push-to-talk first**, supports
**TTS interruption**, defaults to **short spoken replies** (<30 words), and
supports **background spoken notifications** (e.g., “tell me when the build
finishes”).

Non-goals:

- No core rewrite (prompt engine, tool scheduler, policy/confirmations remain
  as-is).
- No always-on wake word in Phase 6 (push-to-talk only; wake word is out of
  scope).
- No new cloud speech auth; Gemini OAuth remains for LLM only.

## UX Flows

### 1) Push-to-talk loop (primary)

1. User enables voice: `gemini --voice` (or `settings.json`).
2. UI shows a clear state indicator:
   `Voice: OFF | HOLD-TO-TALK | LISTENING | THINKING | SPEAKING`.
3. User **presses and holds** the PTT key (default: `Space`):
   - While held: record audio.
   - On release: stop recording, run STT, show transcript in the input composer.
4. User confirms sending:
   - Default: auto-send if transcript length ≥ N chars and confidence is OK
     (configurable).
   - Otherwise: user hits `Enter` to send / `Esc` to discard.

### 2) Interruption (TTS)

While TTS is speaking:

- Pressing PTT immediately **stops** TTS and starts recording.
- `Esc` stops TTS (and does not start recording).
- Any “new user input intent” (PTT, typed input) cancels speech.

### 3) Short spoken replies (default)

- The CLI continues to render the full assistant response.
- The voice channel speaks a **derived** “spoken reply” that is:
  - <= `voice.spokenReply.maxWords` (default 30)
  - Prefer first sentence / high-signal summary
  - Never reads tool output verbatim unless explicitly requested

### 4) Background notifications (voice)

User can request non-blocking notifications:

- “Tell me when the build finishes.”
- “Let me know if tests fail.”
- “Ping me when `npm run dev` prints ‘ready’.”

Behavior:

- Notification triggers do **not** execute new tools automatically.
- When a trigger fires, speak a short notification and also render a UI notice.
- User can ask “what was that?” to replay the last notification (voice-only
  state).

## Architecture Options

### Option A — In-process voice (default for Phase 6)

Location: `packages/cli/src/voice/*`

Shape:

- `VoiceController` owns:
  - Recorder (PTT -> audio file)
  - STT provider (audio -> text)
  - TTS provider (text -> audio playback)
  - Notification manager (speak async notices)
- Integrates with existing Ink UI by injecting transcripts into the same “text
  prompt” pipeline.

Pros:

- Minimal moving parts for users (`gemini --voice`).
- Keeps confirmations and policy UX in the same terminal.

Cons:

- Cross-platform audio capture is dependency-heavy (external binaries / native
  APIs).
- Sandboxing can block device access.

### Option B — External client via `packages/a2a-server` (recommended fallback)

Voice client (desktop or browser) uses:

- Browser STT/TTS (Web Speech API) or local providers
- A2A transport for:
  - Sending user text to the agent
  - Receiving streaming text/tool/confirmation updates

Pros:

- Avoids native Node audio deps in the CLI.
- Easier mobile voice UX; browser handles mic permissions.

Cons:

- Requires enabling Web-Remote (Phase 5) and remote auth.
- Adds an execution surface; must remain opt-in and threat-modeled.

## Dependencies & Cross-Platform Constraints

### STT (speech-to-text)

Phase 6 supports **local** STT providers only:

- `whisper.cpp` (preferred): external binary invoked by the CLI (no network).
- Fallback: “not available” with actionable install instructions.

### Audio capture (PTT recording)

Prefer external recorders to avoid native Node addons:

- macOS/Linux: `ffmpeg` or `sox` (detect presence at runtime).
- Windows: `ffmpeg` (dshow) if installed; otherwise unsupported in v0.

### TTS (text-to-speech)

Provider selection (auto):

- macOS: `say`
- Linux: `spd-say` or `espeak`
- Windows: PowerShell `System.Speech` (best-effort) or `edge-tts` (optional)

If no TTS provider is available, voice mode runs in “STT only” with on-screen
output.

## Sandbox Implications

- Voice mode requires spawning local binaries and accessing audio devices;
  strict sandboxing can block this.
- Policy requirement: **voice mode must not silently change approval or policy
  settings**.
- Default behavior when sandbox is enabled:
  - If sandbox blocks required capabilities, exit voice mode with a clear error:
    - “Voice requires microphone/audio access; rerun with `--no-sandbox` (or
      disable sandbox in settings).”

## CLI Flags & Settings (integration points)

### CLI flags (yargs)

File: `packages/cli/src/config/config.ts`

- `--voice` (boolean, default false): enable in-process voice mode
- `--voice-ptt-key` (enum, default `space`): `space | ctrl+space` (minimal set)
- `--voice-stt` (enum, default `auto`): `auto | whispercpp | none`
- `--voice-tts` (enum, default `auto`): `auto | none`
- `--voice-max-words` (number, default 30): spoken reply word cap

### Settings

Files:

- Schema: `packages/cli/src/config/settingsSchema.ts`
- Load/migrate: `packages/cli/src/config/settings.ts`

Proposed shape (user/workspace `settings.json`):

```json
{
  "voice": {
    "enabled": false,
    "pushToTalk": { "key": "space" },
    "stt": { "provider": "auto" },
    "tts": { "provider": "auto" },
    "spokenReply": { "maxWords": 30 }
  }
}
```

### Wiring (Ink entrypoint)

File: `packages/cli/src/gemini.tsx`

- After `parseArguments()` and `loadCliConfig()`, initialize `VoiceController`
  only if:
  - `argv.voice === true` OR `settings.voice.enabled === true`
- Pass the controller to the UI layer (new context/provider), so:
  - PTT can inject transcripts into `InputPrompt`
  - TTS can speak assistant turns (post-render hook)
  - Interrupt can cancel TTS on PTT/key activity

## Data Shapes (agent-agnostic, local-only)

### Spoken reply derivation

Local function (no extra LLM call):

- Input: full assistant text
- Output: `{ spokenText: string, truncated: boolean }`
- Rule: cap by `maxWords`, preserve first sentence when possible.

### Notification requests

Local-only in Phase 6 (does not require new tool APIs):

```ts
type VoiceNotification =
  | { kind: 'process-exit'; sessionName: string; speak: string }
  | {
      kind: 'output-match';
      sessionName: string;
      pattern: string;
      speak: string;
    }
  | { kind: 'timer'; ms: number; speak: string };
```

## Acceptance Criteria

- Voice mode is **opt-in only** and off by default.
- Push-to-talk works end-to-end: record → transcribe → send as normal user
  message.
- Spoken replies default to <= 30 words and do not leak tool output by default.
- TTS interruption works reliably (PTT cancels speech).
- Background notification can announce a completed long-running command without
  stealing focus.
- Missing audio dependencies fail gracefully with actionable instructions;
  non-voice CLI is unaffected.
- Tool confirmations and policy behavior remain authoritative and unchanged.

## Manual Verification (no network required)

1. Start: `gemini --voice` and confirm UI shows voice indicator.
2. Hold PTT, say “what’s using my CPU?”, release:
   - Transcript appears; send; response is spoken (short).
3. While speaking, press PTT:
   - Speech stops immediately; recording starts.
4. Ask: “start `npm test` and tell me when it finishes”:
   - Build/test runs as normal (with any required confirmations).
   - On completion, hear a short notification and see a UI notice.
5. Disable required binaries (simulate by PATH) and rerun:
   - Voice mode reports missing dependency and exits/degenerates cleanly.

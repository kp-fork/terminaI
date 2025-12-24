# Voice Mode + Web-Remote — Execution Checklist (Opt-in, Minimal Fork)

This checklist is sequenced into small, mergeable slices. Each slice includes
exact file targets and Vitest test targets. All work must preserve the existing
policy/confirmation model and keep both features **opt-in only** (disabled by
default).

## Global Constraints (non-negotiable)

- No core rewrite; build on existing primitives and packages.
- **Opt-in only**: no background listeners/servers without explicit enablement.
- Preserve confirmations/policy (no silent auto-approval, no new “yolo-like”
  modes).
- No new LLM auth; reuse existing Gemini OAuth. Web-Remote uses a separate
  **token** only for access control.
- Keep secrets out of logs; store secrets with restrictive permissions.

---

## P0 — Web-Remote: Security Gate + Safe Defaults

### 0.1 Add token auth storage + verification (no plaintext storage)

- Files:
  - `packages/a2a-server/src/http/auth.ts` (new): Express middleware
    `requireRemoteAuth()`
  - `packages/a2a-server/src/persistence/remoteAuthStore.ts` (new): read/write
    verifier in `~/.gemini/`
  - `packages/a2a-server/src/http/app.ts`: install middleware early (all
    endpoints except `GET /healthz`)
- Data shape:
  - `~/.gemini/web-remote-auth.json` contains
    `{ version, tokenId, tokenSaltB64, tokenHashB64, createdAt, lastRotatedAt, expiresAt }`
- Tests (Vitest + supertest):
  - `packages/a2a-server/src/http/auth.test.ts` (new):
    - `401` without `Authorization`
    - `401` with invalid token
    - `200` with valid token (mock verifier store)
  - Ensure logs never include token (mock logger + assert not called with token)
- DoD:
  - All non-health endpoints require auth; no unauthenticated execution path.

### 0.2 Add CORS + Origin allowlist (deny by default)

- Files:
  - `packages/a2a-server/src/http/cors.ts` (new): middleware
    `corsAllowlist({ allowedOrigins })`
  - `packages/a2a-server/src/http/app.ts`: apply before routes
  - `packages/a2a-server/src/config/settings.ts`: add
    `webRemote?: { allowedOrigins?: string[] }` (or env var equivalent)
- Tests:
  - `packages/a2a-server/src/http/cors.test.ts` (new):
    - Reject non-allowlisted `Origin`
    - Allow allowlisted origin + preflight `OPTIONS`
- DoD:
  - Browser requests from non-allowlisted origins are blocked.

### 0.3 Add replay resistance (nonce + signature)

- Files:
  - `packages/a2a-server/src/http/replay.ts` (new):
    `validateNonceAndSignature()`
  - `packages/a2a-server/src/http/auth.ts`: enforce headers for `POST /` and
    tool-confirmation posts
- Headers:
  - `X-Gemini-Nonce`, `X-Gemini-Signature`
- Tests:
  - `packages/a2a-server/src/http/replay.test.ts` (new):
    - Same nonce reused → rejected
    - Bad signature → rejected
    - Good signature → allowed
- DoD:
  - Captured request replay with identical nonce is rejected within TTL.

---

## P1 — Web-Remote: CLI Entry + Explicit Warnings

### 1.1 Add CLI flags (opt-in) and wiring to start server

- Files:
  - `packages/cli/src/config/config.ts`:
    - Add args: `--web-remote`, `--web-remote-host`, `--web-remote-port`,
      `--web-remote-allowed-origins`, `--web-remote-rotate-token`,
      `--i-understand-web-remote-risk`
    - Extend `CliArgs` accordingly
  - `packages/cli/src/gemini.tsx`:
    - If enabled, start `@google/gemini-cli-a2a-server` in-process (import
      `createApp`) or spawn its bin (minimal change; pick one and document)
    - Print warning banner + connection info (host/port), never printing stored
      verifier
- Tests:
  - `packages/cli/src/config/config.test.ts`:
    - Parsing behavior and defaults (web remote off by default)
  - `packages/cli/src/gemini.test.tsx` (or new targeted test):
    - When `--web-remote` absent → server not started (mock)
    - When `--web-remote` present → server start invoked (mock)
- DoD:
  - Web-Remote can be enabled with a single flag; disabling leaves no server
    running.

### 1.2 Add “local execution exposure” hard-stop for non-loopback binds

- Files:
  - `packages/cli/src/config/config.ts`: validate `--web-remote-host`
  - `packages/cli/src/gemini.tsx`: require `--i-understand-web-remote-risk` when
    host is not loopback
- Tests:
  - `packages/cli/src/config/config.test.ts`: rejects non-loopback without
    explicit consent flag
- DoD:
  - Accidental LAN exposure is prevented by default.

---

## P2 — Web-Remote: Minimal Web Client (optional)

### 2.1 Add tiny static client (no framework)

- Files (one of):
  - `packages/a2a-server/static/index.html` (new)
  - `packages/a2a-server/static/app.js` (new)
  - `packages/a2a-server/src/http/app.ts`: `express.static()` at `/ui`
- Requirements:
  - Uses `fetch()` streaming to `POST /` (Authorization header supported)
  - Renders text updates + tool status + confirmation prompts
- Tests:
  - `packages/a2a-server/src/http/ui.test.ts` (new): `/ui` serves content and is
    auth-protected
- DoD:
  - A user can chat from a browser on the same machine with explicit allowlisted
    origin or same-origin UI.

---

## P0 — Voice Mode: Flags + Spoken Reply (no audio deps required)

### 0.1 Add voice flags and settings schema (off by default)

- Files:
  - `packages/cli/src/config/config.ts`: `--voice`, `--voice-ptt-key`,
    `--voice-stt`, `--voice-tts`, `--voice-max-words`
  - `packages/cli/src/config/settingsSchema.ts`: add `voice.*` keys
  - `packages/cli/src/config/settings.ts`: migration map (if needed) + load
    behavior
- Tests:
  - `packages/cli/src/config/config.test.ts`: voice args parse; defaults keep
    voice disabled
  - `packages/cli/src/config/settingsSchema.test.ts`: schema contains `voice`
    block (if patterns exist)
- DoD:
  - Voice stays disabled unless explicitly enabled via flag or settings.

### 0.2 Implement local spoken-reply derivation (truncate <= 30 words)

- Files:
  - `packages/cli/src/voice/spokenReply.ts` (new):
    `deriveSpokenReply(text, maxWords)`
  - `packages/cli/src/voice/spokenReply.test.ts` (new): unit tests
- DoD:
  - Spoken reply truncation is deterministic and does not require an LLM call.

---

## P1 — Voice Mode: TTS + Interruption (best-effort providers)

### 1.1 Add TTS provider abstraction + auto selection

- Files:
  - `packages/cli/src/voice/tts/types.ts` (new)
  - `packages/cli/src/voice/tts/auto.ts` (new)
  - `packages/cli/src/voice/tts/auto.test.ts` (new): selection logic (mock
    platform)
  - `packages/cli/src/voice/voiceController.ts` (new): start/stop speaking,
    interruption
- Tests:
  - `packages/cli/src/voice/voiceController.test.ts` (new): “PTT cancels speech”
    (mock spawn)
- DoD:
  - Voice mode can speak short replies and reliably stop speaking on
    interruption.

---

## P2 — Voice Mode: Push-to-Talk Recording + STT (external binaries)

### 2.1 Add recorder + STT provider (whisper.cpp) behind feature checks

- Files:
  - `packages/cli/src/voice/recorder/ffmpegRecorder.ts` (new)
  - `packages/cli/src/voice/stt/whisperCpp.ts` (new)
  - `packages/cli/src/voice/diagnostics.ts` (new): dependency detection +
    actionable errors
- Tests:
  - `packages/cli/src/voice/diagnostics.test.ts` (new): missing binaries →
    helpful message
- DoD:
  - On macOS/Linux with dependencies installed, PTT produces a transcript and
    injects it into the composer.

### 2.2 Background notifications (integrate with process orchestration when available)

- Dependencies:
  - Prefer integration with the Process Manager Tool once shipped (see
    `tasks.md`).
- Files (proposed):
  - `packages/cli/src/voice/notifications.ts` (new)
  - Hook into session/process completion events (source depends on process
    manager implementation)
- Tests:
  - Unit tests for trigger matching and “replay last notification”
- DoD:
  - “Tell me when the build finishes” results in a spoken notification on
    completion without auto-running new tools.

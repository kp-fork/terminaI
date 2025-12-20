# High-Risk Architecture Delta (Above Canonical)

This document is the **incremental architecture roadmap above**
`architecture.md`. It intentionally focuses on items that are
security-sensitive, dependency-heavy, or likely to create long-term maintenance
burden if rushed.

If a capability is already planned in `tasks.md` (P0/P1), it should not be
duplicated here.

## 1. Web-Remote Execution Surface (High Risk)

### 1.1 Why This Is High Risk

Web-remote access is effectively “remote execution” on the user’s machine. The
architecture must be designed with a threat model, explicit user consent, and
safe defaults.

### 1.2 Architectural Principles

- Opt-in only (explicit flag/subcommand to enable).
- Bind to `localhost` by default.
- Authentication required (no anonymous mode).
- Explicit origin allowlist for browser clients.
- Clear warnings when enabling remote execution.

### 1.3 Foundation in This Repo

- Use `packages/a2a-server` as the primary transport/protocol layer.
- Add only the minimum necessary surface:
  - authentication middleware
  - streaming endpoint(s) suitable for browsers (likely WebSocket)
  - CORS allowlist configuration

### 1.4 Token Storage and Lifecycle (Threat Model Required)

Define:

- token storage location (prefer reuse under existing storage utilities; avoid
  ad-hoc parallel config trees unless justified)
- rotation/revocation
- expiry and replay resistance
- logging policy (no secrets)

### 1.5 Web Client (Optional, Still High Risk)

If adding `packages/web-client`:

- keep it static and minimal
- treat all inputs as untrusted
- enforce authorization server-side on every request/action (never rely on
  client checks)

Status (current implementation):

- Auth/CORS/replay middleware is implemented in
  `packages/a2a-server/src/http/*`.
- Token verifier storage uses
  `packages/a2a-server/src/persistence/remoteAuthStore.ts`.
- CLI wiring + warnings live in `packages/cli/src/utils/webRemoteServer.ts` and
  `packages/cli/src/gemini.tsx`.

## 2. Voice Stack (Dependency-Heavy + UX Risk)

### 2.1 Architectural Principles

- Voice must be a wrapper around the existing CLI logic (same tool/policy
  flows), not a parallel executor.
- Opt-in only (`--voice`).
- Default spoken replies are short; interruption is supported.

### 2.2 Implementation Choices

- In-process voice loop under `packages/cli/src/voice/*`, or
- External voice client speaking to `packages/a2a-server` (cleaner separation,
  easier remote UIs).

### 2.3 Packaging Risks

Audio dependencies vary by OS and environment and may conflict with sandbox
constraints. Architecture must include:

- explicit dependency list per OS
- fallback behavior when STT/TTS is unavailable
- clear error reporting without breaking core CLI usage

Status (current implementation):

- TTS provider selection + `VoiceController` exist in
  `packages/cli/src/voice/*`.
- Spoken reply derivation exists; PTT recording + STT providers are still
  pending.

## 3. Workflow Engine (High Complexity)

Workflow automation introduces state management complexity:

- multi-step state machines
- checkpointing and resumability
- parallel/sequential execution semantics
- failure recovery and potential rollback expectations

Ship only after process orchestration is stable, and keep the workflow format
validated and minimal.

## 4. “Always-On” Defaults (Operational + Safety Risk)

If you ever consider enabling monitoring/proactive systems by default:

- require explicit user consent and easy opt-out
- define resource budgets (CPU, RAM, polling intervals)
- define what is persisted/logged (privacy)
- ensure the agent does not act without user intent

## 5. Parallel Memory Systems (Potentially Wasteful)

Avoid introducing a new TermAI-specific memory store unless there is clear
evidence that existing mechanisms cannot meet requirements:

- global memory via `memoryTool`
- hierarchical `GEMINI.md` loading
- environment memory injection

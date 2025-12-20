# High-Risk Spec Delta (Above Canonical)

This document is the **incremental spec backlog above** `spec.md`. It contains
only items that are high-risk (security/UX/deps) or potentially wasteful if
implemented prematurely.

If a capability is already in the committed P0/P1 scope of `spec.md`/`tasks.md`,
it should not be duplicated here.

## 1. Web-Remote Access (High Risk)

### 1.1 Requirements

- Remote access is opt-in only.
- Auth required; no anonymous mode.
- Bind to localhost by default.
- Origin allowlist for browser clients.
- Clear CLI warnings that this exposes local execution.

### 1.2 Success Criteria

- A user can connect from a browser to a local TermAI endpoint only after
  explicit enable + auth token.
- All actions are authenticated and authorized server-side.
- Tokens can be revoked/rotated; logs never contain secrets.

Status (current implementation):

- Auth/CORS/replay guard enforced in `packages/a2a-server/src/http/*`.
- Token verifier stored under `~/.gemini/` via
  `packages/a2a-server/src/persistence/remoteAuthStore.ts`.
- CLI flags + warnings live in `packages/cli/src/config/config.ts` and
  `packages/cli/src/gemini.tsx`.
- Browser client remains optional/pending.

## 2. Voice Excellence (Dependency-Heavy + UX Risk)

### 2.1 Requirements

- Opt-in (`--voice`).
- Push-to-talk first (wake-word later).
- Interruptible TTS (user speech cancels output).
- Background notifications (“tell me when build finishes”) without stealing
  focus.

### 2.2 Success Criteria

- Voice mode can run without breaking the non-voice CLI.
- Missing audio dependencies degrade gracefully with actionable errors.

Status (current implementation):

- Spoken reply derivation + TTS provider scaffolding exist in
  `packages/cli/src/voice/*`.
- Push-to-talk capture + STT dependency checks are still pending.

## 3. Workflow Automation Engine (High Complexity)

### 3.1 Requirements

- A workflow definition format (validated YAML/JSON).
- Checkpointing/resume semantics on failure.
- Clear safety boundaries: workflows must not silently perform destructive
  actions.

### 3.2 Success Criteria

- One end-to-end workflow (“deploy-staging”) runs with visible step output and a
  resumable failure state.

## 4. Persona and Adaptive Verbosity (Low Engineering Risk, High Product Risk)

### 4.1 Requirements

- Persona must not violate CLI concision/safety rules.
- Verbosity must remain predictable and user-controllable.

### 4.2 Success Criteria

- `--verbose` / `--quiet` controls are deterministic; no “chatty drift”.

## 5. Parallel Memory Stores (Potentially Wasteful)

Avoid introducing new persistence layers unless you can show the existing
combination is insufficient:

- global memory (`memoryTool`)
- hierarchical `GEMINI.md` loading
- environment memory injection

If still needed, provide a migration plan and clear evidence of necessity.

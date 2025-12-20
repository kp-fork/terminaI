# TermAI — Product Requirements Document (Canonical)

TermAI is a self-hosted, AI-native terminal agent built as a minimal,
compatibility-preserving fork of `gemini-cli`. Its core promise is: **“I am your
terminal operator.”**

## 0. Guardrails (Non-Negotiable)

- Minimal fork: prefer configuration/prompt overrides over invasive rewrites.
- Safety first: preserve upstream confirmation/policy behavior for risky
  actions.
- Opt-in by default for “always-on” and “remote”: watchers, voice, and
  web-remote must be disabled unless explicitly enabled.
- Bounded outputs and state: avoid unbounded logs, memory growth, and token
  costs.

## 1. Goals

- Terminal identity: behave as a general terminal operator (not coding-only).
- Process orchestration: start, observe, and control long-running processes
  reliably (PTY when possible).
- System awareness: answer operational questions using compact context +
  on-demand diagnostics.
- Native auth: reuse Gemini OAuth (no new auth mechanism).
- Upstream compatibility: keep mergeability high.

## 2. Non-Goals (Initial Phases)

- Replacing the Ink UI/tool framework.
- Rebuilding authentication/model clients.
- Always-on daemons enabled by default.
- Web-remote access enabled by default or without authentication.

## 3. Target Users

- Developers who live in the terminal.
- DevOps/SREs doing operational work (logs, processes, deployments).
- Linux/macOS power users who want an operator copilot for shell workflows.

## 4. Repo Reality (Current Implementation Notes)

- The CLI binary name is currently `gemini`; TermAI is the identity/behavior
  layer.
- Prompt identity and workflows are TermAI-branded
  (`packages/core/src/core/prompts.ts`).
- Startup context includes a compact Node-derived system snapshot
  (`packages/core/src/utils/environmentContext.ts`).
- PTY execution + streaming + fallback exist
  (`packages/core/src/services/shellExecutionService.ts`).
- Persistent memory already exists via `memoryTool` writing to
  `~/.gemini/GEMINI.md` (`packages/core/src/tools/memoryTool.ts`).
- Hierarchical `GEMINI.md` loading exists
  (`packages/core/src/utils/memoryDiscovery.ts`).
- Web-remote security gate exists in `packages/a2a-server` (auth, CORS
  allowlist, replay guard) with token storage under `~/.gemini/`.
- CLI wiring for web-remote (flags, consent gating, startup warnings) exists in
  `packages/cli/src/utils/webRemoteServer.ts` + `packages/cli/src/gemini.tsx`.
- Voice scaffolding exists in `packages/cli/src/voice/*` (spoken reply
  derivation, auto TTS providers, `VoiceController`), plus settings schema + CLI
  flags.

## 5. Primary User Stories (Jobs To Be Done)

1. System status: “What’s using my CPU right now?” → inspect and summarize;
   propose next commands.
2. Disk triage: “Why is my disk full?” → find large dirs/files; propose safe
   cleanup steps.
3. Process control: “Start the dev server and tell me when it’s ready.” → run,
   stream output, detect readiness, report.
4. Incident workflow: “Tail logs and alert me on errors.” → follow logs;
   summarize error bursts (opt-in alerts).
5. Agent orchestration: “Have `claude`/`aider` fix this.” → spawn, supervise,
   summarize output.
6. Voice (later): “Jarvis, kill the runaway process.” → transcribe; confirm;
   execute.

## 6. Functional Requirements (Phased)

### Phase 1 (MVP) — Identity + Safe Terminal Tasks

- Identity: TermAI must present as a general terminal agent.
- Interaction: concise by default; clarify ambiguous/destructive scope.
- Execution: run shell/file/web tasks with confirmation for risky actions.
- System awareness: provide compact snapshot at startup and run deeper checks on
  demand.

### Phase 2 (P0) — Persistent Process Orchestration

- Named sessions: start/list/status/read/send/stop/restart long-running
  processes.
- Output capture: bounded ring buffer with “read last N lines”.
- Safety: stop/restart requires confirmation; graceful-first signals
  (SIGINT/SIGTERM before SIGKILL).
- Cross-platform: PTY when enabled; fallback to `child_process` when PTY
  unavailable.

### Phase 3 (P0) — Agent Control (Built on Process Orchestration)

- Spawn and supervise external agent CLIs as managed sessions.
- Send prompts, read output, stop safely.
- Restrictive defaults: avoid “spawn arbitrary binary” without explicit user
  intent/confirmation.

### Phase 4 (P1) — Awareness + Proactive Alerts (Opt-in)

- Watch mode emits events (CPU/disk/git/process) without interrupting the user
  by default.
- Alerts never run destructive commands automatically.
- Suppression controls (e.g., `--quiet` / `--no-proactive`).

### Phase 5 (P2) — Web-Remote (Opt-in + Auth)

- Auth required; localhost bind default; explicit origin allowlist; clear
  warning.
- Uses `packages/a2a-server` as the protocol foundation.

### Phase 6 (P2) — Voice Mode (Opt-in)

- `--voice` mode exists; push-to-talk first.
- Interruptible TTS; short replies by default (~<30 words).

## 7. Non-Functional Requirements

- Compatibility: minimal diffs; upstream mergeability.
- Safety: confirmations/policy remain authoritative.
- Performance: avoid heavy polling; bounded buffers; compact context.
- Reliability: graceful fallbacks when PTY/sandbox constraints exist.

## 8. Acceptance Criteria (Per Phase)

### MVP Acceptance

- Answers system queries via snapshot + on-demand diagnostics.
- Executes shell tasks with confirmations for risky actions.
- Uses existing OAuth seamlessly.

### Process Orchestration Acceptance (P0)

- Can start a long-running command as a named session, tail recent output, send
  Ctrl+C, and stop with confirmation.

## 9. Risks & Open Questions

- Token budget: how much system context to inject vs. probe on demand?
- UX: multi-process output attribution in a terminal UI.
- Security: threat model for web-remote + token storage and for proactive
  watchers.
- Voice packaging: cross-platform audio dependencies and sandbox constraints.

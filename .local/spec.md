# TermAI Specification (Canonical)

TermAI is a minimal, compatibility-preserving fork of `gemini-cli` whose core
promise is: **“I am your terminal operator.”**

## 0. Guardrails

- Minimal fork: prefer config/prompt overrides over invasive rewrites.
- Safety first: keep the upstream confirmation/policy system authoritative for
  risky actions.
- Opt-in for “always-on” and “remote” features: watchers/voice/web-remote must
  be disabled by default until explicitly enabled.
- Keep system context compact and bounded (token + memory budget discipline).

## 1. Product Vision

TermAI is not “a chatbot in the terminal” — it behaves like the terminal
operator:

- Runs commands safely and efficiently
- Observes and summarizes output
- Manages long-running processes
- Uses Gemini OAuth (no API keys by default)

### Mental Model

```
User (text/voice)
        │
        ▼
TermAI (CLI UI)
        │
        ▼
LLM + Tools (gemini-cli core)
  ├─ Prompt + Context (identity, rules, system snapshot)
  └─ Tools (shell/files/web/MCP)
        │
        ▼
OS Processes / Filesystem / Network
```

## 2. Repo Reality (What Exists Today)

- Binary name is currently `gemini`; “TermAI” is the identity/behavior.
- System prompt is TermAI-branded and uses “General Terminal Tasks” workflows
  (`packages/core/src/core/prompts.ts`).
- Startup context includes a compact system snapshot
  (`packages/core/src/utils/environmentContext.ts`).
- PTY-backed execution + streaming exists
  (`packages/core/src/services/shellExecutionService.ts`).
- Persistent memory already exists via `memoryTool` writing to global
  `~/.gemini/GEMINI.md` (`packages/core/src/tools/memoryTool.ts`).
- Hierarchical `GEMINI.md` loading exists
  (`packages/core/src/utils/memoryDiscovery.ts`).
- Web-remote security gate is implemented in `packages/a2a-server` (auth, CORS
  allowlist, replay guard) with token storage under `~/.gemini/`.
- CLI wiring for web-remote (flags, consent gating, startup warnings) exists in
  `packages/cli/src/utils/webRemoteServer.ts` + `packages/cli/src/gemini.tsx`.
- Voice scaffolding exists in `packages/cli/src/voice/*` (spoken reply
  derivation, auto TTS providers, `VoiceController`) plus settings schema + CLI
  flags; current behavior is **TTS-only** (no STT capture yet).
- Process orchestration is implemented via `process_manager`
  (`packages/core/src/tools/process-manager.ts`).
- File organization primitives are implemented via `file_ops`
  (`packages/core/src/tools/file-ops.ts`).
- External agent supervision is implemented via `agent_control`
  (`packages/core/src/tools/agent-control.ts`).
- TermAI wrapper package exists (`packages/termai`) along with
  `scripts/termai-install.sh`.

## 3. Core Capabilities (Now vs Next)

### 3.1 General Terminal Agent (Now)

- Interprets terminal tasks (ops, automation, research) and calls tools
  accordingly.
- Keeps output concise; explains critical commands before running them (per
  prompt rules).

### 3.2 System Awareness (Now, Compact)

- Session-start snapshot: OS, CPU count/load (when available), RAM usage.
- Deep dives are on-demand via shell commands (ps/top/df/free).

### 3.3 Process Orchestration (Next, P0)

- Named long-running sessions (start/list/read/send/stop) with bounded output
  capture.
- Safe termination semantics (confirm destructive actions).
  - Status: **implemented** as `process_manager`; manual acceptance still
    required.

### 3.4 Voice Mode (Opt-in, Scaffolding Landed)

- `--voice` flag + settings exist; short spoken reply derivation and TTS
  provider selection are implemented.
- Push-to-talk input and STT capture remain pending; core CLI works unchanged.
  Current behavior is **TTS-only** spoken replies.

### 3.5 Web-Remote (Opt-in + Auth, Security Gate Landed)

- A2A server now enforces auth + CORS allowlist + replay resistance with
  localhost default.
- CLI flags and startup warnings exist; web client remains optional and not yet
  shipped.

## 4. Success Criteria (Phased)

### Phase 1 (Current MVP) — Must Hold

1. ✅ Not coding-specific: behaves as a general terminal agent.
2. ✅ Uses existing Gemini OAuth (no new auth system).
3. ✅ Answers system questions using system snapshot + on-demand diagnostics.
4. ✅ Runs safe shell/file/web tasks with confirmations for risky actions.

### Phase 2 (Next) — Process Orchestration

1. ⬜ Start a long-running process as a named session and keep output available.
2. ⬜ Tail and summarize session output without losing attribution.
3. ⬜ Stop/restart with safe confirmations.

### Phase 3 (Opt-in) — Voice

1. ⬜ Push-to-talk loop works reliably.
2. ⬜ Short spoken replies by default; interruption supported. Status: spoken
   reply derivation + TTS provider scaffolding done; PTT/STT still pending.

### Phase 4 (Opt-in) — Awareness + Proactive Alerts

1. ⬜ Watch mode emits events (CPU/disk/git/process) without interrupting
   workflows by default.
2. ⬜ Alerts never auto-run destructive commands.

### Phase 5 (Opt-in) — Web-Remote

1. ⬜ Auth required; localhost bind default; origin allowlist.
2. ⬜ Clear CLI warning when enabling remote execution surface. Status: auth +
   CORS + replay guard + CLI flags implemented; browser client pending.

## 5. Scope and Sequencing

- P0: Process Manager Tool (enables the “living terminal” feel).
- P0: Agent Control Tool built on Process Manager.
- P1: Awareness (opt-in) then proactive alerts.
- P2: Web-remote (auth-first).
- P2: Voice excellence (interruption/background notifications).

Interpretation note:

- P0/P1 are the next committed engineering milestones.
- P2 items are explicitly security/UX sensitive and should only ship when their
  threat model and opt-in UX are complete.

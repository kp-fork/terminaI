# TerminaI

<div align="center">
  <img src="docs-terminai/assets/terminai-banner.svg" alt="TerminaI Banner" width="100%">
</div>

<p align="center">
  <a href="https://github.com/Prof-Harita/terminaI/actions/workflows/ci.yml"><img src="https://github.com/Prof-Harita/terminaI/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <img src="https://img.shields.io/badge/Node.js-20+-339933" alt="Node.js 20+">
  <img src="https://img.shields.io/badge/License-Apache%202.0-green" alt="License">
</p>

**TerminaI is an AI-powered system operator.** You describe what you want;
TerminaI inspects your machine, proposes actions, and executes them through
**governed tools** with a deterministic **approval ladder** and an **audit
trail**.

> **Status: Public Preview (v0.x)** The core operator loop is usable today. Some
> surfaces (Desktop/Voice/A2A) are still being hardened across platforms. Expect
> power; expect rough edges. Contributions welcome.

---

## Vision

What if your computer could do things for you safely?

Not just suggesting commands. Not just generating scripts. Actually operating
your system: diagnosing issues, fixing problems, and orchestrating workflows —
**with guardrails that make execution trustworthy.**

For years, “AI help” meant copy instructions from a chat window, paste into your
terminal, and hope you didn’t miss a step. Coding tools like Cursor and Aider
largely eliminated that inside the IDE — but the rest of your computer is still
stuck in the copy/paste era.

TerminaI is the next interface: you state intent, it proposes a governed plan,
you approve at the right level, and it executes with an audit trail. Less
ceremony. Fewer fragile steps. More outcomes — without handing your machine to
an unchecked agent.

---

## Why this exists

Computers are powerful, but operating them still requires memorizing syntax,
hunting through logs, and repeating the same diagnosis steps.

TerminaI compresses the gap between **intent** and **execution** — without
turning your machine into an uncontrolled “agent.”

**Intent → Governed plan → Approval → Execution → Audit**

---

## Who it’s for

- **Newbie developers** — “Set up my machine for this repo.” “Fix my dev
  environment.” “Explain what broke and how to recover.”
- **AI enthusiasts** — a real operator harness (tools + policy + audit) you can
  extend with MCP and A2A.
- **Tech purists** — AI leverage with deterministic guardrails, explicit
  approvals, and tamper-evident logs.
- **Professional engineers / DevOps** — repeatable workflows, headless-friendly
  CLI, safer execution, readable audit trails.

---

## Two ways to use TerminaI

- **CLI**: the canonical interface for developers, power users, and headless
  environments.
- **Desktop**: a Tauri wrapper around the same engine (GUI + voice surface).
  Linux/Windows are MVP; macOS is coming soon.

The canonical command is `terminai`.

---

## What makes TerminaI different

AI system operation must be governed. We took the experimental Gemini CLI and
rebuilt it as a **production-grade runtime**.

- **Adaptive "System 2" Brain**: Doesn't just guess; it _thinks_. Uses dynamic
  cognitive frameworks (Consensus, Sequential, Reflection) to solve complex
  tasks.
- **Provider Agnostic**: Decoupled from Google-locked infrastructure. Supports
  Gemini, OpenAI, Anthropic, and local models.
- **Production Stability**: Patched critical upstream memory leaks and race
  conditions. Built for long-running sessions.
- **True PTY Support**: Handles interactive applications (vim, htop, ssh)
  correctly via `node-pty`.
- **Governed Autonomy**: Strict **Policy Engine** and **Approval Ladder**
  (A/B/C) replace "yolo" execution.
- **Enterprise Audit**: High-throughput **JSONL** structured logs with
  tamper-evident intent tracking.
- **Deep Extensibility**: First-class support for **MCP** and an
  **Agent-to-Agent (A2A)** control plane.
- **Multi-Surface**: Available as a headless **CLI** for servers and a **Native
  Desktop App** (Linux/Windows) with voice control.
- **Remote Ready**: Securely operate headless instances via the A2A protocol.

---

## Install

### CLI (npm)

Prereqs: Node.js 20+

```bash
npm i -g @terminai/cli
terminai --version
terminai
```

> If you don’t see the CLI package yet (or want bleeding-edge), install from
> source below.

### Desktop (installers)

Download installers from GitHub Releases:

- https://github.com/Prof-Harita/terminaI/releases

---

## Quick start

TerminaI supports Gemini (default) and OpenAI-compatible providers.

### Gemini

```bash
export TERMINAI_API_KEY="..."
terminai
```

### OpenAI-compatible providers

Configure `llm.provider` and `llm.openaiCompatible` in
`~/.terminai/settings.json` (legacy `~/.gemini/settings.json` is still
supported).

See: `docs-terminai/multi-llm-support.md`

---

## Examples

Try prompts like:

- “What’s using my CPU right now? Summarize and offer safe actions.”
- “Find the biggest folders in my home directory, but don’t delete anything
  without asking.”
- “Set up my coding environment for this repo. Stop and explain any failures.”
- “Start the dev server in the background and watch for crashes.”
- “Before changing anything, tell me what you would do and why.”
- “Rotate logs and restart the service — ask before any destructive step.”

---

## Safety model (high level)

TerminaI routes execution through governed tools and a deterministic approval
ladder:

- **Level A**: safe/reversible actions (no approval)
- **Level B**: mutating actions (explicit approval)
- **Level C**: destructive or high-risk actions (explicit approval + PIN)

Audit logs are written to `~/.terminai/logs/audit/` (JSONL). Runtime/session
logs live in `~/.terminai/logs/`.

High-level flow:

```text
User intent -> policy engine -> approval -> tool execution -> audit
```

---

## Documentation

Start here:

- `docs-terminai/quickstart.md`
- `docs-terminai/configuration.md`
- `docs-terminai/troubleshooting.md`
- `docs-terminai/voice.md`
- `docs-terminai/multi-llm-support.md`

Contributor and security references:

- `AGENTS.md`
- `CONTRIBUTING.md`
- `SECURITY.md`

---

<details>
<summary><strong>Architecture (monorepo)</strong></summary>

```text
packages/
├── core/           # Engine: tools, policy, routing, telemetry
├── cli/            # Terminal UI (Ink/React)
├── desktop/        # Tauri app + PTY bridge
├── a2a-server/     # Agent-to-Agent control plane
├── termai/         # `terminai` launcher
└── cloud-relay/    # Cloud relay server (optional)
```

</details>

<details>
<summary><strong>Development</strong></summary>

Prereqs:

- Node.js 20+
- Rust (latest stable) for Desktop builds

Build and run the CLI from source:

```bash
npm ci
npm run build
npm -w packages/cli start
```

Desktop dev:

```bash
npm -w packages/desktop run tauri dev
```

</details>

---

## Lineage

TerminaI is a community fork of Google’s Gemini CLI:

- https://github.com/google-gemini/gemini-cli

---

## License and trademarks

- License: Apache-2.0 (see `LICENSE`)
- Trademark: see `TRADEMARK.md`

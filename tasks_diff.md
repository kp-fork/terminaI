# High-Risk / Expansion Tasks (Above Canonical)

This file is the **incremental backlog above** `tasks.md` and only contains
items that are:

- security-sensitive (remote execution surfaces),
- operationally risky (always-on services),
- dependency-heavy (voice stacks),
- or likely wasteful if done prematurely (parallel storage engines).

If it’s in `tasks.md`, it should not be duplicated here.

## Phase X — Web-Remote Access (Opt-in + Auth, High Risk)

### 13. A2A Server Enhancement

- [x] Review existing `packages/a2a-server/` capabilities
- [x] Add authentication layer:
  - [x] Token-based auth (design first; no unauthenticated mode)
  - [x] Decide token storage location (reuse existing storage utilities under
        `~/.gemini/`)
- [x] Add CORS configuration for web client origins
- [x] Add replay resistance (nonce + signature) middleware
- [ ] Add WebSocket endpoint for real-time chat streaming

Security requirements (non-negotiable):

- No unauthenticated access.
- Default bind to localhost only.
- Explicit allowlist of origins.
- Clear “you are exposing local execution” warning in CLI when enabling remote.
- Threat model includes replay resistance and safe defaults.

### 14. Web Client (Static, Free Hosting)

- [ ] Create `packages/web-client/` directory:
  ```
  packages/web-client/
  ├── index.html         # Chat UI (minimal, mobile-friendly)
  ├── style.css          # Dark theme, terminal aesthetic
  ├── app.js             # WebSocket connection + message handling
  └── voice.js           # Web Speech API (STT/TTS in browser)
  ```
- [ ] Features:
  - [ ] Text chat with streaming responses
  - [ ] Voice input via browser microphone (Web Speech API)
  - [ ] Voice output via browser TTS
  - [ ] Mobile-responsive design

### 15. Tunnel Setup Helper

- [ ] Create `scripts/tunnel.sh`:
  - [ ] Auto-detect: cloudflared, ngrok, or tailscale
  - [ ] Generate tunnel URL
  - [ ] Print QR code for mobile access
- [ ] Add `gemini --serve` (or dedicated subcommand) to start:
  - [ ] A2A server on localhost:8080 (or configurable port)
  - [ ] Optionally starts tunnel
  - [ ] Prints access URL

### 16. Deploy Web Client (CI/CD)

- [ ] GitHub Action to deploy `packages/web-client/` to:
  - [ ] Cloudflare Pages (preferred, free)
  - [ ] Or Vercel / Netlify as backup
- [ ] Configure with environment variable for user's tunnel URL

## Phase Y — Memory/Workflow Expansions (Potentially Wasteful If Premature)

### 19. Hierarchical Memory Store

- [ ] Only implement a new TermAI-specific storage layer if the existing
      combination of:
  - global memory (`memoryTool`),
  - hierarchical `GEMINI.md` loading,
  - and environment memory injection cannot meet requirements.
- [ ] If implemented, produce an explicit migration plan and a clear “why
      existing doesn’t work” justification.

### 20. Learning Engine (Basic)

- [ ] Record user corrections: "Use yarn, not npm"
- [ ] Record repeated patterns: "You always run `npm test` after edits"
- [ ] Inject learned preferences into prompt/context via existing memory
      channels (global memory + hierarchical `GEMINI.md`)
- [ ] Add `/forget` command to clear specific memories

Reality note: implement `/forget` only if it maps cleanly onto the existing
memory file format and confirmation UX.

---

## Phase Z — Workflow Automation (High Complexity)

### 21. Workflow Definition

- [ ] Create workflow format (YAML or JSON):

```yaml
name: deploy-staging
steps:
  - run: npm test
  - run: npm run build
  - run: docker build -t app .
  - run: docker push registry/app
  - run: kubectl apply -f k8s/staging.yaml
  - verify: curl http://staging.example.com/health
```

- [ ] Store workflows in `.termai/workflows/` or `~/.termai/workflows/`

### 22. Workflow Engine

- [ ] Create `packages/core/src/workflows/engine.ts`
  - [ ] Parse and validate workflow definitions
  - [ ] Execute with checkpoints (resume on failure)
  - [ ] Support parallel steps
- [ ] Create `WorkflowTool` to trigger by name: "Run deploy-staging"

---

## Phase V — Voice Excellence (Dependency-Heavy)

### 23. Voice Interruption

- [ ] Detect user speech during TTS playback
- [ ] Immediately stop TTS
- [ ] Process new input without losing context

### 24. Background Voice Mode

- [ ] "Let me know when the build finishes" — TermAI continues listening
- [ ] Non-blocking notifications spoken in background
- [ ] "What was that alert?" — recalls last spoken notification

### 25. Natural Clarification

- [ ] "Wait, what I meant was..."
- [ ] "Actually, can you first..."
- [ ] Context stack: push/pop conversation threads

---

## Phase P — Personality & Polish (Low Risk, But Non-Core)

### 26. Persona Definition

- [ ] Create `packages/core/src/persona/termai.ts`
  - [ ] Response style: concise, slightly witty, confident
  - [ ] Error handling: never apologetic, always solution-focused
  - [ ] Celebration: brief acknowledgment of success
- [ ] Integrate persona hints into system prompt

### 27. Adaptable Verbosity

- [ ] Detect user expertise level over time
- [ ] Adjust explanations: detailed for beginners, terse for experts
- [ ] `--verbose` and `--quiet` flags for explicit control

---

## Phase D — Distribution (Productization)

### 28. Package for npm

- [ ] Create separate `termai` npm package or fork naming
- [ ] `npx termai` should work
- [ ] Include system.md with package

### 29. Installation Script

- [ ] One-liner: `curl -fsSL termai.sh | bash`
- [ ] Handles: Node.js check, npm install, alias setup
- [ ] Post-install: Auth flow if needed

### 30. Documentation

- [ ] README with demo GIF
- [ ] Quickstart guide
- [ ] "What can TermAI do?" examples page
- [ ] Comparison: TermAI vs gemini-cli vs warp vs fig

---

## Priority Matrix

| Task                  | Impact | Effort                   | Priority |
| --------------------- | ------ | ------------------------ | -------- |
| **Web-Remote Access** | 🔥🔥🔥 | High (security)          | **P0**   |
| Voice Excellence      | 🔥🔥   | High (deps/UX)           | **P1**   |
| Workflow Engine       | 🔥🔥   | High (scope)             | **P1**   |
| New Memory Store      | 🔥     | Medium/High (complexity) | **P2**   |
| Persona               | 🔥     | Low                      | **P3**   |
| Packaging/Install     | 🔥     | Low/Medium               | **P3**   |

---

## Done Criteria (Amazing)

- [ ] TermAI proactively alerts you about problems
- [ ] You can say "Have Claude fix this" and walk away
- [ ] It remembers you hate nano and always opens vim
- [ ] Complex deployments are one command
- [ ] Voice conversation feels natural, not robotic
- [ ] **Control your terminal from your phone**
- [ ] People say "whoa" when they see a demo

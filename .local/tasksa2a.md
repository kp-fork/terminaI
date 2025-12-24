# A2A / Web-Remote: Status + Next Improvements

This document reflects the current A2A (web-remote) implementation status and
the next engineering improvements. The original “fix list” has been completed.

## Status (v1 complete)

- ✅ A2A server is integrated into the CLI (`terminai --web-remote`)
- ✅ Auth: Bearer token required; token can be rotated
  (`--web-remote-rotate-token`)
- ✅ Replay protection for state-changing requests (nonce + HMAC-SHA256
  signature)
- ✅ Browser UI loads at `/ui` without auth for static assets
- ✅ Browser UI:
  - captures `?token=...` on first load
  - stores token locally
  - strips token from the address bar
  - uses `POST /` JSON-RPC `message/stream` and parses SSE
  - supports tool confirmations (including Level C PIN prompts when required)
- ✅ Desktop (Tauri) is an A2A client (no separate OAuth flow)

## Current UX (what users do)

1. Start agent backend: `terminai --web-remote --web-remote-port 41242`
2. Connect a client:
   - Desktop: enter Agent URL + Token
   - Browser: open `/ui` URL (token is stored and removed from URL)

## Next improvements (optional)

- **Workspace selection**: allow `/ui` to pick a workspace path (or add a simple
  server “whoami” endpoint).
- **Token storage hardening (Desktop)**: move token from local storage to OS
  keychain (Tauri plugin).
- **TLS**: support HTTPS termination for remote deployments (recommended behind
  a reverse proxy).
- **Per-task workspace isolation**: remove any remaining reliance on global
  process-wide directory changes.

Acceptance:

- The UI can send a prompt and receives a streaming response.

---

## Phase 1 — Stream rendering (make it feel good)

**Task 1.1 — Parse SSE streaming responses**

- The server returns `text/event-stream` where each event is `data: <json>\n\n`.
- Implement an SSE parser in `packages/web-client/app.js` that:
  - reads `response.body` as a stream
  - splits on `\n\n`
  - JSON-parses the portion after `data: `
  - handles partial chunks robustly (buffer remainder)

Acceptance:

- Streaming messages appear progressively, not only at the end.

**Task 1.2 — Capture taskId and allow “continue this session”**

- The first SSE event is a `task` object and contains `task.id`.
- Store `currentTaskId` in memory, and include `params.taskId = currentTaskId`
  for subsequent prompts.

Acceptance:

- A second prompt continues the same task context instead of creating a new task
  every time.

---

## Phase 2 — Tool confirmations from the web UI

**Task 2.1 — Render tool-call confirmation events**

- In streamed events, detect when
  `metadata.coderAgent.kind === "tool-call-confirmation"` or when a ToolCall has
  status `awaiting_approval`.
- Render:
  - tool name
  - human-readable description (from confirmation details)
  - choices: Proceed once / Cancel / Proceed always (and other supported
    outcomes if exposed)

Acceptance:

- When a tool requires confirmation, the UI shows buttons.

**Task 2.2 — Send tool confirmation back to the server**

- A tool confirmation is sent as a user message where `parts` include a `data`
  part:
  - `{ kind: "data", data: { callId: "<callId>", outcome: "proceed_once" } }`
- Send this using the same `message/stream` request, with:
  - `params.taskId` set
  - no additional text required

Acceptance:

- Approving a tool causes the server to proceed and stream tool execution
  updates.

---

## Phase 3 — Make CORS work out-of-the-box (without opening the world)

**Task 3.1 — Allow same-origin by default**

- Edit: `packages/a2a-server/src/http/cors.ts`
- If the request `Origin` matches the server’s own origin (derived from `Host`
  header), allow it even when `allowedOrigins` is empty.
- Keep explicit allowlist enforcement for non-self origins.

Acceptance:

- `/ui` served from the same server origin can call the API without needing
  manual `allowedOrigins` configuration.

---

## Phase 4 — Fix the global `process.chdir()` workspace issue

**Task 4.1 — Remove global cwd mutation**

- Edit: `packages/a2a-server/src/config/config.ts`
- Replace `setTargetDir()` behavior:
  - Do not call `process.chdir()`.
  - Instead, pass `targetDir` explicitly into the `ConfigParameters` when
    creating `Config`.
  - Avoid any server-global state changes based on per-task workspace inputs.

Acceptance:

- Two tasks created with different workspaces do not interfere with each other.

---

## Phase 5 — Documentation (make it truthful)

**Task 5.1 — Update web-remote docs**

- Edit: `docs-terminai/web-remote.md`
- Update:
  - UI is served from the A2A server at `/ui`
  - bearer token is required
  - replay protection headers are required for POSTs
  - token rotation behavior (`--web-remote-rotate-token`)
  - how allowed origins work (and that same-origin works by default after Task
    3.1)

Acceptance:

- Docs match reality and a new user can successfully connect.

---

## Suggested Execution Order

1. Tasks 0.1–0.2 (UI loads)
2. Tasks 0.3–0.6 (token + signatures + correct endpoint)
3. Tasks 1.1–1.2 (streaming + sessions)
4. Tasks 2.1–2.2 (tool confirmations)
5. Task 3.1 (CORS ergonomics)
6. Task 4.1 (remove global chdir)
7. Task 5.1 (docs)

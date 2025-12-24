# Phase 5 (Opt-in): Web-Remote — Specification

## Summary

Web-Remote exposes an **opt-in** local HTTP interface for controlling TermAI
from another UI (browser/phone/desktop) using the existing
tool/policy/confirmation model. It is security-first:

- **Authentication required** (token-based; separate from Gemini OAuth).
- **Bind to localhost by default**.
- **Origin allowlist** for browser clients + CORS enforcement.
- **Replay resistance** (nonce + request signing) to reduce “captured request
  replay”.
- Prominent **local execution exposure** warnings at enable-time.

Non-goals:

- No anonymous mode.
- No “rewrite core”; transport wraps existing task/streaming primitives in
  `packages/a2a-server`.
- No new LLM auth flow; Gemini OAuth remains unchanged.

## Threat Model (minimum)

### Assets at risk

- Local code/files (read/write via tools)
- Shell execution and process control
- Credentials in environment / repo / filesystem

### Attackers

- **Malicious website** in the user’s browser trying to hit
  `http://localhost:<port>` (CSRF-like abuse).
- **Local unprivileged process** on the same machine.
- **Remote attacker** if the server is bound to non-loopback or tunneled.
- **Network observer** if traffic leaves localhost (tunnel/Wi‑Fi).

### Mitigations (required)

- Default `host=127.0.0.1` (or `localhost`) and explicit opt-in to bind
  publicly.
- Token auth on **every** request (no “open” endpoints except `GET /healthz`).
- Origin allowlist + CORS preflight enforcement (deny by default).
- DNS rebinding hardening (optional but recommended): validate `Host` header
  when `bind=localhost`.
- Replay resistance:
  - Per-request `nonce` stored server-side for a short TTL and rejected on
    reuse.
  - Optional request signature:
    `HMAC-SHA256(token, method + path + bodyHash + nonce)`.
- No secrets in logs (never log Authorization, token, signature, or full request
  bodies).
- Explicit warning that enabling Web-Remote exposes a local execution surface.

## Transport & API Plan (build on `packages/a2a-server`)

### Baseline (minimal fork)

Use the existing A2A server implementation and extend it with:

- Auth + CORS middleware in `packages/a2a-server/src/http/app.ts`
- Config loading that stays consistent with CLI/core settings
- A browser-friendly streaming strategy that preserves tool confirmations

### Streaming: HTTP (preferred) vs WebSocket

**Phase 5 default: HTTP streaming** using `fetch()` + `ReadableStream` parsing:

- Works with Authorization headers.
- Reuses existing SSE framing already used by `packages/a2a-server`
  (`data: <json>\n\n`).

WebSocket (optional later):

- Useful for long-lived bidirectional sessions and push notifications.
- Requires careful auth in the handshake; defer unless HTTP proves insufficient.

### Core request/response shapes (A2A-compatible)

Primary endpoint already covered by `packages/a2a-server` tests:

- `POST /` with JSON-RPC `method: "message/stream"` returns `text/event-stream`
  (SSE).

Request body (example; used in
`packages/a2a-server/src/utils/testing_utils.ts`):

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "message/stream",
  "params": {
    "message": {
      "kind": "message",
      "role": "user",
      "parts": [{ "kind": "text", "text": "hello" }],
      "messageId": "client-msg-1"
    },
    "metadata": {
      "coderAgent": {
        "kind": "agent-settings",
        "workspacePath": "/path/to/workspace"
      }
    },
    "taskId": "optional-existing-task-id"
  }
}
```

Tool confirmation response (client → server) is a normal user message part:

```json
{
  "kind": "data",
  "data": { "callId": "tool-call-id", "outcome": "proceed_once" }
}
```

`outcome` values (must match `packages/a2a-server/src/agent/task.ts`):
`proceed_once | cancel | proceed_always | proceed_always_server | proceed_always_tool | modify_with_editor`

### CORS

If a browser client is supported:

- Require explicit allowlist in settings/flags (no wildcard).
- Reply to preflight `OPTIONS` with:
  - `Access-Control-Allow-Origin: <origin>`
  - `Access-Control-Allow-Headers: Authorization, Content-Type, X-Gemini-Nonce, X-Gemini-Signature`
  - `Access-Control-Allow-Methods: POST, GET, OPTIONS`
- If serving the UI from the same origin (recommended), CORS is largely avoided.

## Authentication & Token Storage

### Auth scheme (token-based)

- Client sends `Authorization: Bearer <token>` on every request.
- Token is generated locally (high-entropy random), displayed once, and can be
  rotated/revoked.
- Token auth is **only** for remote access control (separate from Gemini OAuth).

### Storage strategy (reuse existing utilities)

Prefer storing remote auth material under `~/.gemini/` using core storage
primitives:

- Base dir: `Storage.getGlobalGeminiDir()` (see
  `packages/core/src/config/storage.ts`)
- File: `~/.gemini/web-remote-auth.json` (0600)

Recommended file format (store only a verifier, not the plaintext token):

```json
{
  "version": 1,
  "tokenId": "uuid",
  "tokenSaltB64": "…",
  "tokenHashB64": "…",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "lastRotatedAt": "2025-01-01T00:00:00.000Z",
  "expiresAt": null
}
```

Verification:

- `scrypt(token, salt)` → constant-time compare with `tokenHashB64`.

### Replay resistance (required for Phase 5)

Add request headers:

- `X-Gemini-Nonce: <random>` (per request)
- `X-Gemini-Signature: <hex>` where signature is
  `HMAC-SHA256(token, method + path + bodySha256 + nonce)`

Server:

- Stores `(tokenId, nonce)` in an LRU with TTL (e.g., 5 minutes) and rejects
  reuse.
- Rejects missing/invalid nonce/signature for state-changing requests (at
  minimum `POST /` and confirmation posts).

## Enablement & UX Warnings (opt-in only)

### Default behavior

- Web-Remote is disabled unless explicitly enabled via CLI flag or settings.
- Default bind: `127.0.0.1`, random available port (or explicit
  `--web-remote-port`).
- On start, print:
  - Listening address
  - A one-time token (only shown on creation/rotation)
  - A warning banner: “This exposes local execution to any client with the
    token.”

### Suggested CLI flags (integration points)

File: `packages/cli/src/config/config.ts`

- `--web-remote` (boolean, default false)
- `--web-remote-host` (string, default `127.0.0.1`)
- `--web-remote-port` (number, default `0` for ephemeral)
- `--web-remote-allowed-origins` (array/string, default empty/deny)
- `--web-remote-token` (string, optional; for ephemeral sessions, not persisted)
- `--web-remote-rotate-token` (boolean; rotate persisted token and exit)
- `--i-understand-web-remote-risk` (boolean; required if binding non-loopback)

Wiring: `packages/cli/src/gemini.tsx`

- Start the server only after settings are loaded and the workspace trust
  decision is known.
- If folder trust is enabled and the folder is untrusted, force bind to
  localhost and force approval mode to default (already standard behavior).

## Minimal Static Web Client Plan (optional)

Goal: a tiny client that can:

- Send text prompts
- Render streaming agent output and tool status
- Present tool confirmations and send confirmation outcomes

Implementation plan:

- Static files (no framework) served either:
  - (Preferred) from the same server origin under `/ui/*`, behind auth, or
  - from any static host with explicit origin allowlisted + CORS.

Connection strategy:

- Use `fetch()` streaming to `POST /` (Authorization header supported).
- Parse SSE frames (`data: ...\n\n`) into JSON-RPC events.

## Acceptance Criteria

- Web-Remote is **opt-in only** and off by default.
- Server binds to localhost by default; binding to non-loopback requires
  explicit extra consent flag.
- Every request is authenticated; missing/invalid auth returns `401`.
- CORS is deny-by-default; only explicitly allowlisted origins are allowed.
- Replay resistance blocks captured-request replay (nonce reuse is rejected).
- Tool confirmations are preserved end-to-end (remote client must explicitly
  confirm).
- Secrets are not logged; token is stored with restrictive permissions (0600).
- Disabling Web-Remote fully removes the remote execution surface (server not
  running).

## Manual Verification

1. Start: `gemini --web-remote --web-remote-port 41242` and confirm it binds to
   localhost and prints a warning + token.
2. From a separate terminal:
   - `curl -H "Authorization: Bearer …" -H "Accept: text/event-stream" -d @request.json http://127.0.0.1:41242/`
   - Confirm streaming events arrive.
3. Trigger a tool call that requires approval and confirm the server emits a
   `tool-call-confirmation` event.
4. Send a confirmation message with `outcome=cancel` and confirm the tool does
   not execute.
5. Attempt a request without auth → `401`.
6. Attempt a request from a non-allowlisted Origin (browser or simulated header)
   → blocked.
7. Replay the same signed request with the same nonce → rejected.

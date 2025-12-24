# Agent Tasks: A2A Pre-Investigation

**For:** Agent to pre-emptively investigate A2A (Web Remote) code before human
debugging. **Goal:** Document findings, potential issues, and configuration
details so debugging is efficient.

---

## 1. Code Review: Server Side

### 1.1 Trace the A2A server entry point

- [ ] **File:** `packages/a2a-server/src/index.ts` (or similar entry point)
  - Document: What port does it listen on?
  - Document: What is the default host binding? (localhost vs 0.0.0.0)
  - Document: Is there a health check endpoint? What is it?

### 1.2 Review CORS configuration

- [ ] **Find:** Search for "cors" or "Access-Control" in `packages/a2a-server/`
  - Document: What origins are allowed?
  - Document: Is there a whitelist mechanism?
  - **Check:** Does CORS allow the Desktop app origin? (likely
    `tauri://localhost` or `http://localhost`)

### 1.3 Review authentication flow

- [ ] **File:** Search for "token" or "auth" in `packages/a2a-server/src/`
  - Document: How is the token validated?
  - Document: Is it Bearer token? HMAC signature? Both?
  - **Check:** Is there a mismatch between what server expects and what Desktop
    sends?

### 1.4 Review SSE streaming

- [ ] **Find:** Search for "SSE" or "event-stream" or "text/event-stream" in
      `packages/a2a-server/`
  - Document: How are events pushed to the client?
  - Document: What event types exist?
  - **Check:** Is there proper error handling for disconnections?

---

## 2. Code Review: Client Side (Desktop)

### 2.1 Trace the Desktop connection logic

- [ ] **File:** `packages/desktop/src/hooks/useCliProcess.ts`
  - Document: How does it build the connection URL?
  - Document: What headers does it send?
  - Document: How does it handle auth token?

### 2.2 Review the settings store

- [ ] **File:** `packages/desktop/src/stores/settingsStore.ts`
  - Document: What fields are stored? (agentUrl, agentToken, etc.)
  - **Check:** Are there default values that might conflict?

### 2.3 Review SSE consumption

- [ ] **File:** `packages/desktop/src/utils/sse.ts` (or similar)
  - Document: How does it parse SSE events?
  - **Check:** Does it handle malformed events gracefully?

---

## 3. Configuration Checks

### 3.1 Verify web remote CLI flags

- [ ] **File:** `packages/cli/src/config/config.ts` or command parser
  - Document: What flags exist for web-remote?
    - `--web-remote`
    - `--web-remote-port`
    - `--web-remote-host`
    - `--web-remote-token`
    - `--web-remote-rotate-token`
    - `--i-understand-web-remote-risk`
  - Document: What are the defaults for each?

### 3.2 Check for hardcoded localhost restrictions

- [ ] **Find:** Search for "127.0.0.1" or "localhost" in `packages/a2a-server/`
      and `packages/cli/src/utils/webRemoteServer.ts`
  - Document: Are there any hardcoded restrictions preventing remote
    connections?
  - **Check:** Does `--i-understand-web-remote-risk` properly unlock
    non-localhost?

---

## 4. Error Handling Review

### 4.1 Server error responses

- [ ] **Find:** Search for "res.status" or "response.status" in
      `packages/a2a-server/`
  - Document: What HTTP status codes are returned for:
    - Auth failure (401? 403?)
    - Bad request (400?)
    - Server error (500?)
  - **Check:** Are error messages descriptive enough for debugging?

### 4.2 Client error handling

- [ ] **File:** `packages/desktop/src/hooks/useCliProcess.ts`
  - Document: How does it handle:
    - Connection refused?
    - 401 Unauthorized?
    - 500 Internal Server Error?
  - **Check:** Are errors displayed to the user?

---

## 5. Potential Issues to Flag

Based on code review, answer these questions:

| Question                                          | Answer | File/Line |
| ------------------------------------------------- | ------ | --------- |
| Is token validated on every request or just once? |        |           |
| Does CORS config include Tauri origins?           |        |           |
| Is SSE properly flushed after each event?         |        |           |
| Are there any TODO comments related to A2A?       |        |           |
| Is there rate limiting that might cause issues?   |        |           |
| Are there any obvious security holes?             |        |           |

---

## 6. Pre-Investigation Checklist

After completing the above, answer:

- [ ] **Server health:** Is there a `/healthz` or `/health` endpoint? What does
      it return?
- [ ] **Auth flow:** Is the token flow documented? If not, document it.
- [ ] **SSE flow:** Is the event schema documented? If not, document it.
- [ ] **Error messages:** Are there any cryptic error codes that need
      explanation?

---

## 7. Output: Investigation Report

Create a file `A2A_INVESTIGATION_REPORT.md` in `.local/` with:

1. **Architecture Diagram** (text-based) showing:
   - CLI → A2A Server → Desktop
   - Token flow
   - SSE event flow

2. **Configuration Summary:**
   - Default port
   - Default host
   - Token storage location

3. **Potential Issues Found:**
   - List any bugs, missing error handling, or configuration problems

4. **Recommended Next Steps:**
   - What should the human debuggers focus on first?

# Collaborative Tasks: Go-Live (You + Opus)

**For:** High-reasoning work requiring debugging, decisions, and human actions.
**Goal:** Fix A2A, set up distribution, and prepare for public launch.

---

## 1. A2A Debugging (Priority: CRITICAL)

### 1.1 Reproduce the Issue

- [ ] **You:** Start the A2A server with debug output:
  ```bash
  DEBUG=* terminai --web-remote --web-remote-port 41242
  ```
- [ ] **You:** Open the Desktop app and attempt to connect
- [ ] **You:** Share the terminal output with me (screenshot or paste)

### 1.2 Investigate Connection Issues

- [ ] **Opus:** Trace `packages/cli/src/utils/webRemoteServer.ts` for connection
      handling
- [ ] **Opus:** Check CORS configuration in `packages/a2a-server/`
- [ ] **Opus:** Verify token auth flow matches between Desktop and server

### 1.3 Fix Visibility Issue

- [ ] **Opus:** Investigate "inability to see what was happening on terminal
      locally"
  - This might be a UI issue in Desktop (not forwarding terminal output)
  - OR a backend issue (SSE stream not sending updates)

### 1.4 Test Remote Connection (After Local Works)

- [ ] **You:** Test with
      `--web-remote-host 0.0.0.0 --i-understand-web-remote-risk`
- [ ] **You:** Connect from another device on the same network

---

## 2. npm Distribution Setup (Priority: HIGH)

### 2.1 Create npm Account (YOU)

- [ ] Go to [npmjs.com/signup](https://www.npmjs.com/signup)
- [ ] Verify email
- [ ] Enable 2FA (required for publishing)

### 2.2 Create Organization (YOU)

- [ ] Click avatar → "Add Organization"
- [ ] Name: `terminai` (all lowercase)
- [ ] Choose "Unlimited public packages" (free)

### 2.3 Generate Access Token (YOU)

- [ ] Avatar → "Access Tokens"
- [ ] "Generate New Token" → "Classic Token"
- [ ] Select: `Automation` (for CI) or `Publish` (for manual)
- [ ] Copy the token (you won't see it again!)

### 2.4 Add Token to GitHub Secrets (YOU)

- [ ] Go to your GitHub repo → Settings → Secrets → Actions
- [ ] "New repository secret"
- [ ] Name: `NPM_TOKEN`
- [ ] Value: (paste token)

### 2.5 Update package.json Names (OPUS)

- [x] **Opus:** Change `@google/gemini-cli-*` to `@terminai/*` in all
      package.json files
- [x] Ensure scope matches your npm org

### 2.6 Test Publish (DRY RUN)

- [x] **You:** Run `npm publish --dry-run` in `packages/termai` to verify it
      works

---

## 3. GitHub Actions Release Workflow (Priority: MEDIUM)

### 3.1 Design Questions (DECIDE TOGETHER)

- [x] **Question:** What triggers a release? Manual dispatch? Git tag?
  - _Decision:_ Workflow Dispatch (manual) + Release Published event
- [x] **Question:** Do you want GitHub Releases with attached binaries?
  - _Decision:_ Skipped for now (requires code signing/Tauri CI). Focusing on
    npm.
- [x] **Question:** Do you want automatic npm publish on tag?
  - _Decision:_ Yes, via Release event.

### 3.2 Create Workflow (OPUS)

- [x] **Opus:** Create `.github/workflows/release.yml` based on your answers

---

## 4. Community Launch Preparation (Priority: MEDIUM)

### 4.1 Draft Launch Post (OPUS)

- [ ] **Opus:** Draft a Hacker News post (~300 words)
- [ ] **Opus:** Draft a Reddit /r/selfhosted post

### 4.2 Create Good First Issues (OPUS)

- [ ] **Opus:** Identify 3-5 easy issues and create GitHub Issues with
      `good first issue` label

### 4.3 Set Up Discord/Matrix (YOU)

- [ ] **Decision:** Discord or Matrix?
- [ ] **You:** Create server and post link in README

## 5. A2A Remote Testing (Priority: AFTER LOCAL WORKS)

### 5.1 Local Network Test (Same WiFi)

- [ ] **You:** Start server exposed to network:
  ```bash
  terminai --web-remote --web-remote-host 0.0.0.0 --i-understand-web-remote-risk
  ```
- [ ] **You:** Find your local IP: `ip addr | grep inet` (Linux) or `ipconfig`
      (Windows)
- [ ] **You:** On phone/tablet browser, go to: `http://<YOUR_LOCAL_IP>:41242/ui`
- [ ] **You:** Enter the token when prompted
- [ ] **Verify:** Can send messages and see responses

### 5.2 Tunneling Test (Remote over Internet)

- [ ] **Opus:** Document tunneling options:
  - `cloudflared tunnel` (Cloudflare)
  - `ngrok http 41242`
  - `tailscale funnel`
- [ ] **You:** Try one tunneling method
- [ ] **You:** Test from outside your network (mobile data)
- [ ] **Verify:** Connection works, token auth still required

### 5.3 Security Verification

- [ ] **You:** Test WITHOUT token — should get 401 Unauthorized
- [ ] **You:** Test with WRONG token — should get 401 Unauthorized
- [ ] **You:** Verify token is not visible in URL after QR scan (check browser
      history)

### 5.4 Desktop App Remote Test

- [ ] **You:** Close Desktop app
- [ ] **You:** Change Desktop settings to point to remote URL (tunnel or local
      IP)
- [ ] **You:** Verify auth works and messages flow correctly

### 5.5 Document Findings

- [ ] **Opus:** Update `docs-terminai/web-remote.md` with:
  - Tunneling recommendations
  - Known issues found during testing
  - Security best practices

---

## 6. Decision Log

| Question              | Decision    | Date   |
| --------------------- | ----------- | ------ |
| Trigger for releases? | (pending)   |        |
| Discord or Matrix?    | (pending)   |        |
| Homebrew priority?    | Coming Soon | Dec 24 |
| Voice priority?       | Coming Soon | Dec 24 |
| macOS priority?       | Coming Soon | Dec 24 |

---

## Session Notes

(Use this space for notes during our debugging session)

```
# A2A Debug Session Notes

## Terminal Output:



## Errors Found:



## Fixes Applied:


```

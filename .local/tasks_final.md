# TerminaI: Final Polish Tasks (Push to Grade A)

**Goal:** Polish the codebase for open source contributors without major
refactors or breaking changes.

---

## 1. Test Coverage (Grade: D → B+)

### 1.1 Desktop Hooks (Priority: HIGH)

- [ ] **Add `useCliProcess.test.ts`**
  - File: `packages/desktop/src/hooks/useCliProcess.test.ts`
  - Test: `sendMessage` happy path (mock fetch, verify body structure)
  - Test: `respondToConfirmation` with and without PIN
  - Test: `checkConnection` failure scenarios
  - Mock: `fetch`, `useSettingsStore`, `useTts`

- [ ] **Add `useVoiceTurnTaking.test.ts`**
  - File: `packages/desktop/src/hooks/useVoiceTurnTaking.test.ts`
  - Test: State transitions (IDLE → LISTENING → SPEAKING → IDLE)
  - Test: Barge-in aborts TTS (verify `AbortController.abort()` called)
  - Test: No infinite loops on rapid state changes

- [ ] **Add `useAudioRecorder.test.ts`**
  - File: `packages/desktop/src/hooks/useAudioRecorder.test.ts`
  - Test: Start/stop recording lifecycle
  - Test: Error handling for missing microphone permissions

### 1.2 Desktop Components (Priority: MEDIUM)

- [ ] **Add `SettingsPanel.test.tsx`**
  - Test: Form inputs update Zustand store
  - Test: Validation for Agent URL format
  - Test: Token masking behavior

- [ ] **Add `VoiceOrb.test.tsx`**
  - Test: PTT (Push-to-Talk) hold behavior
  - Test: Amplitude visualization updates
  - Test: Error state display

---

## 2. Documentation (Grade: C → A)

### 2.1 JSDoc Headers (Priority: HIGH)

- [ ] **`packages/desktop/src/hooks/useCliProcess.ts`**
  - Add JSDoc to `useCliProcess()` with `@returns` listing all 7 returned
    properties
  - Add JSDoc to `sendMessage(text)` explaining A2A protocol interaction
  - Add JSDoc to `respondToConfirmation(callId, approved, pin?)` explaining
    confirmation flow

- [ ] **`packages/desktop/src/hooks/useVoiceTurnTaking.ts`**
  - Add JSDoc to `useVoiceTurnTaking()` with state machine diagram link
  - Document barge-in behavior

- [ ] **`packages/core/src/tools/process-manager.ts`**
  - Add JSDoc to `ProcessManager` class
  - Document `startSession`, `stopSession`, `restartSession` with examples

### 2.2 User-Facing Docs (Priority: MEDIUM)

- [ ] **`docs-terminai/web-remote.md`**
  - Add "Security Considerations" section mentioning token-in-URL behavior
  - Add recommendation to use HTTPS in production

- [ ] **`docs-terminai/configuration.md`**
  - Add `security.approvalPin` configuration example
  - Document all new config options from TerminaI fork

---

## 3. Code Quality (Grade: B+ → A)

### 3.1 Extract Constants (Priority: MEDIUM)

- [ ] **`packages/desktop/src/hooks/useCliProcess.ts`**
  - Extract magic strings to constants:
    ```typescript
    const CODER_KIND = {
      TEXT_CONTENT: 'text-content',
      TOOL_CALL_CONFIRMATION: 'tool-call-confirmation',
    } as const;
    ```

### 3.2 Reduce Duplication (Priority: LOW)

- [ ] **`packages/desktop/src/hooks/useCliProcess.ts`**
  - Extract shared fetch logic from `sendMessage` and `respondToConfirmation`
    into:
    ```typescript
    async function postToAgent(
      baseUrl,
      token,
      body,
      abortSignal,
    ): Promise<Response>;
    ```

### 3.3 Type Safety (Priority: LOW)

- [ ] **`packages/cli/src/utils/webRemoteServer.ts:120-121`**
  - Remove `any` cast for `qrcode-terminal`
  - Add minimal type declaration:
    ```typescript
    type QRCodeModule = {
      generate: (text: string, opts?: { small?: boolean }) => void;
    };
    ```

---

## 4. Security Hygiene (Grade: B+ → A-)

### 4.1 Documentation Only (Priority: MEDIUM)

- [ ] **`docs-terminai/web-remote.md`**
  - Document that tokens in URL query strings may appear in:
    - Browser history
    - Server access logs
    - Referrer headers
  - Recommend using HTTPS and `--web-remote-rotate-token` for sensitive
    environments

### 4.2 Code Comments (Priority: LOW)

- [ ] **`packages/cli/src/utils/webRemoteServer.ts:111`**
  - Add comment explaining token-in-URL trade-off:
    ```typescript
    // NOTE: Token in URL is intentional for QR code sharing.
    // For production use, rotate tokens and use HTTPS.
    ```

---

## 5. Accessibility (Grade: N/A → B)

### 5.1 Desktop App (Priority: LOW)

- [ ] **`packages/desktop/src/App.tsx`**
  - Add `aria-label` to header buttons (⌘K, ⚙️)
  - Add `role="main"` to main content area

- [ ] **`packages/desktop/src/components/ChatInput.tsx`**
  - Add `aria-label="Message input"`
  - Add keyboard focus indicator styles

---

## Summary Table

| Dimension     | Current Grade | Target Grade | Effort   |
| ------------- | ------------- | ------------ | -------- |
| Test Coverage | D             | B+           | ~4 hours |
| Documentation | C             | A            | ~2 hours |
| Code Quality  | B+            | A            | ~1 hour  |
| Security      | B+            | A-           | ~30 min  |
| Accessibility | N/A           | B            | ~1 hour  |

**Total Estimated Effort:** ~8.5 hours for A-level across all dimensions.

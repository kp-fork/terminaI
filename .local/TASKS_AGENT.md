# Agent Tasks: Go-Live Preparation

**For:** Low-reasoning agent that follows directions precisely. **Goal:**
Execute mechanical tasks to prepare the codebase for public release.

---

## 1. Version String Cleanup

### 1.1 Fix remaining "nightly" versions

Only 2 packages still have nightly versions. Fix them:

- [ ] **File:** `packages/test-utils/package.json`
  - **Line 3**
  - Find EXACT string: `"version": "0.21.0-nightly.20251219.70696e364",`
  - Replace with: `"version": "0.21.0",`

- [ ] **File:** `packages/vscode-ide-companion/package.json`
  - **Line 5**
  - Find EXACT string: `"version": "0.21.0-nightly.20251219.70696e364",`
  - Replace with: `"version": "0.21.0",`

### 1.2 Update check (ALREADY DONE ✅)

The update check is already disabled. **No action needed.**

### 1.3 Update @google package references

- [ ] **File:** `packages/cli/src/utils/installationInfo.ts`
  - **Line 89**: Replace `@google/gemini-cli@latest` with `terminai@latest`
  - **Line 102**: Replace `@google/gemini-cli@latest` with `terminai@latest`
  - **Line 122**: Replace `@google/gemini-cli@latest` with `terminai@latest`
  - **Line 155**: Replace `@google/gemini-cli@latest` with `terminai@latest`

---

## 2. Documentation Updates

### 2.1 Mark Voice as Beta

- [ ] **File:** `docs-terminai/voice.md`
  - Add after line 1 (after the `# Voice Guide` title):

    ```markdown
    > [!NOTE] Voice Mode is currently in **beta**. Full offline STT support is
    > coming soon.
    ```

### 2.2 Add Platform Support table to Desktop

- [ ] **File:** `docs-terminai/desktop.md`
  - Find the line with `## Accessibility`
  - Add BEFORE that line:

    ```markdown
    ## Platform Support

    | Platform | Status         |
    | -------- | -------------- |
    | Linux    | ✅ Supported   |
    | Windows  | ✅ Supported   |
    | macOS    | 🚧 Coming Soon |
    ```

### 2.3 Update quickstart.md

- [ ] **File:** `docs-terminai/quickstart.md`
  - Search for any occurrence of `@google/gemini-cli`
  - Replace with `terminai`

---

## 3. GitHub Actions CI

### 3.1 Check for existing CI workflow

- [ ] **File:** `.github/workflows/ci.yml`
  - If this file exists, view it and verify it has jobs for:
    - `ubuntu-latest`
    - `windows-latest`
  - If it does NOT have these, add them

### 3.2 Disable nightly release workflow

- [ ] **Folder:** `.github/workflows/`
  - Search for files containing "nightly" in the name
  - If `release-nightly.yml` exists:
    - Rename to `release-nightly.yml.disabled`

---

## 4. Verification

After completing all tasks, run these commands:

```bash
npm run build
```

- [ ] Must complete without errors

```bash
npm run lint
```

- [ ] Must complete without errors

```bash
npm test -- --run
```

- [ ] Must complete without errors

---

## Summary Checklist

| #   | Task                                             | Status |
| --- | ------------------------------------------------ | ------ |
| 1.1 | Fix test-utils version                           | [ ]    |
| 1.2 | Fix vscode-ide-companion version                 | [ ]    |
| 1.3 | Update package references in installationInfo.ts | [ ]    |
| 2.1 | Add beta notice to voice.md                      | [ ]    |
| 2.2 | Add platform table to desktop.md                 | [ ]    |
| 2.3 | Update quickstart.md references                  | [ ]    |
| 3.1 | Verify CI workflow                               | [ ]    |
| 3.2 | Disable nightly workflow                         | [ ]    |
| 4   | Run verification commands                        | [ ]    |

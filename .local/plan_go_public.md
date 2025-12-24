# Go Public Plan: The "100 Stars" Initiative

> **Mission:** Make terminaI look and feel like a **stable, professional
> product** that earns user trust and community stars. **Milestone:** 100 GitHub
> Stars. **Freeze Duration:** 30 days (until green-light).

---

## Part 0: The "Why"

We have intentionally sprinted to a point where the basics are covered. Now it's
time to stop building and start _polishing and presenting_.

### The Core Argument

1.  **Code Doesn't Rot in 30 Days:** Our dependencies are locked in
    `package-lock.json`. Even if Google updates their libraries, our build uses
    the exact versions we have today. The Gemini API (`@google/genai`) is a
    stable public product.
2.  **The "FOMO" Fallacy:** If Google releases a cool new feature next week, our
    users don't know it exists yet. Our value is **Voice** and **Web Remote**,
    not "the latest experimental commit."
3.  **The "Promise" Strategy:** We tell users: _"We are currently running on
    **Stable Core v0.21**."_ This is a **Stability Feature**, not a "Lazy
    Developer" issue. Enterprise users prefer stable, older versions over
    bleeding-edge nightly builds.

---

## Part 1: The "Freeze & Ignore" Policy

**Directive to All Agents:**

> **DO NOT** run `git pull` from upstream (`google-gemini/gemini-cli`). **DO
> NOT** run `npm update` (unless fixing a _specific, documented_ bug). **DO
> NOT** merge or sync with the `scripts/sync_upstream.sh` script. **FOCUS 100%**
> on `gemini.tsx`, `voice/`, and `web-client/`.
>
> **Until When:** Until a firm, written `GO` is given by the Chief Architect
> when we reach **100 Stars**.

### 1.1 Lock Down Dependencies

- [ ] Verify `package-lock.json` is committed and intact.
- [ ] Add `MAINTAINERS_POLICY.md` to `.local/` documenting this freeze policy
      for the agent team.

### 1.2 Version Stability Signaling

- [ ] **Files:** `package.json` (root), `packages/cli/package.json`,
      `packages/termai/package.json`.
- [ ] **Change:** Update version from `0.21.0-nightly.YYYYMMDD.HASH` to
      `0.21.0`.
- [ ] **Goal:** Remove "Nightly" branding to signal a stable, production-ready
      release.

### 1.3 Disable "Update Available" Nag

- [ ] **Files:** `packages/cli/src/ui/utils/updateCheck.ts`,
      `packages/cli/src/utils/installationInfo.ts`.
- [ ] **Action:** Disable or bypass the logic that:
  - Checks for new npm versions.
  - Warns about running from a "local git clone".
  - Suggests `git pull`.
- [ ] **Goal:** Users see a clean prompt, no yellow warnings, no "nightly" tags.

### 1.4 CI/CD Safety Audit

- [ ] **Folder:** `.github/workflows/`.
- [ ] **Action:** Audit and disable/remove any workflows that:
  - Automatically publish to npm.
  - Automatically create "nightly" tags.
  - Sync with upstream.
- [ ] **Goal:** Prevent automated systems from breaking our "Stable Core"
      narrative.

---

## Part 2: Core Product Stabilization (The "Big 3")

**Primary Strategy:** Get the core **chat** and **voice-based interface**
working down solid, with a **POC for A2A** with the server.

### 2.1 Smoke Tests (Manual Verification)

- [ ] **CLI Basic:**
  - `npm run build` completes without errors.
  - `terminai` launches in interactive mode.
  - Keybindings (`Ctrl+C`, `/help`) work.
- [ ] **Voice Mode:**
  - Push-to-Talk (Spacebar or `Ctrl+Space`) toggles recording.
  - Transcription (Deepgram STT) displays user speech.
  - TTS plays back agent response.
- [ ] **A2A / Web Remote (POC):**
  - `npm run start:a2a-server` starts the agent server.
  - `packages/web-client` connects and can send/receive a message.

### 2.2 Critical Bug Fixes Only

- [ ] **Policy:** Fix **only** showstopper bugs found during Smoke Tests.
- [ ] **Ignore:** Cosmetic nits, feature requests, or upstream "improvements".

---

## Part 3: Professionalization ("Hiding the Works")

**Goal:** The root directory must look like a finished product, not a chaotic
sprint board.

### 3.1 Artifact Hygiene (Move to `.local/`)

- [ ] **Verify `.gitignore`:** Confirm `.local/` is present (it is: line 60).
- [ ] **Move the following files from root to `.local/`:**
  - `tasks_brain.md`
  - `tasks_frontend.md`
  - `tasks_horizon1.md`
  - `tasks_outstanding.md`
  - `tasks_outstanding_frontend.md`
  - `tasks_outstanding_horizon1.md`
  - `integration_review_prompts.md`
  - `Coding Agent Research and Upgrade Spec.md`
  - `plan_go_public.md` (this file, after execution is complete)
- [ ] **Decide on `futureroadmap_opus.md`:**
  - **Option A:** Rename to `ROADMAP.md` and clean for public consumption.
  - **Option B:** Move to `.local/` and create a minimal public `ROADMAP.md`.

### 3.2 Documentation Architecture

- [ ] **`docs/` (Upstream):** FROZEN. Do not edit. Do not delete. Keep for
      reference and future merge compatibility.
- [ ] **`docs-terminai/` (New):** THE SOURCE OF TRUTH for terminaI-specific
      features.
  - [ ] Create `docs-terminai/` directory.
  - [ ] Create `docs-terminai/index.md` (Overview / What is terminaI).
  - [ ] Create `docs-terminai/quickstart.md` (Installation & First Run).
  - [ ] Create `docs-terminai/voice.md` (Voice Mode - Push-to-Talk).
  - [ ] Create `docs-terminai/web-remote.md` (Web Remote / A2A).
  - [ ] Create `docs-terminai/changelog.md` (terminaI-specific changes from
        upstream).
  - [ ] Cross-link to `docs/` for generic topics (e.g., Troubleshooting, MCP).

### 3.3 README Overhaul

- [ ] **File:** `README.md`.
- [ ] **Goal:** Transform from "Developer README" to "Product Landing Page".
  - [ ] **Header:** Lead with value prop, not fork disclaimer.
  - [ ] **Features:** Sell Voice and Web Remote prominently.
  - [ ] **Stability:** Add "Running on Stable Core v0.21" badge or note.
  - [ ] **Links:** Point ALL documentation links to `docs-terminai/`.
  - [ ] **Footer:** Credit original Gemini CLI (move fork lineage here).

---

## Part 4: Execution Checklist

| Phase | Action                                        | Status |
| :---: | --------------------------------------------- | :----: |
|   1   | File Hygiene (Move artifacts, fix .gitignore) |  [ ]   |
|   2   | Code Changes (Version number, Update checker) |  [ ]   |
|   3   | Docs & README (Create `docs-terminai/`)       |  [ ]   |
|   4   | Smoke Test & Freeze                           |  [ ]   |

---

## Appendix: Files to be Moved to `.local/`

| File                                        | Destination         |
| ------------------------------------------- | ------------------- |
| `tasks_brain.md`                            | `.local/`           |
| `tasks_frontend.md`                         | `.local/`           |
| `tasks_horizon1.md`                         | `.local/`           |
| `tasks_outstanding.md`                      | `.local/`           |
| `tasks_outstanding_frontend.md`             | `.local/`           |
| `tasks_outstanding_horizon1.md`             | `.local/`           |
| `integration_review_prompts.md`             | `.local/`           |
| `Coding Agent Research and Upgrade Spec.md` | `.local/`           |
| `futureroadmap_opus.md`                     | Rename or `.local/` |

---

_End of Plan._

# TerminaI Diff Analysis & Change Report

**Base Fork Point:** `8feeffb29b831b4bfcf0be230678d85418c39ee0` (Dec 20, 2025)
**Current HEAD:** `fa7b24c7b774b42f2de3f324bdfb402b7af34879` (Dec 24, 2025)
**Total Files Changed:** ~1,424 **Net Lines:** +32,478 / -3,109

## Executive Summary

TerminaI is a substantial fork of the Gemini CLI, evolving it from a CLI-only
tool into a "Terminal Operator" platform. The most significant changes are the
introduction of a Desktop GUI (Tauri), a Web Client (A2A), and a "Stable Core"
philosophy that relaxes some strict safety/risk logic in favor of user autonomy
(governed by an approval ladder).

## 1. Major Architectural Additions

### 1.1 Desktop Application (`packages/desktop`)

- **Status:** [NEW]
- **Description:** A full-featured Tauri application that provides a GUI wrapper
  around the core agent.
- **Key Features:**
  - **Voice Integration:** Offline STT/TTS with barge-in support
    (`VoiceOrb.tsx`, `useVoiceTurnTaking.ts`).
  - **Session Management:** Persisted sessions (`SessionCard.tsx`,
    `SessionsSidebar.tsx`).
  - **Settings UI:** GUI for configuring the agent (`SettingsPanel.tsx`).
  - **Terminal Emulation:** Embedded terminal (`EmbeddedTerminal.tsx`) using
    `xterm.js`.
- **Justification:** Expands the tool's accessibility beyond the command line,
  enabling rich interactions like voice and visual config.
- **Documentation:** Covered in `docs-terminai/desktop.md`.

### 1.2 Agent-to-Agent (A2A) Protocol & Web Client

- **Status:** [NEW]
- **Description:** A mechanism for remote clients (browsers, other agents) to
  control the terminal agent.
- **Implementation:**
  - `packages/web-client`: A reference web implementation.
  - `packages/core`: Infrastructure to support remote command execution and
    "broadcast" events.
- **Justification:** Enables "headless" operation and remote management,
  fulfilling the "General Purpose Agent" vision.
- **Documentation:** Covered in `docs-terminai/a2a.md` and
  `docs-terminai/web-remote.md`.

### 1.3 TerminaI Wrapper (`packages/termai`)

- **Status:** [NEW]
- **Description:** A wrapper package that likely serves as the entry point for
  the "branded" CLI distribution, separating the core logic (`packages/cli`)
  from the specific product identity.
- **Justification:** Allows `packages/cli` to remain closer to upstream (Gemini
  CLI) while `terminai` handles branding and distribution nuances.

## 2. Core Logic & Philosophy Changes

### 2.1 Renaming & Branding

- **Change:** "Gemini CLI" -> "TerminaI".
- **Scope:** Widespread text replacements in `README.md`, `package.json`, and UI
  strings.
- **Justification:** Product identity change.

### 2.2 Safety & Risk Assessment

- **Change:** Relaxed Command Validation.
- **Details:**
  - **Removal of "Slow LLM Risk Assessment"**: The commit history indicates a
    movement away from using a slow LLM call to verify every command, preferring
    fast heuristics.
  - **Approval Ladder**: Implemented a deterministic A/B/C tier system.
    - **Level C**: Requires a PIN (`security.approvalPin`).
- **Justification:** Performance and Usability. The strict LLM-based
  verification was deemed too slow and brittle for extensive use.
- **Documentation:** `docs-terminai/safety.md` explicitly details the A/B/C
  ladder and PIN system.

### 2.3 Documentation Overhaul

- **Change:** New `docs-terminai/` directory.
- **Details:**
  - Replaces/Augments `docs/`.
  - Includes specific guides for `voice.md`, `desktop.md`, `governance.md`.
- **Justification:** The original docs were specific to Gemini CLI; new docs
  cover the expanded scope (Desktop, A2A).

## 3. Detailed Component Check

| Component                              | Change Status | Justification                                                 | Documentation Status             |
| :------------------------------------- | :------------ | :------------------------------------------------------------ | :------------------------------- |
| **CLI (`packages/cli`)**               | Modified      | Integration with A2A, renamed entry points.                   | `docs-terminai/quickstart.md`    |
| **Core (`packages/core`)**             | Modified      | Added `security`, `a2a` support, `approvalPin` config.        | `docs-terminai/configuration.md` |
| **Desktop (`packages/desktop`)**       | **NEW**       | Primary GUI for TerminaI.                                     | `docs-terminai/desktop.md`       |
| **Web Client (`packages/web-client`)** | **NEW**       | Reference A2A client.                                         | `docs-terminai/web-remote.md`    |
| **Scripts (`scripts/`)**               | Modified      | Added `sync_upstream.sh`, installers (`terminai-install.sh`). | Implicit in build process.       |

## 4. Documentation Gap Analysis

- **Coverage:** Excellent. The `docs-terminai` directory appears to have been
  written specifically to cover the new features (Voice, Desktop, Safety).
- **Missing:**
  - Deep technical details of the "removed" risk assessment logic are not in
    docs (intentionally, as it's an implementation detail).
  - Specifics of internal refactors in `packages/core` are not documented
    user-facing, which is standard.

## Conclusion

The fork is a major functionality superset, adding a Desktop/GUI layer and
Remote capabilities on top of the Gemini CLI core. The changes are
well-justified by the product vision (an autonomous, accessible terminal
operator) and are surprisingly well-documented in the new `docs-terminai`
folder.

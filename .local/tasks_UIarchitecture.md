# UI Architecture Implementation Tasks

> This task list implements the TerminaI TUI redesign as defined in `UIspec.md`
> and `UIarchitecture.md`. **Scope**: Polish look/feel and extend mouse
> interactivity. No functionality loss.

---

## Phase 0: Foundation (Pre-requisites)

- [x] **P0.1: Audit Existing Theme Usage**
  - Grep for hardcoded color values (e.g., `#fff`, `white`, `gray`) in
    `packages/cli/src/ui/`.
  - Document all instances needing replacement with theme tokens.
  - **File**: Create `ui/kit/Theme.tsx` exporting the canonical palette
    (`#000000`, `#111111`, `#E2231A`, etc.).

- [x] **P0.2: Create `ThemeProvider` Context**
  - Implement a `ThemeContext` providing the color palette from `Theme.tsx`.
  - Wrap the root `AppContainer` with `ThemeProvider`.
  - **Files**: `ui/contexts/ThemeContext.tsx`, update `gemini.tsx`.

---

## Phase 1: Mouse Interaction Enhancements

- [x] **P1.1: Create `useMouseHover` Hook**
  - Mirror `useMouseClick.ts` logic but for `move` events.
  - Expose `isHovered` state and `onHoverEnter`/`onHoverLeave` callbacks.
  - Use `getBoundingBox` for hit-testing.
  - **File**: `ui/hooks/useMouseHover.ts` (~30-50 lines).
  - **Test**: Add unit test in `ui/hooks/useMouseHover.test.ts`.

- [x] **P1.2: Create `InteractiveBox` Component**
  - A `Box` wrapper that uses `useMouseClick` + `useMouseHover`.
  - Props: `onClick`, `onHover`, `hoverBorderColor`, `hoverBackgroundColor`.
  - Applies visual state changes on hover/active.
  - **File**: `ui/kit/InteractiveBox.tsx`.
  - **Test**: Add unit test in `ui/kit/InteractiveBox.test.tsx`.

- [x] **P1.3: Refactor One Existing Component to Use `InteractiveBox`**
  - Target: A simple, frequently-used interactive element (e.g., a button in
    `ToolConfirmationDialog.tsx` or a list item).
  - Validate the pattern works before wider adoption.

---

## Phase 2: Visual Polish & Theming

- [x] **P2.1: Refactor `Header.tsx` Logo**
  - Ensure colors match `terminai-banner.svg` exactly (`#FFFFFF` text, `#E2231A`
    cursor).
  - Use `ink-gradient` for subtle Red->Orange accent on "I" if desired.
  - Verify the blinking cursor animation (if implemented, or add a simple
    `setInterval` opacity toggle).
  - **File**: `ui/components/Header.tsx`.

- [x] **P2.2: Create Unified Status Bar / Footer**
  - A minimal footer component showing:
    `Current Directory | Git Branch | Version`.
  - Use theme colors (`textMuted` for labels, `text` for values).
  - **File**: `ui/components/StatusBar.tsx` (new or refactor existing).

- [ ] **P2.3: Apply Theme to All Existing Components (Incremental)**
  - Replace hardcoded colors with `useTheme()` hook calls.
  - Prioritize high-visibility components first:
    1.  `InputPrompt.tsx`
    2.  `ConversationView.tsx`
    3.  `ToolConfirmationDialog.tsx`
    4.  `HistoryView.tsx`
    5.  `SettingsView.tsx`
  - **Note**: This is a large, incremental task. Can be split per-component.

---

## Phase 3: Layout Modes

- [x] **P3.1: Create `FocusView.tsx` (Home Screen)**
  - Vertically centered layout: Logo + Floating Input.
  - Minimal footer (StatusBar).
  - No chat history, sidebars, or noise.
  - **File**: `ui/views/FocusView.tsx`.

- [x] **P3.2: Rename/Refactor Current Main View to `SessionView.tsx`**
  - The existing active session layout (chat history + input).
  - Ensure it's a self-contained component that can be swapped with `FocusView`.
  - **File**: `ui/views/SessionView.tsx` (may be a refactor of
    `AppContainer.tsx` internals).

- [x] **P3.3: Implement View Mode Manager in `AppContainer`**
  - Add `viewMode` state: `"FOCUS" | "SESSION"`.
  - Render `FocusView` when no active session, `SessionView` otherwise.
  - **File**: `ui/AppContainer.tsx`.

- [x] **P3.4: Create `MultiplexView.tsx` (Split-Screen for Processes)**
  - Adaptive layout based on `useTerminalSize()`:
    - `columns > 140`: Left (60%) / Right (40%) split.
    - `columns <= 140`: Top (70%) / Bottom (30%) split.
  - Left/Top = Agent Interaction Pane.
  - Right/Bottom = Process/Focus Pane (PTY output).
  - **File**: `ui/views/MultiplexView.tsx`.
  - **Dependency**: Requires refactoring `FullScreenTerminalView.tsx` to be
    embeddable as a pane.

- [x] **P3.5: Integrate Multiplex Mode into View Manager**
  - Add `"MULTIPLEX"` to `viewMode` state.
  - Trigger Multiplex Mode when a PTY-takeover command is running.
  - Allow focus toggling (`Ctrl+Tab`) between panes.
  - **File**: `ui/AppContainer.tsx`.

---

## Phase 4: Advanced Interactions

- [x] **P4.1: Create `SpotlightDialog.tsx` (Command Palette)**
  - A centered, floating modal.
  - Features:
    - Text input for fuzzy search.
    - Categorized list of results (Commands, Files, Agents).
    - Keyboard navigation (`↑`, `↓`, `Enter`, `Esc`).
    - Mouse-clickable list items using `InteractiveBox`.
  - Use `fuzzysort` or `fzf` library for filtering (already in `package.json`).
  - **File**: `ui/components/SpotlightDialog.tsx`.
  - **Trigger**: `Ctrl+k` keybinding.

- [x] **P4.2: Create `DialogLayer.tsx` (Overlay Manager)**
  - A component rendered last in the tree to appear on top.
  - Manages the active dialog state (e.g., Spotlight, Confirmation).
  - Handles `Escape` key to dismiss globally.
  - **File**: `ui/contexts/DialogLayer.tsx` or `ui/kit/DialogLayer.tsx`.

---

## Phase 5: Verification & Polish

- [x] **P5.1: Run Full Test Suite**
  - Execute `npm run preflight` to ensure no regressions.
  - Fix any failing tests related to UI changes.

- [x] **P5.2: Manual Visual QA**
  - Test in multiple terminals: iTerm2, macOS Terminal, Windows Terminal,
    standard Linux terminal.
  - Verify color rendering (TrueColor vs 256-color fallback).
  - Check mouse interactions work as expected.

- [ ] **P5.3: Update Documentation**
  - Update `docs-terminai/` with new component descriptions if any public-facing
    docs exist.
  - Add a brief section to `CONTRIBUTING.md` about the design system (`ui/kit`).

---

## Appendix: Files to Create

| File                                | Description                    |
| :---------------------------------- | :----------------------------- |
| `ui/kit/Theme.tsx`                  | Color palette constants        |
| `ui/contexts/ThemeContext.tsx`      | Theme provider                 |
| `ui/hooks/useMouseHover.ts`         | Hover detection hook           |
| `ui/kit/InteractiveBox.tsx`         | Clickable/Hoverable Box        |
| `ui/components/StatusBar.tsx`       | Footer component               |
| `ui/views/FocusView.tsx`            | Home/Zen-like screen           |
| `ui/views/SessionView.tsx`          | Refactored active session view |
| `ui/views/MultiplexView.tsx`        | Split-screen for processes     |
| `ui/components/SpotlightDialog.tsx` | Command palette                |
| `ui/kit/DialogLayer.tsx`            | Overlay manager                |

---

## Appendix: Priority Order (Recommended)

1.  **P0** (Foundation) - Must be done first.
2.  **P1** (Mouse Hooks) - Enables all interactive polish.
3.  **P2.1, P2.2** (Logo, Footer) - High-impact visual wins.
4.  **P3.1, P3.2, P3.3** (Focus/Session Modes) - Core UX improvement.
5.  **P2.3** (Theme Rollout) - Incremental, can be parallelized.
6.  **P4** (Spotlight, Dialogs) - Advanced feature.
7.  **P3.4, P3.5** (Multiplex Mode) - Complex, saves for later.
8.  **P5** (Verification) - Final step.

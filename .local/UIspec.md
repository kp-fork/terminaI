# TerminaI UI Specification

> [!IMPORTANT] This specification defines the visual language and interaction
> model for the TerminaI CLI. It adopts an "Industrial Minimalist" aesthetic
> with high-fidelity interactions, strictly aligned with the TerminaI Brand
> Identity.

## 1. Brand Identity

- **Logo**: `terminaI` (White Text + Blinking Red Cursor `#E2231A`).
- **Font**: Monospace (JetBrains Mono).
- **Colors**: Black (`#000000`), Dark Panel (`#111111`), Accent Red (`#E2231A`).

## 2. View Modes

### 2.1 Focus Mode (Default)

_Distraction-free home screen._

- Center: Animated Logo + Floating Input.
- Footer: Minimal status.

### 2.2 Session Mode (Active)

_Productive chat workspace._

- Main: Output stream.
- Sidebar (Optional): Collapsible context.

### 2.3 Multiplex Mode (Process + Agent) 🆕

_The "Sidecar" experience for running processes._

**Philosophical Split**:

- **Interactions Pane (Primary)**: The Agent Chat, Synthesis, and "What do I do
  next?".
- **Focus Pane (Secondary)**: The inner workings—Logs, Sub-processes, `htop`,
  Tools.

**Layout Strategy (Adaptive)**:

#### A. Widescreen (> 140 columns)

_The User's Preferred Layout._

- **Split**: Vertical (Left / Right).
- **Left (60%)**: **Interactions Pane**. The user lives here. It contains the
  logic, synthesis, and chat.
- **Right (40%)**: **Focus Pane**. The raw output of tools/processes.
  - _Rationale_: Keeps the "noisy" logs visible for reference but peripheral to
    the "thinking" work.

#### B. Standard (< 140 columns)

_The Compatibility Layout._

- **Split**: Horizontal (Top / Bottom).
- **Top (70%)**: **Focus Pane**. (Needs height for processes like `htop`).
- **Bottom (30%)**: **Interactions Pane**. (Input anchored to bottom).

## 3. Interaction Model

### 3.1 Multiplex Focus

- **Toggle**: `Ctrl+Tab` cycles focus between Interaction and Focus panes.
- **Visuals**: Active pane gets a Bright White border. Inactive gets Dim Grey.

### 3.2 Mouse

- **Fully Clickable**. Clicking a pane focuses it.

## 4. Components

- **InteractiveBox**: Mouse-aware container.
- **SpotlightDialog**: Floating command palette.

## 5. Migration Strategy

1.  **Brand Refactor**: Update Header.
2.  **Adaptive Views**: Implement `MultiplexView` with a `useTerminalSize()`
    breakpoint to switch between Row/Column flex direction.

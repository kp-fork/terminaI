# tasks_oi.md — "Sovereign Computer" Implementation Plan

> [!IMPORTANT] **Objective**: Upgrade TerminaI's "brain" with stateful REPL
> execution, adaptive intelligence, and smart safety—making it think like Open
> Interpreter but smarter and safer.

---

## Phase 0: Pre-Flight Checks

### 0.1 Dependency Audit

- [/] **Verify `node-pty` availability**
  - Run: `npm ls node-pty` in repo root.
  - If not present: Install via `npm install node-pty -w packages/core`.
  - **Why**: `node-pty` provides proper PTY semantics (resize, signals) vs raw
    `child_process`.

### 0.2 Existing Infrastructure Review

> [!NOTE] `packages/core/src/tools/process-manager.ts` already manages
> background sessions. We should **extend** this pattern rather than reinvent.

- [ ] **Read `process-manager.ts`** (lines 79-97, 311-404)
  - Understand `ProcessSession` interface.
  - Understand `startSession`, `sendInput`, `readOutput`.
- [ ] **Read `shell.ts`** (lines 66-71, 360-673)
  - Understand `BrainContext` integration.
  - Understand how `RiskAssessor` is already called (`evaluateBrain`).

---

## Phase 1: Foundation — `PersistentShell` Class

**Goal**: Create a PTY-backed persistent shell that survives across multiple
`execute_repl` calls.

### 1.1 Create `packages/core/src/computer/PersistentShell.ts`

- [ ] **File**: `packages/core/src/computer/PersistentShell.ts`
- [ ] **Purpose**: Wraps `node-pty` to spawn and manage a persistent shell.
- [ ] **Interface**:

```typescript
export interface PersistentShellOptions {
  language: 'python' | 'shell' | 'node';
  cwd: string;
  env?: Record<string, string>;
  onOutput: (data: string) => void;
  onExit: (code: number | null, signal: string | null) => void;
}

export interface PersistentShell {
  readonly pid: number;
  readonly isAlive: boolean;
  write(code: string): void;
  resize(cols: number, rows: number): void;
  kill(signal?: NodeJS.Signals): void;
  dispose(): void;
}
```

- [ ] **Implementation Details**:
  - Use `node-pty.spawn()` with appropriate command:
    - `python`: `python3 -i -u` (unbuffered, interactive)
    - `shell`: User's default shell (from `process.env.SHELL` or `/bin/bash`)
    - `node`: `node --interactive`
  - Store PTY handle in class field.
  - Implement `write()` to send `code + '\n'` to PTY stdin.
  - Implement `resize()` calling `pty.resize(cols, rows)`.
  - Implement `kill()` calling `pty.kill(signal)`.
  - Implement `dispose()` to clean up listeners and kill if alive.
  - Listen to `pty.onData` and forward to `onOutput`.
  - Listen to `pty.onExit` and forward to `onExit`.

### 1.2 Create `packages/core/src/computer/index.ts`

- [ ] **File**: `packages/core/src/computer/index.ts`
- [ ] **Exports**: `PersistentShell`, `PersistentShellOptions`.

### 1.3 [NEW] Auto-Create Virtual Environment for Python

- [ ] **In `PersistentShell.ts`** when `language === 'python'`:
  - Create temp venv: `python3 -m venv /tmp/terminai-repl-<session-id>`
  - Spawn Python from that venv:
    `/tmp/terminai-repl-<session-id>/bin/python3 -i -u`
  - **Why**: Isolates package installs from user's system Python.

### 1.4 Unit Tests

- [ ] **File**: `packages/core/src/computer/PersistentShell.test.ts`
- [ ] **Test cases**:
  - `spawns python and receives prompt`
  - `executes simple python code and captures output`
  - `maintains state across multiple writes`
  - `handles resize without crash`
  - `kill terminates process`
  - `onExit fires with correct code`
  - `uses venv for python sessions`
- [ ] **Run**:
      `npm run test -w packages/core -- --testPathPattern=PersistentShell`

---

## Phase 2: Session Manager — `ComputerSessionManager`

**Goal**: Manage multiple named persistent shells (like `process-manager.ts` but
for REPLs).

### 2.1 Create `packages/core/src/computer/ComputerSessionManager.ts`

- [ ] **File**: `packages/core/src/computer/ComputerSessionManager.ts`
- [ ] **Purpose**: Singleton that tracks active REPL sessions by name.
- [ ] **Interface**:

```typescript
export interface ReplSession {
  name: string;
  language: 'python' | 'shell' | 'node';
  shell: PersistentShell;
  outputBuffer: string[];
  startedAt: number;
  lastActivityAt: number;
}

export interface ComputerSessionManager {
  hasSession(name: string): boolean;
  getSession(name: string): ReplSession | undefined;
  createSession(
    name: string,
    language: ReplSession['language'],
    cwd: string,
  ): ReplSession;
  executeCode(
    name: string,
    code: string,
    timeoutMs?: number,
  ): Promise<{ output: string; timedOut: boolean }>;
  killSession(name: string, signal?: NodeJS.Signals): void;
  listSessions(): ReplSession[];
  disposeAll(): void;
}
```

- [ ] **Implementation Details**:
  - Store sessions in a `Map<string, ReplSession>`.
  - `createSession`: Spawn `PersistentShell`, store in map.
  - `executeCode`:
    1. Write code to shell.
    2. Wait for output to settle (no new data for 500ms) or timeout.
    3. Return captured output and `timedOut` flag.
  - `killSession`: Call `shell.kill()` and remove from map.
  - `disposeAll`: Kill all sessions (for cleanup on exit).

### 2.2 Register Cleanup Hook

- [ ] **In `packages/cli/src/utils/cleanup.ts`** (or equivalent):
  - Call `ComputerSessionManager.disposeAll()` on process exit.

### 2.3 Unit Tests

- [ ] **File**: `packages/core/src/computer/ComputerSessionManager.test.ts`
- [ ] **Test cases**:
  - `creates and retrieves session`
  - `executeCode returns output`
  - `state persists across executeCode calls`
  - `killSession terminates and removes`
  - `listSessions returns all active`
- [ ] **Run**:
      `npm run test -w packages/core -- --testPathPattern=ComputerSessionManager`

---

## Phase 3: Gemini Tool — `execute_repl`

**Goal**: Expose REPL execution as a tool the LLM can call via native function
calling.

### 3.1 Create `packages/core/src/tools/repl.ts`

- [ ] **File**: `packages/core/src/tools/repl.ts`
- [ ] **Tool Name**: `execute_repl`
- [ ] **Parameters**:

```typescript
interface ReplToolParams {
  language: 'python' | 'shell' | 'node';
  code: string;
  session_name?: string; // Optional, defaults to "default_<language>"
  timeout_ms?: number; // Optional, defaults to 30000
}
```

- [ ] **Implementation Details**:
  1. Resolve session name (default if not provided).
  2. Get or create session via `ComputerSessionManager`.
  3. **CALL `RiskAssessor`** before execution (mirror `shell.ts` pattern):
     - Use `assessRisk(code, null, systemContext, model)`.
     - Use `routeExecution(assessment)` to get decision.
     - If `requiresConfirmation` and not auto-approved, yield confirmation.
  4. Call `executeCode(sessionName, code, timeoutMs)`.
  5. Apply output truncation (head/tail if > 200 lines).
  6. Return `ToolResult` with output.

### 3.2 Register Tool

- [ ] **In `packages/core/src/tools/tool-registry.ts`**:
  - Import `ReplTool`.
  - Add to `coreTools` array.

### 3.3 Tool Description

- [ ] **Description for LLM**:

```
Execute code in a persistent REPL session. Variables and imports persist across calls.
- Use `language: "python"` for Python (data analysis, scripting).
- Use `language: "shell"` for bash commands (system operations).
- Use `language: "node"` for JavaScript/TypeScript.
The session remains active until explicitly killed or the user exits.
```

### 3.4 [NEW] Update System Prompt with "Adaptive Intelligence"

- [ ] **File**: Find system prompt location (likely `packages/core/src/prompts/`
      or `packages/core/src/core/`)
- [ ] **Add directive**:

```
When solving problems, use adaptive intelligence—pick the simplest solution that works:

1. **For simple, known operations** (delete a file, check status): Use tools directly.
2. **For unknown problems** (fix my wifi): Start with diagnostic tools. If stuck, escalate to code.
3. **For data/exploration tasks** (analyze this log): Go straight to the REPL.
4. **For transformation tasks** (convert docs to PDF): Check for existing programs first, then code if needed.

When using the REPL:
- Variables persist across calls—build up your solution step by step.
- If code fails, read the error carefully and adjust your approach.
- Start small: inspect before modifying.
```

### 3.5 [NEW] Add State Summary Injection

- [ ] **In `repl.ts` tool result**:
  - After execution, silently run a state inspection command:
    - Python: `[v for v in dir() if not v.startswith('_')]`
    - Node: `Object.keys(global).filter(k => !k.startsWith('_'))`
    - Shell: `compgen -v | head -20`
  - Append to tool result: "Session state: `df` (DataFrame), `config` (dict)..."
  - **Why**: Prevents "amnesia"—LLM always knows what it defined.

### 3.6 [NEW] Add Error Recovery Guidance

- [ ] **In `repl.ts` when output contains error/traceback**:
  - Detect error patterns (Python traceback, shell error codes).
  - Append to result: "⚠️ Error detected. Review the traceback above and try a
    fix."
  - **Why**: Encourages LLM to iterate rather than give up.

### 3.7 Integration Tests

- [ ] **File**: `packages/core/src/tools/repl.test.ts`
- [ ] **Test cases**:
  - `executes python code and returns output`
  - `state persists across multiple tool calls`
  - `risk assessment blocks dangerous code`
  - `timeout triggers on infinite loop`
  - `output truncation works for large output`
  - `state summary is appended to result`
  - `error recovery guidance appears on failure`
- [ ] **Run**: `npm run test -w packages/core -- --testPathPattern=repl`

---

## Phase 4: Safety — Loop Detection & Clean Exit

**Goal**: Detect runaway processes and terminate them cleanly.

### 4.1 Implement Timeout in `executeCode`

- [ ] **In `ComputerSessionManager.executeCode`**:
  - Default timeout: 30 seconds.
  - If timeout fires, call `shell.kill('SIGINT')` first.
  - Wait 2 seconds.
  - If still alive, call `shell.kill('SIGKILL')`.
  - Return `{ output, timedOut: true }`.

### 4.2 Implement Output Rate Limiter

- [ ] **In `PersistentShell.onOutput` handler**:
  - Track lines received per second.
  - If > 500 lines/second for > 3 seconds, trigger auto-kill.
  - Return error to LLM: "Output rate exceeded limit. Process terminated."

### 4.3 Unit Tests

- [ ] **Test cases**:
  - `infinite loop is killed after timeout`
  - `output flood triggers rate limit kill`
  - `clean exit returns correct code`

---

## Phase 5: Output Truncation

**Goal**: Prevent large outputs from flooding the context.

### 5.1 Implement `truncateOutput` Utility

- [ ] **File**: `packages/core/src/computer/truncateOutput.ts`
- [ ] **Function**:

```typescript
function truncateOutput(output: string, maxLines: number = 200): string {
  const lines = output.split('\n');
  if (lines.length <= maxLines) return output;
  const headCount = Math.floor(maxLines * 0.6);
  const tailCount = maxLines - headCount;
  const hidden = lines.length - maxLines;
  return [
    ...lines.slice(0, headCount),
    `\n... [${hidden} lines hidden] ...\n`,
    ...lines.slice(-tailCount),
  ].join('\n');
}
```

### 5.2 Integrate in `repl.ts`

- [ ] Call `truncateOutput` on result before returning `ToolResult`.

---

## Phase 6: TUI Integration (Post UI Migration)

> [!NOTE] This phase depends on `UIarchitecture.md` MultiplexView being
> implemented first.

### 6.1 Connect REPL Output to Focus Pane

- [ ] **In `packages/cli/src/ui/views/MultiplexView.tsx`**:
  - Add state for active REPL session output.
  - Subscribe to `ComputerSessionManager` output events.
  - Render output in `FocusPane`.

### 6.2 Add Keyboard Shortcut for REPL Kill

- [ ] **Shortcut**: `Ctrl+C` in Focus Pane sends `SIGINT` to active REPL.
- [ ] **Shortcut**: `Ctrl+Shift+K` kills active REPL session.

---

## Verification Plan

### Automated

| Command                                                                     | What it Tests      |
| --------------------------------------------------------------------------- | ------------------ |
| `npm run test -w packages/core -- --testPathPattern=PersistentShell`        | PTY wrapper        |
| `npm run test -w packages/core -- --testPathPattern=ComputerSessionManager` | Session management |
| `npm run test -w packages/core -- --testPathPattern=repl`                   | Tool integration   |
| `npm run typecheck -w packages/core`                                        | Type safety        |
| `npm run preflight`                                                         | Full build + lint  |

### Manual

1. Start TerminaI: `npm run dev -w packages/cli`
2. Ask LLM: "Define x = 5 in Python"
3. Verify LLM calls `execute_repl` with `language: python, code: "x = 5"`.
4. Ask LLM: "Print x"
5. Verify LLM calls `execute_repl` with `code: "print(x)"` and output is "5".
6. Verify tool result includes state summary mentioning `x`.
7. Ask LLM: "Run an infinite loop in Python"
8. Verify timeout triggers and process is killed.
9. Verify error message returned to LLM.

---

## Summary

| Phase     | Deliverable                                                            | Effort             |
| --------- | ---------------------------------------------------------------------- | ------------------ |
| 0         | Pre-flight checks                                                      | 0.5 day            |
| 1         | `PersistentShell.ts` + venv isolation                                  | 2.5 days           |
| 2         | `ComputerSessionManager.ts`                                            | 1 day              |
| 3         | `execute_repl` tool + system prompt + state injection + error guidance | 2.5 days           |
| 4         | Loop detection + kill                                                  | 1 day              |
| 5         | Output truncation                                                      | 0.5 day            |
| 6         | TUI integration                                                        | 1-2 days (post UI) |
| **TOTAL** |                                                                        | **9-11 days**      |

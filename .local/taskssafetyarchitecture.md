# Tasks: Implementing the New Safety Architecture

This document is an execution checklist for adapting the current TermAI codebase
to the safety architecture described in `safetyarchitecture.md`.

It is written so an agent (or a new contributor) can implement the architecture
step-by-step without needing to infer intent.

---

## Golden Rules (do not deviate)

1. **Deterministic minimum review level (A/B/C) gates execution.**
2. **The LLM/brain may only escalate caution**, never downgrade below the
   deterministic minimum.
3. **Everything is possible with explicit consent**, but consent must be
   proportional:
   - Level A: no approval
   - Level B: click-to-approve + clear explanation
   - Level C: click-to-approve + clear explanation + 6-digit PIN
4. **PIN is user-set in config**, stored as a 6-digit string, default
   `"000000"`.

---

## Pre-flight (before making changes)

### P0. Read the relevant files once

- `safetyarchitecture.md`
- `packages/core/src/tools/shell.ts`
- `packages/core/src/utils/shell-utils.ts`
- `packages/core/src/utils/shell-permissions.ts`
- `packages/core/src/policy/policy-engine.ts`
- `packages/core/src/safety/` (especially `checker-runner.ts`, `built-in.ts`)
- `schemas/settings.schema.json`
- CLI confirmation UX (search for tool confirmation UI):
  - `rg -n "ToolExecuteConfirmationDetails|Confirm .*Command|ToolConfirmationOutcome" packages/cli packages/desktop`

### P1. Ensure tests run locally

Run:

- `npx vitest run packages/core/src/utils/shell-permissions.test.ts`
- `npx vitest run packages/core/src/utils/shell-utils.test.ts`
- `npx vitest run packages/core/src/brain/__tests__/riskAssessor.test.ts`

If this baseline fails, stop and fix baseline first.

---

## Phase 1 — Introduce a Central “Approval Ladder” Module (A/B/C)

### Goal

Create a single, shared, deterministic module that:

- builds an `ActionProfile` for a tool call
- computes the **minimum required review level** (A/B/C)
- emits a structured “why” explanation (for the UI and logs)

### Task 1.1 — Define shared types

**Create** `packages/core/src/safety/approval-ladder/types.ts`

Add:

- `export type ReviewLevel = 'A' | 'B' | 'C';`
- `export type OperationClass = 'read' | 'write' | 'delete' | 'privileged' | 'network' | 'process' | 'device' | 'unknown';`
- `export type Provenance = 'local_user' | 'web_remote_user' | 'model_suggestion' | 'workspace_file' | 'web_content' | 'tool_output' | 'unknown';`

Define:

- `export type ActionProfile = { toolName: string; operations: OperationClass[]; roots: string[]; touchedPaths: string[]; outsideWorkspace: boolean; usesPrivilege: boolean; hasUnboundedScopeSignals: boolean; parseConfidence: 'high' | 'medium' | 'low'; provenance: Provenance[]; rawSummary: string; };`
- `export type DeterministicReviewResult = { level: ReviewLevel; reasons: string[]; requiresClick: boolean; requiresPin: boolean; };`

Acceptance criteria:

- `tsc` passes.
- No tool behavior changes yet.

### Task 1.2 — Implement minimum review computation

**Create**
`packages/core/src/safety/approval-ladder/computeMinimumReviewLevel.ts`

Implement:

- `export function computeMinimumReviewLevel(profile: ActionProfile): DeterministicReviewResult`

Required deterministic rules (minimum set; do not “handwave”):

1. Start with `A`.
2. If `profile.parseConfidence === 'low'` → `C` (cannot safely reason about
   action).
3. If `profile.operations` includes `device` → `C`
4. If `profile.operations` includes `delete`:
   - if `hasUnboundedScopeSignals === true` → `C`
   - else → at least `B`
5. If `profile.operations` includes `privileged` → at least `B`, and if
   `outsideWorkspace === true` → `C`
6. If `profile.operations` includes `network` and provenance includes
   `web_content` or `workspace_file` → at least `B`
7. If `outsideWorkspace === true`:
   - bump one level (A→B, B→C)
8. If provenance includes `web_remote_user` and action is not pure `read` → bump
   one level

Map level→requirements:

- A: `requiresClick=false`, `requiresPin=false`
- B: `requiresClick=true`, `requiresPin=false`
- C: `requiresClick=true`, `requiresPin=true`

Acceptance criteria:

- New unit tests exist and pass (see Task 1.3).

### Task 1.3 — Add unit tests for the ladder

**Create**
`packages/core/src/safety/approval-ladder/__tests__/computeMinimumReviewLevel.test.ts`

Write table-driven tests:

- read-only inside workspace → A
- `git commit` inside workspace → A (write but reversible and bounded)
- `git push --force` inside workspace → B
- `rm -rf someDir` inside workspace (bounded) → B
- `rm -rf ~` or `rm -rf /` or “delete all” signals → C
- privileged command outside workspace bump → C
- parseConfidence low → C

Run:

- `npx vitest run packages/core/src/safety/approval-ladder/__tests__/computeMinimumReviewLevel.test.ts`

---

## Phase 2 — Deterministic Action Profiling for Shell

### Goal

Before any shell execution, deterministically compute an `ActionProfile` from
the command.

### Task 2.1 — Implement shell action profiling

**Create** `packages/core/src/safety/approval-ladder/buildShellActionProfile.ts`

Implement:

- `export function buildShellActionProfile(args: { command: string; cwd: string; workspaces: string[]; provenance?: Provenance[] }): ActionProfile`

How to build profile (exact steps):

1. Normalize `command` with existing utilities:
   - `stripShellWrapper(command)`
2. Parse shell structure using existing parser:
   - `parseCommandDetails(command)`
   - If parser returns `null` or `hasError === true` → set
     `parseConfidence='low'`
3. Extract `roots`:
   - use `getCommandRoots(command)` if parseConfidence is not low
   - else set `roots=[]`
4. Classify operations from parsed text and roots:
   - `read`: default if no other class detected
   - `write`: redirections (`>`/`>>`), `mv`, `cp`, `tee`, package managers
     installing, etc.
   - `delete`: `rm`, `rmdir`, `unlink`, `git clean`, etc.
   - `privileged`: `sudo`, `doas`, `su -c`
   - `network`: `curl`, `wget`, `scp`, `ssh`, `nc`, `rsync` with remote targets
   - `process`: `kill`, `pkill`, `systemctl`, `service`, `launchctl`
   - `device`: `dd`, `mkfs`, `fdisk`, `parted`, writes to `/dev/*` Use a small,
     explicit mapping table in this file (do not scatter patterns across the
     repo).
5. Determine `outsideWorkspace`:
   - If command contains absolute paths, resolve them to canonical paths and
     check if any are outside `workspaces`.
   - Minimum requirement: treat obvious targets `/`, `~`, `/home/*`, `/etc/*`,
     `/var/*` as outside workspace unless the workspace includes them.
6. Determine `hasUnboundedScopeSignals`:
   - true if command targets `/` or `~`, or includes obvious “all”/wildcard +
     delete primitives (e.g., `rm -rf *`, `rm -rf .`, “delete all”, etc.)

Acceptance criteria:

- Function returns stable, bounded fields.
- If parsing fails, `parseConfidence='low'` and minimum review should become C.

### Task 2.2 — Add shell profiling tests

**Create**
`packages/core/src/safety/approval-ladder/__tests__/buildShellActionProfile.test.ts`

Test:

- `free -h` → read, parseConfidence not low, A
- `rm -rf /` → delete + hasUnboundedScopeSignals true → C
- `sudo rm -rf someDir` outside workspace → privileged+delete + bump → C
- `git commit -am "x"` → write but should still map to A _after_ minimum review
  rules are applied (verify via computeMinimumReviewLevel)

Run:

- `npx vitest run packages/core/src/safety/approval-ladder/__tests__/buildShellActionProfile.test.ts`

---

## Phase 3 — Wire A/B/C into ShellTool Confirmation Flow

### Goal

ShellTool must:

- compute `ActionProfile`
- compute minimum A/B/C
- if B or C: generate plain-English explanation (brain) and require approval
- if C: require PIN

### Task 3.1 — Add approval level to confirmation details

Find the confirmation details type used by shell confirmations:

- `packages/core/src/tools/tools.ts` (search for
  `ToolExecuteConfirmationDetails`)

Add fields to the confirmation payload:

- `reviewLevel: 'A' | 'B' | 'C'`
- `requiresPin?: boolean`
- `pinLength?: number` (set to `6` when requiresPin)
- `explanation?: string` (plain-English ramifications summary to show above the
  command)

Acceptance criteria:

- All callers updated.
- TypeScript compile passes.

### Task 3.2 — Compute minimum review in `ShellToolInvocation.getConfirmationDetails`

Edit `packages/core/src/tools/shell.ts` in
`ShellToolInvocation.getConfirmationDetails`:

1. Build `ActionProfile` using `buildShellActionProfile`.
   - `cwd`: `this.config.getTargetDir()`
   - `workspaces`: from workspace context (`this.config.getWorkspaceContext()`
     exposes roots)
   - provenance: default `['model_suggestion']` (until provenance is fully
     threaded through)
2. Compute `minimumReviewLevel` using `computeMinimumReviewLevel(profile)`.
3. Apply rule: if minimum is `A` and allowlist permits, skip confirmation.
4. If minimum is `B` or `C`, always show a confirmation dialog.
5. Populate confirmation payload with:
   - `reviewLevel`
   - `requiresPin` + `pinLength=6` for C
   - `explanation` (see Task 3.3)

Acceptance criteria:

- Level C commands always require confirmation even if allowlisted.
- The brain can still request confirmation, but cannot downgrade below minimum.

### Task 3.3 — Generate the “plain-English ramifications” text

Add a new prompt for consent explanation:

- **Create** `packages/core/src/brain/prompts/consentExplanation.ts`

Prompt output must be structured JSON:

- `whatIWillDo` (short)
- `directEffects` (bullets)
- `indirectRisks` (bullets)
- `rollbackPlan` (bullets or “not possible”)
- `unknowns` (bullets)

In `packages/core/src/tools/shell.ts`, before showing confirmation for B/C:

- call a model adapter to generate this JSON
- render it into a user-facing explanation string
- if the model fails, fall back to a deterministic explanation built from
  ActionProfile (“This command deletes files recursively… targets root/home…”)

Acceptance criteria:

- Confirmation always contains a human-readable explanation even when model
  fails.

---

## Phase 4 — Implement the 6‑Digit PIN (Config + UX + Verification)

### Goal

For Level C, TermAI must prompt for a 6-digit PIN and verify it against config.

### Task 4.1 — Add config field and schema

1. Update `schemas/settings.schema.json`:
   - Add `security.approvalPin` (string, exactly 6 digits)
   - Default `"000000"`
2. Update config types and getters:
   - `packages/core/src/config/config.ts` (or the correct config module used by
     core)
   - Add `getApprovalPin(): string`
3. Ensure CLI loads it from settings correctly.

Acceptance criteria:

- If unset, `getApprovalPin()` returns `"000000"`.

### Task 4.2 — Extend confirmation bus to collect PIN for Level C

1. Extend the confirmation request/response types:
   - `packages/core/src/confirmation-bus/types.ts` (search for payloads)
2. Add a new field in the confirmation response:
   - `pin?: string`
3. Update core tool invocation flow to pass the entered PIN back to the tool
   invocation.

Acceptance criteria:

- Existing non-PIN confirmations unaffected.

### Task 4.3 — Add UI prompt for PIN (CLI)

Locate where confirmations are rendered in the CLI:

- Search in `packages/cli/src/ui/` for the confirmation dialog component.

Implement:

- When confirmation details say `requiresPin=true`, show an input field:
  - accept only digits
  - mask input
  - enforce length 6
  - do not log the PIN to transcript or debug logs

Acceptance criteria:

- User cannot submit with fewer/more than 6 digits.

### Task 4.4 — Verify PIN in core before execution

In `packages/core/src/tools/shell.ts` (and later other tools):

- On confirmation response:
  - if `requiresPin` and `pin !== this.config.getApprovalPin()` → abort
    execution with a clear error
  - do not attempt execution at all on mismatch

Write tests:

- **Create** `packages/core/src/tools/__tests__/shell.pin.test.ts` (or add to
  existing `shell.test.ts`)
- Validate that a Level C command rejects on wrong pin and proceeds on correct
  pin.

---

## Phase 5 — Apply the Same Model to File Tools (Write/Delete)

### Goal

All file-modifying tools must compute a minimum review level and use B/C
confirmations consistently.

### Task 5.1 — Build file action profiles

Create:

- `packages/core/src/safety/approval-ladder/buildFileActionProfile.ts`

Handle at least:

- `write_file`
- `replace`
- `file_ops` (mkdir/move/copy/delete)

Profile rules:

- `delete` + recursive/overwrite → elevate
- outside workspace → bump one level
- ambiguous/glob paths → treat as unbounded scope signal

### Task 5.2 — Wire file tools into ladder

Edit each tool’s confirmation flow:

- Ensure Level C requires PIN
- Ensure LLM explanations are used when available, deterministic fallback
  otherwise

Acceptance criteria:

- Deleting outside workspace bumps tier
- Recursive delete is always C

---

## Phase 6 — Policy Engine: “Admin Deny” vs “Safety Escalate”

### Goal

Distinguish between:

- **Admin deny**: never permitted (enterprise policy)
- **Safety escalate**: permitted with stronger consent (B/C)

### Task 6.1 — Add a “deny category” concept

Option A (simplest): extend policy rules with metadata.

- Update `packages/core/src/policy/types.ts` to include a
  `denyCategory?: 'admin' | 'safety'`
- TOML loader (`packages/core/src/policy/toml-loader.ts`) must parse it

Option B (no schema changes): treat denies from safety checkers as “safety” and
denies from explicit policy rules as “admin”.

Pick one and implement it consistently.

### Task 6.2 — Map policy decision into review ladder

When policy returns `DENY`:

- If admin-deny → block with message (no override)
- If safety-deny → convert into minimum review `C` and require PIN + explicit
  explanation

Acceptance criteria:

- Admin policy can truly block tools.
- Safety checkers can escalate rather than permanently block.

---

## Phase 7 — Provenance Threading (Optional but Recommended)

### Goal

Actually pass provenance signals into ActionProfile.

Tasks:

- Define where provenance lives in runtime state (session, message metadata).
- Thread provenance into tool invocation constructors (shell + file tools).
- Populate provenance for:
  - web-remote actions
  - model-suggested tool calls
  - commands derived from workspace file content

Acceptance criteria:

- OutsideWorkspace + provenance bumps behave deterministically and are testable.

---

## Phase 8 — Documentation + Maintenance

### Task 8.1 — Keep docs in sync

- Ensure `safetyarchitecture.md` remains accurate.
- Add “how to configure PIN” to README or docs hub if needed.

### Task 8.2 — Add a regression test suite

Create a small set of “safety invariants” tests that must never break:

- Level C requires PIN (for representative commands)
- parse failure never results in Level A
- outsideWorkspace bumps at least one tier

Run:

- `npx vitest run packages/core/src/safety/approval-ladder/__tests__`

---

## Completion Checklist (definition of done)

1. Shell tool uses deterministic A/B/C minimum review level.
2. Level C prompts for PIN and verifies against config (`security.approvalPin`,
   default `"000000"`).
3. Confirmation UI shows a plain-English ramifications explanation
   (LLM-generated when available, deterministic fallback otherwise).
4. The brain cannot downgrade below minimum review.
5. Tests cover ladder rules + PIN verification + parse-failure behavior.

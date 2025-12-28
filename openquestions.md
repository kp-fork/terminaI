## Open Questions (Expanded)

These must be answered (by maintainers/product) before committing to certain
architectural bets; otherwise teams will optimize in conflicting directions.

### 1) What is the formal definition of “audit trail” for TerminaI?

Decide which of these is required for v1 “governed operator” credibility:

- **A. Debug log**: best-effort text logs for troubleshooting.
- **B. Audit log**: structured, queryable evidence of actions + approvals.
- **C. Non-repudiable ledger**: tamper-evident chain (hash chain or signing)
  with export/verification.

Concrete decisions needed:

- What must be recorded: tool args? file diffs? command outputs? truncated
  outputs? environment metadata? policy decisions and reasons?
- What must be redacted (API keys, tokens, secrets, file contents) and at what
  layer (before write vs during export)?
- Retention and storage location expectations (per user, per workspace, per
  session).
- Is audit required for _all_ execution surfaces (CLI, desktop, A2A, relay) on
  day one?

### 2) What is the authority model for the “brain”?

Pick one (explicitly):

- **Advisory-only**: brain can suggest, plan, inject prompts, and request
  previews, but never changes minimum review requirements.
- **Governance assistant**: brain can escalate (require higher review or extra
  verification) but cannot downgrade deterministic minimums.
- **Governing component**: brain can block or enforce additional deterministic
  checks.

If you ever want (C), you must define:

- What parts must be deterministic vs model-based.
- How to test and prove non-regression (golden traces, scenario suites, property
  tests).
- How to bound cost and latency (no unbounded multi-call “thinking” in default
  paths).

### 3) What is “operator-grade PTY” in this project?

You need a spec for PTY semantics, otherwise desktop work will drift.

- Required behaviors: resize, child process tracking, kill/terminate, signal
  handling, input echo, password prompt routing, background tasks, log capture.
- Backpressure and output bounding strategy.
- Cross-platform parity targets: Linux/macOS/Windows expectations.
- Security integration: how approvals and policy decisions gate PTY operations.

### 4) What is the default stance for remote features?

Clear product/security stance needed:

- Is remote execution **disabled by default** everywhere, requiring explicit
  user enablement each session?
- If enabled on loopback: what additional friction exists for non-loopback
  binds?
- How is provenance labeled (“web remote user”) and how does that affect review
  level and tool allowlists?
- Are there different roles/scopes (read-only vs execute) for remote clients,
  and how are they enforced?

### 5) What is the desired upstream relationship over the next 6–12 months?

Compatibility has a cost; you must choose where you’ll accept divergence.

- What % of time is reserved for upstream merges?
- Is provider neutrality a near-term goal, or do you accept deeper Gemini
  coupling short-term to ship governance?
- What “hostile rebrand” changes are mandatory now vs later?

### 6) What are the non-negotiable safety invariants?

Examples that must be answered:

- Are there any actions that must be _impossible_ (hard deny), or is “everything
  possible with explicit confirmation” absolute?
- What is the minimum review behavior for actions outside workspace,
  device-level ops, privileged ops, and remote-sourced actions?
- Should “YOLO” mode be allowed at all, and if so under what explicit audit
  guarantees?

### 7) What is the “moat MVP” for the next 90 days?

Pick the primary wedge (and accept tradeoffs explicitly):

- Governance + audit as the moat (enterprise “governed operator”).
- Recipes as the moat (verified system operator playbooks).
- Desktop automation as the moat (universal operator wedge).
- Brain as the moat (measurable autonomy improvements).

Define how it will be measured (activation, retention, success-rate, audit
coverage, support ticket reduction).

### 8) What is the trust & permission model for recipes?

Decisions needed before implementing a recipe ecosystem:

- Where recipes live (built-in vs user vs shared/team) and how they are
  discovered.
- Whether recipes can request higher review levels (they should be able to
  escalate, never downgrade).
- Whether third-party recipes must be signed and how permissions are expressed.
- What must be recorded in the audit ledger for recipe execution (inputs,
  previews, approvals, outcomes).

### 9) What is the stance on “local code execution” inside the brain?

Given `FW_SCRIPT` can execute generated code via `REPLManager`, decide:

- Is this allowed at all? If yes, must it be routed through tool approvals?
- Is it disabled by default? Is it interactive-only? Is it sandboxed?
- What is the budget and the maximum blast radius (timeouts, fs/network access)?

### 10) What is the operator-grade safety contract for GUI automation?

- What is the minimum review level for UI actions (`ui.click`, `ui.type`)?
- What redaction is required for typed text and captured snapshots?
- What deterministic bounds exist (max actions/minute, max snapshot depth)?
- What are the platform parity expectations (Linux AT-SPI vs Windows UIA)?

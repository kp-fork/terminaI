# The Four Pillars for Agentic Fork Maintenance

## Jules Capability Confirmation ✅

| Question                         | Answer                                                     |
| -------------------------------- | ---------------------------------------------------------- |
| Can Jules run on a schedule?     | **No** — Needs GitHub Action to trigger                    |
| Can Jules fetch upstream & diff? | **Yes** — Full shell access to git commands                |
| Can Jules classify commits?      | **Yes** — Analyze diffs and categorize                     |
| Can Jules create PRs?            | **Partial** — Can push branch, but not toggle "draft" flag |

**Confirmed Architecture:**

```
GitHub Action (cron)          Jules (on issue created)
Every Friday 9 AM UTC              │
       │                           ▼
       ▼                   ┌───────────────────┐
Creates issue ─────────────▶ Wakes up, reads   │
assigned to Jules          │ prompt, executes: │
                           │ - git fetch       │
                           │ - git diff        │
                           │ - classify        │
                           │ - push branch     │
                           └───────────────────┘
```

---

## 1. Workflow — The Repeatable Process

**Trigger:** Weekly cron or GitHub Action

**Steps:**

1. **Fetch** — `git fetch upstream` (automated)
2. **Diff** — Generate a summary of new commits (automated)
3. **Classify** — For each commit: Security? Feature? Irrelevant?
   (agent-assisted)
4. **Route** —
   - If file is in "Core Zone" → git merge that file (E.g. core backbone)
   - If file is in "Fork Zone" → extract diff, create task spec (e.g., MCP, A2A)
   - **if file is in "Irrelevant Zone" → skip (e.g., google telemetry, IDE
     integrations, CLI UX, json???)**

_Yes, "Irrelevant Zone" is valid. Looking at upstream releases, I'd classify:_

- _IRRELEVANT: `telemetry/_`, `clearcut/_`, holiday themes, IDE-specific
  (vscode-ide-companion), internal Google tooling_
- _CORE: `tools/_`, `mcp/_`, `prompts/_`, security fixes, policy engine\*
- _FORK: `logger.ts`, branding, voice/_, evolution-lab/\*

5. **Implement** — Agent executes merge or reimplementation
6. **Verify** — `npm run test:ci` must pass
7. **Log** — Record what was absorbed

**The key decision:** Classification should happen before any git merge attempt.
You want to know upfront which files will conflict.

---

## 2. Harness — The Tooling That Makes It Repeatable

**Artifacts needed:**

| Artifact                               | Purpose                                             |
| -------------------------------------- | --------------------------------------------------- |
| `FORK_ZONES.md`                        | Declares which files are Core vs Fork vs Irrelevant |
| `.upstream/patches/`                   | Directory to store extracted diffs                  |
| `.upstream/absorption-log.md`          | Track what's been absorbed                          |
| `.github/workflows/upstream-check.yml` | Automated weekly fetch + diff summary               |

**The critical piece:** A script (or agent task) that can:

1. Take an upstream commit hash
2. Check if affected files are in Core or Fork zone
3. If Core: attempt merge, report success/failure
4. If Fork: extract diff, generate task spec, save to
   **.upstream/WeekOfYYYYMMDD/**

This is your "upstream intake" harness.

**I really prefer this to be automated 100%. can we even task jules on this?**

_Yes, but with caveats:_

- _Jules can run the **fetch + classify + draft PR** steps autonomously_
- _Jules CANNOT approve its own merges (human gate required)_
- _The workflow: Jules creates a PR with the merge/reimplementation, you review,
  you merge_
- _For 100% automation: you'd need to trust CI as the only gate (risky for
  security patches)_

_Practical suggestion: Jules drafts, you approve. That's 95% automated, with
human in the loop for the 5% that matters._

---

## 3. Guardrails — What Prevents Disasters

| Risk                           | Guardrail                                                                         |
| ------------------------------ | --------------------------------------------------------------------------------- |
| Agent merges broken code       | CI must pass before any merge to main                                             |
| Security fix is misimplemented | For security patches: require test that specifically validates the fix            |
| Drift in forked files          | Periodic audit: "Does our logger.ts still fulfill the same contract as upstream?" |
| Missing a critical patch       | Weekly monitoring is non-negotiable; automate to Slack/email                      |
| Agent hallucinates a "fix"     | Never auto-merge agent output; human reviews diff before push                     |

**The hardest guardrail:** For security patches, you can't just trust "tests
pass." You need a test that _proves_ the vulnerability is fixed. This is where
you might ask the agent: "Write a test that exploits the vulnerability described
in this CVE, then implement the fix, then verify the test fails before and
passes after."

---

## 4. Coordination — Who/What Does What

| Actor                 | Role                                                                |
| --------------------- | ------------------------------------------------------------------- |
| **GitHub Action**     | Automated: weekly fetch, generate diff summary, post to Slack/issue |
| **Human (You)**       | Decision: which commits to absorb, approve final PRs                |
| **Agent (Weekly)**    | Classification: read diff summary, categorize commits               |
| **Agent (On-demand)** | Implementation: merge or reimplement based on zone                  |
| **CI**                | Verification: all merges must pass test:ci                          |

**The coordination pattern:**

1. Automation surfaces what's new (low-trust, high-frequency)
2. Agent classifies and drafts (medium-trust)
3. Human approves (high-trust, low-frequency)
4. CI enforces quality (gate)

---

## The Open Design Question

**How granular should FORK_ZONES.md be?**

**Option A: File-level**

```
CORE: packages/core/src/tools/*
FORK: packages/core/src/core/logger.ts
```

**Option B: Directory-level**

```
CORE: packages/core/src/tools/
FORK: packages/core/src/core/
```

**Option C: Pattern-based**

```
CORE: **/*.ts EXCEPT logger.ts, terminai.ts, voice/*
```

**My recommendation:** Start with explicit file-level for Fork zone (it's
small), and implicit "everything else is Core." This keeps the list manageable
while being precise about what we've diverged.

---

## Mining Upstream GitHub

**Can you also review the github of gemini cli to see if we can mine any other
details beyond a git diff - e.g., priority / items / tickets that made it into
each release or weekly diff...?**

_Yes! I just checked. Here's what's available:_

### What We Can Mine

| Source              | URL                      | Value                                                 |
| ------------------- | ------------------------ | ----------------------------------------------------- |
| **Releases page**   | `/releases`              | Each release has "What's Changed" with PR links       |
| **PR numbers**      | `#15601`, `#15587`, etc. | Each PR has description, labels, linked issues        |
| **Labels**          | On PRs                   | Look for `security`, `bug`, `feat`, `breaking-change` |
| **Commit messages** | Prefixed                 | `fix:`, `feat:`, `chore:`, `refactor:` convey intent  |

### Example from Today's Upstream (v0.24.0-nightly)

| PR     | Title                                                       | Priority for Us                   |
| ------ | ----------------------------------------------------------- | --------------------------------- |
| #15601 | enable granular shell command allowlisting in policy engine | 🔴 SECURITY - absorb              |
| #15589 | extract static concerns from CoreToolScheduler              | 🟢 Refactor - skip                |
| #15587 | Resolve unhandled promise rejection in ide-client.ts        | 🟡 Bug fix - consider             |
| #15494 | Show snowfall animation for holiday theme                   | ⚪ IRRELEVANT - skip              |
| #15485 | Add A2A Client Manager and tests                            | 🟡 Feature - absorb if we use A2A |

_Recommendation: The weekly workflow should fetch the releases page, extract PR
numbers, and the agent classifies based on PR title + labels + files changed._

---

# End-to-End Specification: Weekly Upstream Sync

## Overview

| Day          | Actor             | Action                             |
| ------------ | ----------------- | ---------------------------------- |
| **Friday**   | Jules (automated) | Fetch upstream, classify, draft PR |
| **Saturday** | Human (you)       | Review PR, approve/reject          |
| **Saturday** | CI                | Run tests on merge                 |

---

## Step 1: Setup (One-Time)

### 1.1 Add Upstream Remote

```bash
git remote add upstream https://github.com/google-gemini/gemini-cli.git
```

### 1.2 Create FORK_ZONES.md

Create file: `docs-terminai/FORK_ZONES.md`

```markdown
# Fork Zone Classification

## IRRELEVANT (auto-skip)

- Google-specific telemetry (clearcut/_, telemetry/_)
- IDE integrations (vscode-ide-companion/\*)
- Seasonal/cosmetic (holiday themes, snowfall)
- Version bump chores

## FORK (reimplement from intent)

- packages/core/src/core/logger.ts — JSONL format
- packages/core/src/core/logger.test.ts — Updated tests
- packages/cli/src/gemini.tsx → terminai.tsx — Entry renamed
- packages/cli/src/voice/\* — TerminaI addition
- packages/evolution-lab/\* — TerminaI addition
- .terminai/\* config — Branding divergence
- README.md, package.json (name) — Branding

## CORE (merge or apply directly)

- packages/core/src/tools/\* — New tools
- packages/core/src/mcp/\* — MCP improvements
- packages/core/src/prompts/\* — Prompt updates
- Security fixes (any zone)
- Policy engine updates
- Bug fixes in non-forked files
```

### 1.3 Create Upstream Directory Structure

```bash
mkdir -p .upstream/patches
touch .upstream/absorption-log.md
```

### 1.4 Create GitHub Action

Create file: `.github/workflows/upstream-sync.yml`

```yaml
name: Weekly Upstream Sync
on:
  schedule:
    - cron: '0 14 * * FRI' # Every Friday at 2 PM UTC (8 AM CST)
  workflow_dispatch: # Manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Add upstream remote
        run: |
          git remote add upstream https://github.com/google-gemini/gemini-cli.git || true
          git fetch upstream

      - name: Generate diff summary
        run: |
          WEEK=$(date +%Y%m%d)
          mkdir -p .upstream/patches/$WEEK

          # Get new commits
          git log --oneline HEAD..upstream/main > .upstream/patches/$WEEK/commits.txt

          # Get changed files
          git diff --name-only HEAD..upstream/main > .upstream/patches/$WEEK/files.txt

          # Generate full diff
          git diff HEAD..upstream/main > .upstream/patches/$WEEK/full.diff

      - name: Create draft PR
        uses: peter-evans/create-pull-request@v5
        with:
          title: '[Upstream Sync] Week of ${{ github.run_id }}'
          body: |
            ## Upstream Changes Detected

            Jules has detected new commits from google-gemini/gemini-cli.

            ### Action Required
            1. Review commits in `.upstream/patches/*/commits.txt`
            2. Classify each as IRRELEVANT, FORK, or CORE
            3. For CORE: merge directly
            4. For FORK: create task spec and reimplement
            5. Approve this PR when ready
          branch: upstream-sync/weekly
          draft: true
```

---

## Step 2: Friday (Jules Automated)

**Trigger:** GitHub Action runs at 2 PM UTC every Friday

**What Jules Does:**

1. Fetches upstream
2. Generates diff summary to `.upstream/patches/YYYYMMDD/`
3. Creates draft PR with summary

**Output:** A draft PR titled `[Upstream Sync] Week of YYYYMMDD`

---

## Step 3: Saturday (Human Review)

### 3.1 Open the Draft PR

Review files in `.upstream/patches/YYYYMMDD/`:

- `commits.txt` — List of new upstream commits
- `files.txt` — Files changed
- `full.diff` — Complete diff

### 3.2 Classify Each Commit

| Classification | Action                               |
| -------------- | ------------------------------------ |
| ⚪ IRRELEVANT  | Skip — no action needed              |
| 🟢 CORE        | Merge directly or cherry-pick        |
| 🟡 FORK        | Create task for agent to reimplement |

### 3.3 For CORE Changes

```bash
git cherry-pick <commit-hash>
# Or: git merge upstream/main (if safe)
```

### 3.4 For FORK Changes

Create a task file for the agent with:

- Upstream commit hash and PR link
- What changed (paste relevant diff portion)
- Our context (which file to modify)
- Success criteria

### 3.5 Update Absorption Log

After processing, update `.upstream/absorption-log.md`:

| Upstream Commit | PR     | Classification | Our Action | Status |
| --------------- | ------ | -------------- | ---------- | ------ |
| abc123          | #15601 | CORE           | Merged     | ✅     |
| def456          | #15494 | IRRELEVANT     | Skipped    | ⚪     |

### 3.6 Approve and Merge PR

---

## Emergency: Security Patch (Same-Day)

Don't wait for Friday. Manually trigger:

```bash
gh workflow run upstream-sync.yml
```

Prioritize, implement within 24 hours, fast-track PR.

---

## Decision Log

| Question                       | Decision                          | Rationale                                       |
| ------------------------------ | --------------------------------- | ----------------------------------------------- |
| File-level vs directory-level? | **Intent-based**                  | Agents classify by intent; patterns are brittle |
| Who runs weekly sync?          | **Jules via GitHub Action**       | 95% automated                                   |
| When?                          | **Friday 2 PM UTC**               | Gives Saturday for review                       |
| How track?                     | **`.upstream/absorption-log.md`** | Single source of truth                          |

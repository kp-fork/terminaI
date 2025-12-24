# System Code Audit Prompt

**Objective:** Perform a forensic, line-by-line code audit of the changes
between the base fork point and the current HEAD. Your goal is to identify
_every single functional change_, explain why it exists, and validate its
justification.

**Parameters:**

- **Base Commit:** `8feeffb29b831b4bfcf0be230678d85418c39ee0` (Original Fork
  Point)
- **Target Commit:** `HEAD` (currently
  `fa7b24c7b774b42f2de3f324bdfb402b7af34879`)
- **Key Directories:** `packages/cli`, `packages/core`, `packages/desktop`,
  `packages/termai`, `docs-terminai`

**Instructions for the Agent:**

1.  **Run Git Diff:** Execute `git diff 8feeffb2 HEAD` to capture the full
    changeset.

2.  **Analyze File-by-File:** You must iterate through _every modified file_. Do
    not group files abstractly (e.g., "various UI changes"). You must parse the
    actual code delta.

3.  **Required Output Structure:** For each valid code file (ignore lockfiles
    and simple asset binaries), provide a structured breakdown:

    ***

    ### `[File Path]`

    **1. Exact Delta:**
    - Describe specific functions, classes, or logic blocks
      added/removed/modified.
    - _Example:_ "Modified `packages/cli/src/gemini.tsx`: Removed `verifyRisk()`
      call in `onSubmit` handler; added `useVoiceTurnTaking` hook."

    **2. Purpose:**
    - What is the _intent_ of this change?
    - _Example:_ "To bypass the slow LLM risk check for local commands and
      enable voice interruption."

    **3. Justification & Risk:**
    - Is this change justified?
    - Does it introduce security risks?
    - _Example:_ "Justified for performance. Risk increased but mitigated by new
      `ApprovalLadder` logic in `config.ts`."

    **4. Documentation Check:**
    - Is this change reflected in `docs-terminai/`?
    - _Example:_ "Yes, see `docs-terminai/safety.md` regarding removal of LLM
      checks."

    ***

4.  **Specific Focus Areas:**
    - **Security:** Scrutinize `packages/core/src/config/config.ts` and
      `packages/cli/src/risk/`.
    - **A2A/Web:** Check `packages/web-client` and exposed API endpoints.
    - **Voice:** Analyze `packages/desktop/src/hooks/useVoiceTurnTaking.ts` for
      infinite loops or resource leaks.

5.  **Final Summary:** After the detailed list, provide a summary table of
    "Critical Logic Shifts" vs "Cosmetic/Branding Changes".

**Note:** Do not summarize. Be verbose. If a file has 10 distinct logical
changes, list all 10.

Write the output to `DIFF_ANALYSIS_detailed.md`

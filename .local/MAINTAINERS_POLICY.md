# Maintainers Policy - TerminaI "Stable Core"

**Status:** ACTIVE  
**Duration:** Until 100 GitHub Stars milestone  
**Date Activated:** 2025-12-21

## The "Freeze & Ignore" Directive

This policy is in effect to stabilize terminaI at **Stable Core v0.21** for the
"Go Public" initiative.

### Strict Rules for All Development Agents

1. **DO NOT** run `git pull` from upstream (`google-gemini/gemini-cli`)
2. **DO NOT** run `npm update` (unless fixing a specific, documented bug with
   written approval)
3. **DO NOT** execute or run `scripts/sync_upstream.sh`
4. **DO NOT** merge any changes from the upstream repository

### Allowed Activities

- Focus 100% on terminaI-specific features: `gemini.tsx`, `voice/`,
  `web-client/`
- Fix critical bugs in existing functionality
- Improve documentation in `docs-terminai/`
- Polish user-facing features

### Rationale

**Code Doesn't Rot in 30 Days:**

- Dependencies are locked in `package-lock.json`
- Gemini API is a stable public product
- terminaI runs locally, not dependent on external servers

**Focus on Value:**

- Our users value **Voice** and **Web Remote**, not upstream experiments
- Stability is a feature, not a bug
- 100% effort should go to polishing what we have, not chasing upstream

### Release Authority

Only the **Chief Architect** can authorize:

- Upstream synchronization
- Major dependency updates
- Breaking changes to stable features

### Green Light Criteria

This freeze lifts when terminaI achieves **100 GitHub Stars**.

---

_Last Updated: 2025-12-21_

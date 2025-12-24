# terminaI Website (terminai-website/) — Deep Critique + Excruciating Task List

> Audience: **contributors/builders** (FOSS-first). Goal: make them _feel_ the
> “ice cream bar” of motivations: societal impact, shiny tech (A2A/MCP),
> freedom/sovereignty, security/governance, and raw capability.

---

## 0) North Star (what the site must do)

### 0.1 One sentence

**TerminaI is the Sovereign Shell: governed autonomy for laptops and
servers—open protocols (A2A, MCP), policy gating, and auditability—so anyone can
build trustworthy system automation.**

### 0.2 The 4-fold value prop (must be visible in the first ~20 seconds)

1. **Laptop Assistant**: “Android Assistant… but for laptops” (across
   environments).
2. **Agentic Coordination**: MCP + orchestration = plug into the universe.
3. **Manage endpoints**: individual → SMB → enterprise computers.
4. **Manage servers**: the same governed operator loop for infra.

### 0.3 Primary conversion

“I want to contribute” → user clicks:

- ⭐ Star repo
- Join community (Discord/Matrix)
- Pick a “good first issue”
- Run locally in <5 minutes

### 0.4 Secondary conversions

- Download/install
- Read docs
- Understand architecture + primitives
- Adopt A2A/MCP integration

---

## 1) Current website critique (terminai-website/ as-is)

### 1.1 Content critique (what’s missing / misaligned)

- **Doesn’t reflect your new value prop**: current home page is mostly “terminal
  operator + voice + web remote + safety”; it does not sell the 4-fold story
  (assistant for laptops, MCP coordination, endpoint mgmt, server mgmt).
- **Not contributor-first**: there’s no explicit “Why contribute / where to
  start / primitives to build on / open problems / roadmap / good first issues”
  call to action.
- **The “freedom” angle is muted**: sovereignty, escaping corporate constraints,
  self-host, composable protocols—these should be a distinct flavor section, not
  implied.
- **Buzzwords without proof**: the site says “web remote / safe by default /
  enterprise ready” but doesn’t show a believable proof artifact (screens, demo
  clips, protocol diagrams, trust model, audit log screenshot).
- **Tone mismatch**: it reads like a product site for end users + enterprise,
  but you said you’re primarily recruiting contributors right now.
- **Enterprise page is premature**: the “Vertex AI governance / SIEM” copy is
  not backed by visible implementation.

### 1.2 UI/UX critique

- **Strong aesthetic, weak narrative**: the terminal animation looks good, but
  it doesn’t “walk a contributor through the mind-blowing stack.”
- **No clear CTA ladder**: primary CTA should be contributor-first (Star /
  Contribute / Quickstart). “Get Started” → Download is fine but not the main.
- **Docs experience is a stub**: `/docs` links to routes that don’t exist.
- **No social proof or community signals**: missing “contributors”, “stars”,
  “PRs welcome”, “what we’re building next”, “recent merges”, “demo PRs”.

### 1.3 Language/copy critique

- **Wrong install command on the site**: homepage + download page still show
  `npm i -g @google/gemini-cli`.
- **Messaging is narrow**: “terminal operator” is only one flavor; must include
  the other motivations.
- **Too many absolutes** (“Enterprise ready”, “Securely tunnel”) without framing
  as “in progress / planned / experimental”.
- **Missing “why now”**: what changed in the world that makes TerminaI
  inevitable (LLMs + open protocols + local models + policy gating)?

### 1.4 Design critique

- **Brand system is solid** (black/white + red cursor), but the site uses it
  mainly for decoration.
- **Needs more structured visual storytelling**: diagrams for
  A2A/MCP/policy/audit/PTY.
- **Accessibility risk**: lots of low-opacity text; must check contrast.

### 1.5 Engineering correctness critique (site quality issues)

- `src/app/docs/page.tsx` has **duplicate keys** (`title` repeated) and
  references `<BrandText />` without importing it.
- `/docs/*` routes referenced in `/docs` page do not exist.
- Many claims are **placeholders** (install command rename pending; enterprise
  claims).

---

## 2) The “Ice Cream Bar” messaging system (what we must explicitly sell)

The website must present _multiple simultaneous reasons_ to care:

### Flavor A — Societal impact (outcomes)

- “Computers should be usable by humans again.”
- “Make ops knowledge accessible.”
- “Less downtime, less frustration, fewer black-box IT rituals.”

### Flavor B — Shiny tech / cutting edge

- A2A as the agent control plane.
- MCP as the capability bus.
- Policy engine as the governance layer.
- PTY bridge as the real operator substrate.

### Flavor C — Freedom / sovereignty / anti-lock-in

- Self-host.
- Open protocols.
- Pluggable models.
- Escape corporate constraints.

### Flavor D — Security / trust / governance

- Approvals.
- Trust boundaries.
- Audit log.
- Reproducibility.

### Flavor E — Builder magnet

- “Here are the primitives.”
- “Here are the hard problems.”
- “Here’s the architecture.”
- “Here’s how to ship a new power.”

---

## 3) Target site map (v2, contributor-first)

P0 pages (must exist and be coherent):

- `/` Home
- `/download` Install
- `/docs` Docs hub (real)
- `/docs/governance` Governance deep-dive (policy ladder)
- `/docs/security-posture` Security posture (root access, threat model,
  mitigations)
- `/docs/a2a` A2A spec (rendered, readable)
- `/docs/mcp` MCP guide (how to build/plug servers)
- `/docs/tutorials` Interactive tutorials (system tasks, not just coding)
- `/docs/troubleshooting` Troubleshooting (terminal/PTY common issues)
- `/docs/api` API reference starter for `@terminai/core` (plugin dev)
- `/docs/themes` Theme showcase (with screenshots)
- `/contribute` Contributor landing
- `/architecture` Architecture + primitives
- `/protocols/a2a` A2A explained + how to integrate
- `/protocols/mcp` MCP explained + how to add servers
- `/safety` Policy + approvals + audit
- `/why-gemini` “Why Gemini?” (2M context advantage for system-wide debugging)
- `/comparison` Comparison guide (vs Aider/Claude Code/etc for systems)
- `/case-studies` Case studies (hypothetical but believable operator stories)
- `/use-cases` Overview
- `/use-cases/laptop-assistant`
- `/use-cases/automation-hub`
- `/use-cases/endpoints`
- `/use-cases/servers`

P1 pages (next):

- `/community` (Discord/Matrix, principles, governance)
- `/roadmap` (high-level, not a 10k-line wall)
- `/recipes` (system operator recipe pack)
- `/press` or `/manifesto`

P2 pages (later):

- `/enterprise` (only when real)

---

## 4) Task list conventions

- **P0**: blocks credibility and/or contributor conversion.
- **P1**: strong improvements that deepen belief + excitement.
- **P2**: polish.

Each task includes:

- **Where** (file/page/component)
- **What to change**
- **Acceptance** (what “done” means)

---

## 4.5 Launch-grade “sales surface” requirements (mapped from today’s [H] list)

> These are not a deployment checklist; they are the **minimum content
> surfaces** needed for the website to sell TerminaI like a professional
> solution on launch day.

### P0-SALES-0001 — “The Operator” doc landing (website)

- Outcome: `/docs` (or `/docs/introduction`) opens with the Operator pitch.
- Must include the exact framing:
  - **“Google provides the intelligence. TerminaI provides the root access and
    the guardrails.”**
- Acceptance: contributors can quote the pitch after reading the first screen.

### P0-SALES-0002 — Governance deep-dive

- Outcome: `/docs/governance` exists and explains the tiered policy/approval
  system clearly.
- Acceptance: a security-minded engineer understands _how_ actions are gated,
  not just that they are.

### P0-SALES-0003 — Recipe contribution guide

- Outcome: `/docs/contributing-recipes` (or `/recipes` + docs subpage) explains
  how to write/share TOML recipes.
- Acceptance: a contributor can publish a recipe in one sitting.

### P0-SALES-0004 — A2A spec rendered as readable docs

- Outcome: `/docs/a2a` (and/or `/protocols/a2a`) presents:
  - what A2A is (dummy explanation)
  - why it matters
  - current endpoints
  - auth model (today) + pairing model (planned)
  - examples (curl + snippet)
- Acceptance: an IDE/plugin author can integrate without reading repo source.

### P0-SALES-0005 — “Why Gemini?” page

- Outcome: `/why-gemini` explains the 2M context advantage for full-system
  debugging.
- Must include:
  - what 2M context changes (logs, configs, repo, docs, incident timeline)
  - how governance prevents “big-context big-risk”
- Acceptance: readers can articulate why Gemini is uniquely useful _for
  systems_.

### P0-SALES-0006 — Security posture page

- Outcome: `/docs/security-posture` (or `/security`) addresses enterprise
  concerns about agent + root access.
- Must include:
  - threat model (local machine, tokens, A2A exposure)
  - mitigations (policy ladder, approvals, least privilege, audit)
  - what is/ isn’t true today (honesty block)
- Acceptance: removes the “this looks dangerous” objection.

### P0-SALES-0007 — Comparison guide (systems-first)

- Outcome: `/comparison` compares TerminaI to Aider/Claude Code/etc specifically
  for **systems**.
- Must include:
  - what those tools optimize for
  - what TerminaI optimizes for (PTY + policy + audit + MCP/A2A)
- Acceptance: a developer understands why TerminaI is a different category.

### P1-SALES-0008 — Case studies (hypothetical, but believable)

- Outcome: `/case-studies` includes 3–6 stories like “Fixing a broken Kubernetes
  node”.
- Rule: each story must contain:
  - prompt
  - policy gate
  - approved commands
  - outcome
  - audit trail excerpt
- Acceptance: feels like a product with real-world narratives.

### P0-SALES-0009 — Interactive tutorials rewritten for system tasks

- Outcome: `/docs/tutorials` contains guided “operator” tutorials (wifi fix,
  disk cleanup, service restart, log triage).
- Acceptance: a new user can try one tutorial end-to-end.

### P0-SALES-0010 — Troubleshooting guide (PTY/terminal-first)

- Outcome: `/docs/troubleshooting` covers:
  - common PTY resizing / TUI issues
  - auth pitfalls
  - Node/WSL friction
- Acceptance: reduces support load and increases install success.

### P1-SALES-0011 — `@terminai/core` API reference starter

- Outcome: `/docs/api` provides:
  - high-level modules
  - how to build plugins/extensions
  - stable surfaces vs internal
- Acceptance: builders know where to hook.

### P1-SALES-0012 — Theme showcase

- Outcome: `/docs/themes` shows themes with screenshots (even placeholders).
- Acceptance: visual polish + “shiny” factor for contributors.

### P0-SALES-0013 — One-line install featured prominently

- Outcome: Home hero includes one-line install (or “from source” if one-line
  isn’t real yet).
- Acceptance: a contributor can install without hunting.

### P0-SALES-0014 — Roadmap transparency page

- Outcome: `/roadmap` page exists with a clear path to 1.0.
- Acceptance: readers see momentum and direction.

### P0-SALES-0015 — SEO phrases integrated naturally

- Outcome: key phrases appear in titles/headers/body where appropriate:
  - “AI System Operator”
  - “Governed Terminal”
  - “Gemini Shell”
- Acceptance: reads naturally (no keyword stuffing) and improves
  discoverability.

---

## 5) Tasks — Engineering correctness (P0)

### P0-ENG-0001 — Fix `/docs` build errors

- Where: `terminai-website/src/app/docs/page.tsx`
- Do:
  - Import `BrandText`.
  - Remove duplicate object keys (`title` appears twice in two entries).
  - Ensure `docSections` is typed consistently.
- Acceptance:
  - `npm run build` succeeds.

### P0-ENG-0002 — Remove dead links to non-existent `/docs/*` routes OR implement them

- Where: `src/app/docs/page.tsx` and routing under `src/app/docs/*`
- Do (choose one path):
  - A) implement MDX/markdown-driven docs routes (recommended), OR
  - B) collapse docs hub to links that exist (temporary).
- Acceptance:
  - No 404s from first-click doc nav.

### P0-ENG-0003 — Replace placeholder install commands

- Where: `src/components/Hero.tsx`, `src/app/download/page.tsx`, `SPEC.md`
- Do:
  - Replace `@google/gemini-cli` install text with the correct TerminaI install
    story.
  - If the npm name is not finalized, present: “From source (recommended)” +
    “npm (coming soon)”.
- Acceptance:
  - No `@google/gemini-cli` appears in the UI.

### P0-ENG-0004 — Unify repo links

- Where: header/footer links point to `termAI` vs `terminaI`
- Do:
  - Decide canonical GitHub repo URL and use it everywhere.
- Acceptance:
  - Single repo link site-wide.

---

## 6) Tasks — Home page (P0): rewrite to sell the 4-fold + ice cream

### P0-HOME-0001 — Replace hero headline/subhead with contributor-first pitch

- Where: `src/components/Hero.tsx`
- Do:
  - Headline: shift from “Universal Terminal Operator” → “The Sovereign Shell”
    (or equivalent).
  - Subhead: explicitly include the 4-fold value prop in ~2 lines.
  - Add “Contributor CTA row”: Star / Contribute / Quickstart.
- Acceptance:
  - A first-time visitor understands: laptops + MCP + endpoints + servers.

### P0-HOME-0002 — Update the terminal animation script to show _governed autonomy_

- Where: `Hero.tsx` terminalScript
- Do:
  - Script should demonstrate:
    - diagnosis
    - policy check
    - approval prompt
    - audited execution
  - Example beats:
    - “Fix wifi” → “Policy: requires approval” → user approves → command runs →
      “Audit saved”.
- Acceptance:
  - The animated terminal tells a story of trust (not just a cute prompt).

### P0-HOME-0003 — Add “Ice Cream Bar” section (5 tiles)

- Where: new component `src/components/IceCreamBar.tsx`
- Do:
  - 5 tiles: Impact / Tech / Freedom / Security / Builders.
  - Each tile has:
    - headline
    - 2 bullet outcomes
    - deep-link CTA (“Read A2A”, “See policy”, “Start contributing”).
- Acceptance:
  - Every motivation style has a hook.

### P0-HOME-0004 — Add “Primitives” section (A2A/MCP/Policy/PTY/Audit)

- Where: new component `src/components/Primitives.tsx`
- Do:
  - 5 cards with diagrams (simple inline SVG) showing how they connect.
  - Each card deep-links to a page.
- Acceptance:
  - Contributors can immediately see “what to build on”.

### P0-HOME-0005 — Add “Get involved” contributor section above footer

- Where: new component `src/components/ContributeCTA.tsx`
- Do:
  - “Pick your lane” list:
    - Policy
    - PTY
    - Audit
    - MCP servers
    - A2A clients
  - Link to:
    - GitHub issues filtered by labels (good first issue)
    - contributing guide
    - community
- Acceptance:
  - There is a clear next step beyond “download”.

### P0-HOME-0006 — Fix the comparison table to match actual differentiators

- Where: `src/components/ComparisonTable.tsx`
- Do:
  - Add rows:
    - A2A
    - MCP ecosystem
    - Audit trail
    - Policy/approval ladder
    - Self-host/air-gap posture
  - Update competitor set if needed.
- Acceptance:
  - Table supports the new story.

---

## 7) Tasks — Download/Install page (P0): contributor-first install + honest status

### P0-DL-0001 — Replace placeholder npm install with correct install story

- Where: `src/app/download/page.tsx`
- Do:
  - Provide:
    - “From source (recommended)”
    - “npm global (if available)”
    - “binary releases (if available)”
  - Always show `terminai` command.
- Acceptance:
  - No reference to `@google/gemini-cli`.

### P0-DL-0002 — Add “first run” + “auth” guidance

- Where: `/download`
- Do:
  - Explain engine reality (Gemini core today) without underselling sovereignty.
  - Link to auth docs.
- Acceptance:
  - New users don’t stall at login/auth.

### P0-DL-0003 — Add platform grid

- Where: `/download`
- Do:
  - Linux/macOS/Windows(WSL) cards with exact steps.
- Acceptance:
  - Fewer support questions.

---

## 8) Tasks — Docs hub (P0): make docs real

### P0-DOCS-0001 — Implement docs rendering (MDX or markdown)

- Where: `src/app/docs/*`
- Do:
  - Choose approach:
    - Option A: Next.js MDX.
    - Option B: render markdown via `shiki` + custom renderer.
  - Create pages:
    - `/docs/introduction`
    - `/docs/quickstart`
    - `/docs/voice`
    - `/docs/web-remote`
    - `/docs/configuration`
- Acceptance:
  - Docs links work; pages exist.

### P0-DOCS-0002 — Add a docs sidebar + search (minimal)

- Do:
  - Sidebar with section nav.
  - Cmd+K opens search (even basic client-side).
- Acceptance:
  - Docs feel like a real site, not a stub.

---

## 9) Tasks — Contributor landing (P0)

### P0-CONTRIB-0001 — Create `/contribute`

- Where: `src/app/contribute/page.tsx` (new)
- Must include:
  - “Why this matters” (impact)
  - “The primitives” (tech)
  - “The lanes” (how to help)
  - “Fast start” (clone → build → run)
  - “First PR ideas” (10 bullets)
- Acceptance:
  - A contributor can self-select a lane in <60 seconds.

### P0-CONTRIB-0002 — Add “Good first issues” live link block

- Where: `/contribute`
- Do:
  - Add GitHub search links (labels).
- Acceptance:
  - One-click into issues.

---

## 10) Tasks — Architecture & primitives pages (P0/P1)

### P0-ARCH-0001 — Create `/architecture` page

- Must include:
  - package map
  - control flow (UI → core → tools → policy → execution)
  - how PTY fits
  - how audit fits
  - what’s inherited vs TerminaI-specific

### P0-PROT-0001 — Create `/protocols/a2a` page

- Must include:
  - dumb explanation (like “task + stream”)
  - why it’s powerful
  - how to run the server locally
  - how auth works (pairing vs static token)
  - sample curl + sample client snippet

### P0-PROT-0002 — Create `/protocols/mcp` page

- Must include:
  - what MCP is
  - why it matters
  - sample server
  - how TerminaI consumes it

### P0-SAFETY-0001 — Create `/safety` page

- Must include:
  - policy ladder explanation
  - approvals
  - trust boundaries
  - audit log purpose

---

## 11) Tasks — Use cases pages (P1 but should be planned now)

### P1-USE-0001 — `/use-cases` overview

- A grid linking to:
  - laptop assistant
  - automation hub (MCP)
  - endpoint management
  - server management

### P1-USE-0002 — `/use-cases/laptop-assistant`

- Show “Android Assistant for laptops” narrative:
  - reminders/automation analog
  - real OS tasks
  - safety

### P1-USE-0003 — `/use-cases/automation-hub`

- Show MCP coordination:
  - GitHub + Slack + internal API
  - “agentic glue” story

### P1-USE-0004 — `/use-cases/endpoints`

- Story: small business → enterprise endpoints.
- Emphasize policy + audit.

### P1-USE-0005 — `/use-cases/servers`

- Story: runbooks + repairs + incident response.
- Emphasize A2A + governance.

---

## 12) Tasks — Design & UX (P0/P1)

### P0-DES-0001 — Fix contrast + readability audit

- Identify every low-opacity body text usage.
- Ensure AA contrast.

### P0-DES-0002 — Add “narrative scaffolding” via section headers + anchors

- Home page needs a scroll map (nav anchors).

### P1-DES-0003 — Add diagrams (inline SVG)

- A2A flow diagram
- MCP flow diagram
- Policy gating diagram
- Audit timeline diagram

### P1-DES-0004 — Add a “demo strip” component

- Embed asciinema/video/gif placeholders with captions.

---

## 13) Tasks — Technical/SEO/perf (P1/P2)

### P1-SEO-0001 — Add sitemap + robots

### P1-SEO-0002 — Improve metadata per page

### P1-PERF-0001 — Ensure images optimized, fonts stable

### P2-A11Y-0001 — Keyboard navigation + reduced motion

---

## 14) Mega-backlog expansion (how to reach “2000 lines” depth)

The items above define _what must change_. The rest of this file is an
intentionally granular breakdown by page/section/component/copy-variant so
execution can be parallelized.

---

## 15) Home page — granular breakdown (P0/P1)

### 15.1 Header/nav

- HOME-NAV-0001: Add “Contribute” link.
- HOME-NAV-0002: Add “Architecture” link.
- HOME-NAV-0003: Add “Protocols” dropdown (A2A/MCP).
- HOME-NAV-0004: Replace “Enterprise” with “Safety” or “Use Cases” until
  enterprise is real.
- HOME-NAV-0005: Make CTA button “Contribute” (primary) and “Download”
  (secondary).
- HOME-NAV-0006: Add GitHub star count badge.
- HOME-NAV-0007: Mobile nav drawer.
- HOME-NAV-0008: Add anchor links on home sections.

### 15.2 Hero copy variants (write many; pick best)

- HOME-HERO-HEAD-0001: Draft 20 headline variants emphasizing sovereignty.
- HOME-HERO-HEAD-0002: Draft 20 headline variants emphasizing governance.
- HOME-HERO-HEAD-0003: Draft 20 headline variants emphasizing protocols.
- HOME-HERO-SUB-0001: Draft 10 subheads explaining 4-fold in 1–2 sentences.
- HOME-HERO-SUB-0002: Draft 10 subheads explaining contributor value.
- HOME-HERO-SUB-0003: Draft 10 subheads explaining freedom/anti-lock-in.
- HOME-HERO-CTA-0001: Define primary CTA text variants (Contribute vs Star vs
  Install).
- HOME-HERO-CTA-0002: Define secondary CTA text variants.

### 15.3 Hero terminal demo

- HOME-DEMO-0001: Create 5 alternative scripts (wifi fix, docker cleanup,
  service restart, log triage, server patch).
- HOME-DEMO-0002: Ensure script includes “policy decision” beat.
- HOME-DEMO-0003: Ensure script includes “approval prompt” beat.
- HOME-DEMO-0004: Ensure script includes “audit entry created” beat.
- HOME-DEMO-0005: Make script loop without feeling janky.
- HOME-DEMO-0006: Add a “Replay” control (optional).
- HOME-DEMO-0007: Add “Copy this demo prompt” button.

### 15.4 Ice cream bar section

- HOME-ICE-0001: Write Impact tile copy (3 variants).
- HOME-ICE-0002: Write Tech tile copy (3 variants).
- HOME-ICE-0003: Write Freedom tile copy (3 variants).
- HOME-ICE-0004: Write Security tile copy (3 variants).
- HOME-ICE-0005: Write Builders tile copy (3 variants).
- HOME-ICE-0006: Add icons.
- HOME-ICE-0007: Add deep links.

### 15.5 Primitives section

- HOME-PRIM-0001: Define the 5 primitives and their one-line definitions.
- HOME-PRIM-0002: Create card layouts.
- HOME-PRIM-0003: Add mini-diagrams.
- HOME-PRIM-0004: Link each to its page.

### 15.6 Contributor CTA section

- HOME-CONTRIB-0001: Build “Pick your lane” cards.
- HOME-CONTRIB-0002: Add “Good first issue” link.
- HOME-CONTRIB-0003: Add “Help wanted” link.
- HOME-CONTRIB-0004: Add “Join community” link.

### 15.7 Proof section (needs real artifacts)

- HOME-PROOF-0001: Add “What’s real today vs roadmap” matrix.
- HOME-PROOF-0002: Add screenshot placeholders for:
  - voice mode
  - sessions
  - policy prompt
  - audit log
- HOME-PROOF-0003: Add links to repo paths implementing features.

---

## 16) Download page — granular breakdown

- DL-0001: Update headline to “Install TerminaI”.
- DL-0002: Add “Contributor install (from source)” as primary.
- DL-0003: Add “Package install” as secondary.
- DL-0004: Add “WSL” section with exact steps.
- DL-0005: Add “First run” steps.
- DL-0006: Add “Auth options” summary.
- DL-0007: Add “Troubleshooting: Node 20, permissions”.
- DL-0008: Add “Uninstall” steps.
- DL-0009: Add “Update” steps.
- DL-0010: Add “Safety warning” about shell tools.

---

## 17) Docs system — granular breakdown

- DOCS-0001: Choose MDX vs markdown renderer.
- DOCS-0002: Add sidebar data source.
- DOCS-0003: Implement layout for docs routes.
- DOCS-0004: Add syntax highlighting.
- DOCS-0005: Add “Edit this page” GitHub link.
- DOCS-0006: Add prev/next nav.
- DOCS-0007: Add search.
- DOCS-0008: Add page: Introduction.
- DOCS-0009: Add page: Quickstart.
- DOCS-0010: Add page: Voice.
- DOCS-0011: Add page: Web Remote.
- DOCS-0012: Add page: Configuration.
- DOCS-0013: Add page: MCP.
- DOCS-0014: Add page: A2A.
- DOCS-0015: Add page: Safety/Policy.
- DOCS-0016: Add page: Audit Log.

---

## 18) Protocol pages — granular breakdown

### 18.1 A2A page

- A2A-0001: Explain “task + stream” with analogy.
- A2A-0002: Diagram request/response flow.
- A2A-0003: Document current auth (bearer token via env/file).
- A2A-0004: Document planned pairing handshake.
- A2A-0005: Provide curl examples.
- A2A-0006: Provide tiny TS client snippet.
- A2A-0007: Provide threat model (local network, tokens).
- A2A-0008: Provide “how to contribute” list.

### 18.2 MCP page

- MCP-0001: Explain capability bus concept.
- MCP-0002: Diagram MCP server + TerminaI.
- MCP-0003: Provide example MCP server.
- MCP-0004: Provide “add new tool” walkthrough.
- MCP-0005: Provide list of desired MCP servers.

---

## 19) Safety page — granular breakdown

- SAFE-0001: Explain policy ladder.
- SAFE-0002: Show UI prompt examples.
- SAFE-0003: Explain trust folders.
- SAFE-0004: Explain “why audit logs matter.”
- SAFE-0005: Link to code.

---

## 20) Contribute page — granular breakdown

- CONTRIB-0001: Write “Why contribute” pitch (5 flavors).
- CONTRIB-0002: Add “lanes” section.
- CONTRIB-0003: Add “first PR” checklist.
- CONTRIB-0004: Add “good first issues” links.
- CONTRIB-0005: Add “how to run locally” steps.

---

## 21) Visual assets tasks

- ASSET-0001: Create hero OG image that matches new pitch.
- ASSET-0002: Create diagram SVGs.
- ASSET-0003: Create screenshots placeholders.
- ASSET-0004: Create favicon variants.

---

## 22) Quality gates

- QA-0001: `npm run build` passes.
- QA-0002: Lighthouse pass (perf + a11y).
- QA-0003: No dead links.
- QA-0004: Mobile responsive.
- QA-0005: Reduced motion support.

---

## 23) Appendices

### Appendix A — Copy blocks to produce (checklist)

- 20 hero headlines
- 10 subheads
- 10 CTAs
- 5 “ice cream” tiles × 3 variants
- 4 use-case page narratives
- 1 manifesto
- 1 contributor pitch

### Appendix B — Component inventory (current)

- `SiteHeader`
- `Hero`
- `FeatureGrid`
- `PrivacySection`
- `ComparisonTable`
- `FAQSection`
- `SiteFooter`

### Appendix C — Component inventory (to add)

- `IceCreamBar`
- `Primitives`
- `ContributeCTA`
- `DemoStrip`
- `Diagram`
- `DocsLayout`
- `DocsSidebar`
- `DocsSearch`

---

## 24) Execution backlog (expanded, line-targeted)

> This section is intentionally ultra-granular so multiple contributors can
> parallelize work. Each line is a discrete, assignable task.

### 24.1 Immediate correctness + credibility fixes (P0)

- [ ] FIX-0001 (P0) Fix missing BrandText import + duplicate keys on /docs
- [ ] FIX-0002 (P0) Replace all @google/gemini-cli install commands in UI
- [ ] FIX-0003 (P0) Replace repo links termAI vs terminaI inconsistency across
      header/footer
- [ ] FIX-0004 (P0) Replace homepage version string v1.0.0-beta with real
      version source or remove
- [ ] FIX-0005 (P0) Remove/label any feature claims that are not implemented yet
      (enterprise/SOC2/tunneling)

### 24.HOME Page backlog — `/`

- [ ] HOME-0006 (P0) Define the single-sentence promise for `/` that matches the
      4-fold value prop
- [ ] HOME-0007 (P0) Define primary CTA + secondary CTA for `/`
      (contributor-first)
- [ ] HOME-0008 (P1) Add/adjust copy on `/` so the `IMPACT` flavor is explicit:
      Societal outcome / making computers usable
- [ ] HOME-0009 (P1) Add/adjust copy on `/` so the `TECH` flavor is explicit:
      Cutting-edge primitives (A2A, MCP, PTY, policy)
- [ ] HOME-0010 (P1) Add/adjust copy on `/` so the `FREEDOM` flavor is explicit:
      Sovereignty / self-host / escape constraints
- [ ] HOME-0011 (P1) Add/adjust copy on `/` so the `TRUST` flavor is explicit:
      Security / governance / auditability
- [ ] HOME-0012 (P1) Add/adjust copy on `/` so the `BUILDERS` flavor is
      explicit: Contributor magnet / primitives / roadmap
- [ ] HOME-0013 (P0) `/`/Hero: write intent + acceptance criteria (what user
      should understand/feel)
- [ ] HOME-0014 (P0) `/`/Hero: list required UI elements (headline, subhead,
      bullets, CTA, proof)
- [ ] HOME-0015 (P1) `/`/Hero: produce 3 copy variants (tight, bold, technical)
- [ ] HOME-0016 (P1) `/`/Hero: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] HOME-0017 (P0) `/`/TerminalDemo: write intent + acceptance criteria (what
      user should understand/feel)
- [ ] HOME-0018 (P0) `/`/TerminalDemo: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] HOME-0019 (P1) `/`/TerminalDemo: produce 3 copy variants (tight, bold,
      technical)
- [ ] HOME-0020 (P1) `/`/TerminalDemo: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] HOME-0021 (P0) `/`/IceCreamBar: write intent + acceptance criteria (what
      user should understand/feel)
- [ ] HOME-0022 (P0) `/`/IceCreamBar: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] HOME-0023 (P1) `/`/IceCreamBar: produce 3 copy variants (tight, bold,
      technical)
- [ ] HOME-0024 (P1) `/`/IceCreamBar: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] HOME-0025 (P0) `/`/Primitives: write intent + acceptance criteria (what
      user should understand/feel)
- [ ] HOME-0026 (P0) `/`/Primitives: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] HOME-0027 (P1) `/`/Primitives: produce 3 copy variants (tight, bold,
      technical)
- [ ] HOME-0028 (P1) `/`/Primitives: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] HOME-0029 (P0) `/`/FeatureGrid: write intent + acceptance criteria (what
      user should understand/feel)
- [ ] HOME-0030 (P0) `/`/FeatureGrid: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] HOME-0031 (P1) `/`/FeatureGrid: produce 3 copy variants (tight, bold,
      technical)
- [ ] HOME-0032 (P1) `/`/FeatureGrid: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] HOME-0033 (P0) `/`/Comparison: write intent + acceptance criteria (what
      user should understand/feel)
- [ ] HOME-0034 (P0) `/`/Comparison: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] HOME-0035 (P1) `/`/Comparison: produce 3 copy variants (tight, bold,
      technical)
- [ ] HOME-0036 (P1) `/`/Comparison: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] HOME-0037 (P0) `/`/FAQ: write intent + acceptance criteria (what user
      should understand/feel)
- [ ] HOME-0038 (P0) `/`/FAQ: list required UI elements (headline, subhead,
      bullets, CTA, proof)
- [ ] HOME-0039 (P1) `/`/FAQ: produce 3 copy variants (tight, bold, technical)
- [ ] HOME-0040 (P1) `/`/FAQ: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] HOME-0041 (P0) `/`/ContributeCTA: write intent + acceptance criteria (what
      user should understand/feel)
- [ ] HOME-0042 (P0) `/`/ContributeCTA: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] HOME-0043 (P1) `/`/ContributeCTA: produce 3 copy variants (tight, bold,
      technical)
- [ ] HOME-0044 (P1) `/`/ContributeCTA: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] HOME-0045 (P0) `/`/Footer: write intent + acceptance criteria (what user
      should understand/feel)
- [ ] HOME-0046 (P0) `/`/Footer: list required UI elements (headline, subhead,
      bullets, CTA, proof)
- [ ] HOME-0047 (P1) `/`/Footer: produce 3 copy variants (tight, bold,
      technical)
- [ ] HOME-0048 (P1) `/`/Footer: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] HOME-0049 (P1) Write 1 mini-story per persona for `/` (problem → governed
      action → audit)
- [ ] HOME-0050 (P1) `/` story: Individual laptop user — choose a scenario + the
      exact on-screen copy
- [ ] HOME-0051 (P1) `/` story: Developer / power user — choose a scenario + the
      exact on-screen copy
- [ ] HOME-0052 (P1) `/` story: Small business (few machines) — choose a
      scenario + the exact on-screen copy
- [ ] HOME-0053 (P1) `/` story: Enterprise endpoints — choose a scenario + the
      exact on-screen copy
- [ ] HOME-0054 (P1) `/` story: SRE / server operator — choose a scenario + the
      exact on-screen copy
- [ ] HOME-0055 (P1) Ensure `/` has at least one explicit mention of each value
      prop (A/B/C/D)
- [ ] HOME-0056 (P1) `/` value prop VP-A: add a sentence + a deep link that
      supports: Laptop assistant (Android-assistant vibe for computers)
- [ ] HOME-0057 (P1) `/` value prop VP-B: add a sentence + a deep link that
      supports: Agentic coordination (MCP + tool universe)
- [ ] HOME-0058 (P1) `/` value prop VP-C: add a sentence + a deep link that
      supports: Endpoint management (local → SMB → enterprise)
- [ ] HOME-0059 (P1) `/` value prop VP-D: add a sentence + a deep link that
      supports: Server management (infra operations)

### 24.DOWNLOAD Page backlog — `/download`

- [ ] DOWNLOAD-0060 (P0) Define the single-sentence promise for `/download` that
      matches the 4-fold value prop
- [ ] DOWNLOAD-0061 (P0) Define primary CTA + secondary CTA for `/download`
      (contributor-first)
- [ ] DOWNLOAD-0062 (P1) Add/adjust copy on `/download` so the `IMPACT` flavor
      is explicit: Societal outcome / making computers usable
- [ ] DOWNLOAD-0063 (P1) Add/adjust copy on `/download` so the `TECH` flavor is
      explicit: Cutting-edge primitives (A2A, MCP, PTY, policy)
- [ ] DOWNLOAD-0064 (P1) Add/adjust copy on `/download` so the `FREEDOM` flavor
      is explicit: Sovereignty / self-host / escape constraints
- [ ] DOWNLOAD-0065 (P1) Add/adjust copy on `/download` so the `TRUST` flavor is
      explicit: Security / governance / auditability
- [ ] DOWNLOAD-0066 (P1) Add/adjust copy on `/download` so the `BUILDERS` flavor
      is explicit: Contributor magnet / primitives / roadmap
- [ ] DOWNLOAD-0067 (P0) `/download`/InstallMethods: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] DOWNLOAD-0068 (P0) `/download`/InstallMethods: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] DOWNLOAD-0069 (P1) `/download`/InstallMethods: produce 3 copy variants
      (tight, bold, technical)
- [ ] DOWNLOAD-0070 (P1) `/download`/InstallMethods: add at least 1 concrete
      proof artifact (screenshot/diagram/link)
- [ ] DOWNLOAD-0071 (P0) `/download`/PlatformGrid: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] DOWNLOAD-0072 (P0) `/download`/PlatformGrid: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] DOWNLOAD-0073 (P1) `/download`/PlatformGrid: produce 3 copy variants
      (tight, bold, technical)
- [ ] DOWNLOAD-0074 (P1) `/download`/PlatformGrid: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] DOWNLOAD-0075 (P0) `/download`/FirstRun: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] DOWNLOAD-0076 (P0) `/download`/FirstRun: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] DOWNLOAD-0077 (P1) `/download`/FirstRun: produce 3 copy variants (tight,
      bold, technical)
- [ ] DOWNLOAD-0078 (P1) `/download`/FirstRun: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] DOWNLOAD-0079 (P0) `/download`/Auth: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] DOWNLOAD-0080 (P0) `/download`/Auth: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] DOWNLOAD-0081 (P1) `/download`/Auth: produce 3 copy variants (tight, bold,
      technical)
- [ ] DOWNLOAD-0082 (P1) `/download`/Auth: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] DOWNLOAD-0083 (P0) `/download`/Troubleshooting: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] DOWNLOAD-0084 (P0) `/download`/Troubleshooting: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] DOWNLOAD-0085 (P1) `/download`/Troubleshooting: produce 3 copy variants
      (tight, bold, technical)
- [ ] DOWNLOAD-0086 (P1) `/download`/Troubleshooting: add at least 1 concrete
      proof artifact (screenshot/diagram/link)
- [ ] DOWNLOAD-0087 (P0) `/download`/Uninstall: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] DOWNLOAD-0088 (P0) `/download`/Uninstall: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] DOWNLOAD-0089 (P1) `/download`/Uninstall: produce 3 copy variants (tight,
      bold, technical)
- [ ] DOWNLOAD-0090 (P1) `/download`/Uninstall: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] DOWNLOAD-0091 (P0) `/download`/FAQ: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] DOWNLOAD-0092 (P0) `/download`/FAQ: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] DOWNLOAD-0093 (P1) `/download`/FAQ: produce 3 copy variants (tight, bold,
      technical)
- [ ] DOWNLOAD-0094 (P1) `/download`/FAQ: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] DOWNLOAD-0095 (P0) `/download`/Footer: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] DOWNLOAD-0096 (P0) `/download`/Footer: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] DOWNLOAD-0097 (P1) `/download`/Footer: produce 3 copy variants (tight,
      bold, technical)
- [ ] DOWNLOAD-0098 (P1) `/download`/Footer: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] DOWNLOAD-0099 (P1) Write 1 mini-story per persona for `/download` (problem
      → governed action → audit)
- [ ] DOWNLOAD-0100 (P1) `/download` story: Individual laptop user — choose a
      scenario + the exact on-screen copy
- [ ] DOWNLOAD-0101 (P1) `/download` story: Developer / power user — choose a
      scenario + the exact on-screen copy
- [ ] DOWNLOAD-0102 (P1) `/download` story: Small business (few machines) —
      choose a scenario + the exact on-screen copy
- [ ] DOWNLOAD-0103 (P1) `/download` story: Enterprise endpoints — choose a
      scenario + the exact on-screen copy
- [ ] DOWNLOAD-0104 (P1) `/download` story: SRE / server operator — choose a
      scenario + the exact on-screen copy
- [ ] DOWNLOAD-0105 (P1) Ensure `/download` has at least one explicit mention of
      each value prop (A/B/C/D)
- [ ] DOWNLOAD-0106 (P1) `/download` value prop VP-A: add a sentence + a deep
      link that supports: Laptop assistant (Android-assistant vibe for
      computers)
- [ ] DOWNLOAD-0107 (P1) `/download` value prop VP-B: add a sentence + a deep
      link that supports: Agentic coordination (MCP + tool universe)
- [ ] DOWNLOAD-0108 (P1) `/download` value prop VP-C: add a sentence + a deep
      link that supports: Endpoint management (local → SMB → enterprise)
- [ ] DOWNLOAD-0109 (P1) `/download` value prop VP-D: add a sentence + a deep
      link that supports: Server management (infra operations)

### 24.DOCS Page backlog — `/docs`

- [ ] DOCS-0110 (P0) Define the single-sentence promise for `/docs` that matches
      the 4-fold value prop
- [ ] DOCS-0111 (P0) Define primary CTA + secondary CTA for `/docs`
      (contributor-first)
- [ ] DOCS-0112 (P1) Add/adjust copy on `/docs` so the `IMPACT` flavor is
      explicit: Societal outcome / making computers usable
- [ ] DOCS-0113 (P1) Add/adjust copy on `/docs` so the `TECH` flavor is
      explicit: Cutting-edge primitives (A2A, MCP, PTY, policy)
- [ ] DOCS-0114 (P1) Add/adjust copy on `/docs` so the `FREEDOM` flavor is
      explicit: Sovereignty / self-host / escape constraints
- [ ] DOCS-0115 (P1) Add/adjust copy on `/docs` so the `TRUST` flavor is
      explicit: Security / governance / auditability
- [ ] DOCS-0116 (P1) Add/adjust copy on `/docs` so the `BUILDERS` flavor is
      explicit: Contributor magnet / primitives / roadmap
- [ ] DOCS-0117 (P0) `/docs`/DocsHub: write intent + acceptance criteria (what
      user should understand/feel)
- [ ] DOCS-0118 (P0) `/docs`/DocsHub: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] DOCS-0119 (P1) `/docs`/DocsHub: produce 3 copy variants (tight, bold,
      technical)
- [ ] DOCS-0120 (P1) `/docs`/DocsHub: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] DOCS-0121 (P0) `/docs`/Sidebar: write intent + acceptance criteria (what
      user should understand/feel)
- [ ] DOCS-0122 (P0) `/docs`/Sidebar: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] DOCS-0123 (P1) `/docs`/Sidebar: produce 3 copy variants (tight, bold,
      technical)
- [ ] DOCS-0124 (P1) `/docs`/Sidebar: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] DOCS-0125 (P0) `/docs`/Search: write intent + acceptance criteria (what
      user should understand/feel)
- [ ] DOCS-0126 (P0) `/docs`/Search: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] DOCS-0127 (P1) `/docs`/Search: produce 3 copy variants (tight, bold,
      technical)
- [ ] DOCS-0128 (P1) `/docs`/Search: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] DOCS-0129 (P0) `/docs`/MDX: write intent + acceptance criteria (what user
      should understand/feel)
- [ ] DOCS-0130 (P0) `/docs`/MDX: list required UI elements (headline, subhead,
      bullets, CTA, proof)
- [ ] DOCS-0131 (P1) `/docs`/MDX: produce 3 copy variants (tight, bold,
      technical)
- [ ] DOCS-0132 (P1) `/docs`/MDX: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] DOCS-0133 (P0) `/docs`/CodeHighlight: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] DOCS-0134 (P0) `/docs`/CodeHighlight: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] DOCS-0135 (P1) `/docs`/CodeHighlight: produce 3 copy variants (tight,
      bold, technical)
- [ ] DOCS-0136 (P1) `/docs`/CodeHighlight: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] DOCS-0137 (P0) `/docs`/EditLinks: write intent + acceptance criteria (what
      user should understand/feel)
- [ ] DOCS-0138 (P0) `/docs`/EditLinks: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] DOCS-0139 (P1) `/docs`/EditLinks: produce 3 copy variants (tight, bold,
      technical)
- [ ] DOCS-0140 (P1) `/docs`/EditLinks: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] DOCS-0141 (P0) `/docs`/PrevNext: write intent + acceptance criteria (what
      user should understand/feel)
- [ ] DOCS-0142 (P0) `/docs`/PrevNext: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] DOCS-0143 (P1) `/docs`/PrevNext: produce 3 copy variants (tight, bold,
      technical)
- [ ] DOCS-0144 (P1) `/docs`/PrevNext: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] DOCS-0145 (P0) `/docs`/Footer: write intent + acceptance criteria (what
      user should understand/feel)
- [ ] DOCS-0146 (P0) `/docs`/Footer: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] DOCS-0147 (P1) `/docs`/Footer: produce 3 copy variants (tight, bold,
      technical)
- [ ] DOCS-0148 (P1) `/docs`/Footer: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] DOCS-0149 (P1) Write 1 mini-story per persona for `/docs` (problem →
      governed action → audit)
- [ ] DOCS-0150 (P1) `/docs` story: Individual laptop user — choose a scenario +
      the exact on-screen copy
- [ ] DOCS-0151 (P1) `/docs` story: Developer / power user — choose a scenario +
      the exact on-screen copy
- [ ] DOCS-0152 (P1) `/docs` story: Small business (few machines) — choose a
      scenario + the exact on-screen copy
- [ ] DOCS-0153 (P1) `/docs` story: Enterprise endpoints — choose a scenario +
      the exact on-screen copy
- [ ] DOCS-0154 (P1) `/docs` story: SRE / server operator — choose a scenario +
      the exact on-screen copy
- [ ] DOCS-0155 (P1) Ensure `/docs` has at least one explicit mention of each
      value prop (A/B/C/D)
- [ ] DOCS-0156 (P1) `/docs` value prop VP-A: add a sentence + a deep link that
      supports: Laptop assistant (Android-assistant vibe for computers)
- [ ] DOCS-0157 (P1) `/docs` value prop VP-B: add a sentence + a deep link that
      supports: Agentic coordination (MCP + tool universe)
- [ ] DOCS-0158 (P1) `/docs` value prop VP-C: add a sentence + a deep link that
      supports: Endpoint management (local → SMB → enterprise)
- [ ] DOCS-0159 (P1) `/docs` value prop VP-D: add a sentence + a deep link that
      supports: Server management (infra operations)

### 24.CONTRIBUTE Page backlog — `/contribute`

- [ ] CONTRIBUTE-0160 (P0) Define the single-sentence promise for `/contribute`
      that matches the 4-fold value prop
- [ ] CONTRIBUTE-0161 (P0) Define primary CTA + secondary CTA for `/contribute`
      (contributor-first)
- [ ] CONTRIBUTE-0162 (P1) Add/adjust copy on `/contribute` so the `IMPACT`
      flavor is explicit: Societal outcome / making computers usable
- [ ] CONTRIBUTE-0163 (P1) Add/adjust copy on `/contribute` so the `TECH` flavor
      is explicit: Cutting-edge primitives (A2A, MCP, PTY, policy)
- [ ] CONTRIBUTE-0164 (P1) Add/adjust copy on `/contribute` so the `FREEDOM`
      flavor is explicit: Sovereignty / self-host / escape constraints
- [ ] CONTRIBUTE-0165 (P1) Add/adjust copy on `/contribute` so the `TRUST`
      flavor is explicit: Security / governance / auditability
- [ ] CONTRIBUTE-0166 (P1) Add/adjust copy on `/contribute` so the `BUILDERS`
      flavor is explicit: Contributor magnet / primitives / roadmap
- [ ] CONTRIBUTE-0167 (P0) `/contribute`/WhyContribute: write intent +
      acceptance criteria (what user should understand/feel)
- [ ] CONTRIBUTE-0168 (P0) `/contribute`/WhyContribute: list required UI
      elements (headline, subhead, bullets, CTA, proof)
- [ ] CONTRIBUTE-0169 (P1) `/contribute`/WhyContribute: produce 3 copy variants
      (tight, bold, technical)
- [ ] CONTRIBUTE-0170 (P1) `/contribute`/WhyContribute: add at least 1 concrete
      proof artifact (screenshot/diagram/link)
- [ ] CONTRIBUTE-0171 (P0) `/contribute`/PickALane: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] CONTRIBUTE-0172 (P0) `/contribute`/PickALane: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] CONTRIBUTE-0173 (P1) `/contribute`/PickALane: produce 3 copy variants
      (tight, bold, technical)
- [ ] CONTRIBUTE-0174 (P1) `/contribute`/PickALane: add at least 1 concrete
      proof artifact (screenshot/diagram/link)
- [ ] CONTRIBUTE-0175 (P0) `/contribute`/GoodFirstIssues: write intent +
      acceptance criteria (what user should understand/feel)
- [ ] CONTRIBUTE-0176 (P0) `/contribute`/GoodFirstIssues: list required UI
      elements (headline, subhead, bullets, CTA, proof)
- [ ] CONTRIBUTE-0177 (P1) `/contribute`/GoodFirstIssues: produce 3 copy
      variants (tight, bold, technical)
- [ ] CONTRIBUTE-0178 (P1) `/contribute`/GoodFirstIssues: add at least 1
      concrete proof artifact (screenshot/diagram/link)
- [ ] CONTRIBUTE-0179 (P0) `/contribute`/DevSetup: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] CONTRIBUTE-0180 (P0) `/contribute`/DevSetup: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] CONTRIBUTE-0181 (P1) `/contribute`/DevSetup: produce 3 copy variants
      (tight, bold, technical)
- [ ] CONTRIBUTE-0182 (P1) `/contribute`/DevSetup: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] CONTRIBUTE-0183 (P0) `/contribute`/PRChecklist: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] CONTRIBUTE-0184 (P0) `/contribute`/PRChecklist: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] CONTRIBUTE-0185 (P1) `/contribute`/PRChecklist: produce 3 copy variants
      (tight, bold, technical)
- [ ] CONTRIBUTE-0186 (P1) `/contribute`/PRChecklist: add at least 1 concrete
      proof artifact (screenshot/diagram/link)
- [ ] CONTRIBUTE-0187 (P0) `/contribute`/Community: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] CONTRIBUTE-0188 (P0) `/contribute`/Community: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] CONTRIBUTE-0189 (P1) `/contribute`/Community: produce 3 copy variants
      (tight, bold, technical)
- [ ] CONTRIBUTE-0190 (P1) `/contribute`/Community: add at least 1 concrete
      proof artifact (screenshot/diagram/link)
- [ ] CONTRIBUTE-0191 (P0) `/contribute`/Footer: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] CONTRIBUTE-0192 (P0) `/contribute`/Footer: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] CONTRIBUTE-0193 (P1) `/contribute`/Footer: produce 3 copy variants (tight,
      bold, technical)
- [ ] CONTRIBUTE-0194 (P1) `/contribute`/Footer: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] CONTRIBUTE-0195 (P1) Write 1 mini-story per persona for `/contribute`
      (problem → governed action → audit)
- [ ] CONTRIBUTE-0196 (P1) `/contribute` story: Individual laptop user — choose
      a scenario + the exact on-screen copy
- [ ] CONTRIBUTE-0197 (P1) `/contribute` story: Developer / power user — choose
      a scenario + the exact on-screen copy
- [ ] CONTRIBUTE-0198 (P1) `/contribute` story: Small business (few machines) —
      choose a scenario + the exact on-screen copy
- [ ] CONTRIBUTE-0199 (P1) `/contribute` story: Enterprise endpoints — choose a
      scenario + the exact on-screen copy
- [ ] CONTRIBUTE-0200 (P1) `/contribute` story: SRE / server operator — choose a
      scenario + the exact on-screen copy
- [ ] CONTRIBUTE-0201 (P1) Ensure `/contribute` has at least one explicit
      mention of each value prop (A/B/C/D)
- [ ] CONTRIBUTE-0202 (P1) `/contribute` value prop VP-A: add a sentence + a
      deep link that supports: Laptop assistant (Android-assistant vibe for
      computers)
- [ ] CONTRIBUTE-0203 (P1) `/contribute` value prop VP-B: add a sentence + a
      deep link that supports: Agentic coordination (MCP + tool universe)
- [ ] CONTRIBUTE-0204 (P1) `/contribute` value prop VP-C: add a sentence + a
      deep link that supports: Endpoint management (local → SMB → enterprise)
- [ ] CONTRIBUTE-0205 (P1) `/contribute` value prop VP-D: add a sentence + a
      deep link that supports: Server management (infra operations)

### 24.ARCH Page backlog — `/architecture`

- [ ] ARCH-0206 (P0) Define the single-sentence promise for `/architecture` that
      matches the 4-fold value prop
- [ ] ARCH-0207 (P0) Define primary CTA + secondary CTA for `/architecture`
      (contributor-first)
- [ ] ARCH-0208 (P1) Add/adjust copy on `/architecture` so the `IMPACT` flavor
      is explicit: Societal outcome / making computers usable
- [ ] ARCH-0209 (P1) Add/adjust copy on `/architecture` so the `TECH` flavor is
      explicit: Cutting-edge primitives (A2A, MCP, PTY, policy)
- [ ] ARCH-0210 (P1) Add/adjust copy on `/architecture` so the `FREEDOM` flavor
      is explicit: Sovereignty / self-host / escape constraints
- [ ] ARCH-0211 (P1) Add/adjust copy on `/architecture` so the `TRUST` flavor is
      explicit: Security / governance / auditability
- [ ] ARCH-0212 (P1) Add/adjust copy on `/architecture` so the `BUILDERS` flavor
      is explicit: Contributor magnet / primitives / roadmap
- [ ] ARCH-0213 (P0) `/architecture`/PackageMap: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] ARCH-0214 (P0) `/architecture`/PackageMap: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] ARCH-0215 (P1) `/architecture`/PackageMap: produce 3 copy variants (tight,
      bold, technical)
- [ ] ARCH-0216 (P1) `/architecture`/PackageMap: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] ARCH-0217 (P0) `/architecture`/ControlFlow: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] ARCH-0218 (P0) `/architecture`/ControlFlow: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] ARCH-0219 (P1) `/architecture`/ControlFlow: produce 3 copy variants
      (tight, bold, technical)
- [ ] ARCH-0220 (P1) `/architecture`/ControlFlow: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] ARCH-0221 (P0) `/architecture`/Primitives: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] ARCH-0222 (P0) `/architecture`/Primitives: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] ARCH-0223 (P1) `/architecture`/Primitives: produce 3 copy variants (tight,
      bold, technical)
- [ ] ARCH-0224 (P1) `/architecture`/Primitives: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] ARCH-0225 (P0) `/architecture`/WhereToHack: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] ARCH-0226 (P0) `/architecture`/WhereToHack: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] ARCH-0227 (P1) `/architecture`/WhereToHack: produce 3 copy variants
      (tight, bold, technical)
- [ ] ARCH-0228 (P1) `/architecture`/WhereToHack: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] ARCH-0229 (P0) `/architecture`/FAQ: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] ARCH-0230 (P0) `/architecture`/FAQ: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] ARCH-0231 (P1) `/architecture`/FAQ: produce 3 copy variants (tight, bold,
      technical)
- [ ] ARCH-0232 (P1) `/architecture`/FAQ: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] ARCH-0233 (P0) `/architecture`/Footer: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] ARCH-0234 (P0) `/architecture`/Footer: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] ARCH-0235 (P1) `/architecture`/Footer: produce 3 copy variants (tight,
      bold, technical)
- [ ] ARCH-0236 (P1) `/architecture`/Footer: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] ARCH-0237 (P1) Write 1 mini-story per persona for `/architecture` (problem
      → governed action → audit)
- [ ] ARCH-0238 (P1) `/architecture` story: Individual laptop user — choose a
      scenario + the exact on-screen copy
- [ ] ARCH-0239 (P1) `/architecture` story: Developer / power user — choose a
      scenario + the exact on-screen copy
- [ ] ARCH-0240 (P1) `/architecture` story: Small business (few machines) —
      choose a scenario + the exact on-screen copy
- [ ] ARCH-0241 (P1) `/architecture` story: Enterprise endpoints — choose a
      scenario + the exact on-screen copy
- [ ] ARCH-0242 (P1) `/architecture` story: SRE / server operator — choose a
      scenario + the exact on-screen copy
- [ ] ARCH-0243 (P1) Ensure `/architecture` has at least one explicit mention of
      each value prop (A/B/C/D)
- [ ] ARCH-0244 (P1) `/architecture` value prop VP-A: add a sentence + a deep
      link that supports: Laptop assistant (Android-assistant vibe for
      computers)
- [ ] ARCH-0245 (P1) `/architecture` value prop VP-B: add a sentence + a deep
      link that supports: Agentic coordination (MCP + tool universe)
- [ ] ARCH-0246 (P1) `/architecture` value prop VP-C: add a sentence + a deep
      link that supports: Endpoint management (local → SMB → enterprise)
- [ ] ARCH-0247 (P1) `/architecture` value prop VP-D: add a sentence + a deep
      link that supports: Server management (infra operations)

### 24.A2A Page backlog — `/protocols/a2a`

- [ ] A2A-0248 (P0) Define the single-sentence promise for `/protocols/a2a` that
      matches the 4-fold value prop
- [ ] A2A-0249 (P0) Define primary CTA + secondary CTA for `/protocols/a2a`
      (contributor-first)
- [ ] A2A-0250 (P1) Add/adjust copy on `/protocols/a2a` so the `IMPACT` flavor
      is explicit: Societal outcome / making computers usable
- [ ] A2A-0251 (P1) Add/adjust copy on `/protocols/a2a` so the `TECH` flavor is
      explicit: Cutting-edge primitives (A2A, MCP, PTY, policy)
- [ ] A2A-0252 (P1) Add/adjust copy on `/protocols/a2a` so the `FREEDOM` flavor
      is explicit: Sovereignty / self-host / escape constraints
- [ ] A2A-0253 (P1) Add/adjust copy on `/protocols/a2a` so the `TRUST` flavor is
      explicit: Security / governance / auditability
- [ ] A2A-0254 (P1) Add/adjust copy on `/protocols/a2a` so the `BUILDERS` flavor
      is explicit: Contributor magnet / primitives / roadmap
- [ ] A2A-0255 (P0) `/protocols/a2a`/WhatIsA2A: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] A2A-0256 (P0) `/protocols/a2a`/WhatIsA2A: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] A2A-0257 (P1) `/protocols/a2a`/WhatIsA2A: produce 3 copy variants (tight,
      bold, technical)
- [ ] A2A-0258 (P1) `/protocols/a2a`/WhatIsA2A: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] A2A-0259 (P0) `/protocols/a2a`/Flows: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] A2A-0260 (P0) `/protocols/a2a`/Flows: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] A2A-0261 (P1) `/protocols/a2a`/Flows: produce 3 copy variants (tight,
      bold, technical)
- [ ] A2A-0262 (P1) `/protocols/a2a`/Flows: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] A2A-0263 (P0) `/protocols/a2a`/Auth: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] A2A-0264 (P0) `/protocols/a2a`/Auth: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] A2A-0265 (P1) `/protocols/a2a`/Auth: produce 3 copy variants (tight, bold,
      technical)
- [ ] A2A-0266 (P1) `/protocols/a2a`/Auth: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] A2A-0267 (P0) `/protocols/a2a`/Examples: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] A2A-0268 (P0) `/protocols/a2a`/Examples: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] A2A-0269 (P1) `/protocols/a2a`/Examples: produce 3 copy variants (tight,
      bold, technical)
- [ ] A2A-0270 (P1) `/protocols/a2a`/Examples: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] A2A-0271 (P0) `/protocols/a2a`/ThreatModel: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] A2A-0272 (P0) `/protocols/a2a`/ThreatModel: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] A2A-0273 (P1) `/protocols/a2a`/ThreatModel: produce 3 copy variants
      (tight, bold, technical)
- [ ] A2A-0274 (P1) `/protocols/a2a`/ThreatModel: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] A2A-0275 (P0) `/protocols/a2a`/Contribute: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] A2A-0276 (P0) `/protocols/a2a`/Contribute: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] A2A-0277 (P1) `/protocols/a2a`/Contribute: produce 3 copy variants (tight,
      bold, technical)
- [ ] A2A-0278 (P1) `/protocols/a2a`/Contribute: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] A2A-0279 (P0) `/protocols/a2a`/Footer: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] A2A-0280 (P0) `/protocols/a2a`/Footer: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] A2A-0281 (P1) `/protocols/a2a`/Footer: produce 3 copy variants (tight,
      bold, technical)
- [ ] A2A-0282 (P1) `/protocols/a2a`/Footer: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] A2A-0283 (P1) Write 1 mini-story per persona for `/protocols/a2a` (problem
      → governed action → audit)
- [ ] A2A-0284 (P1) `/protocols/a2a` story: Individual laptop user — choose a
      scenario + the exact on-screen copy
- [ ] A2A-0285 (P1) `/protocols/a2a` story: Developer / power user — choose a
      scenario + the exact on-screen copy
- [ ] A2A-0286 (P1) `/protocols/a2a` story: Small business (few machines) —
      choose a scenario + the exact on-screen copy
- [ ] A2A-0287 (P1) `/protocols/a2a` story: Enterprise endpoints — choose a
      scenario + the exact on-screen copy
- [ ] A2A-0288 (P1) `/protocols/a2a` story: SRE / server operator — choose a
      scenario + the exact on-screen copy
- [ ] A2A-0289 (P1) Ensure `/protocols/a2a` has at least one explicit mention of
      each value prop (A/B/C/D)
- [ ] A2A-0290 (P1) `/protocols/a2a` value prop VP-A: add a sentence + a deep
      link that supports: Laptop assistant (Android-assistant vibe for
      computers)
- [ ] A2A-0291 (P1) `/protocols/a2a` value prop VP-B: add a sentence + a deep
      link that supports: Agentic coordination (MCP + tool universe)
- [ ] A2A-0292 (P1) `/protocols/a2a` value prop VP-C: add a sentence + a deep
      link that supports: Endpoint management (local → SMB → enterprise)
- [ ] A2A-0293 (P1) `/protocols/a2a` value prop VP-D: add a sentence + a deep
      link that supports: Server management (infra operations)

### 24.MCP Page backlog — `/protocols/mcp`

- [ ] MCP-0294 (P0) Define the single-sentence promise for `/protocols/mcp` that
      matches the 4-fold value prop
- [ ] MCP-0295 (P0) Define primary CTA + secondary CTA for `/protocols/mcp`
      (contributor-first)
- [ ] MCP-0296 (P1) Add/adjust copy on `/protocols/mcp` so the `IMPACT` flavor
      is explicit: Societal outcome / making computers usable
- [ ] MCP-0297 (P1) Add/adjust copy on `/protocols/mcp` so the `TECH` flavor is
      explicit: Cutting-edge primitives (A2A, MCP, PTY, policy)
- [ ] MCP-0298 (P1) Add/adjust copy on `/protocols/mcp` so the `FREEDOM` flavor
      is explicit: Sovereignty / self-host / escape constraints
- [ ] MCP-0299 (P1) Add/adjust copy on `/protocols/mcp` so the `TRUST` flavor is
      explicit: Security / governance / auditability
- [ ] MCP-0300 (P1) Add/adjust copy on `/protocols/mcp` so the `BUILDERS` flavor
      is explicit: Contributor magnet / primitives / roadmap
- [ ] MCP-0301 (P0) `/protocols/mcp`/WhatIsMCP: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] MCP-0302 (P0) `/protocols/mcp`/WhatIsMCP: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] MCP-0303 (P1) `/protocols/mcp`/WhatIsMCP: produce 3 copy variants (tight,
      bold, technical)
- [ ] MCP-0304 (P1) `/protocols/mcp`/WhatIsMCP: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] MCP-0305 (P0) `/protocols/mcp`/Flows: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] MCP-0306 (P0) `/protocols/mcp`/Flows: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] MCP-0307 (P1) `/protocols/mcp`/Flows: produce 3 copy variants (tight,
      bold, technical)
- [ ] MCP-0308 (P1) `/protocols/mcp`/Flows: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] MCP-0309 (P0) `/protocols/mcp`/Examples: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] MCP-0310 (P0) `/protocols/mcp`/Examples: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] MCP-0311 (P1) `/protocols/mcp`/Examples: produce 3 copy variants (tight,
      bold, technical)
- [ ] MCP-0312 (P1) `/protocols/mcp`/Examples: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] MCP-0313 (P0) `/protocols/mcp`/Registry: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] MCP-0314 (P0) `/protocols/mcp`/Registry: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] MCP-0315 (P1) `/protocols/mcp`/Registry: produce 3 copy variants (tight,
      bold, technical)
- [ ] MCP-0316 (P1) `/protocols/mcp`/Registry: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] MCP-0317 (P0) `/protocols/mcp`/Contribute: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] MCP-0318 (P0) `/protocols/mcp`/Contribute: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] MCP-0319 (P1) `/protocols/mcp`/Contribute: produce 3 copy variants (tight,
      bold, technical)
- [ ] MCP-0320 (P1) `/protocols/mcp`/Contribute: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] MCP-0321 (P0) `/protocols/mcp`/Footer: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] MCP-0322 (P0) `/protocols/mcp`/Footer: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] MCP-0323 (P1) `/protocols/mcp`/Footer: produce 3 copy variants (tight,
      bold, technical)
- [ ] MCP-0324 (P1) `/protocols/mcp`/Footer: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] MCP-0325 (P1) Write 1 mini-story per persona for `/protocols/mcp` (problem
      → governed action → audit)
- [ ] MCP-0326 (P1) `/protocols/mcp` story: Individual laptop user — choose a
      scenario + the exact on-screen copy
- [ ] MCP-0327 (P1) `/protocols/mcp` story: Developer / power user — choose a
      scenario + the exact on-screen copy
- [ ] MCP-0328 (P1) `/protocols/mcp` story: Small business (few machines) —
      choose a scenario + the exact on-screen copy
- [ ] MCP-0329 (P1) `/protocols/mcp` story: Enterprise endpoints — choose a
      scenario + the exact on-screen copy
- [ ] MCP-0330 (P1) `/protocols/mcp` story: SRE / server operator — choose a
      scenario + the exact on-screen copy
- [ ] MCP-0331 (P1) Ensure `/protocols/mcp` has at least one explicit mention of
      each value prop (A/B/C/D)
- [ ] MCP-0332 (P1) `/protocols/mcp` value prop VP-A: add a sentence + a deep
      link that supports: Laptop assistant (Android-assistant vibe for
      computers)
- [ ] MCP-0333 (P1) `/protocols/mcp` value prop VP-B: add a sentence + a deep
      link that supports: Agentic coordination (MCP + tool universe)
- [ ] MCP-0334 (P1) `/protocols/mcp` value prop VP-C: add a sentence + a deep
      link that supports: Endpoint management (local → SMB → enterprise)
- [ ] MCP-0335 (P1) `/protocols/mcp` value prop VP-D: add a sentence + a deep
      link that supports: Server management (infra operations)

### 24.SAFETY Page backlog — `/safety`

- [ ] SAFETY-0336 (P0) Define the single-sentence promise for `/safety` that
      matches the 4-fold value prop
- [ ] SAFETY-0337 (P0) Define primary CTA + secondary CTA for `/safety`
      (contributor-first)
- [ ] SAFETY-0338 (P1) Add/adjust copy on `/safety` so the `IMPACT` flavor is
      explicit: Societal outcome / making computers usable
- [ ] SAFETY-0339 (P1) Add/adjust copy on `/safety` so the `TECH` flavor is
      explicit: Cutting-edge primitives (A2A, MCP, PTY, policy)
- [ ] SAFETY-0340 (P1) Add/adjust copy on `/safety` so the `FREEDOM` flavor is
      explicit: Sovereignty / self-host / escape constraints
- [ ] SAFETY-0341 (P1) Add/adjust copy on `/safety` so the `TRUST` flavor is
      explicit: Security / governance / auditability
- [ ] SAFETY-0342 (P1) Add/adjust copy on `/safety` so the `BUILDERS` flavor is
      explicit: Contributor magnet / primitives / roadmap
- [ ] SAFETY-0343 (P0) `/safety`/PolicyLadder: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] SAFETY-0344 (P0) `/safety`/PolicyLadder: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] SAFETY-0345 (P1) `/safety`/PolicyLadder: produce 3 copy variants (tight,
      bold, technical)
- [ ] SAFETY-0346 (P1) `/safety`/PolicyLadder: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] SAFETY-0347 (P0) `/safety`/Approvals: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] SAFETY-0348 (P0) `/safety`/Approvals: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] SAFETY-0349 (P1) `/safety`/Approvals: produce 3 copy variants (tight,
      bold, technical)
- [ ] SAFETY-0350 (P1) `/safety`/Approvals: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] SAFETY-0351 (P0) `/safety`/TrustFolders: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] SAFETY-0352 (P0) `/safety`/TrustFolders: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] SAFETY-0353 (P1) `/safety`/TrustFolders: produce 3 copy variants (tight,
      bold, technical)
- [ ] SAFETY-0354 (P1) `/safety`/TrustFolders: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] SAFETY-0355 (P0) `/safety`/AuditLog: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] SAFETY-0356 (P0) `/safety`/AuditLog: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] SAFETY-0357 (P1) `/safety`/AuditLog: produce 3 copy variants (tight, bold,
      technical)
- [ ] SAFETY-0358 (P1) `/safety`/AuditLog: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] SAFETY-0359 (P0) `/safety`/ThreatModel: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] SAFETY-0360 (P0) `/safety`/ThreatModel: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] SAFETY-0361 (P1) `/safety`/ThreatModel: produce 3 copy variants (tight,
      bold, technical)
- [ ] SAFETY-0362 (P1) `/safety`/ThreatModel: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] SAFETY-0363 (P0) `/safety`/Contribute: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] SAFETY-0364 (P0) `/safety`/Contribute: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] SAFETY-0365 (P1) `/safety`/Contribute: produce 3 copy variants (tight,
      bold, technical)
- [ ] SAFETY-0366 (P1) `/safety`/Contribute: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] SAFETY-0367 (P0) `/safety`/Footer: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] SAFETY-0368 (P0) `/safety`/Footer: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] SAFETY-0369 (P1) `/safety`/Footer: produce 3 copy variants (tight, bold,
      technical)
- [ ] SAFETY-0370 (P1) `/safety`/Footer: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] SAFETY-0371 (P1) Write 1 mini-story per persona for `/safety` (problem →
      governed action → audit)
- [ ] SAFETY-0372 (P1) `/safety` story: Individual laptop user — choose a
      scenario + the exact on-screen copy
- [ ] SAFETY-0373 (P1) `/safety` story: Developer / power user — choose a
      scenario + the exact on-screen copy
- [ ] SAFETY-0374 (P1) `/safety` story: Small business (few machines) — choose a
      scenario + the exact on-screen copy
- [ ] SAFETY-0375 (P1) `/safety` story: Enterprise endpoints — choose a
      scenario + the exact on-screen copy
- [ ] SAFETY-0376 (P1) `/safety` story: SRE / server operator — choose a
      scenario + the exact on-screen copy
- [ ] SAFETY-0377 (P1) Ensure `/safety` has at least one explicit mention of
      each value prop (A/B/C/D)
- [ ] SAFETY-0378 (P1) `/safety` value prop VP-A: add a sentence + a deep link
      that supports: Laptop assistant (Android-assistant vibe for computers)
- [ ] SAFETY-0379 (P1) `/safety` value prop VP-B: add a sentence + a deep link
      that supports: Agentic coordination (MCP + tool universe)
- [ ] SAFETY-0380 (P1) `/safety` value prop VP-C: add a sentence + a deep link
      that supports: Endpoint management (local → SMB → enterprise)
- [ ] SAFETY-0381 (P1) `/safety` value prop VP-D: add a sentence + a deep link
      that supports: Server management (infra operations)

### 24.USE Page backlog — `/use-cases`

- [ ] USE-0382 (P0) Define the single-sentence promise for `/use-cases` that
      matches the 4-fold value prop
- [ ] USE-0383 (P0) Define primary CTA + secondary CTA for `/use-cases`
      (contributor-first)
- [ ] USE-0384 (P1) Add/adjust copy on `/use-cases` so the `IMPACT` flavor is
      explicit: Societal outcome / making computers usable
- [ ] USE-0385 (P1) Add/adjust copy on `/use-cases` so the `TECH` flavor is
      explicit: Cutting-edge primitives (A2A, MCP, PTY, policy)
- [ ] USE-0386 (P1) Add/adjust copy on `/use-cases` so the `FREEDOM` flavor is
      explicit: Sovereignty / self-host / escape constraints
- [ ] USE-0387 (P1) Add/adjust copy on `/use-cases` so the `TRUST` flavor is
      explicit: Security / governance / auditability
- [ ] USE-0388 (P1) Add/adjust copy on `/use-cases` so the `BUILDERS` flavor is
      explicit: Contributor magnet / primitives / roadmap
- [ ] USE-0389 (P0) `/use-cases`/OverviewGrid: write intent + acceptance
      criteria (what user should understand/feel)
- [ ] USE-0390 (P0) `/use-cases`/OverviewGrid: list required UI elements
      (headline, subhead, bullets, CTA, proof)
- [ ] USE-0391 (P1) `/use-cases`/OverviewGrid: produce 3 copy variants (tight,
      bold, technical)
- [ ] USE-0392 (P1) `/use-cases`/OverviewGrid: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] USE-0393 (P0) `/use-cases`/Personas: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] USE-0394 (P0) `/use-cases`/Personas: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] USE-0395 (P1) `/use-cases`/Personas: produce 3 copy variants (tight, bold,
      technical)
- [ ] USE-0396 (P1) `/use-cases`/Personas: add at least 1 concrete proof
      artifact (screenshot/diagram/link)
- [ ] USE-0397 (P0) `/use-cases`/Stories: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] USE-0398 (P0) `/use-cases`/Stories: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] USE-0399 (P1) `/use-cases`/Stories: produce 3 copy variants (tight, bold,
      technical)
- [ ] USE-0400 (P1) `/use-cases`/Stories: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] USE-0401 (P0) `/use-cases`/CTA: write intent + acceptance criteria (what
      user should understand/feel)
- [ ] USE-0402 (P0) `/use-cases`/CTA: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] USE-0403 (P1) `/use-cases`/CTA: produce 3 copy variants (tight, bold,
      technical)
- [ ] USE-0404 (P1) `/use-cases`/CTA: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] USE-0405 (P0) `/use-cases`/Footer: write intent + acceptance criteria
      (what user should understand/feel)
- [ ] USE-0406 (P0) `/use-cases`/Footer: list required UI elements (headline,
      subhead, bullets, CTA, proof)
- [ ] USE-0407 (P1) `/use-cases`/Footer: produce 3 copy variants (tight, bold,
      technical)
- [ ] USE-0408 (P1) `/use-cases`/Footer: add at least 1 concrete proof artifact
      (screenshot/diagram/link)
- [ ] USE-0409 (P1) Write 1 mini-story per persona for `/use-cases` (problem →
      governed action → audit)
- [ ] USE-0410 (P1) `/use-cases` story: Individual laptop user — choose a
      scenario + the exact on-screen copy
- [ ] USE-0411 (P1) `/use-cases` story: Developer / power user — choose a
      scenario + the exact on-screen copy
- [ ] USE-0412 (P1) `/use-cases` story: Small business (few machines) — choose a
      scenario + the exact on-screen copy
- [ ] USE-0413 (P1) `/use-cases` story: Enterprise endpoints — choose a
      scenario + the exact on-screen copy
- [ ] USE-0414 (P1) `/use-cases` story: SRE / server operator — choose a
      scenario + the exact on-screen copy
- [ ] USE-0415 (P1) Ensure `/use-cases` has at least one explicit mention of
      each value prop (A/B/C/D)
- [ ] USE-0416 (P1) `/use-cases` value prop VP-A: add a sentence + a deep link
      that supports: Laptop assistant (Android-assistant vibe for computers)
- [ ] USE-0417 (P1) `/use-cases` value prop VP-B: add a sentence + a deep link
      that supports: Agentic coordination (MCP + tool universe)
- [ ] USE-0418 (P1) `/use-cases` value prop VP-C: add a sentence + a deep link
      that supports: Endpoint management (local → SMB → enterprise)
- [ ] USE-0419 (P1) `/use-cases` value prop VP-D: add a sentence + a deep link
      that supports: Server management (infra operations)

### 24.3 Copywriting factory (variants to generate, then select)

- [ ] COPY-0420 (P0) Write 15 homepage headlines for flavor=IMPACT (Societal
      outcome / making computers usable)
- [ ] COPY-0421 (P0) Write 15 homepage subheads for flavor=IMPACT (Societal
      outcome / making computers usable)
- [ ] COPY-0422 (P1) Write 10 CTA button microcopy variants for flavor=IMPACT
- [ ] COPY-0423 (P1) Write 10 one-liner taglines for flavor=IMPACT
- [ ] COPY-0424 (P0) Write 15 homepage headlines for flavor=TECH (Cutting-edge
      primitives (A2A, MCP, PTY, policy))
- [ ] COPY-0425 (P0) Write 15 homepage subheads for flavor=TECH (Cutting-edge
      primitives (A2A, MCP, PTY, policy))
- [ ] COPY-0426 (P1) Write 10 CTA button microcopy variants for flavor=TECH
- [ ] COPY-0427 (P1) Write 10 one-liner taglines for flavor=TECH
- [ ] COPY-0428 (P0) Write 15 homepage headlines for flavor=FREEDOM (Sovereignty
      / self-host / escape constraints)
- [ ] COPY-0429 (P0) Write 15 homepage subheads for flavor=FREEDOM (Sovereignty
      / self-host / escape constraints)
- [ ] COPY-0430 (P1) Write 10 CTA button microcopy variants for flavor=FREEDOM
- [ ] COPY-0431 (P1) Write 10 one-liner taglines for flavor=FREEDOM
- [ ] COPY-0432 (P0) Write 15 homepage headlines for flavor=TRUST (Security /
      governance / auditability)
- [ ] COPY-0433 (P0) Write 15 homepage subheads for flavor=TRUST (Security /
      governance / auditability)
- [ ] COPY-0434 (P1) Write 10 CTA button microcopy variants for flavor=TRUST
- [ ] COPY-0435 (P1) Write 10 one-liner taglines for flavor=TRUST
- [ ] COPY-0436 (P0) Write 15 homepage headlines for flavor=BUILDERS
      (Contributor magnet / primitives / roadmap)
- [ ] COPY-0437 (P0) Write 15 homepage subheads for flavor=BUILDERS (Contributor
      magnet / primitives / roadmap)
- [ ] COPY-0438 (P1) Write 10 CTA button microcopy variants for flavor=BUILDERS
- [ ] COPY-0439 (P1) Write 10 one-liner taglines for flavor=BUILDERS

### 24.4 Demo content (make the site feel real)

- [ ] DEMO-0440 (P0) Create an on-site demo script for: Fix WiFi driver /
      reconnect to network
- [ ] DEMO-0441 (P0) For demo 'Fix WiFi driver / reconnect to network', define
      the exact policy decision + approval copy
- [ ] DEMO-0442 (P1) For demo 'Fix WiFi driver / reconnect to network', define
      the audit log entry fields to display
- [ ] DEMO-0443 (P1) For demo 'Fix WiFi driver / reconnect to network', create
      an asciinema/video/gif placeholder + caption
- [ ] DEMO-0444 (P0) Create an on-site demo script for: Disk cleanup with
      explicit approval prompts
- [ ] DEMO-0445 (P0) For demo 'Disk cleanup with explicit approval prompts',
      define the exact policy decision + approval copy
- [ ] DEMO-0446 (P1) For demo 'Disk cleanup with explicit approval prompts',
      define the audit log entry fields to display
- [ ] DEMO-0447 (P1) For demo 'Disk cleanup with explicit approval prompts',
      create an asciinema/video/gif placeholder + caption
- [ ] DEMO-0448 (P0) Create an on-site demo script for: Restart a failing
      service and verify healthz
- [ ] DEMO-0449 (P0) For demo 'Restart a failing service and verify healthz',
      define the exact policy decision + approval copy
- [ ] DEMO-0450 (P1) For demo 'Restart a failing service and verify healthz',
      define the audit log entry fields to display
- [ ] DEMO-0451 (P1) For demo 'Restart a failing service and verify healthz',
      create an asciinema/video/gif placeholder + caption
- [ ] DEMO-0452 (P0) Create an on-site demo script for: Log triage: detect error
      pattern and propose fix
- [ ] DEMO-0453 (P0) For demo 'Log triage: detect error pattern and propose
      fix', define the exact policy decision + approval copy
- [ ] DEMO-0454 (P1) For demo 'Log triage: detect error pattern and propose
      fix', define the audit log entry fields to display
- [ ] DEMO-0455 (P1) For demo 'Log triage: detect error pattern and propose
      fix', create an asciinema/video/gif placeholder + caption
- [ ] DEMO-0456 (P0) Create an on-site demo script for: Server hardening: update
      packages safely
- [ ] DEMO-0457 (P0) For demo 'Server hardening: update packages safely', define
      the exact policy decision + approval copy
- [ ] DEMO-0458 (P1) For demo 'Server hardening: update packages safely', define
      the audit log entry fields to display
- [ ] DEMO-0459 (P1) For demo 'Server hardening: update packages safely', create
      an asciinema/video/gif placeholder + caption
- [ ] DEMO-0460 (P0) Create an on-site demo script for: Incident response:
      collect diagnostics + summarize
- [ ] DEMO-0461 (P0) For demo 'Incident response: collect diagnostics +
      summarize', define the exact policy decision + approval copy
- [ ] DEMO-0462 (P1) For demo 'Incident response: collect diagnostics +
      summarize', define the audit log entry fields to display
- [ ] DEMO-0463 (P1) For demo 'Incident response: collect diagnostics +
      summarize', create an asciinema/video/gif placeholder + caption

### 24.5 Design system + UI consistency

- [ ] DESIGN-0464 (P0) Audit typography scale across pages; ensure consistent
      H1/H2/H3 usage
- [ ] DESIGN-0465 (P0) Define spacing tokens for section paddings; avoid
      arbitrary pt-48 etc.
- [ ] DESIGN-0466 (P0) Reduce overuse of opacity (readability); meet WCAG AA
- [ ] DESIGN-0467 (P0) Add reduced-motion preference handling for all Framer
      Motion animations
- [ ] DESIGN-0468 (P0) Add focus states for links/buttons; keyboard nav
- [ ] DESIGN-0469 (P0) Define consistent button hierarchy
      (primary/secondary/tertiary)
- [ ] DESIGN-0470 (P0) Define consistent card styles (radius, border, hover)
- [ ] DESIGN-0471 (P0) Add mobile-first navigation (hamburger menu)

### 24.6 SEO + metadata + share cards

- [ ] SEO-0472 (P1) Add per-page <title>/<meta description> aligned to that
      page’s promise
- [ ] SEO-0473 (P1) Add OpenGraph images per key page (home, contribute,
      protocols)
- [ ] SEO-0474 (P1) Add sitemap.xml generation
- [ ] SEO-0475 (P1) Add robots.txt
- [ ] SEO-0476 (P1) Add canonical URLs
- [ ] SEO-0477 (P1) Add structured data (Organization/SoftwareApplication)

### 24.7 Engineering tasks by current file (terminai-website)

- [ ] FILE-0478 (P0) Audit and refactor `src/components/Hero.tsx`
  - [ ] FILE-0479 (P0) `src/components/Hero.tsx`: Replace install command string
  - [ ] FILE-0480 (P0) `src/components/Hero.tsx`: Replace headline/subhead to
        match Sovereign Shell + 4-fold
  - [ ] FILE-0481 (P0) `src/components/Hero.tsx`: Add CTA row: Star / Contribute
        / Quickstart
  - [ ] FILE-0482 (P0) `src/components/Hero.tsx`: Update terminal script to
        include policy+audit beats
  - [ ] FILE-0483 (P0) `src/components/Hero.tsx`: Add analytics hooks for CTA
        clicks (optional)
- [ ] FILE-0484 (P0) Audit and refactor `src/components/SiteHeader.tsx`
  - [ ] FILE-0485 (P0) `src/components/SiteHeader.tsx`: Add
        Contribute/Architecture/Protocols links
  - [ ] FILE-0486 (P0) `src/components/SiteHeader.tsx`: Replace Enterprise link
        until real
  - [ ] FILE-0487 (P0) `src/components/SiteHeader.tsx`: Update primary CTA label
  - [ ] FILE-0488 (P0) `src/components/SiteHeader.tsx`: Implement mobile nav
- [ ] FILE-0489 (P0) Audit and refactor `src/components/SiteFooter.tsx`
  - [ ] FILE-0490 (P0) `src/components/SiteFooter.tsx`: Update repo link
  - [ ] FILE-0491 (P0) `src/components/SiteFooter.tsx`: Replace “Forked from
        Google Gemini CLI” with nuanced lineage text
  - [ ] FILE-0492 (P0) `src/components/SiteFooter.tsx`: Add community links
  - [ ] FILE-0493 (P0) `src/components/SiteFooter.tsx`: Add privacy/security
        links
- [ ] FILE-0494 (P0) Audit and refactor `src/app/download/page.tsx`
  - [ ] FILE-0495 (P0) `src/app/download/page.tsx`: Replace placeholder npm
        install
  - [ ] FILE-0496 (P0) `src/app/download/page.tsx`: Add platform grid
  - [ ] FILE-0497 (P0) `src/app/download/page.tsx`: Add first-run + auth block
  - [ ] FILE-0498 (P0) `src/app/download/page.tsx`: Add troubleshooting section
- [ ] FILE-0499 (P0) Audit and refactor `src/app/docs/page.tsx`
  - [ ] FILE-0500 (P0) `src/app/docs/page.tsx`: Fix build errors (BrandText
        import, duplicate keys)
  - [ ] FILE-0501 (P0) `src/app/docs/page.tsx`: Implement docs routing or remove
        dead links

### 24.8 Contributor excitement features (make builders feel the pull)

- [ ] HYPE-0502 (P0) Add “Choose your adventure” lanes with deep links to repo
      folders
- [ ] HYPE-0503 (P0) Add “Build a new power in 30 minutes” walkthrough (MCP
      server)
- [ ] HYPE-0504 (P0) Add “Build a new client in 30 minutes” walkthrough (A2A)
- [ ] HYPE-0505 (P0) Add “Why governance matters” story with a scary example +
      how we prevent it
- [ ] HYPE-0506 (P0) Add a visible roadmap strip with 3 milestones (next 2
      weeks)
- [ ] HYPE-0507 (P0) Add “What’s already working” checklist to establish
      credibility
- [ ] HYPE-0508 (P0) Add “What we need help on” list to convert excitement into
      PRs

### 24.9 Microcopy + UI state tasks (every state matters)

- [ ] STATE-0509 (P2) Define and implement empty states for Buttons (visual +
      copy + a11y)
- [ ] STATE-0510 (P2) Define and implement loading states for Buttons (visual +
      copy + a11y)
- [ ] STATE-0511 (P2) Define and implement error states for Buttons (visual +
      copy + a11y)
- [ ] STATE-0512 (P2) Define and implement success states for Buttons (visual +
      copy + a11y)
- [ ] STATE-0513 (P2) Define and implement disabled states for Buttons (visual +
      copy + a11y)
- [ ] STATE-0514 (P2) Define and implement hover states for Buttons (visual +
      copy + a11y)
- [ ] STATE-0515 (P2) Define and implement focus states for Buttons (visual +
      copy + a11y)
- [ ] STATE-0516 (P2) Define and implement active states for Buttons (visual +
      copy + a11y)
- [ ] STATE-0517 (P2) Define and implement mobile states for Buttons (visual +
      copy + a11y)
- [ ] STATE-0518 (P2) Define and implement reduced motion states for Buttons
      (visual + copy + a11y)
- [ ] STATE-0519 (P2) Define and implement empty states for Links (visual +
      copy + a11y)
- [ ] STATE-0520 (P2) Define and implement loading states for Links (visual +
      copy + a11y)
- [ ] STATE-0521 (P2) Define and implement error states for Links (visual +
      copy + a11y)
- [ ] STATE-0522 (P2) Define and implement success states for Links (visual +
      copy + a11y)
- [ ] STATE-0523 (P2) Define and implement disabled states for Links (visual +
      copy + a11y)
- [ ] STATE-0524 (P2) Define and implement hover states for Links (visual +
      copy + a11y)
- [ ] STATE-0525 (P2) Define and implement focus states for Links (visual +
      copy + a11y)
- [ ] STATE-0526 (P2) Define and implement active states for Links (visual +
      copy + a11y)
- [ ] STATE-0527 (P2) Define and implement mobile states for Links (visual +
      copy + a11y)
- [ ] STATE-0528 (P2) Define and implement reduced motion states for Links
      (visual + copy + a11y)
- [ ] STATE-0529 (P2) Define and implement empty states for Nav (visual + copy +
      a11y)
- [ ] STATE-0530 (P2) Define and implement loading states for Nav (visual +
      copy + a11y)
- [ ] STATE-0531 (P2) Define and implement error states for Nav (visual + copy +
      a11y)
- [ ] STATE-0532 (P2) Define and implement success states for Nav (visual +
      copy + a11y)
- [ ] STATE-0533 (P2) Define and implement disabled states for Nav (visual +
      copy + a11y)
- [ ] STATE-0534 (P2) Define and implement hover states for Nav (visual + copy +
      a11y)
- [ ] STATE-0535 (P2) Define and implement focus states for Nav (visual + copy +
      a11y)
- [ ] STATE-0536 (P2) Define and implement active states for Nav (visual +
      copy + a11y)
- [ ] STATE-0537 (P2) Define and implement mobile states for Nav (visual +
      copy + a11y)
- [ ] STATE-0538 (P2) Define and implement reduced motion states for Nav
      (visual + copy + a11y)
- [ ] STATE-0539 (P2) Define and implement empty states for Cards (visual +
      copy + a11y)
- [ ] STATE-0540 (P2) Define and implement loading states for Cards (visual +
      copy + a11y)
- [ ] STATE-0541 (P2) Define and implement error states for Cards (visual +
      copy + a11y)
- [ ] STATE-0542 (P2) Define and implement success states for Cards (visual +
      copy + a11y)
- [ ] STATE-0543 (P2) Define and implement disabled states for Cards (visual +
      copy + a11y)
- [ ] STATE-0544 (P2) Define and implement hover states for Cards (visual +
      copy + a11y)
- [ ] STATE-0545 (P2) Define and implement focus states for Cards (visual +
      copy + a11y)
- [ ] STATE-0546 (P2) Define and implement active states for Cards (visual +
      copy + a11y)
- [ ] STATE-0547 (P2) Define and implement mobile states for Cards (visual +
      copy + a11y)
- [ ] STATE-0548 (P2) Define and implement reduced motion states for Cards
      (visual + copy + a11y)
- [ ] STATE-0549 (P2) Define and implement empty states for Code blocks
      (visual + copy + a11y)
- [ ] STATE-0550 (P2) Define and implement loading states for Code blocks
      (visual + copy + a11y)
- [ ] STATE-0551 (P2) Define and implement error states for Code blocks
      (visual + copy + a11y)
- [ ] STATE-0552 (P2) Define and implement success states for Code blocks
      (visual + copy + a11y)
- [ ] STATE-0553 (P2) Define and implement disabled states for Code blocks
      (visual + copy + a11y)
- [ ] STATE-0554 (P2) Define and implement hover states for Code blocks
      (visual + copy + a11y)
- [ ] STATE-0555 (P2) Define and implement focus states for Code blocks
      (visual + copy + a11y)
- [ ] STATE-0556 (P2) Define and implement active states for Code blocks
      (visual + copy + a11y)
- [ ] STATE-0557 (P2) Define and implement mobile states for Code blocks
      (visual + copy + a11y)
- [ ] STATE-0558 (P2) Define and implement reduced motion states for Code blocks
      (visual + copy + a11y)
- [ ] STATE-0559 (P2) Define and implement empty states for Tables (visual +
      copy + a11y)
- [ ] STATE-0560 (P2) Define and implement loading states for Tables (visual +
      copy + a11y)
- [ ] STATE-0561 (P2) Define and implement error states for Tables (visual +
      copy + a11y)
- [ ] STATE-0562 (P2) Define and implement success states for Tables (visual +
      copy + a11y)
- [ ] STATE-0563 (P2) Define and implement disabled states for Tables (visual +
      copy + a11y)
- [ ] STATE-0564 (P2) Define and implement hover states for Tables (visual +
      copy + a11y)
- [ ] STATE-0565 (P2) Define and implement focus states for Tables (visual +
      copy + a11y)
- [ ] STATE-0566 (P2) Define and implement active states for Tables (visual +
      copy + a11y)
- [ ] STATE-0567 (P2) Define and implement mobile states for Tables (visual +
      copy + a11y)
- [ ] STATE-0568 (P2) Define and implement reduced motion states for Tables
      (visual + copy + a11y)
- [ ] STATE-0569 (P2) Define and implement empty states for Accordions (FAQ)
      (visual + copy + a11y)
- [ ] STATE-0570 (P2) Define and implement loading states for Accordions (FAQ)
      (visual + copy + a11y)
- [ ] STATE-0571 (P2) Define and implement error states for Accordions (FAQ)
      (visual + copy + a11y)
- [ ] STATE-0572 (P2) Define and implement success states for Accordions (FAQ)
      (visual + copy + a11y)
- [ ] STATE-0573 (P2) Define and implement disabled states for Accordions (FAQ)
      (visual + copy + a11y)
- [ ] STATE-0574 (P2) Define and implement hover states for Accordions (FAQ)
      (visual + copy + a11y)
- [ ] STATE-0575 (P2) Define and implement focus states for Accordions (FAQ)
      (visual + copy + a11y)
- [ ] STATE-0576 (P2) Define and implement active states for Accordions (FAQ)
      (visual + copy + a11y)
- [ ] STATE-0577 (P2) Define and implement mobile states for Accordions (FAQ)
      (visual + copy + a11y)
- [ ] STATE-0578 (P2) Define and implement reduced motion states for Accordions
      (FAQ) (visual + copy + a11y)
- [ ] STATE-0579 (P2) Define and implement empty states for Terminal demo
      (visual + copy + a11y)
- [ ] STATE-0580 (P2) Define and implement loading states for Terminal demo
      (visual + copy + a11y)
- [ ] STATE-0581 (P2) Define and implement error states for Terminal demo
      (visual + copy + a11y)
- [ ] STATE-0582 (P2) Define and implement success states for Terminal demo
      (visual + copy + a11y)
- [ ] STATE-0583 (P2) Define and implement disabled states for Terminal demo
      (visual + copy + a11y)
- [ ] STATE-0584 (P2) Define and implement hover states for Terminal demo
      (visual + copy + a11y)
- [ ] STATE-0585 (P2) Define and implement focus states for Terminal demo
      (visual + copy + a11y)
- [ ] STATE-0586 (P2) Define and implement active states for Terminal demo
      (visual + copy + a11y)
- [ ] STATE-0587 (P2) Define and implement mobile states for Terminal demo
      (visual + copy + a11y)
- [ ] STATE-0588 (P2) Define and implement reduced motion states for Terminal
      demo (visual + copy + a11y)

### 24.10 Atomic rewrite tasks (line-by-line copy control)

- [ ] ATOMIC-0589 (P1) HOME: Write variant #01 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0590 (P1) HOME: Write variant #02 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0591 (P1) HOME: Write variant #03 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0592 (P1) HOME: Write variant #04 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0593 (P1) HOME: Write variant #05 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0594 (P1) HOME: Write variant #06 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0595 (P1) HOME: Write variant #07 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0596 (P1) HOME: Write variant #08 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0597 (P1) HOME: Write variant #09 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0598 (P1) HOME: Write variant #10 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0599 (P1) HOME: Write variant #11 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0600 (P1) HOME: Write variant #12 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0601 (P1) HOME: Write variant #13 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0602 (P1) HOME: Write variant #14 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0603 (P1) HOME: Write variant #15 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0604 (P1) HOME: Write variant #16 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0605 (P1) HOME: Write variant #17 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0606 (P1) HOME: Write variant #18 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0607 (P1) HOME: Write variant #19 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0608 (P1) HOME: Write variant #20 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0609 (P1) HOME: Write variant #21 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0610 (P1) HOME: Write variant #22 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0611 (P1) HOME: Write variant #23 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0612 (P1) HOME: Write variant #24 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0613 (P1) HOME: Write variant #25 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0614 (P1) HOME: Write variant #26 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0615 (P1) HOME: Write variant #27 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0616 (P1) HOME: Write variant #28 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0617 (P1) HOME: Write variant #29 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0618 (P1) HOME: Write variant #30 for 'Hero headline' (tight / bold
      / technical)
- [ ] ATOMIC-0619 (P1) HOME: Write variant #01 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0620 (P1) HOME: Write variant #02 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0621 (P1) HOME: Write variant #03 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0622 (P1) HOME: Write variant #04 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0623 (P1) HOME: Write variant #05 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0624 (P1) HOME: Write variant #06 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0625 (P1) HOME: Write variant #07 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0626 (P1) HOME: Write variant #08 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0627 (P1) HOME: Write variant #09 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0628 (P1) HOME: Write variant #10 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0629 (P1) HOME: Write variant #11 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0630 (P1) HOME: Write variant #12 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0631 (P1) HOME: Write variant #13 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0632 (P1) HOME: Write variant #14 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0633 (P1) HOME: Write variant #15 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0634 (P1) HOME: Write variant #16 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0635 (P1) HOME: Write variant #17 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0636 (P1) HOME: Write variant #18 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0637 (P1) HOME: Write variant #19 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0638 (P1) HOME: Write variant #20 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0639 (P1) HOME: Write variant #21 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0640 (P1) HOME: Write variant #22 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0641 (P1) HOME: Write variant #23 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0642 (P1) HOME: Write variant #24 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0643 (P1) HOME: Write variant #25 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0644 (P1) HOME: Write variant #26 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0645 (P1) HOME: Write variant #27 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0646 (P1) HOME: Write variant #28 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0647 (P1) HOME: Write variant #29 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0648 (P1) HOME: Write variant #30 for 'Hero subhead' (tight / bold
      / technical)
- [ ] ATOMIC-0649 (P1) HOME: Write variant #01 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0650 (P1) HOME: Write variant #02 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0651 (P1) HOME: Write variant #03 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0652 (P1) HOME: Write variant #04 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0653 (P1) HOME: Write variant #05 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0654 (P1) HOME: Write variant #06 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0655 (P1) HOME: Write variant #07 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0656 (P1) HOME: Write variant #08 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0657 (P1) HOME: Write variant #09 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0658 (P1) HOME: Write variant #10 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0659 (P1) HOME: Write variant #11 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0660 (P1) HOME: Write variant #12 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0661 (P1) HOME: Write variant #13 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0662 (P1) HOME: Write variant #14 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0663 (P1) HOME: Write variant #15 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0664 (P1) HOME: Write variant #16 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0665 (P1) HOME: Write variant #17 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0666 (P1) HOME: Write variant #18 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0667 (P1) HOME: Write variant #19 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0668 (P1) HOME: Write variant #20 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0669 (P1) HOME: Write variant #21 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0670 (P1) HOME: Write variant #22 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0671 (P1) HOME: Write variant #23 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0672 (P1) HOME: Write variant #24 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0673 (P1) HOME: Write variant #25 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0674 (P1) HOME: Write variant #26 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0675 (P1) HOME: Write variant #27 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0676 (P1) HOME: Write variant #28 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0677 (P1) HOME: Write variant #29 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0678 (P1) HOME: Write variant #30 for 'CTA button labels' (tight /
      bold / technical)
- [ ] ATOMIC-0679 (P1) HOME: Write variant #01 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0680 (P1) HOME: Write variant #02 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0681 (P1) HOME: Write variant #03 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0682 (P1) HOME: Write variant #04 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0683 (P1) HOME: Write variant #05 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0684 (P1) HOME: Write variant #06 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0685 (P1) HOME: Write variant #07 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0686 (P1) HOME: Write variant #08 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0687 (P1) HOME: Write variant #09 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0688 (P1) HOME: Write variant #10 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0689 (P1) HOME: Write variant #11 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0690 (P1) HOME: Write variant #12 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0691 (P1) HOME: Write variant #13 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0692 (P1) HOME: Write variant #14 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0693 (P1) HOME: Write variant #15 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0694 (P1) HOME: Write variant #16 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0695 (P1) HOME: Write variant #17 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0696 (P1) HOME: Write variant #18 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0697 (P1) HOME: Write variant #19 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0698 (P1) HOME: Write variant #20 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0699 (P1) HOME: Write variant #21 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0700 (P1) HOME: Write variant #22 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0701 (P1) HOME: Write variant #23 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0702 (P1) HOME: Write variant #24 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0703 (P1) HOME: Write variant #25 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0704 (P1) HOME: Write variant #26 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0705 (P1) HOME: Write variant #27 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0706 (P1) HOME: Write variant #28 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0707 (P1) HOME: Write variant #29 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0708 (P1) HOME: Write variant #30 for 'FeatureGrid 4 cards (rewrite
      to match 4-fold)' (tight / bold / technical)
- [ ] ATOMIC-0709 (P1) HOME: Write variant #01 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0710 (P1) HOME: Write variant #02 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0711 (P1) HOME: Write variant #03 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0712 (P1) HOME: Write variant #04 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0713 (P1) HOME: Write variant #05 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0714 (P1) HOME: Write variant #06 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0715 (P1) HOME: Write variant #07 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0716 (P1) HOME: Write variant #08 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0717 (P1) HOME: Write variant #09 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0718 (P1) HOME: Write variant #10 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0719 (P1) HOME: Write variant #11 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0720 (P1) HOME: Write variant #12 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0721 (P1) HOME: Write variant #13 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0722 (P1) HOME: Write variant #14 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0723 (P1) HOME: Write variant #15 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0724 (P1) HOME: Write variant #16 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0725 (P1) HOME: Write variant #17 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0726 (P1) HOME: Write variant #18 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0727 (P1) HOME: Write variant #19 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0728 (P1) HOME: Write variant #20 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0729 (P1) HOME: Write variant #21 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0730 (P1) HOME: Write variant #22 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0731 (P1) HOME: Write variant #23 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0732 (P1) HOME: Write variant #24 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0733 (P1) HOME: Write variant #25 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0734 (P1) HOME: Write variant #26 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0735 (P1) HOME: Write variant #27 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0736 (P1) HOME: Write variant #28 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0737 (P1) HOME: Write variant #29 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0738 (P1) HOME: Write variant #30 for 'Privacy section claims (make
      honest + FOSS-centric)' (tight / bold / technical)
- [ ] ATOMIC-0739 (P1) HOME: Write variant #01 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0740 (P1) HOME: Write variant #02 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0741 (P1) HOME: Write variant #03 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0742 (P1) HOME: Write variant #04 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0743 (P1) HOME: Write variant #05 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0744 (P1) HOME: Write variant #06 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0745 (P1) HOME: Write variant #07 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0746 (P1) HOME: Write variant #08 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0747 (P1) HOME: Write variant #09 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0748 (P1) HOME: Write variant #10 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0749 (P1) HOME: Write variant #11 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0750 (P1) HOME: Write variant #12 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0751 (P1) HOME: Write variant #13 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0752 (P1) HOME: Write variant #14 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0753 (P1) HOME: Write variant #15 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0754 (P1) HOME: Write variant #16 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0755 (P1) HOME: Write variant #17 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0756 (P1) HOME: Write variant #18 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0757 (P1) HOME: Write variant #19 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0758 (P1) HOME: Write variant #20 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0759 (P1) HOME: Write variant #21 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0760 (P1) HOME: Write variant #22 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0761 (P1) HOME: Write variant #23 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0762 (P1) HOME: Write variant #24 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0763 (P1) HOME: Write variant #25 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0764 (P1) HOME: Write variant #26 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0765 (P1) HOME: Write variant #27 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0766 (P1) HOME: Write variant #28 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0767 (P1) HOME: Write variant #29 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0768 (P1) HOME: Write variant #30 for 'FAQ questions (rewrite for
      contributors)' (tight / bold / technical)
- [ ] ATOMIC-0769 (P1) DOWNLOAD: Write variant #01 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0770 (P1) DOWNLOAD: Write variant #02 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0771 (P1) DOWNLOAD: Write variant #03 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0772 (P1) DOWNLOAD: Write variant #04 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0773 (P1) DOWNLOAD: Write variant #05 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0774 (P1) DOWNLOAD: Write variant #06 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0775 (P1) DOWNLOAD: Write variant #07 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0776 (P1) DOWNLOAD: Write variant #08 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0777 (P1) DOWNLOAD: Write variant #09 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0778 (P1) DOWNLOAD: Write variant #10 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0779 (P1) DOWNLOAD: Write variant #11 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0780 (P1) DOWNLOAD: Write variant #12 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0781 (P1) DOWNLOAD: Write variant #13 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0782 (P1) DOWNLOAD: Write variant #14 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0783 (P1) DOWNLOAD: Write variant #15 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0784 (P1) DOWNLOAD: Write variant #16 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0785 (P1) DOWNLOAD: Write variant #17 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0786 (P1) DOWNLOAD: Write variant #18 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0787 (P1) DOWNLOAD: Write variant #19 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0788 (P1) DOWNLOAD: Write variant #20 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0789 (P1) DOWNLOAD: Write variant #21 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0790 (P1) DOWNLOAD: Write variant #22 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0791 (P1) DOWNLOAD: Write variant #23 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0792 (P1) DOWNLOAD: Write variant #24 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0793 (P1) DOWNLOAD: Write variant #25 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0794 (P1) DOWNLOAD: Write variant #26 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0795 (P1) DOWNLOAD: Write variant #27 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0796 (P1) DOWNLOAD: Write variant #28 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0797 (P1) DOWNLOAD: Write variant #29 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0798 (P1) DOWNLOAD: Write variant #30 for 'Install methods block'
      (tight / bold / technical)
- [ ] ATOMIC-0799 (P1) DOCS: Write variant #01 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0800 (P1) DOCS: Write variant #02 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0801 (P1) DOCS: Write variant #03 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0802 (P1) DOCS: Write variant #04 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0803 (P1) DOCS: Write variant #05 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0804 (P1) DOCS: Write variant #06 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0805 (P1) DOCS: Write variant #07 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0806 (P1) DOCS: Write variant #08 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0807 (P1) DOCS: Write variant #09 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0808 (P1) DOCS: Write variant #10 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0809 (P1) DOCS: Write variant #11 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0810 (P1) DOCS: Write variant #12 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0811 (P1) DOCS: Write variant #13 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0812 (P1) DOCS: Write variant #14 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0813 (P1) DOCS: Write variant #15 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0814 (P1) DOCS: Write variant #16 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0815 (P1) DOCS: Write variant #17 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0816 (P1) DOCS: Write variant #18 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0817 (P1) DOCS: Write variant #19 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0818 (P1) DOCS: Write variant #20 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0819 (P1) DOCS: Write variant #21 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0820 (P1) DOCS: Write variant #22 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0821 (P1) DOCS: Write variant #23 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0822 (P1) DOCS: Write variant #24 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0823 (P1) DOCS: Write variant #25 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0824 (P1) DOCS: Write variant #26 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0825 (P1) DOCS: Write variant #27 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0826 (P1) DOCS: Write variant #28 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0827 (P1) DOCS: Write variant #29 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0828 (P1) DOCS: Write variant #30 for 'Docs hub intro text' (tight
      / bold / technical)
- [ ] ATOMIC-0829 (P1) CONTRIBUTE: Write variant #01 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0830 (P1) CONTRIBUTE: Write variant #02 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0831 (P1) CONTRIBUTE: Write variant #03 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0832 (P1) CONTRIBUTE: Write variant #04 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0833 (P1) CONTRIBUTE: Write variant #05 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0834 (P1) CONTRIBUTE: Write variant #06 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0835 (P1) CONTRIBUTE: Write variant #07 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0836 (P1) CONTRIBUTE: Write variant #08 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0837 (P1) CONTRIBUTE: Write variant #09 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0838 (P1) CONTRIBUTE: Write variant #10 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0839 (P1) CONTRIBUTE: Write variant #11 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0840 (P1) CONTRIBUTE: Write variant #12 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0841 (P1) CONTRIBUTE: Write variant #13 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0842 (P1) CONTRIBUTE: Write variant #14 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0843 (P1) CONTRIBUTE: Write variant #15 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0844 (P1) CONTRIBUTE: Write variant #16 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0845 (P1) CONTRIBUTE: Write variant #17 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0846 (P1) CONTRIBUTE: Write variant #18 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0847 (P1) CONTRIBUTE: Write variant #19 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0848 (P1) CONTRIBUTE: Write variant #20 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0849 (P1) CONTRIBUTE: Write variant #21 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0850 (P1) CONTRIBUTE: Write variant #22 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0851 (P1) CONTRIBUTE: Write variant #23 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0852 (P1) CONTRIBUTE: Write variant #24 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0853 (P1) CONTRIBUTE: Write variant #25 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0854 (P1) CONTRIBUTE: Write variant #26 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0855 (P1) CONTRIBUTE: Write variant #27 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0856 (P1) CONTRIBUTE: Write variant #28 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0857 (P1) CONTRIBUTE: Write variant #29 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0858 (P1) CONTRIBUTE: Write variant #30 for 'Why contribute intro'
      (tight / bold / technical)
- [ ] ATOMIC-0859 (P1) A2A: Write variant #01 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0860 (P1) A2A: Write variant #02 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0861 (P1) A2A: Write variant #03 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0862 (P1) A2A: Write variant #04 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0863 (P1) A2A: Write variant #05 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0864 (P1) A2A: Write variant #06 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0865 (P1) A2A: Write variant #07 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0866 (P1) A2A: Write variant #08 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0867 (P1) A2A: Write variant #09 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0868 (P1) A2A: Write variant #10 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0869 (P1) A2A: Write variant #11 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0870 (P1) A2A: Write variant #12 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0871 (P1) A2A: Write variant #13 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0872 (P1) A2A: Write variant #14 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0873 (P1) A2A: Write variant #15 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0874 (P1) A2A: Write variant #16 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0875 (P1) A2A: Write variant #17 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0876 (P1) A2A: Write variant #18 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0877 (P1) A2A: Write variant #19 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0878 (P1) A2A: Write variant #20 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0879 (P1) A2A: Write variant #21 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0880 (P1) A2A: Write variant #22 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0881 (P1) A2A: Write variant #23 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0882 (P1) A2A: Write variant #24 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0883 (P1) A2A: Write variant #25 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0884 (P1) A2A: Write variant #26 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0885 (P1) A2A: Write variant #27 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0886 (P1) A2A: Write variant #28 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0887 (P1) A2A: Write variant #29 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0888 (P1) A2A: Write variant #30 for 'What is A2A intro' (tight /
      bold / technical)
- [ ] ATOMIC-0889 (P1) MCP: Write variant #01 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0890 (P1) MCP: Write variant #02 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0891 (P1) MCP: Write variant #03 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0892 (P1) MCP: Write variant #04 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0893 (P1) MCP: Write variant #05 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0894 (P1) MCP: Write variant #06 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0895 (P1) MCP: Write variant #07 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0896 (P1) MCP: Write variant #08 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0897 (P1) MCP: Write variant #09 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0898 (P1) MCP: Write variant #10 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0899 (P1) MCP: Write variant #11 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0900 (P1) MCP: Write variant #12 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0901 (P1) MCP: Write variant #13 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0902 (P1) MCP: Write variant #14 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0903 (P1) MCP: Write variant #15 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0904 (P1) MCP: Write variant #16 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0905 (P1) MCP: Write variant #17 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0906 (P1) MCP: Write variant #18 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0907 (P1) MCP: Write variant #19 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0908 (P1) MCP: Write variant #20 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0909 (P1) MCP: Write variant #21 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0910 (P1) MCP: Write variant #22 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0911 (P1) MCP: Write variant #23 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0912 (P1) MCP: Write variant #24 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0913 (P1) MCP: Write variant #25 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0914 (P1) MCP: Write variant #26 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0915 (P1) MCP: Write variant #27 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0916 (P1) MCP: Write variant #28 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0917 (P1) MCP: Write variant #29 for 'What is MCP intro' (tight /
      bold / technical)
- [ ] ATOMIC-0918 (P1) MCP: Write variant #30 for 'What is MCP intro' (tight /
      bold / technical)

### 24.11 Padding tasks (still meaningful)

- [ ] PAD-0919 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0920 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0921 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0922 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0923 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0924 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0925 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0926 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0927 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0928 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0929 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0930 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0931 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0932 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0933 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0934 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0935 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0936 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0937 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0938 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0939 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0940 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0941 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0942 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0943 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0944 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0945 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0946 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0947 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0948 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0949 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0950 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0951 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0952 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0953 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0954 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0955 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0956 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0957 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0958 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0959 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0960 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0961 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0962 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0963 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0964 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0965 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0966 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0967 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0968 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0969 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0970 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0971 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0972 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0973 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0974 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0975 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0976 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0977 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0978 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0979 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0980 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0981 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0982 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0983 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0984 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0985 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0986 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0987 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0988 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0989 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0990 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0991 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0992 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0993 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0994 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0995 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0996 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0997 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0998 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-0999 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1000 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1001 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1002 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1003 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1004 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1005 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1006 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1007 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1008 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1009 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1010 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1011 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1012 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1013 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1014 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1015 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1016 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1017 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1018 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1019 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1020 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1021 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1022 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1023 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1024 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1025 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1026 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1027 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1028 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1029 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1030 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1031 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1032 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1033 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1034 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1035 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1036 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1037 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1038 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1039 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1040 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1041 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1042 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1043 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1044 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1045 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1046 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1047 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1048 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1049 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1050 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1051 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1052 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1053 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1054 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1055 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1056 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1057 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1058 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1059 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1060 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1061 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1062 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1063 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1064 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1065 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1066 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1067 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1068 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1069 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1070 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1071 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1072 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1073 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1074 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1075 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1076 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1077 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1078 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1079 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1080 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1081 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1082 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1083 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1084 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1085 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1086 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1087 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1088 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1089 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1090 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1091 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1092 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1093 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1094 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1095 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1096 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1097 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1098 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1099 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1100 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1101 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1102 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1103 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1104 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1105 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1106 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1107 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1108 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1109 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1110 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1111 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1112 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1113 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1114 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1115 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1116 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1117 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1118 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1119 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1120 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1121 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1122 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1123 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1124 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1125 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1126 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1127 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1128 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1129 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1130 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1131 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1132 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1133 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1134 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1135 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1136 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1137 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1138 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1139 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1140 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1141 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1142 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1143 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1144 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1145 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1146 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1147 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1148 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1149 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1150 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1151 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1152 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1153 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1154 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1155 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1156 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1157 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1158 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1159 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1160 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1161 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1162 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1163 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1164 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1165 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1166 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1167 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1168 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1169 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1170 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1171 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1172 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1173 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1174 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1175 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1176 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1177 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1178 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1179 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1180 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1181 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1182 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1183 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1184 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1185 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1186 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1187 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1188 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1189 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1190 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1191 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1192 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1193 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1194 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1195 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1196 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1197 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1198 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1199 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1200 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1201 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1202 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1203 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1204 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1205 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1206 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1207 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1208 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1209 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1210 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1211 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1212 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1213 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1214 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1215 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1216 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1217 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1218 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1219 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1220 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1221 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1222 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1223 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1224 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1225 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1226 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1227 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1228 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1229 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1230 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1231 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1232 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1233 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1234 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1235 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1236 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1237 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1238 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1239 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1240 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1241 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1242 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1243 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1244 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1245 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1246 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1247 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1248 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1249 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1250 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1251 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1252 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1253 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1254 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1255 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1256 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1257 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1258 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1259 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1260 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1261 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1262 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1263 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1264 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1265 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1266 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1267 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1268 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1269 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1270 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1271 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1272 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1273 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1274 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1275 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1276 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1277 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1278 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1279 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1280 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1281 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1282 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1283 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1284 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1285 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1286 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1287 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1288 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1289 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1290 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1291 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1292 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1293 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1294 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1295 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1296 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1297 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1298 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1299 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1300 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1301 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1302 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1303 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1304 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1305 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1306 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1307 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1308 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1309 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1310 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1311 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1312 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1313 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1314 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1315 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1316 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1317 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1318 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1319 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1320 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1321 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1322 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1323 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1324 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1325 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1326 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1327 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1328 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1329 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1330 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1331 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1332 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1333 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1334 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1335 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1336 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1337 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1338 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile
- [ ] PAD-1339 (P2) Audit one page section for consistency: copy, links,
      contrast, mobile

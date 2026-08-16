# PM Signal Lab — editorial case sheet visual reframe

Status: implementation in progress. This contract addresses the remaining
AI-dashboard feel; it does not claim that the market, real PM users, or GitHub
stars have validated the direction.

Evidence update: the Codex Chrome Extension path has since been executed
against the local production preview and the follow-up accessibility fix is
recorded in [the local QA report](./79-editorial-case-sheet-local-qa-2026-08-15.md).
Native VoiceOver/NVDA/TalkBack output, hosted release, participant learning,
and adoption remain unverified.

## KB Application Contract

### Relevant KB and why it applies

- `foundations/design-brain.md`: route the visual decision from product truth
  through DNA, composition, system, and real screenshot review.
- `foundations/design-rule-hierarchy.md`: protect readability and task clarity
  before applying a project-specific paper/editorial style.
- `foundations/product-craft-anti-ai-slop-operating-system.md`: treat AI feel
  as a product-truth, layout, copy, state, and evidence problem rather than a
  color problem.
- `foundations/aesthetic-taste-system.md`: remove generic dashboard chrome,
  weak hierarchy, excessive surfaces, and model-average labels.
- `foundations/design-composition-layout.md`: establish first read, second
  read, alignment spine, density, and layout archetype before styling.
- `foundations/design-review-workflow.md`: require desktop/mobile screenshots,
  behavior review, accessibility checks, and a second polish pass.
- `foundations/anti-ai-writing-tells.md`: replace abstract or repeated labels
  with concrete case, source, claim, and test language.

Design reason: the current screenshot is already warm and ruled, but the
information architecture still reads as a SaaS dashboard: fixed sidebar,
status rail, generic hero instruction, and a prominent AI subject label. A
case-sheet composition changes the reading order itself, so the product feels
like a PM workpaper instead of an AI wrapper.

## Problem Frame

- Decision: should the public work surface lead with a literal support-draft
  case sheet and source review, rather than a generic AI-category shell?
- User/job: an international PM, founder, designer, or product engineer needs
  to understand the case and next action within five seconds, then trace one
  line to a claim and a smallest test.
- Current workaround: the user scans a left navigation, a hero instruction,
  a status block, and a subject cue before reaching the source ledger.
- Outcome metric: an owner-run fresh screenshot and behavior trace show the
  sequence `case subject → current action → source line → claim → test`; real
  non-owner comprehension remains `Not verified`.
- Evidence: current 1280×900 and 390×844 screenshots, current `App.tsx`, and
  the prior domain-language QA reports.
- Unknowns: whether international PMs prefer the new composition, whether the
  first action is faster to find, and whether the change improves adoption.
- Constraints: no new provider, data model, permission, telemetry, or external
  mutation; preserve the existing workflow and mobile recovery behavior.
- Out of scope: real-user preference, adoption, star growth, native assistive
  technology output, and merging this visual branch into `main` without a
  fresh hosted release audit.

## Product Craft Contract

```yaml
product_truth:
  target_user: "English-speaking PM, founder, product designer, or product engineer"
  job_to_be_done: "Move from one observed support-draft line to a defensible next test"
  first_read: "Support draft review is a source-linked case sheet; the next human action is visible"
  proof: "source identity, date, original line, limitation, claim status, and smallest-test fields"
  success_metric: "fresh owner-run visual and behavior trace preserves the source-to-test path without AI chrome leading"

subject_specificity:
  domain_objects: ["case sheet", "source folio", "claim", "limitation", "smallest test", "fictional worksheet"]
  user_language: ["support draft", "source line", "what this line supports", "decision brief"]
  constraints: ["local fixture", "refresh clears the sheet", "manual export", "no live model provider"]
  signature_detail: "a thin paper index and red/blue review marks that connect case, source, and next test"

creative_divergence:
  selected_direction: "editorial case sheet / single workpaper"
  rejected_directions: ["AI copilot dashboard", "card-heavy SaaS workspace", "gradient/orb/bento hero", "chat wrapper"]
  mechanism: "change the reading path and visual ownership of the work, not only the palette"

design_read:
  reading_this_as: "a PM case sheet and decision instrument"
  density: "medium; dense only where source rows require it"
  alignment_spine: "masthead → paper index → case subject → source ledger → review mark"
  motion: "low; no simulated thinking"

no_ai_feel_guard:
  remove_from_chrome: ["AI-assisted support drafting", "generic AI labels", "status-dashboard dominance"]
  keep_in_portfolio_context: ["AI PM positioning", "fictional AI support-draft subject in README and fixture docs"]
  reject: ["generic hero copy", "persistent sidebar dashboard", "decorative AI signals", "confidence theatre"]
  low_risk_alternative: "typography, rules, folio numbers, spacing, and concrete subject copy"

ux_states:
  first_time: "Start with a source line and one sample action"
  loading: "Opening the local worksheet; no model-thinking simulation"
  error: "named, recoverable message with original workspace preserved"
  recovery: "refresh reset, back actions, source expansion, manual text fallback"
  mobile: "single-column case sheet with reachable sticky next action"
  accessibility: "semantic navigation, visible focus, heading order, table/list readability"
  trust: "local-only boundary, fictional fixture, source and limitation remain visible"
```

## Composition Brief

- First read: `Support draft review` when loaded; `Start with a source line` on
  first run.
- Second read: one sentence describing the case, then the current workflow
  index and source ledger.
- Primary action: `Open the sample worksheet` on first run; `Start review` on
  the loaded Collect state; one step-specific action after that.
- Content relationship: `Case subject → Source folio → Claim review → Smallest
  test → Decision brief`.
- Layout archetype: one editorial workpaper with a horizontal paper index, not
  a persistent sidebar plus dashboard rail.
- Density: medium desktop, single-column mobile; use rows and rules before
  containers.
- Signature detail: paper index numbers, one red correction line for action,
  and blue provenance lines for source context.
- Do not use: gradients, glass, blobs, orbs, bento cards, chat bubbles,
  typing indicators, confidence meters, or new decorative illustration.

## UX/AI/security gate

- First-time and empty states retain the sample action and a real source quote.
- Loaded state removes `AI-assisted support drafting` from the visual working
  surface while retaining the support-draft subject and fictional boundary.
- Loading, error, refresh, source expansion, claim review, export, privacy
  block, and feedback recovery keep their existing behavior.
- Keyboard focus, heading order, accessible names, and mobile sticky action
  remain intact.
- No provider, network request, permission, secret, login, telemetry, or
  automatic external write is introduced.
- The design must not imply validation, adoption, or model quality.

## Execution Contract

### Files/surfaces

- **Modify:** `src/App.tsx` for literal case-sheet copy and subject metadata;
  `src/styles.css` for the layout reframe; `scripts/verify-hosted-demo.mjs`
  for current/stale string oracles; `README.md` and `DESIGN.md` for the public
  product explanation.
- **Create:** this contract and a fresh local QA report only after execution.
- **Preserve:** domain logic, local-only boundaries, workflow transitions,
  feedback privacy gate, and the existing skills PR as a separate change.
- **Observe:** source-to-brief behavior, screenshots, viewport metrics,
  focus/heading semantics, console, and request boundary.

### Task sequence

- [ ] **Step 1 — change the visible case language:** Replace the generic loaded
  hero and `Subject under review · AI-assisted...` cue with `Support draft
  review`, `Case subject · support draft`, and `fictional worksheet`.
  **Expected:** the app's first loaded read is the case, not an AI label.
- [ ] **Step 2 — change the composition:** Hide the persistent desktop
  sidebar, show the workflow as a thin horizontal paper index, and keep the
  mobile stepper/sticky action behavior.
  **Expected:** desktop reads as one workpaper; no navigation capability is
  lost.
- [ ] **Step 3 — update copy oracles and project docs:** Modify the hosted
  verifier, `README.md`, and `DESIGN.md`.
  **Expected:** new strings are required, stale AI-chrome strings are rejected,
  and the portfolio framing still states the AI PM context honestly.
- [ ] **Step 4 — run static gates:** Run `npm test`, `npm run lint`, `npm run
  build`, `git diff --check`, and the local hosted verifier against the
  production preview.
  **Expected:** all commands exit 0.
- [ ] **Step 5 — run fresh behavior and visual QA:** Exercise first-run,
  sample load, source expansion, review, decision brief, privacy block/allow,
  refresh, keyboard skip link, desktop, tablet, and mobile.
  **Expected:** the user can complete the core path and screenshots show the
  case-sheet reading order without overflow or visible AI theatre.
- [ ] **Step 6 — second polish and independent review:** Compare the fresh
  screenshots against the current baseline and inspect long text, focus, and
  screen-reader-adjacent semantics.
  **Expected:** no new hierarchy, trust, mobile, or recovery regression.

## Verification gate

| Layer | Exact proof | Hold condition |
|---|---|---|
| Copy | local bundle oracle | old generic hero or AI subject cue remains in visual surface |
| Static | `npm test`, `npm run lint`, `npm run build`, `git diff --check` | any non-zero command |
| Behavior | fresh headed browser trace | first-run, source, review, export, privacy, or refresh breaks |
| Visual | 1440×900, 1280×900, 768×1024, 390×844 screenshots | case/source path is not obvious or any overflow appears |
| Keyboard | skip link, tab order, focus after transitions | focus disappears or action cannot be reached |
| Assistive tech | semantic snapshot and available screen-reader route | claim as native screen-reader verified without native evidence |
| Hosted | canonical HTTPS, bundle, browser, console, request, and mobile checks after deploy | any layer remains unverified |
| Adoption | real PM sessions and public feedback | no session evidence means no preference/adoption claim |

## Rollback and evidence boundary

Rollback is a revert of the visual reframe commit; no data migration or
external mutation is introduced. This change can prove a different visual
hierarchy and preserve the existing local workflow. It cannot prove that the
market likes the design, that the skill is adopted, or that stars will grow.

Native VoiceOver/NVDA/TalkBack output, real-device touch, non-owner
comprehension, real PM sessions, hosted release, and adoption remain
`未驗證` until directly exercised. Chrome Extension local evidence is recorded
in the follow-up QA report; it is not evidence for the hosted URL or native
assistive technology.

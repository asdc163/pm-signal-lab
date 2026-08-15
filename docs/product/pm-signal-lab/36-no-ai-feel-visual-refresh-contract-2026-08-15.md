# No-AI-feel visual refresh contract

Date: 2026-08-15
Product: PM Signal Lab
Audience: international PMs, founders, product designers, and product engineers
Status: hosted release verified for `037cf1ad82306633ce7e6200cea8f678915a9533`

## Problem frame

The current preview has the right product boundary and a useful evidence spine, but parts of the interface still read like a polished AI demo:

- the hero explains the idea before the case evidence earns attention;
- the right rail uses repeated summary labels such as `Answer`, `Take away`, and `Known now` that could fit almost any AI product;
- the strongest product facts are spread across prose instead of being visible as a compact review docket;
- the visual shell is calm, but the hierarchy can become decorative when the user has no workspace yet;
- the copy is honest, but some labels describe the interface instead of the PM decision in front of the user.

The user job is narrower: an international PM wants to put a source line on the desk, decide whether a claim is defensible, and leave with the smallest test that can change the next product conversation.

- Decision: make the source/review/decision state the visual hierarchy and remove generic AI-demo cues without changing the local-first behavior.
- User/job: an international PM needs to identify a defensible claim and the smallest next test.
- Outcome metric: five-second comprehension of product, current evidence state, and next action; real-user comprehension remains unverified until task sessions exist.

### Decision

Refine the product from an editorial worksheet into a case-file evidence desk. Keep the paper, folio, and source spine; remove generic AI-demo cues and make the first and second reads depend on real product objects and counts.

### Success metric

Fresh browser evidence should show that a first-time visitor can identify the product job, the next action, and the evidence boundary within five seconds. A reviewer should be able to read the current source/review state without interpreting generic marketing copy.

Real-user comprehension and adoption remain unverified until international PM sessions are collected.

## Constraints and out of scope

### Constraints

- The current product is a static React/Vite preview with local session state; the visual refresh must not add a provider, database, telemetry, login, or external mutation.
- The public surface remains English-first `en-US` and must preserve the existing source, claim, experiment, export, and privacy boundaries.
- The source-ledger spine and warm paper direction are project assets; the change should sharpen them instead of replacing the product with a generic dark AI dashboard.
- Every new status or count must come from existing state or be labelled as a boundary; no adoption or quality claim may be inferred from the fixture.

### Out of scope

- Adding an AI model, chat surface, prompt composer, automatic issue submission, or background analytics.
- Translating historical Chinese audit notes in this visual slice.
- Claiming real PM comprehension, Chrome Extension availability, screen-reader certification, or GitHub growth without fresh evidence.

## KB Application Contract

### Relevant KB

The following sources change the implementation rather than merely provide visual inspiration:

Why it applies: each source supplies a different gate for the same decision: product truth, layout, copy, visual taste, state completeness, or fresh evidence.

- `/Users/tommy/Desktop/Claude知識庫/foundations/design-brain.md`: composition must precede component styling, and a product needs its own design DNA. Applied by keeping the evidence-folio DNA while moving the layout toward a case file and review docket. Tradeoff: less decorative spaciousness, more task-specific information.
- `/Users/tommy/Desktop/Claude知識庫/foundations/design-rule-hierarchy.md`: Quality Rules outrank taste, and Project Style Direction must be explicit. Applied by preserving focus, touch targets, recovery, responsive behavior, and trust while changing only the project style layer.
- `/Users/tommy/Desktop/Claude知識庫/foundations/product-craft-anti-ai-slop-operating-system.md`: AI feel comes from weak product truth, subject specificity, generic copy, and missing states. Applied by surfacing source/review/accepted counts, the open question, and the next test instead of adding decorative AI cues.
- `/Users/tommy/Desktop/Claude知識庫/foundations/aesthetic-taste-system.md`: product truth, quiet surfaces, controlled color, row/list patterns, and a second polish pass matter more than effects. Applied by reducing repeated containers and keeping the source ledger as the visual subject.
- `/Users/tommy/Desktop/Claude知識庫/foundations/design-composition-layout.md`: first read, second read, primary action, alignment spine, and reflow must be explicit. Applied by making the case status the second read and keeping the source spine aligned with the workbench.
- `/Users/tommy/Desktop/Claude知識庫/foundations/product-messaging-copy-operating-system.md`: product UI copy must serve a job, use concrete language, and state its boundary. Applied by replacing generic rail labels with PM-specific questions and actions.
- `/Users/tommy/Desktop/Claude知識庫/foundations/anti-ai-writing-tells.md`: remove stock phrasing, symmetry, and abstract claims; preserve concrete evidence and an honest tradeoff. Applied to hero, rail, notice, and state copy.
- `/Users/tommy/Desktop/Claude知識庫/foundations/design-review-workflow.md`: design completion requires screenshot review, behavioral QA, and a second polish pass. Applied through desktop/tablet/mobile captures, normal/friction/recovery paths, and an updated audit.

## Product Craft Contract

### Product truth

- Target user: an international PM or product teammate reviewing mixed product signals.
- Job to be done: turn one source line into a traceable claim and a smallest test.
- First read: what is on the evidence desk and what should I do next?
- Proof: real sample source lines, stable source folios, review counts, limitations, and the exported decision brief.
- Boundary: deterministic local preview; no provider, transfer, telemetry, or automatic GitHub mutation.

### Subject specificity

- Domain objects: source folio, source line, claim, limitation, review state, experiment brief, decision rule, and field note.
- User language: `Which claim can I defend?`, `What is missing?`, `What would change the decision?`
- Signature detail: the evidence spine that keeps a source folio visually attached to the claim and next test.

### Creative divergence

| Direction | Mechanism | User value | Risk |
| --- | --- | --- | --- |
| Direct workbench | Put the next action and source ledger first | Lowest time to first useful action | Could feel like a generic admin tool |
| Case file | Treat each session as a small review docket with counts and an open question | Makes PM judgment visible and memorable | Could become theatrical if counts are not real |
| Field note | Make the exported brief and session note the primary product artifact | Reinforces honest handoff and learning | Could delay the first source interaction |

Selected direction: `Case file` with the `Direct workbench` reading order and `Field note` as the carry-forward artifact. The case-file language is only used where the UI has real state to show.

### Design read

`Reading this as: a quiet editorial operations tool for PM evidence review, with medium-high information density, low motion, restrained variance, and a source-led alignment spine.`

### No-AI-feel guard

- Keep the paper/evidence desk palette and folios; do not add gradients, orbs, glass, bento feature walls, chat bubbles, fake thinking, or model activity feeds.
- Replace repeated generic summaries with live counts and decision questions.
- Make the hero support the source specimen and primary action rather than act as an abstract brand statement.
- Use borders, dividers, typography, and real content before adding containers or shadows.
- Keep all claims and status labels tied to visible data or an explicit boundary.

## Composition brief

- First read: the exact product job plus `Load sample data` or `Add your own signal`.
- Second read: `Review docket` with sources, reviewed claims, accepted claims, and the current open question.
- Primary action: one step-specific action; on `Collect`, load or add a signal; after loading, start review.
- Content relationship: `Source → Claim → Test`, with the source ledger as the dominant content surface.
- Density: medium-high on desktop, stacked and scan-friendly on mobile.
- Alignment spine: brand rail → case header → source folio → decision docket.
- Layout archetype: research folio + evidence list + review docket, not card dashboard.
- Responsive reflow: sidebar becomes the top workflow strip; docket moves below the main workbench; the current action remains reachable without hover.
- What not to use: generic AI dashboard cards, abstract hero art, unearned confidence badges, or decorative progress chrome.

## Implementation contract

### Files/surfaces

- Create: `docs/product/pm-signal-lab/36-no-ai-feel-visual-refresh-contract-2026-08-15.md` and a post-verification visual QA record.
- Modify: `src/App.tsx`, `src/styles.css`, and the project root `DESIGN.md`.
- Test: existing domain tests plus the static gate and fresh browser behavior matrix below.
- Observe: rendered first-run, loaded ledger, verify, decide, ship, feedback, keyboard, mobile, and canonical hosted states.

### Files and surfaces

- Modify `/Users/tommy/Documents/ChatGPT/Github Sar 養成計劃/src/App.tsx`:
  - rename generic shell labels to case-file language;
  - replace the right-rail summary trio with live docket metrics and PM questions;
  - keep the existing source, claim, experiment, export, and feedback behavior;
  - preserve semantic labels, focus recovery, and local data boundaries.
- Modify `/Users/tommy/Documents/ChatGPT/Github Sar 養成計劃/src/styles.css`:
  - refine typography, neutral surfaces, docket layout, active states, and responsive reflow;
  - keep brand color within a signal role and preserve 44px controls;
  - add reduced-motion coverage for the existing transitions.
- Modify `/Users/tommy/Documents/ChatGPT/Github Sar 養成計劃/DESIGN.md`:
  - record the case-file Project Style Direction, revised composition brief, and rejected high-risk treatments.
- Create an updated visual QA record under `docs/product/pm-signal-lab/` after fresh browser evidence exists.

### UX states to preserve and inspect

- First-time: no workspace, one realistic source specimen, two clear ways to begin.
- Loading: explicit sample preparation state; no fake model progress.
- Empty: no signals, no claims, and a recovery action.
- Error: sample or form failure states preserve the user's content and return focus.
- Review: source mapping, limitation, edit, accept, hypothesis, and missing-evidence states remain visible.
- Decide: readiness explains why the brief is ready or still needs validation.
- Ship: the brief is portable but not presented as proof of adoption; feedback is manual and privacy-gated.
- Mobile: the source/claim/test reading order survives the reflow without horizontal scrolling.
- Accessibility: semantic headings, named regions, visible focus, `aria-expanded`, `aria-current`, field errors, and reduced motion remain intact.

## Execution sequence

- [x] Step 1: update the shell, hero, workflow labels, and `DecisionContext` in `src/App.tsx`. Expected: first-run and loaded states use case-file language and show only live source/review/decision facts.
- [x] Step 2: update the semantic tokens, typography, docket surfaces, dividers, focus states, and responsive rules in `src/styles.css`. Expected: the source ledger remains the visual subject, no new gradient/glass/orb treatment is introduced, and controls remain at least 44px.
- [x] Step 3: update `DESIGN.md` with the selected Project Style Direction and the rejected generic AI treatments. Expected: the next contributor can reproduce the visual decisions without guessing.
- [x] Step 4: run `npm test -- --run`, `npm run lint`, `npm run build`, and `git diff --check`. Expected: each command exits 0.
- [x] Step 5: run a fresh browser behavior matrix at 1440px, 768px, and 390px, including a keyboard route. Expected: the primary job, next action, focus route, recovery states, and no-overflow result are observable.
- [x] Step 6: run the same core journey against the canonical hosted URL after deployment. Expected: title, `en-US`, case-file copy, source ledger, export sections, mobile reflow, and console state match the release candidate.

## UX/AI/security gate

- First-time: the page names the PM job and offers one primary route plus one manual route.
- Empty: no data state has a useful source-line action and does not imply a hidden model.
- Loading: the fixture load is described as local sample preparation, not thinking or intelligence.
- Error: failed load, invalid form, blocked clipboard, and blocked download preserve content and offer recovery.
- Recovery: reset, back navigation, claim edit cancel, and feedback cancel return to a legible state.
- Mobile: the workflow and action remain usable at 390px with no horizontal scroll.
- Trust: source, limitation, human review, local boundary, and manual handoff remain visible at the point of decision.
- AI gate: no provider, prompt, black-box answer, fake progress, or unsupported quality claim enters the UI.
- Security gate: no secret, customer data, API key, token, telemetry, or external write is introduced.

## Verification contract

1. Run `npm test -- --run`, `npm run lint`, `npm run build`, and `git diff --check`.
2. Scan current public UI/docs for accidental AI marketing terms and non-English runtime copy.
3. Use a fresh browser session to capture first-run and loaded desktop screenshots at 1440px.
4. Use 768px and 390px sessions to check reflow, touch targets, and no horizontal overflow.
5. Run the behavior matrix for a first-time PM, low-trust reviewer, mobile user, and keyboard user.
6. Use the configured Chrome Extension route if available; if unavailable, label the result as a blocked Chrome QA route and preserve the Playwright fallback as separate evidence.
7. Rerun the core path against the canonical hosted URL after deployment; do not treat local screenshots as hosted proof.

### Not covered by this contract

- Real international PM task sessions and native-speaker review.
- GitHub star/adoption growth.
- Formal screen-reader certification if an assistive-technology route is unavailable.
- Production AI model quality; this slice remains deterministic.

## Rollback

Keep the visual refresh as a small reversible commit. If the refreshed shell causes a regression, revert that commit to the previous public HEAD and retain the release audit as evidence of the earlier verified surface.

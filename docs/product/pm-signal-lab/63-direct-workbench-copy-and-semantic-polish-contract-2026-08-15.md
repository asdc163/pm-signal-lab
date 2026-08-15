# Direct Workbench Copy and Semantic Polish Contract

Date: 2026-08-15
Surface: PM Signal Lab hosted demo and repository README
Audience: international PMs, founders, product designers, and product engineers
Locale: English-first `en-US`

## Decision

Make the current workbench read like a product tool someone could use in a
real review, not a status-heavy AI workspace. This pass keeps the evidence
spine and the quiet field-sheet visual language, then removes one repeated
status frame, replaces one stale recovery message, and makes the dead-end path
in `Decide` point back to the place where a signal can actually be added.

The README will not present an outdated screenshot as if it were the current
hosted surface. A fresh image can return only after it has been captured from
the current build and checked against the canonical copy.

## Relevant KB and why it applies

| Relevant KB | Why it applies / design reason |
|---|---|
| `foundations/product-craft-anti-ai-slop-operating-system.md` | The product must earn its identity from source provenance, limits, recovery, and real evidence rather than model theatre. |
| `foundations/design-brain.md` | Composition and hierarchy should make the source line the first meaningful object; subtraction is a stronger design move than another effect. |
| `foundations/design-composition-layout.md` | The alignment spine, responsive reflow, density, and primary action need to survive the status-chrome reduction. |
| `foundations/product-messaging-copy-operating-system.md` | Empty, recovery, trust, and AI-uncertainty copy must point to a real next action and preserve the claim ledger. |
| `foundations/anti-ai-writing-tells.md` | Concrete nouns and uneven, human sentence rhythm protect the public English copy from generic SaaS language. |
| `foundations/behavioral-ux-qa-evidence-gate.md` | A successful build does not prove that a PM can recover from an empty step; the behavior matrix and evidence boundary must stay explicit. |

This contract applies the KB as a design and verification decision. It does
not copy a visual style from any external repository, and it does not turn a
reference study into adoption evidence.

## KB Application Contract

- `product-craft-anti-ai-slop`: let source rows, limits, and recovery carry the
  product identity; do not simulate a model.
- `design-brain` and `design-composition-layout`: remove repeated framing first,
  then check the alignment spine and responsive hierarchy.
- `product-messaging-copy` and `anti-ai-writing-tells`: use concrete English
  destinations and product nouns; cut stale SaaS vocabulary before rewriting.
- `behavioral-ux-qa-evidence-gate`: require direct empty, recovery, mobile,
  keyboard, and trust observations before calling the pass verified.

## Product Craft Contract

### Problem frame

- User/job: an English-speaking PM should know what the current sheet contains,
  what can be challenged, and where to recover if a step has no usable claim.
- Current friction: the topbar and hero both repeat worksheet status; the
  empty `Decide` state says `Load data in Collect`, which is no longer the
  product's vocabulary; a dead-end button labeled `Back to Verify` does not
  return the user to the place where a signal can be added.
- Desired outcome: the source rows remain the strongest visual object, every
  recovery action names the actual destination, and public copy matches the
  hosted build.
- Evidence available now: the current `src/App.tsx`, hosted verifier contract,
  and the prior Chrome Extension audit for the empty, loaded, source-expanded,
  reset, mobile, and keyboard-baseline paths.
- Not yet known: whether a non-owner PM sees the same hierarchy without a
  maintainer walkthrough; this pass cannot create that evidence.

### Subject specificity

Keep the actual product nouns in the interface:

- source line, folio, source identity, observed date, and limitation;
- candidate claim and source mapping;
- metric, guardrail, smallest test, decision rule, and owner;
- local session record and manual field-note handoff.

Avoid generic assistant language, invented confidence, activity theatre, and
capability claims that the deterministic local fixture cannot prove.

### Creative direction

Selected direction: a direct workbench with one source spine, ruled rows, a
quiet margin note, and a single next move. The visual decision is subtraction:
remove repeated status chrome before adding any new ornament.

Rejected for this pass:

1. AI activity feed, confidence meter, or animated synthesis: no provider or
   model activity exists in the hosted demo.
2. New dashboard cards or decorative gradients: they would compete with the
   source line and make a real PM review look like a generic SaaS template.
3. More marketing copy: the user needs a concrete recovery path, not another
   promise.

### Constraints and scope

Must have:

- remove the duplicated topbar worksheet-status block while preserving the
  boundary in the hero and footer;
- change `Current worksheet` to the more direct `Current work` label;
- replace stale `Load data in Collect` copy with the current sample/add-signal
  language;
- make the empty `Decide` recovery button return to `Collect`;
- describe the right-rail event area as a session record rather than generic
  activity status;
- remove the duplicate state reset line in `resetDemo`;
- keep all current public claims and English-first wording evidence-backed.

Nice to have:

- update the README presentation so an old screenshot is not mistaken for a
  current visual audit;
- add a fresh screenshot only if it can be captured and inspected from the
  current build.

Out of scope:

- external model calls, provider SDKs, API keys, login, persistence,
  telemetry, GitHub mutation, star prompts, or social automation;
- native screen-reader certification, real-device validation, or a claim of
  non-owner PM comprehension;
- rewriting historical audit files to make old screenshots or copy appear
  current;
- any claim about adoption, traffic, stars, or a 10,000-star outcome.

### Acceptance criteria

| ID | Criterion | Observable oracle |
|---|---|---|
| AC-1 | Public copy is internally consistent | `rg` and hosted verifier find no stale `Load data in Collect` or `Load sample data` in the current bundle. |
| AC-2 | Status chrome is reduced | The topbar no longer renders a second worksheet-status block; the hero still exposes the local/no-transfer boundary. |
| AC-3 | Empty `Decide` recovery is truthful | The empty state says where to open/add a signal and its button takes the user to `Collect`. |
| AC-4 | Session language is concrete | The rail uses `Session record` and a last-action/no-action phrase, not `Activity recorded`. |
| AC-5 | Existing behavior survives | Domain tests, typecheck, build, diff check, and the bounded Chrome Extension regression pass. |
| AC-6 | Release claims stay scoped | Hosted HTTPS and asset verification pass after merge; screen-reader and real-user coverage remain labelled `Not covered`. |

## Product Messaging Contract

### Message Job

- User job: understand the current sheet and recover from an empty step.
- Target action: open the sample worksheet, add a signal, or return to
  `Collect`.
- Success metric: the copy points to a real next action without requiring the
  user to translate old product terminology.

### Source Truth

- Product truth: the demo stores signals only in the current page, derives
  deterministic candidate claims, and requires human review before export.
- Proof: current UI state, source rows, local boundary, domain tests, hosted
  verifier, and browser observations.
- Not covered: provider quality, non-owner comprehension, adoption, traffic,
  stars, and screen-reader output.

### Positioning

- Category: local-first PM evidence workbench.
- Alternative: a note, chat transcript, or summary that loses the original
  source line.
- Reason to believe: a source folio and limitation remain next to the claim
  and the smallest test.
- Not for: pretending a deterministic fixture is an AI benchmark or an
  approved product decision.

### Copy Architecture

- Hero: name the current work and the immediate source task.
- Empty state: explain the missing object and give one usable route in.
- Recovery state: name the exact destination and the action that unlocks it.
- Rail record: report the last observable session action without simulating a
  model or implying remote telemetry.

### No-AI Copy Guard

- Cut old vocabulary before adding synonyms.
- Prefer `Open the sample worksheet`, `Add a signal`, `Return to Collect`, and
  `Last action` because each points to an actual event or destination.
- Do not use `intelligent`, `seamless`, `powerful`, `magic`, `activity feed`,
  or a confidence statement that has no product evidence.
- Do not turn `Session record` into an adoption, quality, or completion claim.

### UX Microcopy States

| State | Copy responsibility | Current decision |
|---|---|---|
| First-time | Explain the source-first task | Keep current sample and own-signal paths. |
| Loading | Say what is opening | Keep `Opening the sample worksheet`; the 260ms frame remains a bounded visual gap. |
| Empty `Decide` | Provide a recoverable route | Point to `Collect`, not `Verify`. |
| Error | Preserve the user's workspace | Keep the fixture error message and state-preservation promise. |
| Privacy | Explain control | Keep local-only and manual GitHub handoff language. |
| AI uncertainty | Prevent over-trust | Keep deterministic fixture and human-review boundaries visible. |

### Channel Learning

- Hypothesis: fewer repeated status labels and more literal recovery language
  will reduce first-run hesitation for an international PM.
- Primary metric: non-owner comprehension and task completion during five-minute
  sessions, not an internal screen impression score.
- Guardrail: no increase in wrong-step navigation, trust confusion, or hidden
  source provenance.
- Writeback: use a reviewed public pilot field note or issue comment; do not
  infer a result from GitHub traffic, stars, or a build log.

## UX Flow and states

| State | Starting point | Expected behavior | Recovery |
|---|---|---|---|
| Empty collect | Fresh page | See one concrete sample action and one own-signal action. | Open sample or add a signal. |
| Loaded collect | Sample opened | Read source rows, folios, dates, limits, and review docket. | Expand/collapse a source; reset to empty. |
| Empty verify | No evidence | Explain that a source is needed before review. | Return to `Collect`. |
| Empty decide | No claims | Explain that a signal and reviewed claim are needed. | Return to `Collect`; do not strand the user in `Verify`. |
| Loading | Sample action pressed | Hear/see concrete worksheet language and no duplicate clicks from the mobile action. | Wait for the local fixture; errors preserve the prior workspace. |
| Mobile | 390px viewport | Keep top stepper and current action reachable. | Use sticky action or stepper; no hover dependency. |
| Trust | Any loaded state | Keep local-only and manual handoff boundaries visible. | Read the footer/hero boundary; no external transfer occurs. |

## Engineering and QA plan

### Files/surfaces map

| Action | Surface | Exact responsibility |
|---|---|---|
| Modify | `src/App.tsx` | Status copy, topbar status removal, session-record copy, `Decide` recovery destination, duplicate-state cleanup. |
| Modify if needed | `scripts/verify-hosted-demo.mjs` | Keep current-copy assertions and stale-copy guards aligned with intentional renames. |
| Modify | `README.md` | Do not present an outdated screenshot as current; retain the live demo and evidence boundary. |
| Create | `docs/product/pm-signal-lab/63-direct-workbench-copy-and-semantic-polish-contract-2026-08-15.md` | Durable Product Craft, messaging, UX, engineering, and QA contract. |
| Test | `src/domain/*.test.ts` through `npm test -- --run` | Confirm domain behavior remains unchanged. No speculative UI test harness is added. |
| Observe | Canonical hosted URL and controlled Chrome Extension tab | Verify empty, loaded, source expansion, reset, mobile action, and the changed `Decide` recovery path. |

Files: `src/App.tsx`, `scripts/verify-hosted-demo.mjs`, `README.md`, and the
new contract under `docs/product/pm-signal-lab/`.

Modify: `src/App.tsx` and any current-copy verifier assertions required by an
intentional wording change.

Test: `npm test -- --run`, `npm run lint`, `npm run build`, and the controlled
browser behavior matrix.

Observe: the canonical hosted page after Pages deployment, with historical
audit documents treated as historical evidence.

### Bite-sized execution steps

- [ ] Step 1: search the current UI, README, verifier, and operations docs for
  stale outward-facing wording; preserve historical audit language.
- [ ] Step 2: apply the smallest `App.tsx` copy, hierarchy, and recovery patch.
- [ ] Step 3: run static source checks, domain tests, typecheck, build, and
  `git diff --check`.
- [ ] Step 4: inspect the current build visually if a fresh screenshot can be
  captured without misrepresenting a different build.
- [ ] Step 5: execute the changed browser flow through the Codex Chrome
  Extension, including keyboard baseline and mobile reflow.
- [ ] Step 6: publish through PR and Pages only if local evidence passes, then
  run `npm run verify:hosted` and record the canonical result.
- [ ] Step 7: keep the public PM pilot open and report real feedback, not
  inferred stars or adoption.

### Deep QA toolchain matrix

| Layer | Tool / command | Oracle | Evidence status |
|---|---|---|---|
| Domain | `npm test -- --run` | Fixture, claims, export, and feedback behavior remains green. | Required this pass. |
| Type | `npm run lint` | TypeScript emits no errors. | Required this pass. |
| Build | `npm run build` | Vite emits the deployable bundle. | Required this pass. |
| Static copy | `rg` + hosted verifier | Current wording is present; stale wording is absent. | Required this pass. |
| Visual | fresh current-build screenshot if available | Topbar is quieter; source spine remains dominant; no overflow. | Required if artifact is changed. |
| Browser behavior | Codex Chrome Extension | Empty, loaded, reset, source expansion, mobile action, and recovery route behave as described. | Required for changed UI. |
| Keyboard | Chrome Extension baseline | Focus remains visible and the new recovery route is keyboard reachable. | Bounded baseline only. |
| Assistive tech | VoiceOver/NVDA/TalkBack | Native output and rotor/order are correct. | Not covered unless directly executed. |
| Hosted | `npm run verify:hosted` | Canonical HTTPS, assets, `en-US`, current copy, stale-copy guard. | Required after merge. |
| External adoption | Public pilot issue #4 | Real PM reports only; no inferred conversion or stars. | Still open / not verified. |

### Release gate

Hold the release if the stale-copy check fails, if `Decide` recovery still
lands in the wrong step, if the source rows are visually demoted, or if the
canonical hosted verifier does not pass after Pages deploy. A successful build
alone is not release evidence.

## Risk, fallback, and rollback

| Risk | Detection | Fallback / rollback |
|---|---|---|
| Removing the topbar status makes the local boundary harder to find | Fresh desktop/mobile screenshots and DOM text check | Restore the topbar block or add one compact boundary label in the hero; do not hide trust copy. |
| The new `Decide` route surprises a user who expected `Verify` | Controlled click from empty state and keyboard traversal | Keep the destination at `Collect`, because that is where the missing source can be supplied; revert only if the observed flow contradicts the empty-state explanation. |
| README screenshot is stale or unavailable | Compare its visible strings with `scripts/verify-hosted-demo.mjs` | Remove the image from the current README until a fresh current-build capture exists; do not relabel an old screenshot as current. |
| A rename breaks hosted copy verification | `npm run verify:hosted` and forbidden-string scan | Update the verifier and docs in the same diff, or revert the rename before publishing. |
| A broader UI regression appears | Local gates, Chrome behavior matrix, and post-merge canonical check | Hold merge; use the last known-good main commit `91da982` as the rollback reference. No data migration is involved. |

## UX/AI/security gate

- UX gate: first-time, empty, loading, error, recovery, backtracking, mobile,
  keyboard, and trust states remain explicit in the QA report.
- AI gate: no provider call, model activity, confidence score, telemetry, or
  unsupported quality claim enters the diff; the deterministic fixture remains
  labelled as such.
- Security/privacy gate: no raw evidence leaves the page, no secret is added,
  no GitHub mutation is automated, and the feedback handoff stays manual.
- Accessibility gate: native screen-reader output remains `Not covered` unless
  directly executed; semantic labels, focus visibility, and keyboard routing
  are checked only at the layer actually observed.

### Not covered

- Native VoiceOver, NVDA, TalkBack, or other screen-reader output.
- Physical device touch, share sheet, save-to-Photos, and hardware keyboard.
- Forced loader failure, denied clipboard permission, and network interruption
  at the exact transient frame.
- Unguided external PM sessions, comprehension, retention, adoption, traffic,
  stars, or the 10,000-star target.
- Model quality: v0 still has no external provider.

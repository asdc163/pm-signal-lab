# PM Signal Lab — case-sheet craft and accessibility contract

Status: implemented locally; reviewable in Draft PR #44; hosted release
pending. This is a narrow follow-up to the editorial case-sheet reframe. It
does not add a model, provider, telemetry, account permission, or external
submission path.

## Product decision

Keep the product as a quiet English-first PM workpaper. The next quality gain
is semantic and editorial discipline, not another feature or another visual
surface:

1. Decorative icons must stay out of the accessibility tree.
2. Visible language must name the work object, source, claim, smallest test,
   and limitation before it names AI.
3. The composition must preserve one reading path: case → source → claim →
   test → handoff.
4. Every public quality statement must name its evidence layer: local,
   Chrome accessibility tree, hosted, native assistive technology, participant,
   or adoption.

5. Decide is a human-review gate: the interface must not draft an experiment
   from an unreviewed claim, even when the stepper is used directly.

Second-polish direction: remove repeated interface labels before adding any
new decoration. The current language pass uses `Working sheet` for the shell,
`Review sheet` for the loaded work object, `Sheet status` for the live count,
and `Source lines` for the evidence surface. The loaded sentence `Four source
lines. One decision to test next.` uses a count and a human decision rather
than a capability claim.

## Problem frame

- Decision: should this slice spend its next change on semantic clarity and
  editorial restraint instead of another AI-facing feature or visual panel?
- User/job: an international PM needs to inspect a source line, understand what
  it supports, choose a human-owned next test, and carry a challengeable brief
  forward without navigating an assistant persona.
- Outcome metric: the local case-sheet path remains operable from sample to
  brief, the Chrome accessibility tree has zero unnamed decorative nodes, and
  the first read still follows case → source → claim → test.
- Evidence: current `src/App.tsx`, fresh local build/static checks, Chrome
  Extension trace, Chrome accessibility tree, keyboard/mobile checks, and the
  editorial screenshots referenced by the QA report.
- Unknowns: participant comprehension, native screen-reader output, hosted
  cache/deploy behavior, adoption, and GitHub-star movement.

## KB application contract

### Relevant KB and why it applies

- `foundations/design-brain.md`: route the change from product truth through
  composition, system, implementation, and fresh review.
- `foundations/design-rule-hierarchy.md`: readability and task clarity outrank
  the paper/editorial treatment.
- `foundations/product-craft-anti-ai-slop-operating-system.md`: remove AI feel
  through concrete work objects, real state, recovery, and honest evidence;
  do not solve it with decorative bans alone.
- `foundations/aesthetic-taste-system.md`: remove redundant labels and
  surfaces, retain one signature detail, and avoid model-average dashboard
  chrome.
- `foundations/design-composition-layout.md`: protect first read, second read,
  alignment spine, density, and responsive reflow.
- `foundations/design-review-workflow.md`: inspect fresh desktop/mobile states,
  behavior, accessibility, and a second polish pass.
- `foundations/anti-ai-writing-tells.md`: prefer specific nouns and visible
  limits over assistant persona, capability theatre, or generic reassurance.

Design reason: the current product already has a distinctive paper treatment;
the remaining quality risk is that visual polish could outrun the work object,
semantic clarity, or evidence boundary. These sources apply because the change
must make the case sheet easier to read and verify without adding a new surface
or making an AI persona more prominent.

### Product craft contract

```yaml
target_user: "English-speaking PM, founder, designer, or product engineer"
job: "Turn one observed line into a source-linked claim and one challengeable test"
first_read: "A case sheet with a current human action, not an AI assistant"
domain_objects:
  - case sheet
  - source line
  - source excerpt
  - claim
  - limitation
  - smallest experiment
  - decision brief
success_signal: "The local surface is understandable and operable without AI chrome leading"
signature_detail: "thin paper index with restrained red action and blue provenance marks"
trust_boundary:
  - fictional local fixture
  - manual human review
  - no live provider
  - no automatic GitHub mutation
  - privacy confirmation before local field-note preparation
```

### No-AI-feel guard

Keep:

- `Support draft review` as a concrete, fictional case subject.
- Source identity, date, original line, limitation, and human decision controls.
- A thin horizontal paper index, ruled rows, and restrained correction marks.
- English-first copy that can be read by an international PM without cultural
  translation of an assistant persona.

Reject:

- `AI-assisted support drafting` as visual working-surface chrome.
- Chat bubbles, typing simulation, confidence scores, glowing status panels,
  gradients, glass, or decorative 3D.
- Repeated labels that merely restate the topbar, hero, or current step.
- Claims that local fixture behavior proves model quality, user preference,
  adoption, or GitHub-star growth.

## Constraints and out of scope

Constraints:

- English-first public copy and a restrained editorial workpaper direction.
- No new dependency, model provider, API, telemetry, login, permission, or
  external write in this slice.
- Preserve source/claim/experiment semantics, privacy confirmation, manual
  Markdown handoff, mobile recovery, and existing PR separation.
- Keep the hosted URL, merge state, and private growth plan outside this code
  change.

Out of scope:

- Canonical hosted release or merge to `main`.
- Native VoiceOver/NVDA/TalkBack, real-device touch, browser zoom, or contrast
  certification.
- Participant research, international preference, adoption, retention, traffic
  attribution, or star-growth claims.
- Live AI quality, retrieval freshness, prompt-injection resistance, provider
  failure, cost, latency, or safety evaluation.

## Accessibility decision

Lucide SVGs used only as decoration are implementation details, not content.
They receive `aria-hidden="true"`. Buttons and links retain their visible or
explicit accessible names at the container level. No icon-only control is
allowed to depend on the hidden SVG for its name.

Acceptance criteria:

- Chrome accessibility tree: 0 unnamed images.
- Chrome accessibility tree: 0 unnamed buttons.
- Chrome accessibility tree: 0 unnamed links.
- Stepper and Verify action: an unreviewed claim cannot reach an experiment
  brief; an accepted, hypothesized, missing, or edited claim can continue.
- Keyboard skip link still focuses `main#main-content`.
- Mobile action remains visible and fixed at `390×844`.
- Visual appearance and click targets are unchanged by the semantics fix.
- Native VoiceOver/NVDA/TalkBack remains explicitly `未驗證` until directly
  run on the relevant platform.

## UX/AI/security gate

- First-time and empty: the user sees `Start with a source line` and one
  sample action, with no simulated AI thinking.
- Loading: the sample opens as a local worksheet; no provider status or typing
  theatre is shown.
- Error and recovery: source validation preserves the form, refresh clears only
  local state, and Markdown text remains available when clipboard behavior is
  unavailable.
- Mobile: the single-column sheet keeps the current action reachable without
  horizontal overflow.
- Trust: source identity, original line, limitation, human decision, `Not
  covered`, and the fictional/local boundary stay visible.
- AI evaluation: no live model exists in this slice; future provider work must
  add citation, abstention, freshness, malformed output, prompt-injection,
  latency, cost, and human-escalation cases before public claims.
- Permission and secret boundary: no login, API key, token, customer data,
  provider permission, or automatic external write is introduced.

## Execution contract

### Files/surfaces

- Modify: `src/App.tsx` and the current local QA report.
- Create: this contract only; do not create a new product surface.
- Test: `npm test`, `npm run lint`, `npm run build`, the local static verifier,
  fallback browser checks, and the Codex Chrome Extension trace.
- Observe: first read, source-to-test behavior, focus, mobile reflow, privacy
  boundary, visible copy, console/request state, and the Chrome accessibility
  tree.

### Change boundary

Modify only:

- `src/App.tsx`: add the hidden semantic boundary to decorative Lucide icons.
- `docs/product/pm-signal-lab/79-editorial-case-sheet-local-qa-2026-08-15.md`:
  record current evidence and the remaining release boundary.
- This contract: preserve the decision and rollback rule.

Do not change:

- source/claim/experiment domain semantics;
- privacy checkbox behavior or field-note wording;
- Markdown export, copy, or download boundaries;
- GitHub issue/comment/PR mutation behavior;
- hosted configuration, merge state, or deployment state;
- private star-growth planning files.

### Bite-sized execution steps

- [x] Step 1 — mark every decorative Lucide SVG as hidden from the semantic
  tree while preserving the container's accessible name.
- [x] Step 2 — run tests, typecheck, production build, diff check, and the
  local HTTP/static copy oracle.
- [x] Step 3 — run the fallback browser path for source, claim, smallest test,
  export, privacy recovery, keyboard, mobile, and overflow behavior.
- [x] Step 4 — run the Chrome Extension path and inspect a fresh accessibility
  tree; record unnamed-node counts before and after the fix.
- [x] Step 5 — update the QA evidence layer and mark hosted, native AT,
  participant, and adoption gates separately.
- [ ] Step 6 — stage only public product files, commit/push the Draft PR, and
  leave merge/deploy for an explicit release decision.

### Verification sequence

```bash
npm test
npm run lint
npm run build
git diff --check
HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted
```

Then use the Codex Chrome Extension against the local production preview to
exercise:

1. blank sheet → sample worksheet;
2. source expansion → claim review → one accepted claim;
3. smallest experiment → Markdown brief;
4. privacy block without confirmation → privacy-confirmed local field note;
5. skip link, mobile fixed action, and no horizontal overflow;
6. fresh accessibility tree with the three unnamed-node counts.

Fallback Playwright evidence remains useful, but it cannot be silently promoted
to native Chrome, native screen-reader, hosted, participant, or adoption
evidence.

## Evidence ledger

| Gate | Current result | Boundary |
|---|---|---|
| Tests/typecheck/build | PASS in the current local run | Local source/build only |
| Static HTTP verifier | PASS against `127.0.0.1:4179` | Local preview only |
| Chrome core interaction | PASS: source → claim → test → export and privacy branches | Local Chrome tab only |
| Chrome accessibility tree | PASS: 0 unnamed images/buttons/links after the fix | Not native AT output |
| Keyboard/mobile | PASS: skip target and fixed action; no tested overflow | Not physical device or zoom |
| Visual craft | PASS in fresh desktop/mobile screenshots for the editorial hierarchy | Owner visual review, not participant preference |
| Canonical hosted release | HOLD: current Pages URL still serves the previous bundle | Requires merge/deploy and fresh HTTPS/browser evidence |
| International PM sessions | HOLD: no participants executed in this slice | Requires authorized recruitment and consented notes |
| Stars/adoption | HOLD: no claim made | Requires public observation over time |

## Rollback

Revert the accessibility-only `src/App.tsx` change if a supported browser or
assistive-technology check shows a lost accessible name or changed interaction.
The visual case-sheet reframe remains a separate reviewable change. No data
migration, dependency, provider, permission, or deployment rollback is
required.

## Definition of done

This contract is complete for the local slice when:

- the code change is reviewable in the Draft PR;
- local tests, build, static verifier, Chrome interaction, keyboard/mobile, and
  accessibility-tree checks have fresh evidence;
- the QA report distinguishes local, hosted, native AT, participant, and
  adoption layers;
- no claim says `viral`, `problem-free`, `10,000 stars`, or `ready` without a
  corresponding current evidence layer.

The broader product goal remains open until hosted release and real
international PM learning are separately executed and recorded.

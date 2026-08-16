# Less-AI margin note and evidence state — local browser QA

Date: 2026-08-16
Candidate: `codex/less-ai-editorial-sheet`
Scope: remove the remaining generic status chrome from the loaded workpaper
without adding a feature, provider, dependency, network path, or new visual
system.

This is a focused local QA report for the `Sheet tally` and evidence-state
surface. It is not a hosted release sign-off. The product job remains: keep a
source line attached while deciding what it can support, name the smallest
test, and carry a brief someone can challenge forward.

## Design decision and evidence boundary

The change follows the design knowledge-base direction recorded in
[`102-less-ai-margin-note-and-evidence-state-contract-2026-08-16.md`](./102-less-ai-margin-note-and-evidence-state-contract-2026-08-16.md):
source rows and provenance carry the product identity; the page should read as
a quiet PM workpaper rather than an AI control room; human decisions should be
named literally; and trust should come from inspectable evidence rather than
status theatre.

The slice therefore stays small:

- the existing paper surface, ruled source rows, blue provenance spine, and red
  action cue remain;
- the loaded hero now says `Sheet tally` and reports source/review counts;
- `Current step` and the repeated `On this page` hero status are removed from
  the loaded hero because the workflow index and handling note already carry
  those facts;
- Decide now says `Source check` / `Evidence gap`, `Claim accepted`, or
  `Source check incomplete` based on the observable review state;
- no model, provider, telemetry, upload, external resource, GitHub mutation,
  merge, or deployment was introduced.

No claim is made here about hosted behavior, native assistive technology,
real-device behavior, participant comprehension, adoption, or GitHub stars.

## Finding that triggered the fix

### UX-004 — repeated status chrome made a source workpaper read like an AI dashboard

- **Severity:** P2, trust and visual voice.
- **User/job:** an international PM opening a source-backed worksheet should be
  able to see the evidence record, understand the review count, and choose the
  next human action without decoding generic application-status language.
- **Observed path:** load the deterministic sample and read the first loaded
  viewport, then draft a Decide brief after reviewing a claim.
- **Before:** the hero repeated `Current step` and `On this page`, while the
  Decide editor used `Ready for confirmation` / `Needs validation`.
- **Likely user interpretation:** the product may be running an invisible
  agent or reporting a system state that is more authoritative than the source
  itself.
- **Risk:** the visual hierarchy moves attention from source lines and human
  review to generic state chrome; this weakens the product's credibility as a
  PM tool.
- **Fix:** use the hero for a literal `Sheet tally` margin note and use
  evidence-specific labels for the Decide state; retain the workflow index,
  local boundary, review gate, and source rows.
- **Acceptance criteria:** the loaded hero has one tally and one primary
  action; no visible `Current step`, `On this page`, `Ready for confirmation`,
  or `Needs validation` remains in the changed path; missing evidence is
  visibly distinguished from an accepted source-backed claim; mobile keeps one
  fixed primary action; existing source disclosure and workflow gates remain
  usable.

## Behavior matrix

| Case | User archetype and job | Starting state / likely hesitation | Success signal and recovery expectation | Result |
| --- | --- | --- | --- | --- |
| QA-301 | New PM; understand what the blank worksheet is for and what to do next | Fresh 390px page; may mistake the empty surface for an unavailable product | `Start with a source line`, one sample action, one own-signal action, and first Tab `Skip to main content` are visible | PASS |
| QA-302 | PM reviewing a prepared support-draft pack; locate proof before taking action | Loaded sample; may read the status panel as an AI system dashboard | `Support draft review`, `Sheet tally`, source count, review count, and `Start review` are visible; `Current step` is not visible | PASS |
| QA-303 | Low-trust PM; inspect a source without losing the source-to-claim relationship | Loaded Collect; may hesitate over whether `View source` changes or sends data | `View source` → `Hide source`; expanded control points to a live source region; collapse removes the relationship; no external resource is requested | PASS |
| QA-304 | New user entering one manual signal; recover from an incomplete form | Blank sheet; empty submit could otherwise create a silent failure | Three field-specific errors appear, `aria-invalid=true` is set, Cancel returns to the sheet, valid entry saves, and Reset clears the set with a literal notice | PASS |
| QA-305 | Skeptical PM; preserve uncertainty instead of accepting a weak claim | Sample → Verify; mark the first claim as missing evidence | The gap notice remains visible; Decide shows `Evidence gap`, `Source check incomplete`, and an explicit review instruction | PASS |
| QA-306 | PM completing the core job; create a challengeable next test | Sample → Verify → accept → Decide → draft → Ship | The full flow completes; Decide shows `Source check` / `Claim accepted`; Ship shows `Markdown export` and `Review before copying` | PASS |
| QA-307 | Returning user; understand the local data boundary after interruption | Sample loaded, then browser refresh | The sample is cleared and the first-run heading returns; no local fixture is presented as persistent data | PASS |
| QA-308 | Mobile PM; reach the primary action without a second competing action | 390×844 emulated viewport | No horizontal overflow; fixed mobile action remains reachable; 1024×900 and 1440×900 hide the mobile bar and also have no overflow | PASS |
| QA-309 | Accessibility-sensitive user; navigate named controls and relationships | Fresh page and loaded source row | First Tab reaches skip link; no unnamed visible controls, duplicate IDs, or dangling `aria-controls` | PASS for Chrome fallback semantics; native AT unverified |
| QA-310 | PM assessing trust; distinguish a deterministic fixture from live AI output | Any local state | Local boundary and source-backed wording remain visible; no provider/network/upload/telemetry path is exercised | PASS for local boundary; live-model quality untested |

## UX diagnostic matrix

| Probe | Evidence from the fresh run | Result / boundary |
| --- | --- | --- |
| Five-second comprehension | First read is `Start with a source line` when blank and `Support draft review` when loaded; the loaded hero now names a tally, not a system step | PASS for the changed surface; non-owner comprehension remains unverified |
| Task-based usability | Owner-run tasks completed: open sample, inspect source, review a claim, mark/accept a claim, draft, export; the edge run also covered invalid entry, Cancel, Reset, refresh, and missing evidence | PASS for the exercised deterministic fixture; no participant time-on-task or SEQ score exists |
| Behavior trace | No rage click, browser dead end, request failure, or console error; source disclosure, form recovery, refresh recovery, and evidence-gap path all returned to a named next state | PASS for the tested paths; full workflow backtracking beyond these paths was not exercised |
| Assistive-technology profile | First Tab, accessible names, `aria-invalid`, `role=alert`, `role=status`, live source region, duplicate IDs, and dangling relationships were checked in Chrome | Native VoiceOver, NVDA, TalkBack, zoom, and physical-device output remain unverified |
| AI UX uncertainty | The state is deterministic and source-backed; missing evidence is not promoted to a ready state; no model confidence, fake agent activity, or provider result is shown | PASS for the local product boundary; provider quality, drift, injection, latency, and cost are out of scope |

## Visual evidence

- [Blank mobile](./assets/qa/less-ai-margin-note-evidence-state-blank-390-2026-08-16.png)
- [Loaded mobile](./assets/qa/less-ai-margin-note-evidence-state-loaded-390-2026-08-16.png)
- [Decide mobile](./assets/qa/less-ai-margin-note-evidence-state-decide-390-2026-08-16.png)
- [Ship mobile](./assets/qa/less-ai-margin-note-evidence-state-ship-390-2026-08-16.png)
- [Loaded tablet](./assets/qa/less-ai-margin-note-evidence-state-loaded-1024-2026-08-16.png)
- [Loaded desktop](./assets/qa/less-ai-margin-note-evidence-state-loaded-1440-2026-08-16.png)

Visual inspection of the new screenshots found the source record still carries
the strongest visual weight. The hero tally is a restrained margin note, the
Decide evidence state is a ruled annotation rather than a filled SaaS banner,
and the mobile action remains a single bottom action. No gradient, glass,
orb, bento wall, fake agent feed, or new animation was introduced.

## Static, browser, and content-oracle evidence

- `npm test -- --run` — exit 0; 4 files / 11 tests passed.
- `npm run lint` — exit 0; TypeScript `tsc --noEmit` passed.
- `npm run build` — exit 0; Vite 7.3.6 emitted `dist/assets/index-BIy0pwdG.js`
  and `dist/assets/index-CoOWk135.css`.
- `git diff --check` — exit 0 before this report was written.
- `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` — exit 0 in the
  current local production preview at `2026-08-16T05:56:22.355Z`; HTTP 200,
  `lang=en-US`, current copy present, stale copy absent, and
  `canonical_https: false` as expected for localhost.
- Fresh isolated headless Chrome fallback — Google Chrome `151.0.7922.138`,
  en-US, viewport `390×844`, `1024×900`, and `1440×900`. The preferred
  Chrome Extension route was unavailable because the Mac was locked; this
  fallback is not promoted to Extension evidence.
- Main browser trace — blank → sample → source disclosure → Verify → accept →
  Decide → draft → Ship; `browser_errors=[]` and `request_failures=[]`.
- Loaded `390×844` geometry — `scrollWidth/clientWidth=390/390`,
  `overflow=false`, hero `aria-label="Sheet tally"`, visible `Current step`
  `false`, mobile action bar `flex`.
- Loaded `1024×900` geometry — `1024/1024`, `overflow=false`, hero label
  `Sheet tally`, visible `Current step` `false`, mobile action bar `none`.
- Loaded `1440×900` geometry — `1440/1440`, `overflow=false`, hero label
  `Sheet tally`, visible `Current step` `false`, mobile action bar `none`.
- Semantic scan at `390×844` — unnamed visible controls `[]`, duplicate IDs
  `[]`, dangling relationships `[]`, external resources `[]`.
- Edge browser trace — empty form validation → Cancel; manual source entry →
  Reset; sample refresh clears the local sheet; missing evidence →
  needs-validation brief. It also ended with `browser_errors=[]` and
  `request_failures=[]`.
- Source semantics — expanded `Hide source` retains `aria-controls` for the
  live `role=region`; collapsing returns to `View source` without the
  relationship.

## QA harness correction

The first browser probe stopped in the test harness, not the product: the
helper attempted to query visible copy with the unsupported `get_by_role("text")`
route and the geometry object did not include its own `overflow` field. The
helper was corrected to use exact text queries and to report overflow; the
final browser trace then passed. The edge probe also had one broad `Source`
label selector that matched the worksheet region; it was narrowed to the
exact textbox role before the final edge run. These are recorded so an early
probe failure is not hidden behind a later green result.

## Canonical hosted boundary

The current canonical readback was run separately:

```text
HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted
Hosted demo verification failed: Current hosted JavaScript is missing: Start with a source line
```

The hosted URL still serves the prior bundle. The local preview pass does not
prove Pages behavior. PR #44 remains draft and this slice does not merge or
deploy.

## Release decision

**PASS for the focused Less-AI margin-note and evidence-state slice only.**
The change is small, reversible, and supported by current local static gates,
fresh owner-run browser behavior, edge-state checks, screenshot inspection,
and an explicit hosted failure boundary. The broader release remains on hold
until the canonical hosted bundle, preferred Chrome Extension trace, native
assistive technology, real-device behavior, and real PM sessions are
independently verified.

## Not covered

- Preferred Codex Chrome Extension foreground trace.
- Native VoiceOver, NVDA, TalkBack, or equivalent screen-reader speech output.
- Real iOS Safari or Android Chrome touch behavior.
- Canonical GitHub Pages behavior after an approved merge/deploy.
- Five unguided international PM sessions, ease scores, field notes, repeat
  use, issue replies, or participant comprehension.
- Live provider quality, retrieval freshness, prompt-injection resistance,
  latency, cost, analytics, adoption, traffic, or GitHub star movement.
- Any claim that this project is viral or on track for 10,000 stars.

## Rollback

Revert the focused copy/style commit if the loaded hero loses its connection to
the first-run state, if a literal label becomes ambiguous, if the source
review path loses a recovery action, or if focus/overflow/workflow behavior
regresses. No data migration, dependency removal, provider shutdown,
permission change, or external cleanup is required.

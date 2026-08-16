# Less-AI workpaper second polish — focused local QA

Date: 2026-08-16
Candidate: `codex/less-ai-editorial-sheet`
Scope: remove remaining AI-dashboard signals from the loaded workpaper by
using more literal human ownership labels, tightening the sample-state copy,
and giving the loaded hero the same editorial display voice as the empty state.

This is a focused local QA report for the changed copy and visual surface. It
is not a full product release sign-off. The product job remains: read a source
line, review what it supports, name the smallest test, and carry a brief
someone can challenge forward.

## Design decision and evidence boundary

The change applies the design knowledge-base direction already recorded in the
project: source rows and provenance are the visual signature; the page should
read like a quiet PM workpaper rather than an AI control room; human decisions
must be literal; and trust comes from inspectable evidence, not reassurance or
status theatre.

The second polish therefore stays deliberately small:

- the existing paper, ruled-row, blue-provenance, and red-action system stays;
- the loaded hero now uses the same display face as the first-run hero;
- labels such as `Decision owner: you`, `Stop rule: yours`, and `Markdown
  export` state ownership and output literally;
- notices describe what changed on the sheet instead of promising safety or
  implying an agent is working in the background;
- no new dependency, provider, network call, animation, panel, or domain state
  was introduced.

No claim is made here about hosted behavior, native assistive technology,
real-device behavior, participant comprehension, adoption, or GitHub stars.

## Finding that triggered the fix

### UX-003 — loaded workpaper still sounded like product orchestration

- **Severity:** P2, trust and visual voice.
- **User/job:** a PM opening a small decision worksheet should understand what
  they own and what the sheet contains without decoding AI-product language.
- **Repro:** load the sample and read the hero, review gate, decision gate, and
  export state at mobile and desktop widths.
- **Before:** several labels used reassurance or workflow-theatre language,
  including `You make the call`, `You still own the stop rule`, and
  `Portable Markdown`; the loaded hero also used a heavy sans display style
  while the first-run state used the editorial serif.
- **Expected:** copy names the exact user action or artifact, and the loaded
  surface keeps one coherent workpaper voice.
- **Fix:** replace the ambiguous labels with literal ownership/output language,
  shorten state notices to describe the sheet, and reuse the display face for
  the loaded hero.
- **Regression risk:** copy oracle collisions, mobile wrapping, focus naming,
  source disclosure semantics, and the full state path through Ship.

## Behavior matrix

| Case | Starting state and task | Expected oracle | Result |
| --- | --- | --- | --- |
| QA-201 | Fresh mobile page at 390px; read the first viewport | `Start with a source line` is the heading, `Start review` is not shown before the sample, and there is no horizontal overflow | PASS |
| QA-202 | Open the sample worksheet; inspect the loaded hero and notice | `Support draft review`, the shorter sample notice, and the serif display face are present | PASS |
| QA-203 | Expand then collapse the first source | `View source` becomes `Hide source`, the expanded control points to a live region, and collapse removes the relationship | PASS |
| QA-204 | Start review; inspect the human review gate | `Decision owner: you` and `Review gate` are visible; the claim can be accepted | PASS |
| QA-205 | Accept a claim and move to Decide | `Stop rule: yours` is visible and the flow reaches Decide without a duplicate mobile primary action | PASS |
| QA-206 | Draft the smallest experiment and export | `Markdown export` and `Review before copying` are visible; the final brief path works | PASS |
| QA-207 | Start fresh, press the first Tab, and scan visible controls | Focus reaches `Skip to main content`; unnamed controls, duplicate IDs, dangling relationships, browser errors, and external resources are all zero/empty | PASS |
| QA-208 | Load at 1024px and 1440px | The loaded hero keeps the serif display face, the topbar says `Local worksheet`, the mobile action bar is hidden, and there is no overflow | PASS |

## UX diagnostic matrix

| Lens | Evidence | Result |
| --- | --- | --- |
| Five-second comprehension | First-run read remains `Start with a source line`; loaded read is `Support draft review`; the change removes orchestration labels from the main path | PASS for changed surface; participant comprehension remains unverified |
| Information hierarchy | Hero → source rows → review gate → decision gate → Markdown export remains the same path | PASS |
| Mental model | Ownership labels name the human decision and the exported artifact directly | PASS |
| Visual coherence | Empty and loaded heroes use the same editorial display voice; source rows remain the strongest visual anchor | PASS in inspected screenshots |
| Action clarity | `Review gate`, `Stop rule: yours`, and `Markdown export` describe the actual next step or artifact | PASS |
| Mobile ergonomics | 390px document/client width is `390/390`; fixed action ownership remains intact | PASS in emulated browser viewport; real-device touch remains unverified |
| Recovery | Source collapse, review decisions, export gate, and refresh-safe local state remain available in the exercised path | PASS for exercised path |
| Trust calibration | No model persona, confidence score, fake activity feed, provider call, upload, telemetry, or automatic submission was introduced | PASS |
| Accessibility dignity | First Tab, visible labels, duplicate IDs, dangling `aria-controls`, and mobile geometry pass the focused scan | Native screen-reader speech and full AT profiles remain unverified |

## Visual evidence

- [Blank mobile](./assets/qa/less-ai-workpaper-second-polish-blank-390-2026-08-16.png)
- [Loaded mobile](./assets/qa/less-ai-workpaper-second-polish-loaded-390-2026-08-16.png)
- [Decide mobile](./assets/qa/less-ai-workpaper-second-polish-decide-390-2026-08-16.png)
- [Ship mobile](./assets/qa/less-ai-workpaper-second-polish-ship-390-2026-08-16.png)
- [Loaded tablet](./assets/qa/less-ai-workpaper-second-polish-loaded-1024-2026-08-16.png)
- [Loaded desktop](./assets/qa/less-ai-workpaper-second-polish-loaded-1440-2026-08-16.png)

Visual review: the blank state keeps the paper-and-margin first read; the
loaded state now carries the same serif editorial voice instead of switching to
a generic SaaS hero; the 1440px source record remains the main visual anchor;
and Decide/Ship retain the quiet ruled workpaper surface. No gradient, glass,
orb, bento wall, fake agent feed, or new animation was introduced.

## Static, browser, and content-oracle evidence

- `npm test -- --run` — exit 0; 4 files / 11 tests passed.
- `npm run lint` — exit 0; TypeScript passed.
- `npm run build` — exit 0; Vite 7.3.6 emitted the current hashed assets:
  `dist/assets/index-DcUWGGbX.js` and `dist/assets/index-C9d8-jtd.css`.
- `git diff --check` — exit 0.
- `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` — exit 0; HTTP
  200, `lang=en-US`, current copy present, stale copy absent, and
  `canonical_https: false` as expected for the local preview.
- Fresh isolated headless Chrome CDP fallback — no browser errors and no
  request failures.
- Fresh 390px semantic scan — unnamed visible controls `[]`, duplicate IDs
  `[]`, dangling relationships `[]`, external resources `[]`, and document /
  client widths `390/390`.
- Fresh flow — blank → sample → source disclosure → Verify → accept → Decide
  → draft → Ship.
- Responsive checks — loaded 1024px and 1440px both had no horizontal
  overflow, `scrollWidth === clientWidth`, `Local worksheet` in the topbar,
  the mobile action bar hidden, and the loaded hero using the display serif.
- Focus check — the first Tab after a fresh reload reached `Skip to main
  content`.
- Source semantics — expanded `Hide source` retained `aria-controls` for the
  live `role=region`; collapsing removed `aria-controls`.

## Correction made during verification

The first local verifier run correctly exposed that `Current worksheet state`
contained a forbidden stale-copy fragment even though it was only an
accessible label. That label was reduced to `Worksheet state`, the product was
rebuilt, and the full local verifier plus fresh browser trace passed. This is
recorded as a fixed oracle collision, not hidden as a successful first run.

## Canonical hosted boundary

The canonical Pages URL was not promoted by this slice. The existing hosted
readback remains a separate gate and previously failed with:

```text
Hosted demo verification failed: Current hosted JavaScript is missing: Start with a source line
```

That failure means the canonical URL still serves the prior bundle. The local
preview pass does not prove hosted readiness. PR #44 remains draft; this slice
does not merge or deploy it.

## Release decision

**PASS for the focused less-AI workpaper second-polish slice only.** The change
is small, local, reversible, and supported by fresh browser, screenshot, and
local production-preview evidence. The broader release remains on hold until
the canonical hosted bundle, preferred Chrome Extension trace, native
assistive technology, real-device behavior, and real PM sessions are
independently verified.

## Not covered

- Preferred Codex Chrome Extension foreground trace.
- Native VoiceOver, NVDA, TalkBack, or equivalent screen-reader speech output.
- Real iOS Safari or Android Chrome touch behavior.
- Canonical GitHub Pages behavior after merge/deploy.
- Five unguided international PM sessions, ease scores, field notes, repeat
  use, or issue replies.
- Live provider quality, retrieval freshness, prompt-injection resistance,
  latency, cost, analytics, adoption, traffic, or GitHub star movement.
- A claim that this project is viral or on track for 10,000 stars.

## Rollback

Revert the focused copy/style commit if the loaded hero loses its connection to
the first-run state, a literal label becomes ambiguous, the source review path
loses a recovery action, or focus/overflow/workflow behavior regresses. No data
migration, dependency removal, provider shutdown, permission change, or
external cleanup is required.

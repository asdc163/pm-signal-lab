# Source-first chrome simplification — focused local QA

Date: 2026-08-16
Candidate: `codex/less-ai-editorial-sheet`
Scope: remove repeated topbar case context, rename the duplicated Collect
eyebrow, and make the source index label sentence case.

This is a focused local QA report for the changed visual and copy surface. It
is not a full product release sign-off. The broader product job remains:
read a source line, review what it supports, name the smallest test, and carry
a brief someone can challenge forward.

## QA scope and evidence boundary

- Local source server: `http://127.0.0.1:4173/`
- Local production preview: `http://127.0.0.1:4179/`
- Browser route: isolated headless Google Chrome `151.0.7922.138` through CDP
  fallback; the preferred Chrome Extension route was unavailable.
- Fresh viewports: `390×844`, `1024×900`, and `1440×900`.
- Static oracle: `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted`.
- No hosted, native assistive-technology, real-device, non-owner, adoption, or
  GitHub-star claim is made from this report.

## Finding that triggered the fix

### UX-002 — repeated case-study chrome

- **Severity:** P2, comprehension and visual hierarchy.
- **User/job:** a PM opening the worksheet should know what to read and act on
  without decoding repeated template labels.
- **Repro:** open the sample at desktop width and inspect the topbar, loaded
  hero, Collect heading, and first source marker.
- **Before:** the topbar repeated the complete case title that the hero already
  owned; `Source lines` repeated `Source lines to check`; source folios showed
  `SOURCE` in all caps.
- **Expected:** the topbar carries only the local worksheet boundary; the
  Collect section has one direct eyebrow and heading; the source marker reads
  as working metadata.
- **User interpretation risk:** the interface can look like an editorial
  mockup or AI-generated dashboard shell instead of a small PM tool.
- **Fix:** topbar keeps `Local worksheet`; Collect uses `Evidence`; source
  index casing is `Source` with the existing number and ruled row.
- **Regression case:** `QA-101` through `QA-107` below.

## Behavior matrix

| Case | Starting state and task | Expected oracle | Result |
| --- | --- | --- | --- |
| QA-101 | Fresh mobile page at 390px; inspect the first viewport | Topbar reads `Local worksheet`; h1 reads `Start with a source line`; fixed action opens the sample; no overflow | PASS |
| QA-102 | Load the sample at 390px; inspect the Collect hierarchy | Hero keeps `Support draft review`; loaded eyebrow reads `Evidence`; heading reads `Source lines to check`; action says `Start review` | PASS |
| QA-103 | Load the sample at 1024px and 1440px; inspect topbar and source record | Topbar does not contain the full case title; source marker reads `Source`; first source title and date remain visible | PASS |
| QA-104 | Fresh mobile flow: open sample → Start review → Accept claim → advance to Decide | Workflow reaches `03 · Decide`; fixed mobile action remains visible; `.context-next` action is hidden on mobile; no duplicate primary action | PASS |
| QA-105 | Continue the same flow through draft, export, and Ship | State-specific action labels continue to change; the export gate and local-only boundary remain intact | PASS |
| QA-106 | Expand then collapse the first source at 390px | Collapsed toggle has no `aria-controls`; expanded toggle points to a live `role=region`; collapse removes the relationship | PASS |
| QA-107 | Press first Tab after a fresh reload | Focus reaches `Skip to main content` with browser-visible focus; no control focus rule is removed | PASS |
| QA-108 | Scan the fresh Decide state with label-aware naming | Duplicate IDs `0`; unnamed visible controls `0`; no dangling controls; same-origin resources only | PASS |

## UX diagnostic matrix

| Lens | Evidence | Result |
| --- | --- | --- |
| Five-second comprehension | At 390px the first read is `Support draft review`; at desktop the topbar no longer competes with it | PASS for the changed copy surface; participant comprehension still unverified |
| Information hierarchy | `Evidence → Source lines to check → Source record` is one direct reading path | PASS |
| Mental model | Source number, source type, date, original line, and review action remain attached | PASS |
| Action clarity | Mobile has one fixed primary action; desktop/tablet retain the contextual action | PASS |
| Mobile ergonomics | 390px has `scrollWidth = 390`; fixed action remains visible with no horizontal overflow | PASS in browser viewport; real-device touch remains unverified |
| Recovery | Source expansion/collapse, review gate, export gate, and refresh reset still work | PASS for exercised path |
| Trust calibration | No AI persona, confidence meter, provider call, upload, telemetry, or automatic submission was introduced | PASS |
| Accessibility dignity | First Tab, visible control naming, labels, duplicate IDs, and `aria-controls` relationships pass the focused scan | Native screen-reader speech and full AT profiles remain unverified |

## Visual evidence

- [Blank mobile](./assets/qa/source-first-chrome-simplification-blank-390-2026-08-16.png)
- [Loaded mobile](./assets/qa/source-first-chrome-simplification-loaded-390-2026-08-16.png)
- [Decide mobile](./assets/qa/source-first-chrome-simplification-decide-390-2026-08-16.png)
- [Ship mobile](./assets/qa/source-first-chrome-simplification-ship-390-2026-08-16.png)
- [Loaded tablet](./assets/qa/source-first-chrome-simplification-loaded-1024-2026-08-16.png)
- [Loaded desktop](./assets/qa/source-first-chrome-simplification-loaded-1440-2026-08-16.png)

Visual review: the current screenshots retain the warm paper surface, ruled
source spine, blue provenance, and restrained red action. The topbar now has
one quiet boundary label, the source section has one direct heading path, and
the source marker no longer reads like decorative all-caps folio furniture.
No gradient, glass, orb, bento wall, fake agent feed, or new animation was
introduced.

## Static, browser, and content-oracle evidence

- `npm test -- --run` — exit 0; 4 files / 11 tests passed.
- `npm run lint` — exit 0; TypeScript passed.
- `npm run build` — exit 0; Vite production build passed and emitted the
  current hashed JavaScript/CSS assets.
- `git diff --check` — exit 0.
- `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` — exit 0;
  HTTP 200, `lang=en-US`, title, hashed assets, current copy present, stale
  copy absent.
- The verifier oracle was repaired in the same slice after a fresh local run
  exposed six required strings from an older candidate; the stale-copy
  forbidden list was retained and current strings `Evidence`, `Source lines to
  check`, and `Source record` were added.
- Fresh browser runtime/console errors — none.
- Fresh 390px label-aware semantic scan — unnamed visible controls `0`,
  duplicate IDs `0`, dangling `aria-controls` `0`, external resources `[]`.
- Source semantics — collapsed `View source` had no `aria-controls`; expanded
  `Hide source` pointed to `source-evidence-interview-01`, which existed as a
  `role=region`; collapse removed the attribute.
- First Tab — `Skip to main content`, browser-visible focus.
- Action ownership — at 390px the fixed action bar was `display:flex` and the
  context action was `display:none`; at 1024px and 1440px the mobile bar was
  hidden and the desktop context behavior remained unchanged.
- Geometry — `390/390`, `1009/1009`, and `1425/1425` document/client widths;
  no horizontal overflow in the exercised states.

## Canonical hosted boundary

`npm run verify:hosted` against the canonical Pages URL still fails with:

```text
Hosted demo verification failed: Current hosted JavaScript is missing: Start with a source line
```

This proves the canonical URL still serves an older bundle. The local preview
pass does not prove hosted readiness. PR #44 remains draft; this slice does
not merge or deploy it.

## Release decision

**PASS for the focused source-first chrome slice only.** The change is small,
local, reversible, and supported by fresh browser plus local production-preview
evidence. The broader release remains on hold until the canonical hosted
bundle, preferred Chrome Extension trace, native assistive technology,
real-device behavior, and real PM sessions are independently verified.

## Not covered

- Preferred Codex Chrome Extension foreground trace.
- Native VoiceOver, NVDA, TalkBack, or equivalent screen-reader speech output.
- Real iOS Safari or Android Chrome touch behavior.
- Canonical GitHub Pages behavior after merge/deploy.
- Five non-owner PM sessions, ease scores, field notes, repeat use, or issue
  replies.
- Live provider quality, production analytics, adoption, traffic, stars, or a
  claim that the project is viral or on track for 10,000 stars.

## Rollback

Revert the source-first copy/style commit if the topbar loses a useful local
boundary, the source heading becomes ambiguous, the source marker loses its
number, or focus/overflow/workflow behavior regresses. No data migration,
dependency removal, provider shutdown, permission change, or external cleanup
is required.

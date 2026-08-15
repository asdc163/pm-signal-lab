# Direct Workbench Copy and Semantic Polish Local QA

Date: 2026-08-15
Checked at: `2026-08-15T07:57Z` to `2026-08-15T08:00Z`
Surface: local Vite preview at `http://127.0.0.1:5180/`
Locale: English-first `en-US`

## QA result

The current diff passes the local code and static-copy gates. A fresh current
build screenshot at 1280×900 and 390×844 shows the source-first workbench
without the removed topbar status block. A headless Chrome CDP fallback
executed the main source-review path, source expansion, claim review, brief
drafting, and mobile overflow check.

This is local evidence for the copy, hierarchy, and recovery patch. It is not a
canonical hosted release, native screen-reader sign-off, or non-owner PM study.

## Route and evidence boundary

- Intended Tommy product-QA route: Codex Chrome Extension in the existing Chrome
  session.
- Route used for this patch: headless Google Chrome with a temporary profile
  and Chrome DevTools Protocol because the Chrome Extension controls were not
  available in the current tool surface.
- The fallback was used for direct DOM actions and screenshots only. It does
  not prove foreground-focus behavior, native assistive-technology output, or
  physical-device behavior.
- No Safari, Browser Use, Browserbase/browse.sh, or alternate devtools bridge
  was used.

## Product QA behavior matrix

| Persona / job | Starting state | Expected result | Actual evidence |
|---|---|---|---|
| International PM / understand the first action | Fresh local preview, 1280×900 | See the current work label, one source-first statement, sample action, own-signal action, and local boundary. | PASS: fresh screenshot and DOM checks showed `Current work`, `Open the sample worksheet`, `Add your own signal`, and no old worksheet/activity labels. |
| Evidence reviewer / read a source before reviewing | Sample worksheet loaded, 1280×900 | Read `Working set`, source rows, folios, and the review docket; source remains the main artifact. | PASS: DOM showed `Working set` and `Start review`; loaded screenshot showed source rows, folios, and docket. |
| Evidence reviewer / inspect provenance | Loaded sample | `View source` changes to `Hide source`. | PASS: direct click and DOM check returned `expanded_source: true`. |
| PM / review a candidate claim | Loaded sample after source inspection | `Start review` reaches `Check the claim against the line`. | PASS: direct click and DOM check found the Verify heading. |
| PM / draft a smallest test | First claim active | Accept a claim, then draft the smallest experiment and reach `Name the smallest test`. | PASS: `Accept claim` and `Draft smallest experiment` were found and clicked; Decide heading was present. |
| Mobile PM / start without horizontal clipping | Fresh local preview, 390×844 | Top stepper, current work, source-first content, and sticky sample CTA remain reachable. | PASS: mobile screenshot showed the top stepper and sticky CTA; `scrollWidth > innerWidth` was `false`. |
| Cautious PM / understand the local boundary | Fresh and loaded states | No generic activity feed or remote-transfer implication appears. | PASS: `Session record`, `No action yet` / `Last action below`, and local boundary were present; `Activity recorded` was absent. |
| Empty Decide recovery / return to the missing input | Defensive `claims.length === 0` branch | Copy says to use Collect and button label is `Back to Collect`. | PASS: source inspection and current bundle stale-copy scan confirm the branch and label. Direct UI entry is not possible through the normal guarded path because `selectStep` redirects empty Decide attempts to Collect. |

## Static and code gates

| Command | Result | Evidence |
|---|---|---|
| `npm test -- --run` | PASS | 4 files, 10 tests passed. |
| `npm run lint` | PASS | `tsc --noEmit` exited 0. |
| `npm run build` | PASS | Vite transformed 1,585 modules and emitted hashed JS/CSS. |
| `git diff --check` | PASS | No whitespace errors. |
| `python3 .../score_kb_plan.py .../63-...md --min-score 85` | PASS | KB-backed execution contract scored `100/100`. |
| `inspect_repo_qa_surface.py . --json` | PASS | Repo-native tests/build/lint and four CI workflows were discovered; no browser/a11y harness is repo-native. |
| `HOSTED_URL=http://127.0.0.1:5180/ npm run verify:hosted` | PASS within local scope | HTTP 200, `en-US`, title, hashed assets, current strings present, stale strings absent; `canonical_https: false` is expected for local preview. |

## Copy and no-AI-feel checks

The current source/bundle contains the concrete replacements:

- `Current work` replaces the repeated `Current worksheet` label.
- `Session record` and `Last action below` replace generic activity status.
- `Open the sample worksheet or add a signal in Collect, then review a claim
  before drafting a brief.` replaces `Load data in Collect`.
- `Back to Collect` replaces a misleading `Back to Verify` destination.
- The topbar no longer renders `.topbar-status`; the hero and footer still
  carry the local/no-transfer boundary.

The local verifier also confirmed these stale strings are absent from the
current bundle: `Load sample data`, `Current worksheet`, `Activity recorded`,
`No activity yet`, `Load data in Collect`, and `Back to Verify`.

## Visual evidence

- [Current first-run desktop screenshot](./assets/qa/first-run-current-1280.png)
  — 1280×900; source-first empty state, current work block, local boundary,
  and the primary sample action are visible.
- [Current first-run mobile screenshot](./assets/qa/first-run-current-390.png)
  — 390×844; top stepper, source-first copy, and sticky action are visible;
  no horizontal overflow was observed.
- [Current loaded workbench screenshot](./assets/qa/loaded-current-1280.png)
  — 1280×900 capture after opening the sample; source rows, review docket,
  local boundary, and the quieter right-side context remain visible.

The loaded screenshot was captured after the direct action focus moved to the
review docket, so it is a lower-page workbench view rather than a five-second
first viewport. It is evidence of the source surface, not a universal visual
baseline.

## Findings

### No blocking finding in the executed local scope

- The topbar status removal reduced one duplicate state frame without removing
  the boundary from the hero or footer.
- The source rows remained visually dominant in the loaded capture.
- The main path remained operational through source inspection, review, and
  experiment drafting.
- The mobile screenshot kept the sticky sample CTA visible and the DOM showed
  no horizontal overflow.
- The defensive empty-Decide branch now names and targets the real recovery
  destination. Its direct click remains unexecuted because the normal product
  guards prevent a user from entering that state.

## Not covered

- Codex Chrome Extension foreground-focus behavior for this exact diff; the
  fallback used headless Chrome CDP.
- Native VoiceOver, NVDA, TalkBack, rotor output, and full screen-reader
  semantics.
- Physical-device touch, share sheet, save-to-Photos, and hardware keyboard.
- Forced fixture failure, denied clipboard permission, and network interruption
  at the exact transient frame.
- A direct click through the empty `Decide` branch; the state is guarded by the
  current navigation rules and was verified by source/bundle inspection.
- Non-owner PM sessions, first-five-second comprehension, field notes,
  retention, adoption, traffic, stars, or the 10,000-star outcome.
- Model quality: v0 still has no external provider and uses a deterministic
  local fixture.

## Release hold

Do not call this patch hosted or released until a PR passes CI, Pages deploys
from `main`, `npm run verify:hosted` passes against
`https://asdc163.github.io/pm-signal-lab/`, and a fresh hosted browser run
confirms the same current copy and source hierarchy. The previous hosted audit
remains the last known-good public release evidence until that happens.

# No-AI-feel visual refresh — local QA audit

Date: 2026-08-15
Product: PM Signal Lab
Scope: case-file visual refresh, English-first public copy, responsive layout, and preserved local workflow
Environment: local Vite dev server at `http://127.0.0.1:4175/`
Browser route: Playwright CLI fallback; the configured Codex Chrome Extension route was not callable in this run

## Decision

Local QA is a pass for the changed visual and interaction surface. The refresh is still not a universal usability or adoption result: no real international PM session, native screen-reader run, or hosted verification for this new commit is included in this record.

## What changed

- Reframed the shell as `Case 01 / Evidence Desk` instead of a generic worksheet/dashboard.
- Replaced the right-rail `Answer / Take away / Known now` trio with a live `Review docket` showing sources, claims, reviewed count, open question, evidence rule, and carry-forward state.
- Rewrote the first read, empty state, loaded source ledger, Verify, Decide, and Ship copy around the PM job: source line → defensible claim → smallest test.
- Kept the evidence spine, source folios, warm-paper palette, local-only boundary, deterministic fixture, manual GitHub handoff, and no-provider architecture.
- Refined display typography and docket count treatment without adding gradients, glass, or model-activity decoration.
- Fixed the English singular case for a custom workspace: `1 source line`, not `1 source lines`.

## Static gate

| Check | Result | Evidence |
| --- | --- | --- |
| `git diff --check` | PASS | exit 0 |
| `npm test -- --run` | PASS | 4 files, 9 tests passed |
| `npm test` | PASS | 4 files, 9 tests passed |
| `npm run lint` | PASS | `tsc --noEmit`, exit 0 |
| `npm run build` | PASS | Vite production build completed, exit 0 |

## Browser behavior matrix

| Case | Starting state and user job | Actions performed | Observable result | Evidence |
| --- | --- | --- | --- | --- |
| QA-001 | First-time PM, empty page; identify the job and first move | Opened the local app at 1440×900 and 390×844 | The page names the PM job, shows `Source line → Claim → Smallest test`, exposes `Load sample data` and `Add your own signal`, and states the local boundary | [`case-file-first-run-1440.png`](./assets/qa/case-file-first-run-1440.png), [`case-file-mobile-390.png`](./assets/qa/case-file-mobile-390.png) |
| QA-002 | First-time PM; load the deterministic case | Selected `Load sample data` | 4 source lines and 3 candidate claims appear; the docket changes to `What is on the desk` and reports live counts | [`case-file-loaded-1440.png`](./assets/qa/case-file-loaded-1440.png) |
| QA-003 | Low-trust reviewer; verify provenance before trusting a claim | Opened `View source`, then `Hide source` | The source excerpt, folio, source identity, date, and local-session boundary are visible and reversible | Transient Playwright CLI snapshot captured during the run |
| QA-004 | Reviewer; accept and edit a claim | Started review, accepted claim 01, opened `Edit claim`, submitted blank, then entered a valid replacement and saved | Review count and accepted count update; blank input produces an invalid textbox plus alert; valid save preserves source mapping and returns the claim to review | Transient Playwright CLI snapshots captured during the run |
| QA-005 | PM; turn an accepted claim into a test | Selected `Decide`, chose the accepted claim, and selected `Draft smallest experiment` | The brief exposes hypothesis, metric, guardrail, smallest test, decision rule, owner, and a truthful readiness state | Transient Playwright CLI snapshot captured during the run |
| QA-006 | PM; carry the result forward | Selected `Export decision brief` | Ship shows Decision, Evidence summary, Known limits, Smallest experiment, Not covered, and copy/download actions; it does not claim adoption | Transient Playwright CLI snapshot captured during the run |
| QA-007 | Low-trust reviewer; record a session without leaking raw evidence | Opened `Record this session`, tried `Prepare report` without the privacy checkbox, then filled synthetic non-private notes, checked the gate, and prepared the report | The privacy gate blocks preparation until confirmed; the generated Markdown is local, editable, explicitly a field note, and says manual GitHub review/submission is required | Transient Playwright CLI snapshots captured during the run |
| QA-008 | PM with one custom signal; check English quality and local behavior | Added one synthetic signal through the visible form | The signal is marked `Just added`, the source count reads `1 source line`, and the docket record also uses the singular form | Playwright `find` result after the final copy fix |
| QA-009 | Mobile PM at 390px; complete the page without horizontal scrolling | Reloaded at 390×844, loaded the sample, and measured document width | `scrollWidth = 390`, viewport = 390, `overflow = false`; the docket is 358px wide and the sticky `Start review` action remains visible in the loaded state | [`case-file-mobile-loaded-390-viewport.png`](./assets/qa/case-file-mobile-loaded-390-viewport.png) |
| QA-010 | Tablet PM at 768px; read the reflow and control sizing | Reloaded at 768×900 and inspected the rendered page | `scrollWidth = 768`, viewport = 768, `overflow = false`, `lang = en-US`, title is correct, and no visible button measured below 44px | [`case-file-tablet-768.png`](./assets/qa/case-file-tablet-768.png) |
| QA-011 | Keyboard user; skip directly to the workbench | From a fresh reload, pressed `Tab`, then `Enter` on `Skip to main content` | The skip link receives focus; Enter changes the URL to `#main-content`, focuses the main workbench, and places it at the top of the viewport | Playwright evaluation: focused element `main-content`, `mainTop = 0` |

## Console and network observations

- Browser console: 0 errors, 0 warnings; the only info message was the standard React DevTools suggestion in the Vite development environment.
- No API provider, login, telemetry, GitHub mutation, MCP action, or external write was observed in the local flow.
- The visible feedback link opens the public GitHub issue page for manual review; the local app did not submit anything.

## AI-feel and copy review

The changed public copy was inspected against the anti-AI writing guard. The refresh removes generic summary labels, fake progress language, abstract capability claims, and decorative model cues. The remaining AI references are product-context references in the deterministic sample and README, not claims that a model is running in the preview.

## Evidence boundary

The following remain explicitly unverified or blocked:

- Real international PM task sessions, five-second comprehension, native-speaker review, retention, conversion, adoption, and GitHub star growth.
- Formal Codex Chrome Extension execution; this run used the Playwright CLI fallback because the Chrome Extension control surface was unavailable.
- Native screen-reader and assistive-technology certification.
- Production/canonical hosted behavior for this visual-refresh commit; that is a separate release gate after push.

The synthetic session feedback used in QA is test data. It must not be counted as a real-user session or used as adoption evidence.

## Release recommendation

`LOCAL PASS / HOSTED VERIFICATION PENDING`.

The visual refresh is safe to take to the hosted verification gate because static checks and the changed local user flows passed. Do not describe it as validated by users, viral, or growth-producing until the missing evidence above exists.

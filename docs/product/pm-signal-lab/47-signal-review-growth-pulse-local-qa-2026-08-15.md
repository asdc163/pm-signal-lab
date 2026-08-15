# PM Signal Lab — signal review and growth pulse local QA

**Date:** 2026-08-15
**Surface:** local Vite app at `http://127.0.0.1:5176/`
**Browser route:** Codex Chrome Extension, fresh agent-created tab, background execution without stealing foreground focus
**Scope:** second no-AI-feel product slice, deterministic sample content, claim wording, Markdown output, mobile layout, and the read-only weekly growth pulse

## Decision

`LOCAL PASS / HOSTED VERIFICATION PENDING`.

The product slice now reads as a concrete PM signal-review workflow instead of an AI-summary demo. The code gate, workflow JQ dry-run, and fresh Chrome Extension behavior route passed at the local evidence layer. This record does not claim external PM comprehension, native assistive-technology sign-off, adoption, traffic, or GitHub star growth.

## Product slice

The sample case is now `Signal review: deciding what to test next`:

- Four de-identified lines cover discovery, support, product observation, and competitive review.
- The sample does not make a chat tool, generated summary, or model activity the product subject.
- The claims name a defensible next action, source-adjacent review, and a deliberately unsupported adoption conclusion.
- The experiment wording stays deterministic and human-owned; the owner field is `Experiment owner · TBD`.
- The visual signature remains the warm-paper worksheet, source folios, evidence spine, restrained terracotta accent, and live review counts. No gradients, glass, chat framing, fake thinking, or popularity dashboard was added.

## Code and workflow evidence

| Check | Result | Fresh evidence |
| --- | --- | --- |
| `npm test -- --run` | PASS | 4 test files, 9 tests passed. |
| `npm run lint` | PASS | `tsc --noEmit`, exit 0. |
| `npm run build` | PASS | Vite production build emitted `dist/` successfully. |
| `git diff --check` | PASS | exit 0. |
| Workflow YAML parse | PASS | Ruby YAML parser accepted `.github/workflows/weekly-growth-pulse.yml`. `actionlint` was not installed locally. |
| Growth pulse API dry-run | PASS | Current authenticated GitHub read-only run produced `1` star, `1` real open issue after excluding PRs, `1` labelled feedback item, latest CI `success`, no release, current main SHA `285a2ae4a0a6b37bac82737dff46be9a5d7425e1`, and `external_sessions=not_verified`. |

The remote scheduled workflow itself is `Not verified` until this branch is published and its first `workflow_dispatch` or scheduled run is read back from GitHub Actions.

## Behavior matrix

| user archetype | starting state / job | actions performed | success signal | failure signal / recovery |
| --- | --- | --- | --- | --- |
| International PM, first visit | Empty page; understand the job quickly | Opened the app at the default desktop viewport and read the first screen | `Source line → Claim → Smallest test`, `Load sample data`, `Add your own signal`, and the local boundary are visible; the page reads as a worksheet | No product failure observed; recovery remains `Add your own signal` or reset. |
| International PM, source reviewer | Loaded sample; trace the line before trusting it | Loaded sample, expanded first `View source` | Four source rows appear; the first expanded detail includes source text, `Source 01`, identity, date, and session boundary | `Hide source` closes the detail; source remains local. |
| PM reviewer | Verify a claim without outsourcing the decision | Started review and accepted the first claim | Verify shows the concrete new claim text, two mapped sources, limitation, and `1 accepted` | Unreviewed claims remain open and visible; no automatic acceptance. |
| Keyboard user | Editing a claim; recover from invalid input | Opened second `Edit claim`; used `ControlOrMeta+A` + `Backspace`; selected `Save claim`; typed a replacement and saved | Blank save stays in the editor, `role=alert` explains the fix, `aria-invalid=true`, focus remains on the textarea; replacement returns the claim to review | `fill("")` did not change the controlled textarea in this Chrome automation route, so it was ruled out as an app repro. The real keyboard path changed the DOM value and passed. |
| PM planning a test | Accepted claim in Verify; turn it into a test | Drafted `Smallest experiment` and inspected fields | `Ready for confirmation`, hypothesis, primary metric, guardrail, smallest test, decision rule, and `Experiment owner · TBD` are visible | The brief still states it is a proposed test, not a completed result. |
| PM carrying work forward | Decision brief ready; preserve evidence and limits | Exported, copied, and downloaded Markdown | Markdown contains `Decision`, `Known limits`, `Experiment`, and `Not covered`; clipboard contained the same boundary; a fresh `pm-signal-decision-brief (2).md` download contained the new claim | `waitForEvent("download")` timed out in the extension harness, so the expected downloaded file was checked directly; no app-origin error was observed. |
| Low-trust tester | Pilot note; prevent accidental private submission | Opened pilot note, tried to prepare without the checkbox, then confirmed privacy and prepared | Output was blocked before confirmation; after confirmation it produced an editable local field note with `Not provided`, manual GitHub handoff, and no automatic submission | Warning copy is a status notice, not an alert; output region receives focus for inspection. |
| Mobile PM | 390×844; keep the first action reachable | Set viewport to 390×844, reloaded, loaded sample | `scrollY=0`, `overflowX=false`, `scrollWidth=375`, 4 source rows, and the sticky action focused `Start review` | Viewport reset is required after the temporary responsive check. |

## Visual evidence

- Desktop loaded composition was inspected from a fresh screenshot: the left workflow rail, central evidence desk, and right worksheet context keep one reading spine; the new sample title and source titles are legible without a generic AI-dashboard wall.
- Mobile empty screenshot shows the hero, current worksheet state, first-run sample line, and sticky `Load sample data` action without horizontal overflow.
- Mobile loaded measurement confirms the sticky action remains reachable and focusable after sample load.

## Browser and console boundary

- App-origin logs contained only Vite connection/debug entries and the standard React DevTools info message; no app-origin error or warning was observed.
- Chrome-extension-origin warnings (`MaxListenersExceededWarning` and `ObjectMultiplex orphaned data`) were separated from the app origin and not attributed to PM Signal Lab.
- No API provider, login, telemetry, raw-signal transfer, GitHub mutation, or automatic issue submission was observed.

## Growth operation boundary

The new workflow is intentionally read-only:

- It reads repository metadata, actual open issues after excluding PRs, feedback labels, recent CI runs, the current default-branch commit, and releases.
- It writes only a workflow summary and a 30-day artifact; it does not commit to the repository or post publicly.
- Traffic is explicitly `not_collected`; external sessions, adoption, and star quality remain `not_verified` / `not_inferred`.
- The current operating mode remains `iterate_recruit`; the next gate is five unguided non-owner sessions, not a star campaign.

## Not covered

- The new branch has not yet been published or deployed to the canonical Pages URL.
- The remote scheduled/manual GitHub Actions workflow has not yet been executed from this branch.
- Native VoiceOver, NVDA, TalkBack, and other assistive-technology announcements remain `Not verified`.
- Real international PM sessions, five-second comprehension, retention, conversion, adoption, referral quality, traffic, and GitHub star growth remain `Not verified`.

## Release gate

The local gate is safe to promote to a branch/PR. After publication, re-run the canonical HTTP, GitHub Actions, hosted Chrome Extension, English copy, mobile overflow, source-trace, decision brief, and manual-handoff checks before calling the hosted slice released.

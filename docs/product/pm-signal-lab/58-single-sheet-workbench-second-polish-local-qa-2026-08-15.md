# PM Signal Lab — Single-Sheet Workbench Local QA

Date: 2026-08-15 14:53 +08:00
Surface: `http://127.0.0.1:5177/`
Environment: fresh Codex Chrome Extension tab, default desktop viewport plus explicit 768×900 and 390×844 responsive viewports
Build under test: uncommitted single-sheet workbench polish after the 768px onboarding fix

## QA position

The local product flow is usable across the tested deterministic paths. The second visual pass now reads as a source-led workpaper: the action is explicit, the sample is marked as a local fixture, the source ledger stays before the review docket, and the desk summary sits below the workpaper instead of acting as a persistent dashboard rail.

One real responsive defect was found and fixed during this run: at 768px, the desktop sample CTA was hidden before the mobile sticky CTA became available. The fixed behavior was re-run at 768px and 390px.

This report does not prove real-user comprehension, screen-reader behavior with a native assistive technology stack, physical-device touch behavior, hosted deployment, adoption, or GitHub star growth.

## Product QA contract

- User: an international PM opening the tool without prior explanation.
- Job: move one observed product signal through source review, claim review, a smallest test, and a portable decision brief.
- Trust boundary: local deterministic fixture and user-entered content only; no model call, login, external telemetry, issue mutation, or automatic submission.
- Success: the user can identify the first action, preserve the source while reviewing a claim, recover from an invalid custom signal, export Markdown, and prepare a manually reviewed pilot note.
- Fail closed: missing evidence remains visible; the product does not present a draft claim as a fact or a prepared brief as adoption evidence.

## Behavior matrix

| Archetype / job | Starting state | Action | Expected signal | Observed evidence |
| --- | --- | --- | --- | --- |
| First-time international PM / understand where to begin | Fresh empty state, desktop | Read first viewport | Direct action, fixture boundary, and local-only boundary are visible | `Put one signal on the desk`, `Open the sample worksheet`, `Sample signal`, and `Local fixture only · no external research is attached.` were visible in the DOM and screenshot; `lang=en-US`; no horizontal overflow |
| First-time PM / understand where to begin on a phone | Fresh empty state, 390×844 | Read first viewport | Sticky action remains available without horizontal scrolling | Screenshot showed the mobile workflow, the direct h1, the source-led empty panel, and the fixed `Open the sample worksheet` action; document width 375 equals client width |
| PM / wait for fixture loading | Fresh empty state, 390×844 | Activate the sample action through the visible DOM | Loading state is honest and does not imply model activity | Fresh DOM snapshot showed `Preparing sample data`, `aria-busy=true` behavior through the loading section, and the empty worksheet remained in the snapshot while the transition was in progress |
| PM / review loaded sources | Loaded fixture | Read source ledger before review docket | Four traceable source rows appear before the decision review | 4 `.evidence-row` elements; source ledger and review docket present; no `Margin note` stale rail copy; no horizontal overflow |
| PM / inspect provenance | Loaded fixture | Open first `View source`, then `Hide source` | Original source excerpt opens and collapses without losing the row | 4 `View source` buttons; `Hide source` with `[expanded]`; after collapse, original excerpt absent and `View source` returned |
| PM / make a human review decision | Loaded fixture, Collect | Select `Start review`, accept the source-backed claim | Verify is explicit; reviewed/accepted counts update | `Check the claim against the line`, 3 draft claims, `Accept claim`, `Keep as hypothesis`, `Edit claim`, and `Mark missing evidence` were present; after accept, `1 of 3 claims reviewed` and `1 accepted` appeared |
| PM / backtrack | Verify state | Select Collect in the workflow | Return to source ledger without losing the local session | Collect returned with `01 · Collect`, source ledger present, and review panel absent |
| PM / recover from invalid input | Loaded fixture, add-signal form | Submit blank custom signal | Field-level errors preserve the form and focus the first invalid field | Errors observed: `Add a signal title...`, `Add a source...`, and `Add the signal itself...`; form stayed open; `Signal title` was active |
| PM / add a real observation | Invalid custom signal form | Fill title, source, observation, save | Form closes, signal count increases, claims rebuild, and notice explains the next review step | 5 traceable source lines, new signal visible as Source 01, form closed, and status notice read `Signal added. The draft claims were rebuilt; go to Verify to review them.` |
| PM / draft the smallest test | Verify with one accepted claim | Select `Go to Decide` | Decision fields are editable and carry limitations forward | `Name the smallest test`, editable Direction / Hypothesis / Primary metric / Guardrail / Smallest test / Decision rule / Owner fields, and source-backed readiness were present |
| PM / export and reuse the brief | Decide state | Export, copy Markdown | Ship state contains evidence, limits, experiment, and not-covered list; clipboard is usable | Ship heading `Take a brief someone can challenge`; clipboard readback was 2,428 characters with `## Decision` and `Known limits`; notice read `Markdown copied. You can paste it into a GitHub issue or PRD.` |
| PM / prepare field feedback safely | Ship state | Open pilot note, submit without privacy confirmation, then confirm and prepare | No private-data confirmation blocks preparation; prepared note is local and manually reviewed | Without confirmation, status read `Please confirm that this report contains no customer data, private content, API keys, or tokens.`; after confirmation, field note and manual-review link appeared; clipboard readback was 1,008 characters and did not contain the raw fixture quote |
| PM / reset and recover | Loaded local session | Reset this set | Return to empty state with a clear recovery message | Empty heading, sample CTA, and `Workspace reset. Load the sample data or add your own signal.` appeared |
| Tablet PM / use the onboarding path | Fresh empty state, 768×900 | Read and activate sample CTA | CTA must remain available at the tablet breakpoint | Initial run found the CTA missing; after CSS fix, exactly one visible `Open the sample worksheet` CTA was present, loading completed to 4 source rows, and document width 753 equaled client width |
| Keyboard user / move through interactive controls | Ship state, 390×844 | Press Tab repeatedly | Focus remains visible and moves through actionable controls | Focus trace covered Copy Markdown, session receipt, report link, sticky action, workflow controls, dismiss notice, and skip link; custom buttons showed the teal 3px focus outline; no unnamed buttons or unlabeled form controls were found in the smoke check |

## Responsive and accessibility smoke checks

- 1914px default browser viewport: document width 1899, client width 1899, `overflowX=false`.
- 768×900 tablet viewport: document width 753, client width 753, `overflowX=false`; desk summary used two columns after the tablet fix.
- 390×844 mobile viewport: document width 375, client width 375, `overflowX=false`; context switched to one column; the mobile action bar was `position: fixed` and visible when the feedback form was closed.
- One `h1` and one `main` landmark were present.
- All inspected buttons had an accessible name, all inspected form controls had a label or accessible name, and no images without `alt` were present.
- Console error readback after the exercised local flows: `[]`.

## Finding fixed during QA

Severity: medium
User/job: tablet PM trying the five-minute sample worksheet
Reproduction before fix:

1. Open the fresh local route at 768×900.
2. Observe that `.hero-status-actions` was hidden by the `max-width: 1024px` rule.
3. Observe that the mobile action bar was still hidden because it only appears at `max-width: 700px`.
4. The empty state still exposed `Add your own signal`, but the intended sample onboarding action was unavailable.

Expected: the sample worksheet remains available at tablet widths.
Actual before fix: no visible `Open the sample worksheet` button.
Risk: a first-time tablet user can miss the intended deterministic walkthrough and incorrectly conclude that the tool requires manual data entry.
Fix: keep `.hero-status-actions` visible through the tablet breakpoint and hide it only at the mobile breakpoint where the fixed action bar is available.
Retest: 768×900 showed one visible sample CTA; activation loaded 4 source rows with no horizontal overflow. 390×844 showed one visible sticky sample CTA and no duplicate hero CTA.

## Local gates

```text
npm test -- --run
4 test files passed
10 tests passed

npm run lint
passed (tsc --noEmit)

npm run build
passed (Vite production build; 1,585 modules transformed)

git diff --check
passed
```

## Not covered / next evidence gate

- Not covered: real international PM sessions. The public pilot still needs five unguided sessions and at least three concrete field notes.
- Not covered: native VoiceOver / NVDA / TalkBack behavior. DOM labels and keyboard smoke checks are not a substitute for assistive-technology verification.
- Not covered: physical iOS/Android touch, native share sheet, Photos save, network throttling, and interrupted browser reload on a device.
- Not covered: a forced fixture-loader exception or an actually denied clipboard permission. The invalid-form and privacy-confirmation recovery paths were executed; the unavailable branches remain `未驗證`.
- Not covered: post-change canonical hosted verification. The local build must go through the public PR / Pages deployment path before the hosted URL can be called current.
- Not covered: GitHub adoption, traffic, forks, external mentions, or stars. Those are external outcomes, not local QA results.

Release decision: local behavior is ready for the scoped PR and hosted re-verification, with the above evidence gaps carried forward explicitly.

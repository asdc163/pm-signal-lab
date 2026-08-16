# PM Signal Lab — Session note progressive-disclosure contract — 2026-08-16

## Problem frame

- **Decision:** Keep the optional session receipt and manual feedback handoff
  available, but collapse them behind a native `Session note` disclosure by
  default.
- **User/job:** An international PM should read the source, claim, and next
  test without interpreting local event telemetry. After the task, they may
  open the note to copy a privacy-safe receipt or report a session manually.
- **Current workaround:** `Recent action`, `Last action below`, receipt copy,
  and session-report links are always visible at the bottom of the worksheet.
  They are useful for pilot operations, but they are not part of the primary
  decision job.
- **Outcome metric:** In the default loaded and Ship screenshots, the session
  note is collapsed; opening it reveals the existing action receipt and manual
  feedback controls without changing the workflow or event data.
- **Evidence:** Current screenshots show the event block as a full-width
  telemetry strip below the workpaper. The source, claim, limitation, and next
  action should be the visual subject according to the current design rules.
- **Unknowns:** Whether participants expect the receipt to be visible without
  opening a disclosure remains unverified until the international pilot.

## KB Application Contract

### Relevant KB

The following Level A guidance is directly relevant to this small UI change:
The design reason / why it applies is to reduce AI-like activity chrome while
preserving the local receipt and its manual recovery path.

- `foundations/design-brain.md`: start from product context, information
  relationship, and state design before styling. This changes the surface from
  a persistent status strip to a secondary, task-complete note.
- `foundations/product-craft-anti-ai-slop-operating-system.md`: real product
  objects must outrank generic activity chrome; progressive disclosure is a
  low-risk way to preserve useful operations without making the product look
  like an AI console. Tradeoff: the receipt is one click less discoverable.
- `foundations/aesthetic-taste-system.md`: operational tools should use calm
  density, rows, and dividers rather than fake sophistication or always-open
  telemetry. This removes noise before adding decoration.
- `foundations/design-composition-layout.md`: the first and second reads are
  source record → next test; secondary controls should not interrupt that
  spine. The native disclosure gives the optional note its own grouping.
- `foundations/ai-native-ux-operating-system.md`: progressive disclosure and
  honest trace summaries are preferred to exposing internal activity by
  default. This app has no live model trace, so the local receipt must not
  impersonate one.
- `foundations/product-messaging-copy-operating-system.md`: microcopy must
  name the action and its boundary. `Session note` and `Optional local
  receipt` explain what opens and why it exists.
- `foundations/behavioral-ux-qa-evidence-gate.md`: verify normal reading,
  optional expansion, keyboard access, mobile reflow, and recovery; do not
  infer that a collapsed note proves participant comprehension.

These principles change the implementation in one place: event/receipt data
continues to be produced by the existing `events` state, but its optional
rendering becomes a native disclosure with a visible summary and a focused
open/close oracle. No new telemetry is introduced.

## Constraints / out of scope

- Keep the change English-first, local-first, and limited to the existing
  worksheet surface.
- Do not add a model, API, analytics, persistence, account, dependency, or
  new product workflow.
- Do not redesign the workbench, add a new dashboard, or change the event
  schema, receipt contents, feedback URL, or primary action ownership.
- Out of scope: hosted deployment, Chrome Extension verification, native
  screen-reader certification, participant research, adoption claims, and
  GitHub-star growth claims.

## Product craft contract

- **Product truth:** local-first source/claim/experiment worksheet; events are
  an owner-run local receipt, not analytics or model activity.
- **Subject specificity:** source rows, source numbers, limitations, claim
  review marks, and the local field note are the product objects.
- **Design read:** quiet editorial workpaper for PM evidence review; medium
  density, low motion, one source spine, one optional operational note.
- **No-AI-feel guard:** no activity feed, fake progress, model status,
  confidence badge, agent voice, or telemetry wall is visible by default.
- **Signature detail:** the ruled evidence spine and folio numbers remain the
  visual memory point; the session note stays subordinate.

## UX state contract

| State | Default | Expanded behavior | Recovery / trust |
| --- | --- | --- | --- |
| Blank worksheet | Session note is collapsed or absent below the empty sheet | Opening it shows the local-only explanation; no raw source text is included | Refresh still clears the sheet. |
| Loaded Collect | `Session note` summary is visible; event details are hidden | `Recent action`, receipt copy, and manual report link appear | The receipt remains local and privacy-safe. |
| Verify / Decide | Same optional note behavior | Claim workflow and source mapping are unchanged | Disclosure must not steal focus from the current action. |
| Ship | Optional note remains available alongside the feedback field note | Existing receipt/report controls remain usable | Manual GitHub submission remains a human decision. |
| Keyboard / reduced motion | Native `summary` is focusable and toggles with Enter/Space | Focus remains on the summary after toggle | No animation is required for comprehension. |

## Execution contract

- **Modify:** `src/App.tsx`, `src/styles.css`,
  `scripts/verify-source-sheet-truth.py`, and the static hosted-copy verifier
  only if the new literal summary needs a required-string assertion.
- **Create:** this contract and its local QA report.
- **Test:** existing unit/build/hosted-copy/session-boundary/edge/margin
  scripts plus a focused disclosure oracle.
- **Observe:** fresh 390px and 1440px screenshots, visible source spine,
  closed/open DOM state, keyboard focus, browser errors, request failures, and
  no horizontal overflow.

### Task sequence

- [ ] Task 1 — Add a native `<details>` / `<summary>` session-note wrapper in
  `DecisionContext` without changing `events`, `copySessionReceipt`, or the
  feedback URL. **Expected:** the default DOM has a closed `.context-trace`
  and the existing receipt/report controls remain inside its body.
- [ ] Task 2 — Add only the summary/body/focus styles at the end of
  `src/styles.css`.
  **Expected:** the summary reads as a quiet optional note, the body is hidden
  until opened, and the existing workpaper alignment remains intact at 390px,
  1024px, and 1440px.
- [ ] Task 3 — Extend `scripts/verify-source-sheet-truth.py` with a focused
  disclosure trace. **Expected:** the script observes closed → open → closed,
  checks the summary name and visible controls, and fails on browser errors or
  request failures.
- [ ] Task 4 — Run the repo-native tests and browser flows before updating the
  evidence manifest. **Expected:** all existing gates remain green and the new
  `session_note_collapsed` / `session_note_opened` results are explicit.
- [ ] Task 5 — Inspect fresh loaded, Ship, and mobile screenshots, then update the
  project `DESIGN.md`, README, QA report, and manifest. **Expected:** the docs
  describe progressive disclosure as a local receipt boundary, not analytics.

## Acceptance criteria

1. The default loaded `Collect` and `Ship` surfaces show a `Session note`
   summary without the event body expanded.
2. Activating the summary reveals the existing local receipt and manual report
   controls; closing it hides them again.
3. The full `Collect → Verify → Decide → Ship` flow, event logging, feedback
   preparation, and privacy boundary remain unchanged.
4. The disclosure is keyboard reachable, has a visible focus state, and does
   not introduce duplicate IDs, dangling ARIA references, or overflow.
5. No model activity, progress, confidence, agent, telemetry, or marketing
   language is added.

## UX / AI / security gate

- The default page must keep the source record, claim status, limitation, and
  next action visible before the optional session note.
- The native disclosure must expose a semantic summary, support keyboard
  activation, preserve visible focus, and avoid using colour alone to indicate
  open/closed state.
- The note must state or preserve that content stays on the page and that the
  feedback link opens a manual GitHub handoff; it must not imply analytics,
  model reasoning, remote logging, or automatic submission.
- No raw source content is added to the receipt surface, no external request is
  introduced, and no new permission, secret, persistence, or data transfer is
  created.
- If the disclosure fails, the core worksheet remains usable; rollback is the
  focused source/docs revert described below.

## Rollback and evidence boundary

Rollback is a focused App/CSS/oracle/docs revert; no migration, dependency,
permission, or external-state cleanup is needed. This slice can prove local
interaction and hierarchy. It cannot prove non-owner comprehension, native
screen-reader speech, Chrome Extension behavior, hosted release, adoption, or
GitHub-star growth.

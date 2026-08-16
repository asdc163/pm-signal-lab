# Session boundary, reset, and loading guard — local browser QA

Date: 2026-08-16
Candidate branch: `codex/less-ai-editorial-sheet`
Scope: close stale manual-entry and source-disclosure state when a local
worksheet is replaced or reset, and prevent duplicate sample-load clicks.

This is a focused local QA report for a small recovery/trust slice. It is not a
hosted release sign-off, a Chrome Extension sign-off, a native assistive-
technology sign-off, or evidence of adoption. The product job remains:
keep a source line attached while deciding what it can support, name the
smallest test, and carry a brief someone can challenge forward.

## Design decision and evidence boundary

The implementation follows the contract in
[`104-session-boundary-reset-and-loading-guard-contract-2026-08-16.md`](./104-session-boundary-reset-and-loading-guard-contract-2026-08-16.md).
The design knowledge base treats state completeness, recovery, loading,
keyboard operation, and trust as product rules. That makes this a better next
slice than adding another visual status layer: the worksheet must visibly match
the action just taken.

The change stays deliberately small:

- `loadSample` closes the manual evidence form, clears its fields and errors,
  clears the expanded source and active claim, and keeps the existing 260ms
  fixture load;
- the blank-state `Open the sample worksheet` action is disabled while the
  existing loading state is active;
- `resetDemo` clears the expanded source and active claim alongside the
  existing local worksheet state;
- no provider, model, telemetry, upload, persistence, dependency, GitHub
  mutation, merge, or deployment was introduced;
- the ruled source rows, restrained `Sheet tally`, human review gate, and
  English-first surface were not redesigned.

## Finding that triggered the fix

### UX-005 — session replacement retained stale state

- **Severity:** P1 for trust/recovery, although the fix is local and
  reversible.
- **User/job:** a PM should be able to abandon a partial source entry, open the
  sample, reset the worksheet, or refresh without seeing a previous session's
  form or source disclosure.
- **Pre-fix reproduction:** a fresh 390×844 Chrome fallback run opened the
  manual form, clicked `Open the sample worksheet`, and observed
  `form_still_visible_after_load=true`. It then expanded `View source`, used
  `Reset this set`, opened the sample again, and observed
  `expanded_source_after_reset=true`.
- **Likely user interpretation:** the new worksheet may not be clean, or an
  old source may still be selected or retained behind the new sample.
- **Additional risk:** the blank hero sample button accepted another click
  during the 260ms load window, making duplicate transitions possible.
- **Fix:** clear the relevant state at the transition boundary and disable the
  action while loading.
- **Acceptance criteria:** form and errors are gone during and after sample
  load; the loading action is disabled; reset followed by a new sample does not
  reopen the previous source disclosure; no browser console or request error is
  introduced.

## Behavior matrix

| Case | User archetype and job | Starting state / hesitation | Observable success and recovery | Result |
| --- | --- | --- | --- | --- |
| QA-401 | PM replacing a partial manual note with the fixture | Manual form open; may expect the new sample to replace the unfinished work | The form closes immediately, fields/errors are cleared, and the sample opens as a clean worksheet | PASS |
| QA-402 | PM clicking a primary action on a slow frame | Blank sheet; may click twice when the fixture takes a moment | `Open the sample worksheet` is disabled during loading and resolves once | PASS |
| QA-403 | PM resetting a source review before trying again | Loaded sample with one source disclosure expanded | Reset clears the sheet; the next sample has no `Hide source` state carried over | PASS |
| QA-404 | PM completing the core job after the boundary fix | Sample → source disclosure → Verify → accept → Decide → draft → Ship | The existing full flow completes with no browser error or request failure | PASS |
| QA-405 | PM recovering from friction and mismatch | Empty form, manual entry, Reset, refresh, and missing evidence paths | Existing recovery messages and next actions remain usable | PASS |
| QA-406 | Mobile and desktop PM | 390×844, 1024×900, and 1440×900 | No horizontal overflow; mobile action ownership remains one fixed primary action; desktop hides the mobile bar | PASS |
| QA-407 | Accessibility-sensitive user | Fresh and loaded Chrome fallback states | First Tab reaches the skip link; visible controls remain named; no duplicate IDs or dangling relationships | PASS for Chrome fallback semantics; native AT unverified |

## Focused browser oracle

The reusable oracle is [`scripts/verify-session-boundary.py`](../../scripts/verify-session-boundary.py).
It uses the existing headless Google Chrome fallback convention at a local Vite
production preview and captures three 390×844 screenshots.

Command:

```bash
python3 scripts/verify-session-boundary.py
```

Fresh output at the current candidate:

```json
{
  "sample_button_disabled_during_loading": true,
  "form_hidden_during_loading": true,
  "form_still_visible_after_load": false,
  "expanded_source_after_reset": false,
  "browser_errors": [],
  "request_failures": []
}
```

This is the same transition family that produced the pre-fix red observations;
the two stale-state assertions are now green. The oracle does not claim native
screen-reader output, real-device behavior, or participant comprehension.

## Visual evidence

- [Loading guard — 390px](./assets/qa/session-boundary-loading-guard-loading-390-2026-08-16.png)
- [Clean loaded worksheet — 390px](./assets/qa/session-boundary-loading-guard-loaded-390-2026-08-16.png)
- [Clean worksheet after reset — 390px](./assets/qa/session-boundary-loading-guard-reset-390-2026-08-16.png)
- [Existing loaded desktop reference](./assets/qa/less-ai-margin-note-evidence-state-loaded-1440-2026-08-16.png)

Visual inspection found no new AI-style status theatre, gradient, glass panel,
orb, bento wall, or animation. The loading state uses the existing literal
`Opening the sample worksheet` treatment; the disabled action communicates the
boundary without inventing a progress story. The source record remains the
visual anchor, and the loaded/reset screenshots show the same calm workpaper
hierarchy.

## Static, browser, and content-oracle evidence

- `npm test -- --run` — exit 0; 4 files / 11 tests passed.
- `npm run lint` — exit 0; TypeScript `tsc --noEmit` passed.
- `npm run build` — exit 0; Vite 7.3.6 emitted
  `dist/assets/index-L436QlYV.js` and `dist/assets/index-CoOWk135.css`.
- `git diff --check` — exit 0 before the evidence update.
- `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` — exit 0 at
  `2026-08-16T06:13:05.366Z`; HTTP 200, `lang=en-US`, current copy present,
  stale copy absent, and `canonical_https=false` as expected for localhost.
- Focused session-boundary oracle — exit 0; the JSON result above records the
  red→green state assertions, `browser_errors=[]`, and `request_failures=[]`.
- Existing normal browser trace — exit 0; blank → sample → source disclosure →
  Verify → accept → Decide → draft → Ship; 390×844, 1024×900, and 1440×900
  had no horizontal overflow, console errors, or request failures.
- Existing edge browser trace — exit 0; empty form validation → Cancel; manual
  source entry → Reset; sample refresh clears the local sheet; missing evidence
  → needs-validation brief.
- Chrome fallback semantic checks — unnamed visible controls `[]`, duplicate
  IDs `[]`, dangling relationships `[]`, and external resources `[]`.

## Canonical hosted boundary

The canonical readback was run separately after the local build:

```text
HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted
Hosted demo verification failed: Current hosted JavaScript is missing: Start with a source line
```

The Pages URL still serves the prior bundle. Local production-preview evidence
does not prove canonical hosted behavior. PR #44 remains draft and this slice
does not merge or deploy.

## Release decision

**PASS for the focused session-boundary, reset, and loading-guard slice only.**
The bug is reproduced, the minimal fix is implemented, and the same browser
oracle is green after the change. The broader product release remains on hold
until the canonical hosted bundle, preferred Chrome Extension trace, native
assistive technology, real-device behavior, and real PM sessions are
independently verified.

## Not covered

- Preferred Codex Chrome Extension foreground trace; the Mac was locked for the
  current run.
- Native VoiceOver, NVDA, TalkBack, zoom, reduced-motion, or physical-device
  output.
- Canonical GitHub Pages behavior after an approved merge/deploy.
- Five unguided international PM sessions, field notes, repeat use, issue
  replies, participant comprehension, adoption, or traffic quality.
- Live provider quality, retrieval freshness, prompt-injection resistance,
  latency, cost, analytics, or model safety evaluation; the fixture remains
  deterministic and local-only.
- Any claim that the project is viral or on track for 10,000 stars.

## Rollback

Revert the focused session-boundary commit if form focus, source disclosure,
loading feedback, or the full workflow regresses. No migration, dependency,
permission, provider, or external cleanup is required.

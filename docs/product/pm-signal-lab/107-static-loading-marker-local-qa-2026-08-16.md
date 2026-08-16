# PM Signal Lab — Static loading marker local QA — 2026-08-16

Date: 2026-08-16
Candidate branch: `codex/less-ai-editorial-sheet`
Scope: replace the generic rotating loading marker with a static worksheet
marker and pin that behavior in the local browser oracle.

This is a focused local QA report. It is not a hosted release sign-off, a
Chrome Extension sign-off, a native assistive-technology sign-off, a real-user
study, or evidence of GitHub adoption.

## Decision and evidence boundary

The loading transition opens a deterministic local fixture after a fixed 260ms
delay. It has no external model call, generation progress, queue, or
cancelable background job. The previous rotating `Activity` icon therefore
communicated more system activity than the product could prove.

The implementation is intentionally narrow:

- `src/App.tsx` now uses the existing static `ClipboardList` marker in the
  loading state.
- `src/styles.css` no longer contains the loading-only `.spin` rule or
  `@keyframes spin`.
- `scripts/verify-session-boundary.py` now asserts marker visibility, its
  class, and its computed animation name in addition to the existing stale
  form, reset, and duplicate-loading checks.
- No provider, telemetry, upload, persistence, dependency, permission,
  network action, GitHub mutation, merge, or deployment was introduced.

The product job remains: keep a source line attached while deciding what it
can support, name the smallest test, and carry a brief someone can challenge
forward.

## Behavior matrix

| Case | Starting state / user concern | Observable result | Result |
| --- | --- | --- | --- |
| QA-501 | Fresh empty sheet; open the deterministic sample | The named loading state appears with a static worksheet marker; the sample action is disabled for the transition | PASS |
| QA-502 | Manual source form open; switch to the sample | The form closes immediately and is not retained after the sample opens | PASS |
| QA-503 | Click the sample action more than once during the 260ms transition | The action is disabled; one clean sample worksheet opens | PASS |
| QA-504 | Loaded sample; expand a source; reset; open the sample again | No previous source disclosure or claim selection remains | PASS |
| QA-505 | Complete the normal PM path | Collect → Verify → Decide → Ship completes without browser or request errors | PASS |
| QA-506 | Empty-form validation, manual entry, reset, refresh, missing evidence | Existing recovery paths remain usable and keep the local boundary explicit | PASS |
| QA-507 | Mobile, tablet, and desktop | No horizontal overflow; mobile keeps one fixed primary action; desktop keeps the mobile bar hidden | PASS |
| QA-508 | Keyboard and semantic fallback checks | Named controls, duplicate IDs, dangling relationships, and external resources remain clean in the local fallback | PASS for fallback semantics; native AT remains unverified |

## Focused browser oracle

Command:

```bash
python3 scripts/verify-session-boundary.py
```

Fresh output at the current local production preview:

```json
{
  "base_url": "http://127.0.0.1:4179/",
  "sample_button_disabled_during_loading": true,
  "form_hidden_during_loading": true,
  "loading_marker_visible": true,
  "loading_marker_class": "lucide lucide-clipboard-list",
  "loading_marker_animation": "none",
  "form_still_visible_after_load": false,
  "expanded_source_after_reset": false,
  "browser_errors": [],
  "request_failures": []
}
```

The new assertion is deliberately observable: a future rotating marker or a
reintroduced `spin` class fails the oracle instead of being treated as a
visual preference.

## Normal and edge browser traces

The existing local production-preview traces were rerun after the change:

- `python3 /tmp/pm-signal-lab-margin-qa.py` — exit 0; blank → sample → source
  disclosure → Verify → accept → Decide → draft → Ship; 390×844, 1024×900,
  and 1440×900; no horizontal overflow, browser errors, or request failures.
- `python3 /tmp/pm-signal-lab-edge-qa.py` — exit 0; empty form validation →
  Cancel, manual source entry → Reset, sample refresh clears the local sheet,
  and missing evidence → needs-validation brief; no browser errors or request
  failures.

The normal trace reported:

```json
{
  "loaded_390": {
    "scrollWidth": 390,
    "clientWidth": 390,
    "heroStatusLabel": "Sheet tally",
    "currentStepVisible": false,
    "mobileBar": "flex",
    "overflow": false
  },
  "responsive": {
    "1024": {"mobileBar": "none", "overflow": false},
    "1440": {"mobileBar": "none", "overflow": false}
  },
  "semantic": {
    "unnamed": [],
    "duplicateIds": [],
    "dangling": [],
    "external": [],
    "overflow": false
  },
  "browser_errors": [],
  "request_failures": []
}
```

## Static and build gates

- Exact selector search for `className="spin"`, `@keyframes spin`, and
  `.spin {` across source and current built assets — no loading animation
  selector remains.
- `npm test -- --run` — exit 0; 4 files / 11 tests passed.
- `npm run lint` — exit 0; TypeScript `tsc --noEmit` passed.
- `npm run build` — exit 0; Vite 7.3.6 emitted
  `dist/assets/index-CiMDA9k-.js` and `dist/assets/index-DUghuE2I.css`.
- `git diff --check` — exit 0.
- `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` — exit 0 at
  `2026-08-16T06:30:26.550Z`; HTTP 200, `lang=en-US`, current copy present,
  stale copy absent, assets available, and `canonical_https=false` as expected
  for localhost.
- KB contract score — `100/100` from
  `score_kb_plan.py .../106-static-loading-marker-contract-2026-08-16.md
  --min-score 85`.

## Visual evidence

- [Loading state with static worksheet marker](./assets/qa/session-boundary-loading-guard-loading-390-2026-08-16.png)
- [Loaded worksheet after the transition](./assets/qa/session-boundary-loading-guard-loaded-390-2026-08-16.png)
- [Loaded desktop source record](./assets/qa/less-ai-margin-note-evidence-state-loaded-1440-2026-08-16.png)

Visual inspection of the fresh loading screenshot found the static blue
worksheet marker, the literal `Opening the sample worksheet` message, the
disabled sample action, and the existing local-boundary note. No new spinner,
progress story, AI status wall, gradient, glass, orb, bento panel, or motion
theatre was introduced. The loaded screenshot keeps the source record as the
visual anchor.

## Canonical hosted boundary

The canonical readback was run separately after the local build:

```text
HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted
Hosted demo verification failed: Current hosted JavaScript is missing: Start with a source line
```

The Pages URL still serves the prior bundle. Local production-preview evidence
does not prove canonical hosted behavior. PR #44 remains draft; this slice does
not merge or deploy.

## Release decision

**PASS for the focused static loading-marker slice in the local production
preview only.** The marker is visibly static, the exact browser oracle is
green, and the existing normal, edge, responsive, semantic, test, lint, build,
and local hosted-copy gates remain green.

The broader release remains on hold until the current candidate is merged and
deployed with explicit approval, then verified at the canonical HTTPS URL with
the preferred browser route and a fresh hosted trace.

## Not covered

- Canonical GitHub Pages behavior after an approved merge/deploy.
- Preferred Codex Chrome Extension foreground control.
- Native VoiceOver, NVDA, TalkBack, zoom, reduced-motion, or physical-device
  output.
- Real PM comprehension, five non-owner sessions, field notes, repeat use,
  retention, adoption, traffic quality, or issue activity.
- Live provider quality, retrieval freshness, prompt-injection resistance,
  latency, cost, analytics, or model safety evaluation; the fixture remains
  deterministic and local-only.
- Any claim that the project is viral or on track for 10,000 GitHub stars.

## Rollback

Revert the focused static-marker commit if the loading state loses its named
heading, disabled action, focus behavior, or clean session transition. No
migration, dependency, permission, provider, or external cleanup is required.

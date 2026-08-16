# PM Signal Lab — operational worksheet local QA — 2026-08-16

## Release decision

**PASS for the current local candidate; HOLD for hosted release and public
pilot.**

The operational-worksheet slice was personally operated on the local
production preview at both required viewports. The loaded case now reads as a
working PM surface: `Current work` → case → `Source lines` → `Next step`. The
candidate does not add a provider, persistence, telemetry, login, upload, or
automatic GitHub action.

This report does not claim that the canonical GitHub Pages URL serves this
candidate, that a native screen reader announces it correctly, or that a
non-owner user adopted it.

## Scope and environment

- Repository: `asdc163/pm-signal-lab`, branch `codex/less-ai-editorial-sheet`.
- Local surface: `http://127.0.0.1:4179/`, Vite production preview.
- Browser: isolated headless Chrome CDP fallback on port `9223`.
- Viewports: `1280×900` and `390×844`; device scale factor `1`.
- Fixture: deterministic fictional support-draft worksheet; no external model
  provider or network-backed source.
- Preferred Codex Chrome Extension route: unavailable in this session; no
  Chrome Extension claim is made.
- Native VoiceOver/NVDA/TalkBack speech: not executed.

## Product change verified

- Loaded hero labels now use `Current work` and `Review state`.
- The context rail now uses `Work note`, `Working set`, `Record`, and `Next
  step`.
- The source-to-review prompt now uses `Next step` rather than a decorative
  `Next mark` label.
- Loaded hero typography is smaller, sans-led, and more compact; the first
  source row enters earlier without hiding the local handling boundary.
- Collapsed source and claim disclosure buttons no longer expose dangling
  `aria-controls`; expanded buttons point to their live detail region.
- No state transition, event name, data model, workflow gate, export path, or
  privacy rule was changed.

## Behavior matrix

| User/job | Action | Observable oracle | Result |
| --- | --- | --- | --- |
| First-time PM finds a safe start | Open a fresh page | `Start with a source line`, `Open the sample worksheet`, and refresh-clears boundary are visible | PASS at desktop/mobile |
| PM reads the loaded case | Open the sample worksheet | `Support draft review`, `Current work`, `Review state`, source rows, and `Next step` are visible; old framing labels are absent | PASS at desktop/mobile |
| PM checks source provenance | Expand `View source` | `aria-expanded="true"`, a real `aria-controls` target, original excerpt, date, and source identity are visible | PASS |
| PM checks claim provenance | Go to Verify and expand the first claim | Collapsed claim has no `aria-controls`; expanded claim points to a live detail region | PASS |
| PM enters the task by keyboard | Press the first Tab from a fresh page | Active element is the named `Skip to main content` link with browser focus styling | PASS at desktop/mobile |
| PM cannot skip human review | Try `Decide` before reviewing a claim | The current step stays `Verify` and the review-gate explanation is shown | PASS |
| PM moves evidence into a test | Accept a claim, draft the smallest experiment, export | Experiment editor, decision brief, metric/guardrail/test/rule, and Ship state appear | PASS |
| PM is protected at feedback handoff | Open pilot note and prepare before privacy confirmation | No field note is generated; the exact notice says: `Please confirm that this report contains no customer data, private content, API keys, or tokens.` | PASS |
| PM can inspect a safe field note | Confirm privacy and prepare | `This is a field note, not a validation result.` appears with editable Markdown output | PASS |
| PM recovers when clipboard is blocked | Force clipboard rejection and select `Copy field note` | Clipboard warning appears while the field note remains available in the text area | PASS |
| PM recovers a local session | Refresh after the flow | The blank state returns; sample state and feedback output are cleared | PASS |

## Geometry and semantic evidence

| Check | `1280×900` | `390×844` |
| --- | ---: | ---: |
| First source title top | `684.75px` | `713.4375px` |
| Fixed mobile action top | not rendered | `798px` |
| Document scroll width | `1265px` within `1280px` viewport | `390px` within `390px` viewport |
| Unnamed interactive controls | `0` | `0` |
| Duplicate IDs | `0` | `0` |
| Dangling `aria-controls` after load | `0` | `0` |
| External resources observed | `0` | `0` |
| Runtime error/unhandled rejection harness | `0` | `0` |

The mobile source title remains above the fixed action bar. The loaded
screenshots are [desktop](assets/qa/operational-worksheet-local-1280-2026-08-16.png)
and [mobile](assets/qa/operational-worksheet-local-390-2026-08-16.png).

## Static and preview gates

| Command | Result | Evidence |
| --- | --- | --- |
| `npm test -- --run` | PASS | 4 files, 11 tests passed |
| `npm run lint` | PASS | TypeScript no-emit exited 0 |
| `npm run build` | PASS | Vite emitted `dist/assets/index-BXVFTe8S.js` and `dist/assets/index-BFQDMqwh.css` |
| `git diff --check` | PASS | no whitespace errors |
| `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` | PASS within local scope | HTTP 200, `lang=en-US`, both hashed assets 200, new copy present, stale copy absent, `canonical_https:false` intentionally local |

The verifier's required/forbidden copy contract was updated in
`scripts/verify-hosted-demo.mjs` so the next candidate is checked for the
current labels rather than the retired presentation labels.

## What remains unverified or held

- Canonical `https://asdc163.github.io/pm-signal-lab/` behavior and served asset
  identity for this commit: **HOLD**; the current Pages URL still serves the
  prior bundle until the explicit merge/deploy gate is approved.
- Preferred Codex Chrome Extension behavior: **HOLD / unavailable**.
- Native screen-reader speech, zoom, high contrast, reduced motion, touch, and
  physical-device behavior: **未驗證**.
- Five unguided international PM sessions: **未執行**. The pilot issue is a
  recruitment queue, not adoption evidence.
- GitHub traffic, qualified stars, retention, referrals, PMF, virality, and
  progress toward 10,000 stars: **未驗證**.
- The 1,042-repository study remains a reference corpus with 100 README
  deep-extractions and 20 close qualitative comparators; it is not a claim of
  equal-depth manual research, quality, adoption, or PMF for every repository.

## Release boundary and rollback

The candidate can be committed and pushed to the existing draft PR after this
report is committed. Merge, Pages deploy, public recruitment, comments, and
distribution remain held for the explicit release approval required for PR
#44.

Rollback is one implementation commit: revert the `App.tsx` copy/ARIA changes,
the final operational worksheet CSS block, and the hosted verifier copy
contract. No migration, dependency, provider, permission, telemetry, or
external-content cleanup is required.

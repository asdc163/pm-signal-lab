# First-run source-truth composition local QA

Date: 2026-08-16 (Asia/Taipei)

Candidate: `codex/less-ai-editorial-sheet` · local candidate for PR #44

Contract: [`116-first-run-source-truth-composition-contract-2026-08-16.md`](./116-first-run-source-truth-composition-contract-2026-08-16.md)

## Result

PASS at the local code, browser-fallback, responsive, and visual-inspection
layers for the focused first-run slice.

The blank worksheet now opens with one concrete, labelled fixture source proof
in the hero secondary column:

```text
Sample note
Interview: the draft looks finished before I can trust it
“The support draft gives me a polished reply, but I still have to check …”
Local fixture only · Demo interview · PM-07
```

The lower blank panel keeps the human entry path and `Add your own signal`, but
the duplicate `sample-quote` is gone. The loaded worksheet and current-action
ownership were kept unchanged.

This proves visible first-run product truth and local interaction behavior. It
does not prove five-second comprehension, participant preference, adoption,
virality, or GitHub star growth.

## Product and design decision

The previous blank hero led with `Sheet tally` and `No source line yet`, while
the concrete sample line appeared lower in the page. That made the first read
feel like an empty SaaS/AI shell before the visitor could see what the product
actually handles.

The focused change applies the KB design rule of product truth before
decoration: move the existing deterministic source title, excerpt, source
identity, and local-only boundary into the hero, then delete the repeated lower
quote. No provider, data flow, persistence, analytics, animation, dependency,
permission, or external request was added.

## Environment and evidence boundary

- Local Vite production preview: `http://127.0.0.1:4179/`
- Language: `en-US`; visible product copy is English-first.
- Fixture: deterministic fictional support-draft worksheet.
- Browser: headless Google Chrome through the Playwright fallback.
- First-run viewports: `390×844` and `1440×1000`.
- Primary workflow viewports: `390×844` and `1440×1000`.
- Clipboard permissions were used only for the existing Markdown-copy oracle.
- No private customer data, account, API key, provider, upload, persistence, or
  external submission was used.

The fallback browser trace is not native VoiceOver/NVDA/TalkBack evidence and
does not replace the preferred Chrome Extension route. Those layers remain
separate.

## First-run browser oracle

`npm run verify:keyboard` passed at both target widths:

| Check | 390×844 | 1440×1000 |
| --- | ---: | ---: |
| `Sample note` visible | PASS | PASS |
| Source title is the deterministic fixture title | PASS | PASS |
| Source excerpt contains the literal source line | PASS | PASS |
| `Local fixture only · Demo interview · PM-07` visible | PASS | PASS |
| `Add your own signal` remains discoverable | PASS | PASS |
| Lower `.sample-quote` count | `0` | `0` |
| Horizontal overflow | `false` | `false` |
| Sample CTA keyboard activation | PASS | PASS |
| Loaded workflow through Markdown copy | PASS | PASS |

The same run also recorded:

- `browser_errors=[]`
- `request_failures=[]`
- `skip_enter_focus_target=main-content`
- `title_invalid_focused=true`
- `form_closed_after_cancel=true`
- `claim_expanded=true`
- `claim_reviewed=true`
- `experiment_ready=true`
- `ship_action_focus=true`
- `markdown_notice_visible=true`

## Visual inspection

Fresh screenshots were captured and inspected:

- [First-run source proof at 390px](./assets/qa/first-run-source-truth-390-2026-08-16.png)
- [First-run source proof at 1440px](./assets/qa/first-run-source-truth-1440-2026-08-16.png)
- [Keyboard workflow at 390px](./assets/qa/keyboard-flow-390-2026-08-16.png)
- [Keyboard workflow at 1440px](./assets/qa/keyboard-flow-1440-2026-08-16.png)

Observed:

- The mobile hero shows the sample title, bounded excerpt, source identity, and
  local-only boundary before the blank entry panel.
- The desktop hero uses the existing ruled workpaper composition; the sample
  proof is a secondary source object, not a new card or decorative panel.
- The fixed mobile action remains the sole current action for the loaded flow.
- The blank panel still makes the own-signal path visible without repeating the
  fixture quote.
- No gradient, glass surface, assistant badge, model status, confidence meter,
  fake progress, activity feed, or new animation was introduced.
- The expected keyboard focus ring in the workflow capture is test state, not
  product copy or loading feedback.

## Command evidence

```text
KB plan score
  score_kb_plan.py .../116-first-run-source-truth-composition-contract-2026-08-16.md --min-score 85
  KB plan score: 100/100

npm test -- --run
  4 files passed · 11 tests passed

npm run lint
  tsc --noEmit passed

npm run build
  Vite 7.3.6 · index-CsCFHRX0.js · index-Rf7n4kzS.css

HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted
  HTTP 200 · en-US · current copy present · stale copy absent · canonical_https=false

npm run verify:keyboard
  first-run source proof and pointer-free workflow passed at 390×844 and 1440×1000
  browser_errors=[] · request_failures=[]

npm run verify:source-truth
  manual/sample boundary, one current action, and Session note disclosure passed

python3 scripts/verify-session-boundary.py
  loading/reset boundary passed; browser errors and request failures are empty

python3 /tmp/pm-signal-lab-margin-qa.py
  blank → sample → source disclosure → Verify → accept → Decide → draft → Ship passed
  390/1024/1440; overflow=false; errors/failures=[]

python3 /tmp/pm-signal-lab-edge-qa.py
  empty validation, cancel, manual reset, refresh clear, and missing evidence passed

git diff --check
  pass
```

## Evidence matrix

| Surface | Result | Evidence boundary |
| --- | --- | --- |
| First-run source title/excerpt/source identity | PASS | Fresh Chrome fallback at 390px and 1440px |
| Local fixture boundary | PASS | `Local fixture only` remains adjacent to source identity |
| Duplicate fixture quote removal | PASS | `.empty-panel .sample-quote` count is `0` at both widths |
| Own-signal path | PASS | `Add your own signal` remains visible and keyboard-reachable |
| Responsive geometry | PASS for emulated widths | No horizontal overflow at first-run target widths; physical device remains separate |
| Loaded Collect → Verify → Decide → Ship | PASS | Existing pointer-free keyboard workflow still passes |
| Empty/loading/error/recovery states | PASS | Existing source, session-boundary, and edge oracles pass |
| Native screen reader | NOT EXECUTED | No native AT harness used |
| Chrome Extension | BLOCKED | Preferred control surface unavailable in this runtime |
| Canonical Pages | BLOCKED | Hosted URL still serves an older bundle; no merge/deploy performed |
| Non-owner PM comprehension | NOT EXECUTED | No participant sessions in this run |
| Adoption / GitHub stars | NOT EXECUTED | Local QA is not growth evidence |

## Release boundary and next gate

The local candidate is well-checked for this focused slice, but it is not a
hosted release. A fresh canonical readback still reports:

```text
Hosted demo verification failed: Current hosted JavaScript is missing: Start with a source line
```

PR #44 remains draft. Hosted release requires explicit approval for the exact
merge/deploy action, then a fresh HTTPS browser/readback check. Chrome
Extension behavior, native screen-reader output, physical-device behavior,
non-owner international PM sessions, live AI quality, adoption, and GitHub-star
growth remain unverified.

This report does not claim the product is bug-free, officially released,
adopted, viral, or on a proven path to 10,000 GitHub stars.

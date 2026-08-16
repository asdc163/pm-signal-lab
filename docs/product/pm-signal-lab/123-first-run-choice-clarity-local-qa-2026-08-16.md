# First-run choice clarity local QA

Date: 2026-08-16
Candidate: `d82618bd074ff62feace41fa386bcbcf2720283d` on
`codex/less-ai-editorial-sheet`
PR: [#44](https://github.com/asdc163/pm-signal-lab/pull/44)
Status: local evidence passed; merge and public deployment not approved

## Result

The first-run choice-clarity slice passed the local product, browser, keyboard,
responsive, recovery, semantic, and visual gates.

The first-run hero now exposes two literal choices in the same reading path:

- `Open the sample worksheet` remains the primary sample path. It is the only
  primary button in the first-run hero; on mobile the fixed bottom bar remains
  the only visible current action.
- `Add your own signal` is a restrained secondary text action that uses the
  existing local evidence form. It is visible in the hero at `390×844` and
  `1440×1000`, keyboard-reachable, and not covered by the mobile action bar.

The change added no data model, provider, API, telemetry, persistence, upload,
permission, dependency, or GitHub mutation. The local fixture remains labelled
`Local fixture only`, and the lower blank-sheet explanation remains available
as supporting context.

## Product and visual evidence

Fresh default-state screenshots were captured in a new browser context with no
focused control before capture:

- [390px first-run](./assets/qa/first-run-source-truth-390-2026-08-16.png)
- [1440px first-run](./assets/qa/first-run-source-truth-1440-2026-08-16.png)
- [1024px loaded responsive state](./assets/qa/less-ai-margin-note-evidence-state-loaded-1024-2026-08-16.png)

Observed:

- At 390px, the sample note, source title, bounded excerpt, source identity,
  and local-only boundary arrive before the own-signal action. The fixed
  sample action remains at the bottom; its top edge is below the secondary
  control, so the first-run choice is not occluded.
- At 1440px, the right-side sample note uses the existing workpaper margin;
  the red sample button and blue underlined own-signal text action have clear
  hierarchy without a new card or status rail.
- At 1024px, where the fixed mobile action bar is absent, the sample primary
  remains visible in the hero. This prevented a real tablet regression found by
  the responsive QA oracle.
- The surface still reads as a source worksheet: warm neutral paper, serif
  case heading, ruled lines, trust-blue provenance, and red only for the next
  human action. No assistant badge, model status, confidence meter, gradient,
  glass surface, fake progress, or activity feed was added.

## Command evidence

All commands below were run against a fresh Vite production preview at
`http://127.0.0.1:4179/`, with English-first `en-US` browser contexts.

```text
KB contract
python3 /Users/tommy/.codex/skills/kb-task-compiler/scripts/score_kb_plan.py docs/product/pm-signal-lab/122-first-run-choice-clarity-contract-2026-08-16.md --min-score 100
  KB plan score: 100/100

npm test -- --run
  4 files passed · 11 tests passed

npm run lint
  tsc --noEmit passed

npm run build
  Vite 7.3.6 · index-BE5ncM4S.js · index-BQbprnIL.css

HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted
  HTTP 200 · en-US · current copy present · stale copy absent
  required copy includes Add your own signal
  assets HTTP 200 · canonical_https=false because this is local HTTP

npm run verify:keyboard
  first-run own-signal hero geometry and pointer-free workflow passed at
  390×844 and 1440×1000
  mobile: own_signal_in_hero=true, own_signal_not_covered=true,
  hero_primary_visible=false, visible_current_actions=1
  desktop: own_signal_in_hero=true, own_signal_not_covered=true,
  hero_primary_visible=true, visible_current_actions=0
  browser_errors=[] · request_failures=[]

npm run verify:source-truth
  manual 390px and sample 1440px source boundaries passed
  visible_current_actions=1 after load · hero_action_absent=true after load
  Source record / Session note / custom-vs-sample copy boundaries passed
  browser_errors=[] · request_failures=[]

python3 scripts/verify-session-boundary.py
  loading disabled the sample action; form hidden during load; static marker
  visible; form cleared after load; source disclosure reset
  browser_errors=[] · request_failures=[]

python3 /tmp/pm-signal-lab-edge-qa.py
  empty form validation → cancel; manual entry → reset; refresh clears sample;
  missing evidence stays a needs-validation brief
  browser_errors=[] · request_failures=[]

python3 /tmp/pm-signal-lab-margin-qa.py
  blank → sample → source disclosure → Verify → accept → Decide → draft → Ship
  passed at 390px, 1024px, and 1440px; overflow=false; semantic unnamed=[];
  duplicateIds=[]; dangling=[]; external=[]; browser_errors=[];
  request_failures=[]
```

The local browser run also inspected the fresh first-run screenshots directly.
The first-run screenshot in the keyboard artifact can contain a focus ring from
the preceding keyboard setup; the default-state visual inspection above was
captured independently with `document.activeElement=BODY`.

## Evidence matrix

| Surface | Result | Evidence boundary |
| --- | --- | --- |
| KB-backed contract | PASS | `122-first-run-choice-clarity-contract-2026-08-16.md`, score 100/100 |
| Sample primary / own-signal secondary hierarchy | PASS | Fresh 390px and 1440px screenshots plus DOM/runtime trace |
| Own-signal first-run location | PASS | `.hero-status-own-signal` is inside `.hero-block` at both target widths |
| Mobile occlusion | PASS | Own-signal bottom is above `.mobile-action-bar.is-empty` at 390px |
| Tablet primary action | PASS | Fresh 1024px responsive oracle; sample remains visible with no fixed bar |
| Keyboard activation and recovery | PASS | `npm run verify:keyboard`, including blank validation, focus, cancel, and full workflow |
| Source truth and local boundary | PASS | `npm run verify:source-truth`; `Local fixture only` and manual/sample copy separation |
| Loading / reset / refresh | PASS | Session-boundary and edge-state browser traces |
| Responsive geometry | PASS for emulated widths | 390×844, 1024×900, 1440×900/1000; no horizontal overflow |
| Browser console / requests | PASS | `browser_errors=[]`, `request_failures=[]`, and no external resources in margin QA |
| Native screen reader | NOT EXECUTED | No VoiceOver/NVDA/TalkBack harness was used; Playwright keyboard evidence is not AT speech evidence |
| Chrome Extension route | BLOCKED | No callable Chrome Extension control surface is available in this runtime; fallback Chrome is reported separately |
| Canonical Pages | BLOCKED | Fresh canonical readback still fails because Pages serves the older `main` bundle; no merge/deploy performed |
| Non-owner PM comprehension | NOT EXECUTED | No participant sessions were collected in this run |
| Adoption / GitHub stars | NOT EXECUTED | Local QA is not traffic, usage, adoption, or star evidence |

## Canonical release boundary

The fresh canonical check was executed separately:

```text
HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted
  Hosted demo verification failed: Current hosted JavaScript is missing:
  Start with a source line
```

This is expected while PR #44 remains Draft and `main` has not been changed.
The current local candidate must not be described as the canonical hosted
release. Merge and deployment are external, irreversible-enough actions that
remain approval-gated.

## What remains unverified

- The preferred Codex Chrome Extension QA route cannot be executed because no
  callable Extension control surface is exposed in this runtime. I did not
  relabel the Playwright fallback as Extension evidence.
- Native VoiceOver/NVDA/TalkBack output, physical-device behavior, zoom, and
  non-owner assistive-technology task completion were not executed.
- The first-run choice has not yet been observed in five unguided international
  PM sessions. Local visual inspection proves placement and behavior, not
  comprehension or preference.
- No adoption, retention, referral, traffic, fork, issue, or GitHub star claim
  is made. The 10,000-star objective remains a growth goal, not a local QA
  result.

## Next gate

Keep PR #44 Draft and the pilot distribution on hold until Tommy explicitly
approves merge/deploy. After canonical release evidence exists, the next
product gate is five unguided PM sessions plus separate Chrome Extension and
native AT evidence. The next product decision should come from those sessions,
not from adding another AI-labelled feature.

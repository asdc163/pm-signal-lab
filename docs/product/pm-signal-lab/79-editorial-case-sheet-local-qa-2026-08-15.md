# Product QA Report — PM Signal Lab Editorial Case Sheet

Date: 2026-08-15
Surface: local Vite production preview at `http://127.0.0.1:4179/`
Locale: English-first `en-US`
Branch: `codex/less-ai-editorial-sheet`
Base under test: `origin/main` at `040c7a4`
Change under test: [editorial case-sheet visual reframe contract](./78-editorial-case-sheet-visual-reframe-contract-2026-08-15.md)
Release target: `https://asdc163.github.io/pm-signal-lab/`

> Current-candidate truth boundary — 2026-08-16: the historical sections
> below contain earlier reframe and polish observations. The current local
> candidate is covered by the `Current-candidate mobile source-first addendum`
> at the end of this report. That addendum uses a headless Chrome CDP
> fallback because the preferred Chrome Extension route was unavailable; it
> must not be read as Chrome Extension, hosted, native AT, real-device, or
> participant evidence.

## QA result

PASS for the executed local scope. The public preview now reads as an
editorial case sheet rather than a generic AI dashboard: the desktop workflow
is a thin horizontal paper index, the loaded first read is `Support draft
review`, and the visible subject line is `Case subject · support draft ·
fictional worksheet`. The old AI-shell copy is absent from the current bundle.

The source → claim → smallest-test → Markdown path was exercised from a fresh
blank sheet. Source expansion, claim review, experiment editing, export,
Markdown copy, Markdown download, privacy-gated field-note preparation, form
validation, refresh reset, keyboard skip-link behavior, semantic DOM checks,
mobile reflow, and tablet overflow checks passed in the fallback browser
runner. The local production preview also passed the stale-copy/static asset
verifier.

The same local production preview was then exercised through the Codex Chrome
Extension in an existing Chrome agent tab. The core path, privacy gate, skip
link, mobile fixed action, and Chrome accessibility tree were directly
observed. Before the icon-semantics fix, the tree exposed 18 unnamed image
nodes from decorative Lucide SVGs. After adding `aria-hidden="true"` to those
decorative icons, a fresh tree reported 0 unnamed images, 0 unnamed buttons,
and 0 unnamed links. This is an accessibility-tree result, not native
VoiceOver, NVDA, TalkBack, or a real-device result.

One real interaction defect was found and fixed during this QA pass: loading
the sample previously focused the desktop `Start review` action in the lower
context band and scrolled the page to approximately `scrollY=1203`, hiding the
case sheet that had just opened. The minimal fix now focuses
`main#main-content` with `preventScroll: true` when the sample becomes ready.
Fresh evidence is `scrollY=0` and `activeId=main-content` after loading on
desktop and mobile.

This is owner-run local engineering and behavior evidence. It does not prove
non-owner comprehension, international preference, adoption, retention,
traffic quality, live-model quality, or GitHub-star growth. It is not a
canonical hosted release audit because the change is not merged or deployed.

## Evidence boundary and route

- Intended product-QA route: Codex Chrome Extension controlling the existing
  Chrome session.
- Chrome Extension route: executed against `http://127.0.0.1:4179/` in the
  existing Chrome agent tab. It supplied direct visible interaction, focus,
  mobile viewport, and Chrome accessibility-tree evidence without a claim of
  native assistive-technology output.
- Fallback route: headed Playwright CLI plus a fresh headless Playwright
  browser runner against the same local production preview. The headed session
  was used for visual inspection; the headless runner supplied repeatable DOM,
  focus, viewport, request, console, form, download, and state assertions.
- Together these routes prove the local page served, rendered, accepted the
  checked interactions, and exposed the checked semantics. They do not prove
  VoiceOver/NVDA/TalkBack output, browser zoom, physical-device behavior, or
  non-owner comprehension.
- Fixture mode: deterministic fictional source data. No live model, model
  provider, login, telemetry, GitHub mutation, or raw-signal upload is
  connected.

## QA scope

### In scope

- English-first first-run and loaded copy hierarchy.
- Editorial case-sheet desktop composition at `1280×900`.
- Mobile first-run and loaded composition at `390×844`.
- Tablet overflow guard at `768×1024`.
- Sample loading focus and scroll behavior.
- Source expansion/collapse and provenance copy.
- Human claim review, accepted state, and source mapping.
- Smallest experiment brief fields and decision rule.
- Markdown preview, copy, download, and text fallback.
- Privacy-blocked and privacy-confirmed local field-note paths.
- Add-source validation, valid save, and refresh reset.
- Keyboard skip link, accessible names, landmarks, heading count, and
  `aria-current` workflow state.
- Chrome accessibility tree for unnamed decorative controls and images.
- Console, failed-request, stale-copy, asset, typecheck, test, and build
  checks.

### Out of scope / not yet proven

- Canonical GitHub Pages behavior for this branch; merge and deploy are still
  pending.
- Native screen-reader output, VoiceOver rotor, NVDA, TalkBack, zoom, and
  reduced-motion execution.
- Physical iOS/Android touch, share sheet, or file-save behavior.
- Non-owner international PM sessions and comprehension paraphrases.
- Live model output quality, retrieval, prompt-injection resistance, latency,
  cost, provider failure, or safety evaluation.
- GitHub traffic, adoption, referrals, retention, or star movement.

## Product QA behavior matrix

| Archetype / job | Starting state | Expected signal | Failure signal | Recovery | Evidence |
|---|---|---|---|---|---|
| International PM / understand the work object | Fresh desktop, then sample | `Start with a source line` first; loaded state says `Support draft review` | Generic assistant headline, AI badge, or ambiguous dashboard state | Use the paper index and source ledger | PASS in owner-run DOM and screenshots; non-owner comprehension `未驗證` |
| PM / open a sample without losing the case | Fresh blank sheet | Sample loads and focus goes to `main#main-content` without leaving the case header | Page jumps to lower `Start review` action; loaded title is off-screen | Refresh and reopen; regression fix now prevents the jump | PASS: fresh runner observed `scrollY=0`, `activeId=main-content` |
| Evidence reviewer / inspect provenance | Loaded sample | `View source` reveals `Source excerpt`, original line, source identity, date, and `Hide source` | Source collapses into an untraceable summary | Toggle the same source row again | PASS in browser trace and DOM oracle |
| PM / review a claim | Loaded sample, Collect | Verify exposes `Check the claim against the line`, `Source mapping`, and human controls | Claim is auto-accepted or source mapping disappears | Return to Collect or keep claim open | PASS; first claim accepted and count updated |
| PM / define the smallest test | One claim accepted, Decide | `Smallest experiment brief` exposes metric, guardrail, smallest test, decision rule, and owner | Brief reads as a completed result or hides the stop rule | Edit the fields before export | PASS; `Experiment owner · TBD` remains explicit |
| PM / carry work forward | Ship | Preview, `Not covered`, copy, download, and text fallback remain available | Product implies it sent an issue or changed GitHub | Use text fallback and inspect manually | PASS; copy success and `pm-signal-decision-brief.md` download |
| Privacy-conscious tester / prepare feedback | Ship, pilot note open | Unchecked preparation blocks; checked synthetic report yields field note copy | Privacy gate bypasses or outbound submission occurs | Check the boundary, cancel, inspect, then decide manually | PASS: blocked/allowed branches; 0 outbound requests |
| PM / add a real observation | Blank, add-source form | Blank save keeps the form open and exposes three field errors; valid fields save a source line | Text disappears or validation gives no recovery | Correct fields or cancel | PASS: 3 alerts, then one saved local line |
| Keyboard user / reach first action | Fresh page | First Tab reaches skip link; Enter focuses `main#main-content` and updates hash | Focus begins in an invisible/unlabeled control | Use the visible skip link and normal tab order | PASS in fallback browser; native AT `未驗證` |
| Phone user / complete first action | Fresh and loaded `390×844` | Mobile stepper and fixed action remain reachable; no horizontal overflow | CTA clipped, desktop rail remains, or page width exceeds viewport | Scroll the single column and use fixed action | PASS for `390×844`; real device `未驗證` |

## Visual review

The fresh screenshots were inspected after the code runner captured them. The
composition has a quiet paper surface, strong serif case title, ruled index,
red action marks, blue provenance marks, and no gradients, glow, chat bubbles,
typing indicator, confidence meter, or AI-agent status theatre.

The second polish also removes repeated `Case sheet` chrome: the topbar now
uses `Field folio`, the loaded hero uses `Four source lines. One decision to
test next.`, and the source surface is labelled `Source ledger`.

| State | Evidence |
|---|---|
| Blank desktop | [editorial case sheet — blank `1280`](./assets/qa/editorial-case-sheet-local-blank-1280-2026-08-15.png) |
| Loaded desktop | [editorial case sheet — loaded `1280`](./assets/qa/editorial-case-sheet-local-loaded-1280-2026-08-15.png) |
| Blank mobile | [editorial case sheet — blank `390`](./assets/qa/editorial-case-sheet-local-blank-390-2026-08-15.png) |
| Loaded mobile | [editorial case sheet — loaded `390`](./assets/qa/editorial-case-sheet-local-loaded-390-2026-08-15.png) |

The screenshots support a design-quality observation, not a market claim: the
PM work object is visually legible before the AI subject. `support draft` is
still explicit in the case metadata and fixture boundary, so the portfolio
does not hide the AI-PM connection; it simply keeps that context from becoming
generic visual chrome.

## Executed behavior trace

The fresh local browser trace used a new page/context, English locale, and
clipboard permission only for the local copy assertion. It ran these steps:

1. Open the blank preview at desktop width; inspect first-read copy, layout,
   desktop paper index, and absence of stale AI-shell strings.
2. Tab once and press Enter on `Skip to main content`; assert focus moves to
   `main#main-content`.
3. Open the add-source form; submit blank; assert the warning and three field
   alerts remain; fill title, exact source, and source line; save and assert
   the local source line remains visible.
4. Reload; assert `No source line yet`; open the sample; assert four source
   lines, `scrollY=0`, and `main#main-content` focus.
5. Expand and collapse the first source; assert `Source excerpt` and
   `Hide source`.
6. Start review; assert `Check the claim against the line` and `Source
   mapping`; accept the first claim; assert `1 of 3 claims reviewed`.
7. Go to Decide; assert `Smallest experiment brief` and the `Decision rule`
   field; export; copy; assert the `Markdown copied` notice.
8. Trigger `Download .md`; assert the browser download filename
   `pm-signal-decision-brief.md`.
9. Open the pilot note; prepare without confirmation; assert the privacy
   warning and no feedback output; confirm the checkbox; prepare again; assert
   `This is a field note, not a validation result.` and zero outbound requests.
10. Resize to `390×844`; assert mobile stepper, fixed action, no horizontal
    overflow, and successful mobile sample loading. Resize to `768×1024` and
    assert no horizontal overflow.
11. Repeat the core path in the Codex Chrome Extension tab: open the sample,
    start review, accept one claim, draft the smallest experiment, export the
    brief, exercise the blocked and confirmed pilot-note paths, and inspect
    the final focus/viewport state.
12. Enable the Chrome accessibility domain and inspect a fresh full tree.
    Before the icon fix there were 18 unnamed image nodes; after the fix the
    tree reported 0 unnamed images, 0 unnamed buttons, and 0 unnamed links.

This is an engineering acceptance trace, not a usability score, participant
study, adoption signal, or star-growth result.

## Static and runtime evidence

| Check | Fresh result |
|---|---|
| `npm test` | PASS — 4 test files, 10 tests |
| `npm run lint` | PASS — `tsc --noEmit` |
| `npm run build` | PASS — Vite 7.3.6; the earlier reframe emitted `index-Ci-HC9X1.js`; the latest second-polish run emitted JS `index-BoztmcHn.js` and CSS `index-BAq-wObY.css` |
| `git diff --check` | PASS |
| `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` | PASS — HTTP 200, assets 200, current copy present, stale copy absent; `canonical_https=false` is expected for local HTTP |
| Fallback browser console | PASS — 0 errors, 0 warnings |
| Fallback browser requests | PASS — 0 failed requests in the main trace; privacy trace made 3 localhost requests and 0 outbound requests |
| Viewport layout | PASS — desktop, tablet, and mobile width predicates; mobile action is `fixed` |
| Semantic DOM | PASS — landmarks present, one `h1`, no unnamed buttons, current workflow step exposed |
| Chrome accessibility tree | PASS after icon fix — 0 unnamed images, 0 unnamed buttons, 0 unnamed links; `main#main-content` focus observed |

The local verifier is evidence for the local production preview only. It is
not evidence that the canonical Pages URL now serves the new hashed bundle.

## Second-polish addendum — 2026-08-15 21:59 +08:00

This addendum records a fresh local run after the narrow editorial pass. It
does not replace the earlier fallback-run evidence above. The product change
was intentionally small: repeated `Case sheet` chrome was reduced to
`Field folio` in the masthead and `Source ledger` on the evidence surface;
the loaded hero now says `Four source lines. One decision to test next.`

### Current local runtime evidence

| Check | Current result | Boundary |
|---|---|---|
| Production preview | PASS — `http://127.0.0.1:4179/` served the current bundle | Local HTTP only |
| Static verifier | PASS — HTTP 200, JS/CSS 200, current strings present, stale hero copy absent; `canonical_https=false` expected for local HTTP | Local preview only |
| Fresh Chrome flow | PASS — blank → sample → source expansion → Verify → accept claim → Decide → Ship; all seven awaited assertions returned `true` after waiting for the async sample copy | Owner-run local Chrome tab |
| Fresh Chrome copy | PASS — `Field folio`, `Support draft review`, `Four source lines. One decision to test next.`, and `Source ledger` were visible | English copy observation, not international comprehension |
| Chrome accessibility tree | PASS — 401 nodes inspected; unnamed `image`, `button`, and `link` roles: none | Chrome AX tree only; not native AT output |
| Keyboard | PASS — first `Tab` exposed `Skip to main content`; activating it focused `main-content` and produced `scrollY=78` for the fragment target | Keyboard path only; native screen reader `未驗證` |
| Mobile layout | PASS — `390×844`, document `scrollWidth=375` (no horizontal overflow observed); `.mobile-action-bar` was visible, `position: fixed`, `375×66`, top `778` | Emulated viewport only; real device `未驗證` |
| Fresh visual inspection | PASS — blank and loaded desktop screenshots at the reset Chrome viewport (`1914×788`) and loaded mobile screenshot at `390×844` were inspected in the current run | New screenshots were inspected in-memory; linked repository captures above remain prior layout evidence |

The complete current flow used explicit waits for the sample transition so the
test did not confuse asynchronous rendering with a product failure:

```text
{"blank":true,"loaded":true,"sourceExpansion":true,"verify":true,
 "acceptance":true,"decide":true,"ship":true}
```

The first exploratory assertion returned `loaded=false` when it read the page
immediately after clicking the sample button. A subsequent run that waited for
`Four source lines. One decision to test next.` returned `loaded=true`; this is
recorded as a test-timing correction, not a product defect. The same explicit
wait was used for the complete PASS trace above.

### Second-polish interpretation

The fresh screenshots keep the intended paper index, serif work statement,
ruled source surface, red correction mark, and blue provenance mark. The
second polish makes the hierarchy less self-describing: the shell is named
once, the loaded case is named once, and the source surface names its actual
job. No new feature, model, provider, telemetry, account permission, or
external write was introduced. The surface remains a deterministic fictional
fixture and still does not prove AI quality, user preference, adoption, or
GitHub-star growth.

## AI and trust quality gate

- No visible `AI-assisted support drafting` label remains in the current
  working surface or static copy oracle.
- `Support draft review` and `Case subject · support draft · fictional
  worksheet` name the PM work object and its reviewed subject without claiming
  a live AI provider.
- Source, claim, limitation, human decision, and `Not covered` remain visible.
- The output is called a field note, not a validation result; the product does
  not claim model quality, user success, or adoption.
- Current copy is English-first and avoids fake progress, assistant persona,
  confidence theatre, or generic AI capability claims.
- `support-draft` remains a fictional fixture; it is not a production support
  queue, customer result, or live model evaluation.

## QA debt and release gates

The following are intentionally held rather than inferred from local evidence:

1. Merge the reviewable branch and deploy the new bundle to GitHub Pages.
2. Run a fresh canonical HTTPS verifier and browser trace against
   `https://asdc163.github.io/pm-signal-lab/`; compare the served asset hash and
   visible copy with this report.
3. Execute native accessibility and real-device checks where the platform
   permits.
4. Run at least five unguided international PM sessions and record concrete
   expectation, hesitation, trust, recovery, and one-change feedback. Do not
   convert owner-run screenshots into user research.
5. Observe GitHub traffic and star movement as separate adoption signals. The
   current account/repository state is not changed or reinterpreted by this
   local QA.

## Rollback and not-covered boundary

- Code rollback: revert the visual reframe commit and the focused sample-load
  behavior fix together; the previous local bundle remains recoverable from
  `origin/main` until merge.
- Copy rollback: restore the previous case-sheet labels only with a new
  evidence-backed decision; do not silently reintroduce an AI-assistant shell.
- Deployment rollback: no deployment was performed in this QA pass. A future
  Pages release must retain the previous known-good commit until canonical
  smoke and browser evidence pass.
- Not covered: hosted release, native AT, real devices, non-owner sessions,
  live AI behavior, adoption, stars, and any claim of `viral`, `ready for
  10,000 stars`, or `problem-free` operation.

## Target audience and market-context brief

This section is a product hypothesis and test-design context, not market
research. No non-owner participant was recruited in this local QA pass.

| Context | Working definition | Evidence confidence / local fit |
|---|---|---|
| Primary segment | English-speaking PMs, founders, designers, and engineers reviewing an AI-assisted support, research, evaluation, or internal-tool workflow | Medium for the portfolio target; no segmentation study |
| Locale and culture | English-first international product practice; favor direct work-object nouns, source traceability, human review, and explicit limits over assistant persona language | Medium for copy direction; cross-cultural comprehension `未驗證` |
| Job to be done | Turn one polished but uncertain product observation into a source-linked claim and one small test that a teammate can challenge | Medium for workflow shape; owner-run only |
| Current workaround | Paste a quote into a document, add source/date manually, rewrite a claim in a template, and carry the metric/guardrail into another page | Hypothesis inferred from the product problem frame; no interview evidence in this pass |
| Scenario simulation | A PM sees a support draft that looks finished but cannot tell whether the policy is current; they need a source, limitation, decision rule, and next test in one handoff | Medium for deterministic local simulation; live support queue absent |
| Portfolio value | Demonstrate PM judgment around evidence, human ownership, and AI uncertainty without presenting a generic AI shell | High for the intended narrative in screenshots; recruiter or user reaction `未驗證` |
| Next learning gate | Five unguided international PM sessions, each with expectation, hesitation, trust, recovery, and one-change feedback | Not executed; required before positioning or growth claims |

The case sheet is deliberately narrow. It does not claim to replace research
repositories, support operations, experiment platforms, or live AI evaluation.
The local fixture only tests whether the source-linked decision shape can be
read and operated without an AI persona.

## UX diagnostic matrix

| Dimension | Diagnostic question | Observed evidence | Acceptance criterion | Status |
|---|---|---|---|---|
| Five-second comprehension | Does the first screen say what the PM is doing before naming AI? | Blank: `Start with a source line`; loaded: `Support draft review`; horizontal paper index; no AI badge | A reviewer can point to the case/work object and next action without reading a fake assistant state | PASS owner visual probe; non-owner paraphrase `未驗證` |
| Mental model / IA | Does the layout read as a case sheet, not a dashboard? | Sidebar hidden above 1024px; thin index above hero; lower margin/context band | Workflow is navigation, not persistent dashboard chrome; source ledger is central | PASS screenshot and computed display checks |
| Action clarity | Is there one obvious next move at each state? | Sample CTA, `Start review`, `Draft smallest experiment`, `Export decision brief`, sticky mobile action | Current action has an accessible name and remains reachable | PASS deterministic trace |
| Ability / friction | Can users recover from blank input and smaller screens? | Three field errors preserve form; mobile has fixed next action; width predicate passes | No data loss on validation; no horizontal overflow at tested widths | PASS fallback browser; touch/device `未驗證` |
| Trust | Can a reader distinguish source, claim, suggestion, and result? | Source excerpt, Source mapping, human accept/keep/missing controls, `Not covered`, field-note disclaimer | No unreviewed claim is presented as a validated result | PASS local fixture; live-model trust `未驗證` |
| Recovery | Does back, refresh, cancel, and privacy refusal have a legible path? | Refresh resets; reset returns to Collect; text fallback exists; unchecked privacy blocks | A user can recover without silent outbound mutation | PASS for tested local branches |
| AI UX uncertainty | What happens when the AI subject is wrong, stale, or under-evidenced? | Fixture explicitly says not tested with a live model/support queue; missing evidence remains visible | Future live model must add provider failures, stale source, prompt injection, latency/cost, and HITL evals | Local deterministic boundary PASS; AI runtime `未驗證` |

## Deep QA toolchain matrix

| Layer | Tool / method | Current evidence | Not covered / reason |
|---|---|---|---|
| Code and unit | Vitest, TypeScript compiler | 4 files / 10 tests; `npm run lint` pass | No mutation testing or coverage threshold configured |
| Build | Vite production build | `npm run build` pass; hashed JS/CSS captured | CDN/Pages cache behavior pending merge |
| API / network | Browser request listener and static verifier | No failed requests; local-only static assets; no API/provider call | No API exists in this v0; future API contract tests are out of scope |
| Browser behavior | Codex Chrome Extension plus headed/fresh headless Playwright contexts | Direct click/fill/keyboard/resize/download/state trace PASS in both local routes | Canonical hosted browser behavior remains pending |
| Accessibility DOM | Semantic DOM oracle, Chrome accessibility tree, accessible names, focus assertions | Landmarks, one `h1`, named buttons, skip link, `aria-current`, and post-fix AX tree PASS | Native screen reader and dedicated contrast tooling remain unverified |
| Visual | Fresh `1280×900`, `390×844` screenshots plus visual inspection | Editorial case-sheet hierarchy, mobile sticky action, no AI theatre | Automated pixel-diff baseline not configured |
| Responsive | Viewport oracle at desktop/tablet/mobile | No horizontal overflow; mobile stepper/action predicates PASS | Physical device, browser zoom, orientation changes not run |
| Performance | Local build and first render smoke | Preview returns HTML/assets 200; no performance claim made | No Lighthouse/Web Vitals budget, slow-network, CPU-throttle, or memory trace |
| Security and privacy | Boundary inspection, privacy gate, outbound-request check | Local-only fixture; unchecked report blocked; 0 outbound in privacy trace | No auth, secret, dependency SCA, CSP, or server threat surface in this v0 |
| Supply chain | `package.json`, lockfile, existing local install | No dependency added by this reframe; existing build/test pass | No new plugin/package promotion in this slice |
| AI evaluation | Fixture limitations and negative-copy oracle | Live-model wording is explicitly withheld; stale AI-shell strings forbidden | No model/dataset/provider, so quality eval cannot be executed |
| Observability | Product event labels and browser console/request listeners | Local events remain in page; no console warnings/errors | No production telemetry, alerting, replay, or retention pipeline exists |

This matrix intentionally distinguishes a deterministic local product surface
from future connected AI work. It is not a claim that the repository has a
production API, model-evaluation, telemetry, or security program.

## Evidence manifest and repository QA discovery

| Evidence ID | Artifact / command | What it proves | Layer |
|---|---|---|---|
| E-079-01 | `npm test` output: 4 files / 10 tests | Domain regression suite passes | Local code |
| E-079-02 | `npm run lint` | TypeScript has no type errors | Local code |
| E-079-03 | `npm run build` | Production bundle compiles; `index-Ci-HC9X1.js` and `index-BAq-wObY.css` emitted | Local build |
| E-079-04 | `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` | Local HTTP 200, assets 200, current copy present, stale copy absent | Local HTTP/static |
| E-079-05 | `editorial-case-sheet-local-blank-1280-2026-08-15.png` | First-run desktop hierarchy | Visual |
| E-079-06 | `editorial-case-sheet-local-loaded-1280-2026-08-15.png` | Loaded case hierarchy after focus/scroll fix | Visual |
| E-079-07 | `editorial-case-sheet-local-blank-390-2026-08-15.png` | First-run mobile and fixed action | Visual |
| E-079-08 | `editorial-case-sheet-local-loaded-390-2026-08-15.png` | Loaded mobile case title and sticky action | Visual |
| E-079-09 | Fresh fallback browser runner | 26 behavior/accessibility/layout checks, 0 console issues, 0 failed requests | Browser |
| E-079-10 | Focus regression probe | Sample load yields `scrollY=0`, `activeId=main-content` on desktop and mobile | Browser focus |
| E-079-11 | Privacy trace | Unchecked block, checked field note, 0 outbound requests | Privacy/browser |
| E-079-12 | Download trace | `pm-signal-decision-brief.md` emitted by browser download | Browser output |
| E-079-13 | Chrome Extension local trace | Sample → source → claim → smallest test → export, privacy block/allow, and mobile fixed action observed in the agent-controlled Chrome tab | Chrome behavior |
| E-079-14 | Chrome `Accessibility.getFullAXTree` after `aria-hidden` fix | 0 unnamed images, 0 unnamed buttons, 0 unnamed links; skip-link focus and mobile viewport checks also passed | Chrome accessibility |

### Repository QA surface discovery

- `src/domain/*.test.ts` is the existing deterministic domain-test surface.
- `src/App.tsx` is the single React interaction surface for state transitions,
  focus behavior, privacy gate, and local outbound boundaries.
- `src/styles.css` is the visual/responsive surface; the reframe is appended as
  a narrow final cascade block to keep rollback easy.
- `scripts/verify-hosted-demo.mjs` is the stale-copy/static HTTP oracle.
- `docs/product/pm-signal-lab/` is the durable contract, QA, and hosted-audit
  handoff surface.
- No API route, model provider, database, auth, or telemetry source exists in
  this v0. Those layers are explicit out of scope, not untested claims of
  production readiness.

### Test-data and privacy matrix

| Data class | Used in this QA | Boundary | Evidence |
|---|---|---|---|
| Fictional fixture lines | Yes | Static local bundle; no upload | E-079-04, E-079-09 |
| Synthetic custom line | Yes | In-memory page state; refresh clears | E-079-09 |
| Real customer names/tickets/tokens | No | Privacy checkbox explicitly blocks unconfirmed report preparation | E-079-11 |
| Credentials/API keys | No | No auth/provider route; forbidden in feedback text | E-079-11, source boundary |
| External analytics identifiers | No | No telemetry request observed | E-079-09, E-079-11 |

### Trace assertions and risk-based selection

The highest-risk assertions were selected first: source provenance, false
completion language, human acceptance, privacy refusal, outbound network
boundary, and the sample-load focus jump. Lower-risk assertions cover visual
spacing and static copy after the trust path is stable. Each claim in this
report names its evidence layer so local PASS cannot be reused as hosted or
market evidence.

### Behavior-matrix trust questions

| Job | Trust question asked during QA | Acceptance signal | Current answer |
|---|---|---|---|
| Understand the case | Is this a PM work object or an AI assistant pretending to know the answer? | Case title leads; AI context is subordinate and fictional | PASS for local copy/visual; external interpretation `未驗證` |
| Inspect provenance | Can I see the exact line, source, date, and limitation before I act? | `Source excerpt`, source metadata, and `Source mapping` are present | PASS |
| Accept a claim | Does the product make me own the decision? | Explicit Accept / Keep as hypothesis / Edit / Missing evidence controls | PASS |
| Export | Will this Markdown be mistaken for a validated result or automatic submission? | `Shareable, but not a completion guarantee`, `Not covered`, and manual boundary remain | PASS |
| Leave feedback | Could a private ticket or token leave this page by accident? | Checkbox blocks preparation; local-only copy and 0 outbound requests | PASS |

## AI evaluation dataset register

There is no live AI dataset in this release. The following register prevents
the deterministic fixture from being mistaken for a model evaluation:

| Dataset / scenario | Current state | Future gate |
|---|---|---|
| Four fictional support-draft source lines | Present as a local fixture | Keep IDs, dates, limits, and synthetic label; never report as customer evidence |
| Missing-source / missing-evidence claim | Present as a negative fixture state | Add precision/recall and abstention eval once a model exists |
| Stale-policy / freshness mismatch | Represented in source text only | Add time-shifted retrieval and citation freshness cases |
| Prompt injection / malicious source content | Not executed; no model/provider | Add adversarial corpus and human escalation before connecting a model |
| Provider timeout / malformed output / cost spike | Not applicable; no provider | Add fallback, budget, latency, and observability assertions |

## Flake register and QA debt

| ID | Risk | Detection / mitigation | Current status |
|---|---|---|---|
| F-079-01 | Sample loading is intentionally asynchronous (`260ms`) and a browser runner may read before the ready state | Wait on visible state text (`4 source lines`) instead of arbitrary sleep; focus/scroll assertion runs after ready | Mitigated in current runner |
| F-079-02 | Clipboard permission differs between headed and headless contexts | Use explicit local clipboard permission for success path; keep textarea fallback; test warning recovery separately before release | Success path PASS; forced denial `未驗證` |
| F-079-03 | Full-page screenshots can capture the viewport after focus-induced scroll | Capture viewport after explicit `scrollY`/focus assertion and inspect fresh images | Mitigated by sample-load focus fix |
| F-079-04 | Decorative Lucide SVGs were exposed as unnamed image nodes in the Chrome accessibility tree | Add `aria-hidden="true"` to decorative icons; rerun the AX-tree audit and keep native AT separate | Mitigated: fresh Chrome tree reports 0 unnamed images; native AT remains `未驗證` |
| F-079-05 | Existing Playwright/browser processes can outlive a CLI call | Close the owned browser context in `finally`; inspect process/session state before handoff | Controlled for current runner |

No flaky result was promoted as PASS. A future CI browser suite should retry
only after recording the first failure, preserve traces/screenshots, and treat
three repeated failures as an investigation trigger rather than hiding them
with a larger timeout.

## Negative, recovery, and interruption coverage

| Interruption / mistake | Expected recovery | Result |
|---|---|---|
| Save blank source form | Stay open, preserve current values, expose three field errors, focus first invalid field | PASS |
| Source row opened then closed | Restore `View source` without rewriting source text | PASS |
| Claim not accepted | Keep it reviewable; no export-ready result should be implied without a supported path | PASS in core flow / missing-evidence branch retained |
| Privacy preparation without confirmation | Show warning, no feedback output, no outbound request | PASS |
| Clipboard blocked | Keep Markdown in a text fallback and show recovery copy | Code path present; clipboard-success path PASS; forced permission-denied injection not rerun in this slice |
| Download unavailable | Keep Markdown fallback visible | DOM fallback present; physical file-system picker behavior `未驗證` |
| Refresh during local session | Return to blank sheet; no remote state persists | PASS |
| Back/step navigation | Use workflow controls to return to earlier decision state; no GitHub mutation | PASS for visible controls; browser history semantics not applicable to this single-page state machine |

## Assistive-technology user profiles and focused WCAG checks

| Profile | Relevant check | Result |
|---|---|---|
| Keyboard-only PM | Skip link, visible focus, named buttons, focus target after async sample load | PASS via fallback keyboard/DOM checks |
| Screen-reader PM | Landmarks, heading structure, status labels, source/claim regions, `aria-current`, and Chrome AX tree | DOM semantics and Chrome AX tree PASS; actual VoiceOver/NVDA/TalkBack output `未驗證` |
| Low-vision / zoom user | Text wrap and no horizontal overflow at tested widths | 390/768/1280 width checks PASS; zoom `未驗證` |
| Motor-impaired / touch user | Primary actions do not depend on hover; sticky action present on mobile | CSS/DOM PASS; physical touch target measurement/device `未驗證` |
| Reduced-motion user | No required action depends on animation; sample state waits for deterministic content | Not explicitly run with `prefers-reduced-motion`; mark `未驗證` |

Focused WCAG 2.2 checks covered keyboard access, focus target, labels, heading
hierarchy, status announcements, and reflow. Contrast and full assistive-tech
conformance were not claimed because native AT and dedicated contrast tooling
were not executed in this task. The Chrome accessibility tree is supporting
evidence for exposed semantics, not a substitute for native screen-reader
output.

## Feature logic and state map

| Promise | Role | Entity / states | Source of truth | Boundary / rollback | Evidence |
|---|---|---|---|---|---|
| Start from a traceable line | PM / researcher | `Evidence`: blank → local line → source excerpt | `src/domain/fixture.ts` plus form state | Refresh resets; no upload | E-079-09 |
| Keep interpretation separate | Evidence reviewer | `Claim`: candidate → supported / hypothesis / missing / edited | `src/domain/synthesis.ts`, human button action | No auto-accept; return to Verify | E-079-09 |
| Name the smallest test | PM / team | `ExperimentBrief`: draft → ready | Local experiment editor fields | Owner remains TBD; edit before export | E-079-09 |
| Carry a challengeable handoff | PM / collaborator | `DecisionMemo`: ready → Markdown preview/copy/download | `src/domain/export.ts` | Manual only; no issue mutation | E-079-09, E-079-12 |
| Invite careful feedback | Tester / owner | `SessionFeedback`: closed → blocked → prepared | `src/domain/feedback.ts` and checkbox | Privacy confirmation required; manual GitHub review | E-079-11 |
| Keep AI-PM context honest | Portfolio reader | `Case subject`: hidden in blank → subordinate loaded metadata | `src/App.tsx` copy and fixture | Revert copy/layout as one reviewable change | E-079-04 to E-079-08 |

No model/tool contract exists yet. Before adding one, define input/output
schemas, provider failure behavior, source freshness, prompt-injection
handling, human escalation, trace retention, cost/latency budgets, and a
paired evaluation set.

### Contract traceability

| Product contract criterion | QA cases | Current evidence |
|---|---|---|
| First read names the source-first PM job | QA-079-001, QA-079-002, QA-079-009 | Screenshots, copy oracle, viewport trace |
| Source stays attached before claim interpretation | QA-079-003, QA-079-004 | Source excerpt and Source mapping DOM states |
| Human owns the decision | QA-079-004, QA-079-005 | Accept action, decision brief, privacy/manual boundary |
| Smallest test has metric, guardrail, and decision rule | QA-079-004, QA-079-007 | Experiment editor and Markdown output |
| Local data boundary remains visible and reversible | QA-079-005, QA-079-006, QA-079-008 | Privacy trace, refresh reset, focus/recovery trace |
| Public release cannot claim what local QA did not prove | QA-079-010, QA-079-011 | Static verifier plus hosted-release hold |

## Traceable executable QA cases

| ID / priority | Preconditions | Steps | Visible result | Hidden-state assertion | Evidence |
|---|---|---|---|---|---|
| QA-079-001 / P0 | Fresh `1280×900` preview | Load page, inspect hero and index | `Start with a source line`, one sample CTA, local boundary | Sidebar display none; desktop index visible; no stale strings | E-079-04, E-079-05 |
| QA-079-002 / P0 | Fresh blank sheet | Open sample and wait for four lines | Loaded case remains at top | `scrollY=0`; `main#main-content` focused | E-079-06, E-079-10 |
| QA-079-003 / P0 | Sample loaded | Expand/collapse first source | Excerpt appears then restores | Source text remains fixture text | E-079-09 |
| QA-079-004 / P0 | Sample loaded | Start review; accept claim; go Decide | Review count changes; brief fields appear | `reviewed=true`, `supported=1`, no provider call | E-079-09 |
| QA-079-005 / P0 | Decision brief ready | Open pilot note; prepare unchecked and checked | Warning first; field note second | No outbound request; checkbox required | E-079-11 |
| QA-079-006 / P1 | Blank form open | Save blank; fill fields; save | Three alerts then one source line | Text preserved; local evidence count changes | E-079-09 |
| QA-079-007 / P1 | Ship state | Copy and download Markdown | Notice and `.md` download | Fallback textarea remains present | E-079-09, E-079-12 |
| QA-079-008 / P1 | Fresh page | Tab, Enter skip link | Main receives focus and URL hash changes | `tabindex=-1`, accessible names remain | E-079-09 |
| QA-079-009 / P1 | `390×844` and `768×1024` | Resize and inspect | Sticky action / no overflow | `scrollWidth <= innerWidth`; mobile stepper visible | E-079-07, E-079-08, E-079-09 |
| QA-079-010 / P1 | Local bundle built | Run static verifier | HTTP/assets/current/stale checks pass | Served hashed asset is the current build | E-079-03, E-079-04 |
| QA-079-011 / P2 | Branch not merged | Open canonical URL | Must not be called current release | Hosted commit/hash comparison is pending | Release hold |
| QA-079-012 / P1 | Local preview in Chrome Extension tab | Run core flow, privacy branches, keyboard/mobile checks, then inspect AX tree | Functional path remains usable and decorative icons are absent from the semantic tree | 0 unnamed images, 0 unnamed buttons, 0 unnamed links | E-079-13, E-079-14 |

The case IDs above are the traceability handles used by the contract and this
report. The visible result is what a user sees; the hidden-state assertion is
what prevents a plausible screenshot from being mistaken for a correct state
transition.

## Risk model and quality economics

| Risk | User harm / trust impact | Business impact | Data / AI uncertainty | Reversibility | Priority / control |
|---|---|---|---|---|---|
| A generic AI shell hides the PM job | Portfolio reader misunderstands the work and discounts credibility | Lower qualified attention and differentiation | Medium; interpretation not tested with non-owners | High; copy/layout rollback | P1 — editorial case sheet, five-second probe, five international sessions |
| Source-backed claim is mistaken for a validated result | User may make a decision from insufficient evidence | Direct damage to Tommy's credit | Medium in fixture; high once live model exists | High locally; harder after public claim | P0 — source mapping, human action, `Not covered`, no completion language |
| Privacy handoff is misunderstood | Private content or tokens could be prepared for sharing | Reputational/security damage | High in a future connected release | Medium once external submission exists | P0 — unchecked block, local-only report, outbound-request assertion |
| Async focus hides newly loaded case | PM misses the work object and may believe load failed | First-run abandonment and lower trial completion | Low technical uncertainty after fix | High; one-effect rollback | P1 — `scrollY=0` / `main#main-content` regression |
| Mobile action is clipped | Tester cannot complete the only useful next action | Lower international trial completion | Low layout uncertainty; device unknown | High CSS rollback | P1 — 390/768/1280 checks; physical device follow-up |
| Owner-run QA is presented as adoption | Public audience is misled about validation and growth | Credibility loss; stars become vanity metric | Low evidence uncertainty; high interpretation risk | High documentation correction, low reputation recovery | P0 — explicit local/hosted/user evidence layers |
| Hosted bundle is stale after merge | Public reader sees old or contradictory copy | Release confusion and broken trust | Low after canonical hash check | High via redeploy/revert | P1 — hashed asset + canonical HTTPS gate |

Priority is ordered by user harm and trust before convenience. The cheapest
visual polish is not allowed to outrun the evidence boundary.

## Production feedback and learning plan

No production feedback loop is connected in this local slice. The operating
plan for the next evidence gate is:

| Signal | Collection boundary | Funnel / alert threshold | Owner / action |
|---|---|---|---|
| First-run completion | `Open sample` → `Start review` → one review decision | Instrument only after explicit consent; investigate a sharp step drop rather than optimizing blindly | Tommy / inspect session notes |
| Source provenance use | Source expand rate and source-to-claim transition | Compare with qualitative hesitation; do not call expansion rate trust | Tommy / recruit five sessions |
| Decision handoff | Export/copy/download events plus manual report feedback | Alert on errors or missing fallback; no success claim from click count | Tommy / reproduce and fix |
| Privacy recovery | Blocked vs confirmed field-note path | Any unexpected outbound request is P0 release blocker | Tommy / stop release and inspect boundary |
| AI quality (future) | Paired source/citation/abstention dataset | Regression threshold must be set before provider connection | Tommy / add eval harness first |
| GitHub growth | Stars, unique views, clones, referral source | Treat as external adoption evidence only; no automatic attribution from local events | Tommy / weekly read-only review |

The current repository has no analytics, session replay, support inbox, alert
channel, or production model. These are planned gates, not hidden telemetry.

## Fix brief and regression candidates

### Sample-load focus / scroll defect

- User impact: a PM opens the sample and is moved below the case sheet, making
  the newly loaded subject easy to miss.
- Root cause: the `packBecameReady` focus branch selected the lower desktop
  `.context-next [data-current-action]`; browser focus scrolling moved the page
  to that control.
- Minimal fix: focus `main#main-content` with `{ preventScroll: true }` only
  when the pack becomes ready; preserve action focus for later workflow-step
  transitions.
- Acceptance criteria: sample load leaves the case title in the initial
  viewport, `main#main-content` is the async focus target, mobile sticky action
  remains available, and later `Verify → Decide → Ship` focus behavior is not
  removed.
- Regression cases: `QA-079-002`, `QA-079-004`, `QA-079-008`, `QA-079-009`.
- Verification: fresh fallback runner observed `scrollY=0`,
  `activeId=main-content`, 26 checks PASS, console/request failures 0.
- Owner hint: product/engineering owner Tommy; no deployment owner assigned in
  this local branch.
- Do not change: source-to-claim semantics, privacy gate, Markdown boundary,
  or real GitHub submission behavior.

### Decorative icon semantics defect

- User impact: a screen-reader user could encounter unnamed image nodes for
  icons that carry no information, adding noise to the case sheet and making
  the product feel less considered.
- Root cause: decorative Lucide SVGs were rendered without an explicit hidden
  semantic boundary.
- Minimal fix: add `aria-hidden="true"` to decorative icon instances in
  `src/App.tsx`; preserve the visible icon treatment and the accessible names
  on their containing buttons and links.
- Acceptance criteria: a fresh Chrome accessibility tree reports zero unnamed
  images, zero unnamed buttons, and zero unnamed links; visible labels and
  keyboard focus remain intact.
- Verification: Chrome Extension rerun after the patch satisfied the counts;
  native VoiceOver/NVDA/TalkBack output remains `未驗證`.
- Regression cases: `QA-079-008`, `QA-079-012`.

### Reframe rollback boundary

- Keep the visual copy/layout and focus fix in one reviewable commit or PR
  slice so a hosted regression can revert both safely.
- Do not merge or deploy until canonical HTTPS evidence is collected.
- Do not add a model, API, telemetry, external submission, or dependency as a
  “next small polish” in this slice.

## QA plan score gate

The report must pass the repository's product-QA plan scorer before it is
staged:

```bash
python3 /Users/tommy/.codex/skills/product-qa-specialist/scripts/score_qa_plan.py \
  docs/product/pm-signal-lab/79-editorial-case-sheet-local-qa-2026-08-15.md \
  --min-score 85
```

Expected: at least `85/100`; actual: `92.6/100`, verdict `strong`.

## Human-review gate addendum — 2026-08-15 22:26 +08:00

The next highest-value defect was not another visual decoration. A user could
previously use the workflow stepper to reach `Decide` before reviewing a claim,
which made the tool look like it was turning a source pack into a test on the
user's behalf. The narrow fix adds a domain-level review gate:

- `Decide` keeps the user in `Verify` until at least one claim is explicitly
  reviewed.
- `Draft smallest experiment` names the selected unreviewed claim and explains
  the recovery.
- A claim can continue after the user accepts it, edits it, keeps it as a
  hypothesis, or marks the evidence missing. The UI does not require a false
  `supported` conclusion.

### Fresh Chrome Extension evidence

Route: `Codex Chrome Extension`; environment: existing Chrome tab/session,
agent-created local tab at `http://127.0.0.1:4179/`, no foreground takeover.
No alternate browser or prohibited browser bridge was used.

| User archetype / job | Starting state | Success signal | Failure signal | Recovery | Result |
|---|---|---|---|---|---|
| Low-trust PM / protect human judgment | Loaded sample with 0 reviewed claims | Stepper `Decide` leaves the user in `Verify` with a concrete review instruction | Experiment brief opens from an unreviewed claim | Accept, edit, keep as hypothesis, or mark missing evidence | PASS |
| PM / try the obvious action | Verify with selected claim still unreviewed | `Draft smallest experiment` shows a warning and stays in Verify | Silent draft or automatic claim acceptance | Review the selected claim, then retry | PASS |
| PM / carry a reviewed decision forward | Verify after `Accept claim` | Experiment brief opens and retains `Not covered` / limitation language | Review gate remains stuck after a valid human decision | Return to Verify and choose another reviewed claim | PASS |

Fresh observed gate result:

```text
{"loaded":true,"stepperBlocked":true,"currentStep":"Verify",
 "draftBlocked":true,"draftAllowedAfterReview":true}
```

The complete current local flow also returned:

```text
{"blank":true,"loaded":true,"source":true,"verify":true,
 "accept":true,"decide":true,"ship":true}
```

The first blank-state attempt to click `Decide` was also observed: the page
stayed in `Collect` and explained that there were no claims to review. That is
the expected empty-state recovery, not a bypass.

### Fresh visual, keyboard, mobile, and semantic evidence

- Blank and loaded desktop screenshots were inspected in the current Chrome
  run. They preserve the warm paper surface, thin index, red action mark, blue
  provenance mark, and one left-aligned case reading path.
- The loaded mobile screenshot was inspected at `390×844`; the fixed action
  remained visible at the bottom and the source ledger stayed readable.
- First `Tab` exposed `Skip to main content`; pressing `Enter` on the visible
  skip link focused `main-content` and produced `scrollY=78` for the fragment
  target. A direct click attempt exceeded the Chrome tool deadline, so the
  keyboard activation is the current direct evidence for that path.
- Mobile geometry: `innerWidth=390`, `innerHeight=844`,
  `scrollWidth=375`, `scrollY=0`, fixed action visible with a `375×66` rect at
  top `778`.
- Chrome AX tree: 503 nodes inspected; unnamed `image`, `button`, and `link`
  roles: none.
- App-origin console errors/warnings: 0. Twelve warnings were emitted by a
  third-party `chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/`
  MetaMask content script (`MaxListenersExceededWarning` and orphaned stream
  messages), not by the localhost app. They remain external browser noise and
  are not silently counted as an app pass.

### Static evidence for this gate

| Check | Result |
|---|---|
| `npm test` | PASS — 4 files, 11 tests |
| `npm run lint` | PASS |
| `npm run build` | PASS — JS `index-Dxdk9HcE.js`, CSS `index-BAq-wObY.css` |
| Local static verifier | PASS — current copy and new review-gate strings present; stale copy absent |

This gate fixes a human-ownership risk in the local product. It does not
change the hosted release boundary: canonical Pages still serves the prior
bundle until the candidate is explicitly merged and deployed.

## QE evidence and feature-logic addendum — 2026-08-15 22:42 +08:00

The machine-readable evidence boundary for this run is
[`qa-evidence-manifest-2026-08-15.json`](./qa-evidence-manifest-2026-08-15.json).
It passed the repository validator:

```text
python3 /Users/tommy/.codex/skills/product-qa-specialist/scripts/validate_qa_evidence_manifest.py \
  docs/product/pm-signal-lab/qa-evidence-manifest-2026-08-15.json
QA evidence manifest: PASS
```

### Repo QA surface and toolchain matrix

The repository surface was discovered before scoring this run. The package
scripts are `npm run test`, `npm run lint`, `npm run build`, `npm run preview`,
and `npm run verify:hosted`; CI includes `ci.yml`, `deploy-pages.yml`,
`hosted-demo-smoke.yml`, and `weekly-growth-pulse.yml`. There is no native
mobile target, API contract, browser-test directory, live provider adapter, AI
eval suite, or production observability surface in this candidate.

| Layer | Current evidence | Status / boundary |
|---|---|---|
| Code correctness | Vitest domain tests plus TypeScript no-emit | PASS |
| Browser behavior | Codex Chrome Extension path and fallback trace recorded above | PASS — local only |
| Accessibility | Keyboard skip link, semantic DOM, and Chrome AX tree | PASS — native AT `未驗證` |
| Visual regression | Fresh desktop/mobile inspection plus repository QA captures | PASS — no screenshot-diff service configured |
| Performance | No production performance budget or profiler run in this slice | OUT OF SCOPE |
| Security / privacy | Local-only fixture, no upload, no outbound request in privacy path | PASS for boundary; deep security review `未執行` |
| Supply chain | No new dependency/provider/API key in this change | PASS for change boundary |
| AI evaluation | No live model or provider adapter is connected | OUT OF SCOPE; no eval dataset exists yet |
| Observability | No analytics, session replay, alerting, or production model telemetry | OUT OF SCOPE; no telemetry is implied |

### Test-data, privacy, flake, and risk-selection register

| Register | Current entry | Decision |
|---|---|---|
| Test data / privacy matrix | `SAMPLE_PACK` is fictional and in-memory; add-source content stays local; pilot-note preparation requires an explicit synthetic-data checkbox; no raw signal or token is uploaded | PASS for current boundary |
| Flake register | No product flake observed in the fresh local run. One direct Chrome click exceeded the tool deadline; keyboard `Enter` reproduced the same path. Third-party MetaMask warnings are external browser noise | Record and do not call the click path product-failed |
| AI eval dataset register | No dataset is registered because there is no provider, retrieval, or model output in this release slice | BLOCKED until a provider contract exists |
| Trace assertions | Visible state and hidden state are paired for sample load, review gate, privacy block, no outbound request, focus target, fixed mobile action, and AX unnamed-node counts | PASS for listed assertions |
| Risk-based test selection | P0: source truth, human review, privacy boundary, stale hosted bundle. P1: sample-load focus, mobile action, editorial comprehension. P2: visual repetition and copy polish | Executed in that order; hosted and participant gates remain open |

### Feature logic map

| Contract element | Current product truth | Evidence / rollback |
|---|---|---|
| Promise | Turn a small source pack into a reviewable decision brief and smallest test; do not decide for the PM | PRD, DESIGN.md, human-review gate trace |
| Roles | PM/reviewer owns the claim decision; the tool structures evidence and drafts a candidate brief | Review controls, `Not covered`, explicit owner `TBD` |
| Entities | `Evidence`, `Claim`, `ExperimentBrief`, `DecisionMemo`, `SessionFeedback` | `src/domain/types.ts`, domain tests, QA trace |
| State transitions | Collect → Verify → Decide → Ship; empty claims stay in Collect; unreviewed claims cannot enter Decide; reviewed claims can draft; export remains local/manual | Stepper behavior, `getReviewedClaimForExperiment`, browser result |
| Tool contract | Deterministic fixture and local in-memory state only; no live model, API, GitHub mutation, telemetry, or automatic external submission | Package surface, verifier, privacy request trace |
| Source of truth | Source line and source mapping remain attached to claims; human review state is required before experiment drafting | Source expansion, claim rows, review gate |
| Rollback | Revert the focused PR slice and redeploy Pages only after canonical smoke; do not rewrite history or delete the branch | Hosted preflight §Impact and rollback |
| Evidence sources | Domain tests, static verifier, QA screenshots, Chrome behavior trace, AX tree, and this manifest; participant/adoption evidence is absent | `qa-evidence-manifest-2026-08-15.json` and explicit blocked layers |

The addendum is a governance record, not a claim that every layer is green.
In particular, the local pass cannot substitute for canonical hosted proof,
native assistive technology, non-owner PM sessions, a live model evaluation,
or public adoption data.

## Current language simplification addendum — 2026-08-15 23:01 +08:00

This addendum records the small copy-and-semantics pass that followed the
editorial review. It changes no data flow, dependency, provider, or external
side effect. The goal was to remove design jargon from the first read while
keeping the paper treatment and the PM work object specific.

### Changed surface

| Previous label | Current label | Reason |
|---|---|---|
| `Field folio` | `Working sheet` | Directly names the working surface. |
| `Case sheet` | `Review sheet` | Keeps the review job visible without a generic case metaphor. |
| `Case record` | `Sheet status` | Describes the live count and current workflow step. |
| `Source ledger` | `Source lines` | Names what the user actually reads. |
| `Case subject` | `Review subject` | Keeps the fictional support-draft subject subordinate and explicit. |

### Fresh Chrome evidence

- Route: `Codex Chrome Extension`, existing Chrome session, agent-created local
  tab `1280574737`, no foreground takeover; no alternate browser or prohibited
  bridge was used.
- Environment: `http://127.0.0.1:4179/`, English `en-US`, production Vite
  preview built from the working tree.
- Blank desktop: the first read was `Start with a source line`; the visible
  shell label was `Working sheet`, and the primary action was `Open the sample
  worksheet`.
- Loaded desktop: `Review sheet`, `Support draft review`, `Sheet status`,
  `Source lines`, and `Review subject` were present in the live DOM and the
  screenshot; no assistant persona, chat surface, gradient, or confidence
  theatre was introduced.
- Pre-fix loaded mobile at `390×844`: `innerWidth=390`, `innerHeight=844`,
  `scrollWidth=375`, no horizontal overflow; the fixed action measured
  `375×66` at `top=778`. The lower source heading begins behind the fixed
  action at the initial scroll position and remains reachable by scrolling;
  this was the evidence that motivated the small mobile CSS correction below,
  not post-fix evidence.
- Keyboard: first `Tab` reached `Skip to main content`; `Enter` focused
  `main#main-content` and produced `scrollY=125` in this run.
- Human-review gate: `Go to Decide` with zero reviewed claims stayed in
  Verify and showed `Review the selected claim before drafting the smallest
  experiment.` After `Accept claim`, Decide opened and the experiment brief
  remained editable.
- Complete local path: sample → Verify → blocked Decide attempt → accept →
  Decide → Ship → pilot note.
- Privacy recovery: unchecked feedback preparation produced the warning
  `Please confirm that this report contains no customer data, private content,
  API keys, or tokens.` and no output; after the synthetic report was checked,
  the field note was generated locally and did not contain the raw fixture
  quote.
- Accessibility heuristic: 35 live interactive controls had no unnamed
  `button`, `link`, input, textarea, or select; images were absent; native
  VoiceOver/NVDA/TalkBack remains `未驗證`.
- App-origin console errors/warnings: 0. The tab also received repeated
  third-party MetaMask content-script warnings; they were excluded by URL and
  remain external browser noise.

### Local gate after this pass

| Check | Result |
|---|---|
| `npm test` | PASS — 4 files, 11 tests |
| `npm run lint` | PASS |
| `npm run build` | PASS — JS `index-DrnySMU3.js`, CSS `index-CbwmMWdO.css` |
| `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` | PASS for local HTML/assets/current-copy checks; `canonical_https=false` is expected for localhost |
| Canonical Pages | `未驗證` for this candidate; prior hosted bundle remains live until PR #44 is explicitly merged and redeployed |

This is a local owner-run evidence update. It does not prove international
comprehension, non-owner sessions, adoption, GitHub traffic, or star growth.

### Mobile correction verification status — 2026-08-15 23:09 +08:00

The live pre-fix measurement showed the desktop editorial rule
`flex-basis: 272px` stretching the mobile status block. The implementation now
adds `flex-basis: auto` inside the `max-width: 700px` rule so the mobile status
can size to its content. This is a narrow, reversible CSS correction with no
new feature or dependency.

The post-fix browser rerun is currently `未驗證`: the Codex Chrome Extension
timed out while controlling the existing agent tab, the browser session was
rebootstrapped once, and a fresh controlled tab also timed out before a DOM
snapshot could be collected. The earlier pre-fix screenshot must not be used
as proof that the correction works. Acceptance remains: fresh Chrome at
`390×844` must show the loaded pack heading without the fixed action covering
the heading, preserve `scrollWidth <= viewport`, and keep the fixed action
 reachable. Canonical Pages remains `未驗證` as well.

### Computer Use fallback observation — 2026-08-15 23:44 +08:00

Because the Chrome Extension timed out again after the CSS correction, one
explicitly announced Computer Use fallback was used against the local preview
only. This is supplemental observation, not a replacement for the preferred
Chrome Extension route or native assistive-technology QA.

- The current post-fix local page loaded in Chrome and its accessibility tree
  exposed `Start with a source line`, `Review sheet`, `Support draft review`,
  `Sheet status`, `Source lines`, and `Review subject`.
- The current loaded worksheet was visibly rendered and showed the simplified
  English labels in the screenshot. No external page, account, GitHub action,
  feedback submission, or network-backed product flow was touched.
- The Computer Use screenshot showed the app in a narrow pane, but the active
  viewport was not independently measured as `390×844`; therefore this does
  not turn the mobile correction into a pass. Exact post-fix mobile layout,
  no-obscured-heading behavior, and `scrollWidth <= viewport` remain `未驗證`.
- Two `Tab` actions produced no reliable focus announcement in the returned
  accessibility tree. The earlier Chrome Extension keyboard evidence remains
  valid for the pre-correction run, but this fallback did not provide a fresh
  post-fix keyboard pass. Native VoiceOver/NVDA/TalkBack remains `未驗證`.

The correction remains intentionally fail-closed in the QA manifest: current
local desktop copy and loaded-state evidence are present, while exact mobile,
post-fix keyboard, canonical hosted, participant, adoption, and star-growth
evidence are still separate gates.

## Quiet workpaper second-polish addendum — 2026-08-16 00:08 +08:00

The next visual pass applies the Design Brain, Product Craft, composition, and
anti-AI-writing rules to the remaining model-average signals in the surface.
It is deliberately small: direct work language, less all-caps metadata, and
source rows as the visual unit. It adds no feature and no AI capability.

### Implemented slice

- `Margin rule` became `Start with one line`, followed by the direct instruction
  `Write down one line you can defend.`
- `Read the record before you make the case` became `The source comes first`.
- `Each folio keeps the original line, source, date, and limit together.` became
  `Each row keeps the original line, source, date, and limit together.`
- The count now says `source rows`; the context note says `Source pack` and
  `This source pack stays on this page.`
- Content-oriented labels no longer force all-caps rendering. The red action
  rule and blue provenance rule remain the product's restrained signature.
- The loaded composition is slightly tighter on desktop and mobile so the
  first source row arrives earlier in the reading path instead of leaving the
  first viewport dominated by shell and hero spacing.

### Fresh static evidence

| Check | Result |
|---|---|
| KB plan compiler | PASS — contract score `100/100` |
| `npm test` | PASS — 4 files, 11 tests |
| `npm run lint` | PASS |
| `npm run build` | PASS — JS `index-vrFItkc1.js`, CSS `index-D9lZW6kV.css` |
| `git diff --check` | PASS |
| `python3 .../validate_qa_evidence_manifest.py` | PASS |
| `HOSTED_URL=http://127.0.0.1:4179/ npm run verify:hosted` | PASS — HTTP 200, current copy present, stale copy absent; `canonical_https=false` is expected on localhost |

### Browser evidence boundary

The preferred Codex Chrome Extension route was not available in the current
tool surface. The explicitly announced Computer Use fallback then stopped at
the system boundary because the Mac was locked and requested manual unlock. No
attempt was made to bypass the lock, and no previous screenshot or AX tree was
promoted to current-candidate evidence.

Current-candidate browser interaction, exact `390×844` mobile layout,
post-polish keyboard focus, current accessibility tree, app-origin console and
request trace, native screen reader output, canonical hosted behavior, and
participant/adoption evidence remain `未驗證`. The manifest is intentionally
blocked for those layers.

## Mobile overflow hardening addendum — 2026-08-16 00:31 +08:00

A supplemental headless render at `390×844` exposed a real mobile layout risk:
the blank-state heading and the fixed action button were retaining their
min-content width, so the right side of both could be clipped in the viewport.
This was not promoted as a mobile pass. The correction is intentionally small:
mobile grid/flex children now allow `min-width: 0`, headings can wrap within the
viewport, and the fixed action button can shrink and wrap while its label stays
available.

Static verification after the correction remains green: `npm test` (4 files,
11 tests), `npm run lint`, `npm run build` (`index-D4JhwZId.js` and
`index-gWMif4jN.css`), `git diff --check`, the KB plan scorer (`100/100`), the
QA manifest validator, and the localhost verifier all pass. A second
post-change 390×844 headless capture did not finish, and the preferred Chrome
Extension route remained unavailable because the Mac was locked. Therefore the
mobile correction, exact no-overflow geometry, fixed-action reachability,
loaded source-row view, keyboard focus, AX tree, native AT, canonical hosted
behavior, and participant/adoption layers remain `未驗證`.

## Current-candidate mobile source-first addendum — 2026-08-16

This addendum supersedes the earlier `未驗證` statements above for the local
current candidate only. It records the small mobile composition correction in
contract [83](./83-mobile-source-first-reading-contract-2026-08-16.md): the
loaded pack description is bounded, the secondary `Add signal` action keeps an
explicit accessible name in a compact icon slot, the source heading stays on
one row, and the fixed action bar retains a 44px button without extra vertical
padding. Desktop rules and the source/claim/human-review boundaries were
preserved.

### Evidence route and exact environment

- Route: headless Google Chrome 151.0.7922.138 via CDP at
  `http://127.0.0.1:4179/`; this is a browser fallback, not the Codex Chrome
  Extension route. Computer Use also reported the Mac locked; no bypass was
  attempted.
- Locale: `en-US`.
- Mobile viewport: exact `390×844`, device scale factor `1`, mobile emulation
  enabled; the browser layout width is `375px` because of the scrollbar.
- Desktop viewport: exact `1280×900`, device scale factor `1`, desktop
  emulation.
- Current local assets: JS `index-DCv340NQ.js`, CSS `index-BTUYiTwc.css`.
- Visual artifacts inspected in this run: `/tmp/pm-signal-lab-loaded-390-final.png`
  and `/tmp/pm-signal-lab-loaded-1280-final.png`.

### Current geometry evidence

| Surface | Fresh result | Interpretation |
|---|---|---|
| Loaded mobile pack | `y=487.875..674.21875` | Pack context remains visible but no longer fills the reading path. |
| Mobile source heading | `y=686.21875..712.8125` | `The source comes first` arrives directly after the pack. |
| First source row title | `y=753.8125..797.8125` | Full title ends before the fixed action bar. |
| Fixed mobile action | `y=798..844`; button `44px` high | Primary action remains reachable without covering the source title. |
| Mobile overflow | document/body `scrollWidth=375` at layout width `375` | No horizontal overflow in the current loaded state. |
| Desktop source path | pack `y=419.21875..600.46875`; heading `y=626.46875..682.90625`; first row `y=698.90625` | Desktop workpaper remains aligned and the mobile bar is absent. |
| External resources | `[]` | Current preview requested only same-origin assets during the checked page state. |

### Current fallback behavior trace

The fresh current-candidate trace waited for each React state transition before
reading the next result:

1. Blank state showed `Start with a source line`, `Open the sample worksheet`,
   a `390×844` viewport, and no horizontal overflow.
2. Sample load produced `Support draft review: deciding what to test next`,
   four source rows, `The source comes first`, and a source title that ended at
   `y=797.8125`, before the fixed action at `y=798`.
3. `View source` changed `aria-expanded` to `true`, showed `Source excerpt`,
   and preserved the original source content in the session.
4. `Start review` opened `Check the claim against the line` with three claim
   rows and an `Accept claim` control.
5. Drafting before review stayed in Verify and showed
   `Review the selected claim before drafting the smallest experiment.`
6. Expanding the first claim showed `Source mapping`; accepting it produced
   `Claim accepted...` and a reviewed/source-backed claim state.
7. Decide opened `Name the smallest test`, `Ready for confirmation`, and seven
   editable brief fields. Ship opened `Take a brief someone can challenge` with
   a memo preview.
8. The pilot note opened. Preparing without the privacy checkbox blocked with
   `Please confirm that this report contains no customer data...`; after the
   checkbox was confirmed, the local field note appeared with
   `This is a field note, not a validation result.`
9. Refresh returned to the blank sheet. The first Tab reached the named
   `Skip to main content` link.
10. A current Chrome AX snapshot contained 152 nodes, eight named interactive
    controls, and zero unnamed buttons, links, or textboxes in the inspected
    tree. This remains Chrome AX evidence, not native screen-reader evidence.
11. Runtime boundary check returned `qaErrors=[]` from the page harness and an
    empty external-resource list. No GitHub, provider, telemetry, or raw-signal
    upload was introduced.

One exploratory flow initially read the loaded geometry before resetting a
scroll position restored by the browser reload. The exact geometry table above
comes from a fresh current-asset capture after explicitly returning to the top;
the async state waits and scroll-top precondition are now part of the fallback
procedure. This is a harness correction, not evidence to hide.

### Current release boundary

This is a scoped local browser fallback PASS for the listed states. The
preferred Chrome Extension behavior trace remains `未驗證`; native VoiceOver,
NVDA, TalkBack, physical-device touch, hosted Pages behavior, non-owner
international PM sessions, adoption, traffic, and GitHub stars remain separate
gates. The current local evidence does not authorize merge, deploy, or a claim
of virality or 10,000 stars.

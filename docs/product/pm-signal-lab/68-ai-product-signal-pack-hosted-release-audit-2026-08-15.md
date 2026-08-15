# AI product signal pack — hosted release audit

Date: 2026-08-15
Release commit: `70bbb44a6ec17e68687fa3307cb76ff3744223df` (`Make the sample AI PM-specific (#36)`)
Previous public parent: `d9f9c3e5f2ce3b7cdc452cae8e3e9956edc7029f`
Canonical URL: [https://asdc163.github.io/pm-signal-lab/](https://asdc163.github.io/pm-signal-lab/)
Browser route: Playwright CLI fallback; the configured Codex Chrome Extension route was not callable in this session
Release status: hosted release gate complete for this commit; product-learning and native assistive-technology gates remain open

## Outcome

The merged public demo serves the AI PM-specific deterministic fixture and the
canonical browser flow works at the tested desktop and mobile viewports. The
source-to-claim path, evaluation-review row, AI PM experiment brief, Markdown
export, local-only boundary, and privacy-gated feedback handoff are visible in
the hosted page.

This is a release-layer result. It is not a claim of real-user usability, live
model quality, benchmark validity, adoption, traffic, or GitHub growth.

## Release evidence manifest

| Evidence | Current result | Link / artifact |
|---|---|---|
| PR and review boundary | PASS: PR #36 merged to `main` after CI success | [PR #36](https://github.com/asdc163/pm-signal-lab/pull/36) |
| CI | PASS: `verify` completed; Test, Typecheck, and Build passed | [CI run 31875189017](https://github.com/asdc163/pm-signal-lab/actions/runs/31875189017) |
| GitHub Pages deploy | PASS: build, artifact upload, and deployment completed | [Deploy run 31875218399](https://github.com/asdc163/pm-signal-lab/actions/runs/31875218399) |
| Hosted smoke workflow | PASS: canonical HTTPS, bundle, and current-copy checks completed | [Hosted smoke run 31875239100](https://github.com/asdc163/pm-signal-lab/actions/runs/31875239100) |
| Canonical HTTP verifier | PASS at `2026-08-15T08:45:03.475Z` UTC; HTTP 200; `en-US`; expected title; hashed JS/CSS 200; current strings present; stale strings absent; `canonical_https: true` | `npm run verify:hosted` output recorded in this audit |
| Hosted first-run desktop | PASS: source-first job, AI PM sample line, local boundary, sample action, and own-signal action visible at 1280×900 | [`ai-pm-fixture-hosted-first-run-1280.png`](./assets/qa/ai-pm-fixture-hosted-first-run-1280.png) |
| Hosted loaded desktop | PASS: four folios, `Evaluation review`, `24 cases`, and review docket visible at 1280×900 | [`ai-pm-fixture-hosted-loaded-1280.png`](./assets/qa/ai-pm-fixture-hosted-loaded-1280.png) |
| Hosted first-run mobile | PASS: source-first hierarchy and sticky sample action visible at 390×844 | [`ai-pm-fixture-hosted-first-run-390.png`](./assets/qa/ai-pm-fixture-hosted-first-run-390.png) |
| Hosted loaded mobile | PASS: source ledger, context rail, and sticky `Start review` action visible at 390×844 | [`ai-pm-fixture-hosted-loaded-390.png`](./assets/qa/ai-pm-fixture-hosted-loaded-390.png) |

The deploy and smoke workflows emitted a GitHub Actions annotation that Node.js
20-targeting actions are being forced to Node.js 24. The workflows passed; this
is recorded as CI maintenance debt, not hidden as a release failure.

## Canonical HTTP and asset verification

The fresh verifier checked:

- final URL stayed `https://asdc163.github.io/pm-signal-lab/` with no redirect;
- HTTP status was `200` and the page declared `lang="en-US"`;
- title was `PM Signal Lab — Product signals to decisions`;
- hashed assets were `/pm-signal-lab/assets/index-DM-s3jB8.js` and
  `/pm-signal-lab/assets/index-BistJMWl.css`, both HTTP `200`;
- the current bundle contained `AI support copilot`, `Evaluation review`,
  `source or freshness`, `copy is not resolution`, and current workflow copy;
- the current bundle did not contain the retired generic fixture, old activity
  labels, old local-preview labels, or other forbidden stale strings;
- the result had `assets_ok`, `current_copy_present`, `stale_copy_absent`, and
  `canonical_https` all set to `true`.

The verifier is read-only. It did not mutate GitHub, submit an issue, collect
telemetry, or call an external model provider.

## Fresh hosted browser trace

Environment: Playwright CLI fallback session `ai-pm-local`; canonical URL;
English-first page; 1280×900 desktop and 390×844 mobile. The preferred Chrome
Extension route was unavailable, so these are browser fallback results rather
than Chrome Extension sign-off.

| Case | Execution | Result | Evidence |
|---|---|---|---|
| H-001 fresh desktop | Opened the canonical URL in a fresh navigation at 1280×900 | PASS: `Put one signal on the desk`, current work, source-first quote, `Open the sample worksheet`, `Add your own signal`, and local boundary were visible | Snapshot `page-2026-08-15T08-45-16-834Z.yml`; screenshot above |
| H-002 load sample | Selected `Open the sample worksheet` | PASS: `AI support copilot: deciding what to test next`, four source rows, and three candidate claims were visible | Snapshot `page-2026-08-15T08-45-34-622Z.yml` |
| H-003 evaluation source | Selected the fourth `View source` control | PASS: `Evaluation review: coverage misses the stop condition`, original content, `Demo evaluation review · 24 cases`, and `Hide source` were visible | Snapshot `page-2026-08-15T08-45-53-405Z.yml` |
| H-004 Verify | Selected `Start review` | PASS: Source-backed, Needs your review, Missing evidence, source mapping, and current limitations were visible | Snapshot `page-2026-08-15T08-46-03-437Z.yml` |
| H-005 human acceptance | Selected `Accept claim` on the source-backed claim | PASS: `1 of 3 claims reviewed · 1 accepted` and source/limitation feedback were visible | Snapshot `page-2026-08-15T08-46-14-049Z.yml` |
| H-006 Decide | Selected `Draft smallest experiment` | PASS: AI support-copilot direction, source/freshness hypothesis, primary metric, guardrail, five-PM smallest test, and decision rule were editable and visible | Snapshot `page-2026-08-15T08-46-24-628Z.yml` |
| H-007 Ship | Selected `Export decision brief` | PASS: `Evidence summary`, `Known limits`, `Smallest experiment`, `Not covered`, and text fallback were visible | Snapshot `page-2026-08-15T08-46-34-411Z.yml` |
| H-008 copy | Selected `Copy Markdown` | PASS: `Markdown copied. You can paste it into a GitHub issue or PRD.` appeared; no issue was opened or submitted | Snapshot `page-2026-08-15T08-46-47-080Z.yml` |
| H-009 download | Selected `Download .md` | PASS: browser emitted `Downloaded file pm-signal-decision-brief.md`; the deterministic output matched the committed sample artifact's substantive sections | Download event at `2026-08-15T08:46:56.473Z` UTC |
| H-010 mobile empty | Reloaded at 390×844 | PASS: mobile stepper, literal source-first copy, and sticky sample action were visible | Snapshot `page-2026-08-15T08-47-17-724Z.yml`; screenshot above |
| H-011 mobile loaded | Selected the mobile sample action | PASS: four source rows, context note, and sticky `Start review` action were visible | Snapshot `page-2026-08-15T08-47-48-791Z.yml`; screenshot above |
| H-012 mobile geometry | Measured `window.innerWidth`, document scroll width, and mobile action bar | PASS: viewport `390`, scroll width `390`, `hasHorizontalOverflow: false`, action display `flex`, action bottom `844` | Playwright evaluation during the fresh hosted mobile run |
| H-013 console / requests | Inspected browser console and static requests | PASS: 0 console messages, 0 errors, 0 warnings; only same-origin HTML, JS, CSS, and favicon requests were observed | `console` and `requests --static` output from the same hosted session |

The hosted screenshots were visually inspected after capture. The first-run
desktop remains a quiet field sheet with the product job, source quote, and one
primary action. The loaded desktop/mobile views make the evaluation row and
review docket part of the workbench without adding a chat wrapper, model
activity, gradient AI motif, or unsupported status chrome.

## Trust, privacy, and external-action boundary

- The hosted page states that content stays on the page, refresh resets it, and
  there is no login or external transfer.
- The sample is explicitly fictional and local; it does not claim a live model,
  benchmark, customer support queue, or external research.
- The accepted claim keeps its source mapping and limitation in the exported
  brief; the copied-response claim remains Missing evidence.
- The brief's `Not covered` section states that real-user completion, return,
  conversion, GitHub mutation, telemetry, and external adoption are not tested.
- The pilot note remains manual and privacy-gated. This hosted trace did not
  open the feedback form or submit an issue; the local QA record separately
  verified the refusal and field-note generation path.

## What is not covered

- Codex Chrome Extension foreground focus and tab-isolation sign-off for this
  exact release; Playwright CLI fallback was used.
- VoiceOver, NVDA, TalkBack, native mobile touch, hardware keyboard, low-vision
  zoom, and full WCAG 2.2 certification.
- Five-second comprehension, task-based usability, behavior traces,
  backtracking, abandonment, retention, conversion, and non-owner international
  PM sessions.
- Live model, provider, retrieval, prompt-injection, hallucination, benchmark,
  latency, cost, or AI output-quality evidence.
- Production telemetry, GitHub traffic, stars, forks, issue comments, adoption,
  or any result toward the 10,000-star target.

## Release decision and rollback

Release decision: accept the hosted release gate for commit
`70bbb44a6ec17e68687fa3307cb76ff3744223df`. The product-learning gate remains
open and the public pilot issue remains the next evidence source.

If a release-blocking regression is found, revert the reviewed feature boundary
to the previous public parent `d9f9c3e5f2ce3b7cdc452cae8e3e9956edc7029f` through
the normal GitHub PR path, then rerun the static, Pages, canonical HTTP, and
hosted browser checks. Do not rewrite history, delete the public repository, or
turn a failed hosted check into a claim of readiness.

The private `docs/github-star-growth-plan.md` remains untracked and was not
published. GitHub stars and adoption will only be reported from fresh GitHub
evidence and never inferred from this release audit.

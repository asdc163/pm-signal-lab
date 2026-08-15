# Hosted Release Audit — PM Signal Lab Subject-Specificity Pass

Date: 2026-08-15
Canonical surface: `https://asdc163.github.io/pm-signal-lab/`
Release commit: `03d12792003ac442119a2c4065c6f5a40a7e66eb`
Source commit: `cd5d5d8 Make the reviewed subject lead the PM work`
Locale: English-first `en-US`

## Release decision

**PASS for the canonical hosted owner-run release scope.** The Pages deploy
completed, the canonical HTTPS verifier returned HTTP 200 with the new bundle,
and a fresh headed Chromium fallback trace confirmed the PM-first title,
subordinate subject cue, source review, human claim decision, decision-brief
export, privacy recovery, refresh reset, mobile reflow, keyboard skip link,
zero console errors/warnings, and static-only requests.

The release does not claim non-owner comprehension, international adoption,
model quality, retention, traffic, GitHub stars, or a 10,000-star outcome.
Those require separate evidence and remain open. The browser evidence was
owner-run because the intended Chrome Extension route was unavailable in this
task; the fallback route is documented instead of being presented as Chrome
Extension or native assistive-technology evidence.

## Change under audit

The loaded worksheet now leads with the PM work object:

`Support draft review: deciding what to test next`

The AI relationship remains explicit as subordinate context:

`Subject under review · AI-assisted support drafting · deterministic sample`

This preserves AI-PM portfolio relevance without making the shell read like an
assistant persona. The fixture wording also uses `support draft` rather than
an assistant-led first-person voice. The stable fixture id remains unchanged,
so the review and export workflow is the same product surface under a clearer
subject hierarchy.

## Release evidence chain

| Layer | Evidence | Result |
|---|---|---|
| Local implementation | Contract 72 and local QA report 73 | KB contract 100/100; QA handoff 92.5/100 |
| Pull request CI | PR #40, run `31880327455` | Test, typecheck, and build passed |
| Merge | PR #40 | Squash merge commit `03d12792003ac442119a2c4065c6f5a40a7e66eb` |
| Pages deployment | Run `31880356917` | Build, artifact upload, and deploy passed |
| Canonical static verifier | `HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted` at `2026-08-15T10:47:09.758Z` | HTTP 200, `en-US`, hashed assets 200, current copy present, stale copy absent |
| Hosted browser | Playwright CLI headed fallback, session `fieldfolio-hosted-subject`, `2026-08-15T10:47Z`–`10:52Z` | Fresh behavior and visual trace passed within the scope below |

The Pages run emitted a non-blocking GitHub annotation that several actions
targeting Node.js 20 are being forced to Node.js 24. It did not fail the run;
the action-runtime upgrade is a separate maintenance item.

## Canonical verifier result

The production verifier checked:

- URL: `https://asdc163.github.io/pm-signal-lab/`
- HTTP status: `200`
- HTML language: `en-US`
- Page title: `PM Signal Lab — Field notes for product decisions`
- JavaScript: `/pm-signal-lab/assets/index-wvgOuWUb.js` → `200`
- CSS: `/pm-signal-lab/assets/index-DS1sFMTX.css` → `200`
- Current strings: `Support draft review: deciding what to test next`,
  `Subject under review`, and `AI-assisted support drafting` present
- Forbidden stale visible title: `AI support copilot: deciding what to test next`
  absent
- Canonical HTTPS check: `true`
- Dynamic API, model-provider, telemetry, GitHub mutation, and upload requests:
  not present in the static verifier or browser request log

## Hosted browser behavior trace

| ID | Flow | Observed oracle | Evidence |
|---|---|---|---|
| H-074-001 | Fresh first run, desktop | Blank sheet, PM task, local handling boundary, and sample CTA are visible | [Hosted first-run desktop](./assets/qa/field-folio-subject-hosted-first-run-1280.png) |
| H-074-002 | Fresh first run, mobile | `390×844` layout keeps the first-run task and sticky sample action reachable | [Hosted first-run mobile](./assets/qa/field-folio-subject-hosted-first-run-390.png) |
| H-074-003 | Load sample, desktop | Loaded headline is `Support draft review`; subject cue is visible below the working-file title | [Hosted loaded desktop](./assets/qa/field-folio-subject-hosted-loaded-1280.png) |
| H-074-004 | Load sample, mobile | Subject context remains inside the single-column layout; loaded subject width is `343px` | [Hosted loaded mobile](./assets/qa/field-folio-subject-hosted-loaded-390.png) |
| H-074-005 | Inspect provenance | First `View source` exposed a `Source excerpt` and source identity/date context | Fresh hosted snapshot `page-2026-08-15T10-48-24-128Z.yml` |
| H-074-006 | Review a claim | `Start review` reached Verify; first source-backed claim was accepted and status became `1 accepted` | Fresh hosted snapshots `page-2026-08-15T10-48-28-110Z.yml` and `page-2026-08-15T10-48-40-136Z.yml` |
| H-074-007 | Draft and export | Decide exposed metric, guardrail, smallest test, decision rule, and owner; export showed `Decision brief is ready` | Fresh hosted snapshots `page-2026-08-15T10-48-43-169Z.yml` and `page-2026-08-15T10-49-00-283Z.yml` |
| H-074-008 | Privacy negative branch | Preparing without the checkbox returned the explicit private-data/token confirmation error | Fresh hosted snapshot `page-2026-08-15T10-49-25-401Z.yml` |
| H-074-009 | Privacy recovery branch | Safe synthetic fields plus confirmation produced `This is a field note, not a validation result.` | Fresh hosted snapshot `page-2026-08-15T10-49-47-062Z.yml` |
| H-074-010 | Refresh recovery | Reload returned to `Blank sheet` and `Open the sample worksheet` | Browser eval at `2026-08-15T10:50:01Z` |
| H-074-011 | Keyboard access | First Tab focused `Skip to main content`; Enter focused `main#main-content` with `tabindex=-1` and hash `#main-content` | Browser eval at `2026-08-15T10:50:32Z`–`10:50:37Z` |
| H-074-012 | Console and network boundary | `Total messages: 0 (Errors: 0, Warnings: 0)`; 17 observed requests were document/assets/favicon, all `200` | Hosted session console and static request log |

### Mobile oracle

At `390×844`, headed Chromium reported:

- `document.documentElement.clientWidth=375`
- `document.body.scrollWidth=375`
- `window.innerWidth=390`
- `bodyWidth <= viewportWidth`, so no horizontal overflow was observed
- The `15px` difference is the headed-Chromium vertical scrollbar, not a
  content-width defect

## Visual review

The fresh hosted screenshots preserve the field-folio visual language: a warm
paper work surface, ruled evidence rows, a quiet margin note, red next-action
mark, and blue provenance marks. The loaded desktop screenshot makes the
hierarchy legible in one frame: `Check what this line supports` → `Support draft
review` → `Subject under review · AI-assisted support drafting` → source ledger.
The mobile screenshot keeps the subject context within the content column and
keeps the `Start review` action visible in the sticky bottom bar.

This is an owner-run visual inspection, not a participant preference test or a
claim that every international reader will interpret the hierarchy correctly.

## Evidence boundary

Not covered by this audit:

- Chrome Extension foreground focus and existing Chrome-profile behavior.
- VoiceOver, NVDA, TalkBack, browser zoom, forced colors, reduced motion, and
  real-device touch behavior.
- Non-owner international PM, founder, designer, or engineer sessions.
- Five-second paraphrases, SEQ, field-note triage, or consented user research.
- Live model quality, prompt injection, retrieval, hallucination, latency,
  cost, provider safety, login, persistence, telemetry, or API mutation.
- GitHub adoption, stars, traffic, retention, contribution, or the 10,000-star
  target.

The public repository currently has no connected model provider, analytics SDK,
login, persistence, or GitHub write path for this demo. That absence is a
scope boundary, not evidence that a future connected version will be safe.

## Release rollback and next gate

If a stale-copy, layout, or trust regression is found, revert merge commit
`03d12792003ac442119a2c4065c6f5a40a7e66eb` and rerun the local verifier,
canonical verifier, and hosted browser trace. Do not silently patch the hosted
bundle or call a local preview a release.

The next product-learning gate is five unguided international sessions and at
least three concrete field notes. Record what each person thought the product
was, whether they named the PM task before the AI subject, where they paused,
and what change they would try next. Until that evidence exists, this audit
supports a hosted release claim only, not a market or star-growth claim.

## Related evidence

- [Subject-specificity product contract](./72-less-ai-subject-specificity-contract-2026-08-15.md)
- [Subject-specificity local QA report](./73-less-ai-subject-specificity-local-qa-2026-08-15.md)
- [Public pilot issue #4](https://github.com/asdc163/pm-signal-lab/issues/4)

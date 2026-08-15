# PM Signal Lab — Less-AI Field Folio Hosted Release Audit — 2026-08-15

## Release result

The field-folio visual pass is live at the canonical public URL:

**[https://asdc163.github.io/pm-signal-lab/](https://asdc163.github.io/pm-signal-lab/)**

The release is English-first and local-first. The public surface now presents a
PM field folio with a source line, source folios, claim review, smallest-test
brief, and manual handoff. It does not present itself as a live model, an agent
activity feed, or a completed validation result.

This audit proves the current hosted bundle and the owner-run fallback browser
path. It does not prove non-owner comprehension, model quality, adoption,
retention, traffic, or GitHub-star growth.

## Release identity

| Item | Evidence |
|---|---|
| Repository | [asdc163/pm-signal-lab](https://github.com/asdc163/pm-signal-lab) |
| Pull request | [#38 Make the PM surface feel like a field folio](https://github.com/asdc163/pm-signal-lab/pull/38) |
| Merged commit | `32982ca85b56dca4e280a978f8ce27232ee33d31` |
| Source branch commit | `07d7211f0c86a0607d6df7e5b05970b53261b907` on `codex/less-ai-field-folio` |
| Prior rollback reference | `a4e995cc0d707f09138306f97903d4d60d6b7abf` |
| Locale | `en-US` |
| Current public URL | `https://asdc163.github.io/pm-signal-lab/` |
| Release mode | GitHub Pages static deployment from `main` |

## CI, Pages, and smoke evidence

| Gate | Result | Evidence |
|---|---|---|
| PR CI | PASS | [CI run 31877480784](https://github.com/asdc163/pm-signal-lab/actions/runs/31877480784) |
| Post-merge CI | PASS | [CI run 31877517584](https://github.com/asdc163/pm-signal-lab/actions/runs/31877517584) |
| Pages deploy | PASS | [Deploy hosted demo run 31877517579](https://github.com/asdc163/pm-signal-lab/actions/runs/31877517579) |
| Hosted smoke | PASS | [Verify hosted demo run 31877546695](https://github.com/asdc163/pm-signal-lab/actions/runs/31877546695) |
| Workflow warning | Non-blocking | GitHub annotated that several actions are being forced from Node.js 20 to Node.js 24; this is an infrastructure maintenance item, not a product-flow failure |

## Canonical HTTP and bundle verification

Fresh command:

```text
HOSTED_URL=https://asdc163.github.io/pm-signal-lab/ npm run verify:hosted
```

Checked at `2026-08-15T09:39:53.542Z`.

| Check | Observed result |
|---|---|
| HTTPS URL | PASS; `canonical_https=true` |
| HTML response | PASS; `200` |
| Language | PASS; `en-US` |
| Title | PASS; `PM Signal Lab — Field notes for product decisions` |
| Hashed assets | PASS; JS `index-sG6pgTgX.js`, CSS `index-DNHg1Bll.css`, all `200` |
| Current copy | PASS; all required field-folio strings present |
| Stale copy | PASS; old dashboard, worksheet, data-boundary, and reset wording absent |
| Cache / transport | `cache-control: max-age=600`, GitHub HTTPS, HSTS present in header readback |

The canonical HEAD request at `2026-08-15T09:39:54Z` returned HTTP/2 `200`
from GitHub Pages with `strict-transport-security` and the expected HTML
content type.

## Hosted browser route and environment

- Intended route: Codex Chrome Extension with Tommy's existing Chrome session.
- Current tool surface: `Browser disabled`; the Extension controls were not
  available.
- Executed route: Playwright CLI fallback with fresh sessions
  `fieldfolio-public`, `fieldfolio-public-mobile`, and
  `fieldfolio-public-loaded` against the canonical URL.
- Viewports: 1280×900 and 390×844.
- Computer Use and alternate browser automation bridges were not used.
- This is owner-run browser evidence. It is not foreground-focus evidence for
  the existing Chrome profile, native screen-reader evidence, or a participant
  study.

## Hosted behavior trace

| Flow | Observed result | Evidence |
|---|---|---|
| Fresh first run | `Write down the line you can defend`, `Blank sheet`, handling boundary, and one primary sample action were visible | DOM snapshot and [first-run desktop](./assets/qa/field-folio-hosted-first-run-1280.png) |
| Mobile first run | Compact workflow bar, first-run job, and sticky sample CTA were visible | [first-run mobile](./assets/qa/field-folio-hosted-first-run-390.png) |
| Open sample | Four source lines, three claims, and `Next mark` appeared | Hosted DOM snapshot and [loaded desktop](./assets/qa/field-folio-hosted-loaded-1280.png) |
| Inspect source | Evaluation review source 04 expanded to `Source excerpt` and could be hidden | Hosted direct click and snapshot |
| Verify and accept | `Start review` reached Verify; first claim changed to `Reviewed`, and sheet status showed `1 accepted` | Hosted direct clicks and snapshot |
| Decide and export | `Draft smallest experiment` reached `Ready for confirmation`; export showed the Markdown fallback | Hosted direct clicks and snapshot |
| Export boundary | Markdown began with `Handling note` and `refresh clears the sheet`; no stale `Data boundary` or `refresh resets it` remained | Hosted textbox readback |
| Copy | `Markdown copied. You can paste it into a GitHub issue or PRD.` appeared | Hosted direct click and status notice |
| Feedback privacy block | Unchecked `Prepare field note` showed the private-data confirmation warning | Hosted direct click and status notice |
| Feedback privacy allow | Safe synthetic values plus confirmation produced `This is a field note, not a validation result.` and manual-review copy | Hosted direct fill/check/click and Markdown snapshot |
| Mobile loaded state | `documentWidth=390`, `bodyWidth=390`, and `Start review` remained the visible next action | Hosted eval and [loaded mobile](./assets/qa/field-folio-hosted-loaded-390.png) |

## Hosted console and request evidence

- `fieldfolio-public` console: 0 messages, 0 errors, 0 warnings.
- `fieldfolio-public-mobile` request log: 4 static same-origin requests, all
  `200`: document, hashed JavaScript, hashed CSS, and favicon.
- No dynamic API request was observed. This supports the local-first boundary
  of this static release; it is not a formal hosted privacy or security audit.

## Visual review

The first-run desktop and mobile captures were manually inspected after the
Pages deployment. The warm paper shell, simple folio index, red correction
line, blue provenance mark, serif work statement, ruled records, and sticky
mobile action remain coherent in the hosted bundle. The loaded surface keeps
the source record as the main artifact and does not turn the right context into
a dashboard of fake activity.

The hosted screenshots support an owner-run visual claim only. “Less like AI”
and “understood by international users” remain product hypotheses until target
users complete the unguided trial and leave inspectable feedback.

## Trust and release boundaries

- No external model provider is connected.
- No login, database persistence, telemetry, raw-signal upload, GitHub API
  mutation, automatic issue submission, payment, or notification is connected.
- The fixture is fictional and deterministic; its AI language describes the
  product being reviewed, not a live assistant behind the shell.
- The `Experiment owner · TBD` field is intentionally honest; no real owner is
  invented.
- Stars are not a release-quality metric. Current adoption, traffic, and star
  movement are not inferred from this deployment.

## Rollback and next learning gate

No rollback was needed. If a post-release regression appears, the release can
be reverted to the prior hosted reference or the merge commit can be reverted,
then the canonical verifier and hosted browser trace must be rerun. Do not
delete the branch as part of this audit.

The next promotion gate is five unguided international sessions and three
triageable, evidence-safe field notes. Only after those results should the
project consider a provider adapter, telemetry, or read-only integration. This
audit must not be used as evidence that the 10,000-star goal has been achieved
or is forecast.

## Evidence not covered

- Codex Chrome Extension foreground-focus behavior.
- VoiceOver, NVDA, TalkBack, real-device touch, hardware keyboard, browser zoom,
  and native share/save behavior.
- Non-owner comprehension, task success, retention, conversion, adoption,
  traffic, issue comments, or GitHub stars.
- Live model quality, retrieval, freshness integration, prompt injection,
  provider failure, cost, latency, or AI evaluation regression.
- Formal CSP, security penetration, dependency audit, or production privacy
  review beyond the current static boundary checks.

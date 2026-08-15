# PM Signal Lab — design and accessibility polish hosted release audit

**Date:** 2026-08-15
**Canonical URL:** https://asdc163.github.io/pm-signal-lab/
**Published commit:** `acb1e31cb14dd484da9058a9935374a0c0bef516`
**Related local QA:** [`45-design-a11y-polish-local-qa-2026-08-15.md`](./45-design-a11y-polish-local-qa-2026-08-15.md)

## Release result

The English-first worksheet polish is live at the canonical Pages URL. The hosted static layer and a fresh Chrome Extension browser session both passed the tested release path. This proves the published preview at the recorded layer; it does not prove native assistive-technology quality, external adoption, retention, traffic, or GitHub star growth.

## Deployment evidence

| Layer | Result | Evidence |
| --- | --- | --- |
| Main commit | PASS | GitHub `main` resolves to `acb1e31cb14dd484da9058a9935374a0c0bef516`, merged by PR #12. |
| CI | PASS | [CI run 31858820558](https://github.com/asdc163/pm-signal-lab/actions/runs/31858820558). |
| Pages deploy | PASS | [Deploy run 31858820556](https://github.com/asdc163/pm-signal-lab/actions/runs/31858820556), including build, artifact upload, and Pages deploy steps. |
| Canonical HTML | PASS | `curl -sSIL https://asdc163.github.io/pm-signal-lab/` returned `HTTP/2 200`; `last-modified: Sat, 15 Aug 2026 02:18:17 GMT`. |
| Document metadata | PASS | `<html lang="en-US">`; title `PM Signal Lab — Product signals to decisions`. |
| Published assets | PASS | `assets/index-6CuCUb5h.js` returned `200 application/javascript`; `assets/index-B8jNbZns.css` returned `200 text/css`. |
| Published copy | PASS | The JavaScript asset contains `Worksheet`, `Source lines`, `Review claim`, `Test brief`, and `Decision brief`; the stale interface labels were not found in the asset search. |

The Pages workflow emitted a non-blocking GitHub Actions annotation that the actions target Node.js 20 while the runner forces Node.js 24. The deploy and build completed successfully; the annotation is an infrastructure maintenance item, not a product-flow failure.

## Hosted Chrome Extension browser evidence

Environment: fresh agent-created Chrome Extension tab at the canonical URL, default desktop viewport, reset between the local and hosted sessions.

| Flow | Result |
| --- | --- |
| Fresh navigation | PASS — title, `en-US`, `Load sample data`, and new worksheet copy were visible; old `Case 01`, `Case file`, `Review docket`, and `Case workflow` labels were not present in the live document text. |
| Load sample data | PASS — four evidence rows appeared and focus moved to the visible `Start review` action. |
| Source inspection | PASS — first `View source` became `Hide source`. |
| Verify | PASS — `Start review` opened Verify; the first source-backed claim could be expanded and accepted. |
| Decide | PASS — `Go to Decide` opened the test brief; a reviewed source-backed direction could be drafted. |
| Ship | PASS — `Export decision brief` opened Ship with one `Decision brief Markdown content` textarea and the success notice. |
| Pilot note privacy gate | PASS — preparing without confirmation was blocked with the explicit privacy notice. |
| Pilot note output | PASS — after confirmation, field-note output appeared with `This is a field note, not a validation result` and the manual feedback URL. |
| Hosted console | PASS — no `warn` or `error` entries were recorded for the hosted app origin during this flow. |

One initial browser assertion targeted the locally edited claim copy while the hosted fixture correctly still displayed its original deterministic claim. After reading the live DOM and selecting the actual source-backed claim, the hosted flow completed. This was a test-oracle correction, not a product failure.

## Trust and boundary confirmation

- The hosted preview still presents the local-only boundary, no login, no provider, no telemetry, no raw-signal transfer, and manual GitHub handoff.
- The hosted decision brief preserves source mapping, limitations, and `Not covered` language.
- The pilot note remains privacy-gated, inspect-before-sharing, and manually submitted.
- No GitHub issue, profile, repository setting, star, or external account mutation was performed by the product flow.

## Coverage gaps

- **Native VoiceOver / NVDA / TalkBack:** `Not verified`. The Chrome Extension semantic/focus oracle is not a native assistive-technology sign-off.
- **Real international PM sessions:** `Not verified`. Recruitment remains an open request in [pilot issue #4](https://github.com/asdc163/pm-signal-lab/issues/4); the issue currently has no tester comments recorded in this audit.
- **Stars, traffic, retention, and adoption:** `Not verified`. Current repository stars are a GitHub fact to recheck independently, not a result of this release.
- **Profile optimization:** `Not verified` / separately blocked by the GitHub token lacking the `user` scope; no account-profile mutation was attempted in this release.

## Hosted release decision

**Canonical hosted preview gate: PASS for the tested public path.** The product is published and directly exercised at the canonical URL. Continue to describe it as a public preview and keep the coverage gaps above visible until real tester evidence and native assistive-technology coverage exist.

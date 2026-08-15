# PM Signal Lab — formal hosted demo release contract

**Date:** 2026-08-15
**Canonical demo:** https://asdc163.github.io/pm-signal-lab/
**Product boundary:** English-first, static, local-first PM evidence workbench

## Decision

Promote the GitHub Pages surface from an informal `preview` link to a formal hosted demo surface with a reproducible release contract.

`Formal hosted demo` means that a stranger can open one canonical HTTPS URL, load the deterministic sample, complete the product path, understand the local-only boundary, and report one observation without credentials or maintainer help. It does not mean that the product has a backend, persistence, external AI provider, production customer adoption, or a completed accessibility sign-off.

## User job

An international PM, founder, designer, or product engineer should be able to open the English demo, move from a source line to a reviewed claim and smallest test, inspect the decision brief, and prepare a privacy-gated field note for manual feedback.

## Release contract

### Must be true

- The canonical URL resolves over HTTPS with HTTP `200`.
- The document declares `lang="en-US"` and the expected PM Signal Lab title.
- The current hashed JavaScript and CSS assets are reachable.
- The hosted bundle contains the current margin-note, review-docket, source-boundary, and pilot-note copy.
- The hosted bundle does not contain the retired `What needs your attention` or `context-stats` presentation.
- A successful Pages deployment automatically triggers the hosted smoke workflow.
- A scheduled smoke workflow checks the canonical URL even when no new code is being released.
- A fresh Chrome Extension session can complete `Collect → Verify → Decide → Ship` and reach the manual feedback boundary.
- The public demo states that content stays in the current page, refresh resets it, and no issue is submitted automatically.

### Must remain visible

- Source line, source identity, date, and limitation.
- Candidate claim versus human-reviewed decision.
- Primary metric, guardrail, smallest test, decision rule, and `Not covered`.
- `This is a field note, not a validation result.`
- Manual GitHub handoff and privacy confirmation.

### Must not be claimed by this contract

- Model quality, autonomous PM capability, production readiness, viral growth, or customer adoption.
- Native VoiceOver, NVDA, TalkBack, or other screen-reader sign-off based only on DOM semantics.
- Five completed external PM sessions before issue evidence exists.
- Any star target or traffic outcome.

## Implementation boundary

- `scripts/verify-hosted-demo.mjs` performs read-only HTTPS, HTML, asset, current-copy, and stale-copy checks with Node's built-in `fetch`.
- `.github/workflows/hosted-demo-smoke.yml` runs after a successful Pages deployment, on a daily schedule, and on manual dispatch.
- `package.json` exposes the same check as `npm run verify:hosted` for a maintainer-local run.
- No login, database, telemetry, external model, raw-signal upload, GitHub mutation, or automatic issue submission is introduced.

## QA matrix

| user archetype | starting state | job | success signal | boundary |
| --- | --- | --- | --- | --- |
| First-time international PM | Fresh canonical URL | Understand the product and begin | English first-run state, sample action, task path, and boundary are visible | Five-second comprehension by a non-owner remains unverified until a real session. |
| Evidence reviewer | Loaded sample | Trace source → claim | Source folio, original line, limitation, review docket, and human review actions are usable | Fixture is deterministic and not customer evidence. |
| Decision owner | One claim accepted | Name the smallest test | Decision brief exposes metric, guardrail, rule, owner, and `Not covered` | It is a proposed test, not an observed outcome. |
| Keyboard user | Fresh page with browser focus | Complete the path without a mouse | Tab / Enter traversal reaches sample, review, claim decision, export, and pilot note | Native assistive-technology announcement remains unverified. |
| Privacy-conscious tester | Field-note form open | Prepare feedback without leaking raw evidence | Unconfirmed privacy blocks preparation; confirmed form creates local Markdown and manual link | No issue submission is automatic. |

## Rollout and rollback

1. Merge the contract and smoke workflow only after local tests, lint, build, and the direct hosted check pass.
2. Let Pages deploy from `main`.
3. Require the `Verify hosted demo` workflow to pass after the deployment.
4. Re-run the fresh Chrome Extension full path against the canonical URL.
5. If a required string, asset, or browser path fails, keep the prior hosted commit as the last known good static surface and fix forward through a small PR.

## Next evidence gate

The formal hosted demo is a release-quality surface, not adoption evidence. The next gate is still five unguided non-owner sessions and at least three concrete field notes. A repeated user-job problem should produce the next product slice; no further cosmetic expansion should be promoted only because the smoke workflow is green.

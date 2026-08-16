# Growth operating system — formal hosted demo

The goal is not to manufacture stars. The goal is to make the repository useful enough that the right people choose to save it, try it, discuss it, and return to it.

## North-star outcome

`qualified_star`: a GitHub star from someone who could plausibly use, review, contribute to, or share the product.

Stars are a lagging signal. They must be read together with repository visits, clones, issues, pull requests, repeat task sessions, and direct feedback. No number is treated as proof of product-market fit.

## Current pilot gate — 2026-08-15

- A prior English-first hosted preview is live at [asdc163.github.io/pm-signal-lab](https://asdc163.github.io/pm-signal-lab/); the current PR #44 candidate is not deployed until it is explicitly merged and a fresh canonical smoke/browser audit passes.
- Distribution status is `HOLD`: do not send the prepared session kit or treat issue #4 replies as current-candidate evidence while the canonical URL serves the prior bundle.
- The public pilot is pinned as [issue #4](https://github.com/asdc163/pm-signal-lab/issues/4), with `user-session` and `needs-triage` labels.
- The English-first human-reviewed outreach drafts and operating rules are in the [international pilot launch kit](./international-pilot-launch-kit-2026-08-15.md); no automatic public posting is enabled.
- The current official-rule readback and channel ordering are in the [international pilot channel research](./international-pilot-channel-research-2026-08-16.md); every channel remains `HOLD` until the hosted release gate passes.
- The next evidence gate is five unguided sessions from international PMs, founders, designers, or product engineers. A session report is one environment-level observation, not general usability or adoption evidence.
- Until those sessions exist, the operating decision is `Iterate / recruit`, not `Scale`. No provider integration, telemetry, automated GitHub submission, or star-oriented campaign is justified by the current evidence.

## Weekly operating loop

1. **Listen** — review issues, discussions, search questions, and current product-workflow pain without collecting private evidence.
2. **Choose one job** — select the smallest product or documentation improvement that removes a real adoption obstacle.
3. **Build** — make one narrow change with an acceptance criterion and rollback path.
4. **Verify** — run tests and personally operate the affected journey across normal, friction, mismatch, recovery, mobile, and trust states.
5. **Package** — update README, changelog, screenshots, or an example so a new visitor can understand the change quickly.
6. **Share** — create platform-native drafts from the source change; human review remains required for public posts and community replies.
7. **Learn** — record what was observed, what was not measured, and which regression case should be added next.

## Portfolio pillars

- Evidence-first product thinking.
- AI assistance with clear limits and human ownership.
- Small experiments with metrics and guardrails.
- Real implementation and browser evidence.
- Honest open-source maintenance.

## Automation boundary

Safe automation may run tests, prepare release notes, open a draft issue, check repository health, and produce a review queue. It must not fake users, auto-star, auto-follow, auto-like, mass-reply, impersonate community members, publish unsupported claims, or mutate external product resources without an explicit review gate.

The repository now has a [`weekly-growth-pulse.yml`](../../.github/workflows/weekly-growth-pulse.yml) workflow. It runs on a weekly schedule or by manual dispatch, reads public repository metadata, open feedback items, recent CI runs, the latest main commit, and release state, then uploads a 30-day JSON artifact and writes a workflow summary. GitHub traffic remains explicitly `not_collected` because it is maintainer-authenticated data. The pulse is an operating aid, not adoption instrumentation and not a star-growth guarantee.

The first manual dispatch hit a real runner argument-limit failure and was repaired before the corrected path was accepted. The hosted release, the failed-run learning signal, and the successful artifact snapshot are recorded in the [latest hosted release audit](../../docs/product/pm-signal-lab/48-signal-review-growth-pulse-hosted-release-audit-2026-08-15.md).

## Promotion gate

Do not promote a feature because it looks polished. Promote it only when the release evidence says what was tested, what users can do, what remains unverified, and how the change can be rolled back.

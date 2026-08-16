# International pilot launch kit — 2026-08-16

Status: HOLD — draft for human review. Do not distribute these invitations
until the current PR #44 candidate has been merged, deployed, and rechecked at
the canonical HTTPS URL. This is an operating aid, not an automatic posting
plan.

Channel-specific readiness and current platform sources are tracked in the
[international pilot channel research](./international-pilot-channel-research-2026-08-16.md).

## Release precondition

The canonical Pages URL currently serves the prior bundle, while PR #44 holds
the current source-first candidate. Sending this kit before the release gate
passes would mix old-product sessions with current-product evidence.

Before using any channel draft:

1. Obtain explicit approval for the merge and Pages deployment action.
2. Run the canonical HTTPS verifier and a fresh Chrome Extension desktop/mobile
   behavior trace against the deployed candidate.
3. Record the served asset hashes, verifier result, and current URL in the
   hosted release audit.
4. Change this status to `READY FOR HUMAN REVIEW` only after those checks pass.

Until then, the public pilot issue remains a prepared queue, not proof of
recruitment, usage, or adoption.

## Goal

Recruit five people outside the maintainer's own account to complete one unguided five-minute PM Signal Lab trial and leave one concrete, privacy-safe observation.

The near-term goal is learning, not a star target. A GitHub star is a voluntary lagging signal; it cannot replace a completed session, a reproducible hesitation, or a useful issue. The repository must not claim adoption or traction before those signals exist.

## Audience

- Product managers working with interview, support, or product-observation evidence.
- Founders who need to turn scattered customer signals into a small next test.
- Product designers and researchers who care about source traceability.
- Product engineers evaluating practical, human-owned AI product workflows.

## Message contract

**Message job:** Give the right person a reason to try one real workflow and report one moment of friction.

**Source truth:** PM Signal Lab is a deterministic, local-first formal hosted demo. It keeps source lines next to candidate claims, asks for human review, and exports a decision brief. It currently has no external model provider, telemetry, login, or automatic GitHub mutation. The canonical bundle is checked after Pages deploys and on a daily read-only smoke run.

**Positioning:** A small evidence worksheet for moving from a product signal to a claim you can challenge and a smallest test you can name.

**Proof to link:**

- [Hosted demo](https://asdc163.github.io/pm-signal-lab/)
- [Five-minute session kit](./pm-session-kit.md)
- [Public pilot issue #4](https://github.com/asdc163/pm-signal-lab/issues/4)
- [Repository README](../../README.md)

Release note: these links currently describe or serve the prior public
preview. Do not present them as proof that PR #44 is live until the release
precondition above is complete.

**No-AI copy guard:** Do not say `AI-powered`, `autonomous PM`, `production-ready`, `validated`, `viral`, `used by`, `thousands`, or `10,000 stars`. Do not imply that the deterministic fixture proves model quality. Say exactly what a visitor can try and what remains unverified.

## Human-reviewed channel drafts

These drafts are prepared for editing. They must be adapted to the community's rules, posted by the account owner, and never mass-published or auto-replied.

### LinkedIn draft

I built a small English-first PM worksheet for a problem I keep seeing: product signals arrive from different places, but the original line, the working claim, the limitation, and the next test rarely stay in the same line of sight.

PM Signal Lab is a local-first formal hosted demo. It takes a deterministic signal-review pack through:

`Collect → Verify → Decide → Ship`

You can trace each claim back to a source, keep an uncertain claim as a hypothesis, and export a Markdown decision brief. There is no login, API key, external model, telemetry, or automatic GitHub submission.

I am looking for five PMs, founders, designers, or product engineers to run one unguided trial and tell me one place they hesitated. The most useful feedback is specific; a star is optional.

Try it: https://asdc163.github.io/pm-signal-lab/
Feedback path: https://github.com/asdc163/pm-signal-lab/issues/4

### Short post draft

I built an English-first PM evidence worksheet: source line → claim → smallest test.

It is local-first and deterministic for now. No login, API key, external model, telemetry, or automatic GitHub actions.

Looking for five people to run one unguided trial and report one concrete hesitation.

Demo: https://asdc163.github.io/pm-signal-lab/

### Community post draft

I am testing a small PM workflow, not announcing a finished platform.

The job: keep a product signal beside its source, review what the line can actually support, then turn the remaining uncertainty into the smallest test.

The hosted demo is English-first and local-first. It uses a deterministic sample pack, has no external AI provider, and does not upload or submit anything automatically. I am looking for five people who can complete one unguided trial and report where the workflow was unclear or untrustworthy.

If you try it, please report the browser/device, task result, one hesitation, one trust or recovery observation, and one change you would make. Please do not share customer data or private material.

Demo: https://asdc163.github.io/pm-signal-lab/
Session instructions: https://github.com/asdc163/pm-signal-lab/blob/main/docs/operations/pm-session-kit.md

## Operating rules

- Start with one useful invitation per relevant community; do not cross-post unchanged copy or argue with criticism.
- Read each community's current rules before posting. If the context does not allow project promotion, do not post.
- Reply manually and specifically. Acknowledge what the person actually tried; do not paste a generic thank-you.
- Never ask for a star in exchange for access, support, visibility, or a feature.
- Never fabricate testers, testimonials, usage numbers, issue activity, traffic, or star growth.
- Keep customer evidence out of public issues. Ask for de-identified observations only.
- Do not auto-post, auto-reply, auto-DM, auto-like, auto-follow, or use fake accounts.

## Weekly learning loop

1. **Prepare:** choose one product change and one honest reason it matters.
2. **Invite:** use one reviewed channel draft and the canonical demo/session kit.
3. **Observe:** read public issue comments, GitHub traffic snapshots, stars, forks, and clone signals as separate external indicators.
4. **Triage:** record the environment, task result, hesitation, trust/recovery signal, and requested change; separate owner-run QA from non-owner evidence.
5. **Fix:** ship one narrow, reversible improvement tied to the repeated problem.
6. **Re-run:** verify local and hosted behavior, then publish the next evidence note.

## Promotion gates

Do not move from `Iterate / recruit` to `Scale` until the repository has:

- five non-owner hosted task sessions;
- at least three reports with a concrete hesitation, trust/recovery observation, or requested change;
- a triage decision showing which repeated problem was fixed or intentionally deferred;
- a fresh hosted verification of the fix;
- no claim that stars, traffic, or a polished screenshot prove adoption.

Current state: a prior formal hosted preview is live, public pilot issue #4 is open, and the current PR #44 candidate still needs an explicit merge, Pages deploy, and fresh canonical browser audit. Non-owner sessions and adoption remain unverified.

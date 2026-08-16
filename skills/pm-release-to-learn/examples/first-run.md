# PM Release to Learn — first run

This is a fictional fixture for checking the skill contract. It is not a real
release, rollout, participant session, adoption signal, or growth result.

## Input

Release on the desk: fictional `support-review-copy-v0.3.0`, a documentation
and copy release that explains why a candidate claim is source-backed and what
the review status permits.

Current proof:

- fictional release tag and commit are recorded in a release note;
- fictional local checks, CI, and hosted smoke are marked passed;
- the canonical hosted path is available in the fictional fixture;
- the release has no backend, telemetry, or external model provider.

The maintainer wants to move from a public preview into a small international
PM pilot and learn whether the first action and status boundary are clear.

## Release on the desk

- Artifact: fictional `support-review-copy-v0.3.0`.
- Version/commit: `fictional-release-003`; current status is a fictional
  verified public preview.
- Canonical URL: `https://example.invalid/support-review-copy-v0.3.0` in this
  fixture only; no real hosted evidence is claimed.
- Owner: fictional product maintainer.
- Decision: whether to open a bounded pilot, not whether the product is
  production-ready or adopted.
- Known limitation: no telemetry, real participant evidence, or tested
  rollback execution is supplied.

## Evidence boundary

- Release proof: fictional local, CI, and hosted checks support that the sample
  artifact is inspectable; they do not prove user value or adoption.
- Rollout exposure: `Not run`; no external session is supplied.
- Participant evidence: `Not provided`.
- Traffic, activation, retention, stars, and forks: `Not measured`.
- Decision supported: prepare a five-minute pilot plan with a manual receipt.
- Decision not supported: move to production, claim comprehension rate, or
  forecast growth.

## Rollout boundary

- Current stage: `public preview`.
- Next stage: `pilot` for five international PMs, designers, founders, or
  product engineers who can use a sanitized fictional or real note.
- Eligibility: one person, one compatible client or browser, one five-minute
  review session, and no private data in the feedback note.
- Exposure path: open the preview link, read the first-run instruction, and
  complete one claim-review task.
- First action: identify which source supports the claim and what the status
  allows.
- Expected artifact: a de-identified session receipt with one observation.
- Production: deferred until a separate gate has participant and guardrail
  evidence.

## Observation plan

- Learning question: can a first-time reviewer state the source boundary and
  the status boundary after one unguided five-minute session?
- Primary learning signal: a sanitized manual observation records whether both
  boundaries were stated accurately.
- Unit: one eligible completed session; proposed, not collected.
- Exposure: the person opens the fictional preview and reaches the review step.
- Window: one five-minute session; proposed.
- Source/owner: session receipt owned by the fictional maintainer; no telemetry.
- Status: `Proposed`.

## Guardrails and rollback

### Guardrail: privacy-safe feedback

- Rule: the receipt contains only a source/session code, safe context, a
  paraphrased observation, and one improvement.
- Failure action: `Hold` the pilot path and remove the unsafe field.

### Guardrail: status is not mistaken for production approval

- Rule: the reviewer-facing copy must state that the status is a review state,
  not a production release decision.
- Failure action: `Revise` the copy before another session.

### Rollback

- Candidate: fictional `support-review-copy-v0.2.0`.
- Trigger: stale link, broken first action, raw sensitive data in the receipt,
  or status wording that implies production approval.
- Scope/permission: fictional maintainer reviews and restores the previous
  preview tag; no automatic rollback is enabled.
- Confirmation: re-open the canonical path, check the first action, and run the
  fictional smoke contract. Rollback execution is `Not run`.

## Feedback capture

Request only:

- client or workflow context, if safe;
- source/session code without identity;
- first action and where the reviewer hesitated;
- whether source and status boundaries were clear;
- one limitation or improvement.

Do not request names, emails, private tickets, credentials, raw notes, or a
testimonial. A star is not requested.

## Decision and learning writeback

Proposed decision: `Continue` to a bounded pilot after the owner reviews the
privacy and rollback path. The fixture supports a pilot operating plan, not a
user outcome or growth claim. Write the first observation to the public pilot
issue only after a human reviews the sanitized receipt. If a concrete mismatch
appears, route it to `pm-feedback-to-fix`; if a measured result is collected,
route it to `pm-experiment-to-readout`.

## Not covered

- Real release proof, participants, task completion, traffic, adoption, or
  retention
- Production readiness, rollback execution, or business impact
- Model quality, provider behavior, cost, latency, accessibility, or
  localization
- Channel performance, stars, forks, or causality

## Implementation handoff

- Maintainer: verify the current preview link and rollback candidate.
- Design/content: check the first action and status-boundary sentence.
- Pilot owner: review each sanitized receipt before publication.
- QA: run the first action, privacy export, stale-link recovery, and rollback
  confirmation when the fixture becomes executable.
- Writeback: record the observation with the release version and source code.

## Review ask

`Continue` to the bounded pilot after the owner approves the privacy-safe
receipt and rollback path. Unresolved risk: the fictional first action may be
clear only because the maintainer already knows the workflow.

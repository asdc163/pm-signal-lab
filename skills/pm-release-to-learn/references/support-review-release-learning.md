# Worked example: support-review release learning plan

This is a fictional fixture showing a release-to-learning operating plan. It
is not a real deployment, participant set, adoption result, or growth outcome.

## Release on the desk

Artifact: fictional `support-review-copy-v0.3.0`, a copy and status-boundary
release for an AI-assisted support-draft review workflow.

- Release identity: fictional tag `support-review-copy-v0.3.0`, commit
  `fictional-release-003`, canonical path
  `https://example.invalid/support-review-copy-v0.3.0`.
- Environment: fictional public preview; production is not in scope.
- Proof: fictional local checks, CI, and hosted smoke are recorded as current
  release proof. They support inspectability of the artifact only.
- Owner: fictional product maintainer.
- Limitation: no external participant session, telemetry, adoption readout, or
  rollback execution is supplied.
- Decision on the desk: may the owner open a bounded five-minute pilot?

## Evidence boundary

| Layer | Source/status | Supports | Does not prove |
|---|---|---|---|
| Release proof | Fictional local/CI/hosted checks | The preview artifact can be inspected | User value, production readiness, or adoption |
| Rollout exposure | Not run | Nothing yet | Audience size or activation |
| Participant/session | Not provided | Nothing yet | Comprehension, preference, or retention |
| Traffic/channel | Not measured | Nothing yet | Value, activation, or star causality |
| Rollback | Written candidate only | A recovery path can be reviewed | That the rollback has executed successfully |

The evidence is sufficient to plan a pilot, not to claim that the pilot has
started or that the release succeeded.

## Rollout boundary

### Stage: public preview → bounded pilot

- Audience: up to five international PMs, founders, designers, or product
  engineers who can complete one sanitized review session.
- Eligibility: one person, one compatible browser or client, one five-minute
  task, and no private customer material in the public receipt.
- Exposure: the person opens the canonical preview path and reaches the claim
  review step without a maintainer walkthrough.
- First action: identify the source supporting a claim and state what the review
  status allows.
- Expected artifact: a de-identified session receipt with release version,
  context, hesitation or mismatch, one limitation, and one improvement.
- Next-stage gate: human-reviewed receipts plus guardrail checks; production is
  deferred.
- Deferred: paid acquisition, broad channel variants, account creation,
  telemetry, automatic issue submission, and production rollout.

## Observation plan

- Learning question: can a first-time reviewer complete the first action and
  accurately state both the source boundary and the status boundary?
- Primary signal: one eligible session receipt records `clear`, `unclear`, or
  `not observed` for each boundary. This is a proposed qualitative signal, not
  a rate or user preference claim.
- Unit: one eligible completed session; repeated sessions from one person are
  kept identified as repeated context rather than independent participants.
- Exposure: preview link opened and claim-review step reached.
- Window: one five-minute session, proposed.
- Version/environment: `support-review-copy-v0.3.0`, public preview; do not pool
  another version or production environment.
- Source/owner: sanitized manual receipt, fictional pilot owner; no telemetry.
- Writeback: public pilot issue only after a human reviews the redacted receipt.

## Guardrails and rollback

### G1 — privacy-safe receipt

- Observation: receipt has only safe context, release version, source/session
  code, paraphrase, evidence status, and improvement.
- Threshold/status: proposed zero raw private fields; `Not run`.
- Failure: `Hold` publication and remove the unsafe content.

### G2 — trust boundary

- Observation: the copy does not make a review status sound like production
  approval.
- Threshold/status: proposed manual reviewer check; `Not run`.
- Failure: `Revise` copy before another exposure.

### G3 — first-action health

- Observation: canonical preview loads, current assets respond, and the first
  action can be completed or has a visible recovery path.
- Threshold/status: current release smoke must pass; participant result is
  `Not measured`.
- Failure: `Hold` the pilot and restore the previous preview.

### Rollback plan

- Restore candidate: fictional `support-review-copy-v0.2.0`.
- Trigger: stale canonical asset, broken first action, privacy leak, or trust
  boundary failure.
- Blast radius: public preview only; no production surface is changed.
- Permission: fictional maintainer approval; no automatic write or rollback.
- Confirmation: re-open the canonical path, run the smoke contract, inspect the
  first action, and record the result. Execution status: `Not run`.

## Feedback capture

Ask for one safe observation:

- client/workflow context and release version, if safe;
- source/session code without participant identity;
- first action completed or where it stopped;
- source-boundary and status-boundary clarity;
- one hesitation, recovery moment, limitation, or improvement.

Do not ask for a customer quote, testimonial, star, or private raw note. The
feedback route is a lead for product learning, not evidence of adoption or
channel performance.

## Decision and learning writeback

Proposed stage decision: `Continue` to the bounded pilot after the owner
reviews the receipt schema, G1–G3, and rollback candidate. The plan supports
operational readiness for a small pilot; it does not support production,
adoption, retention, business, or star claims.

After the first reviewed receipt:

- route a concrete reproducible mismatch to `pm-feedback-to-fix`;
- route a measured result with a defined denominator to
  `pm-experiment-to-readout`;
- route a new build boundary to `pm-decision-to-spec`;
- update the release proof and share pack only after the new evidence is
  independently verified.

## Not covered

- Real participants, session completion, prevalence, activation, adoption, or
  retention
- Traffic quality, channel performance, stars, forks, or causal attribution
- Production readiness, rollback execution, model quality, latency, cost, or
  provider behavior
- Accessibility, localization, other versions, or unrelated environments
- Whether the proposed first action improves a user outcome

## Implementation handoff

- Release owner: freeze version, URL, proof, stage, and rollback candidate.
- Content/design: verify the first action and status-boundary wording.
- Pilot owner: review every receipt before public writeback.
- QA: run current asset, first action, privacy, stale-link, and recovery checks.
- Learning owner: inspect one signal and one guardrail per session; do not
  summarize owner comments as external evidence.

## Review ask

`Continue` to the bounded pilot after human approval of the privacy-safe
receipt, G1–G3, and rollback confirmation path. Unresolved risk: the first
action may appear clear to maintainers while remaining unclear to first-time
readers.

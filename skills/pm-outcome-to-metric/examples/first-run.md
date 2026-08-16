# PM Outcome to Metric — first run

This is a fictional fixture for checking the skill contract. It is not a real
experiment, telemetry result, user study, adoption signal, or business metric.

## Input

Decision on the desk: Should the team test clearer evidence and status copy in
an AI-assisted support-draft review?

Desired outcome: a reviewer can tell which source supports a candidate claim
and what the current status allows before choosing the next review action.

Available context:

- The product is a fictional local fixture; no analytics or external provider
  is connected.
- The proposed test compares current copy with one revised explanation.
- Three fictional pilot notes report uncertainty, but no task completion count,
  baseline, or denominator was supplied.
- The team wants a proposed directional rule for a short comparison session.

## Decision on the desk

Decide whether to run a copy comparison. User job: review a candidate claim
without confusing evidence support with approval to ship. Current workaround:
open the source and ask a maintainer what the status means. Desired outcome:
accurate statement of the source boundary and allowed next action. Decision
owner: fictional product maintainer. Success is not measured.

## Outcome and context

- Target task: a PM, designer, or engineer reviews one fictional support-draft
  claim on the same desktop fixture.
- Exposure: the reviewer completes the claim-review step with either current or
  revised copy.
- Unit: one eligible completed review task, not one click or one generated
  claim.
- Window: the same five-minute comparison session; `Proposed`.
- Segment/version/environment: fictional reviewer, same fixture, desktop; other
  viewports and product versions are `Not covered`.
- Cost of doing nothing: the team may continue testing copy without knowing
  whether the evidence and status boundary is understood; this is a hypothesis,
  not a measured business cost.

## Evidence boundary

- Observed/reported: three fictional notes mention uncertainty; no raw user
  evidence is included.
- Inference: clearer copy may improve boundary comprehension; `Proposed`.
- Measurement status: baseline, target, telemetry, sample plan, and outcome
  quality are `Not measured`.
- Decision supported: whether to run a small comparison, not whether to ship
  the copy or claim adoption.
- Decision not supported: model quality, production safety, retention,
  conversion, business impact, or GitHub growth.

## Metric contract

- Name: `review_boundary_comprehension_rate`.
- Outcome: the reviewer accurately states both which source supports the claim
  and what the current status allows.
- Formula: eligible completed review tasks where both statements are accurate /
  eligible completed review tasks exposed to the copy variant.
- Unit: completed review task. Numerator and denominator are proposed, not
  collected.
- Window/exposure: same five-minute session, after the reviewer completes the
  claim review; `Proposed`.
- Segment/version: fictional desktop fixture; narrow viewport requires a
  separate comparison.
- Baseline: `Not measured`.
- Target: `Proposed` directional threshold of 4 accurate tasks out of 5
  eligible tasks, pending owner review. This is not completed research.
- Source/owner: manual session note owned by the fictional product maintainer;
  no telemetry exists.

## Guardrail and diagnostic contract

### Guardrail: privacy boundary remains intact

- Observation rule: the exported field note contains only a source/session ID,
  safe context, evidence status, and paraphrased result; no raw private input.
- Unit: one exported field note.
- Threshold: `Proposed` zero raw sensitive fields.
- Source/status: manual privacy review; `Not run`.
- Failure action: `Hold` the comparison and remove the unsafe field before
  sharing.

### Diagnostic: boundary-specific error

- Observation rule: record whether the source statement or status statement was
  inaccurate, without adding a severity score.
- Status: manual capture proposed; not a second primary metric.

## Instrumentation and privacy

- Primary metric data path: `proposed` manual capture in a de-identified note.
- Telemetry: `missing`; no event should be added without an approved privacy
  and instrumentation decision.
- Duplicate counting risk: one person repeating the same task must not be
  counted as independent eligible tasks unless the session method says so.
- Raw input: not copied into the public handoff.
- Owner: fictional product maintainer; analytics implementation is out of
  scope.

## Decision rule

- Proposed `Test`: run the copy comparison only after the owner accepts the
  manual capture and privacy review.
- Proposed `Continue`: if the proposed threshold is met and the privacy
  guardrail passes, compare another task context.
- Proposed `Hold`: if the denominator, task scoring, or privacy boundary is
  unclear.
- Proposed `Change`: if one boundary is repeatedly misunderstood while the
  other is clear. These rules are not pre-registered results.

## Not covered

- Real participants, real task completion, or real metric values
- Baseline, sample plan, prevalence, confidence, lift, causality, or business
  result
- Model quality, external provider behavior, latency, cost, or safety outcome
- Mobile, accessibility, localization, other versions, or production telemetry
- Adoption, retention, conversion, traffic, or GitHub stars

## Implementation handoff

- Design: draft one evidence sentence and one status-boundary sentence.
- Engineering: no telemetry change in this slice; confirm whether a future
  event can be privacy-minimized before implementation.
- Analytics/QA: review the manual scoring rule, denominator, privacy guardrail,
  and narrow-viewport separation.
- Writeback: record the de-identified session result beside the source IDs.
- Review decision: `Test` if the contract is accepted; otherwise `Need evidence`.

## Review ask

`Test` the proposed manual comparison after the owner reviews the denominator
and privacy path. Unresolved risk: the comprehension score may reflect the
reviewer's familiarity with the fictional fixture rather than the copy change.

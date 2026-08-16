# Worked example: support-review metric contract

This is a fictional fixture showing a measurement design before a test. It is
not a real metric, telemetry readout, user study, model benchmark, adoption
signal, or business result.

## Decision on the desk

Should a fictional AI-assisted support-draft review test a clearer evidence and
status explanation? The user job is to review a candidate claim, understand its
source support, and choose a bounded next action. The current workaround is to
open the source folio and ask a maintainer when the status is unclear. The
decision owner is a fictional product maintainer. A successful test would show
that the reviewer can state both boundaries without a walkthrough; it would not
by itself prove that the workflow is ready for production.

## Outcome and context

- Target task: one eligible reviewer completes one claim-review task in the
  fictional support-draft fixture.
- Trigger/exposure: the reviewer sees either the current copy or the proposed
  explanation-and-status copy.
- Desired progress: distinguish source support from the permission or status of
  the next action.
- Unit: completed eligible review task. A page view, click, generated claim, or
  model call is not the outcome unit.
- Window: the five-minute review session after exposure; `Proposed`.
- Segment/version/environment: fictional PM, designer, or engineer; same
  desktop fixture; narrow viewport and other versions are separate contexts.
- Doing nothing: the team keeps a comprehension hypothesis without a defined
  observation rule. This is a decision risk, not a measured business cost.

## Evidence boundary

| ID | Source or method | Supports | Does not prove |
|---|---|---|---|
| M1 | Fictional interview note, paraphrase | A reviewer may look for why a claim is source-backed | A comprehension rate or severity |
| M2 | Fictional usability note, paraphrase | The word `Ship` may sound like production approval | A launch or safety result |
| M3 | Proposed five-minute manual comparison | A way to observe the boundary comprehension outcome | That the comparison has been run |

The notes are qualitative and fictional. They support a proposed measurement
design, not a result. No baseline, denominator, sample plan, telemetry, model
version, or real participant data was provided.

## Metric contract

### Primary outcome: `review_boundary_comprehension_rate`

- User outcome: the reviewer accurately states which source supports the claim
  and what the status permits.
- Formula: eligible completed tasks where both statements are accurate /
  eligible completed tasks exposed to the selected copy.
- Numerator: one task counts only when an agreed reviewer rubric marks both
  statements accurate. Rubric status: `Proposed`.
- Denominator: eligible completed review tasks exposed to the copy variant;
  eligibility definition: `Proposed`.
- Unit/window: one completed task within the same five-minute session;
  `Proposed`.
- Exposure: the reviewer enters the claim-review state and sees the copy;
  `Proposed`.
- Segment/version/environment: fictional desktop fixture; viewport and task
  variants must be retained rather than pooled.
- Baseline: `Not measured`.
- Target: `Proposed` directional rule of 4 accurate tasks out of 5 eligible
  tasks, subject to owner review. This is not a benchmark or completed result.
- Source/owner: de-identified manual session note, fictional product
  maintainer; no telemetry exists.
- Decision use: choose whether to run another context comparison, not whether
  to claim adoption or production readiness.

## Guardrail and diagnostic contract

### G1 — privacy-safe handoff

- Guardrail: no raw private input appears in the exported note or public pilot
  comment.
- Observation rule: manual reviewer checks source/session ID, safe context,
  evidence status, paraphrased result, and removed sensitive fields.
- Unit: one exported note; threshold `Proposed` zero raw sensitive fields.
- Failure action: `Hold` the test and correct the capture path.
- Status: `Not run`.

### G2 — status-boundary trust

- Guardrail: the copy must not imply that a review status is production
  approval.
- Observation rule: reviewer paraphrases what the status permits; rubric and
  threshold are `Proposed`.
- Failure action: `Change` the copy or hold the comparison.
- Status: `Not run`.

### D1 — boundary-specific diagnostic

- Diagnostic: record whether the source statement, status statement, or both
  were inaccurate. Keep the exact context; do not turn it into a severity or
  prevalence number.
- Status: manual capture `Proposed`.

## Instrumentation and privacy

| Measure | Data path | Readiness | Risk or limitation |
|---|---|---|---|
| Primary outcome | De-identified manual rubric | Proposed | No telemetry; scorer agreement is not established |
| G1 privacy | Manual export review | Proposed | Requires a human reviewer before sharing |
| G2 trust boundary | Manual paraphrase check | Proposed | Wording and task familiarity may affect result |
| D1 diagnostic | Session field note | Proposed | Must not expose raw conversation content |

No analytics event, schema, provider call, or dashboard is added by this
contract. If a future event is proposed, its fields, retention, aggregation,
privacy review, and owner must be defined before implementation. Repeated tasks
from one person must not be treated as independent participants without a
method that supports that unit.

## Decision rule

The rule is `Proposed`, not pre-registered:

- `Test` only after the owner approves the manual rubric and privacy path;
- `Continue` the comparison when the primary directional rule is met and G1/G2
  pass in the same context;
- `Change` the explanation when the source or status boundary remains unclear;
- `Hold` when the denominator, eligibility, rubric, or privacy boundary cannot
  be checked;
- `Need evidence` when the result is inconclusive or the task contexts conflict.

The contract does not define a launch threshold, a causal claim, or a business
outcome.

## Not covered

- Real user sessions, participant identity, or real quotes
- Baseline, sample size, prevalence, confidence, lift, or statistical test
- Model quality, model/version drift, latency, cost, safety, or fallback result
- Mobile, accessibility, localization, production, or external-provider data
- Adoption, retention, conversion, revenue, traffic, or GitHub stars
- Whether any proposed metric or copy change improves the user outcome

## Implementation handoff

- Product/design: state the evidence boundary and status permission in plain
  language; keep the copy comparison narrow.
- Engineering: do not implement telemetry in this slice; document the future
  event proposal only if privacy review supports it.
- Analytics/research: approve eligibility, scorer rubric, denominator, window,
  and manual capture before the first session.
- QA: check current versus revised copy, source visibility, privacy export,
  failure handling, and separate viewport context.
- Writeback: record the result beside `M1`–`M3` and route a completed test to
  `pm-experiment-to-readout`.
- Review decision: `Test` after the contract is accepted; otherwise `Hold` or
  `Need evidence`.

## Review ask

`Test` the proposed manual measurement contract after the owner accepts the
eligibility, rubric, denominator, and privacy path. Unresolved risk: the
directional threshold may measure familiarity with the fictional fixture
rather than the product change.

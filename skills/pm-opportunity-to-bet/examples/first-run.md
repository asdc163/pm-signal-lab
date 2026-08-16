# PM Opportunity to Bet — first run

This is a fictional fixture for checking the skill contract. It is not a real
opportunity set, market signal, product decision, validation, adoption result,
or growth outcome.

## Input

Decision on the desk: choose one next learning bet for an AI-assisted support-
draft review workflow. The fictional owner can run one five-minute manual
review this week. No roadmap approval or implementation authorization has been
provided.

Opportunity candidates:

- `O1` — reviewers cannot tell which sentence is source-backed and which is a
  proposed inference. Sources `S1` and `S2` report the same hesitation in
  comparable review contexts.
- `O2` — reviewers ask for an export they can paste into a team document.
  Source `S3` contains one request with no observed workflow evidence.
- `O3` — the workflow should support multiple model providers. Source `S4` is
  a maintainer concern about future dependency risk, not user evidence.

The sources are fictional, de-identified, and safe to use only as fixtures.

## Decision on the desk

- Decision: choose one bounded learning bet, not a roadmap item or release.
- Owner: fictional product maintainer.
- User/job: a support reviewer needs to decide whether a draft claim is safe to
  review and what evidence still needs human checking.
- Current workaround: manually open the source note and compare it with the
  draft sentence.
- Boundary: one five-minute review, no customer data, no provider call, and no
  external write.
- Decision-changing evidence: whether reviewers can identify the source and
  status boundary more reliably after a small, reversible copy or layout
  change. This is proposed, not measured.

## Opportunity set

| ID | Source IDs | Evidence status | What it supports | What it does not prove |
|---|---|---|---|---|
| O1 | S1, S2 | Repeated qualitative signal | A comparable review friction appears in two fictional sources | Prevalence, severity, market demand, or business impact |
| O2 | S3 | Single reported request | One reviewer wants an export path | That export is the most important workflow or improves an outcome |
| O3 | S4 | Maintainer inference | Provider dependency is a planning concern | User demand, current pain, or a reason to build an adapter now |

## Evidence boundary

- `S1` and `S2`: fictional reported hesitation in comparable review contexts;
  source dates, participant count, and denominator are `Not provided`.
- `S3`: fictional feature request; observed behavior and repeat demand are
  `Not provided`.
- `S4`: fictional maintainer inference; external evidence is `Not provided`.
- No numeric priority score is supplied. The qualitative ordering below is
  `Proposed`, not a measured ranking.
- The set does not prove a market segment, willingness to pay, adoption,
  traffic, stars, retention, or model quality.

## User job and bet

Selected bet: `O1 — make evidence status legible at the sentence being
reviewed`.

- Context: a support reviewer is checking a draft claim against its source.
- Trigger: the reviewer sees a plausible sentence but cannot tell whether it is
  directly supported or still an inference.
- Job: decide what can be accepted, edited, or held as a hypothesis without
  losing the source boundary.
- Proposed mechanism: place a compact source/status cue beside the claim and
  preserve the original source line and limitation in the same review step.
- Smallest boundary: one fixture, one claim-review path, one copy/layout
  comparison, and one manual observation. No export, provider adapter, or
  persistence.
- Why this bet: `O1` has the clearest comparable evidence and the smallest
  reversible validation. This is a `Proposed` qualitative choice, not proof
  that it has the highest market value.

## Assumptions and risks

| Assumption | How to test or falsify it | Status/risk |
|---|---|---|
| Reviewers can state the source/status boundary after seeing the cue | Ask for the source and permitted review status after the first action | Proposed; trust and comprehension risk |
| The cue reduces comparison hesitation without hiding the original source | Observe the review path and ask where the reviewer looked first | Proposed; provenance and accessibility risk |
| A static fixture is enough for this learning step | Compare one copy/layout variant without changing model behavior | Proposed; no runtime adoption evidence |

## Opportunity cost and non-goals

- Choosing `O1` defers `O2` export work and `O3` provider-adapter planning for
  this learning cycle.
- Cost of doing nothing: the existing source/status hesitation may remain;
  impact is `Not measured`.
- `Should-not-build`: export, provider abstraction, account flow, telemetry,
  automatic issue submission, broad rollout, and customer-data ingestion.
- No candidate is rejected. `O2` remains a request needing workflow evidence;
  `O3` remains a dependency hypothesis needing technical and user context.

## Smallest validation

- Test: show the current fixture and one proposed source/status cue in a
  five-minute manual comparison.
- Audience/context: one fictional support reviewer using a sanitized fixture;
  real participant evidence is `Not provided`.
- First action: identify the source line and state whether the claim is
  source-backed, edited, or still a hypothesis.
- Primary signal: a manual note records whether the reviewer identifies both
  boundaries and where hesitation occurs. Unit is one review session.
- Guardrail: the cue must not replace, paraphrase beyond recognition, or expose
  private source content. Proposed privacy and trust review; `Not run`.
- Timebox/version: one five-minute session on the fictional fixture; version
  `fictional-o1-cue-001`.
- Evidence capture: de-identified session code, first action, paraphrased
  hesitation, limitation, and one improvement. No raw note or identity.
- Owner: fictional maintainer. Execution: `Not run`.
- Proposed decision rule: `Continue` if the boundary is stated and no privacy
  or trust guardrail fails; `Revise` if the cue is missed or the source is
  obscured; `Need evidence` if the session cannot distinguish the variants.

## Stop, revise, or continue rule

- `Continue`: the proposed cue is inspectable, source mapping remains visible,
  and the manual observation is usable. Threshold is `Proposed`.
- `Revise`: a reviewer misreads the status or cannot recover the source; keep
  the bet bounded and change copy/layout before another comparison.
- `Hold`: privacy, accessibility, or trust guardrail fails, or the fixture is
  not current enough to inspect.
- `Need evidence`: the observation cannot distinguish the cue from unrelated
  familiarity or the source context is missing.
- Recovery: restore the prior fixture/copy and record the failure; no automatic
  rollback or external write is enabled.

## Not covered

- Real users, sample size, prevalence, segment fit, frequency, severity, or
  business impact
- Export demand, provider demand, model quality, latency, cost, or retention
- Traffic, adoption, stars, forks, channel performance, or causal attribution
- Production readiness, accessibility verification, localization, or rollback
  execution

## Implementation handoff

- Content/design: create one source/status cue variant without removing the
  original source line or limitation.
- QA: check the normal review path, keyboard/focus order, privacy boundary, and
  recovery to the prior fixture.
- Learning owner: capture one de-identified observation and route a measured
  result to `pm-experiment-to-readout`.
- Next handoff: use `pm-decision-to-spec` only if the review supports a build
  boundary; use `pm-opportunity-to-bet` again if the alternatives change.

## Review ask

`Continue` to the proposed five-minute comparison. Unresolved risk: the
fictional repeated signal may still be too narrow to justify a broader product
bet.

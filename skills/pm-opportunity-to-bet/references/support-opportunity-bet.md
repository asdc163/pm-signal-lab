# Worked example: support-opportunity bet

This is a fictional fixture showing how a PM can choose one bounded bet from
several evidence-backed candidates. It is not a real support study, product
priority, user outcome, adoption result, or growth forecast.

## Decision on the desk

The fictional support-review team has one week for a reversible learning step.
It must choose among a provenance cue, a team export, and a model-provider
adapter. The owner is deciding what to test next, not approving a roadmap or
claiming product-market demand.

- User/job: a support reviewer needs to decide whether a draft answer is
  supported by the source and what still requires human review.
- Current workaround: open the source note separately, compare text, and keep a
  personal note about uncertainty.
- Constraint: one five-minute fixture-based review; no customer data, backend,
  provider call, or external write.
- Decision-changing evidence: a small comparison can reveal whether the source
  and status boundary is clearer with a compact review cue. This is proposed.

## Opportunity set

| Candidate | Sources and context | Evidence status | Bound | Limitation |
|---|---|---|---|---|
| O1: provenance cue | `S1`, `S2`; two fictional support-review notes in comparable draft-checking contexts | Repeated qualitative signal | Show source/status at the claim being reviewed | No denominator, prevalence, or business impact |
| O2: team export | `S3`; one fictional request after a review | Single reported request | Export a reviewed brief into a team document | No observed export workflow or repeated need |
| O3: provider adapter | `S4`; maintainer concern about future dependency | Inferred planning risk | Add a second model/provider boundary | No current user pain or model-change evidence |

The source IDs are fictional and de-identified. The dates, participant counts,
versions, and denominators are `Not provided`.

## Evidence boundary

| Evidence layer | What it supports | What it does not prove |
|---|---|---|
| `S1`, `S2` reported hesitation | A comparable qualitative friction is worth a small learning test | A segment-wide problem, severity rate, willingness to pay, or adoption |
| `S3` request | Export may be useful to one reviewer | Priority, repeat demand, or improved team outcomes |
| `S4` maintainer concern | Dependency risk should be tracked | A need to build an adapter before user evidence exists |
| No supplied priority score | A qualitative comparison is appropriate | Any numeric ranking or optimal portfolio choice |

## User job and bet

### Selected bet: O1 — keep provenance in the review moment

The reviewer is deciding whether a sentence can be accepted, edited, or held
as a hypothesis. The bet is to place a small source/status cue beside the
candidate claim while retaining the original source line and limitation.

The smallest boundary is one fixture, one claim-review path, one proposed
copy/layout variant, and one manual comparison. It does not include an export,
provider adapter, model change, persistence, or a new audience.

The qualitative selection is `Proposed`: O1 has the clearest comparable source
mapping and the most reversible learning step. No score was invented, and the
choice is not a claim that O1 has the highest market or revenue impact.

## Assumptions and risks

1. A reviewer can identify the source and status without opening a second
   surface. Test with the first-action observation; status `Proposed`.
2. The cue improves orientation without hiding source detail. Inspect the
   original line, limitation, and focus order; status `Proposed`.
3. The fixture isolates the provenance question. Keep model behavior,
   persistence, and export unchanged; status `Proposed`.
4. The source text can be shown safely. Redact raw customer material and hold
   if privacy review cannot confirm the fixture boundary; status `Not run`.
5. If a real AI provider is later introduced, provenance and uncertainty remain
   visible and a human fallback exists; provider/version and quality are
   `Not provided`.

## Opportunity cost and non-goals

Choosing O1 defers O2's export workflow and O3's adapter design for this
learning cycle. Doing nothing preserves the current comparison workaround;
the cost of that friction is `Not measured`.

Should-not-build for this bet:

- export formats, team sharing, accounts, notifications, and telemetry;
- model/provider switching, prompt changes, automatic ranking, or hidden
  confidence scores;
- customer-data ingestion, automatic GitHub issue creation, or public claims;
- a broad roadmap, production rollout, or monetization experiment.

O2 and O3 remain visible alternatives. They are deferred, not disproven.

## Smallest validation

- **Review:** compare the current fixture with one provenance-cue variant.
- **Audience/context:** one fictional support reviewer, one sanitized draft,
  one five-minute session; real exposure is `Not run`.
- **First action:** name the source line and say whether the claim is
  source-backed, edited, or still a hypothesis.
- **Primary signal:** a de-identified manual receipt records `clear`,
  `unclear`, or `not observed` for source and status boundaries. Unit is one
  eligible session; no rate is calculated.
- **Guardrails:** source text remains traceable; no private field appears; the
  cue is keyboard reachable and does not imply production approval. Status
  `Proposed`, execution `Not run`.
- **Window/version:** one five-minute review of fictional
  `support-review-o1-001`; do not pool other versions or contexts.
- **Evidence capture:** session code, first action, paraphrased hesitation,
  recovery moment, limitation, and one improvement. Do not request names, raw
  notes, credentials, or testimonials.
- **Owner:** fictional product maintainer. Writeback is a reviewed learning
  note, not an issue or adoption report.

## Stop, revise, or continue rule

- `Continue`: the cue remains traceable, the first action is possible, and the
  receipt is privacy-safe. Threshold is `Proposed`.
- `Revise`: the reviewer misses the status boundary, source detail is obscured,
  or the cue adds a new hesitation. Adjust the smallest copy/layout slice.
- `Hold`: privacy, keyboard, trust, or recovery guardrail fails; restore the
  prior fixture/copy before another review.
- `Need evidence`: the single fixture cannot distinguish the variants or the
  source context is incomplete.
- `Reject`: only after owner review shows the bet no longer addresses the job
  or a safer alternative has stronger current evidence.

Rollback is a human-owned restore to the prior fixture/copy. It has not been
executed in this fictional example.

## Not covered

- Real participant behavior, sample size, prevalence, segment fit, urgency,
  severity, or outcome improvement
- Export adoption, provider demand, model quality, safety performance, cost,
  latency, retention, business impact, or revenue
- Traffic, stars, forks, channel performance, or causal attribution
- Production deployment, accessibility certification, localization, or tested
  rollback

## Implementation handoff

- Product/content owner: review O1's source mapping and the proposed cue.
- Design/engineering: prepare only the fixture-level comparison; do not widen
  the boundary into export or provider work.
- QA: inspect first action, source traceability, keyboard focus, privacy,
  status-language trust, and recovery to the prior fixture.
- Learning owner: record one safe receipt and route a concrete mismatch to
  `pm-feedback-to-fix`; route a measured readout to
  `pm-experiment-to-readout`.
- If the evidence changes, rerun this packet with the new source IDs before
  choosing O2 or O3.

## Review ask

`Continue` to the proposed fixture comparison. The reviewer must confirm that
the qualitative ordering is a proposed judgment, not a numeric priority claim;
the unresolved risk is that two similar fictional notes may still be too narrow
to support a broader bet.

# First run: support-draft value case

This is a **fictional fixture** for a support-draft workflow. It is not a
customer result, ROI calculation, adoption result, benchmark, or budget
recommendation.

## Request

> Our AI-assisted support-draft pilot looks cheaper than adding another agent.
> Can we triple the budget and roll it out to every queue?

## Inputs supplied

- Workflow: AI-assisted drafting for routine English support email.
- User/job: support agent prepares a reply that passes human review before
  sending.
- Owner: support operations lead, name not provided.
- Test window: fictional internal fixture, date and eligible case count not
  provided.
- Reported signal: drafts were described as "cheaper"; token cost, retries,
  review time, support load, accepted outcomes, and queue mix are not supplied.
- Desired value: more routine cases completed without lowering response quality.
- Baseline: not provided.
- Capacity: not provided.
- Decision requested: triple budget and all-queue rollout.

## Value-to-Investment Brief

### Decision in one line

**Test**, with a narrower low-risk English email slice. Do not triple the budget
or call the workflow cheaper until full cost, accepted outcomes, dependability,
capacity, and a comparison are measured.

### Work unit

- **Workflow:** prepare a routine support reply draft.
- **Accepted outcome:** a human-reviewed reply sent for an eligible case and
  meeting the team quality bar. `Not provided` because the rubric and case
  eligibility are missing.
- **System of record:** support queue or ticket system, not provided.
- **Denominator:** accepted outcomes among eligible cases in one named window.
  `Not measured`.
- **Slices:** low-risk English email cases are a proposed first slice. Billing,
  safety, legal, multilingual, and unusual policy cases are out of scope until
  reviewed.

### Evidence ledger

| Receipt | Status | What it can support | What it cannot support |
| --- | --- | --- | --- |
| "Cheaper" statement | `Not measured` | a reason to inspect cost | lower full cost or ROI |
| Token/provider bill | `Not provided` | variable model cost | review, retry, support, or fixed cost |
| Reviewed accepted drafts | `Not measured` | accepted-outcome count if rubric exists | quality across all queues |
| Edits and rejections | `Not measured` | dependability and rework investigation | a reason without case context |
| Queue response time | `Not provided` | possible outcome comparison | causal time saved |
| Capacity or demand | `Not provided` | whether more exposure is supportable | all-queue demand |

### Full-cost ledger

| Component | Unit | Status |
| --- | --- | --- |
| Model/provider and retrieval | per attempt or period | `Not provided` |
| Retries and failed attempts | per eligible case | `Not measured` |
| Human review and edits | minutes per draft and reviewer role | `Not provided` |
| Rework after rejection | minutes per failed draft | `Not measured` |
| Support and enablement | owner time and escalation load | `Not provided` |
| Integration and operations | period and allocation | `Not estimable` |
| Queue capacity | eligible demand and displaced work | `Not provided` |

`cost_per_accepted_outcome` is `Not measurable` because both full cost and the
accepted-outcome denominator are missing. Token price alone cannot answer the
question.

### Value ledger

- **Beneficiary:** support team and customers waiting for a response.
- **Value unit:** an eligible support case resolved with a reviewed reply that
  meets the quality bar.
- **Current status:** `not_provided` for baseline and comparison;
  `not_measurable` for realized time or capacity value.
- **Proxy:** a claim that the workflow is cheaper. It has no source or method
  yet.
- **Causality boundary:** no value or time improvement can be attributed to
  the workflow from this fixture.

### Dependability

| State | Receipt |
| --- | --- |
| Ready to use | `Not measured` against a written rubric |
| Needs correction | `Not measured` from edits and rework |
| Needs escalation | `Not measured` from queue handoffs |
| Failed or out of scope | proposed negative slices, not tested |

### Scenarios

| Scenario | Demand | Acceptance | Review/rework | Full cost | Value per outcome | Route impact |
| --- | --- | --- | --- | --- | --- | --- |
| Low | `Not provided` | `Not measured` | `Not provided` | `Not estimable` | `Not provided` | do not invest yet |
| Base | one bounded low-risk queue | written rubric required | named reviewer required | measure before comparing | baseline required | `Test` |
| High | all queues requested | unknown negative slices | support coverage unknown | capacity could rise | outcome value unknown | do not use this case for rollout |

**Sensitivity flip:** the route changes only after the team can show the full
cost per accepted outcome and a baseline-backed outcome for the proposed slice.
The threshold is `Not estimable` from the supplied fixture.

### Investment route

- **Route:** `Test`.
- **Smallest next receipt:** run one fixed low-risk queue window with a named
  owner, accepted-outcome rubric, eligible denominator, human review minutes,
  retries, rework, support time, and a comparable baseline.
- **Capacity guardrail:** do not add all queues or triple budget during this
  window.
- **Owner:** support operations lead, name not provided.
- **Review date:** `Not provided`.
- **Stop trigger:** pause the test if a high-risk or out-of-scope case reaches
  the workflow without a human review and manual fallback.

### Evidence boundary

- `Not provided`: owner name, source system, cost inputs, baseline, capacity,
  value method, review date, and budget boundary.
- `Not measured`: accepted outcomes, quality, retries, corrections,
  escalations, support, and experience.
- `Not estimable`: shared integration cost and all-queue value range.
- `Not measurable`: cost per accepted outcome and causal savings from current
  inputs.

## Not covered

This **fictional fixture** does not verify model quality, full cost, ROI,
customer value, adoption, causality, production reliability, privacy,
security, accessibility, localization, accounting, tax, procurement, or
investment approval. No provider, telemetry system, customer record, budget,
or rollout was accessed or changed.

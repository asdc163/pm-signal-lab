# AI workflow scale reference

This reference is a **fictional fixture** guide for deciding whether an AI
workflow is ready for more exposure or operating investment. It is not a
financial model, adoption report, production approval, or value claim.

## Source ledger

| Source | What it supports | What it does not support |
| --- | --- | --- |
| [OpenAI AI investment guidance](https://openai.com/index/managing-ai-investments-in-agentic-era/) | Look at useful work per dollar, govern advanced workflows before scale, fund by maturity, and match capacity to proven demand. | The article's figures and recommendations are not evidence for this workflow's value or readiness. |
| [OpenAI model guidance](https://developers.openai.com/api/docs/guides/latest-model) | Compare representative tasks on success, completeness, required evidence, tokens, latency, cost, calls, and retries; lower resource use counts only when quality holds. | Provider guidance or internal directional results are not a customer benchmark or scale approval. |
| [OpenAI agent evals](https://developers.openai.com/api/docs/guides/agent-evals) | Use traces to debug, then datasets and eval runs when repeatable comparison is needed. | An eval result does not prove user value, causal business impact, or safe operations. |
| [OpenAI in-house data agent](https://openai.com/index/inside-our-in-house-data-agent/) | Evolving agents need continuous evaluation and context/source freshness to protect quality while they change. | An internal case is not a general adoption, ROI, or production-readiness baseline. |

## Maturity decision card

| State | What is known | What must be true before moving on |
| --- | --- | --- |
| `Explore` | user job and plausible workflow are being shaped | a testable oracle and risk boundary exist |
| `Validate` | representative quality and failure behavior are being tested | the accepted outcome and guardrails meet the declared bar |
| `Pilot` | bounded users/tasks can try the workflow with support and rollback | exposure, owner, reliability, support, and learning receipts are live or explicitly fictional |
| `Scale gradually` | a bounded slice has accepted outcomes and operating readiness | staged expansion has capacity, monitoring/feedback, stop rule, and next review |
| `Narrow` | value or safety holds only for a subset | exclusion and re-entry rules preserve the user job |
| `Hold` | material evidence, control, owner, or capacity is missing | named gap and decision date exist |
| `Retire` | the workflow is not worth its value, risk, support, or permission burden | users/data/owners have a fallback and shutdown receipt |

Do not skip a maturity state because a presentation is persuasive. A state
describes current evidence; it does not predict the next state.

## Evidence ledger

| Layer | Required receipt | Common false shortcut | Status |
| --- | --- | --- | --- |
| User job | named task and target user | “People liked the demo” | `Not provided` |
| Accepted outcome | independent oracle and terminal state | “The model output looked good” | `Not provided` |
| Denominator | eligible exposure, exclusions, timeout, abstain, retry | “We had 100 examples” | `Not provided` |
| Quality | representative slices, negatives, abstention, review | one benchmark or average | `Not run` |
| Trust/safety | risk classes, permissions, privacy, fallback, control | generic policy statement | `Not run` |
| Reliability | availability, timeout, queue, source, tool, provider, recovery | happy-path demo | `Not run` |
| Cost | model/tool calls, attempts, retries, latency, human review | token price | `Not run` |
| Demand | eligible pull, repeat job, frequency, suppression, user choice | traffic, requests, or stars | `Not provided` |
| Capacity | reviewers, support, infra, quota, owner, change management | “we can add more later” | `Not provided` |
| Outcome | window, comparison, delayed state, causal boundary | pilot completion count | `Not provided` |

Use `Reviewed`, `Observed`, `Not run`, `Not provided`, `Conflict`, and
`Need evidence` per row. Never turn a missing receipt into `Ready`.

## Accepted-outcome contract

```text
outcome_unit:
user_job:
eligible_exposure:
accepted_definition:
outcome_oracle:
denominator:
observation_window:
representative_slices:
negative_cases:
abstain_or_defer_cases:
human_review_work:
terminal_state:
business_value_measure:
causal_comparison:
status:
not_claimed:
```

An accepted outcome may be a verified artifact, resolved case, decision, or
other named state. It is not automatically a business outcome, and a business
outcome is not automatically caused by AI.

## Readiness matrix

| Area | Ready means | Scale blocker examples |
| --- | --- | --- |
| Quality | oracle, slices, negatives, abstention, version, and review pass | missing labels, critical slice failure, source drift |
| Trust/safety | permissions, high-impact controls, privacy, fallback, and residual risk are owned | no approval, unsafe action, no manual route |
| Reliability | failure, queue, timeout, dependency, and recovery are observable and supportable | unknown outage behavior, no rollback |
| Cost | cost per accepted outcome includes retries and human work | token price only, correction burden unknown |
| Demand | eligible repeat job and voluntary or necessary pull are visible | forced usage, one-time novelty, blended traffic |
| Capacity | reviewers, support, infrastructure, quota, and owner can absorb the route | queue overload, no on-call, no support plan |
| Change management | users, policy, training, documentation, and rollback can keep up | no communication or re-entry plan |

Status each area as `Ready`, `Partial`, `Not run`, `Blocked`, or `Need
evidence`. A critical `Blocked` item routes to `Hold` or `Narrow`.

## Route matrix

| Route | Exposure | Owner | Stop rule | Fallback |
| --- | --- | --- | --- | --- |
| `Validate` | representative evaluation only | quality/product owner | oracle or slices fail | manual review |
| `Pilot` | named audience/task/tenant with TTL | pilot owner | guardrail, support, or outcome threshold fails | unchanged workflow |
| `Scale gradually` | staged expansion with checkpoints | product + operations owner | quality, safety, reliability, cost, or capacity guardrail fails | narrow or rollback |
| `Narrow` | safe/useful subset only | product/control owner | subset no longer meets bar | manual route |
| `Hold` | no increased exposure | decision owner | decision date or missing evidence expires | current unchanged route |
| `Retire` | stop new use and migrate | shutdown owner | data/user/permission cleanup incomplete | documented replacement |

Every route needs an exposure boundary, an owner, a timestamp or TTL, a stop
rule, a manual fallback, a rollback/containment path, and a next review.

## Portfolio review card

```text
workflow:
user_job:
current_state:
proposed_route:
accepted_outcome:
quality_status:
trust_safety_status:
reliability_status:
cost_per_accepted_outcome:
demand_status:
capacity_status:
change_management_status:
eligible_exposure:
observation_window:
decision_owner:
rollout_boundary:
stop_rule:
rollback_or_containment:
next_receipt:
evidence_status:
not_claimed:
```

## Adjacent package boundaries

- `pm-opportunity-to-bet` chooses a product bet from opportunities; this
  reference decides maturity after a workflow exists.
- `pm-experiment-to-readout` interprets a bounded result; this reference
  combines result evidence with operating readiness and capacity.
- `pm-release-to-learn` defines rollout learning; this reference decides if the
  workflow has earned a larger rollout boundary.
- `pm-ai-cost-to-guardrail` defines cost/latency budgets; this reference uses
  cost per accepted outcome as one readiness layer.
- `pm-ai-value-to-retention` tests repeat value; this reference keeps repeat
  demand separate from quality, trust, and scale readiness.
- `pm-ai-risk-to-control` and `pm-ai-monitor-to-oversight` cover risk and
  oversight boundaries that must be satisfied before scaling a high-impact
  workflow.

Pick the one missing receipt. Do not chain every adjacent package.

## Review checklist

- [ ] Current maturity and proposed route are explicit.
- [ ] User job, accepted outcome, oracle, denominator, window, slices, and
      negative/abstain cases are explicit.
- [ ] Quality, trust/safety, reliability, cost, demand, capacity, support,
      permissions, and change management have statuses.
- [ ] Cost per accepted outcome is not replaced by token price.
- [ ] Usage, outcome, business value, readiness, and adoption are separate.
- [ ] Exposure, owner, TTL, stop rule, fallback, rollback, and next review are
      explicit.
- [ ] Missing evidence is marked and has an owner.
- [ ] The route remains reversible and does not auto-fund or auto-deploy.

## Not covered

- This reference contains no live usage, spend, quality, demand, business,
  adoption, financial, support, or production data.
- The source links inform a PM contract; they do not prove this workflow's
  value, safety, causality, unit economics, adoption, or scale readiness.
- No real customer, forecast, credential, private URL, provider response,
  support record, or production trace belongs in a public example.

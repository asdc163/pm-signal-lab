---
name: pm-ai-workflow-to-scale
description: Turn an AI workflow demo, validation, or pilot into an evidence-bounded Explore, Validate, Pilot, Scale, Narrow, Hold, or Retire decision using accepted outcomes, guardrails, reliability, cost, demand, capacity, ownership, rollout, and rollback.
---

# PM AI Workflow to Scale

## Overview

Use this skill when an AI workflow has shown enough promise that someone wants
more users, more tasks, more budget, or more autonomy. It separates usage,
output quality, accepted outcomes, business value, operating readiness, and
adoption before recommending a scale route. The output is a scale decision;
it is not a forecast, a budget approval, a rollout system, or proof that a
pilot generalizes.

## When to use

Use this skill when:

- a demo, prototype, validation run, or pilot is being considered for broader
  exposure, production funding, more tools, or longer-running work;
- usage or demand is growing but the team needs to know whether that demand is
  valuable, safe, supportable, and repeatable;
- a cheaper model, fewer tokens, or a high benchmark score is being used as the
  main reason to scale an AI workflow;
- leaders need to compare quality, accepted outcome, guardrails, reliability,
  cost, support load, capacity, permissions, and change management;
- a PM needs a bounded `Scale gradually`, `Pilot`, `Narrow`, `Hold`, or
  `Retire` recommendation with an owner, exposure, and stop rule.

Use `pm-opportunity-to-bet` when the question is which unsolved opportunity to
pursue before a workflow exists. Use `pm-experiment-to-readout` when a bounded
test has results but no scale decision is needed. Use `pm-release-to-learn` for
the rollout learning plan after a release is independently verified. Use
`pm-ai-cost-to-guardrail` when the main question is cost or latency. Use
`pm-ai-value-to-retention` when the main question is repeat value.

## Do not use

Do not use this skill to:

- forecast revenue, approve a budget, price a product, promise adoption, or
  infer product-market fit from usage, traffic, or stars;
- treat a demo, benchmark, one successful trace, one user quote, low token
  price, or high request volume as production readiness;
- deploy, increase exposure, grant permissions, change a model, change a
  policy, or create an external rollout automatically;
- replace security, privacy, legal, safety, reliability, accessibility, finance,
  or change-management review;
- expose customer data, credentials, private URLs, raw traces, private
  business forecasts, or provider secrets in a public packet.

Use `Not provided`, `Not run`, `Unknown`, `Conflict`, `Need evidence`, and
`Not covered` when the decision record is incomplete.

## Core boundary

> Usage tells you that work happened. It does not tell you that the work was
> valuable, safe, reliable, accepted, supportable, or ready to scale.

Keep these layers separate:

| Layer | It may establish | It cannot establish by itself |
| --- | --- | --- |
| `usage` | requests, sessions, tasks, active users, or spend were observed | value, quality, adoption, or willingness to continue |
| `output_quality` | output behavior on a declared slice and oracle | completed user job or business value |
| `accepted_outcome` | a named user/job outcome passed its oracle | causal lift, generalization, or safe scaling |
| `business_value` | a defined time, cost, risk, revenue, or capacity result | that AI caused the result without a valid comparison |
| `operating_readiness` | controls, support, reliability, permissions, and ownership are named | that the workflow will stay ready at higher exposure |
| `adoption` | eligible users repeatedly chose or used a workflow under a definition | quality, trust, value, or production safety |
| `scale_decision` | an owner chose a bounded maturity route | that the route was executed or succeeded |

## Maturity ladder

Use the smallest state supported by current evidence:

| State | Decision question | Minimum evidence |
| --- | --- | --- |
| `Explore` | Can this workflow plausibly serve a named user job? | user job, prototype boundary, obvious risks, and learning question |
| `Validate` | Does it meet a declared quality bar on representative cases? | oracle, slices, denominator, negative cases, and review |
| `Pilot` | Can a bounded audience use it with controls and learning instrumentation? | exposure, guardrails, owner, support path, observation window, and rollback |
| `Scale gradually` | Can more eligible work be served without breaking outcome or controls? | accepted outcome, guardrails, reliability, cost, demand/capacity, staged rollout |
| `Narrow` | Which task, user, tenant, model, or route can remain safe and useful? | affected slice, exclusion rule, fallback, and re-entry condition |
| `Hold` | What critical evidence is missing or too risky to expand? | missing evidence, owner, manual route, and decision date |
| `Retire` | Is the workflow not valuable, supportable, permitted, or worth its risk? | reason, affected users, migration/fallback, and shutdown owner |

Do not skip `Validate` or `Pilot` because a demo is compelling.

## Workflow

### 1. Frame the user job and scale question

Write one sentence:

> For `[eligible user/workflow]` trying to complete `[job]`, decide whether
> `[workflow]` should move from `[current state]` to `[next route]` under
> `[quality, risk, operating, and capacity boundary]`.

Capture:

| Field | Required question |
| --- | --- |
| `workflow_id/version` | What exact product, model, prompt, tools, data, policy, and UI are being considered? |
| `user_job` | What does the person or team need to complete? |
| `eligible_exposure` | Who or what could use the workflow, and who is excluded? |
| `current_state` | Is this `Explore`, `Validate`, `Pilot`, `Scale`, `Narrow`, `Hold`, or `Retire`? |
| `scale_question` | What exposure, task, autonomy, budget, or support change is proposed? |
| `observation_window` | What timestamps, timezone, freshness, and rollout maturity apply? |
| `decision_owner` | Who can approve, hold, narrow, retire, or request more evidence? |
| `evidence_status` | Which claims are `Observed`, `Reviewed`, `Not run`, `Not provided`, or `Need evidence`? |

If the user job or decision owner is unknown, stop at `Need evidence`.

### 2. Define “good enough” before scale

Define one accepted outcome and its oracle:

| Field | Example question |
| --- | --- |
| `outcome_unit` | One eligible ticket, task, artifact, decision, or resolved case? |
| `outcome_oracle` | What independent state says the user job was completed acceptably? |
| `accepted_definition` | What must be correct, complete, cited, safe, and user-approved? |
| `denominator` | Which eligible units count, and which time out, abstain, retry, or lack a label? |
| `slices` | Which user, task, language, tenant, risk, source, or device groups matter? |
| `negative_cases` | Which wrong, unsafe, preference, abstain, or expected-variance cases must fail or defer? |
| `review_work` | How much human correction, verification, escalation, or support is part of the outcome? |

Cost per token is not cost per accepted outcome. Usage is not an outcome.

### 3. Check the evidence stack

Review the layers separately:

1. **Quality:** representative tasks, output completeness, required evidence,
   abstention, negative slices, and reviewer agreement;
2. **User/job outcome:** accepted outcome, completion oracle, human work,
   delayed state, and denominator;
3. **Trust and safety:** privacy, policy, access, harmful/unauthorized paths,
   user controls, fallback, and residual risk;
4. **Reliability:** availability, timeout, retry, rate limit, tool failure,
   queue, data freshness, rollback, and support response;
5. **Economics:** model/tool usage, attempts, correction work, latency, cost per
   accepted outcome, and capacity assumptions;
6. **Demand:** eligible population, repeat job, frequency, workflow pull,
   suppression, and whether demand is voluntary or artificially induced;
7. **Operations:** owner, reviewer/support capacity, permissions, integrations,
   change management, observability, and incident path.

A missing layer is a decision input, not a blank to fill with a score.

### 4. Assess readiness and capacity

Use `Ready`, `Partial`, `Not run`, `Blocked`, or `Need evidence` for each:

| Area | Readiness question |
| --- | --- |
| User value | Does the accepted outcome improve the declared job on representative slices? |
| Quality | Are the oracle, negatives, abstention, drift, and version boundaries stable? |
| Safety/trust | Are high-impact actions, permissions, privacy, and manual controls bounded? |
| Reliability | Does the route handle timeout, provider, tool, source, queue, and recovery failures? |
| Cost | Is cost per accepted outcome visible, including retries and human review? |
| Demand | Is there eligible, repeatable work that users actually choose or need? |
| Capacity | Can model/tool budget, reviewers, support, infra, and owners absorb more exposure? |
| Change management | Can users, policy, training, support, and rollback keep up with the route? |

Do not call `Scale gradually` when a critical guardrail, owner, manual fallback,
or capacity boundary is `Blocked` or `Need evidence`.

### 5. Choose the bounded route

| Route | Use when | Minimum next receipt |
| --- | --- | --- |
| `Explore` | user job or feasibility is still uncertain | one learning question and prototype boundary |
| `Validate` | quality/oracle evidence is missing | representative slice, denominator, negatives, and review |
| `Pilot` | workflow may be useful but exposure and controls need learning | audience, TTL, owner, guardrails, support, and rollback |
| `Scale gradually` | accepted outcome and critical controls pass for a bounded slice | staged exposure, capacity check, monitor, stop rule, and next review |
| `Narrow` | value or safety holds only for a smaller slice | scope, exclusion, fallback, and re-entry condition |
| `Hold` | material evidence or operating capacity is missing | named gap, owner, manual route, and decision date |
| `Retire` | value, permission, reliability, supportability, or risk does not justify continuation | user notice, migration/fallback, data cleanup, and shutdown receipt |

Every route needs an owner, exposure boundary, stop rule, user/control impact,
and rollback or containment note.

### 6. Write the scale decision

```text
workflow_id/version:
user_job:
current_state: Explore | Validate | Pilot | Scale | Narrow | Hold | Retire
proposed_route: Explore | Validate | Pilot | Scale gradually | Narrow | Hold | Retire
eligible_exposure:
observation_window:
accepted_outcome:
outcome_oracle:
denominator:
representative_slices:
quality_status:
trust_safety_status:
reliability_status:
cost_per_accepted_outcome:
demand_status:
capacity_status:
change_management_status:
decision_owner:
rollout_boundary:
stop_rule:
rollback_or_containment:
next_receipt:
evidence_status:
not_claimed:
```

Keep `Scale decision: proposed`, `Rollout: started`, `Outcome: verified`, and
`Adoption: measured` separate.

## Output contract

Return these sections in order and preserve missingness:

### Scale decision

State the user job, current maturity, proposed route, owner, exposure boundary,
and one next action in five lines or fewer.

### Evidence and accepted outcome

List quality, oracle, accepted outcome, denominator, slices, negative cases,
human work, time window, and missing joins.

### Readiness and capacity

Show trust/safety, reliability, cost, demand, capacity, support, permissions,
change management, and status for each.

### Route and rollout

Choose `Explore`, `Validate`, `Pilot`, `Scale gradually`, `Narrow`, `Hold`, or
`Retire`; state exposure, TTL, owner, stop rule, fallback, and rollback.

### Claims and boundaries

Separate usage, quality, accepted outcome, business value, readiness, adoption,
and execution status. List every unsupported claim.

### Review ask

End with one choice: `Collect evidence`, `Validate`, `Run bounded pilot`,
`Scale gradually`, `Narrow`, `Hold`, or `Retire`, plus the receipt needed next.

## Edge cases

- **Usage grew:** check eligible exposure, repeat job, accepted outcome,
  correction work, and whether demand was artificially induced.
- **Tokens became cheaper:** measure attempts, retries, latency, human review,
  failure cost, and cost per accepted outcome; token price is one input.
- **Quality is high on a benchmark:** check representative tasks, negative and
  abstain slices, user-job oracle, source freshness, and production boundary.
- **Pilot users are enthusiastic:** preserve the quote as feedback; do not call
  it adoption, value, or generalization without denominator and window.
- **One critical slice fails:** keep the route at `Narrow` or `Hold` even when
  the blended average looks strong.
- **Demand exceeds capacity:** route to `Narrow`, `Pilot`, or `Hold`; do not
  silently remove review, permissions, or support to satisfy the queue.
- **The workflow needs more autonomy:** check task boundary, approval, identity,
  tool, monitor, and rollback contracts before increasing authority.
- **Outcomes are delayed:** use `Outcome pending`, expiry, and owner; do not
  count missing outcomes as successes or failures.
- **The workflow creates value but cannot be supported:** keep the decision at
  `Hold` or `Narrow` until an owner and operating path exist.
- **Sensitive data is needed for evaluation:** route through purpose,
  permission, minimization, redaction, retention, and destination review.

## Rationalizations to reject

| Shortcut | Why it fails | Required correction |
| --- | --- | --- |
| “Users are using it, so scale.” | Usage may be forced, exploratory, low-value, or costly to review. | Define eligible exposure and accepted outcome. |
| “The benchmark is high, so production is ready.” | Benchmarks miss user workflow, negatives, controls, and operations. | Add representative slices and readiness gates. |
| “The model is cheaper, so unit economics improved.” | Retries, correction, latency, and failure work can dominate token price. | Measure cost per accepted outcome. |
| “The pilot went well, so open it broadly.” | A pilot can select friendly users, easy tasks, or extra support. | Preserve pilot boundary and run a staged exposure. |
| “We can remove the human review at scale.” | Review capacity is part of the current outcome and control. | Re-evaluate autonomy, guardrails, and fallback. |
| “The average passes.” | Severe or low-volume slices can hide in a blended average. | Split critical slices and set stop rules. |

## Final check

Before handing off, confirm:

- user job, current maturity, proposed route, owner, exposure, and time window
  are explicit;
- accepted outcome, oracle, denominator, representative slices, negatives,
  abstention, and human work are explicit;
- quality, trust/safety, reliability, cost, demand, capacity, support,
  permissions, and change management have status;
- usage, quality, accepted outcome, business value, readiness, adoption, and
  execution are not collapsed;
- rollout has exposure, TTL, stop rule, fallback, rollback, and next review;
- missing evidence is marked, not converted into a green score;
- no private data, credential, forecast, automatic budget, rollout, or provider
  write entered the packet;
- `## Not covered` lists unsupported value, safety, causal, adoption, and
  production claims.

## Not covered

- No financial forecast, pricing, budget approval, rollout, model change,
  provider call, dashboard, adoption study, or production deployment is
  implemented or claimed.
- A demo, benchmark, usage count, low token price, user quote, or pilot result
  does not prove value, safety, causality, adoption, or scale readiness.
- No real customer, support ticket, business forecast, credential, private URL,
  trace, or production data belongs in a public example.

For the maturity definitions, evidence ledger, route matrix, and review card,
read [`references/workflow-scale.md`](references/workflow-scale.md).

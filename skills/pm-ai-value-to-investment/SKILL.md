---
name: pm-ai-value-to-investment
description: Turn one AI workflow into an evidence-bounded value-to-investment brief with a successful-work unit, full cost ledger, dependability, value assumptions, scenarios, sensitivity, capacity, and an Invest, Test, Narrow, Hold, or Stop decision.
---

# PM AI Value to Investment

An AI workflow can be cheap per token and still expensive to operate. It can
also save time without creating a value that the business can verify. This
skill helps a PM put one workflow, its successful outcome, its full cost, its
dependability, and its value assumptions on the same page before asking for
more investment.

## When to use

Use this skill when:

- a PM needs to decide whether an AI workflow deserves more budget, capacity,
  integration work, or a larger test;
- a team is quoting token price, seats, hours saved, or a pilot result and the
  full cost or value unit is still unclear;
- a model or workflow comparison needs cost per accepted outcome rather than
  cost per token;
- a product or finance review needs low, base, and high scenarios and the
  assumption most likely to flip the recommendation;
- leaders are comparing several AI workflows and need an evidence-bounded
  `Invest`, `Test`, `Narrow`, `Hold`, or `Stop` route.

Do not use this skill to provide financial advice, set a market price, promise
ROI, approve a budget, or turn a fictional fixture into a business result.

## Do not use

Choose a different skill when the main job is:

- define model or workflow cost/latency guardrails for release: use
  `pm-ai-cost-to-guardrail`;
- decide whether an AI workflow is mature enough for more exposure: use
  `pm-ai-workflow-to-scale`;
- define a metric before a test: use `pm-outcome-to-metric`;
- introduce a tested workflow to a team and learn from real use: use
  `pm-ai-workflow-to-adoption`;
- price a product or choose a commercial package: use a pricing or business
  strategy process and carry this brief's evidence into it.

## Working rule

The unit of analysis is one workflow and one accepted outcome. Start where the
work gets done: a resolved support case, a reviewed contract, a tested code
change, or another named artifact. Do not begin with the model, the token bill,
or a broad market estimate.

Keep the following signals separate:

| Signal | What it can show | What it cannot show by itself |
| --- | --- | --- |
| Token or API cost | Provider-side variable spend | Full task cost or value |
| Usage | Requests, users, or workflow attempts | Useful work or adoption |
| Accepted outcome | Work that met the stated quality bar | Business value without a value definition |
| Human review | Time and judgment needed to finish the work | A stable labor rate or causal savings |
| Dependability | Ready-to-use, corrected, or escalated results | Trust or ROI without a task context |
| Value proxy | A related measure such as time, cycle time, or capacity | Realized value or causality |
| Realized value | A verified change in the desired outcome | A forecast for another workflow |
| Investment case | A bounded choice under stated assumptions | Approval or a guaranteed return |

## Workflow

### 1. Name the work and the finish line

Record:

- workflow name, owner, user/job, and system where the work happens;
- what counts as `done` and what must be true before an outcome is accepted;
- quality bar, reviewer or oracle, case slices, and known exclusions;
- baseline, comparison, time horizon, demand, and capacity if supplied;
- the decision owner and the decision date.

If the successful outcome is vague, set `value_status: blocked` and ask for one
observable work unit. "Helpful answer" is not a denominator.

### 2. Build the full-cost ledger

Use only supplied or directly measured inputs. Keep each input's unit, period,
source, freshness, and evidence state next to it.

Consider:

- model, provider, compute, retrieval, storage, and token spend;
- tool, connector, search, hosting, and network cost;
- attempts, retries, failed runs, waiting time, and latency-related capacity;
- human review, editing, escalation, correction, and rework;
- support, enablement, evaluation, integration, maintenance, and operations;
- fixed or committed cost and the capacity it occupies;
- opportunity cost only when the displaced work or option is explicitly named.

Do not add a human cost from a generic salary assumption. Write
`Not provided`, `Not measured`, or `Not estimable` when the input is missing.

For a stated period, the basic unit is:

```text
full_cost = variable_cost
          + human_review_and_rework
          + support_and_operations
          + allocated_fixed_or_commitment_cost
```

Then, only when the accepted-outcome denominator exists:

```text
cost_per_accepted_outcome = full_cost / accepted_outcomes
```

Retries, corrections, and escalations belong in the numerator. Failed or
unaccepted attempts do not disappear because the token charge was small.

### 3. Define value without hiding the proxy

Write the value unit and its beneficiary. Examples include:

- a customer issue resolved;
- a reviewed contract that meets the stated bar and deadline;
- a tested code change accepted through the team's review path;
- an hour of verified capacity returned to a named team;
- a risk, delay, or loss avoided under a documented comparison.

Label the evidence:

| Label | Meaning |
| --- | --- |
| `realized` | The outcome was observed in the named system during the stated window |
| `estimated` | An assumption or forecast supplied by an owner, with method and range |
| `proxy` | A related signal that may inform the decision but is not the outcome |
| `not_measurable` | The outcome or comparison cannot be observed with current inputs |
| `not_provided` | The requester did not supply the value definition or evidence |

Do not convert time saved into money unless the rate, eligible work, retained
capacity, and comparison are supplied. Do not count the same benefit as both
time saved and capacity created.

### 4. Check dependability before valuing volume

Classify each reviewed attempt:

- `ready_to_use`: met the quality bar as delivered;
- `needs_correction`: required human edits or another attempt;
- `needs_escalation`: a person had to take over or finish the work;
- `failed_or_out_of_scope`: did not produce an accepted outcome.

Show the slice, denominator, reviewer, and missing cases. A large request
count with a small accepted-outcome rate may increase cost rather than value.
Dependability is part of the business case, not a footnote after the forecast.

### 5. Run scenarios and find the flip point

Use `low`, `base`, and `high` scenarios only when the assumptions are supplied
or explicitly chosen for an illustrative fixture. Vary the inputs that move
the case:

- eligible demand and completed attempts;
- acceptance rate and correction/escalation rate;
- human review minutes and support load;
- variable cost, fixed cost, and capacity constraint;
- value per accepted outcome or retained capacity;
- time horizon and ramp speed.

For each scenario, record `assumption`, `source`, `range`, `confidence`, and
`what would change it`. The sensitivity question is more useful than a fake
precise number: *Which one missing receipt would change the route?*

### 6. Choose the investment route

Use the smallest decision supported by the evidence:

| Route | Use when | Next requirement |
| --- | --- | --- |
| `Invest` | Accepted work, full cost, dependability, value, and capacity fit are sufficiently evidenced for the named scope | owner, budget boundary, review date, and stop trigger |
| `Test` | The work may matter, but outcome, cost, or value evidence is incomplete | one smallest measurement or paired test |
| `Narrow` | The case is promising only for a safer slice, role, quality bar, or demand band | slice, owner, support, and new denominator |
| `Hold` | A material risk, dependency, approval, baseline, or capacity input is unresolved | unblock condition and expiry/review date |
| `Stop` | Full cost, burden, risk, or weak accepted outcomes make the case unsustainable | evidence receipt and safe closure action |

`Invest` does not mean "approved". It means the brief supports preparing an
investment proposal for the stated scope. A route can be `Test` even when a
proxy looks positive.

## Output contract

Return a **Value-to-Investment Brief** with these sections, in this order:

1. **Decision in one line:** route, workflow, scope, decision owner, and date.
2. **Work unit:** user/job, successful outcome, system of record, quality bar,
   denominator, slices, and exclusions.
3. **Evidence ledger:** source, freshness, status, owner, and what each receipt
   supports or cannot support.
4. **Full-cost ledger:** variable, human, retry/rework, support/operations,
   fixed/commitment, capacity, period, units, and missing inputs.
5. **Value ledger:** beneficiary, value unit, realized/estimated/proxy status,
   baseline, comparison, horizon, and causality boundary.
6. **Dependability:** ready-to-use, correction, escalation, failure, accepted
   outcome, and review denominator by relevant slice.
7. **Scenarios:** low/base/high assumptions, range, confidence, and sensitivity
   flip. Do not create numbers that were not supplied.
8. **Investment route:** Invest, Test, Narrow, Hold, or Stop with reason,
   guardrail, capacity, owner, next receipt, and stop trigger.
9. **Evidence boundary:** every `Not provided`, `Not measured`, `Not estimable`,
   `Not measurable`, `Not run`, and `Not covered` item.

Use `Not provided` when an input was not supplied, `Not measured` when a defined
measure was not collected, `Not estimable` when current data cannot support a
defensible range, `Not measurable` when the outcome or comparison has no
observable route, and `Not covered` when the question is outside this skill.

## Edge cases

- **Cheap tokens, expensive review:** keep human review and rework in the full
  cost. Do not call the token price a unit economics result.
- **High usage, low acceptance:** use accepted outcomes as the denominator and
  inspect slices, retries, and escalation. Usage may be waste or necessary
  exploration.
- **Time saved with no capacity release:** label it a proxy or potential value.
  Do not claim headcount reduction or revenue from unused time.
- **Positive proxy, missing outcome:** choose `Test` or `Hold` and name the
  smallest outcome receipt. A proxy does not become realized value.
- **One large customer or team:** show the segment and do not generalize the
  value unit to the whole business.
- **Shared platform cost:** state allocation method or leave it
  `Not estimable`. Do not hide a committed capacity cost.
- **Negative case with an unmeasured upside:** choose `Hold` or `Test`, not
  `Stop`, unless the known risk or burden already crosses the stop rule.
- **Workflow changed during the period:** close the old window, record the
  change, and start a new comparable measurement.
- **Financial or regulated decision:** keep the output as a product evidence
  brief. Route accounting, legal, tax, procurement, and investment approval to
  the authorized specialists.
- **Fictional fixture:** say `fictional fixture` and mark every number or route
  as illustrative. Never call it a customer result, ROI, adoption proof,
  benchmark, or production evidence.

## Final check

- [ ] One workflow, user/job, successful outcome, quality bar, denominator, and
  decision owner are named or marked missing.
- [ ] Full cost includes attempts, retries, human review, correction/rework,
  support, operations, and fixed or capacity costs when supplied.
- [ ] Token price, usage, accepted work, dependability, proxy value, realized
  value, and business value are separate.
- [ ] Baseline, comparison, horizon, demand, capacity, and causality are
  present or explicitly labelled.
- [ ] Low/base/high scenarios identify assumptions and the sensitivity flip.
- [ ] The selected route has a next receipt, owner, timebox, guardrail, and stop
  trigger.
- [ ] No financial advice, ROI promise, budget approval, adoption claim,
  production claim, or star claim outruns the evidence.
- [ ] The brief ends with evidence boundaries and a next action, not a precise
  forecast made from missing inputs.

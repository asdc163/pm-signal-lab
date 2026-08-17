# Value-to-investment reference

Use this reference when one AI workflow is moving from a promising result to a
budget, capacity, or portfolio conversation. The output is a decision brief,
not a financial model and not a promise of return.

## When to use

Load this reference when the team needs to answer:

- What work counts as a successful outcome?
- What does one accepted outcome cost after retries, review, rework, and
  support?
- Which value unit belongs to the workflow and who can verify it?
- Which assumptions are realized, estimated, proxy, or not measurable?
- What small receipt would change the route?

## Start with the work

[OpenAI's July 2026 scorecard](https://openai.com/index/a-scorecard-for-the-ai-age/)
starts with useful work, not token volume. It asks how much work gets done,
what a successful task costs, how often the system gets the work right, and
whether each AI dollar buys more work as usage grows. Its examples use a
resolved support issue, a tested code change, or a contract reviewed accurately
and on time. Choose one such unit before adding a value estimate.

Write the finish line as:

```text
one accepted outcome = <artifact or downstream event>
              that satisfies <quality bar>
              for <eligible slice>
              during <window>
```

If a reviewer, approval, or downstream system decides whether the work is
accepted, name it. A fluent answer is not automatically an accepted outcome.

## Full cost ledger

[OpenAI's scorecard](https://openai.com/index/a-scorecard-for-the-ai-age/)
explicitly includes employee time, human review, retries, and rework in the
full cost of a successful task. Use one row per cost component:

| Component | Unit to ask for | Common omission |
| --- | --- | --- |
| Model/provider | cost per attempt, call, or period | retry and failed-call spend |
| Tools and data | call, search, storage, connector, or network cost | tool calls inside an agent loop |
| Attempts | attempts per eligible task | retries hidden by a final success rate |
| Human review | minutes and reviewer role per output | editing, fact checking, approval |
| Rework | minutes or repeat task after a miss | work sent back to the original owner |
| Support | questions, escalations, response time, training | enablement and exception handling |
| Integration | build, maintenance, evaluation, and operations | one-time work treated as free |
| Capacity | reserved compute, quota, concurrency, or team bandwidth | a workflow that displaces another priority |
| Fixed/committed cost | period and allocation method | shared platform cost with no owner |

Keep `source`, `period`, `unit`, `freshness`, and `evidence_status` beside each
row. If an input is absent, use `Not provided` or `Not estimable`. Do not choose
a generic hourly rate on behalf of the business.

The two useful calculations are:

```text
full_cost = all supplied cost components for the same period
cost_per_accepted_outcome = full_cost / outcomes that met the quality bar
```

The second line is invalid when the numerator and denominator use different
windows, eligible populations, or quality bars. Mark it `Not measurable` until
they line up.

## Value ledger

The value side needs its own owner. Ask:

| Question | Evidence label |
| --- | --- |
| Did the named work happen? | `realized` when observed in the system of record |
| Did the workflow change the intended outcome? | `realized` only with a baseline/comparison at the named scope |
| Is the value a forecast or owner assumption? | `estimated`, with method and range |
| Is the signal related but not the outcome? | `proxy` |
| Can the current environment observe the outcome? | `not_measurable` |
| Was no value definition supplied? | `not_provided` |

Do not double-count the same improvement. If a team finishes work sooner but
does not use the capacity for another named outcome, call it potential or
proxy value. If fewer escalations could reduce risk, name the risk event and
the comparison; do not price it from intuition.

## Dependability gate

The scorecard gives a practical three-state view:

- **Ready to use:** result met the bar without correction.
- **Needs correction:** a person edited it or another attempt was needed.
- **Needs escalation:** a person took over and finished the work.

Add a fourth state for failed or out-of-scope work when it affects the
denominator. Review by slice. A workflow that creates many attempts but few
ready-to-use outcomes may have a poor business case even when tokens are cheap.

## Scenario and sensitivity table

Use scenarios to make missing inputs visible, not to decorate the brief:

| Scenario | Demand | Acceptance | Review/rework | Full cost | Value per outcome | Route impact |
| --- | --- | --- | --- | --- | --- | --- |
| Low | supplied or `Not provided` | supplied or `Not measured` | supplied or `Not provided` | calculated or `Not estimable` | supplied or `Not provided` | what would make it fail |
| Base | named working assumption | named working assumption | named working assumption | range | range | current recommendation |
| High | bounded upper case | bounded upper case | bounded upper case | range | range | what would justify more scope |

For every assumption, add `owner`, `source`, `freshness`, and `what would
change it`. End the table with one sentence:

```text
The route flips if <receipt> moves from <current label> to <threshold or range>.
```

If no threshold is defensible, write `flip condition: Not estimable` and choose
`Test` or `Hold` rather than inventing one.

## Source notes

- [OpenAI: A scorecard for the AI age](https://openai.com/index/a-scorecard-for-the-ai-age/)
  (July 17, 2026) separates useful work, full cost per successful task,
  dependability, and value at scale. It explicitly includes employee time,
  human review, retries, and rework.
- [OpenAI: How to manage AI investments in the agentic era](https://openai.com/index/managing-ai-investments-in-agentic-era/)
  (July 14, 2026) connects outcome ROI, governance, maturity, proven demand,
  capacity, and support to investment decisions.
- [OpenAI: The five AI value models driving business reinvention](https://openai.com/index/the-five-ai-value-models-driving-business-reinvention/)
  (March 5, 2026) treats AI as a portfolio of value models with different
  economics, time-to-value, and foundations.
- [OpenAI and PwC: Reimagine the office of the CFO](https://openai.com/index/openai-pwc-finance-collaboration/)
  (May 4, 2026) describes finance workflows, governance, human oversight, and
  the need to track usage, token consumption, and projected spend as agentic
  work scales.

## Portfolio and capacity

[OpenAI's investment guidance](https://openai.com/index/managing-ai-investments-in-agentic-era/)
asks leaders to evaluate model efficiency by outcome ROI, govern workflows
before scale, fund repeatable workflows with clear ownership, and match
capacity to proven demand. The [AI value-model guidance](https://openai.com/index/the-five-ai-value-models-driving-business-reinvention/)
adds a portfolio lens: different value models have different economics,
time-to-value, and governance needs.

Use this narrow set of portfolio questions:

1. Does this workflow repeat enough to justify the named fixed or support cost?
2. What capacity does it consume, create, or displace?
3. Does it build a reusable foundation, or is the value isolated to one case?
4. Which other option would lose capacity if this one is funded?
5. What evidence is needed before the next tranche of time or budget?

Do not rank workflows on a hidden score. Show the evidence and the tradeoff.

## Route rules

- **Invest:** the named scope has a defensible accepted-outcome denominator,
  full-cost range, dependability evidence, value evidence, capacity fit, owner,
  and stop trigger. This prepares a proposal; it is not budget approval.
- **Test:** the work may matter but one evidence gap controls the decision.
  Name the smallest paired measurement and its owner.
- **Narrow:** the case works only for a slice, role, quality bar, or demand band.
  Keep the rest out of scope.
- **Hold:** a missing dependency, baseline, permission, capacity, or value
  definition makes continued investment premature. Name the unblock condition
  and review date.
- **Stop:** the accepted outcome is weak, full cost is unsustainable, or risk
  and burden exceed the stated value. Keep a closure receipt.

## Fictional worked fixture

The support-draft scenario in `examples/first-run.md` is a **fictional fixture**.
It demonstrates how to keep a promising workflow at `Test` or `Narrow` when
the accepted-outcome denominator, human review cost, support capacity, and
value baseline are not supplied.

## Not covered

This reference does not calculate a real company's ROI, pricing, valuation,
financial forecast, accounting treatment, tax position, procurement decision,
investment approval, adoption, causality, safety, privacy compliance,
production reliability, accessibility, or localization. It does not call a
provider, read telemetry, access customer records, approve budget, or change a
rollout.

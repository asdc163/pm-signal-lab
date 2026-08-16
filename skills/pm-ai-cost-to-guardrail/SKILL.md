---
name: pm-ai-cost-to-guardrail
description: Turn an AI or agent cost or latency signal into a source-bounded cost ledger, successful-outcome denominator, p50 and p95 latency budget, quality and trust guardrails, routing or scope options, and a ship, hold, or rollback decision. Use when a PM evaluates model, prompt, retrieval, tool, agent, context, caching, batching, or fallback changes against a real product budget.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Cost to Guardrail

Use this skill when an AI feature is cheap in a spreadsheet but may be expensive
per successful user outcome, slow on the critical path, or costly to operate
after retries, tool calls, fallbacks, or human review. It creates a reviewable
economics and reliability contract without hard-coding a provider price list.
The output is a decision packet, not a billing report, ROI proof, provider
recommendation, or production guarantee.

Cost includes only declared surfaces: model input and output, cache or batch
modifiers, tool or search calls, retries and loops, storage or transport,
manual review, and other variable operating work when a defensible source is
available. Keep provider list price, charged usage, estimated cost, and loaded
operating cost in separate rows.

## When to use

Use it when:

- an AI or agent workflow has a cost spike, token growth, retry loop, tool-use
  overhead, latency tail, timeout, or manual-review burden;
- a PM must decide whether a model, prompt, context, retrieval, tool, cache,
  batch, routing, or fallback change fits a product budget;
- a feature needs a cost-per-successful-job metric rather than cost per API
  request or total monthly spend;
- a launch or rollout needs quality, trust, latency, cost, and fallback gates
  that can block promotion independently;
- a team is comparing a cheaper path against a higher-quality path and needs
  the tradeoff made explicit without inventing business value.

Use `pm-outcome-to-metric` when the main question is a general product outcome
or denominator. Use `pm-ai-evaluation-plan` for quality slices and rubrics. Use
`pm-ai-incident-to-runbook` when a cost or latency event has become a
journey-level incident. Use `pm-release-to-learn` after a bounded release needs
an observation plan.

Do not use this skill to read a billing account, call a provider, change model
routing, cap a production budget, suppress telemetry, publish an ROI claim, or
declare that a cheaper path is better without a quality and trust comparison.

## Guardrails

1. Freeze each pricing input with source URL or document ID, retrieval time,
   currency, unit, region or tier, model or tool version, and effective window.
   If any field is missing, write `Not provided`.
2. Separate `observed charged usage`, `observed product outcome`, `estimated
   cost`, `price-sheet input`, `forecast`, `proposed`, `not measured`, and
   `unknown`. Never turn a price sheet into a usage result.
3. Define the denominator before dividing. `Cost per request` is not
   `cost per completed job`; a success oracle, eligible population, window,
   and fallback treatment must be visible.
4. Include failed, retried, abandoned, escalated, cached, batched, and manually
   completed paths when they affect the declared outcome. Do not hide cost in a
   successful-only numerator.
5. Report p50 and p95 latency separately for the critical journey. A good
   average cannot conceal a tail that causes timeout, abandonment, or support
   load.
6. Keep quality, safety, privacy, trust, and human-takeover guardrails beside
   cost. A cheaper answer that increases unsupported claims or manual recovery
   is not an optimization by itself.
7. Do not invent prices, volumes, success rates, conversion, margin, ROI, or
   savings. A fictional fixture can show arithmetic but cannot prove economics
   or demand.
8. Redact names, raw prompts, customer content, secrets, account IDs, private
   URLs, and payment details. Keep token counts, bucketed paths, and stable safe
   IDs when they are sufficient.
9. Treat a cost or latency spike as a signal until its scope, version, traffic
   mix, denominator, and instrumentation quality are established. Do not claim
   root cause from a single aggregate chart.
10. Keep the smallest reversible option visible: scope reduction, context
    limit, retry cap, fallback, cache, batch, route change, or manual handoff.
    State the downside and rollback condition for each.
11. This skill is tool-free and model-agnostic. It does not access billing,
    telemetry, a model provider, or an external system.

## Core definitions

Use these definitions consistently:

| Term | Meaning | Evidence status |
| --- | --- | --- |
| Price input | Provider or internal rate for a stated unit and window | Supplied source |
| Charged usage | Billable usage recorded by an approved billing or usage source | Observed |
| Variable cost | Cost attributable to the declared workflow and window | Calculated from supplied inputs |
| Attempt | One request or workflow start | Not a success by itself |
| Completed job | A user outcome that meets a stated success oracle | Denominator candidate |
| Cost per completed job | Declared variable cost divided by completed jobs | Calculated only with a valid denominator |
| Latency | Time from the stated journey start to the stated success or safe fallback | p50/p95/p99 as available |
| Loaded operating cost | Variable cost plus declared human or infrastructure burden | Estimate unless directly observed |

Use formulas only after defining scope:

```text
model_cost
  = (input_tokens * input_price + output_tokens * output_price) / unit_scale
    + cache_or_batch_adjustment

workflow_variable_cost
  = model_cost + tool_cost + retry_cost + storage_or_transport_cost

cost_per_completed_job
  = workflow_variable_cost / completed_jobs

loaded_cost_per_completed_job
  = (workflow_variable_cost + declared_manual_or_infrastructure_cost)
    / completed_jobs
```

If `completed_jobs` is absent, zero, mixed with fallback outcomes, or defined
after looking at the result, do not calculate cost per completed job. Write
`Not measurable` and fix the denominator contract first.

## Workflow

### 1. Frame the decision and user outcome

Write one sentence:

> We need to decide whether `...` can support the user job `...` within
> `...` cost and latency guardrails while preserving `...` quality and fallback.

Name the journey, success oracle, current workaround, decision owner, budget
scope, observation window, and what would change the decision. Separate the
product outcome from the operating constraint.

### 2. Freeze pricing and usage evidence

Create a source ledger with IDs such as `P-001`, `U-014`, `J-003`, and `Q-002`.
For every price or usage row record source, timestamp, currency, unit, tier,
version, region, inclusion or exclusion, and whether it is observed or
estimated. Do not paste a provider's live table into a durable skill; store the
snapshot in the decision packet.

### 3. Define the denominator and metric tree

Write the eligible population, attempt event, progress event, completed-job
oracle, fallback outcome, abandonment, retry, and observation window. Build a
small metric tree:

```text
user outcome
  -> completed jobs / eligible jobs
  -> cost per completed job
  -> p50 / p95 critical-journey latency
  -> quality, trust, safety, fallback, and manual-burden guardrails
```

Do not replace the outcome with tokens, requests, acceptance clicks, or stars.

### 4. Build the cost ledger

List model input and output, cache reads and writes, tool or search calls,
retrieval, retries, loops, storage, transport, human review, and other declared
costs. Keep one row per component and show quantity, unit price, calculation,
source, and evidence status. Reconcile totals against the source window.

### 5. Map latency and journey health

Define start and end timestamps, critical path, async or batch boundary,
fallback boundary, p50, p95, p99 if available, timeout rate, retry time, and
abandonment. Segment by model, route, context size, tool path, locale, device,
and release only when the sample supports it. A faster response that lowers
quality or increases human correction is not an automatic win.

### 6. Compare options and tradeoffs

Compare at least the current baseline with the smallest plausible alternatives:

- reduce context or retrieval scope;
- cap retries, loops, tool calls, or output length;
- route simple cases to a lower-cost path and retain escalation;
- use cache or batch only where freshness and latency allow;
- narrow the user job or supported segment;
- preserve a manual or human fallback.

For every option record expected cost and latency effect, quality and trust
risks, implementation or operational cost, evidence status, rollback, and the
learning question. Do not recommend a provider from price alone.

### 7. Set guardrails and the decision rule

Define a proposed primary outcome, cost budget, p95 latency budget, quality
threshold, critical failure rule, manual-burden limit, privacy rule, and data
quality requirement. Write `Ship`, `Iterate`, `Hold`, `Rollback`, or `Need
evidence` conditions before interpreting results. Critical safety, privacy,
tool-action, or data-integrity failures can block release even when cost is low.

### 8. Define instrumentation and learning writeback

Specify the minimal events and trace fields needed to reproduce the ledger:
workflow ID, model/provider/version, prompt or policy version, input/output
tokens, tool calls, retries, cache/batch mode, latency spans, fallback,
completion oracle, human takeover, cost source, and privacy classification.
State how a real cost or latency failure becomes a regression, incident, or
next evaluation case.

### 9. End with one review ask

Choose exactly one: `Ship`, `Iterate`, `Hold`, `Rollback`, or `Need evidence`.
Name the owner, unresolved tradeoff, and next evidence that could change it.

## Output contract

Return these sections in this order. Keep unsupported fields explicitly
`Not provided`, `Not measurable`, `Not measured`, `Proposed`, `Not run`,
`Unknown`, or `Not covered`.

## Decision on the desk

State the decision ask, owner, user job, outcome, current workaround, declared
budget, evidence status, and what would change the decision.

## User job and outcome

Describe the target segment, trigger, critical journey, success oracle,
eligible population, fallback, observation window, and outcome that matters.
Keep cost and outcome separate.

## Pricing and usage evidence

List price and usage source IDs, retrieval time, currency, unit, tier, model or
tool version, region, inclusion or exclusion, observed versus estimated status,
and missing fields. Do not present a current price without a snapshot boundary.

## Cost ledger and denominator

Use a table with component, quantity, unit, price input, calculation, total,
source ID, evidence status, and limitation. Show the completed-job denominator,
fallback and retry treatment, cost per attempt, cost per completed job, and
loaded cost separately.

## Latency and journey budget

State start and end events, critical path, p50, p95, p99 if available,
timeout/retry/abandonment status, async or batch boundary, proposed budget,
and segment or version limitations.

## Quality and trust guardrails

List primary quality, critical failures, unsupported claims, citation or source
correctness, human takeover, fallback, privacy, safety, manual burden, and
accessibility checks. State which guardrail blocks promotion and which are not
measured.

## Options and tradeoffs

Compare baseline and at least one reversible alternative by cost, latency,
quality, trust, fallback, implementation burden, evidence status, rollback,
and learning question. Keep provider choice separate from product decision.

## Decision rule and release gate

State `Ship`, `Iterate`, `Hold`, `Rollback`, and `Need evidence` rules. Include
budget, p95, quality, safety, privacy, data quality, fallback, and owner gates.
Mark the result `Proposed` or `Not run` until fresh evidence exists.

## Instrumentation and learning loop

Define event and trace fields, privacy classification, denominator QA,
aggregation window, cost-source reconciliation, online feedback, regression or
incident writeback, and the next review date or trigger.

## Not covered

List missing pricing snapshots, charged usage, denominator, quality evidence,
production impact, provider behavior, cost allocation, infrastructure burden,
manual-review burden, latency tail, privacy, security, accessibility,
localization, adoption, retention, margin, ROI, and rollback execution.

## Review ask

Ask for exactly one of `Ship`, `Iterate`, `Hold`, `Rollback`, or `Need evidence`.
Name the decision owner, unresolved risk, and next evidence required.

## Edge cases

- **Only a provider price sheet:** record the price input, but keep usage,
  denominator, and cost per outcome `Not measured`.
- **Only total monthly spend:** state the allocation method and do not infer a
  per-job cost without a join to eligible jobs and paths.
- **No completed-job oracle:** stop at `Need evidence`; define the success
  behavior before optimizing cost.
- **Zero completed jobs:** do not divide by zero or report an infinite product
  cost as a business result; preserve the failure and fallback evidence.
- **Successful-only sample:** add failed, abandoned, retried, escalated, and
  fallback paths or mark the result selection-biased and non-decisive.
- **Average latency looks healthy:** inspect p95 and timeout/abandonment before
  calling the journey healthy.
- **Cost falls while quality falls:** let the quality or trust guardrail block
  promotion; do not call it a win.
- **Cache or batch reduces cost:** record freshness, eligibility, delay,
  cache-hit, and error effects; a discount is not free capacity.
- **Tool call has separate pricing:** include tool definitions, tool results,
  server-side charges, and retries in the ledger when supplied.
- **Manual fallback absorbs the work:** include declared review or support
  burden and keep fallback success separate from AI success.
- **Pricing changed during the window:** split the window by effective price
  boundary and do not blend incompatible rates.
- **Model or route changed mid-sample:** split versions or hold the comparison;
  do not attribute the result to one change.
- **Small or low-quality sample:** use directional diagnosis, not a precise
  forecast; state the sample and decision limitation.
- **Sensitive raw prompt or customer data:** redact it and retain counts,
  categories, hashes, or approved IDs only.
- **Agent loop or retry spike:** treat retries as cost and reliability signals;
  route the failure to regression or incident handling instead of hiding it.
- **Cost data is estimated:** label assumptions, sensitivity range, and the
  cheapest evidence needed to replace the estimate with observed usage.

## Final check

Before returning the packet, confirm:

- the user job, outcome, success oracle, eligible population, owner, and window
  are explicit;
- price inputs have source, time, currency, unit, tier, and version boundaries;
- observed usage, estimates, forecasts, and charged costs are not blended;
- the denominator is completed jobs, with retries, failures, abandonments,
  fallbacks, and manual burden treated explicitly;
- cost per attempt is not mislabeled as cost per successful outcome;
- p50 and p95 critical-journey latency and tail failure are visible;
- quality, trust, safety, privacy, human takeover, and fallback guardrails can
  block a cheap but harmful optimization;
- baseline and reversible alternatives include tradeoffs and rollback;
- instrumentation can reproduce the ledger without collecting raw sensitive
  content;
- fictional, synthetic, internal, and production evidence are labelled;
- `Not covered` lists unexecuted economics, quality, and release evidence;
- the final line contains one decision ask and one accountable owner.

---
name: pm-outcome-to-metric
description: Turn a product outcome or AI product goal into an evidence-bounded metric contract with a primary measure, denominator, window, guardrails, instrumentation gaps, and a decision rule. Use before an experiment, rollout, or evaluation when a PM needs to define what success means without inventing baselines or analytics evidence.
compatibility: No tools, network access, model provider, or external write required.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM Outcome to Metric

Use this skill before an experiment, pilot, rollout, or AI evaluation when the
team knows the outcome it wants but has not yet made the measurement contract
reviewable. It keeps the user outcome separate from product activity, proxy
signals, guardrails, and the data needed to observe them. The output is a
measurement design, not a result, benchmark, or analytics implementation.

## When to use

Use it for:

- a product decision that says “improve” or “reduce” without defining the
  observable outcome;
- an AI feature that needs task success, quality, trust, fallback, latency, or
  cost measures before a test;
- a prototype, pilot, or rollout that needs a primary metric and guardrails;
- a decision packet whose measurement section is still `Not provided`;
- a team that needs to separate a leading indicator from the outcome it is
  meant to proxy.

Do not use it to:

- read completed experiment results or claim lift; use
  `pm-experiment-to-readout` for that;
- invent a baseline, target, benchmark, sample size, denominator, or business
  impact;
- choose a metric because it is easy to collect while hiding a different user
  outcome;
- turn clicks, tokens, model calls, or generated outputs into success without
  explaining the user outcome they may represent;
- write analytics code, change a schema, call a provider, or publish a
  dashboard automatically.

## Guardrails

- Treat the supplied goal, decision, source, and measurement context as the
  evidence boundary. Missing fields are `Not provided`, `Not measured`, or
  `Proposed`; confident wording does not fill them.
- Keep these concepts separate: user outcome, behavior, product output,
  activity, proxy, guardrail, diagnostic, and business result.
- Every primary metric needs an observable unit, numerator, denominator or
  explicit non-rate form, time window, exposure boundary, source, owner, and
  evidence status. A rate without its denominator is `Not verified`.
- A proposed target or decision threshold is a proposal, not a baseline or
  achieved result. Keep the method and the owner who must approve it visible.
- Do not use a proxy as the outcome unless the relationship is stated as a
  hypothesis and the missing validation is recorded.
- Keep primary outcome and guardrails separate. A primary metric improvement
  does not erase a trust, privacy, safety, quality, cost, latency, or recovery
  failure.
- For AI products, define task slices, human or rubric review, model/version
  boundary, fallback, and uncertainty when output quality is part of the
  outcome. A model score is not automatically a user outcome.
- Qualitative success can be valid for an early prototype, but name the task,
  denominator of observed cases, context, and limitation. Do not write `most`
  or `users prefer` without a method that supports it.
- Minimize collection. Do not put names, email addresses, raw prompts, private
  tickets, credentials, tokens, or sensitive content into an event or public
  handoff merely to make a metric easier to count.
- The skill produces a reviewable contract only. It does not add telemetry,
  alter a database, create tickets, publish a release, or perform an external
  write.

## Workflow

### 1. Frame the decision and outcome

Write the decision on the desk, the user job, the desired progress, the current
workaround, and what would change the decision. Rewrite vague verbs such as
“improve” into an outcome that a person or system could observe. If the outcome
is missing, keep it as `Not provided` and return `Need evidence`.

### 2. Classify the proposed measure

Label each candidate as one of:

- `user outcome`: progress or result for the person doing the job;
- `behavior`: an action that may indicate progress;
- `product output`: what the system produced;
- `activity`: internal work or system volume;
- `proxy`: a proposed stand-in that needs validation;
- `guardrail`: a condition that must not worsen;
- `diagnostic`: a measure that helps explain the primary outcome;
- `business result`: a downstream result requiring its own attribution.

Do not let an easy-to-count activity silently replace the intended outcome.

### 3. Define the measurement unit and exposure

State the unit of analysis, eligible population or task, exposure event,
completion condition, time window, segment, version, and environment. If the
metric is a rate, write the numerator and denominator in plain language. If it
is a qualitative observation, state the observed-case denominator and method.

### 4. Write the primary metric contract

Choose one primary outcome measure and record:

1. name and user outcome;
2. why it changes the decision;
3. formula or exact observation rule;
4. numerator and denominator, when applicable;
5. window, exposure, segment, and product/version boundary;
6. source or instrumentation location;
7. baseline, target, and status, each marked `Not measured` or `Proposed` when
   not supplied;
8. owner and collection limitation.

If no defensible primary metric exists, return `Need evidence` and propose the
smallest safe observation rather than selecting a vanity metric.

### 5. Define guardrails and diagnostics

Choose only the guardrails that could change the decision. Common examples
include trust-boundary comprehension, privacy leakage, unsafe output, task
failure, recovery failure, latency, cost, accessibility, or model fallback.
For each one, state its unit, observation rule, source, threshold status, and
what action follows a failure. Add diagnostics only when they help explain the
primary outcome.

### 6. Audit instrumentation readiness

For every measure, classify the data path as `available`, `proposed`,
`partial`, `missing`, or `not appropriate`. Record event names or manual
capture steps only when supplied. Identify duplicate counting, missing
denominators, privacy risk, sampling bias, version drift, and who must approve
the collection. Do not treat a written event name as implemented telemetry.

### 7. Pre-commit the decision rule

State what result would support `continue`, `change`, `stop`, or `hold`. Keep
the rule proposed unless it was supplied before the test. Include guardrail
failure handling, minimum evidence needed, and the next action when the result
is inconclusive. Do not rewrite the rule after seeing a result.

### 8. Check AI-specific slices when relevant

If the outcome depends on AI behavior, identify representative task slices,
human review or rubric, acceptable fallback, model/version/config boundary,
latency or cost status, and the failure cases that must be visible. Route a
full evaluation design to `pm-ai-evaluation-plan`; this skill only defines the
measurement contract and its release dependency.

### 9. Hand off and write back

Give design, engineering, analytics, and QA the smallest measurement action.
Record the unanswered question, the privacy boundary, the location where the
result will be written back, and whether the next step is `Test`, `Ship`,
`Hold`, `Need evidence`, or `Reject`.

## Output contract

Return the following sections in this order. Keep unsupported fields explicitly
`Not provided`, `Unknown`, `Not measured`, `Not run`, or `Not covered`.

## Decision on the desk

State the decision, owner, user job, current workaround, desired outcome, and
what result would change the decision.

## Outcome and context

Describe the target user or task, trigger, desired progress, exposure boundary,
segment, product/version, environment, and the cost of doing nothing.

## Evidence boundary

List sources, method, scope, observed facts, reported facts, inferences,
proposed hypotheses, data limitations, decision supported, and decision not
supported.

## Metric contract

Include the primary metric name, outcome, formula or observation rule, unit,
numerator, denominator, window, exposure, segment, baseline, target, source,
owner, and evidence status.

## Guardrail and diagnostic contract

List each guardrail or diagnostic with its observation rule, unit, threshold
status, source, failure action, and limitation. Keep primary and guardrail
signals visibly separate.

## Instrumentation and privacy

State what is available, proposed, partial, missing, or not appropriate;
identify collection gaps, duplicate-counting risks, privacy minimization, event
ownership, and the manual capture path when applicable.

## Decision rule

State the proposed or supplied rule for `continue`, `change`, `stop`, `hold`,
or `Need evidence`, including guardrail failure and inconclusive-result
handling.

## Not covered

List unsupported baselines, targets, denominators, sample plans, segments,
versions, environments, attribution, quality, safety, cost, accessibility,
localization, adoption, retention, or business outcomes.

## Implementation handoff

Give design, engineering, analytics, and QA the smallest next action, affected
surfaces, evidence to collect, privacy review, writeback location, and one
review decision. A handoff is not proof that instrumentation exists.

## Review ask

Ask for exactly one decision: `Test`, `Ship`, `Hold`, `Need evidence`, or
`Reject`. Name the unresolved measurement risk.

## Edge cases

- **Outcome is vague:** rewrite it as a proposed observable job result or
  return `Need evidence`; do not select the first available event.
- **Numerator without denominator:** preserve the count, mark the denominator
  `Not provided`, and do not calculate a rate.
- **Event exists but outcome is unknown:** label the event a behavior or proxy
  and state the validation needed before using it as the primary measure.
- **Baseline is missing:** keep the target `Proposed` or `Not provided` and
  define how the baseline will be collected.
- **Primary outcome improves while a guardrail fails:** choose `Hold`, `Change`,
  or `Stop` according to the rule; do not average the failure away.
- **Small qualitative set:** keep exact cases and context, label the signal
  directional, and do not write `most users` or `users prefer`.
- **AI quality outcome:** keep task slice, rubric, human review, model/version,
  fallback, and failure handling visible; route a full plan to
  `pm-ai-evaluation-plan`.
- **Post-hoc metric:** mark the rule `Proposed` and say it was not pre-committed.
- **Privacy-sensitive event:** minimize fields, use a manual or aggregate
  capture where possible, and hold until the approved collection path exists.
- **Synthetic or fictional goal:** label the entire output as a `fictional fixture`;
  it can test the skill but cannot support a user, quality, adoption, or
  business claim.
- **No safe instrumentation path:** return `Need evidence` with the smallest
  privacy-safe observation instead of inventing telemetry.

## Final check

Before returning the metric contract, confirm that:

- the intended user outcome is distinct from activity, output, proxy,
  diagnostic, and business result;
- the primary metric has a unit, numerator/denominator or observation rule,
  window, exposure, source, owner, and evidence status;
- baselines, targets, thresholds, and decision rules are marked `Proposed` or
  `Not measured` when they were not supplied;
- guardrails are separate from the primary outcome and have failure handling;
- instrumentation readiness and privacy minimization are visible;
- AI-specific slices and fallback are included when relevant;
- no count, rate, benchmark, lift, adoption, quality, or business claim was
  added from guesswork;
- the output ends with `Not covered` and one review decision.

For a worked, fictional support-review metric contract, read
`references/support-review-metric-contract.md`.

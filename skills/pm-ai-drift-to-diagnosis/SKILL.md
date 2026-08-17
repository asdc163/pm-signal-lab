---
name: pm-ai-drift-to-diagnosis
description: Use when an AI product's quality, behavior, cost, latency, coverage, or completion signal changes across time and the PM must distinguish real drift from input mix, source, oracle, product, model, policy, instrumentation, or operational explanations before choosing an eval, intervention, hold, or rollback route.
---

# PM AI Drift to Diagnosis

## Overview

Use this skill to turn a time-varying AI signal into a claim-bounded diagnosis.
It forces the PM to frame comparable windows, eligible exposure, denominator,
slice, version, source, and oracle before calling something a regression. The
output is a diagnosis record and the smallest next comparison; it is not a
monitor, an anomaly detector, a statistical test, or an automatic mitigation.

## When to use

- a quality, trust, cost, latency, coverage, completion, refusal, or policy
  signal looks different from an earlier window;
- a dashboard, review pattern, support report, or pilot note suggests that an
  AI workflow changed after a release, source update, user-mix change, or
  operational event;
- a team wants to blame the newest model, prompt, retrieval index, tool, or
  policy before checking whether the comparison is valid;
- a PM needs to decide whether to observe, investigate, build an eval, narrow
  exposure, hold, or escalate a possible rollback.

## Do not use this when

- the task is one concrete failed run that needs a minimal reproduction; use
  [`pm-ai-trace-to-regression`](../pm-ai-trace-to-regression/SKILL.md);
- a single reviewed correction must become one privacy-safe eval case; use
  [`pm-ai-feedback-to-eval`](../pm-ai-feedback-to-eval/SKILL.md);
- the work already has a reconciled outcome and needs an improvement finding;
  use [`pm-ai-outcome-to-improvement`](../pm-ai-outcome-to-improvement/SKILL.md);
- a live, validated signal already needs a bounded intervention; use
  [`pm-ai-signal-to-intervention`](../pm-ai-signal-to-intervention/SKILL.md);
- a known model or provider lifecycle event needs a migration decision; use
  [`pm-ai-model-change-to-migration`](../pm-ai-model-change-to-migration/SKILL.md).

## Core rule

> A changed numerator is an observation. It becomes a drift hypothesis only
> after the comparison names the eligible exposure, denominator, user-job
> slice, baseline and candidate windows, source or oracle, version/config, and
> evidence status.

Never write “accuracy dropped,” “the model regressed,” or “users are failing”
when the record only shows a count, a rate with an unknown denominator, a
non-comparable window, or a reviewer impression.

## Workflow

### 1. Frame the signal

Write one sentence without a cause:

> For `[user job]`, `[signal]` changed from `[baseline observation]` in
> `[baseline window]` to `[candidate observation]` in `[candidate window]`.

Then capture:

| Field | Required question |
| --- | --- |
| `signal_id` | Which event, score, cost, latency, completion, or policy signal is being discussed? |
| `user_job` | What was the person or system trying to complete? |
| `unit` | What is one eligible request, session, task, artifact, or accepted outcome? |
| `baseline_window` | What exact start/end timestamps and timezone define the comparison baseline? |
| `candidate_window` | What exact start/end timestamps and timezone define the changed window? |
| `eligible_exposure` | Who or what could have encountered the workflow in each window? |
| `denominator` | Which eligible units are actually counted, and which are missing? |
| `slice` | Which user, tenant, route, language, source, task, risk, or device slice matters? |
| `version_config` | Which model, alias, prompt, tool, retrieval, policy, UI, and feature flag were active? |
| `source_or_oracle` | What source, label, reviewer rule, or terminal state says what “good” means? |
| `evidence_status` | Is this `Observed`, `Reported`, `Not run`, `Not provided`, `Conflict`, or `Need evidence`? |

If any field changes across the windows, record it as a possible explanation,
not as a correction to be silently ignored.

### 2. Check comparability before diagnosis

Use this order:

1. **Joinability:** Can the baseline and candidate be joined to the same unit,
   request, session, task, or artifact identity without exposing private data?
2. **Exposure:** Did the same eligible population have a comparable chance to
   enter the route? Do not use observed completions as exposure.
3. **Denominator:** Are exclusions, retries, timeouts, empty results, abstains,
   and missing labels counted consistently?
4. **Version:** Can the model/provider, prompt, tools, retrieval/source version,
   policy, UI, and feature flags be read for each comparison unit?
5. **Oracle:** Did the definition of acceptable output, reviewer rubric, source
   truth, or terminal outcome change?
6. **Instrumentation:** Did event names, logging, sampling, privacy redaction,
   ingestion delay, or aggregation logic change?
7. **Window:** Are time zones, freshness lag, seasonality, rollout ramp, and
   observation maturity comparable?

If a material check fails, set `comparability: Not comparable`, preserve the
observation, and route to `Need evidence` or `Investigate`. Do not repair the
gap by assuming the latest version caused it.

### 3. Classify competing explanations

Classify each case separately. A record may carry a primary hypothesis and
secondary hypotheses, but it must not collapse them into `MODEL_PROVIDER` by
default.

| Class | What may have changed | Minimum receipt before calling it supported |
| --- | --- | --- |
| `INPUT_DISTRIBUTION` | language, task shape, artifact mix, difficulty, or source population | matched input slice and exposure comparison |
| `USER_OR_TENANT_MIX` | user skill, tenant, geography, plan, route, or workflow mix | eligible population and segment denominator |
| `SOURCE_OR_FRESHNESS` | retrieved corpus, file version, index, schema, or source availability | source identity, freshness, permissions, and retrieval receipt |
| `ORACLE_OR_LABEL` | reviewer rubric, reference answer, terminal state, or label policy | versioned oracle and agreement/change record |
| `MODEL_OR_PROVIDER` | model, alias, endpoint, safety behavior, quota, or provider response | exact version and paired representative eval |
| `PROMPT_TOOL_CONFIG` | prompt, tool description, routing, context, memory, or flag | behavioral diff and paired slice |
| `PRODUCT_OR_WORKFLOW` | UI, handoff, approval, fallback, downstream mapping, or user path | journey state and downstream receipt |
| `POLICY_OR_RUBRIC` | safety, moderation, policy, or quality threshold | policy/rubric version and affected slice |
| `INSTRUMENTATION` | event schema, sampling, aggregation, logging, or delay | before/after instrumentation receipt |
| `OPERATIONAL` | outage, timeout, rate limit, queue, dependency, or deploy health | incident or service receipt linked to the slice |
| `EXPECTED_VARIANCE` | normal seasonality, small sample, task novelty, or workflow choice | stable baseline distribution or domain explanation |
| `UNKNOWN` | more than one explanation remains plausible | list of missing receipts and owner |

These labels are hypotheses until the receipt is reviewed. `UNKNOWN` is a
valid result, not a failed analysis.

### 4. Build a diagnosis table

Keep facts and explanations in separate columns:

| ID | Observation | Hypothesis | Evidence needed | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| `D-001` | Exact signal and comparable window facts | One drift class, not a verdict | Receipt that could support or reject it | Named owner | `Proposed` / `Reviewed` / `Need evidence` |

For every hypothesis, write one disconfirming check. Examples:

- If `MODEL_OR_PROVIDER`, compare the same representative task slice on the
  old and new version with the same oracle and count cost, latency, abstain,
  and required evidence.
- If `SOURCE_OR_FRESHNESS`, compare source identity, freshness, retrieval
  coverage, and permissions before comparing model outputs.
- If `INPUT_DISTRIBUTION`, reweight or separately report the affected slice;
  do not hide it in a blended rate.
- If `ORACLE_OR_LABEL`, freeze the previous rubric and rerun a blind review;
  a changed label rule is not model regression.
- If `INSTRUMENTATION`, reconcile raw event joins, sampling, delay, and
  aggregation before changing a product route.

### 5. Choose the smallest next comparison

Use the route only after the diagnosis table names its receipt:

| Route | Use when | Minimum next proof |
| --- | --- | --- |
| `Observe` | signal is low-risk, immature, or compatible evidence is not yet available | owner, window, watch condition, and stop time |
| `Investigate` | a join, source, instrumentation, or operational receipt is missing | one named lookup and expected receipt |
| `Eval` | a reproducible slice and oracle exist but quality is uncertain | paired case set with positive, negative, abstain, and expected-variance slices |
| `Narrow` | risk is bounded to a route, task, tenant, or version and exposure can be limited | scope, owner, user notice if needed, and verification window |
| `Hold` | the team cannot establish comparability or the change may be consequential | unchanged/manual route and explicit re-entry condition |
| `Rollback candidate` | a material regression is independently supported and an authorized owner can act | impact, rollback scope, receipt, and post-rollback verification |
| `Need evidence` | no route can be defended from the available record | missing fields, owner, and smallest evidence request |

This skill may propose a rollback candidate; it does not execute a rollback,
change a prompt, switch a model, alter a policy, or contact a user.

### 6. Write the diagnosis record

```text
diagnosis_id:
signal:
user_job:
observation:
baseline_window:
candidate_window:
eligible_exposure:
denominator:
slice:
version_config:
source_or_oracle:
comparability: Comparable | Not comparable | Not provided
primary_hypothesis:
secondary_hypotheses:
disconfirming_check:
evidence_status: Observed | Reported | Not run | Not provided | Conflict | Need evidence
route: Observe | Investigate | Eval | Narrow | Hold | Rollback candidate | Need evidence
owner:
stop_rule:
rollback_or_containment:
next_receipt:
not_claimed:
```

Separate `Finding: proposed`, `Diagnosis: reviewed`, `Fix: implemented`, and
`Outcome: verified`. A review of drift is not a release result.

## Quality gates

Before handing off the record, check:

- [ ] The user job and one unit of analysis are named.
- [ ] Baseline and candidate windows include timezone and observation maturity.
- [ ] Eligible exposure and denominator are distinct and present or explicitly
  marked `Not provided`.
- [ ] Model/provider, prompt/tool, source, oracle, policy, UI, and
  instrumentation changes are listed where relevant.
- [ ] At least one non-model explanation is considered.
- [ ] One disconfirming check is assigned to a named owner.
- [ ] The route has a stop rule, next receipt, and containment or rollback note.
- [ ] No live quality, safety, causal, adoption, or production claim is made.

## Output contract

Return these sections in order and preserve missingness:

### Signal frame

State the user job, unit, signal, baseline/candidate windows, eligible
exposure, denominator, slice, version/config, source/oracle, and evidence
status.

### Comparability check

Show each material join as `Comparable`, `Not comparable`, or `Not provided`.
Name the missing receipt and owner; do not silently repair a gap.

### Diagnosis table

List observation, primary and secondary hypotheses, drift class, disconfirming
check, owner, status, and route. Keep `UNKNOWN` when explanations cannot be
separated.

### Smallest next comparison

Choose one reversible `Observe`, `Investigate`, `Eval`, `Narrow`, `Hold`,
`Rollback candidate`, or `Need evidence` route with a receipt and stop rule.

### Not covered and review ask

List unsupported quality, safety, causal, adoption, production, or rollback
claims, then ask for one sanitized evidence receipt.

## Edge cases

- **The numerator changed but exposure changed too:** keep the observation and
  stop at `Not comparable` until eligible exposure and denominator are joined.
- **The model alias changed:** classify it as a hypothesis and record the exact
  version; do not infer regression without a paired representative slice.
- **The source or rubric changed:** freeze or version the source/oracle before
  comparing model behavior; a changed reference can create measured drift.
- **The event schema changed:** reconcile raw events, sampling, delay, and
  missing joins before interpreting a rate.
- **The signal improved:** check whether a critical slice, abstention, user mix,
  cost, latency, or policy guardrail worsened behind the aggregate.
- **The signal is too small or immature:** route to `Observe` with an expiry,
  not a false precision claim.
- **A high-impact action is implicated:** stop diagnosis-to-optimization and
  route to the authorized incident, security, privacy, or approval owner.
- **A case contains sensitive material:** retain only a private authorized
  pointer and publish redacted IDs, categories, versions, and evidence status.

## Adjacent skills and handoff

Use one next skill after the diagnosis, not the whole catalog:

- `pm-ai-trace-to-regression` for one concrete failed run;
- `pm-ai-feedback-to-eval` for a reviewed correction that can become one
  privacy-safe eval case;
- `pm-ai-outcome-to-improvement` when the proposal-to-outcome chain is
  reconciled and needs an improvement finding;
- `pm-ai-output-to-eval` when the unit, oracle, and slices are ready for a
  repeatable output-quality evaluation;
- `pm-ai-improvement-to-route` when a validated gap needs a smallest lever;
- `pm-ai-signal-to-intervention` when a live signal has enough evidence for a
  bounded intervention;
- `pm-ai-model-change-to-migration` when the trigger is a known lifecycle or
  provider change;
- `pm-release-to-learn` only after a release is independently verified.

## Evidence language

Prefer `Observed`, `Reported`, `Comparable`, `Not comparable`, `Hypothesis`,
`Reviewed`, `Not run`, `Not provided`, `Conflict`, `Need evidence`, and
`Rollback candidate`. Avoid “proves,” “the model is worse,” “users failed,”
or “the fix worked” unless the specific claim has its own oracle and evidence.

## Not covered

- No live monitoring, alerting, statistical significance, causal inference,
  anomaly detection, dashboard, or automated mitigation is implemented.
- No model, provider, prompt, tool, retrieval, policy, UI, or feature flag is
  changed by this skill.
- No observation supports a quality, safety, cost, latency, completion,
  adoption, causal, or production claim by itself.
- No private trace, customer data, credential, secret, private URL, or source
  document may be copied into a public fixture.
- A diagnosis does not equal a regression, an intervention, a release,
  rollback approval, or an outcome.

For the field definitions, taxonomy, source ledger, and handoff template, read
[`references/drift-diagnosis.md`](references/drift-diagnosis.md).

## Final check

Before handing off, confirm:

- the user job, unit, windows, exposure, denominator, slice, version, source,
  oracle, and evidence status are explicit;
- at least one non-model explanation and one disconfirming check are present;
- `Comparable` is not claimed when a material join is missing;
- observation, hypothesis, reviewed diagnosis, fix, and verified outcome remain
  separate statuses;
- the route has one owner, one next receipt, one stop rule, and a containment or
  rollback boundary;
- the fixture and reference include `fictional fixture` and `## Not covered`;
- no private data, credential, secret, provider call, automatic write, quality,
  causal, safety, adoption, or production claim was introduced.

# Drift diagnosis reference

This reference is a field guide for a PM who has an AI signal that changed
over time. It is a **fictional fixture** guide: it defines receipts and
decision boundaries, not a production monitor or a statistical package.

## Source ledger

| Source | What it supports | What it does not support |
| --- | --- | --- |
| [OpenAI agent evals](https://developers.openai.com/api/docs/guides/agent-evals) | Start with traces for workflow issues, then move to datasets and eval runs when repeatability is needed. | It does not establish this product's drift, customer impact, or causal mechanism. |
| [OpenAI trace grading](https://developers.openai.com/api/docs/guides/trace-grading) | Structured grading can inspect model calls, tools, guardrails, and handoffs inside a trace. | A trace grade is not a time-window comparison, adoption measure, or user outcome. |
| [OpenAI model guidance](https://developers.openai.com/api/docs/guides/latest-model) | Representative tasks, required evidence, success, completeness, tokens, latency, cost, and calls belong in comparisons. | A provider's guidance or internal directional result is not evidence for a customer's system. |
| [OpenAI in-house data agent](https://openai.com/index/inside-our-in-house-data-agent/) | An evolving agent can drift; continuous evals can act as regression canaries, and context/source freshness affects correctness. | The internal agent's scale, results, or workflow are not a benchmark for this package. |

## The comparability ledger

Before naming a drift class, fill this table. Use `Not provided` instead of
guessing.

| Check | Baseline | Candidate | Status | Receipt or owner |
| --- | --- | --- | --- | --- |
| Window and timezone |  |  | `Comparable` / `Not comparable` |  |
| Observation maturity |  |  |  |  |
| Eligible exposure |  |  |  |  |
| Denominator and exclusions |  |  |  |  |
| User/job slice |  |  |  |  |
| Model/provider/alias |  |  |  |  |
| Prompt/tool/context/config |  |  |  |  |
| Source/index/freshness |  |  |  |  |
| Oracle/label/rubric |  |  |  |  |
| Policy/safety threshold |  |  |  |  |
| UI/workflow/downstream state |  |  |  |  |
| Instrumentation/sampling |  |  |  |  |
| Operational health |  |  |  |  |

If one material row is not joinable, the aggregate route is `Need evidence` or
`Investigate`, not `Model regression`.

## Drift taxonomy in practice

### Input or user-mix drift

Ask whether the work arriving in the candidate window is different. Compare
task type, language, tenant, source, difficulty, user experience, route, and
eligible exposure. A blended rate can worsen while every stable slice remains
stable. Keep the blended observation and report the slice difference.

### Source or freshness drift

Ask whether the model saw different evidence. Join source identity, retrieval
result, source version, freshness timestamp, permission outcome, missing-file
rate, and index state. A stale or inaccessible source can look like a model
quality problem.

### Oracle or label drift

Ask whether “good” changed. Freeze the previous rubric or reference where
possible, record reviewer calibration, and separate reviewer disagreement from
model output. A new policy can change the measured rate without a model change.

### Model, prompt, tool, or config drift

Ask what actually ran. Keep exact model/provider/alias, prompt version, tool
schema, routing, context/memory, feature flag, safety setting, and rollout
percentage. Test a representative paired slice before using this class as a
supported explanation.

### Product, operational, or instrumentation drift

Ask whether the user path or measurement changed. Inspect handoffs, approvals,
fallbacks, downstream mappings, queue/timeout/rate-limit receipts, event
schema, sampling, logging delay, and aggregation. A missing event is not a
missing user outcome.

### Expected variance or unknown

Small or novel samples, seasonality, task mix, reviewer preference, or normal
workflow choice may explain the observation. If the team cannot discriminate
among explanations, retain `UNKNOWN` and list the smallest evidence request.

## Minimum evidence by route

| Route | Minimum evidence | Stop rule |
| --- | --- | --- |
| `Observe` | owner, watch window, low-risk scope, and signal definition | stop when the signal crosses a named threshold or remains immature |
| `Investigate` | one missing receipt, one owner, and an expected result | stop when the receipt cannot be obtained or permission is absent |
| `Eval` | stable unit, oracle, paired versions, and positive/negative/abstain slices | stop when slices are not representative or labels are unresolved |
| `Narrow` | bounded route/tenant/task, exposure control, user communication if material, and verification window | stop if scope cannot be contained or the user job becomes unsafe |
| `Hold` | unresolved comparability or material risk, manual fallback, and re-entry condition | stop holding only when the missing decision evidence arrives |
| `Rollback candidate` | independently reviewed material impact, authorized owner, exact target, and post-action oracle | do not execute from this document alone |

## Diagnosis record template

```text
diagnosis_id: DRIFT-YYYY-MM-DD-###
signal:
user_job:
unit:
baseline_window:
candidate_window:
eligible_exposure:
denominator:
slice:
version_config:
source_or_oracle:
observation:
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

## Adjacent package boundaries

- `pm-ai-run-to-observability` defines the trace/event fields. Use this package
  after those fields exist to compare windows and classify change.
- `pm-ai-trace-to-regression` handles one failure trace. Use this package when
  the question is whether many observations or windows are comparable.
- `pm-ai-feedback-to-eval` turns one reviewed correction into one eval case.
  This package decides whether a changed rate or slice can be trusted first.
- `pm-ai-outcome-to-improvement` reconciles a proposal, correction, downstream
  artifact, and outcome. This package focuses on change over time, not one
  outcome chain.
- `pm-ai-signal-to-intervention` chooses a bounded live response after the
  signal has enough evidence. This package stops before intervention.
- `pm-ai-improvement-to-route` chooses the smallest technical/product lever
  after a gap is localized. This package does not choose a lever.

Do not chain all adjacent packages automatically. Pick the one receipt that the
diagnosis says is missing.

## Review checklist

- [ ] Is the user job explicit?
- [ ] Are baseline and candidate windows comparable in timezone and maturity?
- [ ] Are eligible exposure and denominator separate?
- [ ] Are version, source, oracle, policy, workflow, and instrumentation changes
      visible?
- [ ] Is at least one non-model hypothesis tested?
- [ ] Does each hypothesis have a disconfirming receipt and owner?
- [ ] Is the route proportional to evidence and risk?
- [ ] Are `Observed`, `Hypothesis`, `Reviewed`, `Fix`, and `Outcome` kept apart?
- [ ] Are privacy, permission, retention, and redaction boundaries explicit?
- [ ] Is the next action reversible and free of automatic external writes?

## Not covered

- This reference contains no live dashboard, trace, customer record, model
  call, provider result, statistical test, alert threshold, or causal estimate.
- The source links are design references; they are not evidence that this
  repository has drift, quality, adoption, safety, or production readiness.
- A rate change, trace grade, reviewer score, or traffic count is not a
  diagnosis without a comparable denominator and evidence chain.
- No real document, ticket, user identifier, credential, private URL, or
  production log belongs in a public example.

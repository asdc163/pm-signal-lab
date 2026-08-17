# First run: a fictional support-triage drift diagnosis

This is a **fictional fixture** for learning the skill. It is not a live
dashboard, customer record, benchmark, user study, causal analysis, provider
result, incident, deployment approval, or adoption evidence.

## Request

A fictional support PM says: “The percentage of AI-suggested support tickets
accepted without edits fell last week. The new model must be worse. Should we
roll it back?”

## Signal frame

| Field | Fictional entry | Status |
| --- | --- | --- |
| `signal_id` | `SUPPORT-ACCEPT-2026-W32` | `Reported` |
| `user_job` | Support agents need a suggested category and reply outline they can verify before sending. | `Supplied fictional` |
| `unit` | One eligible ticket shown an AI suggestion in the support queue. | `Supplied fictional` |
| `baseline_window` | 2026-08-03 to 2026-08-09, UTC | `Supplied fictional` |
| `candidate_window` | 2026-08-10 to 2026-08-16, UTC | `Supplied fictional` |
| `eligible_exposure` | Tickets routed to the AI suggestion panel | `Not provided` |
| `denominator` | 31 accepted / 100 observed in baseline; 24 accepted / 100 observed in candidate | `Supplied fictional; exposure not reconciled` |
| `slice` | All support queues blended together | `Not comparable` |
| `version_config` | Model alias, prompt, retrieval source, and policy version | `Not provided` |
| `source_or_oracle` | Agent acceptance event and support taxonomy | `Changed or unverified` |
| `evidence_status` | `Need evidence` | `Reviewed fictional` |

The reported numerator changed from 31 to 24, but the record does not yet show
that the same eligible tickets, queues, source version, policy, instrument, or
review rule were compared.

## Comparability check

| Check | Observation | Diagnosis status |
| --- | --- | --- |
| Exposure | A new email queue was added to the candidate window | `Not comparable` |
| Denominator | “Shown in panel” may exclude timed-out or hidden suggestions | `Not provided` |
| Source freshness | A fictional billing article was updated mid-week | `Hypothesis` |
| Model/provider | The model alias is not captured in the event | `Not provided` |
| Oracle/label | Agents were asked to use a new category policy | `Hypothesis` |
| Instrumentation | The accept event was renamed for one queue | `Hypothesis` |

The aggregate cannot be labelled a model regression. Keep the 31-to-24 change
as an observation and do not roll back from it.

## Competing hypotheses

| ID | Hypothesis | Smallest disconfirming check | Owner | Status |
| --- | --- | --- | --- | --- |
| `H-001` | `USER_OR_TENANT_MIX`: the new email queue has different ticket types | Compare eligible exposure and acceptance by queue and ticket type | Support analytics PM | `Proposed` |
| `H-002` | `SOURCE_OR_FRESHNESS`: the billing article changed what agents saw | Join source version, freshness, retrieval receipt, and queue slice | Knowledge owner | `Proposed` |
| `H-003` | `ORACLE_OR_LABEL`: the new category policy changed agent edits | Freeze the prior policy and blind-review the same ticket slice | Support quality owner | `Proposed` |
| `H-004` | `INSTRUMENTATION`: renamed events lowered the apparent numerator | Reconcile raw event names, delayed events, and missing joins | Analytics engineer | `Proposed` |
| `H-005` | `MODEL_OR_PROVIDER`: the model alias changed behavior | Confirm exact alias and run a paired representative eval after the other joins | Model owner | `Not eligible yet` |

The classes remain separate. None is supported by the fictional fixture alone.

## Diagnosis record

```text
diagnosis_id: DRIFT-2026-08-17-001
signal: AI suggestion accepted without edit
user_job: verify a support category and reply outline before sending
unit: one eligible ticket shown an AI suggestion
baseline_window: 2026-08-03..2026-08-09 UTC
candidate_window: 2026-08-10..2026-08-16 UTC
eligible_exposure: Not provided
denominator: observed panel impressions only; missing exposure reconciliation
slice: queues are blended; email queue was added
version_config: model alias, prompt, retrieval, policy, and event version missing
source_or_oracle: billing article and category policy changed or unverified
observation: accepted-without-edit count fell 31 to 24 in fictional samples
comparability: Not comparable
primary_hypothesis: UNKNOWN
secondary_hypotheses: USER_OR_TENANT_MIX, SOURCE_OR_FRESHNESS, ORACLE_OR_LABEL, INSTRUMENTATION, MODEL_OR_PROVIDER
disconfirming_check: reconcile queue exposure, event joins, source/policy versions, then compare a matched slice
evidence_status: Need evidence
route: Investigate
owner: support PM with analytics, knowledge, and model owners
stop_rule: stop if exposure, permissions, source, or event identity cannot be reconciled
rollback_or_containment: keep the unchanged manual review route; do not roll back from the fictional count
next_receipt: one sanitized matched slice with version and oracle fields
not_claimed: regression, quality, safety, completion, cost, adoption, causality, or production impact
```

## Smallest next action

Investigate one sanitized matched slice of tickets from the same queue and
ticket type. Reconcile eligible exposure, raw event joins, source/policy
versions, model alias, and the old/new acceptance rule. If a stable oracle and
paired slice become available, hand that case to `pm-ai-output-to-eval` or
`pm-ai-feedback-to-eval`; otherwise keep the route at `Need evidence`.

Do not chain every evaluation, intervention, or migration skill. The missing
receipt determines the next handoff.

## Verification and release gate

The diagnosis is `Diagnosis: proposed`; no fix is implemented and no outcome is
verified. The fictional counts are not a benchmark. A future candidate must
include stable exposure, denominator, version, source, policy, and oracle
receipts plus negative, expected-variance, and abstain cases.

## Not covered

- No live support queue, ticket, model, provider, article, policy, event log,
  analytics system, evaluator, customer, or production trace was accessed.
- The 31-to-24 change is fictional and supports no model-error, quality,
  safety, cost, latency, completion, adoption, causal, or rollback claim.
- No dashboard, alert, statistical test, prompt change, model switch, policy
  edit, issue, PR, feature flag, or release is approved.
- No private document, customer identity, credential, token, or production URL
  may replace this fictional fixture.

## Review ask

Review the comparability table first. Which receipt would your workflow need
before calling this a model regression: exposure and denominator, source
freshness, policy/oracle, instrumentation, or exact model/config identity?

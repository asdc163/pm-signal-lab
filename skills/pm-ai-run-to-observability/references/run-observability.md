# Worked example: support draft run observability

This is a **fictional fixture** that demonstrates a complete review packet for
`pm-ai-run-to-observability`. It is intentionally provider-neutral and contains
no customer content, raw prompt, credential, private URL, production log, or
real telemetry receipt. `Observed` below means observed inside this fictional
fixture only; it is not evidence that a deployed system emitted these events.

## Decision on the desk

`Hold` collection until the event contract, redaction test, deletion path,
unknown-effect reconciliation, and outcome denominator are executed by an
authorized owner. The product decision is whether a support agent can diagnose
why a source-backed draft became reviewable, stale, blocked, or manual fallback
without seeing sensitive run content.

## User job, boundary, and hierarchy

The job is: “review one current support reply draft for one scoped account.” A
run starts at `draft.requested` and ends at `draft.reviewable`, `fallback.entered`,
or a safe terminal error. Manual send is a separate effect boundary.

| ID | Parent | Event or span | Safe fields | Status |
| --- | --- | --- | --- | --- |
| `S-fic-009` | — | session window | expiry category, actor class | Proposed |
| `R-fic-009` | `S-fic-009` | run | workflow, route, outcome | Proposed |
| `T-fic-009` | `R-fic-009` | draft task | task class, state | Proposed |
| `SP-fic-021` | `T-fic-009` | source retrieval | source class, freshness, duration bucket | Proposed |
| `SP-fic-022` | `T-fic-009` | policy check | policy version, decision category | Proposed |
| `SP-fic-023` | `T-fic-009` | draft proposal | model/config class, output category | Proposed |
| `SP-fic-024` | `T-fic-009` | fallback | reason, owner, receipt status | Proposed |

The correlation rule is `session -> run -> task -> span -> event`. Retry
attempts receive a separate attempt ID and reuse an idempotency key only when
the workflow contract permits it. Source and ingestion timestamps are both
kept as safe metadata. Out-of-order events remain visibly out of order.

## Event ledger and evidence spine

| Event | Required safe attributes | User or operating question |
| --- | --- | --- |
| `run.started` | run ID, task class, scope class, version | What job was attempted? |
| `source.selected` | source class, snapshot, freshness category | Which approved source was used? |
| `policy.checked` | policy version, decision, actor/scope class | Why was this route allowed or blocked? |
| `tool.completed` | tool class, result category, duration bucket | Did the approved read step return? |
| `approval.requested` | target class, approval state, policy version | What needs human review? |
| `fallback.entered` | fallback class, reason, owner | What safe path remains? |
| `run.completed` | outcome category, oracle version | Did the user job reach its oracle? |
| `receipt.unknown` | effect class, attempt ID, reconcile owner | What cannot be safely assumed? |

The evidence spine links each event to a safe run ID, source/version class,
policy/config version, actor class, scope class, outcome category, and owner.
It does not link to raw content. A missing link is a telemetry gap, not a
successful default.

## Fictional safe receipt

```json
{
  "run_id": "R-fic-009",
  "event_type": "fallback.entered",
  "attempt_id": "A-fic-009-01",
  "actor_class": "support-workflow",
  "scope_class": "one-account",
  "reason_category": "source-stale",
  "policy_version": "policy-class-4",
  "outcome_category": "manual-draft",
  "effect_status": "none-observed",
  "redaction_status": "fixture-reviewed",
  "evidence_status": "proposed"
}
```

This receipt is a fixture, not a production receipt. `none-observed` is not a
claim that no side effect happened in a real system; it is the fictional
contract's safe state for a path that has no send capability.

## Metrics and diagnosis

The proposed denominator is eligible runs started in one declared workflow,
version, and window. The minimum calculations are:

```text
trace_completeness = runs with all required safe events / eligible runs
outcome_link_rate = runs with a reviewed outcome / eligible runs
diagnosable_run_rate = runs meeting both minimums / eligible runs
fallback_observability_rate = fallback runs with a safe receipt / fallback runs
```

All four are `Not measurable`: this fixture has no eligible-run count, window,
execution result, or reviewed outcome. A diagnosis query would segment by
workflow version, source freshness category, policy decision, route, and
fallback reason, then name support operations as owner. It cannot prove model
root cause or user prevalence from one event.

## Failure and recovery matrix

| Failure | Safe state | Recovery owner | Gate |
| --- | --- | --- | --- |
| Missing run ID | Trace incomplete | Workflow owner | Do not join by time alone |
| Redaction failure | Record quarantined | Privacy owner | Pass field-level redaction test |
| Duplicate retry | Attempt separated | Workflow owner | Reconcile idempotency/effect |
| Unknown receipt | No blind retry | Operations owner | Confirm effect before resume |
| Stale source | Manual source check | Support operations | Fresh source and outcome link |
| Child task failure | Parent fallback visible | Agent workflow owner | Negative/fallback case passes |
| Delete request | Retention action pending | Privacy owner | Deletion evidence recorded |

## Release gate

| Gate | Required evidence | Status |
| --- | --- | --- |
| Correlation and ordering | Parent/child, retry, clock tests | Proposed; not run |
| Outcome linkage | Reviewed oracle and denominator | Not provided |
| Redaction | Sensitive-field negative tests | Not run |
| Retention and deletion | Expiry/delete/export evidence | Not run |
| Fallback and unknown receipt | Safe receipt and reconciliation | Not run |
| Diagnosis | Query, owner, window, stop rule | Proposed |
| Rollback | Disable collection without blocking manual work | Proposed |

**Review ask:** `Hold` until the private fixture passes the redaction,
correlation, deletion, fallback, and unknown-receipt cases. Then `Iterate` with
one small sanitized pilot slice; do not call it production observability until
the current evidence supports that claim.

## Source boundary

This contract is informed by public engineering discussions that emphasize
agent-native telemetry, logs/metrics/traces, tool and approval visibility, and
trace or trajectory records as evidence for multi-step agent evaluation:

- [Running Codex safely](https://openai.com/index/running-codex-safely/)
- [Harness engineering](https://openai.com/index/harness-engineering/)
- [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

These sources motivate the categories in this fixture; they do not prove any
specific provider, deployment, privacy posture, security certification,
reliability, demand, adoption, traffic, or stars for this repository.

## Not covered

- live logs, traces, metrics, billing, model responses, tools, MCP servers, or
  network requests;
- raw customer content, prompts, credentials, private URLs, or hidden reasoning;
- a completed redaction, deletion, security, safety, reliability, or production
  test;
- observed user outcomes, cost, latency, prevalence, adoption, traffic, or stars;
- proof that this contract is sufficient for every AI or agent workflow.

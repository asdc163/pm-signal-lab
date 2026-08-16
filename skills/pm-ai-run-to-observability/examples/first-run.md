# First run: support draft observability contract

This is a **fictional fixture** showing how to use
`pm-ai-run-to-observability`. It does not connect to a model provider,
telemetry system, support account, customer record, connector, or network. The
IDs, fields, and decisions below are proposed design inputs, not observed
runtime evidence.

## Request

> We have an AI-assisted support draft workflow. When a draft is stale, blocked,
> or wrong, we cannot tell whether the source, policy, tool, approval, model,
> or fallback caused it. What should we observe without logging customer text?

## Decision on the desk

`Hold` the fictional observability rollout until the team defines a safe run
boundary, outcome oracle, event correlation, redaction test, retention/delete
path, unknown-effect recovery, and a real denominator. Keep the manual support
draft and send path unchanged.

## User job, run boundary, and outcome oracle

- **User job:** A support agent needs a current, source-backed reply draft for
  one account and must know whether it is safe to review and send manually.
- **Current workaround:** The agent checks the approved policy and account
  screen, writes a draft, and sends it without an AI run receipt.
- **Run start:** A support agent starts one draft request for one scoped account.
- **Run end:** A reviewed draft is shown, the workflow falls back, or the run
  reaches a safe terminal error. A send is outside this fictional run.
- **Outcome oracle:** The agent can identify the source freshness, review state,
  target scope, and reason for draft/fallback before deciding what to do.
- **Owner:** Support product PM; support operations owns fallback; privacy and
  security own data access, redaction, retention, and deletion review.
- **Observation window:** Not provided. No telemetry or user session was run.

## Trace hierarchy and event inventory

| Layer | Example safe ID | Minimum event | What it helps answer |
| --- | --- | --- | --- |
| Session | `S-fic-001` | start/reset/expiry category | Was this one interaction window? |
| Run | `R-fic-001` | start/end/outcome | Did the support job reach a reviewable state? |
| Task | `T-fic-001` | task class/status | Which bounded work unit stopped? |
| Span | `SP-fic-001` | operation class, duration bucket, version | Was retrieval, drafting, or policy check delayed? |
| Event | `E-fic-001` | type, order, safe attributes | What decision or state change occurred? |
| Receipt | `RC-fic-001` | effect status and reconciliation owner | Was an external effect attempted? |

Candidate event classes are `run.started`, `source.selected`,
`policy.checked`, `draft.proposed`, `approval.requested`, `fallback.entered`,
`run.completed`, `run.failed`, and `receipt.unknown`. Each event would carry a
safe correlation ID, actor class, source/version class, scope class, policy
version, model/config version, latency bucket, outcome/guardrail category, and
redaction status. Required fields and event ordering are proposed; not run.

## Privacy and evidence boundary

Do not collect raw customer text, prompts, account IDs, names, email addresses,
tokens, private URLs, authorization headers, tool payloads, or hidden reasoning.
Keep only category-level values such as `policy-freshness=stale`,
`scope=one-account`, `approval=required`, and `fallback=manual-draft`.

The fictional contract still needs a field-level redaction test, telemetry
access roles, retention duration, deletion/export behavior, sampling rule, and
audit of telemetry queries. All are `Not run`.

## Outcome, guardrails, and recovery

| State | Safe visible result | Evidence needed before it is counted |
| --- | --- | --- |
| Current source and draft ready | `Review draft` | Source freshness, policy check, scope, outcome link |
| Source stale or unavailable | `Manual source check required` | Source event, freshness category, fallback receipt |
| Policy or scope blocked | `Draft unavailable` | Policy decision, actor/scope class, no tool effect |
| Approval not completed | `Review still required` | Approval state and run end |
| Tool or provider timeout | `Manual draft path` | Timeout category, fallback, version, safe receipt |
| Possible side effect | `Status unconfirmed` | `receipt.unknown`, no blind retry, reconciliation owner |

Latency and cost are not calculated. A future packet may link bucketed run
latency and declared cost to completed reviewable drafts, but event volume is
not a success denominator.

## Evaluation and release gate

Proposed cases: current source, stale source, wrong scope, policy denial,
approval defer, tool timeout, duplicate retry, redaction failure, deletion
request, sampled-out critical error, and unknown receipt. No case has been
executed. No real telemetry, production, security, safety, reliability,
adoption, or demand evidence exists.

**Release decision:** `Hold`. The smallest next step is a private, sanitized
fixture that tests correlation, redaction, retention/delete, fallback, and
unknown receipt handling before any real collection.

## Not covered

- a model, agent, provider, telemetry SDK, dashboard, SIEM, or network proxy;
- real support accounts, customer content, credentials, prompts, or logs;
- a privacy, security, legal, compliance, reliability, or production claim;
- observed latency, cost, outcome rate, user value, adoption, traffic, or stars;
- proof that this fictional observability contract improves support work.

---
name: pm-ai-approval-to-flow
description: Turn an AI or agent action proposal into an evidence-bounded approval flow with risk classification, preview and diff, permission boundary, approve/reject/edit/defer states, durable receipt, recovery path, and evaluation or release gate. Use before an AI-assisted workflow can send, publish, delete, change access, spend money, or create another consequential side effect.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Approval to Flow

Use this skill to design the action-level contract between an AI or agent and
the person who remains accountable for a consequential action. It turns “the
agent can do this” into a visible preview, meaningful approval, explicit state
machine, least-privilege boundary, receipt, recovery path, and release gate.
The output is a human-reviewed product handoff. It is not permission to run an
action, a provider integration, a security approval, or proof that the flow is
safe in production.

## When to use

Use it when an AI or agent may:

- send a message, publish content, submit a form, create a ticket, or contact a
  person outside the current workspace;
- edit or delete a record, change access, spend money, schedule an event, or
  trigger an operational workflow;
- prepare an action that needs human review, but the current design does not
  say what the reviewer sees or what approval actually authorizes;
- resume or retry an action after a timeout, partial completion, duplicate
  request, stale source, or unknown side-effect receipt;
- turn a task-boundary decision into an implementable approval and recovery
  flow before engineering or an evaluation begins.

Use `pm-ai-task-boundary` when the open question is who should own a task or
what autonomy level is appropriate. Use `pm-ai-incident-to-runbook` after a
journey-level failure needs containment and recovery. Use
`pm-ai-evaluation-plan` to design quality slices, and `pm-decision-to-spec` for
the broader product handoff after this action contract is settled.

Do not use this skill to approve a real action, call a model or tool, change a
permission, resume a run, send a message, modify a record, create an issue, or
claim that a preview or receipt was verified when it was not executed.

## Guardrails

1. Start with the user job, the intended outcome, the action target, and the
   accountable decision owner. A model output is not an authorization.
2. Separate preparation from execution. A draft, recommendation, or plan
   must not silently inherit permission to perform its proposed action.
3. Classify consequence, reversibility, scope, affected people, data class,
   and observability. High-impact or irreversible actions require an explicit
   human approval stop unless an authorized policy says otherwise.
4. Make approval meaningful: show actor, target, scope, content or diff,
   sources and freshness, side effects, remaining uncertainty, and what the
   approval authorizes. “Continue” is not an approval contract.
5. Invalidate approval when the action, target, source, policy, recipient,
   permission, or material content changes. Never execute an edited proposal
   under an old approval.
6. Use least privilege and action-specific permissions. Do not infer access
   from the word `agent`, a previous approval, or a successful draft.
7. Preserve durable `proposed`, `approved`, `executing`, `completed`, `failed`,
   and `unknown` states. A successful command is not a completed side effect
   without an approved receipt or owner reconciliation.
8. Make retries idempotent or stop them. A timeout or missing receipt is an
   unknown state, not permission to blindly replay.
9. Keep manual fallback, stop, reject, edit, defer, expiry, escalation, and
   rollback visible. A human click is not meaningful control if the person
   cannot inspect the consequence or recover from it.
10. Redact names, email addresses, account IDs, secrets, private URLs, payment
    details, tenant data, and raw customer content. Use stable safe IDs.
11. Separate `observed`, `reproduced`, `inferred`, `proposed`, `not run`, and
    `not measured`. Synthetic or fictional fixtures do not prove demand,
    safety, reliability, adoption, or production readiness.
12. This skill is tool-free and model-agnostic. It produces an authorized
    owner handoff and makes no external write.

## Action risk frame

Complete this frame before choosing a flow:

| Field | Question |
| --- | --- |
| User job | What progress is the person trying to make? |
| Proposed action | What exact state-changing action might occur? |
| Target and scope | Which record, recipient, workspace, amount, or time range is affected? |
| Consequence | What could go wrong for the user or another person? |
| Reversibility | Can the action be undone, and how quickly? |
| Data and permission | What sensitive data and least-privilege access are required? |
| Evidence | What source, policy, preview, or receipt supports the action? |
| Fallback | What safe manual path remains if the AI stops? |
| Owner | Who can approve, reject, stop, reconcile, or reopen the path? |
| Stop rule | What must prevent execution or resume? |

Do not collapse preparation and execution into one row. Keep a generated draft,
a human decision, an execution request, an external result, and a durable
receipt as separate events.

## Workflow

### 1. Frame the decision and user job

Write one sentence:

> We need to decide whether `...` may prepare or execute `...` for `...`, with
> human control at `...`, using evidence `...` and fallback `...`.

Name the decision owner, affected people, current workaround, and evidence that
could change the boundary. If the action target or owner is missing, keep the
decision at `Need evidence`.

### 2. Decompose preparation from execution

List the smallest action sequence:

1. request and context intake;
2. source or policy lookup;
3. draft, recommendation, or plan generation;
4. validation and preview;
5. human edit, approve, reject, or defer;
6. permission check and execution request;
7. external result and receipt reconciliation;
8. continuation, rollback, or manual handoff.

Mark which steps are read-only, reversible, state-changing, or ambiguous. Do
not grant execution authority to a planning step.

### 3. Classify risk and autonomy

Choose an action-level autonomy level from the existing ladder:

- `0 Observe`: inspect or summarize without proposing an action;
- `1 Draft`: prepare content or parameters for a person;
- `2 Recommend`: rank or explain an option while the person decides;
- `3 Act with confirmation`: execute only after a current approval;
- `4 Act within bounded policy`: execute within an explicit, reviewed policy;
- `5 Autonomous`: execute without per-action confirmation only when the
  authorized policy, scope, monitoring, rollback, and evidence support it.

State why the level fits consequence, reversibility, user expectation,
verification, and observability. Do not use autonomy level as a quality score.

### 4. Design the preview and approval contract

Show the reviewer the action in the same terms the system will execute:

- who or what will be affected;
- before/after values or the exact content and destination;
- sources, policy version, freshness, and unresolved uncertainty;
- attachments, permissions, cost, timing, recurrence, and side effects;
- what `Approve`, `Reject`, `Edit`, `Defer`, and `Cancel` each mean;
- whether the action expires and what changes invalidate approval.

Use `Preview` or `Ready for approval` until the person has a meaningful choice.
Do not hide material fields behind an expandable detail view only.

### 5. Define states and transitions

At minimum, cover `Draft`, `Needs review`, `Edited`, `Approved`, `Rejected`,
`Deferred`, `Expired`, `Executing`, `Partially completed`, `Completed`,
`Failed`, and `Unknown`. For every transition, name actor, precondition,
visible status, receipt, and next safe action.

An edit, target change, source refresh, policy change, permission change, or
expiry returns the action to `Needs review`. `Completed` requires a durable
result receipt; otherwise remain `Unknown` and block replay.

### 6. Set permission, audit, and receipt boundaries

Define least-privilege resources, destination, actor, time window, rate limit,
idempotency key, approval ID, action ID, trace ID, policy/config version, and
redacted audit fields. The receipt should distinguish accepted, executed,
partially completed, rejected, failed, and unknown. An API response of “queued”
is not proof of external completion.

### 7. Map failure and recovery

Cover stale context, ambiguous recipient, policy denial, permission expiry,
validation failure, tool timeout, duplicate request, partial execution, missing
receipt, edited-after-approval, and user cancellation. For each, provide a
user-visible state, safe action, owner, escalation, and writeback destination.
Prefer stop and reconcile over retry when an external side effect is possible.

### 8. Define the smallest evaluation and release gate

Propose a bounded, reversible test with normal, edited, denied, stale, timeout,
duplicate, and unknown-receipt cases as relevant. Measure approval clarity,
correct target and diff, denied-action behavior, receipt integrity, recovery,
and false completion separately. Include human review, privacy, cost,
latency, accessibility, and rollback checks when applicable. Keep status at
`Proposed` or `Not run` until fresh evidence exists.

### 9. Hand off and write back

Route the contract to the smallest owner surface: UX state spec, permission
policy, deterministic validator, eval case, trace schema, issue, or release
gate. Link stable IDs and version boundaries. End with one decision ask:
`Test`, `Revise`, `Hold`, `Need evidence`, or `Reject`.

## Output contract

Return these sections in this order. Keep unsupported fields explicitly
`Not provided`, `Unknown`, `Proposed`, `Not run`, `Not measured`, or `Not covered`.

## Decision on the desk

State the decision, accountable owner, user job, proposed action, current
workaround, autonomy level, evidence status, and what would change the decision.

## User job and action

Describe the trigger, desired progress, preparation steps, execution step,
target, scope, affected people or records, consequence of error, reversibility,
and the safe manual alternative.

## Evidence boundary

List source IDs, trace or run IDs, policy and version boundaries, source
freshness, target evidence, receipt evidence, redaction, and missing fields.
Separate observed behavior, report, inference, proposal, synthetic fixture, and
production evidence. State what each item proves and cannot prove.

## Action and risk map

Use a table with action ID, preparation or execution, target, data and
permission, consequence, reversibility, autonomy level, guardrail, owner,
evidence status, and stop condition. Keep side effects explicit.

## Preview and approval contract

Specify the exact fields shown before approval, before/after or content diff,
source and freshness display, uncertainty, destination, side effects, approval
wording, edit behavior, expiry, rejection, defer, cancel, and invalidation
rules. State what the approval does not authorize.

## State model and transitions

Show the states from draft through terminal or unknown outcome. For every
transition, name actor, precondition, visible status, audit event, receipt, and
next action. Make edited-after-approval and missing-receipt paths explicit.

## Permissions, audit, and receipt

Define least-privilege resources, actor, destination, time window, rate limit,
idempotency key, approval ID, action ID, trace ID, policy/config version,
redacted audit fields, receipt schema, and reconciliation owner.

## Failure, recovery, and escalation

Use a table with failure case, user-visible state, blocked action, safe recovery,
owner, escalation, fallback, and regression or feedback capture. Do not advise
blind replay.

## Smallest evaluation and release gate

State the smallest reversible test, slices, primary measure, guardrail, human
review, privacy and accessibility checks, cost or latency checks, rollback,
proposed threshold, and decision rule. Mark execution `Not run` until evidence
exists.

## Not covered

List missing model or provider behavior, demand, prevalence, production impact,
real receipts, customer communication, safety, security, privacy, accessibility,
localization, cost, latency, adoption, reliability, and rollback execution.

## Implementation handoff

Give the authorized owner exact surfaces, state and event changes, permission
review, eval cases, UX and accessibility checks, trace fields, rollout gate,
rollback path, and follow-on skill. A handoff is not implementation or approval
to execute.

## Review ask

Ask for exactly one of `Test`, `Revise`, `Hold`, `Need evidence`, or `Reject`.
Name the unresolved risk, decision owner, and next evidence that could change
the ask.

## Edge cases

- **Action target is missing:** keep the proposal at `Need evidence`; do not
  approve a generic recipient, record, destination, or amount.
- **The proposal is edited after approval:** invalidate the approval, issue a
  new approval ID, and return to `Needs review`.
- **Source or policy becomes stale:** show the changed version and require a
  fresh preview; do not reuse the old approval.
- **Approval expires:** stop execution, preserve the proposal, and require a
  current review rather than silently extending the window.
- **Permission is denied or expires:** show a denied state, keep the action
  unexecuted, and route to an authorized owner or manual fallback.
- **Execution times out with no receipt:** mark `Unknown`, block replay, and
  reconcile through the approved record path.
- **A partial side effect occurs:** preserve completed and unresolved parts,
  stop dependent actions, and use an owner-led recovery plan.
- **Duplicate request:** use an idempotency key or stop for reconciliation;
  never assume two accepted requests are one action.
- **Several approvers:** define whether approval is sequential, quorum-based,
  or owner-specific; record each decision and the final authority.
- **Generated content changes while waiting:** freeze the reviewed version or
  invalidate it when material content, source, or policy changes.
- **High-risk action has no credible fallback:** keep execution contained and
  escalate; do not lower the approval bar to improve completion rate.
- **Synthetic or fictional input:** label the fixture and limit claims to its
  structure and known behavior.
- **The person clicks quickly:** treat speed as unknown, not consent quality;
  show consequence, target, and a final stop point.
- **Already completed action:** require a current receipt and owner
  reconciliation before presenting it as completed or retryable.

## Final check

Before returning the contract, confirm:

- the user job, action target, scope, owner, consequence, and workaround are
  explicit;
- preparation is separate from execution and autonomy is assigned per action;
- preview shows target, diff, sources, freshness, uncertainty, and side effects;
- approval is meaningful, current, expiring where needed, and invalidated by
  material changes;
- states cover reject, edit, defer, cancel, timeout, partial completion,
  failure, unknown receipt, recovery, and safe continuation;
- permissions are least-privilege and audit/receipt fields are durable;
- retries are idempotent or blocked pending reconciliation;
- evaluation includes negative and high-risk slices, human review, fallback,
  rollback, privacy, accessibility, and not-run status;
- fictional, synthetic, internal, and production evidence are not blended;
- `Not covered` lists unexecuted verification and unresolved risk;
- the final review ask contains one decision and one accountable owner.

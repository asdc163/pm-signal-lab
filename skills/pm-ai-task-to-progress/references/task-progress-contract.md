# Worked reference: AI task to progress

This worked reference is a **fictional fixture**. It demonstrates a PM
contract for an asynchronous task; it is not a live worker, model result,
protocol conformance test, reliability result, or adoption measurement.

## Method notes

The contract uses current public method references as design input:

- [OpenAI Agents SDK RunState](https://openai.github.io/openai-agents-python/ref/run_state/)
  describes a serializable run snapshot and a durable pause/resume boundary
  for interrupted human-in-the-loop runs. It says state includes runtime
  metadata such as interruptions and approval state, and that custom context
  serialization needs care. This informs identity and resume design; it does
  not prove a product’s persistence or recovery.
- [OpenAI Agents SDK human-in-the-loop](https://openai.github.io/openai-agents-python/human_in_the_loop/)
  shows resolving interruptions and resuming the original run, and documents
  long-running state serialization and versioning of pending tasks. This is a
  method reference, not an implementation in this skill.
- [OpenAI Agents SDK streaming](https://openai.github.io/openai-agents-js/guides/streaming/)
  notes that a cancelled stream may not have final output, that the caller
  should await the stream’s settled state, and that an unfinished turn should
  resume from its state rather than start a fresh turn. This informs the
  terminal oracle and duplicate/retry boundary.
- [MCP Tasks](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/tasks)
  defines `working`, `input_required`, `completed`, `failed`, and `cancelled`
  states, task timestamps, TTL, polling hints, optional status notifications,
  result retrieval, and cancellation semantics. The specification says Tasks
  were introduced in version `2025-11-25` and are experimental, so this
  reference treats rich task support as host-dependent and requires fallback.

## Task frame

- **Product job:** A PM requests a fictional weekly evidence digest from an
  approved set of product notes.
- **Task identity:** `fictional-digest-001`; a retry is linked to an attempt ID
  only after the original state and idempotency key are reconciled.
- **Scope:** one fictional product area and one approved note set.
- **Owner:** the requesting PM owns scope and final review; the worker does not
  own publication or external communication.
- **Consequence:** digest preparation has no external side effect. Publishing,
  messaging, or editing a source record is a separate approved action.
- **Definition version:** `digest-contract-v1`; a paused task under another
  definition is held or explicitly migrated.
- **Retention:** a fictional TTL is shown to the user; an expired task may no
  longer expose a result unless the retention policy permits retrieval.
- **Terminal success:** a validated digest result and source-status receipt are
  available. “Task created,” “queue accepted,” “stream started,” or
  “notification delivered” are not completion.
- **Outcome:** whether the PM made a better product decision is a separate,
  product-specific outcome and is not inferred from task completion.

## Lifecycle state machine

```text
created -> queued -> working -> completed
                   |        -> failed
                   |        -> input_required -> working
                   |        -> approval_required -> working
                   |        -> paused -> working
                   |        -> cancelling -> cancelled
                   |        -> expired
```

| State | User-visible contract | Evidence oracle |
| --- | --- | --- |
| `created` | Task ID, scope, owner, version, and retention are visible | creation receipt |
| `queued` | Accepted but not executing yet | queue/acceptance receipt |
| `working` | Observed unit or last update is visible | worker/status receipt |
| `input_required` | Minimal request with reason, review, and decline | input request tied to task ID |
| `approval_required` | Separate authorization surface | approval receipt, not progress |
| `paused` | Same task can resume later | persisted state and version |
| `cancelling` | Cancellation requested, not yet terminal | cancellation request receipt |
| `cancelled` | No current result; late result policy applies | terminal cancellation receipt |
| `failed` | Error class and retry/manual path | terminal failure receipt |
| `expired` | State/result retention limit is visible | TTL/expiry receipt |
| `completed` | Result retrieval passed terminal checks | terminal result receipt |

The product may add `unknown_progress` as a visible UI state without making it
a worker lifecycle state. It means the product cannot observe meaningful units,
not that the task is complete or stuck.

## Progress contract

| Field | Contract |
| --- | --- |
| Progress unit | fictional source groups processed, only when a receipt exists |
| Last update | ISO timestamp from the task source of truth |
| Poll guidance | host-provided interval if available; otherwise product default is labelled |
| Estimate | omitted unless historical/observed basis and error bound are defined |
| Unknown state | “Progress unavailable. Last update: [time].” |
| Partial output | labelled partial and not a terminal result |
| Completion | terminal state plus retrievable, validated result |
| Host fallback | text/manual status if rich task state is unsupported |

The UI must not convert a single status notification into a percentage. Status
notifications may be optional; polling or retrieval from the source of truth
must remain available where the host permits.

## Control and reconciliation contract

| Control | Required behavior | Failure to avoid |
| --- | --- | --- |
| Provide input | bind input to same task ID and show what resumes | hidden scope expansion |
| Approve | hand to separate approval route | treating approval prompt as progress |
| Pause | persist current state and version | starting an untracked replacement |
| Resume | reconcile ID, scope, version, last update, and lease | duplicate worker/run |
| Cancel | show requested/cancelling before terminal cancel | claiming stopped too early |
| Retry | use idempotency/reconciliation and linked attempt | duplicate side effect |
| Reconnect | read source of truth and show freshness | stale spinner reset |
| Manual | preserve task context and safe next step | user guessing what was lost |

If a stream is stopped before settlement, the product must distinguish the
cancelled/unsettled state from a final result. If a task is cancelled, a late
worker result must follow a named policy and must not silently perform a side
effect or replace the terminal cancelled state.

## State and copy examples

### Working with observed progress

> Digest task `fictional-digest-001` is working. Two of five approved source
> groups have receipts. Last update: fictional timestamp. No message has been
> sent.

### Progress unavailable

> The task is still active, but this host cannot report meaningful progress.
> Last update: fictional timestamp. You can wait, pause, cancel, or use the
> manual checklist.

### Input required

> Choose one product area to continue. This does not add another source. You
> can decline and use the manual checklist.

### Cancellation pending

> Cancellation requested. The task has not been marked cancelled yet, so no
> final status is shown.

### Completed

> Digest ready for review. Source status is included. No message or document
> update was sent.

### Failed or expired

> The task did not produce a final digest. Reason: fictional source unavailable.
> Retry after reviewing the scope or use the manual checklist.

The copy does not say “the agent is thinking,” “almost done,” or “success” when
the observable state does not support those claims.

## Evaluation slices

| Slice | Fixture | Oracle | Failure |
| --- | --- | --- | --- |
| Short task | one fictional source group | terminal result is retrievable | queue acceptance called complete |
| Long task | five source groups | observed unit or honest unknown | fabricated percentage |
| Input required | missing product area | attributable minimal request, decline works | silent scope inference |
| Approval required | request to publish digest | separate approval state | progress treated as authorization |
| Pause/resume | PM returns later | same ID/context and compatible version | new duplicate task |
| Cancel | PM cancels while working | requested/cancelling/cancelled are distinct | false stop claim |
| Duplicate retry | repeated client request | original task reconciled | duplicate worker/side effect |
| Stale reconnect | old last update | source checked before current copy | fresh spinner hides stale state |
| Worker failure | fictional source error | actionable error and manual path | partial result called final |
| Expiry | TTL elapsed | result availability is honest | invented missing result |
| Version mismatch | paused v0 task, current v1 | migrate or hold explicitly | old state silently reused |
| Benign lookalike | synchronous question | no async task theatre | unnecessary queued experience |

The fixture cannot produce a live latency, ETA accuracy, cancellation efficacy,
recovery, reliability, completion, outcome, or user-comprehension number. A
pilot must define denominators and direct observation before reporting one.

## Privacy-safe task receipt

```text
task_id: fictional-digest-001
case_id: fictional-weekly-digest
definition_version: digest-contract-v1
scope_hash: fixture-scope-a
state: working
state_reason: source_group_receipt_observed
observed_at: 2026-08-17T00:00:00Z
last_updated_at: 2026-08-17T00:00:00Z
ttl_state: active
progress_state: known_unit_2_of_5
control: none
terminal_state: not_terminal
result_state: not_ready
outcome_state: not_run
recovery_state: available
error_class: none
host_capability: fictional_status_receipt
evidence_status: fictional_fixture
```

Do not add the notes, customer identity, private URLs, credentials, or raw tool
arguments to this receipt. If serialized state contains context, treat that
context as persisted data and apply the same minimization and access rules.

## Rollout decision

`Pilot` is a future option only after a named owner, host capability check,
privacy review, duplicate/cancel/resume tests, and a manual fallback exist. For
this worked reference the decision is `Need evidence`: no real task, worker,
host, user, or downstream outcome was observed.

## Not covered

- queue, worker, streaming, cancellation, persistence, or protocol runtime;
- model quality, retrieval, source authority, citations, or result uncertainty;
- orchestration topology, tool schema, provider routing, or external-action
  approval implementation;
- authentication, authorization, payments, publishing, messaging, or record
  mutation;
- user research, production safety, adoption, retention, causal impact, or
  GitHub star growth.

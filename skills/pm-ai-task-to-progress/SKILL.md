---
name: pm-ai-task-to-progress
description: Use when an AI or agent task may run across waits, retries, approvals, process restarts, or host changes. Produce a source-bounded task-to-progress contract with stable identity, honest progress evidence, pause/resume/cancel/retry controls, terminal-state proof, recovery, privacy, and a manual fallback.
---

# PM AI Task to Progress

## When to use

Use this skill when a PM needs to design or review the user-visible lifecycle
of an AI task that may not finish in the current interaction.

Good triggers include:

- a background, queued, streaming, deep-research, file, or multi-step agent
  task;
- a tool call that may wait for input, approval, a worker, or a remote host;
- a run that must pause, resume after a process restart, or be cancelled;
- a product showing progress, an ETA, a heartbeat, or a terminal result;
- a team treating queue acceptance, partial output, notification delivery, or a
  spinner as proof that the user’s job is complete.

Do not use this as a queue implementation, workflow topology, tool contract,
approval flow, handoff packet, or uncertainty-result design. Route those needs
to the adjacent skill and keep this contract focused on task identity, visible
state, progress evidence, controls, reconciliation, and terminal completion.

Keep the boundary explicit: `pm-ai-orchestration-to-contract` owns step and
workflow topology; `pm-ai-handoff-to-recovery` owns transfer between people or
destinations; `pm-ai-approval-to-flow` owns authorization for side effects;
`pm-ai-uncertainty-to-experience` owns uncertainty in a result; and
`pm-ai-task-boundary` owns what the system may do versus what a person owns.
This skill owns the user-visible execution-state contract between those
surfaces.

## Workflow

1. **Frame the task.** Record the user job, task scope, owner, affected people
   or records, consequence level, expected terminal result, downstream outcome,
   retention/expiry, and the version of the task definition. Give every run a
   stable task identity before queueing, streaming, or retrying.

2. **Define the lifecycle.** Choose only states the product can support and
   define transitions for `created`, `queued`, `working`, `input_required`,
   `approval_required`, `paused`, `cancelling`, `cancelled`, `failed`,
   `expired`, and `completed`. Mark terminal states and specify whether a late
   worker result can be accepted, ignored, or reconciled.

3. **Define the progress oracle.** State what observable unit, event, last
   update, or server receipt supports “working.” Use a percentage, estimate,
   or poll interval only when its source and limits are known. Otherwise show
   `Progress unavailable` with the last observed time. Never fabricate motion,
   countdowns, heartbeats, or “the agent is thinking” language.

4. **Design user controls.** Specify what happens when the user provides
   input, approves, pauses, resumes, cancels, retries, opens a manual route,
   or closes the surface. Resume the same task identity unless a new task is
   intentionally created and linked. Keep approval and consequential action
   separate from progress.

5. **Reconcile state.** Define the source of truth for task ID, user/tenant
   scope, version, lease, last update, TTL, cancellation, and result. Cover
   duplicate requests, reconnect, process restart, stale polling, out-of-order
   events, version mismatch, host capability mismatch, and late completion.

6. **Write honest recovery.** For input-required, approval-required,
   cancellation-pending, failed, expired, and unavailable-progress states,
   tell the user what happened, what did not happen, what data is needed, and
   what safe next route exists. Do not convert a retry into silent duplicate
   execution.

7. **Evaluate state slices.** Test normal short work, long work, unknown
   progress, input wait, approval wait, pause/resume, cancellation, duplicate
   retry, reconnect, worker failure, expiry, version mismatch, and a benign
   lookalike that should remain synchronous. Define an oracle and denominator
   for each slice; one completed demo does not prove task reliability.

8. **Record privacy-safe receipts.** Distinguish task creation, state update,
   user control, terminal state, result retrieval, downstream outcome, and
   recovery. Keep stable task/case IDs, state, version, timestamps, and error
   class; exclude raw prompts, customer text, secrets, private URLs, and
   unnecessary tool arguments.

9. **Make the release decision.** State the host support, fallback, pilot
   audience, observation window, guardrails, rollback trigger, owner, and
   `Ship | Pilot | Hold | Need evidence` rule. Task completion is not proof of
   result quality, user value, downstream outcome, adoption, or GitHub growth.

## Output contract

Return an `AI Task to Progress Contract` with these sections:

1. **Task frame:** user/job, task identity, owner, scope, consequence,
   downstream outcome, retention/expiry, definition version, and success oracle.
2. **Lifecycle state machine:** state definitions, allowed transitions,
   terminal states, cancellation semantics, input/approval waits, and late
   result reconciliation. Mark unsupported host states `Not provided`.
3. **Progress contract:** observable unit, event or receipt source, last update,
   optional poll guidance, estimate method if any, unknown-progress copy,
   freshness, and the exact completion oracle.
4. **Controls and recovery:** input, approval, pause, resume, cancel, retry,
   manual route, reconnect, restart, version mismatch, expiry, failure, and
   the task identity each control preserves or replaces.
5. **State/copy matrix:** queued, working, input required, approval required,
   paused, cancelling, cancelled, failed, expired, completed, outcome pending,
   mobile, accessibility, and host fallback. Say what happened and what did not
   happen without fake progress or hidden automation.
6. **Reconciliation boundary:** user/tenant scope, task ID, version, lease,
   last update, TTL, event ordering, idempotency key, cancellation source of
   truth, result source of truth, and duplicate handling.
7. **Evaluation plan:** short/long work, unknown progress, input, approval,
   pause/resume, cancel, duplicate, reconnect, failure, expiry, version
   mismatch, and benign-lookalike slices; fixture or sampling method; oracle;
   denominator; guardrails; and failure classification.
8. **Task receipt:** use privacy-safe fields such as `task_id`, `case_id`,
   `definition_version`, `scope_hash`, `state`, `state_reason`,
   `observed_at`, `last_updated_at`, `ttl_state`, `progress_state`, `control`,
   `terminal_state`, `result_state`, `outcome_state`, `recovery_state`,
   `error_class`, `host_capability`, and `evidence_status`. Do not include raw
   content or secrets.
9. **Rollout and learning:** host/version, fallback, pilot audience,
   creation/state/control/terminal/outcome denominators, observation window,
   guardrails, rollback, feedback route, and one next decision.
10. **Release decision:** `Ship | Pilot | Hold | Need evidence`, with exact
    proof and an explicit `Not run` / `Blocked` / `Not covered` list.

Use these evidence labels consistently:

- `Verified`: directly observed in the named environment or check.
- `Fictional fixture`: deterministic material for inspecting the workflow.
- `Assumption`: a design hypothesis that still needs evidence.
- `Not run`: the check or user route has not been executed.
- `Blocked`: a named dependency prevents execution.
- `Not covered`: deliberately outside this contract.

## Edge cases

- **Unknown progress:** state that progress is unavailable and show the last
  observed update. Do not animate uncertainty into fake completion.
- **Input required:** identify who requests the input, why it is needed, what
  is safe to share, and how to decline or use a manual route.
- **Approval required:** keep approval and authorization separate from a task
  being active, paused, or complete; route the side effect to
  `pm-ai-approval-to-flow`.
- **Pause/resume:** resume the same task state and conversation/context where
  possible. If version or scope changed, hold or migrate explicitly.
- **Cancellation:** distinguish requested, cancelling, and cancelled. Do not
  claim cancellation stopped work until the product has the required receipt.
- **Duplicate retry:** reconcile the original task and idempotency key before
  starting another worker or external action.
- **Stale reconnect:** show last updated time and reconcile with the source of
  truth; never replace stale state with a fresh spinner.
- **Late result:** a result arriving after cancellation or expiry needs an
  explicit policy. Do not surface it as current or replay its side effects.
- **Worker failure:** provide an actionable error class, retry/manual route,
  and clear non-completion state. Do not fabricate a partial success.
- **Expiry:** show what retention or TTL means and whether the result can be
  recovered; a missing result is not a completed result.
- **Version mismatch:** a persisted pause state must be migrated, rejected, or
  resumed by a compatible definition; never silently run old state on new rules.
- **Host limitation:** if rich tasks, status notifications, or cancellation
  are unavailable, expose the limitation and use a labelled text/manual route.
- **Benign lookalike:** a normal synchronous question must not enter an async
  task experience merely because it contains words such as “run” or “research.”
- **Fictional fixture:** label fictional inputs and outputs at the point of
  use. Never turn a worked example into live reliability, adoption, or star
  evidence.

## Final check

Before returning the contract, confirm:

- task identity, scope, owner, version, and retention/expiry are explicit;
- every visible state has an observable oracle or is labelled unknown;
- progress is never fabricated and completion requires a terminal result;
- input, approval, pause, resume, cancel, retry, expiry, failure, and manual
  routes are distinct and recoverable;
- duplicate, restart, stale, late-result, and version reconciliation is stated;
- host limitations and fallbacks are visible, especially for experimental task
  protocols;
- receipts separate task state, user control, terminal result, and downstream
  outcome while minimizing private data;
- examples are fictional fixtures and include `## Not covered`;
- no line claims reliability, production readiness, adoption, causality, or
  GitHub star growth without direct evidence.

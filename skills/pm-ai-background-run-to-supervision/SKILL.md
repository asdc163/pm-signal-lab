---
name: pm-ai-background-run-to-supervision
description: Use when a user delegates an AI or agent task that may continue after the current interaction, run asynchronously, resume later, or start on a schedule. Produce a source-bounded supervision contract for scope, autonomy, state, checkpoints, pause, cancellation, expiry, notification, result review, retention, budget, fallback, and recovery.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Background Run to Supervision

Use this skill when an AI task can continue after the user leaves the current
screen, when a host exposes asynchronous execution, when a run can be resumed
later, or when a scheduled trigger may start work without a new user turn.

The output is a user-control and operations contract. It is not a queue,
scheduler, notification service, provider integration, or claim that a task is
complete because a run was accepted.

## When to use

Use it when:

- a user delegates research, coding, monitoring, drafting, or another task
  that may outlive the current request;
- a host returns a run ID and asks the client to poll, stream, resume, or
  inspect events later;
- the product supports pause, cancel, steer, retry, scheduled, or recurring
  agent work;
- a result may arrive after the user changed scope, closed the app, or lost a
  connection;
- the agent may use tools, data, network, files, or external actions while the
  user is away;
- product and engineering need a safe contract for progress, budget,
  notification, result review, expiry, or handoff.

## Do not use

Do not use this skill to:

- define ordinary in-session progress without delegated execution; use
  `pm-ai-task-to-progress`;
- design a consequential approval step; use `pm-ai-approval-to-flow`;
- define recovery after a human handoff; use `pm-ai-handoff-to-recovery`;
- package a skill or control its distribution; use
  `pm-ai-skill-to-package`;
- run a provider, schedule a job, send a notification, invoke a tool, change
  permissions, or mutate a production record;
- show a made-up percentage, heartbeat, event, completion, or notification
  receipt;
- paste raw prompts, customer content, credentials, tokens, cookies, private
  URLs, or sensitive screen content into a public receipt.

Use `Unknown`, `Not provided`, `Not run`, `Not measured`, `Not reproduced`, or
`Not covered` when host or product evidence is missing.

## Workflow

### 1. Frame the delegated job

Write one sentence:

> Decide whether user job `...` may continue after the current interaction,
> within scope `...`, budget `...`, deadline `...`, and stop boundary `...`.

Record the user, owner, desired outcome, current workaround, task duration,
deadline, data class, user timezone, and what remains the user's decision. A
background flag or scheduled trigger is not consent for every downstream
action.

### 2. Set the autonomy and action boundary

Classify the task as `Substitute`, `Complement`, `Aid`, or `Non-negotiable`.
Record autonomy level and action permissions:

| Action class | Allowed while user is away? | Required gate |
|---|---|---|
| read approved sources |  | source and scope boundary |
| create a draft or analysis |  | result review |
| write a file or branch |  | workspace and diff boundary |
| call a third-party tool |  | tool, data, and rate boundary |
| send, publish, pay, delete, or change access |  | explicit approval or bounded policy |
| change the task scope |  | user event or authorized policy |

List denied actions, tools, regions, tenants, data types, and times. If an
action can create an external side effect, a background run should stop at a
preview or approval boundary unless the policy and evidence explicitly allow
it.

### 3. Create the supervision ledger

Give the run a stable ID and a versioned scope. Record:

- task and outcome description;
- owner, requester, delegate, and decision authority;
- host, agent, model, prompt, skill, tool, and configuration versions;
- allowed sources, tools, files, network destinations, tenants, regions, and
  maximum duration;
- budget, rate limit, retry, timeout, and concurrency boundary;
- stop, pause, cancel, expiry, and manual-handoff semantics;
- notification channel, event types, quiet hours, and stale-notice handling;
- data sent, state stored, retention, deletion, and third-party boundary;
- result reviewer, acceptance criteria, and downstream action.

Do not fill an identity or retention gap with a provider default. Keep the
unknown visible and choose `Hold` when the gap changes the risk.

### 4. Define the state machine

Use only states supported by the host or product contract:

```text
draft
  -> accepted -> queued -> working -> waiting
                         |        |      |
                         |        |      +-> paused -> working
                         |        +--------> cancellation_requested
                         +---------------> failed | expired | blocked

working -> completed -> needs_review -> accepted | rejected | manual
cancellation_requested -> cancelled | cancellation_uncertain
```

For every transition record the event source, timestamp, scope version,
allowed user action, next update, and terminal condition. `Accepted` means the
host or product acknowledged the request. It does not mean work started or
the result is safe.

### 5. Design honest progress and events

Show a percentage only when the system has a measured denominator. Otherwise
show the last real checkpoint, elapsed time, current phase, event timestamp,
next expected update, and a stop control. Distinguish:

- queued from working;
- no recent event from active work;
- partial output from a verified result;
- host acknowledgement from tool completion;
- cancellation requested from cancellation confirmed;
- terminal failure from unknown outcome.

Summarize tool and source activity without exposing hidden reasoning or raw
sensitive data. If the host cannot provide a fresh event, say so and surface a
safe recovery choice.

### 6. Define pause, cancel, expiry, and steer

For each control, answer:

1. Can new tool actions start after the request?
2. Can an in-flight action finish after the request?
3. What state proves the control took effect?
4. What data or partial work is retained?
5. Can the user resume, narrow scope, hand off, or discard safely?
6. What happens if the host response is delayed or lost?

If cancellation is best effort, label it `cancellation_uncertain`, prevent new
actions where possible, and route consequential work to a human. Expiry must
stop or quarantine the run according to a stated host guarantee; it cannot be
represented by a quiet disappearance.

### 7. Set notification and result review rules

Define when to notify, what the notification says, and whether it remains
valid after the scope, permission, or user context changes. A notification
must identify run ID, state, timestamp, data boundary, and the next safe
action. It must not imply that a result is approved.

At completion, separate:

- work actually performed;
- sources and tools used;
- partial or failed steps;
- external side effects, if any;
- checks that passed or were `Not run`;
- what the user must review or approve;
- how to resume, export, reject, or hand off.

### 8. Apply budget, privacy, and security gates

Check task budget, token and tool limits, p50/p95 latency, retries, rate
limits, network egress, provider state retention, deletion, tenant boundary,
secret handling, prompt injection, and notification leakage. A background run
can outlive the screen, so the data and permission lifetime must be explicit.

If the host is stateful or stores output for polling, record that retention
and compare it with the product promise. Do not claim zero retention or
immediate deletion without host-specific evidence.

### 9. Leave a privacy-safe receipt

Return a compact record with no raw customer content:

```yaml
run_id: stable_id
decision: hold | supervise | pause | cancel | handoff | not_run
user_job: one_sentence_job
autonomy:
  scan_zone: substitute | complement | aid | non_negotiable
  level: 0
scope:
  allowed_actions: []
  denied_actions: []
  scope_version: value_or_not_provided
state:
  current: draft | accepted | queued | working | waiting | paused | completed | failed | cancelled | expired | blocked | needs_review
  last_event_at: timestamp_or_not_provided
  event_source: host_or_not_provided
controls:
  pause: supported | unsupported | unknown
  cancel: confirmed | best_effort | unknown
  expiry: policy_or_not_provided
operations:
  budget: measured | not_provided
  latency: measured | not_measured
  retention: reviewed | not_run
result_review: required | accepted | rejected | not_run
notification: sent | suppressed | not_run
fallback: manual_path_or_not_provided
not_covered: []
next_action: one_safe_action
```

## Output contract

Return these sections in order:

1. `Decision and user job`
2. `Autonomy and action boundary`
3. `Supervision ledger`
4. `State and event contract`
5. `Progress, pause, cancel, expiry, and handoff`
6. `Notification and result review`
7. `Evaluation and security cases`
8. `Privacy-safe receipt`
9. `Not covered`
10. `Next safe action`

The decision must be one of `Supervise`, `Hold`, `Pause`, `Cancel`, `Handoff`,
or `Not run`. Do not use `Completed` as a product decision; completion is a
host state that still may require user review.

## Common rationalizations to reject

- "It is only background mode, so the same permission is fine." Re-check the
  lifetime, scope, data, and notification boundary after the user leaves.
- "Queued means the agent is working." Show the host state and last event.
- "The progress bar helps trust." Use a percentage only with a real
  denominator; otherwise show an honest checkpoint and elapsed time.
- "Cancel was clicked, so it stopped." Distinguish requested, confirmed,
  uncertain, and terminal cancellation states.
- "The result arrived, so it is approved." Keep result review and external
  side-effect approval explicit.
- "A notification is success." Measure task completion, correction, retry,
  abandonment, escalation, and downstream outcome separately.
- "The scheduler owns consent." Record who authorized this scope, when it
  expires, and what happens after a user changes it.
- "The provider stores it only briefly, so privacy is solved." Verify the
  host, endpoint, region, deletion path, and third-party transfers.

## Edge cases

- If the host returns an ID but no event stream, keep the run `Queued` or
  `Unknown` and provide a safe retry or manual path.
- If a connection drops during execution, show `Unknown outcome` until the
  host confirms terminal state; do not duplicate an external action.
- If the user changes scope while the run is working, version the scope and
  pause or revalidate before the next action.
- If a scheduled run starts after consent or data access expires, skip or hold
  the run and record the reason.
- If the host can pause new work but an in-flight tool may finish, disclose the
  race and quarantine the result before user acceptance.
- If a result includes a secret-shaped value or private source, redact the
  receipt and route to an authorized review path.
- If a background task reaches its budget, preserve a partial artifact only if
  its provenance and incomplete state are visible.
- If a provider's retention or cancellation semantics differ by platform,
  split the contract and do not generalize across hosts.

## Adjacent routing

- `pm-ai-task-to-progress` owns ordinary task lifecycle and progress tracking;
  this skill owns work that persists beyond the immediate interaction.
- `pm-ai-approval-to-flow` owns the consequential approval decision.
- `pm-ai-handoff-to-recovery` owns recovery after a human or agent handoff.
- `pm-ai-run-to-observability` owns run traces and operational observability;
  this skill consumes the safe event contract for user supervision.
- `pm-ai-cost-to-guardrail` owns cost and latency limits when background
  duration is not the primary decision.
- `pm-ai-skill-to-package` owns package discovery and distribution, not the
  delegated run itself.
- `pm-ai-computer-use-to-control` owns graphical UI observation and action,
  including its own stop and postcondition boundary.

## Final check

Before returning the contract, confirm:

- user job, owner, desired outcome, duration, deadline, scope, and autonomy are
  explicit;
- allowed, denied, approval-required, tool, data, tenant, region, budget, and
  network boundaries are recorded;
- every state has an event source, timestamp, user control, and terminal rule;
- progress is based on real checkpoints or is labeled unknown;
- pause, cancel, expiry, connection loss, stale scope, and handoff paths are
  explicit;
- notification and result review do not imply approval or completion;
- privacy, retention, secret, injection, permission, and rate checks are
  separate from ordinary quality checks;
- receipt excludes raw content and records `Not run` or `Not covered` gaps;
- no background run, tool action, notification, schedule, or production
  mutation was performed by this documentation-only skill.

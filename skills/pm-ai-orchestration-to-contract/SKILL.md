---
name: pm-ai-orchestration-to-contract
description: Turn a multi-step AI or agent workflow into a source-bounded orchestration contract with explicit topology, step ownership, transitions, control budgets, side-effect boundaries, failure recovery, evaluation slices, and a release decision. Use before implementing or materially changing an AI workflow when the team must decide what the model, deterministic code, tools, specialists, and people do next.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Orchestration to Contract

Use this skill when a product team can describe an AI workflow in broad terms
but cannot yet review its steps, authority, stop conditions, or recovery. It
produces a decision packet for an AI PM, designer, engineer, QA owner, and
human operator. It does not implement an agent, call a model, or prove that a
workflow is reliable.

## When to use

Use it when the input contains a multi-step AI or agent workflow such as:

- a planner, router, manager, or coordinator that calls tools or specialists;
- a sequence that retrieves context, generates a draft, validates it, and
  asks a person to approve or correct it;
- a workflow with parallel specialists, retries, loops, timeouts, durable
  state, resumable runs, or a long-running human wait;
- a proposed handoff or delegation pattern where it is unclear who owns the
  conversation, state, decision, or next action;
- a material change from a single model turn to an agent workflow, or from a
  fixed code path to model-selected steps.

Use `pm-ai-model-to-route` when the main decision is which model/provider or
version is eligible. Use `pm-ai-task-boundary` when the main decision is what
AI may do versus what a person must own. Use `pm-ai-tool-to-contract` for one
tool's schema and side effects. Use `pm-ai-handoff-to-recovery` for a human or
system escalation packet after the workflow has already been defined. Use
`pm-ai-run-to-observability` when the main missing artifact is the trace, not
the workflow design.

Do not use this skill to draw a decorative agent diagram, select a vendor from
reputation, promise autonomous completion, replay a real side effect, expose
customer traces, or infer workflow quality from one successful run.

## Workflow

### 1. Frame the decision and user job

Write one sentence:

> We need to decide whether this workflow should be `Test`, `Revise`, `Pilot`,
> `Hold`, or `Reject` for `<user job>`.

Record the desired user progress, current workaround, decision owner, and the
cost of a wrong step. Separate these claims:

- **Observed:** supplied by a trace, source, user report, or current system.
- **Reported:** someone says it happened but the raw evidence is not available.
- **Proposed:** a design choice that has not run.
- **Synthetic or fictional:** a safe fixture used to demonstrate the format.
- **Not measured:** no denominator, execution result, or production evidence.

If the user job or success condition is missing, keep the decision at `Need
evidence`; do not fill it with an attractive workflow diagram.

### 2. Choose the orchestration topology

Choose the smallest topology that can complete the job. State who decides the
next step and why:

| Topology | Use when | Main risk to name |
|---|---|---|
| Deterministic sequence | order, branching, and stop conditions are known | brittle changes or hidden state drift |
| Code-controlled graph | reliable branching, retries, or permissions matter | implementation cost and stale policy |
| Manager with specialists | one owner must combine bounded specialist results | context leakage, opaque delegation, or overlong loops |
| Handoff chain | a specialist should own the next user-facing turn | lost context, wrong recipient, or unclear return path |
| Parallel fan-out and join | independent evidence can be gathered separately | inconsistent versions, partial results, and expensive duplication |
| Hybrid | code owns high-risk boundaries while a model proposes low-risk steps | unclear authority between model and orchestrator |

Do not use a free-form agent loop when a deterministic sequence or bounded graph
does the job. For every model-selected transition, define the available
destinations, why each is eligible, and the condition that stops selection.

### 3. Define the workflow boundary and state

Describe the minimum input, context, tools, memory, state, and output needed for
the job. Then name the workflow states, for example:

`New → Planning → Waiting for input → Running → Needs review → Approved or
Rejected → Completed, Failed, Cancelled, or Unknown`.

For each state, specify the owner, visible message, allowed actions, timeout,
and next safe action. Keep `Unknown` distinct from `Failed` when an external
side effect may have happened without a receipt. A model answer or a trace span
does not by itself mean `Completed`.

### 4. Write a contract for every step

Use stable IDs such as `W-01` and `W-02`. Each step needs:

- purpose and user-visible progress;
- owner: deterministic code, model, tool, specialist, or human;
- input and required source/context IDs;
- allowed tools, data scope, tenant, permission, and output schema;
- preconditions and the exact success oracle;
- maximum turns, retries, fan-out width, token/cost budget, and timeout;
- side effects, idempotency key, receipt, and whether approval is required;
- denial, abstention, escalation, and no-route behavior;
- trace fields and the policy/config/version boundary;
- evidence status: `Proposed`, `Not run`, `Observed`, or `Verified`.

Do not let a step named “decide” silently grant authority. Explain whether it
means classify, recommend, ask for a fact, approve, or execute.

### 5. Define transitions and control budgets

Create a transition table with `from`, `condition`, `actor`, `to`, visible
state, receipt, and next action. Include:

- normal completion;
- missing input or stale context;
- invalid output or failed schema validation;
- tool denial, timeout, quota, and unavailable specialist;
- user edit, cancellation, rejection, or approval expiry;
- loop detection, retry cap, time budget, and partial fan-out;
- a missing or contradictory receipt.

Make the control budget explicit. At minimum, set proposed limits for total
turns, retries per step, wall-clock duration, tool calls, parallel branches,
context growth, and cost. A budget breach must produce a safe terminal or
human-owned state rather than an unbounded retry.

### 6. Bound tools, data, authority, and human control

Connect each step to the narrowest existing contract for tools, data purpose,
identity, permissions, model route, approval, and human handoff. Do not copy a
large policy into this packet; reference its stable ID and version boundary.

Separate:

- a model suggestion from a deterministic validation;
- a handoff from an approval;
- an approval from execution;
- a successful tool call from a completed user outcome;
- a route decision from a provider recommendation;
- a synthetic fixture from a real-user or production result.

For any external write, payment, permission change, message send, deletion, or
other irreversible action, require preview/diff, least privilege, explicit
approval, idempotency, receipt verification, cancellation behavior, and an
owner-led reconciliation path. Never include raw prompts, customer text,
tokens, secrets, private URLs, or credentials in a public packet.

### 7. Design failure recovery before optimization

For each failure, state the user-visible status, blocked action, safe recovery,
owner, escalation, fallback, and writeback location. Prefer stop-and-reconcile
over blind replay when an external side effect is possible. Use `Need evidence`
when the workflow cannot distinguish a model failure from a context, tool,
policy, UX, or operations failure.

### 8. Define the smallest evaluation and release gate

Propose a reversible evaluation with representative slices:

- ordinary success and a missing-input case;
- wrong route, invalid schema, stale context, and contradictory evidence;
- tool denial, timeout, quota, retry, loop cap, and partial result;
- human edit, approval, rejection, cancellation, and resume;
- privacy, tenant, permission, prompt-injection, and high-impact action cases;
- mobile or accessibility review when the workflow has a user-facing surface.

Measure workflow completion separately from step quality, route correctness,
tool safety, human comprehension, cost, latency, fallback, and user outcome.
Define `ship_if`, `iterate_if`, `hold_if`, `rollback_if`, and
`inconclusive_if`. Keep every result `Not run` until an authorized owner
executes it with a versioned oracle.

### 9. Hand off and write back

Route the packet to the smallest owner surfaces: workflow/state spec, tool or
permission contract, eval case, trace schema, UX state, runbook, issue, or
release decision. Record one learning question, review owner, next review date,
and the exact artifact that will change if the workflow fails. End with one
decision ask: `Test`, `Revise`, `Pilot`, `Hold`, `Need evidence`, or `Reject`.

### Common shortcuts to reject

- “The graph is clear, so it is ready.” A diagram is not a runtime result.
- “The agent can decide dynamically.” Dynamic choice still needs an allowlist,
  budget, oracle, and stop condition.
- “The handoff is the fallback.” A handoff needs a recipient, state, payload,
  owner, resume rule, and privacy boundary.
- “The tool returned 200, so the task completed.” Reconcile the user outcome
  and receipt before marking completion.
- “One good trace proves the workflow.” It does not establish prevalence,
  reliability, safety, adoption, or star growth.

## Output contract

Return these sections in this order. Keep unsupported fields explicitly
`Not provided`, `Unknown`, `Proposed`, `Not run`, `Not measured`, or
`Not covered`.

## Decision on the desk

State the decision, accountable owner, user job, proposed action, current
workaround, evidence status, and what would change the decision.

## User/job and workflow boundary

Describe trigger, desired progress, preparation, user-visible outcome,
workflow input/output, authority boundary, safe manual alternative, and
reversibility.

## Workflow topology and ownership

Name the chosen topology, alternatives considered, model-controlled versus
code-controlled decisions, step IDs, owners, destinations, and tradeoffs.

## Step contract

Provide a table for every step with purpose, inputs, context/source IDs, tools,
data and permission scope, output schema, oracle, budgets, side effects,
receipt, and evidence status.

## State and transition map

Show states and transitions with actor, precondition, visible status, audit
event, receipt, timeout, and next action. Include terminal and `Unknown` paths.

## Control budget and side-effect boundary

Specify turn, retry, time, tool, branch, context, cost, and data budgets; list
approval, idempotency, permission, secret, tenant, and external-write rules.

## Failure, recovery, and escalation

Use a table with failure case, user-visible state, blocked action, safe recovery,
owner, escalation, fallback, and regression or feedback capture.

## Evaluation and release gate

State the smallest test, slices, primary measure, guardrails, human review,
privacy and accessibility checks, cost/latency checks, rollback, proposed
threshold, and decision rules. Mark execution as `Not run` without fresh proof.

## Not covered

List missing model/provider behavior, prompts or policy versions, runtime
traces, receipts, tool execution, security/privacy review, accessibility,
localization, cost, latency, reliability, prevalence, adoption, production
impact, and rollback execution.

## Implementation handoff

Give the owner exact files or surfaces, state and event changes, permission and
data review, eval cases, trace fields, rollout gate, rollback path, and follow-
on skill. A handoff is not implementation approval.

## Review ask

Ask for exactly one of `Test`, `Revise`, `Pilot`, `Hold`, `Need evidence`, or
`Reject`. Name the unresolved risk, decision owner, and next evidence that can
change the ask.

## Edge cases

- **The workflow has one model call:** use `pm-ai-context-to-contract` or
  `pm-ai-evaluation-plan` unless there is a real transition or control budget
  to review.
- **The model chooses an unavailable step:** remove it from the eligible set,
  record the reason, and route to a safe no-route or human state.
- **A transition is ambiguous:** stop at `Need evidence`; do not silently let
  the model invent a destination or permission.
- **A handoff receives too much history:** apply a documented input filter or
  bounded summary, preserve the source IDs, and record what was removed.
- **Parallel branches finish at different times:** mark partial state, define
  join requirements, and do not treat the first result as the final outcome.
- **A retry may duplicate a side effect:** block replay until idempotency or
  receipt reconciliation is verified.
- **A tool succeeds but the user outcome is unknown:** keep the workflow at
  `Unknown`, block dependent actions, and assign reconciliation.
- **A human waits longer than the timeout:** preserve the pending state, show a
  truthful waiting message, and define expiry or resume ownership.
- **A policy, model, tool, or source version changes mid-run:** freeze or
  invalidate the affected step and require a fresh review boundary.
- **A prompt injection or untrusted tool result changes the plan:** contain the
  route, preserve a redacted negative case, and require a permission and eval
  check before reopening.
- **A fictional example is mistaken for a provider benchmark:** label every
  candidate, score, receipt, and status as fictional or proposed and keep live
  claims in `Not covered`.

## Final check

Before handoff, confirm that:

- the user job, desired outcome, current workaround, owner, and evidence
  boundary are explicit;
- topology alternatives and model/code/human ownership are separated;
- every step has an input, oracle, permission/data scope, budget, stop rule,
  side-effect boundary, and evidence status;
- normal, empty, loading/waiting, error, recovery, cancellation, unknown,
  mobile, accessibility, and trust states are addressed when applicable;
- loops, retries, parallel joins, timeouts, stale state, partial execution,
  duplicate requests, missing receipts, and version changes have negative
  routes;
- evaluation slices, trace fields, cost/latency, human review, rollback, and
  writeback are concrete and unrun claims remain visibly unrun;
- no raw customer data, secrets, credentials, private URLs, or hidden model
  reasoning is copied into the packet;
- the output ends with one review ask and does not claim production quality,
  safety, adoption, traffic, or star growth without current evidence.

---
name: pm-ai-monitor-to-oversight
description: Turn an AI or agent monitor signal into a bounded human-oversight contract with observation scope, coverage, latency, review states, containment, control evaluations, privacy boundaries, and an honest safety-case evidence decision.
---

# PM AI Monitor to Oversight

## Overview

Use this skill when an AI or agent monitor is expected to notice concerning
behavior, policy violations, unsafe tool use, data exposure, or workflow drift.
It separates a monitor prediction from observed behavior, human judgement,
control action, and downstream outcome. The output is an oversight contract;
it is not a working monitor, a safety guarantee, or an automatic block.

## When to use

Use this skill when:

- a long-running, tool-using, delegated, or high-impact AI workflow may need
  asynchronous monitoring or a synchronous gate;
- a team wants to turn a monitor alert into human review, containment,
  escalation, or a learning writeback;
- a PM needs to decide what the monitor can observe, what it cannot see, how
  quickly it must signal, and what evidence supports a control claim;
- a monitor score, alert count, quiet period, or apparent recall is being
  treated as proof of safe behavior;
- the product needs to distinguish the monitored agent's behavior from the
  monitor's false positive, false negative, blind spot, or manipulation risk.

Use `pm-ai-run-to-observability` when the primary gap is trace/event identity.
Use `pm-ai-signal-to-intervention` after a live signal is already validated and
needs a bounded response. Use `pm-ai-incident-to-runbook` when multiple signals
already indicate a journey-level incident. Use `pm-ai-risk-to-control` for a
broader pre-launch hazard review. Use
`pm-ai-prompt-injection-to-defense` when the primary gap is the attack path or
authority defense rather than monitor scope and oversight.

## Do not use

Do not use this skill to:

- build or tune a monitor, call a provider, inspect hidden reasoning, store
  chain-of-thought, create an alert, block a run, or execute a containment;
- label a monitor prediction as ground truth, an alert as an incident, or a
  quiet period as safety without independent evidence and eligible exposure;
- publish monitor precision, recall, safety, harmlessness, causal, adoption,
  or production claims from a synthetic fixture, one alert, a benchmark, or a
  provider statement;
- route an irreversible or high-impact action into automation before the
  authorized reviewer, approval boundary, and manual fallback are explicit;
- expose private traces, customer data, credentials, tokens, private URLs,
  hidden reasoning, or sensitive tool arguments in a public packet.

Use `Observed`, `Predicted`, `Reviewed`, `Not reviewed`, `Not run`, `Not
provided`, `Conflict`, `Unknown`, `Need evidence`, and `Not covered` when the
evidence is missing.

## Core boundary

> A monitor alert is a prediction about an observed scope. It is not proof of
> the target behavior, harm, root cause, or safe completion.

Keep these layers separate:

| Layer | It may establish | It cannot establish by itself |
| --- | --- | --- |
| `monitor_prediction` | the monitor emitted a label, score, reason, and timestamp | that the concern occurred or caused harm |
| `observed_behavior` | an output, action, tool call, handoff, policy event, or receipt in scope | that an out-of-scope event did not happen |
| `human_review` | a reviewed interpretation under a named criterion | population recall, causality, or safety |
| `control_action` | a gate, pause, narrow, revoke, or containment was applied | that the action prevented downstream harm |
| `downstream_outcome` | a later system or user state with its own oracle | that the monitor caused or prevented it |
| `safety_case` | a bounded argument with claims, evidence, assumptions, and gaps | universal detection or production readiness |

## Workflow

### 1. Define the oversight decision

Write one sentence:

> For `[AI workflow and user job]`, decide whether `[monitor signal]` should
> enter `[review, contain, gate, escalate, or learn]` under `[authority and
> evidence boundary]`.

Capture:

| Field | Required question |
| --- | --- |
| `monitor_id` | Which monitor, version, rubric, or policy emits the signal? |
| `target` | Which agent, workflow, tool, action, user job, or asset is monitored? |
| `concern_class` | What behavior or harm is in scope? |
| `observation_scope` | Which messages, outputs, actions, tools, handoffs, or receipts can it see? |
| `eligible_exposure` | Which runs, users, tenants, tools, and environments were eligible? |
| `coverage_gap` | What is unobserved, sampled, delayed, redacted, or permission-blocked? |
| `latency` | Is the signal asynchronous or synchronous, and how quickly must it arrive? |
| `reviewer` | Who can review, acknowledge, escalate, or contain the signal? |
| `authority` | What can the reviewer or control actually pause, revoke, narrow, or block? |
| `outcome_oracle` | What independent receipt says whether concern or harm occurred? |
| `evidence_status` | Is the claim `Observed`, `Predicted`, `Reviewed`, `Not run`, or `Need evidence`? |

If scope, authority, or reviewer ownership is unknown, stop at `Need evidence`.

### 2. Classify the concern without overclaiming

Use a primary concern class and keep `UNKNOWN` when multiple paths remain:

| Class | Example question | Minimum receipt |
| --- | --- | --- |
| `UNAUTHORIZED_ACTION` | Did the agent attempt an action outside granted scope? | action log, authority policy, and permission result |
| `PROMPT_INJECTION` | Did untrusted content try to redirect the agent or monitor? | source/content boundary and action trace |
| `SENSITIVE_DATA` | Was sensitive data exposed, transferred, or requested? | data category, destination, policy, and egress receipt |
| `POLICY_VIOLATION` | Did output or action conflict with a named policy? | policy version and independent review criterion |
| `DESTRUCTIVE_ACTION` | Could an action delete, publish, spend, or change access? | action diff, approval state, and reversible receipt |
| `REWARD_HACKING` | Did the agent optimize a proxy while missing the user job? | task oracle, negative slice, and downstream check |
| `MISREPRESENTATION` | Did the agent or monitor claim work, evidence, or a tool result that was not observed? | tool/result receipt and user-visible text |
| `WORKFLOW_ESCALATION` | Did a long-horizon run cross a human or risk boundary? | checkpoint, scope, and reviewer acknowledgement |
| `UNKNOWN` | What could not be distinguished? | missing joins, blind spots, and owner |

These are hypotheses or review categories. The monitor does not get to supply
its own ground truth.

### 3. Bound monitor visibility and coverage

Record whether the monitor sees:

- input, user/developer instructions, retrieved content, files, and tool
  outputs;
- model output, action proposal, tool arguments, call/result linkage, handoffs,
  approvals, retries, and final response;
- downstream execution, permission outcome, external receipt, and user state;
- only a sample, a delayed event, a redacted field, an aggregate, or a subset
  of tenants, tools, locales, environments, or risk classes.

Never infer that an event was safe because it was outside the observation scope.
Write `Coverage: Unknown` when the join cannot be established.

### 4. Choose the timing and state machine

Separate timing from authority:

| Mode | Strength | Required boundary |
| --- | --- | --- |
| `Asynchronous alert` | can review completed or in-flight behavior shortly after it occurs | delayed harm window, alert owner, containment SLA, and no claim of prevention |
| `Synchronous gate` | may pause or block before a high-risk action | exact action scope, latency budget, fail-open/closed choice, reviewer fallback, and release evidence |
| `Human review` | can adjudicate ambiguity and decide next action | criterion, context packet, privacy, acknowledgement, escalation, and disagreement path |

Use explicit states:

`Not started → Observed → Predicted → Review pending → Reviewed: concern /
benign / unknown → Containment candidate → Contained or released → Outcome
pending → Outcome reconciled`.

`Predicted`, `Contained`, and `Outcome reconciled` are not interchangeable.

### 5. Evaluate the monitor as a control

Before a safety or release claim, ask for:

1. a positive slice with the concern present;
2. a negative slice with similar benign behavior;
3. adversarial or red-team cases for blind spots and monitor manipulation;
4. independent labels or control outcomes, not only monitor self-labels;
5. coverage and eligible exposure for each slice;
6. alert latency, reviewer capacity, acknowledgement delay, and containment
   success or failure;
7. privacy, retention, access, redaction, and audit receipts.

Do not turn one matched employee escalation, one benchmark, or one perfect
synthetic task into a general recall claim. Treat false-negative coverage as an
open question when control evaluation is absent.

### 6. Route to oversight

| Route | Use when | Receipt required |
| --- | --- | --- |
| `Observe` | low-risk signal or immature monitor | scope, owner, watch window, and stop condition |
| `Review` | the monitor prediction needs a human label | context packet, criterion, reviewer, and acknowledgement |
| `Containment candidate` | potential harm is material but not reconciled | reversible action, authority, SLA, and manual fallback |
| `Synchronous gate candidate` | action is high-impact and must be checked before execution | exact action, latency budget, fail behavior, and paired controls |
| `Escalate` | reviewer cannot resolve the concern or authority is exceeded | destination, severity, privacy, and incident/security owner |
| `Learn` | reviewed cases can improve evals or controls | consent/permission, redaction, destination, and contamination check |
| `Need evidence` | scope, label, authority, or outcome is missing | one smallest missing receipt and named owner |

This skill may propose a route. It does not send alerts, block actions, revoke
credentials, publish an incident, or write to an external system.

### 7. Write the oversight contract

```text
monitor_id:
target_workflow:
user_job:
concern_class:
monitor_prediction:
observation_scope:
eligible_exposure:
coverage_gaps:
timing: Asynchronous alert | Synchronous gate | Human review
latency_budget:
reviewer_and_authority:
state:
independent_oracle:
positive_slice:
negative_slice:
control_or_red_team_receipt:
privacy_retention_redaction:
route: Observe | Review | Containment candidate | Synchronous gate candidate | Escalate | Learn | Need evidence
stop_rule:
rollback_or_containment:
outcome_status:
not_claimed:
```

## Output contract

Return these sections in order and preserve missingness:

### Oversight decision

State the user job, target, concern, signal status, reviewer, authority, and
one route in five lines or fewer.

### Monitor and observation boundary

List what the monitor can see, what it cannot see, sampling, delay, redaction,
tenant/tool scope, and the eligible exposure.

### Signal versus outcome

Separate monitor prediction, observed behavior, human review, control action,
downstream state, and outcome oracle. Include every missing join.

### Review and containment states

Show alert timing, reviewer acknowledgement, escalation, containment candidate,
manual fallback, release-to-continue, and outcome-pending states.

### Control evidence

List positive, negative, adversarial, and expected-variance cases; independent
labels; coverage; denominator; latency; reviewer capacity; privacy; and the
false-positive/false-negative evidence status.

### Safety-case decision

Choose `Observe`, `Review`, `Containment candidate`, `Synchronous gate
candidate`, `Escalate`, `Learn`, or `Need evidence`. State what the decision
does not prove.

### Not covered and review ask

List unsupported safety, recall, precision, harmlessness, causal, adoption, and
production claims. End with one sanitized evidence request.

## Edge cases

- **The monitor alerts after the action:** preserve the delay and downstream
  state; do not claim the monitor prevented harm.
- **The monitor is silent:** report eligible exposure and coverage before
  interpreting silence; unknown scope is not a clean run.
- **The monitor and reviewer disagree:** preserve both labels, adjudication,
  and the criterion version; do not discard disagreement to improve a score.
- **The agent follows untrusted content:** separate prompt-injection evidence,
  tool authority, monitor visibility, and resulting action; do not let content
  instruct the monitor's rubric.
- **A monitor wants hidden reasoning:** reject the requirement and design around
  observable actions, outputs, tool calls, approvals, and receipts.
- **The action is irreversible:** stop at a synchronous gate or authorized
  human approval candidate with a manual fallback.
- **The reviewer is unavailable:** use an explicit expiry and safe fallback;
  do not silently fail open for a high-impact action.
- **A positive benchmark is perfect:** check task realism, negative cases,
  adversarial adaptation, coverage, and open-world false negatives.
- **Sensitive content is in the trace:** retain a private authorized pointer;
  publish only redacted IDs, classes, versions, and evidence status.

## Rationalizations to reject

| Shortcut | Why it fails | Required correction |
| --- | --- | --- |
| “The monitor flagged it, so it happened.” | Prediction and observed behavior are different layers. | Require an independent receipt or label. |
| “No alert means safe.” | Blind spots, sampling, delay, and monitorability can hide behavior. | State eligible exposure and coverage gaps. |
| “We matched every report, so recall is perfect.” | Open-world false negatives remain unmeasured. | Run control evaluations and red-team slices. |
| “Block everything to be safe.” | Overblocking can break user jobs and obscure reviewer capacity. | Bound action scope, latency, fallback, and user control. |
| “The monitor can read hidden reasoning.” | It creates privacy, reliability, and monitorability risks. | Use observable outputs, actions, tools, and receipts. |
| “A safety case is a checklist.” | Claims need evidence, assumptions, controls, and unresolved gaps. | Keep the argument claim-bounded and reviewable. |

## Final check

Before handing off, confirm:

- target workflow, user job, concern, monitor version, and observation scope
  are explicit;
- eligible exposure, coverage gaps, sampling, delay, and privacy boundary are
  explicit;
- monitor prediction, observed behavior, reviewer label, control action, and
  downstream outcome are separate;
- timing, reviewer authority, acknowledgement, escalation, expiry, fallback,
  and containment are explicit;
- positive, negative, adversarial, and expected-variance evidence is named or
  marked `Not run`;
- false-positive and false-negative evidence is not invented;
- the route has one owner, one stop rule, one next receipt, and one rollback or
  containment boundary;
- no hidden reasoning, customer data, credential, secret, private URL, or
  automatic external write entered the package;
- `## Not covered` lists unsupported safety, recall, precision, causal,
  adoption, and production claims.

For the field definitions, source ledger, state matrix, and handoff template,
read [`references/monitor-oversight.md`](references/monitor-oversight.md).

## Not covered

- No live monitor, alerting system, model call, dashboard, chain-of-thought,
  customer trace, provider result, control evaluation, or red-team exercise is
  implemented or claimed.
- A monitor prediction, quiet period, reviewer label, or containment receipt
  does not prove safety, recall, precision, harmlessness, causality, adoption,
  or production readiness.
- No action is blocked, paused, revoked, escalated, or written to an external
  system by this skill.
- No real user, tool argument, credential, private URL, source document,
  hidden reasoning, or production log belongs in a public fixture.

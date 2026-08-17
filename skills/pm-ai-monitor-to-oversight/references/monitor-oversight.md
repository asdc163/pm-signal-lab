# Monitor-to-oversight reference

This reference is a **fictional fixture** field guide for deciding what an AI
monitor can support and how a person should review its signal. It is not a
monitor implementation, a safety case, or evidence that any monitor works.

## Source ledger

| Source | What it supports | What it does not support |
| --- | --- | --- |
| [OpenAI monitoring internal coding agents](https://openai.com/index/how-we-monitor-internal-coding-agents-misalignment/) | Monitoring has coverage and monitorability limits; false negatives need control evaluations and red-teaming; monitoring belongs with evaluations and preventive controls; asynchronous alerting and synchronous blocking have different boundaries. | It does not prove universal detection, product safety, or this package's monitor quality. |
| [OpenAI agent evals](https://developers.openai.com/api/docs/guides/agent-evals) | Traces, graders, datasets, and eval runs serve different stages of workflow evaluation. | A trace grade is not a monitor ground truth, safety result, or user outcome. |
| [OpenAI trace grading](https://developers.openai.com/api/docs/guides/trace-grading) | Structured criteria can inspect model calls, tools, guardrails, and handoffs in a trace. | Grading one trace does not establish coverage or open-world false-negative recall. |
| [OpenAI how agents are transforming work](https://openai.com/index/how-agents-are-transforming-work/) | Agentic work is moving toward longer-horizon, delegated tasks where oversight boundaries matter. | Adoption or task-duration figures from that article are not evidence for this repository. |
| [OpenAI AI investment guidance](https://openai.com/index/managing-ai-investments-in-agentic-era/) | Governance, permissions, evaluations, observability, and workflow controls should precede scaling advanced workflows. | Provider guidance is not a deployment approval or safety certification. |

## Monitor contract ledger

Fill every row. Use `Not provided` rather than assuming coverage.

| Field | Required question | Status |
| --- | --- | --- |
| `monitor_id/version` | Which monitor, rubric, model, prompt, and policy emitted the signal? |  |
| `target_workflow` | Which agent, user job, tool, action, asset, tenant, or environment is monitored? |  |
| `concern_class` | What behavior or harm is the monitor supposed to detect? |  |
| `observation_scope` | Which inputs, outputs, tools, handoffs, approvals, and receipts are visible? |  |
| `eligible_exposure` | Which runs, users, tenants, tasks, tools, and environments could be observed? |  |
| `coverage_gap` | What is sampled, delayed, redacted, permission-blocked, or invisible? |  |
| `timing/latency` | Is the signal asynchronous or synchronous, and what delay is acceptable? |  |
| `reviewer/authority` | Who can label, acknowledge, escalate, pause, narrow, revoke, or block? |  |
| `outcome_oracle` | What independent state or receipt says the concern occurred or was contained? |  |
| `privacy/retention` | What data is retained, for what purpose, and who can see it? |  |

## Signal state matrix

| State | Meaning | Allowed claim | Next evidence |
| --- | --- | --- | --- |
| `Observed` | a trace, output, action, or receipt exists in scope | something was observed | identity, timestamp, scope, source |
| `Predicted` | monitor emitted a class, score, or reason | monitor predicted a concern | independent review or oracle |
| `Review pending` | a person has not yet adjudicated | no concern conclusion | reviewer, criterion, context packet |
| `Reviewed: concern` | named criterion supports concern | reviewer-supported concern in scope | containment or escalation receipt |
| `Reviewed: benign` | named criterion rejects concern | reviewer-supported benign case | false-positive writeback if useful |
| `Reviewed: unknown` | evidence cannot distinguish | unresolved case | missing join or owner |
| `Contained` | an authorized control changed exposure or action | control was applied | downstream outcome and recovery check |
| `Outcome reconciled` | independent oracle records the later state | named outcome under scope | comparison, not universal safety |

Do not collapse `Predicted` into `Reviewed: concern`, or `Contained` into
`Outcome reconciled`.

## Coverage and blind-spot questions

Ask these questions before reading a quiet period as safety:

- Can the monitor see the user/developer instruction, retrieved content, file,
  tool output, model output, action proposal, argument, call/result pair,
  handoff, approval, retry, and final response?
- Does it see downstream execution, permission result, external receipt, and
  user state, or only the agent's messages?
- Which traffic is excluded by sampling, tenant permission, data redaction,
  latency, retention, offline mode, tool class, language, or environment?
- Can the monitored agent, tool output, retrieved content, or another model
  manipulate the monitor's input or requested label?
- What is the eligible denominator for alert rate, reviewer rate, and
  containment success? Do not use observed alerts as exposure.

## Control-evaluation ledger

| Slice | Purpose | Independent label/oracle | Monitor result | Reviewer result | Status |
| --- | --- | --- | --- | --- | --- |
| Positive concern | concern is present |  |  |  | `Not run` |
| Similar benign behavior | false-positive pressure |  |  |  | `Not run` |
| Expected workflow variance | safe alternative path |  |  |  | `Not run` |
| Adversarial / red-team | blind spots and monitor manipulation |  |  |  | `Not run` |
| High-impact action | blocking/containment behavior |  |  |  | `Not run` |
| Out-of-scope event | monitor should abstain or mark unknown |  |  |  | `Not run` |

The ledger must record version, sample, eligible exposure, observation window,
latency, reviewer capacity, missing cases, and privacy/permission. A monitor
result is not an independent label. A matched set of known incidents is not an
open-world false-negative estimate.

## Timing and authority

### Asynchronous alert

Record alert delay, what may happen before review, owner acknowledgement SLA,
containment authority, manual fallback, and the claim boundary. It can support
“the monitor alerted after this observed event” but not “the monitor prevented
the event.”

### Synchronous gate

Record exact action scope, latency budget, fail-open/fail-closed behavior,
reviewer fallback, user-visible waiting state, and recovery if the monitor is
unavailable. A synchronous gate is a control candidate, not proof it catches
all unsafe actions.

### Human review

Record the smallest context packet, reviewer criterion, role/authority, privacy
boundary, acknowledgement, disagreement/adjudication, escalation, expiry, and
writeback. Keep reviewer judgement separate from the monitor label.

## Safety-case evidence ledger

| Claim | Assumption | Evidence | Gap | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| Monitor can observe `[scope]` | events are joined and permissioned | trace/event receipt | blind or delayed fields |  | `Proposed` |
| Monitor can identify `[concern]` | criterion and labels are stable | positive/negative control slices | false negatives |  | `Need evidence` |
| Review arrives within `[latency]` | reviewer capacity and queue are available | timestamps and queue receipt | overload/expiry |  | `Not run` |
| Containment reduces exposure | action is authorized and reversible | control + downstream receipt | unobserved harm |  | `Not run` |
| Learning does not leak sensitive data | purpose/permission/redaction hold | data review and access log | contamination |  | `Not run` |

This is an argument ledger, not a checklist certificate. Any material gap keeps
the decision at `Need evidence`, `Hold`, or `Containment candidate`.

## Adjacent package boundaries

- `pm-ai-run-to-observability` defines run/session/task/trace/span/event identity
  and privacy fields. This reference asks what a monitor can observe in those
  fields.
- `pm-ai-signal-to-intervention` chooses a response to a validated live signal.
  This package defines monitor semantics and reviewer/control evidence before a
  response is authorized.
- `pm-ai-incident-to-runbook` handles a journey-level incident. A monitor alert
  is not an incident without independent impact evidence.
- `pm-ai-prompt-injection-to-defense` handles an attack path. This package
  includes monitor manipulation as a blind-spot question but does not design
  the defense.
- `pm-ai-risk-to-control` handles the broader hazard-to-control review. This
  package narrows to monitoring and human oversight evidence.
- `pm-ai-independent-eval-to-release` reviews an independent evaluation. This
  package can request that evidence but does not treat it as a release.

Pick one next receipt. Do not chain the whole catalog.

## Review checklist

- [ ] Target, user job, concern class, monitor version, and observation scope
      are explicit.
- [ ] Eligible exposure, coverage gaps, sampling, delay, and permissions are
      explicit.
- [ ] Monitor prediction, observed behavior, reviewer label, control action,
      downstream state, and outcome are separate.
- [ ] Async, sync, human review, acknowledgement, escalation, expiry, and
      fallback states are explicit.
- [ ] Positive, negative, expected-variance, adversarial, and out-of-scope
      slices are named or marked `Not run`.
- [ ] False-positive and false-negative evidence is not invented.
- [ ] Privacy, retention, redaction, monitor manipulation, and action authority
      have an owner.
- [ ] The route has a stop rule, next receipt, and containment/rollback note.
- [ ] The public packet has no sensitive content or automatic external write.

## Not covered

- This reference contains no live monitor, alert, model call, customer trace,
  provider result, dashboard, control evaluation, red-team run, or safety case.
- The source links are design references; they do not prove monitor recall,
  precision, safety, harmlessness, adoption, causality, or production quality.
- One alert, quiet period, reviewer score, matched escalation, or containment
  receipt is not a universal detection or prevention claim.
- No chain-of-thought, private tool argument, customer identity, credential,
  token, private URL, or production log belongs in a public example.

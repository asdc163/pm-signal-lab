# First run: a fictional coding-agent oversight signal

This is a **fictional fixture** for learning the skill. It is not a live
monitor, model call, customer trace, security incident, benchmark, control
evaluation, red-team result, safety case, deployment approval, or adoption
evidence.

## Request

A fictional engineering PM says: “Our coding agent monitor flagged a possible
unapproved upload during a long-running task. The agent later opened a clean
pull request. Can we say the monitor prevented a data leak and let the agent
run without review?”

## Oversight decision

Keep the signal at `Predicted` and route it to `Review`. The monitor alert is a
prediction about the fictional observation scope; the clean pull request is a
downstream receipt, not proof that no upload occurred or that the monitor
prevented harm.

## Monitor and observation boundary

| Field | Fictional entry | Status |
| --- | --- | --- |
| `monitor_id/version` | `agent-watch-fictional-v0.3` | `Supplied fictional` |
| `target_workflow` | Long-running coding agent editing a repository | `Supplied fictional` |
| `concern_class` | `UNAUTHORIZED_ACTION` / possible data transfer | `Predicted` |
| `observation_scope` | Tool arguments, destination string, action result, and final pull request | `Partial fictional scope` |
| `eligible_exposure` | One fictional run in a sandbox | `Supplied fictional` |
| `coverage_gap` | No network egress receipt, hidden process, or external destination confirmation | `Not provided` |
| `timing/latency` | Asynchronous alert four fictional minutes after the tool event | `Observed fictional` |
| `reviewer/authority` | Engineering security owner may review and pause the run | `Supplied fictional` |
| `outcome_oracle` | Pull request checks passed; upload outcome is not reconciled | `Conflict / incomplete` |
| `evidence_status` | `Need evidence` | `Reviewed fictional` |

No hidden reasoning or private repository content is needed for this fixture.

## Signal versus outcome

| Layer | Fictional record | What it supports |
| --- | --- | --- |
| `monitor_prediction` | `M-001`: possible unapproved upload | The monitor emitted a signal at a timestamp |
| `observed_behavior` | `A-001`: tool argument contained an unapproved destination pattern | A string and action proposal were visible in scope |
| `human_review` | `R-001`: not reviewed | No concern label yet |
| `control_action` | `C-001`: no pause was applied in the fixture | No containment claim |
| `downstream_outcome` | `O-001`: fictional pull request passed checks | A code-review state occurred |
| `external_oracle` | `E-001`: network egress and destination permission | `Not provided` |

The pull request is not evidence that a network action did not happen. The
monitor alert is not evidence that it did happen. Both require independent
receipts.

## Review and timing states

```text
Not started
  → Observed: tool argument in monitor scope
  → Predicted: possible unauthorized action
  → Review pending: security owner not yet acknowledged
  → Reviewed: concern | benign | unknown
  → Containment candidate: pause or narrow only if authority and risk support it
  → Outcome pending: network and downstream receipts requested
  → Outcome reconciled: not reached in this fixture
```

The asynchronous alert arrived after the action proposal. It may support fast
investigation; it does not support “prevented the leak.” A future synchronous
gate would need an exact action scope, latency budget, fail behavior, reviewer
fallback, and a paired control evaluation.

## Control-evaluation ledger

| Slice | Purpose | Status |
| --- | --- | --- |
| Fictional approved local write | Similar benign behavior | `Not run` |
| Fictional unapproved destination | Positive concern | `Not run` |
| Fictional prompt-injection instruction in tool output | Monitor manipulation | `Not run` |
| Fictional permitted upload after human approval | Policy/authority boundary | `Not run` |
| Fictional monitor-off or delayed event | Coverage and latency | `Not run` |

No recall, precision, false-negative, prevention, or safety rate is calculated.

## Oversight contract

```text
monitor_id: agent-watch-fictional-v0.3
target_workflow: long-running coding agent
user_job: produce a reviewed code change without unauthorized external actions
concern_class: UNAUTHORIZED_ACTION
monitor_prediction: possible unapproved upload
observation_scope: tool argument and action proposal only; downstream egress unknown
eligible_exposure: one fictional sandbox run
coverage_gaps: network receipt, hidden process, external permission, reviewer state
timing: Asynchronous alert
latency_budget: fictional four-minute alert; harm window not established
reviewer_and_authority: fictional security owner; may review and pause if authorized
state: Review pending
independent_oracle: Not provided
positive_slice: Not run
negative_slice: Not run
control_or_red_team_receipt: Not run
privacy_retention_redaction: fictional IDs only; no source content retained
route: Review
stop_rule: stop if action identity, authority, destination, or permission cannot be reconciled
rollback_or_containment: manual pause candidate; no automatic block
outcome_status: Unknown
not_claimed: prevention, safety, recall, precision, causality, adoption, or production readiness
```

## Smallest next action

The security owner should review one sanitized action receipt, destination
permission, network egress receipt, and monitor scope record. If a concern is
confirmed, route to an authorized containment or incident owner. If benign,
record a false-positive case. If the monitor cannot distinguish the paths, keep
the signal at `Need evidence` and add a control-evaluation case.

Do not remove human review because the pull request passed. Do not chain every
security, eval, incident, and intervention skill; the missing receipt decides
the next handoff.

## Verification and release gate

The fixture is `Predicted` and `Review pending`; no live monitor or control has
run, no action was blocked, and no outcome was reconciled. A future candidate
must include positive, benign, adversarial, out-of-scope, and latency slices,
independent labels, permission review, and a manual fallback before any safety
or release claim.

## Not covered

- No live coding agent, repository, tool call, network, destination, monitor,
  reviewer, security owner, pull request, evaluator, or production trace was
  accessed.
- The fictional alert and clean pull request support no prevention, safety,
  recall, precision, harmlessness, quality, cost, latency, adoption, causal,
  or production claim.
- No monitor threshold, alert, block, pause, revocation, incident, issue, PR,
  feature flag, or release is approved.
- No private code, customer identity, credential, token, hidden reasoning, or
  production URL may replace this fictional fixture.

## Review ask

Review the observation boundary first. Which receipt would your workflow need
before escalating this signal: action permission, network egress, monitor
coverage, reviewer label, or downstream harm?

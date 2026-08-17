# First run: a fictional third-party evaluation of a support triage agent

This is a **fictional fixture** for learning the skill. It is not a live model
run, evaluator report, benchmark result, security assessment, user study,
deployment approval, or adoption evidence.

## Request

A fictional support PM says: “An external lab reviewed our AI triage agent and
reported an 86% task-success score. Can we ship the agent to all support teams?”

## Evaluation decision on the desk

Decide whether the fictional report supports a narrow pilot for routing low-risk
support requests, not a claim that the agent is safe or accurate for every
support workflow.

## Claim and user/job boundary

- `claim_class`: controlled product evaluation, with a limited capability claim.
- `user/job`: fictional support agents need a suggested queue and reason they
  can inspect before accepting a route.
- `current_workaround`: manual triage by a support lead; baseline result is
  `Not provided`.
- `decision_owner`: fictional support PM, support operations lead, and privacy
  reviewer.
- `false_positive`: a sensitive or urgent request is routed to the wrong queue
  without review.
- `false_negative`: a routine request stays in the manual queue; this is slower
  but reversible.

## Evaluator independence and access ledger

| Field | Fictional record | Status |
| --- | --- | --- |
| `evaluator` | Independent evaluation lab contracted for this assessment | `Supplied` |
| `conflicts` | Funding and publication review terms are not attached | `Unknown` |
| `scope` | One fictional model snapshot, one English support queue, 300 synthetic tickets | `Supplied` |
| `access` | No production connector; reduced-safeguard checkpoint access is not stated | `Not provided` |
| `publication` | Summary may be shared; raw tickets and trajectories are restricted | `Supplied` |
| `authority` | Lab reports findings; product owners decide pilot or hold | `Proposed` |

## Tested system and harness

- `model_version`: fictional `support-agent-2026-07`; exact artifact hash is
  `Not provided`.
- `surface`: evaluator harness, not the support console used by agents.
- `tools`: queue lookup and policy retrieval are `Not provided`.
- `context`: synthetic ticket text only; tenant isolation and current policy
  freshness are `Not run`.
- `budget`: attempt count, retries, tokens, time, and cost are `Not provided`.
- `comparison`: the 86% score is not comparable to a manual baseline because
  the baseline and denominator were not supplied.

## Task, slice, oracle, and denominator matrix

| ID | Slice | Expected behavior | Oracle | Status |
| --- | --- | --- | --- | --- |
| `FX-001` | routine request | suggest queue and reason | structured route plus human check | `Not run` |
| `FX-002` | sensitive request | abstain and escalate | no automatic route | `Not run` |
| `FX-003` | ambiguous request | ask for missing detail | clarification state | `Not run` |
| `FX-004` | stale policy fixture | show uncertainty and use manual route | policy-version receipt | `Not run` |
| `FX-005` | malformed ticket | fail safely without inventing fields | schema and recovery check | `Not run` |

The reported `86%` cannot be interpreted until the lab supplies the sample
count by slice, pass definition, missing/abstained cases, retry policy,
evaluator rubric, and denominator. No result is recalculated here.

## Validity hazard review

- Reward hacking: `Not checked`; inspect whether the agent earned credit by
  selecting a queue without a defensible reason.
- Refusals: `Not checked`; separate safe abstention from failed task completion.
- Contamination: `Not checked`; confirm synthetic tickets were not in prompt or
  training material and were not discoverable through tools.
- Broken problems: `Not checked`; verify that every queue and policy reference
  existed and was solvable in the harness.
- Harness/budget drift: `Not checked`; request retries, tools, time, and
  context-management details.

## Product control and release decision

- `decision`: `Hold` pending evaluator conflict disclosure, exact tested system
  and harness, denominator, validity checks, and a product-surface pilot run.
- `smallest_next_step`: repeat 30 fictional cases across routine, sensitive,
  ambiguous, stale-policy, and malformed slices with human review; proposed
  hard blocker is any automatic route for a sensitive case.
- `pilot_boundary`: one internal queue, manual acceptance, no outbound message,
  no cross-tenant retrieval, and an explicit stop rule for any privacy or
  unauthorized action observation.
- `rollback`: disable the triage suggestion and return to manual routing; the
  rollback owner and feature flag are `Not provided`.

## Not covered

- No live model, provider, support ticket, tool, tenant, human reviewer, or
  external evaluator was accessed.
- No safety, privacy, quality, accuracy, production, user, adoption, or cost
  claim is supported by the fictional 86% score.
- No deployment approval is granted; the next action is to obtain the missing
  evidence and rerun a bounded product-surface evaluation.

## Review ask

Provide the evaluator conflict, artifact/version, harness and budget, slice
denominator, validity checks, and product-control evidence before approving even
a narrow pilot.

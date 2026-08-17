# Workflow readiness reference

This reference supports `pm-ai-workflow-to-readiness`. It is a review aid for
one AI workflow candidate, not a scorecard or a provider integration.

## The evidence boundary

This is a **fictional fixture** when used with the example in this package. A
readiness packet can organize evidence supplied by a real owner, but it cannot
turn a proposal into a measured result.

Use these statuses consistently:

| Status | Meaning |
| --- | --- |
| `Ready` | The required field is supplied, current enough for the declared decision, and owned. |
| `Partial` | Some evidence exists, but a material scope, version, owner, or limitation remains. |
| `Missing` | The field is required but no usable evidence was supplied. |
| `Blocked` | A named dependency, permission, source, support route, or safety condition prevents the next step. |
| `Not run` | The proposed test or check has not happened. |
| `Not provided` | The input was not supplied; do not infer it. |
| `Unknown` | The available material does not resolve the question. |

## Readiness map fields

| Field | Review prompt | Receipt that strengthens it |
| --- | --- | --- |
| `user_job` | What does an eligible person need to complete? | observed task description, interview note, or approved workflow record |
| `current_workaround` | What happens without the candidate? | named current path and affected unit |
| `owner` | Who can approve, stop, support, and update it? | named accountable owner and backup/support route |
| `users` | Who participates, reviews, or is affected? | eligible cohort and exclusion rule |
| `frequency` | Does the job recur or have a representative slice? | dated work sample or explicit one-off test purpose |
| `value_hypothesis` | What progress might matter? | outcome definition and baseline plan, not a slogan |
| `complexity_risk` | What can make it hard or consequential? | edge-case list, risk review, or source-backed constraint |
| `inputs_sources` | Are inputs allowed, current, authoritative, and redacted? | source/version/authority and data-handling receipt |
| `access_dependencies` | Are tools, approvals, permissions, and upstream conditions available? | access owner, dependency receipt, or explicit blocker |
| `user_readiness` | Can a real participant review and give a meaningful receipt? | participant, reviewer, and support confirmation |
| `technical_readiness` | Can the version, environment, and failure path be bounded? | test environment, versions, fixture set, and recovery path |
| `human_boundary` | What may AI do, and what must a person decide? | approved stop/ask/escalate and human review rule |
| `support_fallback` | Who handles failure and what is the manual route? | support owner, response path, and fallback procedure |
| `testability` | Can one smallest test produce an interpretable receipt? | scope, duration, cases, oracle, and stop condition |

## Route decision table

Use the following qualitative route rules. They are not a numeric scoring
system.

### Test now

Choose `Test now` only when all critical conditions are `Ready` or explicitly
bounded as `Partial` without creating an unsafe or uninterpretable test:

- one named owner and reviewer;
- one concrete user/job slice and current alternative;
- allowed inputs, source authority, access, and sensitive-data boundary;
- a human boundary, stop/ask/escalate rule, and manual fallback;
- a stable candidate version/environment and representative cases;
- a receipt/oracle, duration, and recheck date.

The route means “run the smallest learning action after owner confirmation.”
It does not mean “ship,” “approve,” “scale,” or “will work.”

### Validate further

Choose `Validate further` when the candidate may be feasible, but one or more
recoverable fields are missing, partial, or untested. Name one evidence owner,
one missing receipt, a recheck trigger, and a safe interim route. Typical gaps
include incomplete source authority, unclear reviewer capacity, no
representative negative cases, or an outcome/oracle that needs design.

### Sequence later

Choose `Sequence later` when the job or value hypothesis is plausible but the
next test is not the best use of near-term attention because of timing,
dependency, capacity, readiness, or opportunity cost. Name the condition that
would reopen the candidate. Do not use this route to disguise an unacceptable
risk or absent accountability; those belong in `Avoid for now`.

### Avoid for now

Choose `Avoid for now` when the workflow cannot currently be tested within a
legitimate, safe, observable, human-owned boundary. Examples include no
accountable owner, no permitted access, no safe fallback for consequential
actions, unacceptable unresolved risk, or no way to observe the user job.
State the stop reason and the manual or alternative path. Reconsideration
requires a named authority and a new receipt.

## Smallest-test template

```text
test_id/version:
decision_owner:
workflow_id/version:
user_job:
eligible_slice:
excluded_slice:
current_workaround:
candidate_boundary:
allowed_inputs/sources:
permissions/redaction:
participants/reviewer:
environment/change_limit:
positive_cases:
negative_cases:
ambiguous_or_abstain_cases:
receipt_oracle:
duration/timezone:
success_signal:
stop_ask_escalate_rule:
manual_fallback:
rollback_or_containment:
review_date:
execution_status: Not run
```

One change at a time is easier to interpret. If the workflow, source, model,
prompt, tool, policy, audience, and permissions all change together, record
the confounding and route to a revalidation plan rather than pretending the
test isolates one cause.

## Claim ledger template

| Claim | Status | Scope/unit | Source/method | Date/version | Limitation | Next receipt |
| --- | --- | --- | --- | --- | --- | --- |
| `[literal claim]` | `Observed/Reported/Proposed/Measured/Unknown` | `[what is covered]` | `[source or Not provided]` | `[timestamp/version]` | `[what it cannot prove]` | `[smallest next evidence]` |

Keep these declarations visible in a packet:

- `Readiness route: proposed` until an accountable owner accepts the boundary.
- `Test: Not run` until a dated test record exists.
- `Outcome: Not measured` until a defined accepted outcome and denominator are
  reviewed.
- `Adoption: Not measured` until repeated eligible behavior is observed under
  a stated definition.
- `Production: Not verified` until runtime, permissions, reliability,
  operations, and release evidence are independently checked.

## Review checklist

- Is this one workflow, not a portfolio ranking or a generic capability?
- Can a reviewer name the user, job, current workaround, owner, and boundary?
- Are source authority, access, dependency, support, and sensitive-data limits
  explicit?
- Is human accountability visible before any consequential action?
- Does the smallest test have representative positive, negative, ambiguous, and
  abstain cases?
- Is the route based on the weakest critical prerequisite rather than a score?
- Is there a recovery, fallback, recheck, or stop condition?
- Are outcome, adoption, value, safety, and production claims kept separate?
- Does `Not covered` list what the packet did not verify?

## Not covered

This **fictional fixture** reference does not establish a real workflow's
market demand, urgency, business value, ROI, adoption, output quality, safety,
security, privacy, accessibility, localization, cost, latency, reliability,
production readiness, rollout, rollback execution, or causal impact. It does
not call a provider, inspect a private system, grant access, or run a test.

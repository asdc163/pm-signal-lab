# First run: turn a support correction into a safe eval case

This is a fictional fixture for a support-draft review. It contains no real
customer, model, provider, transcript, account, or production evidence.

Input signal:

> A support reviewer changed the draft from “Your annual plan is eligible for
> an immediate refund” to “I need to verify the plan date and route this to
> billing before promising a refund.” The reviewer wrote: “The draft answered
> too soon; it did not show the plan-specific rule.”

## Decision on the desk

`Hold` the feedback as a proposed regression candidate until content-use
permission and a domain-approved oracle are confirmed.

- User/job: help a support agent produce a safe, policy-grounded refund reply.
- Current workaround: the reviewer manually edits the draft and escalates.
- Evidence strength: one fictional reviewer correction; low and not generalizable.
- Decision owner: support product owner plus billing policy owner.

## Feedback and source ledger

| ID | Source | What is available | Status |
|---|---|---|---|
| `F-001` | fictional reviewer correction | sanitized before/after summary and reviewer note | observed fixture |
| `P-001` | fictional refund policy | plan date and eligibility rule are required | proposed reference |
| `T-001` | model/trace metadata | provider, version, trace, and timestamp are absent | Not provided |

## Observation, interpretation, label, and expected behavior

- `Observed`: the draft stated refund eligibility before checking plan date or
  showing the plan-specific rule.
- `Interpretation`: the workflow may lack a context or escalation gate; model
  cause is `Unknown`.
- `Label`: `unsupported_eligibility_claim`, proposed by the reviewer.
- `Expected behavior`: ask for or retrieve the plan date, show the applicable
  policy source, and route to billing when eligibility cannot be verified.
- `Actual outcome`: the reviewer manually corrected the draft; no real refund
  was executed.

## Privacy, consent, and redaction

- Retained: fictional case ID, abstract job, safe behavior summary.
- Removed: customer identity, account ID, order ID, email, raw transcript,
  private policy URL, and any payment detail.
- Consent/content-use status: `Unknown` for any real counterpart; keep a real
  case private until an authorized owner confirms permitted use.
- Public packet status: fixture only; no customer content may be copied here.

## Eval case and oracle

- Case ID: `C-001` (proposed).
- Safe input: “I want a refund for my annual plan.”
- Required context: plan type, plan date, applicable policy source ID.
- Expected route/output: clarify or retrieve missing plan data; cite the rule;
  do not promise eligibility without evidence; escalate when required.
- Denied behavior: state “eligible” without the plan-specific check.
- Oracle: policy-owner rubric plus a deterministic assertion that a required
  plan-date field or escalation state is present.
- Reviewer: support product owner and billing policy owner.
- Execution status: `Not executed`.
- Dataset destination: `Hold` until consent and oracle review are complete.

## Dataset destination and slice

- Proposed slice: `support / refund / missing-plan-context / English`.
- Representativeness: one fictional fixture cannot establish prevalence or
  support-wide coverage.
- Duplicate and holdout status: `Not checked`.
- Next coverage action: collect a privacy-safe set of plan-date present,
  plan-date missing, eligible, ineligible, and escalation cases.

## Calibration and contamination

- Rubric version: `Not provided`.
- Independent labels: `Not provided`; the reviewer note is one proposed label.
- Judge model: none used.
- Contamination check: `Not checked`; do not place this case in both dev and
  holdout.

## Release, fallback, and learning loop

- Must pass: plan-specific evidence or a billing escalation state is visible.
- Must not occur: an unsupported eligibility promise.
- Fallback: keep the draft editable and route to a human billing reviewer.
- Rollback trigger: any release increases unsupported refund promises or removes
  the escalation path.
- Next action: confirm the policy oracle, consent boundary, and a small clean
  case pack with the authorized owners.

## Not covered

- No real user, provider, model output, trace, policy URL, or production run was
  used.
- No frequency, segment prevalence, model diagnosis, quality score, adoption,
  traffic, or business impact is established.
- The case has not been executed and is not a passing regression.

## Review ask

Should the authorized owners `Accept case`, `Hold`, or `Need evidence` after
confirming the policy oracle and permitted data boundary?

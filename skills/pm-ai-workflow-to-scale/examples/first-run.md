# First run: a fictional support-draft scale review

This is a **fictional fixture** for learning the skill. It is not a live
product, customer study, benchmark, financial forecast, adoption result,
production deployment, safety review, or causal analysis.

## Request

A fictional support PM says: “Our AI reply-draft pilot saved agents time and
three teams want access. The model is inexpensive. Can we make it the default
for every support queue next month?”

## Scale decision

Keep the workflow at `Pilot` and propose a `Narrow` expansion to low-risk
English email tickets only. The fictional evidence shows promise, but the
accepted outcome, critical negative cases, support capacity, and higher-risk
queue controls are not ready for broad scale.

## Workflow frame

| Field | Fictional entry | Status |
| --- | --- | --- |
| `workflow_id/version` | `support-draft-fictional-v0.4` | `Supplied fictional` |
| `user_job` | Agents need a source-linked reply draft they can verify before sending. | `Supplied fictional` |
| `current_state` | `Pilot` | `Observed fictional` |
| `scale_question` | Open to three more queues and make draft generation default | `Proposed fictional` |
| `eligible_exposure` | 120 low-risk English email tickets in one queue | `Supplied fictional` |
| `observation_window` | Two fictional weeks, UTC, with one manual reviewer per shift | `Supplied fictional` |
| `decision_owner` | Support product lead with quality and operations owners | `Supplied fictional` |
| `evidence_status` | `Need evidence` | `Reviewed fictional` |

## Evidence stack

| Layer | Fictional observation | Status |
| --- | --- | --- |
| Usage | 120 drafts generated; 3 teams asked for access | `Observed fictional` |
| Output quality | 42 of 50 reviewed drafts met the draft rubric | `Reviewed fictional; small sample` |
| Accepted outcome | 34 of 50 were sent after agent review; resolution quality was not joined | `Not reconciled` |
| Negative cases | Two policy-sensitive examples required escalation; slice coverage is incomplete | `Need evidence` |
| Human work | Agents reported less typing; edit time and verification time were not instrumented | `Reported fictional` |
| Cost | Model input/output cost was low in the fixture; retries and review labor were not counted | `Partial fictional` |
| Reliability | One fictional source timeout used the manual route | `Observed fictional` |
| Demand | Three teams requested access | `Demand signal, not adoption proof` |
| Capacity | One quality reviewer per shift; support owner has no expansion plan | `Blocked fictional` |
| Trust/safety | Low-risk email scope only; higher-risk queues have no approval or policy slice | `Partial fictional` |

The low token price cannot answer whether the workflow is cheaper per accepted
outcome. The three team requests cannot answer whether broader exposure is
valuable or supportable.

## Readiness matrix

| Area | Status | Why |
| --- | --- | --- |
| User value | `Partial` | typing time is reported; accepted resolution is not reconciled |
| Quality | `Partial` | 50 reviewed drafts, missing high-risk and abstain slices |
| Trust/safety | `Blocked` for higher-risk queues | escalation and policy controls are not evidenced |
| Reliability | `Partial` | one timeout used manual fallback; denominator is unknown |
| Cost | `Need evidence` | review, retries, and support labor are missing |
| Demand | `Observed` | three teams asked; repeat task and eligible denominator not measured |
| Capacity | `Blocked` | reviewer and support coverage cannot absorb three new queues |
| Change management | `Need evidence` | training, communication, rollback, and owner are incomplete |

## Route record

```text
workflow: support-draft-fictional-v0.4
user_job: verify a source-linked draft before sending a support reply
current_state: Pilot
proposed_route: Narrow
accepted_outcome: reviewed draft sent without policy or factual breach and with an acceptable resolution state
outcome_oracle: final support resolution plus quality review; not provided for the fixture
denominator: 120 generated drafts, 50 reviewed; eligible exposure and missing outcomes not reconciled
representative_slices: low-risk English email only; high-risk, non-English, chat, and abstain slices incomplete
quality_status: Partial
trust_safety_status: Blocked outside low-risk scope
reliability_status: Partial
cost_per_accepted_outcome: Not run
demand_status: Observed request signal; not adoption evidence
capacity_status: Blocked
change_management_status: Need evidence
decision_owner: support product lead with quality and operations owners
rollout_boundary: keep low-risk English email pilot; add one queue only after reviewer coverage
stop_rule: stop expansion on critical policy miss, unresolved source failure, quality floor miss, or reviewer overload
rollback_or_containment: manual drafting route and remove the additional queue flag
next_receipt: matched accepted-outcome slice plus reviewer/support capacity plan
evidence_status: Need evidence
not_claimed: value, savings, adoption, safety, causality, unit economics, or production readiness
```

## Smallest next action

Keep the current low-risk pilot, instrument one accepted outcome and reviewer
work slice, and write an operations plan for reviewer/support capacity. Add one
new low-risk queue only after the quality, source, policy, timeout, and manual
fallback checks pass. Route high-risk and non-English queues to `Hold` until
their oracle and controls are ready.

Do not chain cost, retention, experiment, release, and opportunity skills just
because they are adjacent. The missing accepted-outcome and capacity receipts
determine the next handoff.

## Verification and release gate

The decision is `Scale decision: proposed`, `Rollout: not started`, and
`Outcome: not verified`. A future candidate must compare the same user-job
slice, include negative/abstain/high-risk cases, count correction and reviewer
work, verify reliability and fallback, and name a capacity owner before staged
expansion.

## Not covered

- No live support queue, ticket, model, provider, reviewer, customer, cost
  ledger, business metric, adoption event, evaluator, or production system was
  accessed.
- The fictional counts and team requests support no savings, value, quality,
  safety, unit-economic, causal, adoption, or production claim.
- No budget, default-on rollout, queue expansion, model change, policy change,
  issue, PR, feature flag, or release is approved.
- No private ticket, customer identity, credential, forecast, or production URL
  may replace this fictional fixture.

## Review ask

Review the accepted-outcome and readiness rows first. Which receipt is the
hardest blocker in your workflow: user-job oracle, negative slice, cost per
accepted outcome, support capacity, or rollback?

# First run: a fictional AI review queue

This is a **fictional fixture** for learning the skill. It is not a staffing
plan, live queue readout, reviewer performance record, safety case, quality
result, adoption result, or production approval.

## Request

A fictional PM at Northstar Help says:

> “Our support assistant drafts answers from approved help articles. We want a
> human in the loop before anything is sent. Can we expose it to one English
> workspace next week?”

The queue, reviewers, volume, review time, access, SLA, calibration, and
fallback are fictional and not verified. The packet is narrowed to one
workspace, `en-US`, draft-only output, and a fictional support operation.

## Decision frame

- **Job:** help a support agent prepare an answer; the agent owns the final
  edit and send decision.
- **Scope:** one fictional Northstar Help workspace, browser support surface,
  `en-US`, draft output only.
- **Review need:** account changes, refunds, security, legal, and termination
  topics require full review; general article answers are proposed for a
  stratified sample.
- **Owner:** fictional Support Product PM; review operations, privacy, and
  escalation owners are not accepted.
- **Irreversible action:** expose customer questions and drafts to the workflow
  or let a draft reach a customer without the required review.
- **Route:** `Add capacity`.

## Source ledger

| ID | Source / role | What it supports | Limit |
| --- | --- | --- | --- |
| `S-01` | [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | documented roles, context, review, and continuous governance are useful fields | framework mapping input; not proof about Northstar |
| `S-02` | [OpenAI Frontier](https://openai.com/business/frontier/) | identity/access, auditable actions, governance, and observability are relevant operating questions | provider material; not a Northstar receipt |
| `S-03` | [OpenAI Presence](https://openai.com/index/introducing-openai-presence/) | policies, approved actions, evaluations, escalation, and controlled change are relevant patterns | provider material; not proof of this fictional queue |
| `S-04` | [Running Codex safely at OpenAI](https://openai.com/index/running-codex-safely/) | bounded execution, approvals, access controls, and telemetry are relevant questions | coding-agent context; not a support-review result |
| `S-05` | fictional Northstar review brief `v0.1` | fictional job, queue, coverage, and reviewer assumptions | no real staff, queue, customer, or operation |

## Review need and unit

| Field | Entry | Status / limitation |
| --- | --- | --- |
| `review_unit` | one generated support draft linked to one customer question and source set | `Proposed`; aggregation and duplicate rule are not verified |
| Trigger | draft generated before support agent can send | fictional design; enforcement `Not verified` |
| Review states | `Accept`, `Edit`, `Reject`, `Escalate`, `Unreviewable`, `Expired` | proposed states; runtime receipt `Not run` |
| Full-review classes | account change, refund, security, legal, termination | fictional risk classification; authorized review `Not provided` |
| Sampled class | general article answer with no account or policy side effect | proposed boundary; false classification `Not measured` |
| Deadline | high-risk draft before send; general draft within 30 minutes | fictional SLA; queue measurement `Not run` |

## Coverage policy

| Class | Fictional weekly arrivals | Coverage | Sampling / stop rule | Status |
| --- | ---: | --- | --- | --- |
| Account/security/refund/legal/termination | 120 | `Full` | every eligible draft; any missed review blocks exposure | `Proposed` |
| General article answer | 1,080 | `Sample` | 10% stratified by article family; add all negative/ambiguous cases; stop if rejection or escalation threshold is crossed | `Proposed` |

The sample is not justified by cost alone. The fictional packet still needs a
denominator, selection receipt, negative-case coverage, threshold, monitor
owner, and a tested stop action. A support agent's final send decision is a
separate human boundary, not a substitute for the review policy.

## Queue and capacity map

| Input | Fictional entry | Evidence status |
| --- | --- | --- |
| Total draft arrivals | 1,200/week | `Reported fictional fixture`; not a production count |
| Full-review units | 120/week | `Reported fictional fixture`; class precision `Not measured` |
| Sample units | 108/week | `Derived illustrative arithmetic`; selection not run |
| Review time | 12 minutes full-review / 6 minutes general sample | `Not measured` |
| Illustrative review load | 34.8 reviewer-hours/week | arithmetic from fictional inputs; not observed capacity |
| Reviewer availability | two fictional agents × 15 eligible hours/week = 30 hours | `Proposed`; schedule, interruptions, access, and skill not verified |
| Backlog / burst / p95 age | `Not provided` | queue receipt required |
| Service target | high-risk before send; general within 30 minutes | fictional policy; SLA not accepted |

The illustrative load is higher than the illustrative available time, but that
does not prove a staffing requirement because the inputs are fictional and
unmeasured. It does support `Add capacity` as a cautious packet route while the
owner obtains the smallest real queue, time, and reviewer receipts.

## Reviewer quality, privacy, and fallback

| Layer | Current entry | Status / next receipt |
| --- | --- | --- |
| Reviewer role | support agents review drafts; privacy owner and escalation specialist absent | `Incomplete`; name accountable roles |
| Quality aid | fictional article-grounding checklist | `Proposed`; calibration/second-review method `Not provided` |
| Privacy/access | customer question and draft may contain account details | `Unknown`; minimize data and verify tenant/access/expiry |
| Escalation | specialist review for legal/security or uncertain drafts | `Proposed`; destination, owner, and response time `Not provided` |
| Fallback | keep the manual search-and-draft path; block send if review unavailable | `Proposed`; capacity and manual availability `Not run` |
| Fatigue/conflict | no break, rotation, conflict, or duplicate policy | `Not provided`; review operations owner needed |

## Evidence layer map

| Layer | Fixture has | It does not prove |
| --- | --- | --- |
| `review_need` | fictional risk classes and draft-before-send boundary | complete safety coverage |
| `review_unit` | one draft per customer question/source set | stable production denominator |
| `coverage_policy` | full high-risk and sampled general proposal | actual coverage |
| `queue_demand` | illustrative arrivals and load arithmetic | real demand or backlog |
| `reviewer_capacity` | illustrative reviewer hours | sustained staffing |
| `review_quality` | proposed checklist | reviewer agreement or model quality |
| `privacy_access` | customer-data concern | authorization or compliance |
| `escalation_fallback` | proposed specialist/manual paths | executed recovery |
| `economics_limits` | illustrative review hours | savings or ROI |
| `governance_owner` | PM hypothesis | owner acceptance or launch approval |

## Why the route is `Add capacity`

The fictional job has a clear review unit and a plausible high-risk boundary,
but queue demand, review time, owner acceptance, privacy access, calibration,
escalation, and fallback receipts are missing. The illustrative arithmetic
also leaves less nominal reviewer time than nominal review load. The smallest
next action is to obtain one bounded queue window, time a representative set,
name the review/privacy/escalation owners, verify access, and prove a manual or
deny route before exposure. If the high-risk boundary cannot be covered or the
queue cannot be observed, change to `Hold`.

For route boundaries, use `Cover required` when all required review classes,
capacity, access, SLA, quality aid, owner, and fallback receipts exist. Use
`Sample and monitor` only when a consequence-bounded denominator, stop rule,
monitor owner, and sample capacity exist. `Add capacity` is a request for the
smallest missing time, role, access, skill, or fallback receipt; it is not a
staffing action.

## Reviewer prompt

Which receipt would change the route first: real arrivals/backlog, timed review
minutes, reviewer/privacy owner acceptance, sample selection, calibration, or
manual fallback? Does the high-risk class need a second reviewer or a `Hold`
boundary before any customer exposure?

## Not run

No customer question, support queue, reviewer, staffing schedule, permission,
privacy system, model, provider, endpoint, message, account action, escalation,
fallback, calibration session, or production surface was accessed or executed.

## Not covered

This fixture does not establish that human review happens, that reviewers catch
errors, that the sample is safe, that the model is correct, that the queue is
available, that capacity is sustainable, or that the workflow is private,
secure, compliant, reliable, valuable, adopted, causal, or production-ready.
All queue, staffing, volume, and time values are fictional; the linked official
sources are mapping inputs, not evidence about Northstar Help.

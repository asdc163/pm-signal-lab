# AI human-review capacity packet

This reference is a reusable review-operations worksheet. The sample wording
is a **fictional fixture**; replace it with scoped, authorized evidence before
using the packet for a test, exposure, staffing decision, or launch review.
Human review is a control hypothesis until coverage, queue, reviewer, and
outcome receipts exist.

## 1. Decision frame

> Decide whether review for output `<type>` from `<workflow/version>` is
> coverable for user job `<job>` in `<tenant/region/surface/environment>` under
> consequence boundary `<boundary>`, coverage rule `<full/sample/exception>`,
> service target `<SLA>`, reviewer capacity `<receipt>`, fallback `<route>`,
> and owner `<role>` before `<test/expose/route/act>`.

| Field | Entry | Status / evidence |
| --- | --- | --- |
| User/job | `<who needs what progress>` | `Reported / Observed / Unknown` |
| Current workaround | `<manual or existing path>` | `<source/status>` |
| Output/action | `<draft/recommendation/extraction/action proposal>` | `<version/scope>` |
| Consequence | `<harm, loss, privacy, access, delay, or relationship effect>` | `Known / Unknown` |
| Review owner | `<accountable role and escalation>` | `Named / Unknown` |
| Irreversible action | `<send/publish/store/act/expose/route>` | `<decision consequence>` |
| Must-not-fail boundary | `<full review, access, privacy, or fallback condition>` | `Known / Unknown` |
| Route | `Cover required / Sample and monitor / Add capacity / Hold` | `<one sentence>` |

## Evidence ladder

| Layer | Minimum receipt | Safe wording | Cannot establish by itself |
| --- | --- | --- | --- |
| `review_need` | consequence class, trigger, review rationale, and owner | “The named job requires…” | complete risk coverage |
| `review_unit` | counted item, source/version, scope, states, and denominator | “One review unit is…” | demand or reviewer effort |
| `coverage_policy` | full/sample/exception rule, strata, threshold, and stop action | “The policy covers…” | actual coverage or effectiveness |
| `queue_demand` | arrivals, backlog, priority, burst, age, and SLA method | “The queue recorded…” | future demand or capacity |
| `reviewer_capacity` | eligible role/time/access/skill and availability receipt | “The modeled capacity uses…” | sustained staffing or performance |
| `review_quality` | review aid, calibration, disagreement, correction, and second-review method | “The review method records…” | population quality or safety |
| `privacy_access` | data class, minimization, tenant, role, expiry, and revocation | “The access boundary allows…” | legal compliance or actual handling |
| `escalation_fallback` | owner, timeout, specialist/manual/deny route, and recovery receipt | “The fallback plan states…” | executed recovery or resilience |
| `economics_limits` | review minutes, queue cost, budget, unit, date, and scenario | “The scenario assumes…” | savings, ROI, or value |
| `governance_owner` | product, review, privacy, operations, and escalation roles | “The role is named…” | owner acceptance or launch approval |

## 2. Review need and unit

| Field | Required question | Evidence / status |
| --- | --- | --- |
| Trigger | What event creates an eligible review unit? | `<event/config/Unknown>` |
| Review unit | What one item, batch, proposal, or decision is counted? | `<ID/aggregation>` |
| Source/version | Which output, model, prompt, tool, source, and environment produced it? | `<receipt>` |
| Scope | Which tenant, region, locale, channel, user, and volume are included? | `<scope>` |
| Review states | Can the reviewer accept, edit, reject, escalate, mark unreviewable, or expire? | `<state contract>` |
| Deadline | What must happen before send, publish, action, or expiry? | `<policy/SLA>` |
| Consequence class | Which cases require full review, sampling, exception, or second review? | `<owner/authority>` |

Keep `generated`, `queued`, `reviewed`, `accepted`, `edited`, `rejected`,
`escalated`, `expired`, and `sent/acted` as different denominators. A review
unit that cannot be counted cannot support a coverage claim.

## 3. Coverage policy

| Class / slice | Consequence | Required coverage | Selection / trigger | Denominator | Reviewer / SLA | Stop action |
| --- | --- | --- | --- | --- | --- | --- |
| `<class>` | `<impact>` | `Full / Sample / Exception / Second review` | `<strata, random/systematic rule, trigger>` | `<eligible units>` | `<role/time>` | `<threshold/owner>` |

For sampling, record strata, positive/negative/ambiguous cases, minimum count,
selection receipt, time window, review result, escalation threshold, and what
happens when the threshold is crossed. A sample is not a quality result and a
coverage percentage is not a safety claim.

High-impact, irreversible, privacy-sensitive, regulated, financial,
employment, relationship, or value-laden decisions default to full human
ownership or `Hold` until an authorized owner defines a different boundary.

## 4. Queue and demand map

| Signal | Value | Unit / window | Source / method | Status | Limitation |
| --- | --- | --- | --- | --- | --- |
| Eligible arrivals | `<count>` | `<per hour/day/week>` | `<queue/log/owner>` | `Observed / Reported / Not measured` | `<scope>` |
| Priority mix | `<classes>` | `<window>` | `<queue rule>` | `<status>` | `<burst/unknown>` |
| Backlog | `<count and age>` | `<as of>` | `<queue receipt>` | `<status>` | `<stale/unknown>` |
| Review time | `<p50/p95 or range>` | `<per unit>` | `<timed sample>` | `<status>` | `<slice>` |
| Service target | `<SLA/expiry>` | `<class/window>` | `<policy/term>` | `Term / Proposed / Unknown` | `<not an uptime promise>` |
| Duplicate/retry | `<rule/count>` | `<window>` | `<trace/queue>` | `<status>` | `<effect on denominator>` |

Do not infer demand from model calls, UI clicks, seats, or output count unless
the relation and eligible review unit are established. Keep a burst window and
normal window separate.

## 5. Reviewer capacity map

| Reviewer class | Role / skill | Eligible minutes | Availability | Access / conflict | Review time | Escalation skill | Receipt |
| --- | --- | ---: | --- | --- | --- | --- | --- |
| `<role>` | `<training/authority>` | `<minutes/window>` | `<schedule/Unknown>` | `<tenant/data/conflict>` | `<p50/p95>` | `<specialist/Unknown>` | `<artifact/date>` |

Use a capacity model only when every input is named:

```text
effective_capacity = eligible_reviewers
                   × eligible_review_minutes
                   × availability_factor
                   × review_coverage_factor
                   ÷ review_minutes_per_unit
```

This is a model of possible capacity, not a staffing or performance result.
Breaks, meetings, support work, interruptions, training, access changes,
privacy restrictions, fatigue, and second review reduce usable capacity. Do not
invent a factor or convert it into a headcount recommendation.

## 6. Quality, privacy, and access

| Boundary | Required fields | Current evidence | Next receipt |
| --- | --- | --- | --- |
| Review aid | rubric/checklist, examples, allowed edits, abstention | `<artifact/status>` | `<owner/action>` |
| Calibration | reviewer agreement, disagreement, second review, adjudication | `<record/status>` | `<calibration owner>` |
| Correction | accepted/edited/rejected reason, feedback destination, privacy redaction | `<case/status>` | `<owner/action>` |
| Privacy | data class, minimization, tenant, retention, copy/export rule | `<policy/config>` | `<privacy owner>` |
| Access | principal, role, scope, expiry, revocation, audit | `<identity receipt>` | `<authorized owner>` |
| Fatigue/conflict | rotation, break, conflict, duplicate, overload, escalation | `<runbook/status>` | `<operations owner>` |

Route rubric agreement to `pm-ai-review-to-calibration`, data to
`pm-ai-data-to-purpose`, and identity/access to
`pm-ai-identity-to-boundary`. A reviewer who lacks the required context or
authorization is not usable capacity.

## 7. Escalation and fallback

| Failure / state | User-visible state | Owner | Next route | Expiry / stop | Receipt |
| --- | --- | --- | --- | --- | --- |
| Missing source/context | `Need evidence` / no send | `<role>` | source owner or manual | `<time>` | `<artifact>` |
| Uncertain or conflicting output | `Escalate` / hold | `<role>` | specialist / second review | `<time>` | `<artifact>` |
| Privacy/access restriction | `Blocked` / redact | `<role>` | authorized reviewer | `<time>` | `<artifact>` |
| Queue overflow or timeout | `Delayed` / manual or deny | `<role>` | fallback / narrow scope | `<threshold>` | `<artifact>` |
| Duplicate or late action | `Review expired` / no action | `<role>` | reconcile and verify | `<rule>` | `<artifact>` |
| Reviewer unavailable | `No reviewer` / hold | `<role>` | manual/deny/sequence | `<expiry>` | `<artifact>` |

“Manual fallback exists” is a reported plan until a named owner, scope,
capacity, and receipt show that someone can safely perform it. Escalation is a
transfer, not a resolution.

## 8. Route rules

| Route | Condition | Smallest next action | Do not imply |
| --- | --- | --- | --- |
| `Cover required` | full-review classes, owner, capacity, access, quality aid, service target, and fallback are bounded | run required review and record coverage/queue receipts | launch, safety, or model quality |
| `Sample and monitor` | bounded consequence, defensible denominator/strata, sample capacity, threshold, monitor owner, and fallback exist | run sample, capture quality/backlog, re-check on threshold/change | representative quality or safe coverage |
| `Add capacity` | review is needed but time, role, skill, access, SLA, queue, or fallback is missing/insufficient | obtain one smallest capacity/access/skill/fallback receipt | staffing order or approval |
| `Hold` | consequence unbounded, authority/privacy unresolved, queue unobservable, fallback absent, or hard limit breached | block expose/route/act and preserve manual/deny path | permanent rejection |

## 9. Review checklist

- [ ] one job, scope, output/action, consequence, irreversible action, and owner are explicit;
- [ ] the review unit, states, denominator, deadline, and excluded cases are defined;
- [ ] full/sample/exception/second-review coverage has a rule, strata, stop action, and owner;
- [ ] arrivals, backlog, priority, burst, review time, expiry, and service target are sourced or marked unknown;
- [ ] capacity includes eligible time, access, skill, availability, fatigue, and escalation, not headcount alone;
- [ ] reviewer quality, calibration, privacy, access, conflict, and correction are separate;
- [ ] queue overflow, timeout, escalation, manual/deny fallback, and recovery are visible;
- [ ] units, date, scope, source, and limitations are present for economics;
- [ ] one route, one smallest next action, and one review ask are present;
- [ ] no review plan is described as quality, safety, compliance, adoption, value, reliability, or production proof;
- [ ] public examples are fictional or sanitized.

## Official mapping inputs

This worksheet is informed by:

- [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) — governance roles, context, controls, inventory, and continuous review;
- [OpenAI Frontier](https://openai.com/business/frontier/) — identity/access, auditable actions, governance, and observability patterns for AI coworkers;
- [OpenAI Presence](https://openai.com/index/introducing-openai-presence/) — policies, guardrails, approved actions, evaluations, escalation, and controlled change;
- [Running Codex safely at OpenAI](https://openai.com/index/running-codex-safely/) — bounded execution, approvals, access controls, and telemetry.

These references shape the questions; they do not prove that a local review
queue exists, that a reviewer catches errors, that a sample is sufficient, or
that a workflow is safe, compliant, valuable, adopted, reliable, or ready.

## Not covered

This reference does not staff or schedule reviewers, access a live queue,
contact a reviewer, grant permissions, rank reviewer performance, calibrate a
rubric, judge model quality, monitor production, approve a side effect, give
legal/privacy/security advice, or approve a launch. A complete packet or
fictional fixture is not proof of capacity, coverage effectiveness, safety,
quality, privacy, compliance, adoption, value, reliability, causality, or
production readiness.

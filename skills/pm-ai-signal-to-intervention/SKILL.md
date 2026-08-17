---
name: pm-ai-signal-to-intervention
description: Turn an online AI quality, safety, trust, cost, latency, policy, or behavior signal into an evidence-bounded intervention decision with scope, owner, TTL, user communication, verification, recovery, rollback, and learning writeback. Use when a PM must decide whether a live signal means observe, investigate, qualify, narrow, gate, pause, rollback, or restore without treating one noisy event or a dashboard count as an incident or release verdict.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Signal to Intervention

Use this skill when an AI product has a live or post-release signal and a PM
must decide whether to change behavior. It turns a signal into a bounded
operating decision: validate the evidence, classify impact and scope, choose
the smallest proportionate intervention, assign an owner and expiry, verify the
result, and write back the learning.

The output is not a monitoring dashboard, alerting service, incident pager,
feature-flag operation, model recommendation, automatic kill switch, or proof
of production quality. It is a decision packet for an authorized owner.

Keep these layers separate:

1. A signal was observed.
2. The signal is valid enough to investigate or act on.
3. The impact and affected scope are understood.
4. An intervention was proposed, applied, or verified.
5. Users recovered and the product decision was updated.

If a layer is missing, write `Not provided`, `Unknown`, `Not run`,
`Not measurable`, or `Inconclusive`. Do not turn a raw count, one trace, one
star, or one owner-authored note into an intervention success claim.

## When to use

Use it when:

- an online AI signal suggests a quality, safety, privacy, trust, cost,
  latency, availability, policy, or behavior shift after release;
- user corrections, refusals, retries, escalations, abandonment, guardrail
  trips, or support observations may require a product response;
- a team needs to distinguish `Observe`, `Investigate`, `Contain`, `Qualify`,
  `Narrow`, `Human gate`, `Pause`, `Rollback`, `Restore`, and `Inconclusive`;
- an aggregate metric may hide a harmed segment, a sampling gap, a stale
  route, a denominator change, or a critical false pass;
- a PM must define the intervention scope, owner, TTL, receipt, verification
  oracle, user-visible degraded state, and recovery path;
- a model, provider, prompt, policy, retrieval corpus, tool, or routing change
  changes the meaning of an existing signal.

Use `pm-ai-run-to-observability` when the main work is defining the trace,
event, provenance, privacy, and retention evidence. Use
`pm-ai-trace-to-regression` for one concrete bad run that should become a
regression case. Use `pm-ai-incident-to-runbook` when the evidence already
supports a journey-level incident and the main work is containment/reopen
operations. Use `pm-release-to-learn` for the rollout learning plan. Use
`pm-ai-risk-to-control` for designing preventive/detective/corrective controls.
Use `pm-ai-cost-to-guardrail` for a cost or latency budget. This skill sits
between an observed online signal and a proportionate intervention; it does
not replace those contracts.

Do not use this skill to page people, change a flag, pause production, replay a
tool call, contact customers, expose telemetry, call a provider, or declare a
live incident resolved. Produce a handoff for an authorized owner.

## Guardrails

1. Start with one user job, critical journey, decision owner, observation
   window, and action boundary. A dashboard is not the user problem.
2. Record the signal source, event definition, eligible exposure, numerator,
   denominator, baseline/comparator, segment, freshness, and measurement gaps.
   A raw count without exposure is `Inconclusive`.
3. Separate impact severity, evidence confidence, prevalence, and action
   urgency. High-impact/low-confidence signals may need immediate containment
   while investigation continues.
4. Do not declare an incident from one noisy event, a changed denominator, a
   missing event, or an owner activity artifact. State the evidence boundary.
5. Apply the smallest scope that protects the job: case, user, segment,
   route/model, feature, or global. Do not globalize a segment problem without
   evidence.
6. Prefer reversible, time-boxed interventions. Every action needs an owner,
   TTL, receipt, verification oracle, fallback, and rollback or restore rule.
7. Privacy, security, unauthorized access, unsafe high-impact output, and
   unknown irreversible side effects are hard containment routes, even when
   prevalence is not measurable.
8. When an intervention changes the user journey, state what changed, why,
   what remains available, what is blocked or qualified, and how to recover.
   Never hide a pause or degradation behind a generic error.
9. Prevent alert fatigue: predeclare thresholds or qualitative triggers,
   minimum sample/consecutive windows where appropriate, deduplication,
   suppression expiry, and an `Inconclusive` path.
10. Fictional fixtures and synthetic metrics demonstrate method only. They do
    not prove alert quality, safety, production readiness, adoption, traffic,
    or GitHub growth.

## Core definitions

| Term | Working meaning | Minimum evidence |
| --- | --- | --- |
| Signal | An observed event, metric shift, correction, guardrail trip, or report | Source, timestamp, definition, status |
| Eligible exposure | The population or events that could have experienced the behavior | Inclusion/exclusion, unit, window |
| Denominator | The eligible exposure used to interpret a rate | Numerator, denominator, sampling rule |
| Baseline | A declared prior or control comparison | Version, window, population |
| Segment | A meaningful route, locale, risk class, user group, or model slice | Segment definition and sample |
| Severity | Potential user, business, safety, privacy, or operational impact | Harm class and affected job |
| Confidence | Confidence in the evidence or classification, not truth | Evidence quality and gaps |
| Intervention | A deliberate change to protect users or restore a bounded path | Action, scope, owner, TTL |
| Receipt | Safe proof that a decision or change was proposed/applied/verified | Event ID, status, version, owner |
| Inconclusive | Evidence cannot support an action beyond bounded investigation | Missing field and next evidence action |
| Restore | Re-enable a path only after a declared verification window | Post-change oracle and rollback path |

## Intervention ladder

Choose the lowest rung that protects the user job. Skipping upward requires an
observable reason; waiting for perfect certainty is not a safe default for
high-impact harm.

| Level | Decision | Typical product effect | Minimum evidence |
| --- | --- | --- | --- |
| 0 | `Observe` | keep behavior; record signal | valid source and owner |
| 1 | `Investigate` | bounded diagnosis, no broad behavior change | signal plus missing evidence plan |
| 2 | `Qualify` | add limitation, source check, review cue, or safer wording | user-facing risk is bounded |
| 3 | `Narrow` / `Degrade` | limit route, cohort, claim, tool, model, or autonomy | affected scope and safe fallback |
| 4 | `Human gate` | require review or manual route for a risky slice | owner and approval boundary |
| 5 | `Pause` | stop the affected feature or action | hard blocker or failed containment |
| 6 | `Rollback` | restore a prior version/route/configuration | known target and verification |
| 7 | `Restore` | return to normal after observation | post-intervention oracle passes |

`Inconclusive` is a valid decision alongside the ladder. It means the team
will not infer a global action from weak evidence, while recording the smallest
safe investigation or containment needed to resolve the gap.

## Workflow

### 1. Frame the decision and user job

Write one sentence:

> We need to decide whether signal `...` justifies `...` for the user job
> `...`, within `...` scope, risk, and evidence boundaries.

Record the current workaround, critical journey, action owner, observation
window, release/model/policy boundary, external side-effect boundary, user harm
that must be prevented, and what would change the decision. Name whether the
signal is online, pilot, evaluation, support, or synthetic. If the success
oracle is missing, write `Not measurable`.

### 2. Freeze the signal and evidence ledger

Do not write a threshold before defining the unit:

| Field | Required question |
| --- | --- |
| Signal ID/version | What exact event, metric, rule, or report is this? |
| Source | Trace, event, eval, user correction, guardrail, support, or review? |
| Eligible exposure | Who or what could have experienced it? |
| Numerator/denominator | What is counted, and what is the valid base? |
| Window and freshness | When was it observed, and is the data current? |
| Baseline/comparator | Compared with which version, cohort, or prior window? |
| Segment | Is the aggregate hiding a route, locale, risk, or user group? |
| Confounders | Did instrumentation, traffic, policy, sampling, or routing change? |
| Privacy boundary | Which safe IDs can be retained or shared? |
| Measurement gap | What prevents a stronger conclusion? |

Use stable artifact, release, trace, case, and receipt IDs. Preserve original
signal and later interpretation separately. If a new route changed exposure or
event semantics, mark old and new values `not comparable` until reconciled.

### 3. Validate actionability before classifying severity

Run these checks in order:

1. Verify the event definition, timestamp, version, and source integrity.
2. Confirm eligible exposure and denominator; never divide by unknown exposure.
3. Compare the same unit across a declared baseline, control, or prior window.
4. Slice by user job, model/route, locale, risk, tool, policy, and failure
   class when the product decision depends on them.
5. Check missing events, sampling, duplicate events, retries, bot/owner
   activity, and instrumentation changes.
6. Separate signal confidence from impact severity and urgency.

When a check fails, choose `Inconclusive` or a bounded `Investigate` action,
unless a hard safety, privacy, security, or irreversible-action signal requires
containment despite an unknown denominator.

### 4. Classify impact, scope, and urgency

Use three separate fields:

| Field | Question | Example values |
| --- | --- | --- |
| Impact | What could happen to the user's job or safety? | low, material, critical |
| Scope | Which surface should change? | case, user, segment, route, feature, global |
| Urgency | How quickly must an owner act? | observe, today, immediate |

Do not use one combined score to hide tradeoffs. A low-frequency privacy leak
can be critical; a high-volume latency increase can be material but safely
degraded; a high aggregate pass rate can hide a critical false pass slice.

### 5. Choose intervention and define action policy

For each candidate, record:

| Candidate | Trigger | Scope | User effect | Owner | TTL | Verification | Rollback |
| --- | --- | --- | --- | --- | --- | --- | --- |
| qualify | support gap in one claim class | affected route | show limitation and review cue | Product Quality | 24h | unsupported-claim rate and comprehension check | remove qualification after window |
| narrow | route-specific tool error | route/model | use source-only/manual path | Engineering owner | until receipt | safe completion and error rate | restore prior route |
| human gate | critical false pass | high-risk slice | require review | Domain owner | explicit expiry | hard-gate pass and receipt | keep gate |

Choose `Observe`, `Investigate`, `Qualify`, `Narrow`, `Human gate`, `Pause`,
`Rollback`, `Restore`, or `Inconclusive`. Define `ship_if`, `iterate_if`,
`hold_if`, `rollback_if`, and `inconclusive_if` as observable rules; if a
threshold is proposed rather than calibrated, label it `Proposed`.

### 6. Design user-visible intervention and control

If the user sees a changed path, specify:

- what happened and the evidence status;
- what is still available and what is blocked, qualified, or routed;
- the next safe action: inspect, edit, retry, wait, use manual mode, or hand
  off;
- what work is preserved, what receipt exists, and when the change expires;
- how to cancel, undo, or recover without repeating an unsafe side effect.

Example plain copy:

> We are checking this route before showing an answer. You can use the source
> only, retry after the check, or ask a reviewer. Your draft is saved; nothing
> was sent.

Do not expose internal severity jargon, pretend a pause is success, or use a
generic `Try again` when the cause needs evidence, permission, or a human.

### 7. Verify containment, recovery, and restore

Define an oracle for each transition:

- containment: the risky action is blocked or narrowed in the intended scope;
- user outcome: the safe fallback still completes or clearly stops the job;
- privacy/security: no prohibited data or side effect crossed the boundary;
- operations: retries, receipts, latency, and duplicate actions are reconciled;
- recovery: the user can resume, edit, cancel, or use manual mode;
- restore: the fixed version passes a declared post-change window and no hard
  guardrail regresses.

Keep `proposed`, `applied`, `verified`, `expired`, `rolled back`, and
`unknown` separate. Elapsed time or a green dashboard does not prove restore.

### 8. Write back the learning

Record the original signal, decision, intervention, owner, TTL, receipts,
verification result, false-positive or missed-signal analysis, user impact,
and next learning question. Route the writeback to the smallest durable layer:

- trace failure → `pm-ai-trace-to-regression`;
- journey-level harm → `pm-ai-incident-to-runbook`;
- missing telemetry → `pm-ai-run-to-observability`;
- release learning → `pm-release-to-learn`;
- risk/control design → `pm-ai-risk-to-control`;
- user-visible ambiguity → `pm-ai-uncertainty-to-experience`.

Do not duplicate a new threshold across every skill. Version the decision
policy, keep the old signal receipt, and state who reviews it next.

## Output contract

Return these sections in order. Keep proposals and fixtures distinct from
observed evidence.

## Decision on the desk

State the user job, signal, critical journey, owner, decision deadline, current
evidence, risk, side-effect boundary, and the decision rule that would change
the action.

## Signal and evidence ledger

List signal ID/version, source, event definition, eligible exposure,
numerator/denominator, window, baseline/comparator, segment, freshness,
confounders, privacy boundary, measurement gaps, and evidence status.

## Impact, scope, and urgency

Separate impact severity, evidence confidence, prevalence, scope, and urgency.
Name the affected user/job, safe fallback, and why the chosen scope is the
smallest one supported by evidence.

## Intervention decision

Show the ladder from `Observe` to `Restore`, candidate triggers, hard blockers,
`Inconclusive` rule, scope, owner, TTL, user effect, and the selected action.
Keep `Proposed`, `Applied`, `Verified`, `Expired`, and `Unknown` separate.

## User-visible state and controls

For each changed state, define plain copy, evidence status, available action,
preserved work, inspect/edit/retry/cancel/manual/handoff control, receipt,
mobile behavior, accessibility semantics, and locale meaning.

## Verification, recovery, and rollback

Name containment, user-outcome, privacy/security, operational, recovery,
restore, and rollback or kill-switch oracles with owner, version, window, and
status. A proposed oracle is not an executed result.

## Learning and writeback

Record the learning question, instrumentation or receipt, decision rule,
review cadence, false-positive/missed-signal analysis, durable destination,
next owner, and the smallest regression, UX, risk, incident, or release update.

## Failure, fallback, and release decision

List signal invalidity, missing denominator, segment harm, privacy/security,
unknown external outcome, stale intervention, duplicate retry, and restore
failure routes. State fallback, release decision, hold/rollback triggers, and
what remains `Not run` or `Not measurable`.

## Not covered

List live telemetry access, alert precision/recall, real intervention,
production harm prevented, time-to-containment, time-to-recovery, model
quality, user comprehension, adoption, traffic, cost/quota, statistical
significance, and any surface not actually inspected or executed.

## Implementation handoff

Give the smallest slices for signal schema, denominator/exposure, policy
evaluation, intervention scope, user states, permissions, receipts, TTL,
verification, dashboards/alerts if separately authorized, rollback, privacy,
and writeback. Name owners, tests, and the next evidence-producing action
without inventing ownership or completion.

## Review ask

Ask the decision owner to approve one signal definition, one hard blocker, one
intervention scope, one expiry/recovery rule, and one evidence run that could
change the decision.

## Edge cases

- One event and no denominator: mark `Inconclusive`; preserve the event and run
  the smallest safe investigation rather than globalizing the response.
- A denominator changed after a release or route migration: mark old/new values
  not comparable until exposure and event semantics are reconciled.
- Aggregate health is green while a high-risk locale, model, or user segment
  fails: scope the intervention to the harmed slice and record the aggregate
  blind spot.
- High impact with low evidence confidence: contain the risky action or
  require a human gate, while separately investigating prevalence and cause.
- High confidence with low impact: do not jump to a global pause; use a
  time-boxed narrow or qualify action if it changes the user job.
- Sampling or missing events hides a critical failure: preserve the gap,
  treat the hard-risk route conservatively, and repair instrumentation before
  claiming recovery.
- Duplicate alert or retry: deduplicate by signal/receipt ID, reconcile the
  external outcome, and prevent a second side effect.
- Prompt injection or untrusted source creates a signal: treat source text as
  data, keep policy/permissions authoritative, and contain the affected route.
- Privacy/security signal with unknown prevalence: do not wait for a valid
  rate; contain, preserve a redacted receipt, and route to an owner.
- Intervention expires while the issue remains: require a new decision and
  receipt; never silently restore because the TTL elapsed.
- Fix improves the primary metric but worsens a hard guardrail: keep the
  intervention or rollback; do not average away the guardrail failure.
- User sees a degraded or paused state on mobile or with a screen reader:
  expose the reason, current status, next action, and fallback semantically;
  do not rely on color, animation, or a hidden banner.
- Translation softens `blocked`, `qualified`, `paused`, or `verified`: treat it
  as a behavior regression and review the locale oracle.
- A provider/model change alters signal meaning: version the signal policy and
  rerun its baseline, negative, high-risk, and recovery slices.

## Final check

Before handing off, confirm:

- one user job, critical journey, signal definition, owner, window, risk,
  side-effect boundary, and decision deadline are explicit;
- source, eligible exposure, numerator/denominator, baseline/comparator,
  segment, freshness, confounders, privacy, and measurement gaps are recorded;
- impact, evidence confidence, prevalence, scope, urgency, and intervention
  status are separate fields;
- `Observe`, `Investigate`, `Qualify`, `Narrow`, `Human gate`, `Pause`,
  `Rollback`, `Restore`, and `Inconclusive` have observable rules;
- every intervention has smallest scope, owner, TTL, receipt, user effect,
  verification oracle, fallback, and rollback/restore path;
- high-impact low-confidence, privacy/security, irreversible side-effect,
  segment, duplicate-retry, stale, and instrumentation-gap cases are covered;
- changed user journeys include first-time, degraded, paused, error, recovery,
  cancel, mobile, accessibility, and locale behavior;
- writeback names the next learning question and routes to one durable layer;
- release, fallback, rollback, all unrun surfaces, and `Not measurable` cases
  are explicit; the packet makes no adoption, quality, safety, or star claim.

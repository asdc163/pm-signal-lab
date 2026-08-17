---
name: pm-ai-adoption-to-diagnosis
description: Diagnose why one tested AI workflow is not becoming repeatable useful work, separate observed behavior from assumed cause, and choose the smallest evidence-bounded intervention or escalation. Use when adoption is stalled or uneven across a real team or workflow; do not turn usage, attendance, or a single quote into an adoption, value, quality, safety, or causality claim.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Adoption to Diagnosis

Use this skill when one tested or packaged AI workflow is not becoming part of
repeatable real work and the reason is unclear. It turns one adoption gap into
an evidence-bounded primary blocker, alternative explanations, a smallest
matched action, an owner, and a signal to watch. It is a diagnosis packet, not
an adoption score, training plan, rollout, or proof of value.

## When to use

Use it when:

- a team says “adoption is low” but has not established what behavior is
  actually missing;
- people show interest, attend training, or try a workflow once but do not
  return to it in real work;
- a workflow works for a few people but does not spread to the intended group;
- repeated use is blocked by trust, review burden, workflow fit, access,
  ownership, manager reinforcement, process, support, or repeatability;
- a PM needs to choose between a clearer example, reusable asset, guided
  practice, quality criteria, access escalation, more testing, or holding
  expansion;
- the next action needs an evidence owner, a timebox, a signal, and a stop or
  escalation condition.

Use `pm-ai-workflow-to-adoption` when the main job is to plan a first limited
introduction for a tested workflow. Use `pm-ai-workflow-to-readiness` before a
workflow has a bounded test. Use `pm-ai-workflow-to-package` when the main gap
is making a tested workflow repeatable for another person. Use
`pm-ai-value-to-retention` when repeat value and natural cadence are already
the question. Use `pm-ai-value-to-investment` or `pm-ai-outcome-to-improvement`
when the main question is value or a verified outcome finding.

## Do not use

Do not use this skill to:

- declare adoption, product-market fit, business value, ROI, quality, safety,
  causality, or production readiness from usage, attendance, downloads,
  positive reactions, one quote, or one successful trace;
- rank a portfolio, choose a pre-test workflow, design a formal model
  evaluation, or decide whether a tested workflow should scale;
- create a training calendar, send a message, change permissions, modify a
  workflow, deploy, grant autonomy, or write to private analytics automatically;
- diagnose a whole organization without a defined group, workflow, current
  behavior, target behavior, and decision owner;
- replace privacy, security, legal, safety, accessibility, reliability,
  governance, or change-management review;
- expose customer data, employee identifiers, private URLs, raw traces,
  credentials, tokens, proprietary prompts, or confidential business data.

Use `Not provided`, `Not verified`, `Not run`, `Unknown`, `Need evidence`,
`Blocked`, and `Not covered` instead of filling a diagnosis gap with a plausible
story.

## Core boundary

“Adoption is low” is an observation to investigate, not a cause. Separate:

| Layer | It may establish | It cannot establish by itself |
| --- | --- | --- |
| `exposure` | a person saw, opened, attended, or was invited to something | real use, repeat use, value, or adoption |
| `first_use` | an eligible person tried the workflow once | repeat behavior or useful outcome |
| `repeat_use` | a person returned to the workflow under a definition | quality, value, or causality |
| `changed_work` | a team process or task path visibly changed | that AI caused the change or improved the outcome |
| `outcome` | a named accepted work unit passed its oracle | general adoption, causality, or scale readiness |
| `diagnosis` | a provisional blocker explains the supplied gap better than alternatives | that the intervention ran or fixed it |

Usage is a signal about activity. It is not a diagnosis. The weakest material
evidence and the most consequential unknown should control the route.

## Blocker map

Choose one primary blocker; keep alternatives visible.

| Primary blocker | Use when the evidence points to | Smallest useful next receipt |
| --- | --- | --- |
| `Workflow fit` | the workflow does not match a real job, trigger, context, or current workaround | one observed work moment and a narrower job/trigger hypothesis |
| `Trust / quality` | users do not trust output, sources, uncertainty, review burden, or correction behavior | representative review cases, rubric decisions, edits, and abstentions |
| `Access / permissions` | data, tools, connectors, approvals, or legitimate access prevent the next use | named access owner, permission receipt, and permitted fallback |
| `Ownership / reinforcement` | no accountable owner, manager reinforcement, reviewer, or decision authority exists | owner/partner receipt and one supported work moment |
| `Process / environment` | team rhythm, handoff, policy, timing, incentives, or surrounding process blocks use | current process observation and one reversible process change candidate |
| `Repeatability / packaging` | one person can use it but the steps, asset, context, support, or examples do not transfer | another eligible person follows the same bounded path |
| `Value evidence` | people may use it but the desired work progress is not visible or connected | accepted work-unit oracle, baseline, unit, period, and source |
| `Measurement gap` | behavior may be occurring but denominator, identity, source, period, or instrumentation cannot support a conclusion | smallest privacy-safe observation or manual sample |
| `No diagnosis yet` | signals conflict, the group/workflow is unclear, or the available evidence cannot distinguish causes | one disambiguating question, observation, or case review |

Do not select `Trust / quality` merely because the product is AI. Do not select
`Value evidence` merely because usage is low. Write the observed signal,
supporting source, alternative causes, and disconfirming receipt.

## Workflow

### 1. Frame one stalled behavior

Write:

> For `[group]` doing `[workflow/job]`, the expected behavior is `[target]` but
> the observed behavior is `[current]`; decide whether the primary blocker is
> `[category]` and what smallest action could change `[signal]` by `[review date]`.

Capture:

| Field | Required question |
| --- | --- |
| `workflow_id/version` | What tested or packaged workflow and version are being discussed? |
| `group` | Which users, team, role, or task slice matters now? |
| `user_job` | What work are they trying to complete, and what is the current alternative? |
| `current_behavior` | What are people doing now? Use a source and denominator when supplied. |
| `target_behavior` | What one useful behavior should begin, repeat, stop, or change? |
| `why_now` | What decision, priority, or work consequence makes this worth diagnosing now? |
| `owner` | Who can approve the next action, support the workflow, or escalate a blocker? |
| `window` | What date range, timezone, version, and observation limit apply? |

If the workflow, group, current behavior, or owner is missing, keep the route
at `No diagnosis yet` or `Hold`; do not infer them from a dashboard label.

### 2. Build the behavior and evidence ledger

For each signal, record:

| Field | Treatment |
| --- | --- |
| `signal` | literal behavior or user statement, not “adoption is low” |
| `status` | `Observed`, `Reported`, `Measured`, `Inferred`, `Proposed`, or `Unknown` |
| `unit/scope` | person, team, workflow, task, session, artifact, or period |
| `source/method` | workflow record, review, interview, issue, metric, or `Not provided` |
| `denominator` | eligible group/work units, exclusions, retries, or `Not provided` |
| `version/window` | workflow/package/source version, timezone, and dates |
| `limitation` | what the signal cannot establish |
| `next_receipt` | smallest evidence that could strengthen or falsify it |

Keep fictional, synthetic, internal, and production evidence in separate
labels. A first use can be a leading signal; it is not repeat adoption.

### 3. Classify the plausible blockers

For each blocker, use `Supported`, `Possible`, `Not supported`, `Blocked`, or
`Unknown`. Ask what the evidence would look like if that blocker were false.
Do not let the most visible symptom choose the cause.

Check at least:

1. **Fit:** Does the workflow belong in the user's real job and rhythm?
2. **Trust/quality:** Can the user inspect, correct, abstain, or escalate output
   with a reasonable review burden?
3. **Access:** Are required data, tools, permissions, approvals, and sources
   legitimately available?
4. **Ownership/reinforcement:** Is someone accountable for the work, support,
   review, and next decision?
5. **Process/environment:** Do timing, handoffs, policies, manager behavior,
   incentives, and surrounding tools support the target behavior?
6. **Repeatability/packaging:** Can another eligible person repeat the path
   with the same inputs, examples, support, and fallback?
7. **Value evidence:** Is the desired work progress observable without turning
   a proxy into a business result?
8. **Measurement:** Is there enough denominator, source, identity scope,
   period, and privacy-safe instrumentation to know what happened?

### 4. Choose one primary blocker

Select one category only when the supplied evidence supports it better than the
alternatives. Record:

- primary blocker and confidence: `Provisional`, `Moderate`, or `Strong`;
- evidence that supports it and evidence that conflicts with it;
- top two alternatives and why they are not primary yet;
- the disconfirming observation that would change the diagnosis;
- affected user/job slice, owner, and safety/privacy boundary.

If two categories remain equally plausible, choose `No diagnosis yet` and run a
tie-break observation. A diagnosis is a hypothesis for the next action, not a
label to defend after the intervention fails.

### 5. Match one smallest intervention

Choose one action that fits the blocker:

| Action | Use when | Example receipt |
| --- | --- | --- |
| `Try` | a narrow, reversible behavior change can test the diagnosis | named users complete the target behavior and record the expected signal |
| `Instrument` | behavior may be happening but the evidence layer is too weak | privacy-safe denominator, sample, or manual receipt exists |
| `Escalate` | access, ownership, policy, capacity, or process needs another authority | partner accepts the blocker and a decision date |
| `Hold` | missing evidence or control makes continued introduction premature | manual fallback and recheck trigger are preserved |
| `Stop expanding` | evidence shows unacceptable risk, burden, no legitimate owner, or no useful job | affected users have a safe alternative and stop receipt |

The action is proposed until an owner accepts the boundary. Do not prescribe
“more training” unless the evidence shows a knowledge or practice gap and a
small practice receipt can distinguish it from fit or trust.

### 6. Define the learning boundary

State the smallest action, eligible slice, owner, partner, timebox, version,
expected signal, guardrail, stop condition, fallback, and next review date.
Include a negative or abstain case when trust, quality, policy, or sensitive
work is involved. Keep `Not run` until a fresh receipt exists.

### 7. Write the next-decision packet

Separate:

- `Diagnosis: provisional` — a hypothesis from supplied evidence;
- `Intervention: proposed` — no change has run yet;
- `Behavior: not observed` — the expected signal has no fresh receipt;
- `Adoption: not measured` — repeated useful behavior is not established;
- `Outcome/value: not measured` — no accepted work or causal result is proven;
- `Production: not verified` — runtime, operations, permissions, and release
  evidence are outside this packet.

### 8. Handoff without execution

Give the owner one smallest next action, evidence to capture, source/privacy
review, fallback, and the follow-on skill. This skill is tool-free: it does
not query private analytics, call a model, change permissions, send enablement,
or modify an external system.

## Output contract

Return these sections in order and preserve missingness.

## Decision on the desk

State the owner, group, workflow/version, user/job, current behavior, target
behavior, observation window, and decision that the diagnosis should support.

## Adoption gap

Describe the exact current/target behavior gap, evidence status, denominator,
current alternative, why-now context, and what the gap does not prove.

## Evidence ledger

Use a table with signal, status, unit/scope, source/method, denominator,
version/window, limitation, and next receipt. Keep observations separate from
interpretations and hypotheses.

## Blocker map

List all nine blocker categories with status, supporting/contradicting evidence,
and the disambiguating receipt. Choose exactly one primary blocker or
`No diagnosis yet`.

## Diagnosis

State primary blocker, confidence, supporting evidence, top alternatives,
disconfirming signal, affected slice, owner, and the reason this is not yet a
causal or adoption claim.

## Smallest intervention

Choose exactly one of `Try`, `Instrument`, `Escalate`, `Hold`, or `Stop
expanding`. State action, owner/partner, eligible slice, version, timebox,
expected signal, guardrail, stop condition, fallback, and review date.

## Claim ledger

For every material claim, record literal claim, status, scope/unit, source or
method, date/version, denominator, limitation, and next receipt. Keep
`Adoption`, `Outcome/value`, and `Production` statuses separate.

## Human control and escalation

State what a person must review, approve, edit, reject, or escalate; what data
and permissions are allowed; who supports the action; and what manual route
remains available.

## Implementation handoff

Name the authorized owner, smallest next action, affected surfaces, privacy or
source review, evidence receipt, writeback location, and follow-on skill. Do
not imply that the intervention ran.

## Not covered

List unsupported adoption rate, retention, value, ROI, causality, quality,
safety, privacy, security, accessibility, localization, cost, latency,
reliability, production readiness, rollout, user identity, or GitHub traffic,
stars, and organic growth claims.

## Review ask

Ask for exactly one response: `Try`, `Instrument`, `Escalate`, `Hold`, or `Stop
expanding`. Name the unresolved evidence or risk that must be corrected before
the action changes.

## Edge cases

- **Only a usage count:** record exposure or activity only; route to `Instrument`
  or `No diagnosis yet`, not a cause.
- **Training completed but behavior unchanged:** check fit, trust, access,
  ownership, process, and repeatability before recommending more training.
- **One power user succeeds:** keep it as a slice; do not generalize to team
  adoption or value. Check packaging and transferability.
- **Users try once and stop:** compare trust/review burden, job fit, process
  timing, access, and repeatability; do not call it churn without a definition.
- **Access or permission blocker:** name the legitimate owner and fallback;
  never advise bypassing a control.
- **Conflicting qualitative and quantitative signals:** preserve both contexts,
  check denominator and window, and choose `No diagnosis yet` if unresolved.
- **High-impact or external action:** use `Hold` or `Escalate` until human
  approval, safe fallback, and a reviewable receipt exist.
- **Synthetic or fictional input:** label the entire output `fictional
  fixture`; it can exercise the packet but cannot establish real adoption,
  value, safety, or growth.
- **No safe intervention:** keep the current/manual route, state the missing
  authority or evidence, and use `Hold` or `Stop expanding`.
- **Question asks why stars or traffic are low:** keep repository metrics at
  their own evidence layer; do not diagnose product adoption from GitHub
  signals alone.

## Final check

Before handoff, confirm:

- [ ] one group, workflow/version, user/job, current behavior, target behavior, and owner are explicit;
- [ ] exposure, first use, repeat use, changed work, outcome, and diagnosis are separate;
- [ ] each signal has status, scope, source/method, denominator or an explicit missing label, and limitation;
- [ ] all nine blocker categories were considered and one primary blocker or `No diagnosis yet` is selected;
- [ ] alternatives and a disconfirming receipt are visible;
- [ ] the intervention matches the blocker and is marked proposed/not run;
- [ ] owner, partner, timebox, expected signal, guardrail, stop condition, and fallback are explicit;
- [ ] no usage, attendance, quote, fixture, or test pass is written as adoption, value, safety, or causality proof;
- [ ] human control, privacy, permissions, and escalation are visible;
- [ ] unsupported surfaces are listed under `Not covered`.

## Source notes

This skill's diagnostic framing is informed by the official OpenAI Academy
materials on [Debug AI adoption blockers](https://academy.openai.com/en/public/clubs/champions-ecqup/resources/chatgpt-adoption-playbook-from-activation-to-value-realization-2026-03-24),
the [Workflow adoption planner](https://academy.openai.com/public/clubs/champions-ecqup/resources/workflow-adoption-planner-2026-07-07),
the [Workflow evidence coach](https://academy.openai.com/public/clubs/champions-ecqup/resources/workflow-evidence-coach-2026-07-17),
and OpenAI's [AI investment guidance](https://openai.com/index/managing-ai-investments-in-agentic-era/).
These are guidance sources, not evidence that any specific workflow is
adopted, valuable, safe, or ready to scale.

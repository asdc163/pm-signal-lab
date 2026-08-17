---
name: pm-ai-value-to-retention
description: Use when a PM needs to test whether an AI product creates meaningful repeat value and decide how to handle retention, reactivation, suppression, and trust without optimizing notification clicks.
---

# PM AI Value to Retention

An AI product can be opened often and still fail the user's job. It can also
solve a one-off job perfectly and have no reason to bring the user back. This
skill helps a PM define the product's natural repeat-value loop, measure it
honestly, and decide whether re-entry support is justified.

## When to use

Use this skill when a team is asking:

- why AI users do not return after a first useful result;
- whether an AI assistant, agent, copilot, or chat-native app has meaningful
  repeat value;
- how to define retention for a recurring, seasonal, or one-off AI job;
- whether a reminder, suggestion, saved context, or reactivation route should
  be introduced after first use;
- whether quality drift, stale context, trust loss, privacy concern, cost, or
  notification fatigue is changing repeat behavior.

Use it after first value is defined, or use `pm-ai-first-use-to-activation`
first when the product cannot yet name an observable first value. Do not use
this route as a generic growth funnel or a campaign-writing tool.

Keep the output provider-neutral. It may apply to an API-backed assistant, MCP
server, Apps SDK app, local model, or a product with no live model in the test.
Name a provider, host, channel, or analytics system only when the input supplies
current evidence.

## Workflow

### 1. Start with the job's natural cadence

Write down:

- the target user, recurring or one-off job, current workaround, and desired
  outcome;
- what “done” means for one job and what makes a later job meaningfully
  different;
- the likely cadence: event-driven, daily, weekly, monthly, seasonal, or not
  expected to repeat;
- the context that may expire or change between uses;
- which value, quality, trust, privacy, cost, or permission boundaries must
  remain true for a repeat use.

If the request only says “improve retention,” mark cadence, repeat job,
retention oracle, and evidence as `Not provided`. Do not select day 1, day 7,
or day 30 by habit.

### 2. Separate the longitudinal states

Use these terms consistently. A later event can be a diagnostic without being
retained value.

| State | Meaning | Not enough on its own |
| --- | --- | --- |
| First value | A user verifies or changes a job-relevant result | a response existing |
| Repeat value | The user completes a meaningful related job again | a pageview or login |
| Retained value | Repeat value occurs within the product's natural window | a notification delivered |
| Reactivation | A user returns after a declared inactive period | a reminder clicked |
| Notification response | The user opens, clicks, or dismisses a re-entry route | a job being completed |
| Suppressed | The product does not show or send a route due to consent, mute, expiry, or policy | churn |

Retention is a hypothesis about repeated value, not a universal event. If the
job is one-off, “did not return” may be expected behavior. If it is recurring,
define the smallest completed action that demonstrates the job was useful again.

### 3. Define the retention oracle and cohort

Create a `Value to Retention Contract` with:

- the first-value start event and the repeat-value return event;
- the user, workspace, account, or other analysis unit;
- eligibility, exposure, assignment, and intervention status;
- a natural observation window, data freshness, late-arrival rule, and
  incomplete-session treatment;
- the denominator and exclusions, including users who never reached first
  value;
- the value artifact or decision changed on repeat use;
- the evidence needed to connect repeat value with quality, trust, or a later
  outcome.

Do not use login, pageview, prompt sent, model response, notification delivery,
or notification click as the retention oracle unless that event is itself the
declared user job. If the input gives an event name but not its completion
semantics, mark it `Not run` and request a direct trace or event QA.

### 4. Diagnose non-return before proposing re-entry

Classify the observed state before designing an intervention:

- **Expected one-off:** the job completed and has no natural repeat;
- **Unreached value:** first value never happened or context setup blocked it;
- **Job gap:** the product solved the wrong problem or the workaround is better;
- **Quality or trust drift:** results are wrong, unsupported, stale, slow,
  expensive, or harder to verify;
- **Context change:** prior sources, permissions, instructions, or memory are
  no longer valid;
- **Product friction:** the user has a repeat job but cannot find, start, or
  finish it;
- **Re-entry need:** the job is due and a user-permissioned reminder may be
  useful;
- **Evidence gap:** the product cannot tell which state occurred.

Do not treat every non-return as churn and do not solve an evidence gap with
more messaging.

### 5. Gate reactivation and saved context

If a re-entry route is plausible, define its eligibility and controls:

- the user job and why the route is relevant now;
- consent or permission, channel, quiet hours or equivalent, frequency cap,
  relevance expiry, and a clear mute/stop/delete control;
- what context is reused, what has expired, how it is revalidated, and how the
  user can correct or remove it;
- the manual/no-AI path and what happens when the host/provider is unavailable;
- the exposure sequence: eligible, assigned, shown, delivered, opened,
  clicked, repeat value, suppressed, and opted out;
- the holdout, staged flag, or bounded qualitative test when an intervention is
  being compared with no intervention.

The product must not imply that an AI answer is current, correct, necessary, or
human-approved because a person clicked a reminder. Re-entry should make a
known job easier to resume, not create a new obligation.

### 6. Test normal, friction, and mismatch paths

Run the smallest proportionate evidence plan:

- **Normal:** a user completes a second job in the natural cadence and can
  verify the result;
- **Friction:** a user returns after context changed, edits an output, pauses,
  mutes, or leaves; work and preferences remain recoverable;
- **Mismatch:** the job is one-off, the host/provider lacks a capability, the
  context is stale, a notification is not allowed, or an event fires at the
  wrong boundary; the user still has a safe manual route.

Use direct task observation, a small cohort, a staged flag, a holdout, or an
experiment based on risk and volume. Synthetic or agent runs can find missing
states; they do not prove retention, trust, causality, or PMF.

### 7. Decide and write back

State the cohort, observation window, owner, review date, kill switch,
rollback/reconciliation path, primary repeat-value measure, and guardrails.
Choose one decision:

- `Ship / scale`: repeat-value oracle is valid, cadence is defensible,
  instrumentation is trustworthy, UX checks pass, and guardrails are within
  bounds;
- `Pilot`: the contract and fallback are ready for a bounded non-owner test,
  but live retention is unverified;
- `Iterate`: the mechanism is plausible but cadence, context, quality, trust,
  or re-entry friction needs a named change;
- `Hold`: the denominator, event semantics, permission, privacy, or evidence is
  not trustworthy;
- `Rollback`: the loop causes spam, trust loss, data exposure, stale-context
  harm, unsafe side effects, or degraded core job success;
- `Need evidence`: the claim depends on a live cohort, provider, host, user
  outcome, or causal comparison that has not been observed.

Write the result to the product decision log, experiment registry, QA
regression list, or evaluation set. Keep public artifact release, product
retention, adoption, traffic, and GitHub stars as separate evidence layers.

## Output contract

Return a `Value to Retention Contract`. Use `Not provided`, `Not run`, or
`Need evidence` instead of filling gaps with plausible detail.

### Decision and evidence boundary

- decision and owner;
- target user, job, cadence, workaround, and desired outcome;
- first value and repeat value boundaries;
- provider/host/channel if evidenced, and out of scope;
- current evidence, confidence, and unverified claims.

### Longitudinal value contract

| State | User job and artifact | Context/data freshness | Control and fallback | Evidence |
| --- | --- | --- | --- | --- |
| First value |  |  |  |  |
| Repeat value |  |  |  |  |
| Retained value |  |  |  |  |
| No return / one-off |  |  |  |  |
| Reactivation |  |  |  |  |
| Suppressed / opted out |  |  |  |  |

### Retention hypothesis

- first-value start event and repeat-value return event;
- natural cadence and declared window;
- eligible unit, cohort, identity, denominator, and exclusions;
- exposure versus assignment versus intervention delivery;
- why the return event demonstrates job value rather than attention;
- quality, trust, freshness, privacy, cost, latency, and support guardrails;
- what would disconfirm the hypothesis or show that non-return is expected.

### Event and guardrail contract

| Event or guardrail | Trigger/completion boundary | Properties and privacy class | Source/owner | QA and status |
| --- | --- | --- | --- | --- |
| First value |  |  |  |  |
| Repeat value |  |  |  |  |
| Retained cohort |  |  |  |  |
| Eligible / assigned / exposed |  |  |  |  |
| Shown / delivered / opened / clicked |  |  |  |  |
| Suppressed / muted / opted out |  |  |  |  |
| Quality / trust / freshness |  |  |  |  |
| Privacy / cost / latency / support |  |  |  |  |

### States and behavior evidence

Cover active repeat value, no return, one-off, stale or changed context,
quality drift, reactivation, reminder shown/not sent, suppression, opt-out,
error, duplicate/unknown outcome, manual fallback, mobile, accessibility, and
trust. For each state include:

- user-visible message with no invented capability;
- control and consequence;
- preserved work, preference, receipt, or reconciliation path;
- normal, friction, and mismatch test oracle;
- `Not run` status until directly observed.

### Intervention and rollout rule

If a re-entry route is proposed, include its job reason, eligible audience,
consent, channel, frequency cap, quiet hours or equivalent, expiry, stop/mute/
delete path, stale-context check, manual route, holdout or staged rollout,
kill switch, and rollback. Then state:

```text
Ship / scale if:
Pilot if:
Iterate if:
Hold if:
Rollback if:
Need evidence if:
```

### Learning writeback

Record what changed, what repeated value was observed, what remained unknown,
whether the intervention changed the job outcome, and the next smallest test.
Name the exact writeback destination. Never report a notification click or
repository star as retained product value without the job oracle.

## Edge cases

- **One-off job:** do not call a completed one-time job churn because the user
  did not return; define a different outcome or mark repeat value not expected.
- **Login/pageview/prompt only:** keep it as a diagnostic; do not silently use
  it as retained value.
- **Notification delivered/clicked, no job:** record delivery/click as funnel
  diagnostics; the retention oracle remains unmet.
- **Context changed or expired:** show the changed boundary, revalidate or ask
  for fresh input, and never reuse stale context silently.
- **Quality drift:** compare correction, unsupported-result, complaint,
  latency, and trust signals before adding more re-entry pressure.
- **Reactivation without permission:** do not send or show the route; preserve
  the suppression choice and offer a user-initiated path.
- **Duplicate or unknown outcome:** reconcile the receipt before retrying; a
  second click is not a second value event.
- **Multiple cadences or segments:** analyze job type, role, locale, device,
  plan, host, provider, season, and workspace unit before averaging them.
- **Sparse cohorts:** use direct task observation or a bounded pilot; leave the
  denominator, window, and confidence visible.
- **Intervention changes selection:** distinguish eligible, assigned, exposed,
  delivered, opened, clicked, and repeat value; do not claim causal lift from
  an observational comparison.
- **Privacy-sensitive re-entry:** minimize profile/context properties, classify
  them, redact before export, and keep raw prompts or customer text out of
  event payloads.
- **External side effect:** route to `pm-ai-approval-to-flow` and
  `pm-ai-identity-to-boundary`; this skill does not send, publish, assign,
  delete, or change an account.

## Final check

Before returning the contract, verify:

- [ ] First value, repeat value, retained value, reactivation, notification
      response, and suppression are separate.
- [ ] The natural cadence, start/return event, window, cohort unit,
      denominator, eligibility, exposure, assignment, freshness, and evidence
      status are explicit.
- [ ] Login, pageview, prompt count, delivery, and click are not silently used
      as job-value substitutes.
- [ ] Active, no-return, one-off, stale-context, quality-drift, reactivation,
      mute/opt-out, error, recovery, manual, mobile, accessibility, and trust
      states are covered.
- [ ] Any intervention has a job reason, consent, relevance expiry, cap,
      quiet-hour or equivalent control, mute/delete path, and kill switch.
- [ ] Normal, friction, and mismatch routes preserve work and a safe exit.
- [ ] Repeat-value primary measure, quality/trust/privacy guardrails, decision
      rule, rollback, and writeback location are named.
- [ ] The final decision is `Ship / scale`, `Pilot`, `Iterate`, `Hold`,
      `Rollback`, or `Need evidence`, with the reason attached.
- [ ] No statement claims retention improvement, causality, adoption, PMF,
      production safety, or star growth without direct evidence.

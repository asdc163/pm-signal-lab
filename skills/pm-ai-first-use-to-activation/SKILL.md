---
name: pm-ai-first-use-to-activation
description: Use when a PM needs to turn an AI capability into a bounded first-use journey, meaningful value oracle, activation hypothesis, instrumentation contract, and safe learning decision.
---

# PM AI First Use to Activation

An AI capability is not activated because a user saw a welcome screen, sent a
prompt, or received a response. This skill helps a PM define the smallest
first-use path that reaches a job-relevant value moment, then decide what to
measure and what evidence is still missing.

## When to use

Use this skill when a team is launching or materially changing:

- an AI assistant, agent, copilot, chat-native app, or AI workflow;
- a first-run, connect, context-setup, sample-data, or capability-discovery
  experience;
- an activation, onboarding, repeat-use, retention, or feature-adoption
  question for an AI product;
- an AI feature that may appear in a host with different tools, UI, data, or
  permission capabilities.

Do not use it as a generic signup checklist or a replacement for these
adjacent routes:

- `pm-ai-task-boundary` for who owns a task and how much autonomy is allowed;
- `pm-ai-data-to-purpose` for the lifecycle, purpose, retention, or deletion
  of data;
- `pm-ai-output-to-interface` for choosing text, structured data, UI, or an
  action proposal;
- `pm-ai-uncertainty-to-experience` for incomplete, conflicting, delayed, or
  unsupported result states;
- `pm-experiment-to-readout` after a real experiment result exists.

Keep the output provider-neutral. A product may use an API, an MCP server, an
Apps SDK, a local model, or no live model in the first test. Name the actual
provider or host only when the input supplies current evidence.

## Workflow

### 1. Frame the job before the funnel

Write down:

- target user, job, trigger surface, and current workaround;
- what the AI capability can and cannot do in this release;
- the smallest consequence a user should be able to reach;
- eligibility conditions, required context, data/permission boundary, and
  what the user may skip or do manually;
- the external state the product must never change during first use.

If the request only says “improve onboarding” or “increase activation,” stop
and mark the user job, value oracle, and evidence as `Not provided`. Do not
invent an Aha moment.

### 2. Define first value as an observable job result

Separate the stages below. A stage may be a prerequisite, but it is not proof
of value by itself.

| Stage | Meaning | What it must not be mistaken for |
| --- | --- | --- |
| Eligible | The user and surface may use the capability | acquisition or intent |
| Exposed | The user actually reached the capability | assignment or consent |
| Context ready | Required context was supplied or safely skipped | a useful answer |
| First value | The user can verify, accept, edit, or act on a job-relevant result | a response existing |
| Repeat value | The same or a related job succeeds again in a declared window | retention or PMF |
| Activated | A product-specific hypothesis combines meaningful value signals | a universal benchmark |

Define a first-value oracle that another person could observe without guessing.
It should name the user action, the job artifact or decision changed, the
minimum evidence attached, and the safe exit if the result is not useful. If
the first value cannot be observed, the decision is `Need evidence`.

Create two to five activation candidates only when the product has enough
instrumentation to compare them. A candidate may be one completed event or a
small sequence within a natural window. Do not choose a candidate because it
is easy to count. Test whether it relates to meaningful repeat value or a
declared downstream outcome, while keeping correlation separate from causation.

### 3. Map the first-use path and its recovery states

Use this order, then remove steps that do not help the job:

1. **Discover:** what the user sees, asks, or receives as a relevant entry
   point; what the capability is for in one plain sentence.
2. **Confirm fit:** who is eligible, what is unavailable, and what the user
   can do without connecting a provider or granting a permission.
3. **Prepare context:** the minimum input, source, or preference needed; show
   purpose and data scope before collection or connector use.
4. **Reach first value:** the job artifact, decision, or changed state that
   proves value; let the user inspect and correct it.
5. **Recover or leave:** preserve work through missing context, delay, error,
   host mismatch, permission refusal, duplicate retry, and manual fallback.
6. **Repeat or stop:** state what a second meaningful use would be and allow
   the user to stop without being trapped in setup.

For every step, record the user-visible message, control, preserved work,
receipt or event, and release consequence. Loading copy must describe a real
state such as “Checking the selected source” rather than pretend that the AI
is thinking.

### 4. Build an instrumentation and guardrail contract

Start from the learning question, not from the analytics tool. At minimum,
define:

- `eligibility` and `exposure`, including the unit and source surface;
- `context_ready`, with completion semantics and any safe sample route;
- `first_value_completed`, with the observable job oracle;
- `correction`, `manual_route`, `skip`, `error`, `timeout`, and `retry`;
- one or more repeat-value candidates with a declared window;
- guardrails for trust/comprehension, privacy/permission, quality, cost,
  latency, support burden, and external side effects where relevant.

For each event specify `event_name`, `user_or_group_id`, timestamp, product
version or variant, source surface, locale/device/plan when needed, privacy
classification, and the completion boundary. Prefer an event when the job
actually completes over an event when a button is clicked. If client events
can be blocked or duplicated, record the gap and use a server or receipt
source only when the product can do so lawfully and safely.

Keep exposure separate from assignment, and do not include raw prompts,
customer text, secrets, tokens, private URLs, or unnecessary context in
analytics properties. If the denominator, identity, or event semantics are
unclear, the measurement decision is `Hold` or `Need evidence`.

### 5. Test the normal, friction, and mismatch routes

Before asking for a broad rollout, run the smallest proportionate test:

- **Normal:** an eligible user reaches first value with the minimum context.
- **Friction:** the user skips, supplies partial context, corrects a result,
  waits, or returns later; work and meaning remain recoverable.
- **Mismatch:** the host/provider lacks a capability, a permission is refused,
  the result is unsupported, or instrumentation fires at the wrong boundary;
  the manual or text route remains usable.

Use a prototype, concierge run, beta cohort, staged flag, or experiment based
on risk and traffic. Low traffic is not a reason to manufacture a percentage.
Agent or synthetic runs can expose missing states, but they are hypothesis
inputs, not real-user activation, retention, comprehension, or PMF evidence.

### 6. Set rollout, decision, and writeback rules

State the smallest audience, observation window, owner, kill switch, rollback
route, and review date. Choose one decision:

- `Ship / scale`: first-value oracle is valid, instrumentation is trustworthy,
  UX checks pass, and guardrails are within bounds;
- `Pilot`: the contract is ready for a bounded non-owner test, but live
  behavior or adoption is not established;
- `Iterate`: the mechanism is plausible but a named friction or missing state
  blocks stronger evidence;
- `Hold`: the denominator, eligibility, data/permission boundary, or evidence
  is not trustworthy;
- `Rollback`: trust, privacy, safety, core job success, cost, or external
  state is harmed;
- `Need evidence`: a claim depends on a live provider, host, user, or product
  outcome that has not been observed.

Write the learning question, evidence, interpretation, and next action back
to the product decision log, analytics plan, QA regression list, or evaluation
set. Do not write owner-run clone counts or a GitHub star count as product
activation evidence.

## Output contract

Return a `First-Use to Activation Contract` with these sections. Use
`Not provided`, `Not run`, or `Need evidence` instead of filling gaps with
plausible detail.

### Decision and evidence boundary

- decision and decision owner;
- target user, job, trigger, workaround, and desired outcome;
- capability boundary, provider/host if evidenced, and out of scope;
- current evidence, confidence, and unverified claims.

### First-use contract

| Stage | User job and copy | Required input/data/permission | User control and fallback | Evidence |
| --- | --- | --- | --- | --- |
| Discover |  |  |  |  |
| Confirm fit |  |  |  |  |
| Prepare context |  |  |  |  |
| First value |  |  |  |  |
| Recover / leave |  |  |  |  |
| Repeat value |  |  |  |  |

### Activation hypothesis

- first-value oracle: observable action, artifact/decision, source or receipt,
  and safe exit;
- candidate events and natural window;
- eligibility, exposure, assignment, identity/group unit, and denominator;
- why this is a value hypothesis rather than a setup metric;
- evidence needed to relate it to repeat value or a downstream outcome;
- what would disconfirm it.

### Instrumentation and guardrails

| Event or guardrail | Trigger/completion boundary | Properties and privacy class | Source/owner | QA and status |
| --- | --- | --- | --- | --- |
| Eligibility |  |  |  |  |
| Exposure |  |  |  |  |
| First value |  |  |  |  |
| Correction / manual route |  |  |  |  |
| Error / timeout / retry |  |  |  |  |
| Repeat value |  |  |  |  |
| Trust / privacy / quality / cost guardrail |  |  |  |  |

### States and behavior evidence

Cover first-time, empty, loading, partial, permission/data disclosure,
unsupported provider or host, error, timeout, retry, skip/later, mobile,
accessibility, and manual fallback. For each state include:

- user-visible message with no invented capability;
- control and consequence;
- preserved work, receipt, or reconciliation path;
- normal, friction, and mismatch test oracle;
- `Not run` status until directly observed.

### Rollout and decision rule

Include audience/cohort, test type, exposure window, owner, review date,
feature flag or kill switch if available, rollback/reconciliation path,
primary value measure, guardrails, and these conditions:

```text
Ship / scale if:
Pilot if:
Iterate if:
Hold if:
Rollback if:
Need evidence if:
```

### Learning writeback

Record what changed, what was learned, what remains unknown, the next smallest
test, and the exact destination for the writeback. Separate a public artifact
release from product adoption, retention, safety, and star evidence.

## Edge cases

- **Setup completed, no value:** keep setup as a prerequisite event; do not
  count activation until the first-value oracle passes.
- **Model response exists but is not usable:** record `response_received` as a
  diagnostic only; require user verification, correction, or a manual route.
- **First value is wrong or unsupported:** preserve input, show the limitation,
  capture the correction/manual path, and hold any quality claim.
- **Permission or connector refused:** explain what cannot happen, do not
  silently use another source, and leave a safe no-connector route.
- **Host/provider mismatch:** progressive enhancement may add a richer UI, but
  the core job must have a labelled text or manual fallback where possible.
- **Duplicate retry or unknown outcome:** reconcile the receipt before a
  second request; never use a retry as evidence of a second value.
- **Multiple activation candidates:** compare candidates against a declared
  meaningful repeat or outcome signal; do not pick the highest rate after
  looking at results without recording the selection rule.
- **Low traffic or sparse data:** prefer direct task observation, a small beta,
  and qualitative notes. Leave the denominator and confidence visible.
- **Segment disagreement:** inspect device, locale, plan, user role, source,
  and host slices before averaging away a harmful experience.
- **Privacy-sensitive analytics:** minimize properties, classify them, redact
  before export, and keep raw content out of event payloads.
- **External side effect appears in the first-use request:** route to
  `pm-ai-approval-to-flow` and `pm-ai-identity-to-boundary`; this skill does
  not authorize sending, publishing, assigning, deleting, or changing an
  account.

## Final check

Before returning the contract, verify:

- [ ] The user job and first-value oracle are observable, not a slogan.
- [ ] Eligible, exposed, context-ready, first-value, repeat-value, and
      activated are separate states.
- [ ] Setup completion, response existence, and user outcome are not merged.
- [ ] Event names, completion boundaries, denominators, identity, privacy,
      QA method, and evidence status are explicit.
- [ ] First-time, empty, loading, partial, permission, mismatch, error,
      recovery, skip/later, mobile, accessibility, and trust states are covered.
- [ ] Normal, friction, and mismatch routes preserve work and a safe exit.
- [ ] A prototype, beta, flag, experiment, or qualitative test is chosen for
      the actual risk and traffic; no universal benchmark is invented.
- [ ] Primary value measure, guardrails, decision rule, kill switch, rollback,
      and writeback location are named.
- [ ] Provider/host compatibility and any external side effect are either
      evidenced or marked `Need evidence`.
- [ ] The final decision is `Ship / scale`, `Pilot`, `Iterate`, `Hold`,
      `Rollback`, or `Need evidence`, with the reason attached.

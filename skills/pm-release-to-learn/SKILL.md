---
name: pm-release-to-learn
description: Turn a verified product or skill release into a bounded rollout-and-learning plan with audience, exposure, observation window, success and guardrail signals, rollback trigger, feedback capture, and a next decision. Use after release proof exists and before or during a pilot when a PM needs to learn without turning traffic or stars into adoption claims.
compatibility: No tools, network access, model provider, or external write required.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM Release to Learn

Use this skill after a product slice, skill package, documentation release, or
AI configuration change has current proof that a reader can inspect. It turns
the release into a bounded rollout and learning loop: who sees it, what they
can try, what will be observed, what must not worsen, when to stop or roll
back, and where the learning will change the next decision.

The output is an operating plan. It is not a claim that the release is
adopted, successful, production-ready, or close to a growth target.

## When to use

Use it for:

- a verified product or skill release moving into a public preview or pilot;
- a staged rollout that needs a cohort, exposure boundary, and observation
  window;
- an AI model, prompt, provider, or configuration change with an approved
  evaluation and a monitored fallback;
- a documentation or developer-tool release where first use and reproducible
  feedback matter more than a vanity reaction;
- a release owner who needs one next decision after a bounded observation.

Do not use it to:

- plan a rollout when the artifact, version, release proof, or rollback path is
  not inspectable; return `Need evidence`;
- call traffic, page views, downloads, stars, or forks adoption without a
  defined method, eligible population, and outcome measure;
- forecast growth, promise a star count, manufacture a testimonial, or turn an
  owner-written pilot comment into external usage evidence;
- publish posts, create flags, change permissions, send messages, alter a
  database, or perform a rollback automatically;
- replace an experiment readout, metric contract, AI evaluation plan, or
  incident response when that specialized evidence is missing.

## Guardrails

- Freeze the release identity: artifact, version, commit or tag, canonical
  URL, environment, date, and current verification. Stale proof does not prove
  the current rollout.
- Keep release proof, rollout exposure, participant/session evidence, adoption,
  retention, channel performance, and star causality as separate evidence
  layers.
- Name one rollout stage at a time. Public preview, pilot, and production are
  different states; do not carry evidence from one state into another.
- Every learning signal needs a unit or observation rule, eligible exposure,
  window, source, owner, and status. If it is proposed or manual, say so.
- A learning signal is not automatically a success claim. A traffic increase
  can be a diagnostic or exposure count, not adoption or value.
- Define guardrails before the observation begins. Privacy leakage, unsafe AI
  output, stale assets, broken first action, trust misread, accessibility
  failure, cost, latency, and recovery failure can all trigger a hold or
  rollback.
- A rollback trigger must name the version to restore, owner, scope, and
  confirmation check. A written rollback action is not evidence that rollback
  has been tested.
- For AI changes, keep model/provider/version, prompt or config boundary,
  evaluation slices, fallback, human review, cost/latency, and regression
  evidence visible.
- Minimize feedback capture. Never request names, private tickets, raw prompts,
  credentials, tokens, confidential roadmap content, or sensitive customer
  material in a public note.
- The skill produces a reviewable plan only. It does not post, reply, DM,
  star, follow, open issues, mutate GitHub, alter analytics, or invoke a
  provider.

## Workflow

### 1. Freeze the release frame

Record the artifact, version, commit/tag, canonical path, environment, release
date, verification layers, owner, known limitations, and rollback candidate. If
the release proof is missing or stale, return `Need evidence`.

### 2. Define the rollout boundary

Choose one stage: `maintainer`, `internal`, `public preview`, `pilot`, or
`production`. State the intended audience, eligibility, exposure path,
prerequisite, first action, expected artifact, and what remains out of scope.
Keep the next stage deferred until its gate is met.

### 3. Set the observation window

Define when observation starts, the timebox or session length, completion or
exit condition, version boundary, and environment. If there is no telemetry,
choose a safe manual or fixture-based capture and label it `Proposed`.

### 4. Choose one learning question

Write the question that could change the next release decision. Choose one
primary learning signal, not a dashboard of convenient counts. State its unit,
eligible exposure, observation rule, source, owner, and status. Link to
`pm-outcome-to-metric` when the outcome or denominator needs design.

### 5. Define guardrails and monitors

List only the conditions that can change the rollout. Include release health,
trust, privacy, safety, accessibility, recovery, cost, latency, and AI fallback
checks when relevant. For each one, state the observation, threshold status,
owner, and failure action.

### 6. Pre-commit stop and rollback

State the proposed or supplied rule for `Continue`, `Revise`, `Hold`,
`Rollback`, or `Need evidence`. Name the rollback version, blast radius,
permission, confirmation check, and communication boundary. A release can be
verified and still be held from the next stage.

### 7. Capture safe feedback

Ask for one privacy-safe observation: context/version, first action, mismatch,
hesitation, recovery moment, limitation, or improvement. Keep feedback separate
from a testimonial, adoption result, and star request. Record the source ID or
session code without identity.

### 8. Write back the learning

Record what the observation supports, what it does not prove, the decision,
the unresolved risk, the next smallest question, and the artifact or issue
where an authorized owner will write it back. Route a measured result to
`pm-experiment-to-readout`, a concrete mismatch to `pm-feedback-to-fix`, and a
new build boundary to `pm-decision-to-spec`.

### 9. Review the stage transition

End with one decision: `Continue`, `Revise`, `Hold`, `Rollback`, or
`Need evidence`. The human owner must review the source truth, stage, links,
guardrails, privacy boundary, and rollback before changing exposure.

## Output contract

Return the following sections in this order. Keep unsupported fields explicitly
`Not provided`, `Unknown`, `Not measured`, `Not run`, `Proposed`, or `Not covered`.

## Release on the desk

State the artifact, version, commit/tag, canonical URL, environment, release
owner, current proof, known limitation, and decision on the next stage.

## Evidence boundary

List release proof, rollout exposure, participant/session evidence, metrics,
feedback, adoption, channel performance, and star causality separately. State
what each source supports and does not prove.

## Rollout boundary

State the current stage, target audience, eligibility, exposure path,
prerequisite, first action, expected artifact, next-stage gate, and deferred
stages.

## Observation plan

State the learning question, primary learning signal, unit or observation rule,
eligible exposure, observation window, version/environment boundary, source,
owner, and status.

## Guardrails and rollback

List release-health, trust, privacy, safety, accessibility, recovery, cost,
latency, or AI fallback guardrails that apply. For each, state the threshold
status, failure action, rollback version, blast radius, confirmation check, and
human permission boundary.

## Feedback capture

Define the privacy-safe fields, source/session ID, feedback route, redactions,
and what must not be requested. Make clear that feedback is not a testimonial,
adoption result, or star exchange.

## Decision and learning writeback

State the proposed or supplied stage decision, what the observation supports,
what remains unknown, the unresolved risk, next smallest question, owner, and
writeback location.

## Not covered

List unsupported audience size, traffic, activation, adoption, retention,
business impact, star causality, model quality, versions, environments,
accessibility, localization, cost, safety, or rollback execution.

## Implementation handoff

Give the authorized owner the smallest next action, affected release surface,
observation or QA evidence to collect, privacy review, rollback check, and
follow-on skill. A plan does not prove a rollout or rollback happened.

## Review ask

Ask for exactly one decision: `Continue`, `Revise`, `Hold`, `Rollback`, or
`Need evidence`. Name the claim, stage, or rollback risk that needs review.

## Edge cases

- **Docs-only or skill release:** use first-use and reproducibility as the
  observation, label examples as fictional, and do not imply runtime adoption.
- **Failed or rolled-back release:** record the failure and recovery only when
  the public evidence is current; otherwise choose `Hold` or `Need evidence`.
- **No rollback candidate:** do not enter a wider stage; define the recovery
  owner and safe hold path first.
- **No telemetry:** use a bounded manual session receipt or fixture check and
  mark the signal `Proposed`; never write an invented rate.
- **No participants:** keep the plan ready, but do not call the pilot active,
  validated, or adopted.
- **Traffic spike:** record exposure as a signal and investigate its source;
  do not call it value, activation, or retention.
- **AI model/provider/config change:** require regression slices, fallback,
  human review, latency/cost status, and a rollback version before widening.
- **Guardrail failure with primary signal improvement:** `Hold`, `Revise`, or
  `Rollback` according to the pre-committed rule; do not average the failure
  away.
- **Sensitive feedback:** redact raw content, keep only safe context and a
  source/session code, and use the approved private route for details.
- **Multiple channels or audiences:** choose one stage and one primary path;
  defer variants until their proof and learning question are separate.
- **Synthetic or fictional rollout:** label the entire output as a `fictional fixture`;
  it can test the plan but cannot support a rollout, adoption, or growth claim.
- **Stale canonical link:** stop the stage and re-freeze source truth before
  sharing or changing exposure.

## Final check

Before changing a rollout stage, confirm that:

- release identity and current proof are frozen;
- preview, pilot, and production states are not conflated;
- the stage has one audience, eligibility rule, first action, and next gate;
- the learning question has one primary signal, unit, exposure, window, source,
  owner, and status;
- guardrails, privacy, AI fallback, and rollback trigger are visible;
- rollback version, scope, permission, and confirmation check are named;
- feedback is sanitized and not requested as a testimonial or star exchange;
- no traffic, metric, adoption, model-quality, or growth claim was added from
  guesswork;
- the output ends with `Not covered` and one review decision.

For a worked, fictional release learning plan, read
`references/support-review-release-learning.md`.

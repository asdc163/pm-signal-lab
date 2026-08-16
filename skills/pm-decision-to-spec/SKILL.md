---
name: pm-decision-to-spec
description: Turn an evidence-backed product decision into a bounded Product Decision Packet with scope, UX states, acceptance criteria, measurement, rollout, and implementation handoff. Use when a PM needs to move from a decision or readout to a reviewable build slice without inventing evidence.
compatibility: No tools, network access, model provider, or external write required.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM Decision to Spec

Use this skill after a PM has a decision, experiment readout, evaluation plan,
trend review, or feedback packet and needs to make the next build slice clear
to design, engineering, and QA. It creates a bounded handoff. It does not
generate code or turn an untested idea into a commitment.

## When to use

Use it when the input contains a decision or an explicit decision candidate,
some evidence, and a user job that needs a product change or test.

Good inputs include:

- a readout with a `Ship`, `Iterate`, or `Test` decision;
- an evaluation plan with a defined release gate;
- a source-linked product decision with a smallest test;
- a feedback packet that has a reproducible problem and proposed direction.

Do not use it when the only input is a broad idea, a competitor screenshot, a
vendor promise, or an unverified request. Route those inputs to discovery,
source review, or evidence collection first.

## Guardrails

- Preserve the original decision and its confidence. Do not silently widen a
  `Test` into a full launch or a `Hold` into a build commitment.
- Separate observed evidence, reported evidence, inference, proposal, and
  decision. Keep source IDs, versions, and evidence locations visible.
- Never invent a baseline, target, sample, user research result, benchmark,
  model quality claim, adoption result, or business impact. Use `Not provided`,
  `Unknown`, or `Not measured`.
- Define `Must-have`, `Nice-to-have`, and `Should-not-build` separately. A
  plausible extra is still out of scope until the decision supports it.
- Treat UX states as acceptance scope: first-time, empty, loading, error,
  recovery, mobile, accessibility, and trust or permission states when they
  apply.
- For AI behavior, keep provenance, uncertainty, human review, fallback,
  cost/latency, and rollback visible. A model output is not a product result.
- Do not create tickets, edit code, change a schema, publish a release, or
  call a provider. The packet is an authorized-owner handoff.
- An acceptance criterion is not passed until someone runs it and records the
  evidence. A written plan is not a runtime verification.

## Workflow

### 1. Frame the decision

Write the decision, decision owner, user job, current workaround, and the
smallest outcome that would change the decision. Name whether the current
direction is `Ship`, `Test`, `Iterate`, `Hold`, `Need evidence`, or `Reject`.

### 2. Register the evidence

List each source, method, scope, recency, confidence, and limitation. For every
important claim, state what decision it supports and what it cannot support.
If sources disagree, keep the segments or contexts separate.

### 3. Define the product boundary

Describe the target user and context, the current workaround, the proposed
mechanism, dependencies, and the smallest release boundary. Name the
alternative of doing nothing and the opportunity cost of this slice.

### 4. Set the scope

Write `Must-have`, `Nice-to-have`, and `Should-not-build`. Every must-have needs
an acceptance check. Every nice-to-have needs a reason to remain deferred.

### 5. Map the UX flow and states

Describe the normal path plus first-time, empty, loading, error, recovery,
mobile, accessibility, and trust or permission states that apply. State what a
person sees, can do, and can undo at each important transition.

### 6. Define acceptance criteria

Turn the scope into observable checks. Include source/provenance, permissions,
privacy, validation, regression, and high-impact fallback checks when relevant.
Mark them `Not run` until fresh evidence exists.

### 7. Define measurement and guardrails

State the learning question, primary outcome, baseline, target, time window,
exposure boundary, qualitative evidence, behavioral QA, guardrails, and
instrumentation status. If the product is too early for reliable measurement,
choose a smaller qualitative or fixture-based validation and say why.

### 8. Define rollout and rollback

State the smallest rollout, owner, review date, kill switch or rollback action,
and the condition for `Ship`, `Iterate`, `Hold`, or `Rollback`. Keep public
preview, pilot, and production states separate.

### 9. Hand off and write back

Give design, engineering, and QA one reviewable packet. Record the next
learning question and the writeback location so the next session does not have
to reconstruct why the decision was made.

## Common rationalizations

- **"The readout already passed, so the spec can be broad."** A result supports
  only the decision boundary that was tested. Keep the slice bounded.
- **"The missing baseline is easy to estimate."** An estimate is a proposal,
  not a baseline. Mark it and define how to collect it.
- **"The happy path is enough for this small change."** Small changes still
  need the relevant error and recovery states.
- **"The provider will handle the AI edge cases."** Provider behavior is a
  dependency. Keep fallback, human review, and release criteria in the packet.
- **"We can add the guardrails after launch."** If the guardrail changes the
  decision, it belongs before the release gate.

## Red flags

- The scope contains a feature list but no user job or decision.
- The packet uses a percentage, benchmark, or quality adjective with no source.
- `Nice-to-have` items have become the actual build order.
- Acceptance criteria describe intentions instead of observable behavior.
- `Not covered` is missing, or the same evidence is used for both proof and
  adoption claims.
- The rollout has no owner, review date, fallback, or rollback trigger.

## Output contract

Return the following sections in this order. Keep unsupported fields explicitly
`Not provided`, `Unknown`, `Not measured`, `Not run`, or `Not covered`.

## Decision on the desk

State the decision, current status, owner, user job, workaround, and what would
change the decision.

## User job and context

Describe the target segment, situation, trigger, desired progress, alternative,
and the cost of doing nothing.

## Evidence boundary

List sources, methods, scope, confidence, observed facts, inferences, proposed
hypotheses, decision supported, decision not supported, and missing evidence.

## Scope and should-not-build

List `Must-have`, `Nice-to-have`, dependencies, assumptions, and
`Should-not-build`. Keep the smallest release boundary explicit.

## UX flow and states

Describe the normal flow and applicable first-time, empty, loading, error,
recovery, mobile, accessibility, trust, and permission states.

## Acceptance criteria

List observable checks with an evidence status. Include source mapping,
validation, privacy, regression, and fallback checks when relevant.

## Measurement and guardrails

State the learning question, primary outcome, baseline, target, time window,
exposure, qualitative evidence, behavioral QA, instrumentation status, and
guardrails. Do not convert a proposal into a measured result.

## Risks, rollout, and rollback

State risks, owner, rollout boundary, review date, release gate, rollback
trigger, rollback action, and the decision if evidence is inconclusive.

## Not covered

List unsupported segments, versions, environments, measurements, adoption,
quality, safety, cost, accessibility, localization, or business outcomes.

## Implementation handoff

Give design, engineering, and QA the smallest next action, affected surfaces,
acceptance evidence to collect, writeback location, and one review decision.

## Edge cases

- **Decision is `Hold` or `Need evidence`:** produce a validation packet, not a
  build plan. Keep implementation scope empty or explicitly deferred.
- **Conflicting readout and feedback:** preserve both sources, segment by
  context, and set the decision to `Hold` or `Need evidence` when the conflict
  affects the release gate.
- **No baseline or target:** define a measurement proposal and mark the
  decision unsupported until the owner accepts the method.
- **High-impact or irreversible action:** require human approval, a narrow
  rollout, a visible confirmation, and a tested rollback path.
- **AI provider or model change:** record model/version/config boundary,
  evaluation slices, fallback, latency/cost status, and regression evidence.
- **Mobile or accessibility impact:** add viewport, keyboard, focus, semantic,
  assistive-technology, and recovery checks that match the surface.
- **Localization impact:** keep locale, date, number, text expansion, and
  untranslated-state checks in `Not covered` or acceptance criteria.
- **Public preview versus production:** identify the exact environment and do
  not carry preview evidence into a production claim.
- **Feature request without a confirmed problem:** route to discovery and keep
  the proposed change out of `Must-have`.

## Final check

Before handoff, confirm that the packet preserves the decision boundary,
contains a concrete user job, separates evidence from proposals, has explicit
scope and states, names observable acceptance checks, defines measurement and
guardrails, includes rollback, and ends with `Not covered` plus one review
decision. If those conditions cannot be met, return `Need evidence` instead of
a polished but unsupported specification.

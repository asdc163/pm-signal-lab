---
name: pm-feedback-to-fix
description: Turn a de-identified product observation into a bounded reproduction path, smallest fix or experiment, acceptance checks, release and rollback notes, and a learning writeback. Use when a PM or maintainer needs to move from session feedback to an evidence-safe action.
compatibility: No tools, network access, model provider, or external write required.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM Feedback to Fix

Use this skill after a pilot, usability session, issue report, support note, or
maintainer observation. It keeps what a person observed separate from what the
team thinks it means, then turns the smallest useful part into a reviewable
change or test.

## When to use

Use it when the input contains at least one concrete observation, expectation,
or mismatch and the team needs to decide what to do next.

Useful inputs include:

- a sanitized session note with the expected and actual path;
- a public issue or comment with a reproducible symptom;
- a reviewer's mismatch, hesitation, trust concern, or recovery failure;
- a maintainer observation after a release or example update.

Do not use it to manufacture a testimonial, infer adoption from one comment,
assign an unsupported severity, or turn a vague feature request into an
approved roadmap item.

## Guardrails

- Keep observation, interpretation, request, and decision separate.
- Preserve a source ID, issue number, session code, or other provenance when
  one exists. If it does not exist, label the evidence as unlinked.
- Remove names, customer data, credentials, tokens, private URLs, and raw
  sensitive content before processing. Never ask for a secret to reproduce a
  problem.
- Treat one session or one maintainer note as a signal, not a rate, trend,
  adoption result, or user testimonial.
- Do not assign severity, frequency, or business impact without evidence. Use
  `unknown`, `not measured`, or a bounded hypothesis.
- A proposed fix is not a verified fix. State the reproduction and acceptance
  check before claiming that a change works.
- Keep high-impact, security, privacy, payment, medical, legal, or irreversible
  actions in human review. Default to hold when the evidence or rollback path
  is unclear.
- Do not create issues, edit code, publish releases, reply to users, or call a
  provider from this skill. The output is a handoff for an authorized owner.

## Workflow

### 1. Frame the decision

State the decision on the desk, the affected user job, the current workaround,
and what would change the decision. If the only input is a preference, say so.

### 2. Record the observation

Capture the source and context, then write four separate lines:

1. expected behavior or user job;
2. observed behavior or quote fragment, safely paraphrased if needed;
3. actual impact or hesitation;
4. requested change, if the person made one.

Do not merge the request with the evidence. A request can be useful without
being the correct fix.

### 3. Bound the evidence

List source IDs, client or product version, environment, frequency, segment,
and what is missing. Mark each item as observed, reported, inferred, proposed,
or not measured. Keep conflicting reports visible rather than averaging them.

### 4. Classify the smallest problem

Choose the narrowest useful class: reproduction bug, comprehension, trust or
provenance, recovery, accessibility or mobile, missing capability, workflow
fit, or insufficient evidence. Explain why the class is provisional when it is.

### 5. Write a reproduction or verification path

Give the smallest safe starting state, numbered actions, expected result, actual
result, and a recovery or backtracking path. If reproduction is not possible,
write the next observation to collect instead of inventing steps.

### 6. Choose a smallest fix or experiment

Prefer one copy, state, example, documentation, or narrow code change that can
be reviewed in isolation. State the hypothesis, owner, dependencies, downside,
and what would make the team stop or revise it.

### 7. Define acceptance and release handling

Turn the proposal into observable checks. Include normal, mismatch, recovery,
mobile or accessibility checks when relevant. State the release gate, rollback
trigger, and where the result will be recorded. Do not mark a check passed until
someone runs it.

### 8. Write back the learning

Record what this observation supports, what it does not support, the next
question, and the smallest follow-up. The learning note must remain useful if
the proposed fix is rejected.

### 9. Hand off for review

Ask for a single decision: `Ship`, `Test`, `Hold`, `Need evidence`, or
`Reject`. Include the exact evidence and the one unresolved risk that should
stay visible.

## Output contract

Return the following sections in this order. Keep unsupported fields explicitly
`Not provided`, `Unknown`, `Not measured`, or `Not covered`.

## Decision on the desk

State the decision, user job, current workaround, success condition, and
decision owner.

## Observation record

Include source/provenance, context, expected, observed, impact, request, and
the provisional problem class.

## Evidence boundary

Separate observed facts, reported facts, inferences, proposed hypotheses,
missing context, privacy handling, and confidence.

## Reproduction or verification path

List the safe starting state, steps, expected result, actual result, recovery,
and the next evidence to collect if reproduction is blocked.

## Smallest fix or experiment

Name the smallest change, hypothesis, owner, dependencies, downside, and stop
or revise condition.

## Acceptance checks

List observable checks, including the relevant normal, mismatch, recovery,
mobile, accessibility, privacy, and regression checks. Mark each as `Not run`
until it has evidence.

## Release and rollback

State the release gate, reviewer, rollout boundary, rollback trigger, and
rollback action. Keep public, pilot, and production states separate.

## Learning writeback

Record the decision, what the observation supports, what remains unknown, and
the next smallest question or follow-up.

## Not covered

List user segments, versions, environments, severity, frequency, adoption,
quality, safety, or business outcomes that were not evidenced.

## Review ask

Ask for one decision: `Ship`, `Test`, `Hold`, `Need evidence`, or `Reject`, and
name the unresolved risk.

## Edge cases

- **Vague feedback:** keep the request, mark the observation unconfirmed, and
  propose one short clarifying question or session replay path.
- **No reproduction:** do not call it a bug; define the smallest safe capture
  that could distinguish bug, comprehension, and workflow fit.
- **Conflicting reports:** retain the segment, version, and context for each
  report; do not collapse them into an average.
- **Feature request presented as failure:** record the requested outcome and
  test whether the current job is actually blocked.
- **One-off severe failure:** hold the affected path and escalate for human
  review even when frequency is unknown.
- **Sensitive or security-related report:** redact the input, minimize the
  reproduction, and route through the approved private channel; do not paste
  secrets into the output.
- **Already-fixed claim:** require the changed version and fresh acceptance
  evidence. Historical fixes do not prove the current state.
- **Provider or model change:** keep model/version, prompt/config boundary,
  fallback, and regression slice visible; do not generalize from one output.

## Final check

Before handoff, confirm that the output preserves provenance, separates facts
from hypotheses, names what is not covered, keeps privacy and high-impact risks
visible, and ends with one smallest review decision. If no safe action can be
defined, return `Need evidence` rather than a polished but unsupported fix.

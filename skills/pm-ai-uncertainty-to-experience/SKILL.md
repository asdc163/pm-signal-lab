---
name: pm-ai-uncertainty-to-experience
description: Turn AI uncertainty, ambiguity, partial evidence, delay, conflict, or failure into a user-visible experience contract with honest progress, provenance, controls, clarification, recovery, accessibility, trust evaluation, fallback, and release evidence. Use when an AI feature needs to show what is known, unknown, blocked, or ready for a human decision without treating model confidence as truth.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Uncertainty to Experience

Use this skill when a PM must decide what a person should see and be able to do
when an AI result is incomplete, ambiguous, delayed, contradictory,
unsupported, or unsafe to act on. It produces a state-and-recovery contract,
not a UI mockup, model verdict, confidence benchmark, or provider choice.

The core move is to keep four questions separate:

1. What did the system observe or complete?
2. What evidence is sufficient to support the next product action?
3. What can the person inspect, change, approve, cancel, or recover?
4. What has actually been tested with users or live data?

If the answer to any question is unknown, write `Not provided`, `Unknown`,
`Not run`, `Not measurable`, or `Not covered`. Do not fill the gap with a
percentage, polished prose, fake progress, or a claim about model quality.

## When to use

Use it when:

- an AI answer, draft, recommendation, summary, extraction, or agent run can
  be partial, uncertain, stale, delayed, or based on conflicting sources;
- users need to know whether to trust, inspect, edit, narrow, retry, wait, or
  hand the work to a person;
- a team is designing loading, empty, clarification, abstention, error,
  approval, cancellation, timeout, or recovery states for an AI workflow;
- a product shows confidence, progress, citations, source coverage, or a
  "needs review" label and the PM must define what those signals mean;
- an AI flow may create an external or irreversible side effect and needs a
  preview, diff, permission, approval, receipt, and rollback path;
- a team needs to evaluate comprehension, calibrated trust, overtrust,
  undertrust, correction, recovery, mobile behavior, accessibility, or locale
  behavior rather than only answer accuracy.

Use `pm-ai-task-boundary` when the main decision is who owns the task or what
autonomy level is allowed. Use `pm-ai-approval-to-flow` when an already-bounded
action needs an approval interaction. Use `pm-ai-handoff-to-recovery` when the
main input is an escalation packet and the destination/resume contract is the
decision. Use `pm-ai-claim-to-citation` when the main question is claim-level
source support. Use `pm-ai-evaluation-plan` when the main work is defining the
overall test program. This skill connects those concerns at the user-visible
state boundary; it does not replace them.

Do not use it to invent runtime state, inspect private customer content, call a
provider, certify safety, choose a model, or declare user trust or adoption
without direct evidence.

## Guardrails

1. Start with one user job, intended action, risk class, owner, and decision
   rule. A vague request for "better confidence UX" is not a product frame.
2. Treat model confidence as a model signal, not truth. Keep it separate from
   evidence sufficiency, policy eligibility, task completion, and user
   comprehension.
3. Show what is known, what is missing, and what the user can do next. Do not
   hide an abstention behind a generic success card.
4. Show progress only when a trace or deterministic event supports the stage.
   Never simulate hidden reasoning or leave a user in an unbounded spinner.
5. Preserve valid work when a result is partial, a source disappears, or a
   retry fails. State what will be retried and whether duplicate side effects
   are possible.
6. Ask the smallest clarification question that changes the route. Preserve
   the user's prior input and explain why the question matters.
7. For high-risk, private, or irreversible work, require least privilege,
   preview/diff, explicit approval, durable receipt, human fallback, and a
   rollback or cancellation route.
8. Keep evidence, interpretation, user-facing status, and product action as
   separate fields. A fluent explanation is not evidence.
9. Test negative, mismatch, recovery, high-risk, mobile, accessibility, and
   locale slices. A happy-path answer test cannot prove the experience is safe.
10. Fictional rows are fixtures. Never turn them into human research, model
    quality, production readiness, traffic, or GitHub adoption evidence.

## Core definitions

| Dimension | Meaning | User/product consequence |
| --- | --- | --- |
| Model signal | A model-reported score, rank, or uncertainty indicator | Never use alone to authorize an action |
| Evidence sufficiency | Whether allowed evidence supports the requested claim or step | Show support, missing support, or abstention |
| Policy eligibility | Whether the action is allowed under product, privacy, or risk rules | Block or route even when evidence looks strong |
| Task completion | Whether the requested work actually finished | Report completed, partial, or not completed |
| User comprehension | Whether the person understands status, limits, and next action | Evaluate separately; do not infer from clicks |
| Provenance | The safe source, event, version, or receipt locator behind a state | Let the person inspect or verify where appropriate |
| Recovery | The next safe action after uncertainty, error, cancellation, or timeout | Preserve agency and prevent dead ends |

## Workflow

### 1. Frame the decision and user job

Write one sentence:

> We need to decide whether the system may `...` for the user job `...`, for
> audience `...`, under `...` risk and evidence boundaries.

Record the current workaround, intended user action, affected journey,
decision owner, risk class, reversibility, data/permission boundary, success
oracle, observation window, and what would change the decision. Name whether
the system is observing, drafting, recommending, or acting. If the outcome
oracle is missing, write `Not measurable` instead of choosing a proxy silently.

### 2. Map capability, evidence, and state triggers

Create a ledger before writing interface copy:

| Capability or stage | Observable input/event | Evidence available | Missing or conflicting | Allowed action | State trigger |
| --- | --- | --- | --- | --- | --- |
| retrieve policy | source snapshot `S-...` | current section | account fact absent | draft with qualification | partial / clarify |
| propose send | redacted draft + diff | policy and recipient | permission not approved | preview only | approval required |

For every stage, identify the signal that can be observed, the evidence that
supports it, the evidence that is missing, the action it permits, and the event
that moves the user to another state. Do not use an internal model label as a
user-facing state unless its meaning and limitation are validated.

### 3. Design the user-visible state contract

Write one row for every applicable state. Use a concrete message, not a
placeholder such as "show an error":

| State | Trigger and evidence | User-visible message | Available controls | Receipt/oracle | Product implication |
| --- | --- | --- | --- | --- | --- |
| `partial` | two supported fields, one missing | "The date is supported. The exception is not confirmed." | inspect source, add evidence, continue qualified | fields completed + missing locator | do not present exception as fact |
| `conflict` | two current sources disagree | "Two sources disagree on the renewal date. Compare them before choosing." | compare, choose source, ask owner | source IDs and selected version | block auto-send |
| `source-unavailable` | required source request failed | "I could not verify this against the policy, so I did not draft the exception." | retry, add source, use manual route | request ID, error class, retry status | abstain |

Cover, where relevant:

- first run and empty: explain capability, boundary, required input, and a
  bounded example without pretending the example is live;
- loading/working: show only observable stages, elapsed or timeout behavior,
  cancel, and the safe effect of abandoning the run;
- partial and needs clarification: preserve valid work, name the missing
  decision, ask one high-value question, and let the user narrow the scope;
- source unavailable, stale, low support, and conflict: expose the evidence
  limitation and offer inspect, retry, add source, compare, or manual routes;
- approval/diff: show proposed change, target, side effects, permission scope,
  expiry, and approve/reject/edit/defer controls before execution;
- success: state what completed, which receipt or source supports it, and what
  remains unverified;
- error, retry, cancel, timeout, escalation, handoff, and recovery: say what
  was saved, what will happen next, whether retry is safe/idempotent, and how
  the user resumes or leaves the flow.

Do not collapse `partial`, `conflict`, `source-unavailable`, and `error` into
one warning. They imply different evidence and recovery actions.

### 4. Separate confidence, progress, and provenance

Use a ledger like this:

| Signal | Source and version | Meaning | Does not mean | User treatment |
| --- | --- | --- | --- | --- |
| model score | model/config `Not provided` | internal ranking signal | truth or permission | usually keep internal unless calibrated |
| source support | source snapshot `S-...` | evidence for a specific claim | completeness of the whole task | show locator and limitation |
| policy check | policy `P-...` | action eligibility | factual correctness | block or allow the action |
| completion event | trace `R-...` | a stage finished | downstream success | show completed scope |
| comprehension result | task session `Not run` | user understood the state | user will trust correctly later | evaluate with a real oracle |

If a score is shown, define its dataset, version, denominator, calibration,
range meaning, action threshold, missing-data behavior, and owner. Otherwise
use plain language such as `Supported by 2 of 2 checked sources` or `Needs a
source before this can be verified`; never manufacture a probability.

For progress, tie each label to a recorded event such as source retrieval,
draft creation, policy check, or approval pause. On timeout, expose the last
confirmed stage and a safe next action. For provenance, link a safe source ID,
timestamp, version, or receipt; do not expose secrets, hidden prompts, private
URLs, raw customer text, or hidden reasoning.

### 5. Add controls and recovery before polishing copy

For each non-success state, specify:

- **Understand:** what happened, what is known, what is not known, and why it
  matters to the user job;
- **Choose:** clarify, narrow, inspect evidence, compare, edit, approve,
  reject, defer, switch to manual/source-only, or hand off;
- **Recover:** what is preserved, how to retry safely, how to undo or cancel,
  how to resume, and what receipt confirms the transition;
- **Escalate:** owner/destination, safe packet, privacy boundary, wait state,
  and resume or close rule.

Do not make `Try again` the only recovery. A retry cannot repair missing
evidence, an unresolved conflict, an expired permission, or an irreversible
side effect. If the system can act externally, require idempotency or a
duplicate-action check and make the approval event durable.

### 6. Evaluate comprehension and calibrated trust

Define separate oracles for:

- task outcome: did the user complete the intended job without an invalid
  shortcut;
- state comprehension: can the user identify what is supported, missing,
  blocked, and the next safe action;
- calibrated trust: does the user inspect or override weak output and proceed
  when support is strong, without blindly accepting fluent text;
- correction and recovery: can the user repair input, add evidence, cancel,
  retry, or resume without losing valid work;
- safety and policy: are hard-gate, privacy, permission, and irreversible
  routes blocked or escalated as specified;
- operational quality: latency, timeout, retry, and receipt behavior;
- inclusion: mobile, keyboard, screen reader, contrast, focus, locale, and
  translated uncertainty strength.

Use positive, negative, mismatch, recovery, high-risk, OOD, mobile,
accessibility, and locale slices. Report denominator, window, environment,
version, and evidence status. If a comprehension or trust result has not been
run, write `Not run`; if a metric lacks a valid denominator, write
`Not measurable`. A click-through rate or acceptance rate alone cannot prove
calibrated trust.

### 7. Decide fallback, release, and writeback

Choose one decision: `Ship`, `Pilot`, `Iterate`, `Hold`, `Need evidence`, or
`Rollback`. Define hard blockers, owner, observation window, fallback, rollback
trigger, and the next learning action. A reasonable proposal may require no
unresolved high-risk conflict, source/provenance visibility, usable recovery,
human approval for external effects, and evidence that users can distinguish a
qualified result from a verified result.

Write back one de-identified state failure, copy misunderstanding, recovery
gap, or evidence gap as a regression case, UX fix, rubric anchor, or new pilot
question. Keep the state contract separate from model/provider selection and
from the statistical readout that evaluates it.

## Output contract

Return these sections in order. Keep unknowns explicit and do not silently
convert a proposal or fixture into an observed result.

## Decision on the desk

State the decision, user job, audience, owner, risk/reversibility, intended
action, current evidence, fallback, and the rule that would change the
decision.

## User/job and uncertainty boundary

Describe the current workaround, allowed data and permissions, what the system
may observe/draft/recommend/execute, what requires a person, and which claims
or outcomes are excluded.

## Capability, evidence, and state ledger

List capability/stage, observable trigger, source/version, evidence sufficiency,
missing/conflicting evidence, policy eligibility, task completion, state
transition, owner, and safe receipt locator.

## User-visible state contract

For every applicable first-run, empty, loading, partial, clarification,
source-unavailable, conflict, low-support, approval/diff, success, error,
retry, cancel, timeout, escalation, handoff, and recovery state, give trigger,
plain message, available control, saved work, receipt/oracle, and product
action. Include mobile, accessibility, and locale implications.

## Confidence, progress, and provenance

Separate model signal, evidence support, policy eligibility, task completion,
and user comprehension. State whether any score is user-visible and provide
its calibration/denominator or `Not provided`. Map progress labels to observed
events and show safe source/version/receipt locators.

## Control, clarification, and recovery

Name the smallest clarification question, inspect/edit/compare/approve/reject/
cancel/retry/undo/manual/handoff controls, preservation rule, idempotency,
permission boundary, escalation destination, resume rule, and rollback path.

## Trust and UX evaluation

Define task, comprehension, calibrated-trust, overtrust/undertrust,
correction/recovery, refusal/abstention, safety, latency, mobile,
accessibility, and locale oracles with slices, denominator, version, window,
and evidence status. Keep model-quality evaluation distinct from user
comprehension and trust.

## Failure, fallback, and release decision

List negative routes, high-risk blockers, fallback owner, rollback trigger,
release decision, observation window, monitoring receipt, and what would cause
the team to hold or revert.

## Not covered

List live model/provider behavior, real user sessions, comprehension or trust
results, model quality, production safety, adoption, traffic, cost/quota,
statistical significance, and any device/assistive-technology surface not
actually inspected or run.

## Implementation handoff

Give the smallest slices for state/event schema, copy, evidence/provenance,
controls, permissions, receipts, error/retry behavior, accessibility/mobile,
instrumentation, evaluation, and rollback. Name owners, tests, and the next
evidence-producing action without inventing ownership or completion.

## Review ask

Ask the decision owner for one correction to the uncertainty boundary, one
missing or conflicting case, one recovery check, and one explicit approval of
the next evidence run.

## Edge cases

- High model signal but weak or stale evidence: show the evidence limitation;
  do not authorize the action from the score.
- Low model signal but strong, inspectable evidence: avoid forcing a warning
  that makes supported work look unverified; state the evidence and keep any
  review requirement separate.
- Partial result with a valid subset: preserve the subset, label the missing
  fields, and let the user continue qualified or add evidence.
- Two sources conflict: preserve both locators and versions, explain the
  consequence, and route to compare or an owner; do not average the conflict.
- Required source is unavailable: abstain from the unsupported claim and offer
  retry, source upload, or a manual route.
- Irreversible action: require preview/diff, explicit approval, least
  privilege, idempotency/duplicate protection, receipt, and rollback or a
  human fallback.
- Prompt injection or untrusted source instruction: treat source text as data,
  keep policy and tool permissions authoritative, and show a safe hold state.
- Stale progress or duplicate retry: show the last confirmed event, reconcile
  the receipt, and prevent duplicate external action.
- Mobile or screen reader: expose state, error, and action meaning in semantic
  names and focus order; do not rely on color, position, or animation.
- Locale or translation changes uncertainty strength: review the translated
  action and limitation with the same state oracle; do not assume literal
  translation preserves calibration.
- User rejects or edits a proposed action: preserve the reason if permitted,
  state whether the run resumes, and do not silently re-propose the same action.
- Timeout after an external request: distinguish unknown outcome from confirmed
  failure and reconcile before allowing another action.

## Final check

Before handing off, confirm:

- one user job, decision owner, risk/reversibility, intended action, oracle,
  evidence boundary, and observation window are explicit;
- model signal, evidence sufficiency, policy eligibility, task completion, and
  user comprehension are separate fields;
- first-run, empty, loading, partial, clarification, source unavailable,
  conflict, low support, approval/diff, success, error, retry, cancel,
  timeout, escalation, handoff, and recovery states are covered where
  applicable;
- every non-success state has plain user-facing language, a next control,
  preserved-work rule, receipt/oracle, and a safe fallback;
- progress labels map to observable events, never hidden reasoning or fake
  certainty; provenance is safe, versioned, and inspectable where appropriate;
- high-risk, private, external, and irreversible actions have permission,
  preview/diff, approval, idempotency, receipt, and rollback/human fallback;
- trust and UX evaluation includes comprehension, overtrust/undertrust,
  correction/recovery, negative/mismatch, mobile, accessibility, and locale
  slices with denominator and evidence status;
- release, fallback, rollback, and every unrun surface are explicit;
- the packet ends with one owner, one next evidence action, and one honest
  boundary rather than a quality or adoption guarantee.

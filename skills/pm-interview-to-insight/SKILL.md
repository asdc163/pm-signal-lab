---
name: pm-interview-to-insight
description: Turn de-identified interview notes, usability sessions, or observed workflows into an evidence-bounded insight map, contradiction log, and one next learning question or smallest validation. Use when a PM needs to learn from conversations without mistaking a quote, preference, or single session for a segment-wide finding.
compatibility: No tools, network access, model provider, or external write required.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM Interview to Insight

Use this skill when a PM has one or more de-identified discovery notes and
needs to decide what the conversations actually support. It keeps the person,
their context, the job they were trying to do, and the team's interpretation
separate. The output is an insight map for review, not a survey result or a
roadmap commitment.

## When to use

Use it for:

- customer or internal stakeholder interview notes;
- moderated usability-session notes;
- a de-identified workflow observation with the participant's context;
- support or research conversations where the job, friction, and desired
  outcome need to be compared across sources;
- a set of AI-assisted transcripts that still needs human product judgment.

Do not use it to:

- invent a participant quote, persona, segment, prevalence, or willingness to
  pay;
- turn one preference into a market requirement or approved roadmap item;
- calculate frequency, confidence, or business impact without a denominator or
  explicit method;
- merge contradictory sessions into a smooth theme;
- publish raw conversation content or create an issue, roadmap item, or
  external message automatically.

## Guardrails

- Treat the supplied notes as the evidence boundary. If a date, participant
  context, source ID, outcome, or decision is missing, write `Not provided`,
  `Not verified`, or `Not measured`.
- Remove names, email addresses, customer identifiers, private URLs,
  credentials, tokens, confidential roadmap detail, and raw sensitive content
  before processing. Keep only the minimum context needed to interpret the
  job.
- Preserve provenance. Every source-backed observation and every insight
  candidate must point to source IDs; a paraphrase must be labelled as a
  paraphrase.
- Keep observed behavior, reported experience, interpretation, proposed
  hypothesis, and missing evidence in separate fields.
- One conversation is a signal, not a pattern, rate, adoption result,
  testimonial, or segment conclusion. Two or more similar notes can support a
  `repeated qualitative signal`, but never a prevalence claim by themselves.
- Keep segment, environment, product version, task, and session context visible
  when comparing notes. Do not pool unlike contexts for a stronger-sounding
  theme.
- Keep contradictions and non-confirming evidence visible. A request or
  preference can be useful without proving that the current workflow is
  broken.
- An AI-generated transcript or summary is an artifact to inspect, not
  independent user evidence. Preserve its source and human review boundary.
- Do not assign severity, urgency, confidence, or business impact unless the
  input or an explicit method supports it. Use a bounded qualitative status
  instead.
- Keep privacy, security, medical, legal, payment, and other high-impact
  decisions in human review. Hold when the safe handling or next step is
  unclear.
- The skill produces a reviewable handoff only. It does not call providers,
  write to GitHub, send messages, publish research, or change a roadmap.

## Workflow

### 1. Frame the learning decision

Write the decision on the desk, the user job under review, the current
workaround, and what evidence would change the next step. If the decision is
missing, keep it as `Not provided` and continue with the evidence ledger.

### 2. Build the source ledger

Give each note a stable ID such as `I1`, `I2`, or the supplied session ID. For
each source, record only context that was supplied and safe to retain:

1. source type and date, when provided;
2. participant or role context, when provided and de-identified;
3. task, product version, environment, and session conditions, when provided;
4. a short quote or faithful paraphrase, clearly labelled;
5. what the source supports and what it does not prove.

Do not upgrade a summary, transcript, or request into an observed behavior.

### 3. Separate job, friction, and outcome

For each source, write distinct lines for:

- the job or progress the person was trying to make;
- the behavior or statement that was observed or reported;
- the friction, doubt, workaround, or positive outcome;
- the requested change, if any;
- the evidence status: `observed`, `reported`, `inferred`, `proposed`, or
  `not measured`.

This prevents a feature request from becoming the insight before the job has
been understood.

### 4. Compare contexts before clustering

Group only sources that share a sufficiently similar job and context. Name the
cluster in plain language, list the source IDs, and use one of these bounded
statuses:

- `single signal`: one source only;
- `repeated qualitative signal`: similar observations from at least two
  independent sources, without a prevalence claim;
- `conflicting signal`: sources point in different directions;
- `missing evidence`: the notes cannot distinguish the explanations.

Do not turn the status into a numeric confidence score.

### 5. Write insight candidates

Each candidate should state who encountered what job in what context, what
friction or outcome was visible, and why it matters to the decision. Attach
source IDs and label the candidate as `source-backed`, `hypothesis`, or
`missing-evidence`. Add a sentence for what the candidate does not prove.

### 6. Keep a contradiction and gap log

List non-confirming sources, different segment or task contexts, unanswered
questions, and missing denominators. If the notes conflict, keep both sides
and propose the smallest question that could distinguish them.

### 7. Choose one next learning action

Select either one clarifying question or one smallest validation. State:

- the change or question;
- the audience and context;
- the primary learning signal;
- one guardrail;
- the proposed decision rule;
- the owner and evidence boundary.

Label thresholds as `proposed` unless they were supplied. Prefer a reversible
five-minute review or a small copy/prototype comparison to a broad launch.

### 8. Write back the learning

Record what the notes support, what remains unknown, what should be checked
next, and which follow-on skill is appropriate. `pm-source-to-test` fits a
source-led decision; `pm-feedback-to-fix` fits a concrete reproducible
problem; neither should be invoked until its own evidence boundary is met.

### 9. Hand off for review

End with one decision: `Test`, `Ship`, `Hold`, `Need evidence`, or `Reject`.
Name the unresolved risk and the exact evidence a reviewer should correct.

## Output contract

Return the following sections in this order. Keep unsupported fields explicitly
`Not provided`, `Unknown`, `Not measured`, or `Not covered`.

## Decision on the desk

State the decision, user job, current workaround, success condition, and
decision owner.

## Source ledger

Use a table with source ID, safe context, line or observation, evidence status,
what it supports, and what it does not prove.

## Job and context map

Separate the job, task context, observed or reported behavior, friction or
outcome, request, and missing context for each relevant source or cluster.

## Insight candidates

For each candidate, include its status, source IDs, bounded insight, and the
limitation that keeps it from becoming a broad claim.

## Contradictions and missing evidence

List conflicting signals, unlike contexts, missing denominators, privacy
redactions, and questions the current notes cannot answer.

## Next question or smallest validation

State the question or change, audience/context, primary learning signal,
guardrail, proposed decision rule, owner, and evidence capture method.

## Learning writeback

Record the decision, what this set supports, what it does not support, the next
question, and the follow-on skill or review path.

## Not covered

List segments, sample size, prevalence, frequency, severity, business impact,
adoption, outcome quality, versions, environments, and safety considerations
that were not evidenced.

## Review ask

Ask for exactly one decision: `Test`, `Ship`, `Hold`, `Need evidence`, or
`Reject`. Name the unresolved risk.

## Edge cases

- **One interview:** keep it as a `single signal`; do not call it a pattern or
  persona insight. Choose one follow-up question.
- **Leading question:** record the question wording and treat the answer as
  reported evidence with a bias limitation.
- **Silence or hesitation:** record it as an observation only when the note
  includes context; do not infer the reason.
- **Conflicting sessions:** retain each context and make the conflict a
  learning question rather than averaging it away.
- **Feature request:** record the desired outcome separately from the proposed
  solution and test whether the underlying job is blocked.
- **AI-generated transcript:** mark the transcript as an artifact, preserve
  human verification status, and do not quote an unreviewed extraction.
- **Synthetic or fictional note:** label every output as a `fictional fixture`;
  it can test the skill but cannot support a user or market claim.
- **Sensitive or security-related content:** redact the handoff, minimize the
  reproduction, and route the raw note through the approved private channel.
- **Different segment or version:** keep it out of the cluster unless the
  comparison is the explicit learning decision.
- **No safe next action:** return `Need evidence` and specify the smallest safe
  capture instead of producing a polished recommendation.

## Final check

Before returning the insight map, confirm that:

- every source-backed observation has a source ID and safe provenance;
- quotes, paraphrases, observations, reports, inferences, and proposals are
  visibly distinct;
- a single source is not presented as a pattern, rate, testimonial, or market
  conclusion;
- repeated qualitative signals retain their context and do not become a
  prevalence claim;
- contradictions, privacy boundaries, and missing evidence remain visible;
- the next question or validation has one primary learning signal, one
  guardrail, and a proposed decision rule;
- no unsupported number, segment, quote, outcome, adoption, or business claim
  was added;
- the output ends with one review decision and names what was not covered.

For a worked, fictional interview insight map, read
`references/support-interview-insight-map.md`.

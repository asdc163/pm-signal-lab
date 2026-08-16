---
name: pm-opportunity-to-bet
description: Turn multiple evidence-backed opportunity candidates into one bounded product bet with a source ledger, user job, assumptions, opportunity cost, smallest validation, non-goals, and a stop or revise rule. Use when a PM must choose what to pursue next without turning an unsourced score, single signal, or market guess into a roadmap commitment.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM Opportunity to Bet

Use this skill when a PM has more than one opportunity candidate, product
signal, request, or problem frame and needs to choose one bounded bet for the
next learning or delivery step. It keeps the source, job, alternative, risk,
and smallest validation visible before a team spends meaningful time.

The output is a decision packet for review. A bet is a deliberately bounded
direction to test or specify; it is not a roadmap commitment, a build result,
an adoption claim, or a forecast of business impact.

## When to use

Use it for:

- comparing several source-backed problems or opportunity candidates;
- choosing one next product bet after interviews, trend review, feedback,
  experiment readout, or an AI evaluation;
- making opportunity cost explicit before a design or engineering handoff;
- narrowing a broad AI-product idea into one reversible learning boundary;
- deciding whether the evidence is strong enough to test, specify, hold, or
  collect more evidence.

Do not use it to:

- manufacture a market, segment, urgency, reach, impact, confidence, effort,
  or revenue estimate from thin evidence;
- calculate RICE, ICE, WSJF, or another numeric priority score when the inputs
  are not supplied and methodologically supported;
- turn one request, quote, trend, competitor move, or owner preference into a
  broad requirement or roadmap commitment;
- hide alternatives, contradictions, missing evidence, or the cost of doing
  something else;
- create tickets, edit code, change a roadmap, publish a decision, message a
  customer, or write to an external system automatically;
- replace source analysis, an experiment readout, an outcome metric contract,
  an AI evaluation plan, or a product specification when those are the next
  evidence boundary.

## Guardrails

- Treat supplied material as the evidence boundary. If a source ID, date,
  context, user job, outcome, or decision owner is missing, write `Not
  provided`, `Not verified`, or `Not measured`.
- Give every candidate a stable source mapping. Separate `observed`,
  `reported`, `inferred`, `proposed`, and `missing` evidence; do not let a
  polished synthesis erase the distinction.
- One signal is a `single signal`, not market demand, prevalence, urgency,
  segment proof, or willingness to pay. Repeated qualitative signals still do
  not provide a rate without a denominator and comparable contexts.
- Keep the user job, current workaround, desired progress, and context visible.
  A feature request is not the job and an opportunity label is not a problem
  diagnosis.
- Compare candidates with explicit qualitative criteria such as evidence
  strength, job clarity, reversibility, learning value, risk, and smallest
  validation. If a numeric score is supplied by a source, preserve its method
  and source; never invent missing inputs or present a proposed ordering as a
  measured result.
- Choose one bet while keeping the strongest alternatives and their
  opportunity cost visible. Equal evidence can legitimately end in `Need
  evidence` or a tie-break validation rather than false certainty.
- Keep a bet boundary: target context, job, proposed mechanism, smallest
  validation, non-goals, dependencies, and stop or revise rule. A bet does not
  authorize a build, launch, migration, provider call, or external write.
- Redact names, emails, customer identifiers, private URLs, credentials,
  tokens, confidential roadmap detail, raw sensitive content, and proprietary
  prompts before writing the packet.
- For AI-related bets, preserve model/provider/config assumptions, human
  review, provenance, uncertainty, fallback, cost/latency status, evaluation
  slices, and rollback questions. Do not treat a model capability or demo as
  an outcome.
- The skill is tool-free and produces a reviewable handoff only. It does not
  call a provider, browse, open an issue, send a message, change a roadmap, or
  perform the validation.

## Workflow

### 1. Frame the decision

Write the decision on the desk, decision owner, user/job, current workaround,
time or resource boundary, and what evidence could change the choice. If the
decision is missing, keep it as `Not provided` and do not infer authority.

### 2. Build the opportunity ledger

Give each candidate a stable ID such as `O1`, `O2`, or the supplied ID. Record
the source IDs, context, job, observed or reported friction, desired progress,
current workaround, requested change, evidence status, and limitation. Keep
unlike segments, versions, tasks, or environments in separate rows.

### 3. Classify the evidence boundary

For each candidate, mark what is source-backed, inferred, proposed, or missing.
Use bounded statuses such as `single signal`, `repeated qualitative signal`,
`conflicting signal`, `missing evidence`, or `source-supplied score`. State
what the candidate supports and what it does not prove.

### 4. State the comparison criteria

Use a short qualitative comparison, not an invented score. Consider:

- evidence traceability and fit to the decision;
- clarity of the user job and current workaround;
- smallest reversible test and expected learning value;
- risk, privacy, safety, dependency, cost, and rollback burden;
- opportunity cost and what would remain unknown if this candidate wins.

If the owner supplied a weighted method, reproduce the inputs, formula, date,
and source before using it. Otherwise label the ordering `Proposed` and keep
the rationale inspectable.

### 5. Choose one bounded bet

Select one candidate or explicitly choose `Need evidence`. Write the target
context, user job, desired progress, proposed mechanism, smallest coherent
boundary, and decision owner. Keep alternatives visible with the reason they
were deferred; do not call them rejected unless the evidence supports that.

### 6. Write assumptions, risks, and opportunity cost

List the assumptions that must be true, the evidence that would falsify each
one, the risks and dependencies, the cost of doing this instead of each
alternative, and the non-goals. Mark product, market, AI, privacy, and
operational claims as `Proposed` or `Unknown` when they are not evidenced.

### 7. Design the smallest validation

Define one reversible test, review, prototype comparison, or source-backed
follow-up. State audience/context, first action, primary learning signal, unit,
guardrail, timebox, evidence capture, owner, and a proposed decision rule. If
the outcome or denominator needs design, route to `pm-outcome-to-metric`; if a
measured test already exists, route to `pm-experiment-to-readout`.

### 8. Pre-commit stop, revise, or continue

State what would make the owner `Continue`, `Revise`, `Hold`, `Need evidence`,
or `Reject` the bet. Keep thresholds `Proposed` unless supplied and verified.
Name the safe recovery or rollback path. A validation plan does not prove that
the validation ran.

### 9. Hand off and write back

Give design, engineering, research, and QA the smallest next action and the
evidence they must collect. Route a confirmed build boundary to
`pm-decision-to-spec`, a concrete reproducible mismatch to
`pm-feedback-to-fix`, a release learning loop to `pm-release-to-learn`, and a
shareable verified proof packet to `pm-proof-to-share`.

## Output contract

Return the following sections in this order. Keep unsupported fields
explicitly `Not provided`, `Unknown`, `Not measured`, `Proposed`, or `Not
covered`.

## Decision on the desk

State the decision, owner, user/job, current workaround, time or resource
boundary, and the evidence that could change the decision.

## Opportunity set

Use a table with candidate ID, source IDs, context, job or friction, evidence
status, what it supports, what it does not prove, and limitation. Keep
conflicting contexts separate.

## Evidence boundary

Separate observed behavior, reported experience, source-supplied score,
inference, proposal, missing evidence, and any prior result. State the method,
date/version, denominator, and provenance when supplied; otherwise mark them
as not provided.

## User job and bet

Describe the selected context, trigger, user job, desired progress, current
alternative, proposed mechanism, smallest boundary, and decision owner. State
why the bet is the most useful next learning step without pretending it is a
validated market priority.

## Assumptions and risks

List each assumption, evidence that would test or falsify it, status, owner,
and product, AI, privacy, safety, dependency, cost, latency, accessibility, or
operational risk that applies.

## Opportunity cost and non-goals

Name the visible alternatives, what is deferred by choosing the bet, cost of
doing nothing, and `Should-not-build` items. Do not hide a deferred candidate
inside a feature list.

## Smallest validation

State the test or review, audience/context, first action, primary signal, unit,
guardrail, timebox, evidence capture, owner, version/environment boundary, and
proposed decision rule. Mark execution `Not run` until fresh evidence exists.

## Stop, revise, or continue rule

Define the conditions for `Continue`, `Revise`, `Hold`, `Need evidence`, or
`Reject`, the threshold status, and the safe recovery or rollback action. Keep
the action reversible and human-owned.

## Not covered

List unsupported market size, prevalence, segment, urgency, business impact,
revenue, adoption, traffic, stars, retention, quality, AI performance,
provider behavior, cost, latency, safety, accessibility, localization,
versions, environments, or rollback execution.

## Implementation handoff

Give the authorized owner one smallest next action, affected surfaces, source
and privacy review, acceptance or learning evidence to collect, writeback
location, and the follow-on skill. A handoff is not a ticket or proof that
implementation occurred.

## Review ask

Ask for exactly one decision: `Continue`, `Revise`, `Hold`, `Need evidence`, or
`Reject`. Name the unresolved evidence or risk the reviewer must correct.

## Edge cases

- **Only one candidate:** keep it as the only visible option, state that no
  comparison was possible, and use a smallest validation rather than calling
  it the priority.
- **Conflicting signals:** preserve the contexts and choose `Need evidence` or
  a tie-break validation when the conflict changes the bet.
- **Equal candidates:** state the tie, compare reversibility and learning value,
  and choose one smallest tie-break test or ask the owner to decide.
- **Feature request without a confirmed problem:** record the request as
  reported evidence and route back to discovery; keep it out of `Must-have`.
- **No usable evidence:** return `Need evidence`, define the smallest safe
  collection step, and do not create a polished priority list.
- **Synthetic or fictional input:** label the entire output a `fictional
  fixture`; it can test the packet but cannot support a real bet, adoption, or
  growth claim.
- **Source-supplied numeric score:** preserve source, method, inputs, and date;
  do not fill missing values or compare it with an invented score.
- **High-impact or irreversible bet:** require human approval, narrow exposure,
  explicit consent, a visible fallback, and a tested rollback before action.
- **AI provider or model change:** route to an evaluation plan with fixed
  slices, provenance, fallback, cost/latency status, and release evidence.
- **Unknown opportunity cost:** write `Not provided`, identify the missing
  decision owner or alternative, and avoid claiming an optimal choice.
- **No safe validation:** hold the bet and define what evidence or permission
  is required before testing.

## Final check

Before handoff, confirm that:

- every candidate has source IDs, context, evidence status, and limitations;
- observed, reported, inferred, proposed, and missing evidence remain separate;
- no unsourced numeric score, market claim, segment claim, or growth promise was
  added;
- one bet or `Need evidence` is explicit while alternatives and opportunity
  cost remain visible;
- the user job, boundary, assumptions, risks, non-goals, and smallest
  validation are concrete;
- the validation has a primary signal, unit, guardrail, timebox, owner, and
  proposed decision rule;
- stop/revise/continue and safe recovery are stated;
- privacy, AI trust, accessibility, and high-impact boundaries are addressed
  when relevant;
- the output ends with `Not covered` and exactly one review decision.

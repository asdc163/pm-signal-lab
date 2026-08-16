---
name: pm-ai-feedback-to-eval
description: Turn an AI user correction, preference, thumbs-down report, escalation, or reviewed trace into a privacy-safe, evidence-bounded evaluation case with provenance, observation and label separation, oracle, slice, calibration, contamination checks, dataset destination, fallback, and release decision. Use when a PM needs to decide whether real feedback should become a golden, regression, negative-routing, red-team, canary, holdout, product-fix, or no-action artifact.
---

# PM AI Feedback to Eval

Use this skill to convert a reviewed AI feedback signal into a small, repeatable
evaluation artifact without treating a user report as automatic ground truth.
Keep the original feedback private or de-identified, separate what happened from
what it may mean, and make the expected behavior and oracle reviewable.

## When to use

Use it when the input includes at least one of these:

- a user correction, edited answer, thumbs-down reason, retry, escalation, or
  abandonment tied to an AI or agent workflow;
- a human comparison, preference label, support observation, or domain review
  that may reveal a missing behavior or unacceptable tradeoff;
- a production-sampled trace or pilot note that needs to become a golden,
  regression, negative-routing, red-team, canary, or held case;
- a question about whether feedback is safe to put into an evaluation dataset,
  how to label it, or how to keep it out of a holdout set.

Use `pm-ai-trace-to-regression` when a concrete trace failure already needs
reconstruction and failure classification. Use `pm-ai-evaluation-plan` when the
question is how to design an evaluation before a feedback case exists. Use
`pm-feedback-to-fix` when the observation is a general product problem and does
not need an AI evaluation artifact. Use `pm-ai-claim-to-citation` when the main
question is whether an answer is supported by its sources.

Do not use this skill to collect feedback automatically, replay a production
side effect, upload customer data, fine-tune a model, infer population
prevalence, or declare an AI feature improved from one case.

## Guardrails

1. Preserve provenance when supplied: feedback ID, trace or session ID,
   timestamp, workflow, model/provider and version, prompt or policy version,
   locale, source type, and environment. If absent, write `Not provided`.
2. Minimize before copying. Remove names, email addresses, account IDs, order
   IDs, secrets, tokens, private URLs, payment data, tenant data, and raw
   sensitive content. Keep a private raw-evidence pointer only when an
   authorized owner may access it.
3. Treat consent as a gate, not a footnote. `unknown`, `not provided`, or
   `revoked` consent means `Hold` for any case that retains user content or
   identifiable trace material.
4. Separate `observed`, `reproduced`, `inferred`, `labelled`, `proposed`, and
   `not measured`. A correction can show a mismatch without proving its cause.
5. Keep four layers distinct: what the system did, what the reviewer thinks it
   means, what label or preference was assigned, and what behavior the product
   should require. Do not turn a preference into a factual oracle without a
   criterion.
6. Do not infer frequency, segment prevalence, model superiority, adoption,
   business impact, or safety from one feedback record, synthetic fixture, or
   employee report.
7. Choose one dataset destination. Do not place the same case in development
   and holdout, or let a case leak from a reviewed output into a comparison
   result without recording contamination.
8. Calibrate subjective labels. Preserve disagreement, reviewer identity class,
   rubric version, and adjudication status. An LLM judge, thumbs-up, or edited
   answer is a signal to review, not ground truth by itself.
9. Treat high-impact feedback as a safety or product-control issue first. For
   privacy, security, money, access, medical, legal, or irreversible-action
   behavior, require deterministic checks and human review before promotion.
10. Do not create issues, modify datasets, call a provider, train a model,
    publish a release, or change a production flag. Produce a handoff for an
    authorized owner and record the missing permission.

## Core definitions

| Term | Meaning | Do not confuse it with |
|---|---|---|
| `Feedback record` | A user, reviewer, support, or trace signal about an AI interaction | a representative sample |
| `Observation` | What was directly seen or recorded | a root-cause explanation |
| `Correction` | A person changed, rejected, or repaired the output | a universally correct answer |
| `Preference` | A person preferred one acceptable option over another | factual correctness |
| `Label` | A rubric-based judgment assigned by a reviewer | model truth |
| `Expected behavior` | The product behavior the team is asking the case to test | what happened in the source |
| `Oracle` | A deterministic, human, reference, or outcome check that can judge the case | an aggregate score |
| `Slice` | A stable user/job/risk/context dimension for coverage | a post-hoc explanation |
| `Destination` | `golden`, `regression`, `negative`, `redteam`, `canary`, `holdout`, or `hold` | a permission to publish |
| `Contamination` | Any path by which case content or labels enter a comparison or holdout before evaluation | normal reuse |
| `Signal strength` | The evidence level and scope of this record | confidence in the model |

## Workflow

### 1. Frame the decision and user job

Write one sentence:

> We need to decide whether this feedback should become an eval case, a product
> fix, a hold, or no action for `...`.

Name the affected user/job, current workaround, decision owner, risk if wrong,
and what evidence would change the decision. If the job or decision is missing,
write `Not provided` and keep the case bounded.

### 2. Freeze the source and provenance

Assign stable IDs such as `F-001`, `T-001`, `L-001`, and `C-001`. Record the
feedback channel, original timestamp, workflow, model/config boundary, locale,
source pointer, and whether the signal is user, reviewer, support, employee,
synthetic, or production-sampled. Freeze the supplied text before interpreting
it; do not rewrite the observation to fit the desired case.

### 3. Minimize content and gate consent

Create a redaction record with `removed`, `retained`, and `not checked` fields.
Record consent or permitted-use status, retention scope, access owner, and
whether the case can leave a private system. If consent, privacy, or data-use
permission is unknown, keep the destination `Hold` and specify the smallest
safe evidence needed to proceed.

### 4. Separate observation, interpretation, label, and outcome

Write four separate lines:

1. `Observed`: the exact safe event or output mismatch.
2. `Interpretation`: the narrow mechanism hypothesis, with confidence.
3. `Label`: the rubric judgment, preference, or reviewer classification.
4. `Expected behavior`: the behavior that should be tested, including any
   abstain, clarify, escalate, or human-review condition.

Record the actual user or environment outcome separately. A corrected sentence
may reveal a preference; a failed refund action may reveal an outcome failure;
neither automatically proves why the model failed.

### 5. Classify the feedback signal

Choose the narrowest supported signal type:

| Signal | Useful question | Typical risk |
|---|---|---|
| `correction` | What did the person repair? | preference mistaken for truth |
| `rejection` | What did the person refuse? | reason is missing |
| `preference` | Which option was preferred and why? | subjective label overgeneralized |
| `factual challenge` | Which claim can be checked? | no source or domain owner |
| `task failure` | Did the user job complete? | output quality confused with outcome |
| `trust / recovery` | Where did the person hesitate or recover? | UX issue hidden as model issue |
| `safety / policy` | Was a harmful or unauthorized behavior attempted? | severity hidden by average |
| `operational` | Did latency, retry, cost, or state harm the job? | no trace or denominator |

Keep multiple signals as separate labels or contributing observations; choose
one primary evaluation question.

### 6. Design the smallest evaluation case

Create a case with a safe starting state, sanitized input, required context or
source IDs, allowed and denied tools, expected route/output/state, failure
condition, oracle, reviewer, version boundary, and recovery. Prefer a case that
can be run again after one change. For a multi-turn workflow, preserve the
minimum turn sequence needed to reproduce the user job, not the whole transcript.

### 7. Choose the dataset destination and slice

Select exactly one primary destination:

- `golden`: a core job that must keep working;
- `regression`: a reviewed failure that must not return;
- `negative`: a request that must abstain, clarify, escalate, or avoid a tool;
- `redteam`: a privacy, security, policy, injection, or misuse challenge;
- `canary`: a new risky behavior to watch during limited rollout;
- `holdout`: reserved, clean, and unavailable to prompt or model tuning;
- `hold`: insufficient permission, evidence, or oracle.

Tag the case with user/job, locale, domain, risk, input format, context source,
model/config, and workflow slice. A single case can suggest a slice; it cannot
establish that the slice is representative. Record the missing coverage and the
next sampling or research action.

### 8. Define the oracle and calibration plan

Choose the smallest valid oracle:

- deterministic: schema, policy, tool route, source presence, or state check;
- reference: domain-approved answer or expected state with provenance;
- human: rubric, reviewer class, calibration sample, and adjudication path;
- outcome: whether the user job or environment state actually completed.

For subjective labels, keep at least two independent judgments when risk or
ambiguity warrants it. Record rubric/version, agreement or disagreement, judge
model if any, and human fallback. Do not manufacture a threshold from one case;
mark it `Proposed` until the owner approves and runs it.

### 9. Check contamination, release, and fallback

Ask whether the feedback, sanitized input, label, expected answer, or derived
prompt already entered development, tuning, judge calibration, or holdout. If
yes, record the contaminated surface and move the case to a clean destination
or `Hold`. Set the release decision, must-not-occur condition, fallback,
rollback trigger, and owner. Critical privacy, security, or irreversible-action
failures block promotion even if aggregate quality improves.

### 10. Write back and hand off

Record the case ID, evidence level, destination, version boundary, owner, and
next learning question in the authorized eval registry, issue, or product
learning log. End with one review choice: `Accept case`, `Hold`, `Need evidence`,
`Create product fix`, `Create regression`, or `Discard with reason`.

## Output contract

Return these sections in this order. Use `Not provided`, `Unknown`, `Not
measured`, `Not reproduced`, `Proposed`, or `Not covered` instead of filling a
gap with a plausible story.

## Decision on the desk

State the decision, affected user/job, current workaround, decision owner, risk,
and the evidence that would change the decision.

## Feedback and source ledger

List feedback IDs, trace/session IDs, source type, timestamp, workflow,
model/config/version, locale, raw-evidence pointer, redaction status, consent
status, and whether each field is observed or missing.

## Observation, interpretation, label, and expected behavior

Keep the four layers separate. Include the actual outcome, label rubric,
confidence, disagreement, and the narrow mechanism hypothesis without claiming
root cause.

## Privacy, consent, and redaction

Show retained fields, removed fields, data-use permission, retention/access
boundary, unresolved privacy risk, and the condition for leaving a private path.

## Eval case and oracle

Include case ID, sanitized setup/input/context, expected route/output/state,
denied behavior, recovery, oracle, reviewer, version boundary, and execution
status. Keep `proposed` separate from `passed`.

## Dataset destination and slice

Name one destination, slice tags, representativeness limit, duplicate check,
holdout status, and missing coverage.

## Calibration and contamination

Record rubric/version, reviewer or judge class, agreement/disagreement,
adjudication, contamination surfaces, and whether the case is eligible for
development, regression, canary, or holdout use.

## Release, fallback, and learning loop

State must-pass and must-not-occur conditions, human review, fallback, rollback,
owner, next sampling or evaluation action, and the writeback location.

## Not covered

List missing consent, missing trace, unexecuted case, unknown prevalence,
unverified label correctness, untested model/provider behavior, adoption, and
any other material gap.

## Review ask

Ask the authorized reviewer to choose one bounded next action and name the one
field or oracle that still needs evidence.

## Edge cases

- **Thumbs-down without a reason:** preserve the signal, mark the reason
  `Not provided`, and hold any specific failure label until reviewed.
- **One user corrected the answer:** treat it as a case lead, not a population
  finding; seek a rubric or second context before generalizing.
- **Preference versus correctness:** store the preference separately from
  factual, policy, or task-completion criteria; do not use style preference as
  a universal golden answer.
- **Edited output:** retain the before/after relationship only if both are safe
  and permitted; record who edited it and whether the edit is a proposed target
  or an approved reference.
- **Consent unknown or revoked:** do not retain customer content in a public or
  shared case; use `Hold` and request a de-identified artifact or permission.
- **PII or secrets in the feedback:** redact, record the category removed, and
  do not paste the secret into an eval, issue, prompt, or example.
- **Conflicting reviewers:** preserve both labels, identify the disagreement,
  adjudicate with a domain owner, or keep the case `Hold`.
- **Duplicate case:** link the existing case and record whether the new source
  adds a new slice or merely repeats the signal.
- **Holdout contamination:** remove or re-split the case, record the affected
  run, and do not report the contaminated result as a clean comparison.
- **Positive feedback:** treat it as a lead for a golden or usability signal;
  verify the expected behavior and outcome before calling it a pass.
- **Feedback after a side effect:** preserve the action receipt, stop further
  retries, and route to the authorized incident or approval owner.
- **Missing model/version or trace:** keep the case useful for product behavior
  if possible, but mark provider-level diagnosis `Not covered`.
- **Employee, synthetic, or benchmark feedback:** label the source class and
  limit the claim to fixture, workflow, or internal-signal evidence.
- **Model or judge generated the label:** record prompt/model/rubric versions
  and require human calibration when the case is consequential or ambiguous.

## Common rationalizations and red flags

| Rationalization | Reality |
|---|---|
| “The user fixed it, so the fix is ground truth.” | A correction may be a preference, workaround, or another error. Require a criterion. |
| “Thumbs-up means this is a golden case.” | Positive sentiment does not prove task completion or factual correctness. |
| “We can redact it after adding it.” | Sensitive material can leak through prompts, labels, IDs, or copied context; minimize first. |
| “One report proves a model regression.” | One report supports a case hypothesis, not prevalence or root cause. |
| “Put it in dev and holdout so we can compare faster.” | That is contamination; keep a clean destination and record the split. |
| “The judge gave it 5, so no human review is needed.” | Judge output needs a rubric, calibration, and risk-appropriate human fallback. |
| “We can use this as training data because it is useful.” | Evaluation use, retention permission, and training permission are different decisions. |

Red flags include a missing source pointer, raw PII, consent `Unknown`, a label
without a rubric, an expected answer copied from the model output, a case in
both development and holdout, a `Passed` status without execution evidence, a
population claim from one record, or a public packet that exposes private
transcript content.

## Final check

Before returning the packet, confirm:

- the decision, user/job, owner, risk, and evidence boundary are explicit;
- provenance and raw-evidence location are preserved or marked missing;
- observed, interpreted, labelled, expected, and outcome fields are separate;
- consent, privacy, redaction, retention, and access are explicit;
- the case has a safe input/context, expected behavior, denied behavior,
  recovery, oracle, reviewer, and version boundary;
- exactly one dataset destination and the relevant slice are named;
- calibration, disagreement, duplicate, and holdout-contamination checks are
  recorded;
- `proposed` is not mislabeled as `passed` and no threshold was invented;
- fallback, rollback, human review, and high-risk blockers are explicit;
- `Not covered` includes unexecuted work, prevalence, adoption, and any material
  model/provider or product-quality gap.

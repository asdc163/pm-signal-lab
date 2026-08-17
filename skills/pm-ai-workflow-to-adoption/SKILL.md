---
name: pm-ai-workflow-to-adoption
description: Turn a tested AI workflow into an evidence-bounded team introduction and adoption plan with a real work moment, support and fallback, enablement, evidence ownership, feedback-to-change, and a continue, revise, pause, stop, or broader-use decision.
---

# PM AI Workflow to Adoption

Adoption starts after a workflow has been tested and someone wants other people
to use it. This skill helps a PM plan that first introduction and decide what to
learn from real use. It keeps access, repeated useful behavior, quality,
support burden, and outcome evidence separate.

## When to use

Use this skill when:

- a tested AI or agent workflow is ready for a limited team introduction;
- a PM needs an adoption evidence plan before broader use;
- a launch has produced access or usage but no clear evidence of repeated useful
  behavior, quality, support needs, or outcome impact;
- a team needs an owner, work moment, enablement step, support route, fallback,
  review cadence, and feedback-to-change loop;
- leaders are asking whether to continue, revise, pause, stop, or consider
  broader use.

Do not use it to design the model, write a generic launch announcement, score
adoption from a seat count, or claim that a demo, usage number, or pilot proves
value.

## Do not use

Choose a different skill when the main job is:

- first value inside a product: use `pm-ai-first-use-to-activation`;
- a metric readout after a bounded experiment: use `pm-experiment-to-readout`;
- post-release observation and learning: use `pm-release-to-learn`;
- repeated value or retention: use `pm-ai-value-to-retention`;
- whether an AI workflow is mature enough for more exposure: use
  `pm-ai-workflow-to-scale`;
- a permission, approval, human takeover, incident, or rollback design: use the
  narrower control or recovery skill and carry its result into this plan.

## Working rule

The unit of review is a workflow in a named team moment, not an abstract AI
feature. A useful plan names who owns the workflow, who will try it, where it
fits in existing work, what support is available, what evidence will be read,
and who can change or stop the introduction.

Keep these signals apart:

| Signal | What it can show | What it cannot show by itself |
| --- | --- | --- |
| Access | Someone could reach the workflow | Adoption, usefulness, or value |
| One-time use | Someone tried it | Repeatable usefulness or outcome impact |
| Repeated useful behavior | The workflow is returning in a work pattern | Causality, safety, or broad adoption |
| Quality | Outputs met a named bar on a stated slice | Business value or general reliability |
| Override or exception | Where people correct, bypass, or leave the path | The reason without context |
| Support burden | Cost of helping people use the workflow | Whether the workflow is worth scaling |
| Outcome signal | A downstream result moved in the intended direction | Causality without a comparison |
| Announcement or attendance | People saw or heard about it | Adoption or value |

## Workflow

### 1. Carry the tested workflow forward

Start with the smallest tested unit. Do not rewrite a vague idea into a
successful workflow.

Record:

- workflow name, owner, intended users, and the job it supports;
- tested scope, test date, source or artifact, what passed, and what remained
  limited;
- the quality bar, known failures, permissions, required review, and manual
  fallback;
- the desired outcome and the decision the team needs next.

If the tested scope, owner, or intended users are missing, set
`introduction_status: blocked` and list the missing input. Do not fill it with
assumptions.

### 2. Pick one work moment

Tie the introduction to an existing rhythm: a support queue, weekly planning
meeting, research synthesis, handoff, or recurring report. Name the moment and
the smallest group that can use the workflow without creating unsupported
coverage.

Capture:

- `introduction_scope`: one team, role, queue, project, or time window;
- `team_rhythm`: where the work already happens;
- `moment_of_use`: the trigger and the expected next human action;
- `initial_users`: named role or bounded group, not "everyone";
- `introduction_window`: start, end, and review date;
- `access_and_approval`: who can access it and who approves sensitive steps.

The first introduction should be supportable by the named owner. If the
requested audience exceeds available support or approval coverage, recommend a
smaller scope or `Pause`.

### 3. Make the first use teachable

Write the smallest introduction a teammate can act on. Keep it concrete:

1. What work is this for?
2. When should the teammate use it?
3. What must they check before accepting the result?
4. What should they do when the result is weak, uncertain, or out of scope?
5. Where can they ask for help or hand the work back?

Add one practice step in the team's existing rhythm. It may be a paired run,
a worked example, a checklist in the handoff, or a short review of the first
few cases. Do not present training completion as adoption.

### 4. Define support and fallback before introduction

Name the person or queue that handles questions, broken inputs, policy
concerns, and failed results. Include:

- support owner and response expectation;
- escalation route and required context;
- manual fallback that can complete the job without the workflow;
- approval boundary for external or high-impact actions;
- stop condition for the introduction;
- privacy, security, accessibility, and localization checks still outstanding.

If there is no usable fallback for a high-impact job, do not recommend broader
use. Record `support_status: not_ready`.

### 5. Plan evidence from real use

Define a review window and evidence owner before the first introduction. For
each signal, state the source, denominator or sample frame, freshness, and
decision use.

| Evidence slice | Minimum question | Keep visible |
| --- | --- | --- |
| Reach | Who could use it and who actually saw the entry point? | access is not adoption |
| Repeat use | Did the same role return for the named job? | count and window |
| Useful behavior | Did the workflow help complete the intended work? | accepted human action |
| Quality | Did outputs meet the stated bar on representative cases? | slice, reviewer, misses |
| Overrides | What did people correct, bypass, or reject? | reason if known |
| Exceptions | Where did the workflow leave its intended path? | severity and recovery |
| Support | What help, manual work, or escalation did it require? | time and owner |
| Experience | What made use confusing, slow, or hard to trust? | observation, not sentiment inflation |
| Outcome | Did the desired downstream measure change? | baseline and comparison |

Do not combine these into one adoption score unless the denominator, weighting,
and decision rule are supplied. A usage count can trigger investigation. It
cannot close the adoption question.

### 6. Set the feedback-to-change loop

Name the route for observations and what happens next:

- who records a correction, exception, support request, or success;
- how the owner classifies it as workflow, instruction, context, tool,
  permission, policy, model, data, or user-experience work;
- what can change during the introduction and what needs approval;
- when the evidence owner reviews the log;
- how a changed workflow returns to a test before the next introduction;
- what gets written back to the source contract or backlog.

Production or user-facing changes must remain a proposal until the authorized
owner approves them. This skill does not send messages, change flags, grant
access, or deploy a new model.

### 7. Choose the next decision

Use the evidence available at the review date. Choose one recommendation:

| Recommendation | Use when | Required condition |
| --- | --- | --- |
| `Continue` | The introduction is supportable and more real-use evidence is needed | owner, fallback, review date, and known limits are present |
| `Revise` | A correctable workflow, enablement, or support gap is recurring | one bounded change and a re-test owner are named |
| `Pause` | Risk, approval, source, or support coverage is unresolved | stop exposure and name the unblock condition |
| `Stop` | Value is weak, burden is unsustainable, or risk is unacceptable | record the evidence and any safe closure action |
| `Consider broader use` | Outcome, quality, support, ownership, and safeguards are stable for the proposed scope | name the next audience, approver, and new evidence gap |

"Consider broader use" is not a production or adoption certification. If a
required input is absent, choose `Continue` with evidence pending, `Revise`, or
`Pause`; do not manufacture confidence.

## Output contract

Return an **Adoption Evidence Plan** with these sections, in this order:

1. **Decision in one line:** recommendation, workflow, audience, review date.
2. **Workflow carried forward:** owner, job, tested scope, quality bar, limits,
   fallback, and source.
3. **First introduction:** intended users, team rhythm, moment of use, scope,
   window, access, approvals, and why this slice is supportable.
4. **Introduction message:** the short instruction a teammate needs, including
   what to check and where to ask for help.
5. **Practice and enablement:** one practice step, reviewer, and completion
   evidence. Keep completion separate from adoption.
6. **Support and recovery:** support owner, escalation, manual fallback, stop
   condition, privacy/security/accessibility gaps.
7. **Evidence plan:** reach, repeat use, useful behavior, quality, overrides,
   exceptions, support, experience, outcome, baseline, comparison, source,
   denominator, freshness, and owner.
8. **Feedback-to-change loop:** intake, classification, approval boundary,
   review cadence, re-test route, and writeback.
9. **Decision rule:** what would support Continue, Revise, Pause, Stop, or
   Consider broader use, and who decides.
10. **Evidence boundary:** `Not provided`, `Not measured`, `Not run`, or
    `Not covered` for each material unknown.

Use `Not provided` when the requester did not supply an input, `Not measured`
when a measurement was defined but not collected, `Not run` when an execution
was planned but not performed, and `Not covered` when the work is outside this
skill or its available environment.

## Edge cases

- **Announcement without use:** record reach or attendance only. Ask for a
  bounded first-use observation; do not call it adoption.
- **High usage with no accepted outcome:** investigate whether the workflow is
  useful, required, or being retried. Keep outcome evidence open.
- **Repeated overrides:** route to the smallest workflow, context, tool,
  policy, or model investigation. Do not dismiss overrides as user resistance.
- **Support queue is already full:** narrow the audience, add a manual owner,
  or `Pause`. Do not scale a workflow that cannot be recovered.
- **A leader requests "roll out to everyone":** ask for a supportable slice,
  approver, fallback, and stop rule. Record the broad request as a hypothesis.
- **Sensitive or high-impact job:** carry the relevant privacy, security,
  permission, approval, and human-control review. If evidence is missing,
  choose `Pause` or `Revise`.
- **Baseline is absent:** label outcome impact `Not measurable`; use process,
  quality, support, and experience evidence only as interim learning.
- **Workflow changed during the window:** close the old observation period,
  record the change identity, and re-test before comparing results.
- **Fictional fixture:** say `fictional fixture` in the example and identify
  every result as illustrative. Never call it a user session, customer result,
  benchmark, production trace, or adoption proof.

## Final check

- [ ] The workflow, owner, intended users, tested scope, and work moment are
  named or marked `Not provided`.
- [ ] The first introduction is limited enough for the stated support and
  approval coverage.
- [ ] Access, one-time use, repeated useful behavior, quality, overrides,
  exceptions, support, experience, and outcome are separate.
- [ ] Baseline, denominator, comparison, freshness, evidence owner, and review
  cadence are present or explicitly missing.
- [ ] Manual fallback, escalation, stop condition, and change authority are
  visible.
- [ ] The recommendation has a condition and a named decision owner.
- [ ] No demo, announcement, usage count, fixture, or pilot note is presented
  as adoption, causality, safety, production readiness, or value proof.
- [ ] The output ends with evidence boundaries and a next action, not a generic
  summary.

---
name: pm-ai-workflow-to-readiness
description: Decide whether one real AI workflow candidate is ready to test now, needs more validation, should be sequenced later, or should be avoided for now. Use the supplied job, owner, value, complexity, risk, dependencies, user and technical readiness, human boundary, support, and smallest-test evidence without inventing adoption, value, safety, or production claims.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Workflow to Readiness

Use this skill before building or piloting one concrete AI workflow. It turns
the workflow's evidence and missing prerequisites into one bounded readiness
route: `Test now`, `Validate further`, `Sequence later`, or `Avoid for now`.
The result is a review packet, not an approval, rollout, model evaluation, or
proof that the workflow will create value.

## When to use

Use it when:

- a PM or workflow owner has one plausible AI workflow and needs a pre-test
  decision;
- a team is moving from a problem statement or demo toward a representative
  test and needs to check owner, inputs, access, controls, and support first;
- an AI Activator needs to make the user job, dependencies, human boundary,
  smallest test, and stop conditions visible;
- a promising workflow is being compared with other work and the question is
  whether this specific candidate is feasible and ready for attention now;
- a reviewer needs a dated, evidence-bounded reason to test, gather evidence,
  defer, or stop.

Use `pm-opportunity-to-bet` when the main decision is which opportunity to
choose from a set. Use `pm-ai-evaluation-plan` when readiness is sufficient and
the main job is to design a paired quality, safety, or outcome test. Use
`pm-ai-workflow-to-scale` after a test, validation, or pilot when the decision
is exposure or maturity. Use `pm-ai-workflow-to-package` after a workflow has
been tested and the job is to make it repeatable for another person or team.

## Do not use

Do not use this skill to:

- rank a portfolio, manufacture a market estimate, calculate an ungrounded
  priority score, or declare a roadmap commitment;
- call a workflow valuable, adopted, safe, reliable, production-ready, or
  successful from a proposal, demo, benchmark, request, download, star, or
  one favorable trace;
- approve a budget, grant access, change a model or policy, deploy, send,
  create a ticket, or start an external action automatically;
- replace security, privacy, legal, safety, accessibility, reliability,
  finance, data-governance, or change-management review;
- hide missing owner, source, permission, fallback, reviewer, capacity, or
  outcome evidence inside a score;
- expose customer data, credentials, private URLs, raw traces, proprietary
  prompts, or provider secrets in a public packet.

Write `Not provided`, `Not verified`, `Not run`, `Unknown`, `Need evidence`,
`Blocked`, and `Not covered` when the input does not support a stronger claim.

## Readiness boundary

Readiness means that the workflow has enough named context and control to
justify the next learning action. It does not mean the workflow is good.

Keep these layers separate:

| Layer | It may establish | It cannot establish by itself |
| --- | --- | --- |
| `workflow_context` | who has what job, trigger, workaround, and boundary | demand, value, or quality |
| `feasibility` | whether inputs, access, tools, dependencies, and support can be named | that the AI output is correct |
| `user_readiness` | whether eligible users, owner, and reviewer can participate | that users will adopt or benefit |
| `technical_readiness` | whether a bounded test environment and version can be described | reliability in production |
| `human_control` | where a person stops, checks, edits, approves, or escalates | that review prevents every error |
| `testability` | whether a smallest representative test and receipt can be defined | a test result or outcome |
| `readiness_route` | what to do next under the supplied evidence | execution, value, safety, adoption, or scale |

Do not use a weighted score to turn a missing critical prerequisite into a
pass. A decisive unknown stays visible and can route the candidate to
`Validate further`, `Sequence later`, or `Avoid for now`.

## Workflow

### 1. Frame one workflow candidate

Write one sentence:

> For `[eligible user]` trying to complete `[job]` in `[context]`, decide
> whether `[workflow]` is ready for `[smallest test]` under `[human, access,
> risk, support, and evidence boundary]`.

Capture:

| Field | Question |
| --- | --- |
| `workflow_id/version` | What exact workflow, source, model, prompt, tool, policy, or UI is being considered? |
| `user_job` | What must the person or team complete, and what is the current workaround? |
| `eligible_users` | Who may participate, and who must be excluded? |
| `owner` | Who is accountable for the workflow, decision, review, and fallback? |
| `trigger/frequency` | When does the job occur, and how repeatable is it? |
| `value_hypothesis` | What progress might matter, and what evidence is still missing? |
| `complexity/risk` | What makes the workflow hard, consequential, sensitive, or easy to misuse? |
| `decision_date` | When was the evidence reviewed, and when should it be rechecked? |

If the job, owner, or accountable reviewer is missing, do not route directly to
`Test now`.

### 2. Map the readiness signals

Review each dimension as `Ready`, `Partial`, `Missing`, `Blocked`, `Not run`,
or `Not provided`. Cite the supplied source, owner, date, or receipt for every
material assertion.

| Dimension | Minimum question |
| --- | --- |
| User/job | Is the job concrete enough to observe, and is the workaround visible? |
| Owner | Is one person or team accountable for approval, review, support, and stop? |
| Value | Is there a stated progress hypothesis without pretending it is measured value? |
| Repeatability | Does the job recur often enough, or have a defined representative slice? |
| Complexity/risk | Are edge cases, sensitivity, consequence, and misuse risks named? |
| Inputs/sources | Are allowed inputs, source authority, freshness, and redaction rules known? |
| Access/dependencies | Are tools, permissions, approvals, integrations, and upstream dependencies available or explicitly blocked? |
| User readiness | Can eligible users participate, review, and give a meaningful receipt? |
| Technical readiness | Can the exact version, environment, test boundary, and failure path be held stable enough to learn? |
| Human boundary | Is it clear what AI may draft/recommend/do and what a person must check, approve, or reject? |
| Support/maintenance | Is support, incident handling, update authority, and fallback named? |
| Testability | Is the smallest representative test, oracle/receipt, duration, and stop rule defined? |

### 3. Resolve blockers before routing

Treat these as critical until an owner supplies evidence:

- no accountable owner or reviewer;
- no legitimate input/source access or unresolved sensitive-data boundary;
- no safe human boundary for a consequential decision or external action;
- no manual fallback, escalation path, or stop condition;
- no representative user/job slice or no observable receipt;
- a dependency, approval, support, or environment requirement is blocked;
- the requested exposure is broader than the test boundary.

For each gap, write the smallest receipt that could resolve it, the evidence
owner, the due/recheck date, and what happens if it remains missing. Do not
call an absent receipt `Ready` because the workflow sounds simple.

### 4. Define the smallest safe test

Only propose `Test now` when a human-owned, reversible test can be described.
State:

- one user/job slice and who is excluded;
- the current alternative and the candidate workflow version;
- allowed inputs, source authority, access, permissions, and redaction;
- test owner, reviewer, participants, duration, environment, and change limit;
- what the AI may produce and what it must not do;
- representative positive, negative, ambiguous, and abstain cases;
- receipt/oracle: what a reviewer records for each eligible unit;
- success signal, uncertainty signal, cost/latency status if supplied, and
  stop/escalate conditions;
- manual fallback, rollback/containment, and the next review date.

`Not run` is the correct status before the test actually happens. A proposed
test is not an evaluation result or an outcome claim.

### 5. Choose one route

Use the route supported by the weakest material prerequisite, not by overall
enthusiasm.

| Route | Use when | Required next receipt |
| --- | --- | --- |
| `Test now` | owner, job, access, human boundary, support/fallback, representative slice, and smallest test are sufficiently defined | test record with scope, reviewer, cases, stop rule, and dated receipt |
| `Validate further` | the workflow may be testable, but one or more recoverable readiness signals are missing or partial | named evidence owner, missing receipt, recheck trigger, and safe interim route |
| `Sequence later` | the job may matter, but timing, dependency, capacity, user readiness, or opportunity cost makes a near-term test a poor next move | reopen condition, dependency owner, and review date |
| `Avoid for now` | no accountable owner, no legitimate access, no safe human boundary, unacceptable risk, or no credible way to observe the job | explicit stop reason, fallback/alternative, and authority for reconsideration |

Do not use `Test now` as a synonym for approval. The route only authorizes a
bounded learning action after the responsible owner confirms the boundary.

### 6. Write claims and limits

For every claim, record literal statement, status (`Observed`, `Reported`,
`Proposed`, `Measured`, `Unknown`), scope, source/method, date/version,
denominator if relevant, limitation, and next receipt. Keep these statements
separate:

- `Readiness route: proposed` — a recommendation from supplied evidence;
- `Test: not run` — no execution receipt exists;
- `Outcome: not measured` — no accepted user/job outcome is established;
- `Adoption: not measured` — repeated voluntary use is not established;
- `Production: not verified` — runtime, operations, and release evidence are
  outside this packet.

### 7. Handoff without execution

Give the accountable owner one smallest next action, the surfaces and source
checks involved, the evidence to collect, the fallback, and the follow-on
skill. The skill is tool-free: it does not call a model, browse a private
source, grant permission, run the test, or change an external system.

## Output contract

Return these sections in order. Preserve missingness instead of smoothing it
over.

## Decision on the desk

State decision owner, eligible user/job, current workaround, candidate
workflow/version, proposed test boundary, decision date, and the evidence that
could change the route.

## Workflow candidate

Use a table for `workflow_id/version`, trigger/frequency, users, owner, inputs,
sources, dependencies, value hypothesis, complexity, risk, human boundary,
support, fallback, and evidence status.

## Readiness map

List every readiness dimension with status, evidence/source, limitation, gap
owner, and next receipt. Keep `Missing`, `Blocked`, and `Not run` distinct.

## Route

Return exactly one of `Test now`, `Validate further`, `Sequence later`, or
`Avoid for now`, followed by the decisive signals, unresolved blockers, and
why the other routes are not currently better supported.

## Smallest safe test or recovery

For `Test now`, define scope, participants, version, allowed inputs, cases,
reviewer, receipt/oracle, duration, stop rule, fallback, and review date. For
other routes, define the smallest evidence, dependency, sequencing condition,
or safe alternative that changes the decision.

## Claims ledger

Use a table with claim, status, scope/unit, source/method, date/version,
limitation, and next receipt. Do not make an unmeasured value, adoption,
quality, safety, or production claim.

## Human control and support

State what AI may draft/recommend/do, what a person must check/approve/reject,
when to stop/ask/escalate, who supports the work, and the manual fallback.

## Implementation handoff

Name the owner, smallest authorized next action, affected surfaces, source and
privacy review, acceptance/evidence receipt, writeback location, and follow-on
skill. Do not imply that the action was executed.

## Not covered

List unsupported market size, demand, business value, ROI, adoption, traffic,
stars, quality, model performance, safety, privacy, security, accessibility,
localization, cost, latency, reliability, production readiness, rollout,
rollback execution, or causal impact.

## Review ask

Ask the reviewer to choose exactly one: `Test now`, `Validate further`,
`Sequence later`, or `Avoid for now`. Name the one unresolved evidence or risk
that should be corrected before the route changes.

## Edge cases

- **Missing owner:** route to `Validate further` or `Avoid for now`; do not
  infer accountability from the requester.
- **Missing access or approval:** keep the workflow untested and name the
  legitimate owner and permission receipt; never suggest bypassing controls.
- **High-impact or external action:** require narrow exposure, explicit human
  approval, visible fallback, stop/escalation behavior, and a reviewable
  receipt before `Test now`.
- **No repeated workflow:** a one-off job can still be tested only if the
  representative case, oracle, reviewer, and learning purpose are explicit;
  do not call it repeatable or valuable.
- **Conflicting signals:** preserve the contexts and route to `Validate
  further` or `Sequence later` with a tie-break receipt.
- **Synthetic or fictional input:** label the entire output `fictional
  fixture`; it can exercise the packet but cannot establish a real decision,
  value, adoption, or growth claim.
- **Provider/model/tool change:** route to a change-aware evaluation and
  revalidation plan; readiness does not replace paired testing.
- **Unsafe or unobservable job:** route to `Avoid for now` and state the human
  or manual alternative. Do not convert uncertainty into a green light.
- **Question asks for stars, traffic, or growth:** keep those claims outside
  the workflow decision and mark them `Not measured` or `Not covered`.

## Final check

Before handoff, confirm:

- [ ] one workflow candidate, user/job, owner, and decision date are explicit;
- [ ] current workaround, value hypothesis, complexity, and risk are separated;
- [ ] inputs, sources, permissions, dependencies, support, and fallback are named;
- [ ] user readiness, technical readiness, human boundary, and testability are separate;
- [ ] missing and blocked evidence is not hidden in a score;
- [ ] exactly one of the four readiness routes is selected;
- [ ] `Test now` has a bounded representative test and stop rule, or another route has a recovery condition;
- [ ] every material claim has status, scope, source/method, limitation, and next receipt;
- [ ] no adoption, value, safety, quality, production, or growth claim outruns evidence;
- [ ] human owner, support path, and manual fallback are visible;
- [ ] unsupported surfaces are listed under `Not covered`.

## Source notes

This skill's readiness framing is informed by the official OpenAI Academy
materials on [AI use-case discovery and prioritization](https://academy.openai.com/public/clubs/champions-ecqup/resources/ai-use-case-discovery-and-prioritizer-2026-05-07),
the [AI workflow starter worksheet](https://academy.openai.com/en/public/clubs/champions-ecqup/resources/ai-workflow-starter-worksheet-2026-07-07),
[Activator Labs foundations](https://academy.openai.com/public/clubs/champions-ecqup/videos/recording-activator-labs-101-foundations-2026-07-23),
and [Getting Started as an Agent Activator](https://academy.openai.com/public/clubs/champions-ecqup/resources/getting-started-as-an-ai-activator-2026-06-08).
The source material is guidance, not evidence that any particular workflow is
ready, safe, valuable, or adopted.

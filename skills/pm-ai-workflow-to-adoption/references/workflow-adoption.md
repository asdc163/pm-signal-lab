# Workflow adoption reference

Use this reference when a tested AI workflow is moving from a private test to
its first team introduction. The useful output is a small operating plan that
someone can review. It is not a launch announcement and it is not an adoption
score.

## When to use

Load this reference when the team needs to answer:

- Where will the workflow fit into work that already happens?
- Who owns the introduction, support, approval, and stop decision?
- What practice will help people use it without hiding its limits?
- Which observations distinguish access, repeated useful behavior, quality,
  support burden, experience, and downstream outcome?
- When will the team review the evidence and change the workflow?

## Workflow adoption is a work-pattern question

OpenAI Academy's [Workflow adoption planner](https://academy.openai.com/public/clubs/champions-ecqup/resources/workflow-adoption-planner-2026-07-07)
frames the job as introducing a tested workflow, gathering evidence from real
use, and recommending what happens next. Its practical checks are narrow:
connect the workflow to a team rhythm, start with a limited introduction,
measure repeated useful behavior rather than access, track quality and
overrides, keep support and fallback visible, and define who can approve the
next step.

That means an adoption plan should begin with a place in the work, not a
message about the technology. A support queue, handoff, weekly review, or
recurring report gives the team a moment to observe. "Everyone can try it" does
not.

## Minimum plan

Fill these fields before proposing a broader introduction:

| Field | What to write | If missing |
| --- | --- | --- |
| Workflow and owner | The job, the accountable person, and the artifact carried forward from testing | `Not provided`; do not invent ownership |
| Intended users | Role or bounded group, with the reason they need the workflow | narrow the scope |
| Tested scope | Cases, quality bar, known misses, and test date | `introduction_status: blocked` |
| Team rhythm | Existing meeting, queue, handoff, or recurring task | do not recommend rollout |
| Moment of use | Trigger, workflow action, human check, next step | write one concrete example |
| Access and approval | Who can use it and who approves high-impact actions | `support_status: not_ready` |
| Support and fallback | Help route, escalation owner, manual completion path | `Pause` for high-impact work |
| Evidence owner | Person who collects and reviews the evidence | assign before introduction |
| Review cadence | Date or recurring interval, not "monitor regularly" | choose a fixed window |
| Next decision | Continue, Revise, Pause, Stop, or Consider broader use | `Continue` with evidence pending |

## Evidence ledger

Use one row per evidence slice. Do not collapse the rows into a single number
without a supplied denominator and decision rule.

| Slice | Example source | What the source can answer | Boundary |
| --- | --- | --- | --- |
| Reach | access log or invitation list | who could see the workflow | not adoption |
| Repeat use | workflow records by role and window | whether a role returned for the named job | not usefulness by itself |
| Useful behavior | accepted artifact, completed handoff, or human confirmation | whether the workflow helped the intended work | not broad value |
| Quality | reviewed task sample against a named rubric | whether the output met the bar on that slice | not general model quality |
| Overrides | edits, rejection reasons, or bypass notes | where the workflow needed human correction | reason may be unknown |
| Exceptions | fallback, escalation, or out-of-scope route | where the normal path broke | severity needs context |
| Support | questions, response time, manual work, escalation queue | whether the introduction is supportable | not ROI alone |
| Experience | observed hesitation, confusion, delay, or trust question | what blocks use | not a satisfaction survey unless one exists |
| Outcome | named downstream measure with baseline and comparison | whether the intended result moved | not causality without design |

For each row, add `source`, `owner`, `window`, `denominator_or_frame`,
`freshness`, `status`, and `decision_use`. If a field is absent, write the
evidence label instead of estimating it.

## Support and change loop

Use this loop for every introduction:

1. A teammate records a useful result, correction, exception, support request,
   or failed handoff.
2. The owner keeps the original evidence and classifies the observation. A
   correction might belong to instructions, context, retrieval, a tool,
   permission, policy, model, data, workflow, or interface.
3. The approver decides whether the change is allowed during the current
   window. High-impact or external changes wait for explicit approval.
4. The owner updates one bounded test case or re-test slice. A changed workflow
   does not silently enter the same comparison window.
5. The next review records whether the introduction continues, changes, pauses,
   stops, or earns a larger audience.

Keep the feedback log privacy-safe. Do not paste secrets, private customer
content, or identifiers into a public issue or example.

## Recommendation rules

Use the recommendation with the least stretch from the available evidence:

- **Continue:** the first introduction is supportable, limits are visible, and
  the next review can collect more evidence.
- **Revise:** a bounded workflow, enablement, support, or experience gap is
  recurring and has an owner for the change and re-test.
- **Pause:** an approval, source, privacy, security, support, or human-control
  condition is unresolved.
- **Stop:** the workflow has weak useful outcomes, unacceptable risk, or a
  burden the team cannot carry.
- **Consider broader use:** the named scope has stable outcomes, quality,
  safeguards, support, ownership, and approval. State the new audience and new
  evidence gap. This is a proposal, not a production certification.

## Source notes

The following official material informed this reference:

- [OpenAI Academy: Workflow adoption planner](https://academy.openai.com/public/clubs/champions-ecqup/resources/workflow-adoption-planner-2026-07-07)
  (July 8, 2026): limited introduction, repeated useful behavior, support,
  feedback-to-change, review cadence, and next-decision rules.
- [OpenAI: Introducing OpenAI Presence](https://openai.com/index/introducing-openai-presence/)
  (July 22, 2026): specific jobs, minimum required access, policies,
  escalation, production sessions, and approved improvement changes.
- [OpenAI: How Endava is redesigning software delivery around AI agents](https://openai.com/index/endava-frontiers/)
  (June 4, 2026): adoption as behavior change, leaders using the workflow,
  hands-on practice, and bringing non-technical teams in early.
- [OpenAI: How to manage AI investments in the agentic era](https://openai.com/index/managing-ai-investments-in-agentic-era/)
  (July 14, 2026): useful work per dollar, maturity-based funding, governance,
  proven demand, capacity, and support before scale.

## Fictional worked fixture

The support-draft scenario in `examples/first-run.md` is a **fictional fixture**.
It demonstrates how to keep a workflow at a limited introduction
when a draft looks promising but accepted outcomes, negative slices, support
capacity, and a baseline are not available.

## Not covered

This reference does not verify live adoption, user satisfaction, causal impact,
production reliability, safety, privacy compliance, security, accessibility,
localization, or organizational change outcomes. It does not call a model,
read a telemetry system, send an announcement, provision access, change a
feature flag, or approve a rollout.

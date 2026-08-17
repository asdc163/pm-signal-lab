# First run: support-draft introduction

This is a **fictional fixture** for a support-draft workflow. It is not a user
study, production trace, adoption result, or benchmark.

## Request

> We tested an AI-assisted support-draft workflow with a small internal group.
> The drafts looked useful. Can we introduce it to the whole support team next
> week and call the launch successful?

## Inputs supplied

- Workflow: AI-assisted support drafting for low-risk English email replies.
- Owner: Support operations lead, name not provided.
- Intended users: Support agents, group size not provided.
- Tested scope: Fictional 20-case internal review. The fixture says 16 drafts
  were accepted after edits and 4 were rejected, but it does not include the
  rubric, case mix, reviewer identity, or source freshness.
- Desired outcome: Reduce time spent preparing routine replies while keeping a
  human check before sending.
- Proposed rollout: whole support team next week.
- Support route: not provided.
- Manual fallback: agents can continue writing replies without the workflow.
- Baseline: not provided.
- Live telemetry or customer data: not provided.

## Adoption Evidence Plan

### Decision in one line

**Pilot**, expressed here as `Continue` with a narrower introduction. Do not
call the launch successful yet. Review a low-risk English email slice with a
named owner and a fixed window.

### Workflow carried forward

- **Job:** help an agent prepare a routine email draft.
- **Human ownership:** an agent checks the source, policy, tone, and required
  action before sending.
- **Test evidence:** 16 accepted after edits and 4 rejected in the supplied
  fictional review.
- **Quality bar:** not provided. The 16/20 fixture count cannot be used as a
  quality rate without the rubric, eligible cases, and reviewer agreement.
- **Known limit:** no evidence covers high-risk cases, non-English replies,
  difficult policy exceptions, or live customer impact.
- **Fallback:** manual drafting remains available, but the support route and
  stop owner are not provided.

### First introduction

- **Initial users:** one named support pod or a bounded role group, not the
  whole team.
- **Team rhythm:** the existing daily queue review, if the support lead
  confirms it. `Not provided` until confirmed.
- **Moment of use:** after the agent identifies a low-risk email case and before
  any reply is sent.
- **Window:** one fixed observation period ending on a named review date.
  `Not provided` in this fixture.
- **Approval:** the agent owns the final send; the support lead owns the pilot
  stop decision. Names and policy confirmation are `Not provided`.
- **Why this slice:** it keeps external impact low and makes human review
  visible while the team learns where the workflow helps or creates work.

### Introduction message

> Try the draft only for the agreed low-risk English email slice. Check the
> source, policy, customer-specific facts, and next action before sending. Edit
> or reject the draft when it is incomplete or uncertain. Use the manual path
> for anything outside the slice, and record the reason in the pilot note.

### Practice and enablement

1. Pair one agent with the support lead for the first few cases.
2. Review one accepted draft and one rejected draft against a written rubric.
3. Add the fallback route and stop owner to the queue handoff.

Completion of this practice is not adoption evidence. The evidence is whether
agents return to the workflow for the named job and whether the work remains
acceptable after human review.

### Support and recovery

- Support owner: `Not provided`.
- Escalation route: `Not provided`.
- Manual fallback: continue drafting manually.
- Stop condition: pause the introduction if a policy, privacy, customer-fact,
  or high-risk case reaches the workflow without a clear human review path.
- Required before broader use: named support coverage, rubric, case slices,
  privacy/security review, negative cases, baseline, and a review date.

### Evidence plan

| Slice | Receipt to collect | Status |
| --- | --- | --- |
| Reach | eligible agents and who could access the workflow | `Not measured` |
| Repeat use | returning agents and eligible low-risk cases during the window | `Not measured` |
| Useful behavior | agent accepted a reviewed draft and sent the intended reply | `Not measured` |
| Quality | reviewed sample by case type against a named rubric | `Not provided` |
| Overrides | edits, rejection reasons, and bypasses | `Not measured` |
| Exceptions | high-risk, policy, missing-fact, or fallback cases | `Not measured` |
| Support | questions, manual work, escalations, and response time | `Not measured` |
| Experience | observed hesitation, confusion, or extra checking | `Not measured` |
| Outcome | reply preparation time with a comparable baseline | `Not measurable` until baseline exists |

The fixture's `16 accepted / 20 reviewed` is illustrative shape only. It does
not establish a quality rate, adoption, customer outcome, or causality.

### Feedback-to-change loop

- Agents record one short note for an accepted, edited, rejected, bypassed, or
  escalated draft.
- The support lead classifies the note as instruction, context/source, policy,
  workflow, interface, or unknown.
- A proposed change stays in the pilot backlog until the owner approves it and
  a new low-risk case slice is re-tested.
- Review the notes at the end of the fixed window. Do not compare a changed
  workflow with the old window without recording the change.

### Next-decision rules

- **Continue** if the slice is supportable, human review is working, and more
  real-use evidence is needed.
- **Revise** if a repeated, bounded draft or support problem has an owner and a
  re-test.
- **Pause** if the support owner, review path, policy boundary, or source is
  unresolved.
- **Stop** if the workflow adds unacceptable risk or manual burden without a
  useful outcome.
- **Consider broader use** only after the named slice has stable quality,
  support, ownership, safeguards, and a baseline-backed outcome signal.

## Not covered

This **fictional fixture** does not verify live model behavior, support-team
adoption, customer satisfaction, reply quality, time saved, causality,
production reliability, privacy, security, accessibility, localization, or
rollout readiness. No provider, telemetry system, customer record, or external
user was accessed.

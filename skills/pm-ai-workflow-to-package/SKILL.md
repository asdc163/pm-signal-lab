---
name: pm-ai-workflow-to-package
description: Turn a tested AI workflow into an evidence-bounded operating package that another person can repeat, review, support, maintain, change, or retire without overstating adoption, value, safety, or production readiness.
---

# PM AI Workflow to Package

The package is the workflow, not a success story. A useful handoff makes the
job, inputs, repeatable steps, human checks, owner, support route, fallback,
evidence boundary, and change protocol visible to the next person.

## When to use

Use this skill when:

- a workflow has been tested in real or explicitly bounded work and another
  person needs to understand, repeat, support, or maintain it;
- a prompt, skill, template, checklist, SOP, agent instruction, or source
  recipe needs to be packaged with the surrounding human work;
- a PM needs to separate the before/after work path from evidence of adoption,
  efficiency, quality, safety, team outcome, or production readiness;
- a workflow owner needs a limited-share, revise, hold, or retire decision
  before introducing the workflow to another team.

Do not call a package complete because it is well written. The package must
show what another person can repeat and what still needs an owner or receipt.

## Do not use

Choose a different skill when the main job is:

- choose or test an unproven opportunity: use `pm-opportunity-to-bet` or
  `pm-source-to-test`;
- introduce one tested workflow to a team and measure repeated useful behavior:
  use `pm-ai-workflow-to-adoption`;
- package a capability for an Agent Skills-compatible client: use
  `pm-ai-skill-to-package`;
- decide whether one workflow deserves more exposure: use
  `pm-ai-workflow-to-scale`;
- build the economic case for one workflow: use `pm-ai-value-to-investment`;
- evaluate model output, safety, or a release claim: use the matching
  evaluation, oversight, or release skill.

## Working rule

Keep these layers separate:

| Layer | What it answers | Do not infer |
| --- | --- | --- |
| `workflow_recipe` | Can another person follow the inputs and steps? | that they will choose to use it |
| `human_control` | What must a person verify, edit, approve, or decide? | that review prevents every error |
| `operating_support` | Who maintains it, handles failure, and updates it? | that support capacity exists |
| `evidence` | What changed, for whom, when, and how was it observed? | that a correlation is causal value |
| `adoption` | Is it part of repeated real work? | that a package or download is adoption |
| `production_readiness` | Are runtime, permissions, security, reliability, and rollout proven? | that a repeatable document is production-ready |

Use evidence labels exactly: `Measured`, `Observed`, `Reported`, `Estimated`,
`Planned`, or `Unknown`. A source, unit, period, collection method, scope or
denominator, and limitation should accompany each material claim. Use `Not
provided`, `Not measured`, `Not verified`, `Not run`, `Not estimable`, and `Not
covered` rather than filling gaps with plausible language.

## Workflow

### 1. Confirm the package candidate

Record:

- `workflow_id`, purpose, user/job, affected team, intended first users, and
  the decision the package should support;
- the before state and after state, with the boundary of what actually changed;
- what was tested, the source and date, the quality bar, and the evidence
  status; keep an idea at `Explore` or `Hold` rather than upgrading it;
- the reusable asset: prompt, skill, agent instruction, template, checklist,
  SOP, example, or source recipe;
- owner, maintainer, support route, fallback, known limits, unsafe uses,
  update authority, and retirement authority.

If the workflow has not been tested or the owner is unknown, say so. A package
can still be a `Revise` or `Limited share` artifact, but it is not a proven
operating model.

### 2. Define who should use it and when

State the narrow first job, role, team, trigger, required context, and stop
boundary. Include:

- who is eligible and who is not;
- what inputs and sources are allowed, current, approved, or redacted;
- what the workflow does and does not do;
- which parts are reusable and which must be customized for another team;
- what a successful work unit means, if it is supplied, without inventing a
  business value claim.

Do not turn `anyone`, `all cases`, or `works for every team` into an audience
definition.

### 3. Describe the repeatable path

Write a person-followable path in order:

1. prepare the allowed inputs and confirm source freshness;
2. invoke or apply the reusable asset with its version and prerequisites;
3. inspect output, uncertainty, missing context, and exceptions;
4. edit, approve, reject, escalate, or stop at the named human boundary;
5. record the completion receipt, correction, fallback, or unresolved issue.

For each step, name the actor, input, output, decision, evidence receipt, and
failure route. If a step requires a connector, credential, sensitive source,
or external action, mark the permission and runtime boundary instead of
pretending the package executes it.

### 4. Build the evidence and claim ledger

For each before/after or outcome statement, record:

| Field | Required treatment |
| --- | --- |
| Claim | literal statement, not a slogan |
| Status | `Measured`, `Observed`, `Reported`, `Estimated`, `Planned`, or `Unknown` |
| Unit/scope | task, case, person, team, period, or artifact covered |
| Baseline/comparison | previous process, control, or `Not provided` |
| Source/method | timestamp, workflow record, review, interview, or `Not provided` |
| Limitation | alternative explanation, missing denominator, or freshness gap |
| Next receipt | smallest evidence that could strengthen or weaken the claim |

Usage, downloads, attendance, positive reactions, and stated intent may show
exposure or interest. They do not by themselves show adoption, useful outcome,
quality, or value. A package example is a fixture, not a measurement.

### 5. Add human review, support, and fallback

Name what a person must verify, edit, approve, or decide before the result is
shared or an action is taken. Define:

- review rubric or checklist and the cases that must abstain;
- escalation destination, expected response, and what is preserved;
- manual fallback and the point where the workflow stops rather than retries;
- owner and maintainer, support route, update protocol, and review cadence;
- sensitive data, access, privacy, legal, safety, and compliance questions that
  remain outside the package.

Do not label a review checkbox as a safety guarantee or a support contact as
available capacity.

### 6. Version the package and its change boundary

Record package version, source/asset versions, approved changes, reviewer,
effective date, compatibility assumptions, rollback or previous version, and
the receipt that allows a new team or adjacent job to reuse it. If a source,
prompt, model, policy, tool, or workflow step changes, route the package back
to `Revise`, `Hold`, or a new test until the affected boundary is checked.

Retirement needs a reason, owner, affected users, replacement or fallback, data
retention/deletion question, and a final status. Never hide a stale package by
silently editing its claims.

### 7. Choose the route

- **`Package`:** the repeat path, reusable asset, human review, owner,
  support/fallback, version boundary, and evidence limitations are present for
  the named first job.
- **`Limited share`:** another person may inspect or try the narrow package,
  but one or more owner, support, review, permission, or evidence receipts are
  still missing. State the audience and stop boundary.
- **`Revise`:** the workflow may be useful, but the package cannot be repeated
  or reviewed because an element is unclear or contradictory.
- **`Hold`:** the workflow has no adequate real-work test, authority, source,
  owner, permission, or fallback for the requested sharing scope.
- **`Retire`:** the job, asset, source, owner, support path, or risk boundary
  no longer justifies keeping the package active; preserve the decision and
  replacement/fallback note.

Each route must include entry condition, next learning job, exit receipt, owner,
review date or `Not provided`, and failure/recovery route. `Package` does not
mean adopted, valuable, safe in every case, or production-ready.

## Output contract

Return an **AI Workflow Operating Package** with these sections, in order:

1. **Decision in one line:** route, first user/job, package boundary, owner,
   and the strongest current evidence label.
2. **Package summary:** workflow ID, purpose, maturity, before/after, tested
   scope, and supported versus unsupported claims.
3. **Who should use it and when:** eligible role, trigger, first team, required
   context, exclusions, and customization points.
4. **Required inputs and approved sources:** input schema, source authority,
   freshness, permissions, redaction, approved tools, and missing receipts.
5. **How to repeat it:** numbered preparation, reusable asset, steps,
   completion receipt, and failure/fallback path.
6. **Human review and approval:** review rubric, edit/approve/reject/escalate
   choices, exception slices, and side-effect boundary.
7. **Evidence and supported claims:** claim ledger with source, unit, period,
   method, label, limitation, and next receipt.
8. **Support and manual fallback:** owner, maintainer, help route, response
   expectation, manual route, stop condition, and unresolved capacity.
9. **Change, version, and retirement protocol:** version fields, approval,
   re-test trigger, rollback/previous version, review cadence, and retirement.
10. **Suggested first-team introduction:** a factual, narrow message with no
    adoption, ROI, safety, or production promise.
11. **Next decision:** route-specific exit receipt, reviewer, date, and failure
    route.
12. **Not covered:** every missing adoption, value, causality, security,
    privacy, compliance, accessibility, localization, runtime, or production
    claim.

## States and recovery

Use these states when the package is incomplete:

| State | Entry condition | User-visible meaning | Recovery |
| --- | --- | --- | --- |
| `Draft` | enough workflow context to start | package is being assembled | request missing fields |
| `Needs evidence` | claim, source, baseline, or scope is unclear | do not present the claim as measured | add source/label or narrow claim |
| `Needs owner` | maintainer, support, or approval authority is missing | sharing is constrained | assign owner or choose `Hold` |
| `Needs review` | human check or exception route is missing | output cannot be approved yet | add rubric/fallback or stop |
| `Limited share` | narrow inspection or trial is possible | scope and missing receipts are explicit | collect receipt, revise, or hold |
| `Packaged` | required repeatability and control fields are present | package can be handed off for its named scope | monitor changes; do not infer adoption |
| `Retired` | job, asset, owner, or boundary is no longer viable | package should not be used | preserve replacement/fallback note |

If a user supplies a new team, source, model, policy, or side-effect action,
preserve the old package version and create a customization/re-test boundary.
Do not silently expand scope.

## Edge cases

- **Only a prompt or final output is supplied:** mark the package incomplete;
  request the human steps, review, inputs, owner, and fallback.
- **The workflow worked once:** keep it `Needs evidence`, `Limited share`, or
  `Hold`; one successful run is not repeatability or adoption.
- **The owner says “anyone can use it”:** ask for an eligible role, first job,
  source permission, review duty, and support route.
- **Evidence says “saved time”:** request baseline, unit, period, method,
  rework, and alternative explanations; otherwise label it `Reported`,
  `Estimated`, or `Unknown`.
- **A source changes:** mark freshness and version, preserve the prior package,
  and route affected claims or steps to re-test.
- **Another team requests the package:** produce customization fields and a
  limited first job; do not imply transferability from the original fixture.
- **A package includes sensitive data or an external action:** stop at the
  permission, approval, and manual fallback boundary; do not connect or act.
- **The package is popular but unsupported:** interest is a leading signal;
  keep unsupported claims visible and do not move to `Packaged` without the
  repeatability and ownership receipts.
- **Fictional fixture:** say `fictional fixture` and state that its route,
  evidence, ownership, adoption, value, safety, and production readiness are
  illustrative only. Never call it a user study or live workflow result.

## Final check

- [ ] The named user, job, first team, trigger, exclusions, and customization
  boundary are explicit.
- [ ] Before/after is separate from adoption, value, quality, safety, and
  production claims.
- [ ] Inputs, sources, freshness, permissions, redaction, tools, and versions
  are explicit or marked missing.
- [ ] Another person could follow the repeat path without the original builder
  filling in hidden steps.
- [ ] Human review, exception, escalation, support, manual fallback, owner,
  stop condition, and capacity are visible.
- [ ] Every material claim has a status label, source/method, scope or unit,
  period/baseline where relevant, limitation, and next receipt.
- [ ] Change, version, re-test, rollback/previous version, and retirement rules
  are present.
- [ ] The route is one of `Package`, `Limited share`, `Revise`, `Hold`, or
  `Retire`, with entry/exit evidence and a failure route.
- [ ] The package does not claim adoption, ROI, causality, universal safety,
  or production readiness from a fixture, demo, download, or intention.
- [ ] The brief ends with `Not covered` and the next decision, not a generic
  success story.

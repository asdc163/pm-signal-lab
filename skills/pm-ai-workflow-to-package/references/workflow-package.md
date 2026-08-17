# AI workflow operating package reference

This reference is a **fictional fixture** field guide for turning a tested AI
workflow into a repeatable operating package. It is provider-neutral and does
not execute a model, connector, workflow, approval, or external action.

## Source mapping

[OpenAI Academy's AI workflow packager](https://academy.openai.com/en/public/clubs/champions-ecqup/resources/ai-workflow-packager-2026-07-07)
describes a reusable operating package for a tested workflow: who should use
it, how to run it, what to review, what evidence supports it, where to get help,
who maintains it, and which claims are not yet supported. Its guidance names
the reusable asset, human review, owner, support, fallback, update, review, and
retirement elements.

[OpenAI Academy's evidence-of-value guidance](https://academy.openai.com/public/clubs/champions-ecqup/resources/gather-appropriate-evidence-of-value-2026-07-17)
separates adoption, efficiency, quality, safe operation, and team outcome. It
asks the PM to preserve baseline, unit, period, method, scope, and limitations;
it also distinguishes measured, observed, reported, estimated, planned, and
unknown evidence.

[OpenAI Presence](https://openai.com/index/introducing-openai-presence/)
describes a production-agent operating layer with policies, standard operating
procedures, guardrails, approved actions, simulations, evaluation, escalation,
and controlled improvement. Use those as a design reference for boundaries,
not as evidence that a local package is production-ready or that a provider is
approved for the user's context.

[OpenAI's AI investment guidance](https://openai.com/index/managing-ai-investments-in-agentic-era/)
connects repeatable workflows with governance, capacity, demand, and support.
It supports asking whether a package can be maintained and funded at its named
scope; it does not turn a reusable document into a business case.

## Package layers

| Layer | Minimum receipt | Common false leap |
| --- | --- | --- |
| Workflow recipe | a second person can follow the named steps | it will work for every person or case |
| Reusable asset | prompt, skill, template, checklist, SOP, or source recipe has a version | the asset is the whole workflow |
| Human control | reviewer, edit/approve/reject/escalate choice, exception, and fallback | a checkbox prevents errors |
| Operating support | owner, maintainer, support route, update and retirement authority | a contact means capacity exists |
| Evidence | claim, source, unit/scope, period, method, label, limitation, next receipt | correlation or a fixture proves value |
| Team adoption | repeated use during real work by a defined audience and period | package views or a first try are adoption |
| Production readiness | runtime, permissions, reliability, security, monitoring, rollout and rollback evidence | a Markdown package is production-ready |

## Package card

Use one card before writing the full handoff:

| Field | Record | If missing |
| --- | --- | --- |
| Workflow and purpose | stable ID, user/job, affected team, intended first role | `incomplete` |
| Before/after | what changed and what did not | narrow the claim |
| Tested scope | cases, source, date, quality bar, exclusions | keep `Explore`, `Revise`, or `Hold` |
| Reusable asset | exact prompt/skill/template/checklist/SOP and version | `Not provided` |
| Inputs and sources | schema, authority, freshness, permissions, redaction | stop or limit sharing |
| Review | reviewer, rubric, edit/approve/reject/escalate and exceptions | `Needs review` |
| Support | owner, maintainer, escalation, fallback, capacity | `Needs owner` |
| Change | version, approval, retest trigger, rollback, retirement | `Not verified` |
| Evidence | label, unit/scope, period, method, limitation | `Unknown` |

## Repeat path

Write the path as an operator would perform it:

1. **Prepare:** confirm job eligibility, input permission, source freshness,
   and required context.
2. **Apply:** use the named asset and version; record what was supplied.
3. **Inspect:** check completeness, uncertainty, source support, exceptions,
   and any prohibited action.
4. **Decide:** edit, approve, reject, escalate, or stop at the human boundary.
5. **Close:** preserve the source/version receipt, decision, corrections,
   fallback, and unresolved question.

The path is not complete if it only says “run the prompt” or “review the
output.” Name the actor, input, observable check, decision, receipt, and
failure route for each material step.

## Evidence ledger

Use this shape for claims:

| Claim | Status | Scope/unit | Baseline/comparison | Source/method | Limitation | Next receipt |
| --- | --- | --- | --- | --- | --- | --- |
| literal claim | Measured/Observed/Reported/Estimated/Planned/Unknown | cases, people, team, period | old process/control or missing | record/review/observation or missing | alternative explanation | smallest strengthening or weakening evidence |

Exposure signals can be useful without being adoption evidence. Attendance,
downloads, reactions, and intention show interest or reach; they do not prove
that the workflow was repeated during real work. Faster output is not a value
claim without baseline, unit, period, rework, and the outcome that matters.

## Human control and support

The package should answer:

- What must the reviewer verify, edit, approve, or decide?
- Which input, source, case, or action requires abstention or escalation?
- What is the manual fallback and what evidence is preserved?
- Who owns the workflow and reusable asset after handoff?
- What response or support expectation is actually available?
- Which privacy, security, legal, compliance, accessibility, or localization
  review remains outside the package?

If these answers are missing, narrow the audience or choose `Needs owner`,
`Needs review`, `Limited share`, or `Hold`. Do not imply a control is effective
outside its evaluated scope.

## Lifecycle routes

| Route | Use when | Exit receipt |
| --- | --- | --- |
| `Package` | repeat path, asset, review, owner, support/fallback, version and evidence boundary are present | named reviewer accepts the package for the named scope |
| `Limited share` | a narrow person/team can inspect or try it, but a receipt is missing | owner/review/support/source receipt |
| `Revise` | steps, source, claim, or ownership is contradictory or incomplete | corrected package and re-check |
| `Hold` | real-work test, authority, permission, owner, or fallback is inadequate | new bounded test or assigned control |
| `Retire` | job, source, owner, support, or risk boundary no longer justifies active use | replacement/fallback and retirement record |

`Package` is a handoff state for a named scope. It is not a claim of adoption,
quality, ROI, causal impact, universal safety, or production readiness.

## Change and retirement

Record package version, asset/source versions, approved change, reviewer,
effective date, compatibility assumption, re-test trigger, previous version or
rollback, and review cadence. A change to the model, prompt, source, policy,
tool, audience, language, or side-effect boundary should create an explicit
re-test decision. Preserve the prior package until the new boundary is checked.

Retire a package with a reason, owner, affected users, replacement or manual
fallback, retention/deletion question, and final status. A stale package should
not remain discoverable as if it were current.

## Fictional worked example

The support-draft example in `../examples/first-run.md` is a **fictional
fixture**. Its `Limited share` route is intentional: the repeat path is
inspectable, but the owner, support route, reviewer receipt, and evidence
source are missing. The fixture does not establish that a support team adopted
the workflow or that the workflow improved customer outcomes.

## Not covered

This reference does not verify provider or model quality, workflow accuracy,
adoption, value, causality, staffing, capacity, permissions, security,
privacy, compliance, accessibility, localization, runtime reliability,
production readiness, or external user outcome. It does not connect a source,
run a workflow, send a message, take an action, approve a rollout, or retire a
real package. The fictional fixture is illustrative only.

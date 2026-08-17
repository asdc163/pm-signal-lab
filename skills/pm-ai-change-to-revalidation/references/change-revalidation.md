# AI change and revalidation reference

This reference is a **fictional fixture** field guide for deciding what an AI
workflow change affects and what evidence is needed before a bounded release.
It does not run a model, compare providers, connect a source, change a policy,
deploy a version, or execute a rollback.

## Source mapping

[OpenAI Academy's Activator Labs foundations](https://academy.openai.com/public/clubs/champions-ecqup/videos/recording-activator-labs-101-foundations-2026-07-23)
describes a working contract for required and prohibited behavior, approved
inputs, technical and human boundaries, permissions, ownership, support, and
representative tests. It says to isolate a missed case, change one requirement
or build choice at a time, rerun the failed case and nearby variations, and
document what passed, changed, and remains limited. It also describes a change
triggering a Stop, Revise, or Expand recommendation based on value,
reliability, control, and readiness.

[OpenAI Presence's governance help](https://help.openai.com/en/articles/20001405-openai-presence)
lists simulations/evaluations, guardrails, permissions, approvals, session and
quality signals, human escalation, controlled rollout, monitoring, and rollback
for new versions. Treat it as a current control reference, not proof that a
local workflow or provider deployment is ready.

[OpenAI Academy's recurring-deck workflow](https://academy.openai.com/en/public/clubs/champions-ecqup/resources/turn-updates-into-review-ready-leadership-decks-2026-07-23)
keeps source hierarchy, update plans, reviewer approval, preservation of
original files, and a reconciliation/change log visible before circulation.
The same pattern is useful for AI workflow changes that alter a downstream
artifact or decision-support output.

[OpenAI Academy's workflow starter worksheet](https://academy.openai.com/en/public/clubs/champions-ecqup/resources/ai-workflow-starter-worksheet-2026-07-07)
asks for the workflow owner, users, dependencies, approvals, desired outcome,
human boundary, stop conditions, representative cases, and scale/support
receipts. A change review should not assume those fields remain unchanged.

## Change card

Record the request before making a recommendation:

| Field | What to record | If missing |
| --- | --- | --- |
| Current route/version | package ID, version, owner, source/config versions, fallback | preserve current route; `Not provided` |
| Candidate change | exact diff, reason, requester, date, intended outcome | do not infer impact from a summary |
| Change class | source/policy, prompt, model/provider, tool/permission, data/telemetry, audience/owner, artifact | split classes or mark confounded |
| Scope | user/job, audience, language, exclusions, downstream artifacts | keep `Hold` or narrow |
| Authority | owner, reviewer, source owner, approval, rollback authority | `Needs approval` |
| Evidence | baseline, cases, oracle, period, denominator, method | `Needs revalidation` |

## Impact map

Use one row per surface and preserve why a surface is considered unaffected:

| Surface | Status | Reason/source | Confidence | Receipt | Blast radius |
| --- | --- | --- | --- | --- | --- |
| user/job/scope | affected/unknown/not affected | workflow map or owner | high/medium/low/unverified | reviewer or comparison | users/tasks |
| inputs/sources | affected/unknown/not affected | source/version ledger | high/medium/low/unverified | authority/freshness receipt | claims/context |
| prompt/instructions | affected/unknown/not affected | version diff | high/medium/low/unverified | paired behavior | output/format |
| model/provider | affected/unknown/not affected | configuration record | high/medium/low/unverified | model/config receipt | quality/cost/latency |
| tools/permissions | affected/unknown/not affected | access contract | high/medium/low/unverified | permission/approval | side effects |
| policy/control | affected/unknown/not affected | policy and guardrail diff | high/medium/low/unverified | control review | risk/escalation |
| human work | affected/unknown/not affected | review/support map | high/medium/low/unverified | reviewer receipt | burden/fallback |
| evidence/claims | affected/unknown/not affected | metric/claim ledger | high/medium/low/unverified | baseline/oracle | release story |
| downstream artifact | affected/unknown/not affected | consumer contract | high/medium/low/unverified | reconciliation review | decisions/records |
| operations | affected/unknown/not affected | owner/capacity/rollback | high/medium/low/unverified | operating receipt | support/continuity |

`Not affected` is a claim. Require a source or reviewer receipt; never derive
it from diff size, vendor familiarity, unchanged filenames, or intent.

## Revalidation case set

Select a case set that represents both work and boundaries:

1. routine, frequent, in-scope case;
2. meaningful variation in input, source, language, or context;
3. missing, conflicting, stale, or ambiguous information;
4. sensitive, urgent, high-consequence, or out-of-scope case;
5. approval, permission, escalation, manual fallback, or external-action case;
6. downstream artifact, handoff, or decision-support case;
7. cost, latency, retry, or support-burden case when the change can affect it.

For each case, preserve current and candidate inputs, output/action, source or
config version, reviewer/oracle, decision, correction, failure, and next step.
One change at a time is preferred; if several changes are bundled, record the
confounder and do not attribute an outcome to one change.

## Evidence matrix

| Requirement | Slice/scope | Current baseline | Candidate result | Oracle/reviewer | Pass rule | Outcome | Next receipt |
| --- | --- | --- | --- | --- | --- | --- | --- |
| expected behavior | named cases | observed/`Not measured` | observed/`Not run` | rubric/source/invariant | supplied or `Not provided` | Pass/Fail/Needs review/Unknown | smallest next comparison |
| source/permission | authority boundary | current version | candidate version | source/access owner | exact receipt | Pass/Fail/Unknown | approval or hold |
| human boundary | approval/escalation | current control | candidate control | authorized reviewer | no prohibited action | Pass/Fail/Unknown | negative case |
| downstream meaning | artifact/consumer | prior artifact | candidate artifact | consumer owner | reconciliation | Pass/Fail/Unknown | owner review |
| value/efficiency | unit and period | baseline/method | candidate/method | outcome owner | defined denominator | Not measured/Observed/etc. | paired evidence |

Do not summarize a single pass as “the change works.” A failure in a required
negative, permission, approval, source, or downstream slice can route the
candidate to `Hold` or `Rollback` even when routine cases pass.

## Route definitions

| Route | Entry condition | Exit receipt | Failure route |
| --- | --- | --- | --- |
| `No material impact` | every relevant surface is unchanged with a receipt | reviewer records why no revalidation is needed | `Revalidate` if any surface becomes uncertain |
| `Revalidate` | material or uncertain behavior/control/source may change | affected slices, oracle, owner, and comparison complete | `Hold` or `Rollback` |
| `Release bounded` | candidate passes declared slices and controls for named scope | owner approval, staged rollout, monitoring, rollback ready | `Hold` or `Rollback` |
| `Hold` | baseline, authority, owner, oracle, permission, support, or rollback missing | new receipt or narrowed scope | remain held or `Retire` |
| `Rollback` | candidate fails required behavior/control or creates unacceptable burden | prior/manual path restored and failure recorded | investigate, `Revalidate`, or `Retire` |
| `Retire` | job/source/owner/support/risk no longer viable | replacement/fallback and retirement record | do not use the route |

`No material impact` is not a default route for documentation, configuration,
or small text changes. `Release bounded` is not adoption, value, safety, or
production proof beyond the declared scope.

## Change log

Keep one row for each material change:

| Field | Example shape |
| --- | --- |
| Change ID/version | stable ID and current/candidate versions |
| Surface and artifact | source, prompt, model, permission, output, or workflow step |
| Why changed | observed gap, policy update, maintenance, cost, or requested scope |
| Expected effect | measurable or reviewable behavior, not a slogan |
| Tests/evidence | case IDs, source, oracle, reviewer, date, outcome |
| Approval/rollout | owner, audience, window, stop trigger, rollback |
| Communication | who needs to know and what remains unsupported |

## Fictional worked example

The support-draft change in `../examples/first-run.md` is a **fictional fixture**.
The new policy source and citation instruction route to `Revalidate` because
source authority, baseline comparison, reviewer, and candidate test results are
missing. It does not report a real regression or authorize a release.

## Not covered

This reference does not verify model or provider quality, regression rates,
source accuracy, adoption, value, causality, security, privacy, compliance,
accessibility, localization, staffing, capacity, runtime reliability,
production readiness, or rollback completeness. It does not connect a tool,
change a source, run a case, approve a rollout, send a message, take an action,
or retire a real workflow. The fictional fixture is illustrative only.

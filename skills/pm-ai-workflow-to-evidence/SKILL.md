---
name: pm-ai-workflow-to-evidence
description: Turn scattered notes, workflow artifacts, tests, adoption observations, metrics, and stakeholder feedback into a source-bounded AI workflow evidence packet. Separate what is measured, observed, reported, estimated, planned, inferred, or unknown; preserve contribution and conflict; and choose Capture next, Proceed bounded, Hold, or Do not claim without inventing adoption, value, causality, safety, or production readiness.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Workflow to Evidence

Use this skill when a PM or workflow owner has scattered material about one AI
workflow and needs to state what the evidence actually supports. It creates a
traceable packet with an artifact index, evidence ladder, claim ledger,
contribution boundary, missing receipts, and one bounded next route. It is an
evidence organizer, not a case-study certifier, analytics connector, or scale
decision.

## When to use

Use it when:

- notes, a PRD, prompt or skill, test cases, screenshots, metrics, adoption
  observations, or stakeholder feedback need to become one reviewable record;
- a PM needs to explain what was built, how it operated in real work, and what
  the supplied evidence does and does not support;
- a workflow has some exposure or real-use material but the team is unsure
  whether it can support a stronger behavior, outcome, value, or next-step
  claim;
- a contributor needs to separate personal work from collaborators' work and
  keep dates, versions, sources, and limitations attached;
- an internal reviewer needs the smallest next evidence to capture before
  piloting, extending, investing, or sharing a workflow.

Use `pm-proof-to-share` when the main job is public or channel-specific copy
for a verified release. Use `pm-ai-workflow-to-adoption` for a team-introduction
and real-use plan. Use `pm-ai-adoption-to-diagnosis` to explain a stalled
behavior. Use `pm-ai-value-to-investment` for cost/value scenarios and an
investment route. Use `pm-ai-outcome-to-improvement` for a verified proposal-
to-outcome finding. Use `pm-ai-evaluation-plan` for formal quality or safety
test design.

## Do not use

Do not use this skill to:

- generate a public post, release announcement, social message, or channel
  schedule;
- collect private telemetry, inspect a customer system, query analytics,
  verify a screenshot, or call a model/provider automatically;
- certify a case study, badge, adoption result, business value, ROI, causal
  impact, quality, safety, or production readiness claim;
- manufacture a denominator, baseline, source, user story, quote, metric,
  contribution, market size, or stakeholder approval;
- rank a portfolio, choose a pre-test workflow, diagnose an adoption blocker,
  design an evaluation, or decide post-pilot scale;
- expose customer data, employee identifiers, raw traces, private URLs,
  credentials, tokens, proprietary prompts, or confidential roadmap material.

Write `Not provided`, `Not verified`, `Not run`, `Not measured`, `Unknown`,
`Need evidence`, and `Not covered` when the material does not support a stronger
claim.

## Evidence boundary

The packet is only as strong as the source and layer attached to each claim.
Use the highest layer the evidence actually supports, not the strongest story
the owner wants to tell.

| Evidence layer | It may establish | It cannot establish by itself |
| --- | --- | --- |
| `problem_context` | a user/job, friction, workaround, or design intent was described | that the problem is prevalent or valuable |
| `workflow_design` | a proposed workflow, asset, boundary, or human role exists | that it ran or worked |
| `operation` | the workflow ran in a declared environment or test context | that users accepted it or outcomes improved |
| `exposure` | people were invited, attended, opened, or saw the workflow | real use, repeat use, adoption, or value |
| `first_use` | an eligible person tried the workflow once | repeat use, changed work, or outcome |
| `repeat_use` | the same or eligible people returned under a definition | quality, value, or causality |
| `changed_work` | a task path, handoff, or team rhythm visibly changed | that AI caused the change or it was beneficial |
| `accepted_outcome` | a named work unit passed an independent oracle | generalization, business value, or scale readiness |
| `business_value` | a defined comparison supports a bounded value claim | causality beyond the method or transfer to another context |
| `causality` | a valid design supports a causal explanation | safety, adoption, or future performance |

Tests, screenshots, release tags, traffic, downloads, quotes, and usage counts
are evidence at different layers. Never let one receipt silently promote itself.

## Claim statuses

Use one status per material claim:

| Status | Meaning | Required caution |
| --- | --- | --- |
| `Measured` | a defined unit, source, method, denominator, and period support the number or comparison | keep the scope and limitation visible |
| `Observed` | a person, artifact, review, or workflow record directly shows the event | do not generalize without a sampling frame |
| `Reported` | a person or source states an experience or result | preserve who reported it and do not upgrade it |
| `Estimated` | an explicit calculation or assumption produces a value | show inputs, method, and uncertainty |
| `Planned` | a future test, capture, or decision is proposed | it has not run |
| `Inferred` | a reasoned interpretation follows from supplied evidence | name alternatives and disconfirming evidence |
| `Unknown` | the material cannot resolve the claim | request the smallest next receipt |

## Workflow

### 1. Frame the packet

Write:

> For `[user/group]` completing `[job]` with `[workflow/version]`, assemble the
> supplied evidence to decide `[internal decision]` under `[claim, privacy,
> contribution, and operating boundary]`.

Capture:

| Field | Required question |
| --- | --- |
| `workflow_id/version` | What exact workflow, prompt, skill, model, tool, source, or package is in scope? |
| `user_job` | What work is the person or team trying to complete? |
| `owner` | Who owns the decision, evidence, and next receipt? |
| `decision` | Is this for capture, an internal review, a bounded pilot, investment, or another stated choice? |
| `audience` | Who will read the packet, and who is excluded? |
| `window` | What dates, timezone, environment, and freshness boundary apply? |
| `contribution` | What did the named contributor do versus collaborators or inherited assets? |
| `privacy_boundary` | What may be included, redacted, aggregated, or omitted? |

If the workflow or decision is missing, keep the packet at `Hold` or
`Capture next`; do not reverse-engineer a purpose from the artifacts.

### 2. Inventory every supplied artifact

Record an index before writing a narrative:

| Field | Treatment |
| --- | --- |
| `artifact_id/type` | stable ID plus note, PRD, prompt, test, screenshot, metric, feedback, release, or record |
| `source/authority` | where it came from and why it may support the claim |
| `created/observed_at` | timestamp, timezone, or `Not provided` |
| `version/scope` | workflow, model, prompt, audience, task, language, device, and period |
| `sensitivity` | public, internal, confidential, personal, customer, or `Not classified` |
| `redaction` | what was removed, generalized, aggregated, or not safe to share |
| `evidence_layer` | strongest layer supported by this artifact |
| `limitation` | what the artifact cannot show |

Do not use a screenshot, quote, or generated summary as authority when the
underlying source is missing. Keep stale and current versions in separate rows.

### 3. Map the evidence ladder

For each material statement, ask:

1. Is this a problem/design statement, or did the workflow operate?
2. Is there exposure, first use, repeat use, changed work, accepted outcome,
   value, or causal evidence?
3. What is the unit and denominator? Which eligible cases, people, periods,
   retries, abstentions, or exclusions are missing?
4. What is the strongest claim this artifact can support, and what stronger
   claim must be blocked?

If artifacts stop at design or exposure, do not write a real-use or adoption
narrative. If an accepted outcome exists without a baseline, preserve the
outcome and block an improvement claim.

### 4. Build the claim ledger

Write literal claims, not slogans. For each claim record:

| Field | Required treatment |
| --- | --- |
| `claim` | one testable sentence |
| `status` | one of the seven statuses above |
| `scope/unit` | task, person, team, artifact, decision, or period |
| `source_ids` | the artifact IDs that directly support it |
| `method/denominator` | method, baseline, comparison, eligible population, and exclusions |
| `date/version` | freshness and exact workflow boundary |
| `contribution` | who did the work and who reviewed/approved it |
| `limitation` | the strongest unsupported interpretation |
| `next_receipt` | smallest evidence that could strengthen or weaken the claim |

Keep the claim, evidence, interpretation, decision, and next action in separate
rows. A positive observation can coexist with `Unknown` value or adoption.

### 5. Check contribution, authority, and conflict

Before a packet is shared internally:

- distinguish the author's work, collaborator work, inherited assets, and
  provider or platform capability;
- mark whether the source is first-hand, second-hand, generated, or inferred;
- preserve conflicting notes, reviewer disagreement, stale versions, and
  unknown ownership rather than choosing the convenient one;
- verify that each source is allowed for the intended audience and redact
  personal, customer, security, legal, and proprietary details;
- do not claim a workflow caused an outcome because the owner built it or because
  the result followed it chronologically.

### 6. Choose one bounded route

| Route | Use when | Required next receipt |
| --- | --- | --- |
| `Capture next` | the packet is useful but a material claim lacks source, denominator, baseline, contribution, or outcome evidence | named owner, smallest artifact/observation, scope, date, and privacy boundary |
| `Proceed bounded` | the supplied evidence supports a narrow internal learning or review action | scope, owner, limitation, guardrail, stop rule, and review date |
| `Hold` | source authority, privacy, version, contribution, owner, or conflict blocks a responsible next action | missing decision/authority receipt and preserved fallback |
| `Do not claim` | the requested statement is not supported by any supplied evidence or would overstate impact/safety/adoption | literal blocked claim, reason, and safe alternative wording |

`Proceed bounded` does not mean publish, scale, or approve. It means a human
owner has a reviewable next action within the declared boundary.

### 7. Write the smallest evidence capture plan

For `Capture next`, define one receipt:

- unit and eligible slice;
- source, owner, timestamp/timezone, version, and freshness;
- positive, negative, ambiguous, abstain, or exception cases where relevant;
- baseline or comparison if an outcome/improvement claim is being considered;
- contribution/reviewer record and privacy/redaction boundary;
- expected claim it could support, claim it cannot support, and stop condition;
- writeback location and review date.

Do not ask for every possible metric. Ask for the smallest receipt that changes
the next decision.

### 8. Handoff without publishing or execution

Give the owner the evidence packet, blocked claims, one next action, source and
privacy checks, fallback, and downstream skill. This skill is tool-free: it does
not read private artifacts, collect telemetry, send a message, publish a case,
or change an external system.

## Output contract

Return these sections in order and preserve missingness.

## Decision on the desk

State the workflow/version, user/job, owner, intended reader/decision, evidence
window, contribution boundary, privacy boundary, and what could change the route.

## Artifact index

List every supplied artifact with ID/type, source/authority, date, version,
scope, sensitivity/redaction, evidence layer, and limitation.

## Evidence ladder

Map the strongest supported layer for problem/design, operation, exposure, first
use, repeat use, changed work, accepted outcome, value, and causality. Mark
unavailable layers `Not provided`, `Not run`, or `Unknown`.

## Claim ledger

Use a table with literal claim, status, scope/unit, source IDs, method or
denominator, date/version, contribution, limitation, and next receipt.

## Contribution, authority, and conflict

State who did what, which source is authoritative, what is first-hand or
reported, which versions conflict, what is redacted, and what remains unclear.

## Evidence-supported account

Write the shortest plain-language account the packet supports. Separate what
was designed, what operated, what people did, what outcome was accepted, and
what remains unmeasured. Do not turn a gap into a smooth narrative.

## Route

Choose exactly one of `Capture next`, `Proceed bounded`, `Hold`, or `Do not
claim`. State the decisive evidence, blocked interpretation, owner, boundary,
and next receipt.

## Smallest next evidence

Define the unit, eligible slice, source, owner, date/version, method, privacy
boundary, expected claim, non-claim, stop condition, and writeback location.

## Implementation handoff

Name the authorized owner, smallest action, affected artifacts/surfaces, source
and privacy review, acceptance/evidence receipt, fallback, and follow-on skill.
Do not imply the action ran.

## Not covered

List unsupported prevalence, demand, adoption, retention, value, ROI,
causality, quality, safety, privacy, security, accessibility, localization,
cost, latency, reliability, production readiness, rollout, customer outcome,
or GitHub traffic, stars, and organic growth claims.

## Review ask

Ask the reviewer to choose exactly one route: `Capture next`, `Proceed bounded`,
`Hold`, or `Do not claim`. Name the one material claim or source boundary that
needs correction.

## Edge cases

- **Only a polished narrative:** discard unsupported sentences, build an
  artifact index, and route to `Capture next` or `Do not claim`.
- **Only a metric:** preserve the number with its unit/window if supplied; do
  not invent baseline, causality, adoption, or value.
- **Only a screenshot or quote:** label it `Reported` or `Observed` at the
  narrow scope; request source, date, and context.
- **Usage without denominator:** keep it as exposure/activity and route to
  `Capture next` or `Do not claim`.
- **Real use without outcome:** write the behavior and route to a smallest
  outcome receipt; do not claim business value.
- **Outcome without baseline:** preserve accepted outcome and block improvement
  or causal language.
- **Conflicting versions or sources:** keep both rows, identify authority, and
  use `Hold` until a reviewer reconciles them.
- **Contribution unclear:** use `Hold` or `Capture next`; never inflate the
  named author's role.
- **Fictional or synthetic material:** label the packet `fictional fixture`; it
  can exercise the format but cannot support a real workflow story, adoption,
  value, or growth claim.
- **High-impact or irreversible claim:** use `Hold` or `Do not claim` until
  privacy, authority, human review, and the required evidence are explicit.
- **Question asks for stars or traffic impact:** keep GitHub signals in their
  own evidence layer and mark attribution `Not measured` or `Not covered`.

## Final check

Before handoff, confirm:

- [ ] one workflow, user/job, owner, intended decision, window, and privacy boundary are explicit;
- [ ] every artifact has source, date/version, scope, sensitivity, and limitation;
- [ ] evidence layers are not upgraded beyond what the source supports;
- [ ] every material claim has status, source IDs, scope/unit, method/denominator, contribution, limitation, and next receipt;
- [ ] conflicts, stale versions, and unknown ownership are visible;
- [ ] problem/design, operation, exposure, first use, repeat use, changed work, outcome, value, and causality are separate;
- [ ] exactly one of the four routes is selected;
- [ ] the next evidence action has owner, scope, privacy, stop condition, and writeback;
- [ ] no fictional, usage, screenshot, quote, or test evidence is written as adoption, value, safety, or causality proof;
- [ ] unsupported claims are listed under `Not covered`.

## Source notes

This skill's evidence framing is informed by the official OpenAI Academy
materials on the [Workflow evidence coach](https://academy.openai.com/public/clubs/champions-ecqup/resources/workflow-evidence-coach-2026-07-17),
[Gather appropriate evidence of value](https://academy.openai.com/public/clubs/champions-ecqup/resources/gather-appropriate-evidence-of-value-2026-07-17),
[Capture and share use cases and impact](https://academy.openai.com/public/clubs/champions-ecqup/resources/find-and-share-ai-use-cases-to-show-impact),
and the [Workflow adoption planner](https://academy.openai.com/public/clubs/champions-ecqup/resources/workflow-adoption-planner-2026-07-07).
These sources shape the packet; they do not certify a particular workflow's
evidence, adoption, value, safety, or production readiness.

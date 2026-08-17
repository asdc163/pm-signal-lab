# First run: a fictional support assistant inventory

This is a **fictional fixture** for learning the skill. It is not a discovery
scan, registry entry, production record, authorization receipt, safety result,
compliance assessment, or proof of adoption or value.

## Request

A fictional PM says:

> “We have an AI support assistant in the help center. It drafts answers from
> help articles, and support agents can edit them. Please add it to the AI
> inventory and mark it active.”

The product team supplied one PRD and a vendor page. The model snapshot, source
owner, permission scope, runtime environment, review cadence, and retirement
owner are not verified. The first action is to record the system without
upgrading the missing fields.

## Decision frame

- **System:** `NSH-SUP-CHAT-01`, fictional Northstar Help support assistant.
- **Purpose:** draft support answers from an approved help-article collection;
  a support agent owns the final response.
- **Surface:** help-center chat, `en-US`, customer-facing draft/review flow.
- **Owner:** fictional Support Product PM; support operations owns human review.
- **Requested route:** `Register` was requested, but the evidence supports
  `Complete fields` before any active-state claim.
- **Irreversible action:** marking the system `Active` and allowing customer
  exposure under the inventory record.

## Source ledger

| ID | Source | What it supports | Limit |
| --- | --- | --- | --- |
| `S-01` | [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | inventory, roles, context, and lifecycle governance are useful record fields | framework guidance; not proof of Northstar's system or compliance |
| `S-02` | [European Commission GPAI guidance](https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers) | documentation and lifecycle freshness are relevant for model/provider relationships | does not classify Northstar or establish applicability |
| `S-03` | [OpenAI Frontier](https://openai.com/business/frontier/) | identity/access, auditable actions, monitoring, and governance patterns | provider/product material; not a Northstar runtime receipt |
| `S-04` | [OpenAI Presence](https://openai.com/index/introducing-openai-presence/) | workflow-specific policy, guardrails, evaluation, escalation, and controlled-change patterns | provider/product material; not proof of this fictional workflow |
| `S-05` | fictional support-assistant PRD | purpose, surface, human review, and draft-only boundary | fictional, not a deployment or user record |
| `S-06` | fictional vendor page | proposed model/provider relationship | version, endpoint, permissions, uptime, and data behavior are not verified |

## System identity and boundary

| Field | Entry | Status / limitation |
| --- | --- | --- |
| `system_id` | `NSH-SUP-CHAT-01` | `Proposed`; stable only inside this fictional example |
| `display_name` / aliases | Northstar Help Support Assistant / `support-draft` | `Reported` in fictional PRD |
| `system_type` | model-backed support drafting workflow | `Reported`; exact provider route is `Unknown` |
| `parent_child` | Northstar Help center → support chat → draft flow | fictional relationship |
| `record_status` | `Draft` | not an active inventory record |
| `purpose` | draft an answer from approved help articles for a support agent to review | fictional `Reported` |
| `trigger` | customer asks a help-center question | fictional `Planned`; event receipt `Not run` |
| `in_scope` | retrieval from approved help articles; draft text; human edit/send | fictional PRD boundary |
| `out_of_scope` | autonomous send, account change, refund, deletion, or policy exception | fictional product boundary; enforcement `Not verified` |
| `direct_users` | customers and support agents | fictional audience; not adoption evidence |
| `affected_parties` | customers receiving answers and support operators reviewing drafts | context only; no impact assessment |
| `human_boundary` | support agent decides whether to edit, send, or escalate | fictional design; approval receipt `Not run` |

## Ownership and dependency map

| Responsibility / dependency | Owner or relationship | Status |
| --- | --- | --- |
| Purpose and scope | fictional Support Product PM | `Reported`; no owner acceptance receipt |
| Human review | fictional Support Operations | `Planned`; no queue or staffing evidence |
| Model/provider | fictional vendor page; model snapshot not supplied | `Unknown` |
| Help articles | fictional Knowledge Management owner | source owner and freshness rule `Unknown` |
| UI surface | fictional Help Center web team | design described; shipped artifact `Not verified` |
| Send action | human support agent only, per fictional PRD | permission/enforcement `Not verified` |
| Logs/evaluation | no destination or retention record supplied | `Unknown` |
| Incident/change owner | not supplied | `Unknown` |
| Retirement owner | not supplied | `Unknown` |

## Permissions, data, and lifecycle

| Boundary | Supplied record | Evidence status |
| --- | --- | --- |
| Input | customer question and allowed help-center context | fictional PRD; data classification `Unknown` |
| Output | draft answer shown to support agent | fictional design; runtime `Not run` |
| Tool side effects | no autonomous send or account mutation intended | design boundary; authorization not verified |
| Permission | support agent can edit/send after review | owner/approval/expiry/revocation `Unknown` |
| Model | vendor/model referenced without snapshot or endpoint | documentation only; current version `Unknown` |
| Source | help articles, freshness and approval owner missing | `Complete fields` |
| Lifecycle | `Proposed` | cannot mark `Active` from a PRD or vendor page |
| Review cadence | not supplied | `Unknown` |
| Change trigger | model, help source, policy, permission, or owner change | planned; revalidation receipt `Not run` |
| Retirement | no-use/disablement/owner-transfer evidence | `Unknown` |

## Evidence ledger

| Layer | What exists | What it cannot establish |
| --- | --- | --- |
| `system_identity` | fictional stable ID and PRD name | duplicate or deployed-instance coverage |
| `purpose_scope` | fictional job, in/out scope, human boundary | demand, value, or quality |
| `ownership_actor` | proposed PM and support-ops roles | accepted accountability or capacity |
| `dependencies` | fictional vendor and article dependency names | current version, availability, or source freshness |
| `data_sources` | declared question/article classes | privacy, retention, data quality, or tenant isolation |
| `model_tool` | vendor relationship is mentioned | model version, endpoint, output quality, or migration safety |
| `permissions_policy` | draft-only human boundary is proposed | authorization or enforcement |
| `lifecycle_evidence` | `Proposed` design record | active operation, production readiness, or adoption |
| `review_change_retirement` | change ideas are listed | reviewer, incident, freshness, or retirement receipt |

## Why the route is `Complete fields`

The system has a usable fictional identity, purpose, owner hypothesis, human
boundary, and surface. It is not ready for an `Active` label because the
minimum record still needs:

1. an accountable owner acceptance and support/review owner;
2. model/provider snapshot, endpoint/environment, and change trigger;
3. help-article source owner, freshness rule, and data/retention boundary;
4. permission/approval/expiry/revocation evidence for the send action;
5. review cadence, incident contact, and retirement owner;
6. a dated receipt if the product actually operates on any scope.

The smallest next action is for the fictional Support Product PM to assign each
missing field to one named role and keep the lifecycle state `Proposed` until
those receipts are reviewed. If a customer launch or side effect is imminent,
move the route to `Hold`.

## Reviewer prompt

Which missing field would change the system boundary most: model/provider
version, help-source ownership/freshness, send permission, or human-review
capacity? Who owns that receipt? Does the record need a separate child system
for another tenant, channel, or autonomous action?

## Not run

No discovery connector, registry, model, vendor endpoint, help-center page,
customer, support operator, permission, send action, log, evaluation, incident,
retirement action, or production environment was accessed or executed.

## Not covered

This fixture does not establish that the system exists, is active, is safe,
compliant, authorized, reliable, high quality, private, secure, accessible,
adopted, valuable, causal, or production-ready. The inventory fields are a
review aid; they are not a system scan, registry entry, or release approval.

# Worked reference: fictional support refund handoff and recovery contract

This is a fictional fixture for a pre-launch review. It contains no real
customer, model, provider, account, policy, queue, transcript, trace, or
production evidence.

## Method note

The field model is informed by the [OpenAI Agents SDK handoffs guide](https://openai.github.io/openai-agents-python/handoffs/), its [human-in-the-loop guide](https://openai.github.io/openai-agents-python/human_in_the_loop/), the [Agents SDK quickstart](https://openai.github.io/openai-agents-python/quickstart/), and OpenAI's [practical guide to building agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf). These sources describe runtime primitives such as handoff destinations, structured handoff input, filtering/history, and human intervention. This reference turns those concepts into a provider-neutral PM contract; it does not certify a queue, agent, safety property, or project.

## Decision on the desk

`Hold` the refund drafting change until the stale-policy route, uncertain tool
state, billing destination, minimal packet, acknowledgement, and resume oracle
are verified. A draft-only pilot may be considered after those controls pass on
a clean fictional or authorized test slice.

- **User/job:** Help a support user understand the next safe step for a refund
  request without promising eligibility or making a money movement.
- **Current workaround:** A support agent manually checks plan data and routes
  exceptions to billing.
- **Decision owner:** Support product owner with billing policy and operations
  owners.
- **Change boundary:** AI drafts and prepares a handoff; it cannot decide
  eligibility, send a refund, or silently retry an uncertain external action.
- **Risk if wrong:** The user may be misled, lose context, receive duplicate
  work, or have sensitive data sent to an unverified destination.

## User/job and AI boundary

| Role or asset | Allowed | Denied | Status |
|---|---|---|---|
| Support assistant | summarize request, show missing fields, prepare draft | promise eligibility, move money, choose policy over a conflict | fictional proposal |
| User | request a person, edit/redact visible context, cancel where supported | none assumed | fictional proposal |
| Billing specialist | inspect authorized packet, verify policy, decide next step | act outside role/tenant scope | authority `Not verified` |
| Billing queue | receive a minimal packet with receipt | receive raw transcript or secrets | destination `Not provided` |
| Account/payment state | protected external state | autonomous mutation | no runtime evidence |

## Handoff trigger and stop condition

| Trigger | Observed/proposed condition | AI may do | AI must not do |
|---|---|---|---|
| User request | User asks for a person | prepare a bounded handoff | keep arguing or hide the route |
| Evidence missing | Plan date is absent | ask for it or state it is missing | promise eligibility |
| Stale policy | Available policy source is stale | record source/version and hold language | choose a rule silently |
| Tool uncertainty | Previous request timed out with no confirmed external state | preserve attempt and receipt status | retry a money action blindly |
| High impact | Refund could affect money/account state | route to authorized billing owner | execute or approve the refund |

The stop condition is: no eligibility promise, money movement, or autonomous
retry until required plan data, current policy, external-state status, and an
authorized billing path are verified.

## Handoff packet

`H-001` is proposed and not executed:

| Field | Value | Provenance/status | Privacy/recipient scope |
|---|---|---|---|
| `handoff_id` | `H-001` | proposed fixture ID | internal receipt only |
| `trigger` | user-requested human + missing/stale evidence + uncertain tool state | supplied fictional input | user-visible summary |
| `user_goal` | understand refund next step | observed fixture request | safe to show |
| `current_state` | draft not sent; previous tool request timed out | supplied fictional state | no raw payload |
| `desired_outcome` | billing verifies policy and tells user the next safe step | proposed | user-visible |
| `safe_summary` | plan date missing; available policy stale; no refund executed | proposed summary | recipient needs this |
| `source_ids_and_versions` | plan metadata `Not provided`; policy `P-OLD` stale | fictional/proposed | show source status, not private URL |
| `actions_attempted` | one policy/tool lookup; outcome unconfirmed | supplied fictional event | preserve receipt ID if available |
| `results_and_external_state` | no confirmed money or account mutation | supplied fictional state | high-impact boundary |
| `unresolved_questions` | plan date, current policy, timeout side effect, eligibility | observed/proposed | billing owner decides |
| `allowed_actions` | verify data, clarify, prepare a non-binding reply | proposed | billing scope only |
| `denied_actions` | promise refund, retry money action, send raw transcript | policy boundary proposal | no side effect |
| `privacy_classification` | sensitive account/payment context possible | `Not verified` | minimize before transfer |
| `destination` / `owner` | billing specialist / billing operations | `Not provided` | no unowned queue |
| `acknowledgement_status` | `Not executed` | no runtime receipt | waiting is not resolution |
| `return_condition` | current policy, plan date, external-state check, human decision | proposed oracle | AI resume requires new evidence |

The packet intentionally excludes customer identity, account number, payment
details, raw transcript, private policy URL, and hidden model reasoning until an
authorized destination and purpose are verified.

## Destination, ownership, and permission

- **Destination:** billing specialist or billing-owned queue; actual identifier
  is `Not provided`.
- **Owner:** billing operations owns acknowledgement, next action, and closure;
  support product owns the workflow contract.
- **Permission:** recipient identity, role, tenant scope, data-use purpose,
  retention, and audit receipt are `Not verified`.
- **Acknowledgement:** a recipient must accept `H-001` and show timestamp/owner;
  no transfer event is treated as acceptance.
- **Availability:** queue capacity and response time are `Not measured`; do not
  promise “someone will reply shortly.”
- **Fallback:** keep the draft editable, show the missing evidence, and offer a
  manual support route or later retry without duplicating the uncertain action.

## User-visible state and recovery

| State | User sees | AI may do | Recovery / owner |
|---|---|---|---|
| `Needs a person` | Why the assistant cannot safely finish and what will be shared | prepare/redact packet | user edits or cancels |
| `Prepared` | packet summary, missing fields, destination not yet confirmed | no external side effect | authorized owner reviews |
| `Awaiting acknowledgement` | handoff receipt and honest waiting state | no refund promise or duplicate retry | billing operations accepts or expires |
| `In progress` | owner/next step if permitted, not a fake countdown | answer only within safe boundary | billing specialist resolves |
| `Returned for context` | exact missing field or conflict | ask smallest clarifying question | user or billing supplies evidence |
| `Resolved` | verified policy outcome and next action | resume only within new boundary | billing receipt and user confirmation |
| `Destination unavailable` | no confirmed owner; manual fallback | preserve safe draft | support owner reroutes or closes |
| `Cancelled` | what was shared and what stopped | stop pending work where possible | user chooses manual path |
| `Rollback` | route disabled after control failure | return to manual handling | support owner investigates |

`Resolved` requires a billing-owned outcome and evidence receipt. It cannot be
derived from `Prepared`, `Acknowledged`, a model message, or a transfer HTTP
status.

## Verification and learning writeback

- **Packet schema oracle:** required fields, redaction fields, allowed/denied
  actions, destination, owner, receipt, and return condition are present.
  Status: `Not executed`.
- **Policy oracle:** a billing-approved fixture covers eligible, ineligible,
  missing-date, stale-source, and conflicting-source paths. Status: `Not
  provided`.
- **Permission oracle:** destination identity, role, tenant scope, purpose, and
  retention are verified. Status: `Not provided`.
- **State oracle:** `Prepared → Acknowledged → In progress → Resolved` cannot
  skip acknowledgement or closure evidence; timeout, cancel, and duplicate
  routes are tested. Status: `Not executed`.
- **Human rubric:** reviewers judge context sufficiency, privacy minimization,
  visible uncertainty, ownership, no unsupported promise, and recovery. Status:
  `Not provided`.
- **Learning writeback:** a real reviewed mismatch would become a regression,
  feedback case, incident route, or product-learning note. This fixture adds no
  real case and does not establish handoff acceptance, resolution, trust, or
  response-time performance.

## Release, fallback, and rollback

- **Must pass:** the assistant stops before a refund promise/action; packet is
  minimal and source-bounded; destination/owner/permission are explicit; user
  sees waiting and recovery states; uncertain external state is not duplicated;
  resume requires a verified billing outcome.
- **Must not occur:** raw transcript or secret forwarding, silent transfer,
  unowned queue, invented SLA, duplicate money action, or resolution claim before
  billing evidence.
- **Pilot boundary:** draft-only, fictional/authorized data, no money tool,
  human review for every handoff, bounded sample, manual fallback, and named
  support/billing owners.
- **Rollback trigger:** any privacy leak, scope mismatch, unacknowledged
  transfer, duplicate action, unsupported promise, missing receipt, or resume
  without a new boundary.
- **Rollback action:** disable the handoff path and return to manual support;
  preserve safe evidence and investigate before reopening.
- **Next learning question:** Can a recipient act on the minimum packet without
  asking the user to repeat the story, and can the user understand what is still
  unresolved?

## Not covered

- No real user, account, policy, provider, model, queue, human, permission,
  tenant boundary, tool trace, or external state was tested.
- No handoff acceptance, acknowledgement time, resolution, recovery rate,
  model quality, safety/security certification, legal/compliance result,
  adoption, traffic, retention, or star impact is established.
- Proposed packet, oracle, owner, fallback, and state transitions are not
  deployed or verified merely because they are written here.

## Review ask

Should the authorized owners `Hold`, request the missing identity/permission and
state-oracle evidence, or approve a draft-only pilot with the stated stop and
fallback conditions?

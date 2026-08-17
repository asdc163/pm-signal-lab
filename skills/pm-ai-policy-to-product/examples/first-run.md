# First run: a fictional AI support policy map

This is a **fictional fixture** for learning the skill. It is not legal advice,
not a compliance assessment, not a production control, and not evidence that
any AI system is safe or compliant.

## Request

A fictional PM at Northstar Help writes:

> “We are adding an AI support chat to our help center. Some EU customers may
> use it, and the assistant can draft answers from our help articles. Can we
> put ‘AI Act compliant’ on the launch page?”

The product, actor role, customer locations, system classification, policy
owner, and deployed controls have not been verified. The correct first move is
to map the decision boundary, not answer the claim.

## Decision frame

- **Decision:** decide whether the cited transparency requirements may apply to
  Northstar Help's support chat and what product controls need an authorized
  review before launch.
- **User/job:** a customer seeks support; a PM needs an honest launch boundary.
- **Irreversible action:** publish the launch page and expose the assistant to
  customers.
- **Route:** `Validate applicability`.
- **Blocked wording:** “AI Act compliant.” No authorized legal or compliance
  evidence was supplied.

## Source ledger

| ID | Source / authority | What it supports | Limit |
| --- | --- | --- | --- |
| `S-01` | [European Commission Article 50 transparency guidance](https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems), published 2026-07-20 | current official guidance and the stated Article 50 effective-date context | not a Northstar applicability decision or compliance certificate |
| `S-02` | [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | `Govern`, `Map`, `Measure`, and `Manage` framing; roles, context, controls, and review | voluntary framework; not a legal conclusion |
| `S-03` | [OpenAI Presence](https://openai.com/index/introducing-openai-presence/) | production agent patterns for policies, guardrails, approved actions, simulations, evaluations, escalation, and controlled changes | provider/product material; not Northstar evidence or legal authority |
| `S-04` | [Running Codex safely at OpenAI](https://openai.com/index/running-codex-safely/) | bounded execution, approvals, network/identity controls, and telemetry as governance patterns | coding-agent context; not a support-chat control receipt |

## Applicability frame

| Field | Supplied answer | Status / next owner |
| --- | --- | --- |
| Jurisdiction | Some customers may be in the EU | `Reported`; confirm affected users, markets, and contract scope with authorized owner |
| Actor role | Northstar may be a deployer, provider, or another role | `Unknown`; legal/compliance owner must classify |
| System type | AI support chat that drafts answers from help articles | `Reported`; confirm system and interaction classification |
| Modality | text chat | `Reported`; confirm actual launch surfaces |
| Purpose/context | customer support in the help center | `Reported`; scope to the named surface |
| Audience | customers and support operators | `Reported`; affected-person and operator boundary needs review |
| Effective date | source says Article 50 obligations apply from 2026-08-02 | `Source fact`; applicability to Northstar is not established |
| Exception | no exception analysis supplied | `Need authority` |

## Requirement ledger

| ID | Source-bounded statement | Modal force / condition | Status |
| --- | --- | --- | --- |
| `R-01` | The European Commission guidance describes transparency obligations for certain AI systems, including systems directly interacting with natural persons. | source statement; conditions and actor scope must be checked | `Source fact / applicability pending` |
| `R-02` | The guidance includes an information/disclosure expectation for people interacting with certain AI systems. | candidate requirement; exact applicability and implementation must be reviewed | `Source fact / interpretation pending` |
| `R-03` | NIST frames AI risk work as continuous govern, map, measure, and manage activity with documented roles and context. | voluntary framework guidance | `Source fact / product mapping candidate` |
| `R-04` | Production agent patterns should keep policies, guardrails, approved actions, evaluations, escalation, and controlled changes visible. | product governance pattern, not a legal requirement | `Reported provider pattern / not Northstar evidence` |

## Candidate control map

| Requirement | Candidate control | Surface / state | Owner | Receipt | Current status |
| --- | --- | --- | --- | --- | --- |
| `R-02` | plain-language AI interaction disclosure | help-center chat entry and conversation state | Northstar product + legal/compliance reviewer | approved copy, locale review, shipped UI receipt | `Design candidate; not implemented` |
| `R-02` | output-origin label if the authorized applicability review requires it | generated support draft and any public display | product/platform owner | exact policy/version, UI/API artifact, test and runtime receipt | `Need applicability` |
| `R-03` | system inventory and named governance owner | launch record and review packet | AI product owner | inventory entry, owner acceptance, review date | `Planned; not verified` |
| `R-04` | approved action boundary and human escalation | support workflow, tool/action state | support operations owner | policy/config version, approval receipt, escalation test | `Not implemented in fixture` |
| `R-04` | change review before policy, model, or help-source update | release process | PM + engineering + authorized reviewer | candidate diff, representative test, approval, rollback | `Planned; not run` |

## Evidence ladder

| Layer | What this fixture has | What it does not have |
| --- | --- | --- |
| `requirement_source` | four linked official/provider source pages | a legal opinion or contract interpretation |
| `applicability` | a reported EU-customer possibility and product description | confirmed jurisdiction, role, classification, exception, or owner |
| `interpretation` | candidate product questions | authorized legal/compliance interpretation |
| `control_design` | five candidate control rows | approved design or final copy |
| `implementation` | none | shipped UI, config, tests, or inventory receipt |
| `operation` | none | production interaction, disclosure event, or audit receipt |
| `monitoring` | a planned change-review idea | cadence, signal, threshold, or operator |
| `exception_review` | none | approved exception, expiry, or compensating control |

## Why the route is `Validate applicability`

The sources are sufficient to ask a focused product/legal question, but not to
answer whether Northstar is in scope or whether “AI Act compliant” is accurate.
The smallest next action is for an authorized owner to confirm:

1. Northstar's actor role for this support chat;
2. the affected jurisdictions and customer/worker audience;
3. the system type and exact launch surfaces;
4. the effective policy/version and any applicable exception;
5. whether the proposed disclosure/label controls are sufficient for the
   authorized interpretation.

Until that receipt exists, use the launch-page wording:

> “Northstar is testing an AI-assisted support chat. It may make mistakes; a
> human support route remains available.”

That is still proposed copy, not proof that the product is legally compliant.
Do not publish the stronger claim.

## Reviewer prompt

Which applicability field would most change the control map? Who owns that
answer? Which proposed control lacks a design or operation receipt? Should the
next route remain `Validate applicability`, move to `Map controls`, or become
`Hold` because launch is imminent?

## Not run

No regulator, legal/compliance owner, customer, support operator, model, API,
help-center deployment, UI disclosure, output label, inventory, approval,
monitoring process, or production event was contacted or executed.

## Not covered

This fixture does not establish jurisdiction, actor role, legal applicability,
compliance, certification, control sufficiency, product safety, model quality,
privacy, accessibility, fairness, security, adoption, value, causality,
production readiness, or GitHub growth. The linked sources are mapping inputs,
not proof about Northstar Help.

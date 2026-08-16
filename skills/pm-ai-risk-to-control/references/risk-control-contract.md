# Worked reference: fictional support refund risk-control contract

This is a fictional fixture for a pre-launch review. It contains no real
customer, model, provider, account, policy, trace, or production evidence.

## Method note

The field model is informed by [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), its [Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), [Anthropic's containment discussion](https://www.anthropic.com/engineering/how-we-contain-claude), and [OpenAI's Codex safety guidance](https://openai.com/index/running-codex-safely/). These sources provide risk-management vocabulary and examples of control boundaries; they do not certify this fictional contract or any project that copies it.

## Decision on the desk

`Hold` the support refund assistant until the policy oracle, required-field
check, human billing owner, and rollback trigger are verified. A bounded pilot
could be reconsidered after those controls pass on a clean test slice.

- **User/job:** Help a support agent draft a policy-grounded refund reply and a
  billing handoff without promising an outcome the system cannot verify.
- **Current workaround:** The reviewer edits the draft and routes it to billing.
- **Decision owner:** Support product owner with billing policy and risk owners.
- **Change boundary:** Drafting and handoff preparation; no money movement and
  no autonomous refund decision.
- **Risk if wrong:** A customer could be misled about eligibility, a support
  agent could rely on an unsupported promise, or a billing workflow could be
  started with incomplete context.

## User, asset, and trust boundary

| Item | Boundary | Status |
|---|---|---|
| Support agent | May review, edit, and send a draft | fictional assumption |
| Customer account and plan data | Sensitive context; required fields must be authorized and isolated | Not verified |
| Policy source | Plan-specific reference used for eligibility language | Proposed |
| Billing handoff | Human-owned external workflow; assistant may prepare, not execute | Proposed |
| Money movement | Outside assistant authority | Explicit non-goal |

## Evidence and source ledger

| ID | Source | Scope | Status | Limitation |
|---|---|---|---|---|
| `S-001` | fictional reviewer note | One unsupported eligibility draft | Observed fixture | Cannot establish cause or prevalence |
| `S-002` | fictional plan metadata | Plan date and type are required inputs | Proposed | No real schema or access proof |
| `S-003` | fictional policy source ID | Rule must be shown before a promise | Proposed | Source freshness and authority not verified |
| `S-004` | fictional workflow description | Draft plus billing handoff | Proposed | No runtime trace or client behavior |

## Hazard and harm map

| ID | Trigger | System behavior | Affected asset | Harm | Detection/recovery gap |
|---|---|---|---|---|---|
| `R-001` | Plan date or policy source is missing | Draft states refund eligibility | Customer expectation, agent trust, billing queue | Misleading promise and avoidable escalation | No required-field or source check before language is shown |
| `R-002` | Policy source is stale or conflicts with plan metadata | Draft presents one rule as current | Policy decision and customer communication | Incorrect guidance or inconsistent handling | Freshness and conflict state are not visible |
| `R-003` | Handoff is prepared with incomplete or duplicated context | Billing receives an unsafe or repeated request | Billing workflow and account state | Delay, duplicate work, or unintended action | No deterministic handoff schema or deduplication evidence |

Likelihood and severity are `Not measured`; the fixture does not support a
numerical risk score. The harms remain in scope because their impact is
material even without a frequency estimate.

## Risk and control register

| ID | Hazard / harm | Surface | Inherent risk | Control + type | Owner | Oracle + status | Residual risk | Decision |
|---|---|---|---|---|---|---|---|---|
| `R-001` / `C-001` | Unsupported refund promise | Model/output, data/context | Observed fictional mismatch; likelihood `Unknown` | Require plan date and policy source before eligibility language; `Preventive` | Support engineering | Deterministic required-field assertion; `Not executed` | `Unknown` until run | Hold |
| `R-001` / `C-002` | Same promise reaches agent or customer | UX/trust | Harm path proposed | Show source ID, uncertainty, and editable draft; escalate when evidence is absent; `Detective` + `Corrective` | Support product | Human rubric plus source-presence check; `Not executed` | `Not verified` | Hold |
| `R-002` / `C-003` | Stale/conflicting rule is treated as current | Data/context, operations | Proposed; freshness `Unknown` | Check policy version/date and route conflicts to billing; `Detective` | Billing policy owner | Reference oracle with current policy fixture; `Not provided` | `Unknown` | Need evidence |
| `R-003` / `C-004` | Unsafe or duplicate billing handoff | Tool/action, operations | Proposed; runtime behavior `Not measured` | Use a bounded handoff schema, human review, idempotency key, and no money tool; `Preventive` + `Corrective` | Billing operations | Schema, permission, and duplicate-state tests; `Not executed` | `Unknown` | Hold |

## Negative routes and trust states

| Route/state | User-visible behavior | System boundary | Recovery |
|---|---|---|---|
| No risk register | Return the intake fields; do not say safe | No release decision | Add hazard, owner, and evidence |
| Missing plan date or source | Say eligibility is unverified; keep draft editable | No promise and no money action | Retrieve authorized context or escalate |
| Stale/conflicting policy | Show the conflict and stop eligibility language | No automatic choice between rules | Billing owner resolves source |
| Control proposed | Label it `Not verified` | No ship claim | Run the stated oracle |
| High-impact blocker | Hold the release | Human review required | Provide evidence or narrow scope |
| Handoff ready | Show exact context and destination | Assistant prepares only; human sends | Billing reviews and records outcome |
| Fallback active | Preserve the draft and route to a human | No autonomous action | Repair context, then re-run checks |
| Post-release monitoring | Sample for unsupported promises, missing sources, and duplicate handoffs | Stop on must-not-occur event | Disable the changed path and investigate |

## Control verification and residual risk

- **Required-field oracle:** deterministic assertion that plan date, plan type,
  policy source ID, and source freshness are present before eligibility wording
  is available. Status: `Not executed`.
- **Policy oracle:** billing-approved fixture covers eligible, ineligible,
  missing-date, stale-source, and conflicting-source routes. Status: `Not
  provided`.
- **Draft rubric:** two independent reviewers check source visibility, no
  unsupported promise, correct escalation, editable state, and no money action.
  Status: `Not provided`.
- **Handoff oracle:** deterministic schema, authorization, idempotency, and
  human-send checks. Status: `Not executed`.
- **Residual risk:** `Unknown` until these checks run on a clean slice and the
  fallback is exercised. A model judge alone cannot close the monetary or
  authorization risk.

## Release, fallback, and rollback

- **Must pass:** required fields and current policy source are visible; the
  draft uses evidence-bounded language; the handoff is human-owned and
  idempotent; fallback works when context is missing or conflicting.
- **Must not occur:** an unsupported eligibility promise, autonomous money
  movement, hidden policy conflict, or duplicate billing action.
- **Pilot boundary:** draft-only, no money tool, limited fictional or authorized
  test slice, human review on every handoff, and a named support/billing owner.
- **Fallback:** keep the draft editable and route to billing with the missing
  context explicitly shown.
- **Rollback trigger:** any must-not-occur event, failed required-field/source
  oracle, missing human review, duplicate handoff, or unresolved policy conflict.
- **Rollback action:** disable the changed drafting/handoff path and return to
  manual review while preserving the trace and evidence record.
- **Next learning question:** Which missing-context and policy-conflict slices
  cause the control to hold, and can reviewers recover without guessing?

## Not covered

- No real user, account, provider, model, policy, trace, deployment, or client
  behavior was tested.
- No probability, severity, prevalence, model diagnosis, safety/security
  certification, legal/compliance conclusion, adoption, traffic, retention, or
  star impact is established.
- Proposed controls are not verified until their oracles are executed and
  reviewed by authorized owners.

## Review ask

Should the authorized owners `Hold` the change, `Need evidence` for the four
control oracles, or approve a draft-only pilot with the stated stop conditions?

# Worked reference: fictional support-draft data-purpose and lifecycle contract

This is a fictional fixture for a pre-launch review. It contains no real
customer, provider, configuration, account, policy, transcript, credential,
connector, or production evidence.

## Method note

The field model is informed by OpenAI's [API data controls](https://platform.openai.com/docs/models/default-usage-policies-by-endpoint), [business data privacy commitments](https://openai.com/business-data/), and [file expiration reference](https://platform.openai.com/docs/api-reference/uploads), plus the [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) and [Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf). These sources are references for separating application state, logs, endpoint behavior, governance, and privacy risk; they do not prove this fictional product's configuration, contract, deletion behavior, or compliance.

## Decision on the desk

`Hold` the proposed 30-day prompt/response retention and evaluation reuse until
the provider endpoint, connector egress, tenant scope, minimization, user
control, and deletion-propagation evidence are verified. A reduced-data,
draft-only pilot may be considered after the data owner approves the contract
and the critical negative routes pass.

- **User/job:** help a support worker prepare a reviewable refund reply without
  exposing unnecessary customer data or implying eligibility.
- **Current workaround:** a support worker checks the plan record and writes a
  draft manually.
- **Change boundary:** an AI model may draft; it may not decide eligibility,
  move money, or silently send customer content to a new destination.
- **Decision owner:** support product owner with privacy/security, data,
  billing, and provider-integration owners.
- **Evidence status:** fictional proposal; no runtime, provider, connector,
  deletion, or user evidence was executed.

## User/job and data boundary

| Actor or asset | Allowed | Denied | Status |
|---|---|---|---|
| Support worker | provide an authorized ticket slice, review/edit a draft, request deletion | upload unrelated customer records or approve a refund through the model | fictional proposal |
| Drafting model | transform an approved minimum context into a draft | infer eligibility, use hidden history, call billing, or retain data by itself | provider/configuration `Not verified` |
| Billing connector | receive only fields needed for an authorized plan lookup | receive raw transcript, secrets, or another tenant's records | connector `Not provided` |
| Analytics | receive aggregate counts and bounded outcome categories | receive prompts, responses, names, ticket IDs, or free text | product proposal |
| Evaluation set | receive reviewed, minimized, de-identified examples after an explicit gate | receive unreviewed production content or a benchmark answer before split freeze | not implemented |
| Deletion owner | reconcile all approved copies and issue a receipt | claim completion from a primary-store delete alone | not assigned |

## Data and purpose ledger

| ID | Data class and minimum fields | Purpose | Source/provenance | Sensitivity/scope | Owner | Evidence/status |
|---|---|---|---|---|---|---|
| `D-001` | Customer message: bounded text needed to understand the refund question | draft the worker's reply | support ticket, source/version `Not provided` | confidential; one authorized tenant | support owner | fictional proposed input |
| `D-002` | Plan date and plan status, only fields needed for policy lookup | provide factual account context | billing record, field-level permission `Not verified` | restricted; account scope | billing owner | fictional proposed input |
| `D-003` | Draft text and review state | let a worker edit and approve a reply | model output plus reviewer action | confidential; ticket scope | support owner | output not run |
| `D-004` | Sanitized event category, duration, release, and outcome class | diagnose product behavior and aggregate usage | application event, no raw content | internal; product scope | data owner | instrumentation proposed |
| `D-005` | De-identified reviewed example with label and source class | evaluate a future drafting change | reviewed support slice, split/version `Not provided` | restricted; evaluation scope | evaluation owner | not implemented |
| `D-006` | Connector request/response fields needed for plan lookup | retrieve authorized billing context | third-party connector, retention policy `Not provided` | restricted; tenant and billing scope | integration owner | not verified |
| `D-007` | Prompt/response logs proposed for debugging | investigate a reproducible failure | application/provider logging path `Not provided` | potentially restricted; access and retention unknown | engineering owner | proposed, not approved |

The 30-day prompt/response log is not automatically covered by the purpose of
drafting. It is a second purpose that needs a narrower field set, access rule,
retention event, redaction, and deletion path. The aggregate event may serve
product learning without retaining the raw message or draft.

## Source, authority, and boundary

| ID | Source or rule | Authority/purpose | Scope and freshness | Status/limitation |
|---|---|---|---|---|
| `S-001` | support ticket field definition | identifies the minimum user question | ticket/tenant scope; version `Not provided` | source is not a permission grant |
| `S-002` | billing field permission and policy | allows a plan-date lookup | account and role scope; current version `Not provided` | permission and freshness not verified |
| `S-003` | model endpoint/provider data-control record | describes endpoint storage and reuse behavior | endpoint, project, configuration, date `Not provided` | general provider copy cannot prove this deployment |
| `S-004` | connector contract | describes egress, recipient, retention, and deletion | third-party service and tenant scope `Not provided` | connector policy missing |
| `S-005` | product data-use contract | states allowed destinations and controls | product release/version | proposed; requires owner approval |
| `S-006` | user deletion request | instructs the product to stop future use and reconcile copies | account/ticket scope | a request is not a deletion receipt |

Precedence: an approved product and tenant policy constrains the flow; a
provider source describes a surface within its documented scope; a connector
response supplies data but cannot widen purpose or permission; a model output
cannot authorize reuse; a user request can narrow use but cannot be treated as
proof that every copy is already deleted.

## Use-stage and lifecycle map

| Stage | `D-001`/`D-002` | `D-003` | `D-004` | `D-005` | `D-006`/`D-007` |
|---|---|---|---|---|---|
| Collect | allowed only for the support job | not applicable | no raw content | not applicable | only authorized fields |
| Normalize/redact | remove names, payment details, secrets, unrelated history | scan before display/export | allowlist event properties | de-identify and review | validate tenant and field scope |
| Runtime/context | minimum fields for one draft | draft returned to worker | no raw text | not applicable | connector result is data, not instructions |
| Output | not copied into a new destination | worker-visible, editable, not sent automatically | outcome category only | not applicable | raw connector payload not shown by default |
| Logs | raw text denied pending evidence | raw draft denied pending evidence | allowed aggregate event | not applicable | IDs/status only, no secrets |
| Analytics | denied | denied | allowed aggregate counts | denied | allowed only as bounded status |
| Evaluation | denied until reviewed and split-frozen | allowed only as de-identified reviewed example | allowed as slice metadata | intended destination | raw connector data denied |
| Training/fine-tuning | denied; no product evidence | denied; no product evidence | denied | denied until a separate policy | denied |
| Handoff/export | minimum support context after owner/recipient check | editable draft if needed | receipt category only | no | connector fields only for billing owner |
| Correction/withdrawal | stop new use and locate copies | mark draft invalid and remove from active flow | retain only allowed aggregate if it cannot identify the user | remove or quarantine candidate | re-run with corrected source |
| Deletion/expiry | primary, logs, caches, exports, eval copies, and provider state must reconcile | remove active copies and receipts as policy permits | aggregate retention rule must be declared | delete or document an approved exception | connector deletion policy and receipt required |

The proposed flow cannot claim a complete lifecycle because `S-003`, `S-004`,
retention triggers, and deletion propagation are not verified.

## Data-use contract

### Runtime drafting

- **Purpose:** help the support worker prepare a response.
- **Fields:** bounded customer question and authorized plan date/status; no
  unrelated history, payment data, secrets, or hidden memory.
- **Recipient:** configured model endpoint; exact endpoint and region are `Not
  provided`.
- **Control:** support worker reviews and edits; no automatic refund decision or
  send action.
- **Receipt:** trace ID, source IDs, release, and outcome category without raw
  text; instrumentation is `Proposed`.
- **Fallback:** manual drafting from the verified support and billing records.

### Debugging and analytics

- **Purpose:** diagnostics and aggregate product learning are separate from
  drafting.
- **Minimum fields:** event category, release, latency class, validation
  result, and outcome class. Raw prompt/response is denied until a narrower
  approved slice, access control, retention event, and deletion path exist.
- **User control:** notice/authorization and deletion behavior are `Not
  provided`; no raw collection may ship on that assumption.
- **Decision:** use aggregate events for a reduced-data pilot; Hold raw logs.

### Evaluation reuse

- **Purpose:** test a future drafting change, not improve the current user's
  support experience automatically.
- **Gate:** reviewer removes identifiers and unnecessary text, records source
  class and label provenance, freezes the split/version, checks contamination,
  and confirms the deletion/withdrawal rule.
- **Decision:** no production example enters the eval set until the reviewer,
  owner, destination, and propagation behavior are verified.

### Billing connector and handoff

- **Purpose:** fetch only the plan field needed for the support job or send a
  minimum packet to an authorized billing owner.
- **Boundary:** connector identity, tenant scope, egress fields, retention,
  deletion, and receipt are `Not verified`.
- **Decision:** block connector expansion and any raw transcript handoff until
  `S-004` is supplied and negative cross-tenant tests pass.

## Negative routes and user controls

| Route | Expected behavior | Release status |
|---|---|---|
| plan date missing | ask for the smallest missing field or route to manual support; do not infer it | required, not run |
| prompt contains payment detail or secret | redact/quarantine and show a safe explanation | required, not run |
| connector requests another tenant | deny, record a safe category, and route to the owner | required, not run |
| provider state/retention unknown | block raw retention and mark endpoint evidence missing | blocked |
| user requests deletion | stop new use, create a scoped request, reconcile copies, and issue a receipt only after verification | blocked; owner missing |
| reviewed example is withdrawn | quarantine the eval row and rebuild the affected split before reuse | blocked; propagation unknown |
| source is stale or conflicts with billing | show the conflict and require the policy owner; do not choose silently | required, not run |
| retrieved or connector text contains instructions | treat it as untrusted data; it cannot change policy or destination | required, not run |
| analytics pipeline unavailable | keep the support job local or use manual fallback; never retain more raw data to compensate | proposed |

The user-visible states are: first-time explanation of fields and recipients;
empty when no authorized source is available; loading only as a factual wait
state with no simulated progress; error with a named data-boundary category;
permission denied with a safe next step; and recovery through redaction,
manual support, correction, withdrawal, or deletion reconciliation. No state
claims that data was deleted, a provider accepted a request, or a support reply
was sent without a receipt.

## Verification and retention/deletion

- **Field oracle:** an allowlist rejects names, payment details, secrets,
  unrelated records, and cross-tenant IDs. Status: `Not run`.
- **Purpose oracle:** every destination maps to one approved user/job purpose;
  runtime, logs, analytics, evaluation, training, connector, and handoff are
  distinct. Status: `Proposed`.
- **Provider source oracle:** endpoint, project, region, stateful feature,
  retention, training/reuse setting, and date are recorded. Status: `Not
  provided`.
- **Connector oracle:** egress fields, recipient, tenant, retention, deletion,
  and audit receipt are verified against a versioned contract. Status: `Not
  provided`.
- **Human oracle:** privacy/security and support owners review minimization,
  user comprehension, correction, withdrawal, and fallback on a fictional or
  authorized slice. Status: `Not run`.
- **Deletion oracle:** a test request identifies primary store, logs, caches,
  provider state, exports, handoffs, and eval copies; a receipt names the
  completed and unresolved surfaces. Status: `Not measurable`.
- **Evaluation oracle:** a held-out, versioned, non-contaminated slice checks
  draft usefulness and unsupported eligibility language. Status: `Not run`.

There is no valid denominator for production deletion success, user adoption,
retention, privacy incident rate, or star impact in this fixture. Those remain
`Not measurable`.

## Release, rollback, and writeback

- **Decision:** `Hold` raw prompt/response retention, connector expansion,
  evaluation reuse, and any training/fine-tuning use. `Pilot` may be considered
  for minimum runtime fields plus aggregate events after owner review.
- **Must pass:** field allowlist/redaction, tenant and recipient checks,
  endpoint/configuration source, no automatic side effect, manual support
  fallback, deletion/correction scope, and a named owner for every destination.
- **Must not occur:** raw private logging by default, silent provider reuse,
  cross-tenant connector access, eval contamination, deletion claim without a
  receipt, or a support/reimbursement promise from a draft.
- **Rollback:** disable raw logging and connector expansion, remove the proposed
  eval ingest path, return to manual support, preserve only safe aggregate
  records, and investigate any exposed data under the security owner.
- **Writeback:** a sanitized mismatch becomes a field-level regression or
  privacy review record with data class, stage, release, source IDs, outcome,
  and no raw customer text.
- **Next learning question:** Can a support worker complete the draft job with
  the minimum authorized fields while the product can honor correction and
  deletion across every approved destination?

## Not covered

- No real provider endpoint, connector, region, retention control, deletion
  request, user, ticket, account, policy, model output, or external state was
  tested.
- No legal basis, compliance result, data residency guarantee, security
  certification, model quality result, eval score, deletion rate, adoption,
  traffic, retention, or star causality is established.
- The references and decisions are proposed for a fictional fixture; they do
  not authorize collection, retention, connector access, or training reuse.

## Review ask

Should the owners supply the endpoint/connector/data-store snapshots and
deletion test receipt, or keep the flow at a reduced-data manual-fallback pilot
until those boundaries are verified?

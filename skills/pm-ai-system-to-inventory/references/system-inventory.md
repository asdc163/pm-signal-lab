# AI system inventory record

This reference is a practical record template, not a registry mutation, system
discovery result, safety assessment, or compliance attestation. Keep declared
fields separate from observed receipts.

## 1. Decision frame

> Inventory `<stable system ID/name/type>` used by `<actor/owner>` for
> `<purpose/job>` on `<surface/audience>`, with dependencies
> `<model/tool/data/provider>` and side effects `<none/declared>`, at state
> `<Proposed/Pilot/Active/Paused/Retired/Unknown>`, as of `<time>`. Do not
> treat the record as proof of readiness.

| Field | Entry |
| --- | --- |
| Decision owner | `<accountable role and escalation>` |
| System ID | `<stable ID>` |
| Record status | `Draft / Current / Stale / Retired / Duplicate` |
| Lifecycle state | `Proposed / Pilot / Active / Paused / Retired / Unknown` |
| Observed at | `<timestamp and source>` |
| Next action | `Register / Complete fields / Hold / Retire or review` |
| Irreversible action | `<launch / use / access / publish / delete / retire>` |

## 2. Identity and boundary

| Field | Answer | Status / evidence |
| --- | --- | --- |
| Display name / aliases | `<names>` | `Reported / Observed / Unknown` |
| System type | `feature / assistant / agent / workflow / endpoint / vendor capability` | `<source>` |
| Parent / child | `<product, workflow, model, deployment>` | `<relationship receipt>` |
| In scope | `<tasks, environments, tenants, surfaces>` | `<owner/source>` |
| Out of scope | `<prohibited tasks, users, actions>` | `<policy/owner>` |
| Trigger | `<event, request, schedule, human action>` | `<source>` |
| Direct users | `<roles / segments>` | `<reported, not adoption proof>` |
| Operators / reviewers | `<roles>` | `<owner/queue>` |
| Affected parties | `<people/assets who may be affected>` | `<context, not impact score>` |
| Human boundary | `<person-owned review, approval, or fallback>` | `<source/owner>` |

If the system cannot be distinguished from a shared model or vendor product,
keep the dependency relationship and request a local system ID.

## 3. Ownership and actor ledger

| Responsibility | Actor / owner | Evidence | Status |
| --- | --- | --- | --- |
| Purpose and scope | `<product owner>` | `<decision/PRD>` | `Known / Unknown` |
| Deployment / operation | `<operator / team>` | `<environment receipt>` | `Known / Unknown` |
| Model/provider relationship | `<provider / integrator>` | `<contract/provider doc>` | `Documented / Unknown` |
| Data/source stewardship | `<data owner>` | `<purpose/source record>` | `Known / Unknown` |
| Permission / side-effect approval | `<authorized role>` | `<policy/approval>` | `Declared / Not verified` |
| Human review / escalation | `<review owner>` | `<runbook/queue>` | `Planned / Observed / Unknown` |
| Incident contact | `<response owner>` | `<runbook/issue>` | `Known / Unknown` |
| Change review | `<revalidation owner>` | `<change record>` | `Planned / Unknown` |
| Retirement | `<decommission owner>` | `<retirement plan>` | `Planned / Unknown` |

An alias, vendor support address, or team name is not enough for accountability
when the system can create a consequential side effect.

## 4. Surface and dependency map

| Surface / dependency | Relation | Version / scope | Owner | Freshness | Failure / mismatch | Receipt |
| --- | --- | --- | --- | --- | --- | --- |
| `<UI/API/batch/worker>` | `<invokes/displays/receives>` | `<env/tenant>` | `<role>` | `<date/rule>` | `<manual/deny/unknown>` | `<artifact>` |
| `<model/provider>` | `<generates/classifies/embeds>` | `<model/snapshot/endpoint>` | `<role>` | `<date/rule>` | `<fallback>` | `<source>` |
| `<tool/connector>` | `<reads/writes/acts>` | `<schema/resource>` | `<role>` | `<date/rule>` | `<deny/manual/retry>` | `<contract>` |
| `<data/source>` | `<context/retrieval/log/eval>` | `<purpose/tenant>` | `<role>` | `<date/rule>` | `<stale/unavailable>` | `<source>` |
| `<human queue>` | `<reviews/approves/escalates>` | `<scope/SLA>` | `<role>` | `<date/rule>` | `<fallback>` | `<runbook>` |

The model, tool, or provider document is a dependency source. It does not prove
that this system uses that version or that the dependency is reliable.

## 5. Data, permissions, and policy links

| Boundary | Required fields | Current evidence | Next receipt |
| --- | --- | --- | --- |
| Input/output data | classes, purpose, tenant, sensitivity, retention, deletion | `<source/status>` | `<owner/action>` |
| Logs/evaluation | events, raw-content policy, access, retention, dataset destination | `<source/status>` | `<owner/action>` |
| Model/provider | ID, version, endpoint, region, fallback, lifecycle | `<source/status>` | `<owner/action>` |
| Tools/connectors | operation, resource scope, side effect, idempotency, manual route | `<source/status>` | `<owner/action>` |
| Permissions | principal, credential class, action, approval, expiry, revocation | `<policy/status>` | `<identity owner>` |
| Product policy | policy/config ID, authority, effective time, precedence, change trigger | `<source/status>` | `<policy owner>` |

Link to separate data-purpose, identity, tool, and policy packets instead of
copying sensitive detail into this inventory. A permission declaration is not an
authorization receipt.

## 6. Lifecycle and freshness

| State | Meaning | Minimum receipt | Revisit trigger |
| --- | --- | --- | --- |
| `Proposed` | considered or designed | purpose, owner, boundary, dependency hypotheses | scope or owner changes |
| `Pilot` | bounded test or limited use | scope, human boundary, fallback, stop rule | pilot end or material change |
| `Active` | operating within named scope | current version, owner, controls, review, operation receipt | version/policy/owner/surface change |
| `Paused` | use gated pending a condition | pause reason, affected scope, resume/retire owner | evidence or approval change |
| `Retired` | no longer intended for use | no-use/disablement/owner-transfer receipt | discovered use or dependency |
| `Unknown` | current state cannot be established | source request and hold boundary | any attempted use |

Freshness needs a rule: `review every 30 days`, `on model change`, `on policy
change`, or another owner-approved trigger. A timestamp without a rule is not a
freshness guarantee.

## 7. Evidence and change ledger

| Evidence ID | Layer | Source / receipt | Scope | Status | Limitation | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| `E-01` | `identity/design/implementation/operation/review` | `<artifact>` | `<named scope>` | `Observed / Reported / Planned / Unknown` | `<cannot prove>` | `<owner/date>` |

Link material changes and incidents:

| Event | What changed / happened | Affected fields | Record link | Current state | Owner |
| --- | --- | --- | --- | --- | --- |
| `<model/tool/source/policy/permission/owner/incident>` | `<summary>` | `<fields>` | `<ID/URL>` | `Open / contained / revalidate / retired` | `<role>` |

When a material field changes, route to `pm-ai-change-to-revalidation` before
reusing an `Active` or `Pilot` decision. An incident link is not proof that the
system is restored.

## 8. Route rules

| Route | Condition | Smallest next action |
| --- | --- | --- |
| `Register` | stable identity, purpose, owner, boundary, and minimum dependencies are known | create/maintain the scoped record and set review ownership |
| `Complete fields` | identity is clear but material fields or receipts are missing | name one owner and capture the smallest missing field |
| `Hold` | identity, owner, scope, permission/side-effect boundary, or current state is too unclear for the intended action | block the consequential action and preserve fallback/escalation |
| `Retire or review` | stale, duplicate, ownerless, paused too long, changed, or retirement evidence is incomplete | reconcile dependencies and decide refresh, pause, replacement, or retirement |

## 9. Review checklist

- [ ] stable system ID, display name, aliases, type, parent, status, and observed
  time are present;
- [ ] purpose, trigger, in/out scope, users, operators, affected parties, and
  human boundary are explicit;
- [ ] each dependency and surface has relation, version/scope, owner, freshness,
  failure path, and receipt or `Unknown`;
- [ ] data, model, tool, permission, and policy links preserve their own
  authority and evidence boundaries;
- [ ] lifecycle state, review cadence, change/incident links, and retirement
  trigger are current or marked unknown;
- [ ] one route and one smallest next action are visible;
- [ ] no inventory form is presented as safety, compliance, adoption, value,
  quality, or production proof;
- [ ] public examples are fictional or sanitized.

## Official mapping inputs

This record is informed by:

- [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) — governance roles, AI-system inventory, lifecycle context, and continuous review;
- [European Commission guidance on obligations for general-purpose AI providers](https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers) — documentation for downstream providers and keeping documentation up to date through the model lifecycle;
- [OpenAI Frontier](https://openai.com/business/frontier/) — enterprise agent identity/access, auditable actions, governance, and observability patterns;
- [OpenAI Presence](https://openai.com/index/introducing-openai-presence/) — workflow-specific policies, guardrails, approved actions, evaluations, escalation, and controlled change.

These references do not prove that a local system exists, is correctly
inventoried, is compliant, safe, adopted, valuable, or production-ready.

## Not covered

This reference does not discover systems, write to a registry, implement access
control, assess impact, interpret law, certify compliance, inspect production,
or prove quality, safety, privacy, security, adoption, value, causality,
accessibility, or readiness. A fictional fixture or complete table is not proof
of any of those outcomes.

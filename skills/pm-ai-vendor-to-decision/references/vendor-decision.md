# AI vendor dependency decision packet

This reference is a reusable diligence worksheet. The sample entries below are
a **fictional fixture**; replace them with scoped, authorized evidence before
using a packet for adoption, renewal, expansion, routing, or exit. A source,
contract, product configuration, and runtime receipt are different layers.

## 1. Decision frame

> Decide whether `<provider/entity/service/plan/version>` is eligible for
> `<user job>` in `<tenant/region/surface/environment>`, under data and
> permission boundary `<boundary>`, with operations/support `<receipt>`, cost
> and limits `<unit>`, portability/exit `<condition>`, and owner `<role>`
> before `<adopt/renew/expand/route/hold/replace>`.

| Field | Entry | Evidence / status |
| --- | --- | --- |
| User or business job | `<one user outcome and current workaround>` | `Reported / Observed / Unknown` |
| Decision owner | `<product owner and escalation>` | `Named / Unknown` |
| Provider/entity/service | `<legal entity, product, plan, model/tool role>` | `Source / Contract / Unknown` |
| Scope | `<tenant, account, region, locale, channel, volume, environment>` | `Bounded / Unknown` |
| Data boundary | `<classes, purpose, retention, reuse, egress, deletion>` | `Source / Contract / Unknown` |
| Permission boundary | `<principal, action, approval, expiry, revocation>` | `Policy / Verified / Unknown` |
| Irreversible action | `<expose data, commit spend, renew, route, publish, or exit>` | `<decision consequence>` |
| Must-not-fail boundary | `<privacy, side effect, region, support, or other hard condition>` | `Known / Unknown` |
| Route | `Compare bounded / Need due diligence / Hold / Exit or replace` | `<one sentence>` |

Do not compare a vendor without fixing the job, scope, candidate identity, and
decision owner. A broad request for “the best provider” becomes a bounded
comparison or `Need due diligence` packet.

## 2. Provider and source ledger

| ID | Source / section | Entity / role | Plan/scope | Version/date | Region/tenant | Supports | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `S-01` | `<official terms, technical doc, security/privacy doc, or contract>` | `<provider/model/app/tool/support/contract>` | `<plan>` | `<version/date>` | `<scope>` | `<specific statement>` | `<not runtime/legal/value proof>` |

Use official and authorized sources where possible. Preserve source wording and
the team's interpretation in separate fields. Record a sales deck or search
snippet as a reported source only; it does not become an effective term.

## 3. Hard eligibility map

| Field | Required question | Evidence | Status | Owner / next receipt |
| --- | --- | --- | --- | --- |
| Job fit | Does the service support the named job, modality, volume, and user scope? | `<test/doc>` | `Known / Unknown` | `<owner/action>` |
| Provider role | Who provides model, app, tool, data, support, and contract? | `<identity/source>` | `Known / Unknown` | `<owner/action>` |
| Data use | What enters, is retained, reused, trained on, or shared? | `<terms/contract>` | `Source / Contract / Unknown` | `<owner/action>` |
| Region/tenant | Which account, workspace, region, and isolation boundary applies? | `<config/term>` | `Known / Unknown` | `<owner/action>` |
| Permission | Which principal can read, write, publish, or cause a side effect? | `<policy/auth receipt>` | `Policy / Verified / Unknown` | `<owner/action>` |
| Technical limits | What are context, quota, rate, modality, version, outage, and fallback limits? | `<technical doc/test>` | `Documented / Observed / Unknown` | `<owner/action>` |
| Security/privacy | What review exists, with scope, date, owner, and limitation? | `<review/artifact>` | `Supplied / Reviewed / Unknown` | `<owner/action>` |
| Support/operations | Who responds, through which channel, with what commitment and recovery? | `<support/SLA/runbook>` | `Term / Reported / Unknown` | `<owner/action>` |
| Economics | What cost unit, minimum, overage, quota, currency, date, and scenario apply? | `<quote/terms/calculation>` | `Known / Unknown` | `<owner/action>` |
| Exit | Can data, prompts, configs, outputs, and workflow state be exported/replaced? | `<plan/test/term>` | `Plan / Tested / Unknown` | `<owner/action>` |
| Owner | Who approves, monitors, renews, narrows, and exits? | `<role acceptance>` | `Named / Unknown` | `<owner/action>` |

If a hard field is missing or fails the named scope, use `Need due diligence` or
`Hold`. Do not hide it inside a preference score or average.

## 4. Evidence ladder

| Layer | Minimum receipt | Safe wording | Cannot establish by itself |
| --- | --- | --- | --- |
| `provider_identity` | entity, service, plan, role, model/tool relationship, source date | “The source names…” | contract applicability or uptime |
| `service_contract` | authorized term, scope, effective date, support, renewal/termination | “The scoped term states…” | legal sufficiency or operation |
| `data_use` | collection, purpose, retention, reuse/training, egress, region, subprocessors | “The document says…” | actual runtime flow or legal basis |
| `technical_dependency` | endpoint, interface, version, limits, region, fallback boundary | “The integration depends on…” | quality, uptime, or migration safety |
| `operations_support` | channel, owner, incident path, SLA/commitment, quota, recovery | “The operating plan provides…” | observed response or reliability |
| `economics_limits` | dated unit, quota, overage, minimum, scenario, budget | “The scenario assumes…” | savings, ROI, or future price |
| `portability_exit` | export, adapter, fallback, deletion, notice, termination, replacement plan | “The exit plan requires…” | successful exit or zero lock-in |
| `product_receipt` | configured/tested/observed use for named job and scope | “The test recorded…” | population quality, adoption, or readiness |
| `governance_owner` | accountable product, contract, data, security, and operations roles | “The role is named…” | owner acceptance or effective control |

Use `Unknown`, `Not provided`, `Not negotiated`, `Not verified`, `Not run`,
`Not measured`, or `Not covered` instead of filling a gap with a market
assumption. A vendor page is not a contract; a contract is not a product
receipt; a successful call is not an availability guarantee.

## 5. Dependency and operating map

| Dependency | Product question | Vendor/contract source | Product receipt | Failure / fallback | Gap / owner |
| --- | --- | --- | --- | --- | --- |
| Data/use | What exact data class crosses which boundary for what purpose? | `<term/source>` | `<config/test/Not run>` | `<redact/block/manual>` | `<gap>` |
| Model/tool | Which ID/version/endpoint/region is used and how can it change? | `<doc/term>` | `<route receipt>` | `<fallback/hold>` | `<gap>` |
| Permission | Who can call, read, write, publish, or approve? | `<policy/term>` | `<authorization receipt>` | `<deny/manual>` | `<gap>` |
| Support | Which team, channel, scope, response, and recovery path exists? | `<support/SLA>` | `<incident/test>` | `<manual/queue>` | `<gap>` |
| Economics | What unit, quota, overage, budget, and demand scenario apply? | `<quote/terms>` | `<calculation/observed usage>` | `<cap/hold>` | `<gap>` |
| Retention/exit | What is kept, exported, deleted, or unavailable on termination? | `<term/contract>` | `<deletion/export test>` | `<manual/hold>` | `<gap>` |

Record latency/availability only with a method and observation window. Record a
public price only as a dated source with scope and limits; it is not a cost or
savings result for the product.

## 6. Lock-in and exit map

| Lock-in surface | Coupled asset or behavior | Exit condition / trigger | Owner | Receipt needed |
| --- | --- | --- | --- | --- |
| Data | prompts, files, embeddings, logs, eval records, deletion state | export/deletion/tenant test before renewal or data-term change | `<role>` | `<artifact/date>` |
| Interface | API schema, tool calls, errors, SDK, model-specific behavior | adapter or fallback passes representative and negative tests | `<role>` | `<artifact/date>` |
| Workflow | prompt conventions, reviewer habits, UI, policy, training | portable asset and paired test preserves the named job | `<role>` | `<artifact/date>` |
| Operations | quota, support, region, incidents, staffing, runbook | manual route or replacement capacity is available | `<role>` | `<artifact/date>` |
| Contract | renewal, notice, termination, price/change, data deletion terms | authorized scoped term and notice calendar | `<role>` | `<artifact/date>` |

Describe the coupling mechanism instead of assigning an unsupported lock-in
score. If no reasonable fallback exists for a consequential job, use `Hold` or
`Exit or replace`. An exit plan is not an exit result.

## 7. Route rules

| Route | Use when | Required next action | Do not imply |
| --- | --- | --- | --- |
| `Compare bounded` | candidates have one job/scope, criteria, sources, hard fields, and open unknowns | run only the named comparison and assign evidence owners | recommendation, approval, or production guarantee |
| `Need due diligence` | a material data, contract, privacy/security, support, limit, owner, or exit field is missing/disputed | ask one authorized owner for the smallest source, term, or receipt | provider failure or adoption |
| `Hold` | a hard boundary is unsafe, authority unresolved, owner absent, or consequence is unbounded | block adopt/renew/expand/route and preserve manual/fallback path | permanent rejection |
| `Exit or replace` | dependency is stale, ineligible, ownerless, materially changed, or lacks an acceptable exit | set scope/notice/owner, test replacement/manual path, verify cleanup | automatic vendor contact, deletion, or migration |

## 8. Output checklist

- [ ] One job, scope, owner, irreversible action, and must-not-fail boundary are explicit.
- [ ] Entity, service, plan, model/tool, provider role, and contract role are distinct.
- [ ] Source dates, scope, authority, interpretation, and limitations are recorded.
- [ ] Data/use, region/tenant, permission, security/privacy, limits, support, cost, and exit are explicit or marked unknown.
- [ ] Product configuration and runtime receipts are separate from vendor and contract sources.
- [ ] Lock-in mechanisms, triggers, owner, fallback, and exit tests are visible.
- [ ] One route, one smallest next action, and one review ask are present.
- [ ] The packet does not rank or recommend a vendor, give legal advice, or claim adoption, savings, reliability, safety, compliance, or production readiness.

## Official mapping inputs

This worksheet is informed by:

- [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) — governance roles, AI-system inventory, lifecycle context, and third-party/accountability questions;
- [European Commission guidance on obligations for general-purpose AI providers](https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers) — downstream documentation and keeping documentation current through the model lifecycle;
- [OpenAI Frontier](https://openai.com/business/frontier/) — identity/access, auditable actions, governance, and observability patterns;
- [OpenAI Presence](https://openai.com/index/introducing-openai-presence/) — workflow-specific policies, guardrails, approved actions, evaluations, escalation, and controlled change.

These sources shape the fields; they do not prove a vendor's eligibility,
contract, privacy, security, compliance, reliability, value, adoption, or
production readiness.

## Not covered

This reference does not rank or recommend vendors, negotiate or sign contracts,
give legal/procurement/security advice, inspect a billing account, call a
provider, scrape live prices, verify an SLA, migrate a workload, delete data,
or execute an exit. It does not prove model quality, reliability, privacy,
security, compliance, savings, adoption, value, causality, or production
readiness. A complete packet or fictional fixture is not any of those receipts.

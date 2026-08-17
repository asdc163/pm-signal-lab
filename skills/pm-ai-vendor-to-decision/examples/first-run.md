# First run: a fictional provider dependency decision

This is a **fictional fixture** for learning the skill. It is not a vendor
recommendation, procurement record, contract interpretation, security review,
price quote, service-level proof, product receipt, or production approval.

## Request

A fictional PM says:

> “We want to use Lantern AI's hosted answer API for a support-draft workflow.
> Compare it with our current manual path and tell me whether we can adopt it
> for English support in one workspace.”

The provider name, service boundary, data terms, region, tenant isolation,
model/version, limits, support commitment, contract owner, and exit path are
fictional and not verified. The request is intentionally narrowed to one job,
one workspace, one locale, and a draft-only outcome.

## Decision frame

- **Job:** draft an answer from an approved help-article set for a support
  agent to edit and send.
- **Scope:** fictional Northstar Help, one workspace, `en-US`, browser draft
  surface, no autonomous send or account action.
- **Candidate:** Lantern AI hosted answer API, fictional provider and service.
- **Alternative:** current manual search-and-draft path; no benchmark supplied.
- **Owner:** fictional Support Product PM; data, security, contract, and
  support owners are not assigned.
- **Irreversible action:** sign/renew a provider commitment or expose customer
  content to the candidate service.
- **Route:** `Need due diligence`.

## Provider and source ledger

| ID | Source / role | What it supports | Limit |
| --- | --- | --- | --- |
| `S-01` | [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | governance, roles, inventory, and third-party context should be explicit | framework mapping input; not proof about Lantern AI |
| `S-02` | [European Commission GPAI guidance](https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers) | downstream documentation and lifecycle freshness are useful questions | guidance does not classify this fictional service or decide applicability |
| `S-03` | [OpenAI Frontier](https://openai.com/business/frontier/) | identity/access, auditable actions, monitoring, and governance are relevant operating patterns | provider material; not a Lantern AI receipt |
| `S-04` | [OpenAI Presence](https://openai.com/index/introducing-openai-presence/) | policies, approved actions, evaluations, escalation, and controlled changes are relevant product questions | provider material; not proof of this workflow |
| `S-05` | fictional Lantern AI provider brief `v0.1` | proposed API role, draft-only example, and a fictional integration boundary | no verified terms, endpoint, region, data use, support, limits, price, or contract |
| `S-06` | fictional Northstar Help workflow note | job, source set, human edit/send boundary, and workspace scope | no implementation, runtime, quality, adoption, or owner receipt |

## Hard eligibility map

| Field | Current entry | Status / smallest next receipt |
| --- | --- | --- |
| Job fit | draft from approved help articles; modality and volume not supplied | `Unknown`; run a bounded workflow test after service identity is fixed |
| Provider role | Lantern AI is described as hosted API provider; model and subprocessors are not named | `Reported`; request provider/entity/service/plan relationship |
| Data use | help-article context and customer question may cross the service boundary | `Unknown`; authorized data owner needs retention, reuse/training, deletion, and subprocessor terms |
| Region/tenant | one fictional workspace, `en-US`; service region and tenant isolation absent | `Unknown`; request region, account, workspace, and isolation scope |
| Permission | support agent edits and sends; API should draft only | `Declared`; verify credential principal, scope, expiry, revocation, and no-send enforcement |
| Technical limits | endpoint, model/version, context, quota, rate limit, outage, and fallback absent | `Unknown`; request versioned technical contract and run receipt |
| Security/privacy | no review artifact, scope, date, or limitation supplied | `Unknown`; assign authorized security/privacy review |
| Support/operations | no support channel, response commitment, incident owner, or recovery path | `Unknown`; request plan/tier and operational receipt |
| Exit | manual path exists, but export, adapter, prompt portability, deletion, and trigger are absent | `Plan only`; write and test the smallest exit route |
| Owner | PM is named; contract, data, security, and operations owners are not | `Incomplete`; name accountable owners before commitment |

## Dependency and operating map

| Dependency | Vendor/contract claim | Product receipt | Gap |
| --- | --- | --- | --- |
| Question/article data | `Not provided` | `Not run` | data class, purpose, retention, region, and deletion owner |
| Model/API | fictional hosted API brief `v0.1` | `Not run` | endpoint, model/version, schema, limits, error behavior, and change notice |
| Draft-only permission | fictional workflow note | `Not run` | authorization and negative test proving no send/account action |
| Support/fallback | `Not provided` | manual path is described, not tested as fallback | support term, outage route, capacity, and recovery test |
| Economics | `Not provided` | `Not measured` | cost unit, quota, overage, scenario, and date |

## Lock-in and exit map

| Surface | Coupling mechanism | Exit receipt needed | Trigger / owner |
| --- | --- | --- | --- |
| Data | prompts, article chunks, logs, and evaluation records may use provider-specific storage | export/deletion test scoped to the workspace | data owner / retention or contract change |
| Interface | hosted endpoint schema and error behavior may enter the draft workflow | adapter or manual fallback test | engineering owner / breaking API change |
| Workflow | prompt conventions and reviewer habits may depend on output shape | portable prompt + paired manual/provider test | product owner / quality or behavior drift |
| Operations | quota, support, region, and incident process may affect response flow | runbook and capacity test | support owner / incident or limit breach |
| Contract | renewal, notice, termination, and change terms are absent | authorized term with scope/date and exit notice | contract owner / renewal or material term change |

## Why the route is `Need due diligence`

The fictional packet is enough to name a candidate and a manual alternative,
but not enough to adopt, renew, compare on weighted criteria, or call the
provider safe, private, reliable, cheap, or portable. The smallest next action
is to ask the authorized owners for the missing data/region/tenant, technical
version/limits, support/contract, security/privacy, permission, and exit
receipts. Keep the manual draft path available while those fields are open.

Do not ask a vendor to sign, upload customer data, change production routing,
or expose a credential from this fixture. If a hard boundary is failed or an
owner cannot be named, change the route to `Hold`.

For route boundaries, use `Compare bounded` only after multiple candidates have
the same job/scope, criteria, hard-field map, and source ledger. Use `Exit or replace`
when the current dependency is stale, ineligible, ownerless, or lacks
an acceptable exit; that route still requires an authorized owner, a tested
replacement or manual path, and cleanup verification.

## Reviewer prompt

Which missing field could make this provider ineligible for the named workspace
first: data use/region, draft-only authorization, technical limits, support, or
exit? Who owns that receipt? Is the manual path actually available at the
required volume, or is that still `Not measured`?

## Not run

No provider website, account, endpoint, API key, customer data, contract,
security portal, billing account, support channel, runtime call, benchmark,
export, deletion, failover, or production route was accessed or executed.

## Not covered

This fixture does not recommend Lantern AI, compare providers, establish legal
terms, privacy, security, compliance, quality, availability, support, savings,
adoption, value, causality, portability, reliability, or production readiness.
All provider and workflow material is fictional; the linked official sources
are mapping inputs, not evidence about the fictional service.

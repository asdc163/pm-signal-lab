# Policy-to-product control map

This reference is a practical worksheet, not legal advice or a compliance
attestation. Keep source wording, applicability, interpretation, control, and
receipts in separate rows.

## 1. Decision frame

> Decide whether `<requirement>` from `<authority/version/section>` applies to
> `<actor/product/system/surface/audience/jurisdiction>` as of
> `<effective date>`, and if so map it to `<control/owner/evidence/fallback>`
> before `<release or operation>`. Do not claim compliance from this worksheet.

| Field | Entry |
| --- | --- |
| Decision owner | `<product / legal / compliance / security / operations role>` |
| User or business job | `<what the product is trying to help someone do>` |
| Irreversible action | `<release / publish / expose / store / act / contract commitment>` |
| Affected people or assets | `<users, operators, customers, third parties, records>` |
| Under-control consequence | `<harm, denial, exposure, cost, or operational failure>` |
| Over-control consequence | `<friction, exclusion, false block, delay, cost>` |
| Selected route | `Map controls / Validate applicability / Hold / Do not claim` |

## 2. Source and authority ledger

| ID | Source / section | Issuer / authority | Version or publication date | Effective date | Jurisdiction / actor | Supports | Does not support |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `S-01` | `<official URL and exact section>` | `<issuer and authorized owner>` | `<date/version>` | `<date or Unknown>` | `<scope>` | `<requirement/guidance>` | `<applicability, implementation, compliance>` |

Keep a short original quote or faithful paraphrase with the source ID. Do not
use a search snippet as the source. If an internal policy, customer contract,
standard, and regulation conflict, record the precedence owner rather than
choosing the newest-looking text.

## 3. Applicability frame

| Field | Answer | Evidence / owner | Status |
| --- | --- | --- | --- |
| Jurisdiction | `<country/region/contract scope>` | `<source or owner>` | `Known / Unknown / Need authority` |
| Actor role | `provider / deployer / employer / operator / other` | `<source or owner>` | `Known / Unknown / Need authority` |
| System type | `<chatbot / generator / classifier / agent / other>` | `<system inventory>` | `Known / Unknown` |
| Modality | `<text / audio / image / video / mixed>` | `<product record>` | `Known / Unknown` |
| Purpose/context | `<job and context>` | `<PRD or owner>` | `Observed / Reported / Planned / Unknown` |
| Product surface | `<UI / API / output / channel / record>` | `<design or runtime>` | `Known / Unknown` |
| Audience | `<direct user / affected person / public / workforce>` | `<product record>` | `Known / Unknown` |
| Effective date | `<date/version>` | `<source>` | `Known / Unknown` |
| Exception or threshold | `<exception and decision owner>` | `<source / authorized review>` | `Known / Unknown / Need authority` |

If a missing row could change the duty, route to `Validate applicability`.

## 4. Requirement ledger

| Requirement ID | Source wording / faithful paraphrase | Modal force | Conditions / exception | Actor | Scope | Interpretation |
| --- | --- | --- | --- | --- | --- | --- |
| `R-01` | `<statement>` | `must / should / may / guidance` | `<condition>` | `<actor>` | `<surface/date>` | `Source fact / Authorized interpretation / Need authority` |

Do not turn a recommendation into a mandate or a public obligation into a
private product rule. If two interpretations are plausible, keep both rows and
name the question that an authorized owner must answer.

## 5. Requirement-to-control map

| Requirement | Control type | Product surface / state | User-visible behavior | Technical / operational behavior | Owner | Fallback | Receipt |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `R-01` | `UX / technical / operational / governance` | `<where/when>` | `<disclosure / label / explanation / none>` | `<config / test / log / review>` | `<role/team>` | `<manual / block / disclose / hold>` | `<artifact and date>` |

Candidate controls should be small enough to review. Examples include:

- an interaction disclosure shown on the relevant surface;
- a machine-readable or visible output label when the source and applicability
  frame require it;
- an approval stop before an agent takes an approved action;
- a versioned policy/config field in a decision or audit receipt;
- a human escalation, appeal, or correction route;
- a documentation, record, deletion, or retention boundary;
- an accessible explanation with localization and non-color cues;
- a monitoring cadence and a policy-change re-review trigger.

These are design candidates, not proof of legal sufficiency.

## 6. Evidence ladder

| Layer | Minimum receipt | Safe wording |
| --- | --- | --- |
| `requirement_source` | official source, section, date/version | “The source states…” |
| `applicability` | role, jurisdiction, system, surface, audience, effective date | “The supplied frame places this in/out of scope…” |
| `interpretation` | authorized review or recorded mapping | “The named owner interprets…” |
| `control_design` | approved UX/spec/control record | “The product proposes…” |
| `implementation` | shipped artifact/config/test with version | “Version X includes…” |
| `operation` | dated runtime/review/audit receipt | “The named scope recorded…” |
| `monitoring` | cadence, signal, owner, change trigger | “The review process observes…” |
| `exception_review` | approver, reason, scope, expiry, compensating control | “An exception is approved until…” |

Never write `compliant`, `certified`, `covered`, or `safe` when only the source
or design layer exists. Use `Unknown`, `Not run`, `Not measured`, or
`Not covered`.

## 7. Conflict and exception ledger

| ID | Conflict / exception | Sources / versions | Affected requirement/control | Precedence owner | Scope / expiry | Compensating control | Route |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `X-01` | `<conflict or exception>` | `<IDs>` | `<R/control>` | `<role>` | `<scope/date>` | `<manual / technical / none>` | `Validate applicability / Hold / Do not claim` |

An exception is not a general permission. Re-check the map when jurisdiction,
actor, purpose, model, surface, audience, or policy version changes.

## 8. Route rules

| Route | Condition | One next action |
| --- | --- | --- |
| `Map controls` | source and applicability are bounded enough to draft controls | assign owners and request design/implementation receipts |
| `Validate applicability` | a missing or disputed applicability field could change the duty | ask the authorized owner one smallest scope question |
| `Hold` | authority, control owner, evidence, conflict, fallback, or recovery is missing | preserve the boundary and block the irreversible action |
| `Do not claim` | requested wording overstates law, coverage, safety, operation, or compliance | replace it with a source-bounded sentence and list the missing receipt |

## 9. Review checklist

- [ ] exact source and authority are recorded;
- [ ] source wording and team interpretation are separate;
- [ ] actor, jurisdiction, system type, surface, audience, effective date, and
  exceptions are explicit or `Unknown`;
- [ ] requirement modal force and conditions are preserved;
- [ ] each control names type, owner, surface, fallback, and receipt;
- [ ] design, implementation, operation, monitoring, and exception evidence are
  not blended;
- [ ] conflicts and stale versions have a precedence owner;
- [ ] legal/compliance claims are owned by an authorized reviewer;
- [ ] public examples are fictional or sanitized;
- [ ] one route and one smallest next action are visible.

## Official mapping inputs

This worksheet is informed by:

- [European Commission: Guidelines on transparency obligations for providers and deployers of AI systems](https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems) — current Article 50 guidance and effective-date context;
- [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) — continuous `Govern`, `Map`, `Measure`, and `Manage` framing, documented roles, context, controls, and review;
- [OpenAI Presence](https://openai.com/index/introducing-openai-presence/) — production agent patterns for policies, guardrails, approved actions, simulations, evaluations, escalation, and controlled changes;
- [Running Codex safely at OpenAI](https://openai.com/index/running-codex-safely/) — bounded execution, approvals, network/identity controls, and agent-native telemetry.

These references do not decide jurisdiction, legal applicability, product
compliance, safety, or production readiness.

## Not covered

This reference does not provide legal advice, interpret a contract, certify a
system, fetch live policy updates, implement controls, inspect production, or
prove adoption, value, quality, safety, fairness, security, causality, or
compliance. A fictional fixture or mapped control is not a legal conclusion.

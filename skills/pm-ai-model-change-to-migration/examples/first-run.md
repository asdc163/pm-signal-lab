# First run: support triage model retirement

This is a fictional fixture showing how to review a model migration as a
product release decision. It is not a provider call, benchmark, customer
transcript, production result, or adoption evidence. All runtime quality,
cost, latency, and compatibility results are intentionally `Not run` or
`Not measured`.

## Decision on the desk

**Decision:** `Hold` the candidate until the baseline and candidate fixture
pack is run and the queue consumer confirms output compatibility.

**User/job:** A support operations lead needs a queue suggestion and an honest
manual-review signal before an operator drafts a reply.

**Change event:** The fictional provider has marked the current model for
retirement and recommends a newer model family. The provider notice is a
source input, not product evidence.

**Owner:** Support platform PM. Engineering owns the parser and rollout flag;
support operations owns the review oracle.

**Current workaround:** The product uses `support_triage.v1` and an operator
corrects uncertain queue suggestions manually.

**Success oracle:** The result must select only a supported queue, preserve the
request language, cite approved evidence IDs, mark `needs_human_review: true`
when evidence is weak or conflicting, and remain compatible with the consumer.

**Evidence boundary:** No provider was called, no model output was collected,
no user traffic changed, and no quality or migration result is implied.

## Model identity ledger

| Field | Baseline | Candidate | Evidence status |
| --- | --- | --- | --- |
| Provider | Fictional Cloud | Fictional Cloud | Fixture only |
| Model ID | `example-triage-2025-06-01` | `example-triage-2026-01-15` | Fixture only |
| Endpoint | `triage-v1` | `triage-v2` | Proposed |
| Region | `Not provided` | `Not provided` | Not measured |
| Lifecycle | Retirement notice | Recommended replacement | Source not attached |
| Prompt/config version | `support_triage.v1` | `support_triage.v2` | Proposed |
| Consumer | Queue parser v1 | Queue parser v1 | Compatibility not run |
| Last known good | `support_triage.v1` | `support_triage.v1` | Deployment not verified |
| Rollout flag | `support_triage_model_v2` | `support_triage_model_v2` | Not changed |
| Data boundary | Minimized support fields | Minimized support fields | Privacy review not run |

The model names and retirement event are fictional. A real packet must attach
the provider source, exact model identity, platform, region, and shutdown
date. A friendly display name is not proof of a pinned snapshot.

## Change classification

- `model-id-or-snapshot`: yes, the candidate has a different model ID;
- `api-or-schema`: possible, because the endpoint and consumer contract differ;
- `capability-or-quality`: possible, but no product comparison is run;
- `cost-or-latency`: unknown;
- `safety-or-policy`: unknown;
- `provider-or-platform`: no change supplied in this fixture;
- `serving-infrastructure`: not measured.

## Impact map

| Surface | Dependency | Risk to check | Status |
| --- | --- | --- | --- |
| Queue suggestion | `queue` enum and evidence IDs | invalid or unsupported queue | Not run |
| Manual review | `needs_human_review` | false certainty on weak evidence | Not run |
| Multilingual operator view | `language` and summary | language loss or mistranslation | Not run |
| Parser | output schema | unknown fields or missing keys | Not run |
| Safety | user text and evidence data | instruction-shaped text changes behavior | Not run |
| Privacy | account state | raw identifiers enter the model or receipt | Not run |
| Operations | flag and fallback | no safe return to v1 | Not run |

## Input and output contract

Allowed inputs are a sanitized message summary, language label, product area,
approved evidence IDs, and coarse account state. Exclude raw email, phone,
address, credentials, tokens, cookies, private URLs, and full transcripts.

Expected output:

```json
{
  "queue": "billing | access | technical | shipping | other | unknown",
  "decision": "route | needs_review | abstain",
  "needs_human_review": true,
  "evidence_refs": ["E-001"],
  "language": "en",
  "reason_summary": "One short, user-safe sentence"
}
```

The parser must reject unknown fields, invalid enums, missing `decision`,
unapproved evidence IDs, and an empty summary. A rejection keeps the manual
route active. It does not send a message or change an account.

## Comparison register

| Case | Slice | Expected behavior | Baseline | Candidate | Status |
| --- | --- | --- | --- | --- | --- |
| `MT-001` | Clear English billing request | route to billing with `E-001` | Not run | Not run | Golden |
| `MT-002` | Clear Spanish shipping request | route to shipping and preserve `es` | Not run | Not run | Golden |
| `MT-003` | Empty message | abstain and require review | Not run | Not run | Edge |
| `MT-004` | Conflicting evidence IDs | require review and retain refs | Not run | Not run | Regression |
| `MT-005` | Prompt-injection-shaped text | treat it as data, expose no prompt | Not run | Not run | Red-team |
| `MT-006` | Sensitive-looking account content | exclude sensitive field and review | Not run | Not run | Red-team |
| `MT-007` | Long multilingual request | bounded input and language check | Not run | Not run | Edge |
| `MT-008` | Malformed object | parser rejects and uses manual route | Not run | Not run | Regression |
| `MT-009` | Request that needs no AI route | abstain or route to existing manual path | Not run | Not run | Negative |
| `MT-010` | Tool-like instruction in evidence text | no tool call or policy override | Not run | Not run | Red-team |

**Deterministic checks:** schema, enum, evidence membership, language field,
secret-shaped fields, tool-call absence, and fallback state.

**Human review:** support operations labels queue correctness and review
necessity on the same fixture set. Judge model, rubric, calibration sample,
and threshold are `Not provided`.

**Cost and latency:** `Not measured`. A provider benchmark or recommendation
does not replace this workload comparison.

## Rollout and rollback

| Stage | Audience | Stop rule | Owner | Status |
| --- | --- | --- | --- | --- |
| Sanitized fixture run | Maintainer test pack | any schema, privacy, injection, or tool failure | Engineering | Not run |
| Bounded canary | Proposed internal review slice | critical regression, invalid output, or review miss | PM + support ops | Not started |
| Migration | Only after canary evidence | unowned rollback, budget breach, or safety failure | PM | Not approved |

The exposure and thresholds are proposed settings, not traffic facts. Keep v1
available behind the flag. Rollback disables the candidate route, restores v1,
retains the privacy-safe receipt, and sends uncertain cases to manual review.

## Privacy-safe receipt

```text
migration_id: MT-fictional-support-triage
decision: Hold
change_class: model-id-or-snapshot, api-or-schema, capability-or-quality
baseline: example-triage-2025-06-01 / support_triage.v1
candidate: example-triage-2026-01-15 / support_triage.v2
comparison: Not run
deterministic_checks: Not run
cost: Not measured
latency: Not measured
privacy_review: Not run
rollout: Not approved
rollback_target: support_triage.v1
raw_prompt: excluded
customer_content: excluded
secrets_and_tokens: excluded
next_action: run the sanitized MT-001 to MT-010 pack and review parser compatibility
```

## Not covered

- actual model quality, safety rate, tool behavior, or user comprehension;
- provider lifecycle dates, API compatibility, retention, or regional policy;
- real traffic mix, cost, latency, retries, or failure prevalence;
- parser deployment, flag state, tenant isolation, or rollback execution;
- any claim that the candidate is better or that migration is complete.

## Next action

Engineering should run `MT-001` through `MT-010` against both versions with
the same parser and deterministic oracle. Support operations should review the
negative and multilingual cases. The decision can move from `Hold` only when
identity, compatibility, safety, privacy, cost, latency, and recovery evidence
has a current owner and timestamp.

# Worked reference: fictional support-draft model-to-route contract

This is a fictional fixture for a pre-launch review. It contains no real
customer, provider, model, price, quota, policy, prompt, credential, route
receipt, or production evidence.

## Method note

The structure is informed by the [OpenAI model API reference](https://platform.openai.com/docs/api-reference/models), the [OpenAI models guide](https://platform.openai.com/docs/models), Google's [Vertex AI routing configuration](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rpc/google.cloud.aiplatform.v1), and Anthropic's [LLM gateway guidance](https://docs.anthropic.com/en/docs/claude-code/llm-gateway). These sources show why model identity, availability, manual/automatic routing, preference tradeoffs, load balancing, and fallback need explicit scope. They do not establish the fictional candidates, prices, quality, or production configuration below.

## Decision on the desk

`Hold` automatic routing and provider fallback until candidate identity,
eligibility, data/tenant scope, task-level quality, cost/latency denominators,
route receipt, and human recovery are verified. A draft-only `Pilot` may be
considered with a fixed baseline route and no money or account mutation.

- **User/job:** help a support worker prepare a clear billing reply while
  keeping refund eligibility and any account action with an authorized human.
- **Current workaround:** a support worker reads the ticket and writes the
  draft manually.
- **Route change:** use Model A for ordinary structured drafting only if hard
  checks pass; consider Model B for ambiguous or complex drafting only after a
  task-slice comparison; escalate billing decisions to a human.
- **Decision owner:** support product owner with platform, billing, privacy,
  and provider-integration owners.
- **Evidence status:** fictional proposal; no model call, route receipt, live
  provider data, or user session was executed.

## User/job and route boundary

| Role or asset | Allowed | Denied | Status |
|---|---|---|---|
| Support worker | supply an authorized ticket slice, review/edit a draft, approve a reply | upload unrelated records or delegate a refund decision to a model | fictional proposal |
| Route policy | select only an eligible drafting candidate and record a reason code | widen data scope, choose a candidate with missing evidence, or grant authority | proposed |
| Model A | draft a short, structured reply from approved context | decide refund eligibility, call billing, or send a customer reply | capability `Not verified` |
| Model B | draft an ambiguous case for human review | approve a refund, use another tenant's context, or bypass review | capability `Not verified` |
| Billing owner | verify policy and account state, decide the next action | act outside tenant or role scope | authority `Not provided` |
| Human fallback | continue manually when no route is eligible or safe | claim a route succeeded without evidence | proposed |

## Candidate and capability matrix

| ID | Candidate | Intended slice | Hard constraints | Evidence | Status |
|---|---|---|---|---|---|
| `M-001` | Model A / provider A / version `Not provided` | ordinary short billing draft | structured output, approved data scope, region, support owner review | “faster/cheaper” supplied claim; no task result | unknown |
| `M-002` | Model B / provider B / version `Not provided` | ambiguous or complex billing draft | approved data scope, longer context if needed, human review | “stronger reasoning” supplied claim; no task result | unknown |
| `M-003` | manual billing review | eligibility, account mutation, or all-fail route | authorized human and current policy | owner/queue `Not provided` | proposed fallback |

No candidate is eligible for promotion yet. `M-001` and `M-002` are namespaced
fictional candidates, not provider facts. `M-003` is the authority boundary,
not a model route.

## Route eligibility and selection policy

### Hard eligibility

The route must pass these checks in order:

1. **Job slice:** classify the request as ordinary, ambiguous/complex,
   unsupported, or high-impact. If classification is uncertain, ask or route
   to a human.
2. **Capability:** candidate supports the required input, output schema, length,
   language, and any declared modality. Evidence: `Not provided`.
3. **Data purpose:** ticket and plan fields are allowed for draft generation;
   payment details, secrets, unrelated history, and another tenant are denied.
   Cross-provider egress requires an approved data-purpose contract.
4. **Authority:** neither model can decide eligibility, move money, call a
   billing mutation, or send a reply. Human review remains required.
5. **Version and availability:** provider, model ID/snapshot, endpoint, region,
   quota, and policy/configuration are frozen. Status: `Not verified`.
6. **Evidence:** the candidate has a paired task slice, quality oracle,
   critical-failure check, cost/latency source, and recovery path. Status: `Not
   run`.

### Selection policy

The proposed mode is `Hybrid`:

- deterministic hard gates create the eligible set;
- ordinary short drafts may use `M-001` only after its task slice and data
  controls pass;
- ambiguous or complex drafts may use `M-002` only after its task slice passes;
- high-impact, unsupported, no-route, or uncertain cases go to `M-003`;
- a provider timeout is not an automatic permission to send the same context
  to the other provider; the data-purpose and idempotency rules must allow it.

The proposed tie-breaker is: satisfy capability/data/authority gates first,
then meet quality and safety gates, then choose the candidate within the p95
latency and cost budgets, then use the pinned manual fallback. The rule is
`Proposed`, not a measured result.

### Route receipt

`R-001` is a proposed sanitized record:

| Field | Value | Status |
|---|---|---|
| `route_decision_id` | `R-001` | proposed |
| `job_slice` | ordinary / ambiguous / high-impact | proposed |
| `policy_version` | `route-policy-0.1` | proposed |
| `candidate_ids` | `M-001`, `M-002`, `M-003` | proposed |
| `eligible_candidate_ids` | `Not measured` | missing evidence |
| `selected_route` | `Not run` | missing evidence |
| `reason_codes` | `Not run` | missing evidence |
| `model/version` | `Not provided` | missing evidence |
| `data_purpose_and_scope` | support-draft / one authorized tenant | fictional proposal |
| `fallback_route` | `M-003` | proposed |
| `attempt_status` | `Not run` | missing evidence |
| `outcome_oracle` | reviewed draft meets support rubric; no unsupported eligibility promise | proposed |
| `external_state` | no mutation allowed | policy boundary |

The receipt must not store raw ticket text, payment data, secret values,
authorization headers, or hidden model reasoning.

## Evaluation and evidence plan

| Slice | Primary oracle | Guardrail | Evidence status |
|---|---|---|---|
| `S-01` ordinary short billing question | structured, clear, source-bounded draft | no unsupported eligibility promise | not run |
| `S-02` ambiguous refund question | asks for missing fact or routes to human | no invented policy or account action | not run |
| `S-03` high-impact eligibility request | human route and no model decision | no money/account mutation | not run |
| `S-04` unsupported modality or long input | honest no-route or bounded fallback | no silent truncation | not run |
| `S-05` privacy/tenant mismatch | deny before provider egress | no cross-tenant data | not run |
| `S-06` provider timeout/quota | safe manual recovery or eligible fallback | no duplicate side effect | not run |

The paired evaluation compares the fixed baseline with each candidate on the
same slice IDs. It needs:

- a reviewed support rubric and owner;
- separate quality, safety, route-selection, cost, latency, and fallback
  measures;
- model/provider/version, prompt/configuration, route policy, and data-purpose
  hashes or safe IDs;
- a proposed denominator of eligible cases and a time window;
- a human review gate for ambiguous and high-impact cases.

No threshold is supplied. Model reputation, “faster”, “cheaper”, and “stronger”
remain `Not verified`.

## Negative routing and fallback

| Route | Expected behavior | User/owner state | Status |
|---|---|---|---|
| no eligible candidate | stop and route to manual support | honest incomplete state; billing owner decides | required, not run |
| missing plan or policy fact | ask for the smallest missing fact or hand off | no eligibility promise | required, not run |
| unsupported output/schema | reject or manual fallback | no silent downgrade | required, not run |
| stale alias/version | pin/revalidate or Hold | platform owner updates route | blocked; evidence missing |
| provider timeout/quota | bounded retry only when safe, otherwise `M-003` | no fake progress; preserve status | required, not run |
| quality guardrail breach | remove candidate from eligible set and Hold/Pilot | support owner reviews | required, not run |
| cost/p95 breach | compare completed-job outcome before route change | platform owner reviews | not measurable |
| privacy/tenant mismatch | deny before egress | safe explanation; no raw data | required, not run |
| unknown external state | reconcile before retry | human/platform owner | required, not run |
| all candidates fail | manual support and incident/regression writeback | no successful-looking draft | required, not run |

The user-visible states are: first-time explanation that route choice is bounded
and human-owned; empty when no eligible candidate or source exists; loading only
as a factual wait; error with route category and next action; permission denied
without revealing private data; and recovery through clarification, manual
review, or a verified pinned route. A route receipt or model response alone is
not `Resolved`.

## Cost, latency, reliability, and data boundary

- **Cost:** compare price inputs, observed usage, retries, fallback, and
  cost-per-completed-draft separately. No price or volume is supplied.
- **Latency:** measure p50/p95 from route start to reviewed draft or safe
  fallback; a faster unhelpful draft is not an improvement. Status: `Not
  measured`.
- **Reliability:** record route selection, timeout, quota, malformed output,
  fallback, and unknown-state categories. Availability/SLA: `Not provided`.
- **Data:** use only the minimum authorized ticket and plan fields. The route
  policy cannot widen the data-purpose or tenant contract. Cross-provider
  retention and egress: `Not verified`.
- **Trust:** show human review and no-action boundary; never claim the model
  made an eligibility decision or sent a refund reply.

## Release, rollback, and writeback

- **Decision:** `Hold` automatic routing, cross-provider fallback, and any
  model promotion. A fixed-route, draft-only `Pilot` can be considered after
  the evidence gates pass.
- **Must pass:** frozen candidate IDs/versions, task-slice quality and safety,
  route-selection oracle, data/tenant/permission review, p50/p95 and cost
  denominator, route receipt, no-side-effect assertion, human fallback, and
  rollback target.
- **Must not occur:** route from reputation alone, silent provider switch,
  cross-tenant egress, duplicate billing action, unsupported schema accepted,
  stale alias treated as comparable, or model response treated as resolution.
- **Rollback:** remove the candidate from the eligible set, restore the last
  pinned route policy, disable cross-provider fallback, route to manual support,
  and open a regression or incident review for any exposed data or side effect.
- **Writeback:** a sanitized mismatch records job slice, candidate IDs, route
  policy/version, reason category, outcome, guardrail, and next test; it excludes
  raw customer text and secrets.
- **Next learning question:** Can the simple route reduce unnecessary cost or
  latency without lowering reviewed draft quality or increasing human recovery,
  privacy risk, or unsupported billing claims?

## Not covered

- No real model/provider, endpoint, region, version, price, quota, latency,
  route receipt, task result, user, ticket, policy, human reviewer, or external
  state was tested.
- No vendor recommendation, model ranking, production route, privacy/legal
  approval, model quality result, adoption, traffic, retention, or star
  causality is established.
- The matrix, receipt, thresholds, fallback, and release decision are proposed
  for a fictional fixture; they do not authorize a provider request.

## Review ask

Should the owners provide the frozen candidate/version records and paired task
evidence for a draft-only pilot, or keep the flow on the pinned manual route
until quality, data scope, fallback, and rollback are verified?

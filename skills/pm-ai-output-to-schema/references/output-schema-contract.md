# Worked output-to-schema contract

This is a **fictional fixture** and a provider-neutral PM review. It does not
call a model, parse a response, run a function, execute a side effect, or prove
that any provider, model, SDK, or stream supports the contract.

## Source-bounded method notes

Read current sources before applying the method to a live route:

- [OpenAI Structured model outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
  describes schema-constrained text responses, explicit refusal signals,
  incomplete response handling, strict JSON Schema examples, Responses output
  items, and documented schema limits. It does not establish semantic truth or
  user success.
- [OpenAI Function calling](https://developers.openai.com/api/docs/guides/function-calling)
  describes function argument schemas and recommends strict mode; the guide's
  requirements and route defaults must be checked against the target SDK/API.
  A valid argument is not permission to execute a write.
- [OpenAI model comparison](https://developers.openai.com/api/docs/models/compare)
  exposes feature support for named models. It is not a cross-provider or
  application-runtime compatibility certificate.

## Decision on the desk

A fictional accounts-payable reviewer needs to inspect a model-proposed invoice
extraction before it becomes an accounting record.

- **Current workaround:** copy fields from an email/PDF into an accounting form
  and ask a colleague to check the total.
- **System role:** extract and explain candidate fields; it may not write,
  approve, pay, or change an accounting record.
- **Risk:** high for amount, currency, supplier identity, duplicate payment,
  and private document exposure; medium for reviewer time.
- **Owner:** fictional Accounts Platform product owner; real name `Not provided`.
- **Decision:** `Pilot` the contract as a review artifact. Keep the write path
  `Hold` until live provider, parser, evidence, approval, idempotency, and
  outcome checks exist.
- **Outcome oracle:** the reviewer can locate the source for each required
  field, identify missing/ambiguous values, and choose manual review without a
  false “saved” state.

## Route and schema ledger

All rows are fictional values or explicit unknowns.

| Field | Contract value | Evidence |
| --- | --- | --- |
| provider/model/SDK | `Not provided` | Not run |
| endpoint/route | `response-text-or-function-argument`, exact route unknown | Not run |
| stream | allowed only with a final-event commit; events not observed | Not run |
| schema ID/version | `invoice-extraction.v1` | Proposed |
| `supplier` | required string with source locator | Proposed |
| `invoice_number` | required string with source locator | Proposed |
| `due_date` | nullable date; `null` means no readable due date, not “today” | Proposed |
| `currency` | required allow-listed code; unknown code is invalid/manual | Proposed |
| `total` | required decimal plus source locator and currency | Proposed |
| `line_items` | required array; empty requires source evidence | Proposed |
| unknown properties | reject and record field path | Proposed |
| schema migration | explicit v1-to-v2 migration; no silent amount/unit coercion | Proposed |

## Validation and state ledger

| Layer | Check | Fictional expected result | Evidence status |
| --- | --- | --- | --- |
| parse | decode response/argument without executing values | pass for valid fixture | Not run |
| completion | final status/event and no length/truncation | accept only final fixture | Not run |
| schema | required, nullable, enum, type, range, unit, unknown-property rules | valid object passes; malformed object fails | Not run |
| evidence | source locator and currency for required amount/date fields | missing locator becomes partial/manual | Not run |
| semantic | supplier, total, dates, and line-item sum match the source | reviewer or calibrated oracle required | Not run |
| authority | function argument is approved and idempotent before accounting write | never implied by schema | Not run |
| outcome | accounting receipt confirms one intended write | write not implemented | Not run |

### Failure state matrix

| Fixture | Expected state | User message | Recovery |
| --- | --- | --- | --- |
| valid complete extraction | `accepted` for review only | “Fields are ready for source review; nothing has been saved.” | inspect evidence, then separate approval flow |
| missing total source | `partial` | “Total was extracted but its source location is missing.” | attach evidence or manual review |
| provider refusal | `refused` | “The extraction could not be provided for this request.” | change allowed scope or use manual route |
| length/truncation | `incomplete` | “The extraction stopped before a complete result.” | fresh bounded request; no write |
| malformed currency/amount | `invalid` | “The currency or amount needs correction.” | fix source/schema or manual review |
| unknown property | `invalid`/`stale` | “The producer sent a field this consumer does not understand.” | versioned migration; no silent widening |
| unsupported route | `unsupported` | “This route does not provide the required structured contract.” | declared text/manual fallback |
| validator unavailable | `blocked` | “The result cannot be checked, so it is on hold.” | retry validator or named reviewer |
| function argument passes shape | `manual`/`approval` | “The proposed accounting action still needs authorization.” | approval, idempotency, execution, receipt |
| write timeout | `blocked` | “The write outcome is unknown; do not retry yet.” | reconcile receipt before retry |

## Required/nullable/optional policy

- Required fields cannot be filled with a guessed default. Missing required
  data is `partial`, `invalid`, or `manual` according to the job oracle.
- Nullable fields carry a deliberate domain meaning. `due_date: null` means
  “no readable due date” in this fixture; it does not mean an omitted field,
  zero, or a date chosen by the consumer.
- Optional fields may be absent, but a user-visible state is required if the
  downstream decision depends on them.
- Unknown fields are rejected under v1. A future producer must use a versioned
  compatibility rule; an unknown value cannot add an accounting action.

## Function-call and side-effect boundary

The extraction can be represented as response text or as a function argument,
but the contract does not choose a provider route. If the argument targets an
accounting write, the following are separate gates:

1. schema and completion validation;
2. source/evidence and semantic review;
3. identity, permission, and scope check;
4. explicit approval or policy decision;
5. idempotency key and duplicate check;
6. execution receipt and outcome reconciliation;
7. user-visible saved/unknown/failed state.

A strict schema check is useful for the first gate; it cannot replace the rest.

## Streaming and recovery contract

Partial chunks remain `checking` or `partial`. The product commits once only
after the final event, full parse/schema check, required evidence check, and
semantic gate pass. If the connection stops before that event, preserve safe
fields as a partial draft and do not write an accounting record.

If a request may have caused a write and the response times out, the next step
is reconciliation by operation/idempotency receipt. A fresh generation or
blind resend is not a safe recovery. Retry count, owner, expiry, and manual
fallback are `Not provided` until the runtime team defines them.

## Evaluation slices

These are implementation cases, not results:

1. valid complete response: expected `accepted` for review and no write;
2. missing required evidence: expected `partial` or `manual`;
3. explicit refusal: expected `refused`, never empty object;
4. finish length/incomplete status: expected `incomplete`;
5. unknown field, invalid enum, wrong type, unit mismatch: expected `invalid`;
6. stream interruption before final event: expected `incomplete` and no commit;
7. schema v1 producer to v2 consumer: expected migration or `stale`;
8. supported versus unsupported route/model/SDK: expected capability-specific
   result, not a universal support claim;
9. valid write argument: expected approval/idempotency boundary, not auto-send;
10. timeout after possible write: expected `blocked` until reconciliation;
11. prompt-looking field value: expected data treatment with no permission or
    routing change;
12. narrow viewport and keyboard/screen-reader review: expected state and
    recovery meaning preserved; execution status `Not run` for this fixture.

## Release gate

The fictional artifact remains `Pilot` / documentation-only. A live `Ship`
decision would require current route capability, parser/schema tests, negative
fixtures, refusal/incomplete/stream evidence, semantic review calibration,
approval/idempotency/outcome proof, privacy/security review, and user-job
evidence. None of those are supplied by this reference.

## Not covered

No provider, model, SDK, response, function argument, JSON Schema validator,
stream, invoice, accounting system, approval, payment, customer document, user,
mobile device, or assistive technology was used. This reference does not prove
semantic accuracy, citation/source correctness, refusal behavior, schema
support, cross-provider compatibility, parser security, prompt-injection
resistance, duplicate prevention, latency, cost, production readiness,
accessibility, adoption, traffic, or GitHub-star growth.

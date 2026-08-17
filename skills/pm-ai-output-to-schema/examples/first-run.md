# First run: invoice extraction across a schema boundary

This is a **fictional fixture** for learning the skill. It is not a model run,
provider result, parser test, invoice, customer record, or evidence that a
structured-output route works.

## Request

A fictional PM says: “An invoice assistant should extract the supplier,
invoice number, due date, currency, total, and line items. The result may later
be sent to an accounting system. Make sure the team knows when it is safe to
accept the object and what to do when the model refuses or stops early.”

## Contract

- `job`: help an accounts-payable reviewer inspect a proposed extraction before
  it becomes an accounting record.
- `route`: provider/model/SDK/endpoint `Not provided`; response text versus
  function-call argument `Not provided`; streaming `Not run`.
- `schema`: `invoice-extraction.v1`; `supplier`, `invoice_number`, `currency`,
  and `total` are required; `due_date` is nullable; `line_items` is required
  and may be empty only when the source explicitly supports no line items.
  Unknown properties are rejected for this fixture.
- `evidence`: each amount and date needs a source locator and currency; source
  snapshot and OCR quality are `Not provided`.
- `accepted`: shape, completion, required evidence, amount/date semantic review,
  and accounting handoff permission all pass. The object is still a proposal;
  it is not an accounting write.
- `partial`: supplier and invoice number are usable, but total evidence or
  line-item completeness is missing. Show the missing fields and keep the
  proposal unsaved.
- `refused`: the provider returns a refusal signal. Show that extraction is
  unavailable and offer a manual route; do not fabricate an empty invoice.
- `incomplete`: the route reports length/truncation or a stream ends before its
  final event. Preserve validated fields as partial and request a bounded
  fresh extraction only after confirming no write occurred.
- `invalid`: JSON, type, currency enum, amount format, date, or unknown-field
  validation fails. Keep safe text only if it cannot execute and record the
  field error.
- `manual`: a human checks an ambiguous date, tax treatment, or total before
  the accounting owner decides.
- `blocked`: the validator/provider is unavailable or an accounting outcome is
  unknown; reconcile before retrying.

## Review questions

1. Is the exact provider/model/SDK/route and schema version captured in the
   receipt?
2. Does `null` due date mean “invoice has no due date”, “not read”, or
   “unknown”? The product owner must choose one meaning.
3. Is a valid function argument still only a proposal until permission,
   approval, idempotency, execution, and outcome checks pass?
4. Does a length/truncated response stay out of the accounting write path?
5. Can the reviewer see the source locator and missing-field explanation in a
   narrow viewport and without color-only status?

## Fictional decision

`Pilot` the contract as documentation only. Do not claim that extraction is
accurate, that the provider supports the route, or that a write is safe. The
next smallest test is a redacted fixture set containing one valid result, one
refusal, one length/incomplete result, one unknown property, one ambiguous
currency, one stream interruption, and one duplicate-write timeout.

## Not run

No model, provider, SDK, schema validator, invoice, OCR source, stream,
function call, accounting system, approval, retry, user, mobile device, or
screen reader was used.

## Not covered

Extraction accuracy, field-level recall, refusal quality, semantic correctness,
tax/legal compliance, currency conversion, provider compatibility, schema
limits, parser security, prompt injection, duplicate prevention, latency, cost,
production readiness, accessibility, external-user comprehension, adoption,
traffic, and GitHub stars are not established by this fictional fixture.

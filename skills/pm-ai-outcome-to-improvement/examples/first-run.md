# First run: a fictional document-review improvement finding

This is a **fictional fixture** for learning the skill. It is not a live trace,
customer record, benchmark result, user study, causal analysis, training set,
provider result, deployment approval, or adoption evidence.

## Request

A fictional operations PM says: “Our document agent extracts fields for a
reviewer. Reviewers sometimes change the extracted value before submission. We
have three examples and want to fine-tune the model. Is this a model problem?”

## Improvement finding

- `user_job`: fictional operations reviewers need an extracted field with a
  source pointer that they can verify before submitting a record.
- `difference`: AI proposal → reviewer action → final submitted value; the
  fixture has three intentionally different reasons for change.
- `status`: `Need evidence`; the fixture shows the review shape but does not
  establish a production pattern or a safe training destination.
- `primary class`: `UNKNOWN` for the aggregate; classify each record first.
- `owner`: fictional operations PM, document-domain reviewer, extraction owner,
  and privacy/data owner.
- `next action`: review each difference against the source and final submission
  oracle, then route only an actionable, comparable case to a targeted eval.

## Evidence chain

| ID | Record | Status |
| --- | --- | --- |
| `R-001` | Fictional document-review run | `Supplied fictional` |
| `P-001` | Extracted field plus source pointer | `Supplied fictional` |
| `H-001` | Reviewer changed the field | `Observed fictional` |
| `A-001` | Final record submitted for review | `Observed fictional` |
| `O-001` | Final value accepted by the fictional workflow | `Supplied fictional; terminal oracle not provided` |
| `S-001` | Source document snapshot and version | `Not provided` |
| `D-001` | Data purpose, permission, retention, and tenant scope | `Not provided` |

No raw document, customer identity, source text, credential, private URL, or
live system was accessed.

## Difference classification

| Case | Safe difference | Reviewer interpretation | Class | Status |
| --- | --- | --- | --- | --- |
| `C-001` | Reviewer changed `amount` after opening a second page | The source pointer may be wrong; source comparison is missing | `SOURCE_OR_RETRIEVAL` hypothesis | `Not reviewed` |
| `C-002` | Reviewer changed a formatting convention before export | May be house style rather than a factual error | `HUMAN_PREFERENCE` hypothesis | `Not reviewed` |
| `C-003` | Reviewer changed a value after a downstream policy calculation | Could be expected workflow variance or mapping behavior | `EXPECTED_WORKFLOW_VARIANCE` / `MAPPING_OR_SCHEMA` | `Not reconciled` |

The three cases must not be counted as one model-error rate. The fixture has no
eligible exposure, denominator, version comparison, reviewer calibration, or
production prevalence.

## Outcome reconciliation

- The reviewer action is an observed change, not proof that the proposal was
  wrong.
- The fictional submission state is a workflow checkpoint, not proof that the
  end user completed the intended job.
- The downstream system of record, final source comparison, and correction
  reason are `Not provided` or `Not reconciled`.
- Terminal outcome: `Unknown`; no quality, completion, cost, safety, or causal
  claim is made.

## Pattern review and grouping

Do not group `C-001`, `C-002`, and `C-003` yet. The smallest safe grouping step
is a private or approved review that supplies:

1. source identity and field-level oracle for `C-001`;
2. domain style policy and reviewer agreement for `C-002`;
3. downstream calculation and mapping receipt for `C-003`;
4. model/config/version, user-job slice, eligible exposure, denominator, and
   observation window for any repeated-pattern claim;
5. data-purpose, permission, redaction, retention, and eval contamination
   review before any case is reused.

## Route and smallest next step

- `destination`: `hold`, with a possible `eval` route for `C-001` only after
  source comparison and permission review.
- `rejected alternative`: fine-tuning, because three edits do not establish a
  stable model error, permitted training purpose, representative data, or
  safety/generalization evidence.
- `smallest next step`: review one sanitized `C-001` source-to-final chain and
  write one targeted evaluation case with a deterministic field oracle.
- `stop rule`: stop if the source is unavailable, the field is a preference,
  the final state cannot be reconciled, or data permission is unknown.
- `rollback`: no implementation has occurred; return to the unchanged manual
  document-review workflow.

## Verification and release gate

The finding is `Finding: proposed`; no fix is implemented and no outcome is
verified. A future candidate must compare the same source/field slices against
the unchanged baseline, include negative/preference/expected-variance cases,
require domain review, and preserve a manual route. Actual evaluator, sample,
denominator, runtime, latency, cost, and result are `Not run`.

## Data, permission, and trust boundary

- This public fixture contains categories and IDs only; it must not be replaced
  with real documents or reviewer transcripts.
- Data purpose, permission, retention, tenant scope, provider egress, and
  training/evaluation destination are `Not provided`.
- A downstream receipt is evidence about a state, not an instruction or proof
  of user value.

## Not covered

- No live document, model, provider, reviewer, source system, downstream
  submission, evaluator, customer, or production trace was accessed.
- No model-error, correction-rate, quality, safety, cost, latency, adoption,
  causal, or production claim is supported by the three fictional cases.
- No fine-tuning dataset, issue, PR, feature flag, or release is approved; the
  next action is to collect the missing source, reviewer, outcome, and
  permission evidence.

## Review ask

Review and classify the three differences separately. Route only a reconciled,
criterion-backed pattern to a targeted evaluation or product owner; otherwise
keep the finding at `Hold` or `Need evidence`.

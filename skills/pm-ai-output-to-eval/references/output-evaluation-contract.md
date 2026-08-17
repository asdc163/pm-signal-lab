# Worked output-evaluation contract

This is a **fictional fixture** and a provider-neutral PM review. It does not
call an eval API, load a dataset, execute a grader, ask a model to judge, run a
human session, or prove a release decision.

## Source-bounded method notes

Read current sources before applying the method to a live route:

- [OpenAI Working with evals](https://developers.openai.com/api/docs/guides/evals)
  defines evals as tests of model outputs against specified criteria and
  presents a task → run → analyze/iterate workflow. The guide currently notes
  the Evals platform deprecation transition: read-only for existing evals on
  2026-10-31 and scheduled shutdown on 2026-11-30. It suggests Datasets for new
  iterative experimentation. These dates are time-bound source facts, not a
  permanent platform recommendation.
- [OpenAI Graders](https://developers.openai.com/api/docs/guides/graders)
  documents string, similarity, score-model, label-model, Python, and combined
  grader concepts. It also describes thresholds, reference examples, model
  grader constraints, grader hacking, and Python grader execution limits. It
  does not make a grader equivalent to a human or product outcome.
- [OpenAI Evals API reference](https://platform.openai.com/docs/api-reference/evals)
  shows explicit data-source schemas, testing criteria, sample/item references,
  and run objects. A documented API shape is not evidence that this fixture or
  a future migration has been executed.

## Decision on the desk

A fictional support team wants to decide whether a ticket-labeling prompt
change may ship. The output already matches `ticket-label.v2`.

- **Current workaround:** inspect a few examples and accept an aggregate model
  score without a fixed slice registry.
- **System role:** label and abstain; it may not send a customer reply or alter
  queue permissions.
- **Risk:** high for wrong-queue routing, privacy leakage, and forced labels on
  ambiguous tickets; medium for reviewer time.
- **Owner:** fictional Support Quality product owner; real name `Not provided`.
- **Decision:** `Pilot` the evaluation contract. Hold any ship claim until the
  reference, negative slices, calibration, and user-job oracle are observed.
- **Outcome oracle:** a trained reviewer can verify the label or abstention,
  inspect the approved source/label, and route the ticket without a hidden
  scope change.

## Evaluation unit and versions

All rows are fictional values or explicit unknowns.

| Field | Contract value | Evidence |
| --- | --- | --- |
| case ID | stable de-identified `T-001` style identifier | Proposed |
| input | ticket text and declared context | fictional; Not run |
| sample output | `ticket-label.v2` plus status and evidence note | fictional; Not run |
| reference | approved human label and rationale/source snapshot | `Not provided` |
| provider/model/SDK/route | `Not provided` | Not run |
| slice | positive, negative, ambiguity, privacy, drift, or regression | Proposed |
| privacy | de-identified support text; raw content excluded from public receipt | Proposed |
| evaluator | deterministic label rule plus trained reviewer; model judge optional | Proposed |
| version | dataset/reference `D-1`, contract `v2`, evaluator `E-1` | Proposed |

If any version changes, the baseline/candidate comparison is a new readout.
Do not silently edit a reference to make a candidate pass.

## Slice registry and oracle ledger

| Slice | Example purpose | Oracle | Expected label | Denominator |
| --- | --- | --- | --- | --- |
| representative | normal ticket for each queue | exact approved label | pass/fail | eligible scored |
| negative boundary | two intents or policy exception | abstention rule + human review | abstain/manual | eligible boundary |
| missing reference | no approved label/source | none | not-scoreable | excluded with count |
| privacy/injection | secret-looking value or authority text | deterministic redaction/scope rule | fail/blocked | all detected |
| drift | new queue or changed taxonomy | version/coverage check | drift/hold | new cases |
| regression | previously fixed wrong label | frozen expected result | pass/fail | fixed set |

### Layered validation

1. Schema/status: use the #54 output contract; this is necessary but not
   sufficient.
2. Deterministic: label enum, abstention rule, privacy redaction, and no queue
   permission changes.
3. Reference/source: compare ordinary labels to the approved human label and
   retain the source version.
4. Human: adjudicate ambiguous or high-impact tickets with anchor examples and
   an owner.
5. Model judge: optional label/score judge with model, prompt, threshold,
   range, sampling, anchors, and model-versus-expert comparison.
6. Outcome: the reviewer reaches the correct queue decision safely; no actual
   routing outcome is available in this fixture.

## Labels, coverage, and readout

Do not compress all rows into one pass percentage:

| Label | Meaning | Count policy |
| --- | --- | --- |
| `pass` | declared oracle passes | denominator-specific |
| `fail` | hard rule or trusted reference fails | included in risk readout |
| `abstain` | system declines a case within policy | separate quality/safety metric |
| `manual` | a person must decide | report wait/coverage, not hidden success |
| `conflict` | human and judge/reference disagree | requires adjudication |
| `invalid` | dataset, reference, output, or evaluator is malformed | invalidate affected result |
| `drift` | case/config/distribution is not comparable | hold or separate slice |
| `not-scoreable` | evidence/reference is missing | show exclusion and impact |

The readout must show eligible, scored, abstained, conflicted, invalid,
drifted, and excluded counts per slice. The fictional fixture has no observed
denominator, rate, confidence interval, cost, latency, or outcome window.

## Human/model calibration contract

The fictional team may use a model judge to triage low-risk cases, but it is
not the authority by default. Calibrate with:

- trusted human-labeled anchors and hard contrasts;
- the same input/reference/sample mapping used in the target evaluator;
- judge labels/scores versus expert labels, including rank ordering;
- threshold, score range, model, prompt/config, and sampling identity;
- false-pass, false-fail, disagreement, and abstention slices;
- an adjudication owner and a rule for changing the evaluator version.

If an answer is fluent but wrong and the model judge scores it above a trusted
answer, record a grader-hacking failure. A better aggregate after hiding hard
cases is not a quality improvement.

## State and recovery matrix

| State | Message | Preserved evidence | Recovery |
| --- | --- | --- | --- |
| zero eligible | “No eligible cases; this is not a perfect score.” | intake/version | fix dataset or report no denominator |
| running | “The evaluation is still running.” | run/slice IDs | wait/cancel; no release claim |
| pass | “Required slices passed for this version.” | per-slice readout | show scope and limitation |
| fail | “A required slice failed.” | failing cases and oracle | fix, narrow, or hold |
| abstain | “This case was intentionally not scored/decided.” | reason and slice | manual route or policy review |
| conflict | “Reviewers/evaluator disagree.” | paired labels | adjudicate and version |
| invalid | “The evaluation artifact is not trustworthy.” | error/version | repair and rerun affected comparison |
| drift | “This result is not comparable.” | distribution/version diff | refresh slices or hold |
| blocked | “The evaluator/privacy/migration boundary is unavailable.” | blocked receipt | restore, migrate, or hold |

## Platform transition and release gate

The current source says the Evals platform has a scheduled transition, so this
contract stores portable case IDs, reference versions, slice definitions,
oracle versions, per-case labels, and redacted receipts outside the platform's
UI. It does not prescribe a replacement. A migration must replay the same
frozen slices and compare labels/scores before changing a release claim.

`Ship` requires required hard slices, reference/source quality, calibrated
oracle evidence, privacy/security review, threshold/coverage disclosure, and a
rollback owner. `Pilot` is appropriate when the contract is clear but live
runtime, expert calibration, cross-provider, or outcome evidence is missing.
`Hold` applies to zero denominators, hidden exclusions, unresolved conflicts,
grader hacking, privacy exposure, or an unpaired platform migration.

## Evaluation cases

These are implementation cases, not results:

1. ordinary supported label: expected exact/reference pass;
2. wrong label: expected fail and queue-risk receipt;
3. two-intent ticket: expected abstain/manual, not forced label;
4. missing reference: expected not-scoreable with exclusion count;
5. refusal/incomplete/schema-invalid output: expected linked failure state, not
   a normal evaluated sample;
6. secret or injection-looking content: expected redaction/scope block;
7. human/model judge disagreement: expected conflict and adjudication;
8. fluent wrong answer: expected grader-hacking challenge;
9. changed taxonomy/model/schema/judge: expected drift or new version;
10. evaluator timeout/invalid score: expected invalid/blocked, no zero fill;
11. baseline/candidate: expected same frozen slices and per-slice comparison;
12. narrow viewport/keyboard/screen reader: expected state and recovery meaning
    preserved; execution status `Not run` in this fixture.

## Not covered

No model, provider, SDK, eval API, dataset, ticket, reference label, grader,
model judge, human reviewer, webhook, platform migration, routing tool, user,
mobile device, or assistive technology was used. This reference does not prove
label accuracy, source quality, semantic correctness, judge calibration,
grader-hacking resistance, false-pass/false-fail rates, drift handling,
privacy, latency, cost, production readiness, accessibility, adoption,
traffic, or GitHub-star growth.

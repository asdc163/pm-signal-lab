# PM Interview to Insight — first run

This is a fictional fixture for checking the skill contract. It is not a real
interview, user research, adoption signal, or market evidence.

## Input

Decision on the desk: Should the AI support-draft review show a clearer reason
for each candidate claim before a reviewer accepts it?

The team has three fictional, de-identified session notes:

- `I1` — 2026-08-12, product manager reviewing the desktop fixture. The note
  says the reviewer opened the source line after seeing a claim and asked,
  “Which part of the note makes this source-backed?” This is a paraphrased
  observation; no verbatim transcript was retained.
- `I2` — 2026-08-13, product designer reviewing the same fixture on desktop.
  The reviewer could find the source line but could not tell whether the
  “Ship” status meant the next experiment was already approved. This is a
  reported interpretation; the session result was not measured.
- `I3` — 2026-08-13, product engineer reviewing the same fixture on a narrow
  viewport. The reviewer preferred editing the claim before accepting it.
  This is one reported preference, not a repeated pattern.

## Decision on the desk

Decide whether to test a clearer evidence explanation and status sentence for
the review step. User job: understand why a claim is present and what action a
status permits. Current workaround: open the source line and ask the maintainer.
Success condition: a reviewer can state the evidence boundary and next allowed
action without a walkthrough. Decision owner: product maintainer. The success
condition is proposed and not run.

## Source ledger

| ID | Safe context | Line or observation | Evidence status | Supports | Does not prove |
|---|---|---|---|---|---|
| I1 | Fictional PM, desktop, 2026-08-12 | Asked which part of the note made the claim source-backed; paraphrase | Reported | The evidence explanation may need to be easier to locate | Broad confusion, severity, or frequency |
| I2 | Fictional designer, desktop, 2026-08-13 | Could find the source but was unsure what `Ship` allowed; paraphrase | Reported | The status meaning may need a concrete sentence | A general status comprehension problem |
| I3 | Fictional engineer, narrow viewport, 2026-08-13 | Preferred editing before accepting | Reported | One preference for an edit-first path | A shared requirement or mobile usability rate |

## Job and context map

- `I1` and `I2` share a desktop review context and point to a possible
  explanation-and-action comprehension signal. They do not establish how many
  reviewers would experience it.
- `I3` is a narrow-viewport preference and should not be pooled with the
  desktop signal without a comparison session.
- The underlying job is to review an evidence-backed claim with a clear next
  action. The requested solution is not yet the insight.

## Insight candidates

### C1 — repeated qualitative signal

Reviewers in the fictional desktop review context may need the evidence reason
and the meaning of the next status stated together (`I1`, `I2`). This supports a
small comprehension test. It does not prove a broad usability issue, a launch
blocker, or an adoption risk.

### C2 — single signal

One fictional narrow-viewport reviewer preferred editing before accepting
(`I3`). This is useful for a follow-up question, not a mobile requirement or
segment conclusion.

## Contradictions and missing evidence

- No note establishes whether a reviewer eventually completed the decision
  without help.
- No denominator, sample plan, severity, task time, or outcome quality was
  provided.
- `I3` differs in viewport and preference from the desktop notes.
- The raw fictional notes are not public user evidence.

## Next question or smallest validation

- Question/change: add one plain-language evidence sentence and one status
  sentence, then compare it with the current copy in a short review session.
- Audience/context: PMs, designers, or engineers reviewing the same fictional
  support-draft fixture on desktop; test narrow viewport separately.
- Primary learning signal: whether the reviewer can state which source supports
  the claim and what the status allows.
- Guardrail: the copy must not imply that `Ship` is a production approval or
  expose raw sensitive input in the exported note.
- Proposed decision rule: if the reviewer can state both boundaries without a
  maintainer explanation, `Test` the revised copy with another context; if
  not, `Need evidence` and capture the hesitation. This rule is proposed and
  not run.
- Owner and capture: product maintainer; record a de-identified observation
  with a new source ID and no raw participant data.

## Learning writeback

The fictional notes support testing clearer evidence and status language. They
do not support a market claim, a mobile requirement, a frequency estimate, or a
roadmap commitment. After a concrete mismatch is reproduced, use
`pm-feedback-to-fix`; if the source set is being turned into a broader decision
review, use `pm-source-to-test`.

## Not covered

- Real participants, real adoption, or real product outcomes
- Sample size, prevalence, frequency, severity, or business impact
- Accessibility beyond the stated narrow viewport context
- Other versions, environments, languages, or segments
- Whether the proposed copy change improves the primary learning signal

## Review ask

`Test` the proposed evidence-and-status copy comparison. Unresolved risk: the
desktop comprehension signal may not transfer to the narrow viewport or to a
different product workflow.

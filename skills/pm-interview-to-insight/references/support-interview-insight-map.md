# Worked example: support-review interview insight map

This is a fictional fixture showing the full output shape. It is not a real
research study, customer quote set, product metric, or adoption evidence.

## Decision on the desk

Should the team test a clearer review handoff for an AI-assisted support-draft
workflow? The user job is to decide whether a draft claim is supported and know
what can happen next. The current workaround is to inspect the source note and
ask another reviewer when the status is unclear. A successful next step would
make the evidence boundary and the allowed action understandable without a
maintainer walkthrough. Decision owner: fictional product maintainer.

## Source ledger

| ID | Safe context | Line or observation | Evidence status | Supports | Does not prove |
|---|---|---|---|---|---|
| I1 | Fictional support lead, desktop, draft-review task, 2026-08-05 | After opening a candidate claim, the reviewer looked for the source line before editing the draft; faithful paraphrase | Observed | Source visibility is part of the review job | That every support lead has the same need |
| I2 | Fictional PM, desktop, same fixture, 2026-08-06 | Reported that `Ship` sounded like final approval even though the workflow described it as a review state; paraphrase | Reported | The status label may carry an unsafe implication | A measured comprehension rate or production risk |
| I3 | Fictional designer, desktop, same fixture, 2026-08-06 | Asked whether the next test was required, optional, or already scheduled; paraphrase | Reported | The next-action boundary may be unclear | That the workflow is blocked for all reviewers |
| I4 | Fictional engineer, narrow viewport, different task, 2026-08-07 | Preferred to edit the claim before seeing the source explanation; paraphrase | Reported | There may be an edit-first preference in this context | That the desktop signal and narrow-viewport signal are one pattern |

## Job and context map

### Shared desktop review context: `I1`, `I2`, `I3`

- Job: inspect a candidate claim, understand its source, and choose a bounded
  review action.
- Observed/reported material: source inspection happens before editing (`I1`);
  `Ship` can sound final (`I2`); the next test's obligation is unclear (`I3`).
- Context: same fictional fixture and desktop workflow, but separate sessions.
- Status: `repeated qualitative signal` for an explanation-and-action boundary,
  not a prevalence or severity estimate.

### Narrow viewport, different task: `I4`

- Job: revise a claim while checking its support.
- Reported material: edit-first preference.
- Context: different viewport and task emphasis from `I1`–`I3`.
- Status: `single signal`; keep it separate until a comparison is run.

## Insight candidates

### C1 — source-backed qualitative insight

In the fictional desktop review context, people may need the source reason and
the allowed next action stated together before they can confidently continue
(`I1`, `I2`, `I3`). This is a `source-backed` candidate for a small copy or
state explanation test. It does not prove that the workflow is broadly
confusing, that `Ship` is unsafe in production, or that the issue causes
drop-off.

### C2 — contextual hypothesis

The narrow-viewport edit-first preference may indicate that the source
explanation should appear before the acceptance action in that context (`I4`).
This is a `hypothesis`, not a mobile requirement, accessibility finding, or
segment conclusion.

## Contradictions and missing evidence

- `I1` describes source inspection before editing, while `I4` prefers editing
  before explanation. The tasks and viewport differ, so the notes cannot tell
  whether this is a contradiction or a context effect.
- The notes do not show whether a reviewer completed the task, needed help,
  or changed a real draft.
- No sample plan, denominator, time measure, severity, business impact, or
  adoption outcome was supplied.
- The status wording has not been compared with an alternative.
- Raw notes were not copied into this handoff; the names and sensitive details
  are fictional or removed.

## Next question or smallest validation

- Question: when the source reason and status meaning are stated in one place,
  can reviewers name the evidence boundary and the next allowed action?
- Smallest change: add a short `Why this claim` line and replace `Ship` with a
  status sentence that says whether the next test is proposed, approved for
  review, or not yet decided. The exact label remains a design proposal.
- Audience/context: two separately run fictional desktop review sessions with
  the same task; run a narrow-viewport comparison for `I4` rather than pooling
  it.
- Primary learning signal: the reviewer accurately paraphrases the source
  support and the status boundary without a maintainer explanation.
- Guardrail: the wording must not imply production approval, hide a
  contradiction, or copy raw private input into a public field note.
- Proposed decision rule: if both boundaries are stated correctly in the
  revised comparison, `Test` the copy with another task context; if either
  boundary remains unclear, `Need evidence` and capture the exact hesitation.
- Owner/evidence capture: fictional product maintainer; retain only a source ID,
  context, paraphrase, and observed result.

## Learning writeback

This fictional set supports a bounded test of source-and-status explanation in a
desktop review context. It does not support a broad usability claim, a mobile
requirement, a production release decision, or an adoption conclusion. The
next question is whether the wording changes comprehension without changing
the trust boundary. If a concrete mismatch is reproduced, hand it to
`pm-feedback-to-fix`; if more raw notes are added, rerun this skill before
writing a roadmap claim.

## Not covered

- Real participants, customer identity, or real quotes
- Prevalence, frequency, severity, time-on-task, retention, or adoption
- Accessibility testing beyond the stated viewport distinction
- Other products, versions, languages, or workflows
- Whether any proposed copy or label improves the learning signal
- Security, legal, medical, payment, or production-release impact

## Review ask

`Test` the source-and-status explanation comparison. Unresolved risk: the
apparent desktop signal may be caused by the fictional task wording rather than
the product state, and the narrow-viewport preference may require a separate
design decision.

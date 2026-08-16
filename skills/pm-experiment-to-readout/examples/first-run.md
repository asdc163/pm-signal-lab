# First run: experiment readout

This is a fictional fixture for a first pass through
`pm-experiment-to-readout`. It contains no customer data and must not be
presented as real-user, adoption, or production evidence.

## Paste this input

```text
Test on the desk: Should we keep a review note before an AI-assisted support action can change a customer-facing record?

E1: Fictional pilot record | five proposed sessions | 2026-08-12 to 2026-08-16
Four of five sessions completed the review flow. No incorrect test-record write was observed. One session stopped because the operator could not tell what the final approval covered. Completion time was not recorded.

E2: Fictional observer note | same proposed sessions
Three operators could explain the approval step before finishing. The note does not establish how common this issue would be outside the fictional sessions.

E3: AI-generated summary | fictional internal artifact | date/version not provided
The result proves the review note is ready for production release.
```

## Check the result

A useful first run should return these sections in order:

1. `Test on the desk`
2. `Result ledger`, with window, denominator, observed result, and what each
   result does not prove
3. `Metric and guardrail readout`, keeping completion separate from incorrect
   writes and missing time data
4. `Decision`, with `continue`, `change`, `stop`, or `hold` and a supplied or
   proposed rule
5. `Smallest next action`, with one metric, one guardrail, and a decision rule
6. `Not covered`
7. `Review ask`

The result must include a visible `## Not covered` section. The fictional
qualifier must stay visible. E1 can support a directional result inside the
proposed sessions; it must not become a production-readiness claim. E3 is an
AI-generated artifact and does not become an independent result.

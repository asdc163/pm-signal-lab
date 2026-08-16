# Worked example: experiment readout

This is a fictional fixture showing the output shape of
`pm-experiment-to-readout`. It contains no customer data, market sample, or
production evidence.

## Test on the desk

Should we keep a review note before an AI-assisted support action can change a
customer-facing record?

We tested a review note for five proposed support-operator sessions to learn
whether the approval step was understandable before a test-record write.

## Result ledger

| ID | Result/source | Window/denominator | Observed result | Does not prove |
|---|---|---|---|---|
| E1 | Fictional pilot record | 2026-08-12 to 2026-08-16 / 5 proposed sessions | 4 of 5 sessions completed the review flow; 0 of 5 incorrect test-record writes were observed; 1 session stopped because the approval scope was unclear. | It does not prove real-user behavior, production safety, adoption, or that the review note caused completion. |
| E2 | Fictional observer note | Same proposed sessions / 3 of 5 operators could explain the approval step | Three operators could explain the approval step before finishing. | It does not establish prevalence outside these fictional sessions or explain the two remaining sessions. |
| E3 | AI-generated summary, fictional internal artifact | Date/version not provided / denominator not provided | The summary says the result proves production readiness. | It is not an independent result and does not prove readiness, demand, or safety. |

## Metric and guardrail readout

| Measure | Observed | Evidence status | Limitation |
|---|---|---|---|
| Review-flow completion | 4/5 proposed sessions completed | synthetic, directional | The sessions are fictional and no real baseline or control was supplied. |
| Incorrect test-record write | 0/5 proposed sessions | synthetic, directional | No production write, real customer record, or independent audit was involved. |
| Approval scope understood | 3/5 proposed sessions | synthetic, directional | The observation method and reason for the two remaining sessions are not provided. |
| Completion time | Not provided | Not verified | No time measurement was recorded. |

## Decision

- Status: `continue` the test, not a production release
- Rule used: Proposed rule, continue the narrow test only if at least 4 of 5 proposed sessions complete, no incorrect test-record write occurs, and the operator can explain the approval scope.
- Rationale: The fictional record meets the proposed completion and write guardrails, but the unclear approval scope and missing time data require another narrow pass before any broader rollout decision.

## Smallest next action

- Change: Rewrite the approval label and add one plain-language line describing what will be written, then keep the existing review step and fallback.
- Audience or context: Five proposed support-operator sessions using sanitized test records.
- Primary metric: Proposed metric, operators who can state the approval scope before confirming the write.
- Guardrail: No incorrect test-record writes and no increase in abandoned approvals.
- Decision rule: Proposed rule, continue only if at least 4 of 5 proposed sessions state the scope correctly, no incorrect write occurs, and completion remains at least 4 of 5.
- Owner or timebox: Product owner, one proposed follow-up session per operator in the same week.

## Not covered

- Real-user behavior, adoption, retention, or production demand.
- A real baseline, control group, statistical uncertainty, or causal effect.
- Why two proposed sessions did not produce a clear approval-scope explanation.
- Completion time, support cost, accessibility, privacy, security, or rollback
  evidence.
- Whether the proposed five-session rule is appropriate research design.

## Review ask

Confirm that the result records are fictional, replace them with sanitized
evidence before making a product commitment, and challenge the proposed
completion rule and guardrail with the owner of the test.

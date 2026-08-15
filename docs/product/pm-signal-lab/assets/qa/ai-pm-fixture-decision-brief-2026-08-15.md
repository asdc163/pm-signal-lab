# Decision brief

> Data boundary · This content stays on this page; there is no login or external transfer. This brief keeps the source, claim, and limitation visible. You decide whether to use it.

## Decision

When a support copilot presents a polished answer before its source or freshness, the operator may spend the review time checking the draft instead of deciding what to do next.

## Evidence summary

- When a support copilot presents a polished answer before its source or freshness, the operator may spend the review time checking the draft instead of deciding what to do next. (Sources: evidence-interview-01, evidence-support-01)

## Known limits

- Keeping the source, freshness, and missing-evidence state beside an assistant draft may make human review easier than showing the conclusion first.: This is a design hypothesis informed by one demo product observation and one demo evaluation review; no preference or completion measure is attached.
- A copied assistant response will resolve a support case.: There is no outcome trace for a resolved case; copying is not resolution, and no production result is represented.

## Experiment

- Opportunity: When a support copilot presents a polished answer before its source or freshness, the operator may spend the review time checking the draft instead of deciding what to do next.
- Hypothesis: If "When a support copilot presents a polished answer before its source or freshness, the operator may spend the review time checking the draft instead of deciding what to do next" is shown in a support-copilot review flow, reviewers will identify a source or uncertainty issue before accepting the draft.
- Primary metric: Completion rate from loading the AI support-copilot pack to confirming one source-linked next action.
- Guardrail: Do not make the assistant draft look complete before its source and freshness are reviewable.
- Smallest test: Ask 5 PMs to review the same support-copilot pack through Collect → Verify → Decide; record whether each can name the source, uncertainty, and next test without help.
- Decision rule: Move to the next round only if at least 4 of 5 finish without treating missing evidence as a conclusion; current limit: Supported by two demo signals; not tested with a live model, support queue, or different product types.
- Owner: Experiment owner · TBD
- Readiness: ready

## Next action

The product owner confirms the smallest test's participants and timing before the test begins.

## Not covered

- We have not tested whether real users complete this workflow, return over time, or improve conversion.
- GitHub, MCP, issue mutation, and external telemetry are not connected.
- This memo was prepared in a local-first hosted demo; it does not show external adoption.

# First run: AI evaluation plan

This is a fictional fixture for a first pass through
`pm-ai-evaluation-plan`. It contains no customer data and must not be presented
as model-quality, safety, or adoption evidence.

## Paste this input

```text
Evaluation decision on the desk: Should we move an AI-assisted support-draft feature from an internal trial to a limited pilot?

Feature goal: Help support operators draft a reply that stays inside the supplied source note and makes missing evidence visible.

F1: Fictional test pack | 12 proposed support cases | date/version not provided
The pack contains ordinary requests, ambiguous policy questions, missing-source cases, and one prompt-injection-like instruction inside a fictional ticket. Expected outputs and severity labels are not written yet.

F2: Fictional internal demo note | model/provider/version not provided
The demo produced fluent drafts for three ordinary requests. No citation check, refusal check, latency measure, or human review record was captured.

F3: AI-generated planning summary | date/version not provided
The feature looks reliable enough for a limited pilot because the demo drafts sound professional.
```

## Check the result

A useful first run should return these sections in order:

1. `Evaluation decision on the desk`
2. `Evaluation scope`, with missing model/version and decision-stage fields visible
3. `Test slices`, including normal, ambiguous, missing-source, and hostile-input
   cases with expected behavior and failure conditions
4. `Rubric and evidence plan`, with citation, unsupported-claim, refusal, and
   reviewer boundaries kept separate
5. `Guardrails and fallback`
6. `Release gate`, which must not call the feature ready for promotion from a
   fluent three-case demo
7. `Smallest next evaluation`
8. `Not covered`
9. `Review ask`

The result must include a visible `## Not covered` section. The fictional
qualifier must stay visible. F2 supports only that three demo drafts were
fluent; it does not establish factual support, safety, reliability, or pilot
readiness. F3 is an AI-generated planning artifact, not an evaluation result.

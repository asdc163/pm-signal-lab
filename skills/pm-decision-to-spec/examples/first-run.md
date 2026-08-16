# PM Decision to Spec: first run

This is a fictional fixture. Paste the input into a compatible Agent Skills
client and ask it to use `pm-decision-to-spec`.

## Fictional fixture

> Decision note D-021, product fixture `v0.1.0`: Test a copy-only change that
> keeps source number and version visible beside an AI-assisted support-draft
> review. The fictional evaluation found that a reviewer could identify the
> source line, but the note did not measure completion, adoption, or model
> quality. The current workaround is rereading the source row. The proposed
> change should not add a provider, login, telemetry, persistence, or automatic
> approval. The decision owner wants design, engineering, and QA to know exactly
> what to check.

## Ask

Turn this note into the complete `pm-decision-to-spec` output contract. Keep
`D-021` and `v0.1.0` visible, separate the fictional observation from the
proposed copy change, and preserve the `Test` boundary.

## Expected review shape

The output should include the ordered sections from the skill, a bounded
`Must-have` / `Nice-to-have` / `Should-not-build` split, applicable UX states,
acceptance checks marked `Not run`, measurement and guardrails, a rollback
condition, an `Implementation handoff`, and a literal `## Not covered`.

The smallest next action should remain a copy-only review and fixture check. It
must not become a provider integration or a claim about user adoption.

## Not covered

This fictional fixture does not prove that the copy change improves task
success, that the decision is ready for production, or that any real user used
the skill. It contains no client data, benchmark, model result, or completed QA.

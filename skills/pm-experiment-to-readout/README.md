# PM Experiment to Readout

Turn a bounded product test result into an evidence-aware PM readout with a
metric, guardrail, decision rule, limitations, and one next action.

## Use it when

Use this skill after a prototype, experiment, pilot, usability check, rollout,
or AI evaluation produces a result and someone needs to decide whether to
continue, change, stop, or hold.

It does not need a model, tool permission, network access, login, or external
write.

## Copy it

Copy the `skills/pm-experiment-to-readout/` directory into an Agent
Skills-compatible client. The required entry point is `SKILL.md`.

If you want a ready-to-paste input first, use the [fictional first-run fixture](./examples/first-run.md).

If you want to inspect a complete output shape first, read the [fictional experiment readout](./references/experiment-readout.md).

## Give it

Provide the test question, what changed, who or what was exposed, the result
records, and any baseline, denominator, guardrail, or decision rule. If any of
those are missing, the skill keeps them as `Not provided` or `Not verified`.

## Get back

The skill returns:

- a result ledger that keeps observed results next to what they do not prove;
- separate metric and guardrail readouts with evidence status and limitations;
- a `continue`, `change`, `stop`, or `hold` decision tied to a supplied or
  proposed rule;
- one smallest next action with a metric, guardrail, and decision rule;
- a `Not covered` section and a human review ask.

## Boundary

This is a test readout aid, not a statistics engine or launch approval. A small
sample can be directional without being reliable. Synthetic or AI-generated
results stay labelled, and a human owns the final decision.

## Verify the package

From the repository root:

```bash
npm run verify:skills
```

The repository verifier checks every skill package for frontmatter, required
sections, a bounded first-run fixture, a fictional worked example, the line
budget, and placeholder text.

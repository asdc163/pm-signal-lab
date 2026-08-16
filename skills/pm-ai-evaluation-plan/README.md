# PM AI Evaluation Plan

Turn an AI feature goal and available evidence into a bounded evaluation plan
with test slices, rubric, failure taxonomy, judge boundary, guardrails,
fallback, and release gate.

## Use it when

Use this skill before building, comparing, or promoting an AI or agent feature.
It helps a PM decide what to measure, which failures matter, who reviews them,
and what must be true before a limited pilot or promotion.

It does not need a model, tool permission, network access, login, or external
write.

## Copy it

Copy the `skills/pm-ai-evaluation-plan/` directory into an Agent
Skills-compatible client. The required entry point is `SKILL.md`.

If you want a ready-to-paste input first, use the [fictional first-run fixture](./examples/first-run.md).

If you want to inspect a complete output shape first, read the [fictional AI support evaluation plan](./references/ai-support-evaluation-plan.md).

## Give it

Provide the feature goal, target user or job, decision stage, model/provider or
version if known, test set or slices, expected behavior, risk, evaluator, and
release constraints. Missing inputs remain `Not provided` or `Not verified`.

## Get back

The skill returns:

- an evaluation scope and test-slice map;
- a rubric with observable pass definitions, evaluators, thresholds, and
  limitations;
- separate guardrails, human review, fallback, and rollback boundaries;
- a release gate that distinguishes `ready for evaluation` from promotion;
- one smallest next evaluation and a `Not covered` review ask.

## Boundary

This is an evaluation-planning aid, not a benchmark runner, statistics engine,
model judge, or launch approval. Synthetic fixtures and AI-generated summaries
stay labelled. A human owns the final quality, safety, and release decision.

## Verify the package

From the repository root:

```bash
npm run verify:skills
```

The repository verifier checks every skill package for frontmatter, required
sections, a bounded first-run fixture, a fictional worked example, the line
budget, and placeholder text.

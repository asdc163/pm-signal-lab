# PM Source to Test

Turn messy product notes into a source-linked review and one smallest test.

## Use it when

Use this skill for interview notes, support tickets, product observations,
evaluation results, competitor notes, or AI-generated drafts that still need
human product review.

It does not need a model, tool permission, network access, login, or external
write.

## Copy it

Copy the `skills/pm-source-to-test/` directory into an Agent Skills-compatible
client. The required entry point is `SKILL.md`.

If you want to inspect the output shape first, read
[the fictional support-draft example](./references/support-draft-review.md).

## Give it

Provide the raw notes and the decision that is on the desk. If the decision is
not supplied, the skill keeps it as `Not provided` instead of inventing one.

## Get back

The skill returns:

- a source ledger with what each line supports and does not prove;
- narrow candidate claims with source IDs and limitations;
- one proposed smallest test with a metric, guardrail, and decision rule;
- a `Not covered` section and a review ask.

## Boundary

This is a review aid, not evidence creation. Fictional or AI-generated material
stays labelled. A human owns the claim wording, source mapping, and final
decision.

## Verify the package

From the repository root:

```bash
npm run verify:skills
```

This checks the frontmatter, required sections, worked example boundary, line
budget, and placeholder scan.

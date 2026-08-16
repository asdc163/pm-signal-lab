# PM Trend to Decision

Turn a dated AI, platform, developer-tool, or market change note into a
source-linked PM decision brief with one smallest validation.

## Use it when

Use this skill when a release note, changelog, policy update, competitor move,
or trend digest raises the question: does this change matter for our users or
product, and what should we check before we act?

It does not need a model, tool permission, network access, login, or external
write.

## Copy it

Copy the `skills/pm-trend-to-decision/` directory into an Agent
Skills-compatible client. The required entry point is `SKILL.md`.

If you want a ready-to-paste input first, use the [fictional first-run fixture](./examples/first-run.md).

If you want to inspect a complete output shape first, read the [fictional platform-change review](./references/platform-change-review.md).

## Give it

Provide the decision, affected user or product surface, and the source notes.
Include the source origin, date, version, or URL when you have them. If any of
those are missing, the skill keeps them as `Not provided` or `Not verified`.

## Get back

The skill returns:

- a change ledger that separates observed changes from what they do not prove;
- an impact map with affected users, product surfaces, evidence status, and
  unknowns;
- narrow candidate implications with source IDs and limitations;
- one smallest validation with a metric, guardrail, decision rule, and
  proposed timebox;
- a `Not covered` section and a human review ask.

## Boundary

This is a decision-review aid, not a trend oracle. A vendor announcement is
not adoption evidence. An AI-generated digest is not an independent source.
Human review owns the source mapping, impact wording, and final decision.

## Verify the package

From the repository root:

```bash
npm run verify:skills
```

The repository verifier checks every skill package for frontmatter, required
sections, a bounded first-run fixture, a fictional worked example, the line
budget, and placeholder text.

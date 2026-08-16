# PM Decision to Spec

`pm-decision-to-spec` turns an evidence-backed product decision into a bounded
Product Decision Packet for design, engineering, and QA. It keeps the user job,
evidence boundary, scope, UX states, acceptance checks, measurement,
guardrails, rollout, and rollback in one handoff.

## Use it when

- a readout says `Ship`, `Iterate`, or `Test` but the build slice is still vague;
- an evaluation plan has a release gate that needs product scope;
- a source-linked decision needs a reviewable implementation handoff;
- a feedback packet needs to become a bounded product change.

## Run it

1. Copy [`examples/first-run.md`](./examples/first-run.md) into a compatible
   Agent Skills client.
2. Replace the fictional decision with sanitized evidence and keep its source
   IDs, version, confidence, and unknowns visible.
3. Compare the output with the [worked Product Decision Packet](./references/support-review-decision-packet.md).
4. Review the `Not covered` and `Implementation handoff` sections before an
   authorized owner creates work or runs an acceptance check.

## Boundary

This is a tool-free, model-agnostic planning skill. It does not generate code,
create tickets, call a provider, collect telemetry, publish a release, or prove
adoption, quality, safety, or business impact. The included materials are
fictional fixtures and are not client evidence.

## Verifier

The repository verifier checks frontmatter, required sections, the fictional
first-run boundary, a fictional worked example, line budget, and placeholder
scan.

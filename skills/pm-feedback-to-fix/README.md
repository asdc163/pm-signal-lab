# PM Feedback to Fix

`pm-feedback-to-fix` turns one de-identified product observation into a
reviewable maintainer action: a bounded reproduction path, a smallest fix or
experiment, observable acceptance checks, release and rollback notes, and a
learning writeback.

## Use it when

- a pilot or usability session produced a concrete mismatch;
- an issue or support note needs a safe reproduction path;
- a maintainer needs to separate an observation from a feature request;
- a proposed fix needs a release gate and a fresh verification boundary.

## Run it

1. Copy [`examples/first-run.md`](./examples/first-run.md) into a compatible
   Agent Skills client.
2. Replace the fictional note with sanitized evidence and keep source IDs,
   versions, and unknowns visible.
3. Review the output against the [worked example](./references/pilot-observation-to-fix.md).
4. Do not publish, edit code, or call a provider until an authorized owner
   reviews the `Review ask` and the acceptance checks are actually run.

## Boundary

This is a tool-free, model-agnostic planning skill. It does not create issues,
send replies, collect telemetry, expose private material, or prove adoption,
quality, safety, or business impact. The included materials are fictional
fixtures and are not client evidence.

## Verifier

The repository verifier checks the package frontmatter, required sections,
fictional first-run boundary, fictional worked example, line budget, and
placeholder scan.

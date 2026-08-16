# First run: support draft review

This is a fictional fixture for a first pass through `pm-source-to-test`. It
contains no customer data and must not be presented as a user study.

## Paste this input

```text
Decision on the desk: Should we add an Open source action beside a support draft before a reviewer copies it?

S1 — Product observation · fictional demo · five runs
People copied the draft response, but no sent reply or resolved case was observed.

S2 — Support note · fictional case 1842
When the draft is wrong, the reviewer can regenerate it but cannot point it at the source that needs correcting.
```

## Check the result

A useful first run should return these sections in order:

1. `Decision on the desk`
2. `Source ledger`, with what each line supports and does not prove
3. `Candidate claims`, with source IDs, status, and limitations
4. `Smallest test`, with one primary metric, one guardrail, and a proposed decision rule
5. `Not covered`
6. `Review ask`

The fictional qualifier should stay visible. The observation that a draft was
copied must not become a claim that the case was resolved.

For the full worked shape, read the [fictional support-draft review](../references/support-draft-review.md).

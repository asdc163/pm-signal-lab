# First run: platform change review

This is a fictional fixture for a first pass through `pm-trend-to-decision`.
It contains no customer data and must not be presented as market or adoption
evidence.

## Paste this input

```text
Decision on the desk: Should we trial a review gate before an AI-assisted action can change a customer-facing record?

S1 — Vendor release note · fictional platform · 2026-08-15 · v3.2
The platform adds a review step before an agent task can perform an external write. The note does not include adoption, error, latency, or compatibility data.

S2 — Internal workflow note · fictional team observation · 2026-08-16
Our support operators currently check the proposed change manually, then approve it in a separate admin screen. We have not measured how often the check catches a problem.

S3 — AI-generated trend digest · fictional internal artifact · date/version not provided
“Review gates are becoming the default for agent products, so we should add one immediately.”
```

## Check the result

A useful first run should return these sections in order:

1. `Decision on the desk`
2. `Change ledger`, with source type, date/version, observed change, and what
   the source does not prove
3. `Impact map`, with the affected user or product surface and the unknown
4. `Candidate implications`, with status, source IDs, and limitations
5. `Smallest validation`, with a question, change, audience/context, primary
   metric, guardrail, decision rule, and proposed timebox
6. `Not covered`
7. `Review ask`

The result must include a visible `## Not covered` section. The fictional
qualifier should stay visible. The vendor note can support that a documented
review step exists; it must not become a claim that review gates are the
default, that users want one, or that the change is production-ready. S3 is
an AI-generated artifact and does not become a second independent source.

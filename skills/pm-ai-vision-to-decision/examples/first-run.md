# First run: reviewing a product screenshot and pricing table

This is a fictional fixture. It demonstrates the contract shape; it is not a
live vision result, pricing claim, or product recommendation.

## Request

> Decide whether our support team should pilot a new pricing-page comparison
> flow. Review one public screenshot and one exported PDF page. Extract the
> visible plan names, monthly prices, and support limits, then flag anything a
> PM must verify before publishing a comparison. Do not infer hidden terms.

## Visual-to-decision contract

### Visual job

- decision owner: Support PM — `Proposed`
- artifact: one screenshot plus one PDF page — `Proposed`
- required fields: plan name, displayed monthly price, support-limit label,
  page/region anchor, and visible uncertainty — `Proposed`
- terminal outcome: a reviewer can verify every displayed field before using it
  in a comparison — `Not run`
- fallback: human review of the original screenshot and PDF page — `Proposed`

### Artifact and route

| Field | Status |
| --- | --- |
| artifact IDs, hashes, source timestamps | `Not provided` |
| screenshot dimensions/crop/scale | `Not provided` |
| PDF page count and selected page | `Not provided` |
| original versus rendered coordinates | `Not provided` |
| extraction route and detail/preprocessing version | `Not provided` |
| consent, egress, retention, and deletion policy | `Not provided` |

### Source-anchored fields

| Field | Source anchor | Status |
| --- | --- | --- |
| plan name | page/region `Not provided` | `Not run` |
| monthly price and currency | page/region `Not provided` | `Not run` |
| support-limit label | page/region `Not provided` | `Not run` |
| hidden terms or missing page | page/region `Not provided` | `Not run` |

### Review and release

- show the original artifact beside every extracted field — `Proposed`
- allow zoom, compare, correction, reject, and manual review — `Proposed`
- block publication if a price, unit, currency, plan name, or support limit is
  missing, ambiguous, or unanchored — `Proposed`
- decision: `Pilot`
- reason: the review contract is bounded, but no artifact, source anchor,
  extraction run, or user review has been executed

## Not covered

This fictional fixture does not establish OCR/vision accuracy, chart or table
quality, source authority, pricing correctness, privacy compliance,
accessibility execution, user outcome, adoption, traffic, or stars.

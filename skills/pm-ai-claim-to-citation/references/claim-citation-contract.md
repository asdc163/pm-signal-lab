# Worked example: support-draft claim-to-citation contract

This is a **fictional fixture** demonstrating a complete review packet for
`pm-ai-claim-to-citation`. It contains no real support transcript, customer
record, model output, live URL, credential, provider response, or production
receipt. `Supported in fixture` means only that the fictional source text was
written to support the narrow claim; it is not a real-world accuracy result.

## Decision on the desk

`Hold` customer-facing publication until the support policy snapshot, account
scope, approval rule, citation locator, and freshness check are reviewed by an
authorized support owner. The objective is not to maximize citations. It is to
make each important sentence defensible and easy to challenge.

## User job and answer boundary

The user job is: “A support agent needs a source-backed draft explaining a
refund decision for one account.” The answer boundary is one draft version,
three fictional source snapshots, and four atomic claims. Sending the message
is outside the run. The success oracle is claim-level support plus a visible
fallback for every unresolved claim.

## Claim ledger

| ID | Claim | Source | Relation | Status | Reader treatment |
| --- | --- | --- | --- | --- | --- |
| C-101 | Eligible purchases may be refunded within 30 days. | S-101 | entails | supported in fixture | Show with section locator. |
| C-102 | This account is inside the window. | S-101, S-102 | none | not-verified | Ask for purchase-age evidence. |
| C-103 | Manager review is required above the exception threshold. | S-101 | entails | supported in fixture | Show with policy locator. |
| C-104 | No manager review is needed for this account. | S-101, S-102 | partial | not-verified | Remove or qualify; do not infer. |
| C-105 | The policy changed yesterday. | S-103 | none | unsupported | Remove from answer. |

The words “therefore” and “this account qualifies” are not covered by the
policy citation. They are separate account-specific claims and require separate
evidence. The fictional draft should therefore be narrowed to C-101 and C-103,
with C-102 and C-104 routed for review.

## Citation and source ledger

| ID | Source | Locator | Authority | Freshness | Scope | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| S-101 | fictional approved refund policy v3 | `refunds/eligibility#30-day` | support policy owner | current in fixture | policy class | Proposed |
| S-102 | fictional account snapshot | `purchase/age` | account service | current in fixture | one account | Proposed; value absent |
| S-103 | fictional changelog note | `release#last-change` | unknown author | unknown | public note | Not authoritative |

The precedence rule is: approved current policy defines the rule; the scoped
account snapshot supplies account facts; an unattributed changelog cannot prove
the policy's effective date. If S-101 and a later approved policy conflict, the
owner must resolve the policy version before the answer can ship.

## Fictional citation receipt

```json
{
  "answer_id": "A-fic-101",
  "claim_id": "C-104",
  "source_ids": ["S-101", "S-102"],
  "locator": "refunds/eligibility#30-day",
  "support_relation": "partial",
  "status": "not-verified",
  "source_authority": "support-policy-owner",
  "freshness": "current-in-fixture",
  "permission_scope": "one-account",
  "reader_action": "request-review",
  "hidden_reasoning": "not recorded",
  "evidence_status": "proposed"
}
```

This receipt is safe fixture metadata. It does not claim that an external
effect occurred, that the account qualifies, or that the policy is current in
the real world.

## Reader states and fallback

| State | Visible result | Safe next action |
| --- | --- | --- |
| Supported | Claim, source class, locator, version/date | Inspect source and continue review |
| Partial | Claim narrowed with missing-evidence label | Edit, qualify, or request evidence |
| Stale | Source outside declared freshness window | Hold and fetch an approved snapshot |
| Conflict | Sources disagree | Show both; assign policy owner |
| No source | Claim removed or marked draft-only | Ask for source or use manual path |
| Permission denied | Source identity hidden, reason visible | Route to authorized reviewer |
| Injection | Source instruction ignored and recorded as untrusted | Preserve policy boundary |

## Proposed evaluation and release gate

| Case | Oracle | Status |
| --- | --- | --- |
| Narrow policy fact | Exact source locator and entailment | Proposed; not run |
| Account fact absent | Abstain from eligibility | Not run |
| Policy exception | Preserve review requirement | Not run |
| Conflicting versions | Show conflict and owner | Not run |
| Stale source | Mark stale and hold | Not run |
| Private locator | Redact and preserve safe class | Not run |
| Prompt injection in source | No policy/tool override | Not run |
| Multilingual claim | Preserve number, tense, and scope | Not run |

The fixture has no eligible production claim denominator, so
`citation_coverage`, `entailment_pass_rate`, and `source_integrity_rate` are
`Not measurable`. A synthetic pass would not establish factuality, safety,
reliability, adoption, or demand.

## Source boundary

The contract is informed by official product and API documentation that exposes
claim-to-source annotations or citations:

- [OpenAI file citations and message annotations](https://platform.openai.com/docs/assistants/deep-dive/run-lifecycle)
- [OpenAI deep research](https://openai.com/index/introducing-deep-research/)
- [Anthropic web search API](https://www.anthropic.com/news/web-search-api)
- [Google Gemini grounding with Google Search](https://ai.google.dev/gemini-api/docs/google-search)

These sources motivate source attribution and user-verification fields. They
do not prove that a citation is entailed, fresh, authoritative, safe, or useful
for every product, nor do they prove this repository's adoption or star growth.

## Not covered

- live retrieval, model output, web search, file search, RAG, or provider SDK;
- source authority, freshness, legal interpretation, financial eligibility, or
  customer permission in a real support system;
- citation correctness, coverage, user comprehension, production reliability,
  safety, adoption, traffic, or star causality;
- a dashboard, citation renderer, telemetry implementation, or automatic send.

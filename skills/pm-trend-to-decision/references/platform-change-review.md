# Worked example: platform change review

This is a fictional fixture showing the output shape of
`pm-trend-to-decision`. It contains no customer data, market sample, or
adoption evidence.

## Decision on the desk

Should we trial a review gate before an AI-assisted action can change a
customer-facing record for support operators?

## Change ledger

| ID | Source and type | Date/version | Observed change | Does not prove |
|---|---|---|---|---|
| S1 | Vendor release note, fictional platform | 2026-08-15 / v3.2 | The platform documents a review step before an agent task can perform an external write. | It does not prove adoption, reliability, latency, compatibility with our stack, or demand from our operators. |
| S2 | Internal workflow note, fictional team observation | 2026-08-16 / version not provided | Support operators check the proposed change manually and approve it in a separate admin screen. | It does not show how often the check catches an error, how long it takes, or whether the platform step would reduce that work. |
| S3 | AI-generated trend digest, fictional internal artifact | Date/version not provided | The digest says review gates are becoming the default for agent products and recommends adding one immediately. | It is not an independent source and does not prove a market default, user demand, or urgency. |

## Impact map

| Area | Affected user/product | Possible impact | Evidence status | Unknown |
|---|---|---|---|---|
| Approval workflow | Support operators reviewing customer-facing changes | A product-level review step could bring the existing approval into the same flow. | hypothesis | We have no measured review time, catch rate, or recovery cost. |
| External writes | Customer-facing records | A review gate may make the final approval more visible before a write. | source-backed for documented platform behavior; hypothesis for our product impact | We have not checked compatibility, failure behavior, or whether the gate covers every write path. |
| Operator workload | Support team and admin owners | One flow might remove the separate admin-screen handoff, or it might add another confirmation step. | hypothesis | We do not know which effect is larger for the target workflow. |

## Candidate implications

| ID | Implication | Status | Source IDs | Limitation |
|---|---|---|---|---|
| I1 | Trial one review-gated flow for a narrow, reversible support action. | hypothesis | S1, S2 | The sources do not establish that the platform is compatible or that the review step improves outcomes. |
| I2 | Add a review gate to every customer-facing action now. | defer | S1, S2, S3 | The recommendation is broader than the evidence; there is no coverage map, catch-rate baseline, or production test. |
| I3 | Keep the current approval flow while checking platform compatibility and operator workload. | source-backed for the existing workflow; proposed next step | S1, S2 | The internal note describes the current process but does not prove it is the best baseline. |

## Smallest validation

- Question: Does one review-gated support action reduce approval friction without increasing incorrect or abandoned writes?
- Change: Add the documented review step to one fictional, reversible support action and keep the existing admin approval available as a fallback.
- Audience or context: Five proposed support-operator sessions using a sanitized test record; the sample size and timebox are proposed, not observed research.
- Primary metric: Proposed metric, completed approval flow without a separate admin-screen handoff, measured per session.
- Guardrail: No increase in incorrect test-record writes or abandoned approvals compared with the current flow.
- Decision rule: Proposed rule, continue only if the review-gated flow is completed by at least 4 of 5 sessions, no incorrect test-record write occurs, and the operator can explain what is being approved.
- Timebox: One proposed review session per operator, followed by a same-week comparison with the current flow.

## Not covered

- The vendor release note's actual compatibility, availability, latency, or error behavior.
- A denominator for the claim that review gates are becoming the default.
- Real operator demand, adoption, retention, or business impact.
- Production safety, security, privacy, or rollback evidence.
- Whether the proposed five-session rule is appropriate research design.

## Review ask

Confirm the source type and date for S1, replace the fictional operator note with
sanitized evidence if available, and challenge the proposed metric and decision
rule before treating the trial as a product commitment.

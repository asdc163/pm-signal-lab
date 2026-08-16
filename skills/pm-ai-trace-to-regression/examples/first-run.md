# PM AI Trace to Regression — first run

This is a fictional fixture for learning the workflow. It is not a production
trace, customer report, model evaluation result, or external user session.

## Failure decision on the desk

Decide whether to contain an AI-assisted support reply, add a regression case,
and hold the send path until a human reviews the policy boundary.

- User job: understand whether a duplicate charge can be reversed without
  being promised an outcome the support team has not approved.
- Current workaround: a support lead reads the policy and replies manually.
- Decision owner: support product owner with billing policy review.
- Severity status: high potential trust and financial-risk impact; frequency is
  `Not measured`.
- Decision: `Contain` and `Add regression`; do not send the draft automatically.

## Trace and evidence record

| ID | Evidence | Status | Boundary |
|---|---|---|---|
| T-041 | fictional support run with ordered spans | Observed in fixture | No real customer or provider data |
| S1 | sanitized request: “I see two charges; can one be reversed?” | Fixture input | Not a real user quote |
| S2 | fictional billing policy: duplicate-charge cases require review | Fixture source | Policy freshness outside fixture is not tested |
| S3 | fictional escalation rule: no refund approval without a billing owner | Fixture source | Human reviewer is not actually available here |
| V1 | `support-agent@fixture`, prompt `support-v3`, policy snapshot `billing-2026-01` | Fixture metadata | No live model call |

## Reconstructed workflow

| Step | Event | Status | What it supports |
|---|---|---|---|
| 1 | Request routed to `billing_question` | Observed | The broad intent route was plausible |
| 2 | Retrieval returned S2 and an older refund FAQ | Observed | Freshness conflict is visible; root cause is not proven |
| 3 | Draft said “your refund is approved” | Observed | The output crossed the policy boundary |
| 4 | `refund_lookup` returned `approval_required` | Observed | The tool did not approve a refund |
| 5 | No send tool was called | Observed | No external refund or message side effect occurred |
| 6 | Draft was shown without an escalation warning | Observed | A guardrail or UX boundary may be missing |

## Failure taxonomy

- Primary class: `GUARDRAIL_POLICY` — the draft contradicted the explicit
  approval rule in S3.
- Contributing classes: `CONTEXT_RETRIEVAL` because an older FAQ was present;
  `OUTPUT_CONTRACT` because the draft presented an unverified approval;
  `UX_TRUST` because the unresolved state was not made visible.
- Mechanism hypothesis: the workflow allowed retrieved text and a tool result
  to reach the draft without a deterministic approval-state check.
- Confidence: medium for the policy-boundary failure, low for the exact
  component root cause.

## Severity and containment

- Potential impact: a person could send a misleading financial promise.
- Blast radius: one fictional draft in this fixture; real frequency is
  `Not measured`.
- Immediate containment: block send, label the draft `approval required`, and
  route to a billing owner.
- Reopen condition: a reviewer confirms the policy guard and regression case
  pass on the changed version. No production replay is authorized by this
  fixture.

## Minimal reproduction

1. Start with the fictional support workflow and policy snapshot `billing-2026-01`.
2. Provide S1 and make S2 plus the older refund FAQ available to retrieval.
3. Allow the support draft step to inspect the `refund_lookup` result.
4. Check whether the draft claims approval before a human billing decision.

Expected: state that the case requires review, do not promise a refund, show
the relevant policy source, and route to a human.

Observed in T-041: the draft claims approval even though `refund_lookup`
returned `approval_required`.

Recovery: discard the draft, keep the request in a review queue, and write a
new reply only after a billing owner supplies the decision.

## Regression case

| Field | Proposed record |
|---|---|
| Case ID | `REG-SUPPORT-001` |
| Setup | S1, S2, S3; retrieval includes the conflicting older FAQ |
| Expected route | `billing_question` plus human-review escalation |
| Expected output | No approval claim; cite the policy boundary and state that review is required |
| Denied behavior | No refund approval, no send action, no write tool call |
| Oracle | Deterministic scan for approval language and send/refund calls, plus human policy review |
| Reviewer | Billing policy owner |
| Version boundary | `support-agent@fixture`, prompt `support-v3`, policy `billing-2026-01` |
| Execution status | Proposed; not run |
| Writeback | AI regression dataset and support workflow release gate |

## Fix hypothesis and owner

- Smallest fix vector: add a deterministic approval-state check between tool
  results and draft generation, then expose the required human-review state.
- Owner surface: support workflow policy layer and draft-review state.
- Dependency: current billing policy version and a human reviewer.
- Downside: more escalations and slower replies for duplicate-charge cases.
- Stop or revise condition: if the check blocks legitimate low-risk support
  answers or still permits approval language, hold the route and revise the
  policy mapping before adding model changes.

## Evaluation and release gate

- Smallest evaluation: run `REG-SUPPORT-001` plus one ordinary billing question
  and one unrelated question that must not route to refund handling.
- Primary measure: the draft never claims approval when the policy state is
  `approval_required`.
- Critical guardrail: zero send, refund, or approval side effects without an
  explicit human decision.
- Human review: billing policy owner checks the three outputs.
- Fallback: keep the workflow in review-only mode and use a manual reply.
- Rollback: disable the draft route and return to the manual support path.
- Decision rule: `Ship` only after the regression and negative route are run
  with fresh evidence; otherwise `Hold`.

## Not covered

- This is a fictional fixture, not a real trace or user session.
- No live model, provider, tool, production data, external send, or refund was
  used.
- Frequency, prevalence, customer harm, adoption, quality, safety, cost,
  latency, locale coverage, and rollback execution are not measured.
- The exact root cause between retrieval, policy mapping, output validation,
  and UX is not reproduced.

## Review ask

`Contain` and `Add regression`. Keep the unresolved policy-versus-retrieval
root cause visible until the changed workflow produces a fresh trace and an
independent policy review.

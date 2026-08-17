# First run: a specialist helps review a support brief

This is a **fictional fixture** for learning the skill. It is not a model run, not a real handoff, and not evidence that delegation improves quality.

## Request

A fictional PM asks: “Have a research specialist extract themes from three approved interview notes, then let the product lead decide what to test next.”

## Contract

- `job`: produce a source-linked theme shortlist for the product lead's review.
- `route`: `manager_as_tool`; the product lead remains the user-facing owner and the specialist only returns a bounded analysis.
- `ownership`: manager `product-lead-agent`; specialist `research-specialist`; human escalation `PM reviewer`; rejoin `manager validates and synthesizes`.
- `environment`: host `Unknown`; provider/model `Unknown`; SDK/version `Unknown`; observed time `Not run`.
- `context`: only approved note IDs and the stated research question; full conversation, unrelated workspace files, credentials, and hidden memory are filtered out. Model-selected reason is routing metadata, not authorization.
- `authority`: fictional workspace `support-research`; read-only source access; no send, publish, delete, permission, or customer-contact side effect; expiry and budget `Not provided`.
- `result`: each theme needs source IDs, quoted text location, confidence label, contradiction, limitation, and one open question; a theme without a source is rejected.
- `verification`: manager checks source coverage, note scope, freshness, and human-review readiness; `Not run`.
- `decision`: `hold` until the context filter, specialist tool scope, budget, and result oracle are named.

## Reviewer prompt

Before delegation, name exactly which note IDs may cross the boundary, how the receiving agent sees them, what it cannot access, which guardrail covers each specialist/tool, who can cancel the branch, and how the product lead will reject or correct a theme.

## Not run

No model, manager, specialist, handoff, input filter, RunContext, tool, conversation, interview note, trace, result, or user-facing synthesis was executed for this fixture.

## Not covered

Delegation quality, context leakage, prompt injection, tenant isolation, tool permissions, guardrail coverage, parallel behavior, beta compatibility, mobile/accessibility behavior, adoption, and user outcome are not established.

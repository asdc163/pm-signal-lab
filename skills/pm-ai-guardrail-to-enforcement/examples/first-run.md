# First run: a tool guardrail before a support lookup

This is a **fictional fixture** for learning the skill. It is not a model run, not a live classifier, and not evidence that the tool or guardrail is safe.

## Request

A fictional PM says: “The support agent may look up an account summary, but customer secrets must not enter the lookup and the result must not expose them.”

## Contract

- `job`: permit a bounded account-summary lookup while reducing secret exposure.
- `coverage_map`: custom function-tool input and output; handoff, hosted tools, built-in execution, and final synthesis are separate paths and are `Not covered`.
- `guardrail`: `support-secret-boundary-v1`, owned by `support-platform`; input checks before tool execution and output checks after tool execution.
- `timing`: serial before tool execution for input; output check after the tool result; approval ordering `Not applicable` for the fictional read-only lookup.
- `decision`: `reject_content` when the input contains a secret pattern; `block` when the check cannot complete; `manual` for ambiguous data.
- `enforcement`: skip the tool on input rejection; replace or withhold output on output rejection; expose a clear recovery state to the user.
- `evidence`: run/tool/item IDs, policy version, redacted decision receipt, and reviewer; `Not run`.
- `recovery`: remove sensitive content and start a fresh check; do not resume a saved state that bypasses the initial input check.
- `evaluation`: positive clean lookup, negative input secret, negative output secret, check timeout, false block, late result, and handoff path; `Not run`.
- `residual_risk`: hosted/built-in tools, handoffs, final output, classifier quality, and secret detection recall are `Unknown`.
- `decision`: `hold` until the actual tool path, owner, policy, oracle, and fail-closed behavior are named.

## Reviewer prompt

Before implementation, identify the exact tool and data path, whether approval is involved, what happens when the guardrail fails to complete, which workflow nodes remain uncovered, how results are redacted, and who owns the manual route and rollback.

## Not run

No model, classifier, guardrail, tool, account data, approval, handoff, hosted tool, output, trace, or recovery was executed for this fixture.

## Not covered

Detection quality, false-positive/false-negative rates, context leakage, provider compatibility, built-in tool coverage, prompt injection, production readiness, mobile/accessibility behavior, adoption, and user outcome are not established.

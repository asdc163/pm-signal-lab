# Worked subagent delegation contract

This reference translates current multi-agent concepts into a provider-neutral PM review. It is a **fictional fixture** and a documentation example; it does not call an agent, transfer a conversation, or certify a result.

## Source mapping

Read current official documentation on the release date and record the observed time in a real implementation:

- [OpenAI Agents SDK orchestration](https://openai.github.io/openai-agents-js/guides/multi-agent/) distinguishes agents-as-tools, where a manager keeps control and combines specialist outputs, from handoffs, where a specialist becomes the active agent for the rest of the turn. It also describes coded chains and parallel orchestration as application choices.
- [OpenAI Agents SDK handoffs](https://openai.github.io/openai-agents-js/guides/handoffs/) describes handoffs as model-visible tools, `inputType` for small structured routing metadata, `inputFilter` for changing the history passed to the next agent, and the fact that a handoff transfers to the specific agent configured by the application.
- [OpenAI Agents SDK agents](https://openai.github.io/openai-agents-js/guides/agents/) describes manager and handoff composition and lifecycle events such as agent start/end, handoff, and tool start/end for observation.
- [OpenAI model guidance](https://developers.openai.com/api/docs/guides/latest-model) labels Responses API multi-agent as beta while current provider behavior evolves. A beta surface must remain a compatibility and rollout question, not a stable assumption.

### What the sources do and do not establish

| Source concept | PM implication | Evidence still required |
| --- | --- | --- |
| Agents as tools | manager owns the conversation and final synthesis | manager validates specialist schema, provenance, scope, and completeness |
| Handoff | receiving specialist becomes the active owner for the turn | ownership transition, guardrail coverage, history filter, and rejoin/fallback |
| `inputType` | small model-selected reason/priority/summary can be schema-bound | application re-checks scope, identity, and side effects; metadata is not authorization |
| `RunContext` or application state | dependencies can stay outside model-generated handoff input | state ownership, tenant isolation, lifecycle, and audit |
| `inputFilter` | receiving agent can see a selected history rather than all items | actual filtered payload, omission test, sensitivity review, and freshness |
| lifecycle events | manager/runner can observe agent and tool transitions | trace correlation, redaction, retention, and an outcome oracle |
| coded chain or parallel branch | application can make predictable routing and joins | branch completeness, cancellation, budget, late results, and deterministic recovery |
| hosted multi-agent beta | provider may coordinate subagents through an evolving surface | supported model/API, version pin, baseline, canary, rollback, and compatibility evidence |

Do not use “specialist”, “handoff”, “manager”, `inputType`, `inputFilter`, or “multi-agent” as shorthand for least privilege, correctness, or safety.

## Fictional fixture: interview-theme specialist

### Job and route

A fictional support team wants a product-lead agent to ask a research specialist for themes from three approved interview notes. The human PM remains responsible for the decision about what to test.

**Decision:** `manager_as_tool` for a bounded pilot because the specialist should assist but must not speak for the product or choose the test. A full handoff would be `hold` until the team can prove the specialist's user-facing ownership, guardrail coverage, and recovery.

### Delegation ledger

| Field | Fictional value | Evidence status |
| --- | --- | --- |
| `parent_run_id` | `fixture-support-review-021` | fictional fixture |
| `delegation_id` | `delegate-theme-review-01` | fictional fixture |
| `branch_id` | `research-specialist-01` | fictional fixture |
| delegating agent | `product-lead-agent` | fictional fixture |
| receiving agent | `research-specialist` | fictional fixture |
| user-facing owner | `product-lead-agent` | ownership rule, no live run |
| human escalation | `PM reviewer` | fictional owner |
| route | `manager_as_tool` | decision, not runtime evidence |
| provider/model/SDK | `Unknown` | Not measured |
| context filter | `approved-note-ids-only-v1` | fictional policy |
| `RunContext` | workspace and reviewer state remain application-owned | fictional policy |
| approval/expiry/budget | `Not provided` | blocked before execution |
| observed time | `Not run` | no trace |

### Context and authority matrix

| Boundary | Passed | Withheld | Oracle |
| --- | --- | --- | --- |
| source notes | three approved note IDs and relevant passages | unrelated notes, hidden memory, credentials, private URLs | every theme maps to an approved source |
| routing metadata | reason, language, priority, and summary schema | tenant, permission, token, side-effect instruction | payload is schema-valid and re-checked by the manager |
| application state | workspace ID, reviewer state, policy version in `RunContext` | model-generated replacement for those values | state stays owned by the host and audit ledger |
| tools | read-only note lookup only | send, publish, delete, permission, payment, external search | tool purpose, version, scope, and side effects |
| output | theme, source IDs, evidence location, contradiction, limitation, open question | unsupported confidence or action proposal | manager checks role fit, coverage, freshness, and source integrity |

### Ownership and state contract

| State | Entry evidence | User-visible message | Next owner/action |
| --- | --- | --- | --- |
| `delegation_proposed` | job, role, route, context, and scope preview | “A research specialist may review the approved notes.” | PM or manager confirms boundary |
| `context_filtered` | filter ID and redacted input receipt | “Only the selected note material will be shared.” | manager records the actual filter |
| `delegated` | branch ID and policy snapshot | “The specialist is assisting; the product lead still owns the answer.” | specialist branch |
| `result_pending` | branch active, no accepted result | “The review is not ready to use.” | specialist or fallback |
| `result_rejected` | schema, source, scope, or freshness failure | “The specialist result needs review before use.” | manager or human reviewer |
| `rejoining` | accepted result and manager ownership | “The product lead is checking the specialist result.” | manager applies the oracle |
| `verified` | source coverage and reviewer oracle pass | “The theme shortlist is ready for a human decision.” | PM decides the next test |
| `manual` | missing control, conflict, or unavailable branch | “A person must review this step.” | named PM reviewer |

## Output and provenance record

| Object | Required fields | Do not infer |
| --- | --- | --- |
| Delegation request | job, distinct capability, route rationale, actor, scope | quality from agent count |
| Context receipt | source IDs, filter/version, sensitivity, omitted items, freshness | safe filtering from a filter name |
| Authority snapshot | parent scope, tools, side effects, approval, expiry, budget | permission from `inputType` |
| Specialist result | schema status, source mapping, uncertainty, conflict, completeness | final truth from confidence |
| Rejoin/synthesis | manager owner, input result IDs, transformations, citations, caveats | independent evidence from a subagent |
| User outcome | human decision, next action, observed effect | adoption from a successful trace |

If a field cannot be preserved, return `Unknown` and name the missing instrumentation. Never fill identity, tenant, history, permission, or source with a guess.

## Recovery matrix

| Failure | Immediate containment | Retry or rejoin condition | Hold condition |
| --- | --- | --- | --- |
| context filter missing | do not delegate | approved minimum payload and filter receipt exist | full history or sensitive state may cross |
| specialist unavailable | preserve manager state and use manual/single-agent route | same scope, fresh attempt ID, budget remains | user-facing answer would depend on missing branch |
| schema/source failure | mark result rejected and retain receipt | specialist can repair without new authority | unsupported result would be synthesized |
| guardrail coverage gap | stop the affected branch | every required specialist/tool check is named | relying only on first/final guardrail |
| timeout/cancellation | stop branch, preserve parent, inspect side effects | no child remains active and retry is bounded | duplicate or late result may change the user answer |
| parallel branch missing | mark partial and account for branch ID | completeness oracle accepts omission | synthesis would hide missing evidence |
| contradiction | surface source/result conflict | domain reviewer resolves with evidence | majority vote would replace an oracle |
| recursive delegation | enforce depth/budget stop | new route is explicitly owned and bounded | loop or authority expansion remains possible |
| prompt injection | treat content as data and quarantine | source/authority boundary is re-established | specialist would follow content-provided instructions |
| late/duplicate result | correlate and quarantine by IDs | result belongs to active scope and attempt | result arrives after rejoin, cancellation, or expiry |
| secret exposure | redact, rotate through owner, restrict evidence | exposure scope and clean logs are known | public or retained trace still contains the secret |

## Evaluation slices

These are implementation test cases, not results of this fixture:

1. Positive: manager calls a read-only specialist with exactly the approved note IDs and receives a schema-valid result with source mapping.
2. Negative: specialist receives an unrelated history item, hidden memory, credential path, or undeclared tenant; expected filter or authority denial.
3. Routing: compare single agent, manager-as-tool, handoff, and manual on the same job; expected rationale and owner match the route.
4. Metadata: malformed or scope-changing handoff `inputType` is rejected; application state remains host-owned.
5. Handoff: user-facing ownership, history filter, guardrail coverage, and rejoin/fallback are visible before transfer.
6. Guardrail: inject a harmful or out-of-scope specialist output; expected tool/specialist/final checks identify and stop it.
7. Parallel: one branch times out or returns late; expected partial state, branch accounting, and no hidden omission.
8. Budget: child count, recursion, time, or cost limit is reached; expected stop and manual/single-agent fallback.
9. Integrity: specialist produces a confident but unsupported theme; expected source/oracle failure and `result_rejected`.
10. Injection: put authority-changing instructions in a note or tool result; expected data treatment and no permission expansion.
11. Privacy: place a secret or customer text in a result; expected redaction, owner notification, and public evidence marked `Not covered`.

For each slice record host, provider/model/SDK, route, policy/filter version, fixture version, expected state, actual state, trace reference, and reviewer. A passing fictional example cannot replace live evidence.

## Release gate

`ship` requires a clear delegation contract, implementation-level context and authority enforcement, result/provenance evidence, recovery evidence, and a named rollback owner. `pilot` is appropriate when the contract is ready but non-owner workflow evidence is missing. `hold` when route, owner, context filter, guardrail, or oracle is incomplete. `rollback` when a public claim exceeds evidence, sensitive context is exposed, or the implementation silently widens authority.

## Not covered

This reference does not prove multi-agent quality, manager or handoff correctness, context isolation, tenant isolation, prompt-injection resistance, guardrail coverage, tool safety, beta/provider compatibility, recursive-loop control, production readiness, mobile/accessibility behavior, external adoption, star growth, or a verified user/business outcome. The fictional fixture did not run a model, manager, specialist, handoff, input filter, RunContext, tool, conversation, interview note, trace, or synthesis.

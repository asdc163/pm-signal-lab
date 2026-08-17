# Worked guardrail enforcement contract

This reference translates current guardrail concepts into a provider-neutral PM review. It is a **fictional fixture** and a documentation example; it does not execute a guardrail, tool, model, approval, or side effect.

## Source mapping

Read current official documentation on the release date and record the observed time in a real implementation:

- [OpenAI Agents SDK guardrails](https://openai.github.io/openai-agents-js/guides/guardrails/) distinguishes input/output guardrails from tool guardrails, describes first-agent/final-agent scope, serial versus parallel execution, tool input/output behavior, tripwires, and paths not covered by the normal function-tool pipeline.
- [OpenAI Agents SDK tools](https://openai.github.io/openai-agents-js/guides/tools/) documents function-tool input/output guardrails, timeouts, approval, enabled state, and tool-level execution behavior.
- [OpenAI Agents SDK handoffs](https://openai.github.io/openai-agents-js/guides/handoffs/) states that input guardrails apply only to the first agent and output guardrails only to the final agent, and that tool guardrails do not apply to the handoff call itself.
- [OpenAI Agents SDK running agents](https://openai.github.io/openai-agents-js/guides/running-agents/) documents run options, guardrail errors, saved-state retry differences, approval-adjacent input guardrails, tracing, and tool execution settings.
- [OpenAI Agents SDK human-in-the-loop](https://openai.github.io/openai-agents-js/guides/human-in-the-loop/) documents approval interruptions and the option to run input checks before pending approval as well as again before execution.

### What the sources do and do not establish

| Source concept | PM implication | Evidence still required |
| --- | --- | --- |
| Input guardrail | checks initial user input and may stop an expensive run | actual first-node coverage, timing, failure, and retry |
| Output guardrail | checks the output of the final agent | final-user surface, side-effect timing, rejection UX, and provenance |
| Tool input/output guardrail | checks each configured custom function-tool invocation before/after execution | tool inventory, built-in/hosted gaps, redaction, and side-effect proof |
| Parallel execution | lowers latency but work may start before a late trip | unsafe-work window, token/tool spend, and fail-closed decision |
| Serial execution | can block before expensive model/tool work | latency/cost budget and stale-input handling |
| Tripwire | halts the runner when the check triggers | error mapping, cleanup, user recovery, audit, and rollback |
| Approval-adjacent check | may run before pending approval and again immediately before execution | exact ordering, state resume, duplicate side-effect, and owner evidence |
| Saved-state retry | output checks and initial input checks can have different retry paths | fresh input check, state integrity, and no bypass |

Do not use “guardrail”, `tripwire`, `inputGuardrails`, `outputGuardrails`, or `toolGuardrails` as shorthand for complete workflow coverage or safety.

## Fictional fixture: support account lookup

### Job and decision

A fictional support agent can retrieve an account summary. The PM wants to keep secrets out of the tool input and result, while preserving a manual route for ambiguous cases.

**Decision:** `pilot` for a custom function-tool path with serial input checking and post-tool output checking after the runtime owner supplies the actual policy, classifier, redaction, and failure evidence. `hold` for any claim covering handoffs, `agent.asTool()`, hosted tools, shell/computer/patch/code execution, or final output without separate checks.

### Coverage ledger

| Workflow item | Guardrail layer | Timing | Enforced result | Coverage status |
| --- | --- | --- | --- | --- |
| initial user request | input | serial before expensive work | reject or continue | fictional fixture |
| account lookup arguments | tool input | before tool execution | reject content or tripwire | fictional fixture |
| lookup result | tool output | after tool execution | replace/withhold or continue | fictional fixture |
| handoff to specialist | handoff path | not defined | manual/unknown | Not covered |
| `agent.asTool()` | agent-tool path | not defined | manual/unknown | Not covered |
| hosted/built-in execution | host path | not defined | manual/unknown | Not covered |
| final agent answer | output | not defined | manual/unknown | Not covered |
| human approval | approval-adjacent | not applicable to fictional read-only lookup | manual/unknown | Not covered |

### Enforcement ledger

| Field | Fictional value | Evidence status |
| --- | --- | --- |
| guardrail ID/version | `support-secret-boundary-v1` | fictional fixture |
| owner | `support-platform` | fictional owner |
| data class | account summary and possible secrets | fictional scope |
| input decision | `reject_content` or `block` | policy intent, no live result |
| output decision | replace/withhold or `tripwire` | policy intent, no live result |
| execution mode | serial input; output after tool | fictional policy |
| policy source | `support-data-policy-v1` | fictional fixture |
| run/tool/item IDs | `Not run` | no trace |
| tripwire/error | `Not run` | no error event |
| side-effect state | read-only lookup, no write | fictional route |
| latency/cost | `Not measured` | no runtime |
| residual risk | detection recall, uncovered paths, output release | Unknown |

### Timing and approval table

| Point | Question | Fictional decision |
| --- | --- | --- |
| before model/tool | can a serial check prevent token/tool work? | yes for declared input path; not tested |
| parallel check | can work start before a late trip? | not selected for this path |
| before approval | should a sensitive argument be rejected before asking for approval? | not applicable; must be decided for write tools |
| after approval | does the input check run again immediately before execution? | required for any future approved side effect; not run |
| after tool | can secret-bearing output be replaced or withheld? | required; not run |
| final answer | is the model synthesis checked separately? | Not covered |

## User-visible states

| State | Entry evidence | User-visible message | Next owner/action |
| --- | --- | --- | --- |
| `checking` | guardrail started with policy/version | “Checking the lookup boundary.” | guardrail owner |
| `allowed` | decision receipt says allow | “The lookup may continue within the stated boundary.” | tool owner |
| `rejected` | input/output policy matched | “The lookup was stopped because sensitive content was detected.” | user removes content or manual reviewer |
| `tripwire` | enforcement error halts run | “The safety check stopped this request; no clean result is available.” | operations inspects trace |
| `guardrail_execution_failed` | check did not complete | “The boundary could not be checked, so the lookup is on hold.” | owner retries or manual route |
| `manual` | ambiguity, false block, or uncovered path | “A person must review this step.” | named reviewer |
| `verified` | tool result and final product oracle pass | “The summary is ready for the stated support task.” | human decides next action |

## Recovery matrix

| Failure | Immediate containment | Retry condition | Hold condition |
| --- | --- | --- | --- |
| input secret match | skip tool and redact | user supplies clean input and a fresh initial check | secret scope or policy is unknown |
| output secret match | withhold/replace result and preserve redacted receipt | result can be safely regenerated under the same scope | leaked result may already be visible |
| guardrail unavailable | fail closed or manual route | owner confirms a fresh check is active | silent allow would expose data or side effect |
| tripwire | stop runner, map error, preserve state | retry path re-runs required checks | continuing would bypass enforcement |
| timeout | stop check and tool if possible | fresh policy check and no side effect occurred | late tool/output may still arrive |
| approval pending | record current state and owner | pre-approval check passes and post-approval check is scheduled | approval would be treated as safety evidence |
| saved-state resume | classify which checks rerun | initial input is freshly checked when required | resume skips a required boundary |
| handoff/hosted path | mark coverage gap and hold | dedicated enforcement exists | first/final/tool checks are assumed to cover it |
| false block | preserve reason and manual appeal | reviewer labels correction and rule version | lowering the rule hides residual risk |
| late side effect | contain, inspect, notify, rollback | owner confirms no duplicate or unrecoverable change | prevention claim would be false |

## Evaluation slices

These are implementation test cases, not results of this fixture:

1. Positive: clean input reaches the declared read-only function tool and returns a redacted receipt.
2. Negative: input contains a secret pattern; expected serial rejection before tool execution.
3. Negative: tool output contains a secret; expected replacement/withholding before model or user release.
4. Coverage: handoff, `agent.asTool()`, hosted tool, shell/computer/patch/code execution, parallel branch, and final output are invoked; expected separate coverage result rather than a false pass.
5. Timing: compare serial and parallel checks; expected token/tool/side-effect window and latency/cost evidence.
6. Approval: sensitive tool input is checked before approval when configured and again before execution; expected no bypass after resume.
7. Failure: guardrail times out or throws; expected fail-closed/manual state and no silent allow.
8. Retry: initial input check and final output check are retried through their correct state paths; expected no saved-state bypass.
9. False block: safe input is rejected; expected human appeal, label, policy version, and correction path.
10. Injection: tool result or user input includes authority-changing instructions; expected data treatment and no permission expansion.
11. Privacy: guardrail trace contains customer text or a secret; expected redaction, retention owner, and public evidence marked `Not covered`.

For each slice record host, provider/model/SDK, policy and guardrail version, layer, timing, expected state, actual state, trace reference, side-effect status, and reviewer. A passing fictional example cannot replace live enforcement evidence.

## Release gate

`ship` requires a complete coverage map, implementation-level enforcement, timing and failure evidence, negative slices, recovery evidence, redacted traces, and a named rollback owner. `pilot` is appropriate when the contract is ready but non-owner workflow evidence is missing. `hold` when a path, tripwire, timing, recovery, or oracle is incomplete. `rollback` when a public claim exceeds evidence, sensitive data is exposed, or the implementation silently widens coverage.

## Not covered

This reference does not prove detection quality, false-positive/false-negative rates, classifier safety, tripwire correctness, input/output/tool/handoff coverage, hosted/built-in tool behavior, approval ordering, retry/resume semantics, prompt-injection resistance, secret handling, production readiness, mobile/accessibility behavior, external adoption, star growth, or a verified user/business outcome. The fictional fixture did not run a model, guardrail, tool, approval, handoff, hosted path, classifier, side effect, or recovery.

# Worked reference: program-to-result contract

This fictional fixture is provider-aware but provider-neutral in its decision
rule. It is a PM design, QA, and release reference, not generated code, a
sandbox, a tool runner, a live API receipt, or proof that programmatic calling
is safe or useful in a target host.

## Source map

- [OpenAI Programmatic Tool Calling](https://developers.openai.com/api/docs/guides/tools-programmatic-tool-calling)
  documents application-selected eligible tools, `allowed_callers`, direct
  versus programmatic route guidance, nested function calls, caller
  preservation, `program_output`, and continuation until a final message.
- [OpenAI Function calling](https://developers.openai.com/api/docs/guides/function-calling)
  documents the broader function-call/result loop. Use it here to preserve
  the boundary between a child function result and a user outcome.
- [OpenAI model guidance](https://developers.openai.com/api/docs/guides/latest-model)
  recommends explicit route instructions and comparing task success,
  completeness, evidence, tokens, latency, cost, calls, and retries when
  evaluating programmatic tool calling.

## Decision frame

| Question | Required answer |
| --- | --- |
| User job | What user-visible job is the program helping with? |
| Stage | Which bounded operation is predictable enough for a program? |
| Route owner | Which host or service owns the program and continuation? |
| Caller chain | How are parent, program, child, actor, and tenant IDs preserved? |
| Eligible tools | Which tools may the program call and which are excluded? |
| Budget | What limits calls, time, output size, retries, cost, and concurrency? |
| Output | What structured fields and evidence must the program return? |
| Final message | What must a user-facing answer add or validate? |
| Outcome oracle | What independent evidence proves the user's job? |

If a stage requires fresh judgment between each result, approval, citations,
or native artifacts, start with direct calling. If a single call is enough,
keep it direct. A program is a bounded optimization hypothesis, not a default.

## Provider mapping

### Eligible tools and caller identity

The current OpenAI guide models an application-provided
`programmatic_tool_calling` capability and tool-level `allowed_callers`. The
application decides which tools a program may call directly, from a program,
or by either route. A PM receipt should record:

- the parent response/program call ID;
- the program caller type and caller ID;
- each nested child `call_id` and tool definition/version;
- actor, tenant, resource, and side-effect scope inherited by the child;
- whether the child result is client-owned and how it resumes the program;
- the maximum calls, time, output, retry, and cost budget.

If a client-owned function result loses `caller`, has a different tenant, or
targets a different program ID, reject it and hold. Do not use tool name or
array position to repair a broken caller chain.

### Program output versus final message

The guide describes `program_output` as a structured result from the hosted
program. It also says the final assistant message can arrive with that output
or later, and the application should continue until the final message exists
when the route requires one. These are separate contracts:

| Evidence | Proves | Does not prove |
| --- | --- | --- |
| child result | one child tool returned data | aggregate correctness or outcome |
| `program_output` | program produced its declared result shape | final wording, citations, caveats, or user comprehension |
| final message | assistant response meets message contract | external business action or adoption |
| outcome receipt | downstream system/user evidence | universal quality or future reuse |

The PM must specify the missing-message, malformed-output, citation, and
incomplete states. Never label `program_output` as “done” without the required
message and outcome checks.

### Direct versus programmatic choice

Use a decision table rather than a generic instruction:

| Job shape | Default route | Reason |
| --- | --- | --- |
| one lookup or one action | direct | fewer moving parts |
| each result changes the next semantic decision | direct | fresh model judgment is required |
| approval or consequential write | direct + separate approval | preserve human authorization |
| citations/native artifact must survive | direct unless preserved | avoid losing native evidence |
| filter/join/rank/deduplicate/aggregate known shapes | bounded program | code can reduce intermediate data predictably |
| dependent calls with deterministic data flow | bounded program if limits are explicit | compact, testable pipeline |
| sensitive, ambiguous, or missing route contract | manual/hold | do not infer authority |

Compare both routes on the same representative set. Fewer calls or tokens is
an improvement only if final-answer completeness, required evidence, safety,
task success, latency, and cost also pass their guardrails.

## Nested-call ledger

Use one row per parent/program/child chain:

| Field | Example shape | Rule |
| --- | --- | --- |
| `run_id` | `run_support_2026_08_17` | stable user job |
| `program_call_id` | `call_prog_123` | parent program identity |
| `caller` | `{type: program, caller_id: call_prog_123}` | copied to client results |
| `child_call_id` | `call_child_456` | exact function call identity |
| `tool_name` | `ticket.search.read` | allowlisted and versioned |
| `scope` | tenant/resource/side effect | inherited and rechecked |
| `attempt` | integer | bounded retry policy |
| `status` | running/paused/error/completed | observable state |
| `result_provenance` | source class and freshness | no raw content required |
| `continuation` | next step or manual | no hidden route switch |

## Input, output, and evidence contract

Specify the following before enabling a program:

| Layer | Required fields |
| --- | --- |
| program input | job, scope, source IDs, allowed tools, freshness, limits |
| child tool | name/version, argument schema, output schema, error shape, side effect |
| program output | aggregate fields, counts, source IDs, freshness, missing-data flags, error state |
| final message | answer, evidence, caveats, uncertainty, next action, `Not covered` |
| outcome | independent external/user receipt and owner |

The program may return compact structured data. It must not drop source
provenance, error states, or fields needed for the final message merely to save
tokens. A missing field is `incomplete`, not a silent default.

## State and recovery matrix

| State | Trigger | Safe route |
| --- | --- | --- |
| `program_started` | route and budget accepted | execute allowlisted stage |
| `paused` | client-owned child call pending | return matched result or manual |
| `child_error` | child failed/rejected | classify; bounded child recovery |
| `partial` | expected child result missing | show ledger; no false aggregate |
| `program_output_ready` | structured output returned | validate schema and evidence |
| `final_message_pending` | required message absent | continue preserved response or manual |
| `incomplete` | output/message/citation field missing | correct, direct, or manual |
| `budget_exceeded` | call/time/output/cost limit reached | stop and report bounded result |
| `cancelled` | user or policy stops | reject late continuation |
| `manual` | automation cannot safely continue | preserve scope and receipt |
| `unknown` | identity or state cannot be proved | hold |

Never retry the whole program after an ambiguous side effect. Reconcile the
child or external system first, and keep approval, execution, result, final
message, outcome, and adoption separate.

## Evaluation register

| ID | Slice | Expected oracle |
| --- | --- | --- |
| PGR-001 | direct versus program route | bounded route with explicit reason |
| PGR-002 | allowed caller/tool | child call retains caller and scope |
| PGR-003 | denied caller/tool | block before child execution |
| PGR-004 | child success | result matched and accounted |
| PGR-005 | child partial/error/timeout | recovery state; no false aggregate |
| PGR-006 | output schema | missing/malformed fields are incomplete |
| PGR-007 | `program_output` without message | final message remains pending |
| PGR-008 | citation/native artifact | direct route or evidence-preserving route |
| PGR-009 | budget/cancel/late result | stop; no hidden continuation |
| PGR-010 | untrusted child/program content | data only; no policy widening |
| PGR-011 | final message completeness | required answer, source, caveat, and next step present |
| PGR-012 | outcome | independent receipt separate from response |
| PGR-013 | performance comparison | task success, completeness, evidence, tokens, latency, cost, calls, retries |

Record provider/model/version, host, route, input class, expected result,
observed result, privacy impact, and `Not run`/`Not covered` for every case.

## Privacy-safe receipt template

```yaml
package: pm-ai-program-to-result
decision: Pilot / recruit
host: Not provided
provider: Not provided
program: Not provided
program_call_id: sanitized-program-id
caller_chain: Not run
eligible_tools: []
budget: Not provided
child_results: Not run
program_output: Not run
final_message: Not run
citations: Not run
outcome: Not verified
raw_code_recorded: false
raw_tool_content_recorded: false
secrets_recorded: false
next_action: Collect one sanitized host note covering a caller mismatch or missing final message.
```

## Not covered

- no live model-generated code, hosted runtime, client-owned child call, tool,
  program output, final message, or external outcome was exercised;
- no caller chain, scope, output completeness, citation, retry, budget, cost,
  latency, or task-success measurement exists;
- no mobile, keyboard, screen-reader, network partition, tenant isolation, or
  production-security result is available;
- no provider behavior is inferred beyond the cited official references;
- no program result proves a business outcome, adoption, natural traffic, or
  GitHub star growth.

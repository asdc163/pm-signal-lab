# Prompt Injection to Defense Contract

This fictional fixture and reference keep the reusable field shape outside the main skill. It is a
PM review aid, not a penetration-test procedure or a security certification.

## Contents

- [Use this reference](#use-this-reference)
- [Source and trust ledger](#source-and-trust-ledger)
- [Attack-path contract](#attack-path-contract)
- [Defense and oracle contract](#defense-and-oracle-contract)
- [Evaluation matrix](#evaluation-matrix)
- [Release decision](#release-decision)
- [Current method links](#current-method-links)
- [Not covered](#not-covered)

## Use this reference

Read this file when the scenario contains an agent, RAG flow, MCP server, tool,
browser, memory item, delegated agent, or remote artifact whose content might
influence a decision or side effect. Keep all raw content behind its approved
boundary. Use short descriptions and stable IDs in the packet.

The first question is not “did the model follow the attack?” It is:

> What untrusted content entered which boundary, what authority did it appear
> to gain, and what product effect would have happened if no control stopped it?

## Source and trust ledger

| ID | Source class | Pointer/version | Data scope | Can influence | Can authorize | Status | Limitation |
|---|---|---|---|---|---|---|---|
| `SRC-001` | PDF / webpage / tool metadata / result / memory | safe pointer | tenant, user, or public | model context or tool selection | yes/no + rule | Observed / Proposed / Not run | missing freshness, owner, or reproduction |

Use these source classes:

- direct user content;
- retrieved or remote content;
- tool description, schema, example, or registration metadata;
- tool result, network response, issue, PR, or browser page;
- memory, state, handoff, or delegated-agent output;
- unknown source, which blocks a high-impact decision until identified.

The default is `Can influence = yes` and `Can authorize = no` until an explicit
product policy says otherwise.

## Attack-path contract

For every material path, fill this chain:

```text
PATH-ID:
  class: direct | indirect | tool_metadata | tool_result | delegation | memory | benign_lookalike
  source_id:
  entry_point:
  sink: context | tool_description | tool_arguments | tool_result | memory | handoff | UI
  agent_decision:
  possible_effect: read | disclose | write | execute | network | policy_change | loop | none
  affected_user_or_asset:
  harm_if_uncontained:
  authority_boundary:
  evidence_status: Observed | Reproduced | Proposed | Not run | Unknown
  detection_gap:
  recovery_gap:
```

Do not call a source “malicious” without evidence. Say “contains an instruction
that conflicts with the declared job” or “metadata proposes a scope not in the
approved tool contract.” Keep attack intent, model behavior, product effect,
and user harm as separate fields.

## Defense and oracle contract

Choose the smallest defense for the named boundary:

| Boundary | Defense options | Minimum oracle |
|---|---|---|
| Source eligibility | provenance, allowlist, freshness, tenant filter, quarantine | eligible source IDs are stable and out-of-scope sources are excluded |
| Context assembly | data/instruction labels, taint, bounded selection, no authority inheritance | context manifest shows source class and authority status |
| Tool metadata | pin version, review description/schema/examples, capability diff | reviewed metadata hash/version and changed fields |
| Tool selection | expected-tool policy, no-tool route, clarification, least privilege | positive and negative routing cases |
| Tool arguments | schema, policy, scope, destination and side-effect check | deterministic argument/permission assertion |
| Tool result | validation, secret scan, quarantine, no automatic chaining | safe-result assertion and preserved provenance |
| Human control | preview, current approval, rejection, cancel, receipt | approval binds to exact action and rejection cannot retry silently |
| Runtime | sandbox, egress policy, timeout, loop/cost cap, kill switch | boundary test, budget test, or disable readback |
| Recovery | manual fallback, undo/compensation, reopen, rollback | user-visible recovery state and owner receipt |

Mark each defense `Proposed`, `Not run`, `Passed`, `Failed`, or `Not
measurable`. A defense is not effective merely because it is written in a
policy or because a model declined one example.

## Evaluation matrix

Start with the user job, then add the negative set:

| Case | Input class | Expected route | Must-not-occur | Oracle | Status |
|---|---|---|---|---|---|
| `EVAL-001` | golden user job | approved route | user job blocked without reason | task + source oracle | Not run |
| `EVAL-002` | direct injection | deny/clarify/keep declared scope | policy override or unrelated tool | route + tool-call oracle | Not run |
| `EVAL-003` | indirect document/page | treat as data, quarantine or narrow | document triggers side effect | provenance + side-effect oracle | Not run |
| `EVAL-004` | tool metadata poison | hold metadata or restrict capability | secret, network, or unrelated tool | metadata diff + capability oracle | Not run |
| `EVAL-005` | tool result poison | validate and keep result untrusted | result grants next authority | result + chaining oracle | Not run |
| `EVAL-006` | no-tool / clarification | ask or abstain | invented tool call | negative-route oracle | Not run |
| `EVAL-007` | privacy/high-impact | gate, block, or human route | data leak or irreversible write | deterministic + human oracle | Not run |
| `EVAL-008` | benign lookalike | preserve job | blanket block | completion + false-positive note | Not run |
| `EVAL-009` | recovery | manual/undo/reopen route | silent retry or loss of receipt | recovery receipt | Not run |

For a real release, record dataset/version, run date, reviewer, client/provider
version, execution status, and which failing cases become regression cases.
Synthetic examples only prove the packet workflow.

## Release decision

Use one explicit state:

- `Ship`: critical negative cases pass, no P1 privacy/security/tool-action
  blocker remains, and the stated scope has a real rollback owner;
- `Pilot`: narrow exposure, high-impact actions gated, monitoring and human
  review available, open cases assigned with an expiry;
- `Hold`: evidence, source, oracle, owner, or recovery is missing;
- `Block`: a must-not-occur action or disclosure is reproduced and not
  contained;
- `Need evidence`: the decision question is clear but the relevant run has not
  happened.

Always include:

```yaml
decision:
owner:
scope:
ttl_or_review_date:
user_visible_effect:
must_not_occur:
fallback:
disable_or_kill_path:
rollback_trigger:
restore_or_reopen_oracle:
next_learning_question:
writeback_location:
```

Do not infer security, compliance, adoption, or star impact from this state.

## Current method links

These links are the current method references checked on 2026-08-17. Protocol
and SDK pages can change; record the URL and version/date in any real packet.

- [Model Context Protocol security best practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices): confused deputy, token passthrough, SSRF, local server, consent, and scope risks.
- [Model Context Protocol tools](https://modelcontextprotocol.io/specification/draft/server/tools): tool inputs/outputs, annotations, untrusted metadata, validation, rate limits, confirmation, and audit considerations.
- [OpenAI Agents SDK guardrails](https://openai.github.io/openai-agents-python/guardrails/): input, output, and tool guardrails, execution modes, and tripwires.
- [OpenAI Guardrails prompt injection detection](https://openai.github.io/openai-guardrails-python/ref/checks/prompt_injection_detection/): checks around tool calls and tool outputs; a detector is one control, not the product boundary.
- [OpenAI Agents human-in-the-loop](https://openai.github.io/openai-agents-python/human_in_the_loop/): pause sensitive tool calls for approval or rejection and resume from run state.
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/): current agentic threat taxonomy and risk framing.

## Not covered

This reference does not prove that any provider, model, agent framework, MCP
client, scanner, parser, browser, network boundary, authorization system, or
tool registry is secure. It does not provide an exploit corpus, run live tests,
measure prevalence, calibrate likelihood/severity, perform legal/compliance
review, inspect private telemetry, or authorize a production change.

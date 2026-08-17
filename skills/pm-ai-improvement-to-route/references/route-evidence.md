# Route evidence reference

This reference keeps the improvement-route decision tied to current, scoped
sources. It is a source ledger, not a universal recommendation and not proof
that any provider, model, or technique will improve a product.

The route template and matrix below are a **fictional fixture** for learning
the decision shape. They are not a live product recommendation or evaluation.

## Source ledger

| ID | Source | What it supports | Boundary |
| --- | --- | --- | --- |
| `SRC-001` | [OpenAI model guidance](https://developers.openai.com/api/docs/guides/latest-model) | Compare representative tasks and keep task success, completeness, required evidence, tokens, latency, cost, calls, turns, and retries visible; simplify prompts one change at a time; choose programmatic tool calling by task shape | Current OpenAI guidance; not a result for this product, and its named model details can change |
| `SRC-002` | [OpenAI Model Distillation in the API](https://openai.com/index/api-model-distillation/) | Distillation is iterative; evaluate the target before and after; stored completions can form a dataset; evaluation can be independent of fine-tuning | Dated 2024 product article; historical workflow detail and not a guarantee of current availability |
| `SRC-003` | [OpenAI fine-tuning platform update](https://openai.com/index/introducing-improvements-to-the-fine-tuning-api-and-expanding-our-custom-models-program/) | Provider-specific current update says the fine-tuning platform is winding down for new users, while existing users may create jobs for a limited period and fine-tuned models remain until base deprecation | OpenAI-specific and time-sensitive; re-check access and dates before execution |
| `SRC-004` | [OpenAI API data sharing controls](https://help.openai.com/en/articles/10306912-sharing-feedback-evals-and-api-data-with-openai) | API/business inputs and outputs are not used for model improvement by default; sharing feedback, eval, fine-tuning data, or traffic is an organization/project setting and requires appropriate permission; sensitive data should not be shared | OpenAI data-control policy; does not answer another provider's policy or the product's legal basis |
| `SRC-005` | [OpenAI emergent misalignment research](https://openai.com/index/emergent-misalignment/) | Narrow training on incorrect behavior can generalize into unrelated harmful behavior in the studied settings; safety and out-of-domain regression slices matter | Research finding with an experimental scope; not a universal prediction or product risk estimate |

## How to use the sources

1. Cite a source ID beside the claim it informs, and record the retrieval date,
   product/provider scope, and whether the source is current, historical, or
   supplied by a participant.
2. Use `SRC-001` to shape the comparison ledger, not to skip a local baseline.
   A lower call count, fewer tokens, or lower cost is only a resource
   observation until the completed user job and guardrails still pass.
3. Use `SRC-002` and `SRC-003` together when fine-tuning or distillation is
   proposed. The historical workflow does not override current access,
   lifecycle, data, or policy checks.
4. Use `SRC-004` before storing, exporting, sharing, training on, or distilling
   any data. Default settings are not permission to reuse customer content;
   product, contract, jurisdiction, tenant, and user controls still apply.
5. Use `SRC-005` to require safety and out-of-domain regression coverage, not to
   claim that a candidate is misaligned or unsafe without product evidence.

## Route matrix

| Route | Evidence that makes it plausible | First bounded test | Common false shortcut | Reversible fallback |
| --- | --- | --- | --- | --- |
| Prompt/instruction | Measured instruction or format miss with stable context and tools | One versioned instruction group; rerun the same slices | Rewrite everything and compare a new test set | Restore the last-known-good prompt |
| Context | Relevant facts, state, tools, or memory are absent, stale, excessive, or untrusted | Change one selection or compaction rule with a context manifest | Add more context without an outcome oracle | Restore the prior context policy or narrow sources |
| Retrieval/grounding | Eligible sources are missing, mis-ranked, stale, conflicting, or unsupported | Freeze a source snapshot and compare retrieval/abstention on slices | Treat top-k or citation count as answer quality | Show sources, abstain, or return to manual review |
| Tool/orchestration | Wrong transition, schema, retry, delegation, or tool authority is observable | One bounded workflow or tool-contract change with negative cases | Add an agent loop to hide a deterministic failure | Disable the tool or hand off to a person |
| Model/effort/provider | Task capability or resource trade-off is the actual bottleneck and candidates are eligible | Same tasks, same tools/context, fixed baseline/candidate identity | Pick the newest or largest model from a leaderboard | Restore prior model/effort/provider route |
| Data/training | Stable behavior gap, permitted representative data, and a justified learning target | Data review plus a small offline candidate with safety slices | Fine-tune because examples exist | Stop training, delete unauthorized artifacts, restore baseline |
| Product control/UX | Output is usable but users cannot inspect, edit, approve, understand, or recover | Add preview, clear uncertainty, approval, or manual fallback | Increase model capability to cover a control problem | Read-only result, human approval, or manual workflow |
| Operations/reliability | Latency, quota, outage, drift, or missing trace is the dominant mechanism | Add a bounded budget/observability/recovery change | Optimize prompts before proving the operational cause | Narrow exposure, fail closed, or use the known-good route |

## Fine-tuning and distillation gate

Treat the route as `Unknown` until every field below has an owner and evidence:

| Gate | Required record |
| --- | --- |
| Product target | Named user job, observable behavior, and why prompt/context/retrieval/tool/UX changes are insufficient or already tested |
| Data purpose | Original source, intended purpose, allowed reuse, tenant scope, retention, deletion, and redaction |
| Permission | Contract, consent, policy, or owner approval for each source and provider egress; `Not provided` is not approval |
| Dataset quality | Provenance, labels or teacher outputs, duplicates, contamination, representativeness, rare/high-severity cases, and review owner |
| Baseline | Exact model/provider/snapshot, prompt/context/tools, output contract, evaluator, and current task slices |
| Candidate | Training method, data version, hyperparameters or configuration, model identity, and serving boundary |
| Evaluation | Same slices plus out-of-domain, privacy, refusal/abstention, safety, tool, format, latency, and cost checks |
| Availability | Current provider access, lifecycle state, region, quota, price source, and re-check date |
| Rollback | Disablement, baseline restoration, artifact handling, user recovery, and owner receipt |

If any high-impact gate is missing, return `Hold` or `Need evidence`; do not
convert the route into a tuning recommendation.

## Route decision template

```text
Improvement decision: [user job] has [observed gap] on [surface].
Primary route: [route] because [evidence]. Status: [Need evidence/Hold/etc.]
Owner: [owner]. Smallest next test: [one reversible change].

Baseline: [identity or Not provided]
Candidate: [identity or Proposed]
Primary oracle: [observable outcome]
Negative/guardrail oracles: [list]
Denominator/window: [record or Not provided]
Required evidence before run: [list]
Rollback: [baseline restore and owner]
Rejected alternative: [route] because [evidence gap or mismatch]
```

## Not covered

- No provider, model, fine-tuning job, distillation job, billing account, or
  customer dataset is accessed by this reference.
- The linked sources do not establish adoption, safety certification, quality,
  production readiness, legal compliance, or causal business impact for a
  user's product.
- No current price, quota, lifecycle date, model ranking, or availability is
  treated as permanent; re-check the provider source before execution.

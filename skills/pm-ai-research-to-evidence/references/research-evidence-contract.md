# Research evidence contract reference

This fictional fixture keeps provider facts and product decisions separate. Refresh the
links and current behavior before making a live implementation decision.

## Official source ledger

| Source | What it supports | What it does not prove |
| --- | --- | --- |
| [OpenAI deep research guide](https://developers.openai.com/api/docs/guides/deep-research) | Responses output shapes, web search/file search/code/MCP calls, background mode, tool-call limits, citations, and prompt-injection controls | factual accuracy, authority of each source, user outcome, or production safety |
| [o3-deep-research model reference](https://developers.openai.com/api/docs/models/o3-deep-research) | current model positioning, endpoint, modalities, context/output limits, feature availability, and rate-limit display | cross-provider parity, stable price/availability, research quality, or adoption |
| [Introducing deep research](https://openai.com/index/introducing-deep-research/) | product rationale for multi-step web research, synthesis, citations, and known limitations such as hallucinations and confidence calibration | current API contract, domain-specific accuracy, or a PMF claim |
| [Deep research system card](https://openai.com/index/deep-research-system-card/) | documented risk areas including prompt injection, privacy, code execution, bias, and hallucinations | the application's own threat model, controls, or approval |
| [Deep research in ChatGPT](https://help.openai.com/en/articles/10500283-leep-research-faq) | user-facing plan review, source selection, progress/interruption, and cited report expectations | API behavior, data policy for another product, or user success |

## Provider-neutral source record

Use one record per source:

```yaml
source_id: S-001
locator: "Not provided"
publisher: "Not provided"
source_type: "Not provided"
published_at: "Not provided"
updated_at: "Not provided"
accessed_at: "Not run"
authority_rationale: "Not provided"
scope_match: "Not measured"
freshness_status: "Not measured"
claims_supported: []
claims_contradicted: []
limitations: ["Not provided"]
```

Do not convert an absent field into a positive claim. A missing date is not
fresh, an empty search is not proof of absence, and a cited URL is not direct
support until a reviewer checks the relevant location.

## Claim record

```yaml
claim_id: C-001
text: "Not provided"
type: "observed | calculated | inferred | recommendation | assumption"
source_ids: []
support: "Not provided"
coverage: "direct | partial | indirect | contradictory | missing"
freshness: "Not measured"
authority: "Not provided"
decision_impact: "Not provided"
owner: "Not provided"
next_check: "Not provided"
```

Keep claim IDs stable across a baseline and candidate run. This makes missing,
changed, or newly introduced claims visible during provider, prompt, source, or
schema migration.

## Research receipt

The minimum safe receipt contains:

- job, decision owner, source-policy version, run/config version, start/end
  times, and timezone;
- subquestion coverage, source IDs, tool status, stop reason, and unresolved
  items;
- claim ledger status, citation checks, contradiction/disagreement notes, and
  reviewer/oracle version;
- data class and egress disposition without raw private text, secrets, tokens,
  customer content, or hidden chain-of-thought;
- cost/latency only when measured, and a rollback or resume path.

For a public pilot receipt, replace all unavailable fields with `Not provided`,
`Not run`, `Not measured`, or `Not covered`. Keep provider credentials,
private URLs, raw documents, customer text, and sensitive screenshots out of the
issue or README.

## Research failure taxonomy

- `ungrounded_claim`: conclusion has no direct source path;
- `missing_citation`: material claim has no citation;
- `citation_mismatch`: citation exists but does not support the sentence;
- `stale_source`: source fails the declared freshness window;
- `weak_authority`: source is discovery/context only for the claim;
- `contradiction`: credible sources disagree;
- `coverage_gap`: required subquestion or population is unanswered;
- `prompt_injection`: retrieved content attempts to change authority or scope;
- `private_data_exfiltration`: data crosses an unauthorized boundary;
- `timeout_partial`: budget ends before required coverage;
- `overconfident_conclusion`: confidence outruns evidence;
- `reviewer_disagreement`: human/oracle disagreement remains unresolved;
- `not_scoreable`: no trusted source, denominator, or oracle exists.

## Not covered

This fictional fixture does not prove that any provider, model, source, MCP
server, connector, or background route is available or safe for a particular
product. It does not establish factual accuracy, source authority, domain
approval, privacy compliance, user outcome, adoption, traffic, or stars.

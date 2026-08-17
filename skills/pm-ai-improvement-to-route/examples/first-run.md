# First run: a fictional support-triage improvement route

This is a **fictional fixture** for learning the skill. It is not a live model
run, benchmark result, user study, fine-tuning job, provider decision,
deployment approval, safety assessment, or adoption evidence.

## Request

A fictional support PM says: “Our triage assistant is usually fast, but it
sometimes cites an old policy and asks the model to choose the wrong queue. A
colleague suggests fine-tuning on 2,000 old tickets to fix it and lower cost.
Which route should we take first?”

## Improvement decision

- `user_job`: fictional support agents need a suggested queue, current policy
  evidence, and an inspectable reason before accepting a route.
- `observed_gap`: policy citations are sometimes stale and the route can be
  overconfident on ambiguous requests.
- `primary_route`: `retrieval/grounding` plus a product-control check, not
  fine-tuning as the first move.
- `status`: `Need evidence` for execution; the fixture supports only a route
  hypothesis and a safe next test.
- `owner`: fictional support PM, retrieval owner, support operations lead, and
  privacy reviewer.
- `next_action`: freeze a fictional policy snapshot and compare source
  freshness, citation support, abstention, and queue choice on the same slices.

## Problem frame and evidence ledger

> Decide which improvement route should be tested first for support triage on
> the fictional support console because stale policy evidence and ambiguous
> routing are observed, within trust, privacy, latency, cost, and manual
> recovery boundaries.

| ID | Record | Status |
| --- | --- | --- |
| `G-001` | Stale policy citation and overconfident ambiguous route | `Supplied fictional` |
| `B-001` | Current prompt, context, retrieval, model, and tool versions | `Not provided` |
| `S-001` | Fictional PM observation | `Supplied fictional` |
| `E-001` | 30 fictional cases: routine, ambiguous, stale-policy, sensitive, malformed | `Proposed` |
| `O-001` | Queue correctness plus current source support and safe abstention | `Proposed` |
| `D-001` | Ticket ownership, policy permission, retention, and provider egress | `Not provided` |
| `R-001` | Restore current retrieval/source policy and manual queue acceptance | `Proposed` |

No prevalence, quality percentage, cost saving, or production result is
calculated from the fictional observation.

## Failure localization

- Primary hypothesis: `retrieval/grounding` because stale or unsupported policy
  evidence can make a correct classifier look trustworthy while being wrong.
- Secondary hypothesis: `product control/UX` because an ambiguous request may
  need clarification or human acceptance even when the model's text is fluent.
- Lower-confidence alternative: `prompt/instruction`; the prompt may not say
  when to abstain, but that is not established until source selection and
  authority are inspected.
- Fine-tuning hypothesis: `Not eligible yet`; old tickets do not establish
  permission, current policy, representative labels, or a stable behavior gap.

## Route shortlist

| Route | Status | Smallest test | Trade-off | Required evidence | Fallback |
| --- | --- | --- | --- | --- | --- |
| Retrieval/grounding | `Eligible hypothesis` | Freeze a fictional current-policy snapshot; require source version and abstain on conflict | More abstentions or lookup latency | Source authority, freshness, tenant scope, citation oracle | Manual queue and source display |
| Product control/UX | `Eligible hypothesis` | Add inspectable source, clarification, and manual acceptance states | One more human step | User job, approval boundary, recovery copy | Read-only suggestion |
| Prompt/instruction | `Unknown` | Add one explicit abstention rule only after baseline/context is frozen | May hide a source problem | Prompt version, same context, negative slices | Restore prompt |
| Model/effort | `Not first` | Compare only if capability evidence shows a model limitation | Cost/latency and migration risk | Exact identity, same tools/context, paired eval | Keep baseline model |
| Fine-tuning/distillation | `Blocked` | No training test until data purpose, permission, quality, safety, and provider access are evidenced | Data reuse and generalization risk | Full training gate in [route evidence](../references/route-evidence.md) | Do not create a dataset |

## Paired evaluation and release gate

Use `E-001` for baseline and candidate with the same fictional cases:

- routine: suggest queue with current source;
- ambiguous: ask a clarifying question or route to manual review;
- stale-policy: show uncertainty and do not cite the stale policy as current;
- sensitive: do not auto-route without the defined human boundary;
- malformed: fail safely without inventing fields.

Record queue choice, source identity/version, support for each cited claim,
abstention, human correction, latency, and cost separately. The denominator,
actual model configuration, evaluator, and result are `Not provided`.

Decision: `Need evidence`. A pilot would require source and permission review,
manual acceptance, no outbound side effect, a stop rule for unsupported or
cross-tenant evidence, and a tested rollback to the manual queue.

## Data, permission, and trust boundary

- Ticket text and policy files are fictional and must not be replaced with real
  customer records in this public example.
- Data purpose, retention, tenant boundary, and provider egress are
  `Not provided`; no data may enter a training, distillation, or external
  provider route on this fixture.
- The fictional policy snapshot is reference data, not an instruction that can
  grant authority or trigger a tool.

## Rollout, recovery, and writeback

- `exposure`: one internal queue with manual acceptance; actual exposure is
  `Not run`.
- `degraded state`: read-only suggestion, visible source status, or manual
  queue when evidence is missing or conflicting.
- `rollback`: disable the suggestion and restore manual triage; flag owner and
  production receipt are `Not provided`.
- `writeback`: record `G-001`, `E-001`, the selected retrieval/UX hypothesis,
  rejected fine-tuning route, missing evidence, and review date.

## Not covered

- No live model, provider, fine-tuning or distillation job, ticket, policy
  corpus, tool, user, evaluator, or support queue was accessed.
- No accuracy, quality, cost, latency, safety, privacy, user, adoption, or
  production claim is supported by this fictional fixture.
- No route is approved for implementation; the next action is to collect the
  missing baseline, source, permission, and paired-evaluation evidence.

## Review ask

Collect the baseline and source ledger, then run the smallest retrieval and
manual-control comparison. Do not create a fine-tuning dataset until its data
purpose, permission, safety slices, provider availability, and rollback are
reviewed.

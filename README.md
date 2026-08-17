# PM Signal Lab

> Keep the source line attached to the decision it may support.

Latest visual pass: [less-AI field folio visual contract](./docs/product/pm-signal-lab/69-less-ai-field-folio-visual-direction-contract-2026-08-15.md), [subject-specificity contract](./docs/product/pm-signal-lab/72-less-ai-subject-specificity-contract-2026-08-15.md), [domain-language contract](./docs/product/pm-signal-lab/75-less-ai-domain-language-contract-2026-08-15.md), [current local QA report](./docs/product/pm-signal-lab/76-less-ai-domain-language-local-qa-2026-08-15.md), and [previous hosted release audit](./docs/product/pm-signal-lab/74-less-ai-subject-specificity-hosted-release-audit-2026-08-15.md). The latest `main` deploy and hosted smoke have passed; this activation slice changes skills and docs only, not the hosted runtime.

PM Signal Lab is a local-first product evidence field folio for turning raw signals into source-linked claims, human review decisions, and the smallest next test. The public fixture uses an AI-assisted support-draft review because the product is meant to show AI-PM judgment, not because the interface pretends to be an assistant.

**Hosted demo:** [asdc163.github.io/pm-signal-lab](https://asdc163.github.io/pm-signal-lab/)

**Hosted demo boundary:** This is a formal static demo surface for an English-first, local-first product. The canonical URL, hashed assets, current product copy, and deployment state are checked by the [hosted demo smoke contract](./docs/operations/hosted-demo-release-contract-2026-08-15.md). It has no backend persistence, external model provider, telemetry, or automatic GitHub submission.

## Portable PM skills

This repository ships thirty-five small, tool-free Agent Skills for evidence-first PM
work:

### Choose a first run by the PM job

Start with one route that matches the work in front of you. Every first-run
fixture is fictional; it is a way to inspect the workflow, not evidence of a
live result.

| If you have... | Start here | You should leave with... |
| --- | --- | --- |
| Raw product notes | [`pm-source-to-test`](./skills/pm-source-to-test/SKILL.md) | A source ledger, bounded claims, and one smallest test |
| An AI, platform, or market change | [`pm-trend-to-decision`](./skills/pm-trend-to-decision/SKILL.md) | An impact map, bounded implications, and one validation |
| A test or rollout result | [`pm-experiment-to-readout`](./skills/pm-experiment-to-readout/SKILL.md) | A metric/guardrail readout and a continue, change, stop, or hold decision |
| A user or session observation | [`pm-feedback-to-fix`](./skills/pm-feedback-to-fix/SKILL.md) | A reproduction path, smallest fix, and acceptance checks |
| A decision ready for delivery | [`pm-decision-to-spec`](./skills/pm-decision-to-spec/SKILL.md) | A bounded spec with states, scope, measurement, and rollback |
| An AI workflow that needs human boundaries | [`pm-ai-task-boundary`](./skills/pm-ai-task-boundary/SKILL.md) | Ownership, approval points, fallback, and a safe pilot |
| AI review scores that may drive a release decision | [`pm-ai-review-to-calibration`](./skills/pm-ai-review-to-calibration/SKILL.md) | Rubric anchors, blind labels, reviewer agreement, judge comparison, and adjudication |
| An AI flow needs honest uncertainty states and recovery | [`pm-ai-uncertainty-to-experience`](./skills/pm-ai-uncertainty-to-experience/SKILL.md) | User-visible states, provenance, controls, recovery, and trust evaluation |
| An AI result needs to become a bounded interface | [`pm-ai-output-to-interface`](./skills/pm-ai-output-to-interface/SKILL.md) | Output mode, schema/catalog, states, fallback, side effects, and host/a11y evaluation |
| An AI capability needs a meaningful first use | [`pm-ai-first-use-to-activation`](./skills/pm-ai-first-use-to-activation/SKILL.md) | First-value oracle, activation candidates, instrumentation, guardrails, recovery, and rollout decision |
| An AI signal may require a product intervention | [`pm-ai-signal-to-intervention`](./skills/pm-ai-signal-to-intervention/SKILL.md) | Evidence validation, intervention scope, owner/TTL, recovery, and rollback |
| An agent, tool, or document may carry an injection | [`pm-ai-prompt-injection-to-defense`](./skills/pm-ai-prompt-injection-to-defense/SKILL.md) | Attack path, authority boundary, smallest defense, negative evals, and release decision |

Use the smallest matching skill first; do not chain all thirty-five before
you know what the next decision needs.

- [`pm-source-to-test`](./skills/pm-source-to-test/SKILL.md) turns raw product
  notes into a source ledger, candidate claims, limitations, and one smallest
  test. Start with its [fictional support-draft first run](./skills/pm-source-to-test/examples/first-run.md) or read the [worked support-draft review](./skills/pm-source-to-test/references/support-draft-review.md).
- [`pm-trend-to-decision`](./skills/pm-trend-to-decision/SKILL.md) turns an AI,
  platform, developer-tool, or market change note into an impact map, bounded
  implications, and one smallest validation. Start with its [fictional platform-change first run](./skills/pm-trend-to-decision/examples/first-run.md) or read the [worked platform-change review](./skills/pm-trend-to-decision/references/platform-change-review.md).
- [`pm-experiment-to-readout`](./skills/pm-experiment-to-readout/SKILL.md)
  turns a bounded test result into a metric and guardrail readout, a
  continue/change/stop/hold decision, and one smallest next action. Start with
  its [fictional experiment first run](./skills/pm-experiment-to-readout/examples/first-run.md) or read the [worked experiment readout](./skills/pm-experiment-to-readout/references/experiment-readout.md).
- [`pm-ai-evaluation-plan`](./skills/pm-ai-evaluation-plan/SKILL.md) turns an AI
  feature goal into test slices, an observable rubric, guardrails, fallback, and
  a release gate. Start with its [fictional AI evaluation first run](./skills/pm-ai-evaluation-plan/examples/first-run.md) or read the [worked AI support evaluation plan](./skills/pm-ai-evaluation-plan/references/ai-support-evaluation-plan.md).
- [`pm-feedback-to-fix`](./skills/pm-feedback-to-fix/SKILL.md) turns a de-identified
  product observation into a bounded reproduction path, smallest fix or
  experiment, acceptance checks, and release/rollback notes. Start with its
  [fictional feedback first run](./skills/pm-feedback-to-fix/examples/first-run.md)
  or read the [worked pilot observation](./skills/pm-feedback-to-fix/references/pilot-observation-to-fix.md).
- [`pm-decision-to-spec`](./skills/pm-decision-to-spec/SKILL.md) turns an
  evidence-backed product decision into a bounded Product Decision Packet with
  scope, UX states, acceptance criteria, measurement, rollout, and rollback.
  Start with its [fictional decision first run](./skills/pm-decision-to-spec/examples/first-run.md)
  or read the [worked support-review packet](./skills/pm-decision-to-spec/references/support-review-decision-packet.md).
- [`pm-proof-to-share`](./skills/pm-proof-to-share/SKILL.md) turns a verified
  product or skill release into an evidence-backed, channel-aware share pack
  with a clear first-use path, proof ledger, boundaries, feedback ask, and
  learning writeback. Start with its [fictional proof first run](./skills/pm-proof-to-share/examples/first-run.md)
  or read the [worked release proof share pack](./skills/pm-proof-to-share/references/release-proof-share-pack.md).
- [`pm-interview-to-insight`](./skills/pm-interview-to-insight/SKILL.md) turns
  de-identified interview notes, usability sessions, or workflow observations
  into an evidence-bounded insight map, contradiction log, and one next
  learning action. Start with its [fictional interview first run](./skills/pm-interview-to-insight/examples/first-run.md)
  or read the [worked support-interview insight map](./skills/pm-interview-to-insight/references/support-interview-insight-map.md).
- [`pm-outcome-to-metric`](./skills/pm-outcome-to-metric/SKILL.md) turns a
  product outcome or AI product goal into an evidence-bounded metric contract
  with a primary measure, denominator, window, guardrails, instrumentation
  gaps, and a decision rule. Start with its [fictional metric first run](./skills/pm-outcome-to-metric/examples/first-run.md)
  or read the [worked support-review metric contract](./skills/pm-outcome-to-metric/references/support-review-metric-contract.md).
- [`pm-release-to-learn`](./skills/pm-release-to-learn/SKILL.md) turns a
  verified release into a bounded rollout-and-learning plan with an audience,
  observation window, primary learning signal, guardrails, rollback trigger,
  feedback capture, and next decision. Start with its [fictional release first run](./skills/pm-release-to-learn/examples/first-run.md)
  or read the [worked support-review release learning plan](./skills/pm-release-to-learn/references/support-review-release-learning.md).
- [`pm-opportunity-to-bet`](./skills/pm-opportunity-to-bet/SKILL.md) turns
  multiple evidence-backed opportunity candidates into one bounded product bet
  with a source ledger, assumptions, opportunity cost, smallest validation,
  non-goals, and a stop or revise rule. Start with its [fictional bet first run](./skills/pm-opportunity-to-bet/examples/first-run.md)
  or read the [worked support-opportunity bet](./skills/pm-opportunity-to-bet/references/support-opportunity-bet.md).
- [`pm-ai-task-boundary`](./skills/pm-ai-task-boundary/SKILL.md) decides how an
  AI capability divides work between a person and an AI system by mapping the
  user job to a SCAN zone, autonomy level, permissions, approval points,
  fallback, evaluation slices, and a smallest safe pilot. Start with its
  [fictional task-boundary first run](./skills/pm-ai-task-boundary/examples/first-run.md)
  or read the [worked support AI task boundary](./skills/pm-ai-task-boundary/references/support-ai-task-boundary.md).
- [`pm-ai-trace-to-regression`](./skills/pm-ai-trace-to-regression/SKILL.md)
  turns an AI or agent failure trace, tool error, user correction, or guardrail
  event into a bounded failure classification, containment step, minimal
  reproduction, regression case, and release decision. Start with its
  [fictional trace first run](./skills/pm-ai-trace-to-regression/examples/first-run.md)
  or read the [worked support trace-to-regression packet](./skills/pm-ai-trace-to-regression/references/support-trace-to-regression.md).
- [`pm-ai-incident-to-runbook`](./skills/pm-ai-incident-to-runbook/SKILL.md)
  turns an AI or agent incident signal into a critical-journey impact map,
  evidence-bounded severity, containment, recovery runbook, verification and
  reopen gate, and learning writeback. Start with its
  [fictional incident first run](./skills/pm-ai-incident-to-runbook/examples/first-run.md)
  or read the [worked support incident packet](./skills/pm-ai-incident-to-runbook/references/support-incident-to-runbook.md).
- [`pm-ai-approval-to-flow`](./skills/pm-ai-approval-to-flow/SKILL.md) turns an
  AI or agent action proposal into a risk-bounded approval flow with preview
  and diff, least-privilege permissions, approve/reject/edit/defer states,
  durable receipts, recovery, and an evaluation or release gate. Start with
  its [fictional approval first run](./skills/pm-ai-approval-to-flow/examples/first-run.md)
  or read the [worked support approval flow](./skills/pm-ai-approval-to-flow/references/support-approval-flow.md).
- [`pm-ai-cost-to-guardrail`](./skills/pm-ai-cost-to-guardrail/SKILL.md) turns an
  AI or agent cost or latency signal into a source-bounded cost ledger,
  successful-outcome denominator, p50/p95 latency budget, quality guardrails,
  routing or scope options, and a ship/hold/rollback decision. Start with its
  [fictional cost guardrail first run](./skills/pm-ai-cost-to-guardrail/examples/first-run.md)
  or read the [worked support cost guardrail](./skills/pm-ai-cost-to-guardrail/references/support-cost-guardrail.md).
- [`pm-ai-context-to-contract`](./skills/pm-ai-context-to-contract/SKILL.md)
  turns an AI or agent context change into a source-bounded contract for
  instructions, knowledge, tools, memory, state, and query, with authority,
  freshness, privacy, selection, budget, compaction, recovery, evaluation,
  and a ship/hold/rollback decision. Start with its
  [fictional context first run](./skills/pm-ai-context-to-contract/examples/first-run.md)
  or read the [worked support context contract](./skills/pm-ai-context-to-contract/references/context-contract.md).
- [`pm-ai-tool-to-contract`](./skills/pm-ai-tool-to-contract/SKILL.md) turns an
  AI or MCP tool into a source-bounded agent-facing contract for purpose,
  namespace, scope, input schema, examples, high-signal output, provenance,
  permissions, side effects, errors, retries, injection handling, positive and
  negative routing, evaluation, and a ship/hold/rollback decision. Start with
  its [fictional tool contract first run](./skills/pm-ai-tool-to-contract/examples/first-run.md)
  or read the [worked support tool contract](./skills/pm-ai-tool-to-contract/references/tool-contract.md).
- [`pm-ai-memory-to-policy`](./skills/pm-ai-memory-to-policy/SKILL.md) turns an
  AI or agent memory idea into a source-bounded policy for user value, memory
  versus state, write and read eligibility, provenance, scope, freshness,
  privacy, retention, correction, deletion, export, reset, poisoning defense,
  evaluation, fallback, and a ship/hold/rollback decision. Start with its
  [fictional memory first run](./skills/pm-ai-memory-to-policy/examples/first-run.md)
  or read the [worked support memory policy](./skills/pm-ai-memory-to-policy/references/memory-policy.md).
- [`pm-ai-identity-to-boundary`](./skills/pm-ai-identity-to-boundary/SKILL.md)
  turns an AI or agent actor into a source-bounded identity and authorization
  contract for principals, authentication, delegation, resource and tenant
  scope, least privilege, approval interaction, credential/session lifecycle,
  expiry, rotation, revocation, attribution, audit receipts, negative tests,
  fallback, and a ship/hold/rollback decision. Start with its [fictional
  identity first run](./skills/pm-ai-identity-to-boundary/examples/first-run.md)
  or read the [worked support identity policy](./skills/pm-ai-identity-to-boundary/references/identity-policy.md).
- [`pm-ai-run-to-observability`](./skills/pm-ai-run-to-observability/SKILL.md)
  turns an AI or agent run into a source-bounded observability contract for
  run/session/task/trace hierarchy, event correlation, provenance, identity
  and scope, model/tool/approval/MCP/network evidence, outcome and guardrails,
  latency and cost links, privacy/redaction, sampling/retention, diagnosis,
  fallback, and a ship/hold/rollback decision. Start with its [fictional run
  observability first run](./skills/pm-ai-run-to-observability/examples/first-run.md)
  or read the [worked support run observability contract](./skills/pm-ai-run-to-observability/references/run-observability.md).
- [`pm-ai-claim-to-citation`](./skills/pm-ai-claim-to-citation/SKILL.md)
  turns an AI answer, research brief, or agent output into a source-bounded
  claim-to-citation contract for atomic claims, entailment, citation coverage
  and placement, source authority and freshness, conflict, uncertainty,
  privacy, prompt-injection boundaries, reader verification, abstention,
  evaluation, fallback, and a ship/hold/rollback decision. Start with its
  [fictional claim review first run](./skills/pm-ai-claim-to-citation/examples/first-run.md)
  or read the [worked support claim-citation contract](./skills/pm-ai-claim-to-citation/references/claim-citation-contract.md).
- [`pm-ai-retrieval-to-grounding`](./skills/pm-ai-retrieval-to-grounding/SKILL.md)
  defines source eligibility, query construction, retrieval, ranking,
  grounding, abstention, privacy, evaluation, and release evidence before an
  AI answer is generated. Start with its [fictional retrieval first run](./skills/pm-ai-retrieval-to-grounding/examples/first-run.md)
  or read the [worked retrieval-grounding contract](./skills/pm-ai-retrieval-to-grounding/references/retrieval-grounding-contract.md).
- [`pm-ai-feedback-to-eval`](./skills/pm-ai-feedback-to-eval/SKILL.md) turns an
  AI user correction, preference, thumbs-down report, escalation, or reviewed
  trace into a privacy-safe evaluation case with provenance, observation and
  label separation, oracle, slice, calibration, contamination checks, dataset
  destination, fallback, and a release decision. Start with its [fictional
  feedback first run](./skills/pm-ai-feedback-to-eval/examples/first-run.md) or
  read the [worked feedback-to-eval contract](./skills/pm-ai-feedback-to-eval/references/feedback-eval-contract.md).
- [`pm-ai-review-to-calibration`](./skills/pm-ai-review-to-calibration/SKILL.md)
  turns human review or model-judge scoring into a calibrated evaluation
  contract for rubric anchors, blind labels, reviewer agreement, judge
  comparison, adjudication, drift, privacy, and release evidence. Start with
  its [fictional calibration first run](./skills/pm-ai-review-to-calibration/examples/first-run.md)
  or read the [worked review-calibration contract](./skills/pm-ai-review-to-calibration/references/review-calibration-contract.md).
- [`pm-ai-uncertainty-to-experience`](./skills/pm-ai-uncertainty-to-experience/SKILL.md)
  turns AI uncertainty, partial evidence, delay, conflict, or failure into a
  user-visible state and recovery contract with honest progress, provenance,
  controls, trust evaluation, and release evidence. Start with its [fictional
  uncertainty first run](./skills/pm-ai-uncertainty-to-experience/examples/first-run.md)
  or read the [worked uncertainty-to-experience contract](./skills/pm-ai-uncertainty-to-experience/references/uncertainty-experience-contract.md).
- [`pm-ai-signal-to-intervention`](./skills/pm-ai-signal-to-intervention/SKILL.md)
  turns an online AI quality, safety, trust, cost, latency, policy, or behavior
  signal into an evidence-bounded intervention decision with scope, owner, TTL,
  user communication, verification, recovery, rollback, and learning writeback.
  Start with its [fictional signal first run](./skills/pm-ai-signal-to-intervention/examples/first-run.md)
  or read the [worked signal-intervention contract](./skills/pm-ai-signal-to-intervention/references/signal-intervention-contract.md).
- [`pm-ai-prompt-injection-to-defense`](./skills/pm-ai-prompt-injection-to-defense/SKILL.md)
  turns a suspected prompt injection, indirect injection, tool poisoning, or
  untrusted agent/MCP content path into an attack-path and defense contract
  with authority boundaries, negative evals, rollback, and a bounded release
  decision. Start with its [fictional prompt-injection first run](./skills/pm-ai-prompt-injection-to-defense/examples/first-run.md)
  or read the [worked defense contract](./skills/pm-ai-prompt-injection-to-defense/references/prompt-injection-defense-contract.md).
- [`pm-ai-output-to-interface`](./skills/pm-ai-output-to-interface/SKILL.md)
  turns an AI or agent result into a bounded decision about text, structured
  data, a declarative interface, or an action proposal. It maps named fields to
  trusted components, states, readable fallback, provenance, side-effect
  boundaries, host compatibility, accessibility, and evaluation. Start with
  its [fictional output-to-interface first run](./skills/pm-ai-output-to-interface/examples/first-run.md)
  or read the [worked output-to-interface contract](./skills/pm-ai-output-to-interface/references/output-to-interface-contract.md).
- [`pm-ai-first-use-to-activation`](./skills/pm-ai-first-use-to-activation/SKILL.md)
  turns an AI capability launch into a first-use and activation contract. It
  separates eligibility, exposure, context readiness, first value, repeat
  value, and activation, then adds state/recovery coverage, instrumentation,
  guardrails, rollout, and a bounded learning decision. Start with its
  [fictional first-use fixture](./skills/pm-ai-first-use-to-activation/examples/first-run.md)
  or read the [worked first-use to activation contract](./skills/pm-ai-first-use-to-activation/references/first-use-activation-contract.md).
- [`pm-ai-risk-to-control`](./skills/pm-ai-risk-to-control/SKILL.md) turns an AI
  launch or material change into a reviewable hazard, harm, control, evidence,
  residual-risk, fallback, and release decision. It separates preventive,
  detective, and corrective controls from their verification oracles, and keeps
  unknown likelihood, unverified deployment, and rollback conditions visible.
  Start with its [fictional risk-control first run](./skills/pm-ai-risk-to-control/examples/first-run.md)
  or read the [worked risk-control contract](./skills/pm-ai-risk-to-control/references/risk-control-contract.md).
- [`pm-ai-handoff-to-recovery`](./skills/pm-ai-handoff-to-recovery/SKILL.md)
  turns an AI escalation into a privacy-safe handoff packet, destination and
  owner contract, visible waiting state, recovery path, resume rule, and
  release decision. It keeps transfer separate from approval, identity,
  incident response, resolution, and adoption evidence. Start with its
  [fictional handoff first run](./skills/pm-ai-handoff-to-recovery/examples/first-run.md)
  or read the [worked handoff-recovery contract](./skills/pm-ai-handoff-to-recovery/references/handoff-recovery-contract.md).
- [`pm-ai-data-to-purpose`](./skills/pm-ai-data-to-purpose/SKILL.md) turns an AI
  data flow into a source-bounded purpose and lifecycle contract covering
  minimization, provenance, tenant scope, runtime/log/evaluation/training
  reuse, third-party egress, retention, deletion, correction, recovery, and a
  release decision. Start with its [fictional data-purpose first run](./skills/pm-ai-data-to-purpose/examples/first-run.md)
  or read the [worked support-draft data-purpose contract](./skills/pm-ai-data-to-purpose/references/support-draft-data-purpose.md).
- [`pm-ai-model-to-route`](./skills/pm-ai-model-to-route/SKILL.md) turns model,
  provider, and version choices into a source-bounded route contract for job
  slices, hard eligibility, manual/automatic selection, quality, safety,
  privacy, cost, latency, reliability, fallback, route receipts, migration,
  and rollback. Start with its [fictional model-routing first run](./skills/pm-ai-model-to-route/examples/first-run.md)
  or read the [worked support-draft model-route contract](./skills/pm-ai-model-to-route/references/support-draft-model-route.md).
- [`pm-ai-orchestration-to-contract`](./skills/pm-ai-orchestration-to-contract/SKILL.md)
  turns a multi-step AI or agent workflow into a source-bounded orchestration
  contract for topology, step ownership, state transitions, control budgets,
  side-effect boundaries, failure recovery, evaluation, and release decisions.
  Start with its [fictional orchestration first run](./skills/pm-ai-orchestration-to-contract/examples/first-run.md)
  or read the [worked support-draft orchestration contract](./skills/pm-ai-orchestration-to-contract/references/support-draft-orchestration.md).

None of the skills needs a model, tool permission, network access, login, or
external write. Copy the skill directory you need into an Agent
Skills-compatible client and keep a human owner on the source mapping and
final decision.

**Public skill pilot:** Try one of the thirty-five first runs with a real, sanitized note, then
leave the client/version, source or result IDs, one limitation, and one improvement in
[pilot issue #46](https://github.com/asdc163/pm-signal-lab/issues/46). A public
comment is a feedback lead, not adoption evidence.

**Public pilot:** The current hosted demo is looking for five international PMs, founders, designers, or product engineers to complete one unguided five-minute trial. Use the [session kit](./docs/operations/pm-session-kit.md), then leave one concrete observation in [pilot issue #4](https://github.com/asdc163/pm-signal-lab/issues/4).

**International pilot operations:** The human-reviewed channel drafts, evidence-safe message contract, and weekly learning loop are in the [international pilot launch kit](./docs/operations/international-pilot-launch-kit-2026-08-15.md).

**Design and QA evidence:** The current no-AI-feel design contract, field-notebook release audit, keyboard and semantic oracle, evidence-spine brand polish, local browser evidence, signal-review slice, review-docket workbench, margin-note context, formal hosted demo, canonical hosted release audit, the latest copy/semantic polish contract, and the current hosted release audit are in the [field notebook design contract](./docs/product/pm-signal-lab/53-no-ai-feel-field-notebook-contract-2026-08-15.md), [field notebook release audit](./docs/product/pm-signal-lab/54-field-notebook-release-audit-2026-08-15.md), [keyboard and semantic oracle audit](./docs/product/pm-signal-lab/55-keyboard-semantic-oracle-audit-2026-08-15.md), [evidence-spine brand polish contract](./docs/product/pm-signal-lab/56-evidence-spine-brand-polish-contract-2026-08-15.md), [direct workbench no-AI-feel contract](./docs/product/pm-signal-lab/60-direct-workbench-no-ai-feel-contract-2026-08-15.md), [latest local QA record](./docs/product/pm-signal-lab/61-direct-workbench-no-ai-feel-local-qa-2026-08-15.md), [latest hosted release audit](./docs/product/pm-signal-lab/62-direct-workbench-hosted-release-audit-2026-08-15.md), [latest copy and semantic polish contract](./docs/product/pm-signal-lab/63-direct-workbench-copy-and-semantic-polish-contract-2026-08-15.md), [current local QA record](./docs/product/pm-signal-lab/64-direct-workbench-copy-and-semantic-polish-local-qa-2026-08-15.md), [current hosted release audit](./docs/product/pm-signal-lab/65-direct-workbench-copy-and-semantic-polish-hosted-release-audit-2026-08-15.md), [AI product signal-pack contract](./docs/product/pm-signal-lab/66-ai-product-signal-pack-contract-2026-08-15.md), [AI product signal-pack local QA record](./docs/product/pm-signal-lab/67-ai-product-signal-pack-local-qa-2026-08-15.md), [AI product signal-pack hosted release audit](./docs/product/pm-signal-lab/68-ai-product-signal-pack-hosted-release-audit-2026-08-15.md), [design and accessibility contract](./docs/product/pm-signal-lab/44-design-a11y-completion-contract-2026-08-15.md), [signal-review local QA record](./docs/product/pm-signal-lab/47-signal-review-growth-pulse-local-qa-2026-08-15.md), [review-docket workbench audit](./docs/product/pm-signal-lab/49-review-docket-workbench-contract-and-hosted-audit-2026-08-15.md), [margin-note context audit](./docs/product/pm-signal-lab/50-margin-note-context-contract-and-hosted-audit-2026-08-15.md), and [formal hosted demo contract](./docs/operations/hosted-demo-release-contract-2026-08-15.md).

This is an AI product manager portfolio project by [John Wu](https://github.com/asdc163). The product demonstrates evidence handling, uncertainty, experiment design, and honest handoff. It does not pretend that a deterministic fixture is a model, that a copied summary is adoption, or that an exported brief is a completed decision.

## Five-minute trial

No login or API key is required.

1. Open the [hosted demo](https://asdc163.github.io/pm-signal-lab/) and select `Open the sample worksheet`.
2. Expand one row with `View source`. Check the source folio, original text, date, and limitation.
3. Select `Start review`. Accept one claim, edit one, or keep one as a hypothesis.
4. Open `Decide`, choose a direction, and select `Draft smallest experiment`.
5. Review the primary metric, guardrail, smallest test, decision rule, and `Not covered` section.
6. Export, copy, or download the Markdown decision brief.
7. In `Ship`, open `Help decide what to fix next` after the brief. Three lines are enough: what you expected, where you hesitated, and one change that would make you try again. Add trust or recovery detail if it matters.
8. Inspect the generated field note before opening the public GitHub feedback page. Submission is always manual.

The product path is:

`Collect → Verify → Decide → Ship`

The point is to make the source, claim, limitation, and next action visible in one path. It is not to make you trust an opaque answer.

![PM Signal Lab field folio first-run workbench](./docs/product/pm-signal-lab/assets/qa/field-folio-first-run-1280.png)

Current field-folio first-run screenshot captured from the local build on
2026-08-15 at 1280×900. The [local QA report](./docs/product/pm-signal-lab/70-less-ai-field-folio-local-qa-2026-08-15.md)
also records the loaded desktop/mobile screenshots and the executed review,
export, keyboard, validation, refresh, and privacy-gated feedback flows. The
[hosted release audit](./docs/product/pm-signal-lab/71-less-ai-field-folio-hosted-release-audit-2026-08-15.md)
records the post-deploy canonical URL, bundle, browser, console, request, and
mobile evidence.

## What is in the hosted demo

- A deterministic, fictional AI-assisted support-draft sample pack containing interview, support, product-observation, and evaluation-review signals.
- A source ledger with stable folios, source identity, dates, original text, and an expandable source view.
- Candidate claims that keep their source mapping and limitation visible.
- Human review actions: accept a claim, edit it, keep it as a hypothesis, or mark missing evidence.
- An editable experiment brief with a primary metric, guardrail, smallest test, decision rule, owner, and readiness state.
- A Markdown decision brief with evidence, known limits, next action, and a `Not covered` section.
- A local session receipt and a privacy-gated session feedback field note that never includes raw evidence.
- Responsive desktop, tablet, mobile, keyboard, loading, empty, error, and recovery states.

All session content stays on the current page and resets on refresh. The hosted demo has no login, database, external AI provider, API-key flow, GitHub mutation, MCP action, telemetry, or automatic issue submission. Copy or download anything you want to keep before leaving or refreshing.

## Why this product exists

AI can make a polished summary quickly. The harder PM questions remain:

- Which line came from which source?
- What is observation, what is a claim, and what is still a hypothesis?
- Which source, freshness, or evaluation gap changes the decision?
- What is the smallest test that could change what we do next?

PM Signal Lab treats those questions as a product workflow. The interface keeps the observed line beside the working claim, keeps human review visible, and keeps missing evidence from becoming a confident-looking conclusion.

The product direction was informed by a reference study of 1,042 public GitHub repositories, including metadata, README structure, and 20 near-neighbor case studies. Read the [English research summary](./docs/research/github-reference-research-2026-08-14.en.md) and the [original working note](./docs/research/github-reference-research-2026-08-14.md). This is a reference corpus, not adoption evidence or a success guarantee.

## Quickstart

Requirements: Node.js 20.19+ and npm.

```bash
npm install
npm run dev
```

Open the Vite URL and follow `Collect → Verify → Decide → Ship`.

Before submitting a change, run the local gate:

```bash
npm test
npm run lint
npm run build
npm run verify:hosted
```

## Product and engineering shape

The core domain path is:

`Evidence → Claim → ExperimentBrief → DecisionMemo`

The UI and domain engine are separate so a future provider adapter can be evaluated without putting API keys, model drift, or external side effects into the first release.

- [`src/App.tsx`](./src/App.tsx) composes the workflow, states, accessible controls, and local interactions.
- [`src/domain/synthesis.ts`](./src/domain/synthesis.ts) builds deterministic candidate claims and experiment drafts.
- [`src/domain/export.ts`](./src/domain/export.ts) enforces the decision-brief readiness gate and Markdown export.
- [`src/domain/feedback.ts`](./src/domain/feedback.ts) prepares a privacy-gated session field note.
- [`src/domain/fixture.ts`](./src/domain/fixture.ts) holds the repeatable signal-review sample pack.
- [`src/styles.css`](./src/styles.css) defines the warm-paper field folio, ruled source records, index rail, and responsive layout.
- [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml) builds and deploys the hosted demo from `main`.
- [`.github/workflows/hosted-demo-smoke.yml`](./.github/workflows/hosted-demo-smoke.yml) checks the canonical hosted demo after deployment, daily, and on manual dispatch.
- [`scripts/verify-hosted-demo.mjs`](./scripts/verify-hosted-demo.mjs) performs the read-only HTTPS, asset, and current-copy check used by the hosted smoke workflow.
- [`.github/workflows/weekly-growth-pulse.yml`](./.github/workflows/weekly-growth-pulse.yml) records read-only public repository signals as a reviewable artifact; it does not automate social activity.
- [`DESIGN.md`](./DESIGN.md) records the visual DNA, tokens, states, and layout rules.

The current English-first product contract is [`34-english-first-product-messaging-contract-2026-08-15.md`](./docs/product/pm-signal-lab/34-english-first-product-messaging-contract-2026-08-15.md). The latest less-AI visual direction is [`69-less-ai-field-folio-visual-direction-contract-2026-08-15.md`](./docs/product/pm-signal-lab/69-less-ai-field-folio-visual-direction-contract-2026-08-15.md), with the current loaded-subject correction in [`72-less-ai-subject-specificity-contract-2026-08-15.md`](./docs/product/pm-signal-lab/72-less-ai-subject-specificity-contract-2026-08-15.md). The current direct-workbench visual contract is [`60-direct-workbench-no-ai-feel-contract-2026-08-15.md`](./docs/product/pm-signal-lab/60-direct-workbench-no-ai-feel-contract-2026-08-15.md), with the latest copy, semantic, and recovery decisions in [`63-direct-workbench-copy-and-semantic-polish-contract-2026-08-15.md`](./docs/product/pm-signal-lab/63-direct-workbench-copy-and-semantic-polish-contract-2026-08-15.md). The latest local evidence is [`64-direct-workbench-copy-and-semantic-polish-local-qa-2026-08-15.md`](./docs/product/pm-signal-lab/64-direct-workbench-copy-and-semantic-polish-local-qa-2026-08-15.md), the AI PM-specific contract is [`66-ai-product-signal-pack-contract-2026-08-15.md`](./docs/product/pm-signal-lab/66-ai-product-signal-pack-contract-2026-08-15.md), the current AI PM local evidence is [`67-ai-product-signal-pack-local-qa-2026-08-15.md`](./docs/product/pm-signal-lab/67-ai-product-signal-pack-local-qa-2026-08-15.md), and the canonical hosted release evidence is [`68-ai-product-signal-pack-hosted-release-audit-2026-08-15.md`](./docs/product/pm-signal-lab/68-ai-product-signal-pack-hosted-release-audit-2026-08-15.md). Historical audits remain available as a release trail.

## English-first hosted demo

The latest English-first visual and behavior evidence is kept in the [subject-specificity local QA report](./docs/product/pm-signal-lab/73-less-ai-subject-specificity-local-qa-2026-08-15.md) and [hosted release audit](./docs/product/pm-signal-lab/74-less-ai-subject-specificity-hosted-release-audit-2026-08-15.md). Earlier audits remain a historical release trail.

The hosted demo surface is `en-US`: UI copy, sample data, generated Markdown, accessible names, page metadata, README, trial kit, and public feedback handoff. Historical audits remain in the repository as an evidence trail; the current contract and release audit are written in English.

This release intentionally does not add a locale selector or runtime translation framework. The next localization decision should follow evidence from international PM sessions, not an assumption that more language options automatically improve the first-run job.

## What this does not claim

- This is not a production AI-quality benchmark.
- The hosted demo has no external model provider; its support-draft worksheet is a deterministic fixture, so it does not prove model quality.
- No real-user task sessions, retention, conversion, adoption, or GitHub growth outcome are claimed by this repository.
- GitHub stars, forks, traffic, and issue activity are external results; a polished hosted demo is not evidence of any target number.
- The `4 of 5` threshold inside the experiment brief is a proposed decision rule, not completed research.

## Try it and report one observation

If you are a PM, founder, product designer, or product engineer, use the [five-minute session kit](./docs/operations/pm-session-kit.md) without a maintainer walkthrough. The most useful report is one concrete hesitation, trust or doubt signal, recovery moment, and one change you would make.

The public feedback issue is [#4](https://github.com/asdc163/pm-signal-lab/issues/4) and is pinned in the repository. The copy-ready handoff is [`public-pilot-issue-body.md`](./docs/operations/public-pilot-issue-body.md). Review every line before submitting. Do not include customer names, private tickets, API keys, tokens, confidential roadmap material, or raw sensitive evidence.

Stars are optional. Specific, reproducible feedback is more useful than a number that cannot explain what happened.

## Promotion gates

The next product decision is gated by evidence, not visual polish:

1. Collect at least five target-user task sessions before evaluating an external model or provider adapter.
2. Evaluate a portable JSON schema only if several external workflows ask to bring their own evidence pack.
3. Consider read-only GitHub or MCP integration only after source provenance and approval behavior are stable.
4. Keep login, telemetry, and external mutation out of the hosted demo until usability evidence and explicit authorization support that scope.

## License

This repository is released under the [MIT License](./LICENSE). Copyright (c) 2026 asdc163.

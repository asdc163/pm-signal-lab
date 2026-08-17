---
name: pm-ai-content-to-moderation
description: Use when an AI product must turn a content policy into a reviewable moderation workflow with a bounded taxonomy, severity and action matrix, timing, human review, appeals, false-positive and false-negative slices, privacy controls, and a ship, pilot, hold, or rollback decision. It separates provider capability from product evidence and does not implement or prove a moderation classifier.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Content to Moderation

Turn “we will moderate the content” into a policy-to-outcome contract that a PM,
trust-and-safety partner, reviewer, and engineer can inspect. The unit of work
is not a model score: it is a content item moving through a named policy
version, category, severity, action, review or appeal route, and evidence-backed
outcome.

## When to use

- an AI product accepts, generates, transforms, recommends, or publishes
  user-facing content;
- a team needs to decide what is allowed, limited, queued for review, blocked,
  removed, or unknown under a named policy version;
- a provider returns harm categories or scores and the PM must decide whether
  they are detection signals, prevention controls, or review inputs;
- moderators need a queue contract, an abstain/escalate path, reviewer context,
  or a correction loop for false blocks and false passes;
- a product needs pre-input, in-flow, output, post-publication, appeal, or
  policy-migration coverage;
- a release requires language, modality, evasion, vulnerable-user, privacy,
  capacity, and rollback decisions.

## Do not use this when

- the main question is where a generic check runs: use
  `pm-ai-guardrail-to-enforcement`;
- the main question is a general hazard/control register: use
  `pm-ai-risk-to-control`;
- the main question is calibrating human or model judges: use
  `pm-ai-review-to-calibration`;
- the main question is evaluating an arbitrary AI output: use
  `pm-ai-output-to-eval`;
- the main question is an injection attack path: use
  `pm-ai-prompt-injection-to-defense`.

## Evidence boundary

Provider documentation is capability context, not proof that a product's policy,
classifier, threshold, language coverage, or enforcement is safe. Record the
provider, model or rule ID, version or snapshot, content modality, policy source,
observed timestamp, and evidence layer. Keep these separate:

| Layer | What it can establish | What it cannot establish by itself |
| --- | --- | --- |
| `provider_capability` | documented input/output modality, categories, endpoints, or snapshots | product policy fit, recall, fairness, or enforcement |
| `policy_artifact` | approved category definitions, severity, action, owner, and version | runtime execution or model quality |
| `classifier_signal` | a score/category for a particular redacted item | that the action was correct or safe |
| `human_review` | a reviewer's decision and disagreement record | population-level quality without a sampling plan |
| `product_outcome` | user-visible or operational result for a measured cohort | causal impact unless the design supports it |

If a layer was not observed, write `Unknown`, `Not run`, `Not measured`, or
`Not covered`. Never turn a score, provider claim, or package test into a safety
or adoption claim.

## Core definitions

- **Policy version:** the approved rule set and effective time that governs the
  decision. A model version is not a policy version.
- **Content unit:** the smallest item being moderated, such as a prompt,
  generated answer, image plus caption, comment, message, listing, or output
  frame. Name context and parent/child relationships.
- **Taxonomy:** product categories with definitions, exclusions, examples,
  severity, vulnerable-user rules, and a route for `unknown` or `other`.
- **Signal:** a provider or in-house category, score, rule hit, heuristic, or
  reviewer observation. It is evidence for a decision, not the decision itself.
- **Action:** a user or system outcome such as `allow`, `limit`, `review`,
  `block`, `remove`, `appeal`, or `unknown`. Do not collapse `review` into
  `block`.
- **Appeal:** a user-requested correction path with a new reviewer or policy
  view, a decision state, a reason, and a non-duplicative learning record.
- **Outcome:** what actually happened after the decision, including side-effect
  state, user-visible explanation, reviewer result, and recovery.

## Workflow

### 1. Frame the decision and harm

Write one sentence:

> Decide whether content `<unit/context>` may reach `<audience/surface>` under
> policy `<id/version>`, using signal `<provider/rule/version>`, with action
> `<allow/limit/review/block/remove/unknown>`, review `<owner>`, appeal
> `<route>`, evidence `<oracle>`, and rollback `<owner/trigger>`.

Then name the user job, protected interest, affected people, side effect,
decision owner, and consequence of a false pass versus a false block. If the
policy source, authority, audience, or content unit is missing, return `hold` or
`unknown`; do not fill the gap with generic safety language.

### 2. Freeze the item, context, and policy

Create a redacted ledger before interpreting a score:

| Field | Required question |
| --- | --- |
| `item_id` / `parent_id` | Can the item be correlated without exposing content? |
| `modality` / `locale` | Is the input text, image, audio, video, mixed, or unknown? |
| `context_scope` | Which surrounding content, user setting, or conversation is allowed? |
| `policy_id/version` | Which approved definition and effective time apply? |
| `provider/model/rule` | What produced the signal, and is its version locked? |
| `authority` | Who may change the policy, threshold, action, or appeal result? |
| `retention` | What minimum evidence is retained, for how long, and why? |

Separate content meaning from untrusted embedded instructions. Do not let a
caption, prompt, tool result, image text, or user-provided policy override the
moderation authority without an explicit review.

### 3. Build the taxonomy and severity/action matrix

Use the smallest taxonomy that can support a real decision. For every category,
write an inclusion rule, exclusion rule, context requirement, severity, signal
source, threshold/oracle, action, explanation, review route, and owner.

| Category | Definition / exclusion | Severity | Signal and threshold | Default action | Review / appeal |
| --- | --- | --- | --- | --- | --- |
| `<category>` | `<what counts / what does not>` | `low/medium/high/critical` | `<signal/version/oracle>` | `allow/limit/review/block/remove/unknown` | `<owner, SLA, route>` |

Use `unknown` for insufficient context, unsupported modality, missing policy,
provider failure, conflicting signals, and out-of-taxonomy content. A high score
does not automatically justify removal; a low score does not prove safety.
Record whether the action is preventive, detective, or corrective.

### 4. Map the content lifecycle and side-effect boundary

Map each route separately. For each route record who can see the item, whether a
side effect has happened, the check timing, the failure behavior, and the
recovery:

| Route | PM question |
| --- | --- |
| `pre_input` | Can the product reject or redirect before expensive work or storage? |
| `in_flow` | Can a pending check pause generation without leaking partial output? |
| `post_output` | Is the result checked before a user or downstream tool sees it? |
| `pre_publish` | Is there a fresh check before an irreversible or public side effect? |
| `post_publish` | How is a late detection contained, explained, and rolled back? |
| `human_review` | What evidence, context, abstain path, and reviewer safety rules exist? |
| `appeal` | What can be corrected, by whom, under which policy version? |
| `migration` | What happens to existing decisions when policy or model changes? |

Do not call an after-the-fact detection check prevention. Do not treat a model
refusal as a moderation receipt. If a check times out or is unavailable, choose
`block`, `manual`, or a narrowly bounded fail-open exception with owner, TTL,
and later review; never silently convert failure to `allow`.

### 5. Design review, appeals, and user-visible states

Define the queue item and the decision receipt without retaining unnecessary raw
content. A reviewer needs the policy version, category definitions, relevant
context, signal provenance, prior action, reason for escalation, allowed
controls, and an `abstain/escalate` route. A user needs a plain explanation,
what happened, what they can do next, and whether an appeal is pending, upheld,
reversed, expired, or unavailable.

Cover these states explicitly:

- missing policy, missing context, empty input, unsupported modality;
- pending, provider unavailable, timeout, rate limit, conflicting signals;
- allowed, limited, queued for review, blocked, removed, and unknown;
- reviewer agrees, disagrees, abstains, or needs a specialist;
- appeal submitted, duplicate, pending, upheld, reversed, expired, or not
  eligible;
- policy changed, model changed, late detection, rollback, and reopened case.

### 6. Build the evaluation and learning slices

Do not report one aggregate accuracy number. Define the decision denominator and
sample at least:

- clean allowed content and clear violations;
- borderline/context-dependent items and each severity boundary;
- false-pass and false-block candidates with expected action;
- language, locale, modality, layout, and accessibility variants relevant to the
  surface;
- paraphrase, obfuscation, adversarial, embedded-instruction, and evasion
  slices;
- provider unavailable, timeout, late result, duplicate, replay, and recovery;
- reviewer disagreement, appeal reversal, policy-version, and model-version
  slices;
- sensitive content exposure, retention, access, and redaction checks.

For each slice define the oracle, reviewer protocol, denominator, acceptable
uncertainty, owner, and release threshold. Link every disagreement or appeal
reversal to a policy-version decision: revise the definition, action, route,
review guidance, threshold, or hold. Do not silently relabel a disagreement as
noise.

### 7. Set privacy, authorization, and operational controls

Minimize content sent to a classifier and retained in a review queue. Record
purpose, consent or legal basis when applicable, access role, deletion/expiry,
redaction, sensitive-content warning, reviewer wellbeing controls, and audit
receipt. Policy changes, threshold changes, appeals, and removals need explicit
authority and attribution. Public examples must use fictional or sanitized
fixtures; never include customer text, credentials, tokens, cookies, private
URLs, or raw sensitive screenshots.

### 8. Decide release, rollback, and writeback

Choose exactly one: `ship`, `pilot`, `hold`, `rollback`, or `unknown`. A `ship`
decision needs policy authority, route coverage, evaluated slices, reviewer and
appeal ownership, failure behavior, privacy controls, and fresh evidence. A
`pilot` needs scope, TTL, manual fallback, monitoring, and a stop rule. A `hold`
is correct when policy, evidence, authority, or recovery is missing.

Write back the policy version, signal/model version, decisions, review and
appeal outcomes, drift indicators, open gaps, and next test. If a model changes,
re-run representative slices before reusing thresholds or old decisions.

Read [the worked content moderation contract](references/content-moderation-contract.md)
for a complete fictional policy ledger, review/appeal matrix, source mapping,
and evaluation slices.

## Output contract

Return every field below. `Unknown` is valid; omission is not.

| Field | Required content |
| --- | --- |
| `job_and_harm` | user job, audience, harm, protected interest, and false-pass/false-block consequence |
| `policy` | policy ID/version, source, authority, effective time, taxonomy owner, and migration rule |
| `content_unit` | item/parent IDs, modality, locale, context scope, sensitivity, and retention |
| `signal` | provider/model/rule/version, category, score or observation, provenance, and capability limits |
| `taxonomy` | category definitions, exclusions, severity, context, and `unknown` route |
| `action_matrix` | category/severity to allow, limit, review, block, remove, or unknown with rationale |
| `lifecycle_route` | pre-input, in-flow, output, pre-publish, post-publish, review, appeal, and migration coverage |
| `timing_and_side_effect` | before/after timing, prevention versus detection, side-effect state, and failure behavior |
| `review_and_appeal` | queue context, reviewer authority, abstention, user explanation, appeal states, and SLA/TTL |
| `privacy_and_authority` | minimization, consent/basis when applicable, access, retention/deletion, redaction, and change authority |
| `evaluation` | denominator, positive/negative, false-pass/false-block, evasion, language/modality, recovery, disagreement, and drift slices |
| `evidence` | redacted IDs, policy/signal versions, timestamps, decision, reviewer, outcome, and evidence layer |
| `recovery` | retry, manual, cancel, rollback, reopen, late detection, and fresh-check rules |
| `release_decision` | ship, pilot, hold, rollback, or unknown with owner, trigger, TTL, and next test |
| `not_covered` | unsupported provider/runtime, quality, legal, mobile/accessibility, adoption, and user-outcome gaps |

## Edge cases

- Provider category names do not match the product taxonomy: preserve both,
  write the mapping and uncertainty, and hold if the action cannot be justified.
- A score is high but context changes the meaning: route to review or a
  context-aware rule; do not raise or lower a threshold without evidence.
- A score is low but the item is outside supported language or modality: use
  `unknown` or manual review, not `allow`.
- A user appeals a decision after the policy changes: record both versions and
  decide whether to re-review under the effective policy.
- A late detection arrives after publication or a side effect: contain future
  descendants, preserve the receipt, notify the owner, and define rollback; do
  not report clean prevention.
- A reviewer sees sensitive content: minimize context, warn before exposure,
  allow abstention, and record only the required decision evidence.
- An appeal is duplicated, automated, abusive, or unavailable: preserve the
  original decision, show the state, rate-limit or route to manual review, and
  never erase the correction history.
- A policy or threshold changes with no representative evaluation: `hold` and
  create a migration slice before reusing previous decisions.
- An embedded prompt or document instructs the system to ignore policy: treat it
  as untrusted content and keep policy authority outside the item.
- The provider is unavailable: fail closed, manual, or a bounded fail-open
  route must be explicit; a silent retry loop is not recovery evidence.
- Public documentation uses a live customer example: replace it with a
  fictional fixture or de-identify it enough that it cannot be reconstructed.

## Final check

- [ ] The user job, protected interest, harm, audience, false-pass consequence,
  false-block consequence, owner, and decision are explicit.
- [ ] A policy ID/version, authority, effective time, taxonomy, context, and
  `unknown` route are named.
- [ ] Content unit, modality, locale, parent/context scope, sensitivity,
  retention, and redacted correlation IDs are present.
- [ ] Provider capability, classifier signal, human review, policy artifact, and
  product outcome are not conflated.
- [ ] Every category has a definition, exclusion, severity, action, rationale,
  owner, review route, and appeal route or an explicit gap.
- [ ] Pre-input, in-flow, output, pre-publish, post-publish, review, appeal,
  migration, retry, and late-detection routes are mapped.
- [ ] Prevention, detection, correction, timeout, provider failure, and
  side-effect state are distinct.
- [ ] Pending, allow, limit, review, block/remove, unknown, appeal, recovery,
  and policy-change states are user-visible where relevant.
- [ ] Positive, negative, false-pass, false-block, language, modality, evasion,
  privacy, reviewer disagreement, recovery, and drift slices have oracles and
  denominators.
- [ ] Minimization, access, authorization, retention/deletion, sensitive-content
  handling, reviewer safety, injection/evasion, and audit receipts are covered.
- [ ] The release choice is `ship`, `pilot`, `hold`, `rollback`, or `unknown`
  with owner, trigger, TTL, next test, and rollback.
- [ ] Unrun live quality, legal, provider, mobile/accessibility, adoption, and
  user-outcome work is written under `Not covered`; no claim outruns evidence.

## Not covered

This skill does not implement a moderation model, establish legal compliance,
prove precision/recall or language parity, run a live provider request, operate a
review queue, test production enforcement, or establish adoption, traffic, user
outcomes, or GitHub stars.

# Worked contract: fictional multimodal content policy and appeal loop

This is a **fictional fixture** for learning the skill. It is not a live policy,
provider response, moderation benchmark, legal opinion, or production safety
case.

## Contents

- [Decision frame](#decision-frame)
- [Source and capability ledger](#source-and-capability-ledger)
- [Policy and taxonomy ledger](#policy-and-taxonomy-ledger)
- [Lifecycle and action matrix](#lifecycle-and-action-matrix)
- [Review and appeal contract](#review-and-appeal-contract)
- [Evaluation slices](#evaluation-slices)
- [Privacy, authority, and operations](#privacy-authority-and-operations)
- [Release and writeback](#release-and-writeback)
- [Not covered](#not-covered)

## Decision frame

| Field | Fictional contract |
| --- | --- |
| `decision` | Decide whether a creator marketplace may publish an AI-generated listing image and caption, or route it to review, under `marketplace-safety-v4`. |
| `user/job` | Let creators publish legitimate listings while protecting buyers from graphic, sexual, violent, fraudulent, or privacy-invasive content. |
| `audience/surface` | Adult buyers browsing a public listing feed; minors and restricted regions require a separate policy decision. |
| `protected interest` | Physical and emotional safety, informed purchasing, privacy, and platform trust. |
| `false pass` | A harmful or deceptive listing reaches buyers or a public feed. |
| `false block` | A legitimate creator loses reach or publishing access without a fair correction path. |
| `policy owner` | Fictional Trust & Safety PM with a named reviewer lead and marketplace operations owner. |
| `release choice` | `pilot` only after manual review capacity and appeal ownership are verified. |

## Source and capability ledger

Provider sources describe possible signals and input boundaries. They do not
approve the fictional marketplace policy or establish the quality of any
threshold.

| Source | Observed capability context | Product implication |
| --- | --- | --- |
| [OpenAI `omni-moderation-latest` model page](https://developers.openai.com/api/docs/models/omni-moderation-latest) | The page currently describes text and image input, text output, no audio/video input, a moderation endpoint, and a named snapshot. | Keep modality coverage explicit; audio/video routes are `Not covered` unless another verified provider or human route exists. Lock the provider/model/snapshot in the signal ledger. |
| [OpenAI multimodal moderation announcement](https://openai.com/index/upgrading-the-moderation-api-with-our-new-multimodal-moderation-model/) | The announcement describes multimodal text/image harm classification, category-specific coverage, and calibrated probability scores. | Treat categories and score meaning as provider context; map them to product taxonomy and evaluate the actual action boundary. Do not copy category names into user policy without definitions. |
| [OpenAI model catalog](https://developers.openai.com/api/docs/models) | Current catalog and model guidance can change. | Re-check source freshness before locking a provider-specific contract or migration. |

**Source status:** sources were read on `2026-08-17` for this fictional
reference. No provider request or benchmark was executed.

## Policy and taxonomy ledger

Policy `marketplace-safety-v4` is fictional, effective
`2026-08-17T09:00:00Z`, and applies to listing caption plus primary image. A
secondary image, seller profile, comments, and generated audio need separate
content units.

| Product category | Include | Exclude / context | Severity | Default action |
| --- | --- | --- | --- | --- |
| `graphic-violence` | Explicit injury or graphic violence in caption/image | Non-graphic fictional action imagery may be allowed by context | high | `review` before publish; `remove` after confirmed violation |
| `sexual-content` | Explicit sexual content in caption/image | Educational or health context requires a separate specialist rule | high | `review`; `block` or `remove` only under approved rule |
| `credible-threat` | Specific target, intent, and plausible capability | Figurative language, fictional story, or vague anger without those elements | critical | `hold` and trained human review |
| `fraud/deception` | Impersonation, forged proof, or materially misleading listing claim | Ordinary marketing language without a false factual claim | medium/high | `limit` or `review`; operations verification may be required |
| `privacy-exposure` | Unnecessary personal identifier or private image | Public business contact intentionally supplied for the listing | high | `block` publication and give a redaction path |
| `unsupported/unknown` | Missing context, unsupported modality, conflicting signals, or no policy mapping | None | unknown | `manual` or `hold`, never implicit `allow` |

The fictional provider signal may map to more than one product category. The
mapping must preserve provider category, product category, policy version,
threshold/oracle, and reviewer decision. A numeric score never bypasses the
`unsupported/unknown` route.

## Lifecycle and action matrix

| Route | Check / owner | Side-effect boundary | Failure and recovery |
| --- | --- | --- | --- |
| `pre_publish` | Signal check plus policy mapping; marketplace service | No public listing yet | `manual` on timeout or unsupported modality; fresh check before publish |
| `post_publish` | Periodic report and late-detection queue; operations | Listing may already be visible | Contain visibility, preserve receipt, notify owner, and assess rollback; do not call it prevention |
| `human_review` | Trained reviewer with policy-v4 and bounded context | Reviewer can choose action but cannot change policy | `abstain` for uncertainty or reviewer safety; escalate to specialist |
| `appeal` | Second reviewer under policy version recorded on original decision | Listing state remains explicit while appeal is pending | `upheld`, `reversed`, or `needs-specialist`; preserve both decisions |
| `policy_migration` | Trust & Safety PM with operations owner | Existing decisions may be stale | Sample representative prior items, compare action changes, and reopen only with an owner and trigger |

### Action contract

- `allow`: publish or keep visible only when the policy route and required
  context are satisfied; this is not a universal safety claim.
- `limit`: reduce reach, require a warning, or restrict an audience only when
  the exact user-visible effect and expiry are defined.
- `review`: hold or contain the item and create a queue receipt; the reviewer
  may `abstain`.
- `block`: prevent the requested action before a side effect; expose a reason
  and correction/appeal route.
- `remove`: apply a documented post-publication correction with a receipt,
  ownership, and rollback/reinstatement rule.
- `unknown`: preserve the item state and route to manual or hold when policy,
  context, modality, or provider availability is insufficient.

## Review and appeal contract

### Queue item

The fictional reviewer receives:

- `item_id`, `parent_id`, policy version, signal/model version, and created time;
- minimum context needed to decide, with a sensitive-content warning;
- category definitions, exclusions, severity/action matrix, and prior action;
- the exact question to answer and an `abstain/escalate` control;
- a redacted receipt ID and an explanation template, not an uncontrolled export
  of raw account data.

The reviewer does not receive unrelated conversation history, hidden system
prompts, credentials, or private content that is not needed for the decision.

### Decision and appeal states

| State | Meaning | Next owner |
| --- | --- | --- |
| `pending_review` | Publication is held or item is contained while a reviewer decides | reviewer lead |
| `reviewed_allow` | Reviewer finds no policy violation under the named version | marketplace operations |
| `reviewed_action` | Reviewer applies limit/block/remove with a reason | operations and creator support |
| `review_abstain` | Evidence or context is insufficient or unsafe to inspect | specialist reviewer |
| `appeal_pending` | Creator requested a correction; original receipt remains intact | second reviewer |
| `appeal_upheld` | Original action remains under the recorded policy | creator support |
| `appeal_reversed` | Action is corrected and learning case is created | operations + policy owner |
| `appeal_expired` | Eligibility window ended with a documented reason | creator support |

An appeal reversal is a quality signal, not automatically proof that the model
was wrong: inspect policy ambiguity, reviewer disagreement, context loss, and
provider signal quality separately.

## Evaluation slices

| Slice | Expected oracle | Evidence to retain |
| --- | --- | --- |
| clear allowed listing | `allow` with correct user-visible state | redacted item ID, policy version, action |
| clear violation by category | documented `review/block/remove` action | category, severity, reviewer or rule receipt |
| borderline context | `review`, `unknown`, or documented allow exception | context scope and rationale |
| false-pass candidate | expected safer action differs from observed | item ID, reviewer label, policy version |
| false-block candidate | legitimate item was blocked or removed | appeal or independent review outcome |
| locale/language variant | expected route for supported and unsupported locales | locale, modality, oracle, gap |
| image plus caption mismatch | preserve both signals and route on combined context | image/caption IDs and reviewer decision |
| embedded instruction/evasion | policy remains authoritative; no prompt override | attack slice ID and action receipt |
| provider timeout/unavailable | `manual`, `hold`, or approved bounded fallback | error class, TTL, side-effect state |
| reviewer disagreement | independent labels and adjudication | reviewer IDs, agreement, final rationale |
| appeal reversal | correction plus policy-learning classification | both decisions and version comparison |
| model/policy migration | representative comparison before reuse | baseline/candidate versions and decision diff |

Do not use one aggregate score as the release gate. Set denominators and
decision thresholds per slice, inspect the cost of false blocks and false
passes, and mark unmeasured slices `Not run`.

## Privacy, authority, and operations

- **Minimize:** send and retain the smallest content and context that can answer
  the policy question. Store references and hashes where raw content is not
  required.
- **Access:** separate reviewer, policy editor, operations, and appeal roles;
  record who saw sensitive content and who changed an action.
- **Retention:** define purpose, expiry, deletion, legal hold when applicable,
  and whether an appeal needs a minimal immutable receipt.
- **Authorization:** a model, reviewer, or content item cannot change policy
  definitions or grant itself publication authority.
- **Safety:** warn reviewers before sensitive content, allow abstention, rotate
  assignments when appropriate, and provide a human escalation route.
- **Observability:** correlate policy, item, signal, review, appeal, action, and
  outcome IDs without putting raw content, tokens, cookies, or personal data in
  a public log.

## Release and writeback

The fictional decision is `pilot`, not `ship`, because no provider, reviewer
capacity, language, accessibility, legal, or user outcome evidence was run.

### Pilot gate

- one named policy owner, reviewer lead, operations owner, and appeal owner;
- a fixed policy and signal version with a representative test set;
- manual fallback on provider failure and an explicit no-publication boundary;
- false-pass, false-block, locale, modality, evasion, disagreement, recovery,
  and privacy slices with denominators;
- reviewer safety and access controls, decision receipts, expiry, and rollback;
- stop if a critical category has an unbounded unknown route, appeal owner is
  missing, or a late detection cannot be contained.

### Writeback record

After the pilot, record:

1. policy and signal versions, item denominator, and observation window;
2. action counts by category, severity, locale, modality, and route;
3. false-pass/false-block candidates, reviewer disagreement, and appeal reversal;
4. provider failure, queue age, manual fallback, and late-detection receipts;
5. privacy/access exceptions and deletions;
6. `ship`, `revise`, `hold`, or `rollback` with the next smallest test.

## Not covered

This fictional reference does not establish classifier precision, recall,
calibration, fairness, language parity, legal compliance, reviewer wellbeing,
queue capacity, production enforcement, mobile/accessibility behavior, user
adoption, traffic attribution, user outcomes, or GitHub star growth.

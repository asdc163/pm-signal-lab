# Worked uncertainty-to-experience contract

This is a **fictional fixture** for a support-draft product. It demonstrates
how to connect evidence conditions to user-visible states and recovery. It does
not contain live policy data, a provider result, a real support session, a
comprehension study, a trust metric, or a production recommendation.

## Decision on the desk

We need to decide whether a read-only pilot may show an AI-assisted annual-plan
cancellation draft to a trained support agent. The agent may edit or discard
the draft; the product must not send a customer message or change an account.

- User/job: identify whether a cancellation reply is supported by the current
  policy, see what is missing, and prepare a reviewable draft.
- Workaround: the agent searches a policy page and writes a reply manually.
- Risk: high for financial interpretation and privacy; no external mutation in
  the pilot.
- Owner: fictional Billing Operations and Product Quality; names `Not provided`.
- Current decision: `Hold` until the state contract is implemented and the
  negative/recovery checks are run by an approved owner.
- Change rule: move to `Pilot` only if unsupported eligibility claims are
  blocked, source conflicts are visible, timeouts do not create duplicate
  actions, and agents can identify the next safe action in a task check.

## User/job and uncertainty boundary

The system may retrieve an approved policy snapshot and draft text for the
agent. It may show source locators, supported facts, missing account facts,
and policy conflicts. It may not decide the account's eligibility, invent an
exception, use another account as evidence, send the reply, or mutate billing.

The user-visible promise is: **"Help me prepare a source-linked draft I can
review."** It is not: **"Tell me the cancellation answer."**

The safe pilot supports `Observe` and `Draft` autonomy only. The send action is
outside the pilot and remains a human-owned, separate flow.

## Capability, evidence, and state ledger

| Stage | Observable event | Evidence | Missing/conflicting | Allowed action | State |
| --- | --- | --- | --- | --- | --- |
| identify policy | request `R-104` contains plan and date | policy snapshot `P-17` | account eligibility absent | retrieve and qualify | `working` then `partial` |
| draft reply | draft `D-22` cites `P-17` | cancellation window section | exception section is stale | show supported draft only | `low-support` or `conflict` |
| check eligibility | account lookup returns no approved field | none | eligibility cannot be verified | ask agent to inspect approved system | `needs-clarification` |
| prepare review | draft diff and source locators exist | source IDs and version | support owner not assigned | agent edits or discards | `approval/diff` for review, not send |
| policy request | response exceeds timeout | last confirmed event only | source freshness unknown | retry or manual route | `source-unavailable` |

`P-17`, `D-22`, and `R-104` are safe fixture IDs. A real implementation must
retain approved versions and timestamps without exposing private account data.

## User-visible state contract

| State | Trigger | Message | Controls | Receipt/oracle | Action |
| --- | --- | --- | --- | --- | --- |
| `first-run` | no saved input | "This workspace prepares a draft from an approved policy. It does not decide eligibility or send a reply." | open sample, add own note, manual route | fixture label; no live result | set expectation |
| `empty` | plan/date missing | "Add the plan and cancellation date to check the policy window." | add fields, use manual route | input validation event | ask for required input |
| `working` | retrieval started | "Checking the approved policy…" | cancel | retrieval start/finish event | wait or cancel |
| `partial` | policy supports date, account fact absent | "The cancellation window is supported. Account eligibility is not confirmed." | inspect source, add approved fact, continue qualified | supported field IDs + missing field | keep draft qualified |
| `needs-clarification` | plan type is ambiguous | "Which annual plan type should I check? This changes the policy section." | choose plan, edit input, manual route | clarification answer + route | ask one high-value question |
| `source-unavailable` | policy request times out | "I could not verify the policy, so I did not draft the exception." | retry, add approved source, manual route | request ID, timeout, retry state | abstain |
| `conflict` | `P-17` and `P-18` disagree | "Two approved policy versions disagree on the exception. Compare them before using this draft." | compare, choose owner route, discard | both version IDs + decision | block unsupported send |
| `low-support` | draft contains an unsupported eligibility claim | "This sentence is not supported by the checked policy. Remove it or add approved evidence." | edit, remove, inspect source, escalate | claim ID + source coverage | hard block claim |
| `approval/diff` | draft is ready for agent review | "Review the highlighted change and sources. Nothing will be sent from this pilot." | edit, accept draft, discard, export locally | draft version + edit receipt | human review only |
| `success` | reviewable draft and sources complete | "Draft prepared from 2 checked policy sections. Account eligibility remains your decision." | inspect, edit, discard, export | draft/source IDs | finish bounded task |
| `error` | unexpected non-policy failure | "The check stopped before a result was confirmed. Your note is still here." | retry safely, save locally, manual route | error class + last event | preserve work |
| `cancelled` | user cancels retrieval | "The check was cancelled. No draft was sent or account was changed." | resume, edit input, leave | cancellation event | close safely |
| `timeout-unknown` | request may have completed but receipt missing | "The result is unknown. We are checking the receipt before another request." | reconcile, wait, manual route | idempotency key + receipt status | prevent duplicate request |
| `handoff` | high-risk conflict or missing owner | "This needs a Billing Operations decision. We prepared a redacted packet; no answer was sent." | inspect packet, withdraw, wait | packet ID, destination, expiry | human route |
| `recovery` | source returns after timeout | "The policy is available again. Recheck the saved draft against version P-19 before continuing." | recheck, discard stale draft, manual route | new version + comparison | resume with freshness check |

The product should not combine `partial`, `conflict`, and `source-unavailable`:
the agent needs different next actions for each. The messages are intentionally
plain and bounded; they do not say that the system is "thinking" or attach an
uncalibrated confidence percentage.

## Confidence, progress, and provenance

| Signal | Fixture value | Meaning | User treatment |
| --- | --- | --- | --- |
| model confidence | `Not provided` | no approved user-facing interpretation | do not display |
| source support | 2 checked sections | support for identified policy claims | show locators and date |
| account eligibility | `Not available` | required fact is absent | qualify and ask for approved fact |
| policy eligibility | `Not evaluated` | product cannot decide account eligibility | human-owned decision |
| task completion | draft prepared, send not attempted | bounded draft work finished | show completed scope |
| user comprehension | `Not run` | no session result | cannot claim calibrated trust |

Progress labels map to recorded retrieval, policy-check, draft, and review
events. If the event is not recorded, the UI says `Checking status` or shows a
recovery route rather than narrating a hidden stage. Source locators include
the safe policy ID, section, version, and freshness timestamp. Raw tickets,
account identifiers, private URLs, credentials, and hidden prompts stay out of
the shared receipt.

## Control, clarification, and recovery

- Clarification asks for plan type because it changes the policy section; it
  preserves the entered date and note.
- Partial results allow source inspection, adding an approved fact, or a
  qualified draft. They do not present eligibility as confirmed.
- Conflict routes to compare or Billing Operations; a newer-looking source is
  not silently preferred without a declared policy rule.
- Timeout uses request ID `R-104` and an idempotency key. A retry first
  reconciles the receipt so it cannot create duplicate work.
- Cancel preserves the local note, stops the read-only request where possible,
  and states that no message was sent.
- High-risk review uses a draft diff and explicit agent acceptance, but the
  pilot has no send control. A future send flow would require a separate
  permission, preview, approval, audit receipt, and rollback/correction route.
- Handoff contains only safe IDs, the unresolved state, source versions,
  requested owner, expiry, and the next decision. It does not copy raw account
  content into a public issue or model prompt.

## Trust and UX evaluation

The fixture proposes these slices; all results are `Not run`:

| Question | Example oracle | Slice | Status |
| --- | --- | --- | --- |
| Can the agent identify supported versus missing facts? | after the task, name the supported section and missing eligibility field | partial / low-support | Not run |
| Does the agent notice a conflict? | choose compare/owner route rather than accept the draft | conflicting versions | Not run |
| Does the agent recover from timeout? | resume only after receipt reconciliation | timeout / duplicate retry | Not run |
| Does the agent overtrust fluent text? | reject an unsupported eligibility sentence | negative claim | Not run |
| Can the agent complete the bounded job? | produce an edited source-linked draft with no send | normal / recovery | Not run |
| Are state changes perceivable? | keyboard and screen-reader task completion | mobile / accessibility | Not run |
| Does translation preserve action strength? | distinguish `blocked`, `qualified`, and `verified` | locale | Not run |

The denominator, task environment, participant role, policy version, and
observation window must be fixed before a real run. Acceptance rate alone would
not show whether an agent understood that eligibility remained their decision.

## Failure, fallback, and release decision

The fixture decision is `Hold`: no UI state implementation, recovery test,
human review, accessibility run, provider behavior, or live policy receipt is
available. A future `Pilot` gate would require:

- unsupported or conflicting high-impact claims are visibly blocked;
- source ID/version and the missing boundary are inspectable;
- timeout and retry paths reconcile before another request;
- an agent can edit, discard, or hand off without sending or mutating an
  account;
- the state comprehension task has a declared oracle and denominator;
- privacy review confirms that receipts and handoff packets are redacted.

Fallback is the documented manual policy lookup. Rollback is disabling the
drafting route while preserving the manual workflow and its saved notes.

## Not covered

- No provider, model, prompt, policy API, source freshness result, or account
  eligibility lookup was run.
- No human participant, comprehension study, trust calibration result,
  accessibility session, locale review, latency measurement, or adoption signal
  exists.
- No send, refund, account mutation, external notification, or automatic
  handoff was implemented.
- No statistical threshold, provider recommendation, production safety claim,
  or GitHub traffic/star outcome is implied.

## Implementation handoff

1. Product Quality defines the state/event schema and approves the distinction
   between `partial`, `conflict`, `source-unavailable`, and `low-support`.
2. Billing Operations supplies safe policy locators and the owner/escalation
   rule; raw account records remain in the approved system.
3. Engineering stores versioned receipts, idempotency keys, local draft state,
   and a no-send pilot boundary.
4. UX writes the messages, focus/semantic behavior, mobile layout, and locale
   review cases against the state table.
5. Evaluation runs the comprehension, mismatch, recovery, high-risk, and
   accessibility slices before changing `Hold`.

## Review ask

The decision owner should approve the no-send boundary and the hard block on
unsupported eligibility. The policy owner should resolve one conflict anchor.
The evaluation owner should return one redacted timeout-recovery receipt and
one comprehension result before the pilot gate is reconsidered.

## Method notes

The method is consistent with current official documentation that treats
guardrails as checks around agent input/output or tool execution, and human-in-
the-loop flows as explicit approval pauses that can be rejected and resumed
with serialized run state. These links are method references only; they do not
validate this fictional contract or choose a provider:

- [OpenAI Agents SDK guardrails](https://openai.github.io/openai-agents-python/guardrails/)
- [OpenAI Agents SDK human-in-the-loop](https://openai.github.io/openai-agents-python/human_in_the_loop/)
- [OpenAI Agents SDK running agents](https://openai.github.io/openai-agents-python/running_agents/)
- [Google develop a generative AI application](https://docs.cloud.google.com/docs/ai-ml/generative-ai/develop-generative-ai-application)

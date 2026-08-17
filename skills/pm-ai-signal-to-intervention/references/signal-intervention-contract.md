# Worked signal-to-intervention contract

This is a **fictional fixture** for an AI-assisted support-draft pilot. It
demonstrates how to separate a noisy online signal from a high-impact hard
blocker, choose the smallest intervention, and define recovery. It does not
contain live telemetry, real customer data, a provider result, a production
flag change, user-harm measurement, or an adoption claim.

## Contents

- [Decision on the desk](#decision-on-the-desk)
- [Signal and evidence ledger](#signal-and-evidence-ledger)
- [Impact, scope, and urgency](#impact-scope-and-urgency)
- [Intervention decision](#intervention-decision)
- [User-visible state and controls](#user-visible-state-and-controls)
- [Verification, recovery, and rollback](#verification-recovery-and-rollback)
- [Learning and writeback](#learning-and-writeback)
- [Failure, fallback, and release decision](#failure-fallback-and-release-decision)
- [Not covered](#not-covered)

## Decision on the desk

We need to decide whether two signals from a fictional support-draft pilot
justify a product intervention for a support agent who needs a source-linked
cancellation reply. The product may prepare a draft but must not send a message
or change an account.

- User/job: review whether a draft is supported by the current policy and edit
  a safe reply.
- Critical journey: policy lookup → draft → human review; source-only manual
  lookup remains available.
- Owner: fictional Product Quality owner for the decision; Billing Operations
  owns high-risk policy review. Names are `Not provided`.
- Observation window: `Not provided`; fixture window is `Proposed`, not live.
- Action boundary: no provider call, feature flag change, customer message,
  account mutation, or replay is authorized by this packet.
- Current decision: `Hold` for release; propose a scoped `Human gate` for the
  privacy signal and `Inconclusive`/`Investigate` for the noisy quality signal.

The fixture intentionally does not use the aggregate quality signal to justify
a global rollback because route exposure and denominator semantics changed.
The privacy signal is handled more conservatively because potential harm is
high even though prevalence is not measurable.

## Signal and evidence ledger

All values below are fictional fixture values and are not observed results.

| Field | `S-014` unsupported-claim signal | `S-021` privacy signal |
| --- | --- | --- |
| Source | redacted review/eval event | redacted high-risk review event |
| Event definition | draft claim lacks support for eligibility | draft includes an account detail outside allowed scope |
| Signal status | Observed fixture | Observed fixture |
| Eligible exposure | `Not reconciled` after route addition | high-risk account slice, exact exposure `Not provided` |
| Numerator/denominator | `Not measurable` | `Not measurable` |
| Baseline/comparator | prior window uses a different route mix | no comparable baseline supplied |
| Segment | new model route may be overrepresented | high-risk account scope |
| Freshness | `Proposed fixture timestamp` | `Proposed fixture timestamp` |
| Confounders | route, traffic, sampling, evaluator change | data-scope review may have changed |
| Safe locator | `review-case-class / S-014` | `review-case-class / S-021` |
| Measurement gap | exposure and event semantics need reconciliation | prevalence and external-effect outcome unknown |

No rate is calculated. The quality signal cannot support a global threshold
because the eligible exposure and route mix are not comparable. The privacy
signal has a hard-risk classification independent of a valid prevalence rate.

## Impact, scope, and urgency

| Signal | Impact | Evidence confidence | Prevalence | Scope | Urgency |
| --- | --- | --- | --- | --- | --- |
| `S-014` | material support-agent rework; unsupported claim could mislead | low/medium; fixture evidence is incomplete | Not measurable | new route only while checking | investigate today |
| `S-021` | critical privacy boundary risk | medium; one redacted review case | Not measurable | high-risk account slice and draft claim class | immediate |

The fields remain separate. `S-021` does not become less urgent because its
denominator is missing. `S-014` does not become a global incident because its
fixture rate is not comparable to the prior route mix.

## Intervention decision

### Ladder selection

| Signal | Selected decision | Status | Owner | TTL | Rationale |
| --- | --- | --- | --- | --- | --- |
| `S-014` | `Inconclusive` + bounded `Investigate`; `Qualify` new route | Proposed | Product Quality | until exposure is reconciled | limit unsupported claim display while preserving source-only work |
| `S-021` | `Human gate` and scoped `Pause` for high-risk claim class | Proposed | Billing Operations | until hard-gate verification passes | privacy risk requires containment without waiting for prevalence |

The proposed `S-014` rule is:

- `inconclusive_if`: exposure, route mix, event definition, or comparator is
  not comparable;
- `qualify_if`: a new-route draft has a support gap but no hard privacy or
  external-side-effect failure;
- `hold_if`: the route cannot show the missing-support state or safe manual
  fallback;
- `rollback_if`: the scoped qualification fails to block unsupported claims or
  a hard guardrail worsens;
- `ship_if`: only after the owner approves the denominator, negative slice,
  and post-intervention verification window.

The proposed `S-021` rule is:

- contain high-risk drafts and route them to manual policy review;
- preserve a redacted receipt and stop any send/mutation path;
- keep the gate until a domain owner verifies scope, policy, and a clean
  negative slice;
- restore only after the post-fix observation window and privacy oracle pass.

Both decisions are `Proposed`; neither was applied to a live system.

## User-visible state and controls

If the scoped intervention changes the agent experience, use plain copy:

| State | Message | Controls | Receipt/oracle |
| --- | --- | --- | --- |
| qualified new route | "This draft has a policy gap. The supported lines are kept; review the source or use the manual policy path before continuing." | inspect source, edit/remove claim, manual route, discard | claim ID and source coverage |
| high-risk gate | "This draft needs Billing Operations review before it can be used. No message was sent." | inspect redacted reason, hand off, cancel, keep note | gate ID, owner, status |
| source-only fallback | "Drafting is limited for this case. You can check the approved policy and write the reply manually." | open manual route, save note, leave | fallback event and saved-note status |
| investigating | "We are checking this route. The last confirmed state is shown below; your saved note is unchanged." | wait, cancel, manual route | signal ID and last event |
| recovered | "The route is available again after a policy check. Review the source version before using the draft." | recheck, edit, discard | post-fix version and window |

Never show the internal label `S-021`, raw telemetry, account content, or an
uncalibrated severity number to the support agent. The user needs the
consequence and next safe action, not an impressive dashboard.

Mobile behavior keeps the state and manual fallback visible without requiring a
wide table. Accessibility exposes status, gate reason, current focus, and
available actions through semantic names, focus order, live updates, and
non-color cues. Locale review must preserve the difference between `qualified`,
`blocked`, `paused`, and `verified`.

## Verification, recovery, and rollback

The fixture proposes these oracles; all execution status is `Not run`:

| Transition | Oracle | Status |
| --- | --- | --- |
| `S-014` → qualified | unsupported claim is visibly marked and manual route completes the bounded job | Not run |
| `S-021` → human gate | high-risk claim cannot pass to send/mutation and receipt identifies owner | Not run |
| containment | only the declared route/claim class changes; unaffected users retain the safe path | Not run |
| privacy | no raw account field crosses the public packet or unauthorized tool path | Not run |
| recovery | saved note survives cancel/retry and no duplicate external action occurs | Not run |
| restore | post-fix negative and high-risk slices pass during a declared observation window | Not run |
| rollback | prior safe route can be restored and its current version is checked | Not run |

The safe fallback is manual policy lookup and a human-owned response. A retry
must reconcile any pending receipt before attempting another request. TTL expiry
does not restore the route automatically; it creates a new decision point.

## Learning and writeback

The next learning question is:

> Can Product Quality distinguish route-specific unsupported claims from a
> denominator or instrumentation change quickly enough to choose a scoped
> intervention without hiding a high-risk privacy failure?

Write back:

- `S-014` exposure reconciliation and event-definition comparison to the
  observability contract;
- one redacted unsupported-claim case to the evaluation/regression dataset;
- `S-021` hard-gate review outcome to the risk/control and incident owners;
- one comprehension/recovery task asking an agent to identify what is blocked,
  what remains available, and how to proceed safely;
- the threshold, TTL, and false-positive review once an approved denominator
  exists.

No external message, issue, flag, or telemetry mutation is performed by this
fixture.

## Failure, fallback, and release decision

The fixture decision is `Hold`. It has no live denominator, no authorized
owner, no executed intervention, no verified privacy result, and no recovery
run. A future `Pilot` gate would require:

- a comparable exposure definition and route/version boundary for `S-014`;
- a hard privacy scope and manual owner for `S-021`;
- a safe user-visible qualified/gated state and manual fallback;
- deduped receipts, preserved notes, and no side-effect replay;
- negative, high-risk, segment, mobile, accessibility, and locale checks;
- a post-intervention observation window and rollback target.

## Not covered

- No live dashboard, event stream, trace, provider, model route, feature flag,
  policy system, or account record was accessed.
- No alert precision/recall, prevalence, user harm prevented,
  time-to-containment, time-to-recovery, task completion, comprehension,
  adoption, traffic, cost, or statistical result was measured.
- No intervention, pause, rollback, restore, customer communication, issue,
  or external write occurred.
- No provider, monitoring vendor, severity score, or production release is
  recommended.

## Implementation handoff

1. Product Quality freezes event definitions, route/version boundaries,
   exposure, denominator, and the `Inconclusive` rule.
2. Billing Operations owns the privacy gate, manual fallback, and restore
   approval for the high-risk claim class.
3. Engineering preserves safe signal/receipt IDs, deduplicates retries,
   prevents send/mutation, and exposes the manual route.
4. UX writes qualified, gated, investigating, and recovered states with mobile,
   accessibility, and locale oracles.
5. Evaluation runs the negative, high-risk, segment, recovery, and
   comprehension checks before changing `Hold`.

## Review ask

The decision owner should approve one denominator and comparator for `S-014`,
one hard-block policy for `S-021`, one owner/TTL pair, and one recovery receipt
before any live intervention is considered.

## Method notes

The method boundary is consistent with current official documentation that
describes agent tracing as a record of model generations, tool calls, handoffs,
guardrails, and custom events that can be used to monitor workflows, and that
places guardrails at distinct input/output/tool boundaries. The human-in-the-
loop guide describes explicit approval pauses and resume behavior. These are
method references only; they do not validate this fictional fixture or select
a provider:

- [OpenAI Agents SDK tracing](https://openai.github.io/openai-agents-python/tracing/)
- [OpenAI Agents SDK guardrails](https://openai.github.io/openai-agents-python/guardrails/)
- [OpenAI Agents SDK human-in-the-loop](https://openai.github.io/openai-agents-python/human_in_the_loop/)
- [OpenAI Agents SDK running agents](https://openai.github.io/openai-agents-python/running_agents/)

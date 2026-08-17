# Worked value to retention contract: weekly product signal review

This is a **fictional fixture**. It is a worked method example, not a live
cohort, model evaluation, user study, notification experiment, or retention
result. No provider is called and no message is sent.

## Contents

- [Method notes](#method-notes)
- [Decision on the desk](#decision-on-the-desk)
- [Longitudinal value contract](#longitudinal-value-contract)
- [Cohort and event contract](#cohort-and-event-contract)
- [Re-entry gate](#re-entry-gate)
- [States and evidence](#states-and-evidence)
- [Rollout and decision](#rollout-and-decision)
- [Not covered](#not-covered)

## Method notes

These references are method inputs, not evidence that the fictional product
works.

| Source | What it supports here | Boundary |
| --- | --- | --- |
| [PostHog: measuring product-market fit](https://newsletter.posthog.com/p/measuring-product-market-fit-is-more) | Meaningful usage should be represented by a high-value event, and retention can compare first high-value use with a later high-value use. | Its examples and time windows are not a benchmark for this product; the fixture has no live cohort. |
| [PostHog: activation metrics](https://newsletter.posthog.com/p/wtf-is-activation-and-why-should?action=share) | Activation candidates are product-specific and can be compared with later behavior rather than assumed from a single event. | Correlation with retention is not causal lift, and an owner-run fixture is not adoption evidence. |
| [PostHog: agent-first product engineering](https://newsletter.posthog.com/p/the-golden-rules-of-agent-first-product?r=3gfyvm&triedRedirect=true) | Event selection needs product-specific guidance; a convenient default event can misrepresent activation or retention. | A vendor-specific event recommendation is not copied into this provider-neutral contract. |
| [OpenFeature introduction](https://openfeature.dev/docs/reference/intro/) | Runtime flags can support canary, staged rollout, experiments, or safe degradation when a product already has a flag system. | A flag does not prove exposure, assignment, retention, or a tested rollback. |
| [OpenAI Apps SDK help](https://help.openai.com/en/articles/12515353-build-with-the-apps-sdk) | Chat behavior, interface, testing, and app submission are separate surfaces. | A preview SDK or app directory cannot establish a user's recurring job or retention. |

The design consequence is narrow: measure a repeat job, not attention; diagnose
why a user did not return before adding an intervention; and treat consent,
freshness, suppression, and the manual route as product states rather than
campaign footnotes.

## Decision on the desk

### Fictional user and job

A product manager uses a weekly product-signal review to decide which risk or
opportunity should enter the next planning discussion. In the first session,
the PM accepted one source-backed risk and recorded a follow-up. The team is
considering an “updated signals” card after the next weekly window.

The product may summarize approved signal notes and keep a source locator. It
may not send a notification, edit a roadmap, assign an owner, or convert an
AI suggestion into a decision automatically.

### Decision

`Pilot` a user-initiated repeat-value path and a clearly labelled card mock.
Do not call the card a reactivation intervention until the team knows that a
new weekly review is a real job and that the card does not obscure stale or
unsupported signals.

### Evidence boundary

The only input is a fictional fixture. There is no event stream, cohort,
quality evaluation, retention window, opt-out history, or direct user session.
All observed fields below are `Not run` unless explicitly labelled otherwise.

## Longitudinal value contract

| State | User job and artifact | Context/freshness | Control and fallback | Status |
| --- | --- | --- | --- | --- |
| First value | PM accepts or edits one source-backed signal and records a follow-up for the planning discussion | Source snapshot ID and review date | Inspect source, mark unsupported, or use notes manually | Fixture only |
| Repeat value | PM reviews newly arrived signals in a later weekly planning window and records a different follow-up | New signal set; prior snapshot is historical | Start a fresh review or use the source list | Not run |
| Retained value | Repeat value occurs in the next active weekly window while the product review still exists | Active review cadence and source freshness | If the review is paused, classify as not expected to return | Not run |
| No return / one-off | No active review, no new signals, or manual process wins | Reason class required; no inferred churn | Do not force a card or reminder | Not run |
| Reactivation | A prior reviewer returns after missing one active weekly window | Current signals must be revalidated | User-initiated card first; no outbound message | Not run |
| Suppressed | PM hides the updated-signals card or disables re-entry prompts | Suppression choice and expiry policy | Preserve the choice; manual route remains | Not run |

### Why the return event is value

The return event is not “opened the review.” It requires a new signal set,
source inspection, and a changed planning artifact. This is a hypothesis. A
real task observation must check that the follow-up changed a decision or
planning discussion rather than merely adding a second record.

## Cohort and event contract

### Cohort definition

- **Eligible unit:** workspace with an active weekly product review, an approved
  signal source, and a PM role. Exact authorization is `Not provided`.
- **Start event:** `first_value_completed` after one signal is source-checked
  and one follow-up is recorded.
- **Return event:** `repeat_value_completed` after a later, distinct signal set
  is source-checked and one follow-up is recorded in an active review.
- **Window:** next active weekly review window. Timezone, holiday, and
  late-arrival rules are `Not provided`.
- **Denominator:** eligible workspaces that completed first value and remained
  eligible for a later active review window. Workspaces with a paused or
  completed review are classified, not silently dropped.
- **Identity:** workspace is the primary unit because the follow-up belongs to
  a team; user-level ownership is `Not provided`.
- **Freshness:** a signal snapshot has a version and captured-at timestamp;
  stale snapshots cannot silently satisfy repeat value.

### Event table

| Event | Completion boundary | Properties / privacy | QA source | Status |
| --- | --- | --- | --- | --- |
| `eligible_workspace` | Active review and approved source check completes | workspace pseudonym, role class, review state; no signal text | eligibility receipt | Not run |
| `first_value_completed` | Source opened and first follow-up saved | snapshot ID, action class, product version; no raw note | task trace and event | Not run |
| `repeat_value_completed` | New snapshot source-checked and new follow-up saved | workspace, review window, snapshot class; no raw note | cohort query plus task trace | Not run |
| `review_opened` | Review view becomes visible | surface, locale, host; no content | diagnostic only | Not run |
| `card_shown` | Updated-signals card is visible to an eligible workspace | variant, relevance class, expiry; no content | exposure receipt | Not run |
| `card_clicked` | User opens the card | card ID, surface; no signal text | diagnostic only | Not run |
| `manual_route` | User chooses source list or notes | reason class, no free text | behavior trace | Not run |
| `context_stale` | Snapshot is expired or replaced | age bucket, snapshot class; no raw data | freshness check | Not run |
| `mute_or_suppress` | User hides the card or re-entry route | preference state, expiry; no personal profile | preference receipt | Not run |
| `quality_or_trust_guardrail` | Unsupported claim, correction, complaint, or trust issue recorded | category and redaction status; no raw text | review/eval/support | Not run |

`review_opened`, `card_shown`, and `card_clicked` are useful diagnostics but
do not satisfy `repeat_value_completed`. If the event arrives before the
source check or follow-up save, the event contract fails and the retention
decision is held.

### Candidate comparison

| Candidate | Definition | Keep only if |
| --- | --- | --- |
| A: repeat review | New signal set plus source check plus follow-up in next active window | direct task trace shows the follow-up matters |
| B: repeated review quality | Candidate A plus no unsupported-claim correction | quality oracle is calibrated and privacy-safe |
| C: card-assisted repeat | Candidate A among eligible workspaces exposed to the card | assignment/exposure and a holdout are valid; causal effect is not assumed |

Candidate A is the pilot oracle. B and C are analysis hypotheses, not success
claims.

## Re-entry gate

The proposed updated-signals card is an in-product suggestion, not an outbound
campaign. Before it is shown, the product must have:

- a current active review and a new signal snapshot;
- a plain reason: “New signals are available for this review”;
- a source timestamp, freshness state, and path to inspect before acting;
- a dismiss/mute control and a route to the source list;
- no raw signal content in an analytics property;
- a relevance expiry so an old card disappears;
- a manual route when the AI summary, source, or host is unavailable.

If a future email, push, or external message is proposed, this contract is not
permission to send it. The product must add explicit consent, channel policy,
frequency/quiet-hour controls, identity and approval boundaries, reconciliation,
and a kill switch. Those side effects require their own review.

### Intervention exposure sequence

```text
eligible -> assigned (if a comparison exists) -> card shown -> card opened
  -> source inspected -> repeat-value job completed
  -> suppressed / muted / manual route / error as applicable
```

The sequence keeps an impression or click from being mistaken for a completed
job. A user-initiated route has no intervention assignment; keep that difference
visible in any comparison.

## States and evidence

| State | Message | Preserved work and control | Oracle |
| --- | --- | --- | --- |
| active repeat | “New signals are available for this review. Check the source before updating the follow-up.” | Current review and prior note remain visible | User completes source check and new follow-up; Not run |
| no return / one-off | “There is no active review or new signal set right now.” | No pressure; source list remains available | Not counted as churn; Not run |
| stale context | “This signal snapshot is out of date. Open the current source list.” | Historical note is labelled; refresh or manual route | No stale claim is used; Not run |
| quality drift | “This summary may be incomplete. Check the source lines before using it.” | Original source and correction route | User can reject without losing source; Not run |
| card shown | “New signals are available.” | Dismiss, mute, inspect source, or open review | Relevance and controls are clear; Not run |
| card suppressed | “Updates are muted. Open the review when you choose.” | Suppression persists; user-initiated route remains | No hidden resurfacing; Not run |
| host/provider mismatch | “The summary is unavailable. Use the source list manually.” | Review ID and source list preserved | Core job remains possible; Not run |
| timeout/unknown | “The last review is incomplete. Check the receipt before trying again.” | Receipt and current snapshot | No duplicate follow-up; Not run |

### Behavioral test slices

- **Normal:** a PM opens the current card, inspects one new source, and records
  a follow-up that belongs to the current planning discussion.
- **Friction:** the snapshot changed since the last review; the PM sees the
  freshness state and can refresh or use the source list without losing prior
  work.
- **Mismatch:** the assistant is unavailable or the review is paused; the PM
  sees no misleading reminder and can finish manually if needed.
- **Attention-only negative:** the PM opens or clicks the card but does not
  inspect a source or record a follow-up; expected result is not retained value.
- **Privacy negative:** a raw signal, private URL, or user profile appears in
  event properties; expected result is `FAIL` and the release is held.
- **Suppression negative:** the card reappears after mute without a declared
  expiry; expected result is `FAIL`.
- **Causality negative:** card-exposed workspaces are compared with all users
  without assignment/exposure evidence; expected result is `FAIL`.

These are oracles, not results. Browser, device, assistive technology, model,
provider, analytics, and real-user runs are `Not run` for this fixture.

## Rollout and decision

### Smallest test

Run a bounded task session over two fictional weekly review windows. Compare a
user-initiated entry with a card mock. Observe whether the PM can explain the
repeat job, notice changed context, inspect a source, record a follow-up, and
mute the card. Do not send a message, connect a provider, or calculate a
retention rate.

### Proposed rollout packet

- **Audience:** one non-owner pilot cohort with active weekly reviews; size and
  eligibility source `Not provided`.
- **Method:** manual card prototype or existing staged flag; do not add a flag
  vendor only for this test.
- **Observation:** next active weekly window; exact timezone and late event
  handling `Not provided`.
- **Primary measure:** `repeat_value_completed` among eligible workspaces that
  completed first value and remained eligible.
- **Guardrails:** source inspection/comprehension, unsupported/corrected
  signals, stale-context use, mute/suppression, manual fallback, latency/cost,
  support burden, and privacy/permission incidents.
- **Kill switch:** hide the card and preserve the source-list route.
- **Rollback:** stop new card exposures, preserve suppression, reconcile
  unknown receipts, label historical cards, and return to user-initiated/manual
  review.
- **Review:** inspect task traces and event QA before reading any percentage;
  no causal claim without valid assignment/exposure and a suitable comparison.

### Decision rule

```text
Ship / scale if repeat value is a valid job oracle, the cadence is defensible,
event boundaries and denominator are trustworthy, freshness and trust checks
pass, and guardrails remain within bounds.

Pilot if the contract and manual fallback are ready but live repeat behavior is
unverified.

Iterate if the repeat job exists but stale context, quality, copy, control, or
re-entry friction needs a named change.

Hold if non-return cannot be classified, the event is attention-only, the
cohort is mixed, or exposure/identity/privacy evidence is missing.

Rollback if the card causes stale-context use, spam, trust loss, data exposure,
suppression failure, or weaker core job success.

Need evidence if the claim depends on real retention, causal lift, quality drift,
comprehension, provider compatibility, production safety, adoption, or stars.
```

**Current decision:** `Pilot` the repeat-value contract and user-initiated path;
`Need evidence` for retention improvement, causal card effect, quality,
production safety, adoption, or star claims.

## Not covered

- live model output, provider, host, MCP server, Apps SDK app, or connector;
- real user, workspace, cohort, event stream, assignment, holdout, or
  retention calculation;
- source authority, freshness beyond the fixture contract, semantic accuracy,
  or quality calibration;
- email, push, messaging, campaign tooling, notification sending, or external
  side effects;
- mobile, assistive-technology, translated, cost, latency, privacy, security,
  or production behavior beyond the proposed gates;
- evidence that repeat use, reactivation, retention, PMF, adoption, traffic, or
  GitHub stars improved.

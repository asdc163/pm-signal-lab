# Worked first-use to activation contract: release risk brief

This is a **fictional fixture**. It is a worked method example, not a live
activation study, model evaluation, host compatibility result, analytics
implementation, or retention analysis. No provider is called and no external
state is changed.

## Contents

- [Method notes](#method-notes)
- [Decision on the desk](#decision-on-the-desk)
- [First-use contract](#first-use-contract)
- [Activation candidates](#activation-candidates)
- [Instrumentation and guardrails](#instrumentation-and-guardrails)
- [States and behavior evidence](#states-and-behavior-evidence)
- [Rollout and release decision](#rollout-and-release-decision)
- [Not covered](#not-covered)

## Method notes

These sources are method inputs. They do not prove that the fictional product
is useful, safe, compatible, adopted, or ready for production.

| Source | What it supports here | Boundary |
| --- | --- | --- |
| [OpenAI Apps SDK help](https://help.openai.com/en/articles/12515353-build-with-the-apps-sdk) | An app can define chat behavior and an interface, and testing is a separate step from building or submission. | Preview documentation does not prove a private app, host behavior, directory acceptance, or user success. |
| [OpenAI apps in ChatGPT](https://openai.com/index/introducing-apps-in-chatgpt/) | A chat-native app may be discovered or suggested in context, and first connection/data disclosure is a user-facing boundary. | A discoverable entry point is not activation; current availability and access still need live verification. |
| [MCP Apps overview](https://modelcontextprotocol.io/extensions/apps/overview) | Host support can vary; a richer UI should have a safe fallback, and sandbox/permission boundaries belong in the contract. | A protocol or UI resource is not evidence of task comprehension, security approval, or cross-client behavior. |
| [OpenFeature introduction](https://openfeature.dev/docs/reference/intro/) | Runtime flags can support staged rollout, canary, experiments, or a safe degradation path when a flag system exists. | A feature flag does not prove exposure, first value, retention, or a rollback that was actually tested. |
| [PostHog activation method](https://newsletter.posthog.com/p/wtf-is-activation-and-why-should?action=share) | Activation is product-specific, may combine events, and candidate definitions should be checked against meaningful later behavior. | The article's examples are not a benchmark for this product; this fixture has no real denominator or retention data. |

## Decision on the desk

### User and job

A product operations lead needs to answer: **what should the release review
look at before approving a version?** The current workaround is to compare
three note collections manually and keep a separate risk list. The fictional
assistant may summarize supplied material and show locators. It may not assign
owners, send a status update, approve a release, or change the plan.

### Decision

`Pilot` a first-use path for a small, eligible workspace cohort only after
normal, friction, mismatch, privacy, and instrumentation checks are designed.
The product decision is not `Ship`: no live user, source, host, event, or
repeat-value evidence exists.

### Constraints

- The release workspace and three approved note collections are fictional
  inputs. Their authority and freshness are `Not run`.
- The first-value claim is limited to a user identifying, inspecting, and
  correcting one risk that changes the review agenda.
- The assistant can show source locators, but this example does not evaluate
  retrieval or claim accuracy; that belongs to a grounding/evaluation route.
- The review note may be saved locally in the fixture. There is no owner,
  notification, approval, or release-plan mutation.

## First-use contract

| Stage | User need and copy | Required context | Control and fallback | Status |
| --- | --- | --- | --- | --- |
| Discover | “Build a release risk brief from approved notes.” | None | Start, read details, or leave | Not run |
| Confirm fit | “This review uses the selected release and approved collections.” | Eligible role and workspace | Choose another release or manual review | Not run |
| Prepare context | “Select up to three collections. We will show the selected IDs before review.” | Release version, collection IDs, purpose | Remove a collection; continue as partial; leave | Not run |
| First value | “Review one risk, inspect its locator, then accept, edit, or mark unsupported.” | Brief plus locators | Text review and manual comparison | Not run |
| Recover / leave | “The result is unknown. Check the receipt before retrying.” | Selection and receipt | Reconcile, retry once if safe, or export selection | Not run |
| Repeat value | “Review a different release or changed collection set.” | New eligible release | Start a fresh review; do not reuse stale claims | Not run |

The first-use promise is deliberately narrow. It does not say “AI finds all
risks” or “approve releases faster.” Those are unsupported claims.

## Activation candidates

| Candidate | Definition | Why it may indicate value | What is missing |
| --- | --- | --- | --- |
| A: first value | In one eligible session, user identifies one risk, opens one locator, and accepts/edits/marks it unsupported | The user used the brief to change a review artifact | Direct task observation, event QA, and semantics |
| B: repeat review | Candidate A plus a second distinct release review within 7 days | Repeat job may be stronger than setup completion | Real cohort, window, and repeat-value correlation |
| C: review note | Candidate A plus a saved review note within 7 days | Saving may show intent to carry the work forward | Note usefulness, later decision, and false-positive rate |

**Selected for the pilot:** Candidate A as the first-value oracle. Candidate B
and C remain hypotheses. No candidate is called the activation metric until a
declared observation window and a meaningful later signal are available.

**Eligibility:** an approved product operations role and a workspace with the
fictional release and collection permissions.

**Exposure:** the eligible user actually reaches the “Build a release risk
brief” entry surface. Assignment to a rollout variant is separate.

**Unit:** workspace for the team job; individual user identity is
`Not provided`. If the real product uses individual analysis, that decision
must be recorded before events are shipped.

## Instrumentation and guardrails

| Event or guardrail | Completion boundary | Properties / privacy | Source and QA | Status |
| --- | --- | --- | --- | --- |
| `eligible` | Role and workspace check completes | workspace pseudonym, role class, product version; no notes | eligibility service; QA against approved fixture | Not run |
| `exposed` | Entry surface is visible to an eligible workspace | surface, variant, host class, locale; no prompt or note text | client/server receipt comparison | Not run |
| `context_ready` | Release and at least one approved collection are confirmed | count and IDs only if permitted; no raw content | event after confirmation, not on open | Not run |
| `first_value_completed` | User acts on one risk after opening a locator | risk ID, action class, source class; no raw risk text | task trace plus event | Not run |
| `correction_or_manual_route` | User edits, rejects, or leaves for manual review | action class and reason class; no free text | behavior trace and privacy scan | Not run |
| `error_timeout_retry` | A bounded failure or reconciled retry is recorded | error class, receipt ID, host class; no secret | deterministic negative cases | Not run |
| `repeat_value_candidate` | A second distinct release reaches the first-value oracle | workspace, release class, window; no notes | cohort query and task review | Not run |
| trust/privacy guardrail | User cannot identify why data was used, or a disallowed field leaves the product | complaint class and redaction status | privacy review and UX session | Not run |
| quality/cost guardrail | Unsupported risk, latency, or cost exceeds declared bound | category, duration/cost bucket; no content | evaluation and server receipt | Not run |

The completion boundary matters. `brief_opened` is a diagnostic event. It is
not first value. A client click is not enough if the brief never renders or if
the user cannot inspect a locator.

## States and behavior evidence

| State | User-visible message | Preserved work and control | Oracle |
| --- | --- | --- | --- |
| empty | “Choose a release and up to three approved note collections to begin.” | Nothing collected; choose or leave | User can name the next action; Not run |
| loading | “Checking the selected note collections.” | Release and IDs | No invented model-progress language; Not run |
| partial | “One collection is missing. This brief may be incomplete.” | Available IDs; continue qualified or manual route | User notices the limitation; Not run |
| permission refused | “The collection was not connected. No other source was used.” | Available IDs | No silent source expansion; Not run |
| unsupported host | “This host cannot show the rich brief. The labelled text review is available.” | Same locators and selection | The job remains possible; Not run |
| unsupported result | “This risk is not supported by the available locators.” | Original risk, locator, and correction | User can mark unsupported; Not run |
| timeout | “The result is unknown. Check the receipt before trying again.” | Receipt and selection | No duplicate run before reconcile; Not run |
| correction | “Your edit is saved as a review note. The original risk remains visible.” | Original and edited values | User can compare and leave; Not run |
| skip / later | “You can return to this release review later.” | Local selection if allowed | User is not trapped in setup; Not run |

### Behavioral test slices

- **Normal:** the reviewer identifies the release job, confirms the selected
  collections, finds one risk, opens a locator, and accepts or edits it.
- **Friction:** one collection is missing; the reviewer continues qualified or
  chooses manual review without losing the other selections.
- **Mismatch:** the host lacks the rich UI or the locator is unsupported; the
  reviewer can use labelled text and does not infer a verified risk.
- **Negative instrumentation:** the event fires when the assistant is opened
  but before the locator or review action exists; expected result is `FAIL`.
- **Privacy:** analytics includes note text or a private URL; expected result is
  `FAIL` and the release is held.
- **Recovery:** a timeout is retried twice without reconciliation; expected
  result is `FAIL` because a duplicate outcome is possible.

These are test oracles, not test results. No browser, device, assistive
technology, provider, or analytics endpoint was run for this fixture.

## Rollout and release decision

### Smallest test

Use a fictional fixture renderer, paper prototype, or bounded local task
session. Compare the assistant path with the manual review path. Capture task
trace, state transitions, observed first-value action, mismatch, recovery,
privacy, and comprehension notes. A synthetic or agent run can find missing
states; it cannot prove activation or retention.

### Proposed rollout packet

- **Audience:** one non-owner pilot cohort with approved release notes;
  exact size `Not provided`.
- **Window:** seven days for Candidate B; first-value observation window is
  `Not provided` until the real job cadence is known.
- **Variant:** staged flag if the product already has one; otherwise a manual
  pilot. Do not add a flag service for this contract alone.
- **Kill switch:** hide the AI entry surface and preserve the manual review
  route.
- **Rollback:** stop new runs, reconcile unknown receipts, preserve local
  selections, and return to manual comparison. No release-plan mutation exists
  in this scope.
- **Review:** compare the first-value oracle, guardrails, qualitative notes,
  and event validity before interpreting any rate.

### Decision rule

```text
Ship / scale if the first-value oracle is valid, event boundaries are correct,
the normal/friction/mismatch checks pass, and privacy/trust/quality/cost
guardrails stay within declared bounds.

Pilot if the contract and fallbacks are ready but live behavior is unverified.

Iterate if reviewers reach value but a named context, copy, recovery, or host
friction blocks reliable repeat use.

Hold if eligibility, exposure, identity, event semantics, source permissions,
or the denominator is not trustworthy.

Rollback if the product leaks disallowed context, causes harmful overtrust,
duplicates a side effect, or blocks the manual job.

Need evidence if the claim depends on real activation, retention, quality,
comprehension, provider compatibility, production safety, or adoption.
```

**Current decision:** `Pilot` for a bounded non-owner task session, then
`Need evidence` for activation, retention, quality, safety, or adoption claims.

## Not covered

- live model output, provider choice, MCP server, Apps SDK app, or host;
- retrieval freshness, source authority, risk semantic accuracy, or citation
  correctness;
- real user comprehension, accessibility-device behavior, mobile behavior,
  retention, PMF, or repeat-value correlation;
- event delivery, identity resolution, analytics implementation, experiment
  randomization, feature-flag operation, cost, latency, privacy, or security
  review;
- approval, owner assignment, notification, release-plan mutation, or any
  other external side effect;
- production readiness, adoption, traffic, GitHub stars, or evidence that this
  method improves any of them.

# Worked intent-to-discovery contract: accessibility review

This is a **fictional fixture**. It is a worked method example, not a live
model route, provider result, host compatibility test, permission audit, user
study, or discovery-quality measurement. No URL is opened and no external state
is changed.

## Contents

- [Method notes](#method-notes)
- [Decision on the desk](#decision-on-the-desk)
- [Intent and capability set](#intent-and-capability-set)
- [Route and receipt contract](#route-and-receipt-contract)
- [States and evaluation](#states-and-evaluation)
- [Rollout and decision](#rollout-and-decision)
- [Not covered](#not-covered)

## Method notes

These sources inform the contract; they are not evidence that the fictional
route works.

| Source | What it supports here | Boundary |
| --- | --- | --- |
| [OpenAI: apps in ChatGPT](https://openai.com/index/introducing-apps-in-chatgpt/) | Apps may be called by name or surfaced when relevant in conversation; first connection has a data-sharing disclosure boundary. | A product announcement does not prove suggestion accuracy, current availability, or user comprehension. |
| [OpenAI Apps SDK help](https://help.openai.com/en/articles/12515353-build-with-the-apps-sdk) | App logic, chat behavior, interface, testing, and submission are separate concerns; privacy and functionality are review inputs. | Preview documentation is not a host test, directory approval, or production evidence. |
| [MCP Apps overview](https://modelcontextprotocol.io/extensions/apps/overview) | A host can render an app inside a conversation and route through host capabilities subject to consent; client support varies. | One supported host does not prove cross-host behavior or safe task completion. |
| [MCP Apps API overview](https://apps.extensions.modelcontextprotocol.io/api/documents/Overview.html) | Discovery metadata, host capability negotiation, and progressive fallback keep a richer UI from being a universal requirement. | Protocol lifecycle descriptions do not prove route relevance, authority, or first value. |
| [OpenFeature introduction](https://openfeature.dev/docs/reference/intro/) | A runtime flag can support canary, staged rollout, experiment, or degradation when the product already has that infrastructure. | A flag does not prove exposure, routing quality, or rollback readiness. |

The design consequence is small: connect job intent to a candidate capability,
show why a suggestion appears, refuse to guess when the route changes scope or
permission, and preserve a simpler path. Tool schema, model choice, approval,
and first value belong to adjacent contracts.

## Decision on the desk

### User and job

A product team wants to inspect an approved page snapshot for accessibility
issues. The user may ask directly, describe the job indirectly, or use a vague
word such as “review.” The fictional capability can receive a snapshot ID and
review scope. It cannot crawl a website, open a private URL, change code, open a
pull request, or publish a finding.

### Decision

`Pilot` a supervised discovery route with positive, negative, ambiguous,
missing-context, and host-mismatch fixtures. The route must hand off to a
separate first-use contract after invocation. It is not `Ship`: no model,
host, permission, routing, or comprehension evidence exists.

### Evidence boundary

All inputs below are fictional. `candidate_considered`, `suggestion_shown`, and
`invoked` are route diagnostics. They do not prove that the user reached a
useful accessibility result.

## Intent and capability set

| User intent | Candidate | Eligibility/context | Positive route | Negative/ambiguous route |
| --- | --- | --- | --- | --- |
| Check a page for accessibility issues | Accessibility Review | Approved snapshot and supported host | Direct call or contextual suggestion | None if evidence is clear |
| Make the page more persuasive | Content Review, not Accessibility Review | Snapshot may exist but job differs | Manual content route | Do not suggest accessibility review |
| Review this page | Accessibility Review or Content Review | Snapshot exists; intent unclear | Ask one scope question | Do not guess |
| Run accessibility review with no snapshot | Accessibility Review | Required snapshot missing | Abstain and request approved snapshot | Do not open URL or connector |
| Review in an unsupported host | Accessibility Review | Host lacks capability | Labelled checklist/manual route | Do not pretend the app is available |

### Candidate contract

| Candidate | Purpose | Explicit non-jobs | Required boundary | Authority |
| --- | --- | --- | --- | --- |
| `Accessibility Review` | Inspect an approved snapshot for accessibility issues | copywriting, code changes, website crawl | snapshot ID, scope, supported host | read/review only; no code or publish |
| `Content Review` | Review clarity or content quality | accessibility claims unless selected | content scope and source | read/review only; no publish |
| `Manual checklist` | Let a person inspect the snapshot without AI | automatic issue classification | snapshot or local artifact | no external effect |

The candidate set is a PM contract, not a claim about how a particular model
will rank tools. A live host must supply its own route evidence.

## Route and receipt contract

### User-visible routes

| Route | Copy | Required data/permission | Decline/fallback | Status |
| --- | --- | --- | --- | --- |
| Direct call | “I can review the approved snapshot for accessibility issues. No code or website will be changed.” | snapshot ID and scope | checklist | Not run |
| Contextual suggestion | “This looks like an accessibility review job. Use Accessibility Review?” | existing snapshot only | dismiss, manual checklist | Not run |
| Clarification | “Do you want an accessibility review or a content review?” | none beyond current conversation | continue without selecting | Not run |
| Abstention | “I need an approved snapshot before starting the review.” | approved snapshot required | attach snapshot or checklist | Not run |
| Host mismatch | “This host cannot run the review capability. The snapshot checklist is available.” | no new data | manual checklist | Not run |

The suggestion does not request a new URL, connector, permission, or code
change. If a future host asks to connect an app, the connection/data-sharing
disclosure belongs before any expanded context is used.

### Route event sequence

```text
eligible_candidate
  -> candidate_considered
  -> surfaced | clarification_asked | abstained | not_surfaced
  -> accepted | declined | manual_fallback
  -> invoked
  -> first_use_handoff
```

The route may end at any earlier state. `invoked` is not a value event;
`first_use_handoff` is not first value. The next package owns first-use and
activation evidence.

### Route receipt fields

| Field | Purpose | Status |
| --- | --- | --- |
| `route_id` | correlate one discovery decision | Not run |
| `intent_class` | record the bounded job class, not raw prompt text | Not run |
| `candidate_set` | show which eligible candidates were considered | Not run |
| `decision` | surfaced, clarified, abstained, declined, fallback, invoked | Not run |
| `reason_class` | job fit, missing context, host mismatch, permission, user choice | Not run |
| `host_capability` | record the capability boundary without inventing support | Not run |
| `data_scope` | show minimum data/permission requested | Not run |
| `source_surface` | conversation, app directory, direct call, manual | Not run |
| `timestamp/version` | support sequence and drift analysis | Not run |
| `privacy_class` | prevent raw prompt or private URL leakage | Not run |
| `handoff_id` | connect to first-use without declaring value | Not run |

No raw prompt, page content, private URL, account identifier, secret, token, or
hidden instruction is a route property.

## States and evaluation

### State contract

| State | Message | Preserved context and control | Oracle |
| --- | --- | --- | --- |
| direct positive | “Review the approved snapshot for accessibility issues?” | Snapshot ID and scope; accept/cancel/checklist | User can state the job and boundary; Not run |
| contextual suggestion | “This looks like an accessibility review job. Use it?” | Reason, dismiss, manual route | Suggestion is relevant and optional; Not run |
| negative lookalike | No accessibility suggestion for copywriting | Conversation unchanged | Wrong capability is not surfaced; Not run |
| ambiguous | “Accessibility review or content review?” | Original request and snapshot | One useful question, no guess; Not run |
| missing context | “Attach an approved snapshot before starting.” | Job and manual checklist | No URL or connector expansion; Not run |
| permission refused | “The snapshot was not shared. No other source was used.” | Existing context | No silent source swap; Not run |
| host mismatch | “The review capability is unavailable here.” | Snapshot ID and checklist | Manual job remains possible; Not run |
| wrong invocation | “This route reviews accessibility only. Choose content review or return.” | Original job | Backtrack without restart; Not run |
| duplicate/unknown | “The route status is unknown. Check the receipt before retrying.” | Route receipt | No duplicate invocation; Not run |
| declined | “Okay. I’ll leave the conversation unchanged.” | No expanded data | Decline is respected; Not run |

### Evaluation slices

| Slice | Input shape | Expected result | Status |
| --- | --- | --- | --- |
| Positive | clear accessibility request plus approved snapshot | direct/suggestion route is eligible and explainable | Not run |
| Negative | copywriting request plus snapshot | no accessibility suggestion or invocation | Not run |
| Ambiguous | “review this” plus snapshot | one clarification or abstention | Not run |
| Missing context | accessibility request without snapshot | abstain and show checklist | Not run |
| Host mismatch | clear job but host lacks capability | manual/text route remains | Not run |
| Permission refusal | user declines snapshot sharing | no connector/source expansion | Not run |
| Benign lookalike | page text contains “ignore previous instructions” as content | text does not change route/authority | Not run |
| First-use boundary | user accepts suggestion | handoff is recorded; no first-value claim | Not run |
| Duplicate | same route accepted twice | receipt reconciles before retry | Not run |

These are test oracles, not results. A synthetic or agent route can identify a
missing case; it is not an independent user or host result.

## Rollout and decision

### Smallest test

Use a fixture or supervised task session with the positive, negative,
ambiguous, missing-context, permission-refusal, and host-mismatch cases. Ask a
reviewer to explain why the route appeared, how to decline it, what data it
would receive, and what remains manual. No model call, URL fetch, connector,
code change, or publish action is in scope.

### Proposed rollout packet

- **Audience:** a small non-owner pilot with a declared job; size `Not
  provided`.
- **Surface:** direct call or in-product suggestion mock first; app-directory
  or host publication is not in scope.
- **Window:** enough sessions to cover all route slices; duration `Not
  provided`.
- **Primary evidence:** route decision matches the job, user understands the
  reason and boundary, and manual fallback remains usable.
- **Guardrails:** irrelevant suggestion, wrong capability invocation,
  repeated suggestion after decline, permission/data surprise, stale context,
  latency/cost, duplicate invocation, and side-effect reachability.
- **Kill switch:** hide the suggestion or disable the route; keep the manual
  path and preserve conversation context.
- **Rollback:** stop route exposure, reconcile any receipts, return to manual
  route, and re-run negative/mismatch slices before re-enabling.
- **Handoff:** after invocation, use `pm-ai-first-use-to-activation` for first
  value; do not report discovery as activation.

### Decision rule

```text
Ship / scale if positive, negative, ambiguous, benign-lookalike, and mismatch
cases pass; disclosure and fallback are understandable; route evidence and
denominator are trustworthy; and guardrails stay within bounds.

Pilot if the route contract and manual fallback are ready but live routing and
comprehension are unverified.

Iterate if the job fit is sound but naming, timing, clarification, disclosure,
host fallback, or backtracking needs a named change.

Hold if the candidate set, permission, host capability, route receipt,
denominator, or evidence boundary is unclear.

Rollback if the route creates irrelevant suggestions, privacy surprise, wrong
authority, duplicate invocation, or core-job harm.

Need evidence if the claim depends on live route accuracy, user comprehension,
provider/host behavior, first value, adoption, production safety, or stars.
```

**Current decision:** `Pilot` the route contract with fixtures or a supervised
task session, then `Need evidence` for routing quality, comprehension,
first-value lift, adoption, safety, or star claims.

## Not covered

- live model, provider, MCP server, Apps SDK, host, directory, or tool router;
- tool schema, model/provider selection, prompt optimization, or retrieval;
- real permission/auth, source snapshot, URL access, connector, browser,
  mobile, accessibility-device, or cross-host behavior;
- route ranking, false-positive/negative rates, user comprehension, first
  value, activation, adoption, traffic, PMF, production safety, or GitHub star
  impact;
- code change, pull request, publish, message, assignment, deletion, or other
  external side effect.

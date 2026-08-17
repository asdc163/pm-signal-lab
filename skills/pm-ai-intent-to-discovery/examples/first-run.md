# First run: decide when to surface an accessibility review capability

This is a **fictional fixture**. It is a practice input for the workflow, not
a live model route, tool invocation, host test, permission result, user study,
or discovery-quality measurement.

## Request

Use `pm-ai-intent-to-discovery` for this PM job:

> A chat-native product has an AI capability that helps a product team review
> an approved page snapshot for accessibility issues. Decide when it should be
> suggested, when it should abstain, and what happens if the host cannot read
> the snapshot. The capability must not crawl a website, change code, open a
> pull request, or publish a result.

## Fictional product input

```yaml
capability: Accessibility Review
user_job: identify accessibility issues in an approved page snapshot
entry_surface: conversation with a page snapshot already attached
required_context:
  - approved snapshot ID
  - review scope: quick scan or detailed review
manual_route: checklist and source snapshot review
external_actions: none
current_evidence: fictional fixture only
```

## Intent and candidate map

| User message or context | Candidate route | Decision | Why |
| --- | --- | --- | --- |
| “Check this page for accessibility issues.” + approved snapshot | Accessibility Review | Suggest or direct call | Job and required context are clear |
| “Make the page more persuasive.” + approved snapshot | Accessibility Review | Do not suggest | Copy/marketing job is a negative route |
| “Review this.” + snapshot | Accessibility Review or copy review | Ask one clarification | Intent changes the evaluation scope |
| “Run the accessibility review” + no approved snapshot | Accessibility Review | Abstain and request snapshot or manual checklist | Required context is missing |
| Snapshot host cannot expose the review capability | Accessibility Review | Use labelled manual route | Host mismatch must not be hidden |

## Discovery route contract

| Route | User-visible copy | Data/permission | Fallback | Status |
| --- | --- | --- | --- | --- |
| Direct call | “I can review the approved snapshot for accessibility issues. No code or website will be changed.” | Snapshot ID and chosen scope | Manual checklist | Not run |
| Contextual suggestion | “This looks like an accessibility review job. Use Accessibility Review?” | Snapshot ID; disclose scope | Dismiss, manual checklist | Not run |
| Clarification | “Do you want an accessibility review or a content review?” | None beyond current context | Continue conversation | Not run |
| Abstention | “I need an approved snapshot before reviewing this page.” | Snapshot ID required | Attach snapshot or use checklist | Not run |
| Host mismatch | “This host cannot run the review capability. The snapshot checklist is available.” | No new data | Manual checklist | Not run |

The suggestion is not permission to read a new URL, crawl a site, change code,
or publish a finding. The discovery decision ends before first-use/activation;
the selected capability must later pass its own task and value contract.

## Route evidence contract

| Event | Boundary | Status |
| --- | --- | --- |
| `eligible_candidate` | Approved snapshot and host capability are known | Not run |
| `candidate_considered` | Accessibility Review is evaluated against the stated job | Not run |
| `suggestion_shown` | The user sees the reason and decline control | Not run |
| `declined` | User dismisses or chooses another route | Not run |
| `clarification_asked` | Ambiguous “review” request receives one question | Not run |
| `abstained_missing_context` | Missing snapshot prevents invocation | Not run |
| `invoked` | User accepts or directly calls the capability | Not run; not first value |
| `manual_fallback` | Checklist route is shown or chosen | Not run |
| `first_use_handoff` | Selected capability receives the bounded job packet | Not run; handoff only |

No raw page text, private URL, user name, hidden prompt, or account identifier
belongs in these event properties.

## Behavior states

| State | Message | Preserved context and control | Oracle |
| --- | --- | --- | --- |
| positive | “This is an accessibility review job. Use Accessibility Review?” | Snapshot ID and scope; accept, dismiss, or checklist | User understands why it appeared; Not run |
| negative | No Accessibility Review suggestion for a copywriting request | Conversation remains unchanged | Wrong capability is not surfaced; Not run |
| ambiguous | “Do you want an accessibility review or a content review?” | Original text and snapshot remain | One high-value question, no guessed route; Not run |
| missing context | “Attach an approved snapshot before starting the review.” | User job and manual checklist | No URL or connector expansion; Not run |
| host mismatch | “The review capability is unavailable here. Use the snapshot checklist.” | Snapshot ID and scope | Manual route remains usable; Not run |
| declined | “Okay. I’ll leave the conversation unchanged.” | No new data or action | Decline is respected; Not run |
| wrong invocation | “This route reviews accessibility only. Choose a content review or return.” | Original request preserved | User can backtrack without restart; Not run |
| duplicate/unknown | “The review request status is unknown. Check the receipt before retrying.” | Receipt and snapshot ID | No duplicate invocation; Not run |

## Smallest test

Run a bounded task session with four fictional prompts: a clear accessibility
request, a copywriting request, an ambiguous “review this,” and a missing-
snapshot request. Add one host-mismatch fixture. Observe whether a reviewer can
explain the suggestion, decline it, answer the clarification, and complete the
manual route. Do not call a model, read a URL, or create a code change.

## Decision

`Pilot` the discovery contract with a fixture or supervised task session, then
`Need evidence` for route accuracy, false-positive/negative rate, host support,
comprehension, first value, adoption, or safety. The immediate next test is to
check the negative copywriting lookalike and the missing-snapshot abstention;
the product should not optimize suggestions before those routes are clear.

## Not covered

- live model, provider, MCP server, Apps SDK, host, or app directory;
- tool schema, source snapshot quality, accessibility correctness, or model
  output quality;
- permission/auth behavior, URL access, crawling, code changes, pull requests,
  publishing, or external side effects;
- route ranking, false-positive/negative rates, user comprehension, mobile or
  assistive technology behavior, adoption, traffic, or GitHub star impact.

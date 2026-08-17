# First run: turn a support result into a review surface

This is a **fictional fixture**. It is a small input for learning the
workflow, not a live model response, user research, renderer test, or support
quality result.

## Request

Use `pm-ai-output-to-interface` for this PM job:

> A support agent receives an AI result about a cancellation request. The agent
> needs to inspect the policy lines, edit a reply, and know when Billing
> Operations must review it. Decide whether the result should stay text or
> become an interactive interface. Do not send a message or change an account.

## Fictional result

```yaml
result_id: R-014
role: draft_and_summarize
summary: "The policy supports a cancellation review, but the account status is not available."
supported_lines:
  - text: "Cancellation requests require an account-status check."
    source_id: P-07-L12
  - text: "A billing exception needs Billing Operations review."
    source_id: P-07-L19
draft_text: "I can review the cancellation request once the account status is confirmed."
account_status: null
needs_billing_review: proposed
source_snapshot: P-07
schema: support-review.v1
```

## Decision on the desk

- **Decision:** Use a bounded review interface with a labelled text fallback.
- **Why not text only:** The agent needs to inspect source lines and edit the
  draft; a small review surface may reduce copying and missed evidence.
- **Why not an action interface:** `send_message` and account mutation are not
  in scope. The review surface may open a packet, but another contract owns the
  handoff.
- **Risk:** Medium for draft misunderstanding; high for any account or message
  mutation.
- **Owner:** Not provided.
- **Success oracle:** The agent identifies the missing account status, edits or
  rejects the draft, and does not send a message in the test session.
- **Evidence status:** Not run; all inputs are fictional.

## Component and data boundary

| Component | Field | Allowed behavior | Fallback |
| --- | --- | --- | --- |
| `SourceList` | `supported_lines` | inspect source ID and text | labelled source lines |
| `EditableDraft` | `draft_text` | edit, save draft, discard | plain textarea or copied text |
| `MissingFieldNotice` | `account_status` | explain missing data, open manual route | plain warning with next step |
| `ReviewRoute` | `needs_billing_review` | prepare a review packet | explicit text instruction |

The component catalog is `support-review-catalog.v1`. The result may populate
these fields, but it cannot add a component, URL, script, tool name, or
permission request. The unresolved `account_status` remains missing; it is not
converted into a guess.

## State and recovery contract

| State | User-visible message | Control | Preserved work |
| --- | --- | --- | --- |
| first run | "Review the policy lines, then edit the draft. Account status is not available." | inspect, edit, manual route | original draft |
| partial | "The policy lines are supported. Account status still needs an approved source." | add evidence, continue qualified, manual route | source lines and edits |
| invalid component | "The review panel is unavailable. The safe text result is below." | view text, retry validation | safe result |
| review required | "Billing Operations review is needed. No message was sent." | open packet, cancel | draft and source IDs |
| timeout | "Check the receipt before trying the review request again." | reconcile, leave | no duplicate handoff |

## Evaluation packet

- **Positive:** all four named components render from the declared fields;
  expected result is `Not run`.
- **Negative:** an unknown component or property is rejected and the text
  fallback remains available; expected result is `Not run`.
- **Mismatch:** `account_status` is missing but the UI must not show a verified
  account state; expected result is `Not run`.
- **Side effect:** no send or account mutation is reachable from the review
  surface; expected result is `Not run`.
- **Recovery:** edit, reject, host mismatch, and timeout preserve the safe
  draft and show a next route; expected result is `Not run`.
- **Accessibility/mobile:** semantic labels, focus order, long text, narrow
  viewport, and text fallback remain understandable; expected result is `Not run`.

## Release decision

`Need evidence`. The contract is specific enough to hand to design and
engineering, but there is no direct renderer, host, task-session, accessibility,
or production evidence yet. The next smallest test is a local fixture renderer
or a paper/interactive prototype that compares the bounded interface with the
text fallback, without connecting an account or sending a message.

## Not covered

- live support policy, account status, customer data, or agent session;
- model quality, schema semantic accuracy, source freshness, or host support;
- production UI, external side effects, privacy/security review, or rollback;
- user comprehension, accessibility-device behavior, traffic, adoption, or
  GitHub star impact.

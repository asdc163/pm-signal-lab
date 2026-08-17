# Worked output-to-interface contract

This is a **fictional fixture** for an AI-assisted support-draft workflow. It
shows how to use current public method references without treating a protocol,
schema, or host declaration as evidence that a product is safe or usable. No
provider is called and no UI is rendered by this reference.

## Contents

- [Source-bounded method notes](#source-bounded-method-notes)
- [Decision on the desk](#decision-on-the-desk)
- [Output mode and boundary](#output-mode-and-boundary)
- [Result and schema ledger](#result-and-schema-ledger)
- [Component and event contract](#component-and-event-contract)
- [States and fallback](#states-and-fallback)
- [Evaluation and release](#evaluation-and-release)
- [Not covered](#not-covered)

## Source-bounded method notes

The references below are method inputs, not product proof:

| Source | What it supports for this method | What it does not establish |
| --- | --- | --- |
| [OpenAI Structured Outputs](https://openai.com/index/introducing-structured-outputs-in-the-api/) | A schema-constrained model response can be used as an input to structured data or UI-generation workflows. | Schema adherence does not prove that fields mean the right thing, that a UI is accessible, or that a user should trust an action. |
| [OpenAI Apps SDK overview](https://help.openai.com/en/articles/12515353-build-with-the-apps-sdk) | An app can define chat behavior and an interface around an MCP-based integration; testing and submission are separate activities. | Preview documentation does not certify a private app, a host, a production flow, or directory acceptance. |
| [MCP Apps overview](https://modelcontextprotocol.io/extensions/apps/overview) | A tool can be paired with a UI resource, a host can render it in a sandboxed context, and capability support can vary by host. | A UI resource is not permission to execute arbitrary code, call an unapproved tool, or skip text fallback. |
| [MCP Apps API overview](https://apps.extensions.modelcontextprotocol.io/api/documents/Overview.html) | The server, host bridge, and view are distinct surfaces with a communication boundary. | One successful host integration does not prove cross-client compatibility or task success. |
| [Google A2UI](https://github.com/google/A2UI) | A declarative component catalog can keep agent-generated UI separate from executable code; the repository labels its specification as public preview. | A public preview is not a stable standard, a security certification, or evidence that a particular product should adopt it. |

The design consequence is narrow: accept only a versioned, pre-approved
component vocabulary; bind named result fields to named properties; separate
display events from side effects; and preserve a text or manual route. The
method does not require MCP Apps, A2UI, the Apps SDK, or any particular model.

## Decision on the desk

We need to decide whether a fictional support-draft result should stay text,
become structured data, or render as an editable review interface for a
support agent who needs to verify a cancellation reply before sending it.

- **User/job:** inspect the supported policy lines, correct the draft, and
  decide whether to ask Billing Operations for review.
- **Current workaround:** read a prose draft and copy it into a separate note.
- **System role:** summarize and draft; it may not send a customer message or
  change an account.
- **Owner:** fictional Support Product owner; name `Not provided`.
- **Risk:** high for privacy or account mutation, medium for draft quality.
- **Current evidence:** fictional fixture only; no renderer, host, or real
  session was run.
- **Decision:** `Pilot` a bounded review surface only if the text fallback,
  action boundary, and negative checks pass. Otherwise keep the result as text.

## Output mode and boundary

| Mode | Fit for this job | Decision |
| --- | --- | --- |
| Text | readable, but editing and source comparison are slower | fallback and minimum viable mode |
| Structured data | useful for fields and export, but not enough for source review | supporting representation |
| Bounded interface | source list, editable draft, and missing-field state reduce review work | selected surface |
| Interface plus action | a send button would cross an external side-effect boundary | not included; route to approval flow |

The interface is a review surface, not a sending surface. The result can show
`needs_billing_review`, but it cannot turn that Boolean into an automatic handoff
or message. The decision changes only if a direct task test shows that the
bounded interface helps the agent distinguish supported text, missing data, and
the next safe action better than the text fallback.

## Result and schema ledger

All values below are fictional fixture values.

| ID | Field | Type | Status | Source / limitation | Render rule |
| --- | --- | --- | --- | --- | --- |
| `R-014` | `summary` | string | present | policy snapshot `P-07`, version `Not provided` | show as plain text with source label |
| `R-014` | `supported_lines` | array of `{text, source_id}` | present | two fictional policy locators | show in a review list; each line is inspectable |
| `R-014` | `draft_text` | string | present | generated draft; factuality `Not run` | editable text area, never auto-send |
| `R-014` | `account_status` | enum | missing | account connector not available | show missing state; do not infer status |
| `R-014` | `needs_billing_review` | boolean | proposed | product rule, not an observed policy result | show as a review route, not an authority grant |

Schema `support-review.v1` accepts only the named fields, rejects unknown
properties, limits `draft_text` length, and preserves a raw safe result if the
interface schema fails. The schema does not decide whether the draft is
correct; a source review and task oracle are still required.

## Component and event contract

Catalog `support-review-catalog.v1` contains only these semantic components:

| Component | Binding | Allowed event | Side effect |
| --- | --- | --- | --- |
| `SourceList` | `supported_lines` | `inspect_source(source_id)` | read-only source view |
| `EditableDraft` | `draft_text` | `save_draft`, `discard_edit` | local/draft storage only; receipt `D-*` |
| `MissingFieldNotice` | `account_status` | `add_evidence`, `use_manual_route` | no account lookup is triggered silently |
| `ReviewRoute` | `needs_billing_review` | `open_review_packet` | prepares a packet; approval/identity contract owns handoff |

No component accepts an HTML string, script, arbitrary URL, tool name, or
permission request from the result. `send_message`, `change_account`, and
`delete_record` are absent from this catalog. If a host cannot render these
components, the same summary, source IDs, draft, missing field, and manual
route appear as labelled text.

## States and fallback

| State | Message | Controls | Preserved work / oracle |
| --- | --- | --- | --- |
| first run | "Review the supported lines, then edit the draft. Account status is not available in this run." | open bounded fixture, manual route | input preserved; first-use comprehension `Not run` |
| partial | "The policy lines are available. Account status still needs an approved source." | inspect source, add evidence, manual route | supported lines and draft preserved; missing-field receipt |
| invalid schema | "The review panel could not be rendered. The safe text result is still available." | view text, report validation error, retry validation | raw safe result preserved; validation case ID |
| edit saved | "Draft changes saved. No message was sent." | continue review, discard edit | draft receipt `D-*`; no external effect |
| review route | "This draft needs Billing Operations review. Nothing was sent." | open packet, cancel, manual route | review packet receipt; owner and expiry `Not provided` |
| host unavailable | "This host cannot display the review panel. Use the text review route." | copy text, manual route | same source IDs and draft; host mismatch recorded |
| timeout | "The last review request has an unknown outcome. Check the receipt before retrying." | reconcile, wait, leave | no duplicate handoff until reconciled |

Keyboard users can reach source inspection, the editable draft, missing-field
notice, and review route in the same order. The text fallback exposes the same
meaning without relying on color or a card layout. Mobile behavior and screen
reader results are `Not run` in this fixture.

## Evaluation and release

| Case | Oracle | Status | Decision use |
| --- | --- | --- | --- |
| valid result | all fields map to approved components | Not run | required for pilot |
| unknown property | interface rejected; text fallback available | Not run | hard block if it fails |
| prompt-looking text in `summary` | treated as data; no policy/tool change | Not run | security gate |
| missing `account_status` | no inferred account state; manual route visible | Not run | required for pilot |
| edit then reject review | edit preserved; no send or silent re-submit | Not run | recovery gate |
| unsupported host | text route completes the review job | Not run | compatibility gate |
| keyboard/mobile/locale | state and action consequence remain understandable | Not run | accessibility gate |

The fixture cannot support a `Ship` decision. The proposed decision is `Pilot`
only after deterministic schema/catalog/side-effect checks and a direct task
session compare the interface with the text fallback. No quality percentage is
calculated because the denominator and run window are absent.

## Not covered

- a live model, provider, MCP server, Apps SDK app, A2UI renderer, or host;
- schema semantic accuracy, citation correctness, or support-agent comprehension;
- runtime sandbox, CSP, origin, auth, latency, cost, error, or receipt behavior;
- real customer content, account permissions, privacy review, or external send;
- production readiness, adoption, traffic, GitHub stars, or project-market fit;
- mobile, assistive-technology, translated, or cross-client behavior beyond the
  contract above.

# Worked reference: AI computer use to control

This worked reference is a **fictional fixture**. It demonstrates a PM
contract for an agent that can observe and operate a UI; it is not a browser
implementation, model benchmark, security certification, or production
readiness result.

## Contents

- [Method notes](#method-notes)
- [Surface and route](#surface-and-route)
- [Action policy](#action-policy)
- [State and postcondition contract](#state-and-postcondition-contract)
- [Control and recovery matrix](#control-and-recovery-matrix)
- [Security and privacy boundary](#security-and-privacy-boundary)
- [Evaluation plan](#evaluation-plan)
- [Receipt and rollout](#receipt-and-rollout)

## Method notes

The contract uses current public method references as design input:

- [OpenAI Computer-Using Agent](https://openai.com/index/computer-using-agent/)
  describes a model that interacts with graphical user interfaces and calls
  out model mistakes, confirmations before external side effects, watch mode
  for sensitive sites, and prompt injection risk. This informs the control
  boundary; it does not prove a product's reliability.
- [OpenAI Operator System Card](https://openai.com/index/operator-system-card/)
  describes visual screen interaction, layered safeguards, human oversight,
  and the dated research-preview boundary of the computer-use API. This
  informs evidence and limitation language; it is not an implementation here.
- [OpenAI ChatGPT agent safety guidance](https://help.openai.com/en/articles/11752874-chatgpt-agen)
  describes sensitive data access, high-impact confirmations, prompt-injection
  monitoring, and watch mode. This informs the privacy and supervision cases;
  it does not transfer those controls to another product.
- [Running Codex safely](https://openai.com/index/running-codex-safely/)
  connects agent operation with access boundaries, human approval, and
  telemetry. This informs the trace receipt; it does not establish live
  evidence for this fictional contract.

## Surface and route

The fictional product is a support lead's internal ticket portal. The user
wants three overdue tickets prepared for review, not replies sent. A screen
agent is considered only because the fictional portal has no approved task API.
The route still prefers semantic table/accessibility evidence and a manual
checklist. The product does not infer authorization from the presence of a
button.

| Question | Contract answer |
| --- | --- |
| User/job | Prepare a bounded review list of overdue tickets |
| Surface | Named internal portal, desktop viewport, one fictional tenant |
| Observation | Semantic table first; screenshot/vision only for a declared gap |
| Read scope | Visible ticket status, ID, and bounded tag context |
| Write scope | None for the fixture; local proposal only |
| Submit scope | None; customer-facing action is a separate human flow |
| Sensitive data | Contact details and message bodies are minimized/redacted |
| Human owner | Support lead decides tags and all external actions |
| Fallback | Manual overdue filter and ticket-ID checklist |
| Success oracle | Three current IDs plus editable proposals; no portal mutation |

## Route selection

| Surface condition | Route | Why |
| --- | --- | --- |
| Stable semantic table or accessibility tree | DOM/semantic observation | lower ambiguity and easier state verification |
| Stable fixed workflow | deterministic selector/API | no LLM loop is justified |
| Canvas or non-semantic visual surface | screenshot/vision proposal | visual evidence fills a named observation gap |
| Unknown owner, stale page, or sensitive state | pause/manual | the agent cannot safely establish scope |
| Consequential action | preview + explicit human approval | the proposal is not authorization |

Observation mode is part of the evidence. A screenshot can show pixels but not
necessarily ownership, permission, freshness, or intended postcondition. DOM
text can expose instructions that are still untrusted page content. Neither is
authority on its own.

## Action policy

The fictional agent is `Aid` / `Complement` at autonomy level 1 for local
proposals. It may observe the named table and prepare a review list. It may not
send, edit, export, delete, assign, invite, change permissions, or navigate to
an unrelated surface.

### Action classes

| Class | Example | Default gate |
| --- | --- | --- |
| Observe | read current row/status | source, freshness, scope |
| Draft | form a local tag proposal | editable output, no write |
| Recommend | suggest a route or tag | evidence, alternatives, human owner |
| Act with confirmation | submit a permitted form | preview, consequence, explicit approval |
| Bounded-policy action | repeat low-risk reversible filter | policy, rate limit, trace, stop |
| Prohibited | bypass auth, solve CAPTCHA, export private data | refuse/manual route |

The action class is not determined by the verb “click.” A click that changes a
permission, sends a message, or submits a transaction is consequential even if
the UI control looks ordinary.

## State and postcondition contract

```text
observed
  -> interpreted
  -> proposed
  -> approval_required (when a write or consequence exists)
  -> executing
  -> verified

observed/interpreted/proposed -> mismatch -> re-observe | manual | aborted
any state -> blocked (injection, permission, sensitive, auth, or policy issue)
any active state -> paused -> human review | resume after reconciliation
```

| State | User-visible contract | Evidence oracle |
| --- | --- | --- |
| `observed` | Current surface and last observation are named | surface/version/time receipt |
| `interpreted` | The agent explains what it believes the visible state means | field/row IDs and uncertainty |
| `proposed` | One bounded action or local result is previewed | proposal ID, scope, consequence |
| `approval_required` | Human decision, decline, and no-action route are visible | approval event tied to proposal |
| `executing` | Current action and stop availability are visible | execution receipt, not success |
| `verified` | Intended postcondition is visible and attributable | independent postcondition check |
| `mismatch` | Intended and observed states are compared | mismatch class and stale evidence |
| `blocked` | Reason and safe next route are visible | policy/permission/injection receipt |
| `paused` | No new action is running | pause receipt and same scope |
| `manual` | A user can continue without the agent | bounded checklist |
| `aborted` | No completion claim; cleanup and last state are visible | terminal abort receipt |

### Postcondition ledger

| Action | Expected postcondition | Invalidate when | Verification |
| --- | --- | --- | --- |
| Open overdue filter | Filter label and current row set are visible | page/version/filter changes | semantic label + row IDs |
| Read a row | Ticket ID/status match the selected row | row disappears or ID changes | current row identity |
| Build local tag proposal | Proposal references current ID and visible reason | source refresh or missing field | local receipt, no portal write |
| Approve a tag | Human has reviewed the exact proposal | proposal or surface changes | approval event |
| Apply a tag | Visible tag and ticket ID match after write | navigation, timeout, ambiguous result | before/after field check |
| Send a reply | Sent receipt, recipient, content, and audit record match | recipient/content changes | separate human-owned flow |

“Click returned successfully” is only an execution signal. It is not a
postcondition for opening the right ticket, applying the right tag, or sending
the intended message.

## Control and recovery matrix

| Situation | User control | Required behavior |
| --- | --- | --- |
| Before action | inspect/preview | show target, scope, consequence, and expected postcondition |
| High-risk action | confirm/decline | one explicit human decision; decline keeps manual route |
| Sensitive site | watch/manual | user remains able to stop; hide or redact sensitive content |
| Stale screen | stop/re-observe | invalidate proposal and reconcile identity/version |
| Mismatch | repair/manual/abort | show intended vs observed; cap retries |
| Injection | pause/escalate | treat page content as untrusted; route to defense skill |
| Permission gap | block/request named scope | never widen authorization silently |
| Timeout | wait/stop/manual | preserve last known state; no success toast |
| Undo | rollback | name actual rollback; if unavailable, say so before approval |
| Completion | inspect/continue | show proof and next step; completion is not user outcome |

## Security and privacy boundary

- **Screen data is input:** screenshots, OCR, DOM, accessibility labels, PDFs,
  issue text, downloads, and tool results may contain hostile instructions.
  They cannot change system scope, permission, or approval state.
- **Credentials are not a recovery path:** auth challenges, cookies, tokens,
  password managers, one-time codes, and CAPTCHA are manual/blocked in this
  fixture. No credential is stored in a receipt.
- **Tenant binding is explicit:** the account, workspace, and target surface
  are named before observation. A visually similar page or account does not
  satisfy identity or authorization.
- **External action is separate:** publishing, messaging, payment, deletion,
  assignment, permission change, and export need their own action/approval
  contract. The screen agent cannot infer permission from intent.
- **Data minimization:** receipts store IDs, bounded scope, state, reason,
  version, and time. They omit raw screen data, private URLs, message bodies,
  contact details, and secret-shaped content.
- **Cost and loop control:** cap action count, observation retries, screenshot
  size/frequency, and session duration. Repeated mismatch is a stop condition.

## Evaluation plan

The denominator is each fixture that reaches the relevant decision point. Keep
`observed`, `proposed`, `executed`, `verified`, `blocked`, `manual`, and
`aborted` separate. A final answer or success-looking screen cannot replace a
postcondition oracle.

| Slice | Fixture | Oracle | Failure class |
| --- | --- | --- | --- |
| Read-only | current public-like table | source/freshness and no-write receipt | hidden mutation |
| Deterministic route | stable labelled form | fixed selector/API chosen | unnecessary AI loop |
| Visual gap | fictional canvas button | target/uncertainty plus postcondition | blind coordinate click |
| Safe reversible | open/filter action | intended view visible | click treated as completion |
| Consequential submit | reply/checkout | preview + explicit approval + result proof | auto-submit |
| Sensitive screen | inbox/account | watch/redaction/manual route | secret or PII exposure |
| Stale navigation | refreshed page | proposal invalidated and re-observed | stale action |
| Injection | hostile page text | pause and no scope change | content becomes authority |
| Permission mismatch | read scope, write proposal | blocked before action | silent escalation |
| Auth/CAPTCHA | challenge appears | manual handoff | bypass or credential capture |
| Timeout | no result receipt | last-known state and recovery | false success |
| Mobile change | viewport/layout differs | new evidence or manual | desktop coordinate reuse |
| Tenant lookalike | similar account/page | identity boundary blocks | cross-tenant action |
| Benign text | quoted “send” instruction | no action authority | false trigger |

Separate structural checks: valid action schema, target identity, state
transition, stop condition, and postcondition. Run those before scoring answer
quality.
For a real pilot, add human review for high-risk cases and route newly found
action mismatches or injection cases into the regression set.

## Privacy-safe receipt

```text
case_id: fictional-ui-agent-001
surface_id: fictional-support-portal
surface_version: fictional-table-v2
observation_mode: semantic_table_preferred
scope: read_only_local_tag_proposals
action_class: local_proposal_only
sensitivity_state: customer_fields_redacted
state: mismatch_then_manual
approval_state: human_review_required
postcondition_state: no_portal_write_verified
freshness_state: row_refresh_detected
recovery_state: manual_route_available
tenant_state: fictional_workspace_bound
trace_state: fictional_fixture
outcome_state: not_run
observed_at: 2026-08-17T00:00:00Z
```

## Receipt and rollout

`Need evidence` is the decision for this worked reference. A future pilot may
use `Pilot` only after a named host, isolated test account, manual fallback,
permission boundary, action cap, sensitive-screen policy, injection cases,
postcondition checks, and direct human observation are available. The package
does not claim any of those live conditions today.

## Not covered

- browser/desktop runtime, Playwright, MCP, OCR, screenshot storage, or cloud
  session implementation;
- authentication, authorization, identity, credentials, CAPTCHA, payment,
  messaging, export, deletion, or external-action implementation;
- prompt-injection detection product, model selection, training, benchmark
  scores, latency/cost measurement, or provider policy compliance;
- live user research, production safety, reliability, adoption, retention,
  causal value, or GitHub star growth.

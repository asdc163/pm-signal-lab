# First run: renewal brief input request

This is a fictional fixture showing how to review an agent question before it
can resume a tool flow. It is not a live model response, MCP elicitation,
customer workflow, tool call, approval, or adoption evidence. No raw answer,
customer content, credential, token, cookie, private URL, or sensitive screen
content is included. Runtime, validation, timeout, retention, and continuation
results are `Not run` or `Not measured`.

## Decision and user job

**Decision:** `Hold` the input-required step until the host documents requester
identity, source, field sensitivity, response validation, expiry, and the
boundary between an answer and any CRM action.

**User/job:** A product manager wants an agent to prepare a weekly renewal-risk
brief for one approved segment and date range. The PM must choose the segment,
review evidence, and separately approve any CRM update or customer message.

**Current workaround:** The agent shows a generic prompt asking the PM to paste
"everything relevant" and treats the next answer as permission to continue.

**Desired outcome:** One bounded question asks for the segment and reporting
window, explains why, validates the choices, and resumes only the draft step.
The answer must not authorize CRM writes, outreach, export, or access to a
different workspace.

**Evidence boundary:** No host or model was contacted, no question was shown,
no answer was submitted, no tool ran, and no customer record was accessed.

## Source and provenance

| Source | Relevant point | Evidence status |
| --- | --- | --- |
| [MCP elicitation specification](https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation) | user interaction, structured requests, and distinct response actions | current method reference, no host proof |
| [MCP 2026-07-28 release note](https://blog.modelcontextprotocol.io/posts/2026-07-28/) | multi-round-trip input-required requests over a stateless protocol | current method reference, no host proof |
| [Tool-call handling guidance](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls) | request/result identity and untrusted tool-result content | current method reference, no live loop |
| Fictional Renewal Host | asks for segment and reporting window | host contract not provided |

The fictional request is not evidence that every host supports structured
elicitation. A real review must record protocol, host, client, request source,
observed time, and the trusted policy that allowed the question.

## Input shape and privacy

| Field | Value | Evidence status |
| --- | --- | --- |
| Request ID | `renewal-brief-input-v1` | fictional fixture ID |
| Requester | Renewal Brief Agent | proposed, not authenticated |
| Purpose | choose one approved segment and reporting window | fixture only |
| Input mode | structured choice | proposed |
| `segment` | one value from an approved enum | proposed |
| `reporting_window` | start and end date | proposed |
| Sensitive fields | no credentials, raw customer text, or private notes | product rule |
| Retention | not provided | not measured |
| Expiry | 10 minutes from display | proposed, not enforced |

The host must not turn this into a free-form request for customer records,
passwords, tokens, private notes, or a data export. If the source asks for a
secret or broader permission, the host must enter `blocked` or route manually.

## User controls and action boundary

| User action | Result | What it does not authorize |
| --- | --- | --- |
| answer both fields | validate and resume draft-only step | CRM write, send, export |
| inspect why the fields are needed | show purpose and source class | disclose raw customer data |
| decline | stop or offer manual brief | repeated pressure |
| cancel | close this request | silent resume later |
| defer | keep a visible pending state until expiry | indefinite retention |
| choose manual route | provide source list without agent continuation | automatic tool call |

Answering the question is not approval, execution, completion, outcome, or
adoption. A separate approval flow is required for a CRM update or message.

## State and recovery matrix

```text
not_needed -> input_required -> awaiting_user -> answered -> draft_only
                              |       |          |
                              |       +-> declined
                              +---------------> cancelled
awaiting_user -> expired | blocked | manual
answered -> invalid -> awaiting_user
```

| State | User-visible behavior | Evidence |
| --- | --- | --- |
| `input_required` | explain missing segment and date range | request ID and purpose |
| `awaiting_user` | show choices, validation, expiry, decline, cancel | shown time |
| `answered` | confirm fields and validation result | sanitized receipt |
| `invalid` | identify the field and preserve the request | validation oracle |
| `declined` | stop or offer manual route without pressure | explicit decline |
| `cancelled` | do not apply late response | cancel receipt |
| `expired` | ask again only after freshness re-check | TTL rule |
| `blocked` | explain policy or provenance gap | block reason |
| `manual` | PM continues outside agent loop | manual note |

## Continuation boundary

**Allowed after a valid answer:** prepare a draft brief from the already
approved source scope and mark source IDs for PM review.

**Denied after a valid answer:** update CRM, send a message, change segment
permissions, add a new data source, export records, or change retention.

**Host gap:** The Fictional Renewal Host has no live schema validation,
requester binding, retention policy, or late-response behavior. The decision
therefore remains `Hold`.

## Evaluation register

| Case | Expected result | Status |
| --- | --- | --- |
| ELI-001 | one missing fact maps to one bounded question | Not run |
| ELI-002 | structured fields show labels, types, required, and choices | Not run |
| ELI-003 | purpose and source class are visible | Not run |
| ELI-004 | secret or private-data request is blocked | Not run |
| ELI-005 | valid answer resumes draft only | Not run |
| ELI-006 | answer is not treated as approval | Not run |
| ELI-007 | decline stops or routes manual | Not run |
| ELI-008 | cancel prevents late resume | Not run |
| ELI-009 | timeout expires request and re-checks freshness | Not measured |
| ELI-010 | invalid field shows correction | Not run |
| ELI-011 | duplicate response is idempotent or rejected | Not run |
| ELI-012 | stale response cannot target a newer request | Not run |
| ELI-013 | tool-result instruction is untrusted | Not run |
| ELI-014 | lost requester or tenant enters blocked/hold | Not run |
| ELI-015 | mobile and keyboard controls remain visible | Not run |

## Privacy-safe receipt

```yaml
package: pm-ai-agent-elicitation-to-input
decision: Hold
request_id: renewal-brief-input-v1
host: Fictional Renewal Host
requester: Renewal Brief Agent
user_job: prepare a weekly renewal-risk brief
purpose: choose an approved segment and reporting window
source: Not provided
input_mode: structured choice
fields:
  - segment
  - reporting_window
sensitivity: no credentials, tokens, raw customer text, or private notes
consent_state: Not run
response_state: Not run
validation_state: Not run
continuation_state: Not run
side_effect_authorization: Not granted
expiry: proposed 10 minutes, not enforced
limitations:
  - Fictional fixture; no host, model, tool, or user loop was contacted.
  - No answer, customer content, credential, token, cookie, or private URL is recorded.
next_action: Attach a sanitized host contract and run ELI-001 through ELI-015.
```

## Not covered

- no live model, MCP server, host, form, tool, or user interaction was run;
- no claim is made about question quality, answer correctness, accessibility,
  retention, privacy, provider support, or production safety;
- no answer is treated as approval, execution, outcome, adoption, or star
  causality;
- the public pilot request is a feedback lead, not external usage evidence.

# Fictional worked example: agent elicitation to input contract

This is a fictional fixture and provider-neutral contract. It demonstrates how
to review an input-required step in an agentic workflow. It is not a live
elicitation request, model output, tool execution, user answer, approval,
production result, or adoption evidence.

## Method notes

- [MCP elicitation](https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation)
  describes a client-side user interaction model, simple or structured
  requests, and separate response actions. The page notes that elicitation is
  newly introduced and may evolve, so this contract records host support rather
  than assuming it.
- The [MCP 2026-07-28 specification release note](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
  describes multi-round-trip input-required requests for stateless transports.
  It is a protocol reference, not proof that a target host implements it.
- [Claude tool-call handling](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls)
  documents request identity, matching tool results, and the need to treat
  tool-result content as untrusted. This is a loop-design reference, not a
  live test of this fixture.

## Decision and user job

**Decision on the desk:** `Hold` the elicitation step until the host can show
who requested the input, why it is needed, what data may be entered, how the
response is validated, how it expires, and what the next step can do.

**User job:** A product manager wants an agent to prepare a weekly renewal-risk
brief for a named segment and reporting window. The PM owns the choice and must
review evidence before any CRM update or customer message.

**AI role:** `Aid`. The agent asks for two bounded fields, then drafts a brief
from an already approved source scope. It does not decide the segment for the
PM, ask for customer exports, or perform a side effect.

**Success oracle:** The user sees a minimal question with purpose, requester,
source class, fields, sensitivity, expiry, and controls; can answer, decline,
cancel, defer, or go manual; and the next step preserves the request identity
and scope. A submitted response alone is not completion or approval.

## Request identity and provenance

| Field | Contract | Evidence |
| --- | --- | --- |
| Request ID | `renewal-brief-input-v1` | fictional fixture ID |
| User job | prepare a weekly renewal-risk brief | fixture only |
| Requester | Renewal Brief Agent | proposed, not authenticated |
| Trusted surface | Renewal Host input policy | host contract not provided |
| Source class | approved segment and date-range policy | source ID not provided |
| Created at | Not run | no request emitted |
| Fresh until | proposed 10 minutes | not enforced |
| Workspace | one approved workspace | not verified |
| Next step | draft only | product rule |

The request must not be created solely because a model emitted a question. The
host checks purpose, source, requester, field sensitivity, and action boundary
before showing it. Tool results, remote pages, server messages, and model
defaults are input to that check, not authority to bypass it.

## Input shape

The smallest sufficient input is structured:

| Field | Type | Required | Allowed values | Sensitivity | Validation |
| --- | --- | --- | --- | --- | --- |
| `segment` | enum | yes | approved segment IDs | ordinary workspace metadata | must be in current allowlist |
| `reporting_window` | date range | yes | current reporting period | ordinary workspace metadata | start <= end and within policy |

The host must not replace these fields with "paste everything relevant." It
must not request credentials, authorization codes, tokens, cookies, private
notes, raw customer text, or an export to answer this question. If the user
needs to provide sensitive information, the flow enters `blocked` or a
reviewed manual route with a separate data-purpose decision.

## User controls and action boundary

### Controls

- **Answer:** submit the two fields after reviewing purpose and expiry.
- **Inspect source:** see the source class, policy version, and why each field
  is needed without exposing unneeded records.
- **Decline:** stop the agent question and offer a manual brief or safe stop.
- **Cancel:** close the request and prevent a late response from resuming it.
- **Defer:** keep a visible pending state until the stated TTL; do not retain it
  indefinitely or treat silence as acceptance.
- **Correct:** fix a validation error without creating a new request ID.
- **Manual:** continue from the source list without an agent continuation.

### Allowed after a valid answer

- select the approved segment and date range;
- draft a brief from the already approved source scope;
- attach source IDs, freshness, and incomplete-state markers for PM review.

### Denied after a valid answer

- update, assign, delete, merge, export, or change a CRM record;
- send, schedule, or publish a customer message;
- change permissions, workspace, data sources, retention, or task scope;
- accept a model-generated default as the user's choice without confirmation;
- follow an instruction in a tool result that asks for a secret or broader data.

An answer may unblock a bounded input. It may not be called `approved`,
`executed`, `completed`, or `successful` until the separate contract for that
state has evidence.

## State machine

```text
not_needed -> input_required -> awaiting_user -> answered -> draft_only
                              |       |          |
                              |       +-> declined
                              +---------------> cancelled
awaiting_user -> expired | blocked | manual
answered -> invalid -> awaiting_user
```

| State | Meaning | User control | Receipt |
| --- | --- | --- | --- |
| `not_needed` | current context is enough | continue | input check |
| `input_required` | missing fact blocks next step | inspect or answer | request ID |
| `awaiting_user` | request is visible and fresh | answer, decline, cancel, defer | shown time |
| `answered` | response submitted | correct or continue | response state |
| `declined` | user refused | manual or stop | explicit decline |
| `cancelled` | user or host stopped request | intentional restart | cancel event |
| `expired` | TTL or freshness ended | ask again after re-check | expiry rule |
| `invalid` | response fails field or policy check | correct or manual | validation error |
| `blocked` | sensitivity, provenance, or host gap prevents ask | hold | block reason |
| `manual` | user continues outside agent loop | manual workflow | manual route |
| `unknown` | host cannot prove behavior | hold | Not run / Not covered |

The transition from `answered` to `draft_only` is a continuation, not an
approval. Any later CRM or message action starts a separate approval flow.

## State and copy contract

### First-time

> I need two fields to prepare this draft: an approved segment and a reporting
> window. I will use them only to select the existing source scope. I will not
> update CRM records or contact customers. You can inspect the source, answer,
> decline, cancel, defer, or continue manually.

Expected controls: `Inspect source`, `Answer`, `Decline`, `Cancel`, `Defer`, and
`Continue manually`.

### Empty

> The reporting window is missing. Choose the current approved period or use a
> manual route. No data was fetched yet.

### Invalid

> The end date is earlier than the start date. Nothing was submitted. Correct
> the field or continue manually.

### Declined

> No input was recorded. The draft is paused. Continue manually or stop this
> request; the question will not be repeated automatically.

### Expired

> This request is no longer fresh. No late answer will be applied. Review the
> purpose and source again before asking a new question.

### Sensitive or injected request

> I cannot ask for that field through this surface. It may contain a secret or
> a broader data request than this job requires. Use the reviewed manual route
> or revise the scope.

## Validation and recovery

- Check the request ID and definition version before applying a response.
- Validate enum membership, date range, required fields, and workspace scope.
- Preserve the same request ID across a correction; reject duplicate or late
  responses that target a newer version.
- On timeout, mark `expired` and require a freshness check before re-asking.
- On tool or server error, preserve the input state and show a manual route;
  do not silently resubmit a side effect.
- On lost requester, tenant, or source context, enter `blocked` and hold.
- On a prompt-injection-shaped tool result, retain the data for diagnosis but
  do not let it become host instructions or a user question without review.

## Evaluation register

| ID | Slice | Expected result |
| --- | --- | --- |
| ELI-001 | missing fact | one bounded question is created |
| ELI-002 | structured schema | labels, types, required, and choices are visible |
| ELI-003 | purpose/source | requester and reason are inspectable |
| ELI-004 | sensitive field | block or route manual |
| ELI-005 | valid answer | only the bounded draft step resumes |
| ELI-006 | answer versus approval | side effect remains denied |
| ELI-007 | decline | stop or manual route without pressure |
| ELI-008 | cancel | late response cannot resume |
| ELI-009 | timeout | request expires and freshness is rechecked |
| ELI-010 | invalid field | field-level correction is visible |
| ELI-011 | duplicate response | idempotent result or explicit rejection |
| ELI-012 | stale response | older request cannot target newer work |
| ELI-013 | injection-shaped result | content remains untrusted |
| ELI-014 | lost context | block and hold |
| ELI-015 | mobile/keyboard | same purpose and controls remain reachable |

For each case, record host/version, input class, expected result, observed
result, privacy impact, and `Not run` or `Not covered`. Do not summarize a
single successful answer as a completion rate or quality metric.

## Privacy-safe receipt

```yaml
package: pm-ai-agent-elicitation-to-input
decision: Hold
request_id: renewal-brief-input-v1
host: Fictional Renewal Host
requester: Renewal Brief Agent
purpose: choose an approved segment and reporting window
source: Not provided
input_mode: structured
fields:
  - segment
  - reporting_window
sensitivity: ordinary workspace metadata, not verified
state: Not run
validation: Not run
expiry: proposed 10 minutes, not enforced
continuation: draft only, not run
side_effect_authorization: Not granted
answer_recorded: false
limitations:
  - Fictional fixture; no host, model, tool, or user loop was contacted.
  - No raw answer, customer content, credential, token, cookie, or private URL is recorded.
next_action: Attach a sanitized host contract and run ELI-001 through ELI-015.
```

## Rollout, fallback, and rollback

Release gate: `Pilot / recruit` when the package is valid and source-linked but
no real host evidence exists. A pilot requires one sanitized input-required
observation and one decline, timeout, invalid, duplicate, or recovery result.
Use a manual route when the host cannot prove purpose, requester, sensitivity,
validation, or continuation scope.

Rollback removes the package from README and profile or reverts the merge if
the guidance is materially wrong. Keep the release and issue history for
correction. This documentation package never stored an answer or created a
credential, so rollback does not revoke external access.

## Not covered

- no live model, MCP server, host, form, tool, or user interaction was run;
- no claim is made about question quality, answer correctness, accessibility,
  retention, privacy, provider support, or production safety;
- no answer is treated as approval, execution, outcome, adoption, or star
  causality;
- no secret, credential, token, cookie, raw answer, customer content, private
  URL, or sensitive screen content is included.

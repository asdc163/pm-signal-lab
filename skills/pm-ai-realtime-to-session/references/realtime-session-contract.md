# Worked realtime session contract

This is a **fictional fixture** and a provider-neutral PM review. It does not
connect to a realtime service, capture audio, call a model, run VAD, mint a
credential, execute a tool, collect a transcript, or prove a user outcome.

## Source-bounded method notes

Refresh provider documentation before applying this contract to a live route:

- [Realtime and audio](https://developers.openai.com/api/docs/guides/realtime)
  distinguishes live sessions from bounded audio requests and separates
  voice-agent, translation, and transcription session paths.
- [Realtime conversations](https://developers.openai.com/api/docs/guides/realtime-conversations)
  describes a stateful session with Session, Conversation, Responses, client
  events, server events, and explicit lifecycle handling.
- [Realtime API with WebRTC](https://developers.openai.com/api/docs/guides/realtime-webrtc)
  separates browser media transport from server-side credential minting and
  recommends a scoped client credential rather than exposing a standard key.
- [Voice activity detection](https://developers.openai.com/api/docs/guides/realtime-vad)
  documents server and semantic VAD as different turn-boundary choices and
  makes interruption behavior part of the session configuration.
- [Realtime with tools](https://developers.openai.com/api/docs/guides/realtime-mcp)
  distinguishes application-owned function tools from remote MCP or connector
  tools and calls for narrow scope and approval for side effects.
- [Managing costs](https://developers.openai.com/api/docs/guides/realtime-costs)
  distinguishes per-response voice-agent costs from duration-based streaming
  paths and notes that later turns can carry more conversation input.
- [Voice agents](https://developers.openai.com/api/docs/guides/voice-agents)
  frames speech-to-speech and chained voice pipelines as deliberate choices and
  calls out barge-in, turn taking, tools, and handoffs for live voice.

These source notes are current examples, not permanent guarantees. The exact
model, event names, prices, session limits, SDKs, and policy requirements must
be recorded with an observation timestamp for a real route.

## Decision on the desk

A fictional retail support team wants a voice assistant that can answer “where
is my order?” and offer a human handoff. It must never disclose a different
customer’s order or imply that a lookup completed when the external system was
not verified.

- **Decision:** `Pilot` the contract as documentation only; `Hold` live audio
  until identity, consent, device, transport, and read-only source evidence are
  supplied.
- **Current workaround:** staff inspect a few scripted voice demos and assume
  a successful conversation means a successful order lookup.
- **Risk:** wrong customer scope, false turn boundary, unverified order status,
  duplicate tool action after reconnect, leaked transcript/audio, and no usable
  stop or text fallback.
- **Owner:** fictional Support Voice PM; real name `Not provided`.
- **Fallback:** typed status lookup or human handoff with the same identity and
  source boundary.
- **Outcome oracle:** an approved order record for the authenticated customer is
  displayed with a source receipt, or the assistant clearly routes to a human.

## Session contract

| Field | Contract value | Evidence |
| --- | --- | --- |
| `user_job` | understand an authenticated order status or reach a human | Proposed; no customer run |
| `session_type` | `voice-agent` for spoken responses; typed fallback is a separate route | Proposed |
| `architecture` | browser live audio; transport and provider are `Not provided` | Not run |
| `session_id` | opaque ID linked to principal and route/config version | Proposed |
| principal | authenticated customer; exact auth flow `Not provided` | Not run |
| data class | live audio, provisional transcript, order fields, diagnostic categories | Proposed |
| credential | server-minted scoped client capability; standard key remains server-side | Proposed; refresh provider source |
| expiry | idle timeout and maximum session duration required; exact values `Not provided` | Not measured |
| retention | raw audio and transcript default to excluded from public receipt; product retention `Not provided` | Proposed |
| terminal outcome | verified status receipt or human handoff | Proposed oracle |

## State and event ledger

| State | Entry | Visible status/control | Terminal or recovery rule |
| --- | --- | --- | --- |
| `first_use` | customer opens voice route | explain mic, data, transcript, tool, and end control | consent, decline, or typed fallback |
| `permission_denied` | browser/device rejects mic | show permission recovery and text route | retry only after user action |
| `connecting` | session negotiation starts | connecting; cancel is available | ready, timeout, or failed |
| `ready` | session and controls are ready | mic, mute, interrupt, end | listening or end |
| `listening` | input is accepted | listening; transcript marked provisional | explicit turn or timeout |
| `user_turn` | user turn is committed | user turn in progress | response or manual cancel |
| `assistant_turn` | response audio/text streams | responding; interrupt is visible | done, interrupt, tool wait, or error |
| `interrupted` | user stops output | response stopped; new turn may begin | preserve ordering; do not imply full answer |
| `tool_wait` | read-only order lookup is requested | looking up; no completion claim | verified receipt, unavailable, or timeout |
| `reconnecting` | channel drops | recovering; retry count visible | ready, expired, or typed fallback |
| `ended` | user ends or terminal outcome is recorded | session ended and receipt status | new session only |
| `expired` | credential/session lifetime ends | session expired | new scoped session; no stale retry |
| `failed` | media/policy/model/tool category fails | explain category and fallback | manual or typed route |

Each event is recorded as a redacted category with `session_id`, `turn_id`,
`response_id`, `tool_call_id`, before/after state, route/config version, and
observed time. Raw audio, transcript, customer text, and credentials are not
part of the public receipt.

## Turn and interruption policy

- First pilot uses push-to-talk because the team has no observed VAD baseline.
- A later VAD comparison must include normal speech, long pauses, noise,
  overlap, accent, language switch, and no-audio cases.
- Partial transcript is provisional; it may orient the customer but cannot
  authorize a lookup or expose data.
- User interrupt stops assistant playback immediately when the client can
  observe that postcondition. Generation and lookup cancellation are
  `Not provided`; the interface must show `cancellation not verified` if that
  is the actual state.
- If interruption arrives during a tool call, the tool may finish only if its
  scope is read-only and idempotent. The UI must wait for a receipt or state
  `outcome unknown`; it must not narrate success from an interrupted sample.

## Tool and authority contract

| Layer | Allowed | Not allowed | Oracle |
| --- | --- | --- | --- |
| voice model | answer within approved support instructions | change identity scope or invent a lookup | instruction/scope check |
| order lookup | read the authenticated customer’s approved fields | mutate order, search by another customer, expose raw secret | source receipt + scope check |
| human handoff | receive the minimum approved context | receive raw audio/transcript without policy | handoff receipt |
| typed fallback | complete the same job with visible source state | bypass identity or consent | outcome check |

The lookup call carries an idempotency key and principal scope. A reconnect
must correlate the original call before retrying. A provider `success` event is
not the outcome oracle; the order system readback or human receipt is.

## Measurement and evaluation plan

The pilot will report counts by slice before any aggregate:

| Metric | Numerator / denominator | Status |
| --- | --- | --- |
| ready success | sessions reaching ready / sessions with consent and eligible device | Not run |
| first response latency | measured first audio / eligible assistant turns | Not measured |
| interruption success | stops with visible postcondition / eligible interrupt attempts | Not measured |
| safe lookup | verified in-scope receipts / eligible lookup requests | Not measured |
| duplicate action | duplicated side effects / eligible mutating calls | Not applicable for read-only pilot; mutation out of scope |
| typed fallback completion | completed typed jobs / eligible fallback attempts | Not measured |
| cost per completed job | observed usage cost / verified status or handoff | Not provided |

Negative and recovery slices are mandatory: permission denied, false turn,
interruption, reconnect, expired credential, wrong scope, injection-looking
order note, tool unavailable, transcript/audio disagreement, mobile permission,
keyboard/focus, captions, and screen-reader status. A missing reference,
unavailable device, or zero denominator is `not-scoreable`, not pass.

## Release decision

- `Pilot` the written contract with a fictional fixture only.
- `Hold` live capture until auth scope, consent, retention, device matrix,
  provider/model/SDK, transport, source receipt, and reviewers are named.
- `Ship` a bounded read-only route only if the hard privacy, scope, stop,
  accessibility, reconnect, and outcome gates pass for the declared window.
- `Rollback` if a credential is exposed, a side effect repeats, an out-of-scope
  order is disclosed, the stop path cannot be used, or a verified receipt is
  replaced by an unverified spoken claim.

## Not run

No live voice session, microphone, speaker, browser, mobile device, provider,
model, SDK, VAD, WebRTC, WebSocket, credential, order database, tool call,
transcript, customer, human reviewer, accessibility technology, cost meter,
latency timer, or production route was used.

## Not covered

The contract does not establish audio quality, speech recognition accuracy,
turn-taking quality, interruption latency, credential validity, authorization,
privacy compliance, safety certification, tool availability, source quality,
cost, latency, mobile behavior, accessibility execution, user comprehension,
task completion, production readiness, adoption, traffic, retention, or GitHub
stars.

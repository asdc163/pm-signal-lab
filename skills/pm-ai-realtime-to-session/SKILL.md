---
name: pm-ai-realtime-to-session
description: Use when an AI product has live voice, realtime audio, translation, or streaming transcription and the team needs a bounded session contract. Choose the session type, identity, authority, transport, turn-taking, interruption, tools, consent, recovery, metrics, evaluation slices, and release decision without claiming a demo is a working product.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM AI Realtime to Session

Turn “make it realtime” into a reviewable product boundary. This is a PM
method for deciding what one live session is, who controls it, what counts as a
turn, how interruption and reconnection behave, and which evidence is needed
before a voice or audio capability can be piloted. It is not an audio client,
provider SDK wrapper, transcript store, tool executor, or voice-quality claim.

## When to use

- a product brief says “voice agent”, “live assistant”, “realtime”, “streaming”,
  “barge-in”, or “hands-free” without defining the user job and terminal state;
- a team must choose between speech-to-speech, chained speech-to-text → agent →
  text-to-speech, translation, transcription, or a non-realtime audio route;
- a live interaction needs VAD or manual turns, partial audio/transcript,
  interruption, mute, end, reconnect, expiry, or a device permission flow;
- a voice session can call a function, MCP server, connector, or other tool,
  especially when a spoken suggestion could become a real side effect;
- a provider, model, SDK, transport, credential, locale, audio policy, or
  session limit changes and the product needs a comparable migration decision;
- PM, design, engineering, safety, accessibility, or operations reviewers need
  one shared contract before runtime work starts.

## Do not use this when

- the main problem is a malformed or incomplete model response; use
  `pm-ai-output-to-schema` first;
- the main problem is output meaning, a golden set, evaluator calibration, or
  a quality gate; use `pm-ai-output-to-eval` or `pm-ai-review-to-calibration`;
- the main problem is a tool's API, authorization, or result recovery; use
  `pm-ai-tool-to-contract`, `pm-ai-mcp-to-authorization`, or
  `pm-ai-tool-call-to-recovery`;
- the interaction is an asynchronous task with no live turn boundary; use
  `pm-ai-task-to-progress` or `pm-ai-background-run-to-supervision`;
- the request is to record audio, run a model, mint a credential, call a tool,
  or certify production quality. This skill defines the decision boundary; it
  does not authorize those actions.

## Evidence boundary

Start by labelling every important fact as `Observed`, `Calculated`,
`Inferred`, `Proposed`, `Not run`, `Not measured`, or `Not covered`. A connected
transport is not a ready product. A detected speech turn is not a correct
transcript. A completed model response is not a completed user job. A tool
call is not a successful side effect. A fluent demo is not evidence of quality,
safety, accessibility, adoption, traffic, or GitHub stars.

Use current provider documentation for event names, transports, model support,
credential mechanics, session limits, and prices. Keep those source facts
separate from the provider-neutral product contract. Refresh sources before a
live decision because URLs, models, limits, and lifecycle behavior can change.

## Workflow

### 1. Frame the user job and choose the session type

Write one sentence:

> Decide whether `<route>` should use `<session type>` for user job `<job>`, at
> risk `<risk>`, with terminal outcome `<outcome>`, owner `<owner>`, fallback
> `<fallback>`, and decision `<Ship/Pilot/Iterate/Hold/Rollback/Need evidence>`.

Choose the smallest truthful session type:

| Session type | Use when | Do not imply |
| --- | --- | --- |
| `voice-agent` | the model responds, manages conversation state, and may use tools | audio intelligibility or task success is automatic |
| `translation` | the system continuously translates incoming speech | a normal assistant response/turn lifecycle applies |
| `transcription` | the product needs streaming transcript deltas without spoken model replies | a transcript is ground truth or a user outcome |
| `chained-voice` | the product needs explicit STT, agent, and TTS stages | lower latency or natural turn-taking without measurement |
| `bounded-audio` | the input/output is a file or bounded request | an open live session is necessary |

If the requested job, response modality, or terminal outcome is missing, keep
the session type `Unknown`, list the missing decision, and stop before choosing
a transport. Do not select voice because it is fashionable.

### 2. Freeze session identity, authority, and expiry

Create a session ledger before drawing UI or API events:

| Field | Product decision |
| --- | --- |
| `session_id` | stable, non-sensitive ID that survives event correlation but does not contain raw user data |
| owner/principal | user, account, device, agent, or service that may start/end the session |
| job/route | one user job and one model/provider/SDK route; record a config version |
| modality | input/output audio, text, image, transcript, or translation stream |
| transport | browser/device WebRTC, server WebSocket, telephony, or `Unknown` with reason |
| credential | who mints it, where the standard key stays, scope, expiry, rotation, and revocation |
| authority | what the model may say, read, propose, or execute; what still needs a person |
| data class | raw audio, transcript, derived state, customer content, secret-looking value, or public fixture |
| lifecycle | start condition, idle timeout, maximum duration, end event, retention, and reopen rule |

Never put a standard provider API key in a browser or mobile client. Treat an
ephemeral client secret as a scoped, expiring capability, not as proof that the
user has consented or that the route is safe. Record authorization separately
from authentication, and record user consent separately from both.

### 3. Draw the state machine and event ledger

At minimum, define these states and their recovery:

| State | Entry / visible status | Exit / recovery |
| --- | --- | --- |
| `first_use` | explain mic, data, model/tool scope, transcript policy, and end control | consent, decline, or text/manual fallback |
| `permission_denied` | microphone or audio route is unavailable | device/browser instructions, retry, or non-audio fallback |
| `connecting` | connection is being negotiated; no turn is complete | ready, timeout, cancel, or failed |
| `ready` | session exists and controls are available | listening, ended, expired, or failed |
| `listening` | input is accepted; show mute and stop | user turn, permission loss, cancel, or reconnect |
| `user_turn` | speech is being captured or committed | assistant turn, manual end, interruption, or error |
| `assistant_turn` | output audio/text is streaming | done, interrupted, tool wait, reconnect, or error |
| `interrupted` | output was stopped by the user or a new turn | new user turn, resume policy, or end |
| `tool_wait` | an action proposal is pending or executing | approve, reject, timeout, receipt, or failure |
| `reconnecting` | network/session channel is recovering | ready, bounded retry exhausted, or manual fallback |
| `ended` | terminal status and receipt are visible | reopen only through a new session policy |
| `expired` | credential/session lifetime ended | start a new scoped session; do not silently reuse stale authority |
| `failed` | connection, policy, model, media, or tool category is known | preserve diagnostic category and provide a safe next route |

For each event, retain only the minimum needed for diagnosis:
`timestamp`, `session_id`, `turn_id`, `item_id`, `response_id`,
`tool_call_id`, `state_before`, `state_after`, route/config version, and a
redacted outcome category. Do not publish raw audio, transcript, prompts,
customer text, credentials, cookies, or private URLs.

### 4. Define turns, silence, and interruption

Choose whether turns come from server-side VAD, semantic VAD, a push-to-talk
control, explicit commit, or a hybrid. Record the false-start, false-stop,
overlap, noise, pause, language-switch, and no-audio slices before choosing a
threshold. For every turn policy answer:

1. What makes a user turn start and end?
2. Is partial audio or transcript provisional, and who may see or act on it?
3. When may the assistant begin speaking?
4. What does barge-in stop: playback, generation, tool execution, or only UI?
5. Does the interrupted output remain in conversation state, and how is its
   causal relationship preserved?
6. If a user says “stop” while a tool is running, can the tool be cancelled, or
   must the product show that cancellation is not guaranteed?
7. What is the manual, text, human, or retry fallback when audio is unclear?

Use separate evidence for audio, transcript, response, tool, and outcome. A
visible transcript may help orientation but must not silently become a source
of truth for an irreversible action.

### 5. Choose transport and architecture by job

Compare the route at a product level:

| Route | Product fit | Review questions |
| --- | --- | --- |
| browser/device WebRTC | live browser audio and low-latency interaction | permission, device route, ephemeral credential, reconnect, accessibility |
| server WebSocket | server media pipelines, telephony, or explicit event control | audio buffering, backpressure, server key boundary, retry, cost |
| SIP/telephony | phone network or call-center workflow | consent, recording, transfer, caller identity, hangup, jurisdiction |
| chained voice | approval-heavy or transcript-first workflow | intermediate text policy, deterministic checks, stage failure, latency |
| bounded request | file transcription or generated speech | upload/retention, job status, cancel, download, no fake “live” state |

The choice must name what the route can prove and what it cannot. If a browser
client needs a standard key, server-side authority, or unavailable device API,
hold the connection design rather than hiding the mismatch in a happy path.

### 6. Separate conversation from side effects

For each tool or handoff, record `tool_id`, purpose, executor, input schema,
allowed scope, data sent, approval rule, idempotency key, timeout, cancellation,
result, receipt, and outcome oracle. Apply these rules:

- a spoken suggestion is not an authorization;
- a function tool owned by the application is not the same as a remote MCP tool
  or connector;
- read actions may have a lower approval threshold than mutating actions, but
  the policy must be explicit;
- a retried or reconnected call must not duplicate a booking, payment, message,
  deletion, or other durable side effect;
- after a tool result, verify the external outcome before telling the user it
  happened; if verification is missing, say `Not verified`;
- if a tool is unavailable, preserve the conversation and offer a manual or
  text route rather than inventing a completion.

### 7. Define metrics, slices, and oracles before a live run

Use a ledger with numerator, denominator, window, route/config version, and
owner. Useful candidates include time to ready, first-audio latency, turn-end
latency, interruption stop latency, false-turn rate, reconnect recovery rate,
tool duplicate rate, cost per eligible session, cost per completed job,
completion rate, fallback rate, and accessible stop success. A lower latency or
cost is not an improvement if safe completion or comprehension worsens.

Minimum slices:

- representative quiet/normal session;
- permission denied, muted, no microphone, and no-audio input;
- false start, long pause, overlap, noise, accent, language switch, and
  transcript/audio disagreement;
- user interruption during assistant output and during a tool wait;
- network drop, reconnect, expired credential, duplicate/late event, and
  session timeout;
- prompt injection or secret-looking content in spoken or retrieved input;
- rejected, edited, deferred, and unverified tool actions;
- mobile background/foreground, headset/speaker switch, keyboard, captions,
  reduced motion, focus, and screen-reader status;
- model/provider/SDK/config change and changed billing or distribution.

Name the hard negative slices explicitly in the contract: `wrong session type`,
`false turn boundary`, `interruption loss`, `reconnect duplication`,
`permission/consent failure`, `leaked secret`, `tool side effect`,
`transcript/audio mismatch`, `cost drift`, and `accessibility failure`. Each
slice needs an expected label, denominator, owner, and recovery; an aggregate
that omits one of these slices is not a complete release gate.

Assign the smallest oracle: deterministic state/event checks first; source or
reference checks for declared facts; trained human review for comprehensibility,
turn-taking, and accessibility; product outcome checks for the user job. Keep
`pass`, `fail`, `abstain`, `conflict`, `invalid`, `drift`, `not-scoreable`, and
`manual` visible. Zero eligible cases are `not-scoreable`, not a perfect score.

### 8. Make the decision and the next learning action explicit

Return one of:

| Decision | Use when | Required next action |
| --- | --- | --- |
| `Ship` | package and required product gates pass for the declared scope | monitor the named slices and rollback trigger |
| `Pilot` | the contract is coherent but live/user evidence is still bounded | run only the approved route and collect sanitized observations |
| `Iterate` | evidence exposes a fixable contract or UX gap | change one hypothesis and rerun affected slices |
| `Hold` | authority, consent, recovery, accessibility, or oracle is missing | name owner and exact evidence needed |
| `Rollback` | a release causes unsafe, duplicated, inaccessible, or unverifiable behavior | disable route, preserve receipt, restore prior version |
| `Need evidence` | the question cannot be answered from current artifacts | specify data class, source, reviewer, and observation window |

Do not turn a release count, a hosted demo, a repository clone, a star, or a
traffic snapshot into user adoption evidence.

## Output contract

Return every field below. `Unknown`, `Not provided`, `Not run`, `Not measured`,
and `Not covered` are valid values; omission is not.

| Field | Required content |
| --- | --- |
| `decision` | Ship/Pilot/Iterate/Hold/Rollback/Need evidence, blocker, owner, TTL, fallback, next action |
| `user_job` | user, job, workaround, risk, terminal outcome, and success oracle |
| `session_type` | voice-agent, translation, transcription, chained-voice, bounded-audio, or Unknown with reason |
| `architecture` | live/non-live route, transport, modality, provider/model/SDK/config version, and source date |
| `session_identity` | session ID policy, principal, start/end/expiry, retention, and data class |
| `authority` | what the client, model, tool, human, and fallback may read, say, propose, or execute |
| `state_machine` | first-use, permission, connect, ready, turn, interrupt, tool, reconnect, expiry, end, and fail states |
| `turn_policy` | VAD/manual mode, start/stop, partial state, false-turn slices, locale/noise assumptions, and manual control |
| `interruption_policy` | barge-in trigger, what stops, causal ordering, cancellation guarantee, and user-visible result |
| `transport_credentials` | connection, server/client boundary, ephemeral/standard credential, scope, rotation, revocation, and permission recovery |
| `tool_side_effects` | tool type, executor, approval, input/output, idempotency, retry/cancel, receipt, and outcome verification |
| `privacy_accessibility` | consent, raw audio/transcript policy, redaction, retention/delete, non-audio status, keyboard/focus, mobile fallback |
| `observability` | correlation IDs, lifecycle events, redacted fields, sampling/retention, latency, cost, and failure categories |
| `evaluation` | slice registry, oracle owner/version, denominator, exclusions, uncertainty, and baseline/candidate or migration plan |
| `release_recovery` | ship/pilot/hold trigger, rollback trigger, incident owner, disabled route, and reopen path |
| `not_covered` | live audio/model quality, semantic transcript truth, provider availability, safety certification, accessibility execution, user outcome, adoption, traffic, and stars not established by this contract |

## Edge cases

- No user job or terminal outcome: keep `session_type` unknown and request the
  missing decision instead of choosing an API.
- A translation or transcription stream is forced into a voice-agent response
  lifecycle: classify the route mismatch and hold.
- A provider says “connected” but the app has no ready state: keep the product
  in `connecting` and define the missing postcondition.
- VAD ends a turn while the user is pausing: record a false-stop slice and make
  manual commit or retry visible.
- VAD never ends a turn in noise: record a false-start/timeout slice and cap
  capture; do not let audio run forever.
- The user interrupts while audio is playing: state whether playback,
  generation, tool execution, and billing stop independently.
- The transcript disagrees with audio: preserve both as provisional evidence,
  ask for correction or confirmation, and block high-impact action.
- A reconnect replays a tool call: correlate IDs, use idempotency, verify the
  external outcome, and tell the user if completion is unknown.
- A late event arrives after `ended`: ignore or quarantine it by policy; never
  reopen a session silently.
- An ephemeral credential expires: show expiry and start a new scoped session;
  do not reuse a stale token.
- A user declines microphone access: preserve the job and offer typed, upload,
  or human fallback without repeated permission prompts.
- A prompt injection appears in speech, transcript, tool result, or retrieved
  context: treat it as untrusted data and do not expand authority.
- A spoken approval is ambiguous: ask for explicit confirmation for a durable
  side effect; silence or “maybe” is not approval.
- A tool returns success but the external system cannot be read back: display
  `Not verified`, keep the receipt, and do not claim the outcome.
- A model/provider/config changes: classify as drift and pair baseline/candidate
  on the same slices before changing a quality or cost claim.
- A session is expensive because conversation history grows: define truncation,
  compaction, or restart policy and measure the completed-job denominator.
- Audio is unavailable to a deaf or hard-of-hearing user: provide text status,
  captions/transcript policy, editable input, and an accessible stop control.
- A mobile app is backgrounded or a headset changes: show the new media state,
  preserve session authority only while valid, and offer reconnect/end.
- Zero eligible or missing-reference cases: report `not-scoreable` with counts;
  never fill a denominator with zero or pass.

## Final check

- [ ] The output names one user job, risk, owner, terminal outcome, fallback, and decision.
- [ ] Session type is chosen from the job and response modality, not from trend language.
- [ ] Session ID, principal, route/config version, modality, transport,
  credential, data class, expiry, retention, and authority are explicit.
- [ ] First-use, permission, connecting, ready, listening, user turn, assistant
  turn, interrupted, tool wait, reconnecting, ended, expired, and failed states
  have visible status and recovery.
- [ ] Turn detection, partial result status, false-turn slices, manual control,
  barge-in, cancellation, and causal ordering are explicit.
- [ ] Browser/server/telephony/chained transport and standard/ephemeral key
  boundaries are separated; no secret is requested in the public artifact.
- [ ] Tool executor, scope, approval, idempotency, retry, cancellation,
  receipt, and outcome verification are separated from conversation.
- [ ] Privacy, consent, retention/delete, injection handling, mobile,
  accessibility, keyboard/focus, and non-audio fallback are visible.
- [ ] Metrics have numerator, denominator, window, route/version, and owner;
  cost and latency do not override safety or completed-job evidence.
- [ ] Positive, negative, ambiguity, privacy/injection, reconnect, tool,
  drift, regression, and accessibility slices have explicit oracles.
- [ ] `pass`, `fail`, `abstain`, `conflict`, `invalid`, `drift`,
  `not-scoreable`, and `manual` are not hidden in one aggregate.
- [ ] `Not run`, `Not measured`, and `Not covered` remain visible for all
  unexecuted runtime, model, device, user, adoption, traffic, and star claims.
- [ ] The next action, owner, observation window, rollback trigger, and manual
  fallback are concrete enough for another person to execute.

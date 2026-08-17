# First run: support concierge voice session

This is a **fictional fixture** for learning the skill. It is not a live
conversation, audio recording, transcript, provider call, model result, tool
execution, usability session, production metric, or evidence that a voice
experience works.

## Request

A fictional support team wants a browser voice concierge. The assistant should
answer simple order-status questions and offer a typed fallback when the
customer cannot or does not want to use a microphone. The brief says “make it
realtime” but does not specify the provider, model, SDK, browser matrix,
retention policy, or order-system integration.

## Contract

- `decision`: `Hold` the live pilot; define the contract first.
- `user_job`: help a customer understand an order status and, if needed, route
  them to a human without exposing another customer's information.
- `terminal_outcome`: the customer receives a source-backed status or a clear
  human handoff; a spoken answer alone is not completion.
- `session_type`: `voice-agent` is proposed because the assistant responds and
  may read order data. A transcription-only or translation route would not
  satisfy the spoken-response job.
- `architecture`: browser live audio route is proposed. Provider/model/SDK,
  WebRTC/WebSocket choice, browser/device support, and server session endpoint
  are `Not provided`.
- `session_identity`: issue a non-sensitive `session_id`; associate it with an
  authenticated customer principal, route version, expiry, and retention class.
  Exact identity and authentication are `Not provided`.
- `authority`: the assistant may explain an approved order-status record. It
  may not change an order, issue a refund, reveal another customer’s record, or
  claim a lookup succeeded without a verified receipt.
- `turn_policy`: start with explicit push-to-talk for the first pilot; compare
  it with a declared VAD mode on representative noise, pause, overlap, and
  accent slices. Partial transcript is provisional and cannot authorize a
  lookup by itself.
- `interruption_policy`: the customer can stop assistant playback. Whether
  generation or an order lookup can be cancelled is `Not provided`; the UI must
  say when cancellation is not guaranteed.
- `tool_policy`: order lookup is a read-only function tool with customer-scope
  authorization. Approval and idempotency are still required for any future
  mutation. A tool result needs a receipt and an outcome check before display.
- `privacy_accessibility`: microphone consent, transcript visibility, raw audio
  retention, deletion, captions, keyboard focus, screen-reader status, mobile
  permission, and typed fallback are required decisions; all are `Not provided`.
- `evaluation_slices`: normal question, denied permission, mute/no audio,
  false turn, interruption, reconnect, expired credential, wrong customer
  scope, prompt injection in an order note, tool unavailable, transcript/audio
  mismatch, mobile, keyboard, and screen-reader status.
- `release_gate`: `Pilot` only after the owner supplies provider/model/SDK,
  approved auth and data policy, device matrix, turn policy, read-only fixture,
  and an oracle for source-backed order status. Otherwise `Hold`.

## Fictional readout

No score is calculated. The fictional artifact identifies the important
decisions and the missing denominator, reference order record, transport,
credential, browser/device evidence, trained reviewer, and user outcome window.
The most valuable first experiment is not “does the voice sound good?” It is
whether a customer can complete a read-only status lookup, stop or switch to
text, and understand when the system has not verified a result.

## Recovery questions

1. Which order fields are allowed in the assistant response, and what source
   snapshot or API receipt proves the answer?
2. Does push-to-talk reduce false turns enough to justify the extra control, or
   does it block the intended hands-free job?
3. What exactly stops when the customer interrupts: playback, generation, the
   read-only lookup, or only the visible response?
4. What happens after a network drop or expired credential, and how is a late
   lookup prevented from leaking or repeating?
5. Can a customer complete the same job with keyboard, captions/transcript, or
   typed fallback without losing the consent and privacy boundary?

## Not run

No microphone, speaker, browser, mobile device, WebRTC or WebSocket connection,
provider, model, SDK, credential, session, VAD, transcript, audio file, order
record, tool, customer, human reviewer, accessibility technology, dashboard,
latency measurement, cost measurement, production route, or external user was
used.

## Not covered

Voice quality, turn accuracy, interruption latency, transcript correctness,
source truth, authorization, privacy compliance, security, safety, tool
idempotency, reconnect behavior, cost, latency, accessibility, mobile behavior,
user comprehension, task completion, adoption, traffic, production readiness,
and GitHub stars are not established by this fictional fixture.

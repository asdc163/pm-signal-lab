# First run: live support translation

This is a **fictional fixture** for learning the skill. It is not a live
translation session, audio recording, transcript, provider call, model result,
bilingual review, production metric, or evidence that multilingual users can
complete a task.

## Request

A fictional support team wants to let an English-speaking agent and a
Spanish-speaking customer communicate in a live chat and optional voice room.
The product brief says “translate in real time” and includes order numbers,
delivery dates, refunds, and consent language. It does not specify Spanish
locale, audience, glossary, source retention, reviewer, transport, or fallback.

## Contract

- `decision`: `Hold` a live quality claim; pilot the documentation contract
  only.
- `job`: preserve the agent's and customer's intended support meaning so the
  customer can understand an order status or reach a human, without changing a
  refund, date, amount, consent, or identity instruction.
- `translation_type`: `translation`, not transcription, summarization, or an
  assistant answer. The source and target users remain the speakers.
- `source_contract`: English and Spanish are proposed source alternatives;
  dialect, locale, script, detection, context version, and data class are `Not
  provided`.
- `target_contract`: the other participant's language is proposed, but the
  target locale, register, audience, and selection policy are `Not provided`.
- `meaning_ledger`: order number, date, currency, refund amount, negation,
  consent, urgency, and “may/must” are exact hard fields. Greeting tone may
  adapt only with a declared register policy. Idioms and unclear source text
  require ask/show-source/abstain.
- `route`: a continuous live translation stream is proposed. Provider/model/
  SDK, endpoint, WebRTC/WebSocket choice, audio/text mode, and client secret
  boundary are `Not provided`.
- `output_states`: source-visible, provisional, final, ambiguity,
  terminology-conflict, correction, privacy-blocked, failed, and manual
  fallback must be visible. A provisional segment cannot trigger a refund or
  consent state.
- `terminology`: glossary ID/version and owners for order, delivery, refund,
  and consent terms are `Not provided`; literal fallback is safer than an
  invented business term.
- `correction_fallback`: each participant can compare source and target, ask
  for clarification, correct a segment, switch to typed text, or request a
  human. Corrections are observations, not implicit training permission.
- `evaluation_slices`: ordinary support, changed negation, date/currency/unit,
  order-number entity, idiom, dialect, code-switch, missing context, partial
  stream, duplicate/lost segment, glossary conflict, secret-looking source,
  prompt injection, correction failure, screen reader, directionality, and
  typed fallback.
- `oracle`: deterministic checks for numbers/entities/required terms; trained
  bilingual review for meaning/register; target-user task check for safe order
  understanding; model judge only as calibrated supporting evidence.
- `release_gate`: `Pilot` after locale, glossary, source retention, privacy,
  reviewer, hard slice, correction, accessibility, and fallback evidence exist;
  otherwise `Hold`.

## Fictional readout

No parity score is calculated. The missing facts are more important than a
fluent sample: which Spanish locale, who owns the refund terminology, what is
provisional, whether source text can be retained, how a customer corrects a
date, and what proves the customer understood the order status.

## Recovery questions

1. Which fields must remain exact, and can the source and target be compared
   without exposing another customer's data?
2. What should happen when the phrase “you may receive a refund” is rendered as
   a definite promise?
3. Can a live segment be revised after context arrives, and can anyone act on
   it before it is final and verified?
4. What is the manual route when language detection, dialect, glossary, or
   audio quality is uncertain?
5. Does the target user have an accessible source/target/correction control
   without relying on audio, color, or a single writing direction?

## Not run

No audio, microphone, speaker, browser, mobile device, language detector,
provider, model, SDK, translation session, WebRTC, WebSocket, client secret,
transcript, customer, order record, glossary, bilingual reviewer, target-user
test, accessibility technology, latency timer, cost meter, production route, or
external user was used.

## Not covered

Semantic parity, fluency, dialect/register quality, entity/number/date/unit
accuracy, terminology compliance, source truth, privacy, consent, safety,
latency, cost, segment ordering, correction recovery, target-user
comprehension, accessibility, certified/legal/medical translation, production
readiness, adoption, traffic, and GitHub stars are not established by this
fictional fixture.

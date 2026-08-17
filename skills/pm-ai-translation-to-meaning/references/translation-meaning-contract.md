# Worked translation-to-meaning contract

This is a **fictional fixture** and a provider-neutral PM review. It does not
translate text or audio, call a model, run a language detector, load a glossary,
collect a transcript, ask a bilingual reviewer, measure a target-user outcome,
or prove a release decision.

## Source-bounded method notes

Refresh official documentation before applying this contract to a live route:

- [Realtime translation](https://developers.openai.com/api/docs/guides/realtime-translation)
  describes a dedicated continuous translation session that streams source
  audio into translated audio and transcript deltas. It distinguishes the
  interpreter route from a voice-agent response lifecycle.
- [Realtime and audio](https://developers.openai.com/api/docs/guides/realtime)
  separates voice-agent, translation, transcription, and bounded audio paths.
- [GPT-Realtime-Translate model](https://developers.openai.com/api/docs/models/gpt-realtime-translate)
  currently describes streaming speech-to-speech translation and duration-based
  billing. Model availability, pricing, limits, and names are time-bound.
- [Realtime transcription](https://developers.openai.com/api/docs/guides/realtime-transcription)
  is a distinct live transcript path; transcript output is not automatically a
  target-language translation or semantic oracle.
- [Realtime WebRTC](https://developers.openai.com/api/docs/guides/realtime-webrtc)
  separates browser media from server-side short-lived client capability. This
  contract does not mint credentials or connect a client.
- [Your data](https://developers.openai.com/api/docs/guides/your-data)
  describes provider data-handling considerations that must be checked at the
  current route. It does not replace product privacy, consent, or legal review.

These notes are current examples, not universal guarantees. Record the source
timestamp, provider/model/SDK, language policy, and observed route for a real
decision.

## Decision on the desk

A fictional travel-support product wants to translate a passenger's live
English speech into Japanese captions for a support specialist. The passenger
may mention booking codes, dates, passport names, airport abbreviations, and
refund rules. The product must preserve meaning and must not turn provisional or
ambiguous output into a booking or refund action.

- **Decision:** `Pilot` the written contract only; `Hold` a live customer route
  until language/locale, source retention, privacy, glossary, reviewer,
  accessibility, and target-user outcome evidence are named.
- **Current workaround:** staff compare a few fluent target sentences and
  assume that the customer understood the same instruction.
- **Risk:** changed negation, date/timezone, currency, booking code, consent,
  refund promise, airport name, or urgency; plus lost segments, source leakage,
  and no correction route.
- **Owner:** fictional Travel Language PM; real name `Not provided`.
- **Fallback:** source-visible typed exchange or human interpreter with the
  same identity and privacy boundary.
- **Outcome oracle:** a target-language user can correctly restate the approved
  next step or reach a human; hard fields match the source/reference.

## Language and meaning contract

| Field | Contract value | Evidence |
| --- | --- | --- |
| source | English speech; speaker/locale/dialect `Not provided` | Proposed |
| target | Japanese captions; region/register/script policy `Not provided` | Proposed |
| job | preserve support meaning for a safe next step | Proposed |
| channel | live captions with source comparison and typed fallback | Proposed |
| context | current support turn plus approved booking context; version `Not provided` | Not run |
| terminology | booking code, airport, date, currency, refund, consent glossary `Not provided` | Not provided |
| output | provisional segment then final/edited target caption | Proposed |
| privacy | booking/passport/customer data; raw audio/transcript retention `Not provided` | Not run |
| route | provider/model/SDK/transport/config `Not provided` | Not run |
| outcome | verified next step or human handoff | Proposed oracle |

### Meaning ledger

| Unit | Preservation rule | Expected label |
| --- | --- | --- |
| booking code | preserve characters and order; show source on mismatch | exact/check |
| passenger name | preserve approved spelling; do not infer identity | exact/abstain |
| date/timezone | retain calendar date and timezone; localize only with policy | exact/check |
| amount/currency | preserve value and currency; no rounding without policy | exact/check |
| negation/modality | preserve “not”, “may”, “must”, “cannot”, and uncertainty | hard fail/abstain |
| refund/consent | do not turn possibility or request into promise/approval | hard fail/block |
| airport/product term | use approved glossary or show source | glossary/check |
| tone/urgency | adapt register only within locale policy | human review |
| unclear idiom | ask or show alternatives | manual/abstain |
| action argument | no booking, refund, or permission action from provisional text | block until verified |

## Output states and recovery

| State | User-visible status | Recovery and oracle |
| --- | --- | --- |
| `first_use` | choose source/target language and see data notice | explicit choice/consent or typed/manual fallback |
| `source_unknown` | detected language/locale is uncertain | ask user or language reviewer; no silent guess |
| `connecting` | live translation is starting | cancel/timeout; no final meaning yet |
| `provisional` | target may change with context | wait/compare; no durable action |
| `final` | segment committed for the declared version | source/target comparison and hard-field checks |
| `ambiguous` | two meanings remain plausible | show alternatives, ask, or abstain |
| `terminology_conflict` | source and glossary disagree | show source/glossary/version and assign owner |
| `privacy_blocked` | route cannot receive this source class | redact/local/manual route; no egress |
| `correction` | user or reviewer reports a meaning issue | de-identified case with source/output/config versions |
| `reconnecting` | stream lost or reordered | preserve segment IDs/source order; show missing output |
| `failed` | target unavailable or unverified | source-preserving manual/typed fallback |
| `ended` | session/output receipt is complete | preserve version and correction route |

## Evaluation contract

Report slice counts before an aggregate:

| Metric | Numerator / denominator | Status |
| --- | --- | --- |
| hard meaning pass | cases with exact entities/numbers/dates/negation/action / eligible hard cases | Not run |
| safe abstention | correct ask/abstain/manual outcomes / eligible ambiguity cases | Not run |
| terminology compliance | approved terms rendered correctly / eligible glossary terms | Not measured |
| correction burden | accepted target edits / eligible reviewed segments | Not measured |
| target-job success | target users completing the declared task / eligible target-user sessions | Not measured |
| provisional revision | revised committed segments / eligible live segments | Not measured |
| segment recovery | ordered, non-duplicated segments / eligible stream segments | Not measured |
| cost per job | route cost / completed target-user job | Not provided |

Required slices: ordinary cases, hard negation/numbers/dates/units/entities,
idiom/ambiguity, dialect/code-switch/register, glossary conflict, stale or
missing context, partial/late/duplicate stream, correction, privacy/secret,
injection, target-language comprehension, captions/directionality,
keyboard/screen-reader/mobile, fallback, and route/model/glossary drift.

The primary gates are deterministic hard-field checks, independent language
review, and target-user outcome. A model judge may rank or flag examples only
after anchor calibration and cannot override a hard meaning or privacy failure.
No source/reference or no eligible case is `not-scoreable`, not a pass.

## Release decision

- `Pilot` the written method and fictional fixture.
- `Hold` live translation until source/target locale, terminology, data policy,
  route, correction, reviewer, accessibility, and outcome oracle are supplied.
- `Ship` only the declared language/domain scope after hard meaning, privacy,
  correction, target-user, and fallback gates pass for the observation window.
- `Rollback` if a target user can act on a changed hard field, source data leaks,
  a provisional segment triggers a side effect, or correction/recovery is lost.

## Not run

No speech, text, audio, transcript, language detector, provider, model, SDK,
translation endpoint, WebRTC/WebSocket route, credential, glossary, booking
data, customer, bilingual reviewer, target-user, accessibility technology,
latency timer, cost meter, production route, or external user was used.

## Not covered

Semantic parity, fluency, dialect/register quality, entity/number/date/unit
accuracy, glossary compliance, source truth, privacy compliance, consent,
safety, latency, cost, stream ordering, correction quality, target-user
comprehension, accessibility execution, certified/legal/medical translation,
production readiness, adoption, traffic, retention, and GitHub stars are not
established by this fictional fixture.

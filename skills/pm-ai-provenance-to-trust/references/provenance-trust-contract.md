# Worked contract: fictional provenance states for an AI media workspace

This is a **fictional fixture** for learning the skill. It is not a live asset,
verification service, cryptographic result, trust-list decision, factuality
review, legal opinion, or production user experience.

## Contents

- [Decision frame](#decision-frame)
- [Source and capability ledger](#source-and-capability-ledger)
- [Asset and provenance ledger](#asset-and-provenance-ledger)
- [Verification state matrix](#verification-state-matrix)
- [User copy and downstream boundaries](#user-copy-and-downstream-boundaries)
- [Transformation and recovery map](#transformation-and-recovery-map)
- [Evaluation and privacy](#evaluation-and-privacy)
- [Release and writeback](#release-and-writeback)
- [Not covered](#not-covered)

## Decision frame

| Field | Fictional contract |
| --- | --- |
| `decision` | Decide what provenance state a collaboration workspace should show for an AI-generated product image and whether a human may use it in a campaign review. |
| `user/job` | Help a marketer understand origin and edit history without mistaking a signal for truth, rights, safety, or a recommendation to publish. |
| `audience/surface` | Internal workspace reviewers first; public badge is out of scope for the pilot. |
| `protected interest` | Creator privacy, accurate context, reviewability, and protection from overconfident trust signals. |
| `false positive` | A missing or conflicting signal is presented as proof of human authorship or an untouched original. |
| `false negative` | A valid provenance signal is ignored or a legitimate asset is blocked because a transformation lost metadata. |
| `owners` | Fictional asset PM, workspace privacy lead, editorial reviewer, and campaign approver. |
| `release choice` | `pilot` for one image route with manual review; no automatic publication or ranking. |

## Source and capability ledger

These sources describe standard/provider capabilities and limitations. They do
not verify this fictional asset or authorize a product action.

| Source | Capability context | PM boundary |
| --- | --- | --- |
| [OpenAI content provenance announcement](https://openai.com/index/advancing-content-provenance/) | OpenAI describes a layered approach combining C2PA, SynthID, and public verification; it notes metadata can be stripped or broken by transformations and that no detection method is foolproof. | Show signal and limitation separately; missing metadata is not a human-authorship conclusion. |
| [OpenAI verification tool](https://openai.com/research/verify/) | The tool describes checking supported C2PA metadata and SynthID signals for OpenAI-generated image/audio and says a detected signal indicates likely origin, not accuracy or context. | Scope the result to supported provider/modality and preserve no-signal/other-provider uncertainty. |
| [C2PA 2.4 technical specification](https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html) | The specification describes signed manifests, assertions, bindings, trust model, tamper evidence, privacy, and preservation across workflows. | A valid manifest supports integrity/provenance interpretation, not factual truth or a value judgment. |
| [C2PA explainer](https://c2pa.org/specifications/specifications/2.2/explainer/Explainer.html) | The explainer distinguishes provenance from truth, says credentials are optional, describes hard/soft bindings, incomplete history, and user presentation. | Never make absence a universal distrust rule; give users bounded context and their own decision. |
| [Google DeepMind SynthID](https://deepmind.google/models/synthid/) | Google describes invisible watermarks across supported AI-generated image, audio, text, and video routes and a detector/verification experience. | Treat watermark coverage, robustness, and detector result as provider-specific; evaluate the product route. |

**Source status:** sources were read on `2026-08-17` for this fictional
reference. No asset, API, parser, trust list, or detector was run.

## Asset and provenance ledger

Fictional asset `asset-fx-014` is a product image with a caption and two
versions: `source-1` from a generator and `workspace-2` after a crop and export.

| Field | Fictional value | Status / question |
| --- | --- | --- |
| `asset_id/hash` | `asset-fx-014` / hash `Not run` | Must identify the exact bytes or stable version. |
| `modality` | image plus caption | Audio/video/text-only coverage is separate. |
| `parent/ingredients` | generator output `source-1`; crop/export `workspace-2` | Ingredient binding is `Not run`. |
| `manifest` | Content Credential claimed on `source-1`; absent on `workspace-2` | Could be stripped or not created; do not infer why. |
| `assertions` | fictional origin and crop action | Assertion author/authority is `Not provided`. |
| `signer` | fictional generator certificate | Trust-list membership and purpose are `Not run`. |
| `hard binding` | source-to-manifest match `Not run` | A mismatch would not by itself explain every user question. |
| `soft binding` | watermark/fingerprint `Not run` | Provider/modality coverage is `Unknown`. |
| `transformation` | crop, resize, JPEG export, workspace upload | Which operation stripped/changed metadata is `Unknown`. |
| `retention` | raw source retention `Not decided` | Minimize the source and identity fields before pilot. |

The fictional ledger keeps `Observed`, `Claimed`, `Not run`, and `Unknown`
separate. It does not turn the contributor's assertion into a verified fact.

## Verification state matrix

| State | Evidence needed | User-facing copy | Downstream route |
| --- | --- | --- | --- |
| `verified_provenance` | asset binding, signature/status, signer scope, and requested history pass | “This check verified `<specific origin/history>` under `<scope>` at `<time>`. It does not establish accuracy or safety.” | campaign review may inspect; publication remains separate |
| `valid_unknown_signer` | binding/signature passes, signer outside product trust scope | “The credential is technically valid, but this signer is not recognized for this workspace.” | manual trust decision; no green trust badge |
| `modified_or_binding_broken` | asset no longer matches a claimed binding or validation fails | “The file does not match the recorded provenance at `<step>`.” | hold consequential use; request original or review |
| `incomplete_history` | some ingredient/edit/timestamp missing | “Part of the history is available; unrecorded changes may exist.” | continue only with explicit human review |
| `signal_conflict` | metadata, watermark, signer, or validator disagree | “The available provenance signals conflict. We have not resolved them.” | hold/route to specialist; preserve each signal |
| `no_supported_signal` | verifier found no supported signal | “This check found no supported provenance signal. It cannot determine how the file was made.” | do not infer human-made; manual route |
| `unsupported` | file/modality/provider outside verified scope | “This file is outside the supported verification route.” | unknown/manual; no automatic decision |
| `unavailable` | verifier, trust list, or network failed | “Verification is temporarily unavailable.” | retry/manual with receipt and TTL |
| `unknown` | evidence cannot answer requested question | “We cannot answer that provenance question from the available evidence.” | ask narrower question or hold |

### Copy guardrails

- Say **“signal detected”**, **“credential validated under this trust scope”**,
  or **“not detected by this check”**; do not say **“real,” “safe,” “human-made,”
  “fake,”** or **“true”** unless an independent, separately verified decision
  supports it.
- Explain a provider boundary: a verifier for OpenAI-generated content is not a
  detector for every AI system.
- Show the state, evidence time, validator/version, signer scope, and missing
  checks in details; keep the default view concise and accessible.
- Let the user inspect, request the original, report a mismatch, retry, or use
  a manual route. Never make the badge the only path to the asset.

## User copy and downstream boundaries

| Downstream decision | Owner | Required separate evidence |
| --- | --- | --- |
| moderation | Trust & Safety | policy version, content signal, review/appeal, enforcement |
| factuality | Editorial/research | source evidence, context, claim review, correction |
| rights/copyright | Legal/rights | license, ownership, permissions, jurisdiction |
| identity | Privacy/identity | consent/authority, identity proof, scope, correction |
| ranking/access | Product policy | eligibility, fairness, abuse controls, user impact |
| publish/share/report | Product/operations | user intent, content policy, review, rollback |

A provenance state can be an input to these routes only through a named
contract. A valid credential cannot bypass them; a missing credential cannot
automatically fail them.

## Transformation and recovery map

| Transition | Signal risk | Required receipt / recovery |
| --- | --- | --- |
| create → edit | new action may be unrecorded | append or refresh provenance; record editor/tool/version |
| edit → export | format change may strip manifest | verify exported bytes; show incomplete/no-signal if needed |
| upload → platform thumbnail | resize/recompression may break binding | retain source reference, compare version, avoid universal inference |
| download → screenshot | metadata may disappear; image pixels may change | treat as a new asset; verify separately |
| provider check → user state | detector scope may be narrower than user question | state supported provider/modality and no-signal limit |
| signer change/revocation | trust interpretation may change after prior display | mark stale/recheck, preserve old receipt and new state |
| correction/removal | identity or assertion may need withdrawal | verify authority, affect copies, record correction, re-verify |
| verifier unavailable | no current evidence | retry with bounded budget or manual/hold; never allow silently |

## Evaluation and privacy

| Slice | Oracle | Evidence / guardrail |
| --- | --- | --- |
| intact known credential | expected state and exact details | binding, signer scope, validator/version |
| unknown signer/revoked credential | no trusted badge | trust-list status, user copy |
| modified/broken binding | changed or invalid state | asset hash, manifest ID, step of mismatch |
| metadata stripped | no-signal/incomplete, not human-made | transformation route and no-signal copy |
| watermark-only / metadata-only | preserve one signal's scope | provider/modality limitation |
| conflicting signals | conflict/manual | both observations and adjudication |
| unsupported file/modality | unsupported/unknown | route coverage matrix |
| private identity assertion | minimized/redacted state | access, purpose, retention, correction |
| embedded prompt/QR/URL | never execute or leak | untrusted-data negative test |
| user comprehension | user can state what was and was not verified | task oracle, overtrust/undertrust, accessibility |

Define denominators by asset/version and observation window. Measure state
accuracy, false-trust and false-distrust costs, correction time, and manual
fallback—not a universal trust score. Mark live runs `Not run` until observed.

Privacy controls include minimum file/context, identity minimization, upload
purpose, consent/authority where applicable, access roles, deletion/expiry,
legal hold, user correction, and a receipt that does not expose raw media or
private URLs. A verifier's data handling is a separate provider contract.

## Release and writeback

The fictional decision is `pilot`, not `ship`, because the verifier, trust list,
asset transformations, user comprehension, accessibility, and downstream
owners were not executed.

### Pilot gate

- one supported modality and one named asset route;
- exact state copy for verified, unknown signer, modified, incomplete,
  conflict, no-signal, unsupported, and unavailable;
- no-signal never becomes human-made or safe;
- one manual route and one correction/revocation owner;
- separate moderation/factuality/rights/identity/publication gates;
- privacy/retention/access review and a bounded observation window;
- positive/negative/loss/conflict/privacy/comprehension slices and a stop rule.

### Writeback

1. asset/provider/validator/trust-list versions and supported scope;
2. counts by verification state, modality, transformation, and downstream route;
3. conflicts, corrections, revocations, manual fallbacks, and privacy exceptions;
4. user comprehension, accessibility, false-trust/false-distrust observations;
5. `ship`, `revise`, `hold`, or `rollback` with the next smallest test.

## Not covered

This fictional reference does not establish cryptographic validity, watermark
recall, C2PA interoperability, signer identity, content truth, safety,
copyright, legal compliance, user comprehension, accessibility, production
enforcement, adoption, traffic, user outcomes, or GitHub star growth.

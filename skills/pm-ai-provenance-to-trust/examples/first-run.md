# First run: a fictional AI-edited newsroom image

This is a **fictional fixture** for learning the skill. It is not a file upload,
verification result, provenance benchmark, factuality judgment, or production
trust decision.

## Request

A fictional newsroom PM says: “A contributor submitted an AI-edited image with a
caption about a public event. The platform kept a thumbnail but stripped the
original metadata. Should we show an AI badge, reject it, or ask for review?”

## Contract

- `job_and_question`: Decide what origin/history state to show for fictional
  asset `img-fx-014` and whether it may enter editorial review. The question is
  provenance, not whether the caption is true or the image violates policy.
- `asset_identity`: fictional JPEG thumbnail, `version=thumb-2`, parent is the
  contributor export, and the original file hash is `Not provided`.
- `provenance_chain`: the contributor claims an AI edit, but the original C2PA
  manifest is absent after upload; ingredient and edit history are incomplete.
- `signal_ledger`: fictional downstream check found `no_supported_signal`;
  validator/provider/version and watermark result are `Not run`.
- `verification`: the thumbnail-to-original binding cannot be checked, signer
  scope is `Not provided`, and the current state is `incomplete_history` plus
  `no_supported_signal`, not `human-made`.
- `transformation_map`: create → contributor export → platform thumbnail;
  metadata survival through the upload is `Unknown`; screenshot/recompression
  behavior is `Not run`.
- `user_state`: “We could not verify supported provenance signals in this
  thumbnail. That does not establish who created or edited the image.” Show
  `request original`, `continue to human editorial review`, and `report issue`.
- `downstream_boundary`: editorial factuality, content safety, copyright, and
  publication decisions remain separate and require their own owners.
- `privacy_and_authority`: do not expose contributor identity, device, location,
  or raw file in the public badge; request only the original asset and the
  minimum provenance record needed for review.
- `evaluation`: fictional slices include intact manifest, stripped metadata,
  modified binding, watermark-only, conflicting signals, unknown signer, and
  unsupported media; no slice was executed.
- `release_decision`: `hold` the automatic badge and route to human review until
  the original asset, verifier route, signer scope, state copy, and correction
  owner are defined.

## Reviewer prompt

Before implementation, define which asset version is being verified, whether
the platform preserves or strips credentials, what “AI-edited” means for this
editorial workflow, what a no-signal state says, who may see the original, and
which independent review decides factuality or publication.

## Not run

No file, C2PA manifest, signature, watermark, verifier, contributor identity,
editorial review, factuality check, publication, or user comprehension session
was executed.

## Not covered

Truth of the caption, safety, copyright, identity, legal compliance, provenance
recall, metadata survival, cross-platform interoperability, accessibility,
adoption, user outcome, and GitHub stars are not established.

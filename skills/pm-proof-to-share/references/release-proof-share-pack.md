# Worked example: release proof share pack

This is a fictional fixture. It shows how a maintainer can turn verified release
evidence into a human-reviewed public draft without overstating the result.

## Message job

- **Target reader:** a PM or product engineer who already has a messy product
  note and wants to inspect a small evidence workflow before adopting a model or
  adding integration work.
- **Existing problem:** release notes often say what changed but not what a
  reader can try or what the checks actually prove.
- **Desired first action:** open the fictional first-run example and compare the
  output shape with one sanitized note.
- **Success signal:** a reader can start the example or report one concrete
  mismatch. No star or share is the success metric.
- **Decision supported:** whether to invite a workflow trial.
- **Decision not supported:** adoption, production readiness, market demand, or
  product quality at scale.

## Source truth

- **Artifact:** fictional `pm-example-skill`.
- **Version:** `v0.3.0`.
- **Release:** `R-027`; fictional canonical URL
  `https://example.invalid/pm-example-skill/releases/tag/v0.3.0`.
- **Change:** first-run worksheet and fictional worked example.
- **Checked at:** fictional `2026-08-17T00:00:00+08:00`.
- **Status:** fictional documentation release; no external participant session.
- **Known limitation:** the package has no provider integration, telemetry,
  login, or evidence of real-world adoption.

## Proof ledger

| Claim | Proof | Source type | Confidence | decision_supported | decision_not_supported |
| --- | --- | --- | --- | --- | --- |
| The package contains a first-run worksheet and worked example. | R-027 file list and release diff. | fictional repository check | medium | A reader can inspect the entry path. | It does not prove the path is useful to real users. |
| The verifier passed. | Fictional verifier output for R-027. | fictional CI | medium | The named package checks ran in the fixture. | It does not prove adoption, safety, or runtime quality. |
| The local suite reported 4 files and 10 tests. | Fictional test output attached to R-027. | fictional local test | low | The stated fixture regression checks passed. | It does not represent a market or user sample. |
| The hosted check returned HTTP 200 with English copy. | Fictional hosted check record. | fictional hosted check | low | The stated URL check passed at that time. | It does not prove browser usability, traffic, or retention. |

## Audience and channel

- **Primary audience:** international PMs and product engineers who can run a
  tool-free Agent Skills package.
- **Primary channel:** GitHub release notes and the repository's public pilot
  issue.
- **Channel job:** help a technically capable reader inspect the artifact and
  report one useful mismatch.
- **Adaptation rule:** keep the release note compact; keep the pilot issue ask
  structured; do not paste a release note into a community post without a new
  context sentence.
- **Human owner:** maintainer reviews every link and claim before publishing.

## Share draft

### Title

`A small PM skill for turning a verified release into a useful first try`

### Draft

Release R-027 adds a first-run worksheet and a worked example to the fictional
`pm-example-skill` package. The package is meant for PMs and product engineers
who want to inspect a source-linked workflow before adding a model, login, or
integration.

The useful part is the entry path: open the example, follow the stated input,
compare the expected output shape, and record one mismatch if the handoff does
not make sense. The release proof lists the verifier, local test result, and
hosted English-copy check next to what those checks cannot prove.

Try the [fictional first run](https://example.invalid/pm-example-skill/blob/v0.3.0/examples/first-run.md),
then compare it with the [worked share pack](https://example.invalid/pm-example-skill/blob/v0.3.0/references/release-proof-share-pack.md).
If you use the workflow, report the client/version, one limitation, and one
change that would make the first run clearer. Please do not include private
customer material.

This release does not claim external usage, adoption, model quality, or star
growth. The example and proof records are fictional.

## Try path

1. Open the fictional first-run fixture.
2. Paste its fictional input into a compatible Agent Skills client.
3. Compare the output with the expected headings and `Not covered` boundary.
4. Record the client/version, one limitation, one mismatch, and one improvement
   in the public pilot issue if an authorized owner has opened it.
5. Do not paste customer data, credentials, or secrets.

**Expected artifact:** a reviewable output with source or release context,
limitations, and a next action. If the output cannot be reproduced, choose
`Need evidence` rather than writing a testimonial.

## Boundaries

- This draft is for one fictional GitHub release channel.
- The proof is fictional local/CI/hosted evidence, not real-user evidence.
- No star, follow, repost, DM, or automated distribution request is included.
- The canonical links must be replaced with current, verified public links
  before publication.
- The maintainer must recheck the release, version, and proof ledger at
  publish time.

## Feedback ask

If you try the real artifact, report only sanitized workflow feedback:

- client or product version;
- source, release, or session ID boundary;
- one limitation or mismatch;
- one change that would make the first run clearer.

This is a feedback request, not a testimonial, adoption result, or star
exchange.

## Learning writeback

- **Learning question:** does a proof-led first-use message help a qualified
  reader start the workflow without a maintainer walkthrough?
- **Signal:** a public issue reply containing a client/version boundary and one
  concrete observation. No reply is currently recorded for this fictional
  example.
- **Guardrail:** no private data, no invented quote, no unsupported metric, no
  star-oriented CTA, and no channel post without human review.
- **Owner:** maintainer.
- **Writeback:** pilot issue, release note, and a future product learning review.
- **Current result:** `Not measured`.

## Not covered

- no real participant, client, provider, model, or production environment;
- no traffic, click-through, activation, adoption, retention, or star result;
- no channel performance or ranking claim;
- no proof that the fictional first-run path is understandable to a real user;
- no permission to publish the draft or contact a participant;
- no browser, mobile, accessibility, security, or privacy certification.

## Review ask

Choose one: `Publish` after replacing and rechecking the fictional links,
`Revise` the audience or try path, `Hold` until the public proof is current, or
`Need evidence` if the release checks cannot be read back. The unresolved risk
is that a green check could be mistaken for real-user success.

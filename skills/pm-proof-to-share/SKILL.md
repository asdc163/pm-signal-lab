---
name: pm-proof-to-share
description: Turn a verified product or skill release into an evidence-backed, channel-aware English share pack with a clear user job, proof ledger, try path, boundaries, feedback ask, and learning writeback. Use when a maintainer needs public discovery material without inventing adoption or growth claims.
compatibility: No tools, network access, model provider, or external write required.
metadata:
  author: asdc163
  version: "0.1.0"
---

# PM Proof to Share

Use this skill after a release, example, fix, or product slice has evidence that
can be inspected by a public reader. It turns that evidence into a small,
English-first share pack that helps the right person decide whether to try the
artifact. It does not automate distribution or make a release sound bigger
than it is.

## When to use

Use it when the input contains:

- a public artifact, release, example, or hosted path;
- current verification evidence and a known limitation;
- a specific audience and an actual first-use path;
- permission for a human owner to review a public draft.

Useful source material includes a release diff, README, test result, hosted
check, worked example, compatibility note, or a de-identified learning note.

Do not use it when there is no inspectable artifact, no current proof, or no
clear audience. Route those inputs to `Need evidence` or product discovery.

## Guardrails

- Freeze `Source truth` to the exact release, commit, version, URL, and checks
  that are current. Do not carry claims forward from a stale draft.
- Give every material claim a proof, confidence, `decision_supported`, and
  `decision_not_supported` entry. If the proof is missing, remove the claim or
  mark it `Not provided`.
- Never invent stars, traffic, adoption, users, testimonials, benchmarks,
  customer names, quotes, market size, or business outcomes.
- Do not ask readers to star, follow, or share as the primary value proposition.
  The first action must be a useful try, read, compare, or feedback step.
- Write one message for one audience and one channel. A release note, GitHub
  Discussion, Reddit post, LinkedIn note, and README entry have different jobs.
- Keep the try path concrete: link, prerequisite, first action, expected
  artifact, and feedback route. Do not send readers to a vague homepage.
- Keep fictional examples and synthetic checks labelled. They can explain the
  workflow, but cannot become a user story or adoption proof.
- Do not include private customer material, credentials, tokens, private URLs,
  raw support content, or confidential roadmap information.
- A human must review every external draft. This skill does not post, reply,
  send DMs, open issues, or mutate GitHub or social accounts.

## Workflow

### 1. Define the message job

State who should care, the problem they already have, the action the message
should prompt, and the leading signal that would show the entry path worked.
The action should be a first-use or inspection step, not a vanity reaction.

### 2. Freeze source truth

Record artifact name, version, commit or release, canonical URL, date, current
status, verification commands, and known limitations. Separate local, CI,
hosted, browser, participant, and adoption evidence.

### 3. Build the proof ledger

For each claim, record the exact proof, confidence, what it supports, what it
does not support, and whether the proof is fictional, local, CI, hosted, or
external. Prefer fewer claims with visible proof.

### 4. Choose audience and channel

Choose one primary reader and one primary channel. Note what that channel can
carry, what it cannot prove, and the source link that should remain attached.
Keep optional variants short and do not paste the same draft everywhere.

### 5. Write the share draft

Lead with the reader's problem and the artifact's concrete job. Include what
changed, why it may be useful, the smallest try path, the proof that is
available, and the boundary that remains. Use plain language and a specific
title. Remove promotional filler.

### 6. Make the first use obvious

Give a reader one link and a short sequence. State the expected output and the
failure or limitation they may encounter. If the path needs a compatible
client, version, or sanitized input, say so before the click.

### 7. Add a safe feedback ask

Ask for one concrete observation: client/version, source ID, mismatch,
limitation, or improvement. Do not ask for a testimonial or a star. Keep the
feedback route public, reviewable, and privacy-safe.

### 8. Write back the learning

State what the message is intended to learn, what signal will be inspected, and
where the result will be recorded. A share draft without a learning question
is distribution activity without a product loop.

### 9. Review before publication

Choose `Publish`, `Revise`, `Hold`, or `Need evidence`. Confirm every claim,
link, channel boundary, privacy rule, and try step before a human owner posts.

## Common rationalizations

- **"Everyone should see this."** Name one reader and one job first. Broad
  reach is not a substitute for a useful entry path.
- **"The release is verified, so we can call it production-ready."** Verification
  layers are separate. Keep local, CI, hosted, participant, and adoption claims
  distinct.
- **"A star CTA will improve discovery."** A star request does not explain the
  product. Lead with a task a reader can complete.
- **"One draft can work on every channel."** Channel context changes the
  reader's expectation and the proof they need.
- **"We can add the limitation at the end."** Boundaries belong next to the
  claim they qualify, not in a hidden footnote.

## Red flags

- The draft contains a metric, quote, user count, or adoption verb missing from
  the proof ledger.
- The first paragraph says the artifact is powerful but not who should try it.
- The CTA is `Star`, `Follow`, `Share`, or `DM` before a useful first action.
- The same copy is marked ready for multiple channels without adaptation.
- The only proof is a screenshot, a green build, or a fictional fixture while
  the draft implies real-user success.
- The canonical link points to a preview, stale commit, or unverified URL.

## Output contract

Return the following sections in this order. Keep unsupported fields explicitly
`Not provided`, `Unknown`, `Not measured`, `Not run`, or `Not covered`.

## Message job

State the target reader, existing problem, desired first action, success signal,
and the decision the message should help the reader make.

## Source truth

Record artifact, version, commit/release, canonical URL, date, current status,
verification layers, and known limitations.

## Proof ledger

For each material claim, list proof, source type, confidence,
`decision_supported`, and `decision_not_supported`.

## Audience and channel

Choose one primary audience and channel. State the channel's job, adaptation
rules, source link, and human review owner.

## Share draft

Write the proposed English message with a specific title, concrete problem,
artifact job, proof, limitation, and next action. Do not add unsupported claims.

## Try path

List the exact link, prerequisite, first action, expected output, recovery path,
and feedback route. Keep the path short enough to follow without a maintainer.

## Boundaries

State what the artifact does not prove, which users or versions are not covered,
what data must stay private, and which publication or account actions remain
manual.

## Feedback ask

Ask for one sanitized, concrete observation and define the requested fields.
Make clear that feedback is not a testimonial, adoption result, or star
exchange.

## Learning writeback

State the learning question, signal to inspect, guardrail, owner, and writeback
location. Mark traffic, activation, adoption, and star causality as unmeasured
when they are not available.

## Not covered

List unsupported traffic, audience size, adoption, retention, business impact,
channel performance, external sessions, user quotes, and platform behavior.

## Review ask

Choose one decision: `Publish`, `Revise`, `Hold`, or `Need evidence`. Name the
claim or link that still needs human review.

## Edge cases

- **No current proof:** return `Need evidence`, list the missing artifact or
  command, and do not draft a success claim.
- **Docs-only or fixture-only release:** describe the inspectable workflow and
  label it as documentation or fictional evidence; do not imply runtime use.
- **Failed or rolled-back release:** write a maintenance note only if the
  failure and recovery are public and verified; otherwise choose `Hold`.
- **Stale canonical URL:** point to the current public artifact only if it is
  verified; do not use a preview as production proof.
- **Multiple audiences:** choose one primary audience and record the others as
  deferred variants with separate proof needs.
- **Sensitive feedback:** remove raw content and request only a safe source ID,
  version, environment, mismatch, and improvement.
- **Current-sensitive claim:** require a current official source or mark the
  detail `Not verified`.
- **External quote:** use it only with permission and provenance. A fictional
  or owner-written line must not be presented as a customer quote.
- **Channel asks for hype or star CTA:** keep the value-first draft and set the
  review decision to `Revise` or `Hold`.
- **No feedback route:** create a public issue or form only as a separate,
  explicitly authorized action; this skill may describe the route but cannot
  create it.

## Final check

Before handoff, confirm that the message has one reader, one job, one concrete
try path, a proof ledger, a source link, a visible limitation, a safe feedback
ask, and a learning writeback. Scan for invented metrics, testimonials, star
promises, stale links, AI-flavored filler, and channel copy that was not
adapted. If proof or audience is unclear, choose `Need evidence`.

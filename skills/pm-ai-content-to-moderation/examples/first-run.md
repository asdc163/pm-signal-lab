# First run: a fictional community post moderation contract

This is a **fictional fixture** for learning the skill. It is not a model run,
not a live moderation decision, and not evidence that the policy or classifier
is safe.

## Request

A fictional PM says: “Our study community lets members publish short posts.
The AI reviewer flagged one post for a possible threat, but the language may be
figurative. We need a fair action and an appeal route before launch.”

## Contract

- `job_and_harm`: Decide whether `post-fx-001` can be shown to the study
  community without exposing members to credible threats. A false pass may
  expose a member; a false block may silence ordinary discussion.
- `policy`: `community-safety-v3`, effective `2026-08-17T09:00:00Z`, owned by
  the fictional Trust & Safety PM; the provider category is not the policy.
- `content_unit`: fictional text post, `locale=en-US`, parent context is the
  immediately preceding thread only, raw text is not retained in the public
  receipt; retention is `Not run`.
- `signal`: fictional classifier signal `threat=0.82`, model/version and
  calibration are `Not run`; this score is a review signal, not an automatic
  removal decision.
- `taxonomy`: `credible-threat/high` requires a specific target, intent, and
  plausible capability; figurative language without those elements is excluded
  and may be `allow` or `review` depending on context.
- `action_matrix`: hold from publication and route to trained human review;
  do not remove automatically; `unknown` if the context or language is
  insufficient.
- `lifecycle_route`: fictional pre-publish check, then human review; post-
  publish late detection and policy migration are `Not covered`.
- `timing_and_side_effect`: the fictional hold occurs before publication;
  provider timeout is `manual`, and no public side effect is assumed to have
  happened.
- `review_and_appeal`: reviewer sees the policy version, redacted item ID,
  bounded thread context, signal provenance, and abstain option. The author may
  appeal once; a second reviewer decides `upheld`, `reversed`, or `needs-specialist`.
- `privacy_and_authority`: keep only the minimum context, restrict access to
  trained reviewers, record policy/version and decision IDs, and do not put the
  post text or account identity in public evidence.
- `evaluation`: fictional slices include clear threats, figurative language,
  missing context, non-English text, obfuscation, timeout, reviewer
  disagreement, and appeal reversal; no slice was executed.
- `evidence`: `Not run`; no provider, classifier, reviewer, account, or user
  outcome was observed.
- `recovery`: ask for missing context or route to manual review; after an
  appeal, record a new decision under the same or newer policy version; do not
  silently reuse a stale allow/block state.
- `release_decision`: `hold` until policy definitions, reviewer authority,
  appeal ownership, supported-language behavior, and representative evaluation
  are verified.

## Reviewer prompt

Before implementation, define what makes a threat credible, what context is
allowed, what the reviewer may see, which side effect is paused, how a timeout
fails, who handles an appeal, and which false-block and false-pass slices must
be reviewed before a pilot.

## Not run

No model, moderation endpoint, classifier, user post, account, reviewer, queue,
appeal, notification, deletion, or production route was executed.

## Not covered

Classifier quality, policy legality, language parity, reviewer capacity and
wellbeing, production enforcement, mobile/accessibility behavior, adoption,
traffic, user outcome, and GitHub stars are not established.

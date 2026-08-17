# First run: support-draft operating package

This is a **fictional fixture** for practicing a workflow handoff. It is not a
user study, adoption result, value measurement, safety case, or production
plan.

## Request

> We tested an AI-assisted support-draft workflow for routine English email.
> Another support lead wants to reuse it. Package it so the next person knows
> what to do, what to review, and who helps when it fails.

## Decision in one line

**Route: `Limited share`** for one named support lead and routine English email
only; the repeat path is mostly described, but owner, support/fallback, human
review receipt, and evidence source are `Not provided` or `Not verified`.

Do not call this `Package` until those receipts exist. `Revise` is the next
route if the missing package fields cannot be assigned; `Hold` is the route if
the workflow has no approved source or manual fallback. `Retire` applies if the
workflow's source, owner, or safe job disappears.

## Package summary

- **Workflow ID:** `support-draft-routine-email-v0.1`
- **User/job:** a support agent prepares a first draft for a routine English
  email that does not require an account action.
- **Before:** the agent starts from a blank reply and checks the current policy
  manually. Baseline time and rework are `Not measured`.
- **After:** the workflow proposes a draft from an approved policy excerpt;
  the agent must check the source, edit the draft, and decide whether to send.
- **Test status:** fictional internal review of a narrow fixture; sample size,
  reviewer agreement, and accepted-outcome denominator are `Not provided`.
- **Supported claim:** the package describes a repeatable draft-and-review path
  for the named slice.
- **Unsupported claims:** it does not show quality, adoption, saved time,
  customer outcome, ROI, safety, or production readiness.

## Who should use it and when

- **Eligible first user:** one support lead who owns routine English email
  review; actual name is `Not provided`.
- **Trigger:** a new routine email arrives and the agent can provide the
  approved policy excerpt without customer secrets.
- **First team:** one support queue; queue name and support capacity are
  `Not provided`.
- **Do not use for:** billing changes, refunds, account recovery, legal or
  safety issues, regulated data, multilingual replies, unusual exceptions, or
  any message that needs an external action.
- **Customize before reuse:** policy source, redaction rule, escalation route,
  review rubric, response tone, and owner must be confirmed for the receiving
  team.

## Required inputs and approved sources

| Input | Boundary | Status |
| --- | --- | --- |
| customer message | sanitized fixture or approved support record | permission `Not verified` |
| policy excerpt | current approved source with date/version | source authority `Not provided` |
| response constraints | language, tone, exclusions, escalation rule | provided for English routine slice |
| reusable asset | draft instruction and response checklist | fixture only; version `Not verified` |
| external tools/actions | none in this package | intentionally out of scope |

Do not paste credentials, payment details, account identifiers, private
customer history, or unapproved policy text into the workflow. If the source is
stale, conflicting, or missing, stop and use the manual route.

## How to repeat it

1. Confirm that the message is within the routine English slice and contains
   no excluded action or sensitive value.
2. Open the approved policy excerpt and record its source/version receipt. If
   no source receipt is available, stop.
3. Apply the reusable draft instruction to the message and policy excerpt.
4. Inspect unsupported claims, tone, missing conditions, and policy mismatch.
5. Edit the draft, record the review decision, and send only through the
   existing human-owned support process. This package does not send a message.

**Completion receipt:** source/version, reviewer decision, edits or rejection,
escalation reason, and manual fallback used if the workflow was stopped.

## Human review and approval

- The reviewer must confirm that the reply answers only the named question,
  cites or matches the approved policy, avoids invented promises, and does not
  trigger an external action.
- **Approve:** send through the existing support process after editing.
- **Edit:** keep the source receipt and record the material change.
- **Reject/escalate:** use the manual route when policy is unclear, the case is
  excluded, or the reviewer cannot verify the source.
- Review rubric, reviewer identity, exception queue, and response-time target
  are `Not provided`. That is why the route is `Limited share`.

## Evidence and supported claims

| Claim | Status | Unit/scope | Source/method | Limitation | Next receipt |
| --- | --- | --- | --- | --- | --- |
| a person can follow the five-step draft path | `Observed` in fictional fixture | one routine email slice | walkthrough note | not a live handoff | named reviewer completes the path |
| the draft improves response time | `Unknown` | no denominator | `Not provided` | baseline and rework absent | paired timestamp comparison |
| the workflow is adopted by the team | `Unknown` | no real users or period | `Not measured` | first use is not repeat use | repeated-use record with scope |
| the workflow is safe for all support cases | unsupported | excluded cases | no source | scope is intentionally narrow | separate safety/control review |

The fixture records a route and missing receipts. It does not turn a fictional
walkthrough into measured evidence.

## Support and manual fallback

- **Owner:** `Not provided`.
- **Maintainer:** `Not provided`.
- **Support route:** `Not provided`; do not introduce the workflow broadly until
  a person or team accepts this responsibility.
- **Manual fallback:** draft the reply from the approved policy source without
  the reusable asset, then use the normal support review process.
- **Stop condition:** stop when source authority, case scope, reviewer,
  escalation, or manual fallback is unavailable.

## Change, version, and retirement protocol

- Current package version: `v0.1.0-fictional-fixture`.
- A policy, prompt, model, tool, language, audience, or action change creates a
  new package version and requires a narrow re-test.
- The reviewer and effective date are `Not provided`; preserve the prior
  version until the new one is reviewed.
- Retire this package if the policy source is stale, the owner/support route is
  removed, or the routine slice is no longer accepted. Record the replacement
  or manual route before retirement.

## Suggested first-team introduction

> We have a limited, review-first draft workflow for routine English support
> email. It uses only an approved policy excerpt, does not send messages or
> take account actions, and remains subject to human editing and approval. The
> owner, support route, and evidence collection are still being assigned. Try
> only the named slice and report one confusing step or missing receipt.

## Next decision

- **Next receipt:** a named owner and reviewer complete one sanitized routine
  case with source/version, review, fallback, and escalation receipts.
- **Reviewer:** `Not provided`.
- **Review date:** `Not provided`.
- **If the receipt passes:** consider `Package` for the same narrow job or use
  `pm-ai-workflow-to-adoption` for a separate team-introduction decision.
- **If it fails:** `Revise` the package or `Hold` the workflow; do not expand
  the audience.

## Not covered

This **fictional fixture** does not verify model quality, source accuracy,
adoption, repeat use, efficiency, ROI, causality, staffing, capacity, security,
privacy, compliance, accessibility, localization, production readiness, or
external user value. No provider, customer record, support queue, account, or
external action was accessed.

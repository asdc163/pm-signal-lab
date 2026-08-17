# First run: define activation for a release-risk brief assistant

This is a **fictional fixture**. It is a practice input for the workflow, not
a live product, model run, host test, user session, analytics result, or
retention signal.

## Request

Use `pm-ai-first-use-to-activation` for this PM job:

> A product operations team is considering an AI assistant that turns three
> approved release notes into a short risk brief. New users arrive from a
> chat-native app surface. Decide what first use must accomplish, what counts
> as activation, and what the team should test before a wider rollout. The
> assistant must not assign owners, send updates, or change the release plan.

## Fictional product input

```yaml
product: Release Brief
target_user: product operations lead
job: identify what needs attention before a release review
entry_surface: chat app suggestion named "Build a release risk brief"
required_context:
  - release_version
  - three approved change-note collections
capability: summarize supplied notes into risk themes with source locators
external_actions: none
current_evidence: fictional fixture only
```

## First-use contract

| Stage | User job | Required context | Control and fallback | Evidence |
| --- | --- | --- | --- | --- |
| Discover | Recognize that the assistant is for a pre-release risk review | None | View a plain description or leave | Not run |
| Confirm fit | Check that the release and approved collections are available | Release version and collection eligibility | Choose another release or use a manual review | Not run |
| Prepare context | Select three approved collections and see why they are used | Collection IDs only; no raw notes in analytics | Remove a collection, continue with a labelled partial brief, or leave | Not run |
| First value | Identify one risk that changes the review agenda and inspect its source locators | Brief plus locators | Correct the risk, mark it unsupported, or use a manual comparison | Not run |
| Recover / leave | Keep the selected release and collections when the run fails | Saved local selection only | Retry after reconciliation or export the selection for manual review | Not run |
| Repeat value | Review a second release or a changed collection set within 7 days | A new eligible release | Start a fresh review; do not reuse stale claims | Not run |

## Activation hypothesis

- **First-value oracle:** the user opens a fictional risk brief, identifies one
  risk that changes the review agenda, and either accepts or edits the risk
  while retaining at least one source locator. A generated response without a
  user-verifiable risk is not first value.
- **Candidate A:** `first_value_completed` within the first session.
- **Candidate B:** `first_value_completed` plus a second distinct release
  review within 7 days.
- **Candidate C:** `first_value_completed` plus an exported review note within
  7 days. Export is only a candidate; it is not proof that the note was useful.
- **Eligibility:** product operations role and an approved release workspace.
- **Exposure:** the user sees the named assistant entry surface; assignment
  and exposure are not merged.
- **Unit:** workspace, because release reviews are team decisions; individual
  identity is `Not provided`.
- **Evidence needed:** a real task session, event QA, and a later repeat-value
  or decision-quality signal. No correlation has been run.
- **Disconfirming signal:** users complete context setup but cannot identify,
  inspect, or correct a risk; or the first-value event fires before a brief is
  visible.

## State and recovery checks

| State | User-visible message | Preserved work | Oracle |
| --- | --- | --- | --- |
| empty | "Choose a release and up to three approved note collections to begin." | None yet | The user can name the next action; Not run |
| loading | "Checking the selected note collections." | Release and collection IDs | No fake model-progress claim; Not run |
| partial | "Two collections are available. One is still missing; this brief may be incomplete." | Two IDs and release | User can continue qualified or choose manual review; Not run |
| permission refused | "The collection was not connected. No other source was used." | Available IDs | No silent connector swap; Not run |
| unsupported host | "This host cannot show the rich brief. The labelled text review is available." | Same source locators | The job remains possible without the rich surface; Not run |
| timeout | "The brief result is unknown. Check the receipt before trying again." | Selection and receipt ID | No duplicate run; Not run |
| correction | "Mark the risk unsupported or edit it before saving the review note." | Original risk and edit | The user can correct without losing evidence; Not run |

## Smallest test

Run a bounded task session with a fictional fixture renderer or a paper
prototype. Compare the first-value path with a manual review. Observe whether a
reviewer can name the job, distinguish setup from value, find a source locator,
correct one risk, and recover from a missing collection. Do not call a model,
connect a workspace, assign an owner, send a message, or report a conversion
rate.

## Decision

`Pilot` for a bounded non-owner test, then `Need evidence` for activation and
retention claims. The contract is specific enough to test, but all behavior,
analytics, comprehension, host support, source quality, and repeat value are
unverified.

## Not covered

- live assistant, model/provider, MCP server, Apps SDK, or chat host;
- source retrieval quality, risk semantic accuracy, or policy correctness;
- user comprehension, accessibility-device behavior, mobile behavior, or
  retention;
- event delivery, workspace identity, privacy review, cost, latency, or
  production rollout;
- automatic owner assignment, messaging, release-plan mutation, adoption,
  traffic, PMF, or GitHub star impact.

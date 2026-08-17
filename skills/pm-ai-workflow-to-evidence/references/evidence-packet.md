# Workflow evidence packet reference

This reference supports `pm-ai-workflow-to-evidence`. It is a review aid for
organizing supplied material, not a validator of private systems or a marketing
case-study generator. This is a **fictional fixture** when used with the
example in this package.

## Artifact intake

| Field | Review prompt |
| --- | --- |
| `artifact_id/type` | What stable ID and artifact class identify this item? |
| `source/authority` | Where did it come from, and why may it support the claim? |
| `created/observed_at` | What timestamp, timezone, or freshness applies? |
| `version/scope` | Which workflow, model, prompt, user, task, locale, device, or period is covered? |
| `sensitivity` | Is it public, internal, confidential, personal, customer, or unclassified? |
| `redaction` | What was removed, generalized, aggregated, or still unsafe? |
| `evidence_layer` | What is the strongest layer this item can support? |
| `limitation` | What stronger claim is blocked? |
| `owner/reviewer` | Who supplied, checked, or can correct it? |

A generated summary is an artifact to inspect, not a source of record. A
screenshot may show a rendered state, but without source, date, version, and
context it cannot establish a workflow result. Keep the original and candidate
versions separate when a change is material.

## Evidence ladder

| Layer | Minimum receipt | Strongest safe wording |
| --- | --- | --- |
| `problem_context` | named job, friction, workaround, source, context | “The supplied notes describe…” |
| `workflow_design` | workflow/asset/version, intended boundary, owner | “The team designed/proposed…” |
| `operation` | run record, environment, version, input class, output/failure receipt | “The workflow operated on the declared slice…” |
| `exposure` | eligible population, invitations/opens/attendance, window | “The workflow was exposed to…” |
| `first_use` | eligible unit and a first-use record | “A supplied record shows a first use…” |
| `repeat_use` | repeat definition, eligible denominator, period, source | “Repeat use was observed for…” |
| `changed_work` | before/after process receipt and scope | “The task path/handoff changed in…” |
| `accepted_outcome` | work-unit oracle, reviewer, denominator, exceptions | “The named work unit passed…” |
| `business_value` | baseline/comparison, unit, method, period, limitation | “The declared comparison supports…” |
| `causality` | valid design, assignment/comparison, outcome method, threats | “The method supports a bounded causal inference…” |

Do not use a higher-layer verb when only a lower-layer receipt exists. “Seen,”
“tried,” “returned,” “accepted,” “saved time,” and “caused” are different claims.

## Claim ledger template

| Claim | Status | Scope/unit | Source IDs | Method/denominator | Date/version | Contribution | Limitation | Next receipt |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `[literal sentence]` | `Measured/Observed/Reported/Estimated/Planned/Inferred/Unknown` | `[covered unit]` | `[A-01]` | `[method or Not provided]` | `[timestamp/version]` | `[who did what]` | `[cannot prove]` | `[smallest evidence]` |

Use one row for each material claim. A single artifact may support multiple
claims at different layers. Keep the status of the artifact separate from the
status of the claim.

## Contribution and authority boundary

Classify the work before writing a first-person or team claim:

| Contribution class | Use when |
| --- | --- |
| `built` | the named person authored or implemented the described artifact |
| `configured` | the person configured an existing tool, prompt, skill, or workflow |
| `reviewed` | the person evaluated, edited, tested, or approved another artifact |
| `operated` | the person ran or supported the workflow in the declared context |
| `collaborated` | the result depended on named or unnamed collaborators |
| `inherited` | the artifact came from another team, provider, or prior version |
| `unknown` | the supplied material cannot establish responsibility |

Preserve source authority separately from contribution. A person may operate a
workflow without owning the policy source; a provider may supply a capability
without proving the product outcome.

## Conflict and freshness review

When sources disagree, record both:

1. artifact IDs and exact conflicting statements;
2. version, timestamp, timezone, scope, and source authority;
3. whether the conflict changes the user/job, claim, human boundary, outcome,
   or route;
4. reviewer/owner who can reconcile it;
5. interim wording that remains safe while the conflict is open.

Use `Hold` when a stale or unauthorized source could change a consequential
claim. Do not average conflicting notes or choose the newest file without an
authority rule.

## Route rules

| Route | Minimum condition | Safe next move |
| --- | --- | --- |
| `Capture next` | packet is useful but a material claim lacks source, denominator, baseline, contribution, or outcome receipt | assign one smallest evidence request |
| `Proceed bounded` | evidence supports a narrow internal learning/review action and the owner, scope, guardrail, and limitation are clear | run only the named bounded action after owner approval |
| `Hold` | source authority, privacy, conflict, version, owner, or human control blocks the next action | preserve fallback and request the missing authority/evidence |
| `Do not claim` | requested statement has no supporting artifact or would overstate adoption/value/safety/causality | remove or qualify the claim; state what is supported instead |

`Proceed bounded` is not `publish`, `scale`, `production ready`, or `adopted`.
The route is a human-owned next-decision boundary.

## Smallest evidence capture plan

```text
capture_id/version:
decision_owner:
workflow_id/version:
user_job/group:
target_claim:
current_evidence_layer:
desired_evidence_layer:
eligible_unit/slice:
source/authority:
observed_at/timezone:
method/denominator/baseline:
positive_cases:
negative_or_abstain_cases:
contribution/reviewer:
privacy/redaction:
expected_supported_wording:
explicit_non_claim:
stop_condition:
writeback:
review_date:
status: Planned | Not run
```

Ask for the smallest receipt that can change the route. Do not request a full
telemetry system when a redacted manual sample answers the decision.

## Example wording guard

| Unsupported wording | Evidence-bounded alternative |
| --- | --- |
| “The team adopted the workflow.” | “The supplied record shows exposure/first use; repeat adoption is `Not measured`.” |
| “The workflow saved time.” | “A time-saving hypothesis is `Proposed`; baseline and method are `Not provided`.” |
| “The workflow improved quality.” | “The named cases passed the supplied review; broader quality is `Not measured`.” |
| “I built the AI solution.” | “I configured/reviewed/operated the supplied workflow; contribution boundary is…” |
| “This proves ROI.” | “The packet contains a value hypothesis; realized value/causality are `Not measured`.” |
| “The release is production ready.” | “The package passed the declared checks; runtime/operations/production evidence is `Not verified`.” |

## Review checklist

- Is one workflow, user/job, owner, decision, window, and privacy boundary named?
- Does every artifact have source, date/version, scope, sensitivity, and limitation?
- Is each claim status explicit and traceable to source IDs?
- Are contribution and authority separate?
- Are exposure, first use, repeat use, changed work, outcome, value, and causality separate?
- Are conflicts and stale versions preserved rather than smoothed away?
- Does the route match the strongest evidence layer and missing receipt?
- Is one smallest next evidence action assigned to an owner?
- Is the packet clearly not a public post, adoption proof, value proof, or production certification?

## Not covered

This **fictional fixture** reference does not establish real adoption, repeat
use, retention, business value, ROI, causality, output quality, safety,
privacy, security, accessibility, localization, cost, latency, reliability,
production readiness, rollout, customer outcome, user identity, GitHub traffic,
stars, or organic growth. It does not read private artifacts, query telemetry,
call a provider, publish a case, or execute a workflow.

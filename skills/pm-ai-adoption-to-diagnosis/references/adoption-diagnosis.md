# Adoption diagnosis reference

This reference supports `pm-ai-adoption-to-diagnosis`. It is a review aid for
one stalled AI-workflow behavior, not a scorecard or an analytics connector.
This is a **fictional fixture** when used with the example in this package.

## Evidence labels

| Label | Meaning | Do not infer |
| --- | --- | --- |
| `Observed` | a person, workflow record, review, or artifact directly shows the behavior | population-wide adoption or cause |
| `Reported` | a participant, owner, or source states an experience | verified frequency, quality, or causality |
| `Measured` | a defined unit, denominator, window, method, and source support a number | business value or adoption without a behavior definition |
| `Inferred` | a reasoned hypothesis based on supplied evidence | a confirmed blocker |
| `Proposed` | a next action, route, or expected signal | that the action ran or succeeded |
| `Unknown` | available material cannot resolve the question | a green light or a blame assignment |

Always preserve the workflow/version, audience, source, date/timezone, unit,
denominator, and limitation where they are available. `Not provided` is better
than a polished number with no method.

## Behavior ladder

| Layer | Example receipt | Boundary |
| --- | --- | --- |
| Exposure | invitation, page view, attendance, download | interest, not use |
| First use | eligible person tries the workflow on one task | not repeat use or value |
| Repeat use | same person returns on eligible work under a stated period | not quality or outcome |
| Changed work | team rhythm, handoff, or task path includes the workflow | not causality |
| Accepted outcome | work unit passes its independent oracle | not general adoption or scale |
| Adoption diagnosis | blocker hypothesis maps to evidence and a next receipt | not intervention success |

## Blocker definitions and disambiguation

| Category | Positive clue | Ask before choosing it | Smallest receipt |
| --- | --- | --- | --- |
| `Workflow fit` | user cannot name when this belongs in the job, or the current workaround is easier | Does the target behavior solve a real job in the existing rhythm? | observed work moment and narrower job/trigger |
| `Trust / quality` | user checks everything, edits heavily, cannot explain confidence, or fears unsupported output | Does a representative review show a quality, source, uncertainty, or review-burden problem? | paired cases, rubric, edits, abstentions, and reviewer note |
| `Access / permissions` | user cannot reach required data, tool, connector, or approval | Is the workflow blocked even when the job and trust are acceptable? | permission owner, approved scope, and fallback |
| `Ownership / reinforcement` | no one owns support, review, decision, or manager reinforcement | Who can keep the behavior alive and remove the next blocker? | named owner/partner and one supported work moment |
| `Process / environment` | timing, handoff, policy, incentive, or system context breaks the workflow | Does the workflow fit the surrounding process, not just the isolated demo? | current process trace and reversible change candidate |
| `Repeatability / packaging` | one person succeeds but another cannot reproduce it | Are steps, inputs, examples, support, and fallback transferable? | second eligible user follows the same bounded path |
| `Value evidence` | people may use it but no accepted work progress is visible | What is the desired work outcome and its oracle/baseline? | defined work unit, baseline, period, and source |
| `Measurement gap` | signals conflict or denominator/source/window is missing | Could the behavior be happening outside the current observation? | privacy-safe sample, denominator, or manual receipt |
| `No diagnosis yet` | evidence is thin, contradictory, or the unit is undefined | What single observation would separate the leading causes? | disambiguating question or case review |

Do not choose a category because it is familiar. A team that says “we need
training” may actually need a clearer use case, output-quality boundary,
permission, manager decision, support route, or a reason to return.

## Action matching

| Action | Entry condition | Required packet |
| --- | --- | --- |
| `Try` | one reversible action can discriminate the diagnosis | owner, eligible slice, version, timebox, expected signal, guardrail, stop, fallback |
| `Instrument` | behavior or outcome may exist but cannot be interpreted | unit, denominator, privacy boundary, source, period, and review method |
| `Escalate` | an authority outside the workflow owner controls the blocker | partner, reason, requested decision, evidence, and response date |
| `Hold` | material evidence, control, owner, or fallback is missing | manual route, named gap, owner, recheck trigger, and no-expansion boundary |
| `Stop expanding` | risk, burden, no legitimate job/owner, or poor evidence justifies containment | stop reason, affected group, fallback, communication owner, reconsideration condition |

An action is `Proposed` until a human owner accepts it. A successful action is
not established by completion; define the expected behavior and its receipt
before starting.

## Smallest diagnostic packet

```text
diagnosis_id/version:
decision_owner:
workflow_id/version:
group/user_slice:
user_job:
current_behavior:
target_behavior:
why_now:
observation_window/timezone:

signals:
  - signal:
    status: Observed | Reported | Measured | Inferred | Proposed | Unknown
    unit/scope:
    source/method:
    denominator:
    limitation:
    next_receipt:

blocker_map:
  workflow_fit: Supported | Possible | Not supported | Blocked | Unknown
  trust_quality: Supported | Possible | Not supported | Blocked | Unknown
  access_permissions: Supported | Possible | Not supported | Blocked | Unknown
  ownership_reinforcement: Supported | Possible | Not supported | Blocked | Unknown
  process_environment: Supported | Possible | Not supported | Blocked | Unknown
  repeatability_packaging: Supported | Possible | Not supported | Blocked | Unknown
  value_evidence: Supported | Possible | Not supported | Blocked | Unknown
  measurement_gap: Supported | Possible | Not supported | Blocked | Unknown
  no_diagnosis_yet: true | false

primary_blocker:
confidence: Provisional | Moderate | Strong
alternatives:
disconfirming_signal:
action: Try | Instrument | Escalate | Hold | Stop expanding
action_owner:
eligible_slice:
version/environment:
timebox/review_date:
expected_signal:
guardrail:
stop_condition:
fallback:
execution_status: Not run
adoption_status: Not measured
outcome_status: Not measured
production_status: Not verified
```

## Claim ledger

| Claim | Status | Scope/unit | Source/method | Denominator/window | Limitation | Next receipt |
| --- | --- | --- | --- | --- | --- | --- |
| `[literal claim]` | `Observed/Reported/Measured/Inferred/Proposed/Unknown` | `[covered unit]` | `[source or Not provided]` | `[period or Not provided]` | `[cannot prove]` | `[smallest evidence]` |

Use the following boundaries in the final packet:

- `Diagnosis: provisional` until a reviewer accepts the evidence and primary blocker.
- `Intervention: proposed` until a dated action receipt exists.
- `Adoption: not measured` until repeated useful behavior has a definition and source.
- `Outcome/value: not measured` until an accepted work unit, baseline, and method exist.
- `Production: not verified` until runtime, permission, reliability, support, and release evidence exist.

## Review checklist

- Is this one group and one workflow rather than a whole-company label?
- Are current behavior and target behavior literal and observable?
- Is exposure separated from first use, repeat use, changed work, and outcome?
- Does each signal have a source, unit, denominator, window, and limitation?
- Were fit, trust, access, ownership, process, repeatability, value, and measurement considered?
- Is the primary blocker supported better than the alternatives?
- Does one smallest action test or reduce the blocker?
- Are owner, partner, privacy, permissions, guardrail, stop, fallback, and review date visible?
- Is `Not covered` explicit and free of unsupported adoption/value claims?

## Not covered

This **fictional fixture** reference does not establish real adoption, retention,
business value, ROI, causality, quality, safety, privacy, security,
accessibility, localization, cost, latency, reliability, production readiness,
rollout, user identity, GitHub traffic, stars, or organic growth. It does not
query private analytics, call a provider, change access, send enablement, or run
an intervention.

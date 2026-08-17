---
name: pm-ai-change-to-revalidation
description: Turn a proposed change to an AI workflow, source, prompt, model, tool, policy, permission, audience, or owner into an evidence-bounded impact map, revalidation plan, release or hold decision, controlled rollout boundary, and rollback route.
---

# PM AI Change to Revalidation

A change request is not evidence of improvement. This skill preserves the
current version, maps what the change can affect, selects the smallest
representative revalidation, and keeps release, hold, rollback, and retirement
decisions tied to receipts.

## When to use

Use this skill when:

- a packaged AI workflow changes its prompt, instructions, model, provider,
  source, policy, tool, permission, audience, owner, output artifact, or human
  boundary;
- a team needs to know which claims, test slices, controls, support duties,
  cost/latency assumptions, or downstream artifacts must be checked again;
- a change may be harmless, but no one has a receipt for the affected boundary;
- an owner needs a bounded route to revalidate, release, hold, roll back, or
  retire a candidate without silently widening the workflow.

Do not describe a candidate as improved until the changed behavior and its
limits have been compared with the previous version on the declared scope.

## Do not use

Choose a narrower skill when the main job is:

- version and release one prompt: use `pm-ai-prompt-to-version`;
- migrate one model or provider lifecycle: use `pm-ai-model-change-to-migration`;
- diagnose a changed observed signal across time: use `pm-ai-drift-to-diagnosis`;
- package a tested workflow for repeatable handoff: use
  `pm-ai-workflow-to-package`;
- decide whether an independently run evaluation supports release: use
  `pm-ai-independent-eval-to-release`;
- plan learning after a verified release: use `pm-release-to-learn`.

## Working rule

Keep these statements separate:

| Statement | What it can support | Do not infer |
| --- | --- | --- |
| `change_proposed` | a new version or configuration is being considered | that behavior improved |
| `impact_mapped` | affected and unaffected surfaces have a source/receipt | that unknown surfaces are unaffected |
| `revalidated` | declared cases were compared against a baseline or oracle | universal correctness or safety |
| `control_rechecked` | named permission, approval, fallback, or escalation was examined | that the control never fails |
| `released_bounded` | an owner approved a limited rollout under stated conditions | adoption, value, or production readiness outside scope |
| `rolled_back` | candidate was withdrawn and prior/fallback path restored | that all downstream effects were undone |
| `retired` | the old route should no longer be used | that a replacement is already working |

Use `Measured`, `Observed`, `Reported`, `Estimated`, `Planned`, or `Unknown`
for evidence. Record source, version, scope/unit, period, method, owner,
limitation, and next receipt. Use `Not provided`, `Not measured`, `Not
verified`, `Not run`, `Not estimable`, and `Not covered` rather than inventing a
baseline, approval, or rollback.

## Workflow

### 1. Freeze the current version and change card

Record:

- workflow/package ID, current version, source versions, owner, user/job,
  audience, current route, and the last supported evidence boundary;
- proposed change, reason, requester, affected date, change class, and the
  intended outcome;
- what is explicitly unchanged and the receipt that supports that statement;
- whether the prior version, fallback, test cases, logs, or artifacts can be
  retrieved. If not, stop at `Hold` rather than manufacture a baseline.

Useful change classes include source/policy, prompt/instruction, model/provider,
tool/permission, data/telemetry, workflow/audience/owner, and output/artifact.
One request may contain several classes; keep their effects separate.

### 2. Map impact across the workflow

For each surface, write `directly affected`, `indirectly affected`, `not
affected with receipt`, `unknown`, or `not covered`:

| Surface | Questions |
| --- | --- |
| User/job/scope | Does the intended job, audience, language, trigger, or exclusion change? |
| Inputs/sources | Does authority, freshness, schema, redaction, or source precedence change? |
| Prompt/instructions | Does behavior, format, refusal, uncertainty, or human wording change? |
| Model/provider | Does capability, lifecycle, latency, cost, context, or output behavior change? |
| Tools/permissions | Does the workflow read, write, call, approve, or communicate differently? |
| Policy/control | Do approval, guardrail, exception, escalation, or stop rules change? |
| Human work | Do reviewer effort, rubric, decision, handoff, or support duties change? |
| Evidence/claims | Do metric definitions, denominator, baseline, source, or supported claims change? |
| Downstream artifact | Do files, records, messages, decisions, or consumers need rechecking? |
| Operations | Do owner, capacity, monitoring, cost, retention, rollback, or retirement change? |

`Not affected` requires a reviewer, source, or comparison receipt. A small
diff, familiar vendor, unchanged interface, or unchanged filename is not a
no-impact receipt.

### 3. Define the revalidation slices

Select cases from the affected job and risk boundary, not only the happy path:

- routine, high-frequency in-scope case;
- meaningful variation in input, language, source, or user context;
- missing, conflicting, stale, or ambiguous information;
- negative, sensitive, urgent, high-consequence, and out-of-scope cases;
- permission, approval, escalation, fallback, and external-action boundary;
- downstream artifact or handoff that could change meaning.

Compare current and candidate behavior one material change at a time where
possible. Preserve inputs, outputs/actions, reviewer decision, source/version,
and failure reason. If a new model or prompt also changes a policy or tool,
split the comparison or label the confounder.

### 4. Build the evidence matrix

For each requirement, define:

| Field | Required treatment |
| --- | --- |
| Requirement/claim | observable behavior or bounded claim |
| Affected slice | case IDs, scope, risk, audience, and denominator |
| Current behavior | source-backed baseline or `Not measured` |
| Candidate behavior | actual result, planned test, or `Not run` |
| Oracle/reviewer | rubric, source, invariant, owner, or human decision |
| Pass rule | acceptable difference, control, cost/latency guardrail, or `Not provided` |
| Outcome | `Pass`, `Fail`, `Needs review`, `Unknown`, or `Not run` |
| Next receipt | smallest evidence needed to route the change |

Do not average away a high-risk failure. Keep per-slice failures, abstentions,
manual handoffs, retries, latency/cost, and downstream corrections visible.

### 5. Recheck controls and rollout

Before release, confirm the exact candidate still has:

- approved input/source and permission boundaries;
- human review, approval, escalation, and manual fallback;
- output/action limits and no new side effect without authority;
- owner, support route, monitoring/feedback, and review cadence;
- privacy, security, legal, compliance, accessibility, and localization review
  where the change requires it;
- staged audience, expiry or observation window, stop trigger, and rollback or
  previous-version receipt.

Keep the candidate and current version distinguishable. Release only the named
scope after the owner accepts the evidence; do not turn a passing test into a
default rollout.

### 6. Choose the route

- **`No material impact`:** all relevant surfaces are unchanged and each
  assertion has a reviewer/source receipt; record the reason and scope.
- **`Revalidate`:** a material or uncertain surface may change behavior, claim,
  control, or downstream meaning; run the named slices before release.
- **`Release bounded`:** affected slices pass, controls and owner are accepted,
  rollout/monitoring/rollback are ready, and the candidate is released only to
  the declared scope.
- **`Hold`:** baseline, owner, authority, permissions, test cases, oracle,
  support, or rollback is missing or contradictory.
- **`Rollback`:** candidate fails a required slice, violates a control, or
  creates unacceptable burden; restore the prior or manual path and preserve
  the failure receipt.
- **`Retire`:** the current workflow or candidate has no viable owner, source,
  user/job, support path, or acceptable risk; record replacement/fallback.

Every route needs entry condition, evidence receipt, decision owner, review
date or `Not provided`, rollout boundary, and failure/recovery route. `No
material impact` is an evidence-backed decision, not a default for small edits.

## Output contract

Return an **AI Change Revalidation Brief** with these sections, in order:

1. **Decision in one line:** route, change class, affected job/scope, owner,
   and current evidence boundary.
2. **Current and candidate versions:** IDs, source/config versions, reason,
   requester, effective date, and available baseline/fallback.
3. **Impact map:** every surface as affected, not affected with receipt,
   unknown, or not covered, with source, confidence, and blast radius.
4. **Revalidation slices:** routine, variation, negative, edge, permission,
   human-review, and downstream slices with scope and risk.
5. **Evidence matrix:** requirements, current/candidate observations, oracle,
   pass rule, outcome, denominator, limitation, and next receipt.
6. **Control and rollout boundary:** permissions, approvals, fallback,
   monitoring, audience, expiry, stop trigger, rollback, and support.
7. **Decision route:** `No material impact`, `Revalidate`, `Release bounded`,
   `Hold`, `Rollback`, or `Retire`, with owner and review point.
8. **Change log and communication:** what changed, why, version, approvers,
   affected users/artifacts, and a factual message for the named audience.
9. **Not covered:** missing quality, adoption, value, causality, safety,
   security, privacy, legal, compliance, accessibility, localization, runtime,
   or production claims.

## States and recovery

| State | Entry condition | Meaning | Recovery |
| --- | --- | --- | --- |
| `Proposed` | change request exists | no impact or release claim yet | freeze versions and map surfaces |
| `Impact unknown` | affected boundary or baseline is unclear | do not call it harmless | obtain receipt or choose `Hold` |
| `Needs revalidation` | material behavior/control/source may change | candidate cannot release yet | run named slices |
| `Needs approval` | evidence exists but authority/owner is missing | no rollout authorization | assign reviewer/owner or hold |
| `Release bounded` | route and controls pass for named scope | limited release may proceed | monitor; stop/rollback on trigger |
| `Hold` | required evidence/control/source is absent | preserve current version or fallback | narrow change or obtain receipt |
| `Rollback` | candidate violates required behavior/control | candidate withdrawn | restore prior path and investigate |
| `Retired` | route no longer has a viable job/owner/boundary | do not use it | preserve replacement/fallback |

If the prior version cannot be restored, use the manual fallback or stop; do
not call a partial rollback complete. If a later change is proposed before the
first one is closed, preserve both change IDs and avoid a blended comparison.

## Edge cases

- **Documentation-only change:** it may be `No material impact` only when a
  reviewer confirms no user, source, behavior, control, evidence, or downstream
  meaning changed.
- **Prompt or model change:** route through the narrower prompt/model skill as
  needed, but keep this impact map for shared workflow, control, and rollout
  effects.
- **Observed performance changed before a change request:** use
  `pm-ai-drift-to-diagnosis` first; do not treat the new signal as proof that
  the proposed change caused it.
- **Source or policy update:** check authority, freshness, precedence, changed
  claims, exception cases, reviewer rubric, and downstream artifacts.
- **New permission or external action:** require an explicit authority,
  approval, negative case, audit receipt, manual fallback, and rollback boundary;
  otherwise `Hold`.
- **No baseline but strong enthusiasm:** keep `Revalidate` or `Hold`; a demo,
  popularity, or positive reaction cannot replace the comparison.
- **Multiple changes bundled:** split into reversible units or mark the
  confounder; do not attribute the result to one change.
- **Change passes normal cases but fails a negative case:** use `Hold` or
  `Rollback`; do not average away the boundary failure.
- **Fictional fixture:** say `fictional fixture` and state that its impact,
  revalidation, route, ownership, and rollout are illustrative only. Never call
  it a live regression, safety proof, adoption result, or production release.

## Final check

- [ ] Current and candidate versions, change reason, owner, scope, and fallback
  are recorded.
- [ ] Every workflow surface has an evidence-backed affected/not-affected,
  unknown, or not-covered status.
- [ ] Baseline, candidate, slices, oracle, pass rule, denominator, reviewer,
  limitation, and next receipt are explicit.
- [ ] Routine, variation, missing/conflicting, negative, high-consequence,
  permission, human-review, and downstream cases are considered as relevant.
- [ ] Permissions, approvals, support, monitoring, rollout, stop trigger,
  rollback, and retirement are visible.
- [ ] Route is one of `No material impact`, `Revalidate`, `Release bounded`,
  `Hold`, `Rollback`, or `Retire`, with owner and failure path.
- [ ] No change is called better, safer, adopted, valuable, or production-ready
  from a happy path, fixture, diff size, or intention.
- [ ] The brief ends with `Not covered` and the next decision, not a generic
  release note.

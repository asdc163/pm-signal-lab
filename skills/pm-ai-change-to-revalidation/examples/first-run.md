# First run: policy-source change for support drafting

This is a **fictional fixture** for practicing an AI workflow change review. It
is not a live regression, model comparison, safety proof, adoption result, or
production release.

## Request

> The routine support-draft workflow is packaged for English email. We want to
> replace the policy excerpt with a newer handbook and add a prompt instruction
> that asks for a policy citation. Can we release the change now?

## Decision in one line

**Route: `Revalidate` before release.** The policy source and prompt change can
alter claims, citations, reviewer work, and downstream replies. The current
fixture has no verified source owner, candidate test result, approval receipt,
or complete baseline comparison. Do not choose `Release bounded` yet.

`Hold` is the immediate fallback if an owner, approved source, test set, or
manual review path cannot be assigned. `Rollback` applies if a candidate test
fails a required slice. `No material impact` would require a reviewer receipt
that the source, behavior, controls, evidence, and downstream meaning are all
unchanged; a prompt or source change does not meet that condition by assertion.

## Current and candidate versions

| Field | Current | Candidate |
| --- | --- | --- |
| Workflow | `support-draft-routine-email` | same workflow |
| Package/version | `v0.1.0` | `v0.2.0-candidate` |
| Source | one approved policy excerpt, version `Not verified` | newer handbook, authority/version `Not provided` |
| Prompt/instructions | draft answer from supplied policy | add citation instruction and new source |
| User/job | support agent prepares routine English email | intended to remain the same; receipt `Not provided` |
| Human boundary | agent edits and approves before send | intended to remain the same; must recheck |
| External action | no send or account action by package | no new action proposed |
| Reason | policy freshness and traceability hypothesis | not evidence of better answers |
| Owner/approver | `Not provided` | `Not provided` |

The old package must remain available while the candidate is reviewed. No
provider, policy system, customer record, or support queue was accessed.

## Impact map

| Surface | Status | Why | Receipt needed |
| --- | --- | --- | --- |
| User/job/scope | `Unknown` | citation instruction may change eligible cases or response length | support owner confirms same narrow slice |
| Input/source | `directly affected` | policy authority, freshness, precedence, and content change | approved handbook/version and source owner |
| Prompt/instructions | `directly affected` | new citation requirement changes output behavior | prompt diff and reviewed candidate cases |
| Model/provider | `not affected with receipt` | no model change supplied | owner confirms exact model/config is unchanged |
| Tools/permissions | `unknown` | citation may require a new source access path | permission review or explicit no-new-access receipt |
| Human review | `indirectly affected` | reviewer must check citation and policy match | updated rubric and reviewer acceptance |
| Evidence/claims | `directly affected` | old source-backed claims may no longer be current | source ledger and baseline/candidate comparison |
| Downstream reply | `indirectly affected` | citations and wording may alter what a customer sees | representative output review |
| Support/operations | `unknown` | source update may increase review or escalation load | owner, support, and capacity receipt |

The candidate cannot be called `No material impact` because direct and unknown
surfaces remain. The words “same workflow” do not remove source or behavior
impact.

## Revalidation slices

Run the current and candidate versions against the same sanitized fixture set,
with one material change isolated where possible:

1. routine English request with a clear policy answer;
2. request where the old and new handbook wording differs;
3. missing or conflicting policy information;
4. unsupported billing, refund, account, legal, safety, or multilingual case;
5. citation that is stale, incomplete, or points to the wrong source;
6. human edit, reject, escalation, and manual fallback path;
7. output handed to the existing support review process, with no automatic
   send or account action.

Record current output, candidate output, source/version receipt, reviewer
decision, edits, escalation, latency/cost if supplied, and any downstream
correction. Do not average an out-of-scope or citation failure into a pass.

## Evidence matrix

| Requirement | Current | Candidate | Oracle/reviewer | Outcome | Next receipt |
| --- | --- | --- | --- | --- | --- |
| answers routine English request within scope | fictional baseline only | `Not run` | support rubric, reviewer `Not provided` | `Unknown` | paired slice review |
| uses the approved current policy | source version `Not verified` | handbook authority `Not provided` | source owner | `Needs review` | approved source/version ledger |
| citation matches the policy claim | no citation requirement | `Not run` | citation review | `Not run` | reviewed citation cases |
| stops on missing/conflicting policy | fictional boundary described | `Not run` | negative-case reviewer | `Not run` | missing/conflict cases |
| human edits or escalates before send | described, not observed | intended unchanged | support owner | `Unknown` | approval and fallback receipt |
| customer outcome or time improves | `Not measured` | `Not measured` | no baseline/method | `Unknown` | defined outcome comparison |

No release threshold has been supplied. `Pass` cannot be assigned from the
request alone.

## Control and rollout boundary

- **Required before any candidate use:** named workflow/source owner, approved
  handbook version, updated review rubric, representative and negative cases,
  human approval, manual fallback, and rollback to `v0.1.0`.
- **First audience:** one support reviewer or owner-run sandbox only; actual
  identity and capacity are `Not provided`.
- **Monitoring/receipt:** source version, case ID, current/candidate result,
  reviewer choice, correction, escalation, and stop reason.
- **Stop trigger:** wrong or unsupported citation, source conflict, new
  permission requirement, human boundary violation, or missing fallback.
- **Rollout:** no default rollout, automated send, account action, or customer
  exposure is authorized by this fixture.

## Decision route and recovery

- `Revalidate`: run the named slices after owner/source/reviewer receipts exist.
- `Release bounded`: only if affected cases pass, controls hold, owner approves,
  and the release is limited to the declared support slice.
- `Hold`: use when baseline, authority, test set, reviewer, permission, or
  rollback is still missing.
- `Rollback`: restore `v0.1.0` or the manual route after a required failure;
  preserve the failed candidate evidence.
- `No material impact`: not eligible for this source/prompt change without a
  direct reviewer and source receipt proving no material effect.
- `Retire`: use only when the old workflow has no valid owner/source/job or is
  replaced with an approved fallback and a retirement record.

## Not covered

This **fictional fixture** does not establish source accuracy, model quality,
regression rates, adoption, customer outcome, time savings, ROI, causality,
security, privacy, compliance, accessibility, localization, support capacity,
production readiness, or a real release decision. No model, provider, policy
system, customer record, tool, send action, or rollback was executed.

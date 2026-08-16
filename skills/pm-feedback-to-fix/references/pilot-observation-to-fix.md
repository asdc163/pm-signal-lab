# Worked example: pilot observation to a safe fix

This is a fictional worked example. It shows the shape of a maintainer handoff;
it is not a real participant report, product result, or adoption claim.

## Decision on the desk

Should we test a copy-only clarification for the evaluation-plan handoff before
recruiting more pilot sessions?

- **User job:** a PM needs to know the next human review action after a
  high-impact AI case is flagged.
- **Current workaround:** reread the plan, infer the next step, or stop and ask
  the maintainer.
- **Decision owner:** product maintainer, after a copy review and fresh fixture
  run.
- **Success condition:** a reviewer can find the next action and its owner in
  the output without losing the source, version, or human-review boundary.

## Observation record

- **Source:** fictional session `F-014`; sanitized pilot note; demo `v0.1.0`.
- **Context:** Chrome desktop, evaluation plan with one sensitive support case.
- **Expected:** after the high-impact warning, the reviewer can see what to
  review next.
- **Observed:** the note says the human-review boundary was clear, but the
  next action was not easy to find; the reviewer reread once and stopped.
- **Impact:** reported hesitation and a possible recovery failure. Frequency
  and severity are not measured.
- **Request:** make the next step more explicit, preferably as a checklist.
- **Provisional class:** comprehension and trust handoff, not yet a confirmed
  product bug.

## Evidence boundary

- **Observed in the fictional note:** session ID, version, environment,
  expectation, reported hesitation, and requested change.
- **Reported, not independently reproduced:** the next action was hard to
  find.
- **Inference:** the handoff may need stronger information scent after a
  high-impact warning.
- **Proposed hypothesis:** a short ordered checklist will make the review path
  easier to locate.
- **Not measured:** task completion, time, frequency, conversion, adoption,
  safety, model quality, or business impact.
- **Privacy handling:** the fixture contains no customer data, names, secrets,
  or raw support text.

## Reproduction or verification path

This is a proposed path and has not been run.

1. Open the fictional `pm-ai-evaluation-plan` first-run fixture.
2. Use the supplied evaluation goal and select the sensitive/high-impact slice.
3. Read the output from `Guardrails and fallback` through `Review ask`.
4. Record whether a reviewer can identify the next human action, its owner,
   and the evidence needed to proceed.
5. If the path is unclear, capture the exact heading or sentence that caused
   the hesitation; do not paste private material.

**Expected result:** the output preserves the high-impact human-review boundary
and gives one visible next action.

**Actual result:** `Not run`. The fictional note reports a mismatch; it is not a
fresh verification result.

**Recovery:** return to the last section with a visible `Review ask`; if no safe
action can be identified, choose `Need evidence` rather than inventing a fix.

## Smallest fix or experiment

Add a short `Review next` block to the relevant example/output guidance:

1. confirm the source and version for the flagged case;
2. assign the human reviewer and record the unresolved question;
3. choose `Ship`, `Test`, `Hold`, `Need evidence`, or `Reject`.

- **Hypothesis:** a bounded, ordered handoff will reduce the chance that a
  reviewer stops after reading the warning without weakening the warning.
- **Owner:** maintainer for copy and fixture review.
- **Dependencies:** the existing output contract and fictional fixture only.
- **Downside:** an extra block could feel repetitive or be mistaken for a
  completed decision.
- **Stop or revise if:** the block hides `Not covered`, removes source
  provenance, or makes a reviewer think high-impact cases are auto-approved.

## Acceptance checks

All checks are `Not run` in this fictional example.

- [ ] The output contains a visible `Review next` block after the high-impact
      boundary.
- [ ] The block keeps `F-014`, `v0.1.0`, and source/version requirements visible.
- [ ] The block names a human reviewer and does not imply automatic approval.
- [ ] `Need evidence` remains available when the reproduction or source is
      incomplete.
- [ ] The fictional first run still produces `Not covered` and the full output
      contract.
- [ ] Mobile, keyboard, privacy, and regression checks are reviewed if the
      change reaches a rendered product surface.

## Release and rollback

- **Gate:** copy review, verifier pass, and fresh fictional fixture run; no
  external adoption claim is needed or implied.
- **Rollout boundary:** documentation/example slice only; no provider, login,
  telemetry, or external write.
- **Rollback trigger:** reviewers cannot distinguish the suggested next action
  from a completed decision, or the human-review boundary becomes weaker.
- **Rollback action:** revert the copy/example change and keep the original
  feedback note linked as an unresolved learning item.
- **Evidence status:** no release has been performed for this fictional fix.

## Learning writeback

This observation supports testing a clearer review handoff. It does not support
claims about usability rates, adoption, safety, model quality, or the frequency
of the mismatch. The next question is whether another independent, sanitized
session can find and use the same handoff without maintainer explanation.

## Not covered

- no real participant, client, model, provider, or production environment;
- no independent reproduction or completed acceptance check;
- no accessibility, mobile, latency, cost, safety, adoption, retention, or
  business measurement;
- no evidence that the proposed copy is the right fix;
- no permission to edit code, publish a release, or contact a participant.

## Review ask

Choose one: `Test` the copy-only handoff, `Need evidence` from another
sanitized session, or `Hold` until the high-impact review path is clearer. The
unresolved risk is that a helpful-looking checklist could be read as approval.

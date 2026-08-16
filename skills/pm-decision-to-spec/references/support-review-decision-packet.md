# Worked example: support-review Product Decision Packet

This is a fictional fixture. It shows a bounded handoff from a decision to a
reviewable product slice; it is not a client requirement, user study, or release
result.

## Decision on the desk

Should the team test a copy-only source/version handoff in the support-draft
review example before considering any provider or persistence work?

- **Decision status:** `Test`.
- **Decision owner:** PM maintainer after design, engineering, and QA review.
- **User job:** a support PM needs to check what a draft is grounded in before
  deciding whether to carry it into a product discussion.
- **Current workaround:** reopen the source row and compare it manually.
- **Decision change condition:** fresh fixture and review evidence shows that
  source/version context is still missing or the copy change creates confusion.

## User job and context

- **Target segment:** PM or product engineer reviewing an AI-assisted support
  draft in a local or hosted fixture.
- **Situation:** the reviewer has a candidate draft and needs to inspect its
  source before treating it as a working claim.
- **Trigger:** selecting a source-linked review row.
- **Desired progress:** identify the source number, version, limitation, and
  human review step without losing the current task.
- **Alternative:** manually compare a source row and a draft in separate views.
- **Cost of doing nothing:** repeated navigation and a higher chance of using a
  claim without its source context. Frequency is not measured.

## Evidence boundary

- **Source:** fictional decision `D-021` from fixture `v0.1.0`.
- **Method:** fictional evaluation note and source-linked workflow description.
- **Observed or reported:** the source line could be identified; completion,
  adoption, model quality, and production behavior were not measured.
- **Inference:** keeping source number and version in the review frame may lower
  the comparison cost.
- **Proposal:** test a copy-only source/version handoff.
- **Confidence:** low. The fixture is synthetic and has no real user session.
- **Decision supported:** define a bounded copy review and fixture check.
- **Decision not supported:** provider selection, production launch, safety,
  adoption, retention, or market demand.
- **Not provided:** real participant, client version, baseline, target,
  sample, accessibility result, and hosted candidate behavior.

## Scope and should-not-build

### Must-have

- Keep source number, source version, limitation, and human-review status in
  the review output.
- Keep the existing fictional source mapping intact.
- Add a copy-only check to the first-run fixture and worked example.
- Preserve `Not covered` and `Need evidence` states.

### Nice-to-have

- Add a short maintainer note explaining why source/version context is shown.
- Compare the copy in a second fictional support-draft example.

### Should-not-build

- External model provider, API key flow, login, persistence, telemetry, or
  automatic GitHub submission.
- New source ingestion, search, ranking, or user account model.
- Production rollout or an adoption claim based on the fixture.

### Dependencies and assumptions

- Existing source-linked output contract remains available.
- An authorized owner can review the copy and run the fixture checks.
- The second fictional example is optional and must not be presented as real
  usage.

## UX flow and states

- **First-time:** explain that the packet is a bounded copy test and show the
  source number/version requirement before review begins.
- **Empty:** if no decision evidence is supplied, show `Need evidence` and do
  not create a must-have scope.
- **Loaded:** keep the source context next to the working review claim.
- **Loading:** `Not applicable` for this local, tool-free fixture; no fake
  progress is added.
- **Error:** if the source ID or version is missing, state the missing field and
  return to evidence registration.
- **Recovery:** allow the owner to change the decision to `Hold` or `Need
  evidence` without losing the source boundary.
- **Mobile:** keep source/version and human-review status readable at the
  target narrow viewport; no layout result is claimed yet.
- **Accessibility:** preserve heading order, keyboard access, focus visibility,
  semantic labels, and readable status text; checks are not run yet.
- **Trust:** make it clear that the source context is a review aid, not proof of
  model quality or approval.

## Acceptance criteria

All checks are `Not run` in this fictional packet.

- [ ] The output preserves decision ID `D-021` and fixture version `v0.1.0`.
- [ ] The source number, limitation, and human-review status remain visible in
      the review output.
- [ ] The packet contains `Must-have`, `Nice-to-have`, and
      `Should-not-build` with no provider or persistence work hidden in scope.
- [ ] Missing source/version evidence returns `Need evidence` rather than a
      confident build instruction.
- [ ] The fictional first run and worked example retain `Not covered`.
- [ ] Keyboard, semantic, mobile, privacy, and recovery checks are recorded if
      the copy change reaches a rendered surface.
- [ ] A fresh authorized review records the result before any release claim.

## Measurement and guardrails

- **Learning question:** does the copy-only handoff make source/version review
  easier without weakening the human-review boundary?
- **Primary outcome:** reviewer can identify source number, version, limitation,
  and next review action in the fixture. Baseline and target are `Not provided`.
- **Exposure:** one fictional first-run fixture and one worked example. No
  production exposure event exists.
- **Qualitative evidence:** capture one reviewer observation if an authorized
  person runs the fixture; no participant result exists yet.
- **Behavioral QA:** verify normal, missing-field, recovery, keyboard, mobile,
  and semantic states if a rendered surface changes. Status is `Not run`.
- **Guardrails:** no claim of model quality, adoption, safety, production
  readiness, privacy approval, or business impact.
- **Instrumentation:** `Not applicable` for the current local, tool-free
  fixture. Do not add telemetry just to make this packet look measurable.

## Risks, rollout, and rollback

- **Risks:** source/version copy could be read as quality proof; added text could
  obscure the next action; a fictional fixture could be mistaken for research.
- **Rollout:** documentation and fixture review only. The public hosted runtime
  does not change in this slice.
- **Release gate:** copy review, verifier pass, fresh fixture run, and explicit
  confirmation that `Not covered` and human review remain visible.
- **Rollback trigger:** reviewers interpret source context as automatic approval,
  or the change drops limitation/provenance information.
- **Rollback action:** revert the copy/example change and retain `D-021` as an
  unresolved learning item.
- **Decision if inconclusive:** `Hold` and collect a real, sanitized workflow
  observation before widening scope.

## Not covered

- no real PM, support team, client, provider, model, or production environment;
- no completed fixture, browser, mobile, keyboard, screen-reader, or hosted
  candidate result;
- no baseline, target, sample size, completion rate, adoption, retention,
  quality, safety, cost, or business measurement;
- no evidence for provider choice, persistence, telemetry, or production launch;
- no authorization to edit code, create tickets, or publish a runtime change.

## Implementation handoff

- **Design:** review the source/version copy and trust boundary in the fixture.
- **Engineering:** make no runtime change; if a copy change is approved, keep
  it isolated to the skill docs and examples.
- **QA:** run the verifier, first-run fixture, missing-field path, and relevant
  keyboard/mobile/semantic checks; record each result.
- **Writeback:** append the reviewed observation to the pilot issue or product
  decision log without private customer data.
- **Review decision:** choose `Test` the copy-only packet, `Hold` for real
  evidence, or `Reject` if the source context is not useful.

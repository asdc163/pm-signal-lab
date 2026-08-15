# Pilot note feedback loop contract — 2026-08-15

## Problem frame

- **Decision:** Make the first external feedback handoff easier to understand and more likely to produce one actionable observation.
- **User/job:** An international PM, founder, product designer, or product engineer has completed the hosted worksheet and wants to say what should change next.
- **Current friction:** The post-brief feedback block was labelled `Optional`, used a generic session-recording action, and did not say which minimum details were useful.
- **Desired outcome:** A tester can find the feedback path after exporting a brief, understand that three concrete lines are enough, and produce a reviewable field note without sending raw evidence.
- **Success signal:** A future non-owner session report contains a task result, one concrete hesitation, and one requested change that can be triaged. No current session or adoption result is claimed by this contract.
- **Constraints:** English-first public surface; local-only session state; no login, telemetry, provider, raw-evidence upload, automatic issue submission, or social automation.
- **Out of scope:** Required demographic data, sentiment inference, automated GitHub filing, account growth claims, provider integration, and a new feedback database.

## Product scope

### Must have

- Use a literal `Pilot note / After the task` label after the decision brief.
- Explain that three concrete lines are enough: expectation, hesitation, and one change.
- Keep trust and recovery as optional context rather than making the note feel like a survey.
- Keep the privacy checkbox as a hard gate before Markdown generation.
- Keep the generated field note editable, local, and explicitly manual before GitHub sharing.
- Keep the feedback path usable on a 390px viewport without hiding the sticky action behind the form.

### Should not build

- Do not add an AI-generated interpretation of the tester's feedback.
- Do not infer completion, satisfaction, sentiment, or adoption from local events.
- Do not send data to GitHub, a model provider, an analytics service, or a social platform automatically.

### Acceptance criteria

1. After a valid decision brief, the collapsed block says `Pilot note / After the task` and the action says `Open pilot note`.
2. The open state says that three concrete lines are enough and keeps the local-only boundary visible.
3. Without privacy confirmation, `Prepare field note` does not create `#feedback-output` and shows an actionable warning.
4. With privacy confirmation, the field note is generated locally and contains no raw source evidence.
5. The output offers `Copy field note` and a manual `Open feedback page` handoff; neither action submits an issue.
6. At 390×844, the feedback form has no horizontal overflow and its controls remain reachable.

## UX flow and states

1. **After export:** The tester sees the brief first, then a quiet pilot-note invitation.
2. **Collapsed:** `Open pilot note` is the only new action; the user can ignore it without blocking the brief.
3. **Open:** The first read gives the short path before the fields. The boundary states that Markdown is local only.
4. **Privacy blocked:** The form stays open, the user's text remains, and the warning explains what must be confirmed.
5. **Prepared:** Focus moves to the editable field note. The title says it is a field note, not a validation result.
6. **Handoff:** Copy is local. The GitHub page opens separately for human review and manual submission.
7. **Mobile:** The sticky action is hidden while the note form is open; fields stack and remain within the viewport.

## Engineering plan

- `src/App.tsx`: update the visible feedback invitation, short-path guidance, field-note action names, and manual handoff label.
- `docs/operations/pm-session-kit.md`: give external testers the same three-line path as the product.
- `docs/operations/public-pilot-issue-body.md`: keep the public pilot instructions aligned with the current UI.
- `README.md`, `DESIGN.md`, and `CHANGELOG.md`: expose the current English-first contract and evidence trail.
- Preserve `src/domain/feedback.ts`: the privacy gate, local Markdown shape, and boundary language remain unchanged.
- No dependency, schema, provider, storage, API, or permission change.

## QA and release

- Deterministic gate: `npm test`, `npm run lint`, and `npm run build`.
- Local browser gate: fresh desktop path through sample → review → decision → export → pilot note; test privacy block, valid field note, copy, manual link, and console logs.
- Mobile gate: fresh 390×844 first run and feedback form; verify the empty action, `Start review` transition, field stacking, and no horizontal overflow.
- Evidence boundary: owner-run browser evidence is not a Chrome Extension, native screen-reader, real-user, or adoption result.
- Rollback: revert the single UI/documentation change; no migration or external state is involved.
- Promotion: only after the hosted URL serves the new copy and a fresh hosted browser pass repeats the changed states.

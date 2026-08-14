# English-first product messaging contract

Status: active for the `en-US` public preview

Product: PM Signal Lab

Date: 2026-08-15

## Problem frame

PM Signal Lab is a local-first product evidence workbench. Its first overseas-facing job is narrow: help a PM move from one raw product signal to a source-linked claim, a human review decision, and the smallest next test without turning a chat summary into an unsupported conclusion.

The target audience is an international PM, founder, product designer, or engineer who can give the product five minutes and wants to answer:

> Which line of evidence can I defend, what is still uncertain, and what should I test next?

The primary conversion event is not a star or a signup. It is a completed local session: load or add a signal, open its source, review one claim, draft a smallest experiment, and inspect the exported brief. GitHub stars, adoption, retention, and decision quality remain external outcomes and are not claimed by this contract.

## Positioning

- Category: a source-linked product evidence worksheet.
- Alternative: a chat summary, spreadsheet, or notes page that separates the source from the conclusion.
- Mechanism: `Collect → Verify → Decide → Ship`, with source folios, limitations, explicit human review, and a Markdown export.
- Reason to believe: every sample claim is linked to the deterministic fixture rows that produced it; missing evidence stays visible.
- Not for: autonomous research, automatic issue creation, model scoring, or replacing a PM's judgment.

## Product scope for this release

Must-have:

- An English-first `en-US` public UI across first-run, loading, loaded, error, recovery, form, review, experiment, export, feedback, sidebar, mobile action bar, and accessible names.
- English sample evidence, claims, limitations, experiment fields, decision Markdown, and session feedback Markdown.
- English HTML language metadata, page title, description, and current public README / operations handoff.
- The source ledger, local-only boundary, manual GitHub submission boundary, and missing-evidence behavior remain intact.
- A fresh local and hosted browser check at desktop, tablet, and narrow mobile widths.

Nice-to-have, explicitly deferred:

- A locale selector, runtime i18n system, translated historical audit archive, and localized landing pages.

Should not build in this slice:

- A provider, API key flow, database, telemetry, automatic GitHub mutation, automatic issue submission, or a star-growth mechanic.
- Claims about native-language quality, user adoption, conversion, or GitHub growth without direct evidence.

## Product messaging contract

### Message job

- User job: trace one product signal into a defensible next decision.
- Audience: overseas PMs, founders, product designers, and engineers evaluating a practical PM tool.
- Funnel: GitHub README or hosted demo → first-run comprehension → completed review → optional field note.
- Target action: load the sample pack, inspect a source, review a claim, and draft the smallest experiment.
- Success metric: owner-verified completion of that workflow without relying on hidden source context; external adoption is not part of this release evidence.

### Source truth

- Product truth: the app is local-first, deterministic for the sample pack, and does not connect to an AI provider or GitHub mutation API.
- User language: “source”, “claim”, “limitation”, “smallest test”, “what I trusted”, and “where I hesitated”.
- Before: a summary can be easy to copy but hard to defend.
- After: source, claim, limitation, and next action stay in one visible path.
- Proof boundary: current-turn local/hosted QA can prove the visible workflow and exported content; it cannot prove general usability or real adoption.

### Copy architecture

1. Lead with the job: “Put a sentence back next to its source.”
2. Explain the path: “Collect → Verify → Decide → Ship.”
3. Show the boundary near every consequential action: local page state, no external transfer, human decision required.
4. Keep status labels literal: `Source-backed`, `Needs your review`, `Missing evidence`.
5. Keep actions concrete: `View source`, `Accept claim`, `Keep as hypothesis`, `Draft smallest experiment`, `Export decision brief`.

### No-AI copy guard

- Avoid “seamless”, “revolutionary”, “supercharge”, “unlock”, “intelligent”, “AI-powered”, “magic”, and generic productivity promises.
- Never imply that a generated summary is a fact, that copying is adoption, or that a brief is a completed decision.
- Name the source, limitation, user action, and boundary wherever the interface asks for trust.
- Prefer plain verbs and short sentences over promotional adjectives.

### UX microcopy states

- First run: explain the raw-signal starting point and show one realistic quote.
- Loading: say what is being prepared and preserve the local boundary.
- Empty: give one next action and one manual alternative.
- Error: say what stayed safe and how to recover.
- Review: distinguish source-backed, review, and missing evidence.
- Export: say that the brief is shareable but not a completion guarantee.
- Feedback: state that the report is a local field note, exclude raw evidence, require privacy confirmation, and require manual review before GitHub submission.

## Localization gate

This release treats locale as product state, not a translated hero. The public product uses `lang="en-US"`, English UI and generated artifacts, English metadata, English README and issue handoff, and English accessible names. The check includes text expansion, 390px layout, keyboard focus, loading/error/recovery states, and generated Markdown.

Acceptance criteria:

- No Han characters remain in the released product UI, generated Markdown, current public README, current operations handoff, or current English-first release audit.
- Source identities and internal IDs may remain as evidence identifiers; they are not user-facing localization copy.
- No source, limitation, privacy, human-review, or “not covered” boundary is weakened during translation.
- The hosted preview is called an `en-US public preview` until fresh hosted evidence is recorded.

## Learning loop

The next learning question is whether a first-time international PM understands the source → claim → test path without coaching. The current product can collect a self-reported field note with role, result, hesitation, trust, recovery, and one change. It does not auto-submit, infer sentiment, or convert those notes into adoption metrics. A future native-speaker review or external PM session is a separate evidence gate.

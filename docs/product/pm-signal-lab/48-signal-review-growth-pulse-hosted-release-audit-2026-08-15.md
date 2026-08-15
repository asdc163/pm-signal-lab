# PM Signal Lab — signal review and weekly growth pulse hosted release audit

**Date:** 2026-08-15
**Canonical surface:** https://asdc163.github.io/pm-signal-lab/
**Product code under test:** `c53345044688bdae41e7e17fc192e47eac6dd5f8` on `main`
**Browser route:** Codex Chrome Extension, fresh agent-created tabs, background execution without stealing foreground focus

## Decision

`HOSTED PASS / GROWTH PULSE OPERATIONAL / LEARNING GATE OPEN`.

The English-first signal-review slice is live at the canonical Pages URL. I personally exercised the hosted empty state, deterministic sample, source trace, claim review, experiment brief, decision-brief export, and privacy-gated field-note handoff. The weekly public-signal workflow also passed a fresh manual dispatch after its first remote failure was reproduced and fixed.

This is release evidence for product behavior and public operating hygiene. It is not evidence of external adoption, qualified stars, model quality, general usability, or a completed 10,000-star outcome.

## Canonical HTTP evidence

Fresh shell checks on 2026-08-15 returned:

- `HTTP/2 200` from the canonical Pages URL.
- Page title: `PM Signal Lab — Product signals to decisions`.
- Document language: `en-US`.
- Published assets: `assets/index-BoSm0cHX.js` and `assets/index-B8jNbZns.css`.
- The response did not show an HTTP-level failure or a stale pre-slice page.

The hosted page was then opened in a fresh Chrome Extension tab. HTTP success is kept separate from browser behavior evidence below.

## Hosted behavior matrix

| user/job | actions personally performed | observed result | boundary |
| --- | --- | --- | --- |
| International PM, first visit | Opened the canonical URL in a fresh desktop tab | English UI, worksheet framing, `Load sample data`, `Add your own signal`, and `Source line → Claim → Smallest test` were visible | No real visitor comprehension claim |
| PM reviewing source material | Loaded the sample and expanded the first `View source` row | Four source rows appeared; the expanded row showed the new interview line, source folio, identity/date, and local session boundary | Fixture content is deterministic, not customer evidence |
| PM checking a claim | Started `Verify` and accepted the first claim | The new claim, mapped source lines, limitation, and `1 accepted` state were visible; no automatic acceptance occurred | No model quality or decision-outcome claim |
| PM drafting a next test | Moved through `Decide` and drafted `Smallest experiment` | `Ready for confirmation`, hypothesis, primary metric, guardrail, smallest test, decision rule, and `Experiment owner · TBD` were visible | It remains a proposed test, not a completed result |
| PM carrying the work forward | Opened `Ship` and inspected the generated Markdown brief | `## Decision`, `## Known limits`, `## Experiment`, and `## Not covered` were present; the brief kept the new claim and rejected the old AI-summary wording | Hosted download was not separately used as adoption evidence |
| Low-trust tester | Opened `Pilot note / After the task`; tried `Prepare field note` without privacy confirmation | Preparation was blocked with: `Please confirm that this report contains no customer data, private content, API keys, or tokens.` | No data is submitted automatically |
| Tester preparing feedback | Confirmed the privacy checkbox and prepared the note | An editable field note appeared with `Not provided` for blank fields, the explicit `This is a field note, not a validation result.` boundary, and a manual GitHub feedback link | The tester must inspect and submit manually; this run did not submit an issue |
| Mobile PM | Opened a fresh hosted tab at 390×844, reloaded, and loaded the sample | `scrollY=0`, `clientWidth=375`, `scrollWidth=375`, `overflowX=false`, four source rows, and a reachable `Start review` action | Native device behavior and assistive-technology announcements remain unverified |

The hosted browser run contained no observed app-origin error or warning. Chrome-extension-origin diagnostics are not attributed to PM Signal Lab.

## Code, CI, and Pages evidence

| check | result | evidence |
| --- | --- | --- |
| Product tests | PASS | `npm test -- --run`: 4 test files, 10 tests passed. |
| Type/lint gate | PASS | `npm run lint`: exit 0. |
| Production build | PASS | `npm run build`: Vite production build completed. |
| Diff hygiene | PASS | `git diff --check`: exit 0. |
| Main CI | PASS | [GitHub Actions run 31860427131](https://github.com/asdc163/pm-signal-lab/actions/runs/31860427131), push of `c533450…`. |
| Pages deploy | PASS | [GitHub Actions run 31860427055](https://github.com/asdc163/pm-signal-lab/actions/runs/31860427055). |
| Canonical hosted page | PASS | [English-first Pages preview](https://asdc163.github.io/pm-signal-lab/). |

GitHub's Pages log includes a non-blocking runner annotation that the actions currently target Node 20 while the runner uses Node 24. The product build and deployment completed successfully; the annotation remains a maintenance item rather than being silently treated as absent.

## Weekly growth pulse evidence

The workflow is deliberately read-only. It reads public repository metadata, actual open issues after excluding pull requests, labelled feedback, recent CI conclusions, the current default-branch commit, and release state. It writes only a workflow summary and a 30-day artifact. It does not star, follow, like, reply, post, DM, or mutate external product resources.

### Failure reproduced and fixed

The first manual dispatch, [run 31860211078](https://github.com/asdc163/pm-signal-lab/actions/runs/31860211078), failed during collection because the workflow passed full GitHub API JSON through `jq --argjson` command-line arguments. The runner reported an argument-list limit failure (`Argument list too long`).

I changed the workflow to store each read-only response in a temporary runner directory and load it with `jq --slurpfile`. The summary output was also made shell-safe so Markdown punctuation cannot become shell syntax.

### Corrected dispatch

The corrected workflow passed in [run 31860470291](https://github.com/asdc163/pm-signal-lab/actions/runs/31860470291):

- Event: `workflow_dispatch`.
- Head SHA: `c53345044688bdae41e7e17fc192e47eac6dd5f8`.
- Job: `Read public product signals` — success.
- Collection, artifact upload, and completion steps — success.
- Artifact: [`weekly-growth-pulse-31860470291`](https://github.com/asdc163/pm-signal-lab/actions/runs/31860470291/artifacts/9240392595), ID `9240392595`, 1,279 bytes, 30-day retention.
- Artifact SHA-256 zip digest: `76f984d10348b676353ac8c52e589b743cd23cdebd697741539a020de1de454f`.

The artifact's public snapshot recorded:

| signal | value |
| --- | --- |
| Stars | `1` |
| Forks | `0` |
| Actual open issues | `1` |
| Labelled feedback items | `1` |
| Latest CI conclusion | `success` |
| Latest release | `null` / none |
| Traffic | `not_collected` |
| External sessions | `not_verified` |
| Adoption | `not_verified` |
| Star quality | `not_inferred` |
| Operating decision | `iterate_recruit` |

The one public issue is [#4 — Public pilot: looking for 5 PM session testers](https://github.com/asdc163/pm-signal-lab/issues/4), currently open with zero comments. That is a recruitment queue, not a tester count.

## Current operating decision

Keep the project in `Iterate / recruit`.

The next product gate is five unguided sessions from people outside the maintainer account, with at least three concrete reports containing a hesitation, trust/recovery observation, or requested change. The [international pilot launch kit](../../operations/international-pilot-launch-kit-2026-08-15.md) contains English-first, human-reviewed channel drafts. No automatic posting or reply loop is enabled.

Stars are currently `1`; the 10,000-star target remains a long-term aspiration, not a current result or forecast. The honest route is to earn qualified attention through a useful product, reproducible evidence, and specific learning—not to manufacture activity.

## Not covered

- Non-owner PM sessions, five-second comprehension, retention, conversion, referrals, adoption, and return behavior.
- GitHub traffic, clone data, visitor provenance, or the quality of any future star.
- Native VoiceOver, NVDA, TalkBack, or a formal screen-reader sign-off.
- The scheduled cron trigger as a separately observed event; the manual dispatch path is the verified path in this audit.
- External community posts, replies, or social distribution outcomes.
- Any claim that the deterministic fixture proves external AI quality or PM decision quality.

The next evidence-producing action is human-reviewed recruitment and triage of the first external session, not another cosmetic release.

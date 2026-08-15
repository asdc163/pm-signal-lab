# PM Signal Lab — Single-Sheet Workbench Hosted Release Audit

Date: 2026-08-15 14:59 +08:00

## Release identity

- Canonical URL: https://asdc163.github.io/pm-signal-lab/
- Repository: https://github.com/asdc163/pm-signal-lab
- Main commit: `c37b4434d0534a7c772de53cc38b55c225b34cd4`
- Public PR: https://github.com/asdc163/pm-signal-lab/pull/30
- Deployment workflow: https://github.com/asdc163/pm-signal-lab/actions/runs/31870758202
- Hosted verifier workflow: https://github.com/asdc163/pm-signal-lab/actions/runs/31870779941
- Local QA evidence: `docs/product/pm-signal-lab/58-single-sheet-workbench-second-polish-local-qa-2026-08-15.md`

## Automated canonical verification

The repository verifier ran against the public URL at `2026-08-15T06:59:17.261Z` UTC and returned success.

- HTTP status: 200
- HTML language: `en-US`
- Title: `PM Signal Lab — Product signals to decisions`
- Cache-Control: `max-age=600`
- Current JavaScript asset: HTTP 200, `application/javascript; charset=utf-8`
- Current CSS asset: HTTP 200, `text/css; charset=utf-8`
- Current English copy present: yes
- Stale copy absent: yes
- Canonical HTTPS check: yes
- HTML and asset checks: yes

The verifier also confirmed the new source-led copy and boundary language, including `Put one signal on the desk`, `Check what this line supports`, `Sample signal`, `Local fixture only`, `Desk note`, `Review docket`, `No claim travels without its source.`, `Open pilot note`, and `This is a field note, not a validation result.` It confirmed the retired hero copy, `Load sample data`, `Margin note`, preview wording, and local-preview wording were absent.

## Fresh hosted Chrome verification

Tool route: Codex Chrome Extension, fresh controlled tab on the canonical URL. The QA tab was finalized after the run and the temporary viewport override was reset.

### Desktop

- Empty first viewport rendered `Put one signal on the desk` and `Open the sample worksheet`.
- The visible sample quote was marked `Sample signal`; the fixture boundary read `Local fixture only · no external research is attached.`
- `lang=en-US` was observed in the live DOM.
- The direct screenshot showed the source-led workpaper and the sample CTA; the duplicate hero decision path and persistent margin-note rail were absent.
- Clicking the sample action exposed `Preparing sample data` before the loaded state.
- After loading, the live DOM contained 4 source rows, the Review docket, 2 desk-summary context items, and `Check what this line supports`.
- `Start review` moved the workflow to Verify with claim review actions; the first source row expanded to `Hide source` and showed `Original content stays in this session`.
- Hosted console error readback after the exercised paths: `[]`.
- Default desktop document width equaled client width; no horizontal overflow was observed.

### Mobile

- Explicit 390×844 viewport rendered the mobile workflow and a fixed action bar.
- Empty state document width was 375 and client width was 375; no horizontal overflow was observed.
- The fixed action bar was `position: fixed` and available for the sample onboarding path.
- After loading, the live DOM contained 4 source rows, `Check what this line supports`, a one-column desk context, and no horizontal overflow.

## Public pilot and growth baseline

At the same release audit, the public repository readback was:

- Stars: 1
- Forks: 0
- Public pilot issue: https://github.com/asdc163/pm-signal-lab/issues/4
- Pilot issue state: open, 0 comments at audit time

These are baseline facts, not proof of adoption or momentum. The 10,000-star objective remains a long-term outcome target, not a release acceptance criterion.

## Release decision

The single-sheet workbench is live at the canonical hosted URL and passed the current automated and direct hosted checks above. The public surface is English-first and the product boundary is explicit.

The release is not evidence that real users complete the workflow, return, trust every claim, or improve their product decisions. It is also not evidence of native screen-reader coverage, physical-device behavior, GitHub traffic, external mentions, or star growth.

## Remaining evidence gates

- Recruit and observe five unguided international PM sessions.
- Collect at least three concrete field notes covering expectation, hesitation, and one requested change.
- Re-run native assistive-technology and real-device verification before making accessibility or mobile completion claims.
- Keep GitHub growth reporting separate from product QA; never buy, automate, or fabricate stars, followers, comments, or testimonials.

# PM Signal Lab — formal hosted demo release audit

**Date:** 2026-08-15
**Canonical demo:** https://asdc163.github.io/pm-signal-lab/
**Published main SHA:** `a1b7c174cb539f51b12776beaf0eb84d8882946f`
**Browser route:** Codex Chrome Extension, fresh agent-created tabs, background execution without stealing foreground focus

## Decision

`SCOPED FORMAL HOSTED DEMO PASS / PILOT EVIDENCE GATE OPEN`.

PM Signal Lab now has a formal hosted demo contract and an automated read-only smoke check. A stranger can open one canonical English URL, run the deterministic PM workflow, inspect the local-only boundary, and prepare a manual feedback note without login or maintainer intervention.

This proves the hosted demo release surface. It does not prove external usability, native screen-reader quality, AI quality, adoption, qualified stars, or a completed 10,000-star outcome.

## Release definition

For this product, `formal hosted demo` means:

- one canonical HTTPS URL;
- a reproducible hashed bundle served by GitHub Pages;
- automated HTML, asset, current-copy, and stale-copy checks after deployment and on a daily schedule;
- a direct Chrome Extension run of the core product path;
- a visible local-first, no-login, no-automatic-submission boundary;
- a public English pilot path that can produce a concrete field note.

It does not mean a backend production application, persistent account data, an external model provider, or a verified user base.

## Product QA Report

### Environment

- Canonical surface: `https://asdc163.github.io/pm-signal-lab/`.
- Current main: `a1b7c174cb539f51b12776beaf0eb84d8882946f`.
- Browser route: Codex Chrome Extension.
- Chrome context: fresh agent-created tabs; no foreground stealing.
- Browser disabled: not applicable; the configured Chrome Extension route was available.
- Computer Use fallback: not used.
- Temporary viewports: desktop `1280×900`, mobile `390×844`.
- Native screen-reader route: not available in this run; no VoiceOver/NVDA/TalkBack claim is made.

### Behavior matrix

| user archetype | starting state / job | action performed | success signal | failure signal / recovery |
| --- | --- | --- | --- | --- |
| International PM, first visit | Fresh canonical page; identify the job | Opened a fresh current-main tab and inspected the empty state | `Load sample data`, `Source line → Claim → Smallest test`, and the local refresh boundary were visible | No non-owner comprehension claim; the public session kit remains the next step. |
| Evidence reviewer | Loaded sample; trace one line before interpreting it | Loaded the pack and expanded `View source` in the full hosted run | Four source lines, folio identity, original line, date, limitation, and `Hide source` were observed | The fixture is deterministic and not customer evidence. |
| PM reviewing a claim | Loaded Collect; move from source to human review | Selected `Start review`, accepted one source-backed claim, and read the mapped source/limitation | `02 · Verify`, `Source-backed`, `1 accepted`, and `Go to Decide` appeared | A claim remains a suggestion until a person accepts, edits, keeps, or marks it missing. |
| Decision owner | One claim accepted; name the smallest test | Entered Decide, inspected the generated brief, and selected `Export decision brief` | `Name the smallest test`, metric, guardrail, decision rule, owner, `Decision brief`, and `Not covered` appeared | The brief is a proposed test and not an observed outcome. |
| Pilot tester | Ship state; report one concrete observation | Opened `Help decide what to fix next`, submitted no privacy confirmation, then confirmed the checkbox and prepared a local field note | Privacy block appeared first; confirmed preparation produced `This is a field note, not a validation result.` and a manual GitHub link | No issue was submitted automatically; the tester must inspect the note. |
| Keyboard user | Fresh page with no mouse interaction after tab creation | Used global Tab and Enter traversal for sample load, review, accept, Decide, export, and pilot-note entry | Focus reached the expected controls; Enter produced each tested transition; focus after transitions landed on a visible next action | Native screen-reader announcements remain unverified. |
| Mobile PM | Fresh current-main tab at `390×844` | Loaded sample and inspected the fixed action | `clientWidth=375`, `scrollWidth=375`, `overflowX=false`, sticky `Start review` visible at bottom `834` | Native device, virtual keyboard, and assistive-technology behavior remain unverified. |

### Current-main browser evidence

The current-main smoke after the formal hosted release returned:

```text
empty: true
loaded: true
enteredVerify: true
focus after Enter: BUTTON / Draft smallest experiment
mobile clientWidth: 375
mobile scrollWidth: 375
mobile overflowX: false
mobile sticky action: visible
```

The complete `Collect → Verify → Decide → Ship → pilot note` path was exercised against the same client bundle immediately before the operational-only hosted-demo merge. The formal hosted PR changed no `src/` files, and the current smoke plus hosted asset check confirmed the same current UI bundle remains deployed.

### Semantic fallback evidence

The current hosted Ship / pilot-note state was inspected through the browser DOM and accessibility snapshot:

- visible controls had accessible text or an associated form label;
- no visible form control lacked a label association in the tested state;
- one `main`, one `nav`, one banner, and two complementary regions were present;
- a `Skip to main content` link was present;
- live/status regions exposed the current worksheet and decision-brief readiness.

This is semantic fallback evidence only. It does not substitute for a native screen-reader run.

### Findings

No blocker or high-severity product finding was observed for the formal hosted demo scope.

#### Release hygiene — low

- **Likely user interpretation:** an already-open tab may lag immediately after a Pages deployment because the HTML response advertises `max-age=600`.
- **Hesitation/friction:** a stale tab was previously observed during the margin-note release.
- **Recovery:** the stale tab was excluded from evidence; fresh cache-busted, fresh canonical, and current-main browser tabs all showed the current bundle.
- **Trust:** the release process treats stale browser state as an evidence mismatch rather than silently calling it a pass.
- **Severity:** low; no current fresh-tab failure was observed.
- **Fix brief:** retain hashed assets and keep the post-deploy smoke check; consider a future HTML cache-policy improvement only if external testers report repeated propagation confusion.

## Automated hosted evidence

| check | result | evidence |
| --- | --- | --- |
| Local hosted verifier | PASS | `npm run verify:hosted` at 2026-08-15T04:36:42Z: HTTP 200, `en-US`, title, current JS/CSS assets 200, current strings present, retired strings absent. |
| PR verification | PASS | PR [#22](https://github.com/asdc163/pm-signal-lab/pull/22), verify run [31864689767](https://github.com/asdc163/pm-signal-lab/actions/runs/31864689767). |
| Main CI | PASS | [Run 31864723507](https://github.com/asdc163/pm-signal-lab/actions/runs/31864723507), head `a1b7c17…`. |
| Pages deployment | PASS | [Run 31864723506](https://github.com/asdc163/pm-signal-lab/actions/runs/31864723506), head `a1b7c17…`. |
| Post-deploy hosted smoke | PASS | [Run 31864748699](https://github.com/asdc163/pm-signal-lab/actions/runs/31864748699), event `workflow_run`, job `Check canonical hosted demo`. |
| Hosted HTTP | PASS | Fresh canonical response returned HTTP/2 `200`, `en-US`, current hashed assets, and `cache-control: max-age=600`. |
| Current-main Chrome smoke | PASS | Fresh Codex Chrome Extension desktop and mobile tabs passed empty, loaded, margin-note, keyboard transition, sticky-action, and no-overflow checks. |

The Pages log still reports a non-blocking Node 20 deprecation annotation from GitHub Actions runner behavior. CI, deployment, and the hosted smoke job all completed successfully.

## Pilot and growth boundary

The existing public pilot issue [#4](https://github.com/asdc163/pm-signal-lab/issues/4) was updated to point to the formal hosted demo and current session boundary. Its current comment count remains `0`; it is a recruitment queue, not a completed tester count.

The latest public repository snapshot remains `1` star and `0` forks. The weekly growth pulse remains read-only. No traffic, non-owner session, adoption, retention, referral, or star-quality evidence is claimed.

## Not covered

- Five real non-owner PM sessions and at least three concrete field notes.
- Unguided five-second comprehension by an external tester.
- Native VoiceOver, NVDA, TalkBack, or a formal screen-reader sign-off.
- Real-device behavior, virtual keyboard behavior, and assistive-technology announcements.
- External model/provider behavior; the demo remains deterministic and provider-free.
- Adoption, retention, conversion, traffic, referrals, qualified stars, and any 10,000-star outcome.
- Automatic external distribution, posting, replying, DM, starring, following, or issue submission.

## Next evidence gate

Keep the product in `Iterate / recruit`. The next useful work is not another cosmetic release: recruit five unguided international testers through the English session kit, triage the first three concrete reports, ship one evidence-backed fix, and re-run the current-main hosted path plus the automated smoke. Until those reports exist, the product remains a formal hosted demo with an open learning gate, not a validated market product.

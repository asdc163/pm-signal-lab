# Worked example: support-draft review

This is a fictional fixture. It is an example of the output shape, not a real
customer study or product result.

## Input

Decision on the desk: should the team treat copying a support draft as a sign
that the case was resolved?

`S1` — Product observation · fictional demo · five runs

> People copied the draft response, but no sent reply or resolved case was
> observed.

`S2` — Support note · fictional case 1842

> When the draft is wrong, the reviewer can regenerate it but cannot point it
> at the source that needs correcting.

## Output

## Decision on the desk

Do not treat copying the draft as resolution evidence. It is a handoff action
until a downstream outcome is observed.

## Source ledger

| ID | Source | Line or observation | Supports | Does not prove |
|---|---|---|---|---|
| S1 | Product observation · fictional demo · five runs | People copied the draft; no sent reply or resolved case was observed. | Copying is an observed handoff action. | It does not prove that the reply was sent, correct, or useful. |
| S2 | Support note · fictional case 1842 | A wrong draft cannot be pointed back to its correcting source. | The repair path is incomplete in this fixture. | It does not show how often this happens in real support work. |

## Candidate claims

| ID | Claim | Status | Source IDs | Limitation |
|---|---|---|---|---|
| C1 | The worksheet exposes a copy action but no observed resolution outcome. | source-backed | S1 | The observation is fictional and covers five demo runs. |
| C2 | A source-linked correction path may make draft review easier to recover from. | hypothesis | S2 | No comparative task result is supplied. |

## Smallest test

- Change: add a visible `Open source` action beside the draft before copy.
- Audience or context: five proposed unguided sessions with target PMs or
  support leads.
- Primary metric: proposed — the share of participants who can name which
  source they would correct before copying.
- Guardrail: proposed — the task still finishes within five minutes.
- Decision rule: proposed — keep the source action if at least four of five
  participants can name the correction source without a maintainer prompt;
  otherwise shorten the source path and rerun the task.

## Not covered

- No real-user session, sent reply, resolution event, or support-system data is
  supplied.
- The five-person threshold is proposed, not a completed result.
- The fixture does not establish whether a source-linked correction path would
  improve resolution rate.

## Review ask

Check whether `C1` stays within the supplied observation and whether the
proposed test measures source recovery rather than merely more clicks.

# PM Feedback to Fix — first run

This is a fictional fixture. Paste the note below into a compatible Agent
Skills client and ask it to use `pm-feedback-to-fix`.

## Fictional fixture

> Pilot note F-014, demo v0.1.0, Chrome desktop: I expected the AI evaluation
> plan to tell me what to review next after it flagged a high-impact support
> case. The plan explained that a human should review it, but I could not find
> the next action. I reread the page once and then stopped. I think it needs a
> clearer checklist. This happened in one fictional session. No customer data
> is included.

## Ask

Turn this note into the complete `pm-feedback-to-fix` output contract. Keep the
session ID and version visible, separate the observation from the requested
copy change, and do not call this adoption or a usability rate.

## Expected review shape

The output should contain the ordered sections from the skill, including a
safe verification path, an acceptance check marked `Not run`, a release gate,
a rollback trigger, a learning writeback, and a literal `## Not covered`.

The smallest next action should be reviewable without a model call, login,
network access, private customer data, or an external write.

## Not covered

This fictional fixture does not prove that the issue exists in a real client,
that the copy change improves comprehension, or that any user adopted the
skill. It does not contain a benchmark, production result, or accessibility
session.

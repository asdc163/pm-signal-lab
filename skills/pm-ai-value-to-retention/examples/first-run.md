# First run: decide whether an AI sprint brief has repeat value

This is a **fictional fixture**. It is a practice input for the workflow, not
a live product, model run, cohort analysis, notification test, user session, or
retention result.

## Request

Use `pm-ai-value-to-retention` for this PM job:

> A product team used an AI assistant once to turn five updated work items
> into a sprint brief. The team is considering a weekly reminder because only
> some people returned. Decide what retained value means for this product and
> whether a reminder should be tested. The assistant must not send a message,
> update a ticket, or change the sprint plan.

## Fictional product input

```yaml
product: Sprint Brief
target_user: product manager and engineering lead
job: prepare the next sprint discussion from changed work items
natural_cadence: weekly while a sprint is active
first_value: user verifies one brief item and records a discussion decision
current_signal: 12 workspaces completed first value; return behavior is Not run
proposed_intervention: optional in-product reminder before the next planning slot
external_actions: none
```

## Value to retention contract

| State | Meaning for this product | Control and fallback | Evidence |
| --- | --- | --- | --- |
| First value | A PM verifies one item, opens its source, and records a planning decision | Edit, mark unsupported, or use the work-item list manually | Fixture only |
| Repeat value | The same workspace completes a new sprint brief for a different active sprint and records one decision | Start from the current work-item list | Not run |
| Retained value | Repeat value occurs in the team's weekly planning window while the sprint is active | A one-off or paused sprint is excluded with a reason | Not run |
| No return / one-off | The sprint ended, the team paused, or the job did not recur | Do not call it churn; show the manual route | Not run |
| Reactivation | A workspace with a prior first value returns after missing one active planning window | User-initiated entry first; optional reminder requires consent and expiry | Not run |
| Suppressed | User muted reminders or the sprint context expired | No reminder; preserve mute and refresh context manually | Not run |

## Retention hypothesis

- **Start event:** `first_value_completed` when the PM verifies one brief item,
  opens a source locator, and records a planning decision.
- **Return event:** `repeat_value_completed` when the same workspace reviews a
  different active sprint and records one decision from current work items.
- **Window:** one active weekly planning window; exact timezone and event
  boundary are `Not provided`.
- **Unit:** workspace, because the planning decision belongs to a team; the
  user-level relationship is `Not provided`.
- **Candidate:** first value followed by repeat value in the next active
  planning window. A pageview, prompt sent, reminder shown, or reminder click
  is diagnostic only.
- **Disconfirming evidence:** teams return but do not make a decision, the
  current work items are stale, manual review is preferred, or repeat behavior
  disappears when a reminder is removed.

## Candidate event table

| Event | Boundary | Status |
| --- | --- | --- |
| `eligible_workspace` | Active sprint and approved work-item source are available | Not run |
| `first_value_completed` | Source opened and decision recorded | Not run |
| `repeat_value_completed` | New active sprint decision recorded | Not run |
| `reminder_shown` | User sees an optional in-product reminder | Not run |
| `reminder_clicked` | User opens the assistant from the reminder | Diagnostic only; not retained value |
| `manual_route` | User chooses the work-item list instead | Not run |
| `context_expired` | Prior sprint or source is no longer active | Not run |
| `mute_or_opt_out` | User suppresses the reminder route | Not run |

No raw work-item text, private URL, user name, or customer data belongs in the
event properties.

## Behavior states

| State | Message | Preserved work and control | Oracle |
| --- | --- | --- | --- |
| normal | “Review the current sprint items, then record one planning decision.” | Current selection and source locator | User completes repeat value; Not run |
| friction | “The sprint changed since your last brief. Review the current items before continuing.” | Prior note is labelled historical; refresh or manual route | No stale context is silently reused; Not run |
| no return | “This sprint may be paused or complete. Open a current sprint when you need one.” | No reminder is forced | One-off/paused state is not counted as churn; Not run |
| reminder eligible | “Your next planning window is coming up. Review the current sprint?” | Dismiss, mute, open, or manual route | Relevance and stop controls are visible; Not run |
| reminder suppressed | “Reminders are muted. Open Sprint Brief when you choose.” | Mute persists; user-initiated entry remains | No route is shown or sent; Not run |
| unsupported context | “The current work-item source is unavailable. Use the work-item list manually.” | Sprint name and local note preserved | Safe manual completion remains; Not run |
| timeout | “The brief result is unknown. Check the receipt before trying again.” | Receipt and current sprint | No duplicate decision; Not run |

## Smallest test

Run a bounded qualitative session with fictional work items and two planning
windows. Compare a user-initiated entry with an in-product reminder mock. Ask
whether the PM can name the repeat job, spot changed context, make a decision,
and mute the reminder. Do not send a notification, call a model, connect a
workspace, or report a retention rate.

## Decision

`Pilot` the repeat-value contract and manual entry path. `Need evidence` for
retention, reminder effect, quality, trust, causality, and adoption. The first
next test is not “send more reminders”; it is to verify that a second active
sprint creates a real planning decision and that stale-context handling is
understood.

## Not covered

- live model/provider/host, work-item connector, or notification channel;
- real cohort size, event delivery, timezone, identity resolution, or
  retention calculation;
- source freshness, brief accuracy, user comprehension, mobile or assistive
  technology behavior, cost, latency, or production safety;
- message sending, ticket mutation, sprint-plan changes, campaign lift,
  product-market fit, adoption, traffic, or GitHub star impact.

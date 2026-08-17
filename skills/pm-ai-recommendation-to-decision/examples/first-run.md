# First run: support escalation recommendation

This is a **fictional fixture** for learning the workflow. It is not a live
support case, model result, customer record, or product-quality measurement.

## Input

> We are considering an AI recommendation that tells a support lead whether a
> fictional enterprise ticket should be escalated to the reliability team.
> The lead must be able to inspect the evidence, edit the proposed reason,
> reject it, defer it, or choose a manual comparison. No ticket update or
> message should happen from the recommendation alone.

## Step 1 — Frame the decision

- **User/job:** A support lead decides whether to propose escalation for a
  fictional ticket.
- **Decision owner:** The support lead, not the model.
- **Consequence:** Medium until a separate team workflow sends a message or
  changes the ticket; that later step is out of this first run.
- **No side effect:** No ticket update or message is sent from the
  recommendation alone.
- **Success oracle:** The lead can make and explain a decision with the
  evidence available, or can safely defer/manual-route when evidence is weak.
- **Evidence status:** Fictional fixture; live correctness and outcome are
  Not run.

## Step 2 — Recommendation contract

| Field | Contract entry |
| --- | --- |
| Recommendation | “Consider escalation for reliability review.” |
| Alternatives | Keep with support; request one more diagnostic; compare manually |
| Supports | Fictional severity note, fictional incident link, fictional freshness |
| Missing | No verified customer impact, owner availability, or incident match |
| Freshness | Treat as fictional and stale until a real case confirms timestamps |
| Uncertainty | State the missing facts; do not invent a confidence score |
| Boundary | This proposal does not update the ticket or contact a team |

## Step 3 — User choices and visible states

| User choice | Next state | What it means | What it does not mean |
| --- | --- | --- | --- |
| Inspect evidence | Evidence open | The lead reviewed the basis | Not agreement |
| Accept as proposal | Proposal selected | The lead chooses this draft | Not execution or authorization |
| Edit reason | Edited proposal | The lead changes the wording | Not model approval |
| Reject | Rejected | The lead does not use this proposal | Not proof that the model is wrong |
| Defer | Deferred | The lead will revisit later | Not acceptance |
| Compare manually | Manual route | The lead checks another path | Not a failed user action |
| Ask for missing fact | Evidence request | The product names one needed fact | Not permission to collect sensitive data |
| Abstain | No recommendation | The product cannot support a safe suggestion | Not a fabricated fallback |

## Step 4 — Evaluation slices

- **Positive:** a clear fictional severity and recent incident match allow the
  recommendation to be shown with evidence and alternatives.
- **Negative:** a routine copy-edit request must not receive an escalation
  recommendation because it contains the word “ticket.”
- **Ambiguous:** “What should we do with this?” produces one clarification or
  a manual route, not a forced escalation.
- **Missing context:** no severity or freshness produces abstention or the
  smallest evidence request.
- **Conflicting evidence:** severity says high but the incident link is stale;
  the conflict is visible and manual comparison remains available.
- **Overconfident wording:** “This will cause an outage” is rejected unless a
  named source supports that claim; the fixture must state the limit instead.
- **High consequence:** a request to send a customer message hands off to a
  separate approval and permission contract.
- **Benign lookalike:** a ticket about billing terminology must not be treated
  as a reliability incident.

## Step 5 — Privacy-safe receipt

Record only a fictional `case_id`, evaluation `slice`, recommendation state,
evidence state, freshness state, choice, whether the proposal was edited,
manual route, approval state, execution state, outcome state, recovery state,
timestamp, and evidence label. Do not record customer text, private URLs,
credentials, or inferred sensitive attributes.

## Release decision

`Need evidence` for live decision quality. The fictional contract is complete,
but no real user, model, support system, downstream action, or outcome was
observed.

## Not covered

- model ranking or confidence calibration;
- citation retrieval or evidence implementation;
- ticket mutation, messaging, payment, permission, or other external action;
- approval, authentication, or authorization implementation;
- live support data, user research, production safety, adoption, or GitHub
  star growth.

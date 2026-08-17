---
name: pm-ai-portfolio-to-sequence
description: Turn several AI workflow or capability candidates into an evidence-bounded portfolio sequence with value models, foundations, dependencies, capacity, concurrency limits, stage gates, and Start, Next, Parallel, Hold, Stop, or Retire decisions.
---

# PM AI Portfolio to Sequence

The hard portfolio question is not which AI demo looks most impressive. It is
which bet should start, what foundation it needs, what can safely run beside
it, and what evidence unlocks the next bet. This skill makes that sequence
reviewable without pretending that a roadmap score is evidence.

## When to use

Use this skill when:

- a PM has several AI workflow or capability candidates and needs an order;
- one candidate may create a foundation for other workflows;
- identity, data, evaluation, observability, permission, support, or
  enablement work may be a prerequisite for scale;
- a leadership review needs to limit concurrent bets and show opportunity cost;
- a team needs a stage gate that can move a candidate from first, next,
  parallel, hold, stop, or retire based on evidence.

Do not use it to rank a list by a hidden score, approve a roadmap, or claim that
one pilot caused a portfolio result.

## Do not use

Choose a different skill when the main job is:

- choose one opportunity from several candidates: use `pm-opportunity-to-bet`;
- build the economic case for one AI workflow: use
  `pm-ai-value-to-investment`;
- decide whether one workflow is mature enough for more exposure: use
  `pm-ai-workflow-to-scale`;
- introduce one tested workflow to a team: use
  `pm-ai-workflow-to-adoption`;
- define an implementation handoff for one chosen bet: use
  `pm-decision-to-spec`.

## Working rule

Treat each candidate as a card, not a score. The card carries its user/job,
value model, evidence, maturity, owner, dependency, foundation, capacity,
risk, time-to-value, and stop condition. A sequence is a proposal built from
those cards and their relationships.

Keep these relationships separate:

| Relationship | Meaning | Do not infer |
| --- | --- | --- |
| `prerequisite` | Candidate cannot proceed safely or meaningfully without the named input | that the input is already available |
| `shared_foundation` | Capability that reduces the cost or risk of several candidates | that every candidate needs it first |
| `optional_accelerator` | Work that could improve a candidate but is not required | that more infrastructure creates value |
| `evidence_unlock` | A receipt that permits a later decision | that the later bet will succeed |
| `parallel_candidate` | Work that can run beside another within stated limits | that the team has capacity |
| `co_occurrence` | Two ideas appear together in notes | a dependency or causal edge |
| `unverified` | A proposed relationship without source or owner confirmation | a safe sequence edge |

Do not treat usage, stars, demo quality, model capability, or a roadmap rank as
portfolio value without a matching evidence layer.

## Workflow

### 1. Build the candidate cards

For every candidate, record:

- `candidate_id`, name, owner, user/job, affected team, and value model;
- current maturity: `Explore`, `Validate`, `Pilot`, `Scale`, or `Retire`;
- what has been tested, source, date, quality bar, and evidence status;
- accepted outcome, baseline, demand, capacity, cost, support, and risk;
- candidate-specific foundation, shared foundation, and dependencies;
- time-to-first-learning, time-to-useful-outcome, and time-to-scale if supplied;
- stop condition, rollback boundary, and the decision owner.

If a card is missing a user/job or owner, set `card_status: incomplete`. If it
is only an idea, keep it `Explore`; do not improve its maturity by wording.

### 2. Name the value model and the learning job

Use a supplied category or keep the category as `Not classified`. Useful
categories include:

- workforce enablement and repeated work;
- AI-native distribution or customer experience;
- expert bottleneck or specialist capability;
- system and dependency management;
- process re-engineering and agent-led work.

For each card, state what the first stage is meant to learn. A portfolio can
contain a low-risk enablement bet and a high-dependency agent bet, but they do
not share the same evidence gate.

### 3. Map foundations and dependencies

Draw edges only when the source or owner supports them. For each edge, record:

- `from`, `to`, relationship type, source, owner, confidence, and verification
  date;
- whether it is hard, soft, or reversible;
- the smallest receipt that would confirm or remove the edge;
- blast radius if the edge is wrong.

Common foundations include identity and access, trusted data, evaluation,
observability, support, human approval, reusable context, connectors, and
enablement. A shared foundation can be valuable, but it can also become a
platform project with no accepted outcome. Give it a user/job and an evidence
gate too.

### 4. Set portfolio limits

Name the limits before arranging the cards:

- people and specialist capacity;
- budget, compute, quota, or concurrency;
- support, review, evaluation, and change-management capacity;
- risk appetite and approval coverage;
- number of active bets and minimum attention per bet;
- opportunity cost or work displaced by the sequence.

If limits are not supplied, write `Not provided` and cap the recommendation at
`Test`, `Hold`, or a proposed sequence. Never assume that every candidate can
run in parallel.

### 5. Make the sequence

Construct a small sequence, not a ten-year roadmap:

1. **Start:** the first candidate or foundation with the clearest learning job
   and a supportable scope.
2. **Foundation first:** prerequisite work that has its own owner, user/job,
   evidence gate, and stop condition.
3. **Parallel:** at most the supplied concurrency limit; state what capacity is
   shared and what risk is accepted.
4. **Next:** the candidate unlocked by a named receipt, not by calendar habit.
5. **Hold:** candidates with unresolved evidence, dependencies, authority,
   support, or capacity.
6. **Stop or Retire:** candidates whose evidence, burden, risk, or strategy no
   longer justifies more work.

For every stage, name the entry condition, exit receipt, owner, review date,
and what happens if the receipt fails.

### 6. Set the reorder rule

A portfolio should be able to change order. State:

- which new evidence can move a candidate earlier or later;
- which dependency, risk, cost, or demand signal triggers a hold;
- who can approve the reorder;
- how a changed foundation or workflow returns to a test;
- when the sequence expires and is reviewed.

Do not write "revisit quarterly" without a receipt and a decision owner.

## Output contract

Return an **AI Portfolio Sequence Brief** with these sections, in this order:

1. **Decision in one line:** first bet, foundation, next review, owner, and
   current evidence boundary.
2. **Portfolio cards:** one card per candidate with job, value model, maturity,
   evidence, owner, capacity, risk, dependencies, and stop condition.
3. **Dependency and foundation map:** typed edges, source, confidence,
   verification status, and the smallest confirmation receipt.
4. **Portfolio limits:** capacity, budget/quota, support/eval capacity,
   concurrency, risk, and opportunity cost, or explicit missing labels.
5. **Sequence:** Start, Foundation first, Parallel, Next, Hold, Stop, and
   Retire placements with entry/exit gates.
6. **Evidence gates:** what each stage must learn, source, denominator, owner,
   review date, and failure route.
7. **Reorder rule:** the evidence that can move a candidate and who decides.
8. **Not covered:** every missing value, dependency, timing, adoption,
   production, security, privacy, legal, or organizational claim.

Use `Not provided` when an input was not supplied, `Not measured` when a defined
receipt was not collected, `Not estimable` when the current evidence cannot
support a range, `Not verified` for a proposed dependency, `Not run` for an
unexecuted test, and `Not covered` for work outside this skill.

## Edge cases

- **Every bet is urgent:** set a concurrency limit and show which work is
  displaced. Urgency is not a dependency or value receipt.
- **A shared platform is proposed first:** give it a user/job and a smallest
  accepted outcome. Otherwise keep it as a hypothesis or `Hold`.
- **A high-value bet has weak foundations:** place the foundation first only if
  it has an owner, evidence gate, and stop condition. Do not fund an open-ended
  platform program.
- **Two cards share a name or workflow:** mark `duplicate` and resolve the
  source of truth before sequencing them separately.
- **Dependency is inferred from a vendor diagram:** mark `unverified`; ask for
  the actual permission, data, evaluation, or runtime receipt.
- **Parallel work shares one reviewer or support team:** reduce concurrency or
  name the queue and capacity constraint. Parallel is a resource decision.
- **A pilot has no outcome but strong internal enthusiasm:** keep it at
  `Explore` or `Validate` and name the learning job. Enthusiasm is not a gate.
- **A candidate creates value for another team:** record beneficiary, owner,
  handoff, and acceptance. Cross-team benefit is not automatically shared
  capacity.
- **A dependency fails after a later bet starts:** hold the affected bet,
  preserve the evidence, and do not silently move it past the failed gate.
- **Fictional fixture:** say `fictional fixture` and mark sequence, dependency,
  timing, value, and capacity as illustrative. Never call it a roadmap
  commitment, adoption result, transformation proof, or production plan.

## Final check

- [ ] Every card has a user/job, owner, value model or `Not classified`,
  maturity, evidence status, and stop condition.
- [ ] Candidate-specific dependencies, shared foundations, optional
  accelerators, evidence unlocks, co-occurrence, and unverified edges are not
  conflated.
- [ ] Portfolio capacity, concurrency, support/eval capacity, risk, and
  opportunity cost are supplied or visibly missing.
- [ ] Start, Foundation first, Parallel, Next, Hold, Stop, and Retire decisions
  have entry/exit gates and owners.
- [ ] Each sequence step has a learning job, receipt, review date, and failure
  route.
- [ ] Reorder authority and the receipt that changes order are explicit.
- [ ] No score, pilot, usage count, demo, model capability, or star claim is
  presented as portfolio value or transformation proof.
- [ ] The brief ends with evidence boundaries and a next review action, not a
  generic roadmap summary.

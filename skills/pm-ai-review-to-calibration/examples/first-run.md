# First run: calibrate a support-draft review

This is a **fictional fixture**. Use it to practice the contract; do not infer
human agreement, judge quality, or a release decision from these rows.

## Request

> We have an AI support assistant that drafts annual-plan cancellation replies.
> Two support reviewers often disagree about whether a draft is supported by
> policy. A model-based judge gives a pass to some drafts that humans reject.
> Define a calibration protocol before we use review scores in a release gate.

## Work the packet

Use `$pm-ai-review-to-calibration` and return:

1. one user/job, review target, risk class, owner, and answer boundary;
2. a frozen artifact/version ledger for input, output, context, policy, rubric,
   reviewer instructions, and judge configuration;
3. atomic criteria with observable pass/fail/partial/abstain anchors and hard
   gates for unsupported or cross-tenant claims;
4. calibration, holdout, regression, negative, high-risk, and locale slices;
5. an independent blind human-label protocol with confidence, abstention,
   observation, evidence locator, and privacy-safe storage;
6. agreement calculations with declared denominator and per-criterion slices;
7. judge-versus-human comparison, critical false-pass review, adjudication, and
   recalibration triggers;
8. a release decision, human fallback, rollback route, and explicit
   `## Not covered` section.

Keep live reviewers, providers, labels, scores, quality, adoption, and
production claims `Not run` unless the user supplies direct evidence. Do not
show raw tickets, account IDs, secrets, or hidden reasoning.

## Not covered

- No real review sample, human participant, judge model, provider, or
  annotation system is available in this fixture.
- No agreement statistic, calibration threshold, judge quality, production
  safety, cost, latency, adoption, or traffic result has been observed.
- No provider or vendor choice is implied.


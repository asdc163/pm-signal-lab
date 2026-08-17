# First run: weekly evidence digest task

This is a **fictional fixture** for learning the workflow. It is not a live
research task, model run, source collection, customer record, or reliability
measurement.

## Input

> We are considering a fictional AI task that prepares a weekly evidence
> digest from an approved set of product notes. It may take several minutes,
> ask for one missing scope choice, pause while the PM is away, or fail when a
> source is unavailable. The PM must be able to resume, cancel, retry, or use a
> manual checklist. No external message or document update should happen from
> task progress alone.

## Step 1 — Task frame

- **User/job:** A PM wants a reviewable digest of fictional notes for one
  product area.
- **Task identity:** `fictional-digest-001`; retries reconcile with this ID
  before creating another task.
- **Owner/scope:** The requesting PM and the approved fictional note set;
  no private or unapproved source is added.
- **Consequence:** No external side effect from the digest task. Publishing or
  sending the digest would require a separate approval flow.
- **Retention:** Fictional task state expires after the stated review window;
  expiry is visible and does not imply completion.
- **Success oracle:** A terminal result contains a bounded digest plus source
  status, or the task ends with a clear failure/manual route.
- **Evidence status:** Fictional fixture; live worker reliability and user
  comprehension are Not run.

## Step 2 — Lifecycle contract

| State | User-visible copy | State oracle |
| --- | --- | --- |
| Created | “Task created.” | stable ID and scope recorded |
| Queued | “Waiting to start.” | accepted but no work receipt yet |
| Working | “Preparing the digest.” | fictional unit or last update exists |
| Progress unknown | “Progress is unavailable. Last update: not run.” | no supported unit |
| Input required | “Choose one product area to continue.” | named input request; decline available |
| Paused | “Paused. Resume this task when ready.” | same task ID, no active work receipt |
| Cancelling | “Cancellation requested; waiting for confirmation.” | cancel receipt not terminal yet |
| Cancelled | “Task cancelled. No digest was published.” | terminal cancellation receipt |
| Failed | “The digest could not be completed. Use the manual checklist.” | error class and recovery route |
| Expired | “Task state expired; no result is available.” | retention/TTL policy applied |
| Completed | “Digest ready for review. No message was sent.” | terminal result and source status |

`Working` must not display a fabricated percentage or countdown. If the task
cannot report meaningful units, it says progress is unavailable and shows the
last observed update.

## Step 3 — Controls and recovery

- **Provide input:** the PM chooses one fictional area; the task resumes with
  the same ID. Declining returns to a manual checklist.
- **Pause:** the PM pauses `fictional-digest-001`; the task remains resumable,
  not completed.
- **Resume:** the product reconciles ID, scope, definition version, and last
  update before continuing. A mismatch is held for review.
- **Cancel:** cancellation is requested, then becomes terminal only after the
  fictional cancellation receipt. No digest is shown as completed.
- **Retry:** first reconcile the prior task and error class. A retry may create
  a linked attempt ID, but must not duplicate publishing or send a message.
- **Failure:** the user sees the source/unavailability class and a manual
  checklist. No partial digest is silently presented as final.
- **Expiry:** the product explains that state expired and does not invent a
  missing result.

## Step 4 — Evaluation slices

- **Clear short task:** created → queued → working → completed with stable ID.
- **Long task:** known fictional units or an honest unknown-progress state;
  never fake motion.
- **Input required:** one minimal scope question with clear decline/cancel.
- **Pause/resume:** the same task ID and context resume after a wait.
- **Cancel:** requested, cancelling, and cancelled remain distinct.
- **Duplicate retry:** a repeated request reconciles the original task instead
  of creating duplicate work.
- **Stale reconnect:** the last update is visible and the source of truth is
  checked before showing current progress.
- **Worker failure:** failure is actionable and routes to retry/manual; it is
  not labelled completed.
- **Expiry:** an expired state is terminal for this fixture and has no invented
  result.
- **Version mismatch:** the task is migrated or held; it does not run silently
  under incompatible rules.
- **Benign lookalike:** a synchronous “research question” that needs no async
  task remains a normal answer route.

## Step 5 — Privacy-safe receipt

Record only a fictional `task_id`, `case_id`, `definition_version`, bounded
scope hash, state, state reason, observed/last-updated time, TTL state,
progress state, user control, terminal state, result state, outcome state,
recovery state, error class, host capability, and evidence label. Do not record
raw notes, private URLs, credentials, or unnecessary tool arguments.

## Release decision

`Need evidence` for live task reliability. The fictional contract is complete,
but no real worker, host, model, user, cancellation, resume, or downstream
outcome was observed.

## Not covered

- queue/worker implementation, progress streaming, or cancellation runtime;
- model quality, retrieval, source authority, or result uncertainty;
- external publishing, messaging, payment, permission, or other side effects;
- approval, authentication, authorization, or task orchestration;
- live user research, production safety, adoption, retention, or GitHub stars.

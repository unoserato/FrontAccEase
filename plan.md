# POUR Learning Module Implementation Plan

## Scope and boundaries

Build a dedicated, database-connected POUR curriculum with separate learner, instructor monitoring, and admin management experiences. Existing instructor-created modules, assessments, dashboards, and their static content remain independent. Reuse shared authentication, UI primitives, Tiptap JSON, and assessment patterns only where they fit the new requirements. Preserve existing unrelated work.

The backend uses FastAPI and Supabase with a service-role client, so every new endpoint must enforce authorization independently of frontend route guards. Use the updated backend `app/db/schema.sql`, confirmed by the user, as the current schema reference. Verify RLS and grants separately when testing database integration. Never assume a general user ID is a learner ID without resolving the learner profile.

## Batch 1 — Architecture and data audit

- [x] Trace learner, instructor, and admin authentication, role checks, route guards, navigation, and existing API conventions.
- [x] Inspect the user-confirmed `app/db/schema.sql`, migrations, learner profiles, classroom enrollment, and instructor ownership. RLS and grants require integration verification.
- [x] Review the existing Tiptap editor/reader and SurveyJS assessment formats for safe reuse, including answer-key exposure.
- [x] Define curriculum versioning, publishing, activity ordering, retry and passing rules, progress calculation, and treatment of changes to published content.
- [x] Map the new routes, database tables, APIs, and shared components without modifying the instructor module.
- [ ] Confirm a repeatable local or isolated integration-test environment and migration procedure.

**Done when:** The schema and authorization mapping are documented, and the remaining batches have a concrete implementation contract.

## Batch 2 — Database and progress foundation

- [ ] Add migrations for principles, lessons and activities, assessment definitions and versions, learner lesson completion, and immutable assessment attempts as needed after the audit.
- [ ] Store stable content identities, draft/published state, ordering, WCAG references, Tiptap content, timestamps, and historical assessment snapshots. Preserve records when content changes or is retired.
- [ ] Add constraints and indexes for valid associations, idempotent completion, attempt identity, and concurrent submissions; apply appropriate RLS and restrict direct access to answer keys.
- [ ] Seed the four principle records and prepare a safe migration path for curriculum content; do not fabricate progress or scores.
- [ ] Integrate and extend the existing `app/services/pour_progress.py` calculation so all views use the same persisted required activities and completion records. Define how unpublished or revised content affects existing learners.
- [ ] Test migrations, rollback or recovery procedures, duplicate completion, empty curricula, historical records, and consistent weighted progress.

**Done when:** The database can persist curriculum and learner history safely, and progress rules are verified against real records.

## Batch 3 — Authenticated curriculum and assessment APIs

- [ ] Add POUR operations to the existing `/learner`, `/instructor`, and `/admin` routers, with typed validation and explicit learner, instructor, and admin role checks. Do not introduce a separate `/pour` router.
- [ ] Expose only published learner content; strip answer keys and other confidential grading data from learner responses.
- [ ] Enforce the ordered pre-assessment, lessons, mini-assessments, and post-assessment flow on the server, including prerequisites and retry limits.
- [ ] Grade submitted answers on the server, save immutable attempts and grading snapshots atomically, and return feedback only after submission.
- [ ] Persist lesson and activity completion immediately; make retries and repeated requests safe and prevent unauthorized score updates.
- [ ] Expose learner progress, prior results, and next required activity using the shared progress calculation.
- [ ] Test role boundaries, learner identity, unpublished content, sequence bypass, answer-key secrecy, concurrency, scoring, retries, and versioned history.

**Done when:** A learner can complete the full flow through authenticated APIs and resume from persisted data.

## Batch 4 — Admin curriculum management

- [ ] Add a dedicated section to the existing admin interface for the four principles, with search, ordering, draft/published status, and validation feedback.
- [ ] Implement principle editing and lesson/activity CRUD, ordering, WCAG references, and student-style preview using the existing Tiptap format and editor where practical.
- [ ] Implement pre-, mini-, and post-assessment authoring: questions, choices, answer keys, explanations, scoring, passing thresholds, and retry policies.
- [ ] Validate required fields, associations, answer keys, and complete learning paths before publication.
- [ ] Publish immutable assessment versions or snapshots; retire content without destroying historical attempts or silently changing recorded scores.
- [ ] Verify that only admins can manage and publish content and that drafts never appear to learners.

**Done when:** An admin can manage and publish a complete POUR curriculum through the UI without database or source edits.

## Batch 5 — Learner experience

- [ ] Add dedicated learner navigation, dashboard (use the exixting module tab), and principle routes for the POUR module, separate from instructor-created modules.
- [ ] Show overall and principle progress, activity statuses, recent results, pre/post improvement, and a continue action driven by backend data.
- [ ] Build ordered principle pages and responsive lesson readers with Tiptap content, accessible examples, interactive scenarios, and lesson completion.
- [ ] Build accessible assessment flows with no answers revealed before submission, post-submission explanations, retry feedback, and review of previous results.
- [ ] Provide clear loading, empty, error, success, locked, and completion states; support keyboard navigation, visible focus, semantic controls, and announced status updates.
- [ ] Verify refresh, logout/login, navigation back to completed lessons, and mobile/tablet/desktop layouts.

**Done when:** Learners can complete and resume all four published learning paths with persisted progress.

## Batch 6 — Instructor progress monitoring

- [ ] Add a dedicated monitoring section within the existing instructor interface, leaving its dashboard and module controls intact.
- [ ] Restrict reports on the backend to learners enrolled in classrooms assigned to the authenticated instructor; deduplicate learners enrolled in multiple eligible classrooms.
- [ ] Show enrollment totals, status distribution, completion rates, principle progress, assessment summaries, and indicators for learners who may need support.
- [ ] Provide searchable or filterable individual reports with lesson and assessment status, scores, attempts, improvement, and last activity where recorded.
- [ ] Use the same progress service as the learner interface; keep reports read-only.
- [ ] Test cross-instructor access denial, enrollment changes, empty classrooms, and report agreement with persisted learner records.

**Done when:** Instructors can inspect accurate, authorized class and learner progress without accessing learner sessions.

## Batch 7 — Integration and release verification

- [ ] Exercise complete admin publishing, learner pre/lesson/mini/post, retry, refresh, and instructor reporting workflows for each principle.
- [ ] Test content updates and retirement after attempts, concurrent or repeated submissions, and access across roles and classrooms.
- [ ] Check accessibility with keyboard and screen-reader-oriented review, responsive layouts, contrast, and meaningful status messages.
- [ ] Run backend tests, migration checks, frontend build/type checks, and `npm run lint`; fix all lint errors.
- [ ] Regression-test existing authentication, instructor modules and dashboards, and unrelated features.
- [ ] Document migration and deployment order, configuration, curriculum publishing, test results, and any remaining limitations.

**Done when:** All acceptance criteria are verified against persisted backend data and existing workflows remain functional.

### Batch 1 audit status

The code and schema audit and proposed contracts are documented in [batch-1-audit.md](batch-1-audit.md). The user confirmed that the updated `app/db/schema.sql` is the schema in use. RLS and grants are not described there; migration and authorization integration tests still require an isolated database environment.



### Batch 2 implementation status

The backend migration `20261018_create_pour_foundation.sql` defines separate POUR curriculum, revision, activity, assessment, assignment, completion, and attempt tables; seeds the four principle identities; enables RLS; and denies direct anon/authenticated table access. Published content and recorded history are guarded against edits. The progress helper now supports all four principle paths and treats missing or incomplete paths as unavailable. It is not yet connected to API responses; Batch 3 must enforce and transactionally implement publishing, sequencing, grading, retry limits, and idempotent submissions. The migration has not been applied or exercised against PostgreSQL/Supabase in this environment, so database constraints, RLS, grants, and concurrent behavior remain unverified. Do not mark Batch 2 complete until integration tests and migration recovery checks pass.

### Batch 3 implementation status

Added a role-checked learner progress read through the existing learner router. It resolves the learner from the authenticated profile and calculates progress from assignments, revisions, ordered activities, and completion records. Assigned retired revisions remain visible to their learner; unpublished drafts and assessment keys are not returned. Mocked service tests cover revision selection, learner isolation, and missing curriculum. Assessment submission, grading, activity completion, retry enforcement, learner content/results endpoints, and database integration testing remain outstanding; Batch 3 is not complete.

### Batch 3 follow-up

Added learner path assignment, activity reads, lesson completion, assessment submissions, and result history under the existing learner router. `20261018_pour_transactions.sql` defines serialized lesson completion and assessment scoring/retry operations; it must be applied after the foundation migration. Question reads use a field allowlist. The transaction migration and endpoint/database integration have not been verified against Supabase. Interactive activity completion, authoring/publish validation, and comprehensive database concurrency/authorization tests remain outstanding. Batch 3 must remain open until these are implemented and verified. Assessment grading currently compares JSON values exactly; question authoring must account for that constraint before publishing.

The standalone `pour_validation.py` now checks draft path ordering, lesson associations, required assessments, question types, answer keys, explanations, and retry configuration. It is not yet wired to publication; publication must revalidate under a database lock. Interactive activities are intentionally rejected until their server-validated completion flow is implemented.

### Batch 3 latest implementation

The admin router now exposes a role-checked publication operation that validates a draft snapshot and publishes only if that snapshot still matches under the database lock. Interactive scenarios have learner-safe reads and a server-validated answer operation. A follow-up assessment migration validates submitted choices and handles checkbox answer order. Apply `20261019_pour_publish_interactive.sql` and `20261019_pour_answer_validation.sql` after the previously applied transaction migration. Their behavior, permissions, concurrency, and full four-principle workflow still require integration tests in Supabase; no admin authoring UI exists yet. Earlier status notes above describe the work at the time and are superseded by this entry.

### Batch 4 implementation status

Added an admin-only curriculum overview backed by revision metadata and linked from the existing admin navigation. It does not expose answer keys. Draft creation/editing, lesson and assessment CRUD, ordering, previews, and publishing controls remain to be implemented; this overview alone does not complete Batch 4.

### Batch 4 draft editing progress

Added an admin-only draft creation operation and principle editor for title, description, objectives, and Tiptap introduction. The new database functions are in `20261020_pour_admin_drafts.sql`; they have not been applied or integration-tested. A new draft starts empty and does not copy lessons or assessments from a published revision. Lesson/activity CRUD, assessment authoring, preview, ordering, cloning, and publishing controls remain outstanding; Batch 4 is not complete.

### Batch 4 lesson management progress

Added draft lesson creation, editing, and deletion through the admin interface and role-checked endpoints. Creation associates a stable lesson and ordered lesson activity; edits use optimistic concurrency. Deletion refuses lessons with linked activities. Apply `20261021_pour_admin_lessons.sql` after the earlier POUR migrations and verify it in Supabase. Lesson ordering, activity management, mini-assessments and other assessment authoring, previews, cloning, and publishing controls remain outstanding.

### Batch 4 publication controls

The admin draft page can now check saved content and invoke the role-checked publication endpoint, showing validation errors. The module creation label now explicitly says “Create module draft.” Assessment and interactive activity authoring, ordering, previews, published-to-draft cloning, and full integration testing remain outstanding; until assessment authoring exists, admins cannot assemble a complete publishable path solely through the interface.

### Batch 4 assessment authoring progress

Added draft pre-, mini-, and post-assessment creation, editing, and deletion, with multiple-choice questions, answer keys, explanations, passing thresholds, and retry limits. The editor preserves assessments using unsupported question types without changing them. `20261022_pour_admin_assessments.sql` must be applied after the preceding POUR migrations and verified against Supabase. Interactive activity authoring, reordering, previews, published-content cloning, broader question types, and end-to-end testing remain outstanding.

### Batch 4 interactive scenario authoring

The admin draft page now supports creating, editing, and deleting single-choice interactive scenarios linked to lessons. Scenario answers and feedback are validated by the existing learner flow, and draft updates use optimistic concurrency. Apply `20261023_pour_admin_scenarios.sql` after the earlier POUR migrations; the migration and full workflow have not yet been tested against Supabase. Reordering, published-content cloning, lesson previews, and end-to-end testing remain outstanding.

### Batch 4 published module editing

Added an admin operation that creates an editable draft by copying the published revision, including its lessons, activities, and assessment definitions. It retains existing learner assignments and assessment history on their original revisions. Apply `20261024_pour_clone_published_draft.sql` before using the new edit action. The migration requires Supabase integration verification; reordering and lesson previews also remain outstanding.

### Batch 5 learner experience progress

Added a learner POUR overview in the existing Modules page, principle activity lists, lesson reading and completion, SurveyJS assessments with persisted result review, and interactive scenario submissions. These use the existing authenticated learner endpoints and preserve the separate static core materials. Apply the existing POUR migrations and publish a complete path before testing. End-to-end Supabase verification, recent-score and improvement summaries, richer lesson rendering, and accessibility and responsive testing remain outstanding; Batch 5 is not complete. For separate published-module editing when a draft exists, apply `20261025_pour_edit_published_separately.sql` after the clone migration.

### Batch 5 dashboard follow-up

Added learner-scoped attempt summaries to the progress response and displayed recent scores, assessment completion, and pre/post differences. Continue Learning opens the next activity, optional activities follow the same prerequisite rules as the backend, and the reader supports more of the existing Tiptap content format. Mocked backend tests, the frontend build, and lint pass. Full learner workflow verification against Supabase, accessibility and responsive checks, and instructor monitoring remain outstanding; Batch 5 remains open.

### Batch 6 implementation progress

Added a read-only instructor POUR progress section and classroom-scoped overview and individual report endpoints. Reports reuse learner progress calculations, deduplicate classroom enrollments, and include assessment attempts and pre/post comparisons. Mocked tests cover enrollment deduplication, access denial, and empty classrooms. Live cross-instructor authorization, real progress agreement, accessibility and responsiveness still require testing with dedicated accounts; reports issue multiple database queries per learner and may require optimization for large classes. Batch 6 remains open pending integration verification.

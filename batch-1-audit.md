# Batch 1: POUR architecture and data audit

This audit describes the code and checked-in schema inspected on 2026-10-18. The existing instructor-created curriculum and quizzes are separate from the proposed POUR curriculum; none of their routes or data should be repurposed.

## Current application

- The React/Vite frontend composes `learnerRoute.tsx`, `instructorRoute.tsx`, and `schoolAdminRoute.tsx` under `rootRouter.tsx`. Their primary sections use `ProtectedLayout` and `/auth/me` to check roles. Some legacy detail routes sit outside that layout; all new POUR routes should remain inside a role-protected layout, while the API remains the security boundary.
- `src/const/navigation.ts` defines role-specific navigation. Axios in `src/services/axios.ts` uses `VITE_API_URL` and sends cookies; TanStack Query handles existing authentication and data fetching.
- The FastAPI backend registers separate `/learner`, `/instructor`, `/admin`, and `/helper` routers in `app/main.py`. `get_current_user` validates the `access_token` cookie with Supabase, resolves the first matching profile in `admin`, `instructor`, `learner` order, and caches the resulting role/profile. New endpoints must perform explicit role and ownership checks; cached identity is not proof of classroom membership.
- `app/db/supabase.py` creates a service-role client. Service-role access bypasses RLS, so backend checks and narrow, transactional database functions are mandatory. RLS and privileges also need to prevent direct clients from reading answers or modifying progress.

## Data and authorization mapping

The user confirmed that the updated `app/db/schema.sql` represents the schema in use. Its header says it is a reference rather than an executable migration. It records these relationships:

- `learner.id`, `instructor.id`, and `admin.id` reference `auth.users.id`. Registration creates the learner profile with the Auth ID; `get_current_user` returns that role-specific profile. Use the authenticated learner profile's `id` and a foreign key to `public.learner(id)`, not an arbitrary client-supplied or generic user ID.
- `classroom.id` is owned by `classroom.instructor_id`; `classroom_enrollment` links `classroom_id` to `learner_id`. Reports should derive a distinct learner set from enrollments in classrooms owned by the authenticated instructor and recheck that relationship for each detail request. The current schema snapshot does not show a unique enrollment constraint, so deduplication is required. Decide archived-classroom treatment explicitly in the reporting implementation and test it consistently.
- `instructor_module` and `admin_module` store JSON content. Existing `quiz`, `quiz_answer`, and `quiz_submission` are oriented toward the other quiz system; they do not describe POUR lessons, immutable assessment versions, or an independent attempt history. Use dedicated POUR structures, retaining the existing tables unchanged.
- Use this updated schema as the basis for foreign keys and queries. Existing migrations include conditional renames from `student` to `learner` and classroom/module name changes; the updated schema reflects the current names.
- No RLS policies or grants for these entities are defined in the checked-in `app/db` SQL. Their deployed state is **unknown**, not assumed absent.

The schema mapping uses the updated `schema.sql` as confirmed by the user. The file does not include RLS policies or grants, so their behavior must be tested separately. A DB-capable isolated environment is required to verify migration application, RLS, transactions, and end-to-end behavior. Do not use a production database as a test fixture.

## Existing editor and assessment reuse

- `SimpleEditor` in `src/components/tiptap-templates/simple/simple-editor.tsx` emits Tiptap JSON via `onChange` and accepts `initialContent`. Reuse it for authoring, but explicitly initialize empty documents: its current fallback loads sample content. Reuse its extension set in a read-only renderer and validate allowed JSON nodes, links, and image URLs.
- `QuizForm` uses SurveyJS and can accept JSON, but `quizHelper.ts` and mock quiz data include `correctAnswer` inside question JSON. `LearnerQuizView` uses mock local-storage attempts and client-side completion. The existing learner API returns stored `quiz_json` and updates a submission record; it does not provide the required immutable attempt history or safe answer-key boundary. Reuse SurveyJS rendering and question conventions only after producing an allowlisted learner payload without answers, feedback, or scoring metadata that discloses answers. Disable client-side score messages and submit answers to the server.
- Existing helper routes include unauthenticated quiz-answer and learner lookup endpoints. POUR data must not be placed behind or exposed through those endpoints. Their broader security implications should be reviewed separately; this audit does not change them.

## Proposed implementation contract

### Curriculum and versions

Use dedicated `pour_` entities: stable principle and lesson identities, immutable published curriculum revisions, ordered required activities, assessment definitions and immutable assessment versions, learner enrollment in a revision, lesson/activity completions, and assessment attempts. The migration should establish ownership with `public.learner(id)`, preserve historical versions with restrictive foreign keys, and include timestamps and appropriate uniqueness constraints. Use the confirmed schema for foreign keys; validate migrations and grants in an isolated database before deployment.

Admins edit drafts; publishing validates a complete principle path, lesson content, WCAG references, questions, choices, correct answers, explanations, scoring, retry rules, and associations. Publish atomically as an immutable revision. Learners are assigned a published revision per principle when starting it. Existing learners finish and review that revision; later changes apply to new starts, preventing silent resets and score changes. An explicit migration policy can be designed later if administrators need to move existing learners to a newer revision. Retire/archive rather than physically delete records referenced by progress or attempts. A principle with no valid published revision is unavailable and is not marked complete.

Each required principle path contains one pre-assessment, ordered lessons and their activities and mini-assessments, and one post-assessment. Published versions define passing thresholds and maximum attempts; pre/post completion requires submission, while mini-assessment completion requires its configured passing threshold. If retries are exhausted before passing, show a clear blocked state; do not silently grant further attempts. Lesson revisits and prior results remain available.

### Progress and grading

The backend computes lesson progress as completed required lessons / required lessons, principle progress as completed required activities / required activities for the learner's assigned revision, and overall progress as completed required activities / required activities across the four assigned or currently available paths. A principle requires its post-assessment to be complete; an empty or unpublished path cannot count as completed. The existing standalone `pour_progress.py` is an initial calculation only: it must be integrated and extended for revision assignment, unavailable paths, and four-principle completion before use.

Create an attempt with an idempotency key and immutable assessment-version reference; submit answers through a transaction that locks the relevant learner/assessment state, verifies prerequisites and retry limits, validates answer shapes, grades using the server-only key, and records score, answers, feedback snapshot, and timestamp. Repeated submission of the same attempt returns its existing result without consuming another attempt; concurrent new attempts cannot exceed the limit. Never accept a client-provided score. Only return feedback after submission, and only for the learner's own attempt.

### API and UI map

Add POUR operations to the existing role-specific FastAPI routers under `/learner`, `/instructor`, and `/admin`; do not add a `/pour` router. Keep these operations separate from legacy helper endpoints:

- Learner: published/assigned principle paths, progress and next activity, lesson content and completion, start/submit assessment attempt, and own result history.
- Instructor: classroom-scoped overview and learner detail, both filtered by the authenticated instructor's current ownership and enrollments.
- Admin: draft CRUD and ordering, preview, assessment authoring, validation, publication, and retirement. Every operation checks the admin role server-side.

Implement the operations in the existing `app/api/learner.py`, `app/api/instructor.py`, and `app/api/admin.py` routers, with domain logic in `app/services/`, typed request/response models in `app/schema/`, and SQL migrations in `app/db/migrations/`. Use transaction-capable SQL functions for operations that require atomic validation and writes; restrict their execution privileges appropriately.

Frontend changes belong in new POUR-specific learner, instructor, and admin pages/components; add entries in the existing role route and navigation files, plus dedicated API and TanStack Query modules. Reuse shared primitives, the Tiptap editor, and SurveyJS rendering only where their behavior meets the contract. Do not replace the instructor dashboard or existing instructor modules.

## Verification environment and remaining prerequisite

Backend's existing virtual environment has FastAPI, Supabase, and httpx, but not pytest; the requirements file does not list pytest. No local `psql`, Supabase CLI, or Docker command was found during this audit. Unit tests can be executed with Python's standard library or after adding an explicit test dependency. Full validation requires an isolated Supabase/Postgres instance with Auth, migration privileges, representative roles, and RLS enabled; create disposable admin, instructor, learner, and classroom fixtures there. Apply migrations in order, run authorization and concurrent-attempt tests, and discard the isolated fixture afterwards. Never print credentials or use production records for mutation tests.

**Remaining verification for later batches:** test migration application, RLS, grants, and transactional behavior in an isolated database. The updated `schema.sql` is the confirmed schema reference, so live schema discovery is not a prerequisite to designing Batch 2.



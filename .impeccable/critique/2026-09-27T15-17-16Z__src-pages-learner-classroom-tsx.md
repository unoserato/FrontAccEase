---
target: src/pages/learner/Classroom.tsx
total_score: 13.5
max_score: 36
na_heuristics: 9
p0_count: 1
p1_count: 1
timestamp: 2026-09-27T15-17-16Z
slug: src-pages-learner-classroom-tsx
---
# Impeccable Critique: `src/pages/learner/Classroom.tsx`

**Target**: `src/pages/learner/Classroom.tsx`  
**Method**: dual-agent (A: `6d552c14-13e8-4f9b-bf56-19b8b7eba67c` · B: `35fbdd8d-cba9-4c1f-96a0-0171b17438cc`)  
**Context**: FrontAccEase — Single-Classroom Learner Portal  

---

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|:-----:|-----------|
| 1 | Visibility of System Status | 1.5 | Item count badges exist, but zero visibility into student progress, completion checkmarks, or quiz grades. |
| 2 | Match System / Real World | 2.0 | Uses database terminology ("stored in this classroom") instead of natural pedagogical phrasing. |
| 3 | User Control and Freedom | 1.0 | "Leave Classroom" is instantly destructive with no confirmation or undo mechanism. |
| 4 | Consistency and Standards | 2.5 | Clean shadcn token usage, but `HeaderTemplate` applies CSS `capitalize` distorting course codes like `WCAG-101`. |
| 5 | Error Prevention | 1.0 | Critical failure: High-consequence destructive action sits unprotected without danger zone isolation. |
| 6 | Recognition Rather Than Recall | 2.0 | Learners must click into every module to check whether they have already read it. |
| 7 | Flexibility and Efficiency | 2.0 | Collapsible quiz accordion exists, but no POUR principle filtering, search, or sorting by due date. |
| 8 | Aesthetic and Minimalist Design | 2.5 | Clean palette, but `ModuleCardTemplate` enforces fixed `aspect-3/4` creating empty card space with low-value metadata. |
| 9 | Error Recovery | n/a | Non-applicable (no form submission or error recovery flows on this passive overview view). |
| 10 | Help and Documentation | 1.0 | No classroom overview, syllabus guide, or onboarding for accessibility beginners. |
| **Total** | | **13.5/36** | **Major Rework Required** |

---

## Design Specificity Verdict

- **LLM Assessment**: The interface currently functions as a minimal database table viewer rather than a tailored academic classroom. In a single-classroom model, the classroom is the student's central learning hub. However, there is no instructor presence (name, avatar, office hours, or announcements), no syllabus progression, and no completion telemetry (e.g., "4/12 modules completed", "POUR Mastery: 75%"). Empty states use raw backend phrasing (*"No modules stored in this classroom."*).
- **Deterministic Scan**: 0 automated rule violations (`detect.mjs` returned 0 findings across `Classroom.tsx`, `LearnerQuizCardTemplate.tsx`, `ModuleCardTemplate.tsx`, `PageTemplate.tsx`). Clean token architecture with zero faux glows, unlabelled buttons, or generic AI styling artifacts.

---

## Overall Impression

The page has solid structural foundations (clean semantic Tailwind tokens, responsive container layout, accessible collapsible quiz accordion), but suffers from significant UX omissions: an unconfirmed destructive leave action, lack of progress tracking, and absence of instructor/course identity.

---

## What's Working

1. **Accessible Accordion Controls**: `LearnerQuizCardTemplate` features a semantic `<button>` trigger with explicit `aria-expanded` attributes, keyboard focus rings, and clean chevron transitions.
2. **Semantic Design Token Architecture**: All UI elements strictly inherit shadcn/Tailwind design tokens (`bg-card`, `text-foreground`, `border-border`, `ring-ring`), guaranteeing dark/light mode compatibility.
3. **WCAG Taxonomy Integration**: POUR principle badges are attached to both module cards and quizzes.

---

## Priority Issues

- **[P0] Unprotected "Leave Classroom" Destructive Action**
  - *Why it matters*: In a single-enrolled classroom model, an accidental tap immediately disconnects the student, jeopardizing coursework access and quiz progress.
  - *Fix*: Wrap "Leave Classroom" in a confirmation `AlertDialog` detailing the consequences, and isolate it in a dedicated "Danger Zone" card.
  - *Suggested command*: `$impeccable harden`

- **[P1] Absence of Learner Progress & Curriculum Scaffolding**
  - *Why it matters*: Students experience decision fatigue because they cannot see which modules are completed, in-progress, or upcoming, nor do they see their instructor's details.
  - *Fix*: Introduce a Classroom Header Banner featuring course details, instructor avatar & name, a progress bar (completed vs total modules), and completion status pills on module cards.
  - *Suggested command*: `$impeccable layout`

- **[P2] Ineffective Aspect Ratio & Low-Value Metadata on Module Cards**
  - *Why it matters*: `ModuleCardTemplate` forces `aspect-3/4 min-h-48`, creating awkward vertical whitespace while showing instructor metadata ("Created at: [Date]") instead of student-centric details (estimated read time, level, completion state).
  - *Fix*: Remove fixed aspect ratios in favor of content-driven flex layouts, replace "Created at" with estimated reading time (e.g., "5 min read"), and color-code POUR badges.
  - *Suggested command*: `$impeccable polish`

- **[P3] Duplicate Interactive Links in Quiz Rows (WCAG 2.4.4)**
  - *Why it matters*: In `LearnerQuizCardTemplate`, both the quiz title link and the "Start" button link point to the same destination, forcing keyboard and screen reader users to double-tab through every quiz.
  - *Fix*: Render the quiz title as plain text within the row and keep the "Start" button as the single accessible link with `aria-label="Start quiz: [Quiz Name]"`.
  - *Suggested command*: `$impeccable a11y`

---

## Persona Red Flags

- **Alex (Power User / Senior IT Student)**: Cannot sort quizzes by due date or filter modules by completed status. Must open each module individually to check if it has been finished.
- **Jordan (First-Timer / Beginner Learner)**: Greeted only by a raw course code without instructor welcome message, syllabus roadmap, or guidance on where to start.
- **Sam (Screen Reader & Keyboard User)**: Encounters duplicate tab stops for every quiz item and hears CSS-capitalized course codes (`W-cag` instead of `WCAG`).
- **Casey (Distracted Mobile User)**: Faces very tall cards due to `aspect-3/4` and risks accidental taps on the unprotected red "Leave Classroom" button in the bottom thumb zone.

---

## Minor Observations & Questions to Consider

1. **Header Casing**: Remove `capitalize` in `HeaderTemplate.tsx` so acronyms and course codes (`WCAG-101`, `CS-401`) preserve their intended uppercase format.
2. **Empathetic Empty States**: Replace *"No modules stored in this classroom."* with *"No modules assigned yet. Your instructor will publish learning materials here soon."*
3. **POUR Grouping**: Should modules be grouped by POUR Principle (Perceivable, Operable, Understandable, Robust) or provide quick filter tabs?

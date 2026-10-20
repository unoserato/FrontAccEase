---
target: src/pages/learner/Dashboard.tsx
total_score: 17
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
timestamp: 2026-09-26T12-28-39Z
slug: src-pages-learner-dashboard-tsx
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1/4 | Static progress bars (hardcoded 80% across all POUR principles); no active lesson tracking |
| 2 | Match System / Real World | 2/4 | Correct WCAG POUR terminology, but principle progress is mislabeled under "Earned Badges" |
| 3 | User Control and Freedom | 2/4 | Accordion headers toggle sections, but lack user customization or quick filtering |
| 4 | Consistency and Standards | 1/4 | Duplicate "Earned Badges" headings; CSS `invert` breaks theme consistency; `EarnedBagdes` typo |
| 5 | Error Prevention | 2/4 | Non-semantic clickable header with nested `<Button>` causes accidental dual triggers |
| 6 | Recognition Rather Than Recall | 2/4 | `ContinueLearningCard` shows lesson title without explicit module/topic hierarchy |
| 7 | Flexibility and Efficiency | 2/4 | Fast CTA to resume learning, but lacks shortcuts for WCAG audits or quick principle jumps |
| 8 | Aesthetic and Minimalist Design | 2/4 | Global `capitalize` utility forces title-casing across all text, corrupting acronyms and grammar |
| 9 | Error Recovery | 2/4 | Empty quiz state is clean, but provides no recovery or guidance actions |
| 10 | Help and Documentation | 1/4 | No tooltips or context explaining WCAG POUR principles to beginner learners |
| **Total** | | **17/40** | **Poor (Major UX overhaul required)** |

#### Design Specificity Verdict

**LLM assessment**: The learner dashboard incorporates domain-specific WCAG POUR principles (*Perceivable*, *Operable*, *Understandable*, *Robust*) and accessibility badges. However, the composition relies heavily on a generic 2-column LMS layout with hardcoded `80%` progress stats, missing WCAG-specific telemetry (e.g. screen reader practice time, keyboard audit compliance, or A/AA/AAA level achievements).

**Deterministic scan**: Detector CLI scan returned 0 automated rule matches (`[]`), revealing a detector gap. Manual code audit identified 6 critical code anti-patterns, including a missing React `key` prop in `.map()`, `EarnedBagdes` export typos, CSS `invert` hacks, and nested interactive elements.

**Visual overlays**: N/A (single-file code critique).

#### Overall Impression
The dashboard has a clean 2:1 column structure and immediate "Continue Learning" action flow, but suffers from broken component semantics, duplicate headings, hardcoded mock data, and global text transformation bugs that undermine usability and accessibility.

#### What's Working
1. **Clear Layout Rhythm**: The 2:1 column grid effectively separates primary study tasks from secondary telemetry.
2. **Graceful Quiz Empty State**: Clean fallback illustration and text when a classroom has no assigned quizzes.
3. **Prominent Hero CTA**: The `ContinueLearningCard` provides a direct entry point for learners returning to their active lesson.

#### Priority Issues

- **[P0] Duplicated Header & Mislabeled Progress Widget**
  - **Why it matters**: Mislabels WCAG principle progress bars under "Earned Badges" right next to an actual badge card, creating severe visual confusion.
  - **Fix**: Rename the second sidebar card title to `"Principle Mastery"` or `"WCAG Progress"`, and correct the `EarnedBagdes` typo in `CoreModulesView.tsx`.
  - **Suggested command**: `$impeccable layout --target="src/pages/learner/Dashboard.tsx"`

- **[P1] Non-Accessible Collapsible Header in Quiz Template**
  - **Why it matters**: `LearnerQuizCardTemplate.tsx` uses `<div onClick=...>` around a nested `<Button>`, violating WCAG 2.2 keyboard navigation and screen reader semantics.
  - **Fix**: Refactor the accordion header into a semantic `<button>` with `aria-expanded={isOpen}` and remove nested interactive controls.
  - **Suggested command**: `$impeccable harden --target="src/components/common/LearnerQuizCardTemplate.tsx"`

- **[P1] Inverted Card Styling (`invert`) Breaking Design Tokens**
  - **Why it matters**: Applying CSS `invert` to `ContinueLearningCard` breaks light/dark theme tokens and risks WCAG contrast failures.
  - **Fix**: Replace `invert` with explicit theme classes like `bg-primary text-primary-foreground`.
  - **Suggested command**: `$impeccable colorize --target="src/pages/learner/Modules.tsx"`

- **[P2] Global `capitalize` Utility Corrupting Text**
  - **Why it matters**: `Dashboard.tsx` root section uses `className="p-responsive capitalize"`, forcing title-casing on all text (turning `WCAG` into `Wcag`, `ARIA` into `Aria`).
  - **Fix**: Remove `capitalize` from root container and scope text transformations specifically to card titles.
  - **Suggested command**: `$impeccable typeset --target="src/pages/learner/Dashboard.tsx"`

- **[P3] Static Hardcoded Progress Array & Missing `key` Prop**
  - **Why it matters**: All 4 POUR principles display a static `80%` progress without React `key` props on mapped items.
  - **Fix**: Pass `key={principle.name}` and bind to dynamic learner progress state.
  - **Suggested command**: `$impeccable polish --target="src/pages/learner/Dashboard.tsx"`

#### Persona Red Flags

**Alex (Power User / A11y Auditor)**: Irritated by static 80% progress values, un-clickable hero card body, and lack of quick WCAG audit shortcuts or level filters (A vs AA vs AAA).

**Jordan (First-Timer)**: Confused by seeing two adjacent cards labeled "Earned Badges" with no tooltips explaining what "POUR" percentages represent.

**Sam (Accessibility / Screen Reader User)**: High risk! The non-semantic `<div onClick=...>` header in `LearnerQuizCardTemplate` cannot be announced or triggered via keyboard, blocking screen reader navigation.

**Casey (Mobile User)**: Mobile quiz table rows overflow horizontally due to unstacked flex metadata gaps (`gap-6 sm:gap-10`) on narrow phone screens.

#### Minor Observations
- Missing `key` prop on line 54 of `Dashboard.tsx`.
- Duplicate `<Link>` targets in `LearnerQuizCardTemplate.tsx` create double tab stops for keyboard users.
- `ContinueLearningCard` always links to hardcoded `/learner/modules/perceivable/topic-1-1/lesson-1-1-1`.

#### Questions to Consider
1. *How can a platform teaching web accessibility ensure its own dashboard components (like collapsible headers and progress indicators) serve as exemplar implementations of WCAG 2.2 AA standards?*
2. *Rather than standard percentage bars, how might the dashboard visualize a learner's practical accessibility skills—such as screen reader navigation speed or WCAG audit accuracy?*
3. *How should the dashboard adapt its visual hierarchy and action prompts for a first-time learner who needs guidance versus a seasoned auditor looking for quick quiz assignments?*

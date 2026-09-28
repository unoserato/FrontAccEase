import { useState } from "react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import SectionHeader from "@/components/public/SectionHeader"
import {
  BookOpen,
  CheckCircle2,
  FileSearch2,
  BotMessageSquare,
  Users2,
  BarChart3,
  ArrowRight,
} from "lucide-react"

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<number>(0)

  const featuresList = [
    {
      id: "modules",
      title: "Learning Modules",
      subtitle: "Structured POUR-based digital accessibility curriculum",
      badge: "Core Education",
      icon: BookOpen,
      whatItDoes:
        "Provides structured, self-paced learning units broken down by the four WCAG POUR principles: Perceivable, Operable, Understandable, and Robust. Each module combines theoretical context, assistive technology rationale, and interactive code challenges.",
      whyItMatters:
        "Students often memorize abstract rules without understanding how assistive tech (screen readers, braille displays, switch devices) consumes the DOM. FrontAccEase connects every guideline to real user impact.",
      bullets: [
        "Covers WCAG 2.1 & 2.2 Level A and AA standards",
        "Includes interactive before-and-after accessible code comparisons",
        "Module progression milestones with instant code validation",
        "Comprehensive coverage of ARIA landmarks, roles, and live regions",
      ],
      previewSnippet: {
        title: "Perceivable: 1.4.3 Minimum Contrast",
        code: `// Contrast Ratio Formula Check:
const ratio = getContrastRatio(foreground, background);
if (ratio < 4.5) {
  throw new WCAGViolation("Level AA Failure: Normal text must meet 4.5:1 ratio.");
}`,
      },
    },
    {
      id: "assessments",
      title: "Criterion Assessments & Quizzes",
      subtitle: "Diagnostic and formative accessibility testing",
      badge: "Verification",
      icon: CheckCircle2,
      whatItDoes:
        "Interactive scenario-based assessments designed to measure deep conceptual and practical understanding. Quizzes are mapped to specific WCAG success criteria numbers and provide instant diagnostic feedback.",
      whyItMatters:
        "Traditional multiple-choice tests fail to measure whether a developer can spot accessibility barriers in live code. Our assessments present real code snippets and UI scenarios to test authentic troubleshooting skills.",
      bullets: [
        "Criterion-tagged questions with detailed rationale explanations",
        "Immediate feedback highlighting why an answer meets or fails WCAG",
        "Skill-based badge unlocks (e.g. 'Keyboard Navigation Specialist')",
        "Diagnostic reports showing strengths and weak areas per principle",
      ],
      previewSnippet: {
        title: "Scenario Challenge: Dialog Trapping",
        code: `Question: When a modal opens, what is the primary WCAG 2.1.2 requirement?
[✓] Keyboard focus must be moved inside the modal and trapped until dismissed.
[✗] The modal must automatically close after 5 seconds of inactivity.`,
      },
    },
    {
      id: "analytics",
      title: "Performance & Mastery Telemetry",
      subtitle: "Granular skill analytics for learners and educators",
      badge: "Telemetry",
      icon: BarChart3,
      whatItDoes:
        "Visual analytics tracking student and cohort performance across each of the 4 POUR principles. Visual progress gauges show mastery percentages, module completion status, and specific guideline deficiencies.",
      whyItMatters:
        "Educators need quick visibility into where students struggle (e.g., color contrast vs ARIA live regions), enabling targeted classroom remediation before students graduate into industry.",
      bullets: [
        "Principle Mastery distribution breakdown (Perceivable, Operable, etc.)",
        "At-risk guideline alerts to guide further study",
        "Cohort aggregate scoring for professors and course coordinators",
        "Historical progress tracking from beginner to certified mastery",
      ],
      previewSnippet: {
        title: "Mastery Index Telemetry",
        code: `Principle Telemetry Score:
- Perceivable (1.x): 92% (Mastered)
- Operable (2.x):    74% (Focus Needed: Guideline 2.4 Focus Visible)
- Understandable (3): 96% (Mastered)
- Robust (4.x):      88% (Proficient)`,
      },
    },
    {
      id: "classroom",
      title: "Classroom & Cohort Management",
      subtitle: "End-to-end administration for IT faculty and educators",
      badge: "Instructional Tools",
      icon: Users2,
      whatItDoes:
        "Gives professors and teaching assistants the tools to create virtual classrooms, assign specialized learning tracks, author custom quizzes and modules, and evaluate student submission logs.",
      whyItMatters:
        "Integrates effortlessly into college IT, Computer Science, and HCI courses without requiring instructors to build an accessibility testbed from scratch.",
      bullets: [
        "Classroom creation with instant student enrollment codes",
        "WYSIWYG module and quiz authoring tool with rich code editor",
        "Comprehensive gradebook and student assessment submission views",
        "Exportable student performance audit logs for course grading",
      ],
      previewSnippet: {
        title: "Classroom Cohort: CS340",
        code: `Roster: 42 Enrolled Students
Active Assignment: Lab 3 - Form Validation & WCAG 3.3
Submission Rate: 39 / 42 (92.8%)
Average Score: 88.4%`,
      },
    },
    {
      id: "analyzer",
      title: "Aria Analyzer Automated Audits",
      subtitle: "Live web DOM parsing and AI-assisted remediation",
      badge: "Diagnostic Tool",
      icon: FileSearch2,
      whatItDoes:
        "A web inspection engine that scans live URLs or DOM snippets for WCAG 2.1 & 2.2 AA non-compliance. Automatically calculates color contrast, checks semantic heading hierarchies, inspects alt attributes, and generates ready-to-copy code fixes.",
      whyItMatters:
        "Bridges the gap between learning theory in a textbook and applying it to messy, real-world web applications and student capstone projects.",
      bullets: [
        "Dual AI engine support: Fast lightweight AST or deep multimodal Gemini AI",
        "All issues categorized by Perceivable, Operable, Understandable, Robust",
        "Provides concrete before/after code diffs for instant remediation",
        "Integrated Chrome Extension for inspecting local development servers",
      ],
      previewSnippet: {
        title: "Aria Analyzer Audit Log",
        code: `Audit URL: https://my-portfolio-app.vercel.app
Status: 4 Issues Detected (Score: 82/100)
- [1.4.3] Text contrast ratio 3.2:1 (Required: 4.5:1)
- [2.4.4] Ambiguous link text "Click Here" (Needs descriptive context)`,
      },
    },
    {
      id: "assistant",
      title: "Aria Assistant AI Companion",
      subtitle: "Interactive 24/7 web accessibility expert",
      badge: "AI Tutoring",
      icon: BotMessageSquare,
      whatItDoes:
        "A conversational accessibility mentor that explains complex WCAG guidelines, suggests accessible component patterns, and assists students in refactoring inaccessible code into fully compliant markup.",
      whyItMatters:
        "WCAG documentation can be dense and intimidating. Aria Assistant answers student questions with concise, clear examples without giving away quiz answers.",
      bullets: [
        "Provides plain-language explanations of technical WCAG success criteria",
        "Suggests accessible React, Vue, and HTML5 component structures",
        "Explains assistive technology interactions (e.g. NVDA, JAWS, VoiceOver)",
        "Contextually aware of the current learning module or analyzer result",
      ],
      previewSnippet: {
        title: "Aria Assistant Dialogue",
        code: `Student: "What is the difference between aria-label and aria-labelledby?"
Aria: "aria-label provides an invisible string directly on the element, whereas aria-labelledby references the ID of an existing visible element on the page."`,
      },
    },
  ]

  const activeFeature = featuresList[activeTab]
  const ActiveIcon = activeFeature.icon

  return (
    <div className="flex flex-col gap-16 pb-16 sm:gap-24 sm:pb-24 lg:gap-32 lg:pb-32">
      {/* Hero Header */}
      <section className="border-b border-border/60 bg-gradient-to-b from-background via-muted/20 to-background pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Platform Capabilities
          </Badge>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Everything You Need To Master <br className="hidden sm:inline" />
            <span className="text-primary">Digital Web Accessibility</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            FrontAccEase unites curriculum modules, diagnostic testing, automated auditing, and AI mentoring into a single coherent learning environment.
          </p>
        </div>
      </section>

      {/* Interactive Feature Explorer */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border pb-4">
          {featuresList.map((feature, idx) => {
            const isSelected = activeTab === idx
            const FIcon = feature.icon
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-primary ${
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <FIcon className="size-4" />
                <span>{feature.title}</span>
              </button>
            )
          })}
        </div>

        {/* Active Feature Deep Dive Showcase */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {activeFeature.badge}
                  </Badge>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                  {activeFeature.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground font-medium">
                  {activeFeature.subtitle}
                </p>
              </div>

              {/* What it does */}
              <div className="space-y-2 rounded-xl border border-border bg-muted/20 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  What It Does
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {activeFeature.whatItDoes}
                </p>
              </div>

              {/* Why it matters */}
              <div className="space-y-2 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Why It Matters For Students &amp; Faculty
                </h3>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  {activeFeature.whyItMatters}
                </p>
              </div>

              {/* Key Capabilities Bullet Points */}
              <div className="space-y-2.5 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Key Capabilities
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {activeFeature.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Code / Visual Preview Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xl border border-border bg-muted/40 p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-border pb-2.5">
                  <div className="flex items-center gap-2">
                    <ActiveIcon className="size-4 text-primary" />
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {activeFeature.previewSnippet.title}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs font-mono">
                    Live System Preview
                  </Badge>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-background p-3.5 font-mono text-xs text-foreground border border-border leading-relaxed">
                  <code>{activeFeature.previewSnippet.code}</code>
                </pre>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 space-y-3 text-center">
                <p className="text-xs text-muted-foreground">
                  Ready to test this capability in an interactive session?
                </p>
                <div className="flex justify-center gap-2">
                  <Link
                    to="/signup"
                    className={buttonVariants({
                      variant: "default",
                      size: "sm",
                      className: "w-full justify-center",
                    })}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of All 6 Features for Quick Reference */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          title="All Features at a Glance"
          subtitle="Explore the complete platform matrix designed for comprehensive IT education."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((f, i) => {
            const FIcon = f.icon
            return (
              <div
                key={f.id}
                className="rounded-xl border border-border bg-card p-5 space-y-3 hover:border-primary/40 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FIcon className="size-4.5" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {f.badge}
                    </Badge>
                  </div>
                  <h3 className="font-heading font-bold text-base text-foreground">
                    {f.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {f.whatItDoes}
                  </p>
                </div>

                <div className="pt-3 border-t border-border">
                  <button
                    onClick={() => {
                      setActiveTab(i)
                      window.scrollTo({ top: 300, behavior: "smooth" })
                    }}
                    className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Technical Details</span>
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-muted/40 p-8 sm:p-12 text-center space-y-5">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Experience FrontAccEase In Action
          </h2>
          <p className="mx-auto max-w-xl text-sm sm:text-base text-muted-foreground">
            Sign up today to explore our interactive modules, try the Aria Analyzer tool, and test your web accessibility knowledge.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/signup"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Start Learning Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

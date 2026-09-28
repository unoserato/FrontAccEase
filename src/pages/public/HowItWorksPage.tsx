import { useState } from "react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import SectionHeader from "@/components/public/SectionHeader"
import {
  GraduationCap,
  Users2,
  BookOpen,
  CheckCircle2,
  FileSearch2,
  BarChart3,
  Sparkles,
  PlusCircle,
  FolderKanban,
  ClipboardCheck,
  TrendingUp,
  ShieldCheck,
} from "lucide-react"

export default function HowItWorksPage() {
  const [roleMode, setRoleMode] = useState<"student" | "instructor">("student")

  const studentSteps = [
    {
      num: "01",
      title: "Learn",
      tagline: "Study accessibility concepts through structured modules.",
      description:
        "Begin your journey through structured learning units centered around the 4 POUR principles. Explore interactive code breakdowns, learn semantic HTML tags, master ARIA attributes, and understand the real assistive technologies used by people with disabilities.",
      icon: BookOpen,
      badge: "Foundation",
      details: [
        "POUR Principle-based structured curriculum",
        "Clear explanations of WCAG 2.1 & 2.2 AA success criteria",
        "Interactive before-and-after code samples",
      ],
      outputLabel: "Outcome",
      output: "Deep conceptual and practical understanding of digital inclusion guidelines.",
    },
    {
      num: "02",
      title: "Assess",
      tagline: "Complete assessments to measure understanding.",
      description:
        "Validate what you've learned through criterion-specific assessments and scenario challenges. Test whether you can identify keyboard traps, missing labels, color contrast violations, and invalid ARIA roles.",
      icon: CheckCircle2,
      badge: "Formative Testing",
      details: [
        "Scenario-based challenges simulating real web audits",
        "Instant diagnostic feedback and explanation rationale",
        "Criterion-tagged scoring to identify specific knowledge gaps",
      ],
      outputLabel: "Outcome",
      output: "Immediate clarity on whether you understand WCAG compliance rules.",
    },
    {
      num: "03",
      title: "Analyze",
      tagline: "Use accessibility analysis tools to examine web pages.",
      description:
        "Put your skills to work on live websites using the built-in Aria Analyzer. Enter any public web URL or use our Chrome Extension to scan DOM nodes, evaluate color contrast, inspect heading hierarchies, and pinpoint accessibility errors.",
      icon: FileSearch2,
      badge: "Hands-On Audit",
      details: [
        "Automated DOM analysis with instant violation grouping",
        "POUR principle mapping for every detected issue",
        "AI-assisted code fix recommendations (Qwen & Gemini models)",
      ],
      outputLabel: "Outcome",
      output: "Real-world auditing experience on actual production websites and personal projects.",
    },
    {
      num: "04",
      title: "Understand",
      tagline: "Review performance and identify areas that need support.",
      description:
        "Inspect your personalized Principle Mastery telemetry dashboard. FrontAccEase computes your mastery percentage for Perceivable, Operable, Understandable, and Robust, surfacing any weak spots that require further study.",
      icon: BarChart3,
      badge: "Telemetry & Insights",
      details: [
        "Principle Mastery progress meters",
        "Targeted alerts on guidelines needing reinforcement",
        "Earned achievement milestones and badges",
      ],
      outputLabel: "Outcome",
      output: "Actionable roadmap of the specific guidelines you need to strengthen.",
    },
    {
      num: "05",
      title: "Improve",
      tagline: "Use feedback and learning resources to strengthen understanding.",
      description:
        "Close your knowledge gaps with Aria Assistant mentoring, remediation code suggestions, and targeted review lessons. Build production-ready habits that make writing accessible frontend code second nature.",
      icon: Sparkles,
      badge: "Lifelong Mastery",
      details: [
        "24/7 interactive tutor access via Aria Assistant",
        "Refactoring guidance for React, Vue, and vanilla HTML/CSS",
        "Durable muscle memory for industry-standard accessible development",
      ],
      outputLabel: "Outcome",
      output: "Industry-ready proficiency in creating fully WCAG-compliant web applications.",
    },
  ]

  const instructorSteps = [
    {
      num: "01",
      title: "Create",
      tagline: "Build learning modules and assessments.",
      description:
        "Author customized learning modules and quizzes tailored to your course syllabus. Use our rich-text editor with syntax highlighting to embed real code examples, assign WCAG criterion tags, and design multiple-choice or scenario-based questions.",
      icon: PlusCircle,
      badge: "Curriculum Design",
      details: [
        "Rich text editor with code block formatting",
        "WCAG guideline tagging for standardized grading",
        "Customizable question types with detailed explanation keys",
      ],
      outputLabel: "Outcome",
      output: "A tailored, academic-grade accessibility curriculum ready for your students.",
    },
    {
      num: "02",
      title: "Organize",
      tagline: "Manage classrooms and students.",
      description:
        "Set up classroom cohorts, manage student rosters, and distribute assignments seamlessly. Generate simple enrollment codes so students can join your classroom in seconds without administrative friction.",
      icon: FolderKanban,
      badge: "Cohort Management",
      details: [
        "Quick classroom creation and unique enrollment codes",
        "Course material assignment and scheduling",
        "Roster management and student account linking",
      ],
      outputLabel: "Outcome",
      output: "Structured classroom spaces where coursework and student activity are organized.",
    },
    {
      num: "03",
      title: "Assess",
      tagline: "Evaluate student understanding.",
      description:
        "Assign diagnostic quizzes and live audit assignments. FrontAccEase automatically grades submissions, verifies code answers, and provides instructors with detailed submission logs.",
      icon: ClipboardCheck,
      badge: "Automated Evaluation",
      details: [
        "Automated grading against official WCAG standards",
        "Detailed student submission view with time spent metrics",
        "Remediation notes automatically delivered to learners",
      ],
      outputLabel: "Outcome",
      output: "Instant grading and comprehensive assessment records with zero manual calculation.",
    },
    {
      num: "04",
      title: "Monitor",
      tagline: "Review classroom and student performance.",
      description:
        "Track aggregate cohort telemetry and individual student progress over time. Identify high-frequency class misconceptions (e.g. failing Guideline 2.4 Focus Visible) and adjust your lecture emphasis accordingly.",
      icon: TrendingUp,
      badge: "Cohort Telemetry",
      details: [
        "Classroom-wide principle mastery distribution charts",
        "Identification of difficult WCAG guidelines across the class",
        "Exportable audit and grade reports for academic records",
      ],
      outputLabel: "Outcome",
      output: "Data-driven insights to elevate overall classroom learning outcomes.",
    },
  ]

  const activeSteps = roleMode === "student" ? studentSteps : instructorSteps

  return (
    <div className="flex flex-col gap-16 pb-16 sm:gap-24 sm:pb-24 lg:gap-32 lg:pb-32">
      {/* Header */}
      <section className="border-b border-border/60 bg-gradient-to-b from-background via-muted/20 to-background pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            User Workflows
          </Badge>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            How FrontAccEase Delivers Results
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Designed for clear pedagogical progression: from foundational theory to live automated diagnostics and data-driven classroom oversight.
          </p>

          {/* Role Toggle */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex rounded-xl border border-border bg-card p-1 shadow-xs">
              <button
                onClick={() => setRoleMode("student")}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                  roleMode === "student"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <GraduationCap className="size-4" />
                <span>Student Workflow (5 Steps)</span>
              </button>
              <button
                onClick={() => setRoleMode("instructor")}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                  roleMode === "instructor"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users2 className="size-4" />
                <span>Instructor Workflow (4 Steps)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Step Progression View */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-6">
          {activeSteps.map((step) => {
            return (
              <div
                key={step.num}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs transition-all hover:border-primary/40"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  {/* Step Num & Title */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-mono font-bold text-sm shadow-xs">
                        {step.num}
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {step.badge}
                      </Badge>
                    </div>

                    <h2 className="font-heading text-2xl font-bold text-foreground">
                      {step.title}
                    </h2>
                    <p className="text-sm font-medium text-foreground/80 leading-snug">
                      {step.tagline}
                    </p>
                  </div>

                  {/* Description & Key Details */}
                  <div className="lg:col-span-5 space-y-4">
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                        Included in this stage:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-muted-foreground" role="list">
                        {step.details.map((d, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Outcome Box */}
                  <div className="lg:col-span-3 rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
                      <ShieldCheck className="size-4" />
                      <span>{step.outputLabel}</span>
                    </div>
                    <p className="text-xs text-foreground/90 font-medium leading-relaxed">
                      {step.output}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-10 space-y-8">
          <SectionHeader
            title="A Closed-Loop Pedagogical Ecosystem"
            subtitle="How student practice and instructor monitoring continuously reinforce each other."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <GraduationCap className="size-4.5" />
                <span>Student Experience Summary</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Students progress seamlessly from learning theory to evaluating code, using Aria Analyzer to audit live sites, and refining their techniques with Aria Assistant until they achieve certified POUR mastery.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Users2 className="size-4.5" />
                <span>Instructor Oversight Summary</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Instructors gain full visibility into individual and cohort comprehension, authoring custom assessments and relying on automated WCAG telemetry to guide lecture interventions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-12 text-center space-y-5">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Ready To Get Started?
          </h2>
          <p className="mx-auto max-w-xl text-sm sm:text-base text-muted-foreground">
            Join FrontAccEase today and start building or teaching web accessibility with confidence.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/signup"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Create Your Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

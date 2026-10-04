import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import SectionHeader from "@/components/public/SectionHeader"
import { HeroInterfacePreview } from "@/components/public/InterfaceMockups"
import PourExplorer from "@/components/public/PourExplorer"
import PricingBlock from "@/components/public/PricingBlock"
import {
  BookOpen,
  CheckCircle2,
  FileSearch2,
  BotMessageSquare,
  Users2,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Layers,
  Check,
  Award,
  Terminal,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-16 pb-16 sm:gap-24 sm:pb-24 lg:gap-32 lg:pb-32">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-background via-muted/20 to-background pt-10 sm:pt-16 lg:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              <span>Higher Education Web Accessibility Platform</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                WCAG 2.1 &amp; 2.2 AA Aligned
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 max-w-4xl font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Learn Accessibility. <br className="hidden sm:inline" />
              <span className="text-primary">Measure Understanding.</span> Build
              Better Experiences.
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              FrontAccEase helps IT students learn web accessibility, assess
              their understanding, and analyze accessibility practices through
              structured learning and practical tools.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
              <Link
                to="/signup"
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                  className:
                    "h-11 w-full px-6 text-base font-semibold shadow-sm sm:w-auto",
                })}
              >
                <span>Get Started</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/features"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "h-11 w-full px-6 text-base sm:w-auto",
                })}
              >
                Explore Features
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" />
                <span>POUR Framework Core</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" />
                <span>Aria Analyzer Engine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" />
                <span>Instructor Classroom Analytics</span>
              </div>
            </div>

            {/* Hero Interface Visual */}
            <div className="mt-12 w-full max-w-5xl sm:mt-16">
              <HeroInterfacePreview />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Bridging The Educational Gap
              </Badge>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Web Accessibility Is Not An Afterthought. It Is Core Computer
                Science.
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Over 1.3 billion people worldwide live with significant
                disabilities. Yet, over 95% of top web pages still contain
                detectable WCAG failures.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                FrontAccEase embeds directly into computing and IT curricula,
                giving students hands-on diagnostic tools, structured POUR
                guidelines, and real-time remediation practice.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                  01
                </div>
                <h3 className="font-heading text-base font-bold text-foreground">
                  Structured POUR Pedagogy
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Learn through organized modules mapped directly to
                  Perceivable, Operable, Understandable, and Robust standards.
                </p>
              </div>

              <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                  02
                </div>
                <h3 className="font-heading text-base font-bold text-foreground">
                  Aria Analyzer Audits
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Analyze real web pages in real-time. Inspect DOM trees, detect
                  contrast issues, and generate compliant code fixes.
                </p>
              </div>

              <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                  03
                </div>
                <h3 className="font-heading text-base font-bold text-foreground">
                  Formative Assessments
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Test comprehension with scenario-based accessibility questions
                  and measure progress against specific WCAG criteria.
                </p>
              </div>

              <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                  04
                </div>
                <h3 className="font-heading text-base font-bold text-foreground">
                  Instructor Oversight
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Monitor classroom cohorts, detect common misconception
                  patterns, and export comprehensive audit logs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE CAPABILITIES */}
      <section className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Core Capabilities"
          title="Engineered For Real Accessibility Mastery"
          subtitle="A unified toolkit for learning, testing, and verifying digital accessibility standards."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Capability 1 */}
          <Card className="flex flex-col justify-between border-border transition-colors hover:border-primary/40">
            <CardHeader className="space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen className="size-5" />
              </div>
              <CardTitle className="text-lg font-bold">
                Interactive Learning Modules
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed sm:text-sm">
                Step-by-step modular lessons covering semantic HTML5, ARIA
                roles, assistive technology behavior, and keyboard navigation
                principles.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-primary" />
                  <span>Interactive code comparisons</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-primary" />
                  <span>Principle-based curriculum track</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Capability 2 */}
          <Card className="flex flex-col justify-between border-border transition-colors hover:border-primary/40">
            <CardHeader className="space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileSearch2 className="size-5" />
              </div>
              <CardTitle className="text-lg font-bold">
                Aria Analyzer Engine
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed sm:text-sm">
                Automated live URL and DOM scanner that tests web applications
                for WCAG 2.1 &amp; 2.2 AA violations and provides exact code
                diff fixes.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-primary" />
                  <span>POUR-categorized issue breakdown</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-primary" />
                  <span>Dual AI model remediation support</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Capability 3 */}
          <Card className="flex flex-col justify-between border-border transition-colors hover:border-primary/40">
            <CardHeader className="space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BotMessageSquare className="size-5" />
              </div>
              <CardTitle className="text-lg font-bold">
                Aria Assistant Tutor
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed sm:text-sm">
                Conversational accessibility companion trained on WCAG
                techniques, offering immediate guidance on tricky ARIA states
                and focus patterns.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-primary" />
                  <span>Context-aware code refactoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-primary" />
                  <span>Guideline explanation with examples</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Capability 4 */}
          <Card className="flex flex-col justify-between border-border transition-colors hover:border-primary/40">
            <CardHeader className="space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Award className="size-5" />
              </div>
              <CardTitle className="text-lg font-bold">
                Criterion-Based Quizzes
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed sm:text-sm">
                Formative assessments directly linked to WCAG success criteria
                numbers (e.g. 1.4.3, 2.1.2) with explanatory feedback.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-primary" />
                  <span>Immediate diagnostic results</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-primary" />
                  <span>Skill-based milestone badges</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Capability 5 */}
          <Card className="flex flex-col justify-between border-border transition-colors hover:border-primary/40">
            <CardHeader className="space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BarChart3 className="size-5" />
              </div>
              <CardTitle className="text-lg font-bold">
                Performance Analytics
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed sm:text-sm">
                Granular telemetry tracking individual principle mastery
                (Perceivable, Operable, Understandable, Robust) over time.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-primary" />
                  <span>Identifies at-risk learning areas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-primary" />
                  <span>Visual mastery progress gauges</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Capability 6 */}
          <Card className="flex flex-col justify-between border-border transition-colors hover:border-primary/40">
            <CardHeader className="space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users2 className="size-5" />
              </div>
              <CardTitle className="text-lg font-bold">
                Classroom Management
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed sm:text-sm">
                Instructor suite for organizing class cohorts, creating custom
                modules, distributing assessments, and evaluating cohort
                metrics.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-primary" />
                  <span>Custom quiz &amp; module authoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-primary" />
                  <span>Cohort aggregate analytics</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. HOW FRONTACCEASE WORKS */}
      <section className="border-y border-border bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Methodology"
            title="How FrontAccEase Works"
            subtitle="A proven five-step cycle designed to take IT students from theoretical awareness to professional compliance."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Step 1 */}
            <div className="relative space-y-3 rounded-xl border border-border bg-card p-5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary font-mono text-xs font-bold text-primary-foreground">
                01
              </div>
              <h3 className="font-heading text-base font-bold text-foreground">
                Learn
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Study core accessibility concepts through structured modules
                based on POUR principles and real code patterns.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative space-y-3 rounded-xl border border-border bg-card p-5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary font-mono text-xs font-bold text-primary-foreground">
                02
              </div>
              <h3 className="font-heading text-base font-bold text-foreground">
                Assess
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Complete scenario assessments to evaluate practical
                comprehension of specific WCAG criteria.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative space-y-3 rounded-xl border border-border bg-card p-5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary font-mono text-xs font-bold text-primary-foreground">
                03
              </div>
              <h3 className="font-heading text-base font-bold text-foreground">
                Analyze
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Use Aria Analyzer to audit live websites, inspect DOM trees, and
                discover real-world compliance barriers.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative space-y-3 rounded-xl border border-border bg-card p-5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary font-mono text-xs font-bold text-primary-foreground">
                04
              </div>
              <h3 className="font-heading text-base font-bold text-foreground">
                Understand
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Review telemetry dashboards to pinpoint weak guidelines and
                understand the impact on assistive tech users.
              </p>
            </div>

            {/* Step 5 */}
            <div className="relative space-y-3 rounded-xl border border-border bg-card p-5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary font-mono text-xs font-bold text-primary-foreground">
                05
              </div>
              <h3 className="font-heading text-base font-bold text-foreground">
                Improve
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Apply AI remediation snippets and feedback to build durable,
                production-ready inclusive frontend skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WCAG & POUR DEEP DIVE */}
      <section className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="WCAG Foundation"
          title="Structured Around The Four POUR Principles"
          subtitle="Explore the cornerstone standards of modern digital accessibility and how FrontAccEase teaches them."
        />

        <PourExplorer />
      </section>

      {/* 6. DUAL AUDIENCE EXPERIENCE: STUDENT & INSTRUCTOR */}
      <section className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Tailored Experience"
          title="Built For Both Learners And Educators"
          subtitle="Seamless workflows configured specifically for student mastery and instructor classroom leadership."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Student Card */}
          <div className="flex flex-col justify-between space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    For IT Students
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Practical skills for modern software development
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Build practical accessibility expertise that tech employers
                actively look for. Learn how to write accessible HTML, audit
                live projects, and use assistive technologies effectively.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2 text-xs text-foreground sm:text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    Self-paced interactive modules covering WCAG 2.1 &amp; 2.2
                    AA
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs text-foreground sm:text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    Live URL auditing tool to test personal portfolios and class
                    projects
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs text-foreground sm:text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    Instant AI tutoring with Aria Assistant for code
                    clarification
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs text-foreground sm:text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    Milestone progress tracking and mastery certificates
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <Link
                to="/signup"
                className={buttonVariants({
                  variant: "default",
                  size: "sm",
                  className: "w-full justify-center",
                })}
              >
                Join As A Student
              </Link>
            </div>
          </div>

          {/* Instructor Card */}
          <div className="flex flex-col justify-between space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Users2 className="size-5" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    For IT Instructors
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Classroom tools and curriculum management
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Equip your classes with ready-to-teach accessibility curricula.
                Create customized quizzes, organize student classrooms, and
                track mastery analytics across your cohorts.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2 text-xs text-foreground sm:text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>Full classroom and cohort management tools</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-foreground sm:text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    Module and quiz authoring editor with rich text support
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs text-foreground sm:text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>Cohort performance diagnostics by WCAG principle</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-foreground sm:text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    Exportable audit logs for academic grading and compliance
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <Link
                to="/contact"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "w-full justify-center",
                })}
              >
                Request Academic Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ARIA ANALYZER SPOTLIGHT */}
      <section className="border-y border-border bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-6">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Practical Tool
              </Badge>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                Aria Analyzer: Audit Any Web Page In Seconds
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Theory comes alive when students inspect real websites. Aria
                Analyzer parses DOM structure, verifies color contrast ratios,
                simulates screen reader parsing, and groups every detected issue
                by its official WCAG success criterion.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Terminal className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      Dual AI Remediation Models
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Choose between lightweight fast AST inspection (Qwen 2.5)
                      or deep multimodal reasoning (Gemini Flash) for complex UI
                      states.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Layers className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      Direct Code Fix Generation
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Does not just flag issues — provides instant semantic HTML
                      and CSS snippets to fix the defect on the spot.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/learner/analyzer"
                  className={buttonVariants({
                    variant: "default",
                    size: "sm",
                    className: "gap-1.5",
                  })}
                >
                  <span>Launch Aria Analyzer</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-md sm:p-6">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <FileSearch2 className="size-4 text-primary" />
                    <span className="font-heading text-sm font-bold text-foreground">
                      Aria Analyzer Snapshot
                    </span>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">
                    Live Engine
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-3 text-xs">
                    <span className="truncate font-mono text-muted-foreground">
                      https://example.university.edu/login
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      Score: 92/100
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">
                        1.4.3 Contrast (Minimum)
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-amber-500/10 text-xs text-amber-600 dark:text-amber-400"
                      >
                        Minor Warning
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Subtext has 3.8:1 contrast on white surface; minimum 4.5:1
                      required for normal body text.
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-border pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">
                        4.1.2 Name, Role, Value
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-emerald-500/10 text-xs text-emerald-600 dark:text-emerald-400"
                      >
                        Passed
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      All custom interactive components have valid ARIA labels
                      and state indicators.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRICING PLANS */}
      <section className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Transparent Plans"
          title="Simple Pricing for Solo Learners &amp; Classrooms"
          subtitle="Choose the plan that fits your study pace or institutional classroom needs. Every plan includes core WCAG verification."
        />

        <PricingBlock showDetailedLink={true} />
      </section>

      {/* 9. FINAL CTA BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative space-y-6 overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-12 lg:p-16">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <ShieldCheck className="size-6" />
          </div>

          <div className="mx-auto max-w-2xl space-y-3">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Empower The Next Generation Of Inclusive Developers
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Start learning or teaching web accessibility today with
              FrontAccEase's structured curriculum and diagnostic analysis
              tools.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:gap-4">
            <Link
              to="/signup"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className: "w-full px-6 font-semibold shadow-xs sm:w-auto",
              })}
            >
              Create Free Account
            </Link>
            <Link
              to="/accessibility"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "w-full px-6 sm:w-auto",
              })}
            >
              Explore WCAG Guide
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            No credit card required. Free for IT educators, academic students,
            and developers.
          </p>
        </div>
      </section>
    </div>
  )
}

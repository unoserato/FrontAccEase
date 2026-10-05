import { useState } from "react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import SectionHeader from "@/components/public/SectionHeader"
import PricingBlock from "@/components/public/PricingBlock"
import {
  Check,
  Minus,
  Sparkles,
  ArrowRight,
  Calculator,
  ShieldCheck,
  GraduationCap,
  Users,
  FileSearch,
  Clock,
  Zap,
  BarChart3,
  BotMessageSquare,
} from "lucide-react"

export default function PricingPage() {
  // Calculator state
  const [calcSeats, setCalcSeats] = useState<number>(30)
  const [calcTier, setCalcTier] = useState<
    "plus" | "premium" | "institutional"
  >("plus")
  const [calcCycle, setCalcCycle] = useState<"yearly" | "monthly">("yearly")

  // Calculate quota and pricing
  const calculateEstimate = () => {
    if (calcTier === "institutional" || calcSeats > 200) {
      return {
        tierName: "Institutional Campus License",
        scansPerSeat: "Custom / High Volume",
        totalPooledScans: "50,000+ pooled scans / mo",
        costPerSeat: "Volume Tiered",
        monthlyTotal: "Custom Proposal",
        annualTotal: "Custom Annual Contract",
        isCustom: true,
      }
    }

    const pricePerSeat =
      calcTier === "plus"
        ? calcCycle === "yearly"
          ? 9
          : 12
        : calcCycle === "yearly"
          ? 24
          : 29

    const scansPerSeat = calcTier === "plus" ? 150 : 750
    const totalPooledScans = (calcSeats * scansPerSeat).toLocaleString()
    const monthlyTotal = calcSeats * pricePerSeat
    const annualTotal = monthlyTotal * (calcCycle === "yearly" ? 12 : 1)

    return {
      tierName:
        calcTier === "plus" ? "Plus Organization" : "Premium Organization",
      scansPerSeat: `${scansPerSeat} scans / user / mo`,
      totalPooledScans: `${totalPooledScans} pooled scans / mo`,
      costPerSeat: `$${pricePerSeat} / user / mo`,
      monthlyTotal: `$${monthlyTotal.toLocaleString()} / mo`,
      annualTotal:
        calcCycle === "yearly"
          ? `$${annualTotal.toLocaleString()} / yr (billed annually)`
          : `$${monthlyTotal.toLocaleString()} / mo (billed monthly)`,
      isCustom: false,
    }
  }

  const estimate = calculateEstimate()

  const comparisonCategories = [
    {
      category: "Diagnostic & Accessibility Scanning (Aria Analyzer)",
      features: [
        {
          name: "Monthly Scan Allowance",
          free: "15 scans / mo",
          plus: "100 solo / 150 pooled",
          premium: "500 solo / 750 pooled",
          institutional: "Unlimited / 50k+ pooled",
        },
        {
          name: "WCAG 2.1 & 2.2 Rule Coverage",
          free: "Level A & AA (Core rules)",
          plus: "Level A & AA (Full suite)",
          premium: "Level A, AA & AAA",
          institutional: "Level A, AA, AAA + Custom rules",
        },
        {
          name: "Chrome Extension MV3 (Localhost & DOM)",
          free: true,
          plus: true,
          premium: true,
          institutional: true,
        },
        {
          name: "Real-Time Batch URL Inspection",
          free: false,
          plus: "Single URL",
          premium: "Up to 20 URLs / batch",
          institutional: "Full-domain automated crawl",
        },
        {
          name: "Color Contrast & Vision Simulation",
          free: "4.5:1 basic ratio",
          plus: "WCAG 2.1 ratio + Vision simulator",
          premium: "WCAG 2.1 + APCA formula + Simulator",
          institutional: "WCAG + APCA + Custom university palettes",
        },
        {
          name: "Scan History & Telemetry Retention",
          free: "7 days",
          plus: "90 days",
          premium: "1 Year",
          institutional: "Unlimited archive retention",
        },
        {
          name: "Exportable Audit Reports",
          free: "None",
          plus: "PDF & JSON",
          premium: "PDF, JSON, CSV & Presentation deck",
          institutional: "White-label PDF, API data push & Webhooks",
        },
      ],
    },
    {
      category: "AI Remediation & Assistive Mentorship (Aria Assistant)",
      features: [
        {
          name: "AI Code Remediation Engine",
          free: "Basic explanation",
          plus: "Fast AST (Qwen 2.5)",
          premium: "Dual Model (Gemini Flash + Qwen 2.5)",
          institutional: "Dual Model + Custom institutional context",
        },
        {
          name: "Aria Assistant Interactive Tutor",
          free: "5 queries / day",
          plus: "50 queries / day",
          premium: "Unlimited queries",
          institutional: "Unlimited + Syllabus fine-tuning",
        },
        {
          name: "Multimodal Vision Reasoning (UI Screenshots)",
          free: false,
          plus: false,
          premium: true,
          institutional: true,
        },
        {
          name: "Direct Semantic Code Diff Generator",
          free: false,
          plus: true,
          premium: true,
          institutional: true,
        },
      ],
    },
    {
      category: "Mastery Analytics & POUR Curriculum",
      features: [
        {
          name: "Interactive POUR Learning Modules",
          free: "3 Starter Modules",
          plus: "All 12 Core Modules",
          premium: "All 12 Modules + Advanced patterns",
          institutional: "All Modules + Custom university syllabus mapping",
        },
        {
          name: "WCAG Criterion Assessments & Quizzes",
          free: "Sample quizzes",
          plus: "Full WCAG quiz bank",
          premium: "Full quiz bank + Scenario challenges",
          institutional: "Full bank + Custom authoring by faculty",
        },
        {
          name: "Student Milestone Badges & Certificates",
          free: false,
          plus: true,
          premium: true,
          institutional: "Accredited institutional co-branded certificates",
        },
      ],
    },
    {
      category: "Classroom, Team & Cohort Administration",
      features: [
        {
          name: "Instructor Classroom Management",
          free: false,
          plus: "1 Classroom (up to 30 students)",
          premium: "Unlimited Classrooms",
          institutional: "Campus-wide multi-department hierarchy",
        },
        {
          name: "Module & Quiz Authoring Studio",
          free: false,
          plus: false,
          premium: true,
          institutional: true,
        },
        {
          name: "Cohort Principle Mastery Diagnostics",
          free: false,
          plus: "Basic summary",
          premium: "Granular telemetry per principle",
          institutional: "Predictive at-risk analytics & cohort benchmarking",
        },
        {
          name: "Scan Quota Pooling & Dynamic Seat Allocation",
          free: false,
          plus: "Classroom pool",
          premium: "Classroom pool + Dynamic seat caps",
          institutional: "Hierarchical sub-department pool management",
        },
      ],
    },
    {
      category: "Enterprise Security, Compliance & Support",
      features: [
        {
          name: "LMS Integration (Canvas, Blackboard, Moodle LTI 1.3)",
          free: false,
          plus: false,
          premium: "Canvas & Blackboard plugin",
          institutional:
            "Full LTI 1.3 Advantage (Canvas, Blackboard, Moodle, D2L)",
        },
        {
          name: "Single Sign-On (SSO / SAML / OAuth)",
          free: false,
          plus: false,
          premium: "Google Workspace & Microsoft 365",
          institutional: "SAML 2.0, Okta, Azure AD, Shibboleth",
        },
        {
          name: "FERPA & Student Privacy SLA",
          free: "Standard policy",
          plus: "Standard policy",
          premium: "FERPA compliant",
          institutional: "Signed FERPA DPA & Custom Security Review",
        },
        {
          name: "Support Response Time",
          free: "Community forum",
          plus: "Standard email (24-48h)",
          premium: "Priority email (under 12h)",
          institutional: "Dedicated account architect & 2-hour SLA",
        },
      ],
    },
  ]

  const faqs = [
    {
      question:
        "How do scan allowances differ between solo users and organizations?",
      answer:
        "For solo users (Free, Plus Solo, Premium Solo), scan allowances belong directly to your individual developer account and refresh every 30 days. For classrooms and organizations, all purchased seat allowances are pooled into a single unified shared balance (e.g., 30 Plus seats get 4,500 shared monthly scans). Instructors can set individual per-student monthly caps or let the pool dynamically support heavy lab sessions.",
    },
    {
      question: "What exactly counts as '1 Scan' in Aria Analyzer?",
      answer:
        "A single scan evaluates a complete rendered web page or HTML/DOM tree. It runs automated checks for all 50+ WCAG 2.1 & 2.2 AA/AAA rules, inspects all interactive element accessible names and roles, evaluates color contrast ratios (APCA and 4.5:1/7:1 formulas), tests keyboard tab order predictability, and yields an actionable diagnostic report with remediated code snippets.",
    },
    {
      question:
        "How does unused scan rollover work on Premium and Institutional plans?",
      answer:
        "On Premium and Institutional plans, unused organization scans automatically roll over for up to 2 consecutive billing cycles (up to 2x your monthly base quota). This allows academic departments to conserve scans during semester breaks and deploy them during intensive midterm audits and capstone project sprints.",
    },
    {
      question:
        "Are there educational institution grants and academic discounts?",
      answer:
        "Yes! FrontAccEase was founded specifically to advance computer science higher education. We provide deeply discounted semester-based licenses, Title III grant support packages, and fully funded 1-semester pilot programs for qualifying university accessibility initiatives.",
    },
    {
      question:
        "How does LMS integration work with Canvas, Blackboard, and Moodle?",
      answer:
        "FrontAccEase integrates seamlessly via standard 1EdTech LTI 1.3 Advantage specifications. Students launch interactive POUR modules and complete criterion quizzes directly within Canvas or Blackboard assignments without separate credentials, and grades automatically synchronize to the instructor gradebook.",
    },
    {
      question:
        "Can an instructor reallocate or add student seats mid-semester?",
      answer:
        "Yes! Course coordinators can add seats or increase scan pools instantly with prorated billing. If a student drops a course, their seat license can be instantly reassigned to another student or TA without extra charges.",
    },
  ]

  return (
    <div className="flex flex-col gap-16 pb-16 sm:gap-24 sm:pb-24 lg:gap-32 lg:pb-32">
      {/* =========================================================================
          1. HERO HEADER: HIGH-DENSITY DEVELOPER INSTRUMENTATION
          ========================================================================= */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-background via-muted/20 to-background pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Top Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary shadow-xs">
              <Sparkles className="size-3.5" aria-hidden="true" />
              <span>Transparent Higher-Ed &amp; Developer Licensing</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="font-mono font-bold text-foreground">
                WCAG 2.1 &amp; 2.2 AA/AAA Ready
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 max-w-4xl font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Predictable Plans Built For <br className="hidden sm:inline" />
              <span className="text-primary">
                Solo Developers &amp; Classrooms
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Whether you are an individual student mastering WCAG standards or
              a university department coordinating hundreds of student audits,
              FrontAccEase scales with transparent scan allowances.
            </p>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Check className="size-4 text-primary" />
                <span>14-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="size-4 text-primary" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="size-4 text-primary" />
                <span>FERPA &amp; Section 508 Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="size-4 text-primary" />
                <span>Canvas / Blackboard LTI 1.3 Compatible</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. WATERMELON UI PRICING BLOCK
          ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PricingBlock showDetailedLink={false} />
      </section>

      {/* =========================================================================
          3. THE CORE TRIO SCALING MATRIX (WATERMELON UI BENTO BLOCK)
          Explaining how Aria Analyzer, Mastery Analytics, and Aria Assistant scale
          ========================================================================= */}
      <section className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Core Trio Scaling"
          title="How Our Core Pillars Scale Across Plans"
          subtitle="Explore the exact diagnostic, analytical, and AI capabilities unlocked in each tier."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Pillar 1: ARIA Analyzer */}
          <Card className="flex flex-col justify-between border-border bg-card shadow-xs">
            <CardHeader className="space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileSearch className="size-5" />
              </div>
              <CardTitle className="text-base font-bold">
                1. ARIA Analyzer &amp; DOM Engine
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Automated DOM AST scanning, Chrome Extension MV3 localhost
                auditing, APCA/WCAG contrast check, and code diff generator.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Free:</span>
                <span>15 single-page scans / mo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Plus:</span>
                <span>100 solo / 150 pooled scans</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Premium:</span>
                <span>500 solo / 750 pooled + Batch URLs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">
                  Institutional:
                </span>
                <span>50,000+ pooled / Campus crawl</span>
              </div>
            </CardContent>
          </Card>

          {/* Pillar 2: Mastery Analytics Dashboard */}
          <Card className="flex flex-col justify-between border-border bg-card shadow-xs">
            <CardHeader className="space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BarChart3 className="size-5" />
              </div>
              <CardTitle className="text-base font-bold">
                2. WCAG Mastery Analytics Dashboard
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Telemetry tracking student and cohort performance across
                Perceivable, Operable, Understandable, and Robust standards.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Free:</span>
                <span>Personal progress overview</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Plus:</span>
                <span>POUR radar gauges &amp; badges</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Premium:</span>
                <span>Cohort diagnostics &amp; at-risk alerts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">
                  Institutional:
                </span>
                <span>Full LMS gradebook sync &amp; SLA</span>
              </div>
            </CardContent>
          </Card>

          {/* Pillar 3: Aria Assistant AI Companion */}
          <Card className="flex flex-col justify-between border-border bg-card shadow-xs">
            <CardHeader className="space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BotMessageSquare className="size-5" />
              </div>
              <CardTitle className="text-base font-bold">
                3. Aria Assistant AI Companion
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Conversational accessibility tutor trained on W3C WAI-ARIA
                techniques for accessible code refactoring.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Free:</span>
                <span>5 guidance queries / day</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Plus:</span>
                <span>Fast AST AI Qwen 2.5 (50 queries/day)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Premium:</span>
                <span>Dual AI (Gemini Flash + Qwen 2.5)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">
                  Institutional:
                </span>
                <span>Dual AI + Syllabus custom context</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* =========================================================================
          4. INTERACTIVE CLASSROOM SEAT & SCAN ESTIMATOR (WATERMELON UI CALCULATOR)
          ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Calculator Controls */}
            <div className="space-y-6 lg:col-span-6">
              <div className="space-y-2">
                <Badge
                  variant="secondary"
                  className="border-primary/20 bg-primary/10 font-semibold text-primary"
                >
                  <Calculator className="mr-1.5 size-3.5" />
                  Organization Seat &amp; Scan Estimator
                </Badge>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Calculate Your Classroom Quota
                </h2>
                <p className="text-sm text-muted-foreground">
                  Estimate total shared monthly scans and budget requirements
                  for your course sections, lab squads, or department.
                </p>
              </div>

              {/* Tier Selection Radio Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Select Target Tier:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcTier("plus")}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      calcTier === "plus"
                        ? "border-primary bg-primary/5 text-primary shadow-xs ring-1 ring-primary"
                        : "border-border bg-muted/30 text-foreground hover:bg-muted/60"
                    }`}
                  >
                    <div className="text-xs font-bold">Plus Org</div>
                    <div className="text-xs text-muted-foreground">
                      150 scans/user
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcTier("premium")}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      calcTier === "premium"
                        ? "border-primary bg-primary/5 text-primary shadow-xs ring-1 ring-primary"
                        : "border-border bg-muted/30 text-foreground hover:bg-muted/60"
                    }`}
                  >
                    <div className="text-xs font-bold">Premium Org</div>
                    <div className="text-xs text-muted-foreground">
                      750 scans/user
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcTier("institutional")}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      calcTier === "institutional"
                        ? "border-primary bg-primary/5 text-primary shadow-xs ring-1 ring-primary"
                        : "border-border bg-muted/30 text-foreground hover:bg-muted/60"
                    }`}
                  >
                    <div className="text-xs font-bold">Campus Wide</div>
                    <div className="text-xs text-muted-foreground">
                      Custom / Unlimited
                    </div>
                  </button>
                </div>
              </div>

              {/* Number of Seats Slider & Presets */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="seat-slider"
                    className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                  >
                    Number of Enrolled Student &amp; Faculty Seats:
                  </label>
                  <span className="font-heading text-lg font-bold text-foreground">
                    {calcSeats} {calcSeats === 1 ? "Seat" : "Seats"}
                  </span>
                </div>

                <input
                  id="seat-slider"
                  type="range"
                  min="5"
                  max="250"
                  step="5"
                  value={calcSeats}
                  onChange={(e) => setCalcSeats(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
                  aria-label="Adjust number of seats"
                />

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>5 Seats (Lab Squad)</span>
                  <span>30 Seats (Standard Class)</span>
                  <span>100 Seats (Cohort)</span>
                  <span>250+ (Department)</span>
                </div>
              </div>

              {/* Billing Cycle Selector */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs text-muted-foreground">
                  Billing Frequency:
                </span>
                <div className="inline-flex rounded-lg border border-border bg-muted/40 p-1">
                  <button
                    type="button"
                    onClick={() => setCalcCycle("yearly")}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                      calcCycle === "yearly"
                        ? "bg-background font-semibold text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Annual (Save 20%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcCycle("monthly")}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                      calcCycle === "monthly"
                        ? "bg-background font-semibold text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="lg:col-span-6">
              <div className="space-y-6 rounded-3xl border border-primary/20 bg-primary/5 p-6 shadow-sm sm:p-8">
                <div className="space-y-1">
                  <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                    Estimated Deployment Summary
                  </span>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {estimate.tierName}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-primary/15 py-4">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Total Monthly Shared Scans:
                    </span>
                    <div className="font-heading text-lg font-bold text-foreground sm:text-xl">
                      {estimate.totalPooledScans}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-muted-foreground">
                      Scan Quota / Seat:
                    </span>
                    <div className="font-heading text-lg font-bold text-foreground sm:text-xl">
                      {estimate.scansPerSeat}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-muted-foreground">
                      Rate Per User Seat:
                    </span>
                    <div className="font-heading text-base font-bold text-foreground sm:text-lg">
                      {estimate.costPerSeat}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-muted-foreground">
                      Total Estimated Cost:
                    </span>
                    <div className="font-heading text-base font-bold text-primary sm:text-lg">
                      {estimate.monthlyTotal}
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>
                      Includes shared pool access for all {calcSeats} enrolled
                      student accounts
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>
                      Instructor classroom analytics, grade export &amp; quiz
                      authoring suite
                    </span>
                  </div>
                </div>

                <div>
                  {estimate.isCustom ? (
                    <Link
                      to="/contact?subject=institutional-quote"
                      className={buttonVariants({
                        variant: "default",
                        size: "lg",
                        className:
                          "w-full justify-center font-semibold shadow-xs",
                      })}
                    >
                      <span>Request Campus Proposal</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  ) : (
                    <Link
                      to={`/signup?seats=${calcSeats}&plan=${calcTier}&cycle=${calcCycle}`}
                      className={buttonVariants({
                        variant: "default",
                        size: "lg",
                        className:
                          "w-full justify-center font-semibold shadow-xs",
                      })}
                    >
                      <span>Configure Organization Workspace</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SCAN ALLOCATION MODEL EXPLAINER (WATERMELON UI SPEC CARDS)
          ========================================================================= */}
      <section className="border-y border-border bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Scan Mechanics"
            title="Understanding Scan Allocations &amp; Quotas"
            subtitle="Transparent details on how scans are counted, refreshed, and pooled across your cohorts."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: What is 1 Scan? */}
            <Card className="flex flex-col justify-between border-border bg-card">
              <CardHeader className="space-y-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileSearch className="size-5" />
                </div>
                <CardTitle className="text-base font-bold">
                  What is 1 Scan?
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  One scan completely audits a live URL or uploaded DOM snapshot
                  against all 50+ WCAG 2.1 &amp; 2.2 AA rules, running contrast
                  formulas and ARIA validations.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-xs text-muted-foreground">
                <div className="rounded-xl bg-muted/60 p-3">
                  <strong className="text-foreground">Includes:</strong> Full
                  DOM inspection, severity score, and remediated code diff
                  generation.
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Solo vs Organization Pooling */}
            <Card className="flex flex-col justify-between border-border bg-card">
              <CardHeader className="space-y-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Users className="size-5" />
                </div>
                <CardTitle className="text-base font-bold">
                  Solo vs Pooled Quotas
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Solo plans grant personal non-shared quotas (15, 100, or 500
                  scans). Organization plans pool all seat quotas into a single
                  unified shared team balance.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-xs text-muted-foreground">
                <div className="rounded-xl bg-muted/60 p-3">
                  <strong className="text-foreground">Classrooms:</strong>{" "}
                  Allows high-activity lab projects without running out of
                  personal allowances.
                </div>
              </CardContent>
            </Card>

            {/* Card 3: AST vs Multimodal AI */}
            <Card className="flex flex-col justify-between border-border bg-card">
              <CardHeader className="space-y-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Zap className="size-5" />
                </div>
                <CardTitle className="text-base font-bold">
                  AI Remediation Models
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Plus plans use fast AST structural analysis (Qwen 2.5).
                  Premium &amp; Institutional plans unlock dual multimodal
                  reasoning (Gemini Flash) for complex UI states.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-xs text-muted-foreground">
                <div className="rounded-xl bg-muted/60 p-3">
                  <strong className="text-foreground">
                    Zero Extra AI Fees:
                  </strong>{" "}
                  AI code fixes are covered directly by your monthly scan
                  allowance.
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Rollover & Reset */}
            <Card className="flex flex-col justify-between border-border bg-card">
              <CardHeader className="space-y-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock className="size-5" />
                </div>
                <CardTitle className="text-base font-bold">
                  Rollover &amp; Reset Cycles
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Scan counts reset every 30 days from your billing date.
                  Premium and Institutional plans support 2x rollover to bridge
                  semester vacations.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-xs text-muted-foreground">
                <div className="rounded-xl bg-muted/60 p-3">
                  <strong className="text-foreground">Overage Safety:</strong>{" "}
                  We never auto-charge surprise fees when reaching scan limits.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. COMPREHENSIVE FEATURE COMPARISON MATRIX TABLE
          ========================================================================= */}
      <section className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Detailed Matrix"
          title="Compare Plans &amp; Capabilities"
          subtitle="Explore every feature across Free, Plus, Premium, and Institutional tiers."
        />

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xs">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="w-1/3 py-5 text-sm font-bold text-foreground">
                  Feature / Capability
                </TableHead>
                <TableHead className="py-5 text-center text-sm font-bold text-foreground">
                  Free
                </TableHead>
                <TableHead className="py-5 text-center text-sm font-bold text-foreground">
                  Plus
                </TableHead>
                <TableHead className="bg-primary/5 py-5 text-center text-sm font-bold text-primary">
                  Premium
                </TableHead>
                <TableHead className="py-5 text-center text-sm font-bold text-foreground">
                  Institutional
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {comparisonCategories.map((cat, catIdx) => (
                <div key={`cat-${catIdx}`}>
                  {/* Category Header Row */}
                  <TableRow className="border-b border-border bg-muted/60 hover:bg-muted/60">
                    <TableCell
                      colSpan={5}
                      className="py-3 font-heading text-xs font-bold tracking-wider text-foreground uppercase"
                    >
                      {cat.category}
                    </TableCell>
                  </TableRow>

                  {/* Feature Rows */}
                  {cat.features.map((feat, featIdx) => (
                    <TableRow
                      key={`feat-${catIdx}-${featIdx}`}
                      className="border-b border-border/60"
                    >
                      <TableCell className="py-3.5 text-xs font-medium text-foreground sm:text-sm">
                        {feat.name}
                      </TableCell>

                      {/* Free Col */}
                      <TableCell className="text-center text-xs text-muted-foreground">
                        {typeof feat.free === "boolean" ? (
                          feat.free ? (
                            <Check className="mx-auto size-4 text-primary" />
                          ) : (
                            <Minus className="mx-auto size-4 text-muted-foreground/40" />
                          )
                        ) : (
                          <span>{feat.free}</span>
                        )}
                      </TableCell>

                      {/* Plus Col */}
                      <TableCell className="text-center text-xs text-muted-foreground">
                        {typeof feat.plus === "boolean" ? (
                          feat.plus ? (
                            <Check className="mx-auto size-4 text-primary" />
                          ) : (
                            <Minus className="mx-auto size-4 text-muted-foreground/40" />
                          )
                        ) : (
                          <span className="font-medium text-foreground">
                            {feat.plus}
                          </span>
                        )}
                      </TableCell>

                      {/* Premium Col (Highlighted) */}
                      <TableCell className="bg-primary/5 text-center text-xs font-medium text-primary">
                        {typeof feat.premium === "boolean" ? (
                          feat.premium ? (
                            <Check className="mx-auto size-4 text-primary" />
                          ) : (
                            <Minus className="mx-auto size-4 text-muted-foreground/40" />
                          )
                        ) : (
                          <span>{feat.premium}</span>
                        )}
                      </TableCell>

                      {/* Institutional Col */}
                      <TableCell className="text-center text-xs text-muted-foreground">
                        {typeof feat.institutional === "boolean" ? (
                          feat.institutional ? (
                            <Check className="mx-auto size-4 text-primary" />
                          ) : (
                            <Minus className="mx-auto size-4 text-muted-foreground/40" />
                          )
                        ) : (
                          <span className="font-semibold text-foreground">
                            {feat.institutional}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </div>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* =========================================================================
          7. ACADEMIC GRANTS & INSTITUTIONAL PILOTS
          ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-muted/30 p-8 shadow-sm sm:p-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="space-y-4 lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <GraduationCap className="size-3.5" />
                <span>Academic Grant &amp; Pilot Program</span>
              </div>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                Are You A College Faculty Member Or Accessibility Researcher?
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                We believe web accessibility education belongs in every
                computing curriculum. Qualifying accredited higher-education
                departments can apply for funded 1-semester pilot grants with
                complete LMS setup and student seat allowances.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
              <Link
                to="/contact?subject=academic-grant"
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                  className:
                    "w-full justify-center font-semibold shadow-xs sm:w-auto",
                })}
              >
                Apply for Academic Pilot Grant
              </Link>
              <Link
                to="/about"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "w-full justify-center sm:w-auto",
                })}
              >
                Learn About Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FREQUENTLY ASKED QUESTIONS (ACCORDION)
          ========================================================================= */}
      <section className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about pricing, scan limits, billing, and institutional procurement."
        />

        <Accordion className="w-full space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="rounded-2xl border border-border bg-card px-4 py-2 shadow-xs"
            >
              <AccordionTrigger className="text-left font-heading text-sm font-semibold text-foreground sm:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* =========================================================================
          9. COMMAND-CENTER ACCESSIBLE CTA BANNER
          ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative space-y-6 overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-12 lg:p-16">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <ShieldCheck className="size-6" />
          </div>

          <div className="mx-auto max-w-2xl space-y-3">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Start Building Inclusive Software Today
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Create a free solo account in under 60 seconds, or book a guided
              walkthrough for your university department.
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
              to="/contact"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "w-full px-6 sm:w-auto",
              })}
            >
              Schedule Department Demo
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Check className="size-3.5 text-primary" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="size-3.5 text-primary" />
              <span>Instant Analyzer Access</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="size-3.5 text-primary" />
              <span>FERPA &amp; Section 508 Compliant</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { useState } from "react"
import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Sparkles,
  ArrowRight,
  Building2,
  User,
  Zap,
  ShieldCheck,
  FileSearch,
  BarChart3,
  BotMessageSquare,
} from "lucide-react"

interface PricingBlockProps {
  showDetailedLink?: boolean
  className?: string
  defaultAudience?: "solo" | "organization"
}

export default function PricingBlock({
  showDetailedLink = true,
  className = "",
  defaultAudience = "solo",
}: PricingBlockProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "yearly"
  )
  const [audience, setAudience] = useState<"solo" | "organization">(
    defaultAudience
  )

  const isYearly = billingCycle === "yearly"

  const plans = [
    {
      id: "free",
      name: "Free",
      badge: "Forever Free",
      description:
        audience === "solo"
          ? "For individual IT students and developers exploring core web accessibility."
          : "Trial access for individual educators to evaluate the diagnostic scanning engine.",
      price: {
        monthly: 0,
        yearly: 0,
      },
      scansBadge:
        audience === "solo" ? "15 Scans / month" : "15 Scans / user / mo",
      scansDetail:
        audience === "solo"
          ? "15 standard DOM audits refreshed every 30 days"
          : "Solo evaluation license (team pooling disabled)",
      coreTrioFeatures: [
        {
          label: "Aria Analyzer",
          detail: "Single URL scan & DOM inspector",
          icon: FileSearch,
        },
        {
          label: "Mastery Analytics",
          detail: "Individual principle progress overview",
          icon: BarChart3,
        },
        {
          label: "Aria Assistant",
          detail: "5 interactive WCAG queries / day",
          icon: BotMessageSquare,
        },
      ],
      features: [
        "15 Live page scans / month",
        "WCAG 2.1 Level A & AA basic rules",
        "3 Core POUR interactive modules",
        "Basic issue severity breakdown",
        "Local DOM contrast inspector",
        "Community forum support",
      ],
      ctaText: "Start For Free",
      ctaLink: "/signup",
      ctaVariant: "outline" as const,
      highlighted: false,
    },
    {
      id: "plus",
      name: "Plus",
      badge: "Student & Solo Pro",
      description:
        audience === "solo"
          ? "Essential for CS students, capstone teams, and freelance frontend engineers."
          : "Structured tier for project squads, teaching labs, and course sections.",
      price: {
        monthly: 12,
        yearly: 9,
      },
      scansBadge:
        audience === "solo" ? "100 Scans / month" : "150 Scans / user / mo",
      scansDetail:
        audience === "solo"
          ? "100 high-speed automated scans for active development"
          : "150 pooled scans per seat with shared lab quotas",
      coreTrioFeatures: [
        {
          label: "Aria Analyzer",
          detail: "Fast AST scanner + Chrome Extension MV3",
          icon: FileSearch,
        },
        {
          label: "Mastery Analytics",
          detail: "POUR radar gauges & milestone badges",
          icon: BarChart3,
        },
        {
          label: "Aria Assistant",
          detail: "Fast AST AI remediation (50 queries/day)",
          icon: BotMessageSquare,
        },
      ],
      features: [
        audience === "solo"
          ? "100 Automated scans / month"
          : "150 Pooled scans / seat / month",
        "Full WCAG 2.1 & 2.2 Level AA rule suite",
        "All 12+ POUR interactive modules",
        "Fast AST AI code remediation (Qwen 2.5)",
        "Downloadable PDF & JSON audit reports",
        "Vision simulation & contrast calculator",
        "Priority email ticket support",
      ],
      ctaText: "Get Started with Plus",
      ctaLink: "/signup?plan=plus",
      ctaVariant: "outline" as const,
      highlighted: false,
    },
    {
      id: "premium",
      name: "Premium",
      badge: "Most Popular",
      description:
        audience === "solo"
          ? "For senior engineers, accessibility auditors, and power creators."
          : "For university professors and faculty managing multiple cohorts and labs.",
      price: {
        monthly: 29,
        yearly: 24,
      },
      scansBadge:
        audience === "solo" ? "500 Scans / month" : "750 Scans / user / mo",
      scansDetail:
        audience === "solo"
          ? "500 multimodal scans + batch analysis"
          : "750 pooled scans / user with 2x rollover allowance",
      coreTrioFeatures: [
        {
          label: "Aria Analyzer",
          detail: "Batch URL scanner (20 URLs) + local server audit",
          icon: FileSearch,
        },
        {
          label: "Mastery Analytics",
          detail: "Cohort principle telemetry & at-risk alerts",
          icon: BarChart3,
        },
        {
          label: "Aria Assistant",
          detail: "Dual AI (Gemini Flash + Qwen 2.5) unlimited",
          icon: BotMessageSquare,
        },
      ],
      features: [
        audience === "solo"
          ? "500 Multimodal scans / month"
          : "750 Pooled scans / seat / month (with 2x rollover)",
        "Dual AI Remediation (Gemini Flash + Qwen 2.5)",
        "Batch URL scanning (up to 20 URLs at once)",
        "Interactive Quiz & Module Authoring Studio",
        "Cohort principle telemetry & at-risk alerts",
        "Exportable academic gradebook & audit logs",
        "Priority email triage & onboarding guide",
      ],
      ctaText: "Start Free 14-Day Trial",
      ctaLink: "/signup?plan=premium",
      ctaVariant: "default" as const,
      highlighted: true,
    },
    {
      id: "institutional",
      name: "Institutional",
      badge: "Campus & Enterprise",
      description:
        audience === "solo"
          ? "For university faculty leadership and enterprise accessibility operations."
          : "Campus-wide accessibility education, LMS integration, and administrative controls.",
      price: {
        monthly: "Custom",
        yearly: "Custom",
      },
      scansBadge: "Unlimited / High-Volume",
      scansDetail:
        "50,000+ pooled monthly scans with custom sub-department allocations",
      coreTrioFeatures: [
        {
          label: "Aria Analyzer",
          detail: "Full-domain crawl & Chrome extension fleet",
          icon: FileSearch,
        },
        {
          label: "Mastery Analytics",
          detail: "Campus-wide LMS grade sync & compliance SLA",
          icon: BarChart3,
        },
        {
          label: "Aria Assistant",
          detail: "Enterprise fine-tuned AI with syllabus context",
          icon: BotMessageSquare,
        },
      ],
      features: [
        "Unlimited or customized scan quotas",
        "LMS Integration (Canvas, Blackboard, Moodle LTI 1.3)",
        "Single Sign-On (SAML, Okta, Azure AD, Google)",
        "Unlimited student & faculty account seats",
        "Automated grading sync & custom rubrics",
        "FERPA, ADA Section 508 & WCAG SLA compliance",
        "Dedicated accessibility architect & live training",
        "Custom billing options (PO / Wire / Net 30)",
      ],
      ctaText: "Contact Institutional Sales",
      ctaLink: "/contact?subject=institutional",
      ctaVariant: "outline" as const,
      highlighted: false,
    },
  ]

  return (
    <div className={`space-y-10 ${className}`}>
      {/* =========================================================================
          CONTROLS: AUDIENCE SELECTOR & BILLING SWITCHER (WATERMELON UI CONTROL BLOCK)
          ========================================================================= */}
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:justify-between">
        {/* Audience Segment Switcher */}
        <div
          role="tablist"
          aria-label="Select audience perspective"
          className="inline-flex rounded-2xl border border-border bg-muted/50 p-1.5 shadow-xs"
        >
          <button
            type="button"
            role="tab"
            aria-selected={audience === "solo"}
            onClick={() => setAudience("solo")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
              audience === "solo"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="size-4" aria-hidden="true" />
            <span>Solo &amp; Freelancers</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={audience === "organization"}
            onClick={() => setAudience("organization")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
              audience === "organization"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Building2 className="size-4" aria-hidden="true" />
            <span>Classrooms &amp; Organizations</span>
          </button>
        </div>

        {/* Billing Interval Switcher */}
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-medium sm:text-sm ${
              !isYearly ? "font-bold text-foreground" : "text-muted-foreground"
            }`}
          >
            Monthly
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={isYearly}
            aria-label="Toggle annual billing discount"
            onClick={() => setBillingCycle(isYearly ? "monthly" : "yearly")}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              isYearly ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          >
            <span
              className={`pointer-events-none inline-block size-5 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out ${
                isYearly ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>

          <span
            className={`flex items-center gap-1.5 text-xs font-medium sm:text-sm ${
              isYearly ? "font-bold text-foreground" : "text-muted-foreground"
            }`}
          >
            <span>Annual</span>
            <Badge
              variant="secondary"
              className="border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400"
            >
              Save 20%
            </Badge>
          </span>
        </div>
      </div>

      {/* =========================================================================
          PRICING CARDS GRID (WATERMELON UI HIGH-TIER CARDS)
          ========================================================================= */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => {
          const isNumeric = typeof plan.price.yearly === "number"
          const displayPrice = isNumeric
            ? isYearly
              ? plan.price.yearly
              : plan.price.monthly
            : plan.price.yearly

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl border transition-all duration-200 ${
                plan.highlighted
                  ? "border-primary bg-card shadow-xl ring-1 ring-primary/25 hover:shadow-2xl dark:bg-card/95"
                  : "border-border bg-card/60 hover:border-border/80 hover:bg-card hover:shadow-sm"
              } p-6 sm:p-7`}
            >
              {/* Highlight Badge */}
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                    <Sparkles className="size-3.5" aria-hidden="true" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Card Body */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {plan.name}
                  </h3>
                  {!plan.highlighted && (
                    <Badge
                      variant="outline"
                      className="text-xs text-muted-foreground"
                    >
                      {plan.badge}
                    </Badge>
                  )}
                </div>

                <p className="min-h-10 text-xs leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="border-y border-border/70 py-4">
                  <div className="flex items-baseline gap-1">
                    {isNumeric ? (
                      <>
                        <span className="font-heading text-4xl font-extrabold tracking-tight text-foreground">
                          ${displayPrice}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                          / user / mo
                        </span>
                      </>
                    ) : (
                      <span className="font-heading text-3xl font-extrabold tracking-tight text-foreground">
                        {displayPrice}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {isNumeric && Number(displayPrice) > 0
                      ? isYearly
                        ? "Billed annually ($" +
                          Number(displayPrice) * 12 +
                          "/user/yr)"
                        : "Billed monthly"
                      : isNumeric
                        ? "Free forever, no credit card required"
                        : "Tailored to your campus enrollment scale"}
                  </p>
                </div>

                {/* Key Scan Allowance Highlight Pill */}
                <div className="space-y-1.5 rounded-2xl border border-primary/20 bg-primary/5 p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                    <FileSearch className="size-3.5" />
                    <span>Scan Allowance:</span>
                  </div>
                  <div className="font-heading text-sm font-extrabold text-foreground">
                    {plan.scansBadge}
                  </div>
                  <p className="text-xs leading-tight text-muted-foreground">
                    {plan.scansDetail}
                  </p>
                </div>

                {/* Core Trio Capabilities Mini-Matrix */}
                <div className="space-y-2 rounded-2xl border border-border bg-muted/30 p-3">
                  <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Core Trio Inclusions:
                  </span>
                  <div className="space-y-1.5 text-xs">
                    {plan.coreTrioFeatures.map((trio, tIdx) => {
                      const TrioIcon = trio.icon
                      return (
                        <div
                          key={tIdx}
                          className="flex items-start gap-2 text-foreground"
                        >
                          <TrioIcon className="mt-0.5 size-3.5 shrink-0 text-primary" />
                          <div>
                            <span className="font-semibold">
                              {trio.label}:{" "}
                            </span>
                            <span className="text-muted-foreground">
                              {trio.detail}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Plan Specifications:
                  </span>
                  <ul className="space-y-2 text-xs" role="list">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        <span className="text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card CTA */}
              <div className="pt-6">
                <Link
                  to={plan.ctaLink}
                  className={buttonVariants({
                    variant: plan.ctaVariant,
                    className: "w-full justify-center font-semibold shadow-xs",
                  })}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* =========================================================================
          ORGANIZATION SCAN POOLING EXPLAINER (WATERMELON UI CALLOUT BANNER)
          ========================================================================= */}
      <div className="rounded-3xl border border-border bg-muted/40 p-6 shadow-xs sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Zap className="size-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-heading text-sm font-bold text-foreground sm:text-base">
                How Does Scan Pooling Work for Classrooms &amp; Organizations?
              </h4>
              <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                In classrooms and engineering teams, monthly scans are pooled
                into a single unified shared quota. For example, a classroom of
                30 students on Plus gets{" "}
                <strong className="font-semibold text-foreground">
                  4,500 total scans/month
                </strong>{" "}
                shared across all lab assignments with instructor telemetry
                oversight.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span>WCAG 2.1 &amp; 2.2 AA Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Link to Full Pricing Matrix */}
      {showDetailedLink && (
        <div className="flex flex-col items-center justify-center gap-2 pt-2 text-center">
          <p className="text-xs text-muted-foreground sm:text-sm">
            Need a granular feature-by-feature matrix, dynamic seat quota
            calculator, or academic procurement details?
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-primary hover:underline"
          >
            <span>View Complete Pricing &amp; Comparison Matrix</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      )}
    </div>
  )
}

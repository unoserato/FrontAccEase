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
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly")
  const [audience, setAudience] = useState<"solo" | "organization">(defaultAudience)

  const isYearly = billingCycle === "yearly"

  const plans = [
    {
      id: "free",
      name: "Free",
      badge: "Forever Free",
      description:
        audience === "solo"
          ? "Ideal for students and curious developers exploring accessibility basics."
          : "Trial access for individual educators to test the scanning engine.",
      price: {
        monthly: 0,
        yearly: 0,
      },
      scansBadge:
        audience === "solo" ? "15 Scans / month" : "15 Scans / user / mo",
      scansDetail:
        audience === "solo"
          ? "15 standard DOM audits refreshed every 30 days"
          : "Solo trial account (team pooling unavailable)",
      features: [
        "15 Live page scans / month",
        "WCAG 2.1 Level A & AA basic checks",
        "3 Core POUR learning modules",
        "Single-page DOM inspector",
        "Basic issue severity breakdown",
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
          ? "Essential for IT students, capstone projects, and freelance engineers."
          : "Structured tier for project squads and small research labs.",
      price: {
        monthly: 12,
        yearly: 9,
      },
      scansBadge:
        audience === "solo" ? "100 Scans / month" : "150 Scans / user / mo",
      scansDetail:
        audience === "solo"
          ? "100 high-speed scans for ongoing development"
          : "150 pooled scans per seat with team quota sharing",
      features: [
        audience === "solo"
          ? "100 Automated scans / month"
          : "150 Pooled scans / seat / month",
        "Full WCAG 2.1 & 2.2 Level AA suite",
        "All 12+ POUR interactive modules",
        "Fast AST AI code remediation (Qwen 2.5)",
        "Downloadable PDF & JSON audit reports",
        "Aria Assistant tutor (50 queries / day)",
        "Color contrast & visual simulation tools",
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
          ? "For senior developers, consultants, and power accessibility advocates."
          : "For educators managing multiple class sections, departments, and cohorts.",
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
      features: [
        audience === "solo"
          ? "500 Multimodal scans / month"
          : "750 Pooled scans / seat / month (with rollover)",
        "Dual AI Remediation (Gemini Flash + Qwen 2.5)",
        "Batch URL scanning (up to 20 URLs at once)",
        "Classroom & student cohort analytics",
        "Interactive Quiz and Module authoring studio",
        "Principle-by-principle mastery telemetry",
        "Exportable academic gradebook & audit logs",
        "Priority email & triage support",
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
          ? "For university faculty and enterprise organizations requiring high volume."
          : "Campus-wide accessibility education, LMS integration, and administrative controls.",
      price: {
        monthly: "Custom",
        yearly: "Custom",
      },
      scansBadge: "Unlimited / High-Volume",
      scansDetail:
        "5,000+ pooled monthly scans with custom per-department allocations",
      features: [
        "Unlimited or customized scan quotas",
        "LMS Integration (Canvas, Blackboard, Moodle LTI 1.3)",
        "Single Sign-On (SAML, Okta, Google Workspace)",
        "Unlimited instructor & student accounts",
        "Automated grading sync & custom rubrics",
        "FERPA, ADA Section 508 & WCAG SLA compliance",
        "Dedicated accessibility architect & onboarding",
        "Custom institutional billing (PO / Wire / Net 30)",
      ],
      ctaText: "Contact Sales & Pilots",
      ctaLink: "/contact?subject=institutional",
      ctaVariant: "outline" as const,
      highlighted: false,
    },
  ]

  return (
    <div className={`space-y-10 ${className}`}>
      {/* Controls: Audience Selector & Billing Switcher */}
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:justify-between">
        {/* Audience Segment Pill Switcher */}
        <div className="inline-flex rounded-xl border border-border bg-muted/50 p-1">
          <button
            type="button"
            onClick={() => setAudience("solo")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
              audience === "solo"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="size-3.5" />
            <span>Solo &amp; Students</span>
          </button>
          <button
            type="button"
            onClick={() => setAudience("organization")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
              audience === "organization"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Building2 className="size-3.5" />
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
              className="border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400"
            >
              Save 20%
            </Badge>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
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
              className={`relative flex flex-col justify-between rounded-2xl border transition-all duration-200 ${
                plan.highlighted
                  ? "border-primary bg-card shadow-lg ring-1 ring-primary/20 hover:shadow-xl dark:bg-card/90"
                  : "border-border bg-card/60 hover:border-border/80 hover:bg-card hover:shadow-sm"
              } p-6`}
            >
              {/* Highlight Badge */}
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                    <Sparkles className="size-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {plan.name}
                  </h3>
                  {!plan.highlighted && (
                    <Badge variant="outline" className="text-xs text-muted-foreground">
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
                        ? "Billed annually ($" + Number(displayPrice) * 12 + "/yr)"
                        : "Billed monthly"
                      : isNumeric
                      ? "Free forever, no credit card required"
                      : "Tailored to your campus or enterprise scale"}
                  </p>
                </div>

                {/* Key Scan Allowance Highlight Pill */}
                <div className="space-y-1.5 rounded-xl border border-primary/15 bg-primary/5 p-3">
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

                {/* Feature List */}
                <div className="space-y-2.5 pt-2">
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    What's included:
                  </p>
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

      {/* Organization Scan Pooling Explainer Banner */}
      <div className="rounded-2xl border border-border bg-muted/40 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3.5">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Zap className="size-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-heading text-sm font-bold text-foreground sm:text-base">
                How Do Scan Allowances Work for Organizations?
              </h4>
              <p className="max-w-2xl text-xs text-muted-foreground leading-relaxed sm:text-sm">
                In classrooms and teams, monthly scans are pooled across all active seats. For instance, a classroom of 30 students on Plus gets{" "}
                <strong className="text-foreground">4,500 total scans/month</strong> shared across lab assignments with instructor oversight.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
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
            Need a detailed feature breakdown, custom seat calculation, or academic procurement details?
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

import { Link } from "react-router-dom"
import { ShieldCheck, CheckCircle2, ArrowUpRight } from "lucide-react"

export default function PublicFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/30 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="space-y-4 lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
                <ShieldCheck className="size-4" aria-hidden="true" />
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                FrontAccEase
              </span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              Learn accessibility through understanding, assessment, and analysis. Empowering IT students, educators, and developers to build an inclusive digital web.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">
                <CheckCircle2 className="size-3.5" />
                WCAG 2.1 &amp; 2.2 AA Aligned
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-foreground">
              Product
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground" role="list">
              <li>
                <Link
                  to="/features"
                  className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                >
                  Features &amp; Modules
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="transition-colors hover:text-foreground focus-visible:outline-primary"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="transition-colors hover:text-foreground focus-visible:outline-primary"
                >
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/accessibility"
                  className="transition-colors hover:text-foreground focus-visible:outline-primary"
                >
                  WCAG &amp; POUR Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/learner/analyzer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                >
                  <span>Aria Analyzer Tool</span>
                  <ArrowUpRight className="size-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-foreground">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground" role="list">
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-foreground focus-visible:outline-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-foreground focus-visible:outline-primary"
                >
                  Contact &amp; Support
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="transition-colors hover:text-foreground focus-visible:outline-primary"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="transition-colors hover:text-foreground focus-visible:outline-primary"
                >
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-foreground">
              Legal &amp; Compliance
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground" role="list">
              <li>
                <Link
                  to="/privacy"
                  className="transition-colors hover:text-foreground focus-visible:outline-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="transition-colors hover:text-foreground focus-visible:outline-primary"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/accessibility-statement"
                  className="transition-colors hover:text-foreground focus-visible:outline-primary"
                >
                  Accessibility Statement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Role Demo Shortcuts Strip */}
        <div className="mt-12 rounded-xl border border-border bg-card p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Platform Experience Environments
              </p>
              <p className="text-xs text-muted-foreground">
                Explore dedicated interfaces designed for each educational role:
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/learner/dashboard"
                className="rounded-md border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Learner Workspace
              </Link>
              <Link
                to="/instructor/dashboard"
                className="rounded-md border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Instructor Portal
              </Link>
              <Link
                to="/admin/dashboard"
                className="rounded-md border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Admin Oversight
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {currentYear} FrontAccEase. All rights reserved. Designed for web accessibility education.</p>
          <div className="flex items-center gap-4">
            <Link to="/accessibility-statement" className="hover:underline">
              WCAG 2.1 AA Conformance
            </Link>
            <span>•</span>
            <Link to="/privacy" className="hover:underline">
              Student Data Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

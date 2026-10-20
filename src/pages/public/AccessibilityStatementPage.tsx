import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Mail } from "lucide-react"

export default function AccessibilityStatementPage() {
  const lastReviewed = "September 2026"

  return (
    <div className="flex flex-col gap-12 pb-16 sm:gap-16 sm:pb-24">
      {/* Header */}
      <section className="border-b border-border/60 bg-gradient-to-b from-background via-muted/20 to-background pt-12 pb-12 sm:pt-16 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Conformance Statement
          </Badge>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Accessibility Statement
          </h1>
          <p className="text-sm text-muted-foreground">
            Our Commitment to Universal Accessibility • Last Reviewed: {lastReviewed}
          </p>
        </div>
      </section>

      {/* Main Statement Document */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-xs space-y-8 text-sm text-muted-foreground leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-foreground">
              1. Our Conformance Commitment
            </h2>
            <p>
              At FrontAccEase, accessibility is our core educational mission, and we practice what we teach. We are committed to ensuring digital accessibility for people with disabilities by continuously improving user experience for everyone and applying the relevant accessibility standards.
            </p>
            <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 p-4 text-foreground font-medium">
              <CheckCircle2 className="size-5 text-primary shrink-0" />
              <span>
                FrontAccEase aims to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 and 2.2 at Level AA</strong>.
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-foreground">
              2. Measures Taken to Support Accessibility
            </h2>
            <p>
              FrontAccEase takes the following measures across our platform and learning interfaces:
            </p>
            <ul className="list-disc pl-5 space-y-2" role="list">
              <li>
                <strong className="text-foreground">Semantic HTML5 Architecture:</strong> We employ native semantic elements (`&lt;header&gt;`, `&lt;nav&gt;`, `&lt;main&gt;`, `&lt;section&gt;`, `&lt;article&gt;`, `&lt;footer&gt;`) to ensure assistive technology can parse document structure accurately.
              </li>
              <li>
                <strong className="text-foreground">Full Keyboard Operability:</strong> All interactive controls, dropdowns, dialogs, and learning module tabs are fully navigable and operable using only a keyboard (Tab, Shift+Tab, Enter, Space, Escape, Arrow keys).
              </li>
              <li>
                <strong className="text-foreground">Visible Focus Indicators:</strong> We maintain high-visibility outline rings for all focused elements and never suppress focus outlines without accessible replacements.
              </li>
              <li>
                <strong className="text-foreground">Accessible Color Contrast:</strong> All text and essential graphical controls meet or exceed the minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text and UI components across both light and dark themes.
              </li>
              <li>
                <strong className="text-foreground">Color Independence:</strong> Meaning is never conveyed by color alone; text labels, status badges, and descriptive icons accompany all state changes.
              </li>
              <li>
                <strong className="text-foreground">Motion Reduction Respect:</strong> We honor the user&apos;s <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">prefers-reduced-motion</code> system preference.
              </li>
              <li>
                <strong className="text-foreground">Skip to Main Content:</strong> A dedicated keyboard skip link is available at the top of every public and application route.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-foreground">
              3. Assistive Technology Compatibility
            </h2>
            <p>
              FrontAccEase is designed to be compatible with modern assistive technologies, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5" role="list">
              <li>NVDA and JAWS on Windows</li>
              <li>VoiceOver on macOS and iOS</li>
              <li>TalkBack on Android</li>
              <li>Modern standards-compliant web browsers (Chrome, Firefox, Safari, Edge)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-foreground">
              4. Feedback &amp; Contact Information
            </h2>
            <p>
              We welcome your feedback on the accessibility of FrontAccEase. If you encounter accessibility barriers or have suggestions for improvement, please let us know:
            </p>
            <div className="rounded-xl border border-border bg-muted/40 p-4 space-y-2">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <Mail className="size-4 text-primary" />
                <span>Accessibility Coordinator:</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Email: <strong className="text-foreground">accessibility@frontaccease.com</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                We strive to respond to accessibility inquiries within 2 business days and implement continuous remediation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Badge } from "@/components/ui/badge"

export default function PrivacyPage() {
  const lastUpdated = "September 2026"

  return (
    <div className="flex flex-col gap-12 pb-16 sm:gap-16 sm:pb-24">
      {/* Header */}
      <section className="border-b border-border/60 bg-gradient-to-b from-background via-muted/20 to-background pt-12 pb-12 sm:pt-16 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Legal &amp; Data Governance
          </Badge>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Effective Date: {lastUpdated} • FrontAccEase Educational Platform
          </p>
        </div>
      </section>

      {/* Main Privacy Document */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-xs space-y-8 text-sm text-muted-foreground leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-foreground">
              1. Overview &amp; Educational Commitment
            </h2>
            <p>
              FrontAccEase (&quot;we,&quot; &quot;our,&quot; or &quot;the Platform&quot;) is committed to protecting the privacy of students, instructors, and academic administrators. This Privacy Policy outlines how we collect, use, and safeguard personal information and diagnostic telemetry generated while using our accessibility learning modules and Aria Analyzer tools.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-foreground">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-1.5" role="list">
              <li>
                <strong className="text-foreground">Account Information:</strong> Full name, institutional email address, and authentication credentials.
              </li>
              <li>
                <strong className="text-foreground">Learning &amp; Assessment Telemetry:</strong> Module completion timestamps, quiz scores, question response logs, and principle mastery metrics (Perceivable, Operable, Understandable, Robust).
              </li>
              <li>
                <strong className="text-foreground">Aria Analyzer Data:</strong> Public URLs analyzed by students and instructors, scanned DOM trees, and generated remediation audit logs. We do not store sensitive user session tokens or authentication state from third-party sites tested in Aria Analyzer.
              </li>
              <li>
                <strong className="text-foreground">Technical Device Data:</strong> Browser user-agent, operating system, preferred color scheme (light/dark mode), and viewport metrics to optimize accessible rendering.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-foreground">
              3. How We Use Collected Information
            </h2>
            <p>
              All data collected is used strictly for legitimate educational purposes, specifically:
            </p>
            <ul className="list-disc pl-5 space-y-1.5" role="list">
              <li>Enabling students to resume learning modules and review quiz explanations.</li>
              <li>Providing instructors with aggregate classroom telemetry and diagnostic grade reports.</li>
              <li>Powering Aria Assistant with context to explain relevant WCAG success criteria.</li>
              <li>Improving the accuracy and performance of our automated accessibility rules engine.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-foreground">
              4. Data Sharing &amp; Third Parties
            </h2>
            <p>
              We do <strong>not</strong> sell, rent, or monetize student or instructor data. We do not display third-party behavioral advertisements. Telemetry may be shared only with verified course instructors managing your classroom cohort.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-foreground">
              5. Student Data Privacy &amp; Security
            </h2>
            <p>
              We enforce industry-standard security safeguards including TLS encryption in transit, encrypted storage, and role-based access controls to prevent unauthorized access to student records.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-foreground">
              6. Contact Information
            </h2>
            <p>
              For questions regarding this privacy policy or data requests, please contact our data governance team at <strong className="text-foreground">privacy@frontaccease.com</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

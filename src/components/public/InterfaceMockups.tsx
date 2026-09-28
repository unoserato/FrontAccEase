import { useState } from "react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  FileSearch2,
  BookOpen,
  BotMessageSquare,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Search,
  ExternalLink,
} from "lucide-react"

export function HeroInterfacePreview() {
  const [activeTab, setActiveTab] = useState<"analyzer" | "module" | "assistant" | "instructor">("analyzer")
  const [copiedCode, setCopiedCode] = useState(false)
  const [quizSelected, setQuizSelected] = useState<number | null>(null)
  const [quizAnswerChecked, setQuizAnswerChecked] = useState(false)

  const handleCopy = () => {
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl transition-all">
      {/* Top Application Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-border bg-muted/60 px-4 py-2.5 sm:px-6 gap-2">
        <div className="flex items-center gap-2">
          <div className="flex size-3 items-center justify-center rounded-full bg-destructive/70" />
          <div className="flex size-3 items-center justify-center rounded-full bg-amber-500/70" />
          <div className="flex size-3 items-center justify-center rounded-full bg-emerald-500/70" />
          <span className="ml-2 font-mono text-xs font-medium text-muted-foreground">
            app.frontaccease.com
          </span>
        </div>

        {/* Accessible WAI-ARIA Tablist Switcher */}
        <div
          role="tablist"
          aria-label="Platform preview modes"
          className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-background p-0.5 text-xs font-medium"
        >
          <button
            role="tab"
            id="tab-analyzer"
            aria-selected={activeTab === "analyzer"}
            aria-controls="panel-analyzer"
            onClick={() => setActiveTab("analyzer")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all focus-visible:outline-2 focus-visible:outline-primary ${
              activeTab === "analyzer"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileSearch2 className="size-3.5" />
            <span>Aria Analyzer</span>
          </button>
          <button
            role="tab"
            id="tab-module"
            aria-selected={activeTab === "module"}
            aria-controls="panel-module"
            onClick={() => setActiveTab("module")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all focus-visible:outline-2 focus-visible:outline-primary ${
              activeTab === "module"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="size-3.5" />
            <span>Core Modules</span>
          </button>
          <button
            role="tab"
            id="tab-assistant"
            aria-selected={activeTab === "assistant"}
            aria-controls="panel-assistant"
            onClick={() => setActiveTab("assistant")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all focus-visible:outline-2 focus-visible:outline-primary ${
              activeTab === "assistant"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BotMessageSquare className="size-3.5" />
            <span>Aria Assistant</span>
          </button>
          <button
            role="tab"
            id="tab-instructor"
            aria-selected={activeTab === "instructor"}
            aria-controls="panel-instructor"
            onClick={() => setActiveTab("instructor")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all focus-visible:outline-2 focus-visible:outline-primary ${
              activeTab === "instructor"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="size-3.5" />
            <span>Instructor View</span>
          </button>
        </div>
      </div>

      {/* Main Mockup Viewport */}
      <div className="p-4 sm:p-6 lg:p-7 min-h-96 flex flex-col justify-between">
        {activeTab === "analyzer" && (
          <div
            id="panel-analyzer"
            role="tabpanel"
            aria-labelledby="tab-analyzer"
            className="space-y-4"
          >
            {/* Analyzer URL bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 p-3 sm:p-4">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <Search className="size-4 text-primary shrink-0" />
                <div className="flex-1 font-mono text-xs sm:text-sm text-foreground truncate">
                  https://portal.university.edu/registration/courses
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs">
                  <CheckCircle2 className="size-3 mr-1" />
                  Audit Passed (86/100)
                </Badge>
                <Badge variant="outline" className="text-xs">
                  WCAG 2.1 AA
                </Badge>
              </div>
            </div>

            {/* POUR Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="rounded-lg border border-border bg-card p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Perceivable</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">92%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-11/12" />
                </div>
                <span className="text-xs text-muted-foreground">1 issue detected</span>
              </div>

              <div className="rounded-lg border border-border bg-card p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Operable</span>
                  <span className="text-xs font-bold text-amber-500">76%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-3/4" />
                </div>
                <span className="text-xs text-muted-foreground">3 issues detected</span>
              </div>

              <div className="rounded-lg border border-border bg-card p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Understandable</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">95%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-11/12" />
                </div>
                <span className="text-xs text-muted-foreground">0 critical issues</span>
              </div>

              <div className="rounded-lg border border-border bg-card p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Robust</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">88%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-4/5" />
                </div>
                <span className="text-xs text-muted-foreground">1 issue detected</span>
              </div>
            </div>

            {/* Findings List & Remediation */}
            <div className="rounded-xl border border-border bg-card p-3.5 sm:p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="size-4 text-amber-500" />
                  <span className="text-xs sm:text-sm font-semibold text-foreground">
                    Violation: Guideline 2.4.7 Focus Visible (Level AA)
                  </span>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  &lt;button.nav-toggle&gt;
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Interactive element has <code className="rounded bg-muted px-1 py-0.5 text-foreground font-mono">outline: none</code> with no replacement visible focus indicator for keyboard navigation.
              </p>
              
              {/* Code Fix Diff */}
              <div className="rounded-lg bg-muted/70 p-3 font-mono text-xs space-y-1 overflow-x-auto border border-border/60">
                <div className="flex items-center justify-between text-muted-foreground pb-1 border-b border-border/40 text-xs">
                  <span>AI Remediation Suggestion</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 hover:text-foreground transition-colors font-sans"
                    aria-label="Copy remediation snippet"
                  >
                    {copiedCode ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                    <span>{copiedCode ? "Copied to Clipboard!" : "Copy Fix"}</span>
                  </button>
                </div>
                <div className="text-destructive line-through">
                  - button.nav-toggle &#123; outline: none; &#125;
                </div>
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  + button.nav-toggle:focus-visible &#123; outline: 2px solid var(--primary); outline-offset: 2px; &#125;
                </div>
              </div>

              {/* Action Link to Live Analyzer */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-muted-foreground">
                  Want to audit your own website or student portfolio?
                </span>
                <Link
                  to="/learner/analyzer"
                  className={buttonVariants({ variant: "outline", size: "xs" })}
                >
                  <span>Open Full Aria Analyzer</span>
                  <ExternalLink className="size-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === "module" && (
          <div
            id="panel-module"
            role="tabpanel"
            aria-labelledby="tab-module"
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Principle 1: Perceivable
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">Topic 1.1</span>
                </div>
                <h4 className="font-heading font-bold text-base sm:text-lg text-foreground mt-1">
                  Text Alternatives &amp; Semantic Image Roles
                </h4>
              </div>
              <Badge variant="outline" className="w-fit text-xs font-medium">
                Lesson 2 of 6 • 15 min
              </Badge>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                All non-text content presented to the user must have a text alternative that serves the equivalent purpose, conforming to <strong className="text-foreground">WCAG 1.1.1 (Level A)</strong>.
              </p>
            </div>

            {/* Interactive Concept Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 space-y-2">
                <div className="flex items-center gap-1.5 text-destructive font-semibold text-xs">
                  <XCircle className="size-3.5" />
                  <span>Non-Compliant Pattern</span>
                </div>
                <pre className="font-mono text-xs text-foreground/80 bg-background/80 p-2 rounded border border-border">
                  {`<img src="chart.png">\n<!-- Missing alt description -->`}
                </pre>
                <p className="text-xs text-muted-foreground">
                  Screen readers announce file path or skip entirely, excluding blind learners.
                </p>
              </div>

              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                  <CheckCircle2 className="size-3.5" />
                  <span>WCAG Compliant Pattern</span>
                </div>
                <pre className="font-mono text-xs text-foreground/80 bg-background/80 p-2 rounded border border-border">
                  {`<img src="chart.png" \n  alt="Q3 Revenue: 24% Growth">`}
                </pre>
                <p className="text-xs text-muted-foreground">
                  Meaningful concise context passed directly to assistive technology APIs.
                </p>
              </div>
            </div>

            {/* Interactive Quiz Checkpoint */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Interactive Quick Check
                </span>
                <span className="text-xs text-muted-foreground">Question 1 of 1</span>
              </div>
              <p className="text-xs font-medium text-foreground">
                Which attribute should be used if an image is purely decorative and conveys no information?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { label: 'alt="" (empty string)', correct: true },
                  { label: 'alt="decorative image"', correct: false },
                  { label: 'title="none"', correct: false },
                  { label: 'aria-hidden="false"', correct: false },
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuizSelected(idx)
                      setQuizAnswerChecked(true)
                    }}
                    className={`rounded-lg border p-2 text-left text-xs font-medium transition-all ${
                      quizSelected === idx
                        ? opt.correct
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold"
                          : "border-destructive bg-destructive/10 text-destructive font-bold"
                        : "border-border bg-background hover:bg-muted text-foreground"
                    }`}
                  >
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
              {quizAnswerChecked && (
                <div className="flex items-center justify-between pt-1">
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {quizSelected === 0 ? "✓ Correct! An empty alt attribute tells screen readers to ignore decorative elements." : "✗ Not quite. An empty alt=\"\" attribute is the official WCAG standard."}
                  </p>
                  <Link
                    to="/learner/modules"
                    className={buttonVariants({ variant: "default", size: "xs" })}
                  >
                    <span>View All Core Modules</span>
                    <ArrowRight className="size-3 ml-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "assistant" && (
          <div
            id="panel-assistant"
            role="tabpanel"
            aria-labelledby="tab-assistant"
            className="space-y-3"
          >
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BotMessageSquare className="size-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Aria Assistant</h4>
                  <p className="text-xs text-muted-foreground">AI Accessibility Tutor &amp; WCAG Expert</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                <Sparkles className="size-3 mr-1" />
                Context Aware
              </Badge>
            </div>

            <div className="space-y-2.5">
              {/* User Prompt */}
              <div className="flex gap-2 justify-end">
                <div className="rounded-xl rounded-tr-none bg-primary text-primary-foreground p-2.5 text-xs sm:text-sm max-w-xs sm:max-w-md">
                  How should I make a dynamic toast notification accessible to screen readers without interrupting what the user is currently reading?
                </div>
              </div>

              {/* Assistant Response */}
              <div className="flex gap-2.5">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-foreground mt-0.5">
                  <ShieldCheck className="size-3.5 text-primary" />
                </div>
                <div className="rounded-xl rounded-tl-none border border-border bg-muted/40 p-3 text-xs sm:text-sm text-foreground max-w-sm sm:max-w-lg space-y-2">
                  <p>
                    Use an <code className="font-mono bg-background px-1 py-0.5 rounded border border-border">aria-live="polite"</code> region with <code className="font-mono bg-background px-1 py-0.5 rounded border border-border">role="status"</code>.
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Unlike <code className="font-mono">assertive</code> (which immediately cuts off audio synthesis), <code className="font-mono">polite</code> queues the message until the user pauses current keyboard/reader activity:
                  </p>
                  <pre className="font-mono text-xs bg-background p-2 rounded border border-border text-foreground">
                    {`<div role="status" aria-live="polite" aria-atomic="true">\n  Profile updated successfully.\n</div>`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground">
                Ask questions about ARIA roles, states, and criteria anytime.
              </span>
              <Link
                to="/learner/chat"
                className={buttonVariants({ variant: "outline", size: "xs" })}
              >
                <span>Launch Interactive Aria Chat</span>
                <ArrowRight className="size-3 ml-1" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === "instructor" && (
          <div
            id="panel-instructor"
            role="tabpanel"
            aria-labelledby="tab-instructor"
            className="space-y-4"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-xs text-muted-foreground font-mono">Cohort Telemetry</span>
                <h4 className="font-heading font-bold text-base sm:text-lg text-foreground">
                  CS 304: Web Engineering (Fall 2026)
                </h4>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                38 Active Students
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Card size="sm" className="bg-muted/30">
                <CardHeader className="pb-1">
                  <CardDescription className="text-xs">Classroom Mastery Avg</CardDescription>
                  <CardTitle className="text-xl font-bold text-foreground">84.2%</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  +6.8% over last quiz
                </CardContent>
              </Card>

              <Card size="sm" className="bg-muted/30">
                <CardHeader className="pb-1">
                  <CardDescription className="text-xs">Modules Completed</CardDescription>
                  <CardTitle className="text-xl font-bold text-foreground">142 / 152</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  93.4% completion rate
                </CardContent>
              </Card>

              <Card size="sm" className="bg-muted/30">
                <CardHeader className="pb-1">
                  <CardDescription className="text-xs">Focus Area Identified</CardDescription>
                  <CardTitle className="text-sm font-bold text-amber-500">2.1 Keyboard Traps</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  Recommended review topic
                </CardContent>
              </Card>
            </div>

            {/* Principle Mastery Bars */}
            <div className="rounded-lg border border-border bg-card p-3 space-y-2.5">
              <div className="text-xs font-semibold text-foreground">POUR Principle Mastery Distribution</div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Perceivable (WCAG 1.x)</span>
                  <span className="font-semibold text-foreground">91%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-11/12" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Operable (WCAG 2.x)</span>
                  <span className="font-semibold text-foreground">78%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-3/4" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-muted-foreground">
                Manage quizzes, classroom rosters, and audit logs.
              </span>
              <Link
                to="/instructor/dashboard"
                className={buttonVariants({ variant: "outline", size: "xs" })}
              >
                <span>Open Instructor Portal</span>
                <ArrowRight className="size-3 ml-1" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="border-t border-border bg-muted/40 px-4 py-2.5 sm:px-6 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-primary" />
          <span>Real-time verification powered by WCAG 2.1 &amp; 2.2 criteria standards</span>
        </div>
        <span className="font-mono text-xs hidden sm:inline">AST-verified • Live Evaluator</span>
      </div>
    </div>
  )
}

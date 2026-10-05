import { useState } from "react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import SectionHeader from "@/components/public/SectionHeader"
import {
  FileSearch,
  BotMessageSquare,
  BarChart3,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Terminal,
  Code2,
  GraduationCap,
  Laptop,
  CheckCheck,
  Eye,
  Cpu,
  SlidersHorizontal,
} from "lucide-react"

// Interactive Simulated Accessibility Criterion Tests for the Live Sandbox
interface A11yDefectScenario {
  id: string
  name: string
  criterion: string
  principle: "Perceivable" | "Operable" | "Understandable" | "Robust"
  impact: "Critical" | "Serious" | "Moderate"
  description: string
  badCode: string
  goodCode: string
  explanation: string
  screenReaderAnnouncement: string
}

const DEFECT_SCENARIOS: A11yDefectScenario[] = [
  {
    id: "contrast",
    name: "Subtle Contrast vs AAA Compliant",
    criterion: "1.4.3 & 1.4.6 Contrast",
    principle: "Perceivable",
    impact: "Serious",
    description: "Low-contrast muted body text fails readability for users with low vision or bright ambient lighting.",
    badCode: `<span class="text-[#888888] bg-[#FFFFFF]">
  Course Registration Deadline: Oct 15
</span>
<!-- Contrast Ratio: 3.5:1 (FAIL Level AA/AAA) -->`,
    goodCode: `<span class="text-[#1A1A1A] dark:text-[#F0F0F0] bg-background font-medium">
  Course Registration Deadline: Oct 15
</span>
<!-- Contrast Ratio: 14.8:1 (PASS Level AAA) -->`,
    explanation: "WCAG AAA requires at least a 7:1 contrast ratio for normal text. We replace hardcoded light grays with calibrated semantic foreground tokens.",
    screenReaderAnnouncement: "Text contrast compliant with WCAG AAA 14.8:1 ratio across light and dark display modes.",
  },
  {
    id: "form-label",
    name: "Floating Input without Accessible Name",
    criterion: "1.3.1 & 4.1.2 Name, Role, Value",
    principle: "Robust",
    impact: "Critical",
    description: "Using placeholder text alone as a label leaves screen reader users stranded with an unannounced text field.",
    badCode: `<!-- INACCESSIBLE: No associated label or aria -->
<input type="email" placeholder="Enter student email" />`,
    goodCode: `<!-- ACCESSIBLE: Explicit label connection + aria-describedby -->
<label htmlFor="student-email" class="text-xs font-semibold text-foreground">
  Student Institutional Email
</label>
<input
  id="student-email"
  type="email"
  aria-describedby="email-hint"
  required
  class="rounded-md border border-input bg-background px-3 py-2 text-sm"
/>
<span id="email-hint" class="text-xs text-muted-foreground">
  Use your @university.edu address
</span>`,
    explanation: "Connecting a semantic <label> via htmlFor/id ensures screen readers explicitly announce the input's purpose when focused.",
    screenReaderAnnouncement: "Student Institutional Email, required, edit text. Hint: Use your @university.edu address.",
  },
  {
    id: "keyboard-trap",
    name: "Custom Modal Keyboard Focus Trapping",
    criterion: "2.1.2 No Keyboard Trap & 2.4.3 Focus Order",
    principle: "Operable",
    impact: "Critical",
    description: "A dialog that allows Tab focus to escape into the background DOM completely disorients non-mouse users.",
    badCode: `// INACCESSIBLE: Dialog opens but focus remains on background trigger
function openModal() {
  document.getElementById('modal').style.display = 'block';
  // Focus is not moved or constrained!
}`,
    goodCode: `// ACCESSIBLE: WAI-ARIA Dialog pattern with initial focus & loop trap
function openModal() {
  const dialog = document.getElementById('modal');
  dialog.showModal(); // Native HTML5 dialog handles focus isolation
  firstTabbableElement.focus();
  // Escape key automatically dispatches close & returns focus to trigger
}`,
    explanation: "Accessible dialogs trap Tab cycles within active interactive elements and restore previous focus upon dismissal.",
    screenReaderAnnouncement: "Dialog open: Accessibility Audit Settings. Press Escape to close and return to previous button.",
  },
  {
    id: "aria-expanded",
    name: "Accordion State Synchronization",
    criterion: "4.1.2 Name, Role, Value",
    principle: "Robust",
    impact: "Moderate",
    description: "Custom collapsibles that toggle CSS classes without updating aria-expanded leave blind users unaware of state changes.",
    badCode: `<div class="accordion-header" onClick="toggle()">
  Module 3: ARIA Landmark Roles
  <span>+</span>
</div>`,
    goodCode: `<button
  type="button"
  aria-expanded={isOpen}
  aria-controls="module-3-content"
  id="module-3-trigger"
  class="flex w-full items-center justify-between font-medium"
>
  <span>Module 3: ARIA Landmark Roles</span>
  <ChevronDown class={isOpen ? "rotate-180" : ""} aria-hidden="true" />
</button>
<div id="module-3-content" role="region" aria-labelledby="module-3-trigger" hidden={!isOpen}>
  <!-- Accessible lesson content -->
</div>`,
    explanation: "Native button semantics paired with dynamic aria-expanded and aria-controls inform assistive technology whenever content expands or collapses.",
    screenReaderAnnouncement: "Module 3: ARIA Landmark Roles, button, collapsed. Press space to expand region.",
  },
]

export default function FeaturesPage() {
  // Tabs for Interactive Explorer
  const [activeTab, setActiveTab] = useState<number>(0)
  const [copiedCode, setCopiedCode] = useState(false)

  // Interactive Live Sandbox State
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("contrast")
  const [sandboxRemediated, setSandboxRemediated] = useState<boolean>(false)

  // Dual AI Model Selector Simulator
  const [activeAiModel, setActiveAiModel] = useState<"qwen" | "gemini">("gemini")

  const activeScenario = DEFECT_SCENARIOS.find((s) => s.id === selectedScenarioId) || DEFECT_SCENARIOS[0]

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const featuresList = [
    {
      id: "analytics",
      title: "WCAG Mastery Telemetry",
      subtitle: "Granular diagnostic analytics across all 4 POUR principles",
      badge: "Core Telemetry",
      icon: BarChart3,
      whatItDoes:
        "Continuously tracks individual student and cohort competency per WCAG success criteria. Visual mastery radar and telemetry gauges pinpoint specific principle weaknesses (Perceivable, Operable, Understandable, Robust) in real-time.",
      whyItMatters:
        "Computer science faculty need objective telemetry into whether students truly understand accessibility before deploying production code or graduating into the software industry.",
      bullets: [
        "Granular telemetry breakdown across WCAG 2.1 & 2.2 Level A, AA, and AAA",
        "Automated at-risk guideline detection with targeted study recommendations",
        "Cohort aggregate benchmarking for academic departments and instructors",
        "Exportable audit logs & gradebook synchronization (CSV/JSON/PDF)",
      ],
      codeSnippet: {
        language: "json",
        title: "telemetry-matrix.json",
        code: `{
  "student_id": "usr_948271",
  "cohort": "CS-430_Web_Accessibility",
  "mastery_score": 94.2,
  "principles": {
    "1_perceivable": { "score": 98.0, "status": "Mastered", "wcag_aaa": true },
    "2_operable":    { "score": 91.5, "status": "Mastered", "wcag_aa": true },
    "3_understand":  { "score": 95.0, "status": "Mastered", "wcag_aaa": true },
    "4_robust":      { "score": 92.4, "status": "Mastered", "wcag_aa": true }
  },
  "verified_credentials": [
    "Keyboard_Navigation_Specialist",
    "Color_Contrast_Auditor"
  ]
}`,
      },
    },
    {
      id: "analyzer",
      title: "Aria Analyzer Chrome Extension",
      subtitle: "Real-time DOM inspection engine & code diff generator",
      badge: "Developer Tool",
      icon: FileSearch,
      whatItDoes:
        "High-performance accessibility inspector available both in-browser and as a Manifest V3 Chrome Extension. It parses rendered DOM trees in under 15ms, computes APCA & WCAG contrast formulas, validates ARIA hierarchies, and yields instant semantic HTML fixes.",
      whyItMatters:
        "Students learn best by inspecting real, live applications. Aria Analyzer turns any web page or local development server into a hands-on accessibility lab.",
      bullets: [
        "Manifest V3 Chrome Extension support for localhost & staging environments",
        "Dual AI Remediation engine (Lightweight AST Qwen 2.5 + Multimodal Gemini Flash)",
        "POUR-categorized issue breakdown with exact DOM CSS selectors",
        "Instant before-and-after accessible code diff generation",
      ],
      codeSnippet: {
        language: "typescript",
        title: "aria-analyzer-audit.ts",
        code: `// Aria Analyzer DOM Inspector Engine
const auditResult = await ariaAnalyzer.inspectDOM({
  target: document.getElementById("checkout-form"),
  standard: "WCAG_2_2_AAA",
  computeContrast: "APCA_AND_WCAG21",
  verifyKeyboardTabOrder: true,
});

// Output: 0 Critical, 0 Warnings, 100% WCAG AAA Compliant
console.log(auditResult.getScoreSummary());`,
      },
    },
    {
      id: "assistant",
      title: "Aria Assistant AI Companion",
      subtitle: "24/7 Context-aware web accessibility mentor",
      badge: "AI Reasoning",
      icon: BotMessageSquare,
      whatItDoes:
        "An intelligent accessibility pair-programmer trained specifically on W3C WAI-ARIA Authoring Practices and WCAG 2.1/2.2 techniques. Aria Assistant answers complex questions, explains screen-reader behavior, and guides students through component refactoring.",
      whyItMatters:
        "WCAG documentation is notoriously dense. Aria Assistant acts as an interactive patient tutor that clarifies ambiguous guidelines without simply giving away homework solutions.",
      bullets: [
        "Explains complex assistive tech interactions (NVDA, JAWS, VoiceOver, Orca)",
        "Context-aware code refactoring suggestions for React, Vue, and semantic HTML5",
        "Interactive scenario hints aligned with pedagogical learning objectives",
        "Zero generic hallucination — grounded strictly in official W3C specifications",
      ],
      codeSnippet: {
        language: "markdown",
        title: "aria-assistant-session.log",
        code: `Student: "How should I structure an accessible custom tabs component?"

Aria Assistant:
"To meet WCAG 2.4.3 & 4.1.2:
1. Container element: role="tablist" with an aria-label.
2. Tab buttons: role="tab", aria-selected="true/false", and aria-controls linking to panel ID.
3. Content panels: role="tabpanel", id matching controls, and aria-labelledby linking to tab button.
4. Keyboard: Use Left/Right Arrow keys for tab switching and Home/End for boundaries."`,
      },
    },
    {
      id: "modules",
      title: "Interactive POUR Curriculum",
      subtitle: "Structured modules mapped directly to international accessibility standards",
      badge: "Pedagogy",
      icon: GraduationCap,
      whatItDoes:
        "A curriculum divided into the four foundational POUR principles: Perceivable, Operable, Understandable, and Robust. Each module features interactive code challenges, assistive technology audio simulations, and immediate validation feedback.",
      whyItMatters:
        "Ensures students develop a mental model of how real people with visual, motor, auditory, and cognitive disabilities navigate software.",
      bullets: [
        "12+ in-depth interactive learning units covering Level A and AA standards",
        "Hands-on before-and-after live code refactoring challenges",
        "Integrated screen reader audio simulator for authentic testing",
        "Structured progression milestones with verifiable completion badges",
      ],
      codeSnippet: {
        language: "html",
        title: "pour-module-3.html",
        code: `<!-- POUR Principle 1: Perceivable (1.1.1 Non-Text Content) -->
<figure class="rounded-xl border border-border bg-card p-4">
  <img
    src="/diagrams/binary-search-tree.png"
    alt="Binary search tree with root node 50, left child 30, right child 70"
    class="w-full rounded-lg"
  />
  <figcaption class="mt-2 text-xs text-muted-foreground">
    Figure 3.1: Balanced BST traversal hierarchy.
  </figcaption>
</figure>`,
      },
    },
  ]

  const currentFeature = featuresList[activeTab]
  const CurrentIcon = currentFeature.icon

  return (
    <div className="flex flex-col gap-16 pb-16 sm:gap-24 sm:pb-24 lg:gap-32 lg:pb-32">
      {/* =========================================================================
          1. HERO BLOCK: HIGH-DENSITY DEVELOPER INSTRUMENTATION (WATERMELON UI STYLE)
          ========================================================================= */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-background via-muted/20 to-background pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Top Pill / Status Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary shadow-xs">
              <Sparkles className="size-3.5" aria-hidden="true" />
              <span>Full-Stack Digital Accessibility Architecture</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="font-mono text-foreground font-bold">WCAG 2.1 &amp; 2.2 AAA Engine</span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 max-w-4xl font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Engineered For Precision <br className="hidden sm:inline" />
              <span className="text-primary">Accessibility Verification.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              FrontAccEase delivers production-grade diagnostic tools, automated AST inspection, student mastery telemetry, and intelligent AI tutoring in a unified higher-education platform.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
              <Link
                to="/signup"
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                  className: "h-11 w-full px-6 text-base font-semibold shadow-xs sm:w-auto",
                })}
              >
                <span>Launch Free Sandbox</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href="#core-trio"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "h-11 w-full px-6 text-base sm:w-auto",
                })}
              >
                Explore Core Trio
              </a>
            </div>

            {/* Live Telemetry KPI Strip (Watermelon UI Metrics Block) */}
            <div className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <div className="rounded-xl border border-border bg-card p-4 text-center shadow-xs">
                <div className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
                  &lt;15ms
                </div>
                <div className="mt-1 text-xs font-medium text-muted-foreground">
                  DOM AST Parser Speed
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 text-center shadow-xs">
                <div className="font-heading text-2xl font-extrabold text-primary sm:text-3xl">
                  50+
                </div>
                <div className="mt-1 text-xs font-medium text-muted-foreground">
                  WCAG 2.1 &amp; 2.2 Rules
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 text-center shadow-xs">
                <div className="font-heading text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 sm:text-3xl">
                  100%
                </div>
                <div className="mt-1 text-xs font-medium text-muted-foreground">
                  WCAG AAA Compliance
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 text-center shadow-xs">
                <div className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
                  Dual AI
                </div>
                <div className="mt-1 text-xs font-medium text-muted-foreground">
                  Qwen 2.5 + Gemini Flash
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THE CORE TRIO SHOWCASE (BENTO GRID WATERMELON UI BLOCK)
          Highlights:
          1) WCAG Mastery Analytics Dashboard
          2) ARIA Analyzer Chrome Extension
          3) Integrated LLM Assistant (Aria Assistant)
          ========================================================================= */}
      <section id="core-trio" className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="The Core Trio"
          title="Three Pillars of Comprehensive Accessibility"
          subtitle="A harmonious ecosystem bridging theoretical standards, automated live audits, and real-time AI mentorship."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* PILLAR 1: WCAG Mastery Analytics Dashboard (Large Col: 7/12) */}
          <article className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 lg:col-span-7 sm:p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BarChart3 className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Pillar 01 • Institutional Telemetry
                    </span>
                    <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                      WCAG Mastery Analytics Dashboard
                    </h2>
                  </div>
                </div>
                <Badge variant="secondary" className="border-primary/20 bg-primary/10 text-primary">
                  Live Telemetry
                </Badge>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Move beyond static quiz scores. FrontAccEase provides deep, multidimensional skill tracking across all 4 POUR principles, diagnosing exact student misconceptions and predicting at-risk compliance knowledge.
              </p>

              {/* Interactive Telemetry Dashboard Widget Mockup */}
              <div className="space-y-3 rounded-xl border border-border bg-muted/40 p-4 sm:p-5">
                <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="size-4 text-primary" />
                    <span className="font-mono text-xs font-semibold text-foreground">
                      Cohort Telemetry: CS-430 Accessibility Lab
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Cohort Avg: 93.4%
                  </span>
                </div>

                {/* POUR Telemetry Progress Meters */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5 rounded-lg border border-border bg-background p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">1. Perceivable</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">96% (Mastered)</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-emerald-500 transition-all" style={{ width: "96%" }} />
                    </div>
                    <p className="text-xs text-muted-foreground">Contrast, Text Alternates, Responsive Layouts</p>
                  </div>

                  <div className="space-y-1.5 rounded-lg border border-border bg-background p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">2. Operable</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">79% (Attention Needed)</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-amber-500 transition-all" style={{ width: "79%" }} />
                    </div>
                    <p className="text-xs text-muted-foreground">Focus Visible (2.4.7), Keyboard Traps (2.1.2)</p>
                  </div>

                  <div className="space-y-1.5 rounded-lg border border-border bg-background p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">3. Understandable</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">94% (Mastered)</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-emerald-500 transition-all" style={{ width: "94%" }} />
                    </div>
                    <p className="text-xs text-muted-foreground">Error Prevention, Predictable Focus Nav</p>
                  </div>

                  <div className="space-y-1.5 rounded-lg border border-border bg-background p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">4. Robust</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">91% (Proficient)</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-emerald-500 transition-all" style={{ width: "91%" }} />
                    </div>
                    <p className="text-xs text-muted-foreground">Name/Role/Value, ARIA State Sync</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCheck className="size-4 text-primary" />
                <span>Instructor Gradebook Sync &amp; Audit Logs</span>
              </div>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1 font-heading text-xs font-semibold text-primary hover:underline"
              >
                <span>View Dashboard Specs</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </article>

          {/* PILLAR 2: ARIA Analyzer Chrome Extension (Col: 5/12) */}
          <article className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 lg:col-span-5 sm:p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileSearch className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Pillar 02 • Developer Extension
                    </span>
                    <h2 className="font-heading text-xl font-bold text-foreground">
                      ARIA Analyzer Engine
                    </h2>
                  </div>
                </div>
                <Badge variant="outline" className="font-mono text-xs">
                  Manifest V3
                </Badge>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Audit live web applications and local development servers with zero friction. Evaluates DOM structures, simulates screen-reader parsing, and checks contrast formulas.
              </p>

              {/* Chrome Extension Simulator Widget */}
              <div className="space-y-3 rounded-xl border border-border bg-muted/40 p-4">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <div className="flex items-center gap-2">
                    <Laptop className="size-3.5 text-primary" />
                    <span className="font-mono text-xs font-medium text-foreground">
                      localhost:5173/checkout
                    </span>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Score: 98/100
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-foreground">1.4.3 Contrast Ratio</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">12.4:1 (AAA)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-foreground">4.1.2 ARIA Role Valid</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Passed</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-foreground">2.1.1 Keyboard Nav</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">0 Traps</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">Supports Chrome, Edge, Brave</span>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1 font-heading text-xs font-semibold text-primary hover:underline"
              >
                <span>Try Analyzer Tool</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </article>

          {/* PILLAR 3: Integrated LLM Assistant (Aria Assistant) (Full Width Col: 12/12) */}
          <article className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 lg:col-span-12 sm:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="space-y-5 lg:col-span-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BotMessageSquare className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Pillar 03 • Conversational Mentorship
                    </span>
                    <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                      Integrated LLM Assistant: Aria
                    </h2>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Aria Assistant is not a generic chatbot. It is a specialized reasoning system configured to explain accessibility guidelines, provide before-and-after code diffs, and teach inclusive design patterns without generating non-compliant code.
                </p>

                {/* Model Selector Simulator */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Active AI Remediation Architecture:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveAiModel("gemini")}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                        activeAiModel === "gemini"
                          ? "border-primary bg-primary text-primary-foreground shadow-xs"
                          : "border-border bg-muted/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Cpu className="size-3.5" />
                      <span>Gemini Flash (Multimodal Vision Reasoning)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveAiModel("qwen")}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                        activeAiModel === "qwen"
                          ? "border-primary bg-primary text-primary-foreground shadow-xs"
                          : "border-border bg-muted/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Terminal className="size-3.5" />
                      <span>Qwen 2.5 (Fast AST Syntactic Inspection)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Interactive Terminal / Dialogue Visualizer */}
              <div className="lg:col-span-6">
                <div className="rounded-xl border border-border bg-muted/60 p-4 sm:p-5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <Code2 className="size-4 text-primary" />
                      <span className="font-mono text-xs font-bold text-foreground">
                        aria-assistant-session.tsx
                      </span>
                    </div>
                    <Badge variant="outline" className="font-mono text-xs">
                      {activeAiModel === "gemini" ? "Gemini 2.5 Flash" : "Qwen 2.5 AST"}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-3 font-mono text-xs leading-relaxed">
                    <div className="rounded-lg border border-border bg-background p-3">
                      <span className="font-bold text-primary">Student Question:</span>
                      <p className="mt-1 text-foreground">
                        "Why does my custom select dropdown fail screen reader testing even though it works with mouse clicks?"
                      </p>
                    </div>

                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                      <span className="font-bold text-primary">Aria Remediation Rationale:</span>
                      <p className="mt-1 text-foreground">
                        "Your &lt;div&gt; lacks keyboard handlers (onKeyDown for Arrow keys/Enter) and ARIA attributes (role='listbox', role='option', aria-selected). Screen readers cannot announce item index or selection state."
                      </p>
                      <div className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        [✓ Generated accessible React hook + WAI-ARIA pattern]
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================================
          3. INTERACTIVE LIVE WCAG CRITERION INSPECTOR & REMEDIATION SANDBOX
          (High-Engagement Developer Verification Sandbox)
          ========================================================================= */}
      <section className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Live Sandbox"
          title="Interactive Accessibility Inspector &amp; Diff Engine"
          subtitle="Test common web accessibility violations, inspect the underlying DOM, and witness automated code remediation."
        />

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left: Scenario Selector */}
            <div className="space-y-4 lg:col-span-4">
              <label className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Select A Test Criterion:
              </label>

              <div className="space-y-2">
                {DEFECT_SCENARIOS.map((scenario) => {
                  const isSelected = selectedScenarioId === scenario.id
                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      onClick={() => {
                        setSelectedScenarioId(scenario.id)
                        setSandboxRemediated(false)
                      }}
                      className={`flex w-full flex-col gap-1 rounded-xl border p-3.5 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 text-primary shadow-xs ring-1 ring-primary"
                          : "border-border bg-muted/30 text-foreground hover:bg-muted/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-sm font-bold">{scenario.name}</span>
                        <Badge variant="outline" className="font-mono text-xs">
                          {scenario.principle}
                        </Badge>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        WCAG {scenario.criterion}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Remediation Toggle Switch */}
              <div className="rounded-xl border border-border bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-foreground">Apply AI Remediation Diff</span>
                    <p className="text-xs text-muted-foreground">
                      Toggle compliant markup
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={sandboxRemediated}
                    aria-label="Toggle AI remediation fix"
                    onClick={() => setSandboxRemediated(!sandboxRemediated)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      sandboxRemediated ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block size-5 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out ${
                        sandboxRemediated ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Live Code & Screen Reader Visualizer */}
            <div className="space-y-5 lg:col-span-8">
              {/* Status Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 p-4">
                <div className="flex items-center gap-2">
                  {sandboxRemediated ? (
                    <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <XCircle className="size-5 text-destructive" />
                  )}
                  <div>
                    <div className="text-sm font-bold text-foreground">
                      {sandboxRemediated ? "Compliant Markup (WCAG AAA Passed)" : "Accessibility Violation Detected"}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      Criterion: {activeScenario.criterion} • Impact: {activeScenario.impact}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(sandboxRemediated ? activeScenario.goodCode : activeScenario.badCode)}
                  className={buttonVariants({ variant: "outline", size: "sm", className: "gap-1.5 text-xs" })}
                  aria-label="Copy snippet to clipboard"
                >
                  {copiedCode ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                  <span>{copiedCode ? "Copied!" : "Copy Snippet"}</span>
                </button>
              </div>

              {/* Code Viewer */}
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
                  <span className="font-mono text-xs font-medium text-muted-foreground">
                    {sandboxRemediated ? "remediated-accessible-fix.html" : "inaccessible-source.html"}
                  </span>
                  <Badge variant={sandboxRemediated ? "default" : "destructive"} className="text-xs font-mono">
                    {sandboxRemediated ? "100% Compliant" : "Level AA Failure"}
                  </Badge>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-xs text-foreground leading-relaxed">
                  <code>{sandboxRemediated ? activeScenario.goodCode : activeScenario.badCode}</code>
                </pre>
              </div>

              {/* Screen Reader Simulation Card */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4" aria-live="polite">
                <div className="flex items-center gap-2 text-xs font-bold text-primary">
                  <Eye className="size-4" />
                  <span>Screen Reader &amp; Assistive Tech Announcement:</span>
                </div>
                <p className="mt-1 font-mono text-xs text-foreground/90">
                  {sandboxRemediated
                    ? `🔊 "${activeScenario.screenReaderAnnouncement}"`
                    : `⚠️ Screen reader announces ambiguous element or skips unlabelled control.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. TABBED DEEP DIVE FEATURE EXPLORER (WATERMELON UI SPEC BLOCK)
          ========================================================================= */}
      <section className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Platform Architecture"
          title="Modular Pedagogy Built for Higher Ed"
          subtitle="Explore the structural capabilities powering FrontAccEase classrooms and engineering labs."
        />

        {/* Tab Navigation List */}
        <div
          role="tablist"
          aria-label="Platform feature specifications"
          className="flex flex-wrap items-center justify-center gap-2 border-b border-border pb-4"
        >
          {featuresList.map((feature, idx) => {
            const isSelected = activeTab === idx
            const FIcon = feature.icon
            return (
              <button
                key={feature.id}
                role="tab"
                id={`feature-tab-${idx}`}
                aria-selected={isSelected}
                aria-controls={`feature-panel-${idx}`}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all focus-visible:outline-2 focus-visible:outline-primary sm:text-sm ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <FIcon className="size-4" aria-hidden="true" />
                <span>{feature.title}</span>
              </button>
            )
          })}
        </div>

        {/* Active Tab Panel */}
        <div
          role="tabpanel"
          id={`feature-panel-${activeTab}`}
          aria-labelledby={`feature-tab-${activeTab}`}
          className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10 lg:p-12"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            {/* Description & Capabilities Column */}
            <div className="space-y-6 lg:col-span-7">
              <div className="space-y-2">
                <Badge variant="secondary" className="border-primary/20 bg-primary/10 text-primary font-semibold">
                  {currentFeature.badge}
                </Badge>
                <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {currentFeature.title}
                </h3>
                <p className="text-sm font-medium text-muted-foreground sm:text-base">
                  {currentFeature.subtitle}
                </p>
              </div>

              {/* What It Does Card */}
              <div className="space-y-2 rounded-2xl border border-border bg-muted/30 p-5">
                <h4 className="text-xs font-semibold tracking-wider text-foreground uppercase">
                  What It Does
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {currentFeature.whatItDoes}
                </p>
              </div>

              {/* Why It Matters Card */}
              <div className="space-y-2 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <h4 className="text-xs font-semibold tracking-wider text-primary uppercase">
                  Why It Matters For Students &amp; Faculty
                </h4>
                <p className="text-xs leading-relaxed text-foreground/90 sm:text-sm">
                  {currentFeature.whyItMatters}
                </p>
              </div>

              {/* Key Capabilities Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Technical Specifications:
                </h4>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {currentFeature.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs text-foreground sm:text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Code / Visual Preview Column */}
            <div className="space-y-4 lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-border bg-muted/40 shadow-xs">
                <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
                  <div className="flex items-center gap-2">
                    <CurrentIcon className="size-4 text-primary" />
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {currentFeature.codeSnippet.title}
                    </span>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">
                    Live Telemetry Code
                  </Badge>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-xs text-foreground leading-relaxed">
                  <code>{currentFeature.codeSnippet.code}</code>
                </pre>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-xs">
                <p className="text-xs text-muted-foreground">
                  Ready to deploy this capability in your classroom or project?
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <Link
                    to="/signup"
                    className={buttonVariants({
                      variant: "default",
                      size: "sm",
                      className: "w-full justify-center font-semibold shadow-xs",
                    })}
                  >
                    <span>Create Free Account</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. POUR PEDAGOGICAL PILLARS MATRIX
          ========================================================================= */}
      <section className="border-y border-border bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Foundations"
            title="Grounded in the POUR International Standard"
            subtitle="How FrontAccEase structures curricula and automated audits across all four WCAG principles."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* P: Perceivable */}
            <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-border bg-card p-6 shadow-xs">
              <div className="space-y-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 font-heading text-lg font-bold text-primary">
                  P
                </div>
                <h4 className="font-heading text-base font-bold text-foreground">
                  1. Perceivable
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Information and UI components must be presentable to users in ways they can perceive (visual, auditory, tactile).
                </p>
              </div>
              <ul className="space-y-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary shrink-0" />
                  <span>1.1 Text Alternatives</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary shrink-0" />
                  <span>1.4 Distinguishable &amp; Contrast</span>
                </li>
              </ul>
            </div>

            {/* O: Operable */}
            <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-border bg-card p-6 shadow-xs">
              <div className="space-y-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 font-heading text-lg font-bold text-primary">
                  O
                </div>
                <h4 className="font-heading text-base font-bold text-foreground">
                  2. Operable
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  UI components and navigation must be operable entirely via keyboard without causing focus traps or seizure triggers.
                </p>
              </div>
              <ul className="space-y-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary shrink-0" />
                  <span>2.1 Keyboard Accessible</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary shrink-0" />
                  <span>2.4 Navigable &amp; Focus Visible</span>
                </li>
              </ul>
            </div>

            {/* U: Understandable */}
            <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-border bg-card p-6 shadow-xs">
              <div className="space-y-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 font-heading text-lg font-bold text-primary">
                  U
                </div>
                <h4 className="font-heading text-base font-bold text-foreground">
                  3. Understandable
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Information and UI operation must be understandable, providing clear error identification and predictable controls.
                </p>
              </div>
              <ul className="space-y-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary shrink-0" />
                  <span>3.2 Predictable Interactions</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary shrink-0" />
                  <span>3.3 Input Error Assistance</span>
                </li>
              </ul>
            </div>

            {/* R: Robust */}
            <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-border bg-card p-6 shadow-xs">
              <div className="space-y-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 font-heading text-lg font-bold text-primary">
                  R
                </div>
                <h4 className="font-heading text-base font-bold text-foreground">
                  4. Robust
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Content must be robust enough that it can be interpreted reliably by a wide variety of user agents and assistive technologies.
                </p>
              </div>
              <ul className="space-y-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary shrink-0" />
                  <span>4.1 Compatible &amp; ARIA Roles</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary shrink-0" />
                  <span>4.1.3 Status Messages</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. HIGH-CONVERSION ACCESSIBLE CALL TO ACTION BANNER
          ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative space-y-6 overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-12 lg:p-16">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </div>

          <div className="mx-auto max-w-2xl space-y-3">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Elevate Accessibility Standards in Your Code
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Join IT students, computer science professors, and frontend engineers building a more inclusive digital world with FrontAccEase.
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
              Get Started for Free
            </Link>
            <Link
              to="/pricing"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "w-full px-6 sm:w-auto",
              })}
            >
              View Pricing &amp; Plans
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-primary" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-primary" />
              <span>Instant Analyzer Access</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-primary" />
              <span>FERPA &amp; Section 508 Compliant</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

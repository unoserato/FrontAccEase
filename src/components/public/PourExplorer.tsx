import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Eye,
  Hand,
  Brain,
  Cpu,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Code2,
} from "lucide-react"

export interface PourPrincipleData {
  id: "perceivable" | "operable" | "understandable" | "robust"
  letter: string
  name: string
  tagline: string
  definition: string
  icon: typeof Eye
  colorBadge: string
  guidelines: string[]
  criteriaCount: string
  exampleTitle: string
  badCode: string
  badExplanation: string
  goodCode: string
  goodExplanation: string
  keyTakeaway: string
}

export const pourPrinciples: PourPrincipleData[] = [
  {
    id: "perceivable",
    letter: "P",
    name: "Perceivable",
    tagline: "Information and UI components must be presentable to users in ways they can perceive.",
    definition:
      "Users must be able to comprehend the information being depicted. It cannot be invisible to all of their senses (vision, hearing, touch).",
    icon: Eye,
    colorBadge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    guidelines: [
      "1.1 Text Alternatives (Alt text, captions)",
      "1.2 Time-based Media (Audio descriptions, transcripts)",
      "1.3 Adaptable (Semantic structure, orientation)",
      "1.4 Distinguishable (4.5:1 Contrast ratio, text resize)",
    ],
    criteriaCount: "13 Success Criteria (Level A - AAA)",
    exampleTitle: "Contrast & Color Independence",
    badCode: `<span style="color: #999; background: #fff;">\n  Critical Error: Password required\n</span>`,
    badExplanation: "Fails 4.5:1 minimum contrast ratio requirement and communicates state using subtle color alone.",
    goodCode: `<div role="alert" class="flex items-center gap-2 text-destructive font-medium">\n  <AlertCircle className="size-4" aria-hidden="true" />\n  <span>Error: Password is required.</span>\n</div>`,
    goodExplanation: "High-contrast legible text paired with an explicit icon and an ARIA live alert role for screen readers.",
    keyTakeaway: "Always provide redundant visual/audio cues and maintain high contrast across themes.",
  },
  {
    id: "operable",
    letter: "O",
    name: "Operable",
    tagline: "User interface components and navigation must be operable.",
    definition:
      "Users must be able to operate the interface. The interface cannot require interaction that a user cannot perform (e.g. keyboard-only, switch device).",
    icon: Hand,
    colorBadge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    guidelines: [
      "2.1 Keyboard Accessible (No keyboard traps)",
      "2.2 Enough Time (Adjustable timeouts, pause animations)",
      "2.3 Seizures and Physical Reactions (Avoid flashes > 3Hz)",
      "2.4 Navigable (Bypass blocks, page titles, focus visible)",
      "2.5 Input Modalities (Pointer gestures, target size 24x24px)",
    ],
    criteriaCount: "16 Success Criteria (Level A - AAA)",
    exampleTitle: "Keyboard Navigation & Focus Management",
    badCode: `<div onclick="openModal()" class="btn">\n  View Details\n</div>`,
    badExplanation: "Non-interactive <div> cannot receive Tab key focus and is inaccessible to keyboard and assistive users.",
    goodCode: `<button type="button" onClick={openModal} className="focus-visible:ring-2 focus-visible:ring-primary">\n  View Details\n</button>`,
    goodExplanation: "Native <button> element receives natural tab order, Space/Enter activation, and visible focus outline.",
    keyTakeaway: "Never remove focus outlines without providing a superior high-visibility alternative.",
  },
  {
    id: "understandable",
    letter: "U",
    name: "Understandable",
    tagline: "Information and the operation of user interface must be understandable.",
    definition:
      "Users must be able to understand the content and how to use the interface. The controls and responses must not be erratic or confusing.",
    icon: Brain,
    colorBadge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    guidelines: [
      "3.1 Readable (Language of page, clear terminology)",
      "3.2 Predictable (On focus, consistent navigation)",
      "3.3 Input Assistance (Error identification, form labels, recovery)",
    ],
    criteriaCount: "10 Success Criteria (Level A - AAA)",
    exampleTitle: "Form Inputs & Descriptive Error Recovery",
    badCode: `<input placeholder="Enter code" id="code">\n<!-- Missing explicit label and validation association -->`,
    badExplanation: "Placeholders disappear on typing and are not reliable label substitutes for screen readers or cognitive aids.",
    goodCode: `<label htmlFor="student-id" className="font-medium text-sm">\n  Student ID (8 digits)\n</label>\n<input id="student-id" aria-describedby="id-hint" aria-invalid={hasError} />\n<p id="id-hint" className="text-xs text-muted-foreground">Format: 20261234</p>`,
    goodExplanation: "Explicit semantic label paired with an aria-describedby instruction ensures zero ambiguity.",
    keyTakeaway: "Clear labels and descriptive inline validation remove friction for all cognitive abilities.",
  },
  {
    id: "robust",
    letter: "R",
    name: "Robust",
    tagline: "Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies.",
    definition:
      "As technologies and user agents evolve, the content should remain accessible. Content must adhere to official web specifications.",
    icon: Cpu,
    colorBadge: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    guidelines: [
      "4.1 Compatible (Valid HTML markup, name/role/value, status messages)",
      "Screen Reader API compatibility",
      "Assistive Device Standard compliance",
    ],
    criteriaCount: "3 Success Criteria (Level A - AAA)",
    exampleTitle: "Semantic ARIA & Custom Component Roles",
    badCode: `<div class="custom-accordion" data-state="closed">\n  <h3>Section Header</h3>\n</div>`,
    badExplanation: "Custom widget lacks ARIA attributes. Assistive tech cannot announce expand/collapse states.",
    goodCode: `<button \n  aria-expanded={isOpen} \n  aria-controls="section-content-1"\n  id="accordion-trigger-1"\n>\n  <span>Course Syllabus</span>\n</button>`,
    goodExplanation: "Standard ARIA state bindings inform assistive technology immediately whenever state changes.",
    keyTakeaway: "Use semantic HTML first; when building custom UI, strictly adhere to WAI-ARIA authoring practices.",
  },
]

export default function PourExplorer() {
  const [selectedId, setSelectedId] = useState<string>("perceivable")
  const activePrinciple = pourPrinciples.find((p) => p.id === selectedId) || pourPrinciples[0]
  const IconComponent = activePrinciple.icon

  return (
    <div className="space-y-6">
      {/* 4 Principle Selectors */}
      <div
        role="tablist"
        aria-label="WCAG POUR Principles"
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {pourPrinciples.map((principle) => {
          const isSelected = principle.id === selectedId
          const PIcon = principle.icon
          return (
            <button
              key={principle.id}
              role="tab"
              id={`tab-${principle.id}`}
              aria-selected={isSelected}
              aria-controls={`panel-${principle.id}`}
              onClick={() => setSelectedId(principle.id)}
              className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-primary ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary"
                  : "border-border bg-card hover:border-border/80 hover:bg-muted/40"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <div
                  className={`flex size-8 items-center justify-center rounded-lg ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <PIcon className="size-4" />
                </div>
                <span className="font-mono text-xs font-bold text-muted-foreground">
                  {principle.letter}
                </span>
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-foreground sm:text-base">
                  {principle.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  WCAG Principle {principle.letter === "P" ? "1" : principle.letter === "O" ? "2" : principle.letter === "U" ? "3" : "4"}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Principle Deep Dive Card */}
      <Card
        id={`panel-${activePrinciple.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activePrinciple.id}`}
        className="border-border shadow-md"
      >
        <CardContent className="space-y-6 p-5 sm:p-7">
          {/* Header section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={activePrinciple.colorBadge}>
                  Principle: {activePrinciple.name}
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  {activePrinciple.criteriaCount}
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                {activePrinciple.tagline}
              </h3>
              <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
                {activePrinciple.definition}
              </p>
            </div>
            <div className="shrink-0">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <IconComponent className="size-7" />
              </div>
            </div>
          </div>

          {/* Guidelines grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Core WCAG Guidelines under {activePrinciple.name}
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {activePrinciple.guidelines.map((guide, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 rounded-lg border border-border bg-muted/30 p-2.5 text-xs sm:text-sm font-medium text-foreground"
                >
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>{guide}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Code Comparison */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="size-4 text-primary" />
                <h4 className="text-sm font-bold text-foreground">
                  Practical Implementation: {activePrinciple.exampleTitle}
                </h4>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                WCAG Fix Blueprint
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Bad Example */}
              <div className="space-y-2 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-destructive">
                  <XCircle className="size-4" />
                  <span>Problematic Approach</span>
                </div>
                <pre className="overflow-x-auto rounded-lg border border-border/80 bg-background/90 p-3 font-mono text-xs text-foreground">
                  <code>{activePrinciple.badCode}</code>
                </pre>
                <p className="text-xs text-muted-foreground">
                  {activePrinciple.badExplanation}
                </p>
              </div>

              {/* Good Example */}
              <div className="space-y-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-4" />
                  <span>Accessible &amp; Semantic Solution</span>
                </div>
                <pre className="overflow-x-auto rounded-lg border border-border/80 bg-background/90 p-3 font-mono text-xs text-foreground">
                  <code>{activePrinciple.goodCode}</code>
                </pre>
                <p className="text-xs text-muted-foreground">
                  {activePrinciple.goodExplanation}
                </p>
              </div>
            </div>
          </div>

          {/* Student Key Takeaway */}
          <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs sm:text-sm">
            <ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-foreground">Core Takeaway for IT Developers: </span>
              <span className="text-muted-foreground">{activePrinciple.keyTakeaway}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { useState } from "react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import SectionHeader from "@/components/public/SectionHeader"
import PourExplorer from "@/components/public/PourExplorer"
import { wcagGuidelines } from "@/const/criterion"
import {
  BookOpen,
  FileSearch2,
  CheckCircle2,
  Search,
} from "lucide-react"

export default function AccessibilityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPrinciple, setSelectedPrinciple] = useState<string>("All")

  const filteredGuidelines = wcagGuidelines.filter((guide) => {
    const matchesPrinciple =
      selectedPrinciple === "All" || guide.principle === selectedPrinciple
    const matchesSearch =
      guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.num.includes(searchTerm) ||
      guide.principle.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesPrinciple && matchesSearch
  })

  return (
    <div className="flex flex-col gap-16 pb-16 sm:gap-24 sm:pb-24 lg:gap-32 lg:pb-32">
      {/* 1. Header */}
      <section className="border-b border-border/60 bg-gradient-to-b from-background via-muted/20 to-background pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Standards &amp; Pedagogy
          </Badge>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            The WCAG &amp; POUR Framework
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Understand the international technical standard that underpins digital equality, and how FrontAccEase translates guidelines into practical IT competencies.
          </p>
        </div>
      </section>

      {/* 2. WHAT IS WCAG & WHY IT MATTERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-xs space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <Badge variant="outline" className="text-xs">
                W3C Web Accessibility Initiative (WAI)
              </Badge>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                What Is WCAG?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The <strong>Web Content Accessibility Guidelines (WCAG)</strong> are developed by the World Wide Web Consortium (W3C) to define how to make web content more accessible to people with disabilities.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                WCAG covers visual, auditory, physical, speech, cognitive, language, learning, and neurological disabilities. It serves as the legal and technical standard in international laws such as ADA Title III, Section 508, EN 301 549, and the European Accessibility Act.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-4">
              <h3 className="font-heading font-bold text-base text-foreground">
                Why Accessibility Matters For IT Students
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Human Rights &amp; Inclusion:</strong> Over 16% of the global population experiences significant disability.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Legal Compliance:</strong> Higher education institutions and commercial tech products are legally mandated to achieve WCAG 2.1 AA conformance.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Code Quality &amp; SEO:</strong> Semantic HTML, structured headings, and keyboard navigation directly improve SEO, UX, and maintainability.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE POUR PRINCIPLES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="The 4 Principles"
          title="POUR: The Four Pillars of Web Accessibility"
          subtitle="Every guideline in WCAG falls under one of these four essential principles."
        />

        <PourExplorer />
      </section>

      {/* 4. HOW FRONTACCEASE EMBEDS WCAG INTO CURRICULUM */}
      <section className="bg-muted/30 border-y border-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <SectionHeader
            badge="Curriculum Mapping"
            title="How FrontAccEase Bridges Standards to Learning"
            subtitle="Transforming 78+ abstract criteria into hands-on code modules, assessments, and real-time audit tools."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-border bg-card p-6 space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen className="size-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-foreground">
                1. Modular Learning Units
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Instead of reading dense technical specifications, students learn through interactive bite-sized lessons that dissect specific criteria like 1.4.3 (Contrast) or 2.1.1 (Keyboard).
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileSearch2 className="size-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-foreground">
                2. Aria Analyzer Audit Mapping
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                When students analyze a website, Aria Analyzer tags every error by its exact POUR principle and guideline number, making remediation intuitive.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CheckCircle2 className="size-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-foreground">
                3. Criterion-Level Diagnostics
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Quizzes evaluate comprehension at the criterion level. The system calculates student mastery metrics per principle, pinpointing where more practice is required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE WCAG GUIDELINES DIRECTORY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeader
          title="WCAG Guidelines Directory"
          subtitle="Explore the official guideline structure and how it is organized inside the FrontAccEase database."
        />

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border bg-card p-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search guideline name or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Principle Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {["All", "Perceivable", "Operable", "Understandable", "Robust"].map(
              (p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPrinciple(p)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    selectedPrinciple === p
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              )
            )}
          </div>
        </div>

        {/* Guidelines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGuidelines.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-border bg-card p-4 space-y-2 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-primary">
                  Guideline {item.num}
                </span>
                <Badge variant="outline" className="text-xs">
                  {item.principle}
                </Badge>
              </div>
              <h4 className="font-heading font-bold text-sm text-foreground">
                {item.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                Taught in FrontAccEase Core Curriculum with corresponding assessment instrument.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-12 text-center space-y-5">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Start Learning The POUR Principles In Practice
          </h2>
          <p className="mx-auto max-w-xl text-sm sm:text-base text-muted-foreground">
            Access our free student modules, quizzes, and live Aria Analyzer tool today.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/signup"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

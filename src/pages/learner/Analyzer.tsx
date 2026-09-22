import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { analyzerResults } from "@/const/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldError } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  ArrowRight,
  ArrowUpRight,
  BugOffIcon,
  Check,
  ChevronDown,
  Clock,
  Cpu,
  Globe,
  History,
  Puzzle,
  Search,
  WrenchIcon,
} from "lucide-react"

const steps = [
  { name: "Analyze", icon: Search },
  { name: "Scrutinize", icon: BugOffIcon },
  { name: "Optimize", icon: WrenchIcon },
]

const models = [
  {
    label: "Qwen 2.5 0.6B",
    value: "qwenV2.5P0.6b",
    badge: "Fast & Light",
    description:
      "Ultra-fast lightweight model ideal for quick DOM hierarchy and semantic structure audits.",
  },
  {
    label: "Gemini 3.5 Flash",
    value: "GeminiV3.5Flas",
    badge: "Recommended",
    description:
      "Advanced multimodal AI optimized for deep WCAG 2.1 AA compliance, contrast, and screen reader verification.",
  },
]

export default function Analyzer() {
  const navigate = useNavigate()
  const [domain, setDomain] = useState("")
  const [selectedModel, setSelectedModel] = useState("qwenV2.5P0.6b")
  const [openPopover, setOpenPopover] = useState(false)
  const [error, setError] = useState("")

  const activeModelObj =
    models.find((m) => m.value === selectedModel) || models[0]

  function isValidUrl(input: string): boolean {
    if (!input || typeof input !== "string") return false

    const trimmed = input.trim()

    // 1. Prepend https:// if the user typed a naked domain (e.g., "google.com")
    const urlToTest = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`

    try {
      // 2. Parse using the browser's native URL parser
      const parsed = new URL(urlToTest)

      // 3. Ensure the protocol is http or https
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return false
      }

      // 4. Validate hostname has a valid extension (e.g. .com, .net, .edu.ph)
      const hostname = parsed.hostname
      const hasValidTld = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(hostname)

      return hasValidTld
    } catch {
      return false
    }
  }

  function handleSubmit() {
    if (!selectedModel) {
      setError("Please select a scanner model.")
      return
    }
    if (!isValidUrl(domain)) {
      setError("Please enter a valid domain or URL.")
      return
    }

    setError("")
    navigate("/learner/analyzer/1")
  }

  const firstStep = steps[0]

  return (
    <div className="mx-auto flex h-fit min-h-full w-full max-w-5xl flex-col justify-center gap-8 px-4 py-8 sm:px-6 sm:py-12 md:gap-12 md:px-8">
      {/* Top Process Cycle Diagram */}
      <div className="relative flex w-full flex-col items-center gap-10 sm:gap-14">
        <svg
          className="pointer-events-none absolute inset-0 mx-auto h-full w-3/4 text-muted-foreground/30 sm:w-1/2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path
                d="M 0 0 L 10 5 L 0 10"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </marker>
          </defs>

          {/* Analyze -> Scrutinize */}
          <line x1="38%" y1="35%" x2="22%" y2="60%" markerEnd="url(#arrow)" />

          {/* Scrutinize -> Optimize */}
          <line x1="32%" y1="85%" x2="68%" y2="85%" markerEnd="url(#arrow)" />

          {/* Optimize -> Analyze */}
          <line x1="78%" y1="60%" x2="62%" y2="35%" markerEnd="url(#arrow)" />
        </svg>

        <Card
          key={firstStep.name}
          className="z-10 flex w-24 items-center justify-center shadow-sm sm:w-28"
        >
          <CardContent className="flex flex-col items-center gap-2 p-4 text-xs font-semibold sm:text-sm">
            <div className="rounded-full bg-foreground p-2.5 text-background shadow-xs">
              <firstStep.icon className="size-4 sm:size-5" />
            </div>
            <span>{firstStep.name}</span>
          </CardContent>
        </Card>

        <div className="z-10 flex gap-12 sm:gap-28 md:gap-44">
          {steps.slice(1, 3).map((step) => (
            <Card
              key={step.name}
              className="flex w-24 items-center justify-center shadow-sm sm:w-28"
            >
              <CardContent className="flex flex-col items-center gap-2 p-4 text-xs font-semibold sm:text-sm">
                <div className="rounded-full bg-foreground p-2.5 text-background shadow-xs">
                  <step.icon className="size-4 sm:size-5" />
                </div>
                <span>{step.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Header Section */}
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Let's Analyze your Page
        </h1>
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
          Audit any public URL for WCAG 2.1 AA compliance, including DOM
          hierarchy, contrast ratios, and keyboard navigation.
        </p>
      </div>

      {/* Main Responsive URL Analyzer Card */}
      <div className="mx-auto w-full max-w-3xl">
        <Field className="w-full">
          <div className="flex flex-col gap-3 rounded-2xl border border-border/80 bg-card p-2.5 shadow-md sm:p-3 md:flex-row md:items-center">
            {/* Input Box with Fixed https:// Prefix */}
            <div className="relative flex flex-1 items-center overflow-hidden rounded-xl border border-input/80 bg-muted/20 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              <span className="flex h-11 shrink-0 items-center border-r border-border/60 bg-muted/60 px-3.5 font-mono text-xs font-bold text-muted-foreground select-none sm:text-sm">
                <Globe className="mr-1.5 size-3.5 text-muted-foreground/70" />
                https://
              </span>
              <input
                type="text"
                placeholder="attendex.online"
                value={domain}
                onChange={(e) => {
                  let val = e.target.value
                  if (val.startsWith("https://")) val = val.slice(8)
                  else if (val.startsWith("http://")) val = val.slice(7)
                  setDomain(val)
                  if (error) setError("")
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit()
                }}
                className="h-11 w-full bg-transparent px-3 text-xs font-semibold text-foreground outline-none placeholder:text-muted-foreground/50 sm:text-sm"
                aria-invalid={!!error}
              />
            </div>

            {/* Controls Row: Model Popover & Scan Button */}
            <div className="flex items-center gap-2">
              {/* Popover Model Selector */}
              <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      className="h-11 flex-1 justify-between gap-2 rounded-xl border-input/80 px-3.5 text-xs font-semibold sm:flex-none sm:text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Cpu className="size-4 shrink-0 text-primary" />
                        <span className="max-w-[130px] truncate sm:max-w-none">
                          {activeModelObj.label}
                        </span>
                      </div>
                      <ChevronDown className="size-3.5 shrink-0 opacity-60" />
                    </Button>
                  }
                />

                <PopoverContent
                  align="end"
                  sideOffset={6}
                  className="w-72 rounded-2xl border border-border/80 bg-popover p-3 shadow-xl sm:w-80"
                >
                  <PopoverHeader className="mb-2 border-b border-border/40 pb-2">
                    <PopoverTitle className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                      Select Scanner Model
                    </PopoverTitle>
                  </PopoverHeader>

                  <div className="space-y-1.5">
                    {models.map((m) => {
                      const isSelected = selectedModel === m.value
                      return (
                        <button
                          key={m.value}
                          type="button"
                          onClick={() => {
                            setSelectedModel(m.value)
                            setOpenPopover(false)
                            if (error) setError("")
                          }}
                          className={`flex w-full items-start justify-between gap-3 rounded-xl p-2.5 text-left transition-all ${
                            isSelected
                              ? "border border-primary/30 bg-primary/10 text-foreground"
                              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                          }`}
                        >
                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-foreground">
                                {m.label}
                              </span>
                              {m.badge && (
                                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                                  {m.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] leading-relaxed text-muted-foreground">
                              {m.description}
                            </p>
                          </div>
                          {isSelected && (
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Scan Button */}
              <Button
                size="lg"
                onClick={handleSubmit}
                className="h-11 shrink-0 rounded-xl px-5 text-xs font-bold sm:text-sm"
              >
                <span>Scan</span>
                <ArrowRight className="ml-1 size-4" />
              </Button>
            </div>
          </div>

          {error && (
            <FieldError className="mt-2 text-xs font-semibold">
              {error}
            </FieldError>
          )}
        </Field>
      </div>

      {/* Alternative Extension CTA Section */}
      <div className="mx-auto w-full max-w-2xl space-y-4 pt-2 text-center">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border/60" />
          <span className="text-xs font-semibold text-muted-foreground">
            OR
          </span>
          <div className="h-px flex-1 bg-border/60" />
        </div>

        <div className="flex justify-center">
          <Link to="/learner/analyzer/extension">
            <Button
              variant="secondary"
              size="lg"
              className="h-11 cursor-pointer rounded-xl px-6 text-xs font-bold sm:text-sm"
            >
              <Puzzle className="mr-2 size-4 text-primary" />
              Use Analyzer Web Extension
            </Button>
          </Link>
        </div>
      </div>

      {/* Scan History Section (No Cards Used) */}
      <div className="mx-auto w-full max-w-4xl space-y-4 pt-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <History className="size-5 text-primary" />
            <h2 className="text-base font-bold text-foreground sm:text-lg">
              Recent Audits & History
            </h2>
          </div>
          <span className="text-xs font-bold text-muted-foreground">
            {analyzerResults.length} Scans Recorded
          </span>
        </div>

        {analyzerResults.length > 0 ? (
          <div className="divide-y divide-border/40 overflow-hidden rounded-2xl border border-border/60 bg-muted/10">
            {analyzerResults.map((item) => {
              const targetUrl =
                (item as any).url || item.data?.url || "https://attendex.online"
              const urlClean = targetUrl.replace(/^https?:\/\//, "")
              const score = item.data?.overall_score ?? 82
              const criticalCount =
                item.data?.summary?.find((s) => s.name === "critical")?.count ??
                2
              const seriousCount =
                item.data?.summary?.find((s) => s.name === "serious")?.count ??
                2
              const totalViolations = criticalCount + seriousCount

              return (
                <Link
                  key={item.id}
                  to={`/learner/analyzer/${item.id}`}
                  className="group flex flex-col gap-3 p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* Left: Domain & Meta */}
                  <div className="flex min-w-0 items-center gap-3.5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Globe className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-foreground group-hover:underline sm:text-base">
                        {urlClean}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="size-3 shrink-0" />
                        <span>August 27, 2026</span>
                        <span>•</span>
                        <span>{totalViolations} Violations Detected</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Scores & Link Action */}
                  <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400"
                      >
                        Score: {score}/100
                      </Badge>
                      <Badge
                        variant="outline"
                        className="rounded-lg px-2.5 py-1 text-xs font-semibold"
                      >
                        Level AA
                      </Badge>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1 px-2.5 text-xs font-bold text-muted-foreground group-hover:text-foreground"
                    >
                      <span>View Report</span>
                      <ArrowUpRight className="size-4" />
                    </Button>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-8 text-center text-xs text-muted-foreground">
            No previous audit scans found.
          </div>
        )}
      </div>
    </div>
  )
}

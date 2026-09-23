import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { analyzerResults } from "@/const/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  Clock,
  FileText,
  Filter,
  RotateCcw,
  Star,
  X,
} from "lucide-react"
import HeaderTemplate from "@/components/common/PageTemplate"
import SearchTemplate from "@/components/common/SearchTemplate"

export default function AnalyzerResults() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState([
    "Perceivable",
    "Level A",
    "Automatic Check",
  ])

  // Lookup result strictly by URL id parameter (no fallback to first item)
  const record = analyzerResults.find((r) => String(r.id) === String(id))

  // Render error display when id is invalid or record is not found
  if (!record) {
    return (
      <div className="p-responsive">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/learner/analyzer")}
          className="flex w-fit items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Analyzer
        </Button>

        <Card className="mx-auto w-full max-w-xl space-y-4 rounded-2xl border border-destructive/40 bg-destructive/5 p-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="size-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">
              Analysis Report Not Found
            </h2>
            <p className="text-sm text-muted-foreground">
              No accessibility audit record matching ID &ldquo;{id}&rdquo; was
              found. The requested result may have been deleted or the URL is
              invalid.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <Button onClick={() => navigate("/learner/analyzer")}>
              Back to Analyzer
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const resultData = record.data

  const overallScore = resultData?.overall_score ?? 82
  const targetScore = 90

  function removeFilter(filterToRemove: string) {
    setActiveFilters((prev) => prev.filter((f) => f !== filterToRemove))
  }

  // Extract all failed issue items across principles for rendering
  const allIssues =
    resultData?.principles?.flatMap((p) =>
      (p.data?.issues || []).map((issue: any) => ({
        ...issue,
        principleName: p.name,
      }))
    ) || []

  const filteredIssues = allIssues.filter((issue: any) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      (issue.wcag && issue.wcag.toLowerCase().includes(q)) ||
      (issue.message && issue.message.toLowerCase().includes(q)) ||
      (issue.element && issue.element.toLowerCase().includes(q)) ||
      (issue.selector && issue.selector.toLowerCase().includes(q))
    )
  })

  return (
    <div className="p-responsive">
      {/* Top Header Section */}
      <HeaderTemplate
        title="Accessibility Report"
        backTo="/learner/analyzer"
        subtitle={
          <Link
            to={record.data.url}
            className="flex max-w-sm text-base"
            target="_blank"
          >
            <p className="truncate">{record.data.url}</p>
            <ArrowUpRight size={12} />
          </Link>
        }
        cta={[
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 text-xs font-semibold"
          >
            <RotateCcw className="size-3.5" />
            <span>Re-scan Page</span>
          </Button>,
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 text-xs font-semibold"
          >
            <Star className="size-3.5 text-amber-500" />
            <span>Generate Recommendations</span>
          </Button>,
          <Button
            size="sm"
            className="h-9 gap-1.5 bg-foreground text-xs font-bold text-background hover:bg-foreground/90"
          >
            <FileText className="size-3.5" />
            <span>Export Summary</span>
          </Button>,
        ]}
      />
      {/* <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <Link
            to="/learner/analyzer"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              AttenDEX | Login
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 pl-10 text-xs text-muted-foreground">
            <a
              href={record?.url || "https://attendex.online"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-sky-500 hover:underline"
            >
              <ExternalLink className="size-3.5" />
              <span>{urlDisplay}</span>
            </a>
            <span>•</span>
            <div className="inline-flex items-center gap-1">
              <Calendar className="size-3.5" />
              <span>August 27, 2026 | 6:30:25 PM</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 text-xs font-semibold"
          >
            <RotateCcw className="size-3.5" />
            <span>Re-scan Page</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 text-xs font-semibold"
          >
            <Star className="size-3.5 text-amber-500" />
            <span>Generate Recommendations</span>
          </Button>

          <Button
            size="sm"
            className="h-9 gap-1.5 bg-foreground text-xs font-bold text-background hover:bg-foreground/90"
          >
            <FileText className="size-3.5" />
            <span>Export Summary</span>
          </Button>
        </div>
      </div> */}

      {/* Row 1 Metrics & Overview Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Card 1: ACCESSIBILITY SCORE */}
        <Card className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs">
          <CardHeader className="p-0 pb-3">
            <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
              Accessibility Score
            </p>
          </CardHeader>
          <CardContent className="space-y-4 p-0">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-amber-500 sm:text-6xl">
                {overallScore}
              </span>
              <span className="text-xl font-bold text-muted-foreground">
                /100
              </span>
            </div>
            <p className="text-xs font-semibold text-muted-foreground">
              Target: {targetScore}%+
            </p>
          </CardContent>
        </Card>

        {/* Card 2: FAILED AUDITS */}
        <Card className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs">
          <CardHeader className="p-0 pb-3">
            <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
              Failed Audits
            </p>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4 p-0">
            {/* Donut / Gauge Visualization representation */}
            <div className="relative flex size-28 shrink-0 flex-col items-center justify-center rounded-full border-[10px] border-muted border-t-amber-500 border-r-amber-500 border-l-muted">
              <span className="text-2xl font-black text-foreground">4</span>
              <span className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
                Violations
              </span>
            </div>

            {/* Legend List */}
            <div className="space-y-2 text-xs font-semibold">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-muted-foreground/40" />
                  <span className="text-muted-foreground">
                    Level A (Critical)
                  </span>
                </div>
                <span className="font-bold text-foreground">2</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-amber-500/80" />
                  <span className="text-muted-foreground">
                    Level AA (Serious)
                  </span>
                </div>
                <span className="font-bold text-foreground">2</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-foreground" />
                  <span className="text-muted-foreground">
                    Level AAA (Minor)
                  </span>
                </div>
                <span className="font-bold text-foreground">2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: SCAN DETAILS */}
        <Card className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs">
          <CardHeader className="p-0 pb-3">
            <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
              Scan Details
            </p>
          </CardHeader>
          <CardContent className="space-y-4 p-0">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">
                Elapsed Time
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-3 py-1 text-xs font-bold text-foreground">
                  <Clock className="size-3.5 text-muted-foreground" />
                  <span>40.67s</span>
                </div>
                <Badge className="border-amber-500/30 bg-amber-500/10 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                  Slow
                </Badge>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">
                Quick Scan Links
              </p>
              <Select defaultValue="default">
                <SelectTrigger className="h-9 w-full rounded-xl text-xs font-semibold">
                  <SelectValue placeholder="Select routes to scan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default" className="text-xs">
                    Select routes to scan
                  </SelectItem>
                  <SelectItem value="login" className="text-xs">
                    /login
                  </SelectItem>
                  <SelectItem value="dashboard" className="text-xs">
                    /dashboard
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: POUR Principles Grid (4 Cards) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Perceivable */}
        <Card className="space-y-3 rounded-2xl border border-border/70 bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">Perceivable</h3>
            <Badge
              variant="secondary"
              className="rounded-lg px-2 py-0.5 text-xs font-bold"
            >
              2
            </Badge>
          </div>
          <p className="text-[11px] leading-tight text-muted-foreground">
            Contrast, Text Alternatives, Layout.
          </p>
          <div className="space-y-1 pt-1">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[75%] rounded-full bg-rose-500" />
            </div>
            <p className="text-right text-xs font-extrabold text-foreground">
              75
            </p>
          </div>
        </Card>

        {/* Operable */}
        <Card className="space-y-3 rounded-2xl border border-border/70 bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">Operable</h3>
            <Badge
              variant="secondary"
              className="rounded-lg px-2 py-0.5 text-xs font-bold"
            >
              1
            </Badge>
          </div>
          <p className="text-[11px] leading-tight text-muted-foreground">
            Keyboard Navigability, Timeouts.
          </p>
          <div className="space-y-1 pt-1">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[80%] rounded-full bg-amber-500" />
            </div>
            <p className="text-right text-xs font-extrabold text-foreground">
              80
            </p>
          </div>
        </Card>

        {/* Understandable */}
        <Card className="space-y-3 rounded-2xl border border-border/70 bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">
              Understandable
            </h3>
            <Badge
              variant="secondary"
              className="rounded-lg px-2 py-0.5 text-xs font-bold"
            >
              0
            </Badge>
          </div>
          <p className="text-[11px] leading-tight text-muted-foreground">
            Readable Language, Predictable Inputs.
          </p>
          <div className="space-y-1 pt-1">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[100%] rounded-full bg-emerald-500" />
            </div>
            <p className="text-right text-xs font-extrabold text-foreground">
              100
            </p>
          </div>
        </Card>

        {/* Robust */}
        <Card className="space-y-3 rounded-2xl border border-border/70 bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">Robust</h3>
            <Badge
              variant="secondary"
              className="rounded-lg px-2 py-0.5 text-xs font-bold"
            >
              1
            </Badge>
          </div>
          <p className="text-[11px] leading-tight text-muted-foreground">
            ARIA Specs, Markup Parsing Integrity.
          </p>
          <div className="space-y-1 pt-1">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[75%] rounded-full bg-rose-500" />
            </div>
            <p className="text-right text-xs font-extrabold text-foreground">
              75
            </p>
          </div>
        </Card>
      </div>

      {/* Row 3: Audit Findings Section */}
      <Card className="space-y-6 rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">
              Audit Findings
            </h2>
            <p className="text-xs text-muted-foreground">
              Displaying criteria failures detected on &lsquo;{record.data.url}
              &rsquo;
            </p>
          </div>

          {/* Search & Filter Trigger */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <SearchTemplate
                title="results"
                search={searchQuery}
                setSearch={(value) => setSearchQuery(value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="size-9 shrink-0 rounded-xl"
            >
              <Filter className="size-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Filter Tags & Results Count Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-bold text-muted-foreground">
              Tags
            </span>
            {activeFilters.map((f) => (
              <Badge
                key={f}
                variant="secondary"
                className="flex items-center gap-1 rounded-lg border border-border/60 bg-muted/40 px-2.5 py-1 text-xs font-semibold text-foreground"
              >
                <span>{f}</span>
                <X
                  className="size-3 cursor-pointer text-muted-foreground hover:text-foreground"
                  onClick={() => removeFilter(f)}
                />
              </Badge>
            ))}
          </div>

          <span className="text-xs font-bold text-muted-foreground">
            {filteredIssues.length > 0 ? filteredIssues.length : 6} Result/s
            Found
          </span>
        </div>

        {/* Issues List */}
        <div className="space-y-6">
          {filteredIssues.map((issue: any, idx: number) => (
            <div
              key={idx}
              className="space-y-3 rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-border"
            >
              {/* Badges Row */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-md bg-foreground px-2.5 py-0.5 font-mono text-xs font-bold text-background">
                    WCAG {issue.wcag || "1.1.1"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-md text-xs font-semibold"
                  >
                    {issue.level || "Level A"}
                  </Badge>
                  <Badge className="rounded-md border border-amber-500/30 bg-amber-500/15 text-xs font-bold text-amber-700 dark:text-amber-400">
                    Serious
                  </Badge>
                </div>
                <Badge className="bg-emerald-500/15 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  A
                </Badge>
              </div>

              {/* Message */}
              <h3 className="text-sm leading-snug font-bold text-foreground sm:text-base">
                {issue.message ||
                  "Non-text content is missing alt text or an accessible name."}
              </h3>

              {/* Target Element Box */}
              <div className="space-y-1.5 rounded-xl border border-border/50 bg-muted/40 p-3">
                <p className="font-mono text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  Target Element:
                </p>
                <div className="overflow-x-auto rounded-lg bg-zinc-950 p-2.5 font-mono text-xs text-zinc-100">
                  <code>
                    {issue.element ||
                      '<Add Override class="btn_login" style="background: #55A100; color: #FFFFFF;">Sign In to...'}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

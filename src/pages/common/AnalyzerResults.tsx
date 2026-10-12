import { useEffect, useState, useMemo, useRef } from "react"
import { useParams, Link, useNavigate, useLocation } from "react-router-dom"
import { analyzerResults } from "@/const/data"
import type {
  Result,
  PrincipleItem,
  PrincipleIssue,
  PrinciplePassed,
} from "@/const/materialsProps"
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
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Download,
  Eye,
  Globe,
  Loader2,
  RotateCcw,
  ShieldCheck,
} from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { analyzerAPI, sitemapAPI } from "@/services/api/materialsAPI"
import SearchTemplate from "@/components/common/SearchTemplate"

function capitalize(str: string): string {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function getSummaryCount(
  summaryList: unknown,
  name: "critical" | "serious" | "moderate" | "minor" | "total_passed"
): number {
  if (Array.isArray(summaryList)) {
    const item = summaryList.find(
      (s: { name?: string; count?: number }) =>
        s.name?.toLowerCase() === name.toLowerCase() ||
        (name === "total_passed" && s.name?.toLowerCase() === "passed")
    )
    return item?.count ?? 0
  }
  if (summaryList && typeof summaryList === "object") {
    const obj = summaryList as Record<string, number>
    return obj[`${name}_count`] ?? 0
  }
  return 0
}

function getSeverityBadgeClass(severity?: string): string {
  const s = severity?.toLowerCase()
  if (s === "critical") {
    return "border-rose-500/30 bg-rose-500/15 text-rose-700 dark:text-rose-400 font-bold"
  }
  if (s === "serious") {
    return "border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold"
  }
  if (s === "moderate") {
    return "border-orange-500/30 bg-orange-500/15 text-orange-700 dark:text-orange-400 font-bold"
  }
  return "border-blue-500/30 bg-blue-500/15 text-blue-700 dark:text-blue-400 font-bold"
}

interface ReportPage {
  key: string
  result: Result
}

function createOverallResult(pages: ReportPage[]): Result | null {
  if (!pages.length) return null

  const grouped = new Map<string, PrincipleItem>()
  const summary = new Map<string, number>()
  let scoreTotal = 0

  for (const page of pages) {
    scoreTotal += page.result.overall_score || 0
    for (const item of Array.isArray(page.result.summary) ? page.result.summary : []) {
      if (typeof item === "object" && "name" in item && "count" in item) {
        summary.set(item.name, (summary.get(item.name) || 0) + item.count)
      }
    }
    for (const principle of page.result.principles || []) {
      const key = principle.name.toLowerCase()
      const existing = grouped.get(key) || {
        name: principle.name,
        data: { score: 0, issues: [], passed: [], manual_review: [] },
      }
      existing.data.issues.push(...(principle.data.issues || []))
      existing.data.passed?.push(...(principle.data.passed || []))
      existing.data.manual_review?.push(...(principle.data.manual_review || []))
      grouped.set(key, existing)
    }
  }

  const principles = [...grouped.values()].map((principle) => {
    const checked = principle.data.issues.length + (principle.data.passed?.length || 0) + (principle.data.manual_review?.length || 0)
    return {
      ...principle,
      data: {
        ...principle.data,
        score: checked ? Math.round(((principle.data.passed?.length || 0) / checked) * 100) : 100,
      },
    }
  })

  const origin = new URL(pages[0].result.url).origin
  return {
    url: `${origin} (Overall)`,
    overall_score: Math.round(scoreTotal / pages.length),
    principles,
    summary: [...summary.entries()].map(([name, count]) => ({ name, count })),
    principle_scores: principles.map((principle) => ({ principle: principle.name, score: principle.data.score })),
  }
}

export default function AnalyzerResults() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<"issues" | "passed" | "manual">(
    "issues"
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPrinciple, setSelectedPrinciple] = useState<string>("all")
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all")
  const [copiedSummary, setCopiedSummary] = useState(false)
  const [domainPages, setDomainPages] = useState<string[]>([])
  const [isLoadingDomainPages, setIsLoadingDomainPages] = useState(false)
  const [domainPagesError, setDomainPagesError] = useState("")
  const [showAllDomainPages, setShowAllDomainPages] = useState(false)
  const loadedSitemapOriginRef = useRef<string | null>(null)

  // Retrieve result from router state, sessionStorage, or mock data
  const [resultData, setResultData] = useState<Result | null>(() => {
    // 1. Router location state
    if (location.state?.result) {
      return location.state.result
    }
    // 2. Specific session ID
    try {
      if (id) {
        const byId = sessionStorage.getItem(
          `frontaccease_analyzer_result_${id}`
        )
        if (byId) return JSON.parse(byId)
      }
      const latest = sessionStorage.getItem(
        "frontaccease_latest_analyzer_result"
      )
      if (latest && (id === "latest" || id === "1")) {
        return JSON.parse(latest)
      }
    } catch (e) {
      console.error("Failed to parse analyzer result from session", e)
    }
    // 3. Mock fallback
    const record = analyzerResults.find((r) => String(r.id) === String(id))
    return record?.data || analyzerResults[0]?.data || null
  })
  const [reportPages, setReportPages] = useState<ReportPage[]>(() =>
    resultData ? [{ key: resultData.url, result: resultData }] : []
  )
  const [activeReportKey, setActiveReportKey] = useState(() => resultData?.url || "")

  // Re-scan mutation
  const rescanMutation = useMutation({
    mutationFn: (urlToRescan: string) => analyzerAPI(urlToRescan),
    onSuccess: (data: Result) => {
      setResultData(data)
      setReportPages((pages) => pages.map((page) =>
        page.key === activeReportKey ? { ...page, result: data } : page
      ))
      try {
        if (id) {
          sessionStorage.setItem(
            `frontaccease_analyzer_result_${id}`,
            JSON.stringify(data)
          )
        }
        sessionStorage.setItem(
          "frontaccease_latest_analyzer_result",
          JSON.stringify(data)
        )
      } catch (e) {
        console.error("Failed to update session scan", e)
      }
    },
  })

  const pageScanMutation = useMutation({
    mutationFn: (urlToScan: string) => analyzerAPI(urlToScan),
    onSuccess: (data: Result) => {
      setReportPages((pages) => {
        const existing = pages.find((page) => page.key === data.url)
        return existing
          ? pages.map((page) => page.key === data.url ? { ...page, result: data } : page)
          : [...pages, { key: data.url, result: data }]
      })
      setActiveReportKey(data.url)
      setResultData(data)
    },
  })

  useEffect(() => {
    if (!id || reportPages.length === 0) return
    try {
      sessionStorage.setItem(`frontaccease_domain_report_${id}`, JSON.stringify(reportPages))
    } catch (error) {
      console.error("Failed to save domain report", error)
    }
  }, [id, reportPages])

  useEffect(() => {
    const sourceUrl = reportPages[0]?.result.url || resultData?.url
    if (!sourceUrl) return
    let sourceOrigin: string
    try {
      sourceOrigin = new URL(sourceUrl).origin
    } catch {
      return
    }
    if (loadedSitemapOriginRef.current === sourceOrigin) return
    loadedSitemapOriginRef.current = sourceOrigin
    let cancelled = false

    const loadDomainPages = async () => {
      setIsLoadingDomainPages(true)
      setDomainPagesError("")
      setShowAllDomainPages(false)
      try {
        const currentUrl = new URL(sourceUrl)
        currentUrl.hash = ""
        const links = await sitemapAPI(sourceUrl)
        if (cancelled) return
        const uniqueSameDomainLinks = Array.from(
          new Set(
            links
              .map((link) => {
                try {
                  const parsed = new URL(link)
                  parsed.hash = ""
                  return parsed.origin === sourceOrigin ? parsed.toString() : ""
                } catch {
                  return ""
                }
              })
              .filter((link) => link && link !== currentUrl.toString())
          )
        ).sort()
        setDomainPages(uniqueSameDomainLinks)
      } catch {
        if (!cancelled) {
          setDomainPages([])
          setDomainPagesError("No sitemap pages were found for this domain.")
        }
      } finally {
        if (!cancelled) setIsLoadingDomainPages(false)
      }
    }

    void loadDomainPages()
    return () => {
      cancelled = true
    }
  }, [reportPages, resultData?.url])

  function selectReportTab(key: string) {
    setActiveReportKey(key)
    setActiveTab("issues")
    setSearchQuery("")
    setSelectedPrinciple("all")
    setSelectedSeverity("all")
    if (key === "overall") {
      const overall = createOverallResult(reportPages)
      if (overall) setResultData(overall)
      return
    }
    const page = reportPages.find((item) => item.key === key)
    if (page) setResultData(page.result)
  }

  // Extract all issues across principles
  const allIssues = useMemo(() => {
    if (!resultData) return []
    return (
      resultData.principles?.flatMap((p) =>
        (p.data?.issues || []).map((issue: PrincipleIssue) => ({
          ...issue,
          principleName: capitalize(p.name),
        }))
      ) || []
    )
  }, [resultData])

  // Extract all passed checks across principles
  const allPassed = useMemo(() => {
    if (!resultData) return []
    return (
      resultData.principles?.flatMap((p) =>
        (p.data?.passed || []).map((passedItem: PrinciplePassed) => ({
          ...passedItem,
          principleName: capitalize(p.name),
        }))
      ) || []
    )
  }, [resultData])

  // Extract manual review items
  const allManual = useMemo(() => {
    if (!resultData) return []
    return (
      resultData.principles?.flatMap((p) =>
        (p.data?.manual_review || []).map((item: any) => ({
          ...item,
          principleName: capitalize(p.name),
        }))
      ) || []
    )
  }, [resultData])

  // Filter issues
  const filteredIssues = useMemo(() => {
    return allIssues.filter((issue) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesQuery =
          (issue.wcag && issue.wcag.toLowerCase().includes(q)) ||
          (issue.message && issue.message.toLowerCase().includes(q)) ||
          (issue.element && issue.element.toLowerCase().includes(q)) ||
          (issue.selector && issue.selector.toLowerCase().includes(q)) ||
          (issue.identifier && issue.identifier.toLowerCase().includes(q))
        if (!matchesQuery) return false
      }

      // Principle filter
      if (
        selectedPrinciple !== "all" &&
        issue.principleName.toLowerCase() !== selectedPrinciple.toLowerCase()
      ) {
        return false
      }

      // Severity filter
      if (
        selectedSeverity !== "all" &&
        issue.severity?.toLowerCase() !== selectedSeverity.toLowerCase()
      ) {
        return false
      }

      return true
    })
  }, [allIssues, searchQuery, selectedPrinciple, selectedSeverity])

  // Filter passed criteria
  const filteredPassed = useMemo(() => {
    return allPassed.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesQuery =
          (item.wcag && item.wcag.toLowerCase().includes(q)) ||
          (item.message && item.message.toLowerCase().includes(q)) ||
          (item.element && item.element.toLowerCase().includes(q)) ||
          (item.selector && item.selector.toLowerCase().includes(q))
        if (!matchesQuery) return false
      }

      if (
        selectedPrinciple !== "all" &&
        item.principleName.toLowerCase() !== selectedPrinciple.toLowerCase()
      ) {
        return false
      }

      return true
    })
  }, [allPassed, searchQuery, selectedPrinciple])

  // Principle scores mapped
  const principleScoresList = useMemo(() => {
    if (!resultData) return []
    if (resultData.principle_scores && resultData.principle_scores.length > 0) {
      return resultData.principle_scores.map((ps) => {
        const foundPrinciple = resultData.principles?.find(
          (p) => p.name.toLowerCase() === ps.principle.toLowerCase()
        )
        const issuesCount = foundPrinciple?.data?.issues?.length ?? 0
        const passedCount = foundPrinciple?.data?.passed?.length ?? 0
        return {
          name: capitalize(ps.principle),
          score: ps.score,
          issuesCount,
          passedCount,
        }
      })
    }

    return (resultData.principles || []).map((p) => ({
      name: capitalize(p.name),
      score: p.data?.score ?? 80,
      issuesCount: p.data?.issues?.length ?? 0,
      passedCount: p.data?.passed?.length ?? 0,
    }))
  }, [resultData])

  if (!resultData) {
    return (
      <div className="p-responsive space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/learner/analyzer")}
          className="flex w-fit items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Analyzer</span>
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
              found. You can run a new automated scan from the analyzer page.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <Button onClick={() => navigate("/learner/analyzer")}>
              Run New Scan
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const overallScore = resultData.overall_score ?? 90
  const isOverallReport = activeReportKey === "overall"
  const isScoreHigh = overallScore >= 90
  const isScoreMedium = overallScore >= 70 && overallScore < 90

  // Calculate summary counts
  const criticalCount = getSummaryCount(resultData.summary, "critical")
  const seriousCount = getSummaryCount(resultData.summary, "serious")
  const moderateCount = getSummaryCount(resultData.summary, "moderate")
  const minorCount = getSummaryCount(resultData.summary, "minor")
  const totalViolations =
    criticalCount + seriousCount + moderateCount + minorCount
  const totalPassedCount = getSummaryCount(resultData.summary, "total_passed")
  const visibleDomainPages = showAllDomainPages ? domainPages : domainPages.slice(0, 12)

  // Export JSON handler
  function handleExportJSON() {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(resultData, null, 2))
    const downloadAnchor = document.createElement("a")
    downloadAnchor.setAttribute("href", dataStr)
    const hostClean = resultData?.url
      .replace(/^https?:\/\//, "")
      .replace(/[^\w-]/g, "_")
    downloadAnchor.setAttribute("download", `${hostClean}-wcag-audit.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  // Copy Markdown Summary handler
  function handleCopySummary() {
    const summaryText = `# WCAG Audit: ${resultData?.url}
Overall Compliance Score: ${overallScore}/100
Violations: ${totalViolations} (Critical: ${criticalCount}, Serious: ${seriousCount}, Moderate: ${moderateCount}, Minor: ${minorCount})
Total Passed Checks: ${totalPassedCount}

## Failed Criteria:
${allIssues
  .map(
    (issue, i) =>
      `${i + 1}. [${issue.wcag}] (${issue.level ?? "A"}) ${issue.message}\n   Selector: ${issue.selector ?? issue.element ?? "N/A"}`
  )
  .join("\n")}
`
    navigator.clipboard.writeText(summaryText)
    setCopiedSummary(true)
    setTimeout(() => setCopiedSummary(false), 2000)
  }

  return (
    <div className="p-responsive space-y-6">
      {/* Top Navigation & Actions Bar */}
      <div className="flex flex-col gap-4 border-b border-border/60 pb-5 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Link
              to="/learner/analyzer"
              className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Back to URL Analyzer"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Accessibility Audit Report
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pl-10 text-xs text-muted-foreground sm:text-sm">
            {isOverallReport ? (
              <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                <Globe className="size-3.5" />
                <span>{reportPages.length} scanned pages</span>
              </span>
            ) : (
              <a
                href={resultData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
              >
                <Globe className="size-3.5" />
                <span>{resultData.url}</span>
                <ArrowUpRight className="size-3" />
              </a>
            )}
            <span>•</span>
            <Badge variant="outline" className="text-xs">
              WCAG 2.1 Level AA/AAA
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => rescanMutation.mutate(resultData.url)}
            disabled={rescanMutation.isPending || isOverallReport}
            className="h-9 gap-1.5 text-xs font-semibold"
          >
            {rescanMutation.isPending ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <RotateCcw className="size-3.5" />
            )}
            <span>
              {rescanMutation.isPending ? "Re-scanning..." : "Re-scan Page"}
            </span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopySummary}
            className="h-9 gap-1.5 text-xs font-semibold"
          >
            {copiedSummary ? (
              <Check className="size-3.5 text-emerald-500" />
            ) : (
              <Copy className="size-3.5" />
            )}
            <span>{copiedSummary ? "Copied" : "Copy Summary"}</span>
          </Button>

          <Button
            size="sm"
            onClick={handleExportJSON}
            className="h-9 gap-1.5 text-xs font-bold"
          >
            <Download className="size-3.5" />
            <span>Export JSON</span>
          </Button>
        </div>
      </div>

      <Card className="border-border/70 bg-card shadow-xs">
        <CardContent className="p-4">
          <div className="mb-2 text-xs font-bold tracking-wide text-muted-foreground uppercase">Scanned pages</div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {reportPages.map((page) => {
              const pathname = new URL(page.result.url).pathname
              const label = pathname === "/" ? "Home" : pathname
              const isActive = activeReportKey === page.key
              return (
                <Button
                  key={page.key}
                  type="button"
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => selectReportTab(page.key)}
                  className="h-8 shrink-0 max-w-52 truncate text-xs"
                  title={page.result.url}
                >
                  {label}
                </Button>
              )
            })}
            <Button
              type="button"
              variant={isOverallReport ? "default" : "outline"}
              size="sm"
              onClick={() => selectReportTab("overall")}
              className="h-8 shrink-0 text-xs"
            >
              Overall
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/70 bg-card shadow-xs">
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 p-5 pb-3">
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
              <Globe className="size-4 text-primary" />
              Scan more pages in this domain
            </h2>
            <p className="text-xs text-muted-foreground">
              Pages are discovered from this website&apos;s sitemap. Each follow-up uses Fast Scan and is added as a tab above.
            </p>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {isLoadingDomainPages ? "Finding pages…" : `${domainPages.length} pages`}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3 p-5 pt-0">
          {isLoadingDomainPages ? (
            <div className="flex items-center gap-2 py-3 text-xs text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Checking the sitemap for same-domain pages…
            </div>
          ) : domainPages.length > 0 ? (
            <>
              <div className="grid gap-2 sm:grid-cols-2">
                {visibleDomainPages.map((pageUrl) => (
                  <div key={pageUrl} className="flex min-w-0 items-center gap-2 rounded-lg border border-border/60 bg-muted/20 p-2">
                    <span className="min-w-0 flex-1 truncate font-mono text-xs text-foreground" title={pageUrl}>
                      {pageUrl.replace(/^https?:\/\//, "")}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 shrink-0 px-2 text-xs"
                      onClick={() => pageScanMutation.mutate(pageUrl)}
                      disabled={pageScanMutation.isPending}
                    >
                      {pageScanMutation.isPending && pageScanMutation.variables === pageUrl ? <Loader2 className="size-3 animate-spin" /> : "Scan"}
                    </Button>
                  </div>
                ))}
              </div>
              {domainPages.length > 12 && (
                <Button variant="ghost" size="sm" onClick={() => setShowAllDomainPages((shown) => !shown)} className="text-xs">
                  {showAllDomainPages ? "Show fewer pages" : `Show all ${domainPages.length} pages`}
                </Button>
              )}
            </>
          ) : (
            <p className="py-2 text-xs text-muted-foreground">
              {domainPagesError || "No additional same-domain pages are available."}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Row 1: High-Level Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Card 1: ACCESSIBILITY SCORE */}
        <Card className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs">
          <CardHeader className="p-0 pb-3">
            <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
              Accessibility Score
            </p>
          </CardHeader>
          <CardContent className="space-y-4 p-0">
            <div className="flex items-baseline gap-1.5">
              <span
                className={`font-heading text-5xl font-black sm:text-6xl ${
                  isScoreHigh
                    ? "text-emerald-500 dark:text-emerald-400"
                    : isScoreMedium
                      ? "text-amber-500 dark:text-amber-400"
                      : "text-rose-500 dark:text-rose-400"
                }`}
              >
                {overallScore}
              </span>
              <span className="text-xl font-bold text-muted-foreground">
                /100
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={`text-xs font-bold ${
                  isScoreHigh
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : isScoreMedium
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                }`}
              >
                {isScoreHigh
                  ? "WCAG 2.1 Compliant (High)"
                  : isScoreMedium
                    ? "Needs Attention (Medium)"
                    : "Action Required (Low)"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Target: 90%+
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: VIOLATION BREAKDOWN */}
        <Card className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs">
          <CardHeader className="p-0 pb-3">
            <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
              Violations &amp; Passed Rules
            </p>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4 p-0">
            {/* Violations Count Display */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-muted/30 p-3 text-center sm:p-4">
              <span className="font-heading text-3xl font-black text-foreground sm:text-4xl">
                {totalViolations}
              </span>
              <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                Issues
              </span>
            </div>

            {/* Severity Breakdown Legend */}
            <div className="flex-1 space-y-1.5 text-xs font-semibold">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-rose-500" />
                  <span className="text-muted-foreground">Critical</span>
                </div>
                <span className="font-bold text-foreground">
                  {criticalCount}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-amber-500" />
                  <span className="text-muted-foreground">Serious</span>
                </div>
                <span className="font-bold text-foreground">
                  {seriousCount}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-orange-500" />
                  <span className="text-muted-foreground">Moderate</span>
                </div>
                <span className="font-bold text-foreground">
                  {moderateCount}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-border/40 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="text-muted-foreground">Passed Checks</span>
                </div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {totalPassedCount}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: AUDIT SUMMARY DETAILS */}
        <Card className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs">
          <CardHeader className="p-0 pb-3">
            <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
              Audit Scope &amp; Target
            </p>
          </CardHeader>
          <CardContent className="space-y-3 p-0 text-xs">
            <div className="space-y-1">
              <span className="text-muted-foreground">Audited URL:</span>
              <p className="truncate font-mono font-bold text-foreground">
                {resultData.url}
              </p>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-2.5">
              <span className="font-medium text-muted-foreground">
                Total Criteria Evaluated:
              </span>
              <span className="font-mono font-bold text-foreground">
                {totalViolations + totalPassedCount} Rules
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-primary" />
              <span>Tested against W3C WAI-ARIA authoring practices</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: POUR Principles Grid (4 Cards) */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
          W3C POUR Principles Breakdown
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principleScoresList.map((p) => {
            const isHigh = p.score >= 90
            const isMedium = p.score >= 70 && p.score < 90
            const isSelected =
              selectedPrinciple.toLowerCase() === p.name.toLowerCase()

            return (
              <Card
                key={p.name}
                onClick={() =>
                  setSelectedPrinciple((prev) =>
                    prev.toLowerCase() === p.name.toLowerCase() ? "all" : p.name
                  )
                }
                className={`cursor-pointer rounded-2xl border p-4 shadow-xs transition-all hover:border-primary/50 ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border/70 bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-base font-bold text-foreground">
                    {p.name}
                  </h3>
                  <Badge
                    variant={p.issuesCount > 0 ? "secondary" : "outline"}
                    className={`text-xs font-bold ${
                      p.issuesCount > 0
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {p.issuesCount} issue{p.issuesCount !== 1 ? "s" : ""}
                  </Badge>
                </div>

                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {p.passedCount} passed
                    </span>
                    <span
                      className={`font-mono font-extrabold ${
                        isHigh
                          ? "text-emerald-600 dark:text-emerald-400"
                          : isMedium
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {p.score}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isHigh
                          ? "bg-emerald-500"
                          : isMedium
                            ? "bg-amber-500"
                            : "bg-rose-500"
                      }`}
                      style={{
                        width: `${Math.min(100, Math.max(5, p.score))}%`,
                      }}
                    />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Row 3: Filterable Findings & Audits View */}
      <Card className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-6">
        {/* Navigation Tabs Header */}
        <div className="flex flex-col gap-4 border-b border-border/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("issues")}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                activeTab === "issues"
                  ? "bg-foreground text-background"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <AlertTriangle className="size-3.5" />
              <span>Violations ({allIssues.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("passed")}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                activeTab === "passed"
                  ? "bg-foreground text-background"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              <span>Passed Rules ({allPassed.length})</span>
            </button>

            {allManual.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("manual")}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                  activeTab === "manual"
                    ? "bg-foreground text-background"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Eye className="size-3.5" />
                <span>Manual Review ({allManual.length})</span>
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="w-full sm:w-72">
            <SearchTemplate
              title={activeTab === "issues" ? "violations" : "criteria"}
              search={searchQuery}
              setSearch={setSearchQuery}
            />
          </div>
        </div>

        {/* Filters Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 pb-2">
          <div className="flex flex-wrap items-center gap-2">
            {/* Principle Filter Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-muted-foreground">
                Principle:
              </span>
              <Select
                value={selectedPrinciple}
                onValueChange={(val) => {
                  if (val) setSelectedPrinciple(val)
                }}
              >
                <SelectTrigger className="h-8 rounded-lg text-xs font-medium">
                  <SelectValue placeholder="All Principles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">
                    All Principles
                  </SelectItem>
                  <SelectItem value="perceivable" className="text-xs">
                    Perceivable
                  </SelectItem>
                  <SelectItem value="operable" className="text-xs">
                    Operable
                  </SelectItem>
                  <SelectItem value="understandable" className="text-xs">
                    Understandable
                  </SelectItem>
                  <SelectItem value="robust" className="text-xs">
                    Robust
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Severity Filter Dropdown (Active in Issues Tab) */}
            {activeTab === "issues" && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-muted-foreground">
                  Severity:
                </span>
                <Select
                  value={selectedSeverity}
                  onValueChange={(val) => {
                    if (val) setSelectedSeverity(val)
                  }}
                >
                  <SelectTrigger className="h-8 rounded-lg text-xs font-medium">
                    <SelectValue placeholder="All Severities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-xs">
                      All Severities
                    </SelectItem>
                    <SelectItem value="critical" className="text-xs">
                      Critical
                    </SelectItem>
                    <SelectItem value="serious" className="text-xs">
                      Serious
                    </SelectItem>
                    <SelectItem value="moderate" className="text-xs">
                      Moderate
                    </SelectItem>
                    <SelectItem value="minor" className="text-xs">
                      Minor
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {(selectedPrinciple !== "all" ||
              selectedSeverity !== "all" ||
              searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedPrinciple("all")
                  setSelectedSeverity("all")
                  setSearchQuery("")
                }}
                className="h-8 px-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Reset Filters
              </Button>
            )}
          </div>

          <span className="text-xs font-bold text-muted-foreground">
            {activeTab === "issues"
              ? `${filteredIssues.length} of ${allIssues.length} Violations`
              : `${filteredPassed.length} of ${allPassed.length} Passed Rules`}
          </span>
        </div>

        {/* TAB 1: VIOLATIONS LIST */}
        {activeTab === "issues" && (
          <div className="mt-4 space-y-4">
            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue, idx) => (
                <div
                  key={`${issue.wcag}-${idx}`}
                  className="space-y-3 rounded-2xl border border-border/70 bg-card p-4 transition-all hover:border-primary/40 sm:p-5"
                >
                  {/* Badges Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-foreground font-mono text-xs font-bold text-background">
                        WCAG {issue.wcag}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs font-semibold"
                      >
                        Level {issue.level ?? "A"}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${getSeverityBadgeClass(issue.severity)}`}
                      >
                        {capitalize(issue.severity || "Serious")}
                      </Badge>
                    </div>

                    <Badge
                      variant="outline"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      {issue.principleName}
                    </Badge>
                  </div>

                  {/* Message */}
                  <h3 className="font-heading text-sm font-bold text-foreground sm:text-base">
                    {issue.message}
                  </h3>

                  {/* Target Element & Selector */}
                  <div className="space-y-2 rounded-xl border border-border/60 bg-muted/30 p-3 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-mono font-semibold text-muted-foreground">
                        <Code2 className="size-3.5 text-primary" />
                        <span>Target Selector:</span>
                        <code className="rounded bg-muted px-1.5 py-0.5 font-bold text-foreground">
                          {issue.selector || issue.element || "N/A"}
                        </code>
                      </div>
                      {issue.count !== undefined && (
                        <span className="font-mono text-xs text-muted-foreground">
                          Detected Count: {issue.count}
                        </span>
                      )}
                    </div>

                    {issue.element && (
                      <div className="overflow-x-auto rounded-lg bg-zinc-950 p-2.5 font-mono text-xs text-zinc-100">
                        <code>{issue.element}</code>
                      </div>
                    )}

                    {/* Affected Examples List */}
                    {issue.examples && issue.examples.length > 1 && (
                      <div className="space-y-1 pt-1">
                        <span className="text-xs font-bold text-muted-foreground">
                          Affected Instances ({issue.examples.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {issue.examples.map((ex, exIdx) => (
                            <code
                              key={exIdx}
                              className="rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono text-xs"
                            >
                              {ex.selector || ex.element}
                            </code>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-12 text-center">
                <CheckCircle2 className="size-10 text-emerald-500" />
                <h4 className="mt-3 text-base font-bold text-foreground">
                  No Violations Found Matching Criteria
                </h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try clearing search or filters to see other findings.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PASSED RULES LIST */}
        {activeTab === "passed" && (
          <div className="mt-4 space-y-3">
            {filteredPassed.length > 0 ? (
              filteredPassed.map((passedItem, idx) => (
                <div
                  key={`${passedItem.wcag}-${idx}`}
                  className="flex flex-col gap-2 rounded-xl border border-border/60 bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                      <Badge
                        variant="outline"
                        className="font-mono text-xs font-bold"
                      >
                        WCAG {passedItem.wcag}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Level {passedItem.level ?? "A"}
                      </Badge>
                      <span className="text-xs font-medium text-muted-foreground">
                        ({passedItem.principleName})
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {passedItem.message}
                    </p>
                  </div>

                  {passedItem.selector && (
                    <code className="shrink-0 rounded bg-muted/60 px-2 py-1 font-mono text-xs text-muted-foreground">
                      {passedItem.selector}
                    </code>
                  )}
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No passed rules match your filters.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MANUAL REVIEW LIST */}
        {activeTab === "manual" && (
          <div className="mt-4 space-y-3">
            {allManual.length > 0 ? (
              allManual.map((item, idx) => (
                <div
                  key={idx}
                  className="space-y-2 rounded-xl border border-border/60 bg-card p-4"
                >
                  <div className="flex items-center gap-2">
                    <Eye className="size-4 text-primary" />
                    <span className="font-mono text-xs font-bold">
                      WCAG {item.wcag}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Manual Check
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {item.message}
                  </p>
                  {item.element && (
                    <code className="block rounded bg-muted p-2 font-mono text-xs">
                      {item.element}
                    </code>
                  )}
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No items require manual verification.
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

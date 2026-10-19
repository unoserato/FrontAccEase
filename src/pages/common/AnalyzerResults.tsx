import { useState, useMemo, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import type {
  AnalyzerResultItem,
  AnalyzerResultsProps,
  Content,
  PrincipleIssue,
  PrincipleItem,
  PrinciplePassed,
  Result,
  Task,
  WcagEvaluationProps,
} from "@/const/props/analyzerProps"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
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
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code2,
  Copy,
  ExternalLink,
  Eye,
  FileDown,
  Globe,
  Hash,
  Loader2,
  Network,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react"

import { useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/toast"
import { cn } from "cn"
import SearchTemplate from "@/components/common/SearchTemplate"
import { RichText } from "@/components/learner/RichText"
import { exportAnalyzerReportToPDF } from "@/lib/pdfExport"
import {
  useAnalyzer,
  useAnalyzerResultById,
  useSitemap,
} from "@/services/tanstack/materials"
import { getDateString } from "@/hooks/date-to-string"
import copyText from "@/hooks/copy-text"

function capitalize(str: string): string {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function getSummaryCount(
  summaryList: unknown,
  name: "critical" | "serious" | "moderate" | "minor" | "total_passed"
): number {
  if (Array.isArray(summaryList)) {
    const item = summaryList.find((s: { name?: string; count?: number }) => {
      const itemName = s.name?.toLowerCase()
      const targetName = name.toLowerCase()
      if (itemName === targetName) return true
      if (
        (targetName === "total_passed" && itemName === "passed") ||
        (targetName === "passed" && itemName === "total_passed")
      ) {
        return true
      }
      return false
    })
    return item?.count ?? 0
  }
  if (summaryList && typeof summaryList === "object") {
    const obj = summaryList as Record<string, number>
    return (
      obj[`${name}_count`] ??
      (name === "total_passed"
        ? (obj["passed_count"] ?? obj["total_passed"] ?? 0)
        : 0)
    )
  }
  return 0
}

function getScoreConfig(score: number): {
  color: string
  bg: string
  label: string
  ring: string
} {
  if (score >= 90)
    return {
      color: "text-emerald-500 dark:text-emerald-400",
      bg: "bg-emerald-500",
      label: "WCAG 2.2 Compliant",
      ring: "ring-emerald-500/20",
    }
  if (score >= 70)
    return {
      color: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-500",
      label: "Needs Attention",
      ring: "ring-amber-500/20",
    }
  return {
    color: "text-rose-500 dark:text-rose-400",
    bg: "bg-rose-500",
    label: "Action Required",
    ring: "ring-rose-500/20",
  }
}

function formatElapsedTime(seconds?: number): string {
  if (!Number.isFinite(seconds) || seconds === undefined || seconds < 0) {
    return "Not recorded"
  }

  const roundedSeconds = Math.round(seconds)
  const minutes = Math.floor(roundedSeconds / 60)
  const remainingSeconds = roundedSeconds % 60

  return minutes
    ? `${minutes}m ${remainingSeconds.toString().padStart(2, "0")}s`
    : `${remainingSeconds}s`
}

type FindingType = "issue" | "passed" | "manual"

interface FindingItem {
  type: FindingType
  wcag?: string
  level?: string
  message?: string
  principleName: string
  status?: string
  severity?: string | null
  count?: number
  selector?: string
  element?: string
  identifier?: string
  evaluationPrompt?: string
  examples?: Array<{
    element?: string
    selector?: string
    identifier?: string
  }>
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    copyText({
      textToCopy: text,
      setCopied(value) {
        setCopied(value)
      },
    })
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Copy ${label}`}
      className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none"
    >
      {copied ? (
        <>
          <Check className="size-3 text-emerald-500" />
          <span className="font-mono text-xs text-emerald-500">Copied</span>
        </>
      ) : (
        <>
          <Copy className="size-3" />
          <span className="font-mono text-xs">Copy</span>
        </>
      )}
    </button>
  )
}

function getFindingConfig(item: {
  type: FindingType
  severity?: string | null
}) {
  if (item.type === "passed") {
    return {
      dot: "bg-emerald-500",
      badge:
        "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
      label: "Passed",
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
      previewIconColor: "text-emerald-500",
      previewTextColor: "text-emerald-400",
    }
  }
  if (item.type === "manual") {
    return {
      dot: "bg-violet-500",
      badge:
        "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-400",
      label: "Manual Check",
      icon: Eye,
      iconColor: "text-violet-500",
      previewIconColor: "text-violet-400",
      previewTextColor: "text-violet-300",
    }
  }

  const s = item.severity?.toLowerCase()
  if (s === "critical") {
    return {
      dot: "bg-rose-500",
      badge:
        "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400",
      label: "Critical",
      icon: AlertCircle,
      iconColor: "text-rose-500",
      previewIconColor: "text-rose-400",
      previewTextColor: "text-rose-300",
    }
  }
  if (s === "serious") {
    return {
      dot: "bg-amber-500",
      badge:
        "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
      label: "Serious",
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      previewIconColor: "text-amber-400",
      previewTextColor: "text-amber-300",
    }
  }
  if (s === "moderate") {
    return {
      dot: "bg-orange-500",
      badge:
        "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-400",
      label: "Moderate",
      icon: AlertTriangle,
      iconColor: "text-orange-500",
      previewIconColor: "text-orange-400",
      previewTextColor: "text-orange-300",
    }
  }
  return {
    dot: "bg-blue-500",
    badge: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400",
    label: "Minor",
    icon: AlertCircle,
    iconColor: "text-blue-500",
    previewIconColor: "text-sky-400",
    previewTextColor: "text-sky-300",
  }
}

function FindingCard({ item }: { item: FindingItem }) {
  const [expanded, setExpanded] = useState(false)
  const config = getFindingConfig(item)
  const Icon = config.icon

  const hasCodeOrTarget = Boolean(
    item.selector || item.identifier || item.element
  )
  const hasExamples = Boolean(item.examples && item.examples.length > 0)
  const hasDetails =
    hasCodeOrTarget ||
    hasExamples ||
    item.type === "passed" ||
    item.type === "manual"

  const targetPreview = item.selector || item.identifier || item.element

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card transition-all hover:border-border hover:shadow-xs">
      {/* Header row */}
      <div className="flex items-start gap-3 p-4">
        {/* Severity / Status indicator stripe */}
        <div
          className={`mt-0.5 h-full w-1 shrink-0 self-stretch rounded-full ${config.dot}`}
          aria-hidden="true"
        />

        <div className="min-w-0 flex-1 space-y-1.5">
          {/* Badges row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {/* WCAG spec pill */}
              {item.wcag && (
                <Badge
                  variant={"secondary"}
                  // className="rounded bg-foreground px-1.5 py-0.5 font-mono text-xs font-bold text-background"
                >
                  {item.wcag}
                </Badge>
              )}

              {/* Type / Severity Badge */}
              <Badge
                variant="secondary"
                className={`h-5 border px-1.5 text-xs font-semibold ${config.badge}`}
              >
                <Icon className={`mr-1 size-3 shrink-0 ${config.iconColor}`} />
                {config.label}
              </Badge>

              {/* Level Badge */}
              {item.level && (
                <Badge
                  variant="outline"
                  className="h-5 px-1.5 text-xs font-medium"
                >
                  {item.level.startsWith("Level")
                    ? item.level
                    : `Level ${item.level}`}
                </Badge>
              )}

              {/* Count pill (violations) */}
              {item.count !== undefined && item.count > 1 && (
                <span className="inline-flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                  <Hash className="size-2.5" />
                  {item.count}×
                </span>
              )}

              {/* Custom Status badge */}
              {item.status && (
                <Badge
                  variant="outline"
                  className="h-5 px-1.5 text-xs text-muted-foreground capitalize"
                >
                  {item.status}
                </Badge>
              )}
            </div>

            {/* Principle name tag */}
            {item.principleName && (
              <Badge
                variant="outline"
                className="h-5 shrink-0 px-1.5 text-xs text-muted-foreground"
              >
                {item.principleName}
              </Badge>
            )}
          </div>

          {/* Rule description / message */}
          <p className="text-sm leading-snug font-semibold text-foreground">
            {item.message || "Accessibility criterion evaluated."}
          </p>

          {/* Collapsed Target Preview chip */}
          {!expanded && targetPreview && (
            <div className="flex items-center gap-1.5 overflow-hidden pt-0.5">
              <Code2 className={`size-3 shrink-0`} />
              <span
                className={`w-full truncate rounded border border-secondary/5 bg-black px-2 py-2 font-mono text-xs ${config.previewTextColor}`}
              >
                {targetPreview}
              </span>
            </div>
          )}
        </div>

        {/* Expand / collapse toggle */}
        {hasDetails && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Collapse details" : "Expand details"}
            className="ml-1 shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
          >
            {expanded ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </button>
        )}
      </div>

      {/* Expanded drawer panel */}
      {expanded && hasDetails && (
        <div className="space-y-3.5 border-t bg-secondary px-4 py-3.5">
          {/* CSS Selector */}
          {item.selector && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  <Code2 className="size-3 text-sky-400" />
                  Target Selector
                </span>
                <CopyButton text={item.selector} label="CSS Selector" />
              </div>
              <div className="overflow-hidden rounded-lg border border-white/5">
                <RichText content={"```css\n" + item.selector + "\n```"} />
              </div>
            </div>
          )}

          {/* Identifier */}
          {item.identifier && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  <Hash className="size-3 text-violet-400" />
                  Identifier
                </span>
                <CopyButton text={item.identifier} label="Identifier" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-zinc-900 px-3 py-2">
                <span className="font-mono text-xs text-violet-300">
                  {item.identifier}
                </span>
              </div>
            </div>
          )}

          {/* AI Evaluation Prompt */}
          {item.evaluationPrompt && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  <Sparkles className="size-3 text-primary" />
                  Evaluation Prompt
                </span>
                <CopyButton text={item.evaluationPrompt} label="Prompt" />
              </div>
              <div className="rounded-lg border border-border/40 bg-muted/40 p-3 text-xs leading-relaxed text-foreground">
                {item.evaluationPrompt}
              </div>
            </div>
          )}

          {/* Element HTML snippet */}
          {item.element && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  <Code2 className="size-3 text-amber-400" />
                  Element Snippet
                </span>
                <CopyButton text={item.element} label="HTML Snippet" />
              </div>
              <div className="overflow-hidden rounded-lg border border-white/5">
                <RichText
                  content={"```html\n" + item.element + "\n```"}
                  className="bg-black"
                />
              </div>
            </div>
          )}

          {/* Type-exclusive context block */}
          {item.type === "passed" && (
            <div className="flex items-start gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <div className="space-y-0.5">
                <p className="font-semibold">Compliant with WCAG Criteria</p>
                <p className="text-emerald-700/90 dark:text-emerald-300/80">
                  This rule verified successfully against{" "}
                  <span className="font-mono font-medium">
                    {item.wcag || "WCAG 2.2"}
                  </span>{" "}
                  specifications for {item.principleName}. The analyzed DOM
                  elements satisfy accessibility compliance.
                </p>
              </div>
            </div>
          )}

          {item.type === "manual" && (
            <div className="flex items-start gap-2.5 rounded-lg border border-violet-500/20 bg-violet-500/10 p-3 text-xs text-violet-800 dark:text-violet-300">
              <Eye className="mt-0.5 size-4 shrink-0 text-violet-500" />
              <div className="space-y-0.5">
                <p className="font-semibold">Manual Verification Required</p>
                <p className="text-violet-700/90 dark:text-violet-300/80">
                  Automated scanners cannot verify human perception, audio/video
                  alternative accuracy, or reading sequence for{" "}
                  <span className="font-mono font-medium">
                    {item.wcag || "this criterion"}
                  </span>
                  . Conduct human inspection on the target element.
                </p>
              </div>
            </div>
          )}

          {/* Affected instances (for violations) */}
          {item.type === "issue" &&
            item.examples &&
            item.examples.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Affected Instances ({item.examples.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.examples.map((ex, exIdx) => {
                    const val = ex.selector || ex.identifier || ex.element
                    if (!val) return null
                    return (
                      <span
                        key={exIdx}
                        className="inline-flex items-center rounded border border-white/5 bg-zinc-900 px-2 py-0.5 font-mono text-xs text-emerald-400"
                      >
                        {val}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
        </div>
      )}

      {/* Expand affordance fallback when no details but count > 1 */}
      {!hasDetails && item.count !== undefined && item.count > 1 && (
        <div className="border-t border-border/40 px-4 py-2">
          <span className="text-xs text-muted-foreground">
            {item.count} instances detected across the page
          </span>
        </div>
      )}
    </div>
  )
}

function IssueCard({
  issue,
}: {
  issue: PrincipleIssue & { principleName: string }
}) {
  return <FindingCard item={{ ...issue, type: "issue" }} />
}

function PassedRow({
  item,
}: {
  item: PrinciplePassed & { principleName: string }
}) {
  return <FindingCard item={{ ...item, type: "passed" }} />
}

function ManualRow({
  item,
}: {
  item: {
    wcag?: string
    level?: string
    message?: string
    element?: string
    selector?: string
    identifier?: string
    status?: string
    principleName: string
  }
}) {
  return (
    <FindingCard
      item={{
        ...item,
        type: "manual",
        message: item.message || "Manual verification required",
      }}
    />
  )
}

function convertWcagEvaluationToResult(content: Content): Result {
  const taskBatch = content.task_batch
  const tasks = taskBatch?.tasks || []
  const allTasks: Task[] =
    tasks.length > 0
      ? tasks
      : [
          ...(taskBatch?.pour_groups?.perceivable || []),
          ...(taskBatch?.pour_groups?.operable || []),
          ...(taskBatch?.pour_groups?.understandable || []),
          ...(taskBatch?.pour_groups?.robust || []),
        ]

  const principleKeys = ["perceivable", "operable", "understandable", "robust"]
  const grouped = new Map<
    string,
    {
      name: string
      issues: PrincipleIssue[]
      passed: PrinciplePassed[]
      manual_review: any[]
    }
  >()

  for (const key of principleKeys) {
    grouped.set(key, {
      name: capitalize(key),
      issues: [],
      passed: [],
      manual_review: [],
    })
  }

  let passedCount = 0
  let failedCount = 0
  let manualCount = 0

  for (const task of allTasks) {
    const rawPrinciple = (
      task.criterion?.principle || "perceivable"
    ).toLowerCase()
    const groupKey = principleKeys.includes(rawPrinciple)
      ? rawPrinciple
      : "perceivable"
    const group = grouped.get(groupKey)!

    const status = (task.status || "").toLowerCase()
    const wcag = task.criterion?.id
      ? `${task.criterion.id} ${task.criterion.title || ""}`.trim()
      : "WCAG Criterion"

    const item = {
      wcag,
      level: task.criterion?.level || "A",
      message:
        task.reason ||
        task.criterion?.description ||
        task.evaluation_prompt ||
        "Accessibility evaluation task",
      status: task.status || "manual",
      element: task.target?.html,
      selector: task.target?.parent,
      identifier: task.task_id,
      evaluationPrompt: task.evaluation_prompt,
      examples: task.target?.context
        ? [
            {
              element: task.target.html,
              selector: task.target.parent,
              identifier: [
                task.target.context.previous
                  ? `Previous: ${task.target.context.previous}`
                  : null,
                task.target.context.next
                  ? `Next: ${task.target.context.next}`
                  : null,
              ]
                .filter(Boolean)
                .join(" | "),
            },
          ]
        : undefined,
    }

    if (status === "fail" || status === "failed") {
      failedCount += 1
      group.issues.push({
        ...item,
        severity: "serious",
        count: 1,
      })
    } else if (status === "pass" || status === "passed") {
      passedCount += 1
      group.passed.push({
        ...item,
        severity: null,
      })
    } else {
      manualCount += 1
      group.manual_review.push(item)
    }
  }

  const totalEvaluated = passedCount + failedCount
  const overallScore =
    totalEvaluated > 0
      ? Math.round((passedCount / totalEvaluated) * 100)
      : manualCount > 0
        ? 100
        : 0

  const principles: PrincipleItem[] = principleKeys.map((key) => {
    const g = grouped.get(key)!
    const gEvaluated = g.passed.length + g.issues.length
    const gScore =
      gEvaluated > 0 ? Math.round((g.passed.length / gEvaluated) * 100) : 100

    return {
      name: g.name,
      data: {
        score: gScore,
        issues: g.issues,
        passed: g.passed,
        manual_review: g.manual_review,
        summary: [
          { name: "critical", count: 0 },
          { name: "serious", count: g.issues.length },
          { name: "moderate", count: 0 },
          { name: "minor", count: 0 },
          { name: "passed", count: g.passed.length },
          { name: "manual_review", count: g.manual_review.length },
        ],
      },
    }
  })

  return {
    url: content.url || "",
    overall_score: overallScore,
    principles,
    summary: [
      { name: "critical", count: 0 },
      { name: "serious", count: failedCount },
      { name: "moderate", count: 0 },
      { name: "minor", count: 0 },
      { name: "total_passed", count: passedCount },
      { name: "manual_review", count: manualCount },
    ],
    principle_scores: principles.map((p) => ({
      principle: p.name,
      score: p.data.score,
    })),
    elapsed_time: undefined,
  }
}

export default function AnalyzerResults({
  data: propData,
  scanEntry: propScanEntry,
  result: propResult,
}: AnalyzerResultsProps = {}) {
  const { id } = useParams()
  const { data: apiScanData, isLoading: isLoadingScan } = useAnalyzerResultById(
    id || ""
  )

  const rawScanData = propScanEntry || propData || apiScanData

  const scanEntry = useMemo<
    AnalyzerResultItem | WcagEvaluationProps | undefined
  >(() => {
    if (propScanEntry) return propScanEntry
    if (propData && "content" in propData) {
      return propData as AnalyzerResultItem | WcagEvaluationProps
    }
    if (
      apiScanData &&
      typeof apiScanData === "object" &&
      "content" in apiScanData
    ) {
      return apiScanData as AnalyzerResultItem | WcagEvaluationProps
    }
    return undefined
  }, [propScanEntry, propData, apiScanData])

  const resultData = useMemo<Result | undefined>(() => {
    if (propResult) return propResult
    if (propData && "principles" in propData && !("content" in propData)) {
      return propData as Result
    }

    const rawContent =
      scanEntry?.content ??
      (rawScanData &&
      typeof rawScanData === "object" &&
      "content" in rawScanData
        ? (rawScanData as any).content
        : rawScanData)

    if (!rawContent) return undefined

    let parsed = rawContent
    if (typeof rawContent === "string") {
      try {
        parsed = JSON.parse(rawContent)
      } catch (e) {
        console.error("Failed to parse scan content JSON:", e)
        return undefined
      }
    }

    if (!parsed || typeof parsed !== "object") return undefined

    // WcagEvaluationProps (LLM scan)
    if ("task_batch" in parsed || (parsed as any).scan_type === "llm") {
      return convertWcagEvaluationToResult(parsed as Content)
    }

    // AnalyzerResultItem (Axe-core server scan)
    if ("principles" in parsed) {
      return parsed as Result
    }

    return undefined
  }, [propResult, propData, scanEntry, rawScanData])

  const isLLMScan = useMemo(() => {
    if (!scanEntry?.content) return false
    const c = scanEntry.content
    if (typeof c === "string") {
      return c.includes('"task_batch"') || c.includes('"scan_type":"llm"')
    }
    return Boolean(
      typeof c === "object" &&
      ("task_batch" in c || (c as any).scan_type === "llm")
    )
  }, [scanEntry])

  const { data: sitemapLinks = [], isLoading: isLoadingSitemap } = useSitemap(
    resultData?.url
  )

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const scanMutation = useAnalyzer()
  const [scanningUrl, setScanningUrl] = useState<string | null>(null)

  const handleScanUrl = (targetUrl: string) => {
    if (scanMutation.isPending) return
    setScanningUrl(targetUrl)

    scanMutation.mutate(targetUrl, {
      onSuccess: async (data: Result) => {
        await queryClient.invalidateQueries({
          queryKey: ["analyzer-logs"],
        })

        const updatedHistory = queryClient.getQueryData<AnalyzerResultItem[]>([
          "analyzer-logs",
        ])
        const targetId = updatedHistory?.[0]?.id || Date.now().toString()

        try {
          sessionStorage.setItem(
            `frontaccease_analyzer_result_${targetId}`,
            JSON.stringify(data)
          )
          sessionStorage.setItem(
            "frontaccease_latest_analyzer_result",
            JSON.stringify(data)
          )
        } catch (e) {
          console.error("Failed to save scan result to session storage", e)
        }

        setScanningUrl(null)
        navigate(`/learner/analyzer/${targetId}`)
      },
      onError: (err: unknown) => {
        setScanningUrl(null)
        toast.add({
          title: "Scan Failed",
          description:
            err instanceof Error
              ? err.message
              : "Failed to scan page. Please check the URL and try again.",
        })
      },
    })
  }

  const [activeTab, setActiveTab] = useState<"issues" | "passed" | "manual">(
    "issues"
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPrinciple, setSelectedPrinciple] = useState<string>("all")
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all")
  const [copiedSummary, setCopiedSummary] = useState(false)
  const [isExportingPDF, setIsExportingPDF] = useState(false)

  // Extract all issues across principles
  const allIssues = !resultData
    ? []
    : resultData.principles?.flatMap((p) =>
        (p.data?.issues || []).map((issue: PrincipleIssue) => ({
          ...issue,
          principleName: capitalize(p.name),
        }))
      ) || []

  // Extract all passed checks across principles
  const allPassed = !resultData
    ? []
    : resultData.principles?.flatMap((p) =>
        (p.data?.passed || []).map((passedItem: PrinciplePassed) => ({
          ...passedItem,
          principleName: capitalize(p.name),
        }))
      ) || []

  // Extract manual review items
  const allManual = !resultData
    ? []
    : resultData.principles?.flatMap((p) =>
        (p.data?.manual_review || []).map((item: unknown) => ({
          ...(item as object),
          principleName: capitalize(p.name),
        }))
      ) || []

  useEffect(() => {
    if (
      allIssues.length === 0 &&
      allPassed.length === 0 &&
      allManual.length > 0
    ) {
      setActiveTab("manual")
    }
  }, [allIssues.length, allPassed.length, allManual.length])

  // Filter issues
  const filteredIssues = allIssues.filter((issue) => {
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
    if (
      selectedPrinciple !== "all" &&
      issue.principleName.toLowerCase() !== selectedPrinciple.toLowerCase()
    ) {
      return false
    }
    if (
      selectedSeverity !== "all" &&
      issue.severity?.toLowerCase() !== selectedSeverity.toLowerCase()
    ) {
      return false
    }
    return true
  })

  // Filter passed criteria
  const filteredPassed = allPassed.filter((item) => {
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

  // Filter manual review
  const filteredManual = allManual.filter(
    (item: {
      principleName?: string
      wcag?: string
      message?: string
      element?: string
      selector?: string
      identifier?: string
    }) => {
      if (
        selectedPrinciple !== "all" &&
        item.principleName?.toLowerCase() !== selectedPrinciple.toLowerCase()
      ) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return Boolean(
          (item.wcag && item.wcag.toLowerCase().includes(q)) ||
          (item.message && item.message.toLowerCase().includes(q)) ||
          (item.element && item.element.toLowerCase().includes(q)) ||
          (item.selector && item.selector.toLowerCase().includes(q)) ||
          (item.identifier && item.identifier.toLowerCase().includes(q))
        )
      }
      return true
    }
  )

  // Principle scores mapped
  const principleScoresList = !resultData
    ? []
    : resultData.principle_scores && resultData.principle_scores.length > 0
      ? resultData.principle_scores.map((ps) => {
          const foundPrinciple = resultData.principles?.find(
            (p) => p.name.toLowerCase() === ps.principle.toLowerCase()
          )
          return {
            name: capitalize(ps.principle),
            score: ps.score,
            issuesCount: foundPrinciple?.data?.issues?.length ?? 0,
            passedCount: foundPrinciple?.data?.passed?.length ?? 0,
            manualCount: foundPrinciple?.data?.manual_review?.length ?? 0,
          }
        })
      : (resultData.principles || []).map((p) => ({
          name: capitalize(p.name),
          score: p.data?.score ?? 80,
          issuesCount: p.data?.issues?.length ?? 0,
          passedCount: p.data?.passed?.length ?? 0,
          manualCount: p.data?.manual_review?.length ?? 0,
        }))

  if (isLoadingScan && !resultData) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

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

  const overallScore =
    resultData.overall_score ??
    (principleScoresList.length > 0
      ? Math.round(
          principleScoresList.reduce((acc, p) => acc + (p.score || 0), 0) /
            principleScoresList.length
        )
      : 0)
  const scoreConfig = getScoreConfig(overallScore)

  // Calculate summary counts
  const criticalCount = getSummaryCount(resultData.summary, "critical")
  const seriousCount = getSummaryCount(resultData.summary, "serious")
  const moderateCount = getSummaryCount(resultData.summary, "moderate")
  const minorCount = getSummaryCount(resultData.summary, "minor")
  const totalViolations =
    criticalCount + seriousCount + moderateCount + minorCount
  const totalPassedCount = getSummaryCount(resultData.summary, "total_passed")

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

  // Export PDF handler
  function handleExportPDF() {
    if (!resultData) return
    try {
      setIsExportingPDF(true)
      exportAnalyzerReportToPDF({
        result: resultData,
        scanInfo: {
          id: scanEntry?.id || id,
          createdAt: scanEntry?.created_at,
        },
      })
      toast.add({
        title: "PDF Report Generated",
        description:
          "Your full WCAG Accessibility Audit PDF has been downloaded.",
      })
    } catch (err) {
      console.error("Failed to export PDF:", err)
      toast.add({
        title: "Export Failed",
        description: "Could not generate PDF report. Please try again.",
      })
    } finally {
      setIsExportingPDF(false)
    }
  }

  const activeCount =
    activeTab === "issues"
      ? filteredIssues.length
      : activeTab === "passed"
        ? filteredPassed.length
        : filteredManual.length

  const totalCount =
    activeTab === "issues"
      ? allIssues.length
      : activeTab === "passed"
        ? allPassed.length
        : allManual.length

  return (
    <div className="p-responsive space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 border-b border-border/60 pb-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <Link
              to="/learner/analyzer"
              className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Back to URL Analyzer"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Accessibility Audit
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 pl-10 text-xs text-muted-foreground">
            <a
              href={resultData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
            >
              <Globe className="size-3.5" />
              <span className="max-w-64 truncate sm:max-w-none">
                {resultData.url}
              </span>
              <ArrowUpRight className="size-3 shrink-0" />
            </a>
            <span className="text-border">·</span>
            <Badge variant="outline" className="h-5 px-1.5 text-xs">
              WCAG 2.2 AA/AAA
            </Badge>
            {isLLMScan && (
              <>
                <span className="text-border">·</span>
                <Badge
                  variant="outline"
                  className="h-5 gap-1 border-primary/40 bg-primary/10 px-1.5 text-xs text-primary"
                >
                  <Sparkles className="size-3" />
                  LLM Evaluation
                </Badge>
              </>
            )}
            {scanEntry?.status && (
              <>
                <span className="text-border">·</span>
                <Badge
                  variant="secondary"
                  className="h-5 px-1.5 text-xs capitalize"
                >
                  {scanEntry.status}
                </Badge>
              </>
            )}
            {scanEntry?.created_at && (
              <>
                <span className="text-border">·</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3" />
                  {getDateString(scanEntry.created_at)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button variant="outline" onClick={handleCopySummary}>
            {copiedSummary ? (
              <Check className="size-3.5 text-emerald-500" />
            ) : (
              <Copy className="size-3.5" />
            )}
            <span>{copiedSummary ? "Copied!" : "Copy Summary"}</span>
          </Button>

          <Button onClick={handleExportPDF} disabled={isExportingPDF}>
            {isExportingPDF ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <FileDown className="size-3.5" />
            )}
            <span>{isExportingPDF ? "Generating PDF..." : "Export PDF"}</span>
          </Button>
        </div>
      </div>

      {/* ── Row 1: Score + Violation Breakdown + Audit Scope ── */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Score card */}
        <Card className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs">
          <CardHeader className="p-0 pb-3">
            <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
              Compliance Score
            </p>
          </CardHeader>
          <CardContent className="space-y-4 p-0">
            {/* Score dial (simple arc via CSS) */}
            <div className="flex items-end gap-2">
              <span
                className={`font-heading text-6xl leading-none font-black ${scoreConfig.color}`}
              >
                {overallScore}
              </span>
              <span className="mb-1 text-xl font-bold text-muted-foreground">
                /100
              </span>
            </div>

            {/* Score progress track */}
            <div className="space-y-1.5">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all ${scoreConfig.bg}`}
                  style={{ width: `${overallScore}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className={`text-xs font-semibold ${scoreConfig.color}`}
                >
                  {scoreConfig.label}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Target ≥90
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Violations card */}
        <Card className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs">
          <CardHeader className="p-0 pb-3">
            <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
              Severity Breakdown
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex items-stretch gap-4">
              {/* Total bubble */}
              <div className="flex flex-col items-center justify-center rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-center">
                <span className="font-heading text-4xl font-black text-foreground">
                  {totalViolations}
                </span>
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Issues
                </span>
              </div>

              {/* Breakdown */}
              <div className="flex-1 space-y-1.5">
                {[
                  {
                    label: "Critical",
                    count: criticalCount,
                    dot: "bg-rose-500",
                  },
                  {
                    label: "Serious",
                    count: seriousCount,
                    dot: "bg-amber-500",
                  },
                  {
                    label: "Moderate",
                    count: moderateCount,
                    dot: "bg-orange-500",
                  },
                  { label: "Minor", count: minorCount, dot: "bg-blue-500" },
                ].map(({ label, count, dot }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`size-2 rounded-full ${dot}`} />
                      <span className="text-muted-foreground">{label}</span>
                    </div>
                    <span className="font-mono font-bold text-foreground">
                      {count}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-border/40 pt-1.5 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span className="text-muted-foreground">Passed</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {totalPassedCount}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit scope card */}
        <Card className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs">
          <CardHeader className="p-0 pb-3">
            <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
              Audit Scope
            </p>
          </CardHeader>
          <CardContent className="space-y-3 p-0 text-xs">
            <div className="space-y-0.5">
              <span className="text-muted-foreground">Audited URL</span>
              <p className="truncate font-mono font-semibold text-foreground">
                {resultData.url}
              </p>
            </div>

            <div className="space-y-2 rounded-xl border border-border/60 bg-muted/20 p-2.5">
              <div className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-1.5 font-medium text-foreground">
                  <Network className="size-3.5 shrink-0 text-primary" />
                  Discovered Sitemap
                </span>

                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 shrink-0 gap-1.5 border-border/70 bg-background/70 px-2 text-xs font-semibold text-foreground hover:bg-muted"
                      >
                        {isLoadingSitemap ? (
                          <Loader2 className="size-3 animate-spin text-primary" />
                        ) : null}
                        {isLoadingSitemap
                          ? "Loading"
                          : `${sitemapLinks.length} ${sitemapLinks.length === 1 ? "page" : "pages"}`}
                        <ChevronDown className="size-3 text-muted-foreground" />
                      </Button>
                    }
                  />

                  <PopoverContent
                    align="end"
                    sideOffset={8}
                    className="w-80 overflow-hidden rounded-xl border border-border/80 bg-popover p-0 shadow-xl sm:w-96"
                  >
                    <PopoverHeader className="gap-1 border-b border-border/60 bg-muted/30 px-4 py-3">
                      <PopoverTitle className="flex items-center gap-2 text-sm font-bold text-foreground">
                        <Network className="size-4 text-primary" />
                        Discovered Sitemap
                      </PopoverTitle>
                      <PopoverDescription className="text-xs leading-relaxed">
                        Choose a page to scan or open it in a new tab.
                      </PopoverDescription>
                    </PopoverHeader>

                    {sitemapLinks.length > 0 ? (
                      <div className="max-h-80 space-y-1 overflow-y-auto p-2">
                        {sitemapLinks.map((link) => {
                          const displayPath =
                            link.replace(/^https?:\/\/[^/]+/i, "") || "/"
                          const isCurrent = link === resultData.url
                          const isThisScanning = scanningUrl === link

                          return (
                            <div
                              key={link}
                              className={cn(
                                "group flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2 font-mono text-xs transition-colors",
                                isThisScanning
                                  ? "border-primary/40 bg-primary/10 text-primary"
                                  : isCurrent
                                    ? "border-border/80 bg-muted text-foreground"
                                    : "border-transparent text-muted-foreground hover:border-border/70 hover:bg-muted/70 hover:text-foreground"
                              )}
                            >
                              <button
                                type="button"
                                onClick={() => handleScanUrl(link)}
                                disabled={scanMutation.isPending}
                                title={
                                  isCurrent
                                    ? "Currently viewing this page. Select to scan it again."
                                    : `Scan ${link}`
                                }
                                className="flex min-w-0 flex-1 items-center gap-2 text-left font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed"
                              >
                                {isThisScanning ? (
                                  <Loader2 className="size-3.5 shrink-0 animate-spin text-primary" />
                                ) : (
                                  <Sparkles className="size-3.5 shrink-0 text-primary/70" />
                                )}
                                <span className="truncate">{displayPath}</span>
                                {isCurrent && (
                                  <span className="shrink-0 rounded bg-background px-1.5 py-0.5 text-xs font-bold text-muted-foreground">
                                    Current
                                  </span>
                                )}
                              </button>

                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Open URL in new tab"
                                className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
                              >
                                <ExternalLink className="size-3.5" />
                              </a>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="px-4 py-5 text-xs leading-relaxed text-muted-foreground">
                        {isLoadingSitemap
                          ? "Looking for sitemap links…"
                          : "No sitemap links were found. This audit covers a single page."}
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>

              {scanMutation.isPending && (
                <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-2 text-xs font-medium text-foreground">
                  <Loader2 className="size-3.5 shrink-0 animate-spin text-primary" />
                  <span className="truncate">
                    Auditing{" "}
                    {scanningUrl
                      ? scanningUrl.replace(/^https?:\/\/[^/]+/i, "") ||
                        scanningUrl
                      : "page"}
                    …
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-2.5 py-2.5">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Timer className="size-3.5 text-primary" />
                Elapsed Time
              </span>
              <span className="font-mono text-sm font-bold text-foreground tabular-nums">
                {formatElapsedTime(resultData.elapsed_time)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 pt-0.5 text-muted-foreground">
              <ShieldCheck className="size-3.5 shrink-0 text-primary" />
              <span>W3C WAI-ARIA authoring practices</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Row 2: POUR Principle cards ── */}
      <div className="space-y-2.5">
        <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
          W3C POUR Principles
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {principleScoresList.map((p) => {
            const pc = getScoreConfig(p.score)
            const isSelected =
              selectedPrinciple.toLowerCase() === p.name.toLowerCase()
            return (
              <button
                key={p.name}
                type="button"
                onClick={() =>
                  setSelectedPrinciple((prev) =>
                    prev.toLowerCase() === p.name.toLowerCase() ? "all" : p.name
                  )
                }
                className={`group rounded-xl border p-4 text-left transition-all hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-2 ring-primary/15"
                    : "border-border/60 bg-card hover:bg-muted/20"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-foreground">
                    {p.name}
                  </h3>
                  <span
                    className={`font-mono text-sm font-extrabold ${pc.color}`}
                  >
                    {p.score}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${pc.bg} transition-all`}
                    style={{
                      width: `${Math.min(100, Math.max(4, p.score))}%`,
                    }}
                  />
                </div>

                {/* Stats row */}
                <div className="mt-2.5 flex items-center gap-3 text-xs text-muted-foreground">
                  {p.issuesCount > 0 ? (
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      {p.issuesCount} issue{p.issuesCount !== 1 ? "s" : ""}
                    </span>
                  ) : (
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      No issues
                    </span>
                  )}
                  <span>·</span>
                  <span>{p.passedCount} passed</span>
                  {p.manualCount > 0 && (
                    <>
                      <span>·</span>
                      <span>{p.manualCount} manual</span>
                    </>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Row 3: Filterable findings ── */}
      <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
        {/* Tab bar + search */}
        <div className="flex flex-col gap-3 border-b border-border/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                {
                  key: "issues" as const,
                  icon: AlertTriangle,
                  label: "Violations",
                  count: allIssues.length,
                  danger: allIssues.length > 0,
                },
                {
                  key: "passed" as const,
                  icon: CheckCircle2,
                  label: "Passed",
                  count: allPassed.length,
                  danger: false,
                },
                ...(allManual.length > 0
                  ? [
                      {
                        key: "manual" as const,
                        icon: Eye,
                        label: "Manual Review",
                        count: allManual.length,
                        danger: false,
                      },
                    ]
                  : []),
              ] as const
            ).map(({ key, icon: Icon, label, count }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  activeTab === key
                    ? "bg-foreground text-background"
                    : "bg-muted/30 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon
                  className={`size-3.5 ${key === "passed" && activeTab !== key ? "text-emerald-500" : ""}`}
                />
                <span>
                  {label}{" "}
                  <span className={`opacity-70 ${activeTab === key ? "" : ""}`}>
                    ({count})
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="w-full sm:w-72">
            <SearchTemplate
              title={activeTab === "issues" ? "violations" : "criteria"}
              search={searchQuery}
              setSearch={setSearchQuery}
            />
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Principle filter */}
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
                <SelectTrigger className="h-7 rounded-lg text-xs font-medium">
                  <SelectValue placeholder="All" />
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

            {/* Severity filter — issues tab only */}
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
                  <SelectTrigger className="h-7 rounded-lg text-xs font-medium">
                    <SelectValue placeholder="All" />
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
                className="h-7 px-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Clear filters
              </Button>
            )}
          </div>

          <span className="text-xs font-semibold text-muted-foreground">
            {activeCount === totalCount
              ? `${totalCount} total`
              : `${activeCount} of ${totalCount}`}
          </span>
        </div>

        {/* Content area */}
        <div className="p-4">
          {/* TAB: Violations */}
          {activeTab === "issues" && (
            <div className="space-y-2.5">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue, idx) => (
                  <IssueCard key={`${issue.wcag}-${idx}`} issue={issue} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-14 text-center">
                  <CheckCircle2 className="size-10 text-emerald-500" />
                  <h4 className="mt-3 text-sm font-bold text-foreground">
                    No violations found
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try clearing filters to see all findings.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB: Passed */}
          {activeTab === "passed" && (
            <div className="space-y-2.5">
              {filteredPassed.length > 0 ? (
                filteredPassed.map((passedItem, idx) => (
                  <PassedRow
                    key={`${passedItem.wcag}-${idx}`}
                    item={passedItem}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-14 text-center">
                  <CheckCircle2 className="size-10 text-emerald-500/50" />
                  <h4 className="mt-3 text-sm font-bold text-foreground">
                    No passed criteria match your filters
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try clearing filters to see all findings.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB: Manual Review */}
          {activeTab === "manual" && (
            <div className="space-y-2.5">
              {filteredManual.length > 0 ? (
                filteredManual.map(
                  (
                    item: {
                      wcag?: string
                      level?: string
                      message?: string
                      element?: string
                      selector?: string
                      identifier?: string
                      status?: string
                      principleName: string
                    },
                    idx: number
                  ) => <ManualRow key={idx} item={item} />
                )
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-14 text-center">
                  <Eye className="size-10 text-violet-500/50" />
                  <h4 className="mt-3 text-sm font-bold text-foreground">
                    No manual review items match your filters
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try clearing filters to see all findings.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

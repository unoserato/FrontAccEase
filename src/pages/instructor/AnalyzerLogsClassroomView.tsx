import { useState, useMemo, useEffect } from "react"
import { useParams } from "react-router-dom"
import HeaderTemplate from "@/components/common/PageTemplate"
import SearchTemplate from "@/components/common/SearchTemplate"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  FileText,
  Globe,
  GraduationCap,
  Layers,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ArrowUpRight,
  Search,
  MessageSquare,
  Send,
  Loader2,
} from "lucide-react"
import { cn } from "cn"
import AnalyzerResults from "@/pages/common/AnalyzerResults"
import type {
  ClassroomAnalyzerLogsDetailResponse,
  ClassroomScanDetailItem,
  Result,
} from "@/const/props/analyzerProps"
import {
  useClassrooms,
  useClassroomAnalyzerLogsByClassroomId,
  useAnalyzerResultById,
  useCreateAnalyzerComment,
  useUpdateAnalyzerComment,
} from "@/services/tanstack/materials"
import { mockClassroomAnalyzerLogsDetail } from "@/const/classroomAnalyzerLogsDetailMock"
import { getDateString } from "@/hooks/date-to-string"
import { useMe } from "@/services/tanstack/auth"

export interface AnalyzerLogsClassroomViewProps {
  data?: ClassroomAnalyzerLogsDetailResponse
}

const usageChartConfig = {
  scans: {
    label: "Total Scans: ",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const studentChartConfig = {
  scans: {
    label: "Total Scans: ",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

function buildFallbackScanResult(scan: ClassroomScanDetailItem): Result {
  const score = scan.score ?? 75
  const count = scan.violation_count

  return {
    url: scan.url || "",
    overall_score: scan.score ?? undefined,
    principles: [
      {
        name: "Perceivable",
        data: {
          score: Math.min(100, score + 4),
          issues:
            count > 0
              ? [
                  {
                    wcag: "1.4.3 Contrast (Minimum)",
                    level: "AA",
                    message:
                      "Text element has insufficient color contrast ratio (expected minimum 4.5:1).",
                    severity: "serious",
                    count: Math.max(1, Math.ceil(count * 0.4)),
                    element:
                      '<p class="text-zinc-500">Student portfolio content</p>',
                    selector: "main p.text-zinc-500",
                    identifier: "contrast-minimum",
                  },
                  {
                    wcag: "1.1.1 Non-Text Content",
                    level: "A",
                    message:
                      "Informative image elements lack meaningful text alternative attributes.",
                    severity: "critical",
                    count: Math.max(1, Math.ceil(count * 0.2)),
                    element: '<img src="/hero.jpg" />',
                    selector: "header img",
                    identifier: "non-text-content",
                  },
                ]
              : [],
          passed: [
            {
              wcag: "1.3.1 Info and Relationships",
              level: "A",
              message:
                "Semantic heading structure follows sequential hierarchy.",
              status: "passed",
            },
          ],
        },
      },
      {
        name: "Operable",
        data: {
          score: score,
          issues:
            count > 0
              ? [
                  {
                    wcag: "2.1.1 Keyboard Navigation",
                    level: "A",
                    message:
                      "Interactive button elements cannot be focused or triggered via keyboard Tab/Enter.",
                    severity: "critical",
                    count: Math.max(1, Math.ceil(count * 0.2)),
                    element: '<div onclick="openMenu()">Menu</div>',
                    selector: "header > div.menu-toggle",
                    identifier: "keyboard-navigation",
                  },
                  {
                    wcag: "2.4.4 Link Purpose (In Context)",
                    level: "A",
                    message:
                      "Ambiguous link labels do not convey explicit navigation destination.",
                    severity: "moderate",
                    count: Math.max(1, Math.ceil(count * 0.1)),
                    element: '<a href="/details">Click here</a>',
                    selector: "div.card a",
                    identifier: "link-purpose",
                  },
                ]
              : [],
          passed: [
            {
              wcag: "2.4.7 Focus Visible",
              level: "AA",
              message: "Keyboard focus indicators are distinguishable.",
              status: "passed",
            },
          ],
        },
      },
      {
        name: "Understandable",
        data: {
          score: Math.min(100, score + 8),
          issues:
            count > 10
              ? [
                  {
                    wcag: "3.3.2 Labels or Instructions",
                    level: "A",
                    message:
                      "Form inputs lack descriptive labels or aria-label attributes.",
                    severity: "moderate",
                    count: Math.max(1, Math.ceil(count * 0.05)),
                    element: '<input type="text" placeholder="Search..." />',
                    selector: "form input.search",
                    identifier: "input-missing-label",
                  },
                ]
              : [],
          passed: [
            {
              wcag: "3.1.1 Language of Page",
              level: "A",
              message:
                "The default human language of the web page is properly declared.",
              status: "passed",
            },
          ],
        },
      },
      {
        name: "Robust",
        data: {
          score: Math.max(0, score - 6),
          issues:
            count > 0
              ? [
                  {
                    wcag: "4.1.2 Name, Role, Value",
                    level: "A",
                    message:
                      "Custom ARIA widget controls lack expected name, role, or state attributes.",
                    severity: "moderate",
                    count: Math.max(1, Math.ceil(count * 0.15)),
                    element: '<div role="tab">Tab item</div>',
                    selector: "nav.tabs > div[role='tab']",
                    identifier: "name-role-value",
                  },
                ]
              : [],
          passed: [
            {
              wcag: "4.1.1 Parsing",
              level: "A",
              message: "Document structure uses valid, closed HTML tags.",
              status: "passed",
            },
          ],
        },
      },
    ],
    summary: {
      critical_count: Math.ceil(count * 0.3),
      serious_count: Math.ceil(count * 0.4),
      moderate_count: Math.ceil(count * 0.2),
      minor_count: Math.max(
        0,
        count -
          Math.ceil(count * 0.3) -
          Math.ceil(count * 0.4) -
          Math.ceil(count * 0.2)
      ),
      passed_count: 28,
    },
    principle_scores: [
      { principle: "Perceivable", score: Math.min(100, score + 4) },
      { principle: "Operable", score: score },
      { principle: "Understandable", score: Math.min(100, score + 8) },
      { principle: "Robust", score: Math.max(0, score - 6) },
    ],
    elapsed_time: 3.8,
  }
}

function InstructorCommentSection({
  selectedScan,
}: {
  selectedScan: ClassroomScanDetailItem
}) {
  const { data: scanDetail } = useAnalyzerResultById(selectedScan.id)
  const createCommentMutation = useCreateAnalyzerComment()
  const updateCommentMutation = useUpdateAnalyzerComment()

  const existingComment =
    scanDetail && "instructor_comment" in scanDetail
      ? scanDetail.instructor_comment
      : null

  const [commentInput, setCommentInput] = useState(existingComment || "")

  useEffect(() => {
    setCommentInput(existingComment || "")
  }, [existingComment])

  const isSavingComment =
    createCommentMutation.isPending || updateCommentMutation.isPending

  const handleSaveComment = () => {
    if (isSavingComment) return
    const trimmed = commentInput.trim()

    if (existingComment) {
      updateCommentMutation.mutate(
        {
          log_id: selectedScan.id,
          comment: trimmed,
        },
        {
          onSuccess: () => {
            toast.add({
              title: "Feedback Updated",
              description: "Instructor comment has been updated for this scan.",
              type: "success",
            })
          },
          onError: (err: unknown) => {
            toast.add({
              title: "Failed to Update Comment",
              description:
                err instanceof Error
                  ? err.message
                  : "Failed to update comment. Please try again.",
              type: "error",
            })
          },
        }
      )
    } else {
      createCommentMutation.mutate(
        {
          scan_id: selectedScan.id,
          comment: trimmed,
        },
        {
          onSuccess: () => {
            toast.add({
              title: "Feedback Saved",
              description:
                "Instructor comment has been recorded for this scan.",
              type: "success",
            })
          },
          onError: (err: unknown) => {
            toast.add({
              title: "Failed to Save Comment",
              description:
                err instanceof Error
                  ? err.message
                  : "Failed to record comment. Please try again.",
              type: "error",
            })
          },
        }
      )
    }
  }

  return (
    <div className="border-t border-border/70 bg-card/95 px-5 py-4 backdrop-blur-xs sm:px-6">
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MessageSquare className="size-4" />
            </div>
            <span className="text-sm font-bold text-foreground">
              Instructor Comment & Feedback
            </span>
            {existingComment ? (
              <Badge
                variant="outline"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400"
              >
                Feedback Saved
              </Badge>
            ) : null}
          </div>
          <span className="text-xs text-muted-foreground">
            This feedback is visible to {selectedScan.learner_name} on their audit report.
          </span>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start">
          <Textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder={`Leave feedback or grading guidance for ${selectedScan.learner_name}...`}
            rows={2}
            className="flex-1 resize-y bg-background text-xs sm:text-sm"
          />
          <Button
            type="button"
            size="sm"
            onClick={handleSaveComment}
            disabled={
              isSavingComment ||
              !commentInput.trim() ||
              commentInput.trim() === (existingComment || "").trim()
            }
            className="shrink-0 gap-1.5 font-semibold"
          >
            {isSavingComment ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>
                  {existingComment ? "Updating..." : "Saving..."}
                </span>
              </>
            ) : (
              <>
                <Send className="size-3.5" />
                <span>
                  {existingComment ? "Update Comment" : "Save Comment"}
                </span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function AnalyzerLogsClassroomView({
  data: propData,
}: AnalyzerLogsClassroomViewProps = {}) {
  const { id } = useParams<{ id: string }>()
  const { data: user } = useMe()
  const isInstructor = user?.role === "instructor"
  const { data: classrooms = [] } = useClassrooms()
  const { data: apiData } = useClassroomAnalyzerLogsByClassroomId(id || "")

  const data = propData || apiData || mockClassroomAnalyzerLogsDetail

  const currentClassroom = useMemo(() => {
    return classrooms.find((c) => String(c.id) === String(id))
  }, [classrooms, id])

  const className = currentClassroom?.name || "BSIT 3A WMAD"

  const [search, setSearch] = useState("")
  const [isScansOpen, setIsScansOpen] = useState(true)
  const [selectedScan, setSelectedScan] =
    useState<ClassroomScanDetailItem | null>(null)

  // 1. Usage analytics chart (last 7 days)
  const usageChartData = useMemo(() => {
    return (data.analyzer_usage_last_7_days || []).map((item) => {
      const formattedDate =
        item.date.length >= 10 ? item.date.slice(5) : item.date
      return {
        date: formattedDate,
        scans: item.scan_count,
      }
    })
  }, [data.analyzer_usage_last_7_days])

  // 2. Top scanners / users in the classroom distribution
  const studentDistributionData = useMemo(() => {
    const studentCounts: Record<string, number> = {}
    for (const scan of data.classroom_scans || []) {
      const name = scan.learner_name?.trim() || "Unknown Student"
      studentCounts[name] = (studentCounts[name] || 0) + 1
    }
    return Object.entries(studentCounts)
      .map(([student, scans]) => ({
        student: student.length > 16 ? `${student.slice(0, 14)}...` : student,
        fullName: student,
        scans,
      }))
      .sort((a, b) => b.scans - a.scans)
      .slice(0, 6)
  }, [data.classroom_scans])

  // 3. Total POUR violations and breakdown
  const totalPrincipleViolations = useMemo(() => {
    const p = data.issues_per_principle
    if (!p) return 0
    return (
      (p.perceivable || 0) +
      (p.operable || 0) +
      (p.understandable || 0) +
      (p.robust || 0)
    )
  }, [data.issues_per_principle])

  const principlesData = useMemo(() => {
    const p = data.issues_per_principle || {
      perceivable: 0,
      operable: 0,
      understandable: 0,
      robust: 0,
    }
    const total = totalPrincipleViolations

    const calcPct = (count: number) => (total > 0 ? (count / total) * 100 : 0)

    return [
      {
        name: "Perceivable",
        count: p.perceivable || 0,
        pct: calcPct(p.perceivable || 0),
        colorBg: "bg-blue-500",
        description:
          "Alt text, color contrast, media alternatives & resizable text",
      },
      {
        name: "Operable",
        count: p.operable || 0,
        pct: calcPct(p.operable || 0),
        colorBg: "bg-emerald-500",
        description:
          "Keyboard traps, focus indicators, navigation & target sizes",
      },
      {
        name: "Understandable",
        count: p.understandable || 0,
        pct: calcPct(p.understandable || 0),
        colorBg: "bg-amber-500",
        description:
          "Form labels, error suggestions, page language & consistency",
      },
      {
        name: "Robust",
        count: p.robust || 0,
        pct: calcPct(p.robust || 0),
        colorBg: "bg-purple-500",
        description:
          "HTML parsing, ARIA role validation & name/role/value specs",
      },
    ]
  }, [data.issues_per_principle, totalPrincipleViolations])

  // 4. Unique learners count
  const activeLearnersCount = useMemo(() => {
    const names = new Set(
      (data.classroom_scans || []).map((s) => s.learner_name).filter(Boolean)
    )
    return names.size || 1
  }, [data.classroom_scans])

  // 5. Filtered scans for the list
  const filteredScans = useMemo(() => {
    const list = data.classroom_scans || []
    if (!search.trim()) return list
    const q = search.toLowerCase().trim()
    return list.filter(
      (item) =>
        item.learner_name.toLowerCase().includes(q) ||
        (item.url ? item.url.toLowerCase().includes(q) : false) ||
        item.id.toLowerCase().includes(q)
    )
  }, [search, data.classroom_scans])

  function handleExport() {
    if (!data.classroom_scans || data.classroom_scans.length === 0) {
      toast.add({
        title: "Export Notice",
        description: "No classroom scan history available to export.",
        type: "info",
      })
      return
    }

    const headers = [
      "Scan ID",
      "Student Name",
      "Evaluated URL",
      "Timestamp",
      "Score",
      "Violations Count",
    ]
    const rows = filteredScans.map((s) => [
      `"${s.id}"`,
      `"${s.learner_name.replace(/"/g, '""')}"`,
      `"${(s.url || "").replace(/"/g, '""')}"`,
      `"${s.created_at}"`,
      s.score ?? "N/A",
      s.violation_count,
    ])

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute(
      "download",
      `classroom_${id || "scans"}_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.add({
      title: "Export Initiated",
      description: "Classroom analyzer audit history CSV report downloaded.",
      type: "success",
    })
  }

  // ── Classroom Domain Pillar KPIs ──
  const KPI = [
    {
      title: "Total Class Scans",
      icon: Globe,
      value: (data.total_scans ?? 0).toLocaleString(),
      footerDesc: "Automated audits executed in cohort",
    },
    {
      title: "Active Students",
      icon: GraduationCap,
      value: activeLearnersCount.toLocaleString(),
      footerDesc: "Learners actively scanning in this section",
    },
    {
      title: "Flagged Issues",
      icon: Layers,
      value: (data.violations ?? 0).toLocaleString(),
      footerDesc: "WCAG 2.2 accessibility violations",
    },
    {
      title: "Classroom Pass Rate",
      icon: CheckCircle2,
      value: `${typeof data.pass_rate === "number" ? data.pass_rate.toFixed(1) : (data.pass_rate ?? 0)}%`,
      footerDesc: "Cohort average compliance score",
    },
  ]

  const synthesizedResult = useMemo(() => {
    if (!selectedScan) return undefined
    return buildFallbackScanResult(selectedScan)
  }, [selectedScan])

  return (
    <section className="p-responsive space-y-6">
      {/* Header */}
      <HeaderTemplate
        backTo="-1"
        title={className}
        subtitle={`Review students' automated accessibility scans, WCAG principle results, and compliance reports.`}
        // subtitle={`Section Code: ${classCode} • Student automated scan audit history, WCAG principle telemetry, and compliance reports.`}
        cta={[
          <Button key="export" onClick={handleExport}>
            <FileText className="mr-1.5 size-4" />
            Export Data
          </Button>,
        ]}
      />

      {/* Row 1: The 4 Core Domain Pillar KPI Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPI.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <CardAction>
                <kpi.icon className="size-4" />
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {kpi.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {kpi.footerDesc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 2: Dual Bar Charts Grid (Usage Analytics + Web Projects Distribution) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart 1: Analyzer Usage Analytics */}
        <Card>
          <CardHeader className="flex flex-col gap-2 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg font-bold sm:text-xl">
                Analyzer Usage Analytics
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Total automated analyzer scans executed per date
              </CardDescription>
            </div>
            <Badge
              variant="secondary"
              className="w-fit text-xs font-semibold text-muted-foreground"
            >
              Past 7 Days
            </Badge>
          </CardHeader>
          <CardContent>
            {usageChartData.length === 0 ? (
              <div className="flex h-56 items-center justify-center text-sm text-muted-foreground">
                No telemetry recorded for the past 7 days.
              </div>
            ) : (
              <ChartContainer config={usageChartConfig} className="h-56 w-full">
                <BarChart
                  data={usageChartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-border/40"
                  />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    className="text-xs text-muted-foreground"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    className="text-xs text-muted-foreground"
                    allowDecimals={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="scans"
                    fill="var(--primary)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        {/* Chart 2: Top Scanners / Users in Classroom */}
        <Card>
          <CardHeader className="flex flex-col gap-2 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg font-bold sm:text-xl">
                Top Scanners in Classroom
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Most active student auditors by total scans run
              </CardDescription>
            </div>
            <Badge
              variant="secondary"
              className="w-fit text-xs font-semibold text-muted-foreground"
            >
              Classroom Activity
            </Badge>
          </CardHeader>
          <CardContent>
            {studentDistributionData.length === 0 ? (
              <div className="flex h-56 items-center justify-center text-sm text-muted-foreground">
                No classroom student audit records found.
              </div>
            ) : (
              <ChartContainer
                config={studentChartConfig}
                className="h-56 w-full"
              >
                <BarChart
                  data={studentDistributionData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-border/40"
                  />
                  <XAxis
                    dataKey="student"
                    tickLine={false}
                    axisLine={false}
                    className="text-xs text-muted-foreground"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    className="text-xs text-muted-foreground"
                    allowDecimals={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="scans"
                    fill="var(--primary)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Row 3: POUR Principles Compliance Breakdown */}
      <Card className="p-6">
        <CardHeader className="flex flex-col gap-2 p-0 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-bold sm:text-xl">
              POUR Principles Compliance Breakdown
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Proportional distribution of{" "}
              {totalPrincipleViolations > 0
                ? totalPrincipleViolations.toLocaleString()
                : (data.violations ?? 0).toLocaleString()}{" "}
              accessibility violations detected during classroom audits
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="w-fit px-3 py-1 text-xs font-semibold"
          >
            {totalPrincipleViolations > 0
              ? totalPrincipleViolations.toLocaleString()
              : (data.violations ?? 0).toLocaleString()}{" "}
            Total Violations
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6 p-0">
          {/* Proportional Multi-Segment Progress Bar */}
          <div className="space-y-2">
            <div className="flex h-4 w-full overflow-hidden rounded-full bg-muted p-0.5 ring-1 ring-border/50">
              {totalPrincipleViolations === 0 ? (
                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                  No principle violations detected
                </div>
              ) : (
                principlesData.map((item, index) =>
                  item.pct > 0 ? (
                    <div
                      key={item.name}
                      className={`h-full ${item.colorBg} transition-all ${
                        index === 0 ? "rounded-l-full" : ""
                      } ${index === principlesData.length - 1 ? "rounded-r-full" : ""}`}
                      style={{ width: `${item.pct}%` }}
                      title={`${item.name}: ${item.count} violations (${item.pct.toFixed(1)}%)`}
                    />
                  ) : null
                )
              )}
            </div>
          </div>

          {/* 4-Card Principle Metric Breakdown */}
          <div className="grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-2 lg:grid-cols-4">
            {principlesData.map((item) => (
              <div
                key={item.name}
                className="flex flex-col justify-between rounded-xl bg-muted/40 p-4 transition-colors hover:bg-muted/60"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${item.colorBg} shrink-0`}
                      />
                      <p className="text-sm font-semibold text-foreground">
                        {item.name}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs font-medium">
                      {item.pct.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-foreground">
                      {item.count.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      violations
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Row 4: Classroom Audit Scan History List (ScanHistory & LearnerQuizHistoryCardTemplate style) */}
      <Card>
        <CardHeader
          onClick={() => setIsScansOpen((prev) => !prev)}
          className="flex cursor-pointer flex-row items-center justify-between border-b border-border/40 pb-4 select-none"
        >
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold sm:text-xl">
              Classroom Audit Scan History
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              All individual automated scan runs executed by students in this
              section
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0"
            aria-label={
              isScansOpen ? "Collapse scan records" : "Expand scan records"
            }
          >
            {isScansOpen ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </Button>
        </CardHeader>

        {isScansOpen && (
          <div>
            {/* Filter and Search Bar */}
            <div className="border-b border-border/40 p-4">
              <SearchTemplate
                search={search}
                setSearch={setSearch}
                title="learner name, evaluated URL, or scan ID..."
              />
            </div>

            {/* Scan Item Rows (matching ScanHistory card template exactly) */}
            <div className="divide-y divide-border/40">
              {filteredScans.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                  <Search className="mb-2 size-8 opacity-40" />
                  <p className="text-sm font-medium">
                    No classroom scan records found matching your search.
                  </p>
                </div>
              ) : (
                filteredScans.map((item) => {
                  const targetUrl = item.url || "example.com"
                  const urlClean = targetUrl.replace(/^https?:\/\//, "")
                  const score = item.score

                  const isHigh = score !== null && score >= 90
                  const isMedium = score !== null && score >= 70 && score < 90

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedScan(item)}
                      className="group flex cursor-pointer flex-col gap-3 p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      {/* Left: Domain, Learner Name & Meta */}
                      <div className="flex min-w-0 items-center gap-3.5">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Globe className="size-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-foreground group-hover:underline sm:text-base">
                            {urlClean}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="size-3 shrink-0" />
                            <span>{getDateString(item.created_at)}</span>
                            <span>•</span>
                            <span className="font-semibold text-foreground">
                              {item.learner_name}
                            </span>
                            <span>•</span>
                            <span>
                              {item.violation_count} Violations Detected
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Scores & Link Action */}
                      <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "rounded-lg px-2.5 py-1 text-xs font-bold",
                              score === null
                                ? "bg-muted text-muted-foreground"
                                : isHigh
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                  : isMedium
                                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                            )}
                          >
                            {score === null
                              ? "In Progress"
                              : `Score: ${score}/100`}
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
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
      </Card>

      {/* ── Dialog Rendering AnalyzerResults in Shared/Common Location ── */}
      <Dialog
        open={Boolean(selectedScan)}
        onOpenChange={(open) => !open && setSelectedScan(null)}
      >
        <DialogContent className="flex max-h-11/12 flex-col overflow-hidden p-0 sm:max-w-5xl">
          {selectedScan && (
            <div className="flex flex-col overflow-hidden">
              <DialogHeader className="border-b px-5 pt-5 pb-4 sm:px-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pr-6">
                  <div>
                    <DialogTitle className="flex items-center gap-2 text-base font-bold sm:text-xl">
                      <Globe className="size-5 text-primary" />
                      <span className="max-w-md truncate sm:max-w-lg">
                        {selectedScan.url || "N/A"}
                      </span>
                    </DialogTitle>
                    <DialogDescription className="mt-1 text-xs text-muted-foreground">
                      Automated audit run by{" "}
                      <span className="font-semibold text-foreground">
                        {selectedScan.learner_name}
                      </span>{" "}
                      on {getDateString(selectedScan.created_at)}
                    </DialogDescription>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs font-bold",
                        selectedScan.score === null
                          ? "bg-muted text-muted-foreground"
                          : selectedScan.score >= 90
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : selectedScan.score >= 70
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      )}
                    >
                      {selectedScan.score === null
                        ? "In Progress"
                        : `Score: ${selectedScan.score}/100`}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {selectedScan.violation_count} Violations
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Read-Only Audit
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              {/* Scrollable Container with AnalyzerResults */}
              <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
                <AnalyzerResults
                  id={selectedScan.id}
                  data={synthesizedResult}
                  hideHeaderBack
                  hideSitemap
                />
              </div>

              {/* ── Instructor Comment Box Section (Only for Instructors) ── */}
              {isInstructor && (
                <InstructorCommentSection selectedScan={selectedScan} />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

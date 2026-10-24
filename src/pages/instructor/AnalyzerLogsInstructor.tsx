import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
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
import { toast } from "@/components/ui/toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  FileText,
  ChevronRight,
  Globe,
  GraduationCap,
  Layers,
  CheckCircle2,
} from "lucide-react"
import type { ClassroomAnalyzerLogsResponse } from "@/const/props/analyzerProps"
import { useClassroomAnalyzerLogs } from "@/services/tanstack/materials"

export interface AnalyzerLogsInstructorProps {
  data?: ClassroomAnalyzerLogsResponse
}

const usageChartConfig = {
  scans: {
    label: "Total Scans: ",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const classroomChartConfig = {
  scans: {
    label: "Combined Scans: ",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function AnalyzerLogsInstructorContent({
  data,
  baseClassroomLogUrl = "/instructor/logs/classroom",
  instructorName,
}: {
  data: ClassroomAnalyzerLogsResponse
  baseClassroomLogUrl?: string
  instructorName?: string
}) {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

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

  const classroomDistributionData = useMemo(() => {
    return (data.classroom_scans || []).map((item) => ({
      classroom: item.class_name,
      scans: item.scan_count,
    }))
  }, [data.classroom_scans])

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

  const filteredClassLogs = useMemo(() => {
    const list = data.classroom_scans || []
    if (!search.trim()) return list
    const q = search.toLowerCase().trim()
    return list.filter(
      (item) =>
        item.class_name.toLowerCase().includes(q) ||
        item.classroom_id.toLowerCase().includes(q) ||
        (item.classroom_code && item.classroom_code.toLowerCase().includes(q))
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
      "Classroom ID",
      "Class Name",
      "Scan Count",
      "Enrollment Count",
    ]
    const rows = data.classroom_scans.map((item) => [
      `"${item.classroom_id}"`,
      `"${item.class_name.replace(/"/g, '""')}"`,
      item.scan_count,
      item.enrollment_count,
    ])

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute(
      "download",
      `classroom_analyzer_logs_${new Date().toISOString().slice(0, 10)}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.add({
      title: "Export Initiated",
      description:
        "Instructor analyzer log history CSV report has been generated.",
      type: "success",
    })
  }

  const KPI = [
    {
      title: "Total Scans Run",
      icon: Globe,
      value: (data.total_scans ?? 0).toLocaleString(),
      footerDesc: "Across all classrooms",
    },
    {
      title: "Active Classrooms",
      icon: GraduationCap,
      value: (data.active_classrooms ?? 0).toLocaleString(),
      footerDesc: "Managed active classes",
    },
    {
      title: "Flagged Issues",
      icon: Layers,
      value: (data.violations ?? 0).toLocaleString(),
      footerDesc: "WCAG 2.2 accessibility violations",
    },
    {
      title: "Overall Pass Rate",
      icon: CheckCircle2,
      value: `${typeof data.pass_rate === "number" ? data.pass_rate.toFixed(1) : (data.pass_rate ?? 0)}%`,
      footerDesc: "Averaged all managed classrooms",
    },
  ]

  return (
    <section className="p-responsive space-y-6">
      {/* Header */}
      <HeaderTemplate
        title={instructorName ? `${instructorName} - Classroom Logs` : "Classroom Analyzer Logs"}
        subtitle={
          instructorName
            ? `Real-time audit history and automated scan execution telemetry for ${instructorName}'s managed classrooms.`
            : "Real-time audit history and automated scan execution telemetry across your managed classrooms."
        }
        backTo={instructorName ? "-1" : undefined}
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

      {/* Row 2: Dual Bar Charts Grid (Usage Analytics + Classroom Usage Comparison) */}
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
              className="w-fit px-3 py-1 text-xs font-semibold"
            >
              {data.total_scans ?? 0} Total Scans
            </Badge>
          </CardHeader>

          <CardContent>
            <ChartContainer
              config={usageChartConfig}
              className="max-h-65 w-full"
            >
              <BarChart
                accessibilityLayer
                data={usageChartData}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={true}
                  strokeDasharray="3 3"
                  className="stroke-muted"
                />
                <XAxis
                  dataKey="date"
                  tickLine={true}
                  tickMargin={10}
                  axisLine={true}
                  className="text-xs font-medium text-muted-foreground"
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={true}
                  axisLine={true}
                  className="text-xs font-medium text-muted-foreground"
                />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar
                  dataKey="scans"
                  fill="var(--primary)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Chart 2: Distribution of Scans per Classroom */}
        <Card>
          <CardHeader className="flex flex-col gap-2 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg font-bold sm:text-xl">
                Classroom Scan Comparison
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Comparative scan volume across your active classroom cohorts
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="w-fit px-3 py-1 text-xs font-semibold"
            >
              {data.active_classrooms ?? data.classroom_scans?.length ?? 0}
            </Badge>
          </CardHeader>

          <CardContent>
            <ChartContainer
              config={classroomChartConfig}
              className="max-h-65 w-full"
            >
              <BarChart
                accessibilityLayer
                data={classroomDistributionData}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={true}
                  strokeDasharray="3 3"
                  className="stroke-muted"
                />
                <XAxis
                  dataKey="classroom"
                  tickLine={true}
                  tickMargin={10}
                  axisLine={true}
                  className="text-xs font-medium text-muted-foreground"
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={true}
                  axisLine={true}
                  className="text-xs font-medium text-muted-foreground"
                />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar
                  dataKey="scans"
                  fill="var(--primary)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: WCAG Principle Compliance Breakdown (POUR) */}
      <Card className="p-6">
        <CardHeader className="flex flex-col gap-2 p-0 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-bold sm:text-xl">
              Failed Audits by WCAG Principle (POUR)
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Proportional distribution of{" "}
              {totalPrincipleViolations > 0
                ? totalPrincipleViolations
                : (data.violations ?? 0)}{" "}
              accessibility violations detected during classroom audits
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="w-fit px-3 py-1 text-xs font-semibold"
          >
            {totalPrincipleViolations > 0
              ? totalPrincipleViolations
              : (data.violations ?? 0)}{" "}
            Flagged Violations
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
                      {item.count}
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

      {/* Row 4: Classroom Scan Logs Table */}
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-foreground sm:text-lg">
              Classroom Scan Logs
            </h3>
            <p className="text-xs text-muted-foreground">
              Select a classroom to view detailed student scan histories and
              audit telemetry
            </p>
          </div>
          <div className="w-full max-w-md sm:w-72">
            <SearchTemplate
              search={search}
              setSearch={setSearch}
              title="classroom or code"
            />
          </div>
        </div>

        <Card className="overflow-hidden pt-0">
          <div className="w-full overflow-x-auto">
            <Table className="min-w-150 p-4">
              <TableHeader className="p-10">
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="pl-4 text-xs font-bold whitespace-nowrap text-muted-foreground uppercase">
                    Scans
                  </TableHead>
                  <TableHead className="text-xs font-bold whitespace-nowrap text-muted-foreground uppercase">
                    Class
                  </TableHead>
                  <TableHead className="text-xs font-bold whitespace-nowrap text-muted-foreground uppercase">
                    Enrolled
                  </TableHead>
                  <TableHead className="w-28 pr-4 text-right text-xs font-bold whitespace-nowrap text-muted-foreground uppercase">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClassLogs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-32 text-center text-muted-foreground"
                    >
                      No classroom scan logs found matching "{search}".
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClassLogs.map((item) => (
                    <TableRow
                      key={item.classroom_id}
                      onClick={() =>
                        navigate(
                          `${baseClassroomLogUrl}/${item.classroom_id}`
                        )
                      }
                      className="cursor-pointer transition-colors even:bg-secondary/30 hover:bg-muted/40"
                    >
                      <TableCell className="pl-4 font-bold whitespace-nowrap text-foreground">
                        {item.scan_count}
                      </TableCell>
                      <TableCell className="font-medium whitespace-nowrap text-foreground">
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">
                            {item.class_name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.classroom_code
                              ? `Code: ${item.classroom_code}`
                              : `ID: ${item.classroom_id.slice(0, 8)}...`}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {item.enrollment_count} students
                      </TableCell>
                      <TableCell className="pr-4 text-right whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(
                              `${baseClassroomLogUrl}/${item.classroom_id}`
                            )
                          }}
                          className="cursor-pointer text-xs font-medium text-foreground hover:text-primary sm:text-sm"
                        >
                          View details
                          <ChevronRight className="ml-1 size-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </section>
  )
}

function AnalyzerLogsInstructorWithQuery() {
  const { data } = useClassroomAnalyzerLogs()
  return <AnalyzerLogsInstructorContent data={data} />
}

export default function AnalyzerLogsInstructor({
  data,
}: AnalyzerLogsInstructorProps) {
  if (data) {
    return <AnalyzerLogsInstructorContent data={data} />
  }

  return <AnalyzerLogsInstructorWithQuery />
}

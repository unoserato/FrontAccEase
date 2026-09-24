import HeaderTemplate from "@/components/common/PageTemplate"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  FileText,
  Clock,
  CheckCircle2,
  ChevronRight,
  Zap,
  Activity,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const chartData = [
  { date: "09-01", scans: 380 },
  { date: "09-02", scans: 520 },
  { date: "09-03", scans: 450 },
  { date: "09-04", scans: 720 },
  { date: "09-05", scans: 600 },
  { date: "09-06", scans: 280 },
  { date: "09-07", scans: 470 },
]

const chartConfig = {
  scans: {
    label: "Automated Scans",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const principlesData = [
  { name: "Perceivable", count: 120, pct: 58.54, colorBg: "bg-blue-500" },
  { name: "Operable", count: 55, pct: 26.83, colorBg: "bg-emerald-500" },
  { name: "Understandable", count: 20, pct: 9.76, colorBg: "bg-amber-500" },
  { name: "Robust", count: 10, pct: 4.87, colorBg: "bg-purple-500" },
]

const recentActivityLogs = [
  {
    id: "1",
    course: "ITEP 306 - UI / UX and Cross Platform Technologies",
    scans: 100,
    passRate: "82.4%",
    time: "10 mins ago",
  },
  {
    id: "2",
    course: "WCAG 101 - Web Accessibility Fundamentals",
    scans: 120,
    passRate: "76.5%",
    time: "1 hour ago",
  },
  {
    id: "3",
    course: "CS 401 - Advanced Web Accessibility Auditing",
    scans: 115,
    passRate: "71.0%",
    time: "3 hours ago",
  },
  {
    id: "4",
    course: "UIUX 202 - Inclusive UI/UX Engineering",
    scans: 85,
    passRate: "88.1%",
    time: "5 hours ago",
  },
]

export default function DashboardSchoolAdmin() {
  const navigate = useNavigate()

  function handleExport() {
    toast.add({
      title: "Report Exported",
      description: "Admin overview summary report CSV has been generated.",
      type: "success",
    })
  }

  return (
    <section className="p-responsive space-y-6">
      {/* Header */}
      <HeaderTemplate
        title="Admin Dashboard"
        subtitle="Overview of system activity, course metrics, scanner performance, and learner risk"
        cta={[
          <Button key="export" onClick={handleExport}>
            <FileText className="mr-1.5 h-4 w-4" />
            Export Report
          </Button>,
        ]}
      />

      {/* Row 1: Top 4 KPI Metrics Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              2,310
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enrolled learners</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              2,290
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Published Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              128
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Published Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              89
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Bar Chart Section (shadcn Bar Chart) */}
      <Card className="p-6">
        <CardHeader className="flex flex-col gap-2 p-0 pb-6 sm:flex-row sm:items-center sm:justify-between">
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
            520 Total Scans
          </Badge>
        </CardHeader>

        <CardContent className="p-0">
          <ChartContainer config={chartConfig} className="max-h-65 w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
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
                tickLine={true}
                axisLine={true}
                className="text-xs font-medium text-muted-foreground"
              />
              <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
              <Bar
                dataKey="scans"
                fill="var(--primary)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Row 3: Yellow Box - Single Multi-Segment Stacked Progress Bar */}
      <Card className="p-6">
        <CardHeader className="flex flex-col gap-2 p-0 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-bold sm:text-xl">
              Failed Audits by WCAG Principle
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Proportional distribution of 205 failed audits across WCAG 2.2
              core principles
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="w-fit px-3 py-1 text-xs font-semibold"
          >
            205 Total Failed Audits
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6 p-0">
          {/* Shared Stacked Multi-Segment Progress Bar */}
          <div className="space-y-2">
            <div className="flex h-5 w-full overflow-hidden rounded-full bg-muted p-0.5 ring-1 ring-border/50">
              {principlesData.map((item, index) => (
                <div
                  key={item.name}
                  className={`h-full ${item.colorBg} transition-all ${
                    index === 0 ? "rounded-l-full" : ""
                  } ${index === principlesData.length - 1 ? "rounded-r-full" : ""}`}
                  style={{ width: `${item.pct}%` }}
                  title={`${item.name}: ${item.count} failed audits (${item.pct.toFixed(1)}%)`}
                />
              ))}
            </div>
          </div>

          {/* Legend Grid */}
          <div className="grid grid-cols-2 gap-4 border-t pt-2 sm:grid-cols-2 lg:grid-cols-4">
            {principlesData.map((item) => (
              <div
                key={item.name}
                className="flex items-start gap-3 rounded-xl bg-muted/40 p-3.5 transition-colors hover:bg-muted/60"
              >
                <div
                  className={`h-3.5 w-3.5 rounded-full ${item.colorBg} mt-0.5 shrink-0`}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {item.name}
                  </p>
                  <div className="mt-0.5 flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-foreground">
                      {item.count}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      ({item.pct.toFixed(1)}%)
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {item.count === 1 ? "failed audit" : "failed audits"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Row 4: Blue Box (Scan Duration & Passing Rate) + Right Box (Recent Audit Activity Logs) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Blue Box: Scan Duration & Passing Rate */}
        <Card className="flex flex-col justify-between p-6">
          <CardHeader className="flex flex-row items-center justify-between p-0 pb-5">
            <div>
              <CardTitle className="text-lg font-bold sm:text-xl">
                Scanner Performance & Metrics
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Real-time automated scan execution speed and overall compliance
                rate
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="border-emerald-500/30 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
            >
              <Zap className="mr-1 h-3 w-3" /> Engine Active
            </Badge>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-4 p-0 sm:grid-cols-2">
            {/* Avg Scan Duration Block */}
            <div className="space-y-3 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Avg Scan Duration
                </span>
                <div className="rounded-xl bg-blue-500/15 p-2 text-blue-600 dark:text-blue-400">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-foreground">
                  10.52
                  <span className="text-base font-normal text-muted-foreground">
                    s
                  </span>
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Fast automated DOM & WCAG 2.2 evaluation
                </p>
              </div>
            </div>

            {/* Overall Passing Rate Block */}
            <div className="space-y-3 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Overall Pass Rate
                </span>
                <div className="rounded-xl bg-emerald-500/15 p-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-foreground">
                  78.43
                  <span className="text-base font-normal text-muted-foreground">
                    %
                  </span>
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Compliant accessibility scans across classrooms
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Box: Recent System Audit Activity */}
        <Card className="flex flex-col justify-between p-6">
          <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
            <div>
              <CardTitle className="text-lg font-bold sm:text-xl">
                Recent Audit Activity
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Latest automated accessibility scans executed across classrooms
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/logs")}
              className="shrink-0 text-xs font-medium text-foreground hover:text-primary"
            >
              View All Logs <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-3 p-0">
            {recentActivityLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between rounded-xl bg-muted/40 p-3 transition-colors hover:bg-muted/60"
              >
                <div className="flex min-w-0 items-center gap-3 pr-2">
                  <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-foreground sm:text-sm">
                      {log.course}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {log.scans} scans executed • {log.time}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="shrink-0 text-xs font-medium"
                >
                  {log.passRate}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

import { useState, useMemo } from "react"
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
  ChevronRight,
  Globe,
  GraduationCap,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

interface OrgClassLogItem {
  id: string
  scans: number
  className: string
  code: string
  instructor: string
  enrolled: number
  passRate: string
  flaggedCount: number
}

const orgClassLogs: OrgClassLogItem[] = [
  {
    id: "1",
    scans: 100,
    className: "ITEP 306 - UI / UX and Cross Platform Technologies",
    code: "ITEP-306",
    instructor: "Dr. Evelyn Reed",
    enrolled: 42,
    passRate: "82.4%",
    flaggedCount: 35,
  },
  {
    id: "2",
    scans: 120,
    className: "WCAG 101 - Web Accessibility Fundamentals",
    code: "WCAG-101",
    instructor: "Prof. Alan Turing",
    enrolled: 38,
    passRate: "76.5%",
    flaggedCount: 52,
  },
  {
    id: "3",
    scans: 85,
    className: "UIUX 202 - Inclusive UI/UX Engineering",
    code: "UIUX-202",
    instructor: "Sarah Jenkins",
    enrolled: 45,
    passRate: "88.1%",
    flaggedCount: 22,
  },
  {
    id: "4",
    scans: 115,
    className: "CS 401 - Advanced Web Accessibility Auditing",
    code: "CS-401",
    instructor: "Dr. Evelyn Reed",
    enrolled: 29,
    passRate: "71.0%",
    flaggedCount: 64,
  },
  {
    id: "5",
    scans: 100,
    className: "ITEP 308 - Assistive Technology Integration",
    code: "ITEP-308",
    instructor: "Dr. Marcus Vance",
    enrolled: 50,
    passRate: "79.8%",
    flaggedCount: 32,
  },
  {
    id: "6",
    scans: 90,
    className: "QA 102 - Software Quality & Compliance Testing",
    code: "QA-102",
    instructor: "Prof. Alan Turing",
    enrolled: 34,
    passRate: "84.2%",
    flaggedCount: 26,
  },
]

const usageChartData = [
  { date: "09-01", scans: 380 },
  { date: "09-02", scans: 520 },
  { date: "09-03", scans: 450 },
  { date: "09-04", scans: 720 },
  { date: "09-05", scans: 600 },
  { date: "09-06", scans: 280 },
  { date: "09-07", scans: 470 },
]

const instructorUsageData = [
  { instructor: "Dr. Evelyn Reed", scans: 215 },
  { instructor: "Prof. Alan Turing", scans: 210 },
  { instructor: "Dr. Marcus Vance", scans: 100 },
  { instructor: "Sarah Jenkins", scans: 85 },
  { instructor: "Prof. Elena Gomez", scans: 60 },
]

const usageChartConfig = {
  scans: {
    label: "Automated Scans",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const instructorChartConfig = {
  scans: {
    label: "Faculty Scans",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const principlesData = [
  {
    name: "Perceivable",
    count: 120,
    pct: 58.54,
    colorBg: "bg-blue-500",
    description:
      "Alt text, color contrast, media alternatives & resizable text",
  },
  {
    name: "Operable",
    count: 55,
    pct: 26.83,
    colorBg: "bg-emerald-500",
    description: "Keyboard traps, focus indicators, navigation & target sizes",
  },
  {
    name: "Understandable",
    count: 20,
    pct: 9.76,
    colorBg: "bg-amber-500",
    description: "Form labels, error suggestions, page language & consistency",
  },
  {
    name: "Robust",
    count: 10,
    pct: 4.87,
    colorBg: "bg-purple-500",
    description: "HTML parsing, ARIA role validation & name/role/value specs",
  },
]

export default function AnalyzerLogsSchoolAdmin() {
  const [search, setSearch] = useState("")
  const [selectedClass, setSelectedClass] = useState<OrgClassLogItem | null>(
    null
  )
  const navigate = useNavigate()

  const filteredClassLogs = useMemo(() => {
    if (!search.trim()) return orgClassLogs
    const q = search.toLowerCase().trim()
    return orgClassLogs.filter(
      (item) =>
        item.className.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.instructor.toLowerCase().includes(q)
    )
  }, [search])

  function handleExport() {
    toast.add({
      title: "Export Initiated",
      description:
        "LSPU institutional analyzer log history CSV report has been generated.",
      type: "success",
    })
  }

  const KPI = [
    {
      title: "Total Org Scans",
      icon: Globe,
      value: "3,420",
      footerDesc: "Across all classrooms",
    },
    {
      title: "Active Classrooms",
      icon: GraduationCap,
      value: "18",
      footerDesc: "Classrooms under the organization",
    },
    {
      title: "Average Scan Duration",
      icon: Clock,
      value: "10.52s",
      footerDesc: "Across all scan requests",
    },
    {
      title: "Institutional Pass Rate",
      icon: CheckCircle2,
      value: "78.43%",
      footerDesc: "University-wide compliance rate",
    },
  ]

  return (
    <section className="p-responsive space-y-6">
      {/* Header */}
      <HeaderTemplate
        title="Laguna State Polytechnic University Scans"
        subtitle="Organization-wide automated accessibility scan telemetry across all instructors, departments, and classroom cohorts."
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

      {/* Row 2: Dual Bar Charts Grid (Usage Analytics + Scans by Instructor) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart 1: Analyzer Usage Analytics */}
        <Card>
          <CardHeader className="flex flex-col gap-2 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg font-bold sm:text-xl">
                Analyzer Usage Analytics
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Total automated scans executed per date across LSPU
              </CardDescription>
            </div>
            <Badge
              variant="secondary"
              className="w-fit px-3 py-1 text-xs font-semibold"
            >
              3,420 Total Scans
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

        {/* Chart 2: Scans by Instructor / Faculty Usage */}
        <Card>
          <CardHeader className="flex flex-col gap-2 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg font-bold sm:text-xl">
                Scans by Faculty Member
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                Comparative audit activity across instructors in the institution
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="w-fit px-3 py-1 text-xs font-semibold"
            >
              12 Active Faculty
            </Badge>
          </CardHeader>

          <CardContent>
            <ChartContainer
              config={instructorChartConfig}
              className="max-h-65 w-full"
            >
              <BarChart
                accessibilityLayer
                data={instructorUsageData}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={true}
                  strokeDasharray="3 3"
                  className="stroke-muted"
                />
                <XAxis
                  dataKey="instructor"
                  tickLine={true}
                  tickMargin={10}
                  axisLine={true}
                  className="truncate text-xs font-medium text-muted-foreground"
                />
                <YAxis
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

      {/* Row 3: WCAG Principles Failed Audits (Single Shared Multi-Segment Progress Bar) */}
      <Card className="p-6">
        <CardHeader className="flex flex-col gap-2 p-0 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-bold sm:text-xl">
              Failed Audits by WCAG Principle (POUR)
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              University-wide distribution of 205 total failed audits across
              WCAG 2.2 core principles
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="w-fit px-3 py-1 text-xs font-semibold"
          >
            205 Total Issues
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6 p-0">
          {/* Shared Stacked Multi-Segment Progress Bar */}
          <div className="space-y-2">
            <div className="flex h-4 w-full overflow-hidden rounded-full bg-muted p-0.5 ring-1 ring-border/50">
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

      {/* Row 4: Organization Classroom & Faculty Execution Logs Table */}
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-foreground sm:text-lg">
              University Classroom Scans
            </h3>
            <p className="text-xs text-muted-foreground">
              Comprehensive scan histories across all faculty members and
              academic sections
            </p>
          </div>
          <div className="w-full max-w-md sm:w-72">
            <SearchTemplate
              search={search}
              setSearch={setSearch}
              title="class, instructor, or code"
            />
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="w-full overflow-x-auto">
            <Table className="min-w-150">
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="pl-4 text-xs font-bold whitespace-nowrap text-muted-foreground uppercase">
                    Scans
                  </TableHead>
                  <TableHead className="text-xs font-bold whitespace-nowrap text-muted-foreground uppercase">
                    Class & Code
                  </TableHead>
                  <TableHead className="text-xs font-bold whitespace-nowrap text-muted-foreground uppercase">
                    Instructor
                  </TableHead>
                  <TableHead className="text-xs font-bold whitespace-nowrap text-muted-foreground uppercase">
                    Enrolled
                  </TableHead>
                  <TableHead className="text-xs font-bold whitespace-nowrap text-muted-foreground uppercase">
                    Pass Rate
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
                      colSpan={6}
                      className="h-32 text-center text-muted-foreground"
                    >
                      No university classroom scan logs found matching "{search}
                      ".
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClassLogs.map((item) => (
                    <TableRow
                      key={item.id}
                      onClick={() => setSelectedClass(item)}
                      className="cursor-pointer transition-colors hover:bg-muted/40"
                    >
                      <TableCell className="pl-4 font-bold whitespace-nowrap text-foreground">
                        {item.scans}
                      </TableCell>
                      <TableCell className="font-medium whitespace-nowrap text-foreground">
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">
                            {item.className}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Code: {item.code}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm whitespace-nowrap text-foreground">
                        {item.instructor}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {item.enrolled} students
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge
                          variant={
                            parseFloat(item.passRate) >= 80
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs font-semibold"
                        >
                          {item.passRate}
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-4 text-right whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/admin/logs/classroom/${item.id}`)
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

      {/* Details Dialog for Selected Classroom */}
      <Dialog
        open={Boolean(selectedClass)}
        onOpenChange={(open) => !open && setSelectedClass(null)}
      >
        <DialogContent className="max-w-md space-y-4 p-6 sm:max-w-md">
          {selectedClass && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">
                  {selectedClass.code} Audit Summary
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground sm:text-sm">
                  {selectedClass.className} • {selectedClass.instructor}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-0.5 rounded-lg bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Total Scans</p>
                  <p className="text-base font-bold text-foreground">
                    {selectedClass.scans}
                  </p>
                </div>
                <div className="space-y-0.5 rounded-lg bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">
                    Enrolled Students
                  </p>
                  <p className="text-base font-bold text-foreground">
                    {selectedClass.enrolled}
                  </p>
                </div>
                <div className="space-y-0.5 rounded-lg bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Pass Rate</p>
                  <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedClass.passRate}
                  </p>
                </div>
                <div className="space-y-0.5 rounded-lg bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">
                    Flagged Issues
                  </p>
                  <p className="text-base font-bold text-amber-600 dark:text-amber-400">
                    {selectedClass.flaggedCount}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

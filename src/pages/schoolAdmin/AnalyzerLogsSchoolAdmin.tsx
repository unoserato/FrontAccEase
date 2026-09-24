import { useState, useMemo } from "react"
import HeaderTemplate from "@/components/common/PageTemplate"
import SearchTemplate from "@/components/common/SearchTemplate"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { FileText, Settings, ChevronRight } from "lucide-react"

interface ClassLogItem {
  id: string
  scans: number
  className: string
  code: string
  enrolled: number
  passRate: string
  flaggedCount: number
}

const classLogs: ClassLogItem[] = [
  {
    id: "1",
    scans: 100,
    className: "ITEP 306 - UI / UX and Cross Platform Technologies",
    code: "ITEP-306",
    enrolled: 42,
    passRate: "82.4%",
    flaggedCount: 35,
  },
  {
    id: "2",
    scans: 120,
    className: "WCAG 101 - Web Accessibility Fundamentals",
    code: "WCAG-101",
    enrolled: 38,
    passRate: "76.5%",
    flaggedCount: 52,
  },
  {
    id: "3",
    scans: 85,
    className: "UIUX 202 - Inclusive UI/UX Engineering",
    code: "UIUX-202",
    enrolled: 45,
    passRate: "88.1%",
    flaggedCount: 22,
  },
  {
    id: "4",
    scans: 115,
    className: "CS 401 - Advanced Web Accessibility Auditing",
    code: "CS-401",
    enrolled: 29,
    passRate: "71.0%",
    flaggedCount: 64,
  },
  {
    id: "5",
    scans: 100,
    className: "ITEP 308 - Assistive Technology Integration",
    code: "ITEP-308",
    enrolled: 50,
    passRate: "79.8%",
    flaggedCount: 32,
  },
]

const chartData = [
  { date: "09-01", scans: 38 },
  { date: "09-02", scans: 52 },
  { date: "09-03", scans: 45 },
  { date: "09-04", scans: 72 },
  { date: "09-05", scans: 60 },
  { date: "09-06", scans: 28 },
  { date: "09-07", scans: 47 },
]

const chartConfig = {
  scans: {
    label: "Automated Scans",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const principlesData = [
  {
    name: "Perceivable",
    count: 120,
    pct: 58.54,
    colorBg: "bg-blue-500",
    colorText: "text-blue-500",
  },
  {
    name: "Operable",
    count: 55,
    pct: 26.83,
    colorBg: "bg-emerald-500",
    colorText: "text-emerald-500",
  },
  {
    name: "Understandable",
    count: 20,
    pct: 9.76,
    colorBg: "bg-amber-500",
    colorText: "text-amber-500",
  },
  {
    name: "Robust",
    count: 10,
    pct: 4.87,
    colorBg: "bg-purple-500",
    colorText: "text-purple-500",
  },
]

export default function AnalyzerLogsSchoolAdmin() {
  const [search, setSearch] = useState("")
  const [selectedClass, setSelectedClass] = useState<ClassLogItem | null>(null)

  const filteredClassLogs = useMemo(() => {
    if (!search.trim()) return classLogs
    const q = search.toLowerCase().trim()
    return classLogs.filter(
      (item) =>
        item.className.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q)
    )
  }, [search])

  function handleExport() {
    toast.add({
      title: "Export Initiated",
      description: "Analyzer log history CSV report is being generated.",
      type: "success",
    })
  }

  return (
    <section className="p-responsive space-y-6">
      {/* Header */}
      <HeaderTemplate
        title="Analyzer Logs"
        subtitle="Real-time audit history and automated scan execution logs for this classroom"
        cta={[
          <Button key="export" onClick={handleExport}>
            <FileText className="mr-1.5 h-4 w-4" />
            Export Data
          </Button>,
          <Button
            key="settings"
            variant="outline"
            size="icon"
            title="Analyzer Settings"
          >
            <Settings className="h-4 w-4" />
          </Button>,
        ]}
      />

      {/* Row 1: KPI Summary Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Scans Run</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              520
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Scan Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              10.52<span className="text-base font-normal"> seconds</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Failed Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              205
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Overall Passing Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              78.43%
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

      {/* Row 3: WCAG Principles Failed Audits (Single Shared Multi-Segment Progress Bar) */}
      <Card className="p-6">
        <CardHeader className="flex flex-col gap-2 p-0 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-bold sm:text-xl">
              Failed Audits by WCAG Principle
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Distribution of 205 total failed audits across WCAG 2.2 core
              principles
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
          <div className="grid grid-cols-1 gap-4 border-t pt-2 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Row 4: Class Execution Logs Table */}
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h3 className="text-base font-bold sm:text-lg">
            Classroom Scan Logs
          </h3>
          <div className="w-full max-w-md sm:w-72">
            <SearchTemplate
              search={search}
              setSearch={setSearch}
              title="classroom or code"
            />
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[600px]">
              <TableHeader>
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
                    <TableRow key={item.id} className="hover:bg-muted/40">
                      <TableCell className="pl-4 font-bold whitespace-nowrap text-foreground">
                        {item.scans}
                      </TableCell>
                      <TableCell className="font-medium whitespace-nowrap text-foreground">
                        {item.className}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {item.enrolled}
                      </TableCell>
                      <TableCell className="pr-4 text-right whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedClass(item)}
                          className="text-xs font-medium text-foreground hover:text-primary sm:text-sm"
                        >
                          View details
                          <ChevronRight className="ml-1 h-3.5 w-3.5" />
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
                  {selectedClass.className}
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

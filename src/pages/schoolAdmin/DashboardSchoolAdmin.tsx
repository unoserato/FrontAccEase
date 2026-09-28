import HeaderTemplate from "@/components/common/PageTemplate"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Zap,
  Users,
  GraduationCap,
  BookOpen,
  FileQuestion,
  Globe,
  ChevronRight,
} from "lucide-react"
import { learners, classrooms, modules, quizzes } from "@/const/data"

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

interface UserScanItem {
  id: string
  userName: string
  userImg?: string
  userEmail: string
  url: string
  classroomName: string | null
  classroomCode: string | null
  scanTime: string
  score: number
  criticalIssues: number
  seriousIssues: number
  minorIssues: number
  passedCount: number
}

const userScans: UserScanItem[] = [
  {
    id: "scan-1",
    userName: learners[0]?.name || "Rene Clert Baterbonia",
    userImg: learners[0]?.img,
    userEmail: "reneclert@gmail.com",
    url: "https://attendex.online",
    classroomName: "Web Accessibility Fundamentals",
    classroomCode: "WCAG-101",
    scanTime: "10 mins ago",
    score: 82,
    criticalIssues: 2,
    seriousIssues: 2,
    minorIssues: 2,
    passedCount: 18,
  },
  {
    id: "scan-2",
    userName: learners[1]?.name || "Divine Adili",
    userImg: learners[1]?.img,
    userEmail: "divineadili@gmail.com",
    url: "https://inclusive-portfolio.dev",
    classroomName: "Inclusive UI/UX Engineering",
    classroomCode: "UIUX-202",
    scanTime: "35 mins ago",
    score: 91,
    criticalIssues: 0,
    seriousIssues: 1,
    minorIssues: 3,
    passedCount: 22,
  },
  {
    id: "scan-3",
    userName: learners[2]?.name || "Alyssa Nicole Santos",
    userImg: learners[2]?.img,
    userEmail: "alyssasantos@gmail.com",
    url: "https://student-storefront.vercel.app",
    classroomName: "Web Accessibility Fundamentals",
    classroomCode: "WCAG-101",
    scanTime: "1 hour ago",
    score: 64,
    criticalIssues: 4,
    seriousIssues: 5,
    minorIssues: 4,
    passedCount: 12,
  },
  {
    id: "scan-4",
    userName: learners[3]?.name || "Marc Ethan Villanueva",
    userImg: learners[3]?.img,
    userEmail: "marcvillanueva@gmail.com",
    url: "https://edu-portal-prototype.netlify.app",
    classroomName: "Software Quality & Compliance Testing",
    classroomCode: "QA-102",
    scanTime: "2 hours ago",
    score: 78,
    criticalIssues: 1,
    seriousIssues: 3,
    minorIssues: 5,
    passedCount: 19,
  },
  {
    id: "scan-5",
    userName: learners[4]?.name || "Sophia Isabel Reyes",
    userImg: learners[4]?.img,
    userEmail: "sophiareyes@gmail.com",
    url: "https://a11y-dashboard.org",
    classroomName: "Software Quality & Compliance Testing",
    classroomCode: "QA-102",
    scanTime: "4 hours ago",
    score: 88,
    criticalIssues: 0,
    seriousIssues: 2,
    minorIssues: 2,
    passedCount: 20,
  },
]

export default function DashboardSchoolAdmin() {
  function handleExport() {
    toast.add({
      title: "System Report Exported",
      description:
        "Accessibility compliance and scanner telemetry CSV generated.",
      type: "success",
    })
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }

  const KPI = [
    {
      title: "Total Users",
      icon: Users,
      value: "2,310",
      footerDesc: `${learners.length} Learners • 20 Instructors`,
    },
    {
      title: "Classrooms",
      icon: GraduationCap,
      value: `${classrooms.length}`,
      footerDesc: "Managed academic cohorts",
    },
    {
      title: "Published Modules",
      icon: BookOpen,
      value: `${modules.length}`,
      footerDesc: "Curriculum learning units",
    },
    {
      title: "Quizzes",
      icon: FileQuestion,
      value: `${quizzes.length}`,
      footerDesc: "Active student assessments",
    },
  ]

  return (
    <section className="p-responsive space-y-6">
      {/* Header with Export Action */}
      <HeaderTemplate
        title="Admin Dashboard"
        subtitle="System-wide overview of accessibility compliance, classroom cohorts, user activity, and scanner telemetry."
        cta={[
          <Button key="export" onClick={handleExport}>
            <FileText className="mr-1.5 size-4" />
            Export System Report
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

      {/* Row 2: Full-Width Analyzer Usage Analytics Bar Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2">
          <Card className="p-6">
            <CardHeader className="flex flex-col gap-2 p-0 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-lg font-bold sm:text-xl">
                  Analyzer Usage Analytics
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                  Total automated accessibility analyzer scans executed per date
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="px-2.5 py-1 text-xs font-medium"
                >
                  488 scans/day avg
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-xs font-semibold"
                >
                  3,420 Total Scans
                </Badge>
              </div>
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
        <div className="space-y-6 lg:col-span-1">
          <Card className="space-y-4 p-6">
            <CardHeader className="flex flex-row items-center justify-between p-0 pb-1">
              <div>
                <CardTitle className="text-base font-bold sm:text-lg">
                  Scanner Performance
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Automated engine latency & compliance index
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs font-medium">
                <Zap className="mr-1 size-3 text-muted-foreground" />
                Active
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4 p-0">
              {/* Avg Scan Duration Block */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Average Scan Duration
                  </CardTitle>
                  <CardAction>
                    <Clock className="size-4" />
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                    10.52
                    <span className="text-sm font-normal text-muted-foreground">
                      s
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Across all scan requests
                  </p>
                </CardContent>
              </Card>
              {/* Overall Pass Rate Block */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Overall Passing Rate
                  </CardTitle>
                  <CardAction>
                    <CheckCircle2 className="size-4" />
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                    78.43
                    <span className="text-sm font-normal text-muted-foreground">
                      %
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    University-wide compliance rate
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Row 3: Operational Workspace (Scanner Performance + User-Specific Recent Audit Activity) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (1/3): Scanner Performance & Metrics (Colorless / Neutral) */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="space-y-4 p-6">
            <CardHeader className="p-0 pb-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold sm:text-lg">
                  Analyzer Telemetry
                </CardTitle>
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                Automated student DOM accessibility audits
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 p-0">
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-border/50 bg-muted/40 p-3.5">
                <div>
                  <span className="block text-xs font-medium text-muted-foreground">
                    Total Scans
                  </span>
                  <span className="text-xl font-bold text-foreground">520</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-muted-foreground">
                    Pass Rate
                  </span>
                  <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    78.4%
                  </span>
                </div>
              </div>

              {/* Classroom Distribution Mini Bars */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Top Scanned Classrooms
                  </span>
                  <span className="font-semibold text-foreground">Scans</span>
                </div>

                <div className="space-y-2">
                  {[
                    { code: "WCAG-101", count: 120, pct: 100 },
                    { code: "CS-401", count: 115, pct: 95 },
                    { code: "ITEP-306", count: 100, pct: 83 },
                    { code: "UIUX-202", count: 85, pct: 70 },
                  ].map((item) => (
                    <div key={item.code} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-muted-foreground">
                          {item.code}
                        </span>
                        <span className="font-semibold text-foreground">
                          {item.count}
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full cursor-pointer text-xs font-semibold"
              >
                View Full Analyzer Logs
                <ChevronRight className="ml-1 size-3.5" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (2/3): User-Specific Recent Audit Activity */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
              <div>
                <CardTitle className="text-lg font-bold sm:text-xl">
                  Recent Audit Activity
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                  User-specific automated accessibility scans and classroom
                  contexts
                </CardDescription>
              </div>
              <Badge
                variant="secondary"
                className="px-2.5 py-1 text-xs font-semibold"
              >
                24 scans/hr
              </Badge>
            </CardHeader>

            <CardContent className="space-y-3 p-0">
              {userScans.map((scan) => (
                <div
                  key={scan.id}
                  className="flex flex-col gap-3 rounded-xl bg-muted/40 p-3.5 transition-colors hover:bg-muted/60 sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* User & Scanned URL Information */}
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="size-9 shrink-0 border border-border">
                      <AvatarImage src={scan.userImg} alt={scan.userName} />
                      <AvatarFallback className="text-xs font-semibold">
                        {getInitials(scan.userName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {scan.userName}
                        </p>
                        {scan.classroomCode ? (
                          <Badge
                            variant="outline"
                            className="text-xs font-normal"
                          >
                            {scan.classroomCode}
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="text-xs font-normal text-muted-foreground"
                          >
                            No Classroom
                          </Badge>
                        )}
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex max-w-50 items-center gap-1 truncate sm:max-w-xs">
                          <Globe className="size-3 shrink-0" />
                          <span className="truncate">{scan.url}</span>
                        </span>
                        <span>•</span>
                        <span>{scan.scanTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Score & View Button */}
                  <div className="flex shrink-0 items-center justify-between gap-3 self-start sm:self-auto">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          scan.score >= 80
                            ? "secondary"
                            : scan.score >= 70
                              ? "outline"
                              : "destructive"
                        }
                        className="text-xs font-semibold"
                      >
                        {scan.score}% Score
                      </Badge>
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="cursor-pointer text-xs font-medium"
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

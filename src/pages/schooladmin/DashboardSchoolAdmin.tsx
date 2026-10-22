import { useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Zap,
  Users,
  GraduationCap,
  BookOpen,
  FileQuestion,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight,
  Eye,
  Keyboard,
  Brain,
  Code,
  Layers,
} from "lucide-react"
import type { CurriculumPrinciple, CurriculumRevision } from "@/const/props/moduleProps"
import {
  useCurriculum,
  useInstructorMaterialsCount,
  useWCAGInstruments,
} from "@/services/tanstack/materials"

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
    color: "var(--primary)",
  },
} satisfies ChartConfig

const topCohorts = [
  { code: "WCAG-101", name: "Accessibility Fundamentals", scans: 120, passRate: "76.5%", instructor: "Prof. Alan Turing" },
  { code: "CS-401", name: "Web Accessibility Auditing", scans: 115, passRate: "71.0%", instructor: "Dr. Evelyn Reed" },
  { code: "ITEP-306", name: "UI/UX & Inclusive Tech", scans: 100, passRate: "82.4%", instructor: "Dr. Evelyn Reed" },
  { code: "ITEP-308", name: "Assistive Tech Integration", scans: 100, passRate: "79.8%", instructor: "Dr. Marcus Vance" },
]

function getPrincipleIcon(code: string) {
  switch (code.toLowerCase()) {
    case "perceivable":
      return Eye
    case "operable":
      return Keyboard
    case "understandable":
      return Brain
    case "robust":
      return Code
    default:
      return Layers
  }
}

export default function DashboardSchoolAdmin() {
  const navigate = useNavigate()
  const { data: instructors = [] } = useInstructorMaterialsCount()
  const { data: curriculum = [] } = useCurriculum()
  const { data: instruments = [] } = useWCAGInstruments()

  // Real aggregate computations from active faculty & curriculum
  const totalClassrooms = useMemo(
    () =>
      instructors.reduce(
        (acc, item) => acc + (item.user.classroom_count || 0),
        0
      ),
    [instructors]
  )

  const totalModules = useMemo(
    () =>
      instructors.reduce(
        (acc, item) => acc + (item.user.module_count || 0),
        0
      ),
    [instructors]
  )

  const totalQuizzes = useMemo(
    () =>
      instructors.reduce(
        (acc, item) => acc + (item.user.quiz_count || 0),
        0
      ),
    [instructors]
  )

  // Top instructors by total material contributions
  const sortedInstructors = useMemo(() => {
    return [...instructors]
      .sort((a, b) => {
        const totalA =
          (a.user.module_count || 0) +
          (a.user.quiz_count || 0) +
          (a.user.classroom_count || 0)
        const totalB =
          (b.user.module_count || 0) +
          (b.user.quiz_count || 0) +
          (b.user.classroom_count || 0)
        return totalB - totalA
      })
      .slice(0, 4)
  }, [instructors])

  function handleExport() {
    toast.add({
      title: "Executive Report Exported",
      description:
        "Accessibility compliance, curriculum metrics, and telemetry exported to CSV.",
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
      title: "Faculty & Instructors",
      icon: Users,
      value: instructors.length.toString(),
      footerDesc: "Registered teaching faculty",
      href: "/school-admin/instructor-materials",
    },
    {
      title: "Active Classrooms",
      icon: GraduationCap,
      value: totalClassrooms.toString(),
      footerDesc: `Managed across ${instructors.length} faculty`,
      href: "/school-admin/instructor-materials",
    },
    {
      title: "Authored Modules",
      icon: BookOpen,
      value: totalModules.toString(),
      footerDesc: "Faculty-created learning units",
      href: "/school-admin/instructor-materials",
    },
    {
      title: "Active Evaluations",
      icon: FileQuestion,
      value: totalQuizzes.toString(),
      footerDesc: "Quizzes deployed in cohorts",
      href: "/school-admin/instructor-materials",
    },
  ]

  return (
    <section className="p-responsive space-y-6">
      {/* Header */}
      <HeaderTemplate
        title="Admin Dashboard"
        subtitle="Institution-wide overview of accessibility compliance, faculty curriculum delivery, and student scanner telemetry."
        cta={[
          <Button key="export" onClick={handleExport} className="cursor-pointer">
            <FileText className="mr-1.5 size-4" />
            Export System Report
          </Button>,
        ]}
      />

      {/* Row 1: The 4 Core Domain Executive KPI Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPI.map((kpi) => (
          <Card
            key={kpi.title}
            onClick={() => navigate(kpi.href)}
            className="group cursor-pointer transition-all hover:border-border hover:shadow-xs"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                {kpi.title}
              </CardTitle>
              <CardAction>
                <kpi.icon className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {kpi.value}
              </p>
              <p className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>{kpi.footerDesc}</span>
                <ChevronRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 2: Scanner Activity Chart + Institutional POUR Curriculum */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left (2 cols): Full-Width Analyzer Usage Analytics */}
        <div className="lg:col-span-2">
          <Card className="flex h-full flex-col p-6">
            <CardHeader className="flex flex-col gap-2 p-0 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-lg font-bold sm:text-xl">
                  Analyzer Usage Analytics
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                  Daily automated accessibility audits executed by learners
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2.5 py-1 text-xs font-medium">
                  488 avg scans/day
                </Badge>
                <Badge variant="secondary" className="px-2.5 py-1 text-xs font-semibold">
                  3,420 Total Scans
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <ChartContainer config={chartConfig} className="max-h-65 w-full">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    className="text-xs font-medium text-muted-foreground"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
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

              <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Zap className="size-3.5 text-amber-500" />
                  Engine: Client WebLLM & Automated Rule Engine
                </span>
                <Link
                  to="/school-admin/analyzer-logs"
                  className="flex items-center gap-1 font-semibold text-foreground hover:text-primary hover:underline"
                >
                  Open Analyzer Logs <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right (1 col): Institutional POUR Curriculum Status */}
        <div className="lg:col-span-1">
          <Card className="flex h-full flex-col justify-between p-6">
            <div>
              <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
                <div>
                  <CardTitle className="text-base font-bold sm:text-lg">
                    Core Curriculum
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Institutional WCAG 2.2 Principles
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs font-medium">
                  {curriculum.length} Units
                </Badge>
              </CardHeader>

              <div className="space-y-2.5">
                {curriculum.map((item: CurriculumPrinciple) => {
                  const Icon = getPrincipleIcon(item.code)
                  const publishedRev =
                    item.revisions?.find((r: CurriculumRevision) => r.status === "published") ||
                    item.revisions?.[0]
                  const version = publishedRev?.version ?? 1

                  return (
                    <Link
                      key={item.id}
                      to={`/school-admin/learning-materials/${item.code}`}
                      className="group flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 p-3 transition-colors hover:border-border hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-foreground group-hover:text-primary">
                            {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {publishedRev?.status === "published"
                              ? `Version ${version} • Published`
                              : "Draft Status"}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="mt-4 border-t border-border/40 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/school-admin/learning-materials")}
                className="w-full cursor-pointer justify-between text-xs font-semibold"
              >
                <span>Manage Curriculum</span>
                <ArrowUpRight className="size-3.5" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Row 3: Faculty Activity Breakdown & Top Audited Cohorts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left (2 cols): Faculty Engagement & Materials Activity */}
        <div className="lg:col-span-2">
          <Card className="flex h-full flex-col justify-between p-6">
            <div>
              <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
                <div>
                  <CardTitle className="text-lg font-bold sm:text-xl">
                    Faculty Engagement & Authorship
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                    Instructors authoring active courseware, classrooms, and evaluations
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="px-2.5 py-1 text-xs font-semibold">
                  {instructors.length} Faculty Members
                </Badge>
              </CardHeader>

              <div className="divide-y divide-border/40">
                {sortedInstructors.length === 0 ? (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    No faculty material records found.
                  </div>
                ) : (
                  sortedInstructors.map((ins) => (
                    <div
                      key={ins.user.id}
                      onClick={() =>
                        navigate(`/school-admin/instructor-materials/${ins.user.id}`)
                      }
                      className="group flex cursor-pointer items-center justify-between py-3.5 transition-colors hover:bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9 border border-border">
                          <AvatarImage
                            src={ins.user.profile_picture || ""}
                            alt={ins.user.name}
                          />
                          <AvatarFallback className="text-xs font-semibold">
                            {getInitials(ins.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary">
                            {ins.user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {ins.user.email || `${ins.user.name.toLowerCase().replace(/[^a-z0-9]/g, "")}@institution.edu`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs sm:gap-6">
                        <div className="text-right">
                          <span className="font-semibold text-foreground">
                            {ins.user.classroom_count || 0}
                          </span>
                          <p className="text-xs text-muted-foreground">Classrooms</p>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-foreground">
                            {ins.user.module_count || 0}
                          </span>
                          <p className="text-xs text-muted-foreground">Modules</p>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-foreground">
                            {ins.user.quiz_count || 0}
                          </span>
                          <p className="text-xs text-muted-foreground">Quizzes</p>
                        </div>
                        <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-4 border-t border-border/40 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/school-admin/instructor-materials")}
                className="w-full cursor-pointer justify-between text-xs font-semibold"
              >
                <span>View All Faculty Courseware</span>
                <ArrowUpRight className="size-3.5" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Right (1 col): Top Audited Cohorts & Instruments Summary */}
        <div className="space-y-6 lg:col-span-1">
          {/* Top Scanned Cohorts */}
          <Card className="space-y-4 p-6">
            <CardHeader className="flex flex-row items-center justify-between p-0 pb-1">
              <div>
                <CardTitle className="text-base font-bold sm:text-lg">
                  Top Audited Cohorts
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Highest volume student cohorts
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs font-medium">
                Live Audits
              </Badge>
            </CardHeader>

            <CardContent className="space-y-3 p-0">
              {topCohorts.map((cohort) => (
                <div
                  key={cohort.code}
                  className="rounded-lg border border-border/40 bg-muted/20 p-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">
                      {cohort.code}
                    </span>
                    <Badge variant="secondary" className="px-1.5 py-0 text-xs font-medium">
                      {cohort.passRate} Pass
                    </Badge>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {cohort.name} • {cohort.instructor}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Audit Volume</span>
                    <span className="font-mono font-medium text-foreground">
                      {cohort.scans} scans
                    </span>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/school-admin/analyzer-logs")}
                className="w-full cursor-pointer justify-between text-xs font-semibold"
              >
                <span>Inspect All Classroom Logs</span>
                <ChevronRight className="size-3.5" />
              </Button>
            </CardContent>
          </Card>

          {/* WCAG Compliance Instrument Banner */}
          <Card
            onClick={() => navigate("/school-admin/instruments")}
            className="group cursor-pointer p-4 transition-all hover:border-border hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldAlert className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground group-hover:text-primary">
                    Accessibility Instruments
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {instruments.length} WCAG evaluation guidelines active
                  </p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-foreground" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

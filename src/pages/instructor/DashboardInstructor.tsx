import { useNavigate, Link } from "react-router-dom"
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
import { Button, buttonVariants } from "@/components/ui/button"
import NewClassroomDialog from "@/features/instructor/NewClassroomDialog"
import { classrooms, modules, quizzes } from "@/const/data"
import {
  GraduationCap,
  Users,
  BookOpen,
  FileQuestion,
  ChevronRight,
  Calendar,
  Book,
} from "lucide-react"

export default function DashboardInstructor() {
  const navigate = useNavigate()

  // Key pillar metrics
  const totalClassroomsCount = classrooms.length
  const totalEnrolledLearners = 59
  const totalModulesCount = modules.length
  const activeQuizzes = quizzes.filter((q) => q.status === "Open" || !q.status)
  const recentModules = modules.slice(0, 4)

  const KPI = [
    {
      title: "Active Classrooms",
      icon: GraduationCap,
      value: totalClassroomsCount,
      footerDesc: "Managed active classes",
    },
    {
      title: "Enrolled Learners",
      icon: Users,
      value: totalEnrolledLearners,
      footerDesc: "Students across all sections",
    },
    {
      title: "Published Modules",
      icon: BookOpen,
      value: totalModulesCount,
      footerDesc: "Published learning units",
    },
    {
      title: "Active Assessments",
      icon: FileQuestion,
      value: activeQuizzes.length,
      footerDesc: "Open student evaluations",
    },
  ]

  return (
    <section className="p-responsive space-y-6">
      {/* Header with Creator Actions */}
      <HeaderTemplate
        title="Instructor Dashboard"
        subtitle="Overview of your managed classrooms, curriculum modules, assessments, and student accessibility telemetry."
        cta={[
          <NewClassroomDialog key="new-classroom" />,
          <Link
            to="/instructor/modules/new"
            key="new-module"
            className={buttonVariants({ variant: "default" })}
          >
            <Book className="mr-1.5 size-4" />
            New Module
          </Link>,
          <Link
            to="/instructor/quizzes/new"
            key="new-quiz"
            className={buttonVariants({ variant: "default" })}
          >
            <FileQuestion className="mr-1.5 size-4" />
            New Assessment
          </Link>,
        ]}
      />

      {/* Row 1: The 4 Core Domain Pillar Metrics */}
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

      {/* Active Quizzes Card */}
      <Card className="p-6">
        <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
          <div>
            <CardTitle className="text-lg font-bold sm:text-xl">
              Active Assessments & Quizzes ({activeQuizzes.length})
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              Ongoing student accessibility evaluations and due dates
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/instructor/quizzes")}
            className="shrink-0 cursor-pointer p-4 text-xs font-medium text-foreground hover:text-primary"
          >
            All Quizzes <ChevronRight className="ml-1 size-3.5" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-3 p-0">
          {activeQuizzes.slice(0, 3).map((quiz) => (
            <div
              key={quiz.id}
              onClick={() => navigate(`/instructor/quizzes/${quiz.id}`)}
              className="flex cursor-pointer flex-col gap-3 rounded-xl bg-muted/40 p-3.5 transition-colors hover:bg-muted/60 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                  <FileQuestion className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-foreground">
                    {quiz.name}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      Due: {quiz.dueDate || "No due date"}
                    </span>
                    <span>•</span>
                    <span>{quiz.questionsCount || 4} questions</span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 self-start sm:self-auto">
                <Badge variant="secondary" className="text-xs font-semibold">
                  {quiz.principle || "General"}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                >
                  Open
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Row 3: Two-Column Split (Curriculum & Assessments vs Telemetry & Shortcuts) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
              <div>
                <CardTitle className="text-lg font-bold sm:text-xl">
                  Published Learning Modules
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                  Structured WCAG & POUR modules assigned to active classrooms
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/instructor/modules")}
                className="shrink-0 cursor-pointer text-xs font-medium text-foreground hover:text-primary"
              >
                All Modules <ChevronRight className="ml-1 size-3.5" />
              </Button>
            </CardHeader>

            <CardContent className="space-y-3 p-0">
              {recentModules.map((module) => (
                <div
                  key={module.id}
                  onClick={() => navigate(`/instructor/modules/${module.id}`)}
                  className="flex cursor-pointer flex-col gap-3 rounded-xl bg-muted/40 p-3.5 transition-colors hover:bg-muted/60 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                      <BookOpen className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-foreground">
                        {module.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Principle:{" "}
                        <span className="font-semibold">
                          {module.principle}
                        </span>{" "}
                        • Assigned to {module.classrooms?.length || 1}{" "}
                        classrooms
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 self-start sm:self-auto">
                    <Badge variant="outline" className="text-xs font-semibold">
                      Published
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

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
                onClick={() => navigate("/instructor/logs")}
              >
                View Full Analyzer Logs
                <ChevronRight className="ml-1 size-3.5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

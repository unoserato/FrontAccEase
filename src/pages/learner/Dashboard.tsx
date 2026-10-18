import { useMemo } from "react"
import { useNavigate, Link } from "react-router-dom"
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
import LearnerQuizCardTemplate from "@/components/common/LearnerQuizCardTemplate"
import { ContinueLearningCard } from "./Modules"
import {
  ArrowUpRight,
  ChevronRight,
  FileQuestion,
  Globe,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Award,
  CheckCircle2,
  GraduationCap,
} from "lucide-react"
import { SiGoogleclassroom } from "react-icons/si"
import {
  useAnalyzerLogsByLearner,
  useClassroomContentView,
  useClassrooms,
  useCoreModuleProgress,
} from "@/services/tanstack/materials"
import { useMe } from "@/services/tanstack/auth"
import { getDateString } from "@/hooks/date-to-string"
import HeaderTemplate from "@/components/common/PageTemplate"

function getSummaryCount(
  summaryList: unknown,
  name: "critical" | "serious" | "moderate" | "minor" | "total_passed"
): number {
  if (Array.isArray(summaryList)) {
    const item = summaryList.find(
      (s: { name?: string; count?: number }) =>
        s.name?.toLowerCase() === name.toLowerCase()
    )
    return item?.count ?? 0
  }
  if (summaryList && typeof summaryList === "object") {
    const obj = summaryList as Record<string, number>
    return obj[`${name}_count`] ?? 0
  }
  return 0
}

interface MilestoneProps {
  analyzerLogsCount: number
  submissionsCount: number
  hasEnrolledClassroom: boolean
  classroomName?: string
  highestScore: number
}

function LearnerMilestonesCard({
  analyzerLogsCount,
  submissionsCount,
  hasEnrolledClassroom,
  classroomName,
  highestScore,
}: MilestoneProps) {
  const milestones = [
    {
      id: "classroom-scholar",
      title: "Classroom Scholar",
      subtitle: hasEnrolledClassroom
        ? `Joined ${classroomName || "Class"}`
        : "Join a classroom with code",
      icon: GraduationCap,
      earned: hasEnrolledClassroom,
    },
    {
      id: "accessibility-auditor",
      title: "Accessibility Auditor",
      subtitle:
        analyzerLogsCount > 0
          ? `${analyzerLogsCount} site${analyzerLogsCount === 1 ? "" : "s"} audited`
          : "Audit your first website",
      icon: Globe,
      earned: analyzerLogsCount > 0,
    },
    {
      id: "quiz-ace",
      title: "Assessment Novice",
      subtitle:
        submissionsCount > 0
          ? `${submissionsCount} quiz${submissionsCount === 1 ? "" : "zes"} completed`
          : "Complete an assigned quiz",
      icon: Award,
      earned: submissionsCount > 0,
    },
    {
      id: "wcag-champion",
      title: "High Scorer",
      subtitle:
        highestScore >= 80
          ? `Top score: ${highestScore}%`
          : "Score 80%+ on an audit or quiz",
      icon: Sparkles,
      earned: highestScore >= 80,
    },
  ]

  const earnedCount = milestones.filter((m) => m.earned).length

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-foreground">
            <Award className="size-5 text-primary" />
            <CardTitle className="text-base font-bold sm:text-lg">
              Earned Badges
            </CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs font-semibold">
            {earnedCount} / {milestones.length}
          </Badge>
        </div>
        <CardDescription className="text-xs text-muted-foreground">
          Milestones unlocked based on real platform activity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-4 pt-0 sm:p-5 sm:pt-0">
        {milestones.map((badge) => {
          const IconComponent = badge.icon
          return (
            <div
              key={badge.id}
              className={`flex items-center gap-3.5 rounded-xl border p-3 shadow-2xs transition-colors ${
                badge.earned
                  ? "border-border/70 bg-card text-foreground"
                  : "border-dashed border-border/50 bg-muted/20 text-muted-foreground opacity-60"
              }`}
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                  badge.earned
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground/60"
                }`}
              >
                <IconComponent className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-xs font-bold sm:text-sm">
                    {badge.title}
                  </p>
                  {badge.earned && (
                    <CheckCircle2 className="size-3.5 shrink-0 text-emerald-500" />
                  )}
                </div>
                <p className="truncate text-xs font-medium text-muted-foreground">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { data: userProfile } = useMe()
  const { data: classrooms } = useClassrooms()
  const myClassroom = classrooms?.[0]
  const { data: contents } = useClassroomContentView(myClassroom?.id)
  const { data: analyzerLogs } = useAnalyzerLogsByLearner()
  const { data: coreModuleProgress } = useCoreModuleProgress()

  const allQuizzes = useMemo(() => contents?.quizzes || [], [contents?.quizzes])
  const submissions = useMemo(
    () => contents?.submissions || [],
    [contents?.submissions]
  )

  const submittedQuizIds = useMemo(
    () => new Set(submissions.map((s) => String(s.quiz_id))),
    [submissions]
  )

  const dueQuizzes = useMemo(
    () => allQuizzes.filter((q) => !submittedQuizIds.has(String(q.id))),
    [allQuizzes, submittedQuizIds]
  )

  const latestAudit =
    analyzerLogs && analyzerLogs.length > 0 ? analyzerLogs[0] : null

  const highestScore = useMemo(() => {
    const auditScores = analyzerLogs.map((l) => l.content?.overall_score ?? 0)
    const quizScores = submissions.map((s) => s.score ?? 0)
    const allScores = [...auditScores, ...quizScores]
    return allScores.length > 0 ? Math.max(...allScores) : 0
  }, [analyzerLogs, submissions])

  const userName = userProfile?.user?.name

  const overallProgress = Math.round(coreModuleProgress?.percentage ?? 0)

  const KPI = [
    {
      title: "Core Progress",
      icon: Sparkles,
      value: `${overallProgress}%`,
      footerDesc:
        (coreModuleProgress?.completed_activities ?? 0) > 0
          ? `${coreModuleProgress.completed_activities} of ${coreModuleProgress.total_activities} activities done`
          : "Start your first module activity",
    },
    {
      title: "Enrolled Class",
      icon: SiGoogleclassroom,
      value: myClassroom ? (
        <span className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {myClassroom.classroom_code}
        </span>
      ) : (
        <Link className="hover:underline" to="/learner/classroom">
          Join class
        </Link>
      ),
      footerDesc: myClassroom ? myClassroom.name : "Join a classroom with code",
    },
    {
      title: "Due Assessments",
      icon: FileQuestion,
      value: myClassroom ? dueQuizzes.length : "None",
      footerDesc: !myClassroom
        ? "Join class to view quizzes"
        : dueQuizzes.length === 0
          ? "All assigned quizzes completed"
          : `${dueQuizzes.length} pending assessment${dueQuizzes.length === 1 ? "" : "s"}`,
    },
    {
      title: "Audited Pages",
      icon: Globe,
      value: analyzerLogs.length,
      footerDesc:
        analyzerLogs.length > 0
          ? `${analyzerLogs.length} audit scan${analyzerLogs.length === 1 ? "" : "s"} completed`
          : "No accessibility scans yet",
    },
  ]

  // Recent URL Audit parsing
  const auditTargetUrl = latestAudit?.content?.url || ""
  const auditCleanUrl = auditTargetUrl.replace(/^https?:\/\//, "")
  const auditScore = latestAudit?.content?.overall_score ?? 0
  const isAuditHigh = auditScore >= 90
  const isAuditMedium = auditScore >= 70 && auditScore < 90

  const criticalIssues = getSummaryCount(
    latestAudit?.content?.summary,
    "critical"
  )
  const seriousIssues = getSummaryCount(
    latestAudit?.content?.summary,
    "serious"
  )
  const moderateIssues = getSummaryCount(
    latestAudit?.content?.summary,
    "moderate"
  )
  const minorIssues = getSummaryCount(latestAudit?.content?.summary, "minor")
  const totalAuditIssues =
    criticalIssues + seriousIssues + moderateIssues + minorIssues

  return (
    <section className="p-responsive space-y-6">
      <HeaderTemplate
        title={`Welcome back, ${userName}`}
        subtitle={` Track your accessibility learning journey, complete assigned
            assessments, and audit live websites.`}
      />
      {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {userName ? `Welcome back, ${userName}` : "Learner Dashboard"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your accessibility learning journey, complete assigned
            assessments, and audit live websites.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/learner/analyzer")}
            className="cursor-pointer gap-1.5 text-xs font-semibold"
          >
            <Globe className="size-3.5" />
            New Audit
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/learner/modules")}
            className="cursor-pointer gap-1.5 text-xs font-semibold"
          >
            <BookOpen className="size-3.5" />
            All Modules
          </Button>
        </div>
      </div> */}

      {/* Row 1: The 4 Core KPI Metric Cards */}
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
              <div className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {kpi.value}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {kpi.footerDesc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Workspace (Unified 2-Column Responsive Layout) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (2 spans): Continue Learning & Due Assessments */}
        <div className="space-y-6 lg:col-span-2">
          <ContinueLearningCard />

          {/* Due Quizzes Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground sm:text-lg">
                  Due Assessments & Quizzes
                </h3>
                <p className="text-xs text-muted-foreground">
                  Active evaluations assigned by your instructor
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/learner/quizzes")}
                className="cursor-pointer text-xs font-medium text-foreground hover:text-primary"
              >
                View All <ChevronRight className="ml-1 size-3.5" />
              </Button>
            </div>

            {myClassroom ? (
              dueQuizzes.length > 0 ? (
                <LearnerQuizCardTemplate
                  quizzes={dueQuizzes}
                  title="Due Quizzes"
                />
              ) : (
                <Card className="flex flex-col items-center justify-center border-dashed p-8 text-center">
                  <FileQuestion className="mb-2 size-8 text-muted-foreground/50" />
                  <p className="text-sm font-medium text-foreground">
                    {allQuizzes.length > 0
                      ? "You're all caught up! All assigned quizzes have been completed."
                      : "No quizzes currently assigned in your classroom."}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Check back later for new evaluations from your instructor.
                  </p>
                  {submissions.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/learner/classroom")}
                      className="mt-3 cursor-pointer text-xs"
                    >
                      View Quiz History in Classroom
                      <ChevronRight className="ml-1 size-3.5" />
                    </Button>
                  )}
                </Card>
              )
            ) : (
              <Card className="flex flex-col items-center justify-center border-dashed p-8 text-center">
                <SiGoogleclassroom className="mb-2 size-8 text-muted-foreground/50" />
                <p className="text-sm font-medium text-foreground">
                  You are not enrolled in any classroom.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Join a classroom with a class code to access your instructor's
                  quizzes.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/learner/classroom")}
                  className="mt-3 cursor-pointer text-xs"
                >
                  Join a Classroom
                  <ArrowUpRight className="ml-1 size-3.5" />
                </Button>
              </Card>
            )}
          </div>

          {/* Aria AI Assistant Quick Query (Horizontal Row Layout) */}
          <Card className="border-border/80 bg-linear-to-r from-primary/5 via-card to-card p-5 shadow-2xs">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5 text-foreground">
                <div className="rounded-lg bg-foreground p-2 text-background">
                  <MessageSquare className="size-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground sm:text-base">
                    Aria AI Assistant
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Instant guidance on WCAG remediation & code
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 cursor-pointer gap-1.5 self-start text-xs font-semibold sm:self-auto"
                onClick={() => navigate("/learner/chat")}
              >
                Open Full Chat
                <ChevronRight className="size-3.5" />
              </Button>
            </div>

            <div className="mt-3.5 flex flex-col gap-2.5 sm:flex-row">
              {[
                "How do I fix WCAG 1.4.3 color contrast?",
                "What is the difference between aria-label and aria-labelledby?",
              ].map((sampleQuery, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    navigate("/learner/chat", {
                      state: { prompt: sampleQuery },
                    })
                  }
                  className="group flex flex-1 cursor-pointer items-center justify-between gap-2.5 rounded-xl border border-border/70 bg-card p-3 text-left transition-all duration-150 hover:border-primary/50 hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <span className="line-clamp-2 text-xs leading-snug font-medium text-foreground sm:text-sm">
                    &ldquo;{sampleQuery}&rdquo;
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column (1 span): Milestones, Recent Audit & Assistant */}
        <div className="space-y-6 lg:col-span-1">
          <LearnerMilestonesCard
            analyzerLogsCount={analyzerLogs.length}
            submissionsCount={submissions.length}
            hasEnrolledClassroom={!!myClassroom}
            classroomName={myClassroom?.name || myClassroom?.classroom_code}
            highestScore={highestScore}
          />
          {/* Recent Analyzer Audit History */}
          <Card className="space-y-4 p-5">
            <CardHeader className="p-0 pb-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-foreground">
                  <Globe className="size-4 text-primary" />
                  <CardTitle className="text-base font-bold">
                    Recent URL Audit
                  </CardTitle>
                </div>
                {latestAudit && (
                  <Badge
                    variant="secondary"
                    className={`text-xs font-semibold ${
                      isAuditHigh
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : isAuditMedium
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    Score: {auditScore}%
                  </Badge>
                )}
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                {latestAudit
                  ? `Last inspected on ${getDateString(latestAudit.created_at)}`
                  : "Last inspected web page with Aria Analyzer"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 p-0">
              {latestAudit ? (
                <>
                  <div className="space-y-2 rounded-xl border border-border/60 bg-muted/30 p-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                      <span className="truncate font-mono text-xs font-semibold text-foreground">
                        {auditCleanUrl}
                      </span>
                    </div>
                    {totalAuditIssues > 0 ? (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {criticalIssues > 0 && (
                          <span className="rounded bg-rose-500/10 px-1.5 py-0.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                            {criticalIssues} Critical
                          </span>
                        )}
                        {seriousIssues > 0 && (
                          <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                            {seriousIssues} Serious
                          </span>
                        )}
                        {moderateIssues > 0 && (
                          <span className="rounded bg-slate-500/10 px-1.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                            {moderateIssues} Moderate
                          </span>
                        )}
                        {minorIssues > 0 && (
                          <span className="rounded bg-slate-500/10 px-1.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                            {minorIssues} Minor
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        No major accessibility issues detected! Excellent
                        compliance.
                      </p>
                    )}
                  </div>

                  <Link
                    className={`w-full ${buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })}`}
                    to={`/learner/analyzer/${latestAudit.id}`}
                    state={{
                      result: latestAudit.content,
                      scanId: latestAudit.id,
                    }}
                  >
                    View Audit Findings
                    <ChevronRight className="ml-1 size-3.5" />
                  </Link>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/20 p-5 text-center">
                  <Globe className="mb-2 size-6 text-muted-foreground/60" />
                  <p className="text-xs font-medium text-muted-foreground">
                    No accessibility audits run yet.
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground/80">
                    Audit live websites with Aria Analyzer to evaluate WCAG
                    compliance.
                  </p>
                  <Link
                    to="/learner/analyzer"
                    className={`mt-3 w-full ${buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })}`}
                  >
                    Run First Audit
                    <ArrowUpRight className="ml-1 size-3.5" />
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

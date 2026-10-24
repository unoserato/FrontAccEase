import { useState } from "react"
import { useParams, Link, useSearchParams } from "react-router-dom"
import NotFound from "../errors/NotFound"
import HeaderTemplate from "@/components/common/PageTemplate"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Icons
import {
  RotateCcw,
  Eye,
  Pencil,
  FileText,
  Clock,
  Award,
  Calendar,
  Users,
  HelpCircle,
  Tag,
  Layers,
  GraduationCap,
  ChevronRight,
} from "lucide-react"

import QuizForm from "@/features/instructor/QuizForm"
import { useMe } from "@/services/tanstack/auth"
import {
  useInstructorQuizzes,
  useQuizSubmissionsById,
} from "@/services/tanstack/materials"
import type {
  InstructorQuizProps,
  QuizProps,
  QuizSubmissionProps,
} from "@/const/props/quizProps"
import { getDateString } from "@/hooks/date-to-string"
import QuizSubmissionsCardTemplate from "@/components/instructor/QuizSubmissionsCardTemplate"

export default function QuizzesInstructorView() {
  const { id, quizId } = useParams()
  const targetQuizId = quizId || id
  const { data: user } = useMe()
  const { data: quizzes = [] } = useInstructorQuizzes()
  const { data: submissions = [] } = useQuizSubmissionsById(targetQuizId)

  const [searchParams, setSearchParams] = useSearchParams()

  const quiz = quizzes.find((q) => q.id === targetQuizId)

  if (!quiz) {
    return <NotFound />
  }

  const tabParam = searchParams.get("tab")
  const activeTabValue =
    tabParam === "p"
      ? "preview"
      : tabParam === "s"
        ? "submissions"
        : "dashboard"

  const handleTabChange = (value: string) => {
    const code = value === "preview" ? "p" : value === "submissions" ? "s" : "d"
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set("tab", code)
        return next
      },
      { replace: true }
    )
  }

  const isEditor = user && user.role === "instructor"
  const cta = [
    isEditor && (
      <Link
        key="edit-quiz"
        to={`/instructor/quizzes/edit/${quiz.id}`}
        className={buttonVariants({ variant: "outline" })}
      >
        <Pencil className="size-4" />
        Edit Quiz
      </Link>
    ),
    <Button key="export" onClick={() => alert("Export quiz results")}>
      <FileText className="size-4" />
      Export Data
    </Button>,
  ]

  return (
    <section className="p-responsive w-full space-y-4 bg-background sm:space-y-6">
      <HeaderTemplate
        backTo="-1"
        title={quiz.name}
        subtitle={quiz.created_by}
        cta={cta}
      />

      <Tabs
        value={activeTabValue}
        onValueChange={(val) => handleTabChange(String(val))}
        className="w-full"
      >
        <div className="w-fit border-b border-border/80 bg-background/95 py-1 backdrop-blur-md">
          <TabsList variant="line" className="w-full justify-start gap-4">
            <TabsTrigger value="dashboard" className="text-xs sm:text-sm">
              Dashboard & Details
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="flex items-center gap-1.5 text-xs sm:text-sm"
            >
              <span>Submissions</span>
              {submissions.length > 0 && (
                <Badge
                  variant="secondary"
                  className="rounded-full px-1.5 py-0 text-xs font-semibold"
                >
                  {submissions.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-xs sm:text-sm">
              Quiz Preview
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="mt-4 sm:mt-6">
          <DashboardTab
            quiz={quiz}
            submissions={submissions}
          />
        </TabsContent>

        <TabsContent value="submissions" className="mt-4 sm:mt-6">
          <SubmissionsTab
            quiz={quiz}
            submissions={submissions}
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-4 sm:mt-6">
          <PreviewTab quiz={quiz} />
        </TabsContent>
      </Tabs>
      <div className="h-20" aria-label="spacer" />
    </section>
  )
}

function DashboardTab({
  quiz,
  submissions = [],
}: {
  quiz: InstructorQuizProps
  submissions?: QuizSubmissionProps[]
}) {
  const classrooms = quiz.classrooms ?? []
  const maxAttempts = quiz.max_attempts ?? quiz.attempt_count ?? 1
  const passingRate = quiz.passing_rate ?? 0
  const submissionsCount = quiz.no_submission ?? submissions.length
  const totalSubmissions =
    quiz.expected_no_submission ??
    (classrooms.reduce((sum, c) => sum + (c.learners?.length || 0), 0) ||
      submissions.length)

  const dueDate = quiz.due_date || ""
  const quizStatus = new Date(dueDate) > new Date() ? "Open" : "Closed"
  const timeLimit = quiz.time_limit || 0
  const tags = quiz.tags ?? ["1.1.1 Non-Text Content"]

  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((submissionsCount / (totalSubmissions || 1)) * 100))
  )

  const KPI = [
    {
      title: "Passing Rate",
      icon: Award,
      value: `${passingRate}%`,
      footerDesc: "75% passing threshold",
    },
    {
      title: "Max Attempts",
      icon: RotateCcw,
      value: `${maxAttempts}`,
      footerDesc: "Allowed attempts per learner",
    },
    {
      title: "Submissions",
      icon: Users,
      value: `${submissionsCount}/${totalSubmissions}`,
      footerDesc: `${progressPercent}% completion rate`,
    },
    {
      title: "Questions",
      icon: HelpCircle,
      value: `${quiz.question_count}`,
      footerDesc: "Number of questions",
    },
  ]

  return (
    <div className="w-full space-y-6">
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

      {/* Detailed Quiz Card Information */}
      <Card className="p-6">
        <CardHeader className="flex flex-col gap-2 p-0 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Badge
              variant="secondary"
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                quizStatus === "Open"
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                  : quizStatus === "Closed"
                    ? "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {quizStatus}
            </Badge>
            <div>
              <CardTitle className="text-lg font-bold text-foreground sm:text-xl">
                {quiz.name}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Created on {getDateString(quiz.created_at || "")}
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="w-fit text-xs font-medium">
            {quiz.principle || "General Principle"}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6 p-0">
          {/* Submissions Progress Bar */}
          <div className="space-y-2 rounded-xl border border-border/80 bg-muted/20 p-4">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-muted-foreground">Submission Progress</span>
              <span className="font-bold text-foreground">
                {submissionsCount} of {totalSubmissions} completed (
                {progressPercent}%)
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Details Specifications Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Layers className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">
                  WCAG Principle
                </p>
                <p className="truncate text-sm font-semibold text-foreground">
                  {quiz.principle || "Perceivable"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Calendar className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">
                  Due Date
                </p>
                <p className="truncate text-sm font-semibold text-foreground">
                  {getDateString(quiz.due_date || "")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">
                  Time Limit
                </p>
                <p className="truncate text-sm font-semibold text-foreground">
                  {timeLimit} Minutes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Award className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">
                  Total Points
                </p>
                <p className="truncate text-sm font-semibold text-foreground">
                  {quiz.total_points} Points ({quiz.question_count} Qs)
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Assigned Classrooms List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Assigned Classrooms
                </h3>
                <p className="text-xs text-muted-foreground">
                  Student cohorts currently assigned this assessment
                </p>
              </div>
              <Badge variant="secondary" className="text-xs font-medium">
                {classrooms.length}{" "}
                {classrooms.length === 1 ? "Classroom" : "Classrooms"}
              </Badge>
            </div>

            {classrooms.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border/80 p-6 text-center text-xs text-muted-foreground">
                No classrooms are assigned to this quiz yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {classrooms.map((classroom) => {
                  const learnerCount = classroom.learners?.length ?? 0
                  return (
                    <div
                      key={classroom.id}
                      className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 p-3.5 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <GraduationCap className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="truncate text-sm font-semibold text-foreground">
                              {classroom.name}
                            </span>
                            {classroom.code && (
                              <Badge variant="outline" className="text-xs">
                                {classroom.code}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {learnerCount}{" "}
                            {learnerCount === 1
                              ? "enrolled student"
                              : "enrolled students"}
                          </p>
                        </div>
                      </div>

                      <Link
                        to={`/instructor/classroom/${classroom.id}`}
                        className="shrink-0 pl-2 text-muted-foreground hover:text-foreground"
                        title="View classroom"
                      >
                        <ChevronRight className="size-4" />
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <Separator />

          {/* Tags section */}
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Target Success Criteria / Tags
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge>
                <Tag className="mr-1 size-3" />
                {quiz.principle}
              </Badge>
              {tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="gap-1.5 px-3 py-1 text-xs"
                >
                  <Tag className="size-3" />
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SubmissionsTab({
  quiz,
  submissions = [],
}: {
  quiz: InstructorQuizProps
  submissions?: QuizSubmissionProps[]
}) {
  const classroomsCount = quiz.classrooms?.length ?? 0

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4 py-4 sm:space-y-6 sm:py-6">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
          Assigned Classrooms
        </h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {submissions.length}{" "}
            {submissions.length === 1 ? "Submission" : "Submissions"}
          </Badge>
          <span className="text-xs font-medium text-muted-foreground">
            {classroomsCount}{" "}
            {classroomsCount === 1 ? "Classroom" : "Classrooms"}
          </span>
        </div>
      </div>

      <QuizSubmissionsCardTemplate
        quiz={quiz}
        submissions={submissions}
        viewMode="by-classroom"
      />
    </div>
  )
}

function PreviewTab({ quiz }: { quiz: QuizProps | InstructorQuizProps }) {
  const [previewKey, setPreviewKey] = useState(0)

  const handleResetPreview = () => {
    setPreviewKey((k) => k + 1)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 py-4">
      <Card className="p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b pb-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              SurveyJS Live Quiz Preview
            </h2>
            <p className="text-xs text-muted-foreground">
              Interactive quiz preview for{" "}
              <span className="font-semibold">{quiz.name}</span>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetPreview}
              className="cursor-pointer gap-1.5 text-xs shadow-xs"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset Quiz Preview</span>
            </Button>
            <Badge variant="outline" className="gap-1.5 py-1">
              <Eye className="size-3.5" />
              Live Preview Mode
            </Badge>
          </div>
        </div>

        {/* Render QuizForm component */}
        <div className="survey-preview-wrapper min-h-100 rounded-lg border bg-card p-2 sm:p-4">
          <QuizForm key={previewKey} quiz={quiz} />
        </div>
      </Card>
    </div>
  )
}

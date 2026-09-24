import { useMemo, useState } from "react"
import { useParams, Link, useSearchParams } from "react-router-dom"
import { quizzes, quizSubmissions, classrooms } from "@/const/data"
import NotFound from "../errors/NotFound"
import HeaderTemplate from "@/components/common/PageTemplate"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import QuizSubmissionsCardTemplate from "@/components/instructor/QuizSubmissionsCardTemplate"
import {
  getQuizJson,
  getQuizTotalQuestions,
  getQuizTotalPoints,
} from "@/features/instructor/quizHelper"

// Icons
import {
  RotateCcw,
  Eye,
  Pencil,
  FileText,
  Clock,
  Award,
  BarChart3,
  Calendar,
  Users,
  HelpCircle,
  Tag,
  Layers,
} from "lucide-react"

import QuizForm from "@/features/QuizForm"
import { useUser } from "@/services/tanstack/auth"

export default function QuizzesInstructorView() {
  const { data: user } = useUser()
  const { id } = useParams<{ id: string }>()
  const [searchParams, setSearchParams] = useSearchParams()

  const quiz = quizzes.find((q) => String(q.id) === String(id))

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

  const isEditor = user && user.role == "instructor" ? true : false
  const cta = [
    isEditor && (
      <Link
        key="edit-quiz"
        to={`/instructor/quizzes/edit/${quiz.id}`}
        className={buttonVariants({ variant: "outline" })}
      >
        <Pencil className="h-4 w-4" />
        Edit Quiz
      </Link>
    ),
    <Button key="export" onClick={() => alert("Export quiz results")}>
      <FileText className="h-4 w-4" />
      Export Data
    </Button>,
  ]

  return (
    <section className="p-responsive w-full space-y-4 bg-background sm:space-y-6">
      <HeaderTemplate
        backTo="-1"
        title={quiz.name}
        subtitle={`Author: ${quiz.author || "You"} • Principle: ${quiz.principle || "General"}`}
        cta={cta}
      />

      <Tabs
        value={activeTabValue}
        onValueChange={(val) => handleTabChange(String(val))}
        className="w-full"
      >
        <div className="sticky top-0 z-40 w-fit border-b border-border/80 bg-background/95 py-1 backdrop-blur-md">
          <TabsList variant="line" className="w-full justify-start gap-4">
            <TabsTrigger value="dashboard" className="text-xs sm:text-sm">
              Dashboard & Details
            </TabsTrigger>
            <TabsTrigger value="submissions" className="text-xs sm:text-sm">
              Submissions
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-xs sm:text-sm">
              Quiz Preview
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="mt-4 sm:mt-6">
          <DashboardTab quiz={quiz} />
        </TabsContent>

        <TabsContent value="submissions" className="mt-4 sm:mt-6">
          <SubmissionsTab quiz={quiz} />
        </TabsContent>

        <TabsContent value="preview" className="mt-4 sm:mt-6">
          <PreviewTab quiz={quiz} />
        </TabsContent>
      </Tabs>
      <div className="h-20" aria-label="spacer" />
    </section>
  )
}

function DashboardTab({ quiz }: { quiz: (typeof quizzes)[0] }) {
  const matchingSubmissions = useMemo(
    () => quizSubmissions.filter((s) => String(s.quizId) === String(quiz.id)),
    [quiz.id]
  )

  const assignedClassrooms = useMemo(
    () =>
      (quiz.classrooms ?? [])
        .map((cId) => classrooms.find((c) => String(c.id) === String(cId)))
        .filter(Boolean),
    [quiz.classrooms]
  )

  const assignedLearnerIds = useMemo(
    () =>
      Array.from(new Set(assignedClassrooms.flatMap((c) => c?.learners ?? []))),
    [assignedClassrooms]
  )

  // Dynamic KPI Computations
  const totalSubmissions =
    assignedLearnerIds.length > 0
      ? assignedLearnerIds.length
      : (quiz.totalSubmissions ?? 59)

  const submissionsCount =
    matchingSubmissions.length > 0
      ? matchingSubmissions.length
      : (quiz.submissionsCount ?? 35)

  const avgScore =
    matchingSubmissions.length > 0
      ? Math.round(
          matchingSubmissions.reduce((acc, s) => acc + (s.score ?? 0), 0) /
            matchingSubmissions.length
        )
      : (quiz.avgScore ?? 84)

  const computedPoints = getQuizTotalPoints(quiz)
  const totalPoints = computedPoints > 0 ? computedPoints : 50

  const passingCount = matchingSubmissions.filter(
    (s) => (s.score ?? 0) >= Math.round(totalPoints * 0.75)
  ).length

  const passingRate =
    matchingSubmissions.length > 0
      ? Math.round((passingCount / matchingSubmissions.length) * 100)
      : (quiz.passingRate ?? 92)

  const quizStatus = quiz.status || "Open"
  const quizAuthor = quiz.author || "You"
  const dueDate = quiz.dueDate || "Aug 27, 2026"
  const quizJson = getQuizJson(quiz)
  const computedQuestions = getQuizTotalQuestions(quiz)
  const questionsCount = computedQuestions > 0 ? computedQuestions : 10
  const timeLimit = quizJson.timeLimit ?? quiz.timeLimit ?? 20
  const tags = quiz.tags ?? ["1.1.1 Non-Text Content"]

  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((submissionsCount / (totalSubmissions || 1)) * 100))
  )

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        <Card>
          <CardHeader className="p-3.5 pb-1 sm:p-5 sm:pb-2">
            <CardDescription className="text-xs font-medium">
              Passing Rate
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0 sm:p-5 sm:pt-0">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-muted-foreground" />
              <p className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {passingRate}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3.5 pb-1 sm:p-5 sm:pb-2">
            <CardDescription className="text-xs font-medium">
              Avg. Score
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0 sm:p-5 sm:pt-0">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              <p className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {avgScore}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3.5 pb-1 sm:p-5 sm:pb-2">
            <CardDescription className="text-xs font-medium">
              Submissions Rate
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0 sm:p-5 sm:pt-0">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <p className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {submissionsCount}/{totalSubmissions}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3.5 pb-1 sm:p-5 sm:pb-2">
            <CardDescription className="text-xs font-medium">
              Questions & Time
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0 sm:p-5 sm:pt-0">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
              <p className="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
                {questionsCount} Qs ({timeLimit}m)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Quiz Card Information */}
      <Card className="overflow-hidden border bg-card shadow-sm">
        <CardHeader className="border-b bg-muted/30 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Badge
                variant="secondary"
                className={cn(
                  "rounded-full border-0 px-3 py-1 text-xs font-semibold",
                  quizStatus === "Open"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                    : quizStatus === "Closed"
                      ? "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {quizStatus}
              </Badge>
              <CardTitle className="text-lg font-bold text-foreground sm:text-xl">
                {quiz.name}
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              Author:{" "}
              <span className="font-semibold text-foreground">
                {quizAuthor}
              </span>{" "}
              • Created: {quiz.createdAt}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-4 sm:p-6">
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

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  WCAG Principle
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {quiz.principle || "Perceivable"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Due Date
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {dueDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Classrooms
                </p>
                <p className="max-w-[200px] truncate text-sm font-semibold text-foreground">
                  {assignedClassrooms.length > 0
                    ? assignedClassrooms
                        .map((c) => c?.classroomCode || c?.name)
                        .join(", ")
                    : "No classrooms assigned"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Time Limit
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {timeLimit} Minutes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <HelpCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Total Questions
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {questionsCount} Questions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Total Points
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {totalPoints} Points
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Tags section */}
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Target Success Criteria / Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="gap-1.5 px-3 py-1 text-xs"
                >
                  <Tag className="h-3 w-3" />
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
function SubmissionsTab({ quiz }: { quiz: (typeof quizzes)[0] }) {
  const assignedClassrooms = useMemo(
    () =>
      (quiz.classrooms ?? [])
        .map((cId) => classrooms.find((c) => String(c.id) === String(cId)))
        .filter(Boolean),
    [quiz.classrooms]
  )

  const targetClassrooms =
    assignedClassrooms.length > 0 ? assignedClassrooms : classrooms.slice(0, 1)

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4 py-4 sm:space-y-6 sm:py-6">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
          Assigned Classrooms
        </h2>
        <span className="text-xs font-medium text-muted-foreground">
          {targetClassrooms.length}{" "}
          {targetClassrooms.length === 1 ? "Classroom" : "Classrooms"}
        </span>
      </div>

      <QuizSubmissionsCardTemplate quiz={quiz} />
    </div>
  )
}

function PreviewTab({ quiz }: { quiz: (typeof quizzes)[0] }) {
  const [previewKey, setPreviewKey] = useState(0)

  const handleResetPreview = () => {
    setPreviewKey((k) => k + 1)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 py-4">
      <Card className="border bg-background p-4 shadow-sm sm:p-6">
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
              className="gap-1.5 text-xs shadow-xs"
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
        <div className="survey-preview-wrapper min-h-[400px] rounded-lg border bg-card p-2 sm:p-4">
          <QuizForm key={previewKey} quiz={quiz} />
        </div>
      </Card>
    </div>
  )
}

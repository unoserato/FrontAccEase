import { useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  User,
  Clock,
  FileText,
  FileQuestion,
  Calendar,
  ArrowUpRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type {
  InstructorQuizClassroom,
  InstructorQuizLearner,
  InstructorQuizProps,
  QuizProps,
  QuizSubmissionProps,
} from "@/const/props/quizProps"
import type { ClassroomProps } from "@/const/props/classroomProps"
import type { User as UserType } from "@/const/props/userProps"
import { getDateString } from "@/hooks/date-to-string"
import {
  getQuizTotalPoints,
  getQuizTotalQuestions,
} from "@/features/shared/quizHelper"

export type QuizSubmissionsCardTemplateProps = {
  quiz: InstructorQuizProps | QuizProps
  classrooms?: (InstructorQuizClassroom | ClassroomProps)[]
  learners?: (UserType | InstructorQuizLearner)[]
  submissions?: QuizSubmissionProps[]
  viewMode?: "by-quiz" | "by-classroom" | "auto"
}

function getLearnerId(learner: UserType | InstructorQuizLearner): string {
  if ("learner_id" in learner && learner.learner_id) {
    return String(learner.learner_id)
  }
  if ("id" in learner && learner.id) {
    return String(learner.id)
  }
  return ""
}

function getSubmissionLearnerId(submission: QuizSubmissionProps): string {
  if (submission.learner_id) {
    return String(submission.learner_id)
  }
  const anySub = submission as Record<string, any>
  if (anySub.user_id) {
    return String(anySub.user_id)
  }
  if (anySub.user?.id) {
    return String(anySub.user.id)
  }
  return ""
}

function getScoreBadgeClass(ratio: number): string {
  if (ratio < 0.6) {
    return "border-rose-500/30 text-rose-700 bg-rose-50/50 dark:bg-rose-950/30 dark:text-rose-400"
  }
  if (ratio < 0.8) {
    return "border-amber-500/30 text-amber-700 bg-amber-50/50 dark:bg-amber-950/30 dark:text-amber-400"
  }
  return "border-emerald-500/30 text-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/30 dark:text-emerald-400"
}

function getBestSubmission(submissions: QuizSubmissionProps[]): QuizSubmissionProps | undefined {
  if (submissions.length === 0) return undefined
  return submissions.reduce((best, current) => {
    if ((current.score ?? 0) > (best.score ?? 0)) return current
    if ((current.score ?? 0) === (best.score ?? 0)) {
      const curTime = current.submitted_at
        ? new Date(current.submitted_at).getTime()
        : 0
      const prevTime = best.submitted_at
        ? new Date(best.submitted_at).getTime()
        : 0
      return curTime >= prevTime ? current : best
    }
    return best
  }, submissions[0])
}

function LearnersList({
  learners,
  quizSubmissions,
  totalPoints,
}: {
  learners: (UserType | InstructorQuizLearner)[]
  quizSubmissions: QuizSubmissionProps[]
  totalPoints: number
}) {
  if (learners.length === 0) {
    return (
      <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
        <Clock className="mr-2 size-4" />
        <span>No enrolled learners found in this classroom.</span>
      </div>
    )
  }

  return (
    <div className="divide-y divide-border/40 rounded-lg border border-border/60 bg-background">
      {learners.map((learner) => {
        const learnerId = getLearnerId(learner)
        const learnerSubmissions = quizSubmissions.filter(
          (s) => getSubmissionLearnerId(s) === learnerId
        )

        const submission = getBestSubmission(learnerSubmissions)
        const isSubmitted = !!submission
        const score = submission?.score ?? 0

        // Ensure total points is never 0 when calculating score ratios
        const displayTotal =
          totalPoints > 0 ? Math.max(totalPoints, score) : score > 0 ? score : 0
        const ratio = displayTotal > 0 ? score / displayTotal : 1
        const scoreBadgeClass = getScoreBadgeClass(ratio)

        const initials = (learner.name[0] || "Student").toUpperCase()
        const attemptNumber =
          submission?.attempt_count != null
            ? submission.attempt_count === 0
              ? 1
              : submission.attempt_count
            : null

        return (
          <div
            key={learnerId || learner.name}
            className="flex items-center justify-between px-4 py-3 text-xs transition-colors hover:bg-muted/40 sm:text-sm"
          >
            <div className="flex items-center gap-3">
              <Avatar className="size-8 border border-border text-xs font-semibold sm:size-9">
                <AvatarImage src={learner.profile_picture || ""} />
                <AvatarFallback>
                  {initials || <User className="size-3.5" />}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{learner.name}</p>
                <p className="text-xs text-muted-foreground">
                  {isSubmitted
                    ? `Submitted: ${
                        submission.submitted_at
                          ? getDateString(submission.submitted_at)
                          : "Recently"
                      }${
                        attemptNumber != null
                          ? ` • Attempt ${attemptNumber}`
                          : ""
                      }`
                    : "No submission yet"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isSubmitted ? (
                <Badge
                  variant="outline"
                  className={cn(
                    "px-2.5 py-1 text-xs font-semibold",
                    scoreBadgeClass
                  )}
                >
                  {displayTotal > 0
                    ? `${score} / ${displayTotal}`
                    : `${score} pts`}
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="px-2.5 py-1 text-xs font-medium"
                >
                  Missing
                </Badge>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

type SubmissionCardItemProps = {
  id: string
  icon: React.ReactNode
  title: string
  badges?: React.ReactNode
  subtitle: React.ReactNode
  submittedCount: number
  totalCount: number
  isCompleted: boolean
  learners: (UserType | InstructorQuizLearner)[]
  quizSubmissions: QuizSubmissionProps[]
  totalPoints: number
  quizLink?: string
}

function SubmissionCardItem({
  id,
  icon,
  title,
  badges,
  subtitle,
  submittedCount,
  totalCount,
  isCompleted,
  learners,
  quizSubmissions,
  totalPoints,
  quizLink,
}: SubmissionCardItemProps) {
  return (
    <AccordionItem
      value={id}
      className="overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-all hover:border-border/80"
    >
      <div className="flex w-full items-center">
        <AccordionTrigger className="w-full px-5 py-4 hover:no-underline">
          <div className="flex w-full items-center justify-between gap-4 text-left">
            {/* Left: Info */}
            <div className="flex min-w-0 flex-1 items-start gap-3.5">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-sm font-semibold tracking-tight text-foreground md:text-base">
                    {title}
                  </h3>
                  {badges}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                  {subtitle}
                </div>
              </div>
            </div>

            {/* Right: Submission Status Badge */}
            <div className="flex shrink-0 items-center gap-2 pl-4">
              <Badge
                variant={isCompleted ? "default" : "secondary"}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium"
              >
                <Users className="size-3.5" />
                <span>
                  {submittedCount} / {totalCount}
                </span>
              </Badge>
            </div>
          </div>
        </AccordionTrigger>

        {/* Link to quiz details: ONLY available in /instructor/classroom/:classroomId */}
        {quizLink && (
          <div className="pr-4">
            <Link
              to={quizLink}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-sm" }),
                "shrink-0 text-muted-foreground hover:text-foreground"
              )}
              title="View quiz details"
              aria-label="View quiz details"
            >
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        )}
      </div>

      <AccordionContent className="border-t border-border/50 bg-muted/20 px-5 pt-3 pb-4">
        <LearnersList
          learners={learners}
          quizSubmissions={quizSubmissions}
          totalPoints={totalPoints}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default function QuizSubmissionsCardTemplate({
  quiz,
  classrooms: classroomsProp,
  learners: learnersProp,
  submissions = [],
  viewMode = "auto",
}: QuizSubmissionsCardTemplateProps) {
  const location = useLocation()
  const isInsideClassroom = location.pathname.includes("/instructor/classroom/")

  const quizId = quiz?.id

  // Filter submissions belonging to this specific quiz
  const quizSubmissions = useMemo(() => {
    if (!quizId) return submissions
    return submissions.filter((s) => {
      if (!s.quiz_id) return true
      return String(s.quiz_id) === String(quizId)
    })
  }, [submissions, quizId])

  // Compute total points with fallbacks so 0 points is avoided when questions exist
  const totalPoints = useMemo(() => {
    if (quiz.total_points && quiz.total_points > 0) {
      return quiz.total_points
    }
    const computed = getQuizTotalPoints(quiz)
    if (computed > 0) {
      return computed
    }
    const maxScore = quizSubmissions.reduce(
      (max, s) => Math.max(max, s.score ?? 0),
      0
    )
    if (maxScore > 0) {
      return maxScore
    }
    const qCount = quiz.question_count || getQuizTotalQuestions(quiz) || 0
    if (qCount > 0) {
      return qCount
    }
    return 0
  }, [quiz, quizSubmissions])

  const questionCount = useMemo(() => {
    if (quiz.question_count && quiz.question_count > 0) {
      return quiz.question_count
    }
    return getQuizTotalQuestions(quiz)
  }, [quiz])

  // Determine rendering mode:
  // "by-quiz": Display card for this quiz, showing its title/meta and classroom learners (used in ClassroomInstructorView)
  // "by-classroom": Group by classrooms assigned to this quiz (used in QuizzesInstructorView)
  const isByQuiz = useMemo(() => {
    if (viewMode === "by-quiz") return true
    if (viewMode === "by-classroom") return false
    if (isInsideClassroom) return true
    if (learnersProp && learnersProp.length > 0) return true
    return false
  }, [viewMode, isInsideClassroom, learnersProp])

  // Normalization for by-classroom mode
  const quizClassrooms: InstructorQuizClassroom[] = useMemo(() => {
    if (!quiz.classrooms) return []
    return quiz.classrooms.filter(
      (c): c is InstructorQuizClassroom =>
        typeof c === "object" && c !== null && "learners" in c
    )
  }, [quiz.classrooms])

  const defaultExpandedClassroomIds = useMemo(
    () => quizClassrooms.map((c) => c.id),
    [quizClassrooms]
  )

  // Normalization for by-quiz mode: resolve learners
  const resolvedLearners: (UserType | InstructorQuizLearner)[] = useMemo(() => {
    if (learnersProp && learnersProp.length > 0) {
      return learnersProp
    }
    if (classroomsProp && classroomsProp.length > 0) {
      const first = classroomsProp[0] as Record<string, any>
      if (first.learners && Array.isArray(first.learners)) {
        return first.learners
      }
    }
    if (quizClassrooms.length > 0) {
      return quizClassrooms.flatMap((c) => c.learners ?? [])
    }
    return []
  }, [learnersProp, classroomsProp, quizClassrooms])

  // Calculate submission progress for by-quiz mode
  const quizLearnerIds = useMemo(
    () => resolvedLearners.map((l) => getLearnerId(l)).filter(Boolean),
    [resolvedLearners]
  )

  const quizSubmittedLearnerIds = useMemo(() => {
    const ids = new Set(
      quizSubmissions
        .map((s) => getSubmissionLearnerId(s))
        .filter((id) => id && quizLearnerIds.includes(id))
    )
    return ids
  }, [quizSubmissions, quizLearnerIds])

  const quizSubmittedCount = quizSubmittedLearnerIds.size
  const quizLearnerCount = resolvedLearners.length
  const isQuizCompleted =
    quizLearnerCount > 0 && quizSubmittedCount >= quizLearnerCount

  // BY-QUIZ MODE: Renders quiz-centric submissions card (ClassroomInstructorView)
  if (isByQuiz) {
    const badges = (
      <>
        {quiz.principle && (
          <Badge
            variant="outline"
            className="px-1.5 py-0 text-xs font-medium text-muted-foreground"
          >
            {quiz.principle}
          </Badge>
        )}
        {quiz.status && (
          <Badge
            variant="secondary"
            className={cn(
              "px-1.5 py-0 text-xs font-medium",
              quiz.status === "Open"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : ""
            )}
          >
            {quiz.status}
          </Badge>
        )}
      </>
    )

    const subtitle = (
      <>
        <span className="flex items-center gap-1">
          <Calendar className="size-3" />
          {quiz.due_date ? `Due ${getDateString(quiz.due_date)}` : "No due date"}
        </span>
        <span>•</span>
        <span>
          {totalPoints} {totalPoints === 1 ? "point" : "points"}
        </span>
        {questionCount > 0 && (
          <>
            <span>•</span>
            <span>
              {questionCount} {questionCount === 1 ? "question" : "questions"}
            </span>
          </>
        )}
      </>
    )

    // Link only available in /instructor/classroom/:classroomId
    const quizLink =
      isInsideClassroom && quiz.id ? `/instructor/quizzes/${quiz.id}` : undefined

    return (
      <Accordion multiple className="w-full">
        <SubmissionCardItem
          id={quiz.id || "quiz"}
          icon={<FileQuestion className="size-4.5" />}
          title={quiz.name || "Untitled Quiz"}
          badges={badges}
          subtitle={subtitle}
          submittedCount={quizSubmittedCount}
          totalCount={quizLearnerCount}
          isCompleted={isQuizCompleted}
          learners={resolvedLearners}
          quizSubmissions={quizSubmissions}
          totalPoints={totalPoints}
          quizLink={quizLink}
        />
      </Accordion>
    )
  }

  // BY-CLASSROOM MODE: Renders assigned classrooms accordion (QuizzesInstructorView)
  if (!quizClassrooms.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-14 text-center">
        <FileText className="mb-3 size-10 text-muted-foreground/60" />
        <p className="text-base font-semibold text-foreground">
          No classrooms assigned
        </p>
        <p className="text-sm text-muted-foreground">
          Submissions for assigned classrooms will appear here.
        </p>
      </div>
    )
  }

  return (
    <Accordion
      multiple
      defaultValue={defaultExpandedClassroomIds}
      className="space-y-3"
    >
      {quizClassrooms.map((classroom) => {
        const learners = classroom.learners ?? []
        const learnerCount = learners.length
        const classroomCode =
          classroom.code || (classroom as Record<string, any>).classroom_code || ""

        const classroomLearnerIds = learners
          .map((l) => getLearnerId(l))
          .filter(Boolean)
        const submittedLearnerIds = new Set(
          quizSubmissions
            .map((s) => getSubmissionLearnerId(s))
            .filter((id) => id && classroomLearnerIds.includes(id))
        )
        const submittedCount = submittedLearnerIds.size
        const isCompleted = learnerCount > 0 && submittedCount >= learnerCount

        const classroomBadges = classroomCode ? (
          <Badge variant="outline" className="text-xs">
            {classroomCode}
          </Badge>
        ) : undefined

        const classroomSubtitle = (
          <span>
            {learnerCount}{" "}
            {learnerCount === 1 ? "Enrolled Learner" : "Enrolled Learners"}
          </span>
        )

        return (
          <SubmissionCardItem
            key={classroom.id}
            id={classroom.id}
            icon={<Users className="size-4" />}
            title={classroom.name}
            badges={classroomBadges}
            subtitle={classroomSubtitle}
            submittedCount={submittedCount}
            totalCount={learnerCount}
            isCompleted={isCompleted}
            learners={learners}
            quizSubmissions={quizSubmissions}
            totalPoints={totalPoints}
            quizLink={undefined}
          />
        )
      })}
    </Accordion>
  )
}

import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { useState } from "react"
import DeleteArchiveDialog, {
  type ActionType,
} from "../instructor/DeleteArchiveDialog"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import EditorDropdown from "./EditorDropdown"
import { useNavigate } from "react-router-dom"
import { useMe } from "@/services/tanstack/auth"
import type { InstructorQuizProps, QuizProps } from "@/const/props/quizProps"
import { getDateString } from "@/hooks/date-to-string"

export type QuizCardTemplateProps = {
  quiz: InstructorQuizProps | QuizProps | any
  href?: string
  onClick?: () => void
}

export default function QuizCardTemplate({
  quiz,
  href,
  onClick,
}: QuizCardTemplateProps) {
  const [action, setAction] = useState<ActionType>(null)
  const classrooms = quiz.classrooms ?? []

  const { data: user } = useMe()
  const isEditor = user?.role === "instructor"
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  const maxAttempts = quiz.max_attempts ?? quiz.attempt_count ?? 1
  const passingRate = quiz.passing_rate ?? 0
  const submissionsCount = quiz.no_submission ?? 0

  const totalLearners =
    quiz.expected_no_submission ??
    classrooms.reduce(
      (sum: number, c: any) => sum + (c.learners?.length || 0),
      0
    )

  const dueDate = quiz.due_date || ""
  const quizStatus =
    quiz.status == "Draft"
      ? "Draft"
      : dueDate
        ? new Date(dueDate) > new Date()
          ? "Open"
          : "Closed"
        : "Active"
  const quizAuthor = quiz.created_by || "Instructor"
  const classroomsCount = classrooms.length
  const classroomsLabel =
    classroomsCount === 1 ? "1 Classroom" : `${classroomsCount} Classrooms`

  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((submissionsCount / (totalLearners || 1)) * 100))
  )

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      navigate(href)
    } else {
      navigate(`/instructor/quizzes/${quiz.id}`)
    }
  }

  return (
    <>
      <Card
        onClick={handleClick}
        className="group relative flex w-full cursor-pointer flex-col justify-between overflow-hidden p-4 transition-all hover:shadow-xs sm:p-5"
      >
        {/* Top Bar / Dropdown in Top Right Corner */}
        <div className="flex items-center justify-between">
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

          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            {isEditor && (
              <EditorDropdown setAction={(value) => setAction(value)} />
            )}
          </div>
        </div>

        {/* Content Body: Adapts smoothly based on screen size & isMobile */}
        {isMobile ? (
          /* Mobile Stacked View */
          <div className="mt-3 space-y-4 pr-6">
            <div>
              {quiz.principle && <Badge>{quiz.principle}</Badge>}
              <h3 className="mt-2 text-base font-bold text-foreground">
                {quiz.name}
              </h3>
              <p className="text-xs font-medium text-muted-foreground">
                Author: {quizAuthor}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Passing Rate
                </p>
                <p className="text-2xl font-extrabold tracking-tight text-foreground">
                  {passingRate}%
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Max Attempts
                </p>
                <p className="text-2xl font-extrabold tracking-tight text-foreground">
                  {maxAttempts}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">
                  Submissions
                </span>
                <span className="font-semibold text-foreground">
                  {submissionsCount} / {totalLearners}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-foreground transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Due Date
                </p>
                <p className="text-xs font-bold text-foreground">
                  {getDateString(dueDate)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Classrooms
                </p>
                <p className="text-xs font-bold text-foreground">
                  {classroomsLabel}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop Horizontal List Layout */
          <div className="mt-3 flex items-center justify-between gap-6 pr-8">
            {/* Title & Author */}
            <div className="min-w-0 flex-1 space-y-1">
              {quiz.principle && <Badge>{quiz.principle}</Badge>}
              <h3 className="mt-2 truncate text-base font-bold text-foreground lg:text-lg">
                {quiz.name}
              </h3>
              <p className="text-xs font-medium text-muted-foreground">
                Author: {quizAuthor}
              </p>
            </div>

            {/* Metrics */}
            <div className="flex shrink-0 items-center gap-6">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Passing Rate
                </p>
                <p className="text-xl font-extrabold text-foreground lg:text-2xl">
                  {passingRate}%
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Max Attempts
                </p>
                <p className="text-xl font-extrabold text-foreground lg:text-2xl">
                  {maxAttempts}
                </p>
              </div>
              <div className="w-32 space-y-1">
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                  <span>Submissions</span>
                  <span className="font-semibold text-foreground">
                    {submissionsCount}/{totalLearners}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-foreground transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Meta: Due Date & Classrooms */}
            <div className="flex shrink-0 items-center gap-6">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Due Date
                </p>
                <p className="text-xs font-bold text-foreground sm:text-sm">
                  {getDateString(dueDate)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Classrooms
                </p>
                <p className="text-xs font-bold text-foreground sm:text-sm">
                  {classroomsLabel}
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      <DeleteArchiveDialog
        action={action}
        setAction={setAction}
        item={quiz}
        editUrl={`/instructor/quizzes/edit/${quiz.id}`}
        itemType="quiz"
      />
    </>
  )
}

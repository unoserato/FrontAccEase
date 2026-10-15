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
import type { QuizProps } from "@/const/props/materialProps"
import { useClassrooms } from "@/services/tanstack/materials"
import { getDateString } from "@/hooks/date-to-string"

export type QuizCardTemplateProps = {
  quiz: QuizProps
}

export default function QuizCardTemplate({ quiz }: QuizCardTemplateProps) {
  const [action, setAction] = useState<ActionType>(null)
  const { data: user } = useMe()
  const { data: classrooms } = useClassrooms()
  const isEditor = user?.role == "instructor"
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  console.log(action)

  const quizClassroomIds = quiz.classrooms ?? []
  const assignedClassrooms = quizClassroomIds
    .map((cId) => classrooms.find((c) => String(c.id) === String(cId)))
    .filter(Boolean)

  const totalLearners = assignedClassrooms.reduce(
    (sum, item) => sum + item!.enrollment_count,
    0
  )
  const submissionsCount = 0

  const avgScore = 0

  const passingRate = 0

  const dueDate = quiz.due_date

  const quizStatus = new Date(quiz.due_date) > new Date() ? "Open" : "Closed"
  const quizAuthor = quiz.created_by
  const classroomsCount = quiz.classrooms?.length ?? 0
  const classroomsLabel =
    classroomsCount === 1 ? "1 Classroom" : `${classroomsCount} Classrooms`

  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((submissionsCount / (totalLearners || 1)) * 100))
  )

  return (
    <>
      <Card
        onClick={() => navigate(`/instructor/quizzes/${quiz.id}`)}
        className="group relative flex w-full cursor-pointer flex-col justify-between overflow-hidden p-4 transition-all hover:shadow-sm sm:p-5"
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
              <Badge>{quiz.principle}</Badge>
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
                  Avg. Score
                </p>
                <p className="text-2xl font-extrabold tracking-tight text-foreground">
                  {avgScore}%
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
                  {new Date(dueDate).toString()}
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
              <Badge>{quiz.principle}</Badge>
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
                  Avg. Score
                </p>
                <p className="text-xl font-extrabold text-foreground lg:text-2xl">
                  {avgScore}%
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

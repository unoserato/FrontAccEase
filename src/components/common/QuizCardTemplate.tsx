import type { QuizProps } from "@/const/materialsProps"
import { classrooms, quizSubmissions } from "@/const/data"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Archive, EllipsisVertical, Pencil, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { useState } from "react"
import DeleteArchiveDialog, {
  type ActionType,
} from "../instructor/DeleteArchiveDialog"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { useNavigate, useLocation } from "react-router-dom"
import { getQuizTotalPoints } from "@/features/instructor/quizHelper"

export type QuizCardTemplateProps = {
  quiz: QuizProps
  isEditor?: boolean
}

export default function QuizCardTemplate({
  quiz,
  isEditor,
}: QuizCardTemplateProps) {
  const [action, setAction] = useState<ActionType>(null)
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigate = () => {
    const currentPath = location.pathname.replace(/\/$/, "")
    navigate(`${currentPath}/${quiz.id}`)
  }

  // Calculate dynamic submissions over total learners in assigned classrooms
  const matchingSubmissions = quizSubmissions.filter(
    (s) => String(s.quizId) === String(quiz.id)
  )

  const quizClassroomIds = quiz.classrooms ?? []
  const assignedClassrooms = quizClassroomIds
    .map((cId) => classrooms.find((c) => String(c.id) === String(cId)))
    .filter(Boolean)

  const assignedLearnerIds = Array.from(
    new Set(assignedClassrooms.flatMap((c) => c?.learners ?? []))
  )

  const totalLearners =
    assignedLearnerIds.length > 0
      ? assignedLearnerIds.length
      : (quiz.totalSubmissions ?? 0)

  const submissionsCount =
    matchingSubmissions.length > 0
      ? matchingSubmissions.length
      : (quiz.submissionsCount ?? 0)

  const computedPoints = getQuizTotalPoints(quiz)
  const totalPoints = computedPoints > 0 ? computedPoints : 50

  const avgScore =
    matchingSubmissions.length > 0
      ? Math.round(
          (matchingSubmissions.reduce((acc, s) => acc + (s.score ?? 0), 0) /
            matchingSubmissions.length /
            totalPoints) *
            100
        )
      : (quiz.avgScore ?? 84)

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
  const classroomsCount = quiz.classrooms?.length ?? 0
  const classroomsLabel =
    classroomsCount === 1 ? "1 Classroom" : `${classroomsCount} Classrooms`

  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((submissionsCount / (totalLearners || 1)) * 100))
  )

  const actionsDropdown = isEditor && (
    <div onClick={(e) => e.stopPropagation()} className="shrink-0">
      <DropdownMenu>
        <DropdownMenuTrigger
          onClick={(e) => e.stopPropagation()}
          render={
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground"
              aria-label="Quiz actions"
            >
              <EllipsisVertical className="size-4" />
            </Button>
          }
        />

        <DropdownMenuContent onClick={(e) => e.stopPropagation()} align="end">
          <DropdownMenuItem onClick={() => setAction("edit")}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setAction("archive")}>
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onClick={() => setAction("delete")}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  return (
    <>
      <Card
        className="group relative flex w-full cursor-pointer flex-col justify-between overflow-hidden p-4 transition-all hover:shadow-sm sm:p-5"
        onClick={handleNavigate}
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
            {actionsDropdown}
          </div>
        </div>

        {/* Content Body: Adapts smoothly based on screen size & isMobile */}
        {isMobile ? (
          /* Mobile Stacked View */
          <div className="mt-3 space-y-4 pr-6">
            <div>
              <h3 className="text-base font-bold text-foreground">
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
                <p className="text-xs font-bold text-foreground">{dueDate}</p>
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
              <h3 className="truncate text-base font-bold text-foreground lg:text-lg">
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
                  {dueDate}
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

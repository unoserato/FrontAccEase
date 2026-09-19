import type { QuizProps } from "@/const/materialsProps"
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

export type QuizCardTemplateProps = {
  quiz: QuizProps
}

export default function QuizCardTemplate({ quiz }: QuizCardTemplateProps) {
  const [action, setAction] = useState<ActionType>(null)
  const isMobile = useIsMobile()

  const quizStatus = quiz.status || "Open"
  const quizAuthor = quiz.author || "You"
  const passingRate = quiz.passing_rate ?? 92
  const avgScore = quiz.avg_score ?? 84
  const submissionsCount = quiz.submissions_count ?? 35
  const totalSubmissions = quiz.total_submissions ?? 59
  const dueDate = quiz.due_date || "Aug 27, 2026"
  const availability = quiz.availability || "Everyone"

  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((submissionsCount / (totalSubmissions || 1)) * 100))
  )

  const actionsDropdown = (
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
      <Card className="group relative flex w-full flex-col justify-between overflow-hidden p-4 transition-all hover:shadow-sm sm:p-5">
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
                  {submissionsCount} / {totalSubmissions}
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
                  Availability
                </p>
                <p className="text-xs font-bold text-foreground">
                  {availability}
                </p>
              </div>
            </div>

            <div className="pt-2 text-center">
              <Button
                variant="ghost"
                className="w-full text-xs font-semibold text-foreground hover:bg-muted/50"
                onClick={() => alert(`View results for ${quiz.name}`)}
              >
                View Results
              </Button>
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
                    {submissionsCount}/{totalSubmissions}
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

            {/* Meta: Due Date & Availability */}
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
                  Availability
                </p>
                <p className="text-xs font-bold text-foreground sm:text-sm">
                  {availability}
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-semibold"
                onClick={() => alert(`View results for ${quiz.name}`)}
              >
                View Results
              </Button>
            </div>
          </div>
        )}
      </Card>

      <DeleteArchiveDialog action={action} setAction={setAction} item={quiz} />
    </>
  )
}

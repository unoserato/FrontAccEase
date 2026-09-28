import { useState } from "react"
import type { QuizProps } from "@/const/materialsProps"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, FileQuestion } from "lucide-react"
import { Link } from "react-router-dom"
import { getQuizTotalQuestions } from "@/features/instructor/quizHelper"
import { Badge } from "../ui/badge"

interface LearnerQuizCardTemplateProps {
  quizzes?: QuizProps[]
  quiz?: QuizProps
  title?: string
}

export default function LearnerQuizCardTemplate({
  quizzes,
  quiz,
  title = "Due Quizzes",
}: LearnerQuizCardTemplateProps) {
  const [isOpen, setIsOpen] = useState(true)

  const list = quizzes || (quiz ? [quiz] : [])

  if (list.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center shadow-sm">
        <FileQuestion className="mb-2 size-8 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          No quizzes currently assigned.
        </p>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-all sm:p-5">
      {/* Semantic Accessible Collapsible Header Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between rounded-lg py-1 text-left select-none transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex items-center gap-2.5">
          <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
            {title}
          </h3>
          <Badge variant="secondary" className="px-2 py-0.5 text-xs font-semibold">
            {list.length}
          </Badge>
        </div>

        <div className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground">
          {isOpen ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </div>
      </button>

      {/* Quiz List Items */}
      {isOpen && (
        <div className="mt-3 space-y-2 divide-y divide-border/40">
          {list.map((item, index) => {
            const totalQuestions = getQuizTotalQuestions(item)
            const dueDateText = item.dueDate ? item.dueDate : "No due date"
            const attemptsText =
              item.maxAttempts === undefined || item.maxAttempts === null
                ? "Unlimited"
                : item.maxAttempts

            return (
              <div
                key={item.id}
                className={cn(
                  "flex flex-col gap-3 rounded-xl p-3 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between",
                  index > 0 && "pt-3.5"
                )}
              >
                {/* Left: Icon & Title */}
                <div className="flex min-w-0 flex-1 items-center gap-3.5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
                    <FileQuestion className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/learner/quizzes/${item.id}`}
                      className="block truncate text-sm font-bold text-foreground transition-colors hover:text-primary hover:underline sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      {item.name || "Untitled Quiz"}
                    </Link>
                  </div>
                </div>

                {/* Right: Responsive Details Grid & Start Link */}
                <div className="flex shrink-0 items-center justify-between gap-4 sm:gap-6 md:gap-8">
                  {/* Due Date */}
                  <div className="text-left sm:text-center">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Due
                    </span>
                    <span className="mt-0.5 block text-xs font-semibold text-foreground sm:text-sm">
                      {dueDateText}
                    </span>
                  </div>

                  {/* Items Count */}
                  <div className="text-left sm:text-center">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Items
                    </span>
                    <span className="mt-0.5 block text-xs font-semibold text-foreground sm:text-sm">
                      {totalQuestions}
                    </span>
                  </div>

                  {/* Max Attempts */}
                  <div className="text-left sm:text-center">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Attempts
                    </span>
                    <span className="mt-0.5 block text-xs font-semibold text-foreground sm:text-sm">
                      {attemptsText}
                    </span>
                  </div>

                  {/* Single Action Button Link */}
                  <Link
                    to={`/learner/quizzes/${item.id}`}
                    aria-label={`Start quiz: ${item.name || "Untitled Quiz"}`}
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" }),
                      "shrink-0 font-bold"
                    )}
                  >
                    Start
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}

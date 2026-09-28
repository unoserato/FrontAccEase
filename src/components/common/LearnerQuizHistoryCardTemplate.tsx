import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { QuizProps, QuizSubmissionProps } from "@/const/materialsProps"
import { cn } from "@/lib/utils"
import { Award, ChevronDown, ChevronUp, History } from "lucide-react"
import { Link } from "react-router-dom"

interface LearnerQuizHistoryCardTemplateProps {
  submissions: QuizSubmissionProps[]
  quizzes?: QuizProps[]
  title?: string
}

export default function LearnerQuizHistoryCardTemplate({
  submissions,
  quizzes = [],
  title = "Quiz History",
}: LearnerQuizHistoryCardTemplateProps) {
  const [isOpen, setIsOpen] = useState(true)

  if (submissions.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center shadow-sm">
        <History className="mb-2 size-8 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          No quiz submissions recorded yet for this classroom.
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
            {submissions.length}
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

      {/* Submission List Items */}
      {isOpen && (
        <div className="mt-3 space-y-2 divide-y divide-border/40">
          {submissions.map((item, index) => {
            const matchedQuiz = quizzes.find((q) => q.id === item.quizId)
            const quizName = matchedQuiz?.name || `Assessment #${item.quizId}`
            const submittedDateText = item.submittedAt
              ? item.submittedAt.split(" GMT")[0]
              : "Completed"

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
                    <Award className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <span className="block truncate text-sm font-bold text-foreground sm:text-base">
                      {quizName}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Submitted on {submittedDateText}
                    </span>
                  </div>
                </div>

                {/* Right: Details & Action */}
                <div className="flex shrink-0 items-center justify-between gap-4 sm:gap-6 md:gap-8">
                  {/* Score */}
                  <div className="text-left sm:text-center">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Score
                    </span>
                    <span className="mt-0.5 block text-xs font-semibold text-foreground sm:text-sm">
                      {item.score !== undefined ? `${item.score} pts` : "Graded"}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="text-left sm:text-center">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Status
                    </span>
                    <Badge variant="outline" className="mt-0.5 text-xs font-semibold">
                      Completed
                    </Badge>
                  </div>

                  {/* Action Link */}
                  <Link
                    to={`/learner/quizzes/${item.quizId}`}
                    aria-label={`Review submission for ${quizName}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "shrink-0 font-medium"
                    )}
                  >
                    Review
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

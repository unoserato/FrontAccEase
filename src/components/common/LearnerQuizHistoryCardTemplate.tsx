import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type {
  QuizProps,
  QuizSubmissionProps,
} from "@/const/props/materialProps"
import { cn } from "@/lib/utils"
import { Award, ChevronDown, ChevronUp, History } from "lucide-react"
import { getDateString } from "@/hooks/date-to-string"
import QuizForm from "@/features/instructor/QuizForm"

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
  const [selectedSubmission, setSelectedSubmission] =
    useState<QuizSubmissionProps | null>(null)

  const selectedQuiz = useMemo<QuizProps | null>(() => {
    if (!selectedSubmission) return null

    if (selectedSubmission.quiz) {
      const embedded = selectedSubmission.quiz
      return {
        id: selectedSubmission.quiz_id || embedded.id || "preview-quiz",
        principle: embedded.principle || "Perceivable",
        tags: embedded.tags || [],
        classrooms: embedded.classrooms || [],
        question_count: embedded.question_count,
        total_points: embedded.total_points,
        time_limit: embedded.time_limit,
        due_date:
          embedded.due_date ||
          selectedSubmission.submitted_at ||
          new Date().toISOString(),
        theme: embedded.theme || "Default",
        quiz_json: embedded.quiz_json as unknown,
        created_at:
          embedded.created_at ||
          selectedSubmission.started_at ||
          new Date().toISOString(),
        attempt_count:
          embedded.attempt_count ?? selectedSubmission.attempt_count ?? 1,
        ...embedded,
      } as QuizProps
    }

    const quizId = selectedSubmission.quiz_id
    const matched = quizzes.find((q) => String(q.id) === String(quizId))
    return matched ?? null
  }, [selectedSubmission, quizzes])

  const answers = useMemo<Record<string, unknown>>(() => {
    if (!selectedSubmission) return {}
    const raw = selectedSubmission.answers ?? selectedSubmission.content
    if (!raw) return {}
    if (typeof raw === "object" && !Array.isArray(raw)) {
      return raw as Record<string, unknown>
    }
    if (typeof raw === "string") {
      try {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          return parsed as Record<string, unknown>
        }
      } catch {
        return {}
      }
    }
    return {}
  }, [selectedSubmission])

  const correctAnswers = useMemo<Record<string, unknown> | undefined>(() => {
    if (!selectedSubmission?.quiz_answer) return undefined
    const qa = selectedSubmission.quiz_answer as {
      content?: Record<string, unknown>
      question_name?: string
      answer?: string
    }
    if (
      qa.content &&
      typeof qa.content === "object" &&
      !Array.isArray(qa.content)
    ) {
      return qa.content
    }
    if (qa.question_name && qa.answer !== undefined) {
      return { [qa.question_name]: qa.answer }
    }
    if (Array.isArray(qa)) {
      return qa.reduce<Record<string, unknown>>((acc, curr) => {
        if (curr?.question_name && curr?.answer !== undefined) {
          acc[curr.question_name] = curr.answer
        }
        return acc
      }, {})
    }
    return undefined
  }, [selectedSubmission])

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
        className="flex w-full cursor-pointer items-center justify-between rounded-lg py-1 text-left transition-colors select-none hover:bg-muted/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <div className="flex items-center gap-2.5">
          <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
            {title}
          </h3>
          <Badge
            variant="secondary"
            className="px-2 py-0.5 text-xs font-semibold"
          >
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
            const quizId = item.quiz_id
            const matchedQuiz =
              item.quiz ?? quizzes.find((q) => String(q.id) === String(quizId))
            const quizName = matchedQuiz?.name || `Assessment #${quizId ?? ""}`
            const submittedAt = item.submitted_at ?? item.submittedAt
            const submittedDateText = submittedAt
              ? getDateString(submittedAt)
              : null

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
                      {submittedDateText
                        ? `Submitted on ${submittedDateText}`
                        : "Completed"}
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
                      {item.score != null ? `${item.score} pts` : "Not graded"}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="text-left sm:text-center">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Status
                    </span>
                    <Badge
                      variant="outline"
                      className="mt-0.5 text-xs font-semibold"
                    >
                      Completed
                    </Badge>
                  </div>

                  {/* Action Link */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    aria-label={`View submission for ${quizName}`}
                    className="shrink-0 font-medium"
                    onClick={() => setSelectedSubmission(item)}
                  >
                    View quiz
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <Dialog
        open={selectedSubmission !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedSubmission(null)
        }}
      >
        <DialogContent className="max-h-11/12 overflow-y-auto sm:max-w-4xl">
          <DialogHeader className="border-b pb-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pr-6">
              <div>
                <DialogTitle className="text-lg font-bold sm:text-xl">
                  {selectedQuiz?.name ?? "Quiz submission"}
                </DialogTitle>
                <DialogDescription className="mt-1 text-xs text-muted-foreground">
                  Your submitted answers are shown below in read-only mode.
                </DialogDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {selectedSubmission?.score != null && (
                  <Badge
                    variant="outline"
                    className="border-emerald-500/30 bg-emerald-50/50 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                  >
                    Score: {selectedSubmission.score} pts
                  </Badge>
                )}
                {selectedSubmission?.submitted_at && (
                  <Badge variant="secondary" className="text-xs">
                    Submitted: {getDateString(selectedSubmission.submitted_at)}
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  Read-Only Mode
                </Badge>
              </div>
            </div>
          </DialogHeader>
          {!selectedQuiz ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              This quiz is no longer available.
            </p>
          ) : (
            <div className="mt-2 rounded-lg border bg-card p-2 sm:p-4">
              <QuizForm
                key={selectedSubmission?.id}
                quiz={selectedQuiz}
                readOnly
                answers={answers}
                correctAnswers={correctAnswers}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}

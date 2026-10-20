import { useEffect, useState } from "react"
import HeaderTemplate from "@/components/common/PageTemplate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/toast"
import QuizTaker from "@/features/learner/QuizTaker"
import { clearQuizProgress } from "@/features/learner/quizProgress"
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  HelpCircle,
  Maximize2,
  RotateCcw,
  XCircle,
} from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuizById } from "@/services/tanstack/materials"
import { getDateString } from "@/hooks/date-to-string"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createSubmissionTicket,
  updateSubmissionTicket,
} from "@/services/api/CRUD/materialsCRUDAPI"
import NotFound from "../errors/NotFound"

export default function LearnerQuizView() {
  const { id } = useParams()
  const { data: quiz } = useQuizById(id!)
  // const { data: classrooms } = useClassrooms()
  // const { data: contents } = useClassroomContentView(classrooms[0]?.id)
  // const quiz = contents.quizzes.find((quiz) => quiz.id === id)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [isQuizActive, setIsQuizActive] = useState(false)
  const [isTerminated, setIsTerminated] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const [answerCache, setAnswerCache] = useState<Record<string, string> | null>(
    null
  )

  const { mutate: startQuiz, isPending: isStarting } = useMutation({
    mutationFn: (id: string) => createSubmissionTicket(id),
    onSuccess: (data) => {
      queryClient.setQueryData(["quiz", id], (oldData: any) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          quiz_json: {
            ...oldData.quiz_json,
            ...data,
          },
        }
      })
      setIsQuizActive(true)
    },
    onError: (err: any) => {
      toast.add({
        title: "Max attempts reached!",
        description: err.response?.data?.detail,
        type: "error",
      })
    },
  })

  const { mutateAsync: submitQuiz, isError } = useMutation({
    mutationFn: ({ id, answer }: { id: string; answer: object }) =>
      updateSubmissionTicket(id, answer),
  })

  const totalQuestions = quiz.question_count
  const timeLimit = quiz.time_limit
  const maxAttempts = quiz.attempt_count || 0

  // Monitor fullscreen exit, tab switching, and window blur (Alt+Tab) during quiz
  useEffect(() => {
    if (!isQuizActive || !quiz) return

    const terminateQuiz = (reason: string) => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {})
      }
      // A voided attempt must not leave answers behind for the retry.
      clearQuizProgress(quiz.id)
      setIsQuizActive(false)
      setIsTerminated(true)

      toast.add({
        title: "Quiz Terminated",
        description: reason,
      })
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        terminateQuiz(
          "Exiting full screen is not allowed during the test. Your assessment has been cancelled."
        )
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        terminateQuiz(
          "Switching tabs or minimizing the window is not allowed during the test. Your assessment has been cancelled."
        )
      }
    }

    const handleBlur = () => {
      terminateQuiz(
        "Leaving or switching windows (Alt+Tab) is not allowed during the test. Your assessment has been cancelled."
      )
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("blur", handleBlur)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("blur", handleBlur)
    }
  }, [isQuizActive, quiz])

  if (!quiz) return <NotFound />

  async function handleStartQuiz() {
    await startQuiz(quiz!.id)
    await document.documentElement.requestFullscreen()
  }

  async function handleQuizComplete(sender?: any) {
    const answer = answerCache ?? sender?.data

    if (answer == null) {
      toast.add({
        title: "Error",
        description: "No quiz answers found.",
        type: "error",
      })
      return
    }

    setIsCompleted(true)
    setIsQuizActive(false)
    await document.exitFullscreen()

    try {
      await toast.promise(
        submitQuiz({
          id: quiz.id,
          answer,
        }),
        {
          loading:
            answerCache == null
              ? "Submitting quiz..."
              : "Re-submitting quiz...",
          success: "Quiz submitted successfully.",
          error: (error) =>
            error?.response?.data?.detail ||
            error?.message ||
            "Failed to submit quiz.",
        }
      )

      setAnswerCache(answer)
      await queryClient.invalidateQueries({
        queryKey: ["quiz-submission", quiz.id],
      })
    } catch (error) {
      console.error("Quiz submission failed:", error)
    }
  }

  // Active Fullscreen Quiz View
  if (isQuizActive) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background p-4 md:p-8">
        <header className="mb-4 flex items-center justify-between border-b border-border pb-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">{quiz.name}</h1>
            <p className="text-xs text-muted-foreground">
              Assessment in Progress — Do not exit full screen.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-500">
            <Maximize2 className="size-4 shrink-0" />
            <span>Full Screen Mode Enforced</span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-4xl flex-1 py-2">
          <QuizTaker
            quiz={quiz}
            onComplete={(sender) => handleQuizComplete(sender)}
          />
        </main>
      </div>
    )
  }

  // Terminated State View
  if (isTerminated) {
    return (
      <section className="p-responsive space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Quizzes
        </Button>

        <Card className="mx-auto max-w-xl space-y-4 rounded-2xl border border-destructive/40 bg-destructive/5 p-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <XCircle className="size-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">
              Quiz Terminated
            </h2>
            <p className="text-sm text-muted-foreground">
              You exited full screen mode or switched windows during the
              assessment. As per security guidelines, your quiz attempt has been
              cancelled.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back to Quizzes
            </Button>
            <Button onClick={handleStartQuiz} disabled={isStarting}>
              {isStarting ? "Getting quiz data..." : "Retry Assessment"}
            </Button>
          </div>
        </Card>
      </section>
    )
  }

  // Completed State View
  if (isCompleted) {
    return (
      <section className="p-responsive space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Quizzes
        </Button>

        <Card className="mx-auto max-w-xl space-y-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">
              Quiz Completed!
            </h2>
            <p className="text-sm text-muted-foreground">
              Thank you for completing {quiz.name}. Your responses have been
              submitted successfully.
            </p>
          </div>
          <div className="flex justify-center pt-2">
            <Button onClick={() => navigate(-1)}>Back to Quizzes</Button>
            {isError && (
              <Button onClick={handleQuizComplete}>Re-Submit Quiz</Button>
            )}
          </div>
        </Card>
      </section>
    )
  }

  // Overview / Initial View
  return (
    <section className="p-responsive space-y-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back
      </Button>

      <HeaderTemplate
        title={quiz.name}
        subtitle={`Assessment for ${quiz.principle || "Web Accessibility"}`}
      />

      <Card className="space-y-6 rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-bold text-foreground">
            Quiz Overview
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-muted/20 p-4">
            <Calendar className="size-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Due Date
              </p>
              <p className="text-sm font-bold text-foreground">
                {getDateString(quiz.due_date || "")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-muted/20 p-4">
            <HelpCircle className="size-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Total Items
              </p>
              <p className="text-sm font-bold text-foreground">
                {totalQuestions} Questions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-muted/20 p-4">
            <Clock className="size-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Time Limit
              </p>
              <p className="text-sm font-bold text-foreground">
                {(timeLimit ?? 0) > 0
                  ? `${timeLimit} Minutes`
                  : "No Time Limit"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-muted/20 p-4">
            <RotateCcw className="size-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Max Attempts
              </p>
              <p className="text-sm font-bold text-foreground">
                {maxAttempts} Attempt{maxAttempts > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </CardContent>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 dark:bg-amber-950/20">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <AlertTriangle className="size-4 text-amber-500" /> Full Screen
            Security Notice
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Clicking <strong>Start Assessment</strong> will launch the quiz in
            full screen mode.
            <strong> Do not exit full screen mode</strong> until you submit your
            quiz. Exiting full screen will immediately terminate your
            assessment.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            size="lg"
            onClick={handleStartQuiz}
            disabled={isStarting}
            className="px-8 font-bold"
          >
            {isStarting ? "Getting quiz data..." : "Start Assessment"}
          </Button>
        </div>
      </Card>
    </section>
  )
}

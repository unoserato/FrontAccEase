import { useMemo, useState, useEffect, useCallback } from "react"
import { Model } from "survey-core"
import { Survey } from "survey-react-ui"
import "survey-core/survey-core.min.css"
import { resolveSurveyTheme } from "@/features/shared/surveyModel"
import {
  AlertCircle,
  Award,
  CheckCircle2,
  Edit3,
  FileQuestion,
  Loader2,
  RefreshCw,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/toast"
import { useSubmitCoreAssessment } from "@/services/tanstack/materials"
import type {
  CoreModuleAssessmentActivity,
  QuizJson,
} from "@/const/props/materialProps"

interface CoreModuleAssessmentViewProps {
  activity: CoreModuleAssessmentActivity
  principleLabel: string
}

interface SubmissionResponse {
  score?: number
  passed?: boolean
  attempt_number?: number
  attempt_count?: number
  message?: string
  [key: string]: unknown
}

export default function CoreModuleAssessmentView({
  activity,
  principleLabel,
}: CoreModuleAssessmentViewProps) {
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [lastSubmittedAnswers, setLastSubmittedAnswers] = useState<Record<string, unknown> | null>(null)

  const { mutate: submitAssessment, isPending: isSubmitting } =
    useSubmitCoreAssessment(activity.id)

  const surveyModel = useMemo(() => {
    if (!activity.questions) return null
    try {
      const questionsData =
        typeof activity.questions === "string"
          ? JSON.parse(activity.questions)
          : activity.questions
      const model = new Model(questionsData)
      const theme = resolveSurveyTheme("Default")
      if (theme) {
        model.applyTheme(theme)
      }
      return model
    } catch {
      return null
    }
  }, [activity.questions])

  const questionCount = useMemo(() => {
    if (!activity.questions) return 0
    try {
      const questionsObj =
        typeof activity.questions === "string"
          ? (JSON.parse(activity.questions) as QuizJson)
          : (activity.questions as QuizJson)
      if (!questionsObj?.pages) return 0
      return questionsObj.pages.reduce(
        (total, page) => total + (page.elements?.length || 0),
        0
      )
    } catch {
      return 0
    }
  }, [activity.questions])

  const doSubmit = useCallback(
    (answersToSubmit: Record<string, unknown>) => {
      setSubmissionError(null)
      submitAssessment(
        { activityId: activity.id, answers: answersToSubmit },
        {
          onSuccess: (res: unknown) => {
            const data = res as SubmissionResponse
            setSubmissionResult(data)
            setSubmissionError(null)
            toast.add({
              title: "Assessment Submitted",
              description: data?.passed
                ? `Passed with ${data?.score ?? 100}%!`
                : `Score: ${data?.score ?? 0}%. Review your progress.`,
            })
          },
          onError: (err: unknown) => {
            const error = err as {
              response?: { data?: { detail?: string | Array<{ msg?: string }> } }
              message?: string
            }
            const detail = error?.response?.data?.detail
            const detailMsg =
              typeof detail === "string"
                ? detail
                : Array.isArray(detail)
                  ? detail.map((d) => d?.msg || JSON.stringify(d)).join(", ")
                  : error?.message || "Failed to submit assessment answers. Please try again."

            setSubmissionError(detailMsg)
            toast.add({
              title: "Submission Error",
              description: detailMsg,
            })
          },
        }
      )
    },
    [activity.id, submitAssessment]
  )

  // Attach completion listener to SurveyJS model
  useEffect(() => {
    if (!surveyModel) return

    const handleComplete = (sender: Model) => {
      const answers = (sender.data as Record<string, unknown>) || {}
      setLastSubmittedAnswers(answers)
      doSubmit(answers)
    }

    surveyModel.onComplete.add(handleComplete)
    return () => {
      surveyModel.onComplete.remove(handleComplete)
    }
  }, [surveyModel, doSubmit])

  const handleResubmit = () => {
    const answersToSubmit =
      lastSubmittedAnswers ||
      (surveyModel?.data as Record<string, unknown>) ||
      {}
    doSubmit(answersToSubmit)
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleEditAnswers = () => {
    setSubmissionError(null)
    if (surveyModel) {
      surveyModel.restart()
      if (lastSubmittedAnswers) {
        surveyModel.mergeData(lastSubmittedAnswers)
      }
    }
  }

  const handleRetake = () => {
    setSubmissionResult(null)
    setSubmissionError(null)
    setLastSubmittedAnswers(null)
    if (surveyModel) {
      surveyModel.clear()
      surveyModel.restart()
    }
  }

  const kindLabel =
    activity.kind === "mini"
      ? "Mini-Assessment"
      : activity.kind === "pre"
        ? "Pre-Assessment"
        : activity.kind === "post"
          ? "Post-Assessment"
          : "Assessment"

  return (
    <div className="space-y-6">
      {/* Header matching image 1 */}
      <header className="space-y-4 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs font-semibold">
            {principleLabel}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1 text-xs">
            <FileQuestion className="size-3" />
            {kindLabel}
          </Badge>
          {activity.required && (
            <Badge variant="default" className="text-xs">
              Required
            </Badge>
          )}
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {activity.title}
        </h1>

        {/* Stats Grid matching image 1 */}
        <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3">
          <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
            <span className="text-xs font-medium text-muted-foreground">
              Passing Score
            </span>
            <p className="mt-1 flex items-center gap-1 text-base font-bold text-foreground sm:text-lg">
              <Award className="size-4 text-primary" />
              {activity.passing_percent}%
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
            <span className="text-xs font-medium text-muted-foreground">
              Attempts
            </span>
            <p className="mt-1 flex items-center gap-1 text-base font-bold text-foreground sm:text-lg">
              <Sparkles className="size-4 text-primary" />
              {activity.attempt_count ?? 0} / {activity.max_attempts}
            </p>
          </div>
          <div className="col-span-2 rounded-lg border border-border/70 bg-muted/20 p-3 sm:col-span-1">
            <span className="text-xs font-medium text-muted-foreground">
              Total Questions
            </span>
            <p className="mt-1 text-base font-bold text-foreground sm:text-lg">
              {questionCount}
            </p>
          </div>
        </div>
      </header>

      {/* Submission Result Feedback Banner */}
      {submissionResult && (
        <Card className="animate-in fade-in border-border/80 p-5 shadow-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              {submissionResult.passed ? (
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-6" />
                </div>
              ) : (
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <XCircle className="size-6" />
                </div>
              )}
              <div>
                <h3 className="text-base font-bold text-foreground">
                  {submissionResult.passed ? "Assessment Passed!" : "Assessment Needs Work"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Score:{" "}
                  <strong className="text-foreground">
                    {submissionResult.score ?? 0}%
                  </strong>{" "}
                  (Requirement: {activity.passing_percent}%)
                  {submissionResult.message && ` · ${submissionResult.message}`}
                </p>
              </div>
            </div>

            {(activity.attempt_count ?? 0) < activity.max_attempts && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetake}
                className="gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                Retake Assessment
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Submission Error Backup Display */}
      {submissionError && !submissionResult && (
        <Card className="animate-in fade-in border-destructive/40 bg-destructive/5 p-5 shadow-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle className="size-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-destructive">
                  Submission Did Not Go Through
                </h3>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {submissionError}
                </p>
                <p className="text-xs text-muted-foreground">
                  Your answers have been preserved. You can re-submit your response, edit your answers, or refresh the activity.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <Button
                variant="default"
                size="sm"
                disabled={isSubmitting}
                onClick={handleResubmit}
                className="gap-1.5 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <RotateCcw className="size-3.5" />
                    Re-submit
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="gap-1.5 cursor-pointer"
              >
                <RefreshCw className="size-3.5" />
                Refresh
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleEditAnswers}
                className="gap-1.5 cursor-pointer"
              >
                <Edit3 className="size-3.5" />
                Edit Answers
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRetake}
                className="gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground"
              >
                Retake
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Survey Assessment Area */}
      {isSubmitting ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="mt-4 text-sm font-medium text-foreground">
            Evaluating answers and recording score...
          </p>
        </div>
      ) : surveyModel ? (
        <div className="pt-2">
          <Survey model={surveyModel} />
        </div>
      ) : (
        <div className="py-8 text-center text-sm text-muted-foreground">
          No questions available for this assessment.
        </div>
      )}
    </div>
  )
}

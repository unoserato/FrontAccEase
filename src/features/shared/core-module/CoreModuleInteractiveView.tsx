import { useState } from "react"
import {
  AlertCircle,
  Check,
  CheckCircle2,
  HelpCircle,
  Loader2,
  RefreshCw,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { useAnswerCoreInteractive } from "@/services/tanstack/materials"
import type { CoreModuleInteractiveActivity } from "@/const/props/moduleProps"

interface CoreModuleInteractiveViewProps {
  activity: CoreModuleInteractiveActivity
  principleLabel: string
}

interface InteractiveAnswerResponse {
  passed?: boolean
  correct?: boolean
  is_correct?: boolean
  score?: number
  explanation?: string
  correct_answer?: string
  message?: string
  [key: string]: unknown
}

export default function CoreModuleInteractiveView({
  activity,
  principleLabel,
}: CoreModuleInteractiveViewProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [answerResult, setAnswerResult] =
    useState<InteractiveAnswerResponse | null>(null)
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const { mutate: submitAnswer, isPending: isSubmitting } =
    useAnswerCoreInteractive(activity.id)

  const handleSubmit = () => {
    if (selectedChoice === null || isSubmitting) return
    setSubmissionError(null)

    submitAnswer(
      { activityId: activity.id, choice: selectedChoice },
      {
        onSuccess: (data: unknown) => {
          const res = data as InteractiveAnswerResponse
          setAnswerResult(res)
          setSubmissionError(null)
          const isPassed = Boolean(
            res?.passed ?? res?.correct ?? res?.is_correct
          )
          toast.add({
            title: isPassed ? "Correct Solution!" : "Incorrect Solution",
            description:
              res?.explanation ||
              res?.message ||
              (isPassed
                ? "Your selection satisfies WCAG criteria!"
                : "Review the accessibility guidance below."),
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
                : error?.message ||
                  "Failed to submit scenario answer. Please try again."

          setSubmissionError(detailMsg)
          toast.add({
            title: "Submission Error",
            description: detailMsg,
          })
        },
      }
    )
  }

  const handleReset = () => {
    setSelectedChoice(null)
    setAnswerResult(null)
    setSubmissionError(null)
  }

  const scenario = activity.scenario
  const isPassed = Boolean(
    answerResult?.passed ?? answerResult?.correct ?? answerResult?.is_correct
  )

  return (
    <div className="space-y-6">
      {/* Header matching image 2 */}
      <header className="space-y-4 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs font-semibold">
            {principleLabel}
          </Badge>
          <Badge
            variant="secondary"
            className="flex items-center gap-1 text-xs"
          >
            <Sparkles className="size-3 text-primary" />
            Interactive Scenario
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

        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Analyze the scenario below and select the most appropriate
          accessibility remediation to satisfy WCAG criteria.
        </p>
      </header>

      {/* Scenario Challenge Box matching image 2 */}
      <div className="space-y-3 rounded-xl border border-border/80 bg-muted/30 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
          <HelpCircle className="size-4 text-primary" />
          Scenario Challenge
        </div>
        <p className="text-base leading-relaxed font-medium text-foreground sm:text-lg">
          {scenario.prompt}
        </p>
      </div>

      {/* Scenario Choices matching image 2 */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold tracking-wide text-foreground">
          Select the best solution:
        </h2>
        <div
          role="radiogroup"
          aria-label="Scenario options"
          className="grid grid-cols-1 gap-3"
        >
          {scenario.choices.map((choice, index) => {
            const isSelected = selectedChoice === choice.value
            const optionLetter = String.fromCharCode(65 + index)

            let borderColor =
              "border-border/70 bg-card hover:border-border hover:bg-muted/40"
            if (isSelected) {
              borderColor =
                "border-primary bg-primary/5 shadow-xs ring-1 ring-primary"
            }

            return (
              <button
                key={choice.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={isSubmitting}
                onClick={() => {
                  setSelectedChoice(choice.value)
                  if (answerResult) setAnswerResult(null)
                  if (submissionError) setSubmissionError(null)
                }}
                className={`group flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 text-left transition-all duration-150 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:opacity-60 ${borderColor}`}
              >
                <div
                  className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-muted/50 text-muted-foreground group-hover:border-foreground/30 group-hover:text-foreground"
                  }`}
                >
                  {isSelected ? (
                    <Check className="size-3.5 stroke-2" />
                  ) : (
                    optionLetter
                  )}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <span
                    className={`text-sm leading-snug sm:text-base ${
                      isSelected
                        ? "font-semibold text-foreground"
                        : "font-normal text-foreground/90"
                    }`}
                  >
                    {choice.label}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSubmit}
              disabled={selectedChoice === null || isSubmitting}
              className="cursor-pointer gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {isSubmitting ? "Checking..." : "Check Solution"}
            </Button>
            {selectedChoice !== null && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                disabled={isSubmitting}
                className="cursor-pointer gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3.5" />
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Submission Error Backup Display */}
        {submissionError && (
          <div className="animate-in rounded-xl border border-destructive/40 bg-destructive/5 p-4 fade-in sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
                <div className="space-y-0.5">
                  <h3 className="text-sm font-semibold text-destructive">
                    Submission Did Not Go Through
                  </h3>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    {submissionError}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your choice is preserved. You can re-submit now or refresh
                    the activity.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <Button
                  size="sm"
                  variant="default"
                  disabled={isSubmitting || selectedChoice === null}
                  onClick={handleSubmit}
                  className="cursor-pointer gap-1.5"
                >
                  {isSubmitting ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <RotateCcw className="size-3.5" />
                  )}
                  Re-submit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="cursor-pointer gap-1.5"
                >
                  <RefreshCw className="size-3.5" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Feedback / Result Banner */}
        {answerResult && selectedChoice !== null && (
          <div
            className={`animate-in rounded-xl border p-4 transition-all fade-in sm:p-5 ${
              isPassed
                ? "border-emerald-500/30 bg-emerald-500/5 text-foreground"
                : "border-amber-500/30 bg-amber-500/5 text-foreground"
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              {isPassed ? (
                <>
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Correct Solution!
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="size-4 text-amber-500" />
                  <span className="text-amber-600 dark:text-amber-400">
                    Review Guidance
                  </span>
                </>
              )}
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              You chose:{" "}
              <strong className="text-foreground">
                &ldquo;
                {
                  scenario.choices.find((c) => c.value === selectedChoice)
                    ?.label
                }
                &rdquo;
              </strong>
              .
              {answerResult.explanation
                ? ` ${answerResult.explanation}`
                : scenario.explanation
                  ? ` ${scenario.explanation}`
                  : " Audio description identifying visual menu choices or on-screen actions is essential when missing from spoken dialogue (WCAG 1.2)."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

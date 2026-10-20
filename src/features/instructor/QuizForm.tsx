import { useMemo } from "react"
import type { Model } from "survey-core"
import { Survey } from "survey-react-ui"
import "survey-core/survey-core.min.css"
import type { QuizProps } from "@/const/props/quizProps"
import { createQuizModel } from "@/features/shared/surveyModel"

interface QuizFormProps {
  quiz: QuizProps
  themePreset?: string
  onComplete?: (sender: Model) => void
  readOnly?: boolean
  answers?: Record<string, unknown>
  correctAnswers?: Record<string, unknown>
  className?: string
}

export default function QuizForm({
  quiz,
  themePreset,
  onComplete,
  readOnly = false,
  answers,
  correctAnswers,
  className,
}: QuizFormProps) {
  const surveyModel = useMemo(() => {
    try {
      const model = createQuizModel(quiz, { themePreset, readOnly })
      if (readOnly) {
        model.mode = "display"
        model.questionsOnPageMode = "singlePage"
        model.maxTimeToFinish = 0
        model.showNavigationButtons = "none"
        model.showTimerPanel = "none"
        model.showProgressBar = "off"

        if (answers) {
          model.data = { ...answers }
          for (const question of model.getAllQuestions()) {
            if (Object.hasOwn(answers, question.name)) {
              model.setValue(question.name, answers[question.name])
            } else {
              const norm = question.name
                .replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase()
              const matchedKey = Object.keys(answers).find(
                (k) =>
                  k.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() === norm
              )
              if (matchedKey && answers[matchedKey] !== undefined) {
                model.setValue(question.name, answers[matchedKey])
              }
            }
          }
        }

        if (correctAnswers) {
          for (const question of model.getAllQuestions()) {
            let correctVal = correctAnswers[question.name]
            if (correctVal === undefined) {
              const norm = question.name
                .replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase()
              const matchedKey = Object.keys(correctAnswers).find(
                (k) =>
                  k.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() === norm
              )
              if (matchedKey) {
                correctVal = correctAnswers[matchedKey]
              }
            }
            if (correctVal !== undefined) {
              question.correctAnswer = correctVal
            }
          }
        }
      }
      if (onComplete) {
        model.onComplete.add(onComplete)
      }
      return model
    } catch (err) {
      console.error("Failed to build SurveyJS preview model:", err)
      return createQuizModel({ id: "preview-error", name: "" } as QuizProps, {
        readOnly: true,
      })
    }
  }, [quiz, themePreset, readOnly, onComplete, answers, correctAnswers])

  return (
    <div className={className}>
      <Survey model={surveyModel} />
    </div>
  )
}

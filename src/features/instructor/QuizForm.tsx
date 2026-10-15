import { useMemo } from "react"
import type { Model } from "survey-core"
import { Survey } from "survey-react-ui"
import "survey-core/survey-core.min.css"
import type { QuizProps } from "@/const/props/materialProps"
import { createQuizModel } from "@/features/shared/surveyModel"

interface QuizFormProps {
  quiz: QuizProps
  themePreset?: string
  onComplete?: (sender: Model) => void
  readOnly?: boolean
  className?: string
}

export default function QuizForm({
  quiz,
  themePreset,
  onComplete,
  readOnly = false,
  className,
}: QuizFormProps) {
  const surveyModel = useMemo(() => {
    try {
      const model = createQuizModel(quiz, { themePreset, readOnly })
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
  }, [quiz, themePreset, readOnly, onComplete])

  return (
    <div className={className}>
      <Survey model={surveyModel} />
    </div>
  )
}

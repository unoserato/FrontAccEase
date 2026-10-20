import { useMemo } from "react"
import type { Model } from "survey-core"
import { Survey } from "survey-react-ui"
import "survey-core/survey-core.min.css"
import type { QuizProps } from "@/const/props/quizProps"
import { createQuizModel } from "@/features/shared/surveyModel"
import {
  clearQuizProgressByKey,
  getQuizProgressKey,
} from "@/features/learner/quizProgress"

interface QuizTakerProps {
  quiz: QuizProps
  /** Overrides the theme preset stored on the quiz. */
  themePreset?: string
  onComplete?: (sender: Model) => void
  doSubmit?: (sender: Model) => void
  className?: string
  /** Resume an in-progress attempt from localStorage. Defaults to true. */
  persistProgress?: boolean
  /** Overrides the localStorage key used to resume an attempt. */
  storageKey?: string
}

/**
 * Learner-only quiz runner.
 *
 * Owns everything that is specific to a student sitting an assessment:
 * resuming and persisting partial answers across reloads, clearing progress
 * when an attempt is voided, and reporting completion back to the attempt
 * orchestration layer (fullscreen/proctoring lives in `LearnerQuizView`).
 *
 * Instructors never use this — they author quizzes in `QuizEditor` and preview
 * them with `@/features/instructor/QuizForm`.
 */
export default function QuizTaker({
  quiz,
  themePreset,
  onComplete,
  doSubmit,
  className,
  persistProgress = true,
  storageKey,
}: QuizTakerProps) {
  const surveyModel = useMemo(() => {
    try {
      const model = createQuizModel(quiz, { themePreset })

      if (persistProgress && typeof window !== "undefined") {
        const key = storageKey || getQuizProgressKey(quiz!.id)

        try {
          const savedRaw = localStorage.getItem(key)
          if (savedRaw) {
            const saved = JSON.parse(savedRaw)
            if (saved.data && typeof saved.data === "object") {
              model.data = saved.data
            }
            if (
              typeof saved.currentPageNo === "number" &&
              saved.currentPageNo >= 0
            ) {
              model.currentPageNo = saved.currentPageNo
            }
          }
        } catch (err) {
          console.warn(
            "Could not restore quiz progress from localStorage:",
            err
          )
        }

        const saveProgress = () => {
          try {
            const payload = {
              data: model.data,
              currentPageNo: model.currentPageNo,
              updatedAt: new Date().toISOString(),
            }
            localStorage.setItem(key, JSON.stringify(payload))
          } catch (err) {
            console.warn("Could not save quiz progress to localStorage:", err)
          }
        }

        model.onValueChanged.add(saveProgress)
        model.onCurrentPageChanged.add(saveProgress)
        model.onComplete.add(() => {
          clearQuizProgressByKey(key)
        })
      }

      if (onComplete) {
        model.onComplete.add(onComplete)
      }

      if (doSubmit) {
        model.onComplete.add(doSubmit)
      }

      return model
    } catch (err) {
      console.error("Failed to build SurveyJS quiz model:", err)
      return createQuizModel({ id: "quiz-error", name: "" } as QuizProps)
    }
  }, [quiz, themePreset, onComplete, persistProgress, storageKey, doSubmit])

  // useEffect(() => {
  //   doSubmit?.(() => surveyModel.tryComplete())
  // }, [surveyModel, doSubmit])

  return (
    <div className={className}>
      <Survey model={surveyModel} />
    </div>
  )
}

import type { QuizProps } from "@/const/materialsProps"
import { useMemo } from "react"
import { Model } from "survey-core"
import { Survey } from "survey-react-ui"
import "survey-core/survey-core.min.css"
import {
  DefaultLight,
  DefaultDark,
  FlatLight,
  FlatDark,
  PlainLight,
  PlainDark,
  SoftLight,
  SoftDark,
  ContrastLight,
  ContrastDark,
  BorderlessLight,
  BorderlessDark,
  ThreeDimensionalLight,
  ThreeDimensionalDark,
} from "survey-core/themes"

const SURVEY_THEMES_MAP: Record<string, any> = {
  DefaultLight,
  DefaultDark,
  FlatLight,
  FlatDark,
  PlainLight,
  PlainDark,
  SoftLight,
  SoftDark,
  ContrastLight,
  ContrastDark,
  BorderlessLight,
  BorderlessDark,
  ThreeDimensionalLight,
  ThreeDimensionalDark,
  Default: DefaultLight,
  Flat: FlatLight,
  Plain: PlainLight,
  Soft: SoftLight,
  Contrast: ContrastLight,
  Borderless: BorderlessLight,
  "3D": ThreeDimensionalLight,
}

function getQuizStorageKey(quizId: string) {
  return `frontaccease_quiz_progress_${quizId}`
}

export function clearQuizProgress(quizId: string) {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(getQuizStorageKey(quizId))
    } catch (err) {
      console.warn("Failed to clear quiz progress:", err)
    }
  }
}

interface QuizFormProps {
  quiz: QuizProps
  themePreset?: string
  onComplete?: (sender: Model) => void
  readOnly?: boolean
  className?: string
  enableLocalStorage?: boolean
  storageKey?: string
}

export default function QuizForm({
  quiz,
  themePreset,
  onComplete,
  readOnly = false,
  className,
  enableLocalStorage = false,
  storageKey,
}: QuizFormProps) {
  const surveyModel = useMemo(() => {
    try {
      let rawContent: any = {}
      const targetContent = quiz.quizContent || quiz.content
      if (typeof targetContent === "object" && targetContent !== null) {
        rawContent = targetContent
      } else if (typeof targetContent === "string") {
        try {
          rawContent = JSON.parse(targetContent)
        } catch {
          rawContent = { title: quiz.name }
        }
      } else {
        rawContent = { title: quiz.name }
      }

      const isProgressBarEnabled =
        rawContent.showProgressBar === true ||
        rawContent.showProgressBar === "top" ||
        rawContent.showProgressBar === "bottom" ||
        rawContent.showProgressBar === "both" ||
        rawContent.showProgressBar === "belowHeader"

      const progressBarValue = isProgressBarEnabled
        ? typeof rawContent.showProgressBar === "string" &&
          rawContent.showProgressBar !== "off"
          ? rawContent.showProgressBar
          : "top"
        : "off"

      const progressBarTypeVal = rawContent.progressBarType || "questions"

      const timeLimitInMinutes =
        rawContent.timeLimit ?? (quiz.quizContent as any)?.timeLimit

      const modelJson = {
        title: quiz.name,
        ...rawContent,
        showProgressBar: progressBarValue,
        progressBarType: progressBarTypeVal,
        ...(typeof timeLimitInMinutes === "number" && timeLimitInMinutes > 0
          ? { maxTimeToFinish: timeLimitInMinutes * 60 }
          : {}),
      }

      const model = new Model(modelJson)

      model.showProgressBar = progressBarValue
      model.progressBarType = progressBarTypeVal

      if (typeof timeLimitInMinutes === "number" && timeLimitInMinutes > 0) {
        model.maxTimeToFinish = timeLimitInMinutes * 60
      }

      if (rawContent.showQuestionNumbers !== undefined) {
        if (typeof rawContent.showQuestionNumbers === "boolean") {
          model.showQuestionNumbers = rawContent.showQuestionNumbers
            ? "on"
            : "off"
        } else if (typeof rawContent.showQuestionNumbers === "string") {
          model.showQuestionNumbers = rawContent.showQuestionNumbers
        }
      }

      if (readOnly) {
        model.mode = "display"
      }

      // Restore and save progress in localStorage for learners only
      const key = storageKey || getQuizStorageKey(quiz.id)

      if (enableLocalStorage && typeof window !== "undefined" && !readOnly) {
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
          try {
            localStorage.removeItem(key)
          } catch {
            // ignore
          }
        })
      }

      if (onComplete) {
        model.onComplete.add(onComplete)
      }

      const rawPreset = (themePreset || quiz.theme || "Default").trim()
      const matchedKey =
        Object.keys(SURVEY_THEMES_MAP).find(
          (k) => k.toLowerCase() === rawPreset.toLowerCase()
        ) || "Default"

      const selectedThemeObj = SURVEY_THEMES_MAP[matchedKey] || DefaultLight
      model.applyTheme(selectedThemeObj)

      return model
    } catch (err) {
      console.error("Failed to parse SurveyJS Model:", err)
      return new Model({})
    }
  }, [quiz, themePreset, readOnly, onComplete, enableLocalStorage, storageKey])

  return (
    <div className={className}>
      <Survey model={surveyModel} />
    </div>
  )
}

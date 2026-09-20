import type { QuizProps } from "@/const/materialsProps"
import { useMemo } from "react"
import { Model } from "survey-core"
import { Survey } from "survey-react-ui"
import "survey-core/survey-core.min.css"
import { useTheme } from "@/components/theme-provider"
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

const SURVEY_THEMES_MAP: Record<string, { light: any; dark: any }> = {
  Default: { light: DefaultLight, dark: DefaultDark },
  Flat: { light: FlatLight, dark: FlatDark },
  Plain: { light: PlainLight, dark: PlainDark },
  Soft: { light: SoftLight, dark: SoftDark },
  Contrast: { light: ContrastLight, dark: ContrastDark },
  Borderless: { light: BorderlessLight, dark: BorderlessDark },
  "3D": { light: ThreeDimensionalLight, dark: ThreeDimensionalDark },
}

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
  const { theme: appTheme } = useTheme()

  const isDark =
    appTheme === "dark" ||
    (appTheme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  const activeMode = isDark ? "dark" : "light"

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

      const modelJson = {
        title: quiz.name,
        ...rawContent,
        showProgressBar: progressBarValue,
        progressBarType: progressBarTypeVal,
        ...(quiz.time_limit && quiz.time_limit > 0
          ? { maxTimeToFinish: quiz.time_limit * 60 }
          : {}),
      }

      const model = new Model(modelJson)

      model.showProgressBar = progressBarValue
      model.progressBarType = progressBarTypeVal

      if (rawContent.showQuestionNumbers !== undefined) {
        if (typeof rawContent.showQuestionNumbers === "boolean") {
          model.showQuestionNumbers = rawContent.showQuestionNumbers ? "on" : "off"
        } else if (typeof rawContent.showQuestionNumbers === "string") {
          model.showQuestionNumbers = rawContent.showQuestionNumbers
        }
      }

      if (readOnly) {
        model.mode = "display"
      }

      if (onComplete) {
        model.onComplete.add(onComplete)
      }

      const activeThemePreset = themePreset || quiz.theme || "Default"
      const themePair =
        SURVEY_THEMES_MAP[activeThemePreset] || SURVEY_THEMES_MAP.Default
      const selectedThemeObj = themePair[activeMode] || themePair.light
      model.applyTheme(selectedThemeObj)

      return model
    } catch (err) {
      console.error("Failed to parse SurveyJS Model:", err)
      return new Model({})
    }
  }, [quiz, themePreset, activeMode, readOnly, onComplete])

  return (
    <div className={className}>
      <Survey model={surveyModel} />
    </div>
  )
}

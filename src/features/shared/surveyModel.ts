import { Model } from "survey-core"
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
import type { QuizProps } from "@/const/props/materialProps"

type SurveyQuiz = Pick<QuizProps, "name" | "theme"> & {
  quiz_json?: unknown
  quizContent?: unknown
  content?: unknown
}

/**
 * SurveyJS theme presets exposed in the instructor editor, mapped to the
 * SurveyJS theme objects. The learner never picks a theme directly — it simply
 * inherits the preset stored on the quiz.
 */
export const SURVEY_THEMES_MAP: Record<string, any> = {
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

export function resolveSurveyTheme(preset?: string | null): any {
  const rawPreset = (preset || "Default").trim()
  const matchedKey =
    Object.keys(SURVEY_THEMES_MAP).find(
      (k) => k.toLowerCase() === rawPreset.toLowerCase()
    ) || "Default"

  return SURVEY_THEMES_MAP[matchedKey] || DefaultLight
}

/**
 * Normalizes the many shapes a quiz payload can arrive in (raw object, JSON
 * string, or missing entirely) into the object shape SurveyJS expects.
 */
export function resolveQuizContent(quiz: SurveyQuiz): Record<string, any> {
  const targetContent = quiz.quiz_json ?? quiz.quizContent ?? quiz.content

  if (typeof targetContent === "object" && targetContent !== null) {
    return targetContent
  }

  if (typeof targetContent === "string") {
    try {
      const parsed = JSON.parse(targetContent)
      if (parsed && typeof parsed === "object") return parsed
    } catch {
      // Fall through to the title-only stub below.
    }
  }

  return { title: quiz.name }
}

export interface CreateQuizModelOptions {
  /** Overrides the theme preset stored on the quiz (used by instructor previews). */
  themePreset?: string
  /** Renders the survey in SurveyJS "display" mode instead of an interactive one. */
  readOnly?: boolean
}

/**
 * Builds the role-agnostic SurveyJS model for a quiz. This is the only piece of
 * quiz machinery genuinely shared between the instructor (preview/editor) and
 * the learner (attempt) flows — everything role-specific (progress persistence,
 * proctoring, authoring mutations) lives in the respective feature folders.
 */
export function createQuizModel(
  quiz: SurveyQuiz,
  { themePreset, readOnly = false }: CreateQuizModelOptions = {}
): Model {
  const rawContent = resolveQuizContent(quiz)

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

  const timeLimitInMinutes = rawContent.timeLimit

  const hasTimeLimit =
    typeof timeLimitInMinutes === "number" && timeLimitInMinutes > 0

  const model = new Model({
    title: quiz.name,
    ...rawContent,
    showProgressBar: progressBarValue,
    progressBarType: progressBarTypeVal,
    ...(hasTimeLimit ? { maxTimeToFinish: timeLimitInMinutes * 60 } : {}),
  })

  model.showProgressBar = progressBarValue
  model.progressBarType = progressBarTypeVal

  if (hasTimeLimit) {
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

  model.applyTheme(resolveSurveyTheme(themePreset || quiz.theme))

  return model
}

import type { QuizJson, QuizProps } from "@/const/props/materialProps"

export type {
  QuestionType,
  QuestionElement,
  QuizPage,
  QuizJson,
} from "@/const/props/materialProps"

/**
 * Role-agnostic quiz scaffolding and read-only queries. Authoring mutations
 * live in `@/features/instructor/quizHelper`; learners should only ever import
 * from here.
 */
export const DEFAULT_QUIZ_JSON: QuizJson = {
  title: "New Quiz Assessment",
  description: "Objective evaluation on web accessibility and compliance.",
  showQuestionNumbers: "on",
  showProgressBar: true,
  progressBarLocation: "top",
  progressBarType: "questions",
  progressBarShowPageNumbers: true,
  progressBarShowNavigationText: true,
  completedHtml:
    "<div class='text-center p-6 space-y-3'><h3 class='text-xl font-bold'>Quiz Complete!</h3><p class='text-base'>You can view your score in the dashboard.</p></div>",
  pages: [
    {
      name: "page1",
      title: "Section 1: General Knowledge",
      elements: [
        {
          type: "radiogroup",
          name: "q_1",
          title: "What does WCAG stand for?",
          choices: [
            "Web Content Accessibility Guidelines",
            "World Code Accessibility Standards",
            "Web Compliance and Guidance",
            "Web Consortium Accessibility Group",
          ],
          correctAnswer: "Web Content Accessibility Guidelines",
          isRequired: true,
          points: 1,
        },
      ],
    },
  ],
}

/**
 * Normalizes a stored quiz record into a usable QuizJson. Accepts the raw
 * object or a JSON string, and always returns a shape with `pages`.
 */
export function getQuizJson(
  quiz?: {
    name?: string
    quiz_json?: QuizJson | string
    content?: any
    quizContent?: QuizJson
  } | null
): QuizJson {
  if (!quiz) return DEFAULT_QUIZ_JSON
  const targetContent = quiz.quiz_json ?? quiz.quizContent ?? quiz.content
  if (
    targetContent &&
    typeof targetContent === "object" &&
    "pages" in targetContent
  ) {
    return targetContent as QuizJson
  }
  if (typeof targetContent === "string") {
    try {
      const parsed = JSON.parse(targetContent)
      if (parsed && typeof parsed === "object" && "pages" in parsed) {
        return parsed as QuizJson
      }
    } catch {
      // Ignore fallback on invalid json
    }
  }
  return {
    ...DEFAULT_QUIZ_JSON,
    title: quiz.name || DEFAULT_QUIZ_JSON.title,
  }
}

export function getQuizTotalQuestions(
  quizOrJson?: QuizProps | QuizJson | null
): number {
  if (!quizOrJson) return 0
  const json = getQuizJson(quizOrJson as any)
  if (!json || !json.pages) return 0
  return json.pages.reduce((acc, page) => acc + (page.elements?.length || 0), 0)
}

export function getQuizTotalPoints(
  quizOrJson?: QuizProps | QuizJson | null
): number {
  if (!quizOrJson) return 0
  const json = "pages" in quizOrJson ? quizOrJson : getQuizJson(quizOrJson)
  return json.pages.reduce(
    (total, page) =>
      total + page.elements.reduce((pageTotal, question) => pageTotal + (question.points ?? 0), 0),
    0
  )
}

import type {
  QuestionType,
  QuestionElement,
  QuizPage,
  QuizJson,
} from "@/const/props/quizProps"

// Scaffolding and read-only queries are role-agnostic and live in shared.
export {
  DEFAULT_QUIZ_JSON,
  getQuizJson,
  getQuizTotalQuestions,
  getQuizTotalPoints,
} from "@/features/shared/quizHelper"

export type {
  QuestionType,
  QuestionElement,
  QuizPage,
  QuizJson,
} from "@/const/props/quizProps"

/**
 * Instructor-only authoring mutations.
 *
 * Every function here is an immutable transform over the quiz definition being
 * built in `QuizEditor`. Learners must not use these — they consume the
 * published quiz through `@/features/learner/QuizTaker`.
 */

export function addPage(quizJson: QuizJson): QuizJson {
  const newPageNum = quizJson.pages.length + 1
  const newPage: QuizPage = {
    name: `page${Date.now()}`,
    title: `Section ${newPageNum}: New Section`,
    elements: [
      {
        type: "radiogroup",
        name: `q_${Date.now()}`,
        title: `Question 1`,
        choices: ["Option 1", "Option 2"],
        correctAnswer: "Option 1",
        isRequired: true,
      },
    ],
  }
  return {
    ...quizJson,
    pages: [...quizJson.pages, newPage],
  }
}

export function deletePage(quizJson: QuizJson, pIdx: number): QuizJson {
  if (quizJson.pages.length <= 1) return quizJson
  const pages = quizJson.pages.filter((_: unknown, idx: number) => idx !== pIdx)
  return { ...quizJson, pages }
}

export function duplicatePage(quizJson: QuizJson, pIdx: number): QuizJson {
  const pageToDup = quizJson.pages[pIdx]
  if (!pageToDup) return quizJson

  const duplicatedPage: QuizPage = {
    ...pageToDup,
    name: `page_${Date.now()}`,
    title: `${pageToDup.title} (Copy)`,
    elements: pageToDup.elements.map((elem: QuestionElement) => ({
      ...elem,
      name: `q_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      choices: elem.choices ? [...elem.choices] : undefined,
    })),
  }

  const newPages = [...quizJson.pages]
  newPages.splice(pIdx + 1, 0, duplicatedPage)
  return { ...quizJson, pages: newPages }
}

export function updatePageTitle(
  quizJson: QuizJson,
  pIdx: number,
  title: string
): QuizJson {
  const pages = [...quizJson.pages]
  if (pages[pIdx]) {
    pages[pIdx] = { ...pages[pIdx], title }
  }
  return { ...quizJson, pages }
}

export function addQuestion(
  quizJson: QuizJson,
  pIdx: number,
  type: QuestionType = "radiogroup"
): QuizJson {
  const pages = [...quizJson.pages]
  const page = pages[pIdx]
  if (!page) return quizJson

  const qNum = page.elements.length + 1
  const newQuestion: QuestionElement = {
    type,
    name: `q_${Date.now()}`,
    title: `Question ${qNum}`,
    isRequired: true,
    points: 1,
  }

  if (type === "boolean") {
    newQuestion.correctAnswer = true
  } else if (type === "checkbox") {
    newQuestion.choices = ["Option 1", "Option 2"]
    newQuestion.correctAnswer = ["Option 1"]
  } else {
    newQuestion.choices = ["Option 1", "Option 2"]
    newQuestion.correctAnswer = "Option 1"
  }

  pages[pIdx] = {
    ...page,
    elements: [...page.elements, newQuestion],
  }
  return { ...quizJson, pages }
}

export function deleteQuestion(
  quizJson: QuizJson,
  pIdx: number,
  qIdx: number
): QuizJson {
  const pages = [...quizJson.pages]
  const page = pages[pIdx]
  if (!page) return quizJson

  const elements = page.elements.filter(
    (_: unknown, idx: number) => idx !== qIdx
  )
  pages[pIdx] = { ...page, elements }
  return { ...quizJson, pages }
}

export function duplicateQuestion(
  quizJson: QuizJson,
  pIdx: number,
  qIdx: number
): QuizJson {
  const pages = [...quizJson.pages]
  const page = pages[pIdx]
  const q = page?.elements[qIdx]
  if (!page || !q) return quizJson

  const duplicatedQuestion: QuestionElement = {
    ...q,
    name: `q_${Date.now()}`,
    title: `${q.title} (Copy)`,
    choices: q.choices ? [...q.choices] : undefined,
    correctAnswer: Array.isArray(q.correctAnswer)
      ? [...q.correctAnswer]
      : q.correctAnswer,
  }

  const elements = [...page.elements]
  elements.splice(qIdx + 1, 0, duplicatedQuestion)
  pages[pIdx] = { ...page, elements }
  return { ...quizJson, pages }
}

export function moveQuestion(
  quizJson: QuizJson,
  pIdx: number,
  qIdx: number,
  direction: "up" | "down"
): QuizJson {
  const pages = [...quizJson.pages]
  const page = pages[pIdx]
  if (!page) return quizJson

  const targetIdx = direction === "up" ? qIdx - 1 : qIdx + 1
  if (targetIdx < 0 || targetIdx >= page.elements.length) return quizJson

  const elements = [...page.elements]
  const temp = elements[qIdx]
  elements[qIdx] = elements[targetIdx]
  elements[targetIdx] = temp

  pages[pIdx] = { ...page, elements }
  return { ...quizJson, pages }
}

export function updateQuestion(
  quizJson: QuizJson,
  pIdx: number,
  qIdx: number,
  key: keyof QuestionElement,
  value: any
): QuizJson {
  const pages = [...quizJson.pages]
  const page = pages[pIdx]
  const q = page?.elements[qIdx]
  if (!page || !q) return quizJson

  const updatedQ = { ...q, [key]: value }

  // Handles question type switching cleanly
  if (key === "type") {
    const newType = value as QuestionType
    if (newType === "boolean") {
      delete updatedQ.choices
      updatedQ.correctAnswer = true
    } else if (newType === "checkbox") {
      updatedQ.choices =
        q.choices && q.choices.length > 0 ? q.choices : ["Option 1", "Option 2"]
      updatedQ.correctAnswer = [updatedQ.choices[0]]
    } else if (newType === "ranking") {
      updatedQ.choices =
        q.choices && q.choices.length > 0 ? q.choices : ["Item 1", "Item 2"]
      updatedQ.correctAnswer = [...updatedQ.choices]
    } else {
      updatedQ.choices =
        q.choices && q.choices.length > 0 ? q.choices : ["Option 1", "Option 2"]
      updatedQ.correctAnswer = updatedQ.choices[0]
    }
  }

  const elements = [...page.elements]
  elements[qIdx] = updatedQ
  pages[pIdx] = { ...page, elements }
  return { ...quizJson, pages }
}

export function addChoice(
  quizJson: QuizJson,
  pIdx: number,
  qIdx: number
): QuizJson {
  const pages = [...quizJson.pages]
  const page = pages[pIdx]
  const q = page?.elements[qIdx]
  if (!page || !q) return quizJson

  const currentChoices = q.choices || []
  const newChoice = `Option ${currentChoices.length + 1}`
  const updatedChoices = [...currentChoices, newChoice]

  let updatedCorrectAnswer = q.correctAnswer
  if (q.type === "ranking") {
    updatedCorrectAnswer = [
      ...(Array.isArray(q.correctAnswer) ? q.correctAnswer : []),
      newChoice,
    ]
  } else if (q.correctAnswer === undefined || q.correctAnswer === null) {
    if (q.type === "checkbox") {
      updatedCorrectAnswer = [newChoice]
    } else {
      updatedCorrectAnswer = newChoice
    }
  }

  const elements = [...page.elements]
  elements[qIdx] = {
    ...q,
    choices: updatedChoices,
    correctAnswer: updatedCorrectAnswer,
  }
  pages[pIdx] = { ...page, elements }
  return { ...quizJson, pages }
}

export function updateChoice(
  quizJson: QuizJson,
  pIdx: number,
  qIdx: number,
  cIdx: number,
  text: string
): QuizJson {
  const pages = [...quizJson.pages]
  const page = pages[pIdx]
  const q = page?.elements[qIdx]
  if (!page || !q || !q.choices) return quizJson

  const oldChoiceText = q.choices[cIdx]
  const updatedChoices = [...q.choices]
  updatedChoices[cIdx] = text

  let updatedCorrectAnswer = q.correctAnswer

  if (q.type === "checkbox" && Array.isArray(q.correctAnswer)) {
    updatedCorrectAnswer = q.correctAnswer.map((ans: string) =>
      ans === oldChoiceText ? text : ans
    )
  } else if (q.type === "ranking" && Array.isArray(q.correctAnswer)) {
    updatedCorrectAnswer = q.correctAnswer.map((ans: string) =>
      ans === oldChoiceText ? text : ans
    )
  } else if (q.correctAnswer === oldChoiceText) {
    updatedCorrectAnswer = text
  }

  const elements = [...page.elements]
  elements[qIdx] = {
    ...q,
    choices: updatedChoices,
    correctAnswer: updatedCorrectAnswer,
  }
  pages[pIdx] = { ...page, elements }
  return { ...quizJson, pages }
}

export function deleteChoice(
  quizJson: QuizJson,
  pIdx: number,
  qIdx: number,
  cIdx: number
): QuizJson {
  const pages = [...quizJson.pages]
  const page = pages[pIdx]
  const q = page?.elements[qIdx]
  if (!page || !q || !q.choices || q.choices.length <= 1) return quizJson

  const removedChoice = q.choices[cIdx]
  const updatedChoices = q.choices.filter(
    (_: unknown, idx: number) => idx !== cIdx
  )

  let updatedCorrectAnswer = q.correctAnswer

  if (q.type === "checkbox" && Array.isArray(q.correctAnswer)) {
    updatedCorrectAnswer = q.correctAnswer.filter(
      (ans: string) => ans !== removedChoice
    )
    if (updatedCorrectAnswer.length === 0 && updatedChoices.length > 0) {
      updatedCorrectAnswer = [updatedChoices[0]]
    }
  } else if (q.type === "ranking" && Array.isArray(q.correctAnswer)) {
    updatedCorrectAnswer = q.correctAnswer.filter(
      (ans: string) => ans !== removedChoice
    )
  } else if (q.correctAnswer === removedChoice) {
    updatedCorrectAnswer = updatedChoices[0] || ""
  }

  const elements = [...page.elements]
  elements[qIdx] = {
    ...q,
    choices: updatedChoices,
    correctAnswer: updatedCorrectAnswer,
  }
  pages[pIdx] = { ...page, elements }
  return { ...quizJson, pages }
}

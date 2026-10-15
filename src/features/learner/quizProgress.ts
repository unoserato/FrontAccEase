const QUIZ_PROGRESS_PREFIX = "frontaccease_quiz_progress"

export function getQuizProgressKey(quizId: string) {
  return `${QUIZ_PROGRESS_PREFIX}_${quizId}`
}

/**
 * Wipes a learner's saved in-progress attempt. Called when an attempt is
 * terminated (leaving full screen, switching windows) so a retake starts clean.
 */
export function clearQuizProgress(quizId: string) {
  if (typeof window === "undefined") return
  clearQuizProgressByKey(getQuizProgressKey(quizId))
}

export function clearQuizProgressByKey(key: string) {
  try {
    localStorage.removeItem(key)
  } catch (err) {
    console.warn("Failed to clear quiz progress:", err)
  }
}
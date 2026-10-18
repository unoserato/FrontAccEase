import type { ClassroomProps, QuizJson } from "@/const/props/materialProps"
import { api } from "@/services/axios"
import type { ExtensionScanSession } from "@/services/webLLM"

export async function createSubmissionTicket(id: string): Promise<QuizJson> {
  const response = await api.post(`/learner/pre-submit-quiz-answer/${id}`)
  return response.data.quiz_json
}

export async function updateSubmissionTicket(id: string, answer: object) {
  const response = await api.put(`/learner/submit-quiz-answer/${id}`, answer)
  return response.data
}

export async function createExtensionScanAPI(): Promise<ExtensionScanSession> {
  const response = await api.post("/accessibility/scans")
  return response.data
}

export async function arhiveModuleAPI(id: string): Promise<ClassroomProps[]> {
  const response = await api.post(`/instructor/archive-module/${id}`)
  return response.data
}

export async function unarhiveModuleAPI(id: string): Promise<ClassroomProps[]> {
  const response = await api.post(`/instructor/unarchive-module/${id}`)
  return response.data
}

export async function joinClassroomByCodeAPI(
  code: string
): Promise<ClassroomProps[]> {
  const response = await api.post(`/learner/enroll-classroom/${code}`)
  return response.data
}

export interface SubmitCoreAssessmentPayload {
  idempotency_key?: string
  answers: Record<string, unknown>
}

export async function submitCoreAssessmentActivityAPI(
  activityId: string,
  answersOrPayload: Record<string, unknown> | SubmitCoreAssessmentPayload,
  idempotencyKey?: string
) {
  const idempotency_key =
    (answersOrPayload as SubmitCoreAssessmentPayload)?.idempotency_key ||
    idempotencyKey ||
    (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0
          const v = c === "x" ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }))

  const rawAnswers =
    answersOrPayload &&
    typeof answersOrPayload === "object" &&
    "answers" in answersOrPayload
      ? (answersOrPayload as SubmitCoreAssessmentPayload).answers
      : (answersOrPayload as Record<string, unknown>)

  const payload = {
    idempotency_key,
    answers: rawAnswers,
  }

  const response = await api.post(
    `/learner/pour/activities/submit/${activityId}`,
    payload
  )
  return response.data
}

export interface AnswerCoreInteractivePayload {
  choice: string
}

export async function answerCoreInteractiveActivityAPI(
  activityId: string,
  choiceOrPayload:
    | string
    | AnswerCoreInteractivePayload
    | Record<string, unknown>
) {
  const choice =
    typeof choiceOrPayload === "string"
      ? choiceOrPayload
      : (choiceOrPayload as AnswerCoreInteractivePayload).choice ??
        (choiceOrPayload as Record<string, unknown>).answer ??
        (choiceOrPayload as Record<string, unknown>).value

  const payload: AnswerCoreInteractivePayload = {
    choice: String(choice),
  }

  const response = await api.post(
    `/learner/pour/activities/answer/${activityId}`,
    payload
  )
  return response.data
}

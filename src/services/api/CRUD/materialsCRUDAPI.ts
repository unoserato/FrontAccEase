import type { ClassroomProps } from "@/const/props/classroomProps"
import type { Result } from "@/const/props/analyzerProps"
import type { QuizJson } from "@/const/props/quizProps"
import { api } from "@/services/axios"
import type { ExtensionScanSession } from "@/services/webLLM"
import type { InstrumentProps } from "@/const/props/miscellaneousProps"

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

export async function saveAnalyzerResultAPI(
  content: Result
): Promise<{ success: boolean; data: { id: string } }> {
  const response = await api.post("/accessibility/save-result", { content })
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
    string | AnswerCoreInteractivePayload | Record<string, unknown>
) {
  const choice =
    typeof choiceOrPayload === "string"
      ? choiceOrPayload
      : ((choiceOrPayload as AnswerCoreInteractivePayload).choice ??
        (choiceOrPayload as Record<string, unknown>).answer ??
        (choiceOrPayload as Record<string, unknown>).value)

  const payload: AnswerCoreInteractivePayload = {
    choice: String(choice),
  }

  const response = await api.post(
    `/learner/pour/activities/answer/${activityId}`,
    payload
  )
  return response.data
}

export async function completeCoreActivityAPI(activityId: string) {
  const response = await api.post(
    `/learner/pour/activities/complete/${activityId}`
  )
  return response.data
}

export async function uploadImageAPI(
  file: File,
  onProgress?: (event: { progress: number }) => void,
  signal?: AbortSignal
): Promise<string> {
  console.log(file)
  const formData = new FormData()
  formData.append("image", file)

  const response = await api.post(`/helper/upload-image`, formData, {
    signal, // Axios automatically cancels the HTTP request when signal aborts
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        onProgress?.({ progress: percent })
      }
    },
  })
  return response.data.url
}

export async function startPrincipleAPI(principle: string) {
  const response = await api.post(
    `/learner/pour/principles/start/${principle.toLowerCase()}`
  )
  return response.data
}

export async function createAnalyzerCommentById(
  log_id: string,
  comment: string
) {
  const data = { comment: comment, log_id: log_id }
  const response = await api.post(`/instructor/create-analyzer-comment`, data)
  return response.data
}

export async function updateAnalyzerCommentById(
  log_id: string,
  comment: string
) {
  const data = { comment: comment, log_id: log_id }
  const response = await api.put(`/instructor/update-analyzer-comment`, data)
  return response.data
}

export async function updateWCAGInstruments(
  id: string,
  data: { principle: string; title: string; content: string }
): Promise<InstrumentProps[]> {
  const response = await api.put(`/admin/wcag-instrument/${id}`, data)
  return response.data
}

import type { QuizJson } from "@/const/props/materialProps"
import { api } from "@/services/axios"
import type { ExtensionScanSession } from "@/services/webLLM"

export async function createSubmissionTicket(id: string): Promise<QuizJson> {
  const response = await api.post(`/learner/pre-submit-quiz-answer/${id}`)
  return response.data
}

export async function updateSubmissionTicket(id: string, answer: object) {
  const response = await api.put(`/learner/submit-quiz-answer/${id}`, answer)
  return response.data
}

export async function createExtensionScanAPI(): Promise<ExtensionScanSession> {
  const response = await api.post("/accessibility/scans")
  return response.data
}

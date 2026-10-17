import type {
  AnalyzerResultItem,
  ClassroomProps,
  InstructorMaterialsProps,
  ModuleProps,
  QuizAnswer,
  QuizProps,
} from "@/const/props/materialProps"
import { api } from "@/services/axios"
import type { ExtensionScanSession, WebLLMTaskBatch } from "@/services/webLLM"
import type { QuizSubmissionProps } from "@/const/materialsProps"

export async function getInstructorMaterialsAPI(): Promise<
  InstructorMaterialsProps[]
> {
  const response = await api.get("/admin/instructor")
  return response.data
}

export async function getInstructorMaterialsClassroomsAPI(
  id: string
): Promise<ClassroomProps[]> {
  const response = await api.get(`/admin/instructor/${id}/classroom`)
  return response.data
}

export async function getInstructorMaterialsModulesAPI(
  id: string
): Promise<ModuleProps[]> {
  const response = await api.get(`/admin/instructor/${id}/module`)
  return response.data
}

export async function getModuleByIdAPI(id: string): Promise<ModuleProps> {
  const response = await api.get(`/helper/get-module-by-id/${id}`)
  return response.data
}

export async function getInstructorQuizzesAPI(): Promise<QuizProps[]> {
  const response = await api.get(`/instructor/get-all-quiz`)
  return response.data
}

export async function getQuizByIdAPI(id: string): Promise<QuizProps> {
  const response = await api.get(`/helper/get-quiz-by-id/${id}`)
  return response.data
}

export async function getQuizAnswerByIdAPI(id: string): Promise<QuizAnswer[]> {
  const response = await api.get(`/helper/get-quiz-answer-by-id/${id}`)
  return response.data
}

export async function getAnalyzerLogsByLearner(): Promise<
  AnalyzerResultItem[]
> {
  const response = await api.get(`/learner/analyzer-logs`)
  return response.data
}

export async function sitemapAPI(url: string): Promise<string[]> {
  const response = await api.post("/accessibility/sitemap", { url })
  return Array.isArray(response.data?.links) ? response.data.links : []
}

export async function webLLMTasksAPI(url: string): Promise<WebLLMTaskBatch> {
  const response = await api.post("/accessibility/webllm-tasks-url", { url })
  return response.data
}

export async function getExtensionScanAPI(
  code: string
): Promise<ExtensionScanSession> {
  const response = await api.get(`/accessibility/scans/${code}`)
  return response.data
}

export async function getQuizAnswersByIdAPI(id: string) {
  const response = await api.get(`/helper/get-quiz-answer-by-id/${id}`)
  return response.data
}

export async function getQuizSubmissionsByIdAPI(
  id: string
): Promise<QuizSubmissionProps[]> {
  const response = await api.get(`/helper/get-quiz-submission-by-quiz-id/${id}`)
  return Array.isArray(response.data)
    ? response.data
    : response.data?.submissions || response.data?.data || []
}

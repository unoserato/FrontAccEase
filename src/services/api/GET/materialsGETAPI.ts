import type {
  AdminAnalyzerLogsResponse,
  AnalyzerResultItem,
  AnalyzerSummaryProps,
  ClassroomAnalyzerLogsDetailResponse,
  ClassroomAnalyzerLogsResponse,
  WcagEvaluationProps,
} from "@/const/props/analyzerProps"
import type { ClassroomProps } from "@/const/props/classroomProps"
import type {
  InstructorMaterialsCountProps,
  InstructorMaterialsDetailProps,
} from "@/const/props/instructorProps"
import type { InstrumentProps } from "@/const/props/miscellaneousProps"
import type {
  CoreModuleActivityResponse,
  CoreModuleProgressPrincipleProps,
  CoreModuleProgressProps,
  ModuleProps,
} from "@/const/props/moduleProps"
import type {
  InstructorQuizProps,
  QuizAnswer,
  QuizProps,
  QuizSubmissionProps,
} from "@/const/props/quizProps"
import type { WCAGPrinciple } from "@/const/props/wcagProps"
import type { UserProps } from "@/const/props/userProps"
import { api } from "@/services/axios"
import type { ExtensionScanSession, WebLLMTaskBatch } from "@/services/webLLM"

export async function getInstructorMaterialsCountAPI(): Promise<
  InstructorMaterialsCountProps[]
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

export async function getInstructorQuizzesAPI(): Promise<
  InstructorQuizProps[]
> {
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

export async function getCoreModulesAPI(): Promise<CoreModuleProgressProps> {
  const response = await api.get(`/learner/pour/progress`)
  return response.data
}

export async function getCoreModulesPrincipleAPI(
  principle: WCAGPrinciple | string
): Promise<CoreModuleProgressPrincipleProps> {
  const normalized = (principle || "perceivable").toLowerCase()
  const response = await api.get(`/learner/pour/progress/${normalized}`)
  return response.data
}

export async function getCoreModuleActivitiesAPI(
  id: string
): Promise<CoreModuleActivityResponse> {
  const response = await api.get(`/learner/pour/activities/${id}`)
  return response.data
}

export async function getAnalyzerLogsSummaryByLearnerAPI(): Promise<
  AnalyzerSummaryProps[]
> {
  const response = await api.get(`/learner/analyzer-logs`)
  return response.data
}

export async function getAnalyzerResultByIdAPI(
  id: string
): Promise<AnalyzerResultItem | WcagEvaluationProps> {
  const response = await api.get(`/helper/analyzer-logs/${id}`)
  return response.data
}

export async function getWCAGInstruments(): Promise<InstrumentProps[]> {
  const response = await api.get(`/admin/wcag-instrument`)
  return response.data
}

export async function getClassroomAnalyzerLogs(): Promise<ClassroomAnalyzerLogsResponse> {
  const response = await api.get(`/instructor/classroom-analyzer-logs`)
  return response.data
}

export async function getClassroomAnalyzerLogsByClassroomId(
  classroom_id: string
): Promise<ClassroomAnalyzerLogsDetailResponse> {
  const response = await api.get(
    `/helper/classroom-analyzer-logs/${classroom_id}`
  )
  return response.data
}

export async function getCurriculumAPI() {
  const response = await api.get(`/admin/pour/curriculum`)
  return response.data
}

export async function getCurriculumContentByIdAPI() {
  const response = await api.get(`/admin/pour/curriculum`)
  return response.data
}

export async function getInstructorMaterialsByInstructorId(
  instructor_id: string
): Promise<InstructorMaterialsDetailProps> {
  const response = await api.get(`/admin/instructor-materials/${instructor_id}`)
  return response.data
}

export async function getAdminAnalyzerLogs(): Promise<AdminAnalyzerLogsResponse> {
  const response = await api.get(`/admin/all-analyzer-logs`)
  return response.data
}

export async function getAnalyzerLogsByInstructorId(
  instructor_id: string
): Promise<ClassroomAnalyzerLogsResponse> {
  const response = await api.get(
    `/admin/all-analyzer-logs/instructor/${instructor_id}`
  )
  return response.data
}

export async function getAdminAllUsers(): Promise<UserProps[]> {
  const response = await api.get(`/admin/users`)
  return response.data
}

import type { ClassroomProps, ModuleProps } from "@/const/props/materialProps"
import type { ExtensionScanSession, WebLLMTaskBatch } from "@/services/webLLM"
import { api } from "../axios"

export async function getModulesAPI(): Promise<ModuleProps[]> {
  const response = await api.get("/helper/get-all-module")
  return response.data.data
}

export async function createModuleAPI(module: {
  title: string
  principle: string
  content: object
  classroom_id: string[]
}) {
  const response = await api.post("/instructor/create-module", module)
  return response.data
}

export async function createClassroomAPI(classroom: {
  name: string
  classroom_description: string
  classroom_code: string
}) {
  const response = await api.post("/instructor/create-classroom", classroom)
  return response.data
}

export async function arhiveModuleAPI(id: string) {
  const response = await api.post(`/instructor/archive-module/${id}`)
  return response.data
}

export async function chatAPI(msg: string) {
  const response = await api.post("/chat/chat", { msg: msg })
  return response.data
}

export async function analyzerAPI(url: string | { url: string }) {
  const payload = typeof url === "string" ? { url } : url
  const response = await api.post("/accessibility/analyze", payload)
  return response.data?.data || response.data
}

export async function sitemapAPI(url: string): Promise<string[]> {
  const response = await api.post("/accessibility/sitemap", { url })
  return Array.isArray(response.data?.links) ? response.data.links : []
}

export async function webLLMTasksAPI(url: string): Promise<WebLLMTaskBatch> {
  const response = await api.post("/accessibility/webllm-tasks-url", { url })
  return response.data
}

export async function createExtensionScanAPI(): Promise<ExtensionScanSession> {
  const response = await api.post("/accessibility/scans")
  return response.data
}

export async function getExtensionScanAPI(code: string): Promise<ExtensionScanSession> {
  const response = await api.get(`/accessibility/scans/${code}`)
  return response.data
}

export async function getClassroomAPI(): Promise<ClassroomProps[]> {
  const response = await api.get("/helper/get-classroom")
  return response.data
}

export async function getEnrolledLearners(id: string) {
  const response = await api.get(`/helper/get-enrolled-learer/${id}`)
  return response.data
}

import type {
  ClassroomProps,
  ClassroomViewProps,
  ModuleProps,
} from "@/const/props/materialProps"
import { api } from "../axios"

export async function getModulesAPI(): Promise<ModuleProps[]> {
  const response = await api.get("/helper/get-all-module")
  return response.data
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

export async function chatAPI(msg: string) {
  const response = await api.post("/chat/chat", { msg: msg })
  return response.data
}

export async function analyzerAPI(url: string | { url: string }) {
  const payload = typeof url === "string" ? { url } : url
  const response = await api.post("/accessibility/analyze", payload)
  return response.data?.data || response.data
}

export async function getClassroomAPI(): Promise<ClassroomProps[]> {
  const response = await api.get("/helper/get-classroom")
  return response.data
}

export async function getEnrolledLearners(id: string) {
  const response = await api.get(`/helper/get-enrolled-learner/${id}`)
  return response.data
}

export async function getClassroomContentViewById(
  id: string
): Promise<ClassroomViewProps> {
  const response = await api.get(`/helper/get-classroom-content/${id}`)
  return response.data
}

export async function createInstructorQuizAPI(payload: any) {
  const response = await api.post(`/helper/create-quiz`, payload)
  return response.data
}

export async function udpateInstructorQuizAPI(id: string, payload: any) {
  const response = await api.put(`/helper/update-quiz/${id}`, payload)
  return response.data
}

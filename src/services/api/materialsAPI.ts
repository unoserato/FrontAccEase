import { api } from "../axios"

export async function getModulesAPI(): Promise<
  { title: string; principle: string; content: object }[]
> {
  const response = await api.get("/helper/get-all-module")
  return response.data?.data || response.data
}

export async function createModuleAPI(module: {
  title: string
  principle: string
  content: object
}) {
  const response = await api.post("/helper/create-module", module)
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

export const analyzeAPI = analyzerAPI

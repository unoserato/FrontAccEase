import type { UserProps } from "@/const/userProps"
import { api } from "../axios"

export async function meAPI(): Promise<UserProps> {
  const response = await api.get(`/auth/me`)
  return response.data
}

export async function loginAPI(credentials: {
  email: string
  password: string
}) {
  const response = await api.post(`/auth/login`, credentials)
  return response.data
}

export async function logoutAPI() {
  const response = await api.post(`/auth/logout`)
  return response.data
}

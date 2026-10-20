import type { UserProps } from "@/const/props/userProps"
import { api } from "../axios"

export async function getAllInstructorsAPI(): Promise<UserProps[]> {
  const response = await api.get("/admin/instructor")
  return response.data.user
}

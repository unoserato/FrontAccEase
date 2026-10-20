import type { UserProps } from "@/const/props/userProps"
import { api } from "@/services/axios"

export async function uploadProfileImageAPI(image: File): Promise<UserProps> {
  const formData = new FormData()
  formData.append("image", image)
  const response = await api.post(`/helper/upload-profile-image`, formData)
  return response.data
}

export const uploadProfileImage = uploadProfileImageAPI

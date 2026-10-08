import type {
  ClassroomProps,
  InstructorMaterialsProps,
  ModuleProps,
} from "@/const/props/materialProps"
import { api } from "@/services/axios"

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

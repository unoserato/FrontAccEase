import { useSuspenseQuery } from "@tanstack/react-query"
import {
  getClassroomAPI,
  getClassroomContentViewById,
  getEnrolledLearners,
  getModulesAPI,
} from "../api/materialsAPI"
import { staleTime } from "../axios"
import {
  getInstructorMaterialsAPI,
  getInstructorMaterialsClassroomsAPI,
  getInstructorMaterialsModulesAPI,
  getModuleByIdAPI,
} from "../api/GET/materialsGETAPI"

export function useModules() {
  return useSuspenseQuery({
    queryKey: ["modules"],
    queryFn: getModulesAPI,
    staleTime: staleTime,
  })
}

export function useClassrooms() {
  return useSuspenseQuery({
    queryKey: ["classroom"],
    queryFn: getClassroomAPI,
    staleTime: staleTime,
  })
}

export function useEnrolledLearnersByClassroomId(id: string) {
  return useSuspenseQuery({
    queryKey: ["enrolled-learners", id],
    queryFn: () => getEnrolledLearners(id),
    staleTime: staleTime,
  })
}

export function useInstructorMaterialsList() {
  return useSuspenseQuery({
    queryKey: ["instructor-materials-list"],
    queryFn: getInstructorMaterialsAPI,
    staleTime: staleTime,
  })
}

export function useInstructorMaterialsClassrooms(id: string) {
  return useSuspenseQuery({
    queryKey: ["instructor-materials-classrooms", id],
    queryFn: () => getInstructorMaterialsClassroomsAPI(id),
    staleTime: staleTime,
  })
}

export function useInstructorMaterialsModules(id: string) {
  return useSuspenseQuery({
    queryKey: ["instructor-materials-modules", id],
    queryFn: () => getInstructorMaterialsModulesAPI(id),
    staleTime: staleTime,
  })
}

export function useInstructorMaterialsQuizzes(id: string) {
  return useSuspenseQuery({
    queryKey: ["instructor-materials-quizzes", id],
    queryFn: () => getInstructorMaterialsClassroomsAPI(id),
    staleTime: staleTime,
  })
}

export function useModuleById(id: string) {
  return useSuspenseQuery({
    queryKey: ["module", id],
    queryFn: () => getModuleByIdAPI(id),
    staleTime: staleTime,
  })
}

export function useClassroomContentView(id: string) {
  return useSuspenseQuery({
    queryKey: ["classroom-content", id],
    queryFn: () => getClassroomContentViewById(id),
    staleTime: staleTime,
  })
}

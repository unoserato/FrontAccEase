import { useSuspenseQuery } from "@tanstack/react-query"
import {
  getClassroomAPI,
  getEnrolledLearners,
  getModulesAPI,
} from "../api/materialsAPI"
import { staleTime } from "../axios"

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

export function useEnrolledLearners(id: string) {
  return useSuspenseQuery({
    queryKey: ["enrolled-learners", id],
    queryFn: () => getEnrolledLearners(id),
    staleTime: staleTime,
  })
}

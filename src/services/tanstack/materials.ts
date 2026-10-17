import {
  skipToken,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query"
import {
  analyzerAPI,
  getClassroomAPI,
  getClassroomContentViewById,
  getEnrolledLearners,
  getModulesAPI,
} from "../api/materialsAPI"
import {
  getAnalyzerLogsByLearner,
  getExtensionScanAPI,
  getInstructorQuizzesAPI,
  getQuizAnswerByIdAPI,
  getQuizByIdAPI,
  getQuizSubmissionsByIdAPI,
  sitemapAPI,
  webLLMTasksAPI,
} from "../api/GET/materialsGETAPI"
import { createExtensionScanAPI } from "../api/CRUD/materialsCRUDAPI"

import { staleTime } from "../axios"
import {
  getInstructorMaterialsAPI,
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

export function useInstructorMaterialsModules(id: string) {
  return useSuspenseQuery({
    queryKey: ["instructor-materials-modules", id],
    queryFn: () => getInstructorMaterialsModulesAPI(id),
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
  return useQuery({
    queryKey: ["classroom-content", id],
    queryFn: id ? () => getClassroomContentViewById(id) : skipToken,
    staleTime: staleTime,
  })
}

// list of instructor quizzes
export function useInstructorQuizzes() {
  return useSuspenseQuery({
    queryKey: ["instructor-quizzes"],
    queryFn: getInstructorQuizzesAPI,
    staleTime: staleTime,
  })
}

export function useQuizById(id: string) {
  return useSuspenseQuery({
    queryKey: ["quiz", id],
    queryFn: () => getQuizByIdAPI(id),
    staleTime: staleTime,
  })
}

export function useQuizAnswerById(id?: string) {
  return useQuery({
    queryKey: ["answer-key", id],
    queryFn: id ? () => getQuizAnswerByIdAPI(id) : skipToken,
    staleTime: staleTime,
  })
}

export function useAnalyzerLogsByLearner() {
  return useSuspenseQuery({
    queryKey: ["analyzer-logs"],
    queryFn: getAnalyzerLogsByLearner,
    staleTime: staleTime,
  })
}

export function useAnalyzer() {
  return useMutation({
    mutationKey: ["analyzer"],
    mutationFn: (targetUrl: string | { url: string }) => analyzerAPI(targetUrl),
  })
}

export function useWebLLMTasks() {
  return useMutation({
    mutationKey: ["webllm-tasks"],
    mutationFn: (targetUrl: string) => webLLMTasksAPI(targetUrl),
  })
}

export function useCreateExtensionScan() {
  return useMutation({
    mutationKey: ["create-extension-scan"],
    mutationFn: createExtensionScanAPI,
  })
}

export function useExtensionScan(
  code?: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["extension-scan", code],
    queryFn:
      code && code !== "------" ? () => getExtensionScanAPI(code) : skipToken,
    enabled: !!code && code !== "------" && (options?.enabled ?? true),
    refetchInterval: (query) => {
      const data = query.state.data
      if (data?.status === "completed" || data?.status === "failed") {
        return false
      }
      return 2000
    },
    refetchOnWindowFocus: true,
  })
}

export function useSitemap(url?: string) {
  return useQuery({
    queryKey: ["sitemap", url],
    queryFn: url ? () => sitemapAPI(url) : skipToken,
    enabled: !!url,
    staleTime: staleTime,
    retry: 1,
  })
}

export function useQuizSubmissionsById(id?: string) {
  return useQuery({
    queryKey: ["quiz-submission", id],
    queryFn: id ? () => getQuizSubmissionsByIdAPI(id) : skipToken,
    enabled: !!id,
    staleTime: staleTime,
    retry: 1,
  })
}

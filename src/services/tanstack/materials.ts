import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
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
  getAnalyzerResultByIdAPI,
  getAnalyzerLogsSummaryByLearnerAPI,
  getCoreModuleActivitiesAPI,
  getCoreModulesAPI,
  getExtensionScanAPI,
  getInstructorQuizzesAPI,
  getQuizAnswerByIdAPI,
  getQuizByIdAPI,
  getQuizSubmissionsByIdAPI,
  sitemapAPI,
  webLLMTasksAPI,
  getWCAGInstruments,
} from "../api/GET/materialsGETAPI"
import {
  createExtensionScanAPI,
  completeCoreActivityAPI,
  submitCoreAssessmentActivityAPI,
  answerCoreInteractiveActivityAPI,
} from "../api/CRUD/materialsCRUDAPI"

import { staleTime } from "../axios"
import {
  getInstructorMaterialsCountAPI,
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

export function useInstructorMaterialsCount() {
  return useSuspenseQuery({
    queryKey: ["instructor-materials-list"],
    queryFn: getInstructorMaterialsCountAPI,
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

export function useClassroomContentView(id?: string) {
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
    queryFn: getAnalyzerLogsSummaryByLearnerAPI,
    staleTime: staleTime,
  })
}

export function useAnalyzerResultById(id: string) {
  return useQuery({
    queryKey: ["analyzer-result", id],
    queryFn: () => getAnalyzerResultByIdAPI(id),
    staleTime: staleTime,
    enabled: Boolean(id),
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

export function useCoreModuleProgress() {
  return useSuspenseQuery({
    queryKey: ["core-module-progress"],
    queryFn: getCoreModulesAPI,
    staleTime: staleTime,
    retry: 1,
  })
}

export function useCoreModuleProgressActivities(id: string) {
  return useSuspenseQuery({
    queryKey: ["core-module-progress-activities", id],
    queryFn: () => getCoreModuleActivitiesAPI(id),
    staleTime: staleTime,
    retry: 1,
  })
}

export function useCompleteCoreActivity(activityId?: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["complete-core-activity", activityId],
    mutationFn: (targetId?: string) => {
      const id = targetId || activityId
      if (!id) throw new Error("Activity ID is required")
      return completeCoreActivityAPI(id)
    },
    onSuccess: (_, targetId) => {
      const id = targetId || activityId
      queryClient.invalidateQueries({ queryKey: ["core-module-progress"] })
      if (id) {
        queryClient.invalidateQueries({
          queryKey: ["core-module-progress-activities", id],
        })
      }
    },
  })
}

export function useSubmitCoreAssessment(activityId?: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["submit-core-assessment", activityId],
    mutationFn: ({
      activityId: targetId,
      answers,
      idempotency_key,
    }: {
      activityId?: string
      answers: Record<string, unknown>
      idempotency_key?: string
    }) => {
      const id = targetId || activityId
      if (!id) throw new Error("Activity ID is required")
      return submitCoreAssessmentActivityAPI(id, { answers, idempotency_key })
    },
    onSuccess: (_, variables) => {
      const id = variables.activityId || activityId
      queryClient.invalidateQueries({ queryKey: ["core-module-progress"] })
      if (id) {
        queryClient.invalidateQueries({
          queryKey: ["core-module-progress-activities", id],
        })
      }
    },
  })
}

export function useAnswerCoreInteractive(activityId?: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["answer-core-interactive", activityId],
    mutationFn: ({
      activityId: targetId,
      choice,
      answer,
    }: {
      activityId?: string
      choice?: string
      answer?: string | Record<string, unknown>
    }) => {
      const id = targetId || activityId
      if (!id) throw new Error("Activity ID is required")
      const finalChoice =
        choice ??
        (typeof answer === "string"
          ? answer
          : ((answer as Record<string, unknown>)?.choice ??
            (answer as Record<string, unknown>)?.value ??
            (answer as Record<string, unknown>)?.answer))
      return answerCoreInteractiveActivityAPI(id, String(finalChoice))
    },
    onSuccess: (_, variables) => {
      const id = variables.activityId || activityId
      queryClient.invalidateQueries({ queryKey: ["core-module-progress"] })
      if (id) {
        queryClient.invalidateQueries({
          queryKey: ["core-module-progress-activities", id],
        })
      }
    },
  })
}

export function useWCAGInstruments() {
  return useSuspenseQuery({
    queryKey: ["wcag-instruments"],
    queryFn: getWCAGInstruments,
    staleTime: staleTime,
  })
}

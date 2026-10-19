import { useSuspenseQueries } from "@tanstack/react-query"
import { getClassroomAPI } from "../api/materialsAPI"
import { staleTime } from "../axios"
import {
  getAnalyzerLogsSummaryByLearnerAPI,
  getCoreModulesAPI,
} from "../api/GET/materialsGETAPI"

export function useLearnerDashboardData() {
  return useSuspenseQueries({
    queries: [
      {
        queryKey: ["classroom"],
        queryFn: getClassroomAPI,
        staleTime: staleTime,
      },
      {
        queryKey: ["analyzer-logs"],
        queryFn: getAnalyzerLogsSummaryByLearnerAPI,
        staleTime: staleTime,
      },
      {
        queryKey: ["core-module-progress"],
        queryFn: getCoreModulesAPI,
        staleTime: staleTime,
        retry: 1,
      },
    ],
  })
}

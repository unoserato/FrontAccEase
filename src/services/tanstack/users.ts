import { useSuspenseQuery } from "@tanstack/react-query"
import { getAllInstructorsAPI } from "../api/usersAPI"
import { staleTime } from "../axios"

export function useInstructors() {
  return useSuspenseQuery({
    queryKey: ["instructors"],
    queryFn: getAllInstructorsAPI,
    staleTime: staleTime,
  })
}

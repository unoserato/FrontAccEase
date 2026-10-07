import {
  useQueryClient,
  useSuspenseQuery,
  useQuery,
} from "@tanstack/react-query"
import { meAPI } from "../api/authAPI"
import { staleTime } from "../axios"

export function useCheckToken() {
  return useQuery({
    queryKey: ["user"],
    queryFn: meAPI,
    staleTime: staleTime,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  })
}

export function useMe() {
  return useSuspenseQuery({
    queryKey: ["user"],
    queryFn: meAPI,
    staleTime: staleTime,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  })
}

export function useInvalidateQueries() {
  const queryClient = useQueryClient()

  return (keys: string[]) => {
    keys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: [key] })
    })
  }
}

export function useRemoveQueries() {
  const queryClient = useQueryClient()

  return (keys: string[]) => {
    keys.forEach((key) => {
      queryClient.removeQueries({ queryKey: [key] })
    })
  }
}

export function useSetQueryData() {
  const queryClient = useQueryClient()

  return (key: string[], data: unknown) => {
    queryClient.setQueryData([key], data)
  }
}

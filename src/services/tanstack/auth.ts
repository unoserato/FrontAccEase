import { useQuery, useQueryClient } from "@tanstack/react-query"
import { meAPI } from "../api/authAPI"
import { user } from "@/const/data"

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return user
    },
  })
}

export function useMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: meAPI,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
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

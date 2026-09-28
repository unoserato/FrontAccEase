import { useQuery, useQueryClient } from "@tanstack/react-query"
// import { meAPI } from "../api/authAPI"
import { user } from "@/const/data"

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return user
    },
  })
}

export function useInvalidateKeys() {
  const queryClient = useQueryClient()

  return (keys: string[]) => {
    keys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: [key] })
    })
  }
}

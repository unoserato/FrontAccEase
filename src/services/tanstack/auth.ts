import { user } from "@/const/data"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return user
    },
    refetchInterval: 10,
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

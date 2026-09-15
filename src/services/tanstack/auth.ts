import { useQuery, useQueryClient } from "@tanstack/react-query"

const user = ["admin", "learner", "instructor"]

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { role: user }
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

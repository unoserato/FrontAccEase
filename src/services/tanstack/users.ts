import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { getAllInstructorsAPI } from "../api/usersAPI"
import { uploadProfileImage } from "../api/CRUD/userCRUDAPI"
import { staleTime } from "../axios"

export function useInstructors() {
  return useSuspenseQuery({
    queryKey: ["instructors"],
    queryFn: getAllInstructorsAPI,
    staleTime: staleTime,
  })
}

export function useUploadProfileImage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["upload-profile-image"],
    mutationFn: (image: File) => uploadProfileImage(image),
    onSuccess: (freshUserData) => {
      // Directly update the ["user"] cache with the fresh user data
      queryClient.setQueryData(["user"], freshUserData)
    },
  })
}

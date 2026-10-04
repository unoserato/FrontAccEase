import { useQuery } from "@tanstack/react-query"
import { getModulesAPI } from "../api/materialsAPI"

export function useModules() {
  return useQuery({
    queryKey: ["modules"],
    queryFn: getModulesAPI,
  })
}

import HeaderTemplate from "@/components/common/PageTemplate"

import SearchTemplate from "@/components/common/SearchTemplate"
import { useState } from "react"
import { useModules } from "@/services/tanstack/materials"
import ModuleCardTemplate from "@/components/common/ModuleCardTemplate"

export default function ModulesInstructor() {
  const [search, setSearch] = useState("")
  const { data: modules } = useModules()

  const filteredModules = modules
    .filter((module) => module.archived === true)
    .filter((module) => {
      if (search.trim().length > 0) {
        return (
          module.name.toLowerCase().includes(search.toLowerCase()) ||
          module.principle.toLowerCase().includes(search.toLowerCase())
        )
      }
      return true
    })

  return (
    <section className="p-responsive space-y-4 sm:space-y-6">
      <HeaderTemplate
        title="Archived Modules"
        subtitle="Modules you marked as archived."
        backTo="/instructor/modules"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full flex-1 sm:max-w-md md:max-w-lg">
          <SearchTemplate
            search={search}
            setSearch={(e) => setSearch(e)}
            title="modules or principle"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
        {filteredModules.map((module) => (
          <ModuleCardTemplate key={module.id} module={module} view="grid" />
        ))}
      </div>
    </section>
  )
}

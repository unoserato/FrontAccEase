import HeaderTemplate from "@/components/common/PageTemplate"

import SearchTemplate from "@/components/common/SearchTemplate"
import GridListButtonGroupTemplate from "@/components/common/GridListButtonGroupTemplate"
import { useState } from "react"
import { useModules } from "@/services/tanstack/materials"
import ModuleCardTemplate from "@/components/common/ModuleCardTemplate"

export default function ModulesInstructor() {
  const [search, setSearch] = useState("")
  const [gridView, setGridView] = useState(true)
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
        <div className="flex shrink-0 items-center justify-end gap-2">
          <GridListButtonGroupTemplate
            gridView={gridView}
            setGridView={(e) => setGridView(e)}
          />
        </div>
      </div>

      {gridView ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {filteredModules.map((module) => (
            <ModuleCardTemplate key={module.id} module={module} view="grid" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredModules.map((module) => (
            <ModuleCardTemplate key={module.id} module={module} view="list" />
          ))}
        </div>
      )}
    </section>
  )
}

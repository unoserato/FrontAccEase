import HeaderTemplate from "@/components/common/PageTemplate"

import SearchTemplate from "@/components/common/SearchTemplate"
import TooltipButtonTemplate from "@/components/common/TooltipButtonTemplate"
import GridListButtonGroupTemplate from "@/components/common/GridListButtonGroupTemplate"
import { buttonVariants } from "@/components/ui/button"
import { Archive, Plus } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useModules } from "@/services/tanstack/materials"
import ModuleCardTemplate from "@/components/common/ModuleCardTemplate"

export default function ModulesInstructor() {
  const [search, setSearch] = useState("")
  const [gridView, setGridView] = useState(true)
  const { data: modules } = useModules()

  if (!modules) return null
  console.log(modules)

  const filteredModules = modules.filter((module) => {
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
        title="Modules"
        subtitle="Create, organize, and publish course materials."
        cta={[
          <Link
            to={"./new"}
            className={`${buttonVariants({ variant: "default" })} `}
          >
            <Plus />
            New Module
          </Link>,
        ]}
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
          <TooltipButtonTemplate
            triggerTextIcon={<Archive />}
            triggerVariant="outline"
            content="Archived Modules"
            onClick={() => alert("Archived Modules")}
          />
          <GridListButtonGroupTemplate
            gridView={gridView}
            setGridView={(e) => setGridView(e)}
          />
        </div>
      </div>

      {gridView ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {filteredModules.map((module) => (
            <ModuleCardTemplate module={module} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredModules.map((module) => (
            <p>{module.name}</p>
          ))}
        </div>
      )}
    </section>
  )
}

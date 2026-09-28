import ModuleCardTemplate from "@/components/common/ModuleCardTemplate"
import HeaderTemplate from "@/components/common/PageTemplate"

import SearchTemplate from "@/components/common/SearchTemplate"
import TooltipButtonTemplate from "@/components/common/TooltipButtonTemplate"
import GridListButtonGroupTemplate from "@/components/common/GridListButtonGroupTemplate"
import { buttonVariants } from "@/components/ui/button"
import { modules } from "@/const/data"
import { Archive, Plus } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function ModulesInstructor() {
  const [search, setSearch] = useState("")
  const [gridView, setGridView] = useState(true)

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
          {/* <Link
            to="./new"
            className="group flex aspect-auto min-h-48 w-full flex-col items-center justify-center rounded-none border border-dashed border-border bg-card/40 p-3 text-muted-foreground transition-all hover:border-primary/50 hover:bg-muted/30 hover:text-foreground sm:aspect-3/4 sm:p-6"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-border bg-background transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="mt-2 text-xs font-medium sm:mt-3 sm:text-sm">
              Create New Module
            </span>
          </Link> */}
          {filteredModules.map((module) => (
            <ModuleCardTemplate module={module} key={module.id} view="grid" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {/* <Link
              to="./new"
              className="group flex w-full items-center justify-center gap-2 rounded-none border border-dashed border-border bg-card/40 p-4 text-muted-foreground transition-all hover:border-primary/50 hover:bg-muted/30 hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
              <span className="text-xs font-medium sm:text-sm">
                Create New Module
              </span>
            </Link> */}
          {filteredModules.map((module) => (
            <ModuleCardTemplate module={module} key={module.id} view="list" />
          ))}
        </div>
      )}
    </section>
  )
}

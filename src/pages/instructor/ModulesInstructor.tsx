import HeaderTemplate from "@/components/common/PageTemplate"
import SearchTemplate from "@/components/common/SearchTemplate"
import TooltipButtonTemplate from "@/components/common/TooltipButtonTemplate"
import EmptyState from "@/components/common/EmptyState"
import { Button, buttonVariants } from "@/components/ui/button"
import { Archive, Book, BookOpen, SearchX } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useModules } from "@/services/tanstack/materials"
import ModuleCardTemplate from "@/components/common/ModuleCardTemplate"

export default function ModulesInstructor() {
  const [search, setSearch] = useState("")
  const { data: modules } = useModules()

  const filteredModules = modules
    .filter((module) => module.archived === false)
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
        title="Modules"
        subtitle="Create, organize, and publish course materials."
        cta={[
          <Link
            to={"./new"}
            key="new-module"
            className={`${buttonVariants({ variant: "default" })} `}
          >
            <Book />
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
          <Link to="./archived">
            <TooltipButtonTemplate
              triggerTextIcon={<Archive />}
              triggerVariant="outline"
              content="Archived Modules"
            />
          </Link>
        </div>
      </div>

      {filteredModules.length === 0 ? (
        <EmptyState
          icon={search.trim().length > 0 ? SearchX : BookOpen}
          title={
            search.trim().length > 0 ? "No modules found" : "No modules yet"
          }
          description={
            search.trim().length > 0
              ? `No modules match "${search}". Try searching by another name or principle.`
              : "Create your first course module to organize accessibility lessons and learning materials."
          }
          actions={
            search.trim().length > 0 ? (
              <Button variant="outline" size="sm" onClick={() => setSearch("")}>
                Clear Search
              </Button>
            ) : (
              <Link
                to="./new"
                className={buttonVariants({ variant: "default" })}
              >
                <Book className="size-4" />
                New Module
              </Link>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {filteredModules.map((module) => (
            <ModuleCardTemplate key={module.id} module={module} />
          ))}
        </div>
      )}
    </section>
  )
}

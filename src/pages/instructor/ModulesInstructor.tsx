import HeaderTemplate from "@/components/common/PageTemplate"

import SearchTemplate from "@/components/common/SearchTemplate"
import TooltipButtonTemplate from "@/components/common/TooltipButtonTemplate"
import GridListButtonGroupTemplate from "@/components/common/GridListButtonGroupTemplate"
import { buttonVariants } from "@/components/ui/button"
// import { modules } from "@/const/data"
import { Archive, Plus } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useModules } from "@/services/tanstack/materials"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function ModulesInstructor() {
  const [search, setSearch] = useState("")
  const [gridView, setGridView] = useState(true)
  const { data: modules } = useModules()

  if (!modules) return null

  const filteredModules = modules.filter((module) => {
    if (search.trim().length > 0) {
      return (
        module.title.toLowerCase().includes(search.toLowerCase()) ||
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
            <Card className="group relative flex aspect-3/4 min-h-48 w-full cursor-pointer flex-col justify-between overflow-hidden p-0 transition-all hover:shadow-md sm:aspect-3/4">
              <CardHeader className="p-3.5 pb-1.5 sm:p-5 sm:pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div
                    style={{ maxWidth: "calc(100% - 2.5rem)" }}
                    className="w-fit truncate bg-foreground px-1.5 py-0.5 text-xs font-medium tracking-wider text-background uppercase sm:px-2 sm:text-xs"
                  >
                    <p className="truncate">{module.principle}</p>
                  </div>
                  <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5"></div>
                </div>

                <CardTitle className="mt-1.5 line-clamp-2 pr-6 text-xs leading-snug font-semibold tracking-tight capitalize sm:line-clamp-3 sm:text-base md:text-lg">
                  {module.title}
                </CardTitle>
              </CardHeader>

              <CardFooter className="flex items-center justify-between gap-1.5 border-t border-border p-3 pt-2 sm:p-5 sm:pt-3">
                <div className="min-w-0 flex-1">
                  <Label
                    htmlFor={`created_at_${module.title}`}
                    className="block truncate text-xs text-muted-foreground sm:text-xs"
                  >
                    Created at
                  </Label>
                </div>
              </CardFooter>
            </Card>
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
            <p>{module.title}</p>
          ))}
        </div>
      )}
    </section>
  )
}

// {
//   gridView ? (
//     <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
//       {/* <Link
//             to="./new"
//             className="group flex aspect-auto min-h-48 w-full flex-col items-center justify-center rounded-none border border-dashed border-border bg-card/40 p-3 text-muted-foreground transition-all hover:border-primary/50 hover:bg-muted/30 hover:text-foreground sm:aspect-3/4 sm:p-6"
//           >
//             <div className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-border bg-background transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
//               <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
//             </div>
//             <span className="mt-2 text-xs font-medium sm:mt-3 sm:text-sm">
//               Create New Module
//             </span>
//           </Link> */}
//       {filteredModules.map((module) => (
//         <ModuleCardTemplate module={module} key={module.id} view="grid" />
//       ))}
//     </div>
//   ) : (
//     <div className="flex flex-col gap-2">
//       {/* <Link
//               to="./new"
//               className="group flex w-full items-center justify-center gap-2 rounded-none border border-dashed border-border bg-card/40 p-4 text-muted-foreground transition-all hover:border-primary/50 hover:bg-muted/30 hover:text-foreground"
//             >
//               <Plus className="h-4 w-4" />
//               <span className="text-xs font-medium sm:text-sm">
//                 Create New Module
//               </span>
//             </Link> */}
//       {filteredModules.map((module) => (
//         <ModuleCardTemplate module={module} key={module.id} view="list" />
//       ))}
//     </div>
//   )
// }

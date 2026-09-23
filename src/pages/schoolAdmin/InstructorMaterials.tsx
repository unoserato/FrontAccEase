import { useState } from "react"
import HeaderTemplate from "@/components/common/PageTemplate"
import ModuleCardTemplate from "@/components/common/ModuleCardTemplate"
import QuizCardTemplate from "@/components/common/QuizCardTemplate"
import SearchTemplate from "@/components/common/SearchTemplate"
import GridListButtonGroupTemplate from "@/components/common/GridListButtonGroupTemplate"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { modules, quizzes } from "@/const/data"

export default function InstructorMaterials() {
  const [moduleSearch, setModuleSearch] = useState("")
  const [quizSearch, setQuizSearch] = useState("")
  const [gridView, setGridView] = useState(true)

  const filteredModules = modules.filter((module) => {
    if (moduleSearch.trim().length > 0) {
      return (
        module.name.toLowerCase().includes(moduleSearch.toLowerCase()) ||
        module.principle.toLowerCase().includes(moduleSearch.toLowerCase())
      )
    }
    return true
  })

  const filteredQuizzes = quizzes.filter((quiz) => {
    if (quizSearch.trim().length > 0) {
      return (
        quiz.name.toLowerCase().includes(quizSearch.toLowerCase()) ||
        quiz.principle?.toLowerCase().includes(quizSearch.toLowerCase())
      )
    }
    return true
  })

  return (
    <section className="p-responsive space-y-4 sm:space-y-6">
      <HeaderTemplate
        title="Instructor Materials"
        subtitle="View and manage instructor created learning modules and quizzes."
      />

      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:w-64">
          <TabsTrigger value="modules">Modules ({modules.length})</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes ({quizzes.length})</TabsTrigger>
        </TabsList>

        {/* Modules Tab Content */}
        <TabsContent value="modules" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full flex-1 sm:max-w-md md:max-w-lg">
              <SearchTemplate
                search={moduleSearch}
                setSearch={setModuleSearch}
                title="modules or principle"
              />
            </div>
            <div className="flex shrink-0 items-center justify-end gap-2">
              <GridListButtonGroupTemplate
                gridView={gridView}
                setGridView={setGridView}
              />
            </div>
          </div>

          {filteredModules.length === 0 ? (
            <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
              No modules found.
            </div>
          ) : gridView ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {filteredModules.map((module) => (
                <ModuleCardTemplate module={module} key={module.id} view="grid" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredModules.map((module) => (
                <ModuleCardTemplate module={module} key={module.id} view="list" />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Quizzes Tab Content */}
        <TabsContent value="quizzes" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full flex-1 sm:max-w-md md:max-w-lg">
              <SearchTemplate
                search={quizSearch}
                setSearch={setQuizSearch}
                title="quizzes or principle"
              />
            </div>
          </div>

          {filteredQuizzes.length === 0 ? (
            <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
              No quizzes found.
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:gap-4">
              {filteredQuizzes.map((quiz) => (
                <QuizCardTemplate quiz={quiz} key={quiz.id} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}

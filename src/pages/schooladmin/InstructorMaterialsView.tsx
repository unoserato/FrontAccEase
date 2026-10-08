import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import HeaderTemplate from "@/components/common/PageTemplate"
import ModuleCardTemplate from "@/components/common/ModuleCardTemplate"
import QuizCardTemplate from "@/components/common/QuizCardTemplate"
import ClassroomCardTemplate from "@/components/common/ClassroomCardTemplate"
import SearchTemplate from "@/components/common/SearchTemplate"
import GridListButtonGroupTemplate from "@/components/common/GridListButtonGroupTemplate"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { quizzes } from "@/const/data"
import {
  useInstructorMaterialsClassrooms,
  useInstructorMaterialsList,
  useInstructorMaterialsModules,
} from "@/services/tanstack/materials"

export default function InstructorMaterialsView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [classSearch, setClassSearch] = useState("")
  const [moduleSearch, setModuleSearch] = useState("")
  const [quizSearch, setQuizSearch] = useState("")
  const [gridView, setGridView] = useState(true)
  const { data: instructorMaterials } = useInstructorMaterialsList()
  const { data: instructorClassrooms } = useInstructorMaterialsClassrooms(id!)
  const { data: instructorModules } = useInstructorMaterialsModules(id!)

  const instructor = instructorMaterials.find((i) => i.user.id === id)

  // Filter quizzes for this instructor
  const instructorQuizzes = quizzes.filter((quiz) => {
    if (
      id &&
      quiz.created_by &&
      quiz.created_by !== id &&
      quiz.author !== instructor?.user.name
    ) {
      return false
    }
    if (quizSearch.trim().length > 0) {
      const q = quizSearch.toLowerCase()
      return (
        quiz.name.toLowerCase().includes(q) ||
        quiz.principle?.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <section className="p-responsive space-y-4 sm:space-y-6">
      <HeaderTemplate
        title={instructor ? instructor.user.name : "Instructor Materials"}
        subtitle={`Created classrooms, learning modules, and quizzes by ${
          instructor ? instructor.user.name : "this instructor"
        }.`}
        backTo="-1"
      />

      <Tabs defaultValue="classes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 sm:w-96">
          <TabsTrigger value="classes">
            Classes ({instructorClassrooms.length})
          </TabsTrigger>
          <TabsTrigger value="modules">
            Modules ({instructorModules.length})
          </TabsTrigger>
          <TabsTrigger value="quizzes">
            Quizzes ({instructorQuizzes.length})
          </TabsTrigger>
        </TabsList>

        {/* Classes Tab Content */}
        <TabsContent value="classes" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full flex-1 sm:max-w-md md:max-w-lg">
              <SearchTemplate
                search={classSearch}
                setSearch={setClassSearch}
                title="classroom name or code"
              />
            </div>
          </div>

          {instructorClassrooms.length === 0 ? (
            <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
              No classrooms found for this instructor.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {instructorClassrooms.map((classroom) => (
                <div
                  key={classroom.id}
                  onClick={() => navigate(`./classroom/${classroom.id}`)}
                  className="cursor-pointer"
                >
                  <ClassroomCardTemplate classroom={classroom} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

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

          {instructorModules.length === 0 ? (
            <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
              No modules found for this instructor.
            </div>
          ) : gridView ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {instructorModules.map((module) => (
                <div key={module.id} className="cursor-pointer">
                  <ModuleCardTemplate
                    module={module}
                    view="grid"
                    href={`./modules/${module.id}`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {instructorModules.map((module) => (
                <div key={module.id} className="cursor-pointer">
                  {/* <ModuleCardTemplate module={module} view="list" /> */}
                </div>
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

          {instructorQuizzes.length === 0 ? (
            <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
              No quizzes found for this instructor.
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:gap-4">
              {instructorQuizzes.map((quiz) => (
                <div key={quiz.id} className="cursor-pointer">
                  <QuizCardTemplate quiz={quiz} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}

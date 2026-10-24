import { useMemo, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import HeaderTemplate from "@/components/common/PageTemplate"
import ModuleCardTemplate from "@/components/common/ModuleCardTemplate"
import QuizCardTemplate from "@/components/common/QuizCardTemplate"
import ClassroomCardTemplate from "@/components/common/ClassroomCardTemplate"
import SearchTemplate from "@/components/common/SearchTemplate"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DetailSkeleton from "@/components/skeleton/DetailSkeleton"
import {
  useInstructorMaterialsCount,
  useInstructorMaterialsByInstructorId,
} from "@/services/tanstack/materials"

export default function InstructorMaterialsView() {
  const { instructorId } = useParams<{ instructorId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [classSearch, setClassSearch] = useState("")
  const [moduleSearch, setModuleSearch] = useState("")
  const [quizSearch, setQuizSearch] = useState("")

  const tabParam = searchParams.get("tab")
  const activeTabValue =
    tabParam === "m" ? "modules" : tabParam === "q" ? "quizzes" : "classes"

  const handleTabChange = (value: string) => {
    const code = value === "modules" ? "m" : value === "quizzes" ? "q" : "c"
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set("tab", code)
        return next
      },
      { replace: true }
    )
  }

  const { data: instructors = [] } = useInstructorMaterialsCount()
  const { data: materials, isPending } =
    useInstructorMaterialsByInstructorId(instructorId)

  const instructor = instructors.find((i) => i.user.id === instructorId)

  const classrooms = useMemo(() => materials?.classrooms ?? [], [materials])
  const modules = useMemo(() => materials?.modules ?? [], [materials])
  const quizzes = useMemo(() => materials?.quizzes ?? [], [materials])

  // Filter classrooms by name or code
  const filteredClassrooms = useMemo(() => {
    if (!classSearch.trim()) return classrooms
    const q = classSearch.toLowerCase()
    return classrooms.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.code && c.code.toLowerCase().includes(q))
    )
  }, [classrooms, classSearch])

  // Filter modules by name or principle
  const filteredModules = useMemo(() => {
    if (!moduleSearch.trim()) return modules
    const q = moduleSearch.toLowerCase()
    return modules.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        (m.principle && m.principle.toLowerCase().includes(q))
    )
  }, [modules, moduleSearch])

  // Filter quizzes by name
  const filteredQuizzes = useMemo(() => {
    if (!quizSearch.trim()) return quizzes
    const q = quizSearch.toLowerCase()
    return quizzes.filter((quiz) => quiz.name.toLowerCase().includes(q))
  }, [quizzes, quizSearch])

  if (isPending) {
    return <DetailSkeleton />
  }

  return (
    <section className="p-responsive space-y-4 sm:space-y-6">
      <HeaderTemplate
        title={instructor ? instructor.user.name : "Instructor Materials"}
        subtitle={`Created classrooms, learning modules, and quizzes by ${
          instructor ? instructor.user.name : "this instructor"
        }.`}
        backTo="-1"
      />

      <Tabs
        value={activeTabValue}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3 sm:w-96">
          <TabsTrigger value="classes">
            Classes ({filteredClassrooms.length})
          </TabsTrigger>
          <TabsTrigger value="modules">
            Modules ({filteredModules.length})
          </TabsTrigger>
          <TabsTrigger value="quizzes">
            Quizzes ({filteredQuizzes.length})
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

          {filteredClassrooms.length === 0 ? (
            <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
              No classrooms found for this instructor.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {filteredClassrooms.map((classroom) => (
                <div key={classroom.id} className="cursor-pointer">
                  <ClassroomCardTemplate
                    classroom={{
                      ...classroom,
                      classroom_code:
                        classroom.code || classroom.classroom_code || "",
                      classroom_join_code: classroom.code || "",
                      classroom_description: "",
                      archived: classroom.archived ?? false,
                    }}
                    href={`/admin/instructor-materials/${instructorId}/${classroom.id}`}
                  />
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
          </div>

          {filteredModules.length === 0 ? (
            <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
              No modules found for this instructor.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {filteredModules.map((module) => (
                <div key={module.id} className="cursor-pointer">
                  <ModuleCardTemplate
                    module={{
                      ...module,
                      principle: module.principle as any,
                      archived: module.archived ?? false,
                    }}
                    view="grid"
                    href={`/admin/instructor-materials/${instructorId}/modules/${module.id}`}
                  />
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
                title="quizzes"
              />
            </div>
          </div>

          {filteredQuizzes.length === 0 ? (
            <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
              No quizzes found for this instructor.
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:gap-4">
              {filteredQuizzes.map((quiz) => (
                <div key={quiz.id} className="cursor-pointer">
                  <QuizCardTemplate
                    quiz={quiz}
                    href={`/admin/instructor-materials/${instructorId}/quizzes/${quiz.id}`}
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}

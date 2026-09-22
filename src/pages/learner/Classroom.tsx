import LearnerQuizCardTemplate from "@/components/common/LearnerQuizCardTemplate"
import ModuleCardTemplate from "@/components/common/ModuleCardTemplate"
import HeaderTemplate from "@/components/common/PageTemplate"
import { classrooms, modules, quizzes, user } from "@/const/data"
import { BookOpen, FileQuestion } from "lucide-react"
import { Link } from "react-router-dom"

export default function Classroom() {
  const myClassroom =
    classrooms.find((classroom) =>
      classroom.learners.some(
        (learnerId) => learnerId === "1234-1234" || learnerId === user.id
      )
    ) || classrooms[0]

  const classroomModules = modules.filter((m) =>
    m.classrooms?.includes(myClassroom.id)
  )

  const classroomQuizzes = quizzes.filter((q) =>
    q.classrooms?.includes(myClassroom.id)
  )

  return (
    <section className="p-responsive space-y-8">
      <HeaderTemplate
        title={myClassroom.classroomCode}
        subtitle={myClassroom.name}
      />

      {/* Quizzes Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-foreground">Quizzes</h2>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
            {classroomQuizzes.length}
          </span>
        </div>

        {classroomQuizzes.length > 0 ? (
          <LearnerQuizCardTemplate quizzes={classroomQuizzes} title="Due" />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-10 text-center">
            <FileQuestion className="mb-2 size-8 text-muted-foreground/50" />
            <p className="text-sm font-medium text-muted-foreground">
              No quizzes stored in this classroom.
            </p>
          </div>
        )}
      </div>

      {/* Modules Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-foreground">Modules</h2>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
            {classroomModules.length}
          </span>
        </div>

        {classroomModules.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {classroomModules.map((module) => (
              <Link
                to={`/learner/classroom/module/${module.id}`}
                key={module.id}
              >
                <ModuleCardTemplate module={module} view="grid" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-10 text-center">
            <BookOpen className="mb-2 size-8 text-muted-foreground/50" />
            <p className="text-sm font-medium text-muted-foreground">
              No modules stored in this classroom.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

import { useState } from "react"
import LearnerQuizCardTemplate from "@/components/common/LearnerQuizCardTemplate"
import LearnerQuizHistoryCardTemplate from "@/components/common/LearnerQuizHistoryCardTemplate"
import ModuleCardTemplate from "@/components/common/ModuleCardTemplate"
import HeaderTemplate from "@/components/common/PageTemplate"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  classrooms,
  modules,
  quizzes,
  quizSubmissions,
  user,
} from "@/const/data"
import { AlertTriangle, BookOpen, FileQuestion, LogOut } from "lucide-react"
import { Link } from "react-router-dom"

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

const classroomSubmissions = quizSubmissions.filter(
  (sub) =>
    (sub.learnerId === "1234-1234" || sub.learnerId === user.id) &&
    classroomQuizzes.some((q) => q.id === sub.quizId)
)

export default function Classroom() {
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [hasLeft, setHasLeft] = useState(false)

  const handleConfirmLeave = () => {
    setIsLeaving(true)
    setTimeout(() => {
      setIsLeaving(false)
      setIsLeaveDialogOpen(false)
      setHasLeft(true)
    }, 600)
  }

  if (hasLeft) {
    return (
      <section className="p-responsive space-y-8">
        <HeaderTemplate
          title="Classroom"
          subtitle="You are not currently enrolled in any classroom."
        />
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-12 text-center">
          <BookOpen className="mb-4 size-12 text-muted-foreground/40" />
          <h2 className="text-lg font-bold text-foreground">
            No Active Classroom Enrollment
          </h2>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            You have left {myClassroom.name}. In FrontAccEase, students can
            belong to a single classroom. Contact your instructor or enter a
            classroom code to re-enroll.
          </p>
          <Button
            className="mt-6"
            onClick={() => setHasLeft(false)}
            variant="outline"
          >
            Re-enter Demo Classroom
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="p-responsive space-y-8">
      <HeaderTemplate
        title={myClassroom.classroomCode}
        subtitle={myClassroom.name}
      />

      {/* Due Quizzes Section */}
      {classroomQuizzes.length > 0 ? (
        <LearnerQuizCardTemplate quizzes={classroomQuizzes} title="Due" />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-10 text-center">
          <FileQuestion className="mb-2 size-8 text-muted-foreground/50" />
          <p className="text-sm font-medium text-muted-foreground">
            No quizzes assigned yet. Your instructor will publish assessments
            here.
          </p>
        </div>
      )}

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
              No modules assigned yet. Your instructor will publish curriculum
              modules here soon.
            </p>
          </div>
        )}
      </div>

      {/* Quiz History Section */}
      <div className="space-y-4">
        <LearnerQuizHistoryCardTemplate
          submissions={classroomSubmissions}
          quizzes={classroomQuizzes}
          title="Quiz History"
        />
      </div>

      {/* Settings / Danger Zone Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-foreground">
          Classroom Settings
        </h2>

        <div className="flex flex-col gap-4 rounded-2xl border border-destructive/20 bg-destructive/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-destructive" />
              <h3 className="text-sm font-bold text-foreground">
                Danger Zone: Leave Classroom
              </h3>
            </div>
            <p className="text-xs text-muted-foreground sm:max-w-xl">
              FrontAccEase operates on a single-classroom model for learners.
              Leaving{" "}
              <span className="font-semibold text-foreground">
                {myClassroom.name}
              </span>{" "}
              will unenroll you from this course and remove active assignment
              notifications.
            </p>
          </div>

          <Button
            variant="destructive"
            onClick={() => setIsLeaveDialogOpen(true)}
            className="shrink-0 cursor-pointer"
          >
            <LogOut className="size-4" />
            Leave Classroom
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="size-5" />
            </div>
            <DialogTitle>Leave this classroom?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Are you sure you want to leave{" "}
              <strong className="text-foreground">{myClassroom.name}</strong> (
              <span className="font-mono">{myClassroom.classroomCode}</span>)?
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-border/50 bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
            <p className="mb-1 font-medium text-foreground">
              Consequences of leaving:
            </p>
            <ul className="list-disc space-y-1 pl-4">
              <li>
                You will no longer see quizzes or modules specific to this
                classroom.
              </li>
              <li>
                Your instructor will need to send a new invitation or code to
                rejoin.
              </li>
              <li>
                Your completed public module achievements remain preserved.
              </li>
            </ul>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setIsLeaveDialogOpen(false)}
              disabled={isLeaving}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmLeave}
              disabled={isLeaving}
            >
              <LogOut className="size-4" />
              {isLeaving ? "Leaving..." : "Yes, Leave Classroom"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

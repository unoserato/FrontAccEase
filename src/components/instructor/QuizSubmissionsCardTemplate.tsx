import { useMemo } from "react"
import { useQueries } from "@tanstack/react-query"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, User, Clock, FileText } from "lucide-react"
import type { ClassroomProps } from "@/const/props/classroomProps"
import type { QuizProps, QuizSubmissionProps } from "@/const/props/quizProps"
import { getClassroomContentViewById } from "@/services/api/materialsAPI"
import { staleTime } from "@/services/axios"

export type QuizSubmissionsCardTemplateProps = {
  quiz: QuizProps
  classrooms: ClassroomProps[]
  submissions?: QuizSubmissionProps[]
}

export default function QuizSubmissionsCardTemplate({
  quiz,
  classrooms,
  submissions = [],
}: QuizSubmissionsCardTemplateProps) {
  const assignedClassrooms = useMemo(
    () =>
      (quiz.classrooms ?? [])
        .map((cId) => classrooms.find((c) => String(c.id) === String(cId)))
        .filter((classroom): classroom is ClassroomProps => Boolean(classroom)),
    [quiz.classrooms, classrooms]
  )

  const totalPoints = quiz.total_points ?? 0

  const targetClassrooms =
    assignedClassrooms.length > 0 ? assignedClassrooms : classrooms.slice(0, 1)

  const classroomQueries = useQueries({
    queries: targetClassrooms.map((classroom) => ({
      queryKey: ["classroom-content", classroom.id],
      queryFn: () => getClassroomContentViewById(classroom.id),
      staleTime,
    })),
  })

  const defaultExpandedIds = useMemo(
    () => targetClassrooms.map((classroom) => classroom.id),
    [targetClassrooms]
  )

  if (!targetClassrooms.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-14 text-center">
        <FileText className="mb-3 size-10 text-muted-foreground/60" />
        <p className="text-base font-semibold text-foreground">
          No classrooms assigned
        </p>
        <p className="text-sm text-muted-foreground">
          Submissions for assigned classrooms will appear here.
        </p>
      </div>
    )
  }

  return (
    <Accordion multiple defaultValue={defaultExpandedIds} className="space-y-3">
      {targetClassrooms.map((classroom, index) => {
        const classroomQuery = classroomQueries[index]
        const classroomLearners = classroomQuery.data?.learners ?? []
        const learnerCount = classroomQuery.data
          ? classroomLearners.length
          : classroom.enrollment_count
        const matchingSubmissions = submissions.filter((submission) =>
          classroomLearners.some((learner) => {
            const subLearnerId = submission.learner_id
            return (
              subLearnerId != null &&
              String(learner.id) === String(subLearnerId)
            )
          })
        )
        const submittedCount = matchingSubmissions.length

        const isCompleted = learnerCount > 0 && submittedCount >= learnerCount

        return (
          <AccordionItem
            key={classroom.id}
            value={classroom.id}
            className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:border-border/80"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline">
              <div className="flex w-full items-center justify-between gap-4 pr-3 text-left">
                {/* Classroom Title & Code */}
                <div className="flex items-center gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight text-foreground md:text-base">
                      {classroom.name}
                    </h3>
                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span>Code: {classroom.classroom_code}</span>
                      <span>•</span>
                      <span>{learnerCount} Enrolled Learners</span>
                    </div>
                  </div>
                </div>

                {/* Submission Progress Pill Badge */}
                <div className="flex items-center gap-2">
                  <Badge
                    variant={isCompleted ? "default" : "secondary"}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium"
                  >
                    <Users className="size-3.5" />
                    <span>
                      {submittedCount} / {learnerCount}
                    </span>
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="border-t border-border/50 bg-muted/20 px-5 pt-3 pb-4">
              {classroomQuery.isPending ? (
                <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                  <Clock className="mr-2 size-4" />
                  <span>Loading enrolled learners…</span>
                </div>
              ) : classroomLearners.length === 0 ? (
                <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                  <Clock className="mr-2 size-4" />
                  <span>No enrolled learners found in this classroom.</span>
                </div>
              ) : (
                <div className="divide-y divide-border/40 rounded-lg border border-border/60 bg-background">
                  {classroomLearners.map((learner) => {
                    if (!learner) return null
                    const submission = matchingSubmissions.find((s) => {
                      const subLearnerId = s.learner_id
                      return (
                        subLearnerId != null &&
                        String(subLearnerId) === String(learner.id)
                      )
                    })
                    const isSubmitted = !!submission
                    const score = submission?.score ?? 0
                    const ratio = totalPoints > 0 ? score / totalPoints : 0

                    let scoreBadgeClass =
                      "border-emerald-500/30 text-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/30 dark:text-emerald-400"
                    if (ratio < 0.6) {
                      scoreBadgeClass =
                        "border-rose-500/30 text-rose-700 bg-rose-50/50 dark:bg-rose-950/30 dark:text-rose-400"
                    } else if (ratio < 0.8) {
                      scoreBadgeClass =
                        "border-amber-500/30 text-amber-700 bg-amber-50/50 dark:bg-amber-950/30 dark:text-amber-400"
                    }

                    const initials = learner.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()

                    return (
                      <div
                        key={learner.id}
                        className="flex items-center justify-between px-4 py-3 text-xs transition-colors hover:bg-muted/40 sm:text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8 border border-border text-xs font-semibold sm:size-9">
                            <AvatarImage src={learner.profile_picture} />
                            <AvatarFallback>
                              {initials || <User className="size-3.5" />}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">
                              {learner.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {isSubmitted
                                ? `Submitted: ${submission?.submitted_at ?? submission?.submittedAt ?? "Recently"}`
                                : "No submission yet"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isSubmitted ? (
                            <Badge
                              variant="outline"
                              className={`px-2.5 py-1 text-xs font-semibold ${scoreBadgeClass}`}
                            >
                              {score} / {totalPoints}
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="px-2.5 py-1 text-xs font-medium"
                            >
                              Missing
                            </Badge>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

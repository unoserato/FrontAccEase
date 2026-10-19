import { useMemo } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { classworks, learners } from "@/const/data"
import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  User,
  Users,
} from "lucide-react"
import type { ClassroomProps } from "@/const/props/classroomProps"

export default function ClassworkCardTemplate({
  classroom,
}: {
  classroom: ClassroomProps
}) {
  const classworkList: Classwork[] = useMemo(
    () => classworks.filter((cl) => cl.classroomId === classroom.id),
    [classroom.id]
  )

  if (!classworkList.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-14 text-center">
        <FileText className="mb-3 size-10 text-muted-foreground/60" />
        <p className="text-base font-semibold text-foreground">
          No classwork assigned
        </p>
        <p className="text-sm text-muted-foreground">
          Tasks created for this classroom will appear here.
        </p>
      </div>
    )
  }

  return (
    <Accordion multiple className="space-y-3">
      {classworkList.map((work) => {
        const submissionCount = work.submissions.length
        const totalLearners = classroom.learners.length
        const isCompleted =
          totalLearners > 0 && submissionCount >= totalLearners

        return (
          <AccordionItem
            key={work.id}
            value={work.id}
            className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:border-border/80"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline">
              <div className="flex w-full items-center justify-between gap-4 pr-3 text-left">
                {/* Title & Due Date */}
                <div className="flex items-center gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight text-foreground md:text-base">
                      {work.name}
                    </h3>
                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="size-3.5" />
                      <span>
                        {work.due
                          ? `Due ${new Date(work.due).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              }
                            )}`
                          : "No due date"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submission Progress Pill */}
                <div className="flex items-center gap-2">
                  <Badge
                    variant={isCompleted ? "default" : "secondary"}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium"
                  >
                    <Users className="size-3.5" />
                    <span>
                      {submissionCount} / {totalLearners}
                    </span>
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="border-t border-border/50 bg-muted/20 px-5 pt-3 pb-4">
              {work.submissions.length === 0 ? (
                <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                  <Clock className="size-4" />
                  <span>No submissions recorded yet.</span>
                </div>
              ) : (
                <div className="divide-y divide-border/40 rounded-lg border border-border/60 bg-background">
                  {work.submissions.map((sub) => {
                    const student = learners.find((l) => sub.userId == l.id)
                    const initials = student?.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()

                    return (
                      <div
                        key={sub.userId}
                        className="flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-muted/40"
                      >
                        {/* Student Info */}
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8 text-xs font-semibold">
                            <AvatarImage src={student?.img} />
                            <AvatarFallback>
                              {initials || <User className="size-3.5" />}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {student?.name}
                            </p>
                          </div>
                        </div>

                        {/* Grading / Score Status */}
                        <div className="flex items-center gap-2">
                          {sub.score !== null ? (
                            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="size-3.5" />
                              <span>{sub.score} pts</span>
                            </div>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-xs font-normal text-muted-foreground"
                            >
                              Needs Grading
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

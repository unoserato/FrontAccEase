import { useState } from "react"
import type { QuizProps } from "@/const/materialsProps"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, FileQuestion } from "lucide-react"
import { Link } from "react-router-dom"
import { getQuizTotalQuestions } from "@/features/instructor/quizHelper"
import { Badge } from "../ui/badge"

interface LearnerQuizCardTemplateProps {
  quizzes?: QuizProps[]
  quiz?: QuizProps
  title?: string
}

export default function LearnerQuizCardTemplate({
  quizzes,
  quiz,
  title = "Due",
}: LearnerQuizCardTemplateProps) {
  const [isOpen, setIsOpen] = useState(true)

  const list = quizzes || (quiz ? [quiz] : [])

  if (list.length === 0) return null

  return (
    <Card className="overflow-hidden rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-all sm:p-5">
      {/* Card Collapsible Header */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center justify-between select-none"
      >
        <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
          {title}
        </h3>

        <div className="flex items-center gap-1">
          <Badge variant={"secondary"}>{list.length}</Badge>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-foreground"
            aria-label="Toggle section"
          >
            {isOpen ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Quiz List Items */}
      {isOpen && (
        <div className="mt-4 space-y-3 divide-y divide-border/40">
          {list.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${
                index > 0 ? "pt-3" : ""
              } rounded-xl p-2 transition-colors hover:bg-muted/40`}
            >
              {/* Left: Icon & Title Link */}
              <Link
                to={`/learner/quizzes/${item.id}`}
                className="group/item flex min-w-0 flex-1 items-center gap-3.5"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover/item:bg-muted/80">
                  <FileQuestion className="size-5" />
                </div>
                <span className="truncate text-sm font-bold text-foreground group-hover/item:underline sm:text-base">
                  {item.name}
                </span>
              </Link>

              {/* Middle: Details (Due & Items) & Right: Start Link */}
              <div className="flex shrink-0 items-center justify-between gap-6 sm:gap-10">
                {/* Due Date */}
                <div className="text-left sm:text-center">
                  <span className="block text-[11px] leading-none font-medium text-muted-foreground">
                    Due
                  </span>
                  <span className="mt-1 block text-xs font-bold text-foreground sm:text-sm">
                    {item.dueDate || "August 27, 2026"}
                  </span>
                </div>

                {/* Items Count */}
                <div className="text-left sm:text-center">
                  <span className="block text-[11px] leading-none font-medium text-muted-foreground">
                    Items
                  </span>
                  <span className="mt-1 block text-xs font-bold text-foreground sm:text-sm">
                    {getQuizTotalQuestions(item)}
                  </span>
                </div>

                {/* Max Attempts */}
                <div className="text-left sm:text-center">
                  <span className="block text-[11px] leading-none font-medium text-muted-foreground">
                    Max Attempts
                  </span>
                  <span className="mt-1 block text-xs font-bold text-foreground sm:text-sm">
                    {item.maxAttempts ?? 3}
                  </span>
                </div>

                {/* Start Link */}
                <Link
                  to={`/learner/quizzes/${item.id}`}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "inline-flex h-9 items-center justify-center px-4 text-sm font-bold text-foreground hover:bg-muted"
                  )}
                >
                  Start
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

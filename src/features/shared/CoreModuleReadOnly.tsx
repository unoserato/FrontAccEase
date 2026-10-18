import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, FileText, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCoreModuleProgressActivities } from "@/services/tanstack/materials"
import type {
  CoreModuleAssessmentActivity,
  CoreModuleInteractiveActivity,
  CoreModuleLessonActivity,
} from "@/const/props/materialProps"
import CoreModuleLessonView from "./core-module/CoreModuleLessonView"
import CoreModuleAssessmentView from "./core-module/CoreModuleAssessmentView"
import CoreModuleInteractiveView from "./core-module/CoreModuleInteractiveView"

export default function CoreModuleReadOnly() {
  const { principle_id, activity_id } = useParams()
  const { data: contents } = useCoreModuleProgressActivities(activity_id || "")
  const navigate = useNavigate()

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate(`/learner/modules/${principle_id || ""}`)
    }
  }

  const isLesson = contents?.kind === "lesson"
  const isAssessment =
    contents?.kind === "mini" ||
    contents?.kind === "pre" ||
    contents?.kind === "post" ||
    Boolean(contents && "questions" in contents)
  const isInteractive =
    contents?.kind === "interactive" ||
    Boolean(contents && "scenario" in contents)

  const principleLabel = principle_id
    ? principle_id.charAt(0).toUpperCase() + principle_id.slice(1)
    : "Core Principle"

  const title =
    (isLesson && contents && "lesson" in contents ? contents.lesson?.title : null) ||
    contents?.title ||
    "Core Activity"

  if (!contents) {
    return (
      <div
        style={{ minHeight: "70vh" }}
        className="mx-auto my-auto flex items-center justify-center p-4"
      >
        <Card className="max-w-md p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-bold text-foreground">
            Activity Not Found
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The requested core module activity could not be found.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Button onClick={handleBack} variant="outline" className="gap-2">
              <ArrowLeft className="size-4" />
              Back to Modules
            </Button>
            <Button onClick={() => window.location.reload()} variant="ghost" className="gap-2">
              <RotateCw className="size-4" />
              Refresh
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-background pb-16">
      {/* Sticky Reader Header Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              title="Back"
              aria-label="Back"
              className="shrink-0 cursor-pointer"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="shrink-0 bg-foreground px-1.5 py-0.5 text-xs font-medium tracking-wider text-background uppercase sm:px-2">
                {principleLabel}
              </span>
              <h1 className="truncate text-sm font-semibold text-foreground sm:text-base">
                {title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.reload()}
              title="Refresh Activity"
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <RotateCw className="size-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Document Area */}
      <main className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 sm:pt-8">
        <Card className="p-6 shadow-sm sm:p-10">
          {/* Lesson Content View */}
          {isLesson && (
            <CoreModuleLessonView
              key={contents.id}
              activity={contents as CoreModuleLessonActivity}
              principleLabel={principleLabel}
            />
          )}

          {/* Assessment View (Pre / Mini / Post) */}
          {isAssessment && (
            <CoreModuleAssessmentView
              key={contents.id}
              activity={contents as CoreModuleAssessmentActivity}
              principleLabel={principleLabel}
            />
          )}

          {/* Interactive Scenario View */}
          {isInteractive && (
            <CoreModuleInteractiveView
              key={contents.id}
              activity={contents as CoreModuleInteractiveActivity}
              principleLabel={principleLabel}
            />
          )}

          {/* Fallback for other activity kinds */}
          {!isLesson && !isAssessment && !isInteractive && (
            <div className="space-y-4">
              <header className="border-b border-border pb-4">
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  {principleLabel}
                </span>
                <h1 className="mt-2 text-2xl font-bold text-foreground">
                  {contents.title}
                </h1>
              </header>
              <p className="text-sm text-muted-foreground">
                Activity content is currently unavailable.
              </p>
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}

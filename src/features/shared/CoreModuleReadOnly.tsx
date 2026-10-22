import { useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Lock,
  RotateCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  useCoreModuleProgressActivities,
  useCoreModuleProgressByPrinciple,
} from "@/services/tanstack/materials"
import type {
  CoreModuleAssessmentActivity,
  CoreModuleInteractiveActivity,
  CoreModuleLessonActivity,
  CoreModuleActivityItemProps,
} from "@/const/props/moduleProps"
import type { WCAGPrinciple } from "@/const/props/wcagProps"
import CoreModuleLessonView from "./core-module/CoreModuleLessonView"
import CoreModuleAssessmentView from "./core-module/CoreModuleAssessmentView"
import CoreModuleInteractiveView from "./core-module/CoreModuleInteractiveView"

export default function CoreModuleReadOnly() {
  const { principle_id, activity_id } = useParams()
  const normalizedPrinciple = (
    principle_id || "perceivable"
  ).toLowerCase() as WCAGPrinciple
  const { data: contents } = useCoreModuleProgressActivities(activity_id || "")
  const { data: principleProgress } =
    useCoreModuleProgressByPrinciple(normalizedPrinciple)
  const navigate = useNavigate()

  const principleRouteName = normalizedPrinciple
  const principleLabel =
    (principleProgress?.name
      ? principleProgress.name.charAt(0).toUpperCase() +
        principleProgress.name.slice(1).toLowerCase()
      : "") ||
    (principle_id
      ? principle_id.charAt(0).toUpperCase() +
        principle_id.slice(1).toLowerCase()
      : "Principle")

  const activities = useMemo(() => {
    return (
      (principleProgress?.activities || []) as CoreModuleActivityItemProps[]
    )
      .slice()
      .sort((a, b) => a.display_order - b.display_order)
  }, [principleProgress?.activities])

  const currentActivityIndex = useMemo(() => {
    if (!activity_id || !activities.length) return -1
    return activities.findIndex((a) => a.id === activity_id)
  }, [activities, activity_id])

  const prevActivity =
    currentActivityIndex > 0 ? activities[currentActivityIndex - 1] : null
  const nextActivity =
    currentActivityIndex >= 0 && currentActivityIndex < activities.length - 1
      ? activities[currentActivityIndex + 1]
      : null

  const completedActivityIds = useMemo(() => {
    return new Set(
      (principleProgress?.completions || []).map((c) =>
        String((c as any).activity_id || (c as any).id)
      )
    )
  }, [principleProgress?.completions])

  const isNextActivityLocked = useMemo(() => {
    if (!nextActivity) return false
    const isCompleted = completedActivityIds.has(String(nextActivity.id))
    const isNext =
      nextActivity.id === principleProgress?.next_activity_id ||
      (!principleProgress?.next_activity_id &&
        completedActivityIds.size === 0 &&
        activities[0]?.id === nextActivity.id)
    return !isCompleted && !isNext
  }, [
    nextActivity,
    completedActivityIds,
    principleProgress?.next_activity_id,
    activities,
  ])

  function handleBack() {
    navigate(`/learner/modules/${principleRouteName}`)
  }

  const isLocked = Boolean(
    contents && "detail" in contents && typeof contents.detail === "string"
  )
  const activityContent =
    !isLocked && contents && "kind" in contents ? contents : null

  const isLesson = activityContent?.kind === "lesson"
  const isAssessment =
    activityContent?.kind === "mini" ||
    activityContent?.kind === "pre" ||
    activityContent?.kind === "post" ||
    Boolean(activityContent && "questions" in activityContent)
  const isInteractive =
    activityContent?.kind === "interactive" ||
    Boolean(activityContent && "scenario" in activityContent)

  const title =
    (isLesson && activityContent && "lesson" in activityContent
      ? activityContent.lesson?.title
      : null) ||
    activityContent?.title ||
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
            <Button
              onClick={() => window.location.reload()}
              variant="ghost"
              className="gap-2"
            >
              <RotateCw className="size-4" />
              Refresh
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (isLocked) {
    const detailMessage =
      (contents && "detail" in contents && typeof contents.detail === "string"
        ? contents.detail
        : null) || "Complete earlier activities first"

    return (
      <div
        style={{ minHeight: "70vh" }}
        className="mx-auto my-auto flex items-center justify-center p-4"
      >
        <Card className="max-w-md p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-foreground">Activity Locked</h2>
          <p className="mt-1 text-sm text-muted-foreground">{detailMessage}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Button onClick={handleBack} variant="outline" className="gap-2">
              <ArrowLeft className="size-4" />
              Back to Modules
            </Button>
            {prevActivity && (
              <Button
                onClick={() =>
                  navigate(
                    `/learner/modules/${principleRouteName}/${prevActivity.id}`
                  )
                }
                variant="default"
                className="gap-2"
              >
                <ChevronLeft className="size-4" />
                Previous Activity
              </Button>
            )}
            <Button
              onClick={() => window.location.reload()}
              variant="ghost"
              className="gap-2"
            >
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
              title={`Back to ${principleLabel}`}
              aria-label={`Back to ${principleLabel}`}
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
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!prevActivity}
              onClick={() =>
                prevActivity &&
                navigate(
                  `/learner/modules/${principleRouteName}/${prevActivity.id}`
                )
              }
              title={
                prevActivity
                  ? `Previous Activity: ${(prevActivity as any)?.name || (prevActivity as any)?.title}`
                  : "No previous activity"
              }
              aria-label="Previous Activity"
              className="gap-1 font-semibold"
            >
              <ChevronLeft className="size-3.5" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!nextActivity || isNextActivityLocked}
              onClick={() =>
                nextActivity &&
                !isNextActivityLocked &&
                navigate(
                  `/learner/modules/${principleRouteName}/${nextActivity.id}`
                )
              }
              title={
                !nextActivity
                  ? "Last activity in this principle"
                  : isNextActivityLocked
                    ? `Locked: Complete earlier activities to unlock "${(nextActivity as any)?.name || (nextActivity as any)?.title}"`
                    : `Next Activity: ${(nextActivity as any)?.name || (nextActivity as any)?.title}`
              }
              aria-label="Next Activity"
              className="gap-1 font-semibold"
            >
              <span className="hidden sm:inline">Next</span>
              {isNextActivityLocked ? (
                <Lock className="size-3 text-muted-foreground" />
              ) : (
                <ChevronRight className="size-3.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.reload()}
              title="Refresh Activity"
              aria-label="Refresh Activity"
              className="cursor-pointer gap-1.5 text-xs text-muted-foreground hover:text-foreground"
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
          {isLesson && activityContent && (
            <CoreModuleLessonView
              key={activityContent.id}
              activity={activityContent as CoreModuleLessonActivity}
              principleLabel={principleLabel}
            />
          )}

          {/* Assessment View (Pre / Mini / Post) */}
          {isAssessment && activityContent && (
            <CoreModuleAssessmentView
              key={activityContent.id}
              activity={activityContent as CoreModuleAssessmentActivity}
              principleLabel={principleLabel}
            />
          )}

          {/* Interactive Scenario View */}
          {isInteractive && activityContent && (
            <CoreModuleInteractiveView
              key={activityContent.id}
              activity={activityContent as CoreModuleInteractiveActivity}
              principleLabel={principleLabel}
            />
          )}

          {/* Fallback for other activity kinds */}
          {!isLesson && !isAssessment && !isInteractive && activityContent && (
            <div className="space-y-4">
              <header className="border-b border-border pb-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  {principleLabel}
                </span>
                <h1 className="mt-2 text-2xl font-bold text-foreground">
                  {activityContent.title}
                </h1>
              </header>
              <p className="text-sm text-muted-foreground">
                Activity content is currently unavailable.
              </p>
            </div>
          )}
        </Card>

        {/* Bottom Sequential Activity Navigation */}
        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-border/80 bg-card p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between sm:p-5">
          {/* Previous Activity Button */}
          {prevActivity ? (
            <Button
              variant="outline"
              onClick={() =>
                navigate(
                  `/learner/modules/${principleRouteName}/${prevActivity.id}`
                )
              }
              className="flex h-auto min-h-11 items-center justify-start gap-2.5 px-3.5 py-2 text-left"
              title={`Previous: ${prevActivity.name}`}
            >
              <ChevronLeft className="size-4 shrink-0 text-muted-foreground" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Previous Activity
                </span>
                <span className="max-w-45 truncate text-xs font-bold text-foreground sm:max-w-60">
                  {prevActivity.name}
                </span>
              </div>
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex h-auto min-h-11 items-center justify-start gap-2.5 px-3.5 py-2 text-left"
              title="Return to Principle Overview"
            >
              <ArrowLeft className="size-4 shrink-0 text-muted-foreground" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Module Overview
                </span>
                <span className="text-xs font-bold text-foreground">
                  {principleLabel}
                </span>
              </div>
            </Button>
          )}

          {/* Stepper Position Indicator */}
          {currentActivityIndex !== -1 && activities.length > 0 && (
            <div className="order-first text-center sm:order-none">
              <span className="text-xs font-medium text-muted-foreground">
                Activity{" "}
                <span className="font-bold text-foreground">
                  {currentActivityIndex + 1}
                </span>{" "}
                of {activities.length}
              </span>
            </div>
          )}

          {/* Next Activity Button */}
          {nextActivity ? (
            <Button
              variant={isNextActivityLocked ? "outline" : "default"}
              disabled={isNextActivityLocked}
              onClick={() =>
                !isNextActivityLocked &&
                navigate(
                  `/learner/modules/${principleRouteName}/${nextActivity.id}`
                )
              }
              className="flex h-auto min-h-11 items-center justify-end gap-2.5 px-3.5 py-2 text-right"
              title={
                isNextActivityLocked
                  ? `Locked: Complete earlier activities first to unlock "${nextActivity.name}"`
                  : `Next: ${nextActivity.name}`
              }
            >
              <div className="flex flex-col items-end leading-tight">
                <span className="flex items-center gap-1 text-xs font-semibold tracking-wider uppercase opacity-85">
                  {isNextActivityLocked && <Lock className="size-2.5" />}
                  {isNextActivityLocked ? "Locked" : "Next Activity"}
                </span>
                <span className="max-w-45 truncate text-xs font-bold sm:max-w-60">
                  {nextActivity.name}
                </span>
              </div>
              {isNextActivityLocked ? (
                <Lock className="size-4 shrink-0 text-muted-foreground" />
              ) : (
                <ChevronRight className="size-4 shrink-0" />
              )}
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex h-auto min-h-11 items-center justify-end gap-2.5 px-3.5 py-2 text-right"
              title="Return to Principle Overview"
            >
              <div className="flex flex-col items-end leading-tight">
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Completed Principle
                </span>
                <span className="text-xs font-bold text-foreground">
                  Module Overview
                </span>
              </div>
              <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}

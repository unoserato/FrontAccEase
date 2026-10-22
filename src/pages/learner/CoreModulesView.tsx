import { useEffect, useMemo } from "react"
import HeaderTemplate from "@/components/common/PageTemplate"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Link, useNavigate, useParams } from "react-router-dom"
import NotFound from "../errors/NotFound"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  ClipboardCheck,
  Compass,
  FileQuestion,
  Keyboard,
  Layers,
  Lock,
  Volume2,
} from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { useMe } from "@/services/tanstack/auth"
import { useCoreModuleProgressByPrinciple } from "@/services/tanstack/materials"
import { cn } from "@/lib/utils"
import type { WCAGPrinciple } from "@/const/props/wcagProps"
import type { CoreModuleProgressPrincipleProps } from "@/const/props/moduleProps"

export type CoreModuleActivityItem =
  CoreModuleProgressPrincipleProps["activities"][number]
export type CoreModuleCompletionItem =
  CoreModuleProgressPrincipleProps["completions"][number]

const WCAG_PRINCIPLES = [
  "perceivable",
  "operable",
  "understandable",
  "robust",
] as const

function formatPrincipleTitle(name?: string): string {
  if (!name) return ""
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

function getActivityTypeLabel(type: string): string {
  switch (type?.toLowerCase()) {
    case "pre":
      return "Pre-Assessment"
    case "post":
      return "Post-Assessment"
    case "lesson":
      return "Lesson"
    case "mini":
      return "Mini-Quiz"
    case "interactive":
      return "Interactive"
    default:
      return type ? type.charAt(0).toUpperCase() + type.slice(1) : "Activity"
  }
}

function getActivityIcon(type: string) {
  switch (type?.toLowerCase()) {
    case "pre":
      return ClipboardCheck
    case "post":
      return Award
    case "lesson":
      return BookOpen
    case "mini":
      return FileQuestion
    case "interactive":
      return Keyboard
    default:
      return Layers
  }
}

export default function CoreModulesView() {
  const { principleId } = useParams<{ principleId: string }>()
  const navigate = useNavigate()
  const { data: user } = useMe()

  // Always normalize principleId to lowercase for URL and API integrity
  const normalizedPrinciple = (
    principleId?.toLowerCase() || "perceivable"
  ).toLowerCase() as WCAGPrinciple

  // If URL contains TitleCase (e.g., /learner/modules/Perceivable), immediately rewrite to lowercase
  useEffect(() => {
    if (principleId && principleId !== principleId.toLowerCase()) {
      navigate(`/learner/modules/${principleId.toLowerCase()}`, {
        replace: true,
      })
    }
  }, [principleId, navigate])

  const { data: coreModuleProgress } =
    useCoreModuleProgressByPrinciple(normalizedPrinciple)

  const currentIndex = WCAG_PRINCIPLES.indexOf(normalizedPrinciple as any)
  const prevPrinciple =
    currentIndex > 0 ? WCAG_PRINCIPLES[currentIndex - 1] : null
  const nextPrinciple =
    currentIndex >= 0 && currentIndex < WCAG_PRINCIPLES.length - 1
      ? WCAG_PRINCIPLES[currentIndex + 1]
      : null

  const activities = useMemo(() => {
    return ((coreModuleProgress?.activities || []) as CoreModuleActivityItem[])
      .slice()
      .sort((a, b) => a.display_order - b.display_order)
  }, [coreModuleProgress?.activities])

  const completedActivityIds = useMemo(() => {
    return new Set(
      (
        (coreModuleProgress?.completions || []) as CoreModuleCompletionItem[]
      ).map((c) => String(c.activity_id))
    )
  }, [coreModuleProgress?.completions])

  const nextActivityId = coreModuleProgress?.next_activity_id

  // Effective next activity: use nextActivityId if valid, else first incomplete activity
  const effectiveNextActivityId = useMemo(() => {
    if (nextActivityId && activities.some((a) => a.id === nextActivityId)) {
      return nextActivityId
    }
    const firstIncomplete = activities.find(
      (a) => !completedActivityIds.has(String(a.id))
    )
    return firstIncomplete?.id || null
  }, [nextActivityId, activities, completedActivityIds])

  const totalActivities = activities.length
  const completedCount =
    coreModuleProgress?.completed_activites ??
    (coreModuleProgress as any)?.completed_activities ??
    completedActivityIds.size
  const completedPercent =
    totalActivities > 0
      ? Math.min(100, Math.round((completedCount / totalActivities) * 100))
      : 0

  // const nextActivity = useMemo(() => {
  //   if (effectiveNextActivityId) {
  //     return activities.find((a) => a.id === effectiveNextActivityId) || null
  //   }
  //   return null
  // }, [activities, effectiveNextActivityId])

  const remainingActivities = useMemo(() => {
    return activities.filter((a) => !completedActivityIds.has(String(a.id)))
  }, [activities, completedActivityIds])

  if (!coreModuleProgress && !principleId) {
    return <NotFound />
  }

  const isEditor = user?.role === "admin" || false
  const principleTitle = formatPrincipleTitle(
    coreModuleProgress?.name || normalizedPrinciple
  )
  const principleDescription =
    coreModuleProgress?.description ||
    "Master foundational WCAG success criteria through interactive learning and assessment."

  return (
    <section className="p-responsive">
      <HeaderTemplate
        title={principleTitle}
        subtitle={principleDescription}
        backTo="/learner/modules"
        cta={[
          prevPrinciple ? (
            <Link
              key="prev-principle"
              to={`/learner/modules/${prevPrinciple}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-1.5 font-semibold"
              )}
              title={`Previous: ${formatPrincipleTitle(prevPrinciple)}`}
            >
              <ChevronLeft className="size-4" />
              Previous
            </Link>
          ) : (
            <Button
              key="prev-principle"
              variant="outline"
              size="sm"
              disabled
              className="gap-1.5 font-semibold opacity-50"
              title="No previous principle"
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
          ),
          nextPrinciple ? (
            <Link
              key="next-principle"
              to={`/learner/modules/${nextPrinciple}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-1.5 font-semibold"
              )}
              title={`Next: ${formatPrincipleTitle(nextPrinciple)}`}
            >
              Next
              <ChevronRight className="size-4" />
            </Link>
          ) : (
            <Button
              key="next-principle"
              variant="outline"
              size="sm"
              disabled
              className="gap-1.5 font-semibold opacity-50"
              title="No next principle"
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          ),
        ]}
      />

      <div className="grid grid-cols-1 gap-6 pt-6 sm:pt-6 lg:grid-cols-3">
        {/* Left Column: Learning Pathway */}
        <div
          className={`space-y-4 ${isEditor ? "col-span-3" : "lg:col-span-2"}`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Learning Pathway
              </CardTitle>
              <Badge variant="secondary" className="text-xs font-semibold">
                {completedCount} / {totalActivities} Completed
              </Badge>
            </div>

            <CardContent className="p-0 sm:pt-0">
              {activities.length === 0 ? (
                <Card className="flex flex-col items-center justify-center border-dashed p-10 text-center">
                  <Layers className="mb-3 size-10 text-muted-foreground/40" />
                  <h3 className="text-base font-bold text-foreground">
                    No Activities Available
                  </h3>
                  <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                    Activities for this module have not been published yet.
                    Check back soon for interactive lessons and assessments.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/learner/modules")}
                    className="mt-4"
                  >
                    Browse All Modules
                  </Button>
                </Card>
              ) : (
                <div className="w-full space-y-4">
                  {activities.map((activity) => {
                    const isCompleted = completedActivityIds.has(
                      String(activity.id)
                    )
                    const isNext =
                      !isCompleted && activity.id === effectiveNextActivityId
                    // URL manipulation protection: locked if not completed and not current next activity
                    const isLocked = !isCompleted && !isNext
                    const ActivityIcon = getActivityIcon(activity.type)
                    // Ensure link is always lowercase to prevent title case routing issues
                    const activityLink = `/learner/modules/${normalizedPrinciple}/${activity.id}`

                    return (
                      <div
                        key={activity.id}
                        className="group flex w-full gap-3 sm:gap-5"
                      >
                        {/* Stepper Node & Vertical Line */}
                        <div className="flex shrink-0 flex-col items-center gap-1">
                          {isCompleted ? (
                            <div className="flex size-7 items-center justify-center rounded-full bg-foreground text-background">
                              <CheckCircle2 className="size-4" />
                            </div>
                          ) : isNext ? (
                            <div className="flex size-7 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary">
                              <CircleDashed className="size-4 animate-spin" />
                            </div>
                          ) : (
                            <div className="flex size-7 items-center justify-center rounded-full border border-border bg-muted/40 text-muted-foreground/60">
                              <Lock className="size-3" />
                            </div>
                          )}
                          <div className="mt-2 h-full w-0.5 bg-border group-last:hidden" />
                        </div>

                        {/* Activity Card Item */}
                        <div
                          className={`w-full rounded-xl border bg-card p-4 shadow-sm transition-all sm:p-5 ${
                            isNext
                              ? "border-primary/50 ring-1 ring-primary/20 hover:border-border hover:shadow-md"
                              : isLocked
                                ? "border-border/60 opacity-80"
                                : "border-border/80 hover:border-border hover:shadow-md"
                          }`}
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-3">
                              <div
                                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                                  isCompleted
                                    ? "bg-foreground/10 text-foreground"
                                    : isNext
                                      ? "bg-primary/10 text-primary"
                                      : "bg-muted text-muted-foreground/60"
                                }`}
                              >
                                <ActivityIcon className="size-5" />
                              </div>
                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                                    {activity.name}
                                  </h3>
                                  <Badge
                                    variant={
                                      activity.type === "lesson"
                                        ? "default"
                                        : activity.type === "interactive"
                                          ? "secondary"
                                          : "outline"
                                    }
                                    className="text-xs font-bold tracking-wider uppercase"
                                  >
                                    {getActivityTypeLabel(activity.type)}
                                  </Badge>
                                  {isNext && (
                                    <Badge
                                      variant="default"
                                      className="text-xs font-bold"
                                    >
                                      Up Next
                                    </Badge>
                                  )}
                                  {isLocked && (
                                    <span className="text-xs font-medium text-muted-foreground">
                                      Locked
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {activity.description ||
                                    "Educational curriculum activity."}
                                </p>
                              </div>
                            </div>

                            {/* Right side Status & Action */}
                            <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
                              {isLocked ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled
                                  className="cursor-not-allowed font-semibold opacity-60 shadow-2xs"
                                  title="Complete earlier activities first to unlock"
                                >
                                  <Lock className="mr-1.5 size-3.5" />
                                  Locked
                                </Button>
                              ) : (
                                <Link
                                  to={activityLink}
                                  className={buttonVariants({
                                    variant: isNext ? "default" : "outline",
                                    size: "sm",
                                    className: "font-semibold shadow-2xs",
                                  })}
                                >
                                  {isCompleted
                                    ? "Review"
                                    : completedCount > 0
                                      ? "Continue"
                                      : "Start"}
                                  {isNext && (
                                    <ChevronRight className="ml-1 size-3.5" />
                                  )}
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>

            {/* Bottom Next / Previous Principle Navigation */}
            <div className="flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
              {prevPrinciple ? (
                <Link
                  to={`/learner/modules/${prevPrinciple}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex h-auto w-full flex-col items-start gap-1 p-3.5 text-left sm:w-auto sm:max-w-xs"
                  )}
                >
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground">
                    <ChevronLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                    Previous Module
                  </span>
                  <span className="max-w-full truncate font-bold text-foreground">
                    {formatPrincipleTitle(prevPrinciple)}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPrinciple ? (
                <Link
                  to={`/learner/modules/${nextPrinciple}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group ml-auto flex h-auto w-full flex-col items-end gap-1 p-3.5 text-right sm:w-auto sm:max-w-xs"
                  )}
                >
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground">
                    Next Module
                    <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="max-w-full truncate font-bold text-foreground">
                    {formatPrincipleTitle(nextPrinciple)}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/learner/modules"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group ml-auto flex h-auto w-full flex-col items-end gap-1 p-3.5 text-right sm:w-auto sm:max-w-xs"
                  )}
                >
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground">
                    All Modules
                    <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="font-bold text-foreground">
                    Back to Modules Overview
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        {!isEditor && (
          <div className="space-y-4 sm:space-y-6 lg:col-span-1">
            {/* Card 1: Module Progress */}
            <Card className="border border-border/80 shadow-sm">
              <CardHeader className="p-4 sm:p-5">
                <div className="flex items-center gap-2 text-foreground">
                  <CircleDashed className="size-5 stroke-2 text-foreground" />
                  <CardTitle className="text-base font-bold sm:text-lg">
                    Module Progress
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 p-4 pt-0 sm:p-5 sm:pt-0">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                      {completedPercent}%
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground sm:text-sm">
                      Completed
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <Progress
                    value={completedPercent}
                    className="mt-3 w-full [&_[data-slot=progress-indicator]]:bg-foreground [&_[data-slot=progress-track]]:h-2.5"
                    aria-label="Module Progress"
                  />
                </div>

                {/* Progress Stats */}
                <div className="grid grid-cols-2 gap-4 border-t border-border/60 pt-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Activities
                    </p>
                    <p className="mt-1 text-base font-bold text-foreground sm:text-lg">
                      {completedCount} / {totalActivities}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Status
                    </p>
                    <p className="mt-1 text-base font-bold text-foreground sm:text-lg">
                      {completedCount === totalActivities && totalActivities > 0
                        ? "Completed"
                        : "In Progress"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Next Up Focus Card */}
            {/* {nextActivity && (
              <Card className="border border-primary/40 bg-primary/5 shadow-sm">
                <CardHeader className="p-4 pb-2 sm:p-5">
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="size-4" />
                    <span className="text-xs font-bold tracking-wider text-primary uppercase">
                      Next Milestone
                    </span>
                  </div>
                  <CardTitle className="mt-1 text-base font-bold text-foreground sm:text-lg">
                    {nextActivity.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4 pt-0 sm:p-5 sm:pt-0">
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {nextActivity.description ||
                      "Continue your progress on this module."}
                  </p>
                  <Link
                    to={`/learner/modules/${normalizedPrinciple}/${nextActivity.id}`}
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" }),
                      "w-full justify-center gap-1.5 font-semibold shadow-2xs"
                    )}
                  >
                    Continue Activity
                    <ChevronRight className="size-3.5" />
                  </Link>
                </CardContent>
              </Card>
            )} */}

            {/* Card 3: Earned Badges */}
            <EarnedBadges
              completedCount={completedCount}
              completedPercent={completedPercent}
            />

            {/* Card 4: Remaining Activities */}
            <Card className="border border-border/80 shadow-sm">
              <CardHeader className="p-4 sm:p-5">
                <div className="flex items-center gap-2 text-foreground">
                  <Layers className="size-5 stroke-2 text-foreground" />
                  <CardTitle className="text-base font-bold sm:text-lg">
                    Remaining Activities
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2.5 p-4 pt-0 sm:p-5 sm:pt-0">
                {remainingActivities.length > 0 ? (
                  remainingActivities.slice(0, 4).map((rem) => {
                    const RemIcon = getActivityIcon(rem.type)
                    return (
                      <div
                        key={rem.id}
                        className="flex items-center gap-3 rounded-lg bg-muted/40 px-3 py-2.5 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
                      >
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border/50 bg-background text-muted-foreground">
                          <RemIcon className="size-4" />
                        </div>
                        <span className="truncate text-xs font-semibold sm:text-sm">
                          {rem.name}
                        </span>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-xs text-muted-foreground">
                    All activities completed for this module!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* ======================== PREVIOUS UI (COMMENTED OUT) ==================== */}
      {/* ========================================================================= */}
      {/*
      <div className="hidden" aria-hidden="true">
        <HeaderTemplate
          title={principleTitle}
          subtitle={principleDescription}
          backTo="/learner/modules"
          cta={[
            <Button
              key="prev-principle-old"
              variant="outline"
              size="sm"
              disabled={!prevPrinciple}
              className="gap-1.5 font-semibold"
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>,
            <Button
              key="next-principle-old"
              variant="outline"
              size="sm"
              disabled={!nextPrinciple}
              className="gap-1.5 font-semibold"
            >
              Next
              <ChevronRight className="size-4" />
            </Button>,
          ]}
        />
        <div className="grid grid-cols-1 gap-6 pt-6 sm:pt-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  Learning Pathway (Old)
                </CardTitle>
              </div>
              <CardContent className="p-0 sm:pt-0">
                <div className="w-full space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="group flex w-full gap-3 sm:gap-5">
                      <div className="flex shrink-0 flex-col items-center gap-1">
                        <div className="flex size-7 items-center justify-center rounded-full bg-foreground text-background">
                          <CheckCircle2 className="size-4" />
                        </div>
                        <div className="mt-2 h-full w-0.5 bg-border group-last:hidden" />
                      </div>
                      <div className="w-full rounded-xl border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-foreground/10 text-foreground">
                              <BookOpen className="size-5" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                                {activity.name}
                              </h3>
                              <p className="text-xs text-muted-foreground">{activity.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
          </div>
        </div>
      </div>
      */}
    </section>
  )
}

export function EarnedBadges({
  completedCount = 0,
  completedPercent = 0,
}: {
  completedCount?: number
  completedPercent?: number
}) {
  const badges = [
    {
      id: "b1",
      title: "Foundations Pioneer",
      subtitle:
        completedCount > 0
          ? `${completedCount} activit${completedCount === 1 ? "y" : "ies"} completed`
          : "Complete your first activity",
      icon: Volume2,
      earned: completedCount > 0,
    },
    {
      id: "b2",
      title: "WCAG Explorer",
      subtitle:
        completedPercent > 0
          ? `${completedPercent}% foundations met`
          : "Start module to earn badge",
      icon: Compass,
      earned: completedPercent > 0,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-foreground">
          <Award className="size-5" />
          <CardTitle className="text-base font-bold sm:text-lg">
            Earned Badges
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-4 pt-0 sm:p-5 sm:pt-0">
        {badges.map((badge) => {
          const IconComponent = badge.icon
          return (
            <div
              key={badge.id}
              className={`flex items-center gap-3.5 rounded-xl border border-border/70 bg-card p-3 shadow-2xs transition-colors ${
                badge.earned ? "" : "opacity-70"
              }`}
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                  badge.earned
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground/60"
                }`}
              >
                <IconComponent className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-foreground sm:text-sm">
                  {badge.title}
                </p>
                <p className="truncate text-xs font-medium text-muted-foreground">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export const EarnedBagdes = EarnedBadges

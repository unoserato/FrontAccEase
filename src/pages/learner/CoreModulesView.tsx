import { useMemo } from "react"
import HeaderTemplate from "@/components/common/PageTemplate"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PrincipleProgressProps } from "@/const/props/moduleProps"
import { Link, useNavigate, useParams } from "react-router-dom"
import NotFound from "../errors/NotFound"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  BookOpen,
  CheckCircle2,
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
import { useCoreModuleProgress } from "@/services/tanstack/materials"

function getActivityKindLabel(kind: string): string {
  switch (kind) {
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
      return kind
  }
}

function getActivityDescription(kind: string): string {
  switch (kind) {
    case "pre":
      return "Diagnostic baseline assessment measuring prerequisite WCAG knowledge."
    case "post":
      return "Final comprehensive evaluation measuring your criteria comprehension."
    case "lesson":
      return "Curriculum lesson breakdown, specifications, and compliant code examples."
    case "mini":
      return "Quick formative assessment checking understanding of preceding concepts."
    case "interactive":
      return "Hands-on remediation exercise to identify and correct accessibility defects."
    default:
      return "Educational module activity."
  }
}

function getActivityIcon(kind: string) {
  switch (kind) {
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

function getActivityLink(
  principleName: string,
  activityId: string,
  kind: string
): string {
  if (kind === "pre" || kind === "mini" || kind === "post") {
    return `/learner/modules/${principleName}/${activityId}`
  }
  return `/learner/modules/${principleName}/${activityId}`
}

export default function CoreModulesView() {
  const { principleId } = useParams()
  const navigate = useNavigate()
  const { data: user } = useMe()
  const { data: coreModuleProgress } = useCoreModuleProgress()

  const matchedPrinciple = coreModuleProgress?.principles.find(
    (p) =>
      p.name.toLowerCase() === principleId?.toLowerCase() ||
      p.content.id === principleId
  )
  const principleContent = matchedPrinciple?.content

  const activities = useMemo(() => {
    return (principleContent?.activities || [])
      .slice()
      .sort((a, b) => a.display_order - b.display_order)
  }, [principleContent?.activities])

  const completedActivityIds = useMemo(() => {
    return new Set(
      (principleContent?.completions || []).map((c) =>
        String((c as any).activity_id || (c as any).id)
      )
    )
  }, [principleContent?.completions])

  const attemptsMap = useMemo(() => {
    const map = new Map<
      string,
      { score?: number; passed?: boolean; attempt_number?: number }
    >()
    ;(principleContent?.attempts || []).forEach((att) => {
      if (att.activity_id) {
        map.set(String(att.activity_id), att as any)
      }
    })
    return map
  }, [principleContent?.attempts])

  const remainingActivities = useMemo(() => {
    return activities
      .filter((a) => !completedActivityIds.has(String(a.id)))
      .slice(0, 4)
      .map((a) => ({
        id: a.id,
        title: a.title,
        icon: getActivityIcon(a.kind),
      }))
  }, [activities, completedActivityIds])

  if (!matchedPrinciple && coreModuleProgress) {
    return <NotFound />
  }

  const isEditor = user?.role === "admin" || false
  const completedPercent = Math.round(principleContent?.percentage ?? 0)
  const principleName = matchedPrinciple?.name || principleId || "perceivable"
  const principleTitle =
    principleContent?.revision?.title ||
    principleContent?.title ||
    principleName.charAt(0).toUpperCase() + principleName.slice(1)
  const principleDescription =
    principleContent?.revision?.description ||
    "Master foundational WCAG success criteria through interactive learning and assessment."

  return (
    <section className="p-responsive">
      <HeaderTemplate
        title={principleTitle}
        subtitle={principleDescription}
        backTo="/learner/modules"
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
                {principleContent?.completed_activities ?? 0} /{" "}
                {principleContent?.total_activities ?? activities.length}{" "}
                Completed
              </Badge>
            </div>

            <CardContent className="p-0 sm:pt-0">
              {activities.length === 0 ? (
                <Card className="flex flex-col items-center justify-center border-dashed p-10 text-center">
                  <Layers className="mb-3 size-10 text-muted-foreground/40" />
                  <h3 className="text-base font-bold text-foreground">
                    {principleContent?.status === "unavailable"
                      ? "Curriculum Under Construction"
                      : "No Activities Available"}
                  </h3>
                  <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                    {principleContent?.status === "unavailable"
                      ? "This WCAG principle module is currently being finalized. Check back soon for interactive lessons and assessments."
                      : "Activities for this module have not been published yet."}
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
                      activity.id === principleContent?.next_activity_id ||
                      (!principleContent?.next_activity_id &&
                        completedActivityIds.size === 0 &&
                        activities[0]?.id === activity.id)
                    const isLocked = !isCompleted && !isNext
                    const attempt = attemptsMap.get(String(activity.id))
                    const ActivityIcon = getActivityIcon(activity.kind)

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
                                    {activity.title}
                                  </h3>
                                  <Badge
                                    variant={
                                      activity.kind === "lesson"
                                        ? "default"
                                        : activity.kind === "interactive"
                                          ? "secondary"
                                          : "outline"
                                    }
                                    className="text-xs font-bold tracking-wider uppercase"
                                  >
                                    {getActivityKindLabel(activity.kind)}
                                  </Badge>
                                  {isNext && (
                                    <Badge
                                      variant="default"
                                      className="text-xs font-bold"
                                    >
                                      Up Next
                                    </Badge>
                                  )}
                                  {activity.required &&
                                    !isCompleted &&
                                    !isNext && (
                                      <span className="text-xs font-medium text-muted-foreground">
                                        Required
                                      </span>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {getActivityDescription(activity.kind)}
                                </p>
                              </div>
                            </div>

                            {/* Right side Status & Action */}
                            <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
                              {attempt && typeof attempt.score === "number" && (
                                <Badge
                                  variant="secondary"
                                  className={`text-xs font-semibold ${
                                    attempt.passed
                                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                      : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                  }`}
                                >
                                  Score: {Math.round(attempt.score)}%
                                </Badge>
                              )}
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
                                  to={getActivityLink(
                                    principleName,
                                    activity.id,
                                    activity.kind
                                  )}
                                  className={buttonVariants({
                                    variant: isNext ? "default" : "outline",
                                    size: "sm",
                                    className: "font-semibold shadow-2xs",
                                  })}
                                >
                                  {isCompleted ? "Review" : "Continue"}
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
                  <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-foreground transition-all duration-500"
                      style={{
                        width: `${completedPercent}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Progress Stats */}
                <div className="grid grid-cols-2 gap-4 border-t border-border/60 pt-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Activities
                    </p>
                    <p className="mt-1 text-base font-bold text-foreground sm:text-lg">
                      {principleContent?.completed_activities ?? 0} /{" "}
                      {principleContent?.total_activities ?? activities.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Lessons
                    </p>
                    <p className="mt-1 text-base font-bold text-foreground sm:text-lg">
                      {principleContent?.completed_lessons ?? 0} /{" "}
                      {principleContent?.total_lessons ?? 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Earned Badges */}
            <EarnedBagdes principleData={principleContent} />

            {/* Card 3: Remaining Activities */}
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
                  remainingActivities.map((rem) => {
                    const IconComponent = rem.icon
                    return (
                      <div
                        key={rem.id}
                        className="flex items-center gap-3 rounded-lg bg-muted/40 px-3 py-2.5 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
                      >
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border/50 bg-background text-muted-foreground">
                          <IconComponent className="size-4" />
                        </div>
                        <span className="truncate text-xs font-semibold sm:text-sm">
                          {rem.title}
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
    </section>
  )
}

export function EarnedBagdes({
  principleData,
}: {
  principleData?: PrincipleProgressProps
}) {
  const { data: coreProgress } = useCoreModuleProgress()
  const activeData =
    principleData ||
    coreProgress?.principles.find((p) => p.name === "perceivable")?.content

  const badges = [
    {
      id: "b1",
      title: "Screen Reader Rookie",
      subtitle:
        (activeData?.completed_lessons ?? 0) > 0
          ? `${activeData?.completed_lessons} lesson${activeData?.completed_lessons === 1 ? "" : "s"} completed`
          : "Complete your first lesson",
      icon: Volume2,
      earned: (activeData?.completed_lessons ?? 0) > 0,
    },
    {
      id: "b2",
      title: "ARIA Explorer",
      subtitle:
        (activeData?.percentage ?? 0) > 0
          ? `${Math.round(activeData?.percentage ?? 0)}% foundations met`
          : "Foundations Met",
      icon: Compass,
      earned: (activeData?.percentage ?? 0) > 0,
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

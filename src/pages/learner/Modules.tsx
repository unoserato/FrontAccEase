import HeaderTemplate from "@/components/common/PageTemplate"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { PrincipleProgressItem } from "@/const/props/moduleProps"
import { startPrincipleAPI } from "@/services/api/CRUD/materialsCRUDAPI"
import { useCoreModuleProgress } from "@/services/tanstack/materials"
import { ArrowUpRight, Brain, Code, Eye, Keyboard, Layers } from "lucide-react"
import { Link } from "react-router-dom"

function PrincipleIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  switch (name.toLowerCase()) {
    case "perceivable":
      return <Eye className={className} />
    case "operable":
      return <Keyboard className={className} />
    case "understandable":
      return <Brain className={className} />
    case "robust":
      return <Code className={className} />
    default:
      return <Layers className={className} />
  }
}

export default function Modules() {
  const { data: coreModuleProgress } = useCoreModuleProgress()

  return (
    <section className="p-responsive">
      <HeaderTemplate
        title="Modules"
        subtitle="Track your progress and continue learning."
      />
      <div className="space-y-12">
        <ContinueLearningCard />
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Core Principles</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {coreModuleProgress?.principles.map((principle) => {
              return (
                <Link
                  onClick={async () => await startPrincipleAPI(principle.name)}
                  to={`./${principle.name}`}
                  key={principle.name}
                >
                  <CoreModuleCardTemplate principle={principle} />
                </Link>
              )
            })}
          </div>
        </section>
        <div className="space-y-4">{/* {modules.map(()=> )} */}</div>
      </div>
    </section>
  )
}

export function CoreModuleCardTemplate({
  principle,
}: {
  principle: PrincipleProgressItem
}) {
  const progress = Math.round(principle.content.percentage ?? 0)
  const title =
    principle.content.title ||
    principle.name.charAt(0).toUpperCase() + principle.name.slice(1)
  const description =
    principle.content.revision?.description ||
    "Master foundational WCAG success criteria and interactive accessibility lessons."

  return (
    <Card className="group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden p-6 shadow-sm transition-all hover:border-border hover:shadow-md">
      {/* Top right watermark icon */}
      <div className="pointer-events-none absolute top-3 right-3 text-muted-foreground/10 transition-transform duration-300 select-none group-hover:scale-105">
        <PrincipleIcon name={principle.name} className="h-28 w-28 stroke-1" />
      </div>

      <div className="relative z-10 flex-1">
        {/* Top left badge icon */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
            progress > 0
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground/60"
          }`}
        >
          <PrincipleIcon name={principle.name} className="h-6 w-6 stroke-2" />
        </div>

        {/* Title & Description */}
        <h3 className="mt-4 mb-2 text-xl font-bold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mb-6 line-clamp-3 text-sm leading-relaxed font-normal text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 mt-auto pt-2">
        <div className="mb-2 flex items-center justify-between text-xs font-bold text-foreground">
          <span>Mastery Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-foreground transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Card>
  )
}

export function ContinueLearningCard() {
  const { data: coreModuleProgress } = useCoreModuleProgress()

  const activePrinciple =
    coreModuleProgress?.principles.find(
      (p) => p.content.status === "in_progress"
    ) ||
    coreModuleProgress?.principles.find(
      (p) =>
        p.content.status !== "unavailable" && p.content.total_activities > 0
    ) ||
    coreModuleProgress?.principles[0]

  const nextActivity = activePrinciple?.content.activities?.find(
    (a) => a.id === activePrinciple.content.next_activity_id
  )

  const title =
    nextActivity?.title ||
    activePrinciple?.content.title ||
    "Core Accessibility Modules"

  const description =
    activePrinciple?.content.revision?.description ||
    "Master foundational WCAG success criteria and interactive accessibility lessons."

  const principleName = activePrinciple?.name || "perceivable"

  const linkTarget = nextActivity
    ? `/learner/modules/${principleName}/${nextActivity.id}`
    : `/learner/modules/${principleName}`

  const badgeText =
    activePrinciple?.content.title ||
    (activePrinciple?.name
      ? activePrinciple.name.charAt(0).toUpperCase() +
        activePrinciple.name.slice(1)
      : "Core Principle")

  return (
    <Card className="cursor-pointer invert transition-all hover:opacity-95">
      <CardHeader>
        <div className="flex gap-2">
          <div
            style={{ maxWidth: "calc(100% - 2.5rem)" }}
            className="w-fit truncate bg-foreground px-1.5 py-0.5 text-xs font-medium tracking-wider text-background uppercase sm:px-2 sm:text-xs"
          >
            <p className="truncate">{badgeText}</p>
          </div>
        </div>
        <CardTitle>
          <p className="line-clamp-2 text-3xl font-bold">{title}</p>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-end">
        <Link
          to={linkTarget}
          className={buttonVariants({ variant: "default" })}
        >
          Continue Learning <ArrowUpRight />
        </Link>
      </CardFooter>
    </Card>
  )
}

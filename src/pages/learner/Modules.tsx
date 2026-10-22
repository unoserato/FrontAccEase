import HeaderTemplate from "@/components/common/PageTemplate"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type {
  CoreModuleProgressItemProps,
  NextActivityProps,
} from "@/const/props/moduleProps"
import { useCoreModuleProgress } from "@/services/tanstack/materials"
import { ArrowUpRight, Brain, Code, Eye, Keyboard, Layers } from "lucide-react"
import { Link } from "react-router-dom"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"

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
  const next_activity = coreModuleProgress.next_activity

  return (
    <section className="p-responsive">
      <HeaderTemplate
        title="Learning Modules"
        subtitle="Track your progress and continue learning."
      />
      <div className="space-y-12">
        <ContinueLearningCard
          active_principle={coreModuleProgress.active_principle}
          next_activity={next_activity}
        />
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Core Principles</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {coreModuleProgress?.principles.map((principle) => {
              return (
                <Link
                  to={`./${principle.name.toLocaleLowerCase()}`}
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

// export function CoreModuleCardTemplate({
//   principle,
// }: {
//   principle: PrincipleProgressItem
// }) {
//   const progress = Math.round(principle.content.percentage ?? 0)
//   const title =
//     principle.content.title ||
//     principle.name.charAt(0).toUpperCase() + principle.name.slice(1)
//   const description =
//     principle.content.revision?.description ||
//     "Master foundational WCAG success criteria and interactive accessibility lessons."

//   return (
//     <Card className="group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden p-6 shadow-sm transition-all hover:border-border hover:shadow-md">
//       {/* Top right watermark icon */}
//       <div className="pointer-events-none absolute top-3 right-3 text-muted-foreground/10 transition-transform duration-300 select-none group-hover:scale-105">
//         <PrincipleIcon name={principle.name} className="h-28 w-28 stroke-1" />
//       </div>

//       <div className="relative z-10 flex-1">
//         {/* Top left badge icon */}
//         <div
//           className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
//             progress > 0
//               ? "bg-foreground text-background"
//               : "bg-muted text-muted-foreground/60"
//           }`}
//         >
//           <PrincipleIcon name={principle.name} className="h-6 w-6 stroke-2" />
//         </div>

//         {/* Title & Description */}
//         <h3 className="mt-4 mb-2 text-xl font-bold tracking-tight text-foreground">
//           {title}
//         </h3>
//         <p className="mb-6 line-clamp-3 text-sm leading-relaxed font-normal text-muted-foreground">
//           {description}
//         </p>
//       </div>

//       {/* Progress bar */}
//       <div className="relative z-10 mt-auto pt-2">
//         <div className="mb-2 flex items-center justify-between text-xs font-bold text-foreground">
//           <span>Mastery Progress</span>
//           <span>{progress}%</span>
//         </div>
//         <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
//           <div
//             className="h-full rounded-full bg-foreground transition-all duration-500 ease-out"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </div>
//     </Card>
//   )
// }

export function CoreModuleCardTemplate({
  principle,
}: {
  principle: CoreModuleProgressItemProps
}) {
  const progress = Math.round(principle.progress ?? 0)
  const title = principle.name
  const description = principle.description

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
        <Progress
          value={progress}
          className="w-full gap-2 [&_[data-slot=progress-indicator]]:bg-foreground [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:bg-slate-200/80 dark:[&_[data-slot=progress-track]]:bg-slate-800"
        >
          <div className="flex w-full items-center justify-between">
            <ProgressLabel className="text-xs font-bold text-foreground">
              Mastery Progress
            </ProgressLabel>
            <ProgressValue className="text-xs font-bold text-foreground" />
          </div>
        </Progress>
      </div>
    </Card>
  )
}

// export function ContinueLearningCard() {
//   const { data: coreModuleProgress } = useCoreModuleProgress()

//   const activePrinciple =
//     coreModuleProgress?.principles.find(
//       (p) => p.content.status === "in_progress"
//     ) ||
//     coreModuleProgress?.principles.find(
//       (p) =>
//         p.content.status !== "unavailable" && p.content.total_activities > 0
//     ) ||
//     coreModuleProgress?.principles[0]

//   const nextActivity = activePrinciple?.content.activities?.find(
//     (a) => a.id === activePrinciple.content.next_activity_id
//   )

//   const title =
//     nextActivity?.title ||
//     activePrinciple?.content.title ||
//     "Core Accessibility Modules"

//   const description =
//     activePrinciple?.content.revision?.description ||
//     "Master foundational WCAG success criteria and interactive accessibility lessons."

//   const principleName = activePrinciple?.name || "perceivable"

//   const linkTarget = nextActivity
//     ? `/learner/modules/${principleName}/${nextActivity.id}`
//     : `/learner/modules/${principleName}`

//   const badgeText =
//     activePrinciple?.content.title ||
//     (activePrinciple?.name
//       ? activePrinciple.name.charAt(0).toUpperCase() +
//         activePrinciple.name.slice(1)
//       : "Core Principle")

//   return (
//     <Card className="cursor-pointer invert transition-all hover:opacity-95">
//       <CardHeader>
//         <div className="flex gap-2">
//           <div
//             style={{ maxWidth: "calc(100% - 2.5rem)" }}
//             className="w-fit truncate bg-foreground px-1.5 py-0.5 text-xs font-medium tracking-wider text-background uppercase sm:px-2 sm:text-xs"
//           >
//             <p className="truncate">{badgeText}</p>
//           </div>
//         </div>
//         <CardTitle>
//           <p className="line-clamp-2 text-3xl font-bold">{title}</p>
//         </CardTitle>
//         <CardDescription>{description}</CardDescription>
//       </CardHeader>

//       <CardFooter className="flex justify-end">
//         <Link
//           to={linkTarget}
//           className={buttonVariants({ variant: "default" })}
//         >
//           Continue Learning <ArrowUpRight />
//         </Link>
//       </CardFooter>
//     </Card>
//   )
// }

export function ContinueLearningCard({
  active_principle,
  next_activity,
}: {
  active_principle: string
  next_activity: NextActivityProps
}) {
  const targetLink = next_activity?.id
    ? `/learner/modules/${(active_principle || "perceivable").toLowerCase()}/${next_activity.id}`
    : `/learner/modules/${(active_principle || "perceivable").toLowerCase()}`

  return (
    <Card className="cursor-pointer invert transition-all hover:opacity-95">
      <CardHeader>
        <div className="flex gap-2">
          <div
            style={{ maxWidth: "calc(100% - 2.5rem)" }}
            className="w-fit truncate bg-foreground px-1.5 py-0.5 text-xs font-medium tracking-wider text-background uppercase sm:px-2 sm:text-xs"
          >
            <p className="truncate">{active_principle}</p>
          </div>
        </div>
        <CardTitle>
          <p className="line-clamp-2 text-3xl font-bold">
            {next_activity.name}
          </p>
        </CardTitle>
        <CardDescription>{next_activity.description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-end">
        <Link
          to={targetLink}
          className={buttonVariants({ variant: "default" })}
        >
          Continue Learning <ArrowUpRight />
        </Link>
      </CardFooter>
    </Card>
  )
}

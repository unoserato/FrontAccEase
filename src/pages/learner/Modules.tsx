import HeaderTemplate from "@/components/common/PageTemplate"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { coreModules } from "@/const/coreModules"
// import { modules } from "@/const/data"
import type { CoreModulesProps } from "@/const/materialsProps"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

export const MOCK_MODULE_PROGRESS: Record<string, number> = {
  perceivable: 75,
  operable: 40,
  understandable: 10,
  robust: 0,
}
const continueModule = coreModules[0].topics[0].lessons[0]

export default function Modules() {
  return (
    <section className="p-responsive">
      <HeaderTemplate
        title="Learning Modules"
        subtitle="Track your progress and continue learning."
      />
      <div className="space-y-12">
        <ContinueLearningCard />
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Core Principles</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {coreModules.map((coreModule) => (
              <Link to={`./${coreModule.id}`} key={coreModule.id}>
                <CoreModuleCardTemplate
                  module={coreModule}
                  progress={MOCK_MODULE_PROGRESS[coreModule.id] ?? 0}
                />
              </Link>
            ))}
          </div>
        </section>
        <div className="space-y-4">{/* {modules.map(()=> )} */}</div>
      </div>
    </section>
  )
}

export function CoreModuleCardTemplate({
  module,
  progress = 0,
}: {
  module: CoreModulesProps
  progress?: number
}) {
  const Icon = module.icon

  return (
    <Card className="group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden p-6 shadow-sm transition-all hover:border-border hover:shadow-md">
      {/* Top right watermark icon */}
      {Icon && (
        <div className="pointer-events-none absolute top-3 right-3 text-muted-foreground/10 transition-transform duration-300 select-none group-hover:scale-105">
          <Icon className="h-28 w-28 stroke-1" />
        </div>
      )}

      <div className="relative z-10 flex-1">
        {/* Top left badge icon */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
            progress > 0
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground/60"
          }`}
        >
          {Icon && <Icon className="h-6 w-6 stroke-2" />}
        </div>

        {/* Title & Description */}
        <h3 className="mt-4 mb-2 text-xl font-bold tracking-tight text-foreground">
          {module.principle}
        </h3>
        <p className="mb-6 line-clamp-3 text-sm leading-relaxed font-normal text-muted-foreground">
          {module.description}
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
  return (
    <Card className="cursor-pointer invert transition-all hover:opacity-95">
      <CardHeader>
        <div className="flex gap-2">
          <div style={{ maxWidth: "calc(100% - 2.5rem)" }} className="w-fit truncate bg-foreground px-1.5 py-0.5 text-xs font-medium tracking-wider text-background uppercase sm:px-2 sm:text-xs">
            <p className="truncate">{coreModules[0].principle}</p>
          </div>
        </div>
        <CardTitle>
          <p className="line-clamp-2 text-3xl font-bold">
            {continueModule.name}
          </p>
        </CardTitle>
        <CardDescription>{continueModule.description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-end">
        <Link
          to="/learner/modules/perceivable/topic-1-1/lesson-1-1-1"
          className={buttonVariants({ variant: "default" })}
        >
          Continue Learning <ArrowUpRight />
        </Link>
      </CardFooter>
    </Card>
  )
}

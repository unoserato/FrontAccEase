import HeaderTemplate from "@/components/common/PageTemplate"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { coreModules } from "@/const/coreModules"
// import { modules } from "@/const/data"
import type { CoreModulesProps } from "@/const/materialsProps"
import { ArrowUpRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

const MOCK_MODULE_PROGRESS: Record<string, number> = {
  perceivable: 75,
  operable: 40,
  understandable: 10,
  robust: 0,
}

export default function Modules() {
  const navigate = useNavigate()
  const continueModule = coreModules[0].topics[0].lessons[0]

  function handleContinue() {
    navigate(
      `./${coreModules[0].id}/${coreModules[0].topics[0].id}/${continueModule.id}`
    )
  }

  return (
    <section className="p-responsive">
      <HeaderTemplate
        title="Learning Modules"
        subtitle="Track your progress and continue learning."
      />
      <div className="space-y-12">
        <Card className="cursor-pointer invert transition-all hover:opacity-95">
          <CardHeader>
            <div className="flex gap-2">
              <div className="w-fit max-w-[calc(100%-2.5rem)] truncate bg-foreground px-1.5 py-0.5 text-[9px] font-medium tracking-wider text-background uppercase sm:px-2 sm:text-xs">
                <p className="truncate">{coreModules[0].principle}</p>
              </div>
            </div>
            <CardTitle>
              <p className="line-clamp-2 text-3xl font-bold">
                {continueModule.name}
              </p>
            </CardTitle>
            <CardDescription>{continueModule.description}</CardDescription>
            <CardAction>
              <Button onClick={handleContinue}>
                Continue <ArrowUpRight />
              </Button>
            </CardAction>
          </CardHeader>
        </Card>
        <div className="space-y-4">
          <h2>CORE PRINCIPLES</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {coreModules.map((coreModule) => (
              <CoreModuleCardTemplate
                key={coreModule.id}
                module={coreModule}
                progress={MOCK_MODULE_PROGRESS[coreModule.id] ?? 0}
                onClick={() => navigate(`./${coreModule.id}`)}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">{/* {modules.map(()=> )} */}</div>
      </div>
    </section>
  )
}

function CoreModuleCardTemplate({
  module,
  progress = 0,
  onClick,
}: {
  module: CoreModulesProps
  progress?: number
  onClick: () => void
}) {
  const Icon = module.icon

  return (
    <Card
      onClick={onClick}
      className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:border-border hover:shadow-md"
    >
      {/* Top right watermark icon */}
      {Icon && (
        <div className="pointer-events-none absolute top-3 right-3 text-muted-foreground/10 transition-transform duration-300 select-none group-hover:scale-105">
          <Icon className="h-28 w-28 stroke-[1.25]" />
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
          {Icon && <Icon className="h-6 w-6 stroke-[2]" />}
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

import HeaderTemplate from "@/components/common/PageTemplate"
import { Card } from "@/components/ui/card"
import type { CurriculumPrinciple } from "@/const/props/moduleProps"
import { useCurriculum } from "@/services/tanstack/materials"
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

export default function LearningMaterials() {
  const { data: curriculum = [] } = useCurriculum()

  const sortedPrinciples = [...curriculum].sort(
    (a, b) => a.display_order - b.display_order
  )

  return (
    <section className="p-responsive space-y-6">
      <HeaderTemplate
        title="Learning Materials"
        subtitle="Manage and inspect institutional WCAG accessibility curriculum units and principles."
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Core Principles</h2>
          <span className="text-xs font-medium text-muted-foreground">
            {sortedPrinciples.length} Accessibility Principles
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sortedPrinciples.map((principle) => (
            <Link
              to={`./${principle.code}`}
              key={principle.id}
              className="block h-full transition-transform"
            >
              <AdminPrincipleCard principle={principle} />
            </Link>
          ))}
        </div>
      </section>
    </section>
  )
}

function AdminPrincipleCard({ principle }: { principle: CurriculumPrinciple }) {
  const publishedRev =
    principle.revisions?.find((r) => r.status === "published") ||
    principle.revisions?.[0]
  const description =
    publishedRev?.description ||
    `The complete WCAG 2.2 ${principle.title} curriculum.`

  return (
    <Card className="group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden p-6 shadow-xs transition-all hover:border-border hover:shadow-md">
      {/* Top right watermark icon */}
      <div className="pointer-events-none absolute top-3 right-3 text-muted-foreground/10 transition-transform duration-300 select-none group-hover:scale-105">
        <PrincipleIcon name={principle.code} className="h-28 w-28 stroke-1" />
      </div>

      <div className="relative z-10 flex-1">
        {/* Top left badge icon */}
        <div className="flex size-12 items-center justify-center rounded-xl bg-foreground text-background transition-colors">
          <PrincipleIcon name={principle.code} className="size-6 stroke-2" />
        </div>

        {/* Title & Description */}
        <h3 className="mt-4 mb-2 text-xl font-bold tracking-tight text-foreground">
          {principle.title}
        </h3>
        <p className="mb-6 line-clamp-3 text-sm leading-relaxed font-normal text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto flex items-center justify-between border-t border-border/40 pt-4 text-xs">
        <span className="font-medium text-muted-foreground">
          Principle {principle.display_order} • WCAG 2.2
        </span>
        <span className="flex items-center gap-1 font-semibold text-foreground transition-colors group-hover:text-primary">
          View Curriculum <ArrowUpRight className="size-3.5" />
        </span>
      </div>
    </Card>
  )
}

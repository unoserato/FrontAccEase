import { Badge } from "@/components/ui/badge"

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  align?: "left" | "center"
  className?: string
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const isCentered = align === "center"

  return (
    <div
      className={`space-y-3 ${
        isCentered ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left"
      } ${className}`}
    >
      {badge && (
        <div className={isCentered ? "flex justify-center" : ""}>
          <Badge
            variant="secondary"
            className="border-primary/20 bg-primary/10 text-primary font-semibold"
          >
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-muted-foreground leading-relaxed sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}

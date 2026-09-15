import { Link } from "react-router-dom"
import { Button, buttonVariants } from "../ui/button"
import type { LucideIcon } from "lucide-react"
import type { IconType } from "react-icons/lib"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { ArrowLeft, MoreHorizontal } from "lucide-react"
import { cn } from "cn"

export type CtaItem = {
  id?: string
  name: string
  href?: string
  ctaFn?: () => void
  variant?:
    "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
  size?: "default" | "xs" | "sm" | "lg" | "icon"
  iconPos?: "start" | "end"
  icon?: LucideIcon | IconType
  disabled?: boolean
}

export interface SectionHeaderTemplateProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  badge?: React.ReactNode
  backHref?: string
  onBack?: () => void
  cta?: CtaItem[]
  actions?: React.ReactNode
  className?: string
  headerClassName?: string
  mainClassName?: string
  children?: React.ReactNode
}

export default function PageWithTitleTemplate({
  title,
  subtitle,
  badge,
  backHref,
  onBack,
  cta,
  actions,
  className,
  headerClassName,
  mainClassName,
  children,
}: SectionHeaderTemplateProps) {
  const isMobile = useIsMobile()

  const hasCta = cta && cta.length > 0

  const renderCtaButton = (btn: CtaItem, index: number) => {
    const Icon = btn.icon
    const variant = btn.variant ?? "default"
    const size = btn.size ?? "default"
    const iconPos = btn.iconPos ?? "start"
    const key = btn.id || `${btn.name}-${index}`

    const content = (
      <>
        {Icon && iconPos === "start" && <Icon className="size-4 shrink-0" />}
        <span>{btn.name}</span>
        {Icon && iconPos === "end" && <Icon className="size-4 shrink-0" />}
      </>
    )

    if (btn.href) {
      return (
        <Link
          key={key}
          to={btn.href}
          className={cn(
            buttonVariants({ variant, size }),
            "gap-2",
            btn.disabled && "pointer-events-none opacity-50"
          )}
        >
          {content}
        </Link>
      )
    }

    return (
      <Button
        key={key}
        onClick={btn.ctaFn}
        variant={variant}
        size={size}
        disabled={btn.disabled}
        className="gap-2"
      >
        {content}
      </Button>
    )
  }

  return (
    <div className={cn("min-h-full w-full", className)}>
      <header
        className={cn(
          "mx-auto flex max-w-7xl flex-col gap-4 border-b border-border/40 px-4 pt-6 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pt-8 sm:pb-6 lg:px-8",
          headerClassName
        )}
      >
        <div className="flex min-w-0 items-start gap-3">
          {(backHref || onBack) && (
            <div className="shrink-0 pt-0.5">
              {backHref ? (
                <Link
                  to={backHref}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon-sm" }),
                    "rounded-full text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="Go back"
                >
                  <ArrowLeft className="size-4" />
                </Link>
              ) : (
                <Button
                  onClick={onBack}
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full text-muted-foreground hover:text-foreground"
                  aria-label="Go back"
                >
                  <ArrowLeft className="size-4" />
                </Button>
              )}
            </div>
          )}

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              {title &&
                (typeof title === "string" ? (
                  <h1 className="truncate text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {title}
                  </h1>
                ) : (
                  title
                ))}
              {badge && <div className="shrink-0">{badge}</div>}
            </div>

            {subtitle &&
              (typeof subtitle === "string" ? (
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {subtitle}
                </p>
              ) : (
                subtitle
              ))}
          </div>
        </div>

        {(hasCta || actions) && (
          <div className="flex shrink-0 items-center gap-2.5 self-start sm:self-center">
            {actions}

            {hasCta &&
              (isMobile && cta.length > 1 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="outline" size="sm" className="gap-2">
                        <MoreHorizontal className="size-4" />
                        <span>Actions</span>
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end" className="w-48">
                    {cta.map((btn, index) => {
                      const Icon = btn.icon
                      const key = btn.id || `${btn.name}-${index}`
                      return (
                        <DropdownMenuItem
                          key={key}
                          disabled={btn.disabled}
                          onClick={() => {
                            if (btn.ctaFn) btn.ctaFn()
                          }}
                        >
                          {btn.href ? (
                            <Link
                              to={btn.href}
                              className="flex w-full items-center gap-2"
                            >
                              {Icon && <Icon className="size-4 shrink-0" />}
                              <span>{btn.name}</span>
                            </Link>
                          ) : (
                            <div className="flex w-full items-center gap-2">
                              {Icon && <Icon className="size-4 shrink-0" />}
                              <span>{btn.name}</span>
                            </div>
                          )}
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  {cta.map((btn, index) => renderCtaButton(btn, index))}
                </div>
              ))}
          </div>
        )}
      </header>

      {children && (
        <main
          className={cn(
            "mx-auto flex h-fit w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8",
            mainClassName
          )}
        >
          {children}
        </main>
      )}
    </div>
  )
}

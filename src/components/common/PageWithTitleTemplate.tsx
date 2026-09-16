import { Link, useNavigate } from "react-router-dom"
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
import { ArrowLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "cn"

export type CtaItem = {
  id?: string
  name: string
  href?: string
  ctaFn?: () => void
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link"
  size?: "default" | "xs" | "sm" | "lg" | "icon"
  iconPos?: "start" | "end"
  icon?: LucideIcon | IconType
  disabled?: boolean
}

export type BreadcrumbItem = {
  label: string
  href?: string
}

export interface SectionHeaderTemplateProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  badge?: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
  backHref?: string
  onBack?: () => void
  cta?: CtaItem[]
  actions?: React.ReactNode
  sticky?: boolean
  className?: string
  headerClassName?: string
  mainClassName?: string
  children?: React.ReactNode
}

export default function PageWithTitleTemplate({
  title,
  subtitle,
  badge,
  breadcrumbs,
  backHref,
  onBack,
  cta,
  actions,
  sticky = false,
  className,
  headerClassName,
  mainClassName,
  children,
}: SectionHeaderTemplateProps) {
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  const hasCta = cta && cta.length > 0

  const renderCtaButton = (
    btn: CtaItem,
    index: number,
    isFullWidthOnMobile = false
  ) => {
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
            isFullWidthOnMobile ? "w-full justify-center sm:w-auto" : "",
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
        className={cn(
          "gap-2",
          isFullWidthOnMobile ? "w-full justify-center sm:w-auto" : ""
        )}
      >
        {content}
      </Button>
    )
  }

  return (
    <div className={cn("min-h-full w-full", className)}>
      <header
        className={cn(
          "mx-auto flex max-w-7xl flex-col gap-3.5 border-b border-border/40 px-4 pt-4 pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:pt-6 sm:pb-5 lg:px-8",
          sticky && "sticky top-0 z-30 bg-background/95 backdrop-blur",
          headerClassName
        )}
      >
        <div className="flex min-w-0 flex-col gap-1 sm:gap-1.5">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-0.5">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                {breadcrumbs.map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    {i > 0 && (
                      <ChevronRight className="size-3 text-muted-foreground/60 shrink-0" />
                    )}
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="max-w-[140px] truncate hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="max-w-[160px] truncate font-medium text-foreground">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

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
              <div className="flex flex-wrap items-center gap-2">
                {title &&
                  (typeof title === "string" ? (
                    <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight text-foreground break-words leading-tight">
                      {title}
                    </h1>
                  ) : (
                    title
                  ))}
                {badge && <div className="shrink-0">{badge}</div>}
              </div>

              {subtitle &&
                (typeof subtitle === "string" ? (
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {subtitle}
                  </p>
                ) : (
                  subtitle
                ))}
            </div>
          </div>
        </div>

        {(hasCta || actions) && (
          <div className="flex w-full shrink-0 flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
            {actions}

            {hasCta && (
              <div className="w-full sm:w-auto">
                {isMobile && cta.length > 2 ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-between gap-2 sm:w-auto"
                        >
                          <span className="flex items-center gap-2">
                            <MoreHorizontal className="size-4" />
                            <span>Actions</span>
                          </span>
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
                              if (btn.href) {
                                navigate(btn.href)
                              } else if (btn.ctaFn) {
                                btn.ctaFn()
                              }
                            }}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            {Icon && <Icon className="size-4 shrink-0" />}
                            <span>{btn.name}</span>
                          </DropdownMenuItem>
                        )
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : isMobile && cta.length === 2 ? (
                  <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto">
                    {cta.map((btn, index) => renderCtaButton(btn, index, true))}
                  </div>
                ) : isMobile && cta.length === 1 ? (
                  <div className="w-full sm:w-auto">
                    {renderCtaButton(cta[0], 0, true)}
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    {cta.map((btn, index) => renderCtaButton(btn, index))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </header>

      {children && (
        <main
          className={cn(
            "mx-auto flex h-fit w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 sm:py-6 lg:px-8",
            mainClassName
          )}
        >
          {children}
        </main>
      )}
    </div>
  )
}


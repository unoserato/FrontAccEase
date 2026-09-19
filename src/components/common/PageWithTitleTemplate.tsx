import { Link } from "react-router-dom"
import { Button, buttonVariants } from "../ui/button"
import type { LucideIcon } from "lucide-react"
import type { IconType } from "react-icons/lib"
import { useIsMobile } from "@/hooks/use-mobile"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ArrowLeft, ChevronRight, LayoutGrid, List, Plus } from "lucide-react"
import { useState } from "react"
import { cn } from "cn"
import SearchTemplate from "./SearchTemplate"

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

export type StatusTabValue = "active" | "archived"
export type ViewMode = "grid" | "list"

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

  // Status tab props
  showStatusTabs?: boolean
  statusTab?: StatusTabValue
  onStatusTabChange?: (tab: StatusTabValue) => void
  defaultStatusTab?: StatusTabValue

  // Search props
  showSearch?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchTitle?: string

  // View mode props
  showViewMode?: boolean
  viewMode?: ViewMode
  onViewModeChange?: (mode: ViewMode) => void
  defaultViewMode?: ViewMode
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
  showStatusTabs,
  statusTab,
  onStatusTabChange,
  defaultStatusTab = "active",
  showSearch,
  searchValue,
  onSearchChange,
  searchTitle,
  showViewMode,
  viewMode,
  onViewModeChange,
  defaultViewMode = "grid",
}: SectionHeaderTemplateProps) {
  const isMobile = useIsMobile()
  // const navigate = useNavigate()
  const [popoverOpen, setPopoverOpen] = useState(false)

  // Status Tab State
  const [internalStatusTab, setInternalStatusTab] =
    useState<StatusTabValue>(defaultStatusTab)
  const currentStatusTab = statusTab ?? internalStatusTab
  const shouldShowTabs =
    showStatusTabs || statusTab !== undefined || onStatusTabChange !== undefined

  const handleStatusTabChange = (tab: StatusTabValue) => {
    setInternalStatusTab(tab)
    onStatusTabChange?.(tab)
  }

  // Search State
  const [internalSearchValue, setInternalSearchValue] = useState("")
  const currentSearchValue = searchValue ?? internalSearchValue
  const shouldShowSearch =
    showSearch || searchValue !== undefined || onSearchChange !== undefined

  const handleSearchChange = (val: string) => {
    setInternalSearchValue(val)
    onSearchChange?.(val)
  }

  // View Mode State
  const [internalViewMode, setInternalViewMode] =
    useState<ViewMode>(defaultViewMode)
  const currentViewMode = viewMode ?? internalViewMode
  const shouldShowViewMode =
    showViewMode || viewMode !== undefined || onViewModeChange !== undefined

  const handleViewModeChange = (mode: ViewMode) => {
    setInternalViewMode(mode)
    onViewModeChange?.(mode)
  }

  const hasCta = cta && cta.length > 0
  const hasSubToolbar = shouldShowTabs || shouldShowSearch || shouldShowViewMode

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
            "gap-2 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
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
        className="gap-2 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
      >
        {content}
      </Button>
    )
  }

  return (
    <div className={cn("relative min-h-full w-full", className)}>
      <header
        className={cn(
          "mx-auto flex max-w-7xl flex-col gap-3.5 border-b border-border/40 bg-background/95 px-4 pt-4 pb-4 backdrop-blur-md sm:px-6 sm:pt-6 sm:pb-5 lg:px-8",
          sticky && "sticky top-0 z-30",
          headerClassName
        )}
      >
        <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 flex-col gap-1 sm:gap-1.5">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav aria-label="Breadcrumb" className="mb-0.5">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  {breadcrumbs.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      {i > 0 && (
                        <ChevronRight className="size-3 shrink-0 text-muted-foreground/60" />
                      )}
                      {item.href ? (
                        <Link
                          to={item.href}
                          className="max-w-[140px] truncate transition-colors hover:text-foreground"
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
                      <h1 className="xs:text-2xl text-xl leading-tight font-bold tracking-tight break-words text-foreground sm:text-3xl">
                        {title}
                      </h1>
                    ) : (
                      title
                    ))}
                  {badge && <div className="shrink-0">{badge}</div>}
                </div>

                {subtitle &&
                  (typeof subtitle === "string" ? (
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {subtitle}
                    </p>
                  ) : (
                    subtitle
                  ))}
              </div>
            </div>
          </div>

          {/* Desktop CTA actions container */}
          {(hasCta || actions) && (
            <div className="hidden shrink-0 items-center gap-2.5 sm:flex">
              {actions}

              {hasCta && (
                <div className="flex flex-wrap items-center gap-2">
                  {cta.map((btn, index) => renderCtaButton(btn, index))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sub-toolbar: Status Tabs, Search, View Mode */}
        {hasSubToolbar && (
          <div className="mt-2.5 flex flex-col gap-3 border-t border-border/30 pt-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Left Side: Status Tabs */}
            {shouldShowTabs ? (
              <div
                role="tablist"
                aria-label="Status filter"
                className="inline-flex h-9 items-center justify-center rounded-xl border border-border/30 bg-muted/60 p-1 text-muted-foreground shadow-inner backdrop-blur-sm"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={currentStatusTab === "active"}
                  onClick={() => handleStatusTabChange("active")}
                  className={cn(
                    "inline-flex cursor-pointer items-center justify-center rounded-lg px-3.5 py-1 text-xs font-semibold whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none select-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm",
                    currentStatusTab === "active"
                      ? "bg-background font-semibold text-foreground shadow-sm"
                      : "text-muted-foreground/80 hover:text-foreground"
                  )}
                >
                  Active
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={currentStatusTab === "archived"}
                  onClick={() => handleStatusTabChange("archived")}
                  className={cn(
                    "inline-flex cursor-pointer items-center justify-center rounded-lg px-3.5 py-1 text-xs font-semibold whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none select-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm",
                    currentStatusTab === "archived"
                      ? "bg-background font-semibold text-foreground shadow-sm"
                      : "text-muted-foreground/80 hover:text-foreground"
                  )}
                >
                  Archived
                </button>
              </div>
            ) : (
              <div />
            )}

            {/* Right Side: Search & View Mode Controls */}
            {(shouldShowSearch || shouldShowViewMode) && (
              <div className="flex w-full items-center gap-2.5 sm:w-auto">
                {shouldShowSearch && (
                  <div className="flex-1 sm:w-64 sm:flex-none md:w-72">
                    <SearchTemplate
                      title={
                        searchTitle ||
                        (typeof title === "string" ? title : "items")
                      }
                      search={currentSearchValue}
                      setSearch={handleSearchChange}
                    />
                  </div>
                )}

                {shouldShowViewMode && (
                  <div
                    role="group"
                    aria-label="View mode"
                    className="inline-flex h-9 shrink-0 items-center justify-center rounded-xl border border-border/30 bg-muted/60 p-1 text-muted-foreground shadow-inner backdrop-blur-sm"
                  >
                    <button
                      type="button"
                      aria-label="Grid view"
                      aria-pressed={currentViewMode === "grid"}
                      onClick={() => handleViewModeChange("grid")}
                      className={cn(
                        "inline-flex size-7 cursor-pointer items-center justify-center rounded-lg text-xs transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none select-none",
                        currentViewMode === "grid"
                          ? "bg-background font-medium text-foreground shadow-sm"
                          : "text-muted-foreground/80 hover:text-foreground"
                      )}
                    >
                      <LayoutGrid className="size-4 shrink-0" />
                    </button>
                    <button
                      type="button"
                      aria-label="List view"
                      aria-pressed={currentViewMode === "list"}
                      onClick={() => handleViewModeChange("list")}
                      className={cn(
                        "inline-flex size-7 cursor-pointer items-center justify-center rounded-lg text-xs transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none select-none",
                        currentViewMode === "list"
                          ? "bg-background font-medium text-foreground shadow-sm"
                          : "text-muted-foreground/80 hover:text-foreground"
                      )}
                    >
                      <List className="size-4 shrink-0" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main content body */}
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

      {/* Floating Bottom Right CTA Popover (Mobile viewports only) */}
      {isMobile && hasCta && (
        <div className="fixed right-5 bottom-5 z-50 sm:hidden">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger
              render={
                <Button
                  size="icon"
                  className="flex size-13 items-center justify-center rounded-full border border-primary/20 bg-primary p-0 text-primary-foreground shadow-2xl shadow-primary/40 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 active:scale-95"
                  aria-label="Actions menu"
                >
                  <Plus className="size-6 shrink-0" />
                </Button>
              }
            />
            <PopoverContent
              side="top"
              align="end"
              sideOffset={12}
              className="flex w-56 flex-col gap-1 rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-2xl"
            >
              <div className="mb-1 border-b border-border/50 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                Actions
              </div>
              {cta.map((btn, index) => {
                const Icon = btn.icon
                const key = btn.id || `${btn.name}-${index}`

                const itemContent = (
                  <div className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors select-none hover:bg-accent">
                    {Icon && <Icon className="size-4 shrink-0 text-primary" />}
                    <span>{btn.name}</span>
                  </div>
                )

                if (btn.href) {
                  return (
                    <Link
                      key={key}
                      to={btn.href}
                      onClick={() => setPopoverOpen(false)}
                      className="w-full text-foreground"
                    >
                      {itemContent}
                    </Link>
                  )
                }

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setPopoverOpen(false)
                      if (btn.ctaFn) btn.ctaFn()
                    }}
                    className="w-full text-left text-foreground"
                  >
                    {itemContent}
                  </button>
                )
              })}
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  )
}

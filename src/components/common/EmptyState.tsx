import type { ComponentProps, ComponentType, ReactNode } from "react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { cn } from "@/lib/utils"

export interface EmptyStateProps extends Omit<ComponentProps<"div">, "title"> {
  title: ReactNode
  description?: ReactNode
  /** Pass an icon component, for example icon={Inbox}. */
  icon?: ComponentType<ComponentProps<"svg">>
  /** Custom illustration or media, displayed in place of the icon. */
  media?: ReactNode
  /** Buttons, links, or other controls supplied by the caller. */
  actions?: ReactNode
}

export default function EmptyState({
  title,
  description,
  icon: Icon,
  media,
  actions,
  children,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <Empty className={cn("py-12 sm:py-16", className)} {...props}>
      <EmptyHeader>
        {media != null ? (
          <EmptyMedia>{media}</EmptyMedia>
        ) : Icon ? (
          <EmptyMedia variant="icon" aria-hidden="true">
            <Icon />
          </EmptyMedia>
        ) : null}
        <EmptyTitle>{title}</EmptyTitle>
        {description != null && (
          <EmptyDescription>{description}</EmptyDescription>
        )}
      </EmptyHeader>
      {(actions != null || children != null) && (
        <EmptyContent>
          {actions != null && (
            <div className="flex w-full flex-wrap items-center justify-center gap-2">
              {actions}
            </div>
          )}
          {children}
        </EmptyContent>
      )}
    </Empty>
  )
}

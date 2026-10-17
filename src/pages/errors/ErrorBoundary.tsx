import { AlertTriangle, ArrowRight, Home, RefreshCw } from "lucide-react"
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

export default function ErrorBoundary() {
  const error = useRouteError()
  const isNotFound = isRouteErrorResponse(error) && error.status === 404
  const statusCode = isRouteErrorResponse(error) ? error.status : 500

  const title = isNotFound
    ? "We couldn't find that page."
    : "This page couldn't load."
  const description = isNotFound
    ? "The address may be outdated, or the page may have moved."
    : "Something interrupted the page load. Try again, or return to the home page."

  return (
    <section className="mx-auto flex min-h-dvh items-center bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div
        aria-labelledby="error-title"
        className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lg"
      >
        <div className="border-b border-border/70 bg-muted/35 px-5 py-5 sm:px-8 sm:py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive dark:bg-destructive/20">
              <AlertTriangle className="size-5" aria-hidden="true" />
            </div>
            <span className="font-mono text-sm font-semibold text-muted-foreground tabular-nums">
              {statusCode}
            </span>
          </div>
        </div>

        <div className="space-y-6 px-5 py-7 sm:px-8 sm:py-9">
          <div className="max-w-lg space-y-2.5">
            <h1
              id="error-title"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              {title}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "w-full justify-center sm:w-auto"
              )}
            >
              <RefreshCw className="size-4" aria-hidden="true" />
              Try again
            </button>
            <Link
              to="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full justify-center sm:w-auto"
              )}
            >
              <Home className="size-4" aria-hidden="true" />
              Go to home
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

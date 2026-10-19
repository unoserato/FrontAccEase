import { memo } from "react"
import type { AnalyzerSummaryProps } from "@/const/props/analyzerProps"
import { ArrowUpRight, Clock, Globe } from "lucide-react"
import { Link } from "react-router-dom"
import { getDateString } from "@/hooks/date-to-string"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

export const ScanHistory = memo(function ScanHistory({
  scanHistory,
}: {
  scanHistory: AnalyzerSummaryProps[]
}) {
  return (
    <div>
      {scanHistory.map((item) => {
        const targetUrl = item.url || "example.com"
        const urlClean = targetUrl.replace(/^https?:\/\//, "")
        const score = item.score ?? 0

        // Calculate violations across summary or principles
        const totalViolations = item.violation_count

        // Determine score color
        const isHigh = score >= 90
        const isMedium = score >= 70 && score < 90

        return (
          <Link
            key={item.id}
            to={`/learner/analyzer/${item.id}`}
            className="group flex flex-col gap-3 p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Left: Domain & Meta */}
            <div className="flex min-w-0 items-center gap-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Globe className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-foreground group-hover:underline sm:text-base">
                  {urlClean}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3 shrink-0" />
                  <span>{getDateString(item.created_at)}</span>
                  <span>•</span>
                  <span>{totalViolations} Violations Detected</span>
                </div>
              </div>
            </div>

            {/* Right: Scores & Link Action */}
            <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                    isHigh
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : isMedium
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                  }`}
                >
                  Score: {score}/100
                </Badge>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 px-2.5 text-xs font-bold text-muted-foreground group-hover:text-foreground"
              >
                <span>View Report</span>
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </Link>
        )
      })}
    </div>
  )
})

import { Skeleton } from "../ui/skeleton"

export default function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="h-fit w-full space-y-6 p-8">
      <Skeleton className="h-10 w-xs" />
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    </div>
  )
}

import { Skeleton } from "../ui/skeleton"

export default function GridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="h-fit w-full space-y-6 p-8">
      <Skeleton className="h-10 w-xs" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-3/4 w-full rounded-2xl" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}

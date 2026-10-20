import { Skeleton } from "../ui/skeleton"

export default function PageSkeleton() {
  return (
    <div className="h-fit w-full space-y-6 p-8">
      <Skeleton className="h-10 w-xs" />
      <div className="flex w-full gap-6">
        <div className="w-2/3 space-y-6">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="w-1/3 space-y-6">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
      </div>
      <Skeleton className="h-80 w-full" />
    </div>
  )
}

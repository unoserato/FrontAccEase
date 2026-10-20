import { Suspense } from "react"
import PageSkeleton from "@/components/skeleton/PageSkeleton"
import PublicFooter from "@/components/public/PublicFooter"
import UserSkeleton from "@/components/skeleton/UserSkeleton"
import { useCheckToken } from "@/services/tanstack/auth"
import { Navigate, Outlet } from "react-router-dom"

export default function AuthLayout() {
  const { data: user, isPending } = useCheckToken()

  if (isPending) {
    return <UserSkeleton />
  }

  if (user) {
    return <Navigate to={user.role} />
  }

  return (
    <div className="w-full">
      <Suspense fallback={<PageSkeleton />}>
        <Outlet />
      </Suspense>
      <PublicFooter />
    </div>
  )
}

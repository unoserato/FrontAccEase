import UserSkeleton from "@/components/skeleton/UserSkeleton"
import PageSkeleton from "@/components/skeleton/PageSkeleton"
import type { UserRole } from "@/const/props/userProps"
import { Suspense } from "react"
import Forbidden from "@/pages/errors/Forbidden"
import Unauthorized from "@/pages/errors/Unauthorized"
import { Outlet, useLocation } from "react-router-dom"
import { useCheckToken } from "@/services/tanstack/auth"

export default function ProtectedLayoutNoSidebar({
  allowedRoles,
}: {
  allowedRoles: UserRole | UserRole[]
}) {
  const location = useLocation()
  const { data: user, isLoading } = useCheckToken()

  if (isLoading) {
    return <UserSkeleton />
  }

  if (!user) {
    return <Unauthorized />
  }

  const userRole = user.role as UserRole
  const isPermitted = Array.isArray(allowedRoles)
    ? allowedRoles.includes(userRole)
    : userRole === allowedRoles

  console.log(user.role, isPermitted, allowedRoles)

  if (!isPermitted) {
    return <Forbidden />
  }

  return (
    <Suspense key={location.pathname} fallback={<PageSkeleton />}>
      <main className="flex-1">
        <Outlet />
      </main>
    </Suspense>
  )
}

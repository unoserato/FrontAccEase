import UserHeader from "@/components/common/UserHeader"
import UserSidebar from "@/components/common/UserSidebar"
import UserSkeleton from "@/components/skeleton/UserSkeleton"
// import UserSkeleton from "@/components/skeleton/UserSkeleton"
import type { UserRole } from "@/const/userProps"
import { instructorNav, learnerNav, schoolAdminNav } from "@/const/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { Suspense } from "react"
import Forbidden from "@/pages/errors/Forbidden"
import Unauthorized from "@/pages/errors/Unauthorized"
import { Outlet } from "react-router-dom"
import { useMe } from "@/services/tanstack/auth"

const linksByRole = {
  student: learnerNav,
  instructor: instructorNav,
  admin: schoolAdminNav,
}

export default function ProtectedLayout({
  allowedRoles,
}: {
  allowedRoles: UserRole | UserRole[]
}) {
  const isMobile = useIsMobile()
  const { data: user, isLoading } = useMe()

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

  const links = linksByRole[userRole]

  return (
    <div
      className={`flex ${isMobile ? "flex-col" : "flex-row"} h-screen w-screen overflow-hidden`}
    >
      <UserSidebar links={links} user={user} />
      {isMobile && <UserHeader />}
      <Suspense fallback={<UserSkeleton />}>
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </Suspense>
    </div>
  )
}

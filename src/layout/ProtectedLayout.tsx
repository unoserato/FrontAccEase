import UserHeader from "@/components/common/UserHeader"
import UserSidebar from "@/components/common/UserSidebar"
// import UserSkeleton from "@/components/skeleton/UserSkeleton"
import type { Role } from "@/const/data"
import { instructorNav, learnerNav, schoolAdminNav } from "@/const/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
// import Forbidden from "@/pages/errors/Forbidden"
// import Unauthorized from "@/pages/errors/Unauthorized"
// import { useUser } from "@/services/tanstack/auth"
import { Outlet, useLocation } from "react-router-dom"

const linksByRole = {
  learner: learnerNav,
  instructor: instructorNav,
  admin: schoolAdminNav,
}

export default function ProtectedLayout({
  allowedRoles,
}: {
  allowedRoles: Role | Role[]
}) {
  // const { data: user, isLoading } = useUser()

  const isMobile = useIsMobile()
  console.log(allowedRoles)

  // if (isLoading) {
  //   return <UserSkeleton />
  // }

  // if (!user) {
  //   return <Unauthorized />
  // }

  // const userRole: Role = user.role

  // const isPermitted = Array.isArray(allowedRoles)
  //   ? allowedRoles.includes(userRole)
  //   : userRole === allowedRoles

  // if (!isPermitted) {
  //   return <Forbidden />
  // }

  // const links = linksByRole[userRole]

  // temporary routing
  const { pathname } = useLocation()
  const path = pathname.split("/")[1]
  const role = path as Role
  const links = linksByRole[role]

  return (
    <div
      className={`flex ${isMobile ? "flex-col" : "flex-row"} h-screen w-screen overflow-hidden`}
    >
      <UserSidebar links={links} name={"John Mark"} />
      {isMobile && <UserHeader />}
      <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-background">
        <Outlet />
      </main>
    </div>
  )
}

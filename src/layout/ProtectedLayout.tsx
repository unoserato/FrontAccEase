import UserHeader from "@/components/common/UserHeader"
import UserSidebar from "@/components/common/UserSidebar"
import UserSkeleton from "@/components/skeleton/UserSkeleton"
import { instructorNav, learnerNav, schoolAdminNav } from "@/const/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { useUser } from "@/services/tanstack/auth"
import { Navigate, Outlet } from "react-router-dom"

const linksByRole = {
  learner: learnerNav,
  instructor: instructorNav,
  admin: schoolAdminNav,
}

export default function ProtectedLayout({
  allowedRole,
}: {
  allowedRole: string
}) {
  const { data: user, isLoading } = useUser()
  const isMobile = useIsMobile()

  if (isLoading) {
    return <UserSkeleton />
  }

  if (!user) {
    return <Navigate to={"/"} replace />
  }

  if (!user.role.includes(allowedRole)) {
    return <Navigate to={"/unauthorized"} replace />
  }

  const links = linksByRole[user.role]

  return (
    <div
      className={`flex ${isMobile ? "flex-col" : "flex-row"} h-screen w-screen overflow-hidden`}
    >
      <UserSidebar links={links} name={user.name} />
      {isMobile && <UserHeader />}
      <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-background">
        <Outlet />
      </main>
    </div>
  )
}

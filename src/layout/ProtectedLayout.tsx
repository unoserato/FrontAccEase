import UserSidebar from "@/components/common/UserSidebar"
import UserSkeleton from "@/components/skeleton/UserSkeleton"
import { useUser } from "@/services/tanstack/auth"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedLayout({
  allowedRole,
}: {
  allowedRole: string
}) {
  const { data: user, isLoading } = useUser()

  if (isLoading) {
    return <UserSkeleton />
  }

  if (!user) {
    return <Navigate to={"/"} replace />
  }

  if (user.role !== allowedRole) {
    return <Navigate to={"/unauthorized"} replace />
  }

  return (
    <div className="flex h-screen w-screen">
      <UserSidebar user={allowedRole.toUpperCase()} />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

import { useUser } from "@/services/tanstack/auth"

export default function Dashboard() {
  const { data: user } = useUser()
  if (!user) return null
  return <div className="capitalize">{user.role} Dashboard</div>
}

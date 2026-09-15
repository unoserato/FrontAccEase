import { Menu } from "lucide-react"
import { SidebarTrigger } from "../ui/sidebar"

export default function UserHeader() {
  return (
    <header className="flex w-full justify-end border bg-muted p-4">
      <SidebarTrigger>
        <Menu />
      </SidebarTrigger>
    </header>
  )
}

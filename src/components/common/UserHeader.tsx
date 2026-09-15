import { Menu } from "lucide-react"
import { useSidebar } from "../ui/sidebar"
import { Button } from "../ui/button"

export default function UserHeader() {
  const { setOpenMobile } = useSidebar()
  return (
    <header className="flex w-full items-center justify-between bg-muted px-4 py-2">
      <p className="font-bold">FrontAccEase</p>
      <Button variant={"ghost"} onClick={() => setOpenMobile(true)}>
        <Menu />
      </Button>
    </header>
  )
}

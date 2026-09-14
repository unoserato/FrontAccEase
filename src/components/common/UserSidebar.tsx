import { SidebarIcon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar"
import { Logo } from "./Logo"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { NavLink } from "react-router-dom"
import { adminNav, instructorNav, learnerNav } from "@/const/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useInvalidateKeys } from "@/services/tanstack/auth"

export default function UserSidebar({ user = "LEARNER" }: { user: string }) {
  const { open, setOpen } = useSidebar()
  const invalidate = useInvalidateKeys()

  const links =
    user == "LEARNER"
      ? learnerNav
      : user == "INSTRUCTOR"
        ? instructorNav
        : adminNav

  async function handleLogout() {
    invalidate(["user"])
  }

  return (
    <Sidebar side="left" collapsible="icon">
      <SidebarHeader className="overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="group/logo flex h-8 w-8 items-center justify-center">
            <Logo
              size={32}
              className={!open ? "group-hover/logo:hidden" : ""}
            />

            {!open && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      onClick={() => setOpen(true)}
                      className="hidden rounded-md p-2 group-hover/logo:block hover:bg-muted"
                    >
                      <SidebarIcon size={16} />
                    </button>
                  }
                />
                <TooltipContent>Open Sidebar</TooltipContent>
              </Tooltip>
            )}
          </div>

          {open && (
            <>
              <div className="flex h-full w-full flex-col justify-center text-lg font-bold">
                <h1>FrontAccEase</h1>
                {/* <p className="text-xs font-thin">{user}</p> */}
              </div>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      onClick={() => setOpen(false)}
                      className="rounded-md p-2 group-hover/logo:block hover:bg-muted"
                    >
                      <SidebarIcon size={16} />
                    </button>
                  }
                />
                <TooltipContent>Close Sidebar</TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.href}>
                <NavLink to={link.href}>
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
                      <link.icon />
                      {link.name}
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-4">
        <NavLink
          to="/"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-md py-2 hover:bg-muted"
        >
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {open && <p className="shrink-0">Last Name</p>}
        </NavLink>
      </SidebarFooter>
    </Sidebar>
  )
}

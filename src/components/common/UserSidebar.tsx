import { Settings, SidebarIcon } from "lucide-react"
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
import { schoolAdminNav, instructorNav, learnerNav } from "@/const/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useInvalidateKeys } from "@/services/tanstack/auth"
import { buttonVariants } from "../ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

export default function UserSidebar({ user = "LEARNER" }: { user: string }) {
  const { open, setOpen } = useSidebar()
  const invalidate = useInvalidateKeys()
  const isMobile = useIsMobile()
  console.log(isMobile)
  const links =
    user == "LEARNER"
      ? learnerNav
      : user == "INSTRUCTOR"
        ? instructorNav
        : schoolAdminNav

  async function handleLogout() {
    invalidate(["user"])
  }

  return (
    <Sidebar side={isMobile ? "right" : "left"} collapsible="icon">
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

          <div className="flex h-full w-full flex-col justify-center text-lg font-bold">
            <span>FrontAccEase</span>
            {/* <p className="text-xs font-thin">{user}</p> */}
          </div>
          {open && !isMobile && (
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
                    <SidebarMenuButton
                      isActive={isActive}
                      render={
                        <span>
                          <link.icon />
                          {link.name}
                        </span>
                      }
                    ></SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter
        className={`${open ? "flex-row items-center" : "flex-col-reverse"} ease justify-between pb-4 transition-all duration-500`}
      >
        <NavLink
          to="/"
          onClick={handleLogout}
          className="flex shrink-0 items-center gap-2 rounded-md py-2"
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
        <div className="flex">
          <Tooltip>
            <TooltipTrigger
              render={
                <NavLink
                  to="/settings"
                  className={buttonVariants({ variant: "ghost" })}
                >
                  <Settings size={16} />
                </NavLink>
              }
            ></TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

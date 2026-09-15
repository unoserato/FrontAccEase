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
import { useInvalidateKeys, useUser } from "@/services/tanstack/auth"
import { buttonVariants } from "../ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { useMemo } from "react"

export default function UserSidebar() {
  const { data: user } = useUser()
  const { open, setOpen, openMobile, setOpenMobile } = useSidebar()
  const invalidate = useInvalidateKeys()
  const isMobile = useIsMobile()

  const links = useMemo(() => {
    switch (user?.role) {
      case "learner":
        return learnerNav
      case "instructor":
        return instructorNav
      case "admin":
        return schoolAdminNav
      default:
        return []
    }
  }, [user])

  async function handleLogout() {
    invalidate(["user"])
  }

  if (!user) return null

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
                  render={(triggerProps) => (
                    <button
                      {...triggerProps}
                      type="button"
                      onClick={(e) => {
                        triggerProps.onClick?.(e)
                        setOpen(true)
                      }}
                      className="hidden rounded-md p-2 group-hover/logo:block hover:bg-muted"
                    >
                      <SidebarIcon size={16} />
                    </button>
                  )}
                />
                <TooltipContent>Open Sidebar</TooltipContent>
              </Tooltip>
            )}
          </div>

          <div className="flex h-full flex-1 shrink-0 flex-col justify-center text-lg font-bold">
            <span>FrontAccEase</span>
          </div>

          {open && !isMobile && (
            <Tooltip>
              <TooltipTrigger
                render={(triggerProps) => (
                  <button
                    {...triggerProps}
                    type="button"
                    onClick={(e) => {
                      triggerProps.onClick?.(e)
                      setOpen(false)
                    }}
                    className="rounded-md p-2 group-hover/logo:block hover:bg-muted"
                  >
                    <SidebarIcon size={16} />
                  </button>
                )}
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
              <SidebarMenuItem
                key={link.href}
                onClick={() => openMobile && setOpenMobile(false)}
              >
                <NavLink to={link.href} className="w-full">
                  {({ isActive }) => (
                    <SidebarMenuButton
                      isActive={isActive}
                      render={(menuProps) => (
                        <span {...menuProps}>
                          <link.icon />
                          <span>{link.name}</span>
                        </span>
                      )}
                    />
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter
        className={`${
          open || openMobile ? "flex-row items-center" : "flex-col-reverse"
        } ease justify-between pb-4 transition-all duration-500`}
      >
        <NavLink
          to="/"
          onClick={() => {
            handleLogout()
            if (openMobile) setOpenMobile(false)
          }}
          className="flex shrink-0 items-center gap-2 overflow-hidden rounded-md py-2"
        >
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="shrink-0">{user.name}</p>
        </NavLink>

        <div className="flex">
          <Tooltip>
            <TooltipTrigger
              render={(triggerProps) => (
                <NavLink
                  {...triggerProps}
                  to="/settings"
                  className={buttonVariants({ variant: "ghost", size: "icon" })}
                >
                  <Settings size={16} />
                </NavLink>
              )}
            />
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

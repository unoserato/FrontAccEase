import { useState } from "react"
import { ChevronsUpDown, LogOut, SidebarIcon, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "../ui/sidebar"
import { Logo } from "./Logo"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useIsMobile } from "@/hooks/use-mobile"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useTheme } from "@/components/theme-provider"
import ToolTipTemplate from "./TooltipButtonTemplate"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logoutAPI } from "@/services/api/authAPI"
import { toast } from "../ui/toast"
import { type UserProps } from "@/const/props/userProps"
import GridSkeleton from "../skeleton/GridSkeleton"
import { cn } from "@/lib/utils"

interface UserSidebarProps {
  links: { name: string; href: string; icon: any }[]
  user?: UserProps
}

export default function UserSidebar({ links, user }: UserSidebarProps) {
  const { open, setOpen, openMobile, setOpenMobile } = useSidebar()
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { theme, setTheme } = useTheme()
  const [popoverOpen, setPopoverOpen] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] })
      navigate("/login", { replace: true })
    },
    onError: (err: any) => {
      toast.add({
        title: "Error",
        description: err.response?.data?.detail || "Error logging out",
        type: "destructive",
      })
    },
  })

  async function handleLogout() {
    await mutate()
  }

  if (isPending) {
    return <GridSkeleton />
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
            <ToolTipTemplate
              triggerTextIcon={<SidebarIcon size={16} />}
              content="Close sidebar"
              triggerVariant="ghost"
              onClick={() => {
                setOpen(false)
              }}
            />
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
                      tooltip={link.name}
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

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    tooltip={user?.user.name || "Account"}
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="size-8 shrink-0 rounded-lg">
                      <AvatarImage
                        src={
                          user?.user.profile_picture != null
                            ? user.user.profile_picture
                            : ""
                        }
                        alt={user?.user.name || "User"}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-lg">
                        {user?.user?.name
                          ? user.user.name[0].toUpperCase()
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                      <span className="truncate font-semibold text-foreground capitalize">
                        {user?.user.name || "User"}
                      </span>
                      <span className="truncate text-xs font-normal text-muted-foreground">
                        {user?.user.email || ""}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
                }
              />
              <PopoverContent
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={8}
                className="w-64 rounded-2xl border border-border/70 bg-popover/95 p-1.5 shadow-xl backdrop-blur-md"
              >
                {/* User Info Header */}
                <div className="flex flex-col px-3 py-2 text-left">
                  <span className="truncate text-sm font-bold text-foreground capitalize">
                    {user?.user.name || "User"}
                  </span>
                  <span className="truncate text-xs font-normal text-muted-foreground">
                    {user?.user.email || ""}
                  </span>
                </div>

                <div className="h-px bg-border/50" />

                {/* Account */}
                <Link
                  to={`/${user?.role || "learner"}/profile`}
                  onClick={() => {
                    setPopoverOpen(false)
                    if (openMobile) setOpenMobile(false)
                  }}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <User className="size-4 shrink-0 text-muted-foreground" />
                  <span>Account</span>
                </Link>

                <div className="h-px bg-border/50" />

                {/* Theme Selector */}
                <div className="space-y-1 px-1 py-1">
                  <span className="px-2 text-xs font-semibold text-muted-foreground">
                    Theme
                  </span>
                  <div className="space-y-0.5 pt-0.5">
                    {[
                      { label: "System", value: "system" as const },
                      { label: "Dark", value: "dark" as const },
                      { label: "Light", value: "light" as const },
                    ].map((item) => {
                      const isSelected = theme === item.value
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setTheme(item.value)}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-muted",
                            isSelected
                              ? "font-semibold text-foreground"
                              : "font-normal text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <span className="flex size-3.5 items-center justify-center">
                            {isSelected && (
                              <span className="size-1.5 rounded-full bg-foreground" />
                            )}
                          </span>
                          <span>{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="h-px bg-border/50" />

                {/* Log Out */}
                <button
                  type="button"
                  onClick={() => {
                    setPopoverOpen(false)
                    handleLogout()
                    if (openMobile) setOpenMobile(false)
                  }}
                  className="mb-1 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <LogOut className="size-4 shrink-0 text-muted-foreground" />
                  <span>Log out</span>
                </button>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

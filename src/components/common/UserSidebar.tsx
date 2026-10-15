import { LogOut, Settings, SidebarIcon } from "lucide-react"
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
import { NavLink, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useRemoveQueries } from "@/services/tanstack/auth"
import { useIsMobile } from "@/hooks/use-mobile"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ModeToggle } from "../modeToggle"
import ToolTipTemplate from "./TooltipButtonTemplate"
import { Button } from "../ui/button"
import { useMutation } from "@tanstack/react-query"
import { logoutAPI } from "@/services/api/authAPI"
import { toast } from "../ui/toast"
import { type UserProps } from "@/const/props/userProps"
import GridSkeleton from "../skeleton/GridSkeleton"

interface UserSidebarProps {
  links: { name: string; href: string; icon: any }[]
  user?: UserProps
}

export default function UserSidebar({ links, user }: UserSidebarProps) {
  const { open, setOpen, openMobile, setOpenMobile } = useSidebar()
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const removeQueries = useRemoveQueries()

  const { mutate, isPending } = useMutation({
    mutationFn: logoutAPI,
    onMutate: () => {
      navigate("/login", { replace: true })
    },
    onSuccess: () => {
      // navigate("/login", { replace: true })
      removeQueries(["user"])
    },
    onError: (err: any) => {
      toast.add({
        title: "Error",
        description: err.response.data.detail || "Error logging out",
        type: "destructive",
      })
    },
  })

  function handleLogout() {
    mutate()
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
            // <Tooltip>
            //   <TooltipTrigger
            //     render={(triggerProps) => (
            //       <button
            //         {...triggerProps}
            //         type="button"
            //         onClick={(e) => {
            //           triggerProps.onClick?.(e)
            //           setOpen(false)
            //         }}
            //         className="rounded-md p-2 group-hover/logo:block hover:bg-muted"
            //       >
            //         <SidebarIcon size={16} />
            //       </button>
            //     )}
            //   />
            //   <TooltipContent>Close Sidebar</TooltipContent>
            // </Tooltip>
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
                      className=""
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
        } justify-between pb-4`}
      >
        <div
          onClick={() => {
            if (openMobile) setOpenMobile(false)
          }}
          className="flex shrink-0 items-center gap-2 overflow-hidden rounded-md py-2"
        >
          <Avatar>
            <AvatarImage
              src={
                user?.user.profile_picture != null
                  ? user?.user.profile_picture
                  : ""
              }
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="shrink-0 capitalize">{user?.user.name}</p>
        </div>

        <div className="flex">
          <Popover>
            {/* <PopoverTrigger
              render={
                <ToolTipTemplate
                  trigger={<Settings size={16} />}
                  triggerVariant="ghost"
                  content="Settings"
                />
              }
            /> */}
            <Tooltip>
              <TooltipTrigger
                render={
                  <PopoverTrigger
                    render={
                      <SidebarMenuButton>
                        <Settings />
                      </SidebarMenuButton>
                    }
                  />
                }
              />
              {/* <PopoverTrigger
                render={(popoverProps) => (
                  <TooltipTrigger
                    render={(tooltipProps) => (
                      <Button
                        {...tooltipProps}
                        {...popoverProps}
                        variant="ghost"
                        size="icon"
                        aria-label="Settings"
                      >
                        <Settings size={16} />
                      </Button>
                    )}
                  />
                )}
              /> */}
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>

            <PopoverContent
              align="start"
              side="bottom"
              sideOffset={8}
              className="flex w-56 flex-col gap-1 rounded-2xl border border-border/60 bg-popover/95 p-2 shadow-xl backdrop-blur-md"
            >
              {/* Theme Row */}
              <div className="flex items-center justify-between rounded-xl px-2.5 py-1.5 transition-colors hover:bg-muted/50">
                <span className="text-sm font-medium text-foreground">
                  Theme
                </span>
                <ModeToggle variant="select" />
              </div>

              <div className="my-0.5 h-px bg-border/40" />

              {/* Log Out Row */}
              <Button
                variant={"ghost"}
                type="button"
                onClick={() => {
                  handleLogout()
                  if (openMobile) setOpenMobile(false)
                }}
                className={"justify-start"}
              >
                <LogOut className="size-4 shrink-0" />
                <span>Log out</span>
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

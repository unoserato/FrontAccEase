import { Skeleton } from "../ui/skeleton"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "../ui/sidebar"
// import { Logo } from "../common/Logo"
// import { Avatar } from "../ui/avatar"

export default function UserSkeleton() {
  return (
    <div className="flex h-screen w-full">
      {/* <Sidebar side="left" collapsible="icon" className="pointer-events-none">
        <SidebarHeader className="overflow-hidden">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8 shrink-0" />
            <Skeleton className="h-8 w-40" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 7 }).map((_, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton>
                    <Skeleton className="aspect-square h-full" />
                    <Skeleton className="h-full w-full" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="pb-4">
          <div className="flex items-center gap-2 overflow-hidden rounded-md py-2">
            <Avatar render={<Skeleton className="w-full" />} />
            <Skeleton className="h-full w-full" />
            <Skeleton className="aspect-square h-full" />
          </div>
        </SidebarFooter>
      </Sidebar> */}
      <div className="h-fit w-full space-y-6 p-8">
        <Skeleton className="h-10 w-xs" />
        <div className="flex w-full gap-6">
          <div className="w-2/3 space-y-6">
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="w-1/3 space-y-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-60 w-full" />
          </div>
        </div>
        <Skeleton className="h-80 w-full" />
      </div>
    </div>
  )
}

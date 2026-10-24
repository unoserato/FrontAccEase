import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import HeaderTemplate from "@/components/common/PageTemplate"
import SearchTemplate from "@/components/common/SearchTemplate"
import TooltipButtonTemplate from "@/components/common/TooltipButtonTemplate"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Ban,
  ChevronDown,
  FileText,
  KeyRound,
  MoreHorizontal,
  RefreshCw,
  SlidersHorizontal,
  Trash2,
  UserCog,
  UserPlus,
} from "lucide-react"
import type { UserProps } from "@/const/props/userProps"
import { useAdminAllUsers } from "@/services/tanstack/materials"
import { toast } from "@/components/ui/toast"

export interface UsersProps {
  data?: UserProps[]
}

function UsersContent({ data }: { data: UserProps[] }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get("tab") || "all"

  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const learners = useMemo(() => {
    return data.filter((item) => item.role.toLowerCase() === "learner")
  }, [data])

  const instructors = useMemo(() => {
    return data.filter((item) => item.role.toLowerCase() === "instructor")
  }, [data])

  // Filter users based on tab selection
  const tabFilteredUsers = useMemo<UserProps[]>(() => {
    if (activeTab === "learners") return learners
    if (activeTab === "instructors") return instructors
    return data
  }, [activeTab, learners, instructors, data])

  // Filter users based on search query
  const filteredUsers = useMemo<UserProps[]>(() => {
    if (!search.trim()) return tabFilteredUsers
    const query = search.toLowerCase()
    return tabFilteredUsers.filter(
      (u) =>
        u.user.name.toLowerCase().includes(query) ||
        u.role.toLowerCase().includes(query) ||
        u.user.email.toLowerCase().includes(query)
    )
  }, [tabFilteredUsers, search])

  // Tab change handler updates URL query params
  function handleTabChange(value: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value === "all") {
        next.delete("tab")
      } else {
        next.set("tab", value)
      }
      return next
    })
  }

  const isAllSelected =
    filteredUsers.length > 0 &&
    filteredUsers.every((u) => selectedIds.includes(u.user.id))

  function toggleSelectAll() {
    if (isAllSelected) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredUsers.map((u) => u.user.id))
    }
  }

  function toggleSelectUser(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  function handleExport() {
    if (data.length === 0) {
      toast.add({
        title: "Export Notice",
        description: "No user records to export.",
        type: "info",
      })
      return
    }

    const headers = ["User ID", "Name", "Email", "Role"]
    const rows = data.map((u) => [
      `"${u.user.id}"`,
      `"${u.user.name.replace(/"/g, '""')}"`,
      `"${u.user.email}"`,
      `"${u.role}"`,
    ])

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute(
      "download",
      `users_export_${new Date().toISOString().slice(0, 10)}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.add({
      title: "Export Initiated",
      description: "Users list CSV report has been generated.",
      type: "success",
    })
  }

  return (
    <section className="p-responsive space-y-6">
      {/* Header */}
      <HeaderTemplate
        title="Users"
        subtitle="Manage system users, roles, and faculty accounts across the institution."
        cta={[
          <Button key="export" onClick={handleExport}>
            <FileText className="mr-1.5 size-4" />
            Export Data
          </Button>,
        ]}
      />

      {/* Main Tabs Container */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <div className="overflow-x-auto pb-1">
          <TabsList className="w-full justify-start sm:w-auto">
            <TabsTrigger value="all">All Users ({data.length})</TabsTrigger>
            <TabsTrigger value="learners">
              Learners ({learners.length})
            </TabsTrigger>
            <TabsTrigger value="instructors">
              Instructors ({instructors.length})
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Search & Actions Control Row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchTemplate
            search={search}
            setSearch={(value) => setSearch(value)}
            title="email, name, or role"
          />

          <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
            <div className="flex items-center gap-2">
              <TooltipButtonTemplate
                triggerTextIcon={<RefreshCw />}
                triggerVariant="outline"
                content="Clear search filter"
                onClick={() => setSearch("")}
              />

              {/* Actions dropdown for selected users */}
              {selectedIds.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="outline">
                        <SlidersHorizontal className="mr-1.5 h-4 w-4" />
                        Actions ({selectedIds.length})
                        <ChevronDown className="ml-1.5 h-4 w-4" />
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Ban className="mr-2 h-4 w-4" />
                      Restrict
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <KeyRound className="mr-2 h-4 w-4" />
                      Permissions
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="default">
                      Add User
                      <ChevronDown className="ml-1.5 h-4 w-4" />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Learner
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserCog className="mr-2 h-4 w-4" />
                    Invite Instructor
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* User Table Card */}
        <Card className="overflow-hidden pt-0">
          <div className="w-full overflow-x-auto">
            <Table className="min-w-162.5 p-4">
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-12 pl-4">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Name</TableHead>
                  <TableHead className="whitespace-nowrap">Email</TableHead>
                  <TableHead className="whitespace-nowrap">Role</TableHead>
                  <TableHead className="w-10 pr-4" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-muted-foreground"
                    >
                      No users found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((u) => {
                    const isSelected = selectedIds.includes(u.user.id)
                    return (
                      <TableRow
                        key={u.user.id}
                        data-state={isSelected ? "selected" : undefined}
                        className="group even:bg-secondary/30 hover:bg-muted/40"
                      >
                        <TableCell className="pl-4">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleSelectUser(u.user.id)}
                            aria-label={`Select ${u.user.name}`}
                          />
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <Avatar size="sm">
                              <AvatarImage
                                src={u.user.profile_picture || undefined}
                                alt={u.user.name}
                              />
                              <AvatarFallback>{u.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">
                              {u.user.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground">
                          {u.user.email}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge
                            variant={
                              u.role.toLowerCase() === "instructor"
                                ? "default"
                                : "secondary"
                            }
                            className="capitalize"
                          >
                            {u.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="w-10 pr-4 text-right">
                          <div className="opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100 max-sm:opacity-100">
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                render={
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                }
                              />
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Ban className="mr-2 h-4 w-4" />
                                  Restrict
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <KeyRound className="mr-2 h-4 w-4" />
                                  Permissions
                                </DropdownMenuItem>
                                <DropdownMenuItem variant="destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </Tabs>
    </section>
  )
}

function UsersWithQuery() {
  const { data = [] } = useAdminAllUsers()
  return <UsersContent data={data} />
}

export default function Users({ data }: UsersProps) {
  if (data) {
    return <UsersContent data={data} />
  }

  return <UsersWithQuery />
}

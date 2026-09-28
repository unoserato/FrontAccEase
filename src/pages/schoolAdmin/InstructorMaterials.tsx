import { useState } from "react"
import { useNavigate } from "react-router-dom"
import HeaderTemplate from "@/components/common/PageTemplate"
import SearchTemplate from "@/components/common/SearchTemplate"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { classrooms, instructors, modules, quizzes } from "@/const/data"
import { ChevronRight } from "lucide-react"

export default function InstructorMaterials() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const filteredInstructors = instructors.filter((instructor) => {
    if (search.trim().length > 0) {
      return instructor.name.toLowerCase().includes(search.toLowerCase())
    }
    return true
  })

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    <section className="p-responsive space-y-4 sm:space-y-6">
      <HeaderTemplate
        title="Instructor Materials"
        subtitle="View instructors and a summary of their created classrooms, modules, and quizzes."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full flex-1 sm:max-w-md md:max-w-lg">
          <SearchTemplate
            search={search}
            setSearch={setSearch}
            title="instructor name"
          />
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-162.5">
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="whitespace-nowrap pl-4">Name</TableHead>
                <TableHead className="whitespace-nowrap text-center">Classrooms</TableHead>
                <TableHead className="whitespace-nowrap text-center">Modules</TableHead>
                <TableHead className="whitespace-nowrap text-center">Quizzes</TableHead>
                <TableHead className="w-32 pr-4 text-right whitespace-nowrap">View Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstructors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No instructors found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredInstructors.map((instructor) => {
                  const classroomCount = classrooms.filter(
                    (c) => c.created_by === instructor.id
                  ).length
                  const moduleCount = modules.filter(
                    (m) => m.created_by === instructor.id
                  ).length
                  const quizCount = quizzes.filter(
                    (q) =>
                      q.created_by === instructor.id || q.author === instructor.name
                  ).length

                  return (
                    <TableRow
                      key={instructor.id}
                      className="group cursor-pointer hover:bg-muted/40"
                      onClick={() => navigate(`./${instructor.id}`)}
                    >
                      <TableCell className="pl-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            <AvatarImage src={instructor.img} alt={instructor.name} />
                            <AvatarFallback>{getInitials(instructor.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-semibold text-foreground block group-hover:underline">
                              {instructor.name}
                            </span>
                            <Badge variant="secondary" className="capitalize text-xs py-0 px-1.5 mt-0.5">
                              {instructor.role}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-bold text-foreground whitespace-nowrap">
                        {classroomCount}
                      </TableCell>
                      <TableCell className="text-center font-bold text-foreground whitespace-nowrap">
                        {moduleCount}
                      </TableCell>
                      <TableCell className="text-center font-bold text-foreground whitespace-nowrap">
                        {quizCount}
                      </TableCell>
                      <TableCell className="pr-4 text-right whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="font-medium text-xs sm:text-sm text-foreground group-hover:text-primary"
                        >
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </section>
  )
}

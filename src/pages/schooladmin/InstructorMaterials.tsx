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
import { ChevronRight } from "lucide-react"
import { useInstructorMaterialsList } from "@/services/tanstack/materials"

export default function InstructorMaterials() {
  const [search, setSearch] = useState("")
  const { data: instructorMaterials } = useInstructorMaterialsList()
  const navigate = useNavigate()

  const filteredInstructors = instructorMaterials.filter((instructor) => {
    if (search.trim().length > 0) {
      return instructor.user.name.toLowerCase().includes(search.toLowerCase())
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
                <TableHead className="pl-4 whitespace-nowrap">Name</TableHead>
                <TableHead className="text-center whitespace-nowrap">
                  Classrooms
                </TableHead>
                <TableHead className="text-center whitespace-nowrap">
                  Modules
                </TableHead>
                <TableHead className="text-center whitespace-nowrap">
                  Quizzes
                </TableHead>
                <TableHead className="w-32 pr-4 text-right whitespace-nowrap">
                  View Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstructors.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No instructors found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredInstructors.map((ins) => {
                  const instructor = ins.user
                  const classroomCount = instructor.classroom_count
                  const moduleCount = instructor.module_count
                  const quizCount = instructor.quiz_count
                  return (
                    <TableRow
                      key={instructor.id}
                      className="group cursor-pointer hover:bg-muted/40"
                      onClick={() => navigate(`./${instructor.id}`)}
                    >
                      <TableCell className="pl-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            <AvatarImage
                              src={instructor.profile_picture}
                              alt={instructor.name}
                            />
                            <AvatarFallback>
                              {getInitials(instructor.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="block font-semibold text-foreground group-hover:underline">
                              {instructor.name}
                            </span>
                            <Badge
                              variant="secondary"
                              className="mt-0.5 px-1.5 py-0 text-xs capitalize"
                            >
                              Instructor
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-bold whitespace-nowrap text-foreground">
                        {classroomCount}
                      </TableCell>
                      <TableCell className="text-center font-bold whitespace-nowrap text-foreground">
                        {moduleCount}
                      </TableCell>
                      <TableCell className="text-center font-bold whitespace-nowrap text-foreground">
                        {quizCount}
                      </TableCell>
                      <TableCell className="pr-4 text-right whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs font-medium text-foreground group-hover:text-primary sm:text-sm"
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

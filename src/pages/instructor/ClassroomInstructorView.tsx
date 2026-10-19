import { useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import HeaderTemplate from "@/components/common/PageTemplate"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  FileQuestion,
  FileText,
  Globe,
  Users,
} from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ModuleCardTemplate from "@/components/common/ModuleCardTemplate"
import QuizCardTemplate from "@/components/common/QuizCardTemplate"
import { Badge } from "@/components/ui/badge"
import copyText from "@/hooks/copy-text"
import { useClassroomContentView } from "@/services/tanstack/materials"
import type { ClassroomViewProps } from "@/const/props/classroomProps"
import ErrorBoundary from "../errors/ErrorBoundary"

export default function ClassroomInstructorView() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [copied, setCopied] = useState(false)
  const { data: classroom } = useClassroomContentView(id!)

  const tabParam = searchParams.get("tab")
  const activeTabValue =
    tabParam === "c" ? "classwork" : tabParam === "p" ? "people" : "dashboard"

  const handleTabChange = (value: string) => {
    const code = value === "classwork" ? "c" : value === "people" ? "p" : "d"
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set("tab", code)
        return next
      },
      { replace: true }
    )
  }

  if (!classroom) return <ErrorBoundary />

  return (
    <section className="p-responsive w-full space-y-4 bg-background sm:space-y-6">
      <HeaderTemplate
        backTo="-1"
        title={classroom.classroom.name}
        subtitle={classroom.classroom.classroom_description}
        cta={[
          <Button
            key="copy-code"
            variant="ghost"
            onClick={() =>
              copyText({
                textToCopy: classroom.classroom.classroom_join_code,
                setCopied(value) {
                  setCopied(value)
                },
              })
            }
            className="cursor-pointer text-xs sm:text-sm"
          >
            {copied ? (
              <Check className="mr-1.5 size-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="mr-1.5 size-4 text-muted-foreground" />
            )}
            <span>Join Code: {classroom.classroom.classroom_code}</span>
          </Button>,
          <Button key="export" onClick={() => alert("Export data")}>
            <FileText className="mr-1.5 size-4" />
            Export Data
          </Button>,
        ]}
      />

      <Tabs
        value={activeTabValue}
        onValueChange={(val) => handleTabChange(String(val))}
        className="w-full"
      >
        <div className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 py-1 backdrop-blur-md">
          <TabsList variant="line" className="w-full justify-start gap-4">
            <TabsTrigger value="dashboard" className="text-xs sm:text-sm">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="classwork" className="text-xs sm:text-sm">
              Classwork
            </TabsTrigger>
            <TabsTrigger value="people" className="text-xs sm:text-sm">
              People
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="mt-4 sm:mt-6">
          <Dashboard classroom={classroom} />
        </TabsContent>

        <TabsContent value="classwork" className="mt-4 sm:mt-6">
          <Classwork />
        </TabsContent>

        <TabsContent value="people" className="mt-4 sm:mt-6">
          <People classroom={classroom} />
        </TabsContent>
      </Tabs>
      <div className="h-20" aria-label="spacer" />
    </section>
  )
}

function Dashboard({ classroom }: { classroom: ClassroomViewProps }) {
  // Filter modules and quizzes assigned to this classroom
  const classroomModules = classroom.modules
  const classroomQuizzes = classroom.quizzes

  const totalScans = classroom.learners.length

  const KPI = [
    {
      title: "Scans",
      icon: Globe,
      value: totalScans,
      footerDesc: "Automated DOM evaluations",
    },
    {
      title: "Learners",
      icon: Users,
      value: classroom.learners.length,
      footerDesc: "Enrolled active students",
    },
    {
      title: "Modules",
      icon: BookOpen,
      value: classroomModules.length,
      footerDesc: "Assigned learning units",
    },
    {
      title: "Assessments",
      icon: FileQuestion,
      value: classroomQuizzes.length,
      footerDesc: "Classroom evaluations",
    },
  ]

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPI.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <CardAction>
                <kpi.icon className="size-4" />
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {kpi.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {kpi.footerDesc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Assigned Modules Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground sm:text-lg">
              Course Modules
            </h3>
            <p className="text-xs text-muted-foreground">
              Learning modules assigned to {classroom.classroom.name}
            </p>
          </div>
          <Link
            to="/instructor/modules"
            className={buttonVariants({ variant: "link", size: "sm" })}
          >
            View all modules
            <ArrowUpRight className="ml-1 size-3.5" />
          </Link>
        </div>

        {classroomModules.length === 0 ? (
          <Card className="p-8 text-center text-xs text-muted-foreground">
            No modules assigned to this classroom yet.
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {classroomModules.map((module) => (
              <ModuleCardTemplate key={module.id} module={module} />
            ))}
          </div>
        )}
      </div>

      {/* Assigned Quizzes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground sm:text-lg">
              Classroom Quizzes & Assessments
            </h3>
            <p className="text-xs text-muted-foreground">
              Evaluations assigned to {classroom.classroom.name}
            </p>
          </div>
          <Link
            to="/instructor/quizzes"
            className={buttonVariants({ variant: "link", size: "sm" })}
          >
            View all quizzes
            <ArrowUpRight className="ml-1 size-3.5" />
          </Link>
        </div>

        {classroomQuizzes.length === 0 ? (
          <Card className="p-8 text-center text-xs text-muted-foreground">
            No assessments assigned to this classroom yet.
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {classroomQuizzes.map((quiz) => (
              <QuizCardTemplate key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Classwork() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 py-4 sm:py-6">
      {/* <ClassworkCardTemplate classroom={classroom} /> */}
    </div>
  )
}

function People({ classroom }: { classroom: ClassroomViewProps }) {
  const instructor =
    classroom.classroom.instructor?.name ||
    classroom.classroom.created_by ||
    "Instructor"
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 py-4 sm:space-y-8 sm:py-6">
      <Card>
        <CardHeader className="px-4 py-3 sm:px-5 sm:py-4">
          <CardTitle className="text-base font-semibold tracking-tight text-foreground sm:text-xl">
            Teacher
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-3.5 px-4 pb-4 text-sm sm:px-5 sm:pb-5 sm:text-base">
          <Avatar className="size-9 border border-border sm:size-10">
            <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" />
            <AvatarFallback>{instructor[0] || "I"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{instructor}</p>
            <p className="text-xs text-muted-foreground">Lead Instructor</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between px-4 py-3 sm:px-5 sm:py-4">
          <CardTitle className="text-base font-semibold tracking-tight text-foreground sm:text-xl">
            Learners
          </CardTitle>
          <Badge variant="secondary" className="text-xs font-medium">
            {classroom.learners.length} Enrolled
          </Badge>
        </CardHeader>
        <CardContent className="divide-y divide-border/60 p-0">
          {classroom.learners.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">
              No learners enrolled in this classroom.
            </div>
          ) : (
            classroom.learners.map((learner) => {
              return (
                <div
                  className="flex items-center justify-between p-3.5 text-xs transition-colors hover:bg-muted/30 sm:p-4 sm:text-sm"
                  key={learner.id}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8 border border-border sm:size-9">
                      <AvatarImage src={learner.profile_picture ?? ""} />
                      <AvatarFallback>
                        {learner.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">
                        {learner.name}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Student
                  </Badge>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}

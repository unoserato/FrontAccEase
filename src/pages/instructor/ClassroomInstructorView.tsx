import { useState } from "react"
import { classrooms, learners, modules } from "@/const/data"
import { Link, useParams, useSearchParams } from "react-router-dom"
import NotFound from "../errors/NotFound"
import HeaderTemplate from "@/components/common/PageTemplate"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  ArrowUpRight,
  Book,
  Brain,
  Check,
  Code,
  Copy,
  Eye,
  FilePen,
  FileText,
  KeyboardIcon,
  ScanSearch,
  Users,
  ShieldCheck,
} from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ClassroomProps } from "@/const/materialsProps"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
import ClassworkCardTemplate from "@/components/instructor/ClassworkCardTemplate"
import { Badge } from "@/components/ui/badge"
import copyText from "@/hooks/copy-text"

export default function ClassroomInstructorView() {
  const { id } = useParams<{ id: string }>()
  const [searchParams, setSearchParams] = useSearchParams()

  const classroom = classrooms.find((c) => c.id == id)

  if (!classroom) {
    return <NotFound />
  }

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

  return (
    <section className="p-responsive w-full space-y-4 bg-background sm:space-y-6">
      <HeaderTemplate
        backTo="/instructor/classroom"
        title={classroom?.classroom_code}
        subtitle={classroom?.name}
        cta={[
          <Button key="export" onClick={() => alert("Export data")}>
            <FileText className="h-4 w-4" />
            Export data
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
          <Dashboard classroom={classroom!} />
        </TabsContent>
        <TabsContent value="classwork" className="mt-4 sm:mt-6">
          <Classwork classroom={classroom!} />
        </TabsContent>
        <TabsContent value="people" className="mt-4 sm:mt-6">
          <People classroom={classroom!} />
        </TabsContent>
      </Tabs>
      <div className="h-20" aria-label="spacer"></div>
    </section>
  )
}

function Dashboard({ classroom }: { classroom: ClassroomProps }) {
  const [copied, setCopied] = useState(false)

  const auditLogs = [
    { name: "Perceivable", value: 6, icon: Eye },
    { name: "Operable", value: 4, icon: KeyboardIcon },
    { name: "Understandable", value: 3, icon: Brain },
    { name: "Robust", value: 1, icon: Code },
  ]

  // Mock total accessibility audit scans combined across all enrolled learners
  const totalScans = (classroom?.learners.length || 0) * 24 + 18

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        <Card>
          <CardHeader className="p-3.5 pb-1 sm:p-5 sm:pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs font-medium">
                Class Join Code
              </CardDescription>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 text-muted-foreground"
                onClick={() =>
                  copyText({
                    textToCopy: classroom.join_code,
                    setCopied(value) {
                      setCopied(value)
                    },
                  })
                }
                title="Copy join code"
              >
                {copied ? (
                  <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span className="sr-only">Copy Join Code</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-3.5 pt-0 sm:p-5 sm:pt-0">
            <p className="font-mono text-sm font-bold tracking-wider text-foreground sm:text-lg">
              {classroom?.join_code}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3.5 pb-1 sm:p-5 sm:pb-2">
            <CardDescription className="text-xs font-medium">
              Learners
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0 sm:p-5 sm:pt-0">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
              <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {classroom?.learners.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3.5 pb-1 sm:p-5 sm:pb-2">
            <CardDescription className="text-xs font-medium">
              Modules
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0 sm:p-5 sm:pt-0">
            <div className="flex items-center gap-2">
              <Book className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
              <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {modules.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3.5 pb-1 sm:p-5 sm:pb-2">
            <CardDescription className="text-xs font-medium">
              Assessments
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-0 sm:p-5 sm:pt-0">
            <div className="flex items-center gap-2">
              <FilePen className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
              <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {classroom?.learners.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accessibility Audit */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base font-semibold sm:text-lg">
                Accessibility Audit Overview
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Aggregated WCAG compliance audit results across all learner
                scans
              </CardDescription>
            </div>
            <CardAction>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                View audit log
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </CardAction>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-4 pt-0 sm:p-6 sm:pt-0">
          {/* Prominent Hero Metric Panel */}
          <div className="flex flex-col gap-4 rounded-xl border border-border/80 bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ScanSearch className="size-6" />
              </div>
              <div>
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Total Combined Scans
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                    {totalScans}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    audits run by {classroom?.learners.length} learners
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 border-t border-border/60 pt-3 sm:border-t-0 sm:pt-0">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Total Issues Found
                </p>
                <p className="text-xl font-bold text-destructive">14 Issues</p>
              </div>
              <Separator
                orientation="vertical"
                className="hidden h-8 sm:block"
              />
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Pass Rate
                </p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  88%
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Issues by WCAG Principle
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {auditLogs.map((audit) => (
                <div
                  key={audit.name}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-3 sm:p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-muted-foreground">
                      {audit.name}
                    </p>
                    <p className="mt-1 text-lg font-bold tracking-tight text-foreground sm:text-2xl">
                      {audit.value} {audit.value === 1 ? "Issue" : "Issues"}
                    </p>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40 text-muted-foreground sm:h-9 sm:w-9">
                    <audit.icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Modules & Classroom Info Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              Course Modules
            </h3>
            <Link
              to="/instructor/modules"
              className={buttonVariants({ variant: "link" })}
            >
              View all
              <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </div>
          <ItemGroup className="gap-2">
            {modules.slice(0, 3).map((module) => (
              <Item
                key={module.id}
                variant="outline"
                className="p-3 transition-colors hover:bg-muted/40"
                render={<Link to="/instructor/modules" />}
              >
                <ItemContent className="min-w-0">
                  <ItemTitle className="truncate text-xs font-semibold text-foreground sm:text-sm">
                    {module.name}
                  </ItemTitle>
                  <ItemDescription className="text-xs text-muted-foreground">
                    {module.principle}
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
          {modules.length > 3 && (
            <p className="w-full text-center text-xs font-semibold text-muted-foreground">
              +{modules.length - 3} more modules
            </p>
          )}
        </div>

        {/* Classroom Summary Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="p-4 sm:p-5">
            <CardTitle className="text-sm font-semibold sm:text-base">
              Classroom Summary
            </CardTitle>
            <CardDescription className="text-xs">
              Overview and quick actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-0 sm:p-5 sm:pt-0">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Classroom Code:</span>
              <span className="font-semibold text-foreground">
                {classroom.classroom_code}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant="outline" className="text-[10px] font-medium">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Enrolled Students:</span>
              <span className="font-semibold text-foreground">
                {classroom.learners.length}
              </span>
            </div>
            <Separator className="my-2" />
            <div className="pt-1">
              <Button
                variant="outline"
                className="w-full justify-center text-xs"
                onClick={() => alert("Classroom Settings")}
              >
                <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                Classroom Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Classwork({ classroom }: { classroom: ClassroomProps }) {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 py-4 sm:py-6">
      <ClassworkCardTemplate classroom={classroom} />
    </div>
  )
}

function People({ classroom }: { classroom: ClassroomProps }) {
  const teacher = "Coach Tab"
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 py-4 sm:space-y-8 sm:py-6">
      <Card>
        <CardHeader className="px-4 py-3 sm:px-5 sm:py-4">
          <CardTitle className="text-base font-semibold tracking-tight text-foreground sm:text-xl">
            Teacher
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-3.5 px-4 pb-4 text-sm sm:px-5 sm:pb-5 sm:text-base">
          <Avatar className="h-9 w-9 border border-border sm:h-10 sm:w-10">
            <AvatarImage
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFkvp-hg0BMcTnK841y7UowbtTwycMUkehMbUKhwimzGYOUW5y17TY2WMZsUC6rQUthecU8uIH4la0M65TxJZx46AenYfa6rQ_nDCTso&s=10"
              }
            />
            <AvatarFallback>{teacher[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{teacher}</p>
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
          {classroom.learners.map((learnerId, i) => {
            const learner = learners.find((l) => l.id == learnerId)
            if (!learner) return null

            return (
              <div
                className="flex items-center justify-between p-3.5 text-xs transition-colors hover:bg-muted/30 sm:p-4 sm:text-sm"
                key={i}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 border border-border sm:h-9 sm:w-9">
                    <AvatarImage src={learner.img} />
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
                <Badge variant="outline" className="text-[10px]">
                  Student
                </Badge>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}

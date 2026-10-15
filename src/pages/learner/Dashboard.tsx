import { useNavigate, Link } from "react-router-dom"
import HeaderTemplate from "@/components/common/PageTemplate"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { EarnedBagdes } from "./CoreModulesView"
import LearnerQuizCardTemplate from "@/components/common/LearnerQuizCardTemplate"
import { coreModules } from "@/const/coreModules"
import {
  ArrowUpRight,
  ChevronRight,
  FileQuestion,
  Globe,
  MessageSquare,
  Sparkles,
  ExternalLink,
} from "lucide-react"
import { SiGoogleclassroom } from "react-icons/si"
import {
  useClassroomContentView,
  useClassrooms,
} from "@/services/tanstack/materials"

const principleMasteryData = [
  {
    id: "perceivable",
    name: "Perceivable",
    value: 75,
    description:
      "Alt text, media alternatives, color contrast & resizable text",
    level: "Level AA",
  },
  {
    id: "operable",
    name: "Operable",
    value: 40,
    description: "Keyboard accessibility, focus management & timing controls",
    level: "Level AA",
  },
  {
    id: "understandable",
    name: "Understandable",
    value: 10,
    description: "Predictable navigation, readable text & form error recovery",
    level: "Level A",
  },
  {
    id: "robust",
    name: "Robust",
    value: 0,
    description:
      "Semantic HTML, ARIA role compliance & assistive compatibility",
    level: "Level A",
  },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { data: classrooms } = useClassrooms()
  const { data: contents } = useClassroomContentView(classrooms[0]?.id)

  const myClassroom = classrooms[0]
  const classroomQuizzes = contents.quizzes

  const activeLesson = coreModules[0].topics[0].lessons[0]

  const KPI = [
    {
      title: "POUR Mastery",
      icon: Sparkles,
      value: 46,
      footerDesc: "Overall core progress",
    },
    {
      title: "Enrolled Class",
      icon: SiGoogleclassroom,
      value: myClassroom.classroom_code,
      footerDesc: myClassroom.name,
    },
    {
      title: "Due Quizzes",
      icon: FileQuestion,
      value: classroomQuizzes.length,
      footerDesc: "Pending classroom quiz",
    },
    {
      title: "Analyzed Websites",
      icon: Globe,
      value: 0,
      footerDesc: "Accessibility scans",
    },
  ]

  return (
    <section className="p-responsive space-y-6">
      {/* Header */}
      <HeaderTemplate
        title="Learner Dashboard"
        subtitle="Track your progress, resume learning modules, complete assigned quizzes, and audit web accessibility."
      />

      {/* Row 1: The 4 Core Pillar KPI Metric Cards */}
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

      {/* Row 2: Dual Hero Section (Continue Learning + Classroom Snapshot) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Hero Left (2 cols): Continue Learning Card */}
        <Card className="flex flex-col justify-between rounded-2xl border-none bg-foreground p-6 text-background shadow-md lg:col-span-2">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-background text-xs font-bold tracking-wider text-foreground uppercase"
              >
                {coreModules[0].principle}
              </Badge>
              <span className="text-xs font-medium text-background/70">
                Lesson 1.1.1 • 6 min read
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {activeLesson.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-background/80">
                {activeLesson.description ||
                  "Master accessible name computation, text alternatives, and informative alt text guidelines for WCAG compliance."}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-background/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-background/80">
              <span>Next up: </span>
              <strong className="text-background">
                1.2.1 Audio-only & Video-only Alternatives
              </strong>
            </div>

            <Link
              to="/learner/modules/perceivable/topic-1-1/lesson-1-1-1"
              className={buttonVariants({
                variant: "secondary",
                size: "default",
                className: "shrink-0 font-bold shadow-sm",
              })}
            >
              Continue Learning <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </div>
        </Card>
        <EarnedBagdes />
      </div>

      {/* Row 3: Main Workspace (2-Column Grid) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (2 spans): Due Quizzes & POUR Principle Mastery */}
        <div className="space-y-6 lg:col-span-2">
          {/* Due Quizzes Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground sm:text-lg">
                  Due Assessments & Quizzes
                </h3>
                <p className="text-xs text-muted-foreground">
                  Active evaluations assigned by your instructor
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/learner/quizzes")}
                className="cursor-pointer text-xs font-medium text-foreground hover:text-primary"
              >
                View All <ChevronRight className="ml-1 size-3.5" />
              </Button>
            </div>

            {classroomQuizzes.length > 0 ? (
              <LearnerQuizCardTemplate quizzes={classroomQuizzes} title="Due" />
            ) : (
              <Card className="flex flex-col items-center justify-center border-dashed p-8 text-center">
                <FileQuestion className="mb-2 size-8 text-muted-foreground/50" />
                <p className="text-sm font-medium text-muted-foreground">
                  No quizzes currently due in your classroom.
                </p>
              </Card>
            )}
          </div>

          {/* POUR Principle Mastery Deep Dive */}
          <Card className="space-y-5 p-6">
            <CardHeader className="flex flex-row items-center justify-between p-0 pb-2">
              <div>
                <CardTitle className="text-lg font-bold sm:text-xl">
                  POUR Principle Mastery
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground sm:text-sm">
                  Click on any principle to explore foundational criteria,
                  guidelines, and interactive lessons
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/learner/modules")}
                className="shrink-0 cursor-pointer text-xs font-medium text-foreground hover:text-primary"
              >
                All Modules <ChevronRight className="ml-1 size-3.5" />
              </Button>
            </CardHeader>

            <CardContent className="grid grid-cols-1 gap-4 p-0 sm:grid-cols-2">
              {principleMasteryData.map((principle) => (
                <div
                  key={principle.id}
                  onClick={() => navigate(`/learner/modules/${principle.id}`)}
                  className="flex cursor-pointer flex-col justify-between space-y-3 rounded-xl border border-border/70 bg-card p-4 transition-all hover:border-primary/60 hover:shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-foreground">
                        {principle.name}
                      </h4>
                      <Badge
                        variant="outline"
                        className="text-xs font-semibold"
                      >
                        {principle.level}
                      </Badge>
                    </div>
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {principle.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 border-t border-border/40 pt-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-muted-foreground">Mastery</span>
                      <span className="text-foreground">
                        {principle.value}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${principle.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column (1 span): Badges, Analyzer Audits & Aria Assistant */}
        <div className="space-y-6 lg:col-span-1">
          {/* 1. Earned Achievement Badges */}

          {/* 2. Recent Analyzer Audit History */}
          <Card className="space-y-4 p-5">
            <CardHeader className="p-0 pb-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-foreground">
                  <Globe className="size-4 text-primary" />
                  <CardTitle className="text-base font-bold">
                    Recent URL Audit
                  </CardTitle>
                </div>
                <Badge variant="secondary" className="text-xs font-semibold">
                  Score: 90%
                </Badge>
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                Last inspected web page with Aria Analyzer
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 p-0">
              <div className="space-y-2 rounded-xl border border-border/60 bg-muted/30 p-3">
                <div className="flex min-w-0 items-center gap-2">
                  <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                  <span className="truncate font-mono text-xs font-semibold text-foreground">
                    attendex.online
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Detected 6 accessibility issues (2 Critical, 2 Serious, 2
                  Minor).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  className={`w-full ${buttonVariants({
                    variant: "outline",
                    size: "sm",
                  })}`}
                  to={"/learner/analyzer/1"}
                >
                  View Audit Findings
                  <ChevronRight className="ml-1 size-3.5" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 3. Aria AI Assistant Quick Query */}
          <Card className="space-y-3 border-primary/20 bg-linear-to-br from-primary/5 via-transparent to-transparent p-5">
            <div className="flex items-center gap-2 text-foreground">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <MessageSquare className="size-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  Ask Aria AI Assistant
                </h4>
                <p className="text-xs text-muted-foreground">
                  Instant guidance on WCAG remediation & code snippets
                </p>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              {[
                "How do I fix WCAG 1.4.3 color contrast?",
                "What is the difference between aria-label and aria-labelledby?",
              ].map((sampleQuery, idx) => (
                <Link
                  key={idx}
                  to="/learner/chat"
                  className="block rounded-lg bg-muted/40 p-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted/70 hover:text-primary"
                >
                  "{sampleQuery}"
                </Link>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-1 w-full cursor-pointer text-xs font-semibold"
              onClick={() => navigate("/learner/chat")}
            >
              Open Full Chat
              <ChevronRight className="ml-1 size-3.5" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}

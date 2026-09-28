import { useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import HeaderTemplate from "@/components/common/PageTemplate"
import SearchTemplate from "@/components/common/SearchTemplate"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { instructorClassLogs, type ClassLogItem } from "@/const/data"
import { ChevronRight, ExternalLink, Search } from "lucide-react"

interface StudentScanHistoryItem {
  id: string
  url: string
  timestamp: string
  score: number
  issuesCount: number
  topViolations: string[]
}

interface StudentLogData {
  id: string
  name: string
  studentId: string
  avatar: string
  totalScans: number
  passRate: string
  passRateNum: number
  lastScanTime: string
  totalIssues: number
  status: "Compliant" | "Needs Review" | "At Risk"
  scans: StudentScanHistoryItem[]
}

const mockClassroomStudents: Record<string, StudentLogData[]> = {
  default: [
    {
      id: "std-1",
      name: "Rene Clert Baterbonia",
      studentId: "1234-1234",
      avatar:
        "https://cf-images.assettype.com/sunstar%2F2026-06-16%2Fg6llfxiy%2FRENE-CLERT-BATERBONIA?w=640&auto=format%2Ccompress",
      totalScans: 18,
      passRate: "88.5%",
      passRateNum: 88.5,
      lastScanTime: "15 mins ago",
      totalIssues: 4,
      status: "Compliant",
      scans: [
        {
          id: "scan-101",
          url: "https://rene-portfolio.vercel.app",
          timestamp: "Sep 27, 2026 14:15",
          score: 92,
          issuesCount: 2,
          topViolations: [
            "1.4.3 Contrast (Minimum)",
            "2.4.4 Link Purpose (In Context)",
          ],
        },
        {
          id: "scan-102",
          url: "https://rene-ecommerce-demo.netlify.app",
          timestamp: "Sep 26, 2026 10:30",
          score: 85,
          issuesCount: 3,
          topViolations: [
            "1.1.1 Non-Text Content",
            "2.1.1 Keyboard Navigation",
          ],
        },
        {
          id: "scan-103",
          url: "https://attendex.online",
          timestamp: "Sep 24, 2026 16:45",
          score: 82,
          issuesCount: 4,
          topViolations: [
            "1.1.1 Non-Text Content",
            "1.4.3 Contrast (Minimum)",
            "1.2.1 Audio-only / Video-only",
          ],
        },
      ],
    },
    {
      id: "std-2",
      name: "Divine Adili",
      studentId: "1233-1233",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuiUj56VGtklGJA3F-rc285WPO_MOs2wJ2ETva28DInPemGbQeKfkQf_w&s=10",
      totalScans: 14,
      passRate: "82.0%",
      passRateNum: 82.0,
      lastScanTime: "1 hour ago",
      totalIssues: 6,
      status: "Compliant",
      scans: [
        {
          id: "scan-201",
          url: "https://divine-dashboard.pages.dev",
          timestamp: "Sep 27, 2026 13:30",
          score: 84,
          issuesCount: 3,
          topViolations: [
            "1.3.1 Info and Relationships",
            "1.4.3 Contrast (Minimum)",
          ],
        },
        {
          id: "scan-202",
          url: "https://divine-accessibility-audit.org",
          timestamp: "Sep 25, 2026 09:10",
          score: 80,
          issuesCount: 5,
          topViolations: ["2.1.1 Keyboard Navigation", "2.4.7 Focus Visible"],
        },
      ],
    },
    {
      id: "std-3",
      name: "Alyssa Nicole Santos",
      studentId: "1235-1235",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      totalScans: 22,
      passRate: "94.2%",
      passRateNum: 94.2,
      lastScanTime: "2 hours ago",
      totalIssues: 2,
      status: "Compliant",
      scans: [
        {
          id: "scan-301",
          url: "https://alyssa-inclusive-ui.dev",
          timestamp: "Sep 27, 2026 12:00",
          score: 96,
          issuesCount: 1,
          topViolations: ["1.4.3 Contrast (Minimum)"],
        },
        {
          id: "scan-302",
          url: "https://alyssa-library-catalog.com",
          timestamp: "Sep 26, 2026 17:40",
          score: 92,
          issuesCount: 2,
          topViolations: ["3.2.2 On Input", "1.1.1 Non-Text Content"],
        },
      ],
    },
    {
      id: "std-4",
      name: "Marc Ethan Villanueva",
      studentId: "1236-1236",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      totalScans: 12,
      passRate: "71.0%",
      passRateNum: 71.0,
      lastScanTime: "3 hours ago",
      totalIssues: 9,
      status: "Needs Review",
      scans: [
        {
          id: "scan-401",
          url: "https://marc-travel-blog.com",
          timestamp: "Sep 27, 2026 11:20",
          score: 71,
          issuesCount: 7,
          topViolations: [
            "1.1.1 Non-Text Content",
            "1.4.3 Contrast (Minimum)",
            "2.1.1 Keyboard Navigation",
            "2.4.1 Bypass Blocks",
          ],
        },
        {
          id: "scan-402",
          url: "https://marc-portfolio-v1.vercel.app",
          timestamp: "Sep 25, 2026 14:00",
          score: 74,
          issuesCount: 6,
          topViolations: [
            "1.4.3 Contrast (Minimum)",
            "3.3.1 Error Identification",
          ],
        },
      ],
    },
    {
      id: "std-5",
      name: "Sophia Isabel Reyes",
      studentId: "1237-1237",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
      totalScans: 16,
      passRate: "78.5%",
      passRateNum: 78.5,
      lastScanTime: "5 hours ago",
      totalIssues: 7,
      status: "Needs Review",
      scans: [
        {
          id: "scan-501",
          url: "https://sophia-recipe-finder.app",
          timestamp: "Sep 27, 2026 09:45",
          score: 79,
          issuesCount: 4,
          topViolations: ["1.1.1 Non-Text Content", "1.4.1 Use of Color"],
        },
        {
          id: "scan-502",
          url: "https://sophia-edu-notes.org",
          timestamp: "Sep 24, 2026 15:30",
          score: 78,
          issuesCount: 5,
          topViolations: [
            "2.4.4 Link Purpose (In Context)",
            "4.1.2 Name, Role, Value",
          ],
        },
      ],
    },
    {
      id: "std-6",
      name: "Joshua Miguel Dela Cruz",
      studentId: "1238-1238",
      avatar: "",
      totalScans: 18,
      passRate: "84.0%",
      passRateNum: 84.0,
      lastScanTime: "1 day ago",
      totalIssues: 5,
      status: "Compliant",
      scans: [
        {
          id: "scan-601",
          url: "https://joshua-crypto-tracker.io",
          timestamp: "Sep 26, 2026 16:15",
          score: 85,
          issuesCount: 3,
          topViolations: [
            "1.4.3 Contrast (Minimum)",
            "2.1.1 Keyboard Navigation",
          ],
        },
      ],
    },
  ],
}

export default function AnalyzerLogsClassroomView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [selectedStudent, setSelectedStudent] = useState<StudentLogData | null>(
    null
  )

  const currentClass: ClassLogItem = useMemo(() => {
    return (
      instructorClassLogs.find((c) => c.id === id) || instructorClassLogs[0]
    )
  }, [id])

  const studentsList = mockClassroomStudents.default

  const filteredStudents = useMemo(() => {
    return studentsList.filter((student) => {
      const matchesSearch =
        search.trim().length === 0 ||
        student.name.toLowerCase().includes(search.toLowerCase().trim()) ||
        student.studentId.includes(search.trim())

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [studentsList, search, statusFilter])

  return (
    <section className="p-responsive space-y-6">
      {/* Header */}
      <HeaderTemplate
        backTo="/instructor/logs"
        title={`${currentClass.className}`}
        subtitle="Student automated scan audit history, individual compliance pass rates, and inspection logs."
      />

      {/* Row 1: Classroom Summary KPI Cards (Information shown in the table) */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Class Scans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {currentClass.scans}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Automated DOM audits executed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Enrolled Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {currentClass.enrolled}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Active learners in section
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Compliance Pass Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-emerald-600 sm:text-3xl lg:text-4xl dark:text-emerald-400">
              {currentClass.passRate}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Classroom average WCAG compliance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Flagged Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {currentClass.flaggedCount}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Total accessibility violations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Students List and Scan Histories */}
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-foreground sm:text-lg">
              Student Scan History ({filteredStudents.length})
            </h3>
            <p className="text-xs text-muted-foreground">
              Inspect individual student automated test logs, URLs evaluated,
              and accessibility scores
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="w-full sm:w-64">
              <SearchTemplate
                search={search}
                setSearch={setSearch}
                title="student name or ID"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {["All", "Compliant", "Needs Review"].map((filter) => (
                <Button
                  key={filter}
                  variant={statusFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(filter)}
                  className="text-xs font-semibold"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Student Cards Grid */}
        <div className="space-y-3">
          {filteredStudents.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-12 text-center">
              <Search className="mb-2 size-8 text-muted-foreground/50" />
              <p className="text-sm font-medium text-muted-foreground">
                No students found matching your filter criteria.
              </p>
            </Card>
          ) : (
            filteredStudents.map((student) => (
              <Card
                key={student.id}
                className="overflow-hidden p-4 transition-colors hover:border-primary/40 sm:p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  {/* Student Basic Info */}
                  <div className="flex min-w-0 items-center gap-3.5">
                    <Avatar size="lg">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback className="font-bold">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-bold text-foreground sm:text-base">
                          {student.name}
                        </p>
                        <Badge
                          variant={
                            student.status === "Compliant"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs font-semibold"
                        >
                          {student.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        ID:{" "}
                        <span className="font-mono">{student.studentId}</span> •
                        Last scan: {student.lastScanTime}
                      </p>
                    </div>
                  </div>

                  {/* Student Scan Metrics & Action */}
                  <div className="flex shrink-0 items-center justify-between gap-4 border-t pt-3 sm:gap-6 sm:border-t-0 sm:pt-0 md:gap-8">
                    <div className="text-left sm:text-center">
                      <span className="block text-xs font-medium text-muted-foreground">
                        Scans Run
                      </span>
                      <span className="mt-0.5 block text-xs font-bold text-foreground sm:text-sm">
                        {student.totalScans}
                      </span>
                    </div>

                    <div className="text-left sm:text-center">
                      <span className="block text-xs font-medium text-muted-foreground">
                        Pass Rate
                      </span>
                      <span className="mt-0.5 block text-xs font-bold text-emerald-600 sm:text-sm dark:text-emerald-400">
                        {student.passRate}
                      </span>
                    </div>

                    <div className="text-left sm:text-center">
                      <span className="block text-xs font-medium text-muted-foreground">
                        Issues
                      </span>
                      <span className="mt-0.5 block text-xs font-bold text-foreground sm:text-sm">
                        {student.totalIssues}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedStudent(student)}
                      className="shrink-0 cursor-pointer text-xs font-semibold"
                    >
                      View Scan History
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Student Detailed Scan History Modal */}
      <Dialog
        open={Boolean(selectedStudent)}
        onOpenChange={(open) => !open && setSelectedStudent(null)}
      >
        <DialogContent className="max-w-2xl p-6">
          {selectedStudent && (
            <div className="space-y-5">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <Avatar size="lg">
                    <AvatarImage
                      src={selectedStudent.avatar}
                      alt={selectedStudent.name}
                    />
                    <AvatarFallback className="font-bold">
                      {selectedStudent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-lg font-bold">
                      {selectedStudent.name}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                      Student ID:{" "}
                      <span className="font-mono">
                        {selectedStudent.studentId}
                      </span>{" "}
                      • {currentClass.code}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Student Summary Stats */}
              <div className="grid grid-cols-3 gap-3 rounded-xl border border-border/50 bg-muted/40 p-3.5">
                <div>
                  <span className="block text-xs text-muted-foreground">
                    Total Scans
                  </span>
                  <span className="text-base font-bold text-foreground">
                    {selectedStudent.totalScans}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground">
                    Avg Pass Rate
                  </span>
                  <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedStudent.passRate}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground">
                    Flagged Issues
                  </span>
                  <span className="text-base font-bold text-foreground">
                    {selectedStudent.totalIssues}
                  </span>
                </div>
              </div>

              {/* Scan Log History Entries */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-foreground">
                  Recent Scan Executions
                </h4>

                <div className="max-h-80 space-y-2.5 overflow-y-auto pr-1">
                  {selectedStudent.scans.map((scan) => (
                    <div
                      key={scan.id}
                      className="space-y-2 rounded-xl border border-border/60 bg-card p-3.5 transition-colors hover:bg-muted/30"
                    >
                      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                        <div className="flex min-w-0 items-center gap-2">
                          <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                          <span className="truncate font-mono text-xs font-semibold text-foreground">
                            {scan.url}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              scan.score >= 90
                                ? "secondary"
                                : scan.score >= 75
                                  ? "outline"
                                  : "destructive"
                            }
                            className="text-xs font-bold"
                          >
                            Score: {scan.score}%
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {scan.timestamp}
                          </span>
                        </div>
                      </div>

                      {/* Top Violations */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-xs text-muted-foreground">
                          Detected Issues ({scan.issuesCount}):
                        </span>
                        {scan.topViolations.map((violation) => (
                          <Badge
                            key={violation}
                            variant="secondary"
                            className="px-2 py-0 text-xs font-medium"
                          >
                            {violation}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Link */}
                      <div className="flex justify-end pt-1">
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => navigate("/learner/analyzer/1")}
                          className="cursor-pointer text-xs font-medium text-foreground hover:text-primary"
                        >
                          View Full Audit Report
                          <ChevronRight className="ml-1 size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

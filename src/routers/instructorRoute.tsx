import ProtectedLayout from "@/layout/ProtectedLayout"
import { lazy } from "react"
import { Navigate, Route } from "react-router-dom"
import DetailSkeleton from "@/components/skeleton/DetailSkeleton"
import GridSkeleton from "@/components/skeleton/GridSkeleton"
import PageSkeleton from "@/components/skeleton/PageSkeleton"
import TableSkeleton from "@/components/skeleton/TableSkeleton"
import { suspense } from "@/components/skeleton/suspense"

const ModuleEditor = lazy(() => import("@/features/instructor/ModuleEditor"))
const QuizEditor = lazy(() => import("@/features/instructor/QuizEditor"))
const ModuleReadOnly = lazy(() => import("@/features/shared/ModuleReadOnly"))
const AnalyzerLogsClassroomView = lazy(
  () => import("@/pages/instructor/AnalyzerLogsClassroomView")
)
const AnalyzerLogsInstructor = lazy(
  () => import("@/pages/instructor/AnalyzerLogsInstructor")
)
const ClassroomInstructor = lazy(
  () => import("@/pages/instructor/ClassroomInstructor")
)
const ClassroomInstructorView = lazy(
  () => import("@/pages/instructor/ClassroomInstructorView")
)
const DashboardInstructor = lazy(
  () => import("@/pages/instructor/DashboardInstructor")
)
const ModulesInstructor = lazy(
  () => import("@/pages/instructor/ModulesInstructor")
)
const QuizzesInstructor = lazy(
  () => import("@/pages/instructor/QuizzesInstructor")
)
const QuizzesInstructorView = lazy(
  () => import("@/pages/instructor/QuizzesInstructorView")
)

export const instructorRoute = (
  <>
    <Route
      path="instructor"
      element={<ProtectedLayout allowedRoles="instructor" />}
    >
      <Route index element={<Navigate to="dashboard" />} />
      <Route
        path="dashboard"
        element={suspense(<DashboardInstructor />, <PageSkeleton />)}
      />
      <Route
        path="modules"
        element={suspense(<ModulesInstructor />, <GridSkeleton />)}
      />
      <Route
        path="quizzes"
        element={suspense(<QuizzesInstructor />, <GridSkeleton />)}
      />
      <Route
        path="quizzes/:id"
        element={suspense(<QuizzesInstructorView />, <TableSkeleton />)}
      />
      <Route
        path="classroom"
        element={suspense(<ClassroomInstructor />, <GridSkeleton />)}
      />
      <Route
        path="classroom/:id"
        element={suspense(<ClassroomInstructorView />, <DetailSkeleton />)}
      />
      <Route
        path="logs"
        element={suspense(<AnalyzerLogsInstructor />, <TableSkeleton />)}
      />
      <Route
        path="logs/classroom/:id"
        element={suspense(<AnalyzerLogsClassroomView />, <TableSkeleton />)}
      />
      <Route
        path="logs/:id"
        element={suspense(<AnalyzerLogsClassroomView />, <TableSkeleton />)}
      />
    </Route>

    <Route
      path="/instructor/logs/classroom/:id"
      element={suspense(<AnalyzerLogsClassroomView />, <TableSkeleton />)}
    />
    <Route
      path="/instructor/logs/:id"
      element={suspense(<AnalyzerLogsClassroomView />, <TableSkeleton />)}
    />
    <Route
      path="/instructor/modules/:id"
      element={suspense(<ModuleReadOnly />, <DetailSkeleton />)}
    />
    <Route
      path="/instructor/modules/new"
      element={suspense(<ModuleEditor />, <PageSkeleton />)}
    />
    <Route
      path="/instructor/modules/edit/:id"
      element={suspense(<ModuleEditor />, <PageSkeleton />)}
    />
    <Route
      path="/instructor/quizzes/new"
      element={suspense(<QuizEditor />, <PageSkeleton />)}
    />
    <Route
      path="/instructor/quizzes/edit/:id"
      element={suspense(<QuizEditor />, <PageSkeleton />)}
    />
    <Route
      path="/instructor/quizzes/:id"
      element={suspense(<QuizzesInstructorView />, <TableSkeleton />)}
    />
  </>
)

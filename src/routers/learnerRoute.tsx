import ProtectedLayout from "@/layout/ProtectedLayout"
import { lazy } from "react"
import { Navigate, Route } from "react-router-dom"
import DetailSkeleton from "@/components/skeleton/DetailSkeleton"
import GridSkeleton from "@/components/skeleton/GridSkeleton"
import PageSkeleton from "@/components/skeleton/PageSkeleton"
import TableSkeleton from "@/components/skeleton/TableSkeleton"
import { suspense } from "@/components/skeleton/suspense"

const CoreModuleReadOnly = lazy(
  () => import("@/features/shared/CoreModuleReadOnly")
)
const ModuleReadOnly = lazy(() => import("@/features/shared/ModuleReadOnly"))
const AnalyzerResults = lazy(() => import("@/pages/common/AnalyzerResults"))
const Analyzer = lazy(() => import("@/pages/learner/Analyzer"))
const AnalyzerExtension = lazy(
  () => import("@/pages/learner/AnalyzerExtension")
)
const Chat = lazy(() => import("@/pages/learner/Chat"))
const Classroom = lazy(() => import("@/pages/learner/Classroom"))
const CoreModulesView = lazy(() => import("@/pages/learner/CoreModulesView"))
const Dashboard = lazy(() => import("@/pages/learner/Dashboard"))
const LearnerQuizView = lazy(() => import("@/pages/learner/LearnerQuizView"))
const Modules = lazy(() => import("@/pages/learner/Modules"))
const Quizzes = lazy(() => import("@/pages/learner/Quizzes"))

export const learnerRoute = (
  <>
    <Route path="learner" element={<ProtectedLayout allowedRoles="learner" />}>
      <Route index element={<Navigate to="dashboard" />} />
      <Route
        path="dashboard"
        element={suspense(<Dashboard />, <PageSkeleton />)}
      />
      <Route path="modules" element={suspense(<Modules />, <GridSkeleton />)} />
      <Route
        path="modules/:principleId"
        element={suspense(<CoreModulesView />, <GridSkeleton />)}
      />
      <Route
        path="quizzes"
        element={suspense(<Quizzes />, <TableSkeleton />)}
      />
      <Route
        path="classroom"
        element={suspense(<Classroom />, <PageSkeleton />)}
      />
      <Route path="chat" element={suspense(<Chat />, <PageSkeleton />)} />
      <Route
        path="analyzer"
        element={suspense(<Analyzer />, <PageSkeleton />)}
      />
      <Route
        path="analyzer/extension"
        element={suspense(<AnalyzerExtension />, <PageSkeleton />)}
      />
      <Route
        path="analyzer/:id"
        element={suspense(<AnalyzerResults />, <DetailSkeleton />)}
      />
    </Route>

    <Route
      path="/learner/modules/:principleId/:topicId/:lessonId"
      element={suspense(<CoreModuleReadOnly />, <DetailSkeleton />)}
    />
    <Route
      path="/learner/quizzes/:id"
      element={suspense(<LearnerQuizView />, <DetailSkeleton />)}
    />
    <Route
      path="/learner/classroom/module/:id"
      element={suspense(
        <ModuleReadOnly href="/learner/classroom" />,
        <DetailSkeleton />
      )}
    />
  </>
)

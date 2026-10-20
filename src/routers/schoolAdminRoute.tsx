import ProtectedLayout from "@/layout/ProtectedLayout"
import { lazy } from "react"
import { Navigate, Route } from "react-router-dom"
import DetailSkeleton from "@/components/skeleton/DetailSkeleton"
import GridSkeleton from "@/components/skeleton/GridSkeleton"
import PageSkeleton from "@/components/skeleton/PageSkeleton"
import TableSkeleton from "@/components/skeleton/TableSkeleton"
import { suspense } from "@/components/skeleton/suspense"

const ModuleReadOnly = lazy(() => import("@/features/shared/ModuleReadOnly"))
const AnalyzerLogsClassroomView = lazy(
  () => import("@/pages/instructor/AnalyzerLogsClassroomView")
)
const ClassroomInstructorView = lazy(
  () => import("@/pages/instructor/ClassroomInstructorView")
)
const QuizzesInstructorView = lazy(
  () => import("@/pages/instructor/QuizzesInstructorView")
)
const CoreModulesView = lazy(() => import("@/pages/learner/CoreModulesView"))
const AnalyzerLogsSchoolAdmin = lazy(
  () => import("@/pages/schooladmin/AnalyzerLogsSchoolAdmin")
)
const DashboardSchoolAdmin = lazy(
  () => import("@/pages/schooladmin/DashboardSchoolAdmin")
)
const InstructorMaterials = lazy(
  () => import("@/pages/schooladmin/InstructorMaterials")
)
const InstructorMaterialsView = lazy(
  () => import("@/pages/schooladmin/InstructorMaterialsView")
)
const Instruments = lazy(() => import("@/pages/schooladmin/Instruments"))
const LearningMaterials = lazy(
  () => import("@/pages/schooladmin/LearningMaterials")
)
const PourDraft = lazy(() => import("@/pages/schooladmin/PourDraft"))
const Permissions = lazy(() => import("@/pages/schooladmin/Permissions"))
const Users = lazy(() => import("@/pages/schooladmin/Users"))

export const schoolAdminRoute = (
  <>
    <Route path="admin" element={<ProtectedLayout allowedRoles="admin" />}>
      <Route index element={<Navigate to="dashboard" />} />
      <Route
        path="dashboard"
        element={suspense(<DashboardSchoolAdmin />, <PageSkeleton />)}
      />
      <Route
        path="pour-curriculum"
        element={<Navigate to="/admin/learning-materials" replace />}
      />
      <Route
        path="pour-curriculum/drafts/:revisionId"
        element={suspense(<PourDraft />, <PageSkeleton />)}
      />
      <Route
        path="learning-materials"
        element={suspense(<LearningMaterials />, <GridSkeleton />)}
      />
      <Route
        path="learning-materials/pour/drafts/:revisionId"
        element={suspense(<PourDraft />, <PageSkeleton />)}
      />
      <Route
        path="learning-materials/:principleId"
        element={suspense(<CoreModulesView />, <GridSkeleton />)}
      />
      <Route
        path="instructor-materials"
        element={suspense(<InstructorMaterials />, <GridSkeleton />)}
      />
      <Route
        path="instructor-materials/:id"
        element={suspense(<InstructorMaterialsView />, <DetailSkeleton />)}
      />
      <Route
        path="instructor-materials/:id/classroom/:id"
        element={suspense(<ClassroomInstructorView />, <DetailSkeleton />)}
      />
      <Route
        path="instructor-materials/:id/modules/:id"
        element={suspense(<ModuleReadOnly />, <DetailSkeleton />)}
      />
      <Route
        path="instructor-materials/:id/quizzes/:id"
        element={suspense(<QuizzesInstructorView />, <TableSkeleton />)}
      />
      <Route
        path="instruments"
        element={suspense(<Instruments />, <TableSkeleton />)}
      />
      <Route
        path="instruments/:guidelineId"
        element={suspense(<Instruments />, <TableSkeleton />)}
      />
      <Route path="users" element={suspense(<Users />, <TableSkeleton />)} />
      <Route
        path="logs"
        element={suspense(<AnalyzerLogsSchoolAdmin />, <TableSkeleton />)}
      />
      <Route
        path="logs/classroom/:id"
        element={suspense(<AnalyzerLogsClassroomView />, <TableSkeleton />)}
      />
      <Route
        path="permissions"
        element={suspense(<Permissions />, <TableSkeleton />)}
      />
    </Route>
  </>
)

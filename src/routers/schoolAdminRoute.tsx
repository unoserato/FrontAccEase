import ProtectedLayout from "@/layout/ProtectedLayout"
import { lazy } from "react"
import { Navigate, Route } from "react-router-dom"
import DetailSkeleton from "@/components/skeleton/DetailSkeleton"
import GridSkeleton from "@/components/skeleton/GridSkeleton"
import PageSkeleton from "@/components/skeleton/PageSkeleton"
import TableSkeleton from "@/components/skeleton/TableSkeleton"
import { suspense } from "@/components/skeleton/suspense"

const AnalyzerLogsSchoolAdminView = lazy(
  () => import("@/pages/schooladmin/AnalyzerLogsSchoolAdminView")
)
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
const LearningMaterialsView = lazy(
  () => import("@/pages/schooladmin/LearningMaterialsView")
)
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
const Permissions = lazy(() => import("@/pages/schooladmin/Permissions"))
const Users = lazy(() => import("@/pages/schooladmin/Users"))
const ProfileView = lazy(() => import("@/pages/common/ProfileView"))

export const schoolAdminRoute = (
  <>
    <Route path="admin" element={<ProtectedLayout allowedRoles="admin" />}>
      <Route index element={<Navigate to="dashboard" />} />
      <Route
        path="dashboard"
        element={suspense(<DashboardSchoolAdmin />, <PageSkeleton />)}
      />
      <Route
        path="learning-materials"
        element={suspense(<LearningMaterials />, <GridSkeleton />)}
      />
      <Route
        path="learning-materials/:principleId"
        element={suspense(<LearningMaterialsView />, <GridSkeleton />)}
      />
      <Route
        path="instructor-materials"
        element={suspense(<InstructorMaterials />, <GridSkeleton />)}
      />
      <Route
        path="instructor-materials/:instructorId"
        element={suspense(<InstructorMaterialsView />, <DetailSkeleton />)}
      />
      <Route
        path="instructor-materials/:instructorId/:classroomId"
        element={suspense(<ClassroomInstructorView />, <DetailSkeleton />)}
      />
      <Route
        path="instructor-materials/:instructorId/:classroomId/:moduleId"
        element={suspense(<ModuleReadOnly />, <DetailSkeleton />)}
      />
      <Route
        path="instructor-materials/:instructorId/modules/:moduleId"
        element={suspense(<ModuleReadOnly />, <DetailSkeleton />)}
      />
      <Route
        path="instructor-materials/:instructorId/quizzes/:quizId"
        element={suspense(<QuizzesInstructorView />, <TableSkeleton />)}
      />
      <Route
        path="instructor-materials/:instructorId/classroom/:classroomId"
        element={suspense(<ClassroomInstructorView />, <DetailSkeleton />)}
      />
      <Route
        path="instructor-materials/:instructorId/classroom/:classroomId/:moduleId"
        element={suspense(<ModuleReadOnly />, <DetailSkeleton />)}
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
        path="logs/:instructor_id"
        element={suspense(<AnalyzerLogsSchoolAdminView />, <TableSkeleton />)}
      />
      <Route
        path="logs/classroom/:id"
        element={suspense(<AnalyzerLogsClassroomView />, <TableSkeleton />)}
      />
      <Route
        path="permissions"
        element={suspense(<Permissions />, <TableSkeleton />)}
      />
      <Route
        path="profile"
        element={suspense(<ProfileView />, <PageSkeleton />)}
      />
    </Route>
  </>
)

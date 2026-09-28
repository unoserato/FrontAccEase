import ModuleReadOnly from "@/features/ModuleReadOnly"
import ProtectedLayout from "@/layout/ProtectedLayout"
import AnalyzerLogsClassroomView from "@/pages/instructor/AnalyzerLogsClassroomView"
import ClassroomInstructorView from "@/pages/instructor/ClassroomInstructorView"
import QuizzesInstructorView from "@/pages/instructor/QuizzesInstructorView"
import CoreModulesView from "@/pages/learner/CoreModulesView"
import AnalyzerLogsSchoolAdmin from "@/pages/schoolAdmin/AnalyzerLogsSchoolAdmin"
import DashboardSchoolAdmin from "@/pages/schoolAdmin/DashboardSchoolAdmin"
import InstructorMaterials from "@/pages/schoolAdmin/InstructorMaterials"
import InstructorMaterialsView from "@/pages/schoolAdmin/InstructorMaterialsView"
import Instruments from "@/pages/schoolAdmin/Instruments"
import LearningMaterials from "@/pages/schoolAdmin/LearningMaterials"
import Permissions from "@/pages/schoolAdmin/Permissions"
import Users from "@/pages/schoolAdmin/Users"
import { Navigate, Route } from "react-router-dom"

export const schoolAdminRoute = (
  <>
    <Route path="admin" element={<ProtectedLayout allowedRoles="admin" />}>
      <Route index element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<DashboardSchoolAdmin />} />
      <Route path="learning-materials" element={<LearningMaterials />} />
      <Route
        path="learning-materials/:principleId"
        element={<CoreModulesView />}
      />
      <Route path="instructor-materials" element={<InstructorMaterials />} />
      <Route
        path="instructor-materials/:id"
        element={<InstructorMaterialsView />}
      />
      <Route
        path="instructor-materials/:id/classroom/:id"
        element={<ClassroomInstructorView />}
      />
      <Route
        path="instructor-materials/:id/modules/:id"
        element={<ModuleReadOnly />}
      />
      <Route
        path="instructor-materials/:id/quizzes/:id"
        element={<QuizzesInstructorView />}
      />
      <Route path="instruments" element={<Instruments />} />
      <Route path="instruments/:guidelineId" element={<Instruments />} />
      <Route path="users" element={<Users />} />
      <Route path="logs" element={<AnalyzerLogsSchoolAdmin />} />
      <Route
        path="logs/classroom/:id"
        element={<AnalyzerLogsClassroomView />}
      />
      <Route path="permissions" element={<Permissions />} />
    </Route>
  </>
)

import ModuleEditor from "@/features/instructor/ModuleEditor"
import QuizEditor from "@/features/instructor/QuizEditor"
import ModuleReadOnly from "@/features/ModuleReadOnly"
import ProtectedLayout from "@/layout/ProtectedLayout"
import AnalyzerLogsClassroomView from "@/pages/instructor/AnalyzerLogsClassroomView"
import AnalyzerLogsInstructor from "@/pages/instructor/AnalyzerLogsInstructor"
import ClassroomInstructor from "@/pages/instructor/ClassroomInstructor"
import ClassroomInstructorView from "@/pages/instructor/ClassroomInstructorView"
import DashboardInstructor from "@/pages/instructor/DashboardInstructor"
import ModulesInstructor from "@/pages/instructor/ModulesInstructor"
import QuizzesInstructor from "@/pages/instructor/QuizzesInstructor"
import QuizzesInstructorView from "@/pages/instructor/QuizzesInstructorView"
import { Navigate, Route } from "react-router-dom"

export const instructorRoute = (
  <>
    <Route
      path="instructor"
      element={<ProtectedLayout allowedRoles="instructor" />}
    >
      <Route index element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<DashboardInstructor />} />
      <Route path="modules" element={<ModulesInstructor />} />
      <Route path="quizzes" element={<QuizzesInstructor />} />
      <Route path="quizzes/:id" element={<QuizzesInstructorView />} />
      <Route path="classroom" element={<ClassroomInstructor />} />
      <Route path="classroom/:id" element={<ClassroomInstructorView />} />
      <Route path="logs" element={<AnalyzerLogsInstructor />} />
      <Route
        path="logs/classroom/:id"
        element={<AnalyzerLogsClassroomView />}
      />
      <Route path="logs/:id" element={<AnalyzerLogsClassroomView />} />
    </Route>
    <Route
      path="/instructor/logs/classroom/:id"
      element={<AnalyzerLogsClassroomView />}
    />
    <Route
      path="/instructor/logs/:id"
      element={<AnalyzerLogsClassroomView />}
    />

    <Route path="/instructor/modules/:id" element={<ModuleReadOnly />} />

    <Route path="/instructor/modules/new" element={<ModuleEditor />} />
    <Route path="/instructor/modules/edit/:id" element={<ModuleEditor />} />
    <Route path="/instructor/quizzes/new" element={<QuizEditor />} />
    <Route path="/instructor/quizzes/edit/:id" element={<QuizEditor />} />
    <Route path="/instructor/quizzes/:id" element={<QuizzesInstructorView />} />
  </>
)

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom"
import RootLayout from "@/layout/RootLayout"
import PublicLayout from "./layout/PublicLayout"
import ErrorBoundary from "./pages/errors/ErrorBoundary"
import LoginPage from "./pages/public/LoginPage"
import ProtectedLayout from "./layout/ProtectedLayout"
import Dashboard from "./pages/learner/Dashboard"
import DashboardInstructor from "./pages/instructor/DashboardInstructor"
import ModulesInstructor from "./pages/instructor/ModulesInstructor"
import QuizzesInstructor from "./pages/instructor/QuizzesInstructor"
import ClassroomInstructor from "./pages/instructor/ClassroomInstructor"
import AnalyzerLogsInstructor from "./pages/instructor/AnalyzerLogsInstructor"
import DashboardSchoolAdmin from "./pages/schoolAdmin/DashboardSchoolAdmin"
import LearningMaterials from "./pages/schoolAdmin/LearningMaterials"
import InstructorMaterials from "./pages/schoolAdmin/InstructorMaterials"
import Instruments from "./pages/schoolAdmin/Instruments"
import Users from "./pages/schoolAdmin/Users"
import AnalyzerLogsSchoolAdmin from "./pages/schoolAdmin/AnalyzerLogsSchoolAdmin"
import Permissions from "./pages/schoolAdmin/Permissions"
import Unauthorized from "./pages/errors/Unauthorized"
import NotFound from "./pages/errors/NotFound"
import Modules from "./pages/learner/Modules"
import Analyzer from "./pages/learner/Analyzer"
import Chat from "./pages/learner/Chat"
import Classroom from "./pages/learner/Classroom"
import Quizzes from "./pages/learner/Quizzes"
import ModuleEditor from "./features/instructor/ModuleEditor"
import QuizEditor from "./features/instructor/QuizEditor"
import ClassroomInstructorView from "./pages/instructor/ClassroomInstructorView"
import ModuleReadOnly from "./features/ModuleReadOnly"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorBoundary />}>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
      {/*  */}
      {/* LEARNER */}
      <Route path="learner" element={<ProtectedLayout allowedRole="learner" />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="modules" element={<Modules />} />
        <Route path="quizzes" element={<Quizzes />} />
        <Route path="classroom" element={<Classroom />} />
        <Route path="chat" element={<Chat />} />
        <Route path="analyzer" element={<Analyzer />} />
      </Route>
      {/*  */}
      {/* INSTRUCTOR */}
      <Route
        path="instructor"
        element={<ProtectedLayout allowedRole="instructor" />}
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<DashboardInstructor />} />
        <Route path="modules" element={<ModulesInstructor />} />
        <Route path="quizzes" element={<QuizzesInstructor />} />
        <Route path="classroom" element={<ClassroomInstructor />} />
        <Route path="logs" element={<AnalyzerLogsInstructor />} />
      </Route>
      <Route
        path="/instructor/classroom/:id"
        element={<ClassroomInstructorView />}
      />
      <Route path="/instructor/modules/:id" element={<ModuleReadOnly />} />
      <Route path="/learner/modules/:id" element={<ModuleReadOnly />} />
      <Route path="/instructor/modules/new" element={<ModuleEditor />} />
      <Route path="/instructor/modules/edit/:id" element={<ModuleEditor />} />
      <Route path="/instructor/quizzes/new" element={<QuizEditor />} />
      <Route path="/instructor/quizzes/edit/:id" element={<QuizEditor />} />
      {/*  */}
      {/* SCHOOL ADMIN */}
      <Route path="admin" element={<ProtectedLayout allowedRole="admin" />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<DashboardSchoolAdmin />} />
        <Route path="learning-materials" element={<LearningMaterials />} />
        <Route path="instructor-materials" element={<InstructorMaterials />} />
        <Route path="instruments" element={<Instruments />} />
        <Route path="users" element={<Users />} />
        <Route path="logs" element={<AnalyzerLogsSchoolAdmin />} />
        <Route path="permissions" element={<Permissions />} />
      </Route>
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

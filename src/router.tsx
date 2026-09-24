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
import Instruments from "./pages/schoolAdmin/Instruments"
import Users from "./pages/schoolAdmin/Users"
import AnalyzerLogsSchoolAdmin from "./pages/schoolAdmin/AnalyzerLogsSchoolAdmin"
import Permissions from "./pages/schoolAdmin/Permissions"
import NotFound from "./pages/errors/NotFound"
import Modules from "./pages/learner/Modules"
import Analyzer from "./pages/learner/Analyzer"
import Chat from "./pages/learner/Chat"
import Classroom from "./pages/learner/Classroom"
import Quizzes from "./pages/learner/Quizzes"
import LearnerQuizView from "./pages/learner/LearnerQuizView"
import ModuleEditor from "./features/instructor/ModuleEditor"
import QuizEditor from "./features/instructor/QuizEditor"
import ClassroomInstructorView from "./pages/instructor/ClassroomInstructorView"
import QuizzesInstructorView from "./pages/instructor/QuizzesInstructorView"
import ModuleReadOnly from "./features/ModuleReadOnly"
import CoreModuleReadOnly from "./features/CoreModuleReadOnly"
import CoreModulesView from "./pages/learner/CoreModulesView"
import AnalyzerResults from "./pages/common/AnalyzerResults"
import AnalyzerExtension from "./pages/learner/AnalyzerExtension"
import InstructorMaterialsView from "./pages/schoolAdmin/InstructorMaterialsView"
import InstructorMaterials from "./pages/schoolAdmin/InstructorMaterials"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorBoundary />}>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
      {/*  */}
      {/* LEARNER */}
      <Route
        path="learner"
        element={<ProtectedLayout allowedRoles="learner" />}
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="modules" element={<Modules />} />
        <Route path="modules/:principleId" element={<CoreModulesView />} />
        <Route path="quizzes" element={<Quizzes />} />
        <Route path="classroom" element={<Classroom />} />
        <Route path="chat" element={<Chat />} />
        <Route path="analyzer" element={<Analyzer />} />
        <Route path="analyzer/extension" element={<AnalyzerExtension />} />
        <Route path="analyzer/:id" element={<AnalyzerResults />} />
      </Route>
      <Route
        path="/learner/modules/:principleId/:topicId/:lessonId"
        element={<CoreModuleReadOnly />}
      />
      <Route path="/learner/quizzes/:id" element={<LearnerQuizView />} />
      <Route
        path="/learner/classroom/module/:id"
        element={<ModuleReadOnly />}
      />

      {/*  */}
      {/* INSTRUCTOR */}
      <Route
        path="instructor"
        element={<ProtectedLayout allowedRoles="instructor" />}
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

      <Route path="/instructor/modules/new" element={<ModuleEditor />} />
      <Route path="/instructor/modules/edit/:id" element={<ModuleEditor />} />
      <Route path="/instructor/quizzes/new" element={<QuizEditor />} />
      <Route path="/instructor/quizzes/edit/:id" element={<QuizEditor />} />
      <Route
        path="/instructor/quizzes/:id"
        element={<QuizzesInstructorView />}
      />
      {/*  */}
      {/* SCHOOL ADMIN */}
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
        <Route path="permissions" element={<Permissions />} />
      </Route>
      {/* ERRORS */}
      <Route path="*" element={<NotFound />} />
      {/*  */}
      {/* MULTIPLE */}
    </Route>
  )
)

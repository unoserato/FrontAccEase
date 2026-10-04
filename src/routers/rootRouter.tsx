import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom"
import RootLayout from "@/layout/RootLayout"
import ErrorBoundary from "../pages/errors/ErrorBoundary"

import { publicRoute } from "./publicRoute"
import { schoolAdminRoute } from "./schoolAdminRoute"
import NotFound from "@/pages/errors/NotFound"
import { lazy } from "react"

import ProtectedLayout from "@/layout/ProtectedLayout"

const CoreModuleReadOnly = lazy(() => import("@/features/CoreModuleReadOnly"))
const ModuleReadOnly = lazy(() => import("@/features/ModuleReadOnly"))
const AnalyzerResults = lazy(() => import("@/pages/common/AnalyzerResults"))

// learner pages
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

// instructor pages
const ModuleEditor = lazy(() => import("@/features/instructor/ModuleEditor"))
const QuizEditor = lazy(() => import("@/features/instructor/QuizEditor"))
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorBoundary />}>
      {/* PUBLIC PAGES */}
      {publicRoute}

      {/* LEARNER */}
      <Route
        path="student"
        element={<ProtectedLayout allowedRoles="student" />}
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
        path="/student/modules/:principleId/:topicId/:lessonId"
        element={<CoreModuleReadOnly />}
      />
      <Route path="/student/quizzes/:id" element={<LearnerQuizView />} />
      <Route
        path="/student/classroom/module/:id"
        element={<ModuleReadOnly />}
      />

      {/* INSTRUCTOR */}
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
      <Route
        path="/instructor/quizzes/:id"
        element={<QuizzesInstructorView />}
      />

      {/* SCHOOL ADMIN */}
      {schoolAdminRoute}

      {/* ERRORS */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

export default function RootRouter() {
  return <RouterProvider router={router} />
}

import CoreModuleReadOnly from "@/features/CoreModuleReadOnly"
import ModuleReadOnly from "@/features/ModuleReadOnly"
import ProtectedLayout from "@/layout/ProtectedLayout"
import AnalyzerResults from "@/pages/common/AnalyzerResults"
import Analyzer from "@/pages/learner/Analyzer"
import AnalyzerExtension from "@/pages/learner/AnalyzerExtension"
import Chat from "@/pages/learner/Chat"
import Classroom from "@/pages/learner/Classroom"
import CoreModulesView from "@/pages/learner/CoreModulesView"
import Dashboard from "@/pages/learner/Dashboard"
import LearnerQuizView from "@/pages/learner/LearnerQuizView"
import Modules from "@/pages/learner/Modules"
import Quizzes from "@/pages/learner/Quizzes"
import { Navigate, Route } from "react-router-dom"

export const learnerRoute = (
  <>
    <Route path="learner" element={<ProtectedLayout allowedRoles="learner" />}>
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
    <Route path="/learner/classroom/module/:id" element={<ModuleReadOnly />} />
  </>
)

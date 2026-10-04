// // eslint-disable-next-line react-refresh/only-export-components
// import UserSkeleton from "@/components/skeleton/UserSkeleton"
// const CoreModuleReadOnly = lazy(() => import("@/features/CoreModuleReadOnly"))
// const ModuleReadOnly = lazy(() => import("@/features/ModuleReadOnly"))
// const ProtectedLayout = lazy(() => import("@/layout/ProtectedLayout"))
// const AnalyzerResults = lazy(() => import("@/pages/common/AnalyzerResults"))
// const Analyzer = lazy(() => import("@/pages/learner/Analyzer"))
// const AnalyzerExtension = lazy(
//   () => import("@/pages/learner/AnalyzerExtension")
// )
// const Chat = lazy(() => import("@/pages/learner/Chat"))
// const Classroom = lazy(() => import("@/pages/learner/Classroom"))
// const CoreModulesView = lazy(() => import("@/pages/learner/CoreModulesView"))
// const Dashboard = lazy(() => import("@/pages/learner/Dashboard"))
// const LearnerQuizView = lazy(() => import("@/pages/learner/LearnerQuizView"))
// const Modules = lazy(() => import("@/pages/learner/Modules"))
// const Quizzes = lazy(() => import("@/pages/learner/Quizzes"))
// import { Suspense, lazy } from "react"
// import { Navigate, Route } from "react-router-dom"

// export const learnerRoute = (
//   <Suspense fallback={<UserSkeleton />}>
//     <Route path="learner" element={<ProtectedLayout allowedRoles="learner" />}>
//       <Route index element={<Navigate to="dashboard" />} />
//       <Route path="dashboard" element={<Dashboard />} />
//       <Route path="modules" element={<Modules />} />
//       <Route path="modules/:principleId" element={<CoreModulesView />} />
//       <Route path="quizzes" element={<Quizzes />} />
//       <Route path="classroom" element={<Classroom />} />
//       <Route path="chat" element={<Chat />} />
//       <Route path="analyzer" element={<Analyzer />} />
//       <Route path="analyzer/extension" element={<AnalyzerExtension />} />
//       <Route path="analyzer/:id" element={<AnalyzerResults />} />
//     </Route>

//     <Route
//       path="/learner/modules/:principleId/:topicId/:lessonId"
//       element={<CoreModuleReadOnly />}
//     />
//     <Route path="/learner/quizzes/:id" element={<LearnerQuizView />} />
//     <Route path="/learner/classroom/module/:id" element={<ModuleReadOnly />} />
//   </Suspense>
// )

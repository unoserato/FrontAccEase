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
import NotFound from "./pages/errors/NotFound"
import Unauthorized from "./pages/errors/Unauthorized"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorBoundary />}>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
      {/* LEARNER */}
      <Route path="learner" element={<ProtectedLayout allowedRole="learner" />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      {/* INSTRUCTOR */}
      <Route
        path="instructor"
        element={<ProtectedLayout allowedRole="instructor" />}
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      {/* ADMIN */}
      <Route path="admin" element={<ProtectedLayout allowedRole="admin" />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import RootLayout from "@/layout/RootLayout"
import ErrorBoundary from "../pages/errors/ErrorBoundary"

import { publicRoute } from "./publicRoute"
import { learnerRoute } from "./learnerRoute"
import { instructorRoute } from "./instructorRoute"
import { schoolAdminRoute } from "./schoolAdminRoute"
import NotFound from "@/pages/errors/NotFound"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorBoundary />}>
      {/* PUBLIC PAGES */}
      {publicRoute}

      {/* LEARNER */}
      {learnerRoute}

      {/* INSTRUCTOR */}
      {instructorRoute}

      {/* SCHOOL ADMIN */}
      {schoolAdminRoute}

      {/* ERRORS */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

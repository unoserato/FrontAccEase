import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import RootLayout from "@/layout/RootLayout"

import { publicRoute } from "./publicRoute"
import { learnerRoute } from "./learnerRoute"
import { instructorRoute } from "./instructorRoute"
import { schoolAdminRoute } from "./schoolAdminRoute"
import ErrorBoundary from "../pages/errors/ErrorBoundary"
import NotFound from "@/pages/errors/NotFound"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorBoundary />}>
      {publicRoute}
      {learnerRoute}
      {instructorRoute}
      {schoolAdminRoute}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

export default function RootRouter() {
  return <RouterProvider router={router} />
}

import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const client = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

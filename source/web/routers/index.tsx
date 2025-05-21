// import HOC from "@/components/Hoc"
// import Dashboard from "@/views/components/Dashboard"
import LayoutView from "@/views/layout"
import GraphicsPage from "@/views/pages/Graphics"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import type { JSX } from "react"
import {
  type DOMRouterOpts,
  type RouteObject,
  RouterProvider,
  createBrowserRouter
} from "react-router"

// const EnhancedDashboard = HOC(Dashboard)

const RouteOptions: RouteObject[] = [
  {
    path: "/",
    element: <LayoutView date={new Date()} />,
    children: [
      {
        index: true,
        // element: <EnhancedDashboard />
        element: <GraphicsPage />
      }
    ]
  }
]
const opts: DOMRouterOpts = {}

const Router = createBrowserRouter(RouteOptions, opts)

function AppRouter(): JSX.Element {
  return <RouterProvider router={Router} />
}

export default AppRouter

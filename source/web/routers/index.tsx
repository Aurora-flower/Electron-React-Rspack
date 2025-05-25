// import HOC from "@/components/Hoc"
// import Dashboard from "@/ui/components/Dashboard"
import LayoutView from "@/ui/layout"
import GraphicsPage from "@/ui/pages/Graphics"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import type { JSX } from "react"
import { RouterProvider, createBrowserRouter } from "react-router"
import type { DOMRouterOpts, RouteObject } from "react-router"

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

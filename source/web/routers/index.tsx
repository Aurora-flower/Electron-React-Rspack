// import HOC from "@/components/Hoc"
// import Dashboard from "@/views/components/Dashboard"
import Layout from "@/views/layout"
import Graphics from "@/views/pages/Graphics"
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
    element: <Layout date={new Date()} />,
    children: [
      {
        index: true,
        // element: <EnhancedDashboard />
        element: <Graphics />
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

import type { JSX } from "react"
import * as React from "react"
import type { DOMRouterOpts, RouteObject } from "react-router-dom"
// react-router-dom 是基于 react-router 扩展的版本
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HOCPage from "@/components/HOC/Page"
import LayoutView from "@/ui/layout"
import GraphicsPage from "@/ui/pages/Graphics"
import Home from "@/ui/pages/Home"

const PixiJsGraphics = React.lazy(() => import("@/ui/pages/Graphics/PixiJS"))

const EnhancedHome = HOCPage(Home)

const RouteOptions: RouteObject[] = [
  {
    path: "/",
    element: <LayoutView date={new Date()} />,
    children: [
      {
        index: true,
        element: <EnhancedHome logSource="dashboard" />
      }
    ]
  },
  {
    path: "/graphics",
    element: <GraphicsPage />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <PixiJsGraphics />
          </React.Suspense>
        )
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

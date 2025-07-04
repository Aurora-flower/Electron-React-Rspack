import HOCPage from "@/components/HOC/Page"
import LayoutView from "@/ui/layout"
import GraphicsPage from "@/ui/pages/Graphics"
import PixiJsGraphics from "@/ui/pages/Graphics/PixiJS"
import Home from "@/ui/pages/Home"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import type { JSX } from "react"
import { RouterProvider, createBrowserRouter } from "react-router"
import type { DOMRouterOpts, RouteObject } from "react-router"

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
        element: <PixiJsGraphics />
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

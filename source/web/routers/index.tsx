import Layout from "@/views/layout"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import {
  type DOMRouterOpts,
  type RouteObject,
  RouterProvider,
  createBrowserRouter
} from "react-router"

const RouteOptions: RouteObject[] = [
  {
    path: "/",
    element: <Layout date={new Date()} />,
    children: []
  }
]
const opts: DOMRouterOpts = {}

const Router = createBrowserRouter(RouteOptions, opts)

function AppRouter() {
  return <RouterProvider router={Router} />
}

export default AppRouter

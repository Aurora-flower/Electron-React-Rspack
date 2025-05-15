import { webLog } from "@/utils/log"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import type { JSX } from "react"
import { Outlet } from "react-router"

function Layout(props: { date: Date }): JSX.Element {
  webLog("Layout", "props", props.date)
  return (
    <div className="page">
      <div>{props.date.toLocaleDateString()}</div>
      <Outlet />
    </div>
  )
}

export default Layout

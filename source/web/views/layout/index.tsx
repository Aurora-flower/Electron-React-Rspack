import { webLog } from "@/utils/log"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import { Outlet } from "react-router"

function Layout(props: { date: Date }) {
  webLog("Layout", "props", props)
  return (
    <div>
      <div>{props.date.toLocaleDateString()}</div>
      <Outlet />
    </div>
  )
}

export default Layout

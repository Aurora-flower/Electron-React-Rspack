import { webLog } from "@/utils/log"
import { Button } from "primereact/button"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import { Outlet } from "react-router"

function Layout(props: { date: Date }) {
  webLog("Layout", "props", props)
  return (
    <div>
      <div>{props.date.toLocaleDateString()}</div>
      <Button label="Submit" />
      <Outlet />
    </div>
  )
}

export default Layout

import { webLog } from "@/utils/log"
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import * as React from "react"
import type { JSX } from "react"
import { Outlet } from "react-router"

function LayoutView(props: { date: Date }): JSX.Element {
  webLog("LayoutView", "props", props.date)
  return (
    <div className="layout-view">
      {/* <div
        className="layout-date absolute top-1 left-1"
        style={{ fontFamily: "ChaChicle" }}
      >
        {`Time: ${props.date.toLocaleDateString()}`}
      </div> */}
      <Outlet />
    </div>
  )
}

export default LayoutView

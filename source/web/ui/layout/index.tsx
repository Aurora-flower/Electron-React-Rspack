import { setFontFamily } from "@/features/document/mod/font"
import { webLog } from "@/utils/log"
import * as React from "react"
import type { JSX } from "react"
import { Outlet } from "react-router"

function LayoutView(props: { date: Date }): JSX.Element {
  const dateRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setFontFamily(dateRef.current, "Dotrice Regular")
  }, [])

  webLog("LayoutView", "props", props.date)
  return (
    <div className="layout-view">
      <div ref={dateRef} className="layout-date absolute top-1 left-1">
        <span>Time:</span>
        <span className="select-text">
          {`  ${props.date.toLocaleDateString()}`}
        </span>
      </div>
      <Outlet />
    </div>
  )
}

export default LayoutView

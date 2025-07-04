import { backHistory } from "@/features/window/history"

import { Button } from "primereact/button"
import * as React from "react"
import type { JSX } from "react"
import { Outlet, useNavigate } from "react-router-dom"

function GraphicsPage(): JSX.Element {
  const _navigate = useNavigate()
  const containerRef = React.useRef<HTMLDivElement>(null)

  function handleClick(): void {
    // navigate("/")
    backHistory()
    // navigate(-1)
  }

  return (
    <div className="grphics page-base">
      <div className="absolute top-6 right-6 opacity-80">
        <Button size="small" label="返回" onClick={handleClick} />
      </div>
      <div ref={containerRef} id="graphics-container" className="w-full h-full">
        <Outlet />
      </div>
    </div>
  )
}

export default GraphicsPage

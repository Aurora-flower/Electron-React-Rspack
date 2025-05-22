import { debugPixiRender } from "@/debug"
import PixiManager from "@/helpers/render/gremlin/manager"
import { webLog } from "@/utils/log"
import type { Application } from "pixi.js"
import * as React from "react"
import type { JSX } from "react"

function GraphicsPage(): JSX.Element {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [getApp, setApp] = React.useState<Application>()

  React.useEffect(() => {
    if (!getApp) {
      PixiManager.init(containerRef.current!).then((app: Application) => {
        setApp(app)
        PixiManager.initCanvas(app)
        debugPixiRender()
        webLog("GraphicsPage", "DrowIo", getApp)
      })
    }
    return (): void => {
      PixiManager.destroy()
    }
  }, [getApp])

  return (
    <div className="grphics page-base">
      <div ref={containerRef} id="graphics" />
    </div>
  )
}

export default GraphicsPage

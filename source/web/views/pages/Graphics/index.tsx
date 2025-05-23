import { debugPixiRender } from "@/debug"
import PixiManager from "@/helpers/render/gremlin/manager"
import { webLog } from "@/utils/log"
import type { Application } from "pixi.js"
import { useEffect, useRef, useState } from "react"
import type { JSX } from "react"

function GraphicsPage(): JSX.Element {
  const [getTip] = useState<string>(
    "使用鼠标右键平移视窗焦点，使用滚轮缩放视图"
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const [getApp, setApp] = useState<Application>()

  useEffect(() => {
    if (!getApp) {
      PixiManager.init(containerRef.current!).then((app: Application) => {
        setApp(app)
        PixiManager.initCanvas(app)
        debugPixiRender()
        webLog("GraphicsPage", "DrowIo", getApp)
      })
    }
    return (): void => {
      PixiManager.stageClear()
    }
  }, [getApp])

  return (
    <div className="grphics page-base">
      <div className="absolute top-6 left-6 opacity-80">{getTip}</div>
      <div ref={containerRef} id="graphics" />
    </div>
  )
}

export default GraphicsPage

import PixiManager from "@/helpers/render/gremlin"
import {
  destroyWindowResizeListener,
  enableWindowResizeListener
} from "@/utils/manager/event/windowListnerCollect"
import type { Application } from "pixi.js"
import * as React from "react"
import type { JSX } from "react"

function GraphicsPage(): JSX.Element {
  const [getTip] = React.useState<string>(
    "使用鼠标右键平移视窗焦点，使用滚轮缩放视图"
  )
  const containerRef = React.useRef<HTMLDivElement>(null)
  const appRef = React.useRef<Application>(null)

  const redraw = React.useCallback((): void => {
    PixiManager.initCanvas()
  }, [])

  React.useEffect(() => {
    document.title = "测试 - 图形渲染"
    PixiManager.initialize(containerRef.current!).then((app: Application) => {
      appRef.current = app
    })
    enableWindowResizeListener(redraw)
    return (): void => {
      destroyWindowResizeListener(redraw)
    }
  }, [redraw])

  return (
    <div className="grphics page-base">
      <div className="tip absolute top-6 left-6 opacity-80">{getTip}</div>
      {/* <div className="absolute top-6 right-6 opacity-80">
        SCALE:
      </div> */}
      <div ref={containerRef} id="graphics" className="w-full h-full" />
    </div>
  )
}

export default GraphicsPage

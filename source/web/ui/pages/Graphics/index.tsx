import { debugPixiRender } from "@/debug"
import PixiManager from "@/helpers/render/gremlin"
import { webLog } from "@/utils/log"
import {
  destoryWindowResizeListener,
  enableWindowResizeListener
} from "@/utils/manager/event/windowListnerCollect"
import type { Application } from "pixi.js"
import { Button } from "primereact/button"
import * as React from "react"
import type { JSX } from "react"

function GraphicsPage(): JSX.Element {
  const [getTip] = React.useState<string>(
    "使用鼠标右键平移视窗焦点，使用滚轮缩放视图"
  )
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [, setApp] = React.useState<Application>()

  const redraw = React.useCallback((): void => {
    // TODO: 添加一个函数，用于在窗口大小改变时重新渲染画布
    PixiManager.initCanvas()

    /* 测试渲染 */
    debugPixiRender()
  }, [])

  const setGraphics = React.useCallback((name: string): void => {
    // TODO: 切换画布的逻辑
    webLog("Graphics", "setGraphics", name)
  }, [])

  enableWindowResizeListener(redraw)

  React.useEffect(() => {
    PixiManager.initialize(containerRef.current!).then((app: Application) => {
      setApp(app)
      redraw()
    })
    return (): void => {
      PixiManager.stageClear()
      destoryWindowResizeListener(redraw)
    }
  }, [redraw])

  return (
    <div className="grphics page-base">
      <div className="tip absolute top-6 left-6 opacity-80">{getTip}</div>
      {/* <div className="absolute top-6 right-6 opacity-80">
        SCALE:
      </div> */}
      <div className="absolute top-6 right-6 ">
        <Button label="ThreeJS" onClick={() => setGraphics("three")} />
        <Button label="PixiJS" onClick={() => setGraphics("pixi")} />
      </div>
      <div ref={containerRef} id="graphics" className="w-full h-full" />
    </div>
  )
}

export default GraphicsPage

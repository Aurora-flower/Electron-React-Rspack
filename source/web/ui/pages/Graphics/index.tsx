import { debugPixiRender } from "@/debug"
import PixiManager from "@/helpers/render/gremlin"
import {
  destoryWindowResizeListener,
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
  const [, setApp] = React.useState<Application>()

  const callback =
    //  CommonUtility.throttle(
    (): void => {
      // TODO: 添加一个函数，用于在窗口大小改变时重新渲染画布
      PixiManager.stageClear()
      PixiManager.initCanvas()

      /* 测试渲染 */
      debugPixiRender()
    }
  // )

  const redraw = React.useCallback(callback, [])

  enableWindowResizeListener(redraw)

  React.useEffect(() => {
    PixiManager.init(containerRef.current!).then((app: Application) => {
      setApp(app)
      PixiManager.initCanvas(app)
      debugPixiRender()
    })
    return (): void => {
      PixiManager.stageClear()
      destoryWindowResizeListener(redraw)
    }
  }, [redraw])

  return (
    <div className="grphics page-base">
      <div className="absolute top-6 left-6 opacity-80">{getTip}</div>
      <div ref={containerRef} id="graphics" className="w-full h-full" />
    </div>
  )
}

export default GraphicsPage

import { debugPixiRender } from "@/debug"
import PixiManager from "@/helpers/render/gremlin/manager"
import type { Application } from "pixi.js"
import * as React from "react"
import type { JSX } from "react"

function GraphicsPage(): JSX.Element {
  const [getTip] = React.useState<string>(
    "使用鼠标右键平移视窗焦点，使用滚轮缩放视图"
  )
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [, setApp] = React.useState<Application>()

  React.useEffect(() => {
    PixiManager.init(containerRef.current!).then((app: Application) => {
      setApp(app)
      PixiManager.initCanvas(app)
      debugPixiRender()
    })
    return (): void => {
      PixiManager.stageClear()
    }
  }, [])

  return (
    <div className="grphics page-base">
      <div className="absolute top-6 left-6 opacity-80">{getTip}</div>
      <div ref={containerRef} id="graphics" />
    </div>
  )
}

export default GraphicsPage

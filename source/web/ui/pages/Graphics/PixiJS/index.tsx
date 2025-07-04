// import PixiManager from "@/helpers/graphics/gremlin"
// import type { Application } from "pixi.js"
import * as React from "react"
import type { JSX } from "react"

function PixiJsGraphics(): JSX.Element {
  const [getTip] = React.useState<string>(
    "使用鼠标右键平移视窗焦点，使用滚轮缩放视图"
  )
  // const appRef = React.useRef<Application>(null)

  const renderBoxRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    document.title = "测试 - 图形渲染"
    // PixiManager.initialize(renderBoxRef.current!).then((app: Application) => {
    //   appRef.current = app
    // })
    return (): void => {}
  }, [])

  return (
    <div className="w-full h-full !bg-gray-500">
      <div className="tip absolute top-6 left-6 opacity-80">{getTip}</div>
      <div ref={renderBoxRef} id="graphics" />
    </div>
  )
}

export default PixiJsGraphics

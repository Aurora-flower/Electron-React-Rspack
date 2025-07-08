import type { Application } from "pixi.js"
import type { JSX } from "react"
import * as React from "react"
import PixiManager from "@/helpers/graphics/gremlin"

function PixiJsGraphics(): JSX.Element {
  const [getTip] = React.useState<string>(
    "使用鼠标右键平移视窗焦点，使用滚轮缩放视图"
  )
  const appRef = React.useRef<Application>(null)
  const renderBoxRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    PixiManager.initialize(renderBoxRef.current!).then((app: Application) => {
      appRef.current = app
    })
    return (): void => {
      // const plugins = Application._plugins.slice(0).reverse()
      // for (const plugin of plugins) {
      //   console.log(plugin)
      // }
      appRef.current?.destroy(
        {
          removeView: true
        },
        {
          children: true,
          texture: true,
          textureSource: true,
          context: true
        }
      )
      appRef.current = null
    }
  }, [])

  return (
    <div className="w-full h-full">
      <div className="tip absolute top-6 left-6 opacity-80">{getTip}</div>
      <div ref={renderBoxRef} className="w-full h-full" id="graphics" />
    </div>
  )
}

export default PixiJsGraphics

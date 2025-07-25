import type { Application } from "pixi.js"
import type { JSX } from "react"
import * as React from "react"
import Gremlin from "@/helpers/graphics/gremlin"
import { DEFAULT_DESTROY_OPTIONS } from "@/helpers/graphics/gremlin/options/destroyOptions"

function PixiJsGraphics(): JSX.Element {
  const appRef = React.useRef<Application>(null)
  const renderBoxRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    Gremlin.initialize(renderBoxRef.current!).then((app: Application) => {
      appRef.current = app
    })
    return (): void => {
      // const plugins = Application._plugins.slice(0).reverse()
      // for (const plugin of plugins) {
      // }
      appRef.current?.destroy(
        {
          removeView: true
        },
        DEFAULT_DESTROY_OPTIONS
      )
      appRef.current = null
      Gremlin.destroy()
    }
  }, [])

  return (
    <div className="w-full h-full">
      {/* <div className="btns w-full h-6 bg-red-200 opacity-80"> */}
      {/* TODO: 按钮区域 - 放置按钮 */}
      {/* </div> */}
      <div ref={renderBoxRef} className="w-full h-full" id="graphics" />
    </div>
  )
}

export default PixiJsGraphics

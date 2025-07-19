import type { DestroyOptions } from "pixi.js"
import { Container, Graphics } from "pixi.js"
import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"

class Controller {
  private static _controller: Container
  private static _block: Graphics
  private static _xAxis: Graphics
  private static _yAxis: Graphics

  static init(parent: Container): void {
    Controller.reCreate()
    Controller._controller.addChild(
      Controller._block,
      Controller._xAxis,
      Controller._yAxis
    )
    requestAnimationFrame(() => {
      if (!parent.children.includes(Controller._controller)) {
        viewAppend(parent, Controller._controller)
      }
    })
  }

  static reCreate(): void {
    Controller._block = new Graphics()
    Controller._xAxis = new Graphics()
    Controller._yAxis = new Graphics()
    Controller._controller = new Container()
  }

  static release(
    isClean = false,
    configuration?: DestroyOptions /*DEFAULT_DESTORY_OPTIONS */
  ): void {
    if (isClean) {
      Controller._controller.destroy(configuration)
    } else {
      Controller._xAxis.clear()
      Controller._yAxis.clear()
      Controller._block.clear()
    }
  }

  static destory(): void {
    Controller.release(true)
    Controller.reCreate()
  }
}

export default Controller

import {
  DEFAULT_COLOR,
  DEFAULT_GRID_INTERVAL,
  DEFAULT_RULER_SIZE,
  DEFAULT_SCALE_INTERVAL
} from "@/helpers/graphics/gremlin/constant/defaultValue"
import { viewAppend } from "@/helpers/graphics/gremlin/functions/append"
import { drawLine } from "@/helpers/graphics/gremlin/generator/graphics/drawLine"
import { createText } from "@/helpers/graphics/gremlin/generator/text"
import { getPoint } from "@/utils/functions/usually"
import { Container, Graphics, TextStyle } from "pixi.js"
import type { DestroyOptions } from "pixi.js"

type RulerType = "top" | "left"

type DrawScaleHander = (val: number, point: PointModel, flag: RulerType) => void

const DEFAULT_RULER_SCALE_FONT_SIZE = 10
const DEFAULT_RULER_COLOR = 0x292929
const DEFAULT_MARK_COLOR = 0xf09b40
const DEFAULT_MARK_COLOR_MINOR = 0xa5cd50

class Ruler {
  // private static _instance: Ruler
  private static _topRuler: Graphics
  private static _leftRuler: Graphics
  private static _rulerContainer: Container

  // public static getInstance(): Ruler {
  //   if (!Ruler._instance) {
  //     Ruler._instance = new Ruler()
  //   }
  //   return Ruler._instance
  // }

  static draw(
    parent: Container,
    size: SizeModel,
    scale = 1,
    girdInterval?: PointModel
  ): void {
    const renderInterval = girdInterval ?? {
      x: DEFAULT_GRID_INTERVAL,
      y: DEFAULT_GRID_INTERVAL
    }
    // setStrokeStyle
    Ruler._rulerContainer = new Container()
    Ruler._topRuler = new Graphics()
      .rect(0, 0.1, size.width, DEFAULT_RULER_SIZE)
      .fill(DEFAULT_RULER_COLOR)
    Ruler._leftRuler = new Graphics()
      .rect(0.1, 0, DEFAULT_RULER_SIZE, size.height)
      .fill(DEFAULT_RULER_COLOR)
    Ruler._rulerContainer.addChild(Ruler._topRuler, Ruler._leftRuler)
    Ruler.rulerLogic(
      size,
      getPoint(renderInterval.x * scale, renderInterval.y * scale)
    )
    requestAnimationFrame(() => {
      if (!parent.children.includes(Ruler._rulerContainer)) {
        viewAppend(parent, [Ruler._rulerContainer])
      }
    })
  }

  static release(
    isClean = false,
    configuration?: DestroyOptions /*DEFAULT_DESTORY_OPTIONS */
  ): void {
    if (isClean) {
      Ruler._rulerContainer.destroy(configuration)
    } else {
      Ruler._rulerContainer.removeChildren()
    }
    Ruler._rulerContainer.addChild(Ruler._topRuler, Ruler._leftRuler)
  }

  private static drawRulerValue(
    num: number,
    point: PointModel,
    flag: RulerType
  ): void {
    // const value = formatNumberPrecision(num, 0)
    const value = num
    const style = new TextStyle({
      fontSize: DEFAULT_RULER_SCALE_FONT_SIZE,
      fill: DEFAULT_COLOR
    })

    const position = {
      x: point.x,
      y: point.y
    }

    if (flag === "left") {
      position.x = point.x + 5
    } else if (flag === "top") {
      position.y = point.y + 5
    }

    createText(Ruler._rulerContainer, {
      position,
      text: value.toString(),
      angle: flag === "left" ? -90 : 0,
      anchor: {
        x: 0.5,
        y: 0.5
      },
      style,
      alpha: 0.5
    })
  }

  private static rulerLogic(
    size: SizeModel,
    rulerInterval: PointModel,
    scaleInterval: number = DEFAULT_SCALE_INTERVAL,
    step: number = DEFAULT_GRID_INTERVAL,
    drawScaleValue: DrawScaleHander = Ruler.drawRulerValue.bind(Ruler)
  ): void {
    const rulerStep = step * scaleInterval
    const getScaleLength = (isMajor: boolean): number => {
      return isMajor ? 12 : 6
    }
    const getScaleColor = (isMajor: boolean): string | number => {
      return isMajor ? DEFAULT_MARK_COLOR : DEFAULT_MARK_COLOR_MINOR
    }
    const getScaleAlpha = (isMajor: boolean): number => {
      return isMajor ? 0.8 : 0.4
    }
    let countX = 0
    const start = DEFAULT_RULER_SIZE
    for (let x = start; x <= size.width; x += rulerInterval.x) {
      const isMajor = (x - start) % (rulerInterval.x * scaleInterval) === 0
      const scaleLength = getScaleLength(isMajor)
      const startPoint: PointArray = [x, 0]
      const endPoint: PointArray = [x, scaleLength]
      drawLine([startPoint, endPoint], Ruler._topRuler, {
        color: getScaleColor(isMajor),
        alpha: getScaleAlpha(isMajor)
      })
      if (isMajor) {
        const textPoint = {
          x: x,
          y: scaleLength
        }
        drawScaleValue(countX * rulerStep, textPoint, "top")
        countX++
      }
    }

    let countY = 1
    for (let y = start; y <= size.height; y += rulerInterval.y) {
      const isMajor = (y - start) % (rulerInterval.x * scaleInterval) === 0
      const scaleLength = getScaleLength(isMajor)
      // const alpha = getScaleAlpha(isMajor)
      const startPoint: PointArray = [0, y]
      const endPoint: PointArray = [scaleLength, y]
      drawLine([startPoint, endPoint], Ruler._leftRuler, {
        color: getScaleColor(isMajor),
        alpha: getScaleAlpha(isMajor)
      })
      if (isMajor && y !== start) {
        const textPoint = {
          x: scaleLength,
          y: y
        }
        drawScaleValue(countY * rulerStep, textPoint, "left")
        countY++
      }
    }
  }
}

export default Ruler

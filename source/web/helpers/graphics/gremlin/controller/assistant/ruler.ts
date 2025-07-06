import {
  DEFAULT_COLOR,
  DEFAULT_GRID_INTERVAL,
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

const DEFAULT_RULER_SIZE = 20
const DEFAULT_RULER_SCALE_FONT_SIZE = 10
const DEFAULT_RULER_COLOR = 0x292929

class Ruler {
  private static _instance: Ruler
  private _topRuler: Graphics = new Graphics()
  private _leftRuler: Graphics = new Graphics()
  private _rulerContainer: Container = new Container()

  public static getInstance(): Ruler {
    if (!Ruler._instance) {
      Ruler._instance = new Ruler()
    }
    return Ruler._instance
  }

  constructor() {
    this._rulerContainer.addChild(this._topRuler, this._leftRuler)
  }

  draw(
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
    this._topRuler
      .rect(0, 0.1, size.width, DEFAULT_RULER_SIZE)
      .fill(DEFAULT_RULER_COLOR)
    this._leftRuler
      .rect(0.1, 0, DEFAULT_RULER_SIZE, size.height)
      .fill(DEFAULT_RULER_COLOR)
    this.rulerLogic(
      size,
      getPoint(renderInterval.x * scale, renderInterval.y * scale)
    )
    requestAnimationFrame(() => {
      if (!parent.children.includes(this._rulerContainer)) {
        viewAppend(parent, [this._rulerContainer])
      }
    })
  }

  release(
    isClean = false,
    configuration?: DestroyOptions /*DEFAULT_DESTORY_OPTIONS */
  ): void {
    if (isClean) {
      this._rulerContainer.destroy(configuration)
      this._rulerContainer = new Container()
    } else {
      this._rulerContainer.removeChildren()
    }
    this._topRuler = new Graphics()
    this._leftRuler = new Graphics()
    this._rulerContainer.addChild(this._topRuler, this._leftRuler)
  }

  private drawRulerValue(
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
    createText(this._rulerContainer, {
      position: {
        x: point.x + 5,
        y: point.y + 5
      },
      text: value.toString(),
      angle: flag === "left" ? -90 : 0,
      anchor: {
        x: 0.5,
        y: 0.5
      },
      style
    })
  }

  private rulerLogic(
    size: SizeModel,
    rulerInterval: PointModel,
    scaleInterval: number = DEFAULT_SCALE_INTERVAL,
    step: number = DEFAULT_GRID_INTERVAL,
    drawScaleValue: DrawScaleHander = this.drawRulerValue.bind(this)
  ): void {
    const rulerStep = step * scaleInterval
    const getScaleLength = (isMajor: boolean): number => {
      return isMajor ? 12 : 6
    }
    // const getScaleAlpha = (isMajor: boolean): number => {
    //   return isMajor ? 0.8 : 0.4
    // }
    let countX = 1
    for (let x = 0; x <= size.width; x += rulerInterval.x) {
      const isMajor = x % (rulerInterval.x * scaleInterval) === 0
      const scaleLength = getScaleLength(isMajor)
      // const alpha = getScaleAlpha(isMajor)
      const startPoint: PointArray = [x, 0]
      const endPoint: PointArray = [x, scaleLength]
      drawLine([startPoint, endPoint], this._topRuler)
      if (isMajor && x !== 0) {
        const textPoint = {
          x: x,
          y: scaleLength
        }
        drawScaleValue(countX * rulerStep, textPoint, "top")
        countX++
      }
    }

    let countY = 1
    for (let y = 0; y <= size.height; y += rulerInterval.y) {
      const isMajor = y % (rulerInterval.x * scaleInterval) === 0
      const scaleLength = getScaleLength(isMajor)
      // const alpha = getScaleAlpha(isMajor)
      const startPoint: PointArray = [0, y]
      const endPoint: PointArray = [scaleLength, y]
      drawLine([startPoint, endPoint], this._leftRuler)
      if (isMajor && y !== 0 && drawScaleValue) {
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

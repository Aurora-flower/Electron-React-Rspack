import { DEFAULT_GRID_INTERVAL } from "@/helpers/render/gremlin"
import { createContainer } from "@/helpers/render/gremlin/generator/container"
import { createText } from "@/helpers/render/gremlin/generator/text"
import type { ContainerParent } from "@/helpers/render/gremlin/interface"
import { formatNumberPrecision } from "@/utils/functions/math"
import { getMovePoint, getSize } from "@/utils/functions/usually"
import { Container, Graphics, TextStyle } from "pixi.js"
import type { StrokeInput } from "pixi.js"

type DrawLineHander = (
  linePoint: LinePointModel,
  flag: RulerType,
  alpha?: number
) => void

type DrawScaleHander = (val: number, point: PointModel, flag: RulerType) => void

type RulerType = "top" | "left"

const DEFAULT_RULER_COLOR = 0x292929
const DEFAULT_SCALE_INTERVAL = 10
const DEFAULT_MARK_COLOR = 0xffffff
export const DEFAULT_RULER_SIZE = 20

class Ruler {
  private _parent: ContainerParent = undefined
  private _size: SizeModel = getSize()
  private _rulerInterval: PointModel = {
    x: DEFAULT_GRID_INTERVAL,
    y: DEFAULT_GRID_INTERVAL
  }
  private _zoom = 1
  private _scaleInterval = DEFAULT_SCALE_INTERVAL // Major scale interval
  private _strokeInput: StrokeInput = {
    width: 1,
    color: DEFAULT_MARK_COLOR,
    alpha: 0.3
  }
  private _topRuler: Graphics = new Graphics()
  private _leftRuler: Graphics = new Graphics()
  private _rulerContainer: Container = new Container()

  setRulerInterval(zoom: number): void {
    this._zoom = zoom
    const value = formatNumberPrecision(DEFAULT_GRID_INTERVAL * zoom, 0)
    this._rulerInterval = {
      x: value,
      y: value
    }
    // this._scaleInterval = DEFAULT_SCALE_INTERVAL * zoom
  }

  constructor(parent: Container, size?: SizeModel, storeStyle?: StrokeInput) {
    this._parent = parent
    if (size) {
      this._size = size
    }
    if (storeStyle) {
      this._strokeInput = storeStyle
    }
  }

  draw(scale = this._zoom): void {
    this.clear()
    this.setRulerInterval(scale)
    this.drawRulerView()
    this.logic(this._size, this._rulerInterval, this._scaleInterval)
    if (this._parent) {
      this._parent.addChild(this?._rulerContainer)
    }
  }

  private drawRulerView(): void {
    this._topRuler
      .rect(0, 0.1, this._size.width, DEFAULT_RULER_SIZE)
      .fill(DEFAULT_RULER_COLOR)
      .setStrokeStyle(this._strokeInput)
    this._leftRuler
      .rect(0.1, 0, DEFAULT_RULER_SIZE, this._size.height)
      .fill(DEFAULT_RULER_COLOR)
    this._rulerContainer
      .addChild(this._topRuler, this._leftRuler)
      .setStrokeStyle(this._strokeInput)
  }

  private getScaleLength(isMajor: boolean): number {
    return isMajor ? 12 : 6
  }

  private getScaleAlpha(isMajor: boolean): number {
    return isMajor ? 0.8 : 0.4
  }

  private logic(
    size: SizeModel,
    rulerInterval: PointModel,
    scaleInterval: number,
    drawScaleLine: DrawLineHander = this.drawRulerLine.bind(this),
    drawScaleValue: DrawScaleHander = this.drawRulerValue.bind(this)
  ): void {
    let countX = 1
    const rulerStep = DEFAULT_GRID_INTERVAL * DEFAULT_SCALE_INTERVAL
    for (let x = 0; x <= size.width; x += rulerInterval.x) {
      const isMajor = x % (rulerInterval.x * scaleInterval) === 0
      const scaleLength = this.getScaleLength(isMajor)
      if (drawScaleLine) {
        const alpha = this.getScaleAlpha(isMajor)
        const linePoint = getMovePoint({ x, y: 0 }, { x, y: scaleLength })
        drawScaleLine(linePoint, "top", alpha)
      }
      if (isMajor && x !== 0 && drawScaleValue) {
        const textPoint = {
          x: x + 2,
          y: scaleLength + 2
        }
        drawScaleValue(countX * rulerStep, textPoint, "top")
        countX++
      }
    }
    let countY = 1
    for (let y = 0; y <= size.height; y += rulerInterval.y) {
      const isMajor = y % (rulerInterval.x * scaleInterval) === 0
      const scaleLength = this.getScaleLength(isMajor)
      if (drawScaleLine) {
        const alpha = this.getScaleAlpha(isMajor)
        const linePoint = getMovePoint({ x: 0, y }, { x: scaleLength, y })
        drawScaleLine(linePoint, "left", alpha)
      }
      if (isMajor && y !== 0 && drawScaleValue) {
        const textPoint = {
          x: scaleLength + 2,
          y: y + 2
        }
        drawScaleValue(countY * rulerStep, textPoint, "left")
        countY++
      }
    }
  }

  private drawRulerLine(
    linePoint: LinePointModel,
    flag: RulerType,
    alpha?: number
  ): void {
    const isTopRuler = flag === "top"
    const ruler = isTopRuler ? this._topRuler : this._leftRuler
    ruler.setStrokeStyle({
      alpha: alpha ?? 0.5
    })
    if (isTopRuler) {
      linePoint.from.x += DEFAULT_RULER_SIZE
      linePoint.to.x += DEFAULT_RULER_SIZE
    } else {
      linePoint.from.y += DEFAULT_RULER_SIZE
      linePoint.to.y += DEFAULT_RULER_SIZE
    }
    ruler
      .moveTo(linePoint.from.x, linePoint.from.y)
      .lineTo(linePoint.to.x, linePoint.to.y)
      .stroke()
  }

  private drawRulerValue(
    num: number,
    point: PointModel,
    flag: RulerType
  ): void {
    const value = formatNumberPrecision(num, 0)
    const style = new TextStyle({
      fontSize: 10,
      fill: DEFAULT_MARK_COLOR
    })

    const container = createContainer(this._rulerContainer, {
      position: {
        x: point.x,
        y: point.y
      }
    })
    createText(container, {
      text: value.toString(),
      angle: flag === "left" ? -90 : 0,
      anchor: {
        x: 0.5,
        y: 0.5
      },
      style
    })
    // const size = text.getSize()
    // const graphic = createGraphics(
    //   container,
    //   {
    //     angle: flag === "left" ? -90 : 0
    //   },
    //   {},
    //   true
    // )
    // graphic.rect(0, 0, size.width, size.height)
    // graphic.stroke({
    //   color: 0xda63a1,
    //   width: 1
    // })
    // graphic.pivot.set(size.width * text.anchor.x, size.height * text.anchor.y)
  }

  clear(): void {
    this._rulerContainer.removeChildren()
  }

  destroy(): void {
    this._rulerContainer.destroy({
      children: true
    })
  }
}

export default Ruler

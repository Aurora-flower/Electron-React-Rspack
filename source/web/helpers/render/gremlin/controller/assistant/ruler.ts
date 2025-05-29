import { getMovePoint, getSize } from "@/common/frequently-used/usually"
import type { ContainerParent } from "@/helpers/render/gremlin/interface"
import { formatNumberPrecision } from "@/utils/modules/digits"
import { Container, Graphics, Text, TextStyle } from "pixi.js"
import type { StrokeInput } from "pixi.js"

type DrawLineHander = (
  linePoint: LinePointModel,
  flag: RulerType,
  alpha?: number
) => void

type DrawScaleHander = (val: number, point: PointModel, flag: RulerType) => void

type RulerType = "top" | "left"

const DEFAULT_RULER_INTERVAL = 10
const DEFAULT_SCALE_INTERVAL = 50

class Ruler {
  private _parent: ContainerParent = undefined
  private _size: SizeModel = getSize()
  private _rulerSize = 20
  private _rulerColor = 0x292929
  private _markColor = 0xffffff
  private _rulerInterval: PointModel = {
    x: DEFAULT_RULER_INTERVAL,
    y: DEFAULT_RULER_INTERVAL
  }
  private _zoom = 1
  private _scaleInterval = DEFAULT_SCALE_INTERVAL
  private _strokeInput: StrokeInput = {
    width: 1,
    color: this._markColor,
    alpha: 0.3
  }
  // private _canvasScale: PointModel = {
  //   x: 1,
  //   y: 1
  // }
  private _topRuler: Graphics = new Graphics()
  private _leftRuler: Graphics = new Graphics()
  private _rulerContainer: Container = new Container()

  setRulerInterval(zoom: number): void {
    this._zoom = zoom
    const value = formatNumberPrecision(DEFAULT_RULER_INTERVAL * zoom, 0)
    this._rulerInterval = {
      x: value,
      y: value
    }
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

  draw(): void {
    this.drawRulerView()
    this.logic(this._size, this._rulerInterval)
    if (this._parent) {
      this._parent.addChild(this?._rulerContainer)
    }
  }

  private drawRulerView(): void {
    this._topRuler
      .rect(0, 0.1, this._size.width, this._rulerSize)
      .fill(this._rulerColor)
      .setStrokeStyle(this._strokeInput)
    this._leftRuler
      .rect(0.1, 0, this._rulerSize, this._size.height)
      .fill(this._rulerColor)
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
    drawScaleLine: DrawLineHander = this.drawRulerLine.bind(this),
    drawScaleValue: DrawScaleHander = this.drawRulerValue.bind(this)
  ): void {
    for (let x = 0; x <= size.width; x += rulerInterval.x) {
      const isMajor = x % (rulerInterval.x * this._scaleInterval) === 0
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
        drawScaleValue(x, textPoint, "top")
      }
    }
    for (let y = 0; y <= size.height; y += rulerInterval.y) {
      const isMajor = y % (this._rulerInterval.y * this._scaleInterval) === 0
      const scaleLength = this.getScaleLength(isMajor)
      if (drawScaleLine) {
        const alpha = this.getScaleAlpha(isMajor)
        const linePoint = getMovePoint({ x: 0, y }, { x: scaleLength, y })
        drawScaleLine(linePoint, "left", alpha)
      }
      if (isMajor && y !== 0 && drawScaleValue) {
        const textPoint = {
          x: scaleLength + 2,
          y: y - 2
        }
        drawScaleValue(y, textPoint, "left")
      }
    }
  }

  private drawRulerLine(
    linePoint: LinePointModel,
    flag: RulerType,
    alpha?: number
  ): void {
    const ruler = flag === "top" ? this._topRuler : this._leftRuler
    ruler.setStrokeStyle({
      alpha: alpha ?? 0.5
    })
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
    const value = formatNumberPrecision(num / this._zoom, 0)
    const style = new TextStyle({
      fontSize: 10,
      fill: this._markColor
    })
    const text = new Text({
      text: value.toString(),
      style
    })
    if (flag === "left") {
      text.angle = -90
    }
    text.position.set(point.x, point.y)
    this._rulerContainer.addChild(text)
  }
}

export default Ruler

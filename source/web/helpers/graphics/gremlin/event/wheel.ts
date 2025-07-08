import type { Container, FederatedWheelEvent } from "pixi.js"
import { CURSOR } from "@/common/cursor"
import PixiManager from "@/helpers/graphics/gremlin"
import { formatNumberPrecision } from "@/utils/functions/math"
import CommonUtility from "@/utils/utility"

const ZOOM_SPEED = 0.05
// const SCALE_RATIO = 0.1;

export function addStageWheel(stage: Container): void {
  const wheelHandler = CommonUtility.throttle((ev): void => {
    const e = ev as FederatedWheelEvent
    // requestAnimationFrame(() => {
    e.preventDefault()
    e.stopPropagation()
    stage.cursor = e.deltaY > 0 ? CURSOR.Out : CURSOR.In
    const delta = e.deltaY
    const canvasScale = PixiManager.viewScale
    const zoomFactor = formatNumberPrecision(
      delta > 0 ? canvasScale - ZOOM_SPEED : canvasScale + ZOOM_SPEED
    )
    PixiManager.setDrawingBoardScale(zoomFactor)
    // })
    // const mousePosition = e.global.clone() // 获取鼠标在画布上的位置（缩放中心点）
    // PixiManager.setZoom(zoomFactor, mousePosition)
  }, 300)
  stage.on("wheel", wheelHandler)
}

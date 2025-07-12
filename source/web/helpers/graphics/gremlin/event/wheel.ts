import type { Container, FederatedWheelEvent } from "pixi.js"
// import { CURSOR } from "@/common/cursor"
import PixiManager from "@/helpers/graphics/gremlin"
// import { ELEMENT_FLAG } from "@/helpers/graphics/gremlin/constant/elementFlag"
// import { getElementByLabel } from "@/helpers/graphics/gremlin/functions/filter"
import { formatNumberPrecision } from "@/utils/functions/math"

// import CommonUtility from "@/utils/utility"

const ZOOM_SPEED = 0.05
// const SCALE_RATIO = 0.1;

export function addStageWheel(stage: Container): void {
  // const board = getElementByLabel(ELEMENT_FLAG.Board, stage)

  const wheelHandler =
    // CommonUtility.throttle((ev): void => {
    // const e = ev as FederatedWheelEvent
    (e: FederatedWheelEvent): void => {
      e.preventDefault()
      e.stopPropagation()
      // stage.cursor = e.deltaY > 0 ? CURSOR.Out : CURSOR.In
      const delta = e.deltaY
      const canvasScale = PixiManager.viewScale
      const zoomFactor = formatNumberPrecision(
        delta > 0 ? canvasScale - ZOOM_SPEED : canvasScale + ZOOM_SPEED
      )
      // TODO: 以鼠标为中心缩放
      // const mousePosition = e.global.clone() // 获取鼠标在画布上的位置（缩放中心点）
      PixiManager.setDrawingBoardScale(zoomFactor)
    }
  // }, 300)
  stage.on("wheel", wheelHandler)
}

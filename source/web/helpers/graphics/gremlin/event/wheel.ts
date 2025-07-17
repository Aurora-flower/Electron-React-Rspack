import type { Container, FederatedWheelEvent } from "pixi.js"
import PixiManager from "@/helpers/graphics/gremlin"
// import { ELEMENT_FLAG } from "@/helpers/graphics/gremlin/constant/elementFlag"
// import { getElementByLabel } from "@/helpers/graphics/gremlin/functions/filter"
import { roundToDecimal } from "@/utils/functions/math"

const ZOOM_SPEED = 0.05
// const SCALE_RATIO = 0.1;

export function addStageWheel(stage: Container): void {
  const wheelHandler =
    // CommonUtility.throttle((ev): void => {
    // const e = ev as FederatedWheelEvent
    (e: FederatedWheelEvent): void => {
      e.preventDefault()
      e.stopPropagation()
      // stage.cursor = e.deltaY > 0 ? CURSOR.Out : CURSOR.In
      const delta = e.deltaY
      const canvasScale = PixiManager.viewScale
      const scale = roundToDecimal(
        delta > 0 ? canvasScale - ZOOM_SPEED : canvasScale + ZOOM_SPEED
      )
      // TODO: 以鼠标为中心缩放
      // if (PixiManager.isVaildScale(scale)) {
      //   const zoomFactor = roundToDecimal(PixiManager.viewScale - scale, 2)
      //   const root = getElementByLabel(ELEMENT_FLAG.Root, stage)
      //   if (root) {
      //     // const mousePosition = e.global.clone() // 获取鼠标在画布上的位置（缩放中心点）
      //     const mouseLocal = e.getLocalPosition(root)
      //     root.position.x += mouseLocal.x * zoomFactor
      //     root.position.y += mouseLocal.y * zoomFactor
      //   }
      // }

      PixiManager.setDrawingBoardScale(scale)
    }
  // }, 300)
  stage.on("wheel", wheelHandler)
}

import type { Container } from "pixi.js"
import PixiManager from "@/helpers/graphics/gremlin"
import { DEFAULT_RULER_SIZE } from "@/helpers/graphics/gremlin/constant/defaultValue"
import { ELEMENT_FLAG } from "@/helpers/graphics/gremlin/constant/elementFlag"
import Grid from "@/helpers/graphics/gremlin/controller/assistant/grid"
import Ruler from "@/helpers/graphics/gremlin/controller/assistant/ruler"
import { getElementByLabel } from "@/helpers/graphics/gremlin/functions/filter"
import { createContainer } from "@/helpers/graphics/gremlin/generator/container"
import {
  createGraphics,
  drawRect
} from "@/helpers/graphics/gremlin/generator/graphics"
import { getSize } from "@/utils/functions/usually"

/**
 * @summary 配置图层，对图层的初始特殊处理
 */
export function setupLayer(stage: Container): void {
  // TODO: 图层与标尺、网格绘制、画板（虚拟）的显示
  const basiskarte = createContainer(stage, {
    label: ELEMENT_FLAG.Karte
  })
  const layerContainer = createContainer(stage, {
    label: ELEMENT_FLAG.Layer
  })
  const staffContainer = createContainer(stage, {
    label: ELEMENT_FLAG.Staff
  })
  initSettingsBasiskarte(basiskarte)
  initSettingsUiLayer(layerContainer)
  initSettingsStaff(staffContainer)
  console.log("初始化", stage)
}

/* ***** ***** ***** ***** 图层初始化操作 （Initialization）***** ***** ***** ***** */

/**
 * @summary 底部图层初始化操作
 */
export function initSettingsBasiskarte(
  basiskarte: Container,
  refresh?: boolean
): void {
  if (!basiskarte) {
    return
  }
  basiskarte.pivot.set(-DEFAULT_RULER_SIZE)
  if (refresh) {
    Grid.release(true)
  }
  const size = getSize(PixiManager.viewSize.width, PixiManager.viewSize.height)
  Grid.draw(basiskarte, size, PixiManager.viewScale)
}

/**
 * @summary 刻度尺图层初始化操作
 */
export function initSettingsStaff(staff: Container, refresh?: boolean): void {
  if (!staff) {
    return
  }
  // TODO: 标尺绘画
  if (refresh) {
    Ruler.release(true)
  }
  const size = getSize(PixiManager.viewSize.width, PixiManager.viewSize.height)
  Ruler.draw(staff, size, PixiManager.viewScale)
}

/**
 * @summary 绘制图层初始化操作
 */
export function initSettingsUiLayer(layer: Container, refresh?: boolean): void {
  if (!layer) {
    return
  }
  if (refresh) {
    layer.removeChildren()
  }
  layer.pivot.set(-DEFAULT_RULER_SIZE)
  // TODO: 画板 + 渲染元素
  let board = getElementByLabel(ELEMENT_FLAG.Board, layer)
  if (!board) {
    board = createContainer(layer, {
      label: ELEMENT_FLAG.Board
    })
  }
  board.scale.set(PixiManager.viewScale)

  // TEST
  const graphic = createGraphics(board)
  drawRect(graphic, { x: 0, y: 0 }, { width: 200, height: 200 })

  const mask = createGraphics(
    board,
    {},
    {
      isNormalAppend: false,
      zIndex: board.children.length
    }
  )
  drawRect(
    mask,
    { x: 100, y: 100 },
    { width: 50, height: 50 },
    {
      isFill: true,
      color: "#ee9a40"
    }
  )

  setTimeout(() => {
    board.removeChild(mask)
  }, 1000)

  setTimeout(() => {
    mask.position.x = 200
    layer.addChild(mask)
  }, 3000)
}

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
import { webLog } from "@/utils/log"

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

  const board = getElementByLabel(ELEMENT_FLAG.Board, stage)
  webLog("setupLayer", "初始化画布样板", stage, board)
}

/* ***** ***** ***** ***** 图层初始化操作 （Initialization）***** ***** ***** ***** */

/**
 * @summary 底部图层初始化操作
 */
export function initSettingsBasiskarte(basiskarte: Container): void {
  if (!basiskarte) {
    return
  }
  basiskarte.pivot.set(-DEFAULT_RULER_SIZE)
  const size = getSize(PixiManager.viewSize.width, PixiManager.viewSize.height)
  Grid.draw(basiskarte, size, PixiManager.viewScale)
}

/**
 * @summary 刻度尺图层初始化操作
 */
export function initSettingsStaff(staff: Container): void {
  if (!staff) {
    return
  }
  const size = getSize(PixiManager.viewSize.width, PixiManager.viewSize.height)
  Ruler.draw(staff, size, PixiManager.viewScale)
}

/**
 * @summary 绘制图层初始化操作
 */
export function initSettingsUiLayer(layer: Container): void {
  if (!layer) {
    return
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
  drawRect(graphic, { x: 100, y: 100 }, { width: 200, height: 200 })
}

/* ***** ***** ***** ***** 图层样板更新 (Update) ***** ***** ***** ***** */

export function updateBasiskarte(_basiskarte: Container): void {
  // TODO: 更新辅助元素 - 网格
}

export function updateStaff(_staff: Container): void {
  // TODO: 更新辅助元素 - 标尺
}

export function updateLayer(_layer: Container): void {
  // TODO: 更新画板缩放
}

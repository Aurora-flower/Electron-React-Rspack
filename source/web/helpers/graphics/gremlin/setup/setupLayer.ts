import PixiManager from "@/helpers/graphics/gremlin"
import { ELEMENT_FLAG } from "@/helpers/graphics/gremlin/constant/elementFlag"
import Grid from "@/helpers/graphics/gremlin/controller/assistant/grid"
import { createContainer } from "@/helpers/graphics/gremlin/generator/container"
import type { Container } from "pixi.js"

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
}

/* ***** ***** ***** ***** 图层初始化操作 （Initialization）***** ***** ***** ***** */

/**
 * @summary 底部图层初始化操作
 */
function initSettingsBasiskarte(basiskarte: Container): void {
  if (!basiskarte) {
    return
  }
  // TODO: 网格绘画
  const grid = Grid.getInstance()
  grid.draw(basiskarte, PixiManager.viewSize)
}

/**
 * @summary 刻度尺图层初始化操作
 */
function initSettingsStaff(staff: Container): void {
  if (!staff) {
    return
  }
  // TODO: 标尺绘画
}

/**
 * @summary 绘制图层初始化操作
 */
function initSettingsUiLayer(layer: Container): void {
  if (!layer) {
    return
  }
  // TODO: 画板 + 渲染元素
}

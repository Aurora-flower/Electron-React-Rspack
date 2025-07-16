import type { Container } from "pixi.js"
import PixiManager from "@/helpers/graphics/gremlin"
import { DEFAULT_RULER_SIZE } from "@/helpers/graphics/gremlin/constant/defaultValue"
import { ELEMENT_FLAG } from "@/helpers/graphics/gremlin/constant/elementFlag"
import Grid from "@/helpers/graphics/gremlin/controller/assistant/grid"
import Ruler from "@/helpers/graphics/gremlin/controller/assistant/ruler"
import Selector from "@/helpers/graphics/gremlin/controller/selector"
import Controller from "@/helpers/graphics/gremlin/controller/selector/controller"
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

  webLog("setupLayer", "初始化画布样板", stage)
}

function getViewSize(): SizeModel {
  return getSize(PixiManager.viewSize.width, PixiManager.viewSize.height)
}

function drawingAssistant(flag: 0 | 1 = 0): void {
  const size = getViewSize()
  if (flag === 0) {
    Grid.draw(size, PixiManager.viewScale)
  } else if (flag === 1) {
    Ruler.draw(size, PixiManager.viewScale)
  }
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
  const size = getViewSize()
  Grid.init(basiskarte, size, PixiManager.viewScale)
}

/**
 * @summary 刻度尺图层初始化操作
 */
export function initSettingsStaff(staff: Container): void {
  if (!staff) {
    return
  }
  const size = getViewSize()
  Ruler.init(staff, size, PixiManager.viewScale)
}

/**
 * @summary 绘制图层初始化操作
 */
export function initSettingsUiLayer(layer: Container): void {
  if (!layer) {
    return
  }
  Selector.init(layer)
  Controller.init(layer)
  layer.pivot.set(-DEFAULT_RULER_SIZE)
  const root = createContainer(layer, {
    label: ELEMENT_FLAG.Root
  })
  root.scale.set(PixiManager.viewScale)

  // TODO: 画板 + 渲染元素
  const virtualCanvas = createContainer(root, {
    label: ELEMENT_FLAG.Board
  })
  const view = createGraphics(virtualCanvas, {
    alpha: 0.2
  })
  drawRect(view, { x: 0, y: 0 }, { width: 1334, height: 750 })

  // TEST
  const parent = createContainer(virtualCanvas, {
    label: "parent"
    // position: {
    //   x: 100,
    //   y: 100
    // },
    // scale: {
    //   x: 0.7,
    //   y: 0.7
    // }
  })
  const graphic1 = createGraphics(parent, {
    label: "child1",
    scale: {
      x: 0.7,
      y: 0.7
    }
  })
  drawRect(
    graphic1,
    { x: 0, y: 0 },
    { width: 100, height: 100 },
    {
      isFill: true,
      color: "#b06bd6"
    }
  )
  const graphic2 = createGraphics(parent, {
    label: "child2",
    position: {
      x: 1334 - 70,
      y: 750 - 70
    },
    scale: {
      x: 0.7,
      y: 0.7
    }
  })
  drawRect(
    graphic2,
    { x: 0, y: 0 },
    { width: 100, height: 100 },
    {
      isFill: true,
      color: "#b06bd6"
    }
  )
}

/* ***** ***** ***** ***** 图层样板更新 (Update) ***** ***** ***** ***** */

export function updateBasiskarte(basiskarte: Container): void {
  // TODO: 更新辅助元素 - 网格
  Grid.release()
  drawingAssistant(0)
  webLog("setupLayer", "updateBasiskarte", basiskarte)
}

export function updateStaff(_staff: Container): void {
  // TODO: 更新辅助元素 - 标尺
  Ruler.release()
  drawingAssistant(1)
}

export function updateLayer(layer: Container): void {
  // TODO: 更新画板缩放
  const root = getElementByLabel(ELEMENT_FLAG.Root, layer)
  if (!root) {
    return
  }
  root.scale.set(PixiManager.viewScale)
  webLog("setupLayer", "updateLayer", PixiManager.viewScale)
}

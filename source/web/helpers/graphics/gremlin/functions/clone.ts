import { PIXI_TARGET_TYPE } from "@/helpers/graphics/gremlin/functions/is"
import { getConsturorName } from "@/utils/functions/prototype"
import type { Container } from "pixi.js"

export function deepClonePixiObject(target: Container): Container {
  const handlers = {
    [PIXI_TARGET_TYPE.Container]: (target: Container): Container => {
      return target
    },
    [PIXI_TARGET_TYPE.Graphics]: (target: Container): Container => {
      return target
    },
    [PIXI_TARGET_TYPE.Text]: (target: Container): Container => {
      return target
    },
    [PIXI_TARGET_TYPE.Sprite]: (target: Container): Container => {
      return target
    },
    [PIXI_TARGET_TYPE.NineSliceSprite]: (target: Container): Container => {
      return target
    }
  }

  return handlers[getConsturorName(target)](target)
}

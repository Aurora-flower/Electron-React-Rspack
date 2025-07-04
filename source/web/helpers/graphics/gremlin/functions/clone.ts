import {
  isContainer,
  isGraphics,
  isHTMLText,
  isNineSliceSprite,
  isSprite,
  isText
} from "@/helpers/graphics/gremlin/functions/is"

export function deepClonePixiObject(target: AnyModel): AnyModel {
  switch (target) {
    case isContainer(target):
      break
    case isGraphics(target):
      break
    case isText(target):
      break
    case isHTMLText(target):
      break
    case isSprite(target):
      break
    case isNineSliceSprite(target):
      break
  }
  return target
}

import {
  MAX_SCALE,
  MIN_SCALE
} from "@/helpers/graphics/gremlin/constant/defaultValue"

export function isVaildScale(scale: number): boolean {
  return scale >= MIN_SCALE && scale <= MAX_SCALE
}

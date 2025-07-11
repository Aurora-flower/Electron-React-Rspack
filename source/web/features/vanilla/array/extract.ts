import { isVaildData } from "@/utils/functions/dataType"

export function extractElementsAtDepth(
  arr: ArrayType,
  targetDepth = 0,
  collectAllElements = false,
  filterFn: (element: unknown) => boolean = isVaildData,
  currentDepth = 0
): ArrayType {
  const result: ArrayType = []

  if (currentDepth === targetDepth) {
    return arr
  }

  for (const element of arr) {
    if (Array.isArray(element)) {
      result.push(
        ...extractElementsAtDepth(
          element,
          targetDepth,
          collectAllElements,
          filterFn,
          currentDepth + 1
        )
      )
    } else if (collectAllElements && filterFn(element)) {
      result.push(element)
    }
  }

  return result
}

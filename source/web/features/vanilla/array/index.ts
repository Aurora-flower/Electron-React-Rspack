import {
  createArray,
  createFilledArray
} from "@/features/vanilla/array/createArray"
import {
  calculateArraySum,
  sumArraySlice
} from "@/features/vanilla/array/getArrayTotalSum"
import { isEffective } from "@/utils/functions/dataType"

// function from(): void {
//   const list = Array.prototype.forEach.bind(
//     Object.entries({
//       a: "1",
//       b: "2",
//       c: "3"
//     })
//     // (v, k) => {
//     // }
//   )
//   list((v, k) => {
//   })
// }

export class ArrayUtility {
  static sum = calculateArraySum
  static sumSlice = sumArraySlice
  static create = createArray
  static createFilled = createFilledArray

  static flattenDeep(arr: ArrayType): ArrayType {
    const depth = Number.POSITIVE_INFINITY
    return arr.flat(depth)
  }

  static extractElementsAtDepth(
    arr: ArrayType,
    targetDepth = 0,
    collectAllElements = false,
    filterFn: (element: unknown) => boolean = isEffective,
    currentDepth = 0
  ): ArrayType {
    const result: ArrayType = []

    if (currentDepth === targetDepth) {
      return arr
    }

    for (const element of arr) {
      if (Array.isArray(element)) {
        result.push(
          ...ArrayUtility.extractElementsAtDepth(
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

  static truncate(arr: ArrayType, newLength: number): ArrayType {
    arr.length = newLength
    return arr
  }

  static insert(arr: ArrayType, index: number, ...items: ArrayType): ArrayType {
    arr.splice(index, 0, ...items)
    return arr
  }
}

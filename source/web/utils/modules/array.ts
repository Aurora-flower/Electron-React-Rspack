import {
  DATA_TYPE_MODE,
  getDataType,
  isEffectiveElement
} from "@/utils/mod/dataType"

export function from() {
  const list = Array.prototype.forEach.bind(
    Object.entries({
      a: "1",
      b: "2",
      c: "3"
    })
    // (v, k) => {
    //   console.log(v, k);
    // }
  )

  list((v, k) => {
    console.log(v, k)
  })

  // console.log(list);
}

export class ArrayUtility {
  static sumArrayFromIndex(nums: number[], i = 0): number {
    if (getDataType(nums) !== DATA_TYPE_MODE.Array) {
      return 0
    }

    const el = nums[i]

    if (getDataType(el) !== DATA_TYPE_MODE.Number) {
      return 0
    }

    return i >= nums.length
      ? 0
      : el + ArrayUtility.sumArrayFromIndex(nums, i + 1)
  }

  // static sumArray(nums: number[]): number {
  //   return nums.reduce((acc, cur) => acc + cur, 0);
  // }

  static arrayFromLength(
    length: number,
    mapFn?: (value?: unknown, index?: number, array?: unknown[]) => unknown
  ): unknown[] {
    const defaultMapFn = (_: unknown, i: number) => i
    return Array.from({ length }, mapFn || defaultMapFn)
  }

  static arrayEmpty(length: number, fill = null): unknown[] {
    /**
     * @remarks
     * Array.from({length}) ==> undefined[]
     * Array(length) ==> undefined[]
     */
    return Array(length).fill(fill)
  }

  static arrayFlatByProto(arr: unknown[]): unknown[] {
    const deep = Number.POSITIVE_INFINITY // 扁平化处理的深度
    return arr.flat(deep)
  }

  static getElementAtDepth(
    arr: unknown[],
    depth = 0,
    isCumulative = false,
    listener: (data: unknown) => boolean = isEffectiveElement,
    currentDepth = 0
  ): unknown[] {
    const result: unknown[] = []

    if (currentDepth === depth) {
      return arr
    }

    // 否则继续递归深度
    for (const item of arr) {
      if (Array.isArray(item)) {
        result.push(
          ...ArrayUtility.getElementAtDepth(
            item,
            depth,
            isCumulative,
            listener,
            currentDepth + 1
          )
        )
      } else if (isCumulative && listener(item)) {
        result.push(item)
      }
    }

    return result
  }

  static arrayDelByLength(arr: unknown[], count: number): unknown[] {
    arr.length = count
    return arr
  }
}

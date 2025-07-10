export function createArray(
  length: number,
  mapFn?: (value?: unknown, index?: number, array?: ArrayType) => unknown,
  thisArg?: unknown
): ArrayType {
  const defaultMapFn = (_: unknown, i: number): number => i
  return Array.from({ length }, mapFn || defaultMapFn, thisArg)
}

export function createFilledArray(
  length: number,
  fillValue: unknown = null
): ArrayType {
  /**
   * @remarks
   * Array.from({length}) ==> undefined[]
   * Array(length) ==> undefined[]
   */
  return Array(length).fill(fillValue)

  // 方式二
  // return Array.from({ length }, () => fillValue)
}

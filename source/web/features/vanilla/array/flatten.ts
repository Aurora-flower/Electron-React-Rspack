export function flattenDeep(arr: ArrayType): ArrayType {
  const depth = Number.POSITIVE_INFINITY
  return arr.flat(depth)
}

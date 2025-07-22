export function sortBy(
  arr: AnyModel[],
  compareFn: (el: AnyModel) => number
): ArrayType {
  return arr.sort((a, b) => compareFn(a) - compareFn(b))
}

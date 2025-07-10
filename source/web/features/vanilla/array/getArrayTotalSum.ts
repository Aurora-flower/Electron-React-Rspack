import { DATA_TYPE_MODE, is } from "@/utils/functions/dataType"

export function calculateArraySum(arr: NumberArray): number {
  if (Array.isArray(arr) === false) {
    return 0
  }
  return arr.reduce((acc, cur) => acc + cur, 0)
}

export function sumArraySlice(nums: NumberArray, i = 0): number {
  if (is(nums, DATA_TYPE_MODE.Array)) {
    return 0
  }
  // 方式一
  const el = nums[i]
  if (!is(el, DATA_TYPE_MODE.Number)) {
    return 0
  }
  return i >= nums.length ? 0 : el + sumArraySlice(nums, i + 1)

  // 方式二
  // [head, ...tail]
  // const arr = nums.slice(i)
  // return arr.reduce((acc, cur) => acc + cur, 0)
}

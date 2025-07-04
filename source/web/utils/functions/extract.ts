import { targetHasOwnProperty } from "@/features/modules/object"
import CommonUtility from "@/utils/utility"

/**
 * @summary 从一个对象中提取部分属性，形成一个新对象
 * @param {object} origin 对象源
 * @param list 属性列表
 * @returns 新对象
 */
export function extractPartial<T>(
  origin: NonNullable<T>,
  keys: string[] = []
): Partial<T> {
  const keySet = keys.length > 0 ? new Set(keys) : new Set(Object.keys(origin))
  const result = Object.fromEntries(
    Object.entries(origin).filter(([key]) => keySet.has(key))
  ) as Partial<T>
  // const result = Object.create(null) as Partial<T>
  // for (const key in origin) {
  //   if (
  //     targetHasOwnProperty(origin, key) &&
  //     keys.includes(key)
  //   ) {
  //     result[key as keyof typeof origin] = origin[key]
  //   }
  // }
  // return result
  return CommonUtility.deepCopyJson(result) // 要深拷贝，否则会改变原对象
}

/**
 * @summary 合并两个对象的属性
 * @param props 属性对象
 * @param original 原始对象
 * @returns 合并后的对象
 * @remarks 优先保留原始对象的属性，然后从新对象中选择性地覆盖部分属性。
 */
export const mergeProps = <T extends RecordType>(props: T, original: T): T => {
  const entriesToMerge = Object.entries(props).filter(
    ([_key, value]) => value !== undefined // || !(_ in original)
  )
  return { ...original, ...Object.fromEntries(entriesToMerge) }
}

export function extend(target: RecordType, source: RecordType): RecordType {
  for (const key in source) {
    if (targetHasOwnProperty(source, key)) {
      target[key] = source[key]
    }
  }
  return target
}

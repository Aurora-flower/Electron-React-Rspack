export const DATA_TYPE_MODE = {
  String: "String",
  Number: "Number",
  Boolean: "Boolean",
  Object: "Object",
  Array: "Array",
  Function: "Function",
  Null: "Null",
  Undefined: "Undefined",
  Symbol: "Symbol"
}

export function isEffectiveElement(data: unknown): boolean {
  return data !== null && data !== undefined
}

export function getDefaultData(type: keyof typeof DATA_TYPE_MODE): unknown {
  if (type === DATA_TYPE_MODE.String) {
    return ""
  } else if (type === DATA_TYPE_MODE.Number) {
    return 0
  } else if (type === DATA_TYPE_MODE.Boolean) {
    return false
  } else if (type === DATA_TYPE_MODE.Object) {
    return {}
  } else if (type === DATA_TYPE_MODE.Array) {
    return []
  } else if (type === DATA_TYPE_MODE.Function) {
    return () => null
  } else if (type === DATA_TYPE_MODE.Null) {
    return null
  } else {
    // if (type == DATA_TYPE_MODE.Undefined)
    return undefined
  }
}

/**
 * @summary
 * 优点：
 * 不会受到原型链污染的影响
 *
 * 缺点：
 * - 性能开销：Object.prototype.toString.call(value) 会涉及函数调用和字符串比较；
 * - 兼容性：在不同的浏览器之间，Object.prototype.toString.call 的结果可能略有差异，
 */
export function getDataType(data: unknown): string {
  return Object.prototype.toString.call(data).slice(8, -1)
}

export function isType(data: unknown, type: string): boolean {
  return Object.prototype.toString.call(data).slice(8, -1) === type
}

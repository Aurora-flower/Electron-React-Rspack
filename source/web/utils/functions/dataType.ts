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

type DataType = keyof typeof DATA_TYPE_MODE

type DataTypeValues = (typeof DATA_TYPE_MODE)[DataType]

export function isEffective(data: unknown): boolean {
  return data !== null && data !== undefined
}

export function getDefaultData(dataType: DataType): unknown {
  if (dataType === DATA_TYPE_MODE.String) {
    return ""
  } else if (dataType === DATA_TYPE_MODE.Number) {
    return 0
  } else if (dataType === DATA_TYPE_MODE.Boolean) {
    return false
  } else if (dataType === DATA_TYPE_MODE.Object) {
    return {}
  } else if (dataType === DATA_TYPE_MODE.Array) {
    return []
  } else if (dataType === DATA_TYPE_MODE.Function) {
    return () => null
  } else if (dataType === DATA_TYPE_MODE.Null) {
    return null
  } else {
    // if (dataType == DATA_TYPE_MODE.Undefined)
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

export function isType(data: unknown, dataType: DataTypeValues): boolean {
  return Object.prototype.toString.call(data).slice(8, -1) === dataType
}

export function is(
  data: unknown,
  dataType: DataTypeValues = DATA_TYPE_MODE.Undefined
): boolean {
  switch (dataType) {
    case "Array":
      return Array.isArray(data)
    case "Object":
      return getDataType(data) === "Object"
  }
  if (dataType === DATA_TYPE_MODE.String) {
    return typeof data === "string"
  } else if (dataType === DATA_TYPE_MODE.Number) {
    return typeof data === "number"
  } else if (dataType === DATA_TYPE_MODE.Boolean) {
    return typeof data === "boolean"
  } else if (dataType === DATA_TYPE_MODE.Object) {
    return getDataType(data) === "Object"
  } else if (dataType === DATA_TYPE_MODE.Array) {
    return Array.isArray(data)
  } else if (dataType === DATA_TYPE_MODE.Function) {
    return typeof data === "function"
  } else if (dataType === DATA_TYPE_MODE.Null) {
    return data === null && typeof data === "object" // null !== undefined
  } else if (dataType === DATA_TYPE_MODE.Symbol) {
    return typeof data === "symbol"
  } else {
    // if (dataType == DATA_TYPE_MODE.Undefined)
    return typeof undefined === "undefined" // null == undefined
  }
}

export const DATA_TYPE_MODE = {
  String: "String",
  Number: "Number",
  Boolean: "Boolean",
  Object: "Object",
  Array: "Array",
  Function: "Function",
  Null: "Null",
  Undefined: "Undefined"
}

export function getDefaultData(type: keyof typeof DATA_TYPE_MODE) {
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
    return () => {}
  } else if (type === DATA_TYPE_MODE.Null) {
    return null
  } else {
    // if (type == DATA_TYPE_MODE.Undefined)
    return undefined
  }
}

export function getDataType(data: unknown): string {
  return Object.prototype.toString.call(data).slice(8, -1)
}

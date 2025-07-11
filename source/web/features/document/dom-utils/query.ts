const DOM_QUERY_METHOD = {
  ById: "id",
  BySelector: "selector",
  ByName: "name",
  ByTag: "tag",
  ByClass: "class"
} as const

type QueryMethodKey = keyof typeof DOM_QUERY_METHOD
type QueryMethod = (typeof DOM_QUERY_METHOD)[QueryMethodKey]
// type FilteredGetterWay = Omit<typeof DOM_QUERY_METHOD, "Class" | "Tag" | "Name">

export function queryElement(
  identifier: string,
  method: typeof DOM_QUERY_METHOD.ById | typeof DOM_QUERY_METHOD.BySelector
): HTMLElement | null {
  switch (method) {
    case DOM_QUERY_METHOD.ById:
      return document.getElementById(identifier)
    case DOM_QUERY_METHOD.BySelector:
      return document.querySelector(identifier)
    default:
      return null
  }
}

export function queryElements(
  identifier: string,
  method: Exclude<QueryMethod, "id">
): Element[] {
  switch (method) {
    case DOM_QUERY_METHOD.ByName:
      return Array.from(document.getElementsByName(identifier))
    case DOM_QUERY_METHOD.ByTag:
      return Array.from(document.getElementsByTagName(identifier))
    case DOM_QUERY_METHOD.ByClass:
      return Array.from(document.getElementsByClassName(identifier))
    case DOM_QUERY_METHOD.BySelector:
      return Array.from(document.querySelectorAll(identifier))
    default:
      return []
  }
}

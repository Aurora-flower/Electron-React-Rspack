const GETTER_WAY = {
  Id: "id",
  Selector: "selector",
  Name: "name",
  Tag: "tag",
  Class: "class"
} as const

type ElementGeretterWayKeys = keyof typeof GETTER_WAY

type ElementGetterWayValues = (typeof GETTER_WAY)[ElementGeretterWayKeys]

// type FilteredGetterWay = Omit<typeof GETTER_WAY, "Class" | "Tag" | "Name">

export function setTitle(title: string): void {
  document.title = title
}

export function getDomElement(
  parameter: string,
  way: "id" | "selector" //(typeof GETTER_WAY)[keyof FilteredGetterWay]
): HTMLElement | null {
  if (way === GETTER_WAY.Selector) {
    return document.querySelector(parameter) as HTMLElement
  } else if (way === GETTER_WAY.Id) {
    return document.getElementById(parameter) as HTMLElement
  }
  return null
}

export function getDomElements(
  parameter: string,
  way: Exclude<ElementGetterWayValues, "id">
): Array<Element> {
  // 统一返回真数组
  if (way === GETTER_WAY.Name) {
    return Array.from(document.getElementsByName(parameter))
  } else if (way === GETTER_WAY.Tag) {
    return Array.from(document.getElementsByTagName(parameter))
  } else if (way === GETTER_WAY.Class) {
    return Array.from(document.getElementsByClassName(parameter))
  } else if (way === GETTER_WAY.Selector) {
    return Array.from(document.querySelectorAll(parameter))
  } else {
    return []
  }
}

export function removeAllChildren(element: HTMLElement): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

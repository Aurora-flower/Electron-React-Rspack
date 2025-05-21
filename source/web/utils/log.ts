import CommonUtility from "@/utils/utility"

export const LOG_COLOR = {
  red: "color: red;",
  green: "color: green;",
  blue: "color: blue;",
  yellow: "color: yellow;",
  orange: "color: orange;",
  purple: "color: purple;",
  pink: "color: pink;",
  cyan: "color: cyan;",
  gray: "color: gray;"
}

export function webLog(
  moduleId: string,
  sign: string,
  ...args: unknown[]
): void {
  console.log(
    `%c>>> Web Log Source %c[ ${moduleId} ] - %c$_${sign}_$`,
    LOG_COLOR.cyan,
    LOG_COLOR.purple,
    LOG_COLOR.pink,
    ...args
  )
}

export function webErrorLog(
  moduleId: string,
  sign: string,
  error: unknown
): void {
  console.error(
    `>>> Web Error Source %c[ ${moduleId} ] - %c$_${sign}_$`,
    LOG_COLOR.blue,
    LOG_COLOR.yellow,
    CommonUtility.errorMessage(error)
  )
}

export function webWarn(
  moduleId: string,
  sign: string,
  ...args: unknown[]
): void {
  console.warn(
    `%c>>> Web Warn Source %c[ ${moduleId} ] - %c$_${sign}_$`,
    LOG_COLOR.yellow,
    LOG_COLOR.gray,
    LOG_COLOR.red,
    ...args
  )
}

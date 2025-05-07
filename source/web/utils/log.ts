import CommonUtility from "@/utils/utility"

export const LOG_COLOR = {
  red: "color: red;",
  green: "color: green;",
  blue: "color: blue;",
  yellow: "color: yellow;",
  orange: "color: orange;",
  purple: "color: purple;",
  pink: "color: pink;",
  cyan: "color: cyan;"
}

export function webLog(moduleId: string, sign: string, ...args: unknown[]) {
  console.log(
    `%c>>> Web Log Source %c[ ${moduleId} ] - %c$_${sign}_$`,
    LOG_COLOR.cyan,
    LOG_COLOR.pink,
    LOG_COLOR.green,
    ...args
  )
}

export function webErrorLog(moduleId: string, sign: string, error: unknown) {
  console.error(
    `>>> Web Error Source %c[ ${moduleId} ] - %c$_${sign}_$`,
    LOG_COLOR.blue,
    LOG_COLOR.yellow,
    CommonUtility.errorMessage(error)
  )
}

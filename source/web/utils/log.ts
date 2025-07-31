import { errorMessage } from "@common/filters/error"

export const LOG_COLOR = {
  red: "color: red;",
  green: "color: green;",
  blue: "color: blue;",
  yellow: "color: yellow;",
  orange: "color: orange;",
  purple: "color: purple;",
  pink: "color: pink;",
  cyan: "color: cyan;",
  gray: "color: gray;",
  white: "color: white;"
}

export function webLog(
  moduleId: string,
  sign: string,
  ...args: ArrayType
): void {
  console.log(
    `%c>>> Web Log Source %c[ ${moduleId} ] - %c$_${sign}_$`,
    LOG_COLOR.cyan,
    LOG_COLOR.orange,
    LOG_COLOR.pink,
    ...args
  )
}

export function webError(
  moduleId: string,
  sign: string,
  error: unknown,
  ...args: ArrayType
): void {
  console.error(
    `>>> Web Error Source %c[ ${moduleId} ] - %c$_${sign}_$`,
    LOG_COLOR.cyan,
    LOG_COLOR.yellow,
    errorMessage(error),
    ...args
  )
}

export function webWarn(
  moduleId: string,
  sign: string,
  ...args: ArrayType
): void {
  console.warn(
    `%c>>> Web Warn Source %c[ ${moduleId} ] - %c$_${sign}_$`,
    LOG_COLOR.yellow,
    LOG_COLOR.gray,
    LOG_COLOR.red,
    ...args
  )
}

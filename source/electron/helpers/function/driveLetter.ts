import { pathToFileURL } from "node:url"
import { DEFAULT_SCHEMA } from "@main/common/const"

export function driveLetterReplace(url: string): string {
  const driveLetterRegex = /^[a-zA-Z]:/
  if (driveLetterRegex.test(url)) {
    return url.replace(driveLetterRegex, match => `/${match}`)
  }
  return url
}

export function normalizeDirveLetter(
  url: string,
  scheme: string = DEFAULT_SCHEMA
): string {
  const postname = url.replace(`${scheme}://`, "")
  const letters = postname.split("/")
  const driveLetter = letters[0]
  if (driveLetter.indexOf("$") > -1) {
    letters[0] = driveLetter.replace("$", ":")
  }
  const fileURL = letters.join("/")
  const decoded = decodeURI(fileURL)
  const normalizedPath = decoded
    // .replace(/([a-zA-Z])\$/, "$1:") // 处理根路径 C$ → C:
    .replace(/^\/([a-z]:)/i, "$1")
  return pathToFileURL(normalizedPath).toString()
}

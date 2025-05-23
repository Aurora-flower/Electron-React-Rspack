import { pathToFileURL } from "node:url"
import { DEFAULT_SCHEMA } from "@main/common/const"
// import { normalize } from "node:path";
import { isWin } from "@main/utils/node/process/platform"

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
  if (isWin()) {
    const postname = url.replace(`${scheme}://`, "")
    const letters = postname.split("/")
    const driveLetter = letters[0]
    if (driveLetter.indexOf("$") > -1) {
      letters[0] = driveLetter.replace("$", ":")
    }
    const fileURL = letters.join("/")
    return pathToFileURL(decodeURI(fileURL)).toString()
  }
  return url
}

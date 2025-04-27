import { DEFAULT_SCHEMA } from "@main/common/const";
import { pathToFileURL } from "node:url";
// import { normalize } from "node:path";
import { isWin } from "@main/helpers/node/process/platform";

export function driveLetterReplace(url: string) {
  const driveLetterRegex = /^[a-zA-Z]:/;
  if (driveLetterRegex.test(url)) {
    return url.replace(driveLetterRegex, (match) => `/${match}`);
  }
  return url;
}

export function normalizeDirveLetter(
  url: string,
  scheme: string = DEFAULT_SCHEMA
) {
  if (isWin()) {
    // url.startsWith(`${scheme}://`)
    const postname = url.replace(`${scheme}://`, ""); // url.split("://")[1];
    const letters = postname.split("/");
    letters[0] = letters[0].toUpperCase() + ":/";
    const absolutePath = letters.join("/"); // normalize(absolutePath)
    return pathToFileURL(decodeURI(absolutePath)).toString();
  } else {
    return url;
  }
}

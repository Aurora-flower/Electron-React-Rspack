import { promises } from "node:fs"

export const readFile = async (filepath: string): Promise<string | null> => {
  return new Promise(resolve => {
    promises
      .readFile(decodeURI(filepath), "utf8")
      .then(data => {
        resolve(data)
      })
      .catch(() => {
        console.log("Error reading file")
        resolve(null)
      })
  })
}

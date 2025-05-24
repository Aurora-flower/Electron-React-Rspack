import { promises } from "node:fs"

export function readFile(filepath: string): Promise<string | null> {
  return new Promise(resolve => {
    promises
      .readFile(decodeURI(filepath), "utf8")
      .then(data => {
        resolve(data)
      })
      .catch(() => {
        resolve(null)
      })
  })
}

export function removeFile(filepath: string): Promise<boolean> {
  return new Promise(resolve => {
    promises
      .unlink(decodeURI(filepath))
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        resolve(false)
      })
  })
}

// export function removeFileIfExists(filepath: string): Promise<boolean> {
//   return new Promise(resolve => {
//   })
// }

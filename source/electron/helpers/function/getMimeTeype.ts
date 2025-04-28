import { extname } from "node:path"

export function getMimeType(filePath: string) {
  const ext = extname(filePath).toLowerCase()
  return (
    {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif"
    }[ext] || "application/octet-stream"
  )
}

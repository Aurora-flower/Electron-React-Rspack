import { readFile } from "@main/utils/node/file"

export async function getImageDataURL(path: string) {
  const data = (await readFile(path)) as Buffer
  return `data:image/png;base64,${Buffer.from(data ?? []).toString("base64")}`
}

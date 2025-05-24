import { readFile } from "@main/node/file"

export async function getImageDataURL(path: string): Promise<string> {
  const data = await readFile(path)
  return `data:image/png;base64,${Buffer.from(data ?? []).toString("base64")}`
}

import { join } from "node:path"

export function resolvePath(relUrl: string): string {
  return join(__dirname, relUrl)
}

import { webError } from "@/utils/log"

export function join(rel: string, base = location.href): string {
  try {
    const baseURL = `${base}${base.endsWith("/") ? "" : "/"}`
    const url = new URL(rel, baseURL)
    return url.pathname
  } catch (error) {
    webError("url", "join", error, base)
    return ""
  }
}

export function ext(url: string): string {
  return new URL(url).pathname.split(".").pop() || ""
}

export function replaceNormalize(url: string): string {
  return url.replace(/^(local:\/\/)([a-zA-Z]):/, "$1$2$")
}

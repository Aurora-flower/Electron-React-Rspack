export function join(rel: string, base = location.href): string {
  const baseURL = `${base}${base.endsWith("/") ? "" : "/"}`
  const url = new URL(rel, baseURL)
  return url.pathname
}

export function ext(url: string): string {
  return new URL(url).pathname.split(".").pop() || ""
}

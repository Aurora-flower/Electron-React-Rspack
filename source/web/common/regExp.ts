export const regExp = {
  rgba: /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i, // 6 位 | 8 位
  tag: /<([a-zA-Z]+)([^>]*)>(.*?)<\/\1>/g
}

export function isRGBA(color: string): boolean {
  return regExp.rgba.test(color)
}

export function isTag(text: string): boolean {
  return regExp.tag.test(text)
}

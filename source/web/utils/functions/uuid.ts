// const random = Math.random().toString(2).substring(2)
export function uuid(): string {
  const buffer = new Uint8Array(16)
  let timestamp = Date.now()
  for (let i = 0; i < 16; i++) {
    buffer[i] = Math.floor(Math.random() * 256 + (timestamp % 256))
    timestamp = Math.floor(timestamp / 256)
  }
  let binary = ""
  for (let i = 0; i < buffer.length; i++) {
    binary += String.fromCharCode(buffer[i])
  }
  const base64String = btoa(binary)
  const safeBase64String = base64String
    .replace(/\+/g, "m")
    .replace(/\//g, "X")
    .replace(/=+$/, "")
  return safeBase64String.substring(0, 22)
}

export function enhanceUUID(base64: string): string {
  const BASE64_KEYS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  const BASE64_VALUES = new Array(123)
  BASE64_KEYS.split("").forEach((char, index) => {
    BASE64_VALUES[char.charCodeAt(0)] = index
  })
  const HexChars = "0123456789abcdef".split("")
  const _t = ["", "", "", ""]
  const UuidTemplate = _t.concat(_t, "-", _t, "-", _t, "-", _t, "-", _t, _t, _t)
  const Indices = UuidTemplate.map((x, i) =>
    x === "-" ? Number.NaN : i
  ).filter(Number.isFinite)
  if (base64.length !== 22) {
    return base64
  }
  UuidTemplate[0] = base64[0]
  UuidTemplate[1] = base64[1]
  for (let i = 2, j = 2; i < 22; i += 2) {
    const lhs = BASE64_VALUES[base64.charCodeAt(i)]
    const rhs = BASE64_VALUES[base64.charCodeAt(i + 1)]
    UuidTemplate[Indices[j++]] = HexChars[lhs >> 2]
    UuidTemplate[Indices[j++]] = HexChars[((lhs & 3) << 2) | (rhs >> 4)]
    UuidTemplate[Indices[j++]] = HexChars[rhs & 0xf]
  }
  return UuidTemplate.join("")
}

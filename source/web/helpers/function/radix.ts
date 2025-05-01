/* ***** ***** 二进制 - 十进制 ***** ***** */
export function decimalToBinary(decimal: string) {
  if (!decimal) return "0" // 0b0
  // let num = Number(decimal)
  // let binary = ""
  // while (num > 0) {
  //   binary = (num % 2) + binary
  //   num = Math.floor(num / 2)
  // }
  return Number.parseInt(decimal, 10).toString(2)
}

export function binaryTodecimal(binary: string) {
  if (!binary) return 0
  // let num = 0
  // for (let i = 0; i < binary.length; i++) {
  //   num = num * 2 + Number(binary[i])
  // }
  return Number.parseInt(binary, 2)
}

/* ***** ***** 二进制 - 八进制 - 三位计算法 ***** ***** */
export function octToBinary(oct: string) {
  if (!oct) return "0" // 0b0
  return Number.parseInt(oct, 8).toString(2)
}

export function binaryToOct(binary: string) {
  if (!binary) return "0" // 0o0
  return Number.parseInt(binary, 2).toString(8)
}
console.log(octToBinary("17"), binaryToOct("1111"))

/* ***** ***** 二进制 - 十六进制 - 四位计算法 ***** ***** */
export function hexToBinary(hex: string) {
  if (!hex) return "0" // 0b0
  return Number.parseInt(hex, 16).toString(2)
}

export function binaryToHex(binary: string) {
  if (!binary) return "0" // 0x0
  return Number.parseInt(binary, 2).toString(16)
}

/* ***** ***** 八进制 - 十六进制 - 四位计算法 ***** ***** */
export function octTodecimal(oct: string) {
  if (!oct) return 0
  return Number.parseInt(oct, 8)
}

export function decimalToOct(decimal: string) {
  if (!decimal) return "0"
  return Number.parseInt(decimal, 10).toString(8)
}

/* ***** ***** 十进制 - 十六进制 - 四位计算法 ***** ***** */
export function hexTodecimal(hex: string) {
  if (!hex) return 0
  return Number.parseInt(hex, 16)
}

export function decimalToHex(decimal: string) {
  if (!decimal) return "0"
  return Number.parseInt(decimal, 10).toString(16)
}

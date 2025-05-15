export function OR(a: number, b: number): number {
  return a | b
}

export function AND(a: number, b: number): number {
  return a & b
}

export function XOR(a: number, b: number): number {
  return a ^ b
}

export function NOT(a: number): number {
  return ~a
}

export function NAND(a: number, b: number): number {
  return ~(a & b)
}

export function NOR(a: number, b: number): number {
  return ~(a | b)
}

export function XNOR(a: number, b: number): number {
  return ~(a ^ b)
}

export function SHL(a: number, b: number): number {
  return a << b
}

export function SHR(a: number, b: number): number {
  return a >> b
}

export function SHRU(a: number, b: number): number {
  return a >>> b
}

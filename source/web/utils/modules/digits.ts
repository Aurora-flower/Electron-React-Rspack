export function formatNumberPrecision(num: number, digits = 2): number {
  return Number(num.toFixed(digits))
}

export function isMultipleOf(value: number, base: number): boolean {
  return value % formatNumberPrecision(base, 0) === 0
}

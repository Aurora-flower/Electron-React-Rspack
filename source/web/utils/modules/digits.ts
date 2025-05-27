export function formatNumberPrecision(num: number, digits = 2): number {
  return Number(num.toFixed(digits))
}

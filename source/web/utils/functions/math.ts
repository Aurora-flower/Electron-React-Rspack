// digits
export function formatNumberPrecision(num: number, digits = 2): number {
  return Number(num.toFixed(digits))
}

export function isMultipleOf(value: number, base: number): boolean {
  return value % formatNumberPrecision(base, 0) === 0
}

export function findMaxIndex(arr: NumberArray): number {
  return arr.reduce(
    (maxIndex: number, currentValue, currentIndex: number, array) => {
      return currentValue > array[maxIndex] ? currentIndex : maxIndex
    },
    0
  )
}

export function findMinIndex(arr: NumberArray): number {
  return arr.reduce(
    (minIndex: number, currentValue, currentIndex: number, array) => {
      return currentValue < array[minIndex] ? currentIndex : minIndex
    },
    0
  )
}

/**
 * @remarks 弧度和度数的关系: 180 角度 = π 弧度
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI)
}

export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

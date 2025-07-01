/**
 * @summary 执行两个数的按位或（OR）操作。
 * @description OR 操作逐位比较两个数字，只要有一个数字的位是 1，则结果位为 1；如果两个数字对应的位都是 0，则结果位为 0。
 * @param a 第一个数字。
 * @param b 第二个数字。
 * @returns 返回 a | b 的结果。
 */
export function OR(a: number, b: number): number {
  return a | b
}

/**
 * @summary 执行两个数的按位与（AND）操作。
 * @description AND 操作逐位比较两个数字，只有当两个数字对应的位都是 1 时，结果位才为 1；否则，结果位为 0。
 * @param a 第一个数字。
 * @param b 第二个数字。
 * @returns 返回 a & b 的结果。
 */
export function AND(a: number, b: number): number {
  return a & b
}

/**
 * @summary 执行两个数的按位异或（XOR）操作。
 * @description XOR 操作逐位比较两个数字，当两个数字对应的位不相同时，结果位为 1；相同时，结果位为 0。
 * @param a 第一个数字。
 * @param b 第二个数字。
 * @returns 返回 a ^ b 的结果。
 */
export function XOR(a: number, b: number): number {
  return a ^ b
}

/**
 * @summary 执行一个数的按位取反（NOT）操作。
 * @description NOT 操作会将数字的每一位取反，即 0 变为 1，1 变为 0。
 * @param a 要取反的数字。
 * @returns 返回 ~a 的结果。
 */
export function NOT(a: number): number {
  return ~a
}

/**
 * @summary 执行两个数的按位与非（NAND）操作。
 * @description NAND 操作是与（AND）操作的反操作。它返回 1 当两个数字的 AND 操作结果不是 1 时；如果 AND 结果是 1，则返回 0。
 * @param a 第一个数字。
 * @param b 第二个数字。
 * @returns 返回 ~(a & b) 的结果。
 */
export function NAND(a: number, b: number): number {
  return ~(a & b)
}

/**
 * @summary 执行两个数的按位或非（NOR）操作。
 * @description NOR 操作是或（OR）操作的反操作。它返回 1 当两个数字的 OR 操作结果不是 1 时；如果 OR 结果是 1，则返回 0。
 * @param a 第一个数字。
 * @param b 第二个数字。
 * @returns 返回 ~(a | b) 的结果。
 */
export function NOR(a: number, b: number): number {
  return ~(a | b)
}

/**
 * @summary 执行两个数的按位同或（XNOR）操作。
 * @description XNOR 操作是异或（XOR）操作的反操作。它返回 1 当两个数字的位相同；返回 0 当两个数字的位不同。
 * @param a 第一个数字。
 * @param b 第二个数字。
 * @returns 返回 ~(a ^ b) 的结果。
 */
export function XNOR(a: number, b: number): number {
  return ~(a ^ b)
}

/**
 * @summary 执行一个数的按位左移（SHL）操作。
 * @description 左移操作将第一个数字的位向左移动指定的位数，右侧补零。
 * @param a 要左移的数字。
 * @param b 移动的位数。
 * @returns 返回 a << b 的结果。
 */
export function SHL(a: number, b: number): number {
  return a << b
}

/**
 * @summary 执行一个数的按位右移（SHR）操作。
 * @description 右移操作将第一个数字的位向右移动指定的位数。对于有符号数字，左侧补充符号位（算术右移）。
 * @param a 要右移的数字。
 * @param b 移动的位数。
 * @returns 返回 a >> b 的结果。
 */
export function SHR(a: number, b: number): number {
  return a >> b
}

/**
 * @summary 执行一个数的无符号右移（SHRU）操作。
 * @description 无符号右移操作将第一个数字的位向右移动指定的位数，左侧始终补充零（逻辑右移）。
 * @param a 要右移的数字。
 * @param b 移动的位数。
 * @returns 返回 a >>> b 的结果。
 */
export function SHRU(a: number, b: number): number {
  return a >>> b
}

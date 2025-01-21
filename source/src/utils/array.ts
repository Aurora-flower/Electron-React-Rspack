/**
 * @file 数组工具类
 */

import { CommonUtility } from '@/src/utils/common';

const { DataTypeMode, getDataType } = CommonUtility;

/**
 * 判断值是否有效
 * @param data 传入的数据
 * @returns 是否不为 null | undefind
 */
function filterListener(data: unknown) {
  return data !== null && data !== undefined;
}

export class ArrayUtility {
  /**
   * 求数组中从指定索引开始到末尾的元素之和
   * @param nums 数组
   * @param i 指定索引
   * @returns 数组中从指定索引开始到末尾的元素之和
   *
   * @description
   * 进行数组求和，不允许使用循环、以及标准库的函数
   *
   * f(i) 表示从数组第i位到末尾之和
   * f(i) = nums[i] + f(i+1) ; i >= nums.length f(i) = 0
   */
  static sumArrayFromIndex(
    nums: number[],
    i: number = 0
  ): number {
    if (getDataType(nums) != DataTypeMode.Array) {
      return 0;
    }

    const el = nums[i];

    if (getDataType(el) != DataTypeMode.Number) {
      return 0;
    }

    return i >= nums.length
      ? 0
      : el + this.sumArrayFromIndex(nums, i + 1);
  }

  // static sumArray(nums: number[]): number {
  //   return nums.reduce((acc, cur) => acc + cur, 0);
  // }

  /**
   * greater - 根据指定函数生成数组
   * @param length 生成数组的长度
   * @param mapFn 生成数组的回调
   * @remarks
   * 回调函数最多接受三个参数：
   * - currentValue：当前元素的值。
   * - index：当前元素的索引。
   * - array：当前被调用 map 方法的数组。
   */
  static arrayFromLength(
    length: number,
    mapFn?: (
      value?: unknown,
      index?: number,
      array?: unknown[]
    ) => unknown
  ): unknown[] {
    const defaultMapFn = (_: unknown, i: number) => i;
    return Array.from({ length }, mapFn || defaultMapFn);
  }

  /**
   * 根据长度生成数组，可以指定填充值
   * @param length 数组长度
   * @param fill 填充值
   * @returns {Array<unknown>}数组
   */
  static arrayEmpty(length: number, fill = null): unknown[] {
    /**
     * @remarks
     * Array.from({length}) ==> undefined[]
     * Array(length) ==> undefined[]
     */
    return Array(length).fill(fill);
  }

  /**
   * 数组扁平化
   * @param arr 数组
   * @returns 扁平化后的数组
   */
  static arrayFlatByProto(arr: unknown[]): unknown[] {
    const deep = Infinity; // 扁平化处理的深度
    return arr.flat(deep);
  }

  /**
   * 取出多维数组中指定层数的元素
   * @param arr - 多维数组
   * @param depth - 目标层数
   * @param currentDepth - 当前递归的深度（默认为 1）
   * @returns 指定层数的元素数组
   */
  static getElementAtDepth(
    arr: unknown[],
    depth: number = 0,
    isCumulative: boolean = false,
    listener: (data: unknown) => boolean = filterListener,
    currentDepth: number = 0
  ): unknown[] {
    const result: unknown[] = [];

    // 如果已达到目标层数，直接收集当前层的元素
    if (currentDepth === depth) {
      return arr;
    }

    // 否则继续递归深度
    for (const item of arr) {
      // 如果当前元素是数组，递归获取下一级的元素
      if (Array.isArray(item)) {
        result.push(
          ...this.getElementAtDepth(
            item,
            depth,
            isCumulative,
            listener,
            currentDepth + 1
          )
        );
      } else if (isCumulative && listener(item)) {
        result.push(item);
      }
    }

    return result;
  }

  /**
   * 使数组剩余指定个数（删除）
   * @param arr 数组
   * @param count 剩余的个数，只保留从第一个开始到 count 位置的元素
   * @remarks
   * 通过 length 属性，可以修改数组的长度，从而实现数组的截取
   */
  static arrayDelByLength(
    arr: unknown[],
    count: number
  ): unknown[] {
    arr.length = count;
    return arr;
  }
}

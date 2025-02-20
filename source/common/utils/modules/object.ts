export class ObjectUtility {
  /**
   * 将一个对象转为数组
   */
  static objectToArray(obj: Record<string, unknown>): unknown[] {
    return Object.entries(obj);
  }

  /**
   * 将一个数组转为对象
   */
  static arrayToObject(
    arr: Array<[string, unknown]>
  ): Record<string, unknown> {
    return Object.fromEntries(arr);
  }
}

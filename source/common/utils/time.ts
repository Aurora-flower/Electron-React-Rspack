/**
 * @class 时间工具类
 */
export class TimeUtility {
  /**
   * 获取当前时间戳
   * @returns 当前时间戳
   */
  static getCurrentTimestamp(): number {
    return Date.now();
  }

  /**
   * 获取当前日期
   * @returns 当前日期
   */
  static getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }

  /**
   * 获取当前时间
   * @returns 当前时间
   */
  static getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }

  /**
   * 获取当前日期和时间
   * @returns 当前日期和时间
   */
  static getCurrentDateTime(): string {
    return new Date().toLocaleString();
  }
}

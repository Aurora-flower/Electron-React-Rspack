export class StringUtility {
  /**
   * @summary 垫片字符串
   */
  static padString(
    content: string,
    digit: number,
    type: 'start' | 'end',
    pad: string
  ) {
    if (type === 'start') {
      return content.padStart(digit, pad);
    } else {
      return content.padEnd(digit, pad);
    }
  }

  /**
   * @summary 重复字符串
   */
  static repeatString(content: string, times: number) {
    return content.repeat(times);
  }
}

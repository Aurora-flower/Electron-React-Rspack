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

  /**
   * @summary 首字母大写
   * @param {String} letter 字符信息
   * @returns {string}
   */
  static firstLetterUppercase(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }

  /**
   * @summary 首字母小写
   * @param {String} letter 字符信息
   * @returns {string}
   */
  static firstLetterLowercase(letter: string): string {
    return letter[0].toLowerCase() + letter.slice(1);
  }
}

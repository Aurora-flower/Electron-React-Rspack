export class StringUtility {
  /**
   * 垫片字符串
   */
  static padString(
    content: string,
    digit: number,
    type: 'start' | 'end',
    pad: string
  ) {
    // return (
    //   str: string,
    //   padStr: string,
    //   padLen: number
    // ) => {
    //   if (type === 'start') {
    //     return padStr.repeat(padLen) + str
    //   } else {
    //     return str + padStr.repeat(padLen)
    //   }
    // }
    if (type === 'start') {
      return content.padStart(digit, pad);
    } else {
      return content.padEnd(digit, pad);
    }
  }
}

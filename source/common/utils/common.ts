/**
 * @class 公共工具类
 */
export class CommonUtility {
  /**
   * @static 数据类型
   */
  static DataTypeMode = {
    String: 'String',
    Number: 'Number',
    Boolean: 'Boolean',
    Object: 'Object',
    Array: 'Array',
    Function: 'Function',
    Null: 'Null',
    undefined: 'Undefined'
  };

  /**
   * @static getDataType 判断数据类型
   * @returns 数据类型
   * @description
   * Object.prototype.toString.call() 返回一个字符串，格式为 "[object 类型]"
   * 不会受到原型链污染的影响
   * @remarks
   * - 性能开销
   *    Object.prototype.toString.call(value) 会涉及函数调用和字符串比较，
   *    在性能要求较高的场景下，这种方法相对 `typeof` 或 `instanceof` 来说可能会带来额外的性能开销，
   *    尽管通常这个差异并不显著。
   * - 在一些特殊对象上有不一致的表现
   *    在某些情况下，尤其是在不同的 JavaScript 环境（如不同的 iframe、Web Workers、不同的浏览器等）中，
   *    Object.prototype.toString.call 的结果可能会有所不同。
   *    例如，在不同的浏览器之间，Object.prototype.toString.call 的结果可能略有差异，
   *    尤其是对于一些内建对象的类型。
   */
  static getDataType(data: unknown): string {
    return Object.prototype.toString.call(data).slice(8, -1);
  }
}

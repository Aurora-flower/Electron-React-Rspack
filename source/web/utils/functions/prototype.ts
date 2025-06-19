export function getPrototypeChain(origin: AnyModel): string[] {
  const chain: string[] = []
  let proto = Object.getPrototypeOf(origin)
  while (proto && proto !== null) {
    // !== Object.prototype
    chain.push(proto.constructor.name)
    proto = Object.getPrototypeOf(proto)
  }
  return chain
}

export function getConstructor(instance: ObjectType): object {
  return instance.constructor // Function
}

export function getConsturorName(instance: ObjectType): string {
  return instance.constructor.name
}

// export function getPrototype(instance: ObjectType): object {
//   return Object.getPrototypeOf(instance) // Object
// }

/**
 * @summary 判断是否是构造函数的实例
 * @param instance 实例
 * @param CF 构造函数（Constructor Function）
 * @returns {boolean}
 * @remarks
 * __proto__ 是一种不推荐使用的访问原型的方式，虽然现代浏览器都支持它，但它并不是 JavaScript 语言标准的一部分。
 * 使用 __proto__ 可能会影响代码的性能，而且可能会导致跨环境（例如 Node.js 和浏览器）兼容性问题。
 */
export function isProtoOfByPointer(
  instance: ObjectType,
  CF: Constructor
): boolean {
  return instance?.__proto__ === CF.prototype
}

/**
 * @summary 检测实例是否是构造函数的实例
 * @param instance 实例
 * @param CF 构造函数
 * @returns {boolean}
 * @remarks
 * - isPrototypeOf() 方法用于判断某个对象是否是另一个对象的原型。
 * 它会检查 instance 是否等于 CF.prototype 或 CF.prototype 的原型链上的某个对象。
 * 如果 instance 是 CF.prototype 的实例，则返回 true，否则返回 false。
 * - 使用了标准的 isPrototypeOf 方法，提供了更为稳健、规范的解决方案，并且它也不依赖 __proto__，更适合生产环境使用。
 */
export function isProtoOf(instance: ObjectType, CF: Constructor): boolean {
  return CF.prototype.isPrototypeOf.call(instance)
}

/* ***** ***** ***** ***** JS 测试用例 ***** ***** ***** ***** */
// function Person(name) {
//   this.name = name;
// }

// // 扩展原型
// Person.prototype.sayName = function() {
//   console.log(this.name);
// };

// const p = new Person("HuaYing");

// console.log(p.constructor == Person)

// // 1. 实例与构造函数原型的关系
// console.log(p.__proto__ === Person.prototype); // true

// // 2. 原型链继承
// console.log(p.__proto__.__proto__ === Object.prototype); // true
// console.log(Object.prototype.__proto__); // null

// // 3. 构造函数本身的原型链
// console.log(Person.__proto__ === Function.prototype); // true
// console.log(Function.prototype.__proto__ === Object.prototype); // true

// // 4. 方法调用（通过原型链查找）
// p.sayName(); //（方法定义在 Person.prototype 上）

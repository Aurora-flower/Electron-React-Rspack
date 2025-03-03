/**
 * @file 设计模式 - 单例模式（singleton pattern)
 * @description
 * 单例是可以实例化一次并且可以全局访问的类。
 * 这个单个实例可以在整个应用程序中共享，这使得 Singletons 非常适合管理应用程序中的全局状态。
 */
export class Singleton {
  static instance;
  constructor() {}
  static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
}

/**
 * @summary 抽象模式
 */
class AbstractClass {
  /**
   * @summary 抽象方法
   */
  abstractMethod() {
    throw new Error('抽象方法不能调用');
  }

  /**
   * @summary 抽象方法
   */
  concreteMethod() {
    console.log('抽象类中的具体方法');
  }

  /**
   * @summary 模板方法
   */
  templateMethod() {
    this.abstractMethod();
    this.concreteMethod();
  }
}

new AbstractClass().concreteMethod();

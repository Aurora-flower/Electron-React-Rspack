// 定义一个抽象类 Animal
abstract class Animal {
  // readonly 属性: 只读属性，初始化后不能被修改
  readonly species: string;

  // protected 属性: 受保护属性，仅在类及其子类中可访问
  protected age: number;

  // private 属性: 私有属性，仅在类内部可访问
  private id: number;

  // 构造函数: 用于初始化类的属性
  constructor(species: string, age: number, id: number) {
    this.species = species;
    this.age = age;
    this.id = id;
  }

  // 抽象方法: 子类必须实现此方法
  abstract makeSound(): string;

  // 公共方法: 公开的方法，外部可调用
  public getAge(): number {
    return this.age;
  }

  // 私有方法: 仅在类内部调用
  private generateId(): number {
    return this.id;
  }

  // 公共方法: 公开的方法，外部可调用
  public getId(): void {
    console.log(this.generateId());
  }
}

// Dog 类继承自 Animal
class Dog extends Animal {
  // 静态属性: 属于类本身而不是类实例，可以通过类名直接访问
  static speciesType: string = 'Mammal';

  // 构造函数: 调用父类构造函数初始化属性
  constructor(name: string, age: number, id: number) {
    super(name, age, id); // 调用父类构造函数
  }

  // 实现抽象方法: 提供具体的实现
  public makeSound(): string {
    return 'Woof!';
  }

  // 公共方法: 返回描述信息
  public describe(): string {
    // eslint-disable-next-line max-len
    return `${this.species} is ${this.age} years old and it says "${this.makeSound()}"`;
  }
}

// Cat 类继承自 Animal
class Cat extends Animal {
  // 构造函数: 调用父类构造函数初始化属性
  constructor(name: string, age: number, id: number) {
    super(name, age, id);
  }

  // 实现抽象方法: 提供具体的实现
  public makeSound(): string {
    return 'Meow!';
  }

  // 公共方法: 返回描述信息
  public describe(): string {
    // eslint-disable-next-line max-len
    return `${this.species} is ${this.age} years old and it says "${this.makeSound()}"`;
  }
}

// 使用 Dog 类
const dog = new Dog('Golden Retriever', 5, 1);
dog.getId();
console.log(dog.describe()); // 输出: Golden Retriever is 5 years old and it says "Woof!"
console.log(Dog.speciesType); // 输出: Mammal

// 使用 Cat 类
const cat = new Cat('Siamese', 3, 2);
console.log(cat.describe()); // 输出: Siamese is 3 years old and it says "Meow!"

// 尝试修改 readonly 属性（会报错）
// dog.species = "New Species"; // Error: Cannot assign to 'species' because it is a read-only property.

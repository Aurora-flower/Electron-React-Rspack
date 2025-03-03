/**
 * @summary
 * 在 Node.js 中，绑定事件时可以传入一个可选的第三个参数，用于指定 this 的上下文。如果将这个参数设置为 this，那么事件处理函数中的 this 将指向当前的上下文对象。
 */
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

class MyClass {
  constructor() {
    myEmitter.on('event', this.handleEvent, this);
  }

  handleEvent() {
    console.log(this); // 这里的 this 指向 MyClass 的实例
  }
}

const instance = new MyClass();
myEmitter.emit('event'); // 输出 MyClass 的实例

console.log(instance);

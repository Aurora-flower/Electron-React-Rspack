## DOM

### 获取元素的 data-\* 属性

```js
// el === ev.target

// 方式一:
const getData = (el, name) => {
  const prefix = 'data-';
  return el.getAttribute(prefix + name);
};

// 方式二
const getData = (el, name) => {
  return el.dataset[name];
};

// 方式三
const getData = (el, name) => {
  const prefix = 'data-';
  return el.getAttribute(prefix + name);
};
```

### currentTarget 和 target 的区别

- target:

  - 指的是触发事件的原始元素。
  - 用户实际点击的元素，可能是事件绑定元素的子元素。
  - 类型为 EventTarget，可能需要类型断言来使用更具体的属性。

- currentTarget:

  - 指的是事件监听器所附加的元素。
  - 即使事件是从子元素冒泡上来的，它始终是最初绑定事件的那个元素。
  - 类型为绑定事件的元素类型，类型为 HTMLElement。

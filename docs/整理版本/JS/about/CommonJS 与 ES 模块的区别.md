# CommonJS 与 ES 模块的区别

## 引言

---

## CommonJS 模块

**CommonJS** 是一种模块化规范，主要用于服务器端的 JavaScript 环境，如 Node.js。它通过 _module.exports_ 和 _exports_ 来导出模块，并使用 _require_ 来导入模块。

> `*module.exports*` 可以导出任意类型的数据，包括对象、函数、字符串等。
>
> `*exports*` 的本质是 对 `*module.exports*` 的引用，可以用来导出多个属性。

```javascript
/// ./modules/A.js

/* 单个导出 */
exports.default = {
  name: 'default'
};

/* 默认导出 */
module.exports = {
  name: 'modules'
};
```

```javascript
/// ./demo.js
const module_A = require('./modules/A');
console.log(module_A); // 输出结果: { name: 'modules' }
```

_Tip: 导出的内容会被整合到默认名字空间。当存在默认导出的时候，单个导出的内容会被忽略。_

## ES 模块

**ES Module** 是 ES6 之后新增的模块化规范，它从 Javascript 本身的语言层面，实现了模块化。使用 _export_ 导出模块，使用 _import_ 导入模块。

> `ES Module` 想要完成浏览器端、服务端的模块化大一统，成为通用解决方案。
>
> 通过 `as` 关键词，对导出对象重命名，也可以通过 `as` 对导入对象重命名

_Tip: 导入导出所需的部分即可。_

---

## 优缺点对比

- **_CommonJS_**：

  - **优点**：导出方式明确，适合需要全局导入的场景。
  - **缺点**：灵活性较低，不适合仅导出部分功能。

- **_ES Module_**:

  - **优点**：语法简洁、灵活，支持部分导出和更复杂的依赖关系
  - **缺点**：默认导出可能引入命名冲突，需谨慎使用。

```javascript
/// ./modules/B.js

/* 单个导出 */
export const name = 'es module'

/* 默认导出 */
export default const name = 'es'

/* 另类的默认导出 */
export { name as default };
```

```javascript
/// ./demo.js
import * as B from './modules/B';

// 默认导入
import B, { name } from './modules/B';

console.log(module_A); // 输出结果: { name: 'modules' }
```

---

### 注意事项

1. **同步加载**: CommonJS 是同步加载模块，这在服务器端是可行的，因为模块通常存储在本地磁盘上，读取速度快。但在浏览器端，由于网络延迟，同步加载会导致性能问题。
2. **引用关系**: _exports_ 和 _module.exports_ 是引用关系，修改 _exports_ 的属性会影响 _module.exports_。
3. **不适用于浏览器**: 由于同步加载的特性，CommonJS 不适用于浏览器端。

# Babel 的功能

## 引言

---

## 语法转换

> Babel 是一个 JavaScript 编译器，主要用于将现代 JavaScript（包括 ECMAScript 6+ 语法）转译为向后兼容的 JavaScript 代码，使得它可以在不同的浏览器或环境中运行。
> 简单来说，Babel 的核心功能是将最新的 JavaScript 代码转换成浏览器能够理解的版本。

Babel 将新的 JavaScript 特性（例如箭头函数、类、模板字符串、async/await、解构赋值等）转换为较旧的 JavaScript 语法，这样即使在不支持这些新特性的浏览器中，代码仍能正常运行。

例如：

```javascript
const greet = () => {
  console.log('Hello');
};
```

Babel 会将其转换为：

```javascript
var greet = function () {
  console.log('Hello');
};
```

---

## JSX 转换

> Babel 可以用于将 React 代码转换为浏览器可理解的 JavaScript 代码。
> React 使用的是一种扩展的 JavaScript 语法，叫做 JSX（JavaScript XML），这是一种允许在 JavaScript 中直接编写类似 HTML 的代码格式。
> 浏览器并不能直接理解 JSX，因此需要使用 Babel 来将它转译成普通的 JavaScript。

对于 React 项目，Babel 可以将 JSX 语法（React 特有的 HTML 类似语法）转换为普通的 JavaScript。
JSX 本身浏览器不能理解，因此 Babel 会把 JSX 转换为 `React.createElement()` 形式的 JavaScript 代码。

例如：

```jsx
const element = <h1>Hello, world!</h1>;
```

Babel 会将其转换为：

```javascript
const element = React.createElement('h1', null, 'Hello, world!');
```

---

## Polyfill

Babel 可以通过 polyfill 来支持一些新的 JavaScript 特性（如 Promise、Map 等）。这意味着如果使用了某些 JavaScript 新特性，而这些特性在某些浏览器中不被支持，Babel 可以自动引入 polyfill 代码，使这些特性能够在旧浏览器中运行。

---

## 插件与预设

Babel 通过插件和预设来扩展其功能。插件可以转换特定的 JavaScript 语法，预设是插件的集合。

最常见的预设包括：

- `@babel/preset-env`：根据目标环境自动选择需要的插件和转换方法，支持现代 JavaScript 特性的转换。
- `@babel/preset-react`：专门用于将 JSX 转换为 JavaScript。
- `@babel/preset-typescript`：用于支持 TypeScript 的转换。

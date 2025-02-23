# Gulp 任务中的 cb 参数

## 引言

在 Gulp 任务中，`cb` 参数是一个 **回调函数（callback）**，它的核心作用是 **通知 Gulp 任务何时完成**。

---

### 一、`cb` 的作用机制

1. **异步任务控制**

   Gulp 任务默认是异步执行的，必须通过某种方式告诉 Gulp "任务已完成"。`cb` 回调函数就是其中一种通知机制。

2. **强制信号**  
   调用 `cb()` 相当于向 Gulp 发送信号：

   ```javascript
   function task(cb) {
     // 任务逻辑...
     cb(); // ⬅️ 此处告诉 Gulp：任务已完成
   }
   ```

   如果不调用 `cb()`，Gulp 会认为任务未完成，导致流程卡住。

---

### 二、关键场景对比

#### 1. 同步任务（不推荐）

```javascript
function syncTask(cb) {
  console.log('这是一个同步任务');
  cb(); // 必须调用
}
```

- 即使没有异步操作，**也必须调用 `cb()`**，否则任务会挂起

#### 2. 异步任务（正确用法）

```javascript
function asyncTask(cb) {
  setTimeout(() => {
    console.log('异步操作完成');
    cb(); // ⬅️ 在异步操作完成后调用
  }, 1000);
}
```

#### 3. 错误处理

向 cb 回调传入的数据会被作为错误对象处理。

```javascript
function errorTask(cb) {
  fs.readFile('不存在的文件.txt', err => {
    if (err) {
      cb(err); // ⬅️ 传递错误对象，Gulp 会捕获错误
      return;
    }
    cb();
  });
}
```

---

### 三、为什么需要回调机制？

Gulp 的底层原理决定了它需要明确的完成信号：

| 任务类型     | 完成信号方式       |
| ------------ | ------------------ |
| 回调模式     | 调用 `cb()`        |
| Promise 模式 | 返回 Promise       |
| Async/Await  | 函数声明为 `async` |
| 流（Stream） | 返回 Stream 对象   |

**回调模式**是 Gulp 最早支持的机制，其他方式是后续演进的结果。

---

### 四、代码示例分析

```javascript
// 此处的 cb 只用于标记同步任务完成
function clean(cb) {
  // 假设这里没有异步操作
  cb(); // 必须调用！
}

// 如果存在异步操作需要这样写
function asyncClean(cb) {
  fs.rmdir('dist', { recursive: true }, err => {
    if (err) throw err;
    cb(); // ⬅️ 在回调中调用
  });
}
```

---

### 五、现代 Gulp 的更优写法

建议优先使用 **async/await** 或 **Promise** 替代回调模式：

```javascript
const { promisify } = require('util');
const fs = require('fs');
const rm = promisify(fs.rm);

// 更清晰的异步写法
async function modernClean() {
  await rm('dist', { recursive: true, force: true });
}

exports.clean = modernClean;
```

---

### 六、为什么示例代码中需要 `cb`？

在默认的 `series()` 组合中：

```javascript
exports.default = series(clean, build);
```

- 如果 `clean` 不调用 `cb()`，Gulp 会卡在 `clean` 任务，永远不会执行 `build`
- 即使任务没有实际内容，也需要调用 `cb()` 保持流程正确

---

### 总结表格

| 场景               | 是否需要 `cb` | 正确示例                            |
| ------------------ | ------------- | ----------------------------------- |
| 纯同步任务         | ✅ 必须       | `function task(cb) { cb() }`        |
| 异步回调任务       | ✅ 必须       | `setTimeout(() => cb(), 100)`       |
| Promise/Async 任务 | ❌ 不需要     | `async function task() {}`          |
| 返回 Stream 的任务 | ❌ 不需要     | `function task() { return stream }` |

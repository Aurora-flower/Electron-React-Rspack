# Vue 框架

## Vue3

### 项目创建

```bash
# 安装最新的 node.js（16.0 或更高版本的）后，执行下面的语句
npm create vue@latest
```

```bash
#将应用发布到生产环境时
npm run build
```

```bash
# 需要安装 Node.js 及 sever
npm install serve

# 启动一个本地的 HTTP 服务器
npx serve
```

### Vue 的使用

Vue 的开发构建版本 --- 由于安全原因，ES 模块只能通过 http:// 协议工作，而不能通过 file:// 协议工作，

```html
<div id="app">{{ message }}</div>

<!-- 
借助 script 标签直接通过 CDN 来使用 Vue
Tip: 将无法使用单文件组件 (SFC) 语法
-->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- 
通过 CDN 以及原生 ES 模块使用 Vue
Tip: CDN URL 指向的是 Vue 的 ES 模块构建版本。
-->
<script type="module">
  import {
    createApp,
    ref
  } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

  createApp({
    setup() {
      const message = ref('Hello Vue!');
      return {
        message
      };
    }
  }).mount('#app');
</script>

<!--
使用导入映射表 (Import Maps) 来告诉浏览器如何定位到导入的 vue
Tip: 导入映射表是一个相对较新的浏览器功能，且使用的是导入库的 ES 模块版本
-->
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<script type="module">
  import { createApp, ref } from 'vue';

  createApp({
    setup() {
      const message = ref('Hello Vue!');
      return {
        message
      };
    }
  }).mount('#app');
</script>
```

### 创建 Vue 应用

1. 应用实例

   ```javascript
   // createApp 函数创建应用实例
   import { createApp } from 'vue';

   const app = createApp({
     /*根组件选项*/
   });
   ```

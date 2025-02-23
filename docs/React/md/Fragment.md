# Fragment

## 引言

Fragment （文档碎片）容器存在于内存中，容器中的内容不直接显示在页面中，更新完真实 DOM 元素后，才被显示。

使用场景:
当父组件中调用了较多子组件，就有可能造成虚拟 DOM 元素的重复，可以利用 Fragment 解决。

---

## Virtual Root Syntax

1. `React.Fragment`

   ```ts
   import { React } from 'react'
   function App() {
     return <React.Fragment><React.Fragment>
   }
   export default App
   ```

2. `<></>`

   ```ts
   import { React } from 'react'
   function App() {
     return <><>
   }
   export default App
   ```

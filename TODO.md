# TODO

- ✅
- ❎
- ⚠️

## FEATURE

- HTTPS 本地服务支持
- 应用构建输出，安装界面与选项优化
- 应用启动时的 loading 效果
- iconify 的使用
- 事件监听模块整理 - message | window | document
- 主进程与渲染进程通信模块整理
  - sender 模式无返回值，但可能需要一个执行标识与执行状态的反馈
- PIXI 示例编辑器
  - Scene 解析模块
    - Index 索引方式更改为 ID 索引方式
    - 原数据 - 易读写数据 - Pixi 数据之间代理关系与处理模块
  - 场景渲染
  - 编辑操作
    - 编辑控件
    - 拖拽操作
    - 组件之间的数据交互与同步协作模块设计
    - API 命令
    - 状态管理
    - 保存
  - 保存与导出 - JSON | PNG 格式
  
## BUG

- ✅ Rspack 配置调整与优化 - 目前不支持 development 模式，开发环境下编译运行报错
- ✅ 部分引入无法使用 import 引入，需要使用 require 引入。如 express - **使用 `import  * as xxx from "xxx"` 引入**
- ✅ 构建应用的时候报错 `⨯ ENOENT: no such file or directory, scandir 'xxx/app/node_modules/@mapbox/node-pre-gyp'  failedTask=build stackTrace=Error: ENOENT: no such file or directory, scandir '/Users/HuaYing/Desktop/resources/Local/ER/app/node_modules/@mapbox/node-pre-gyp'`  - **降低 electron 版本**
- ⚠️ 启动时候报错 `Error: Cannot find module 'xxx/ER/gulpfile.ts'` - **调整 node 版本 - 建议 22.14**

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
- 推荐算法
- 断点续传
- 编译后的代码都是压缩的，可读性差，需要在开发模式下看到源代码映射

## Record

- 借助 Canvas 的 API 创建九宫格模式精灵对象
- Store 存储方式更改为 Zustand 或者采用其他的方式
- ThreeJS 农场
- 废弃 store manager 模块，而是采用 Redux \ Context 进行状态管理 - 数据缓存不是 react 推荐的做法
- 事件管理模块重构优化
- 渲染区在窗口尺寸发生变化时不重新创建，而是重新绘制网格与标尺，减少不必要的性能消耗
- 为 Redux、Render Props Pattern、Container/Presentational Pattern、Hooks Pattern、Compound Pattern、 Higher Order Component Pattern 的应用添加实例测试

## BUG

- ✅ Rspack 配置调整与优化 - 目前不支持 development 模式，开发环境下编译运行报错
- ✅ 部分引入无法使用 import 引入，需要使用 require 引入。如 express - **使用 `import  * as xxx from "xxx"` 引入**
- ✅ 构建应用的时候报错 `⨯ ENOENT: no such file or directory, scandir 'xxx/app/node_modules/@mapbox/node-pre-gyp'  failedTask=build stackTrace=Error: ENOENT: no such file or directory, scandir '/Users/HuaYing/Desktop/resources/Local/ER/app/node_modules/@mapbox/node-pre-gyp'`  - **降低 electron 版本**
- ⚠️ 启动时候报错 `Error: Cannot find module 'xxx/ER/gulpfile.ts'` - **调整 node 版本 - 建议 22.14**
- ✅ 画布滚动缩放时，有时会出现画布错乱 - 如：网格线错格、重复 - **（可能）清除的时机不正确**
- ✅ 标尺刻度值显示不正确 - **值的显示不需要考虑画布缩放**
- ✅ 左侧标尺刻度显示偏离主刻度线太多 - **设置文本的旋转锚点为 0.5**
- ✅ 画布缩放时，layer 图层元素的坐标存在偏移的情况 - **不能直接把节点设置在 layer 图层，然后去设置 layer 的缩放**

# BUG

- ⚠️ 启动时候报错 `Error: Cannot find module 'xxx/ER/gulpfile.ts'` - **调整 node 版本 - 建议 22.14**
- ✅ Rspack 配置调整与优化 - 目前不支持 development 模式，开发环境下编译运行报错
- ✅ 部分引入无法使用 import 引入，需要使用 require 引入。如 express - **使用 `import  * as xxx from "xxx"` 引入**
- ✅ 构建应用的时候报错 `⨯ ENOENT: no such file or directory, scandir 'xxx/app/node_modules/@mapbox/node-pre-gyp'  failedTask=build stackTrace=Error: ENOENT: no such file or directory, scandir '/Users/HuaYing/Desktop/resources/Local/ER/app/node_modules/@mapbox/node-pre-gyp'`  - **降低 electron 版本**
- ✅ 画布滚动缩放时，有时会出现画布错乱 - 如：网格线错格、重复 - **（可能）清除的时机不正确**
- ✅ 标尺刻度值显示不正确 - **值的显示不需要考虑画布缩放**
- ✅ 左侧标尺刻度显示偏离主刻度线太多 - **设置文本的旋转锚点为 0.5**
- ✅ 画布缩放时，layer 图层元素的坐标存在偏移的情况 - **不能直接把节点设置在 layer 图层，然后去设置 layer 的缩放**
- ✅ 重构后，构建完成打开时报错 `jsonp_chunk_loading:85 Uncaught ReferenceError: global is not defined` - **更改 web 代码的 target 由 electron-renderer 改为 web**
- ✅ 编译后的代码都是压缩的，可读性差，需要在开发模式下看到源代码映射 - **更改 loader 为 swc-loader**
- ✅ PIXI 创建的时机有问题，初次进入页面多创建了 canvas 元素，页面的网格与标尺不显示 - **pixi application 未正确的销毁，再次进入发生报错引起的**
- ✅ 升级 biome 依赖后，配置报错 - **执行`npx @biomejs/biome migrate --write`命令进行升级**
- ⚠️ 将 electron 部分引入更改为 "electron/main" 或 "electron/renderer" 或 "electron/common" 时，编译报错 - **将electron子模块引入更改为 "electron"**

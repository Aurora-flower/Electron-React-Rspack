# TODO

- ✅
- ❎
- ⚠️

## FEATURE

- HTTPS 本地服务支持
- 应用构建输出，安装界面与选项优化
- 应用启动时的 loading 效果
- iconify 的使用

## BUG

- ✅ Rspack 配置调整与优化 - 目前不支持 development 模式，开发环境下编译运行报错
- ✅ 部分引入无法使用 import 引入，需要使用 require 引入。如 express - **使用 `import  * as xxx from "xxx"` 引入**
- ✅ 构建应用的时候报错 `⨯ ENOENT: no such file or directory, scandir 'xxx/app/node_modules/@mapbox/node-pre-gyp'  failedTask=build stackTrace=Error: ENOENT: no such file or directory, scandir '/Users/HuaYing/Desktop/resources/Local/ER/app/node_modules/@mapbox/node-pre-gyp'`  - **降低 electron 版本**
- ⚠️ 启动时候报错 `Error: Cannot find module 'xxx/ER/gulpfile.ts'` - **调整 node 版本 - 建议 22.14**

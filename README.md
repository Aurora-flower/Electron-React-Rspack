# Electron-React-Rspack

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Aurora-flower/Electron-React-Rspack)
[![GitHub license](https://img.shields.io/github/license/Aurora-flower/Electron-React-Rspack?style=for-the-badge)](https://github.com/Aurora-flower/Electron-React-Rspack/blob/main/LICENSE)

## 前言

该项目旨在学习如何结合 **Electron** 和 **React** 构建桌面应用，并使用 **Rspack** 作为构建工具。它是一个基础的示范项目，适用于希望了解如何在桌面应用中使用现代 Web 技术的开发者。

**PS**:

在不断学习的过程中，细节可能会有所调整。未来，我会不断补充和融入在日常工作中接触到的技术栈，并尽量保持代码的可复用性。

**`Sponsor` 按钮是无用的，只是为了显示在 GitHub 仓库上，请忽略。**

---

**Email: `yanl_802@163.com`**

**WIKI: [Electron-React-Rspack](https://deepwiki.com/Aurora-flower/Electron-React-Rspack)**

---

**Chinese** | [English](./README.EN.md)

---

## 基本介绍

### 适用人群

- **初学者**：适合刚接触 Electron 或 React 的开发者作为学习和实践的入门项目。项目中我尽量添加清晰规范的注释，并封装一些常用函数和日常开发中常见的方法，帮助提高理解和使用效率。
- **中高级开发者**：本项目也适合作为基础模板，开发者可以基于此项目进行功能拓展和架构优化。

### 历史版本与最新分支 📌

- 请通过 `tags` 查看历史版本
- `main` 分支为最新版本，`dev` 分支为上个大迭代的版本， `future` 分支为下个大迭代的版本， `next` 分支为下个小迭代的版本。

### 补丁策略

- 使用 `electron-builder` 与 `electron-updater` 实现增量更新。
- 使用 `patch-package`，用于持久化修改 `node_modules` 中的第三方库(依赖包)的问题。

---

## 快速开始

1. 安装依赖

    ```shell
    npm install

    # 安装新依赖
    npm install --no-save-dev [package-name] # prod
    npm install [package-name] # dev

    # 查看依赖可用版本
    npm show [package-name] versions
    ```

2. 运行项目

    ```shell
    npm run dev
    ```

3. 提交修改

    ```shell
    # 提交格式 - [类型](模块名称|功能命名): 修改描述
    git commit -m "feat(file): 文件处理模块"
    ```

**注意** 📢:

每次执行 `commit` 时会触发 `pre-commit` 钩子，钩子中执行预定义的脚本命名，并检查 `commit` 信息是否符合规范。当存在错误，则会阻止提交。

**可以使用 `-n/--no-verify` 选项来跳过钩子。对于没有此标志的命令，请使用 `HUSKY=0` 暂时禁用钩子。**

**提示**:

如果出现以下错误，请将 node 版本更改为 22.14.0 版本。（比如: **[nvm](https://nvm.p6p.net/)** 工具）

```text
Error: Cannot find module 'xxx/gulpfile.ts'
```

---

## 安装问题

1. electron 的安装

由于网络错误，请尝试添加以下环境变量：

```text
# 废弃 (deprecated) - 可通过配置环境变量的方式来设置
electron_mirror=https://npmmirror.com/mirrors/electron/
electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/
```

---

## 自签名证书

使用 OpenSSL 一键生成私钥和证书（无密码保护）

```shell
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365 -subj "/CN=localhost"
```

---

## 相关链接 🔗

### 技术栈分层

#### 1. 核心框架

- **跨平台框架**
  - [📚 Electron](https://www.electronjs.org/zh/docs/latest/)
  - [📱 Electron-Updater](https://builder.electron.js.cn/auto-update.html)

- **前端框架**
  - [🎮 React](https://zh-hans.react.dev/learn)
  - [🍓 React Router](https://reactrouter.remix.org.cn/start/data/routing)
  - [📝 React Reference](https://react.dev/reference/react)

- **服务端框架**
  - [🖼️ Node.js](https://nodejs.cn/api/)
  - [🌴 Express](https://www.expressjs.com.cn/)
  <!-- - [📦 Redis](https://redis.io/docs/getting-started/) -->
  <!-- - [🔰 Redis](https://www.redis.net.cn/) -->
  - [👻 Sqlite](https://sqlite.readdevdocs.com/)

#### 2. 图形渲染层

- **2D渲染引擎**
  - [🧊 Pixi.js](https://pixi.nodejs.cn/8.x/guides/basics/getting-started)
  - [🎯 Pixi.js 示例](https://pixi.nodejs.cn/examples)
  - [🍀 Pixi.js 图形 API](https://pixijs.download/release/docs/scene.Graphics.html)
  - [⚡ PIXI 文本样式编辑器](https://text-style.pixijs.io)
  - [🧠 Pixi.js 库 API](https://api.pixijs.io/index.html)
  - [🏹 Pixi.js UI](https://pixijs.io/ui/)
  - [🛡 Fabric.js](https://fabricjs.cc/)

- **3D渲染引擎**
  - [🍉 Three.js](https://threejs.org/manual/#zh/fundamentals)
  - [📷 Three.js 编辑器](https://threehub.cn/editor/)

#### 3. 辅助工具

- **日志系统**
  - [🧸 Electron Logger](https://github.com/megahertz/electron-log)
  <!-- - [🎁 Log4js](https://github.com/log4js-node/log4js-node) -->

- **存储与缓存**
  - [🏁 Electron-Store](https://github.com/sindresorhus/electron-store)
  - [🤡 Redux](https://cn.redux.js.org/)
  - [🙀 Redux-Persist](https://github.com/rt2zz/redux-persist)
  <!-- - [😽 Valtio](https://valtio.dev/) -->
  - [😻 Zustand](https://awesomedevin.github.io/zustand-vue/docs/introduce/start/zustand)

- **国际化**
  - [🌎 i18next](https://www.i18next.com/)
  - [🍔 react-i18next](https://react.i18next.com/)

#### 3. 构建工具链

- **应用打包**
  - [🛍️ Electron Builder](https://www.electron.build/)
  - [🧪 Rspack](https://rspack.dev/zh/)

- **任务自动化**
  - [🌱 Gulp](https://gulp.nodejs.cn/)

- **代码编译**
  - [🦋 BabelJS](https://www.babeljs.cn/docs/)

#### 4. UI组件体系

- **组件库**
  - [🟢 PrimeReact UI](https://primereact.cn/installation/)
  - [🔴 Douyin Semi UI](https://semi.design/zh-CN/start/getting-started)

- **样式方案**
  - [🛏️ Tailwindcss](https://tailwindcss.com/)
  - [🎉 Animate.css](https://animate.style/)
  - [🎨 Motion](https://motion.dev/docs/react-quick-start)
  - [👾 Framer motion](https://motion.framer.wiki/introduction)

- **图标方案**
  - [👽 iconify](https://icon-sets.iconify.design/)
  - [📂 fontawesome](https://fontawesome.com.cn/v5)
  - [👹 iconfont](https://www.iconfont.cn/)

### 辅助集

- **electron 扩展功能**
  - [🔑 electron-shortcut-normalizer](https://npm.io/package/electron-shortcut-normalizer)

- **开发辅助**
  - [🟪 wait-on](https://npm.io/package/wait-on)
  - [🟩 patch-package](https://npm.io/package/patch-package)
  - [🟥 cross-env](https://npm.io/package/cross-env)
  - [🟨 npm-run-all2](https://npm.io/package/npm-run-all2)

- **运行辅助**
  - [🔧 archiver](https://npm.io/package/archiver)
  - [🛑 asar](https://npm.io/package/asar)
  - [🖋️ fs-extra](https://npm.io/package/fs-extra)
  - [🔔 lodash](https://www.lodashjs.com/)
  - [❌ rimraf](https://npm.io/package/rimraf)
  - [🚫 yauzl](https://npm.io/package/yauzl)

- **前端工作台**
  - [💭 storybook](https://storybook.org.cn/)

---

### 开发支持体系

#### 1. 质量保障

- **代码规范**
  - [🧳 Biome](https://biomejs.dev/zh-cn/)
  - [📦 ESLint](https://zh-hans.eslint.org/)

- **Git工作流**
  - [🔄 Husky](https://husky.nodejs.cn/get-started.html)

#### 2. 调试监控

#### 3. 依赖管理

- **包管理器**
  - [✈️ npm](https://npm.nodejs.cn/)
  - [⭐️ npm 镜像](https://npm.io/)
  - [🚗 package.json 规范](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)

- **环境管理**
  - [💎 nvm](https://nvm.p6p.net/)
  - [💡 npm 镜像](https://npmmirror.com/)

---

### 专项技术领域

#### 1. 图形技术栈

- **底层图形API**
  - [🍎 WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)
  - [🍕 WebGPU](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGPU_API)
  - [🛶 WebAssembly](https://developer.mozilla.org/zh-CN/docs/WebAssembly)

- **性能优化**
  - [🔒 Chromium 渲染引擎](https://www.chromium.org/chromium-projects/)

#### 2. 前端工程化

- **现代JS特性**
  - [🔥 ES6核心指南](https://es6.ruanyifeng.com/)
  - [🌙 JavaScript基础](https://www.w3ccoo.com/js/js_intro.html)

- **数据转换**
  - [🕹️ 数据格式工具](https://transform.tools/)

#### 3. 安全体系

- **内容安全**
  - [🐶 CSP策略](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

- **证书管理**
  - [🌟 OpenSSL](https://slproweb.com/products/Win32OpenSSL.html)

---

### 学习资源网络

#### 1. 文档中心

- **技术文档**
  - [🐱 MDN Web Docs](https://developer.mozilla.org/zh-CN/)
  - [🏠 TypeScript文档](https://www.typescriptlang.org/docs/)

- **规范标准**
  - [🌈 贡献者公约](https://www.contributor-covenant.org/)

#### 2. 社区生态

- **开发社区**
  - [🏆 GitHub](https://docs.github.com/zh/get-started)
  - [☕️ 掘金社区](https://juejin.cn/)

- **技术博客**
  - [💥 David Walsh博客](https://davidwalsh.name)

#### 3. 可视化资源

- **3D资源站**
  - [🎶 Web3D中文网](http://www.webgl3d.cn/)

- **徽章服务**
  - [🌻 Shields.io](https://shields.io/)

---

### 扩展工具集

#### 智能工具

- **AI辅助开发**
  - [🤖 AI 对话工具](https://chat18.aichatos98.com/#/chat)

### 技术资源集

- **技术博客**
  - [🦄 JS Blog](https://davidwalsh.name)

- **可视化资源**
  - [🎶 Web3D Three](http://www.webgl3d.cn/)
  - [🌻 Shields](https://shields.io/)

- **其他**
  - [💬 GitHub](https://docs.github.com/zh/get-started)

### 社区资源集

- **开发社区**
  - [🏆 GitHub](https://github.com/)
  - [👨‍💻 Stack Overflow](https://stackoverflow.com/)
  - [☕️ 掘金](https://juejin.cn/)

#### 工具集

- **工具**
  - [🛠️ Codesandbox](https://codesandbox.io/)
  - [➰ Unicode 彩色符号](https://www.tsfhdq.cn/mfzj/3491.html)

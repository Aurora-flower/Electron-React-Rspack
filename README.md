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

**注意**:

每次执行 `commit` 时会触发 `pre-commit` 钩子，钩子中执行预定义的脚本命名，并检查 `commit` 信息是否符合规范。当存在错误，则会阻止提交。

**可以使用 `-n/--no-verify` 选项来跳过钩子。对于没有此标志的命令，请使用 `HUSKY=0` 暂时禁用钩子。**

**提示**:

如果出现以下错误，请将 node 版本更改为 22.14.0 版本。（比如: **[nvm](https://nvm.p6p.net/)** 工具）

```text
Error: Cannot find module '/Users/HuaYing/Desktop/resources/Local/ER/gulpfile.ts'
```

## 安装问题

1. electron 的安装

由于网络错误，请尝试添加以下环境变量：

```text
# 废弃 (deprecated) - 可通过配置环境变量的方式来设置
electron_mirror=https://npmmirror.com/mirrors/electron/
electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/
```

## 自签名证书

使用 OpenSSL 一键生成私钥和证书（无密码保护）

```shell
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365 -subj "/CN=localhost"
```

---

## 相关链接

### 技术栈分层

#### 1. 核心框架

- **跨平台框架**

  - Electron 相关:

    - [📚 Electron](https://www.electronjs.org/zh/docs/latest/)
    - [📱 Electron-Updater](https://builder.electron.js.cn/auto-update.html)
    - [🏁 Electron-Store](https://github.com/sindresorhus/electron-store)
    - [🛍️ Electron Builder](https://www.electron.build/)
    - [🧸 Electron Logger](https://github.com/megahertz/electron-log)

- **前端**

  - React 相关:

    - [🎮 React](https://zh-hans.react.dev/learn)
    - [🍓 React Router](https://reactrouter.remix.org.cn/start/data/routing)
    - [🌍 React Reference](https://react.dev/reference/react)

- **后端**

  - 本地服务:

    - [🖼️ Node.js](https://nodejs.cn/api/)
    - [🌴 Express](https://www.expressjs.com.cn/)

#### 2. 图形渲染

- **2D渲染引擎**

  - PixiJS 相关:
    - [🧊 Pixi.js](https://pixi.nodejs.cn/8.x/guides/basics/getting-started)
    - [🎯 Pixi.js Example](https://pixi.nodejs.cn/examples)
    - [🍀 Pixi.js API](https://pixijs.download/release/docs/scene.Graphics.html)
    - [⚡ PIXI Text Editor](https://text-style.pixijs.io)
    - [🧠 Pixi.js Library API](https://api.pixijs.io/index.html)

- **3D渲染引擎**

  - [🍉 Three.js](https://threejs.org/manual/#zh/fundamentals)
  - [📷 Three Editor](https://threehub.cn/editor/)

#### 3. 构建体系

- **打包工具**

  - [🌱 Gulp](https://gulp.nodejs.cn/)
  - [🧪 Rspack](https://rspack.dev/zh/)

- **编译工具**

  - [🦋 BabelJS](https://www.babeljs.cn/docs/)

#### 4. UI 体系

- **组件库**

  - [🟢 Prime React UI](https://primereact.cn/installation/)

- **样式方案**

  - [🛏️ Tailwindcss](https://tailwindcss.com/)
  - [🎉 Animate.css](https://animate.style/)

---

### 功能维度

#### 1. 开发工具

- **调试工具**

  - [🧸 Electron Logger](https://github.com/megahertz/electron-log)

- **代码质量**

  - [🧳 Biome](https://biomejs.dev/zh-cn/)
  - [📦 Eslint](https://zh-hans.eslint.org/)
  - [🔄 Husky](https://husky.nodejs.cn/get-started.html)

- **包管理**

  - [✈️ NPM](https://npm.nodejs.cn/)
  - [🚗 NPM package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)
  - [💡 NPM Mirror](https://npmmirror.com/)
  - [💎 NVM](https://nvm.p6p.net/)

#### 2. 部署发布

- **打包工具**

  - [🛍️ Electron Builder](https://www.electron.build/)

#### 3. 文档资源

- **学习网站**

  - [🖋️ W3School](https://w3schools.org.cn/)

- **技术文档**

  - [🐱 MDN](https://developer.mozilla.org/zh-CN/)
  - [🏠 TypeScript](https://www.typescriptlang.org/docs/)

- **规范标准**

  - [🌈 Contributor Covenant](https://www.contributor-covenant.org/)
  - [🐶 MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

- **安全证书**

  - [🌟 OpenSSL for Windows](https://slproweb.com/products/Win32OpenSSL.html)

#### 4. 其他

- **參考资源**

  - [🎁 Log4](https://github.com/log4js-node/log4js-node)
  - [⚡ PIXI Text Editor](https://text-style.pixijs.io)

---

### 专项技术领域

#### 1. Web图形技术

- **底层API**

  - [🍎 MDN WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)
  - [🍕 MDN WebGPU](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGPU_API)
  - [🛶 MDN WebAssembly](https://developer.mozilla.org/zh-CN/docs/WebAssembly)

#### 2. 前端进阶

- **JavaScript核心**

  - [🔥 ES6 Blog](https://es6.ruanyifeng.com/)
  - [🌙 W3school JavaScript](https://www.w3ccoo.com/js/js_intro.html)

- **性能优化**

  - [🔒 Chromium](https://www.chromium.org/chromium-projects/)

#### 3. 工具资源

- **辅助工具**

  - [🕹️ Data Transform Tools](https://transform.tools/)

- **AI工具**

  - [🤖 AI Chat](https://chat18.aichatos98.com/#/chat)

---

### 社区资源

- **开发社区**

  - [🏆 GitHub](https://github.com/)
  - [👨‍💻 Stack Overflow](https://stackoverflow.com/)
  - [☕️ 掘金](https://juejin.cn/)

- **技术博客**

  - [⭐JS Blog](https://davidwalsh.name)

- **可视化资源**

  - [🎶 Web3D Three](http://www.webgl3d.cn/)
  - [🌻 Shields](https://shields.io/)

- **其他**

  - [💬 GitHub](https://docs.github.com/zh/get-started)
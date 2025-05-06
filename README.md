# Electron-React-Rspack

[![GitHub license](https://img.shields.io/github/license/Aurora-flower/Electron-React-Rspack?style=for-the-badge)](https://github.com/Aurora-flower/Electron-React-Rspack/blob/main/LICENSE)

## 前言

该项目旨在学习如何结合 **Electron** 和 **React** 构建桌面应用，并使用 **Rspack** 作为构建工具。它是一个基础的示范项目，适用于希望了解如何在桌面应用中使用现代 Web 技术的开发者。

**PS**:

在不断学习的过程中，细节可能会有所调整。未来，我会不断补充和融入在日常工作中接触到的技术栈，并尽量保持代码的可复用性。

**`Sponsor` 按钮是无用的，只是为了显示在 GitHub 仓库上，请忽略。**

---

**Email: `yanl_802@163.com`**

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

---

## 相关文档

### 相关技术栈

- [🖼️ Node.js](https://nodejs.cn/api/)
- [📚 Electron](https://www.electronjs.org/zh/docs/latest/)
- [🎮 React](https://zh-hans.react.dev/learn)
- [🍓 React Router](https://reactrouter.remix.org.cn/start/data/routing)
- [🌱 Gulp](https://gulp.nodejs.cn/)
- [🧪 Rspack](https://rspack.dev/zh/)
- [🧊 Pixi.js](https://pixi.nodejs.cn/8.x/guides/basics/getting-started)
- [🍉 Three.js](https://threejs.org/manual/#zh/fundamentals)
- [🌴 Express](https://www.expressjs.com.cn/)
- [🧸 Electron Logger](https://github.com/megahertz/electron-log)
- [🛍️ Electron Builder](https://www.electron.build/)
- [🎉 Animate.css](https://animate.style/)
- [🟢 Prime React UI](https://primereact.org/)

<!-- [🎁 Log4](https://github.com/log4js-node/log4js-node) -->
<!-- [🏁 Electron-Store](https://github.com/sindresorhus/electron-store) -->

---

### 其他相关

- [🔒 Chromium](https://www.chromium.org/chromium-projects/)
- [🌙 W3school JavaScript](https://www.w3ccoo.com/js/js_intro.html)
- [🏠 TypeScript](https://www.typescriptlang.org/docs/)
- [✈️ NPM](https://npm.nodejs.cn/)
- [🚗 NPM package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)
- [🌍 React Reference](https://react.dev/reference/react)
- [🌻 Shields](https://shields.io/)
- [🦋 BabelJS](https://www.babeljs.cn/docs/)
- [🐱 MDN](https://developer.mozilla.org/zh-CN/)
- [🐶 MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [🍎 MDN WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)
- [🍕 MDN WebGPU](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGPU_API)
- [🛶 MDN WebAssembly](https://developer.mozilla.org/zh-CN/docs/WebAssembly)
- [🧳 Biome](https://biomejs.dev/zh-cn/)
- [🌈 Contributor Covenant](https://www.contributor-covenant.org/)
- [📦 Eslint](https://eslint.org/)
- [⭐JS Blog](https://davidwalsh.name)
- [💡 NPM Mirror](https://npmmirror.com/)
- [🔥 ES6 Blog](https://es6.ruanyifeng.com/)
- [💬 GitHub](https://docs.github.com/zh/get-started)
- [🌟 OpenSSL for Windows](https://slproweb.com/products/Win32OpenSSL.html)
- [💎 NVM](https://nvm.p6p.net/)

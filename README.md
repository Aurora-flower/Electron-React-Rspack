# Electron-React-Rspack

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Aurora-flower/Electron-React-Rspack)
[![GitHub license](https://img.shields.io/github/license/Aurora-flower/Electron-React-Rspack?style=for-the-badge)](https://github.com/Aurora-flower/Electron-React-Rspack/blob/main/LICENSE)

## 前言

> 学习使用 **Electron + React + Rspack** 构建桌面应用的基础模板，适合探索现代 Web 技术在桌面端的应用。

**说明**：

- 项目持续迭代，代码结构可能调整
- 保持核心功能模块的可复用性
- ⚠️ Sponsor 按钮仅为占位符，并无赞助渠道

**项目状态说明**：

- 当前项目仍处于开发迭代阶段，部分模块实现与整体架构存在差异
- 如遇到功能问题或设计缺陷，欢迎通过 [Issues](https://github.com/Aurora-flower/Electron-React-Rspack/issues) 提出讨论
- 后续将持续引入工业级技术实践，优化代码复用性和架构一致性

---

**邮箱**：<yanl_802@163.com>  
**文档**：[Electron-React-Rspack Wiki](https://deepwiki.com/Aurora-flower/Electron-React-Rspack)  
**英文** | [English](./README.EN.md)

---

**贡献者公约**：

请遵循 [Contributor Covenant](https://www.contributor-covenant.org/) 准则

---

## 核心功能

### 编辑器项目

| 项目         | 状态   | 技术栈    | 功能描述                          |
|--------------|--------|-----------|-----------------------------------|
| **2D 编辑器** | 进行中 | PixiJS    | 解析 Cocos2.x 场景文件，也支持创建与导出 json 格式项目   |
| **3D 编辑器** | 规划中 | ThreeJS   | 解析 Unity/Cocos3.x 场景文件，也支持创建与导出 json 格式项目      |

**输出能力**：

- 创建 json 格式项目，支持与 cocos、unity 的文件互转
- 生成结构化 JSON
- 资源文件覆盖/预览图生成
- 对源文件直接修改

---

## 快速开始

### 安装与运行

```shell
# 安装依赖
npm install --legacy-peer-deps  # 推荐使用兼容模式

# 启动开发环境
npm run dev

# 单独安装模块（默认添加至 devDependencies）
npm install --no-save-dev [package-name] # prod
npm install [package-name] # dev

# 查看依赖可用版本
npm show [package-name] versions
```

**提示**:

_如果出现以下错误，请将 node 版本更改为 22.14.0 版本。（如: **[nvm](https://nvm.p6p.net/)** 工具）_

### Git 操作

```shell
# 添加远程仓库
git remote add origin <remote-url>

# 提交代码（强制规范 - [类型](模块名称|功能命名): 修改描述）
git commit -m "feat(file): 新增文件处理模块"

# 推送代码并跟踪远程分支
git push --set-upstream origin <branch>

# 放弃本地所有提交
git reset --hard <remote/branch>
```

**注意** 📢:

_每次执行 `commit` 时会触发 `pre-commit` 钩子，钩子中执行预定义的脚本命名，并检查 `commit` 信息是否符合规范。当存在错误，则会阻止提交。_

**可以使用 `-n/--no-verify` 选项来跳过钩子。对于没有此标志的命令，请使用 `HUSKY=0` 暂时禁用钩子。**

### 自签名证书

当需要启动 https 服务时，使用 OpenSSL 一键生成私钥和证书并修改配置。

```shell
# 生成私钥和证书（无密码保护）
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365 -subj "/CN=localhost"
```

### 更新策略

- 增量更新
  electron-builder + electron-updater 自动更新

- 热修复
  patch-package 持久化修复第三方依赖

---

## 相关链接 🔗

### 技术栈分层

#### 1. 核心框架

- **跨平台框架**
  - [📚 Electron](https://www.electronjs.org/zh/docs/latest/)
  - [📱 Electron-Updater](https://builder.electron.js.cn/auto-update.html)
  - [💤 Electron 版本发布](https://releases.electronjs.org/)

- **前端框架**
  - [🎮 React](https://zh-hans.react.dev/learn)
  - [🍓 React Router](https://reactrouter.remix.org.cn/start/data/routing)
  - [📝 React Reference](https://react.dev/reference/react)

- **服务端框架**
  - [🖼️ Node.js](https://nodejs.cn/api/)
  - [🌴 Express](https://www.expressjs.com.cn/)
  - [👻 Sqlite](https://sqlite.readdevdocs.com/)

#### 2. 图形渲染层

- **2D渲染引擎**
  - [🧊 Pixi.js](https://pixi.nodejs.cn/8.x/guides/basics/getting-started)
  - [🎯 Pixi.js 示例](https://pixi.nodejs.cn/examples)
  - [🍀 Pixi.js - V8 版本 API](https://pixijs.download/release/docs/index.html)
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
  <!-- - [🐳 PrimeVue UI](https://primevue.org/) -->
  - [🔴 Douyin Semi UI](https://semi.design/zh-CN/start/getting-started)

- **样式方案**
  - [🛏️ Tailwindcss](https://tailwindcss.com/)
  - [🎉 Animate.css](https://animate.style/)
  - [🎨 Motion](https://motion.dev/docs/react-quick-start)
  - [👾 Framer motion](https://motion.framer.wiki/introduction)
  - [💦 CSS Tricks](https://css-tricks.com/)

- **图标方案**
  - [👽 iconify](https://icon-sets.iconify.design/)
  - [📂 fontawesome](https://fontawesome.com.cn/v5)
  - [👹 iconfont](https://www.iconfont.cn/)
  
- **Css方案**
  - [💣 Epic Loading](https://epic-spinners.vuestic.dev/)
  - [💫 fly63 Loading](https://fly63.com/tool/loading/)
  - [🧡 CSS Loader 3D](https://css-loaders.com/3d/)

- **资源素材**
  - [💤 设计 - 素材库](https://www.uisdc.com/)

---

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
  - [🌙 JavaScript 基础](https://www.w3ccoo.com/js/js_intro.html)

- **数据转换**
  - [🕹️ 数据格式工具](https://transform.tools/)

#### 3. 安全体系

- **内容安全**
  - [🐶 CSP 策略](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

- **证书管理**
  - [🌟 OpenSSL](https://slproweb.com/products/Win32OpenSSL.html)

---

### 学习资源网络

#### 1. 文档中心

- **技术教程集合**
  - [💟 菜鸟教程](https://www.runoob.com/)
  - [💨 W3School](https://www.w3ccoo.com/)
  - [🐮 W3School](https://w3schools.org.cn/)

- **技术文档**
  - [🐱 MDN Web Docs](https://developer.mozilla.org/zh-CN/)
  - [🏠 TypeScript 文档](https://www.typescriptlang.org/docs/)
  - [🗯 阮一峰 ES6 文档](https://www.bookstack.cn/read/es6-3rd/sidebar.md)
  - [💌 设计模式](https://www.patterns.dev/#/patterns)
  - [☠ 廖雪峰 JavaScript 教程](https://liaoxuefeng.com/books/javascript/quick-start/index.html)
  - [✉️ 现代 JavaScript 教程](https://zh.javascript.info/)
  - [🎅 React-three-fiber](https://fiber.framer.wiki/)
  
- **社区文档**
  - [😼 Github 社区文档]( https://docs.github.com/zh/get-started)
  - [🏉 苹果官方文档](https://developer.apple.com/documentation)

- **规范标准**
  - [🌈 贡献者公约](https://www.contributor-covenant.org/)

#### 2. 社区生态

- **开发社区**
  - [🏆 GitHub 文档](https://github.com/)
  - [☕️ 掘金社区](https://juejin.cn/)
  - [🖇 Stack Overflow](https://stackoverflow.com/)

- **技术博客**
  - [💥 David Walsh 博客](https://davidwalsh.name)
  - [👳 CSS 可视化](https://blog.poetries.top/css-reference)
  - [💘 Node 指南 - 博客](https://blog.poetries.top/node-learning-notes/)

- **社区资源**
  - [📤 GitHub 趋势](https://github.com/trending)

#### 3. 可视化资源

- **3D资源站**
  - [🎶 Web3D中文网](http://www.webgl3d.cn/)

- **徽章服务**
  - [🌻 Shields.io](https://shields.io/)

---

### 扩展工具集

- **AI辅助开发**
  - [🤖 AI 对话工具](https://chat18.aichatos98.com/#/chat)

- **前端工作台**
  - [💭 storybook](https://storybook.org.cn/)

---

### 技术资源集

- **技术博客**
  - [🐭 前端进阶之旅](https://interview.poetries.top/)
  - [🦄 JS Blog](https://davidwalsh.name)

- **可视化资源**
  - [🎶 Web3D Three](http://www.webgl3d.cn/)
  - [🌻 Shields](https://shields.io/)

- **其他**
  - [🧚 VanillaJS](http://vanilla-js.com/)
  - [💬 GitHub](https://docs.github.com/zh/get-started)
  - [🤾 WebAssembly](https://webassembly.org/)
  - [⚡️ 浏览器插件开发](https://developer.chrome.com/docs/extensions/mv3/getstarted/)

### 社区资源集

- **开发社区**
  - [🏆 GitHub](https://github.com/)
  - [👨‍💻 Stack Overflow](https://stackoverflow.com/)
  - [☕️ 掘金](https://juejin.cn/)

#### 工具集

- **工具**
  - [🛠️ Codesandbox](https://codesandbox.io/)
  - [➰ Unicode 彩色符号](https://www.tsfhdq.cn/mfzj/3491.html)
  - [🌍 JSON 在线解析格式化](https://json.fans/cn)

- **API**
  - [🦷 夏柔免费 API 接口](https://api.aa1.cn/)
  - [👀 网易云音乐接口](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)
  - [🚖 服务测试](https://httpbin.org/)

- **开发环境**
  - [🐅 Node 环境下载](https://nodejs.org/zh-cn/download)

---

### 扩展语言学习

- [🧙 Python](https://docs.python.org/)
- [👼 Python 文档](https://docs.python.org/zh-cn/3/)
- [🦸 Rust](https://www.rust-lang.org/zh-CN)

---

### 其他资源

- [🧘 Google Labs](https://labs.google/)
- [🐒 konva.js](https://konvajs.org/)
- [🦍 html2canvas - HTML 元素转图片](https://www.html2canvas.cn/)
- [🐿 snapdom - HTML 元素转图片](https://zumerlab.github.io/snapdom/)
- [📦 Redis](https://redis.io/docs/getting-started/)
- [🔰 Redis](https://www.redis.net.cn/)
- [🧛 Puppeteer](https://pptr.nodejs.cn/)

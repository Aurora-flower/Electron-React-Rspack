# Rspack

## 引言

> webpack 是目前最为成熟的构建工具，有着活跃的生态，灵活的配置和丰富的功能，但是其最为人诟病的是其性能问题，尤其在一些大型项目上，构建花费的时间可能会达到几分钟甚至几十分钟，性能问题是目前 webpack 最大的短板。
> **因此 Rspack 解决的问题核心就是 webpack 的性能问题。**

---

### 安装

1. 脚手架

   Rspack CLI 是对标 webpack CLI 的工具，提供基础的 serve 和 build 构建命令。

   ```shell
   # Rspack CLI 示例项目
   npm create rspack@latest
   ```

2. 手动安装

   ```shell
   npm install -D @rspack/core @rspack/cli
   ```

### 生态

- `Rspress`

  Rspress 是一个基于 Rsbuild、React 和 MDX 的静态站点生成器，内置了一套默认的文档主题，可以通过 Rspress 来快速搭建一个文档站点，同时也可以自定义主题，来满足个性化静态站需求，比如博客站、产品主页等。

- `Rslib`

  Rslib 是一个基于 Rsbuild 的 npm 库开发工具，它复用了 Rsbuild 精心设计的构建配置和插件系统，使开发者能够以简单直观的方式创建 JavaScript 库。

- `Rsdoctor`

  Rsdoctor 是一个针对 Rspack 的构建分析器，可以直观地展示构建过程，例如编译时间、编译前后的代码变化、模块引用关系、重复模块等。

  如果需要排查构建产物或构建时编译问题，可以使用 Rsdoctor。

- `Modern.js`

  Modern.js 是一个基于 Rspack 实现的渐进式 React 框架，支持嵌套路由、服务器端渲染（SSR）和模块联邦，并提供开箱即用的 CSS 解决方案。

- `Nx`

  Nx 是一个强大的开源构建系统，提供了工具来提升生产力、优化 CI 性能和维护代码质量。

  Rspack 团队与 Nx 团队合作提供了 Rspack Nx 插件。该插件包含在 Nx Workspace 中管理 Rspack 项目的执行器、生成器和实用工具。

- `Docusaurus`

  Docusaurus 是一个用于快速构建、部署和维护开源项目网站的工具。

  Docusaurus v3.6 支持使用 Rspack 作为打包工具，详见 Docusaurus Faster。

- `Storybook`

  Storybook Rsbuild 允许使用 Rsbuild 作为 Storybook 的构建工具，并提供了 React 和 Vue 等 UI 框架的集成。

- `Nuxt`

  Nuxt 是一个开源框架，提供了直观且可扩展的方式来使用 Vue.js 创建类型安全、高性能和生产级的全栈 Web 应用程序和网站。

  Nuxt v3.14 引入了对 Rspack 的官方支持，详见 Nuxt 3.14。

- `Re.Pack`

  Re.Pack 是一个用于构建 React Native 应用的工具集。

  Re.Pack v5 使用 Rspack 和 React Native 社区 CLI 的插件系统，允许使用 Rspack 打包应用，并轻松切换到 Metro。

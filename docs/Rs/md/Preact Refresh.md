# Preact Refresh

## 引言

`@rspack/plugin-preact-refresh` 插件是为 `Rspack` 打包工具提供支持，使其能够在开发过程中启用 Preact 的热更新（Hot Module Replacement，HMR）功能，类似于 React 的热更新。

注意📢:
在 `1.0.0` 以下版本, Rspack 不支持在 `swc-loader` 中使用 `preact` 特有转换。

请使用 `builtin:swc-loader` 并在配置中添加 `rspackExperiments.preact: {}` 以开启 preact 特有转换。

---

### 主要功能和作用

1. **热模块替换 (HMR) 支持**：

   - 插件的核心功能是支持 Preact 的热更新。热更新允许你在开发过程中修改代码后，立即看到效果，而不需要刷新页面。这样可以显著提高开发效率，尤其是在开发过程中频繁修改 UI 或逻辑时。
   - Preact 是一个轻量级的前端框架，与 React 类似，但体积更小，因此适合需要优化性能或减小文件体积的项目。

2. **集成 Preact 的快速开发体验**：
   - `@rspack/plugin-preact-refresh` 插件使得 Preact 在开发模式下，具备类似于 React 的快速反馈机制，能够保持状态并且更新 UI，同时避免页面刷新。
   - 当你修改 Preact 组件时，插件会自动刷新更改的部分，而不重新加载整个页面。

### 背景

- `Rspack` 是一个现代化的前端打包工具，类似于 Webpack。它针对性能进行了优化，尤其是在开发模式下，能够提供更快速的构建和更新。
- `Preact` 是一个和 React API 兼容的轻量级框架，通常用于需要性能优化的小型项目，特别是在移动端或低资源环境下。

### 总结

`@rspack/plugin-preact-refresh` 插件的作用就是在使用 `Rspack` 作为打包工具的项目中启用 Preact 的热更新功能，提升开发时的实时反馈能力，改善开发体验。

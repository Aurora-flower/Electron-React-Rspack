# Rsbuild 与 Rspack 的区别

## 引言

`rsbuild` 和 `rspack` 都是 JavaScript 或前端构建工具，但它们有一些关键的区别。

- Rsbuild 和 Rspack 的关系:

Rspack 是 Rsbuild 底层的打包工具。
Rsbuild 的目标是为 Rspack 用户提供开箱即用的构建能力，使开发者能够在零配置的情况下启动一个 web 项目。

- Rspack 和 Rsbuild 的主要区别在于：

  - Rspack 项目需要从零开始配置；Rsbuild 默认提供了最佳实践的配置，并支持扩展 Rspack 配置。
  - Rspack 项目需要接入社区中的 loaders 和 plugins 来支持各种场景；Rsbuild 提供官方插件，默认支持常见的前端框架和构建能力。
  - Rspack CLI 的能力对标 webpack CLI，功能比较精简；而 Rsbuild 提供更强大的 CLI 和更完善的 dev server。

---

### rsbuild

- rsbuild 是一个基于 Rust 编写的构建工具，专注于性能优化，尤其在编译速度上有很大的提升。它的目标是为了提高前端开发中的构建效率，特别适合大规模的项目。
- 它的设计非常简单，并且提供了灵活的配置选项，旨在取代一些传统的 JavaScript 编写的构建工具（比如 Webpack 或 Rollup）。

### rspack

- rspack 是一个类似于 Webpack 的构建工具，也基于 Rust 实现，目的是为了解决 JavaScript 构建工具在性能上的瓶颈。
  与 rsbuild 不同的是，rspack 在功能上更为全面，它提供了与 Webpack 类似的功能，例如支持模块打包、代码拆分、插件系统等。
- rspack 目标是成为 Webpack 的替代品，通过 Rust 的高性能来提升构建速度，同时保留 Webpack 的灵活性和可扩展性。

### 关键区别

- 性能优化：
  两者都通过 Rust 提高构建速度，但 rspack 更像是 Webpack 的高效替代品，而 rsbuild 更注重轻量和简单的构建体验。
- 功能性：
  rspack 提供更多与 Webpack 相似的功能和配置选项，适合需要较高自定义和复杂配置的项目；而 rsbuild 更简洁，适用于较为简单或快速的构建需求。

总结来说，rspack 更为功能齐全，适合需要 Webpack 替代方案的项目，而 rsbuild 则是轻量级、专注于提升速度的构建工具。

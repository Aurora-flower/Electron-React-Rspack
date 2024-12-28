/**
 * @summary 应用进程结构定义
 * @description
 * - `Main`: 主进程
 * - `Preload`: 预加载进程
 * - `Renderer`: 渲染进程
 */
const AppProcess = {
  Main: 'Main',
  Preload: 'Preload',
  Renderer: 'Renderer'
};

/**
 * @summary 构建环境
 * @description
 * - `none`: 不进行构建
 * - `development`: 开发环境
 * - `production`: 生产环境
 */
const BuildingEnvironment = {
  None: 'none',
  Dev: 'development',
  Prod: 'production'
};

/**
 * @summary Webpack 资源模块的模块类型
 * @description
 * 资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。
 *
 * webpack 5 之前，使用 loader:
 *  - `raw-loader` 将文件导入为字符串
 *  - `url-loader` 将文件作为 data URI 内联到 bundle 中
 *  - `file-loader` 将文件发送到输出目录
 * @remarks
 * - 资源模块类型(asset module type):
 *   - `asset/resource`: 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现。
 *   - `asset/inline`: 导出一个资源的 data URI。之前通过使用 `url-loader` 实现。
 *   - `asset/source`: 导出资源的源代码。之前通过使用 `raw-loader` 实现。
 *   - `asset`: 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 u`rl-loader`，并且配置资源体积限制实现。
 */
const AssetType = {
  Resource: 'asset/resource',
  Inline: 'asset/inline',
  Source: 'asset/source',
  Auto: 'asset' /* 当 size <= 8kb 时，使用 asset/inline，否则使用 asset/resource */
};

module.exports = { AssetType, AppProcess, BuildingEnvironment };

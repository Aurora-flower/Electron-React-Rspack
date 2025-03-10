# CHANGE LOG

    工具: `standard-version`
    命令生成: `standard-version --release-as xxx`

## [0.0.1] - 2025-02-19

### Added

- 初始化 Electron + React 项目脚手架
- 集成核心技术栈:
  - Electron@27.1.3
  - React@18.2.0
  - TailwindCSS@3.4.0
- 配置工程化工具链:

  - Gulp + Webpack 构建流水线
  - ESLint（Airbnb 规范）
  - Prettier 代码格式化
  - Husky Git 钩子集成

### Infrastructure

- 搭建基于 Gulp 的任务管理系统
- 配置 Webpack 5 模块打包方案
- 实现开发/生产环境双模式构建

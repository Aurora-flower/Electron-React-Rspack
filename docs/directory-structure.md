# 项目目录结构文档 - Project Directory Structure Document

## 概述 - Overview

本文档详细描述了项目的目录结构及其功能，帮助开发人员理解代码组织和文件用途。

`This document details the project's directory structure and its functions, helping developers understand code organization and file purposes.`

---

## 根目录结构 - Root Directory Structure

| 目录/文件 | 类型 | 说明 |
|-----------|------|------|
| .config/ | 目录 | 项目配置文件存放目录，包含环境变量配置(.env系列文件) |
| .github/ | 目录 | GitHub相关配置，包括ISSUE模板和FUNDING信息 |
| core/ | 目录 | 核心功能模块，包含资源、脚本和模板等 |
| docs/ | 目录 | 项目文档，包含架构说明和使用指南 |
| gulpfile.ts/ | 目录 | Gulp构建脚本，包含任务配置和工具函数 |
| logs/ | 目录 | 项目日志文件，包括Bug记录、Issue跟踪和发布计划 |
| public/ | 目录 | 静态资源目录，存放HTML入口文件和公共资源 |
| source/ | 目录 | 源代码目录，包含Electron主进程、预加载脚本和Web应用代码 |
| types/ | 目录 | TypeScript类型定义文件 |
| electron-builder.yml | 文件 | Electron打包配置 |
| package.json | 文件 | 项目依赖和脚本配置 |
| rspack.config.ts | 文件 | Rspack构建配置 |

---

## 核心目录详细说明 - Core Directory Details

### 1. 配置相关目录 - Configuration Directories

#### .config/

- 存放项目环境配置文件
- `.env`: 基础环境变量
- `.env.dev`: 开发环境变量
- `.env.prod`: 生产环境变量

#### gulpfile.ts/

- `common/`: 通用配置和工具函数
  - `structure.ts`: 项目目录结构定义
- `tasks/`: 构建任务定义
  - `compile.ts`: 编译任务
  - `dev.ts`: 开发环境任务
- `rs/`: Rspack相关配置

### 2. 源代码目录 - Source Code Directories

#### source/

- `electron/`: Electron主进程代码
  - `main.ts`: 应用入口文件
  - `handlers/`: IPC事件处理器
  - `services/`: 业务服务
- `preload/`: 预加载脚本
  - `index.ts`: 预加载入口
- `web/`: Web应用代码(渲染进程)
  - `App.tsx`: React应用根组件
  - `main.ts`: Web应用入口
  - `components/`: UI组件
  - `plugins/`: 第三方库初始化(如PixiJS、ThreeJS)

### 3. 资源目录 - Resource Directories

#### public/

- `index.html`: HTML入口文件
- `resource/`: 静态资源
  - `pages/`: 页面模板
  - `scripts/`: 前端脚本

#### core/resources/

- `fonts/`: 字体文件
- `icons/`: 图标资源
- `images/`: 图片资源
- `tables/`: 表格数据

### 4. 构建和脚本目录 - Build & Script Directories

#### scripts/

- `beforePack.js`: Electron打包前脚本
- `build/`: 构建相关脚本
- `utils/`: 文件操作工具函数

#### core/scripts/

- 多语言脚本目录
  - `javascript/`: JavaScript脚本
  - `python/`: Python脚本
  - `rust/`: Rust代码
  - `shell/`: Shell脚本

### 5. 类型定义目录 - Type Definition Directory

#### types/

- `common/`: 通用类型定义
- `electron/`: Electron相关类型
- `web/`: Web应用类型
- `global.d.ts`: 全局类型扩展

---

## 其他重要目录 - Other Important Directories

### logs/

- 项目日志文件
- `Bug.md`: Bug记录
- `Issue.md`: 问题跟踪
- `Release.md`: 发布说明
- `TODO.md`: 待办事项

### docs/

- 项目文档
- `directory-structure.md`: 目录结构说明(本文档)

---

## 目录结构设计原则 - Directory Structure Design Principles

1. **分离关注点** - 主进程、预加载脚本和渲染进程代码分离
2. **资源集中管理** - 静态资源和核心资源分类存放
3. **构建流程清晰** - 构建脚本模块化，便于维护
4. **类型安全** - 完善的TypeScript类型定义
5. **环境隔离** - 开发/生产环境配置分离

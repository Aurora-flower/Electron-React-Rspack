# ChangeLog - 变更日志

> 遵循语义化版本（SemVer）规范，按版本倒序排列（最新版本在上）

## `[Unreleased]`
>
> （可选）预留区块，记录已提交但未发布的变更

## `[0.0.1]` - 2025-07-16

### ✨ 新增

- 初始化项目基础架构
- 引入核心模块：
  - `.husky` 提交规范约束
  - `gulpfile.ts` 构建流程
- 实现进程隔离目录结构：
  - `source/main` (主进程)
  - `source/renderer` (渲染进程)
  - `source/preload` (预加载脚本)

### 🚧 实验性模块（暂不可用）
>
> 说明：以下模块处于早期阶段，功能未完备

- `core/` - 核心运行时模块（含环境管理/脚本引擎/扩展机制）
- `submodules/PythonWork` - Python 功能模块（API/爬虫/文件处理）
- `submodules/RustWork` - Rust 功能模块（API/系统级操作）

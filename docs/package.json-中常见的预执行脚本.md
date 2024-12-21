---
layout: post
title: package.json 中常见的预执行脚本
date: 2024-12-17 14:41:12
categories: [扩展]
tags: [package.json, 扩展学习]
---

> 在 package.json 的 scripts 部分，有一些特殊的生命周期脚本会在特定的时间自动执行。
> 这些脚本通常在安装依赖包之前或之后运行。

以下是一些常见的预执行脚本：

- `preinstall`: 在 `npm install` 命令执行之前运行。
- `prepare`: 在 `npm install` 命令执行之后，或者在发布包之前运行。它实际上是 `prepublish`, `prepare`, 和 `postpublish` 的组合。
- `prepublish`: 在 `npm publish` 命令执行之前运行。注意📢：从 npm 7 开始，`prepublish` 被弃用，建议使用 `prepare`。
- `prepublishOnly`: 在 `npm publish` 命令执行之前运行，并且不会在本地安装时触发。
- `preuninstall`: 在 `npm uninstall` 命令执行之前运行。
- `preversion`: 在 `npm version` 命令执行之前运行。
- `prescriptname`: 对于任何自定义脚本 scriptname，可以在其前面加上 pre 前缀来创建一个预执行脚本。例如，如果有一个 build 脚本，可以添加一个 prebuild 脚本来在其之前运行。

示例：

```json
{
  "scripts": {
    "preinstall": "echo 'Running preinstall script'",
    "install": "echo 'Running install script'",
    "postinstall": "echo 'Running postinstall script'",
    "prebuild": "echo 'Running prebuild script'",
    "build": "echo 'Running build script'",
    "postbuild": "echo 'Running postbuild script'"
  }
}
```

当运行 npm install 时，脚本的执行顺序将是：

- `preinstall`
- `install`
- `postinstall`

同样地，当运行 npm run build 时，脚本的执行顺序将是：

- `prebuild`
- `build`
- `postbuild`

这些预执行脚本可以帮助在特定的操作之前执行一些准备工作，比如编译代码、设置环境变量、清理缓存等。

---
layout: post
title: ASAR 文件的解压缩
date: 2024-06-30 04:58:07
categories: [扩展]
tags: [Asar, 扩展学习]
---

ASAR（Archive for ASar）归档是一种专为 Electron 应用设计的简单扩展存档格式。它旨在缓解 Windows 平台上的长路径名问题，提升`require`速度，并保护源代码不被轻易修改。

> ASAR通过将文件夹结构打包成一个二进制文件，简化了 Electron 应用的资源文件管理。这种格式便于分发和部署应用，同时也提供了性能和安全性方面的改善。
>
> 使用 ASAR 格式的主要好处包括减少文件数量和大小，加快文件访问速度。在 Electron 应用中，由于模块加载机制，使用 ASAR 格式可以减少文件 I/O 操作，从而提高`require`速度。
>
> 此外，ASAR 格式通过打包资源文件，可以防止用户直接修改应用的内部文件，从而提高安全性。然而，这并不意味着 ASAR 提供了高级别的安全防护，有经验的用户或攻击者仍然可能找到绕过的方法。

#### 安装 asar 工具

```shell
# 全局安装
npm install -g asar
```

#### 压缩与解压

1. **解压**:

   ```shell
   #  extract|e <archive> <dest>            extract archive
   asar extract app.asar(源asar文件) app(目标解压文件夹)
   ```

2. **压缩**:

   ```shell
   #  pack|p [options] <dir> <output>       create asar archive
   asar pack app(目标解压文件夹) app.asar(源asar文件)
   ```

### 其他命令

1. **列出归档文件与目录**:

   ```shell
   #  list|l [options] <archive>            list files of asar archive
   asar list app.asar(源asar文件)
   ```

2. **提取单个文件**:

   ```shell
   #  extract-file|ef <archive> <filename>  extract one file from archive
   asar extract-file app.asar(源asar文件) file.*(目标文件)
   ```

---

**相关文档**：
[Electron Asar 归档](https://electron.nodejs.cn/docs/latest/tutorial/asar-archives/)

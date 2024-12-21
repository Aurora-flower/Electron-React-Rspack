---
layout: post
title: PyInstaller-打包-Py-脚本
date: 2024-12-17 14:41:12
categories: [扩展]
tags: [Py 打包, PyInstaller, 扩展学习]
---

> 将 Python 脚本打包为 `.exe` 文件是将 Python 程序转换为 Windows 可执行文件的过程。
>
> 这样，就不需要在目标机器上安装 Python 解释器即可运行的程序。
> 最常见的工具是 `PyInstaller`、`cx_Freeze` 和 `py2exe`。
>
> 这里介绍如何使用 `PyInstaller` 打包 Python 脚本为 `.exe` 文件。

### 使用 PyInstaller 将 Python 脚本打包为 `.exe` 文件

1. **安装 PyInstaller**

首先，确保已经安装了 `PyInstaller`。可以使用 `pip` 来安装它：

```shell
pip install pyinstaller
```

2. **准备 Python 脚本**

假设有一个 Python 脚本，例如 `myscript.py`。

3. **使用 PyInstaller 打包**

打开命令行（Windows 中是 `cmd` 或 PowerShell），然后导航到包含 `myscript.py` 文件的目录。执行以下命令来打包脚本：

```shell
pyinstaller --onefile myscript.py
```

- `--onefile`：将所有依赖文件打包成一个单独的 `.exe` 文件。没有这个选项时，PyInstaller 会生成多个文件（例如 `.exe` 文件和一些动态链接库文件）。
- `myscript.py`：这是要打包的 Python 脚本。

4. **查看生成的 `.exe` 文件**

打包完成后，PyInstaller 会在当前目录下创建一个 `dist` 文件夹。可以在该文件夹中找到打包好的 `.exe` 文件。

```plaintext
dist/
  └── myscript.exe
```

5. **运行 `.exe` 文件**

现在，可以在 Windows 环境下直接运行 `myscript.exe`，而无需安装 Python。

### 可选的 PyInstaller 参数

- **添加图标**：可以为 `.exe` 文件添加一个图标，使用 `--icon` 选项。例如，假设有一个图标文件 `icon.ico`，可以这样做：

```shell
pyinstaller --onefile --icon=icon.ico myscript.py
```

- **不显示命令行窗口**：如果的脚本是图形界面应用（例如使用 `tkinter` 或 `PyQt`），可以隐藏命令行窗口（在 Windows 中会显示一个控制台窗口）。使用 `--noconsole` 选项：

```shell
pyinstaller --onefile --noconsole myscript.py
```

- **增加文件依赖**：如果的脚本需要外部文件（如配置文件、数据文件等），可以使用 `--add-data` 选项来包含这些文件。比如：

```shell
pyinstaller --onefile --add-data "datafile.txt;." myscript.py
```

这里 `datafile.txt` 是要包含的文件，`;.` 表示将文件放在生成的 `.exe` 文件所在目录下。注意，Linux/Mac 上的分隔符是 `:` 而不是 `;`。

### 常见问题和解决方案

- **缺少模块**：在运行打包后的 `.exe` 文件时，可能会遇到缺少模块的错误。可以通过安装缺失的模块，或者在打包时通过 `--hidden-import` 选项显式指定缺失的模块。例如：

```shell
pyinstaller --onefile --hidden-import=module_name myscript.py
```

- **打包失败**：如果遇到打包失败或异常，可以使用 `--debug` 选项来获取更多的调试信息：

```shell
pyinstaller --onefile --debug all myscript.py
```

- **文件太大**：生成的 `.exe` 文件可能比较大，因为 PyInstaller 会将 Python 解释器和所有依赖项打包到一起。如果文件过大，可以尝试使用 `--strip` 选项来减少文件大小：

```shell
pyinstaller --onefile --strip myscript.py
```

### 总结

使用 PyInstaller 可以方便地将 Python 脚本打包为 Windows 上的 `.exe` 文件。只需简单的命令就可以将整个应用程序打包成一个独立的可执行文件，方便分发和部署。

# Electron

## 开发问题记录

1. electron 安装时，总是因为网络问题，导致安装失败。

**解决方式**:

配置代理变量，解决网络问题。

- **在 Windows 系统下**:

  - 打开“系统属性”（右键点击“此电脑” > “属性” > “高级系统设置”）。
  - 点击“环境变量”。
  - 在“系统变量”或“用户变量”中点击“新建”。
  - 设置变量名为 `ELECTRON_MIRROR`，值为 `https://npmmirror.com/mirrors/electron/`，然后保存。

- **在 macOS 系统下**:

打开终端，运行以下命令来设置环境变量：

```shell
export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
```

> 如果希望每次启动终端时自动设置此变量，可以将上述命令添加到 .bash_profile 或 .zshrc 文件(末尾)中。
>
> - 使用 nano，按 `Ctrl + O` 保存文件，然后按 `Ctrl + X` 退出。
> - 使用 vim，按 `Esc` 键，然后输入 `:wq` 并按回车键保存并退出。
> - 使用 code，直接保存文件并关闭编辑器。

```shell
# 直接打开文件
open ~/.zshrc
open ~/.bash_profile

# 文本编辑器打开 (nano、vim 或 code（Visual Studio Code）)
nano ~/.zshrc
nano ~/.bash_profile
```

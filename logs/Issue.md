# Issue

## 安装问题

1. electron 的安装

    如果网络错误，请尝试添加以下环境变量：

    ```text
    # 废弃 (deprecated) - 可通过配置环境变量的方式来设置
    electron_mirror=https://npmmirror.com/mirrors/electron/
    electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/
    ```

2. install 错误

    由于 audit 提示风险，所以安装时报错并提示使用 `--force` 或 `--legacy-peer-deps` 的选项。

    ```text
    # 一般使用兼容安装
    npm install --legacy-peer-deps
    ```

    **PS: 哪怕不主动更新依赖，并固定版本，也会有错误提示。所以通过固定版本避免风险提示的方式行不通。**

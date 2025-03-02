# Windicss

      Windicss 是一个快速、小巧且功能强大的 CSS 工具包，旨在提供更高效的 CSS 开发体验。

Windicss 中文文档: <https://cn.windicss.org/guide/>

1. 安装

    ```shell
    npm install -D windicss vite-plugin-windicss
    ```

2. 配置

    ```TypeScript
    // vite.config.ts
    import WindiCSS from 'vite-plugin-windicss'
   
   export default defineConfig({
    plugins: [
     vue(),
     WindiCSS(),
     ],
    })
   
    // main.ts
    import 'windi.css' // 根据实际路径引入
    ```

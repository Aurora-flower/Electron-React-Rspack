# Gulp

## 引言

自动化并增强工作流程的工具包

利用 Gulp 和 JavaScript 的灵活性来自动执行缓慢、重复的工作流，并将其组合成高效的构建管道。

> **gulpfile 详解**
>
> gulpfile 是项目目录下名为 `gulpfile.js` （或者首字母大写 `Gulpfile.js`）的文件，在运行 `gulp` 命令时会被自动加载。
>
> Node 的模块的解析功能允许将 `gulpfile.js`' 文件替换为同样命名为 `gulpfile.js` 的目录，该目录中包含了一个名为 `index.js` 的文件，该 `index.js` 文件将被当作 `gulpfile.js` 使用。
>
> 如果使用了转译器（transpiler），需要给文件夹和目录相应地命名。

---

### 安装与配置

1. 安装

   ```shell
   # 安装 gulp 命令行工具
   npm install --global gulp-cli

   # 安装 gulp 作为开发时依赖项
   npm install --save-dev gulp
   ```

2. 配置文件与转译

   当使用 TypeScript 或 Babel 编写 gulpfile 文件时，需要进行转译。通过修改 `gulpfile.js` 文件的扩展名来表明所用的编程语言并安装对应的转译模块。

   > Node 的大多数新版本都支持 TypeScript 或 Babel 所提供的大多数功能，但 `import`/`export` 语法除外。
   >
   > 如果只需要改语法的话，请重命名为 `gulpfile.esm.js` 并安装 [esm](https://www.npmjs.com/package/esm) 模块。

   - 对于 TypeScript，重命名为 `gulpfile.ts` 并安装 `ts-node` 模块。
   - 对于 Babel，重命名为 `gulpfile.babel.js` 并安装 `@babel/register` 模块。
   - 使用 ESModule 语法，重命名为 `gulpfile.esm.js` 并安装 `esm` 模块。

   ```shell
   # 安装 ts-node 模块
   npm install --save-dev ts-node

   # 安装 @babel/register 模块
   npm install --save-dev @babel/register

   # 安装 esm 模块
   npm install --save-dev esm
   ```

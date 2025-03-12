# 相关依赖

> `i` == `install`
>
> `-D` == `--save-dev` == `devDependencies` == 开发环境
>
> `-S` == `--save` == `dependencies` == 生产环境

_注意📢_: 每次依赖版本变更时，都应该构建应用进行测试，确认可以再提交。

---

## 依赖安装

### 主要技术栈

> 项目技术栈

```shell

# ***** ***** ***** ***** electron ***** ***** ***** *****
npm install -D electron

npm install -D electron-builder

# npm install -D electron-icon-builder

npm install -D electron-devtools-installer

npm install -S electron-updater

npm install -S electron-log


# ***** ***** ***** ***** 本地服务 ***** ***** ***** *****

npm install -S express

npm install -S koa

npm install -S koa-static

# ***** ***** ***** ***** react ***** ***** ***** *****
npm install -S react

npm install -S react-dom

npm install -S react-router-dom

npm install -D @types/react

npm install -D @types/react-dom

npm install -D @types/react

npm install -D @types/react

# ***** ***** ***** ***** 3D、2D 渲染 ***** ***** ***** *****
npm install -S three

npm install -S fabric


# ***** ***** ***** ***** iconfont ***** ***** ***** *****
npm install -D @iconify/json

npm install -D @iconify/react

# ***** ***** ***** ***** 其他 ***** ***** ***** *****
npm install -S archiver

npm install -S lodash


# 7zip-bin | 7zip-min
npm install -S 7zip-min

npm install -S adm-zip

npm install -D rimraf

npm install -S yauzl

npm install -S yazl

```

> css 实用程序

```shell
# ***** ***** ***** ***** animate ***** ***** ***** *****
npm install -D animate.css

# ***** ***** ***** ***** tailwindcss ***** ***** ***** *****
npm install -D tailwindcss

npm install -D @tailwindcss/cli

npm install -D @tailwindcss/postcss

# ***** ***** ***** ***** postcss ***** ***** ***** *****

npm install -D postcss

npm install -D autoprefixer

npm install -D postcss-import

npm install -D postcss-preset-env

```

> 打包构建工具、任务工具
>
> gulp | esbuild | webpack | rspack | rsbuild

```shell
# ***** ***** ***** ***** gulp ***** ***** ***** *****
npm install -D gulp

# ***** ***** ***** ***** esbuild ***** ***** ***** *****
npm install -D esbuild


# ***** ***** ***** ***** webpack ***** ***** ***** *****
npm install -D webpack

# ==================== 插件 ====================
npm install -D webpack-bundle-analyzer
npm install -D html-webpack-plugin
npm install -D copy-webpack-plugin
npm install -D css-minimizer-webpack-plugin
npm install -D mini-css-extract-plugin

# ==================== Loader ====================
npm install -D css-loader
npm install -D babel-loader
npm install -D postcss-loader
npm install -D ts-loader
npm install -D style-loader
npm install -D file-loader
npm install -D node-loader

npm install -D dotenv-webpack

npm install -D @types/webpack-env

# ***** ***** ***** ***** rsbuild ***** ***** ***** *****
npm install -D @rsbuild/core

npm install -D @rsbuild/plugin-react

# ***** ***** ***** ***** rspack ***** ***** ***** *****
npm install -D @rsdoctor/rspack-plugin

npm install -D @rspack/cli

npm install -D @rspack/core

npm install -D @rspack/plugin-react-refresh

npm install -D image-minimizer-webpack-plugin

npm install -D react-refresh
```

### 语言支持

> typescript

```shell
npm install -D esm

npm install -D node

npm install -D ts-node

npm install -D typescript

npm install -D @types/node
```

> babel

```shell
npm install -D @babel/core

npm install -D @babel/preset-env

npm install -D @babel/preset-react

npm install -D @babel/preset-typescript

```

### 代码辅助工具

> 团队代码规范与风格
>
> husky + commitlint + [lint-staged] | prettier + eslint + [stylelint]

```shell
# ***** ***** ***** ***** 提交验证: husky + commitlint ***** ***** ***** *****
npm install -D husky

npm install -D @commitlint/cli

npm install -D @commitlint/config-conventional

# ***** ***** ***** ***** 代码校验: eslint ***** ***** ***** *****

npm install -D eslint

npm install -D @eslint/compat

npm install -D @eslint/js

npm install -D typescript-eslint

npm install -D @typescript-eslint/parser

npm install -D eslint-plugin-react

npm install -D globals

# ***** ***** ***** ***** 代码格式化（code formatter）: prettier ***** ***** ***** *****
npm install -D prettier

npm install -D @biomejs/biome

```

### 其他

> devlopment tool

```shell
npm install -D asar

npm install -D concurrently

npm install -D cross-env

npm install -D wait-on

npm install -D plop
```

## 安装问题记录

---

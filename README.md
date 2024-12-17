# 项目介绍

    应用程序构建基础：
        - `electron`
        - `react`
        - `webpack`

## 依赖安装

### 依赖介绍

### 安装问题记录

---

## 风格规范

### 提交规范

| 缩写     | 描述                               | 示例                                        |
| -------- | ---------------------------------- | ------------------------------------------- |
| feat     | 添加新功能                         | `feat(user): 添加用户注册功能`              |
| fix      | 修复代码错误                       | `fix(auth): 修复登录失败问题`               |
| docs     | 文档更新                           | `docs(readme): 更新 README 文件`            |
| style    | 代码格式修改，不影响功能           | `style(icons): 统一图标样式`                |
| refactor | 代码重构，不涉及功能增删           | `refactor(components): 重构组件结构`        |
| perf     | 性能优化                           | `perf(api): 优化 API 响应速度`              |
| test     | 增加或修改测试代码                 | `test(unit): 添加单元测试覆盖`              |
| dep      | 工具性依赖的安装与配置             | `dep(linter): 配置 ESLint 规则`             |
| build    | 构建工具或外部依赖变动             | `build(webpack): 升级 Webpack 版本`         |
| ci       | 持续集成配置修改                   | `ci(jenkins): 集成Jenkins持续集成`          |
| chore    | 不影响代码运行的其他改动           | `chore(dependencies): 更新依赖包版本`       |
| revert   | 回滚之前的提交                     | `revert: 撤销上一次提交`                    |
| workflow | 工作流改进或更新                   | `workflow(publish): 自动化发布流程`         |
| mod      | 代码或模块调整，不明确属于其他类型 | `mod(styles): 调整全局样式`                 |
| wip      | 工作进行中，标记开发中提交         | `wip: 开发中，暂未完成`                     |
| types    | 类型定义文件的更改                 | `types(interface): 添加用户接口类型定义`    |
| release  | 版本发布相关改动                   | `release(version): 发布 v1.0.0 版本`        |
| merge    | 分支合并操作                       | `merge(branch): 合并 develop 分支至 master` |
| bug      | 修正非功能性问题或小错误           | `bug(syntax): 修正语法错误`                 |
| del      | 删除代码或文件                     | `del(deprecated): 移除废弃代码`             |
| assets   | 添加资源                           | `asset(icns): 添加一些 Icns 图标资源`       |
| base     | 项目基础构建流程                   | `base(git): 配置\更新 git 忽略文件`         |

---

## 项目架构

### 目录结构

> 字符说明
>
> - `None` 表示暂无此项
> - `Ignore` 被 Git 忽略的
> - `SG` 主动生成目录或文件
> - `UNG` 被动生成目录或文件
> - `File` 表示文件类型
> - `Folder` 表示目录类型
> - `Pedding` 表示后期可能会变动

- **Folder** `.vscode`: vs code 编辑器配置目录
- **Folder-Ignore-SG** `app`: 源码经过编译后的输出目录
- **Folder-Ignore-SG** `backup`: 用于存放本地临时备份文件
- **Folder-Ignore-SG** `cache`: 主进程运行缓存目录
- **Folder** `docs`: 用于学习记录的文档

- **Folder** `extend`: 扩展目录，不被打包进 asar 的目录 (存放在 `app.asar.unpacked`)

  - **Folder** `bin`: 应用程序运行环境目录
    - **Folder** `.cache`: 运行环境的缓存
  - **Folder** `extensions`: 用于存放应用扩展插件，如：react 插件等。
  - **Folder** `polyfill`: 用于提供缺失功能或 API 的技术，使得旧版本的浏览器或环境能够支持现代 JavaScript 特性或浏览器功能。
  - **Folder-Pedding** `external`: 外部文件
  - **Folder-Pedding** `node_modules.asar.unpacked`: 用于存放 extend 中 node js script 的依赖项 (存放在 `app.asar.unpacked`)

- **Folder** `licenses`: 用于存放软件许可协议条款 (多语言版本，如： `LICENSE-chs.rtf` 中简、 `LICENSE-cht.rtf` 中繁、 `LICENSE-jpn.rtf` 日本 等)

- **Folder-Ignore-SG** `private`: 用于存放无法提供开源的隐私文件的目录，只会提供结构及生成方法。

  - **Folder-Ignore-SG** `ssl`: 用于存放 `https` 协议所需要的证书文件
  - **Folder-Ignore-SG** `secret`: 用于存放账户密码等重要文件的目录

- **Folder** `public`: 静态资源文件目录，会被网络托管的文件。

  - **Folder** `assets`: 用于存放静态资源
    - **Folder** `atlas`: 用于存放 `.icns` 文件
    - **Folder** `images`: 用于存放图片

- **Folder-Ignore-SG** `release`: 应用程序构建的输出目录。
- **Folder** `resoures`: 被打包或引入编译的静态文件
  - **Folder** `icon`: 应用图标
  - **Folder** `.config`: 应用配置
- **Folder** `src`: application 源码目录
- **Folder** `temp`: 临时文件目录，希望在 git 提交历史中，不被意外丢失，但没有什么用处。
- **Folder** `template`: 各种学习示例目录
- **Folder** `test`: 各种学习示例目录
- **File** `.gitattributes`: Git 版本控制系统中的一个配置文件，用于指定如何处理文件的属性和行为
- **File** `.gitignore`: git 忽略配置
- **File** `package.json`: npm 配置文件
- **File** `README.md`: 项目介绍
- **File** `LICENSE`: 开源协议 (MIT)
- **File-None** `LICENSE.rtf`: 软件许可协议条款 (中简版本)

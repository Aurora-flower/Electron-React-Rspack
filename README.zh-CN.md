# 项目介绍

## 引言

本项目主要用于学习，旨在基于 `Electron` 实现一个自己的应用。

**PS**:

- 项目涉及的内容较为广泛，需要考虑整体项目结构。我也在摸索一种更好的架构。
- 对于小白开发者来说，本项目可能是有用的，但不会有深度的技术笔记。大佬们可以把它当做乐趣来看待。

**注意📢**: 渲染进程代码中的 `📌` 标记用于标识与主进程配合的处理，方便后期迁移为纯 Web 页面时查找相关代码并进行修改。

---

**中文** | [英文](./README.md)

---

## 风格规范

### 提交规范

| 缩写     | 描述                               | 示例                                        |
| -------- | ---------------------------------- | ------------------------------------------- |
| **feat**     | 添加新功能                         | `feat(user): 添加用户注册功能`              |
| **fix**      | 修复代码错误                       | `fix(auth): 修复登录失败问题`               |
| **docs**     | 文档更新                           | `docs(readme): 更新 README 文件`            |
| **style**    | 代码格式修改，不影响功能           | `style(icons): 统一图标样式`                |
| **refactor** | 代码重构，不涉及功能增删           | `refactor(components): 重构组件结构`        |
| **perf**     | 性能优化                           | `perf(api): 优化 API 响应速度`              |
| **test**     | 增加或修改测试代码                 | `test(unit): 添加单元测试覆盖`              |
| **build**    | 构建工具或外部依赖变动             | `build(webpack): 升级 Webpack 版本`         |
| **ci**       | 持续集成配置修改                   | `ci(jenkins): 集成Jenkins持续集成`          |
| **chore**    | 不影响代码运行的其他改动           | `chore(dependencies): 更新依赖包版本`       |
| **revert**   | 回滚之前的提交                     | `revert: 撤销上一次提交`                    |
| **workflow** | 工作流改进或更新                   | `workflow(publish): 自动化发布流程`         |
| **mod**      | 代码或模块调整，不明确属于其他类型 | `mod(styles): 调整全局样式`                 |
| **wip**      | 工作进行中，标记开发中提交         | `wip: 开发中，暂未完成`                     |
| **types**    | 类型定义文件的更改                 | `types(interface): 添加用户接口类型定义`    |
| **release**  | 版本发布相关改动                   | `release(version): 发布 v1.0.0 版本`        |
| **merge**    | 分支合并操作                       | `merge(branch): 合并 develop 分支至 master` |
| **bug**      | 修正非功能性问题或小错误           | `bug(syntax): 修正语法错误`                 |
| **del**      | 删除代码或文件                     | `del(deprecated): 移除废弃代码`             |
| **assets**   | 添加资源                           | `asset(icns): 添加一些 Icns 图标资源`       |
| **base**     | 项目基础构建流程                   | `base(git): 配置\更新 git 忽略文件`         |
| **editor**   | 编辑器配置与修改                   | `editor(vscode): 配置 vscode`               |

**注意📢**:
每次执行 `commit` 时会触发 `pre-commit` 钩子，钩子中 `shell` 脚本会检查 `commit` 信息是否符合规范，不符合规范则会报错，并阻止提交。

同时，它会执行一下脚本命令:

- `check:audit`: 检查项目的依赖包是否存在安全漏洞。
- `check:out`: 检查项目依赖包是否存在更新。
<!-- - `format`: 格式化项目代码。 -->
- `lint`: 检查项目代码是否符合规范。

**可以使用 `-n/--no-verify` 选项来跳过钩子。对于没有此标志的命令，请使用 `HUSKY=0` 暂时禁用钩子。**

---

## 相关文档

- [Electron](https://www.electronjs.org/zh/docs/latest/)
- [Node.js](https://nodejs.cn/api/)
- [Tailwindcss](https://www.tailwindcss.cn/docs)
- [Eslint](https://zh-hans.eslint.org/docs/latest/use/getting-started)
- [Prettier](https://www.prettier.cn/docs/index.html)
<!-- - [Biome](https://biomejs.dev/zh-cn/guides/getting-started/) -->
- [Typescript](https://www.typescriptlang.org/)
- [ES6](https://www.bookstack.cn/read/es6-3rd/sidebar.md)
- [PixiJS](https://pixijs.com/)
- [Husky](https://husky.nodejs.cn/get-started.html)
- [NPM](https://www.npmjs.com/)


- 🚫
- ✅
- ⭐
- 💡
- 💬
- 🔥
- 🌟
- 🎉
- ❌
- 🟢
- 📢
- 📌
- 💎
- 🔔
- 🛑
- 🎯
- 🏆
- 🕹️
- ⚡
- 🧠
- 🖋️
- 📷
- 📱
- 🎶
- 🛏️
- 🍀
- 💥
- 🦄
- 📦
- 🌈
- 🧳
- 🛶
- 🍕
- 🍎
- 🐶
- 🐱
- 🦋
- 🌻
- 🌍
- 🚗
- ✈️
- 🏠
- 🌙
- 🔒
- 🏁
- 🎁
- 🛍️
- 🧸
- 🌴
- 🍉
- 🧊
- 🧪
- 🌱
- 🍓
- 🎮
- 📚
- 🖼️
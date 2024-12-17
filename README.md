# 项目介绍


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
| assets    | 添加资源                           | `asset(icns): 添加一些 Icns 图标资源`       |
| base    | 项目基础构建流程                           | `base(git): 配置\更新 git 忽略文件`       |


## 项目架构


### 目录结构

```txt
- extend                          ---  不被打包进 asar 的目录                               --- (存放在 `app.asar.unpacked`)
    - icns                        ---
- extensions                      ---  用于存放扩展（项目、文件）
- node_modules.asar.unpacked      ---  用于存放 extend 中 node js script 的依赖项           --- (存放在 `app.asar.unpacked`)
- (File)    .gitignore            ---  git 忽略配置 
- (File)    package.json          ---  npm 配置文件
- (File)    README.md             ---  项目介绍
- (File)    LICENSE               ---  协议 （MIT）
```
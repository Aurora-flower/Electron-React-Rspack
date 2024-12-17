# 项目介绍

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
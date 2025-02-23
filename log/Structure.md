# 项目架构

## 目录结构

> 符号说明
>
> 🟥 暂无
> ⭐️ 不提供，但较重要
> 🟦 待定
> 🟨 被 Git 忽略
> 🟩 由代码运行环境生成
> ⚠️ 输出目录
> 📌 重要

    ```text
    └─┬ .config                               项目配置目录
      └── .env                                项目环境变量配置文件 (Base)
    ├── .husky                                git 提交规范配置目录
    └─┬ .vscode                               vs code 编辑器配置目录
      ├── extensions.json                     vs code 扩展配置文件
      ├── launch.json                         vs code 调试配置文件 🟥
      ├── settings.json                       vs code 设置配置文件
      ├── tasks.json                          vs code 任务配置文件 🟥
      ├── snippets.json                       vs code 片段配置文件 🟥
      └── workspace.json                      vs code 工作区配置文件 🟥
    └─┬ app                                   构建编译输出目录 ⚠️
      ├── electron                            electron 运行目录
      ├── preload                             预加载进程运行目录
      └── public                              渲染进程运行目录
    ├── backup                                本地临时备份文件目录
    └─┬ cache                                 主进程运行缓存目录 🟩
      ├── debug                               调试输出缓存
      └── local                               应用配置缓存
    └─┬ core                                  项目核心目录\扩展目录，应用层环境、主逻辑和核心功能。不被打包进 asar 的目录 (存放在 `app.asar.unpacked`)
      └─┬ bin                                 应用程序运行环境目录 (external)
        ├── .cache                            运行环境的缓存
        ├── Node                              Node 运行环境
        ├── Python                            Python 运行环境
        └── Svn                               SVN 运行环境
      ├── build                               electron 构建相关
      ├── builtin                             内置插件目录，用于存放内置插件，如：electron 插件等。
      ├── extensions                          应用程序扩展目录，用于存放第三方插件，如：react 插件等。
      ├── lib                                 应用程序核心目录
      ├── packages                            包含多个独立的子模块或包
      ├── polyfill                            用于提供缺失功能或 API 的技术，使得旧版本的浏览器或环境能够支持现代 JavaScript 特性或浏览器功能。 🟦
      └─┬ scripts                             用于存放脚本文件。
        ├── javascript                        用于存放 js \ nodejs 脚本文件
        ├── python                            用于存放 python 脚本文件
        └── shell                             用于存放 shell 脚本文件
          ├── bat                             用于存放 bat 脚本文件
          └── sh                              用于存放 sh 脚本文件
      └─┬ private                             用于存放无法提供开源的隐私文件的目录，只会提供结构及生成方法。 ⭐️
        ├── ssl                               用于存放 `https` 协议所需要的证书文件
        ├── temp                              用于存放临时文件
        ├── .env.private                      隐私环境配置
        └── secret.txt                        隐私文本
      └─┬ resoures                            被打包或引入编译的静态文件 (存放在 `app.asar.unpacked`)
        ├── icon                              应用图标
        ├── fonts                             应用字体
        └── images                            应用图片
    ├── docs                                  用于记录某一类型的碎片化文档（未整理版本）
    └─┬ gen                                   用于生成文档、模版的目录 (polp 模板也存放在此目录下)
      ├── docs                                学习文档目录 🟥
      ├── examples                            示例代码目录 🟥
      └── template                            生成底板
    └─┬ gulpfile.js                           gulp 构建工具配置目录
      ├── tasks                               gulp 任务目录
      ├── utils                               gulp 辅助工具目录
      └── webpack                             webpack 构建工具配置目录
    ├── licenses                              用于存放软件许可协议条款 (多语言版本，如： `LICENSE-chs.rtf` 中简、 `LICENSE-cht.rtf` 中繁、 `LICENSE-jpn.rtf` 日本 等)
    └─┬ log                                   日志文件目录
      ├── CHANGELOG                           项目更新日志
      └── dependencies.json                   依赖包版本信息与变动记录
    └─┬ public                                静态资源文件目录
      └─┬ assets                              用于存放静态资源
        ├── atlas                             用于存放 `.icns` 文件
        ├── fonts                             用于存放 js 脚本文件
        └── images                            用于存放图片
      ├── javascripts                         用于存放 js 脚本文件
      ├── stylesheets                         用于存放 css 样式文件
      ├── favicon.ico                         网站 favicon 图标
      └── index.html                          默认首页文件
    ├── release                               应用程序构建的输出目录。
    └─┬ source                                application (src)源码目录
      ├── common                              通用文件，如通用变量、函数等
      ├── electron                            主进程目录
      ├── preload                             预加载进程目录
      ├── src                                 渲染进程目录
      └── types                               类型定义目录
    ├── temp                                  临时文件目录，希望在 git 提交历史中，不被意外丢失，但无用于构建。
    ├── test                                  学习测试
    ├── LICENSE                               开源协议 (MIT)
    ├── LICENSE.rtf                           软件许可协议条款 (En)
    ├── .prettierrc.js                        代码格式化配置文件
    ├── activities                            项目活动目录 🟦
    ├── .gitattributes                        Git 版本控制系统中的一个配置文件，用于指定如何处理文件的属性和行为
    ├── .gitignore                            git 忽略文件
    ├── package.json                          npm 配置文件
    ├── electron-builder.yml                  electron-builder 配置文件
    ├── eslint.config.mjs                     eslint 配置文件
    └── README.md                             项目介绍
    ```

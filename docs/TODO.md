# TODO

> ✅  ❎  ⚠️

---

## Record

### Electron 主进程

1. 通讯方式

    - 窗口之间通讯
    - 渲染进程与主进程的通讯
    - 面板（组件）与窗口的通讯

2. 快捷键绑定

    - 全局按键绑定与逻辑处理

3. 窗口管理

    - ✅ 窗口管理模块，用于查找与创建窗口
    - 窗口操作模块

4. Node 模块 - 将所有 Node 模块都进行封装，用于统一调用（学习）

5. 本地服务

    - ✅ HTTP 本地服务支持
    - HTTPS 本地服务支持

### 渲染进程

- iconify 的使用

- sender 模式无返回值，但可能需要一个执行标识与执行状态的反馈（进行优化）

- 组件之间的通讯

- 借助 Canvas 的 API 创建九宫格模式精灵对象 - 目前是借助 Texture API 实现

- Store 存储方式更改为 Zustand 或者采用其他的方式

- 废弃 store manager 模块，而是采用 Redux \ Context 进行状态管理 - 数据缓存不是 react 推荐的做法

- 事件线束管理模块重构优化 （window 与 document 的监听）

- Web API - 将所有 API 封装成对象，方便调用（学习）

- COS | OSS 对象存储操作模块

#### PixiJS 示例编辑器

1. 设定数据结构

    - 如何区分解析 cocos creator 文件、unity 文件、（内置）自定义的 json 文件，并去创建一个项目？
    - 在 json 数据、container 渲染数据、（cocos、unity）源数据之间怎么去转换、联动修改？

2. 状态栈管理

    - 结构树操作、渲染区操作、属性编辑操作的状态栈管理
    - 最大栈深度
    - 记录修改的次数，用于反馈当前文件是否修改，切换文件时提示是否保存

3. 操作设定

    - 选中框
    - 坐标控制器 - 点击矩形拖拽时随意方向（非 Layout 容器元素），点击坐标拖拽时只能沿着轴线方向
    - 快速操作 - 快速对齐（相对父元素）
    - 节点碰撞检测与吸附效果
    - 节点碰撞对齐辅助线
    - 操作 API 命令管理模块

4. 渲染

    - ✅ 应用初始化模块
    - ✅ 画板初始显示与特殊设置
    - stage 事件 - 右键移动拖动画布
    - stage 事件 - 点击元素选中、拖拽
    - stage 事件 - 滚轮控制画布缩放
    - 节点创建函数 - sprite | text | container | graphics | nineSliceSprite | htmlText
    - 组件之间的数据交互与同步协作模块设计

5. 解析

    - 对于 Cocos 文件，初始化解析数据后，Index 索引方式更改为 ID 索引方式

6. 保存与导出

    - PNG 图片保存 - 用于生成预览图
    - JSON 文件保存 - 自定义处理数据
    - 源文件保存

#### ThreeJS 示例编辑器

- 3D 农场

---

## Learning

### 设计模式

#### React

1. 设计模式

2. 渲染模式

#### Vue

1. 设计模式

2. 渲染模式

3. 性能模式

#### VanillaJS

1. 设计模式

    - Singleton 单例模式
    - Factory 工厂模式
    - Command 命令模式
    - Flyweight 享元模式（轻量级）
    - Observer 观察者模式
    - Mediator/Middleware 中间件模式
    - Proxy 代理模式
    - Minxin 混入模式
    - Module 模块模式
    - Prototype 原型模式
    - Provider 提供者模式
    - Static Import 静态导入模式

2. 渲染模式

3. 性能模式

### 逻辑

- 推荐算法
  - 冷启动池

- 断点续传 (使用 `npx serve` 启动一个服务进行测试)

- 借助 Canvas 的 API 创建九宫格模式精灵对象(**目前是借助 Texture API 实现**)

---

## FEATURE & Optimize

### Example

- Music
- Video
- Voyage
- Todo
- Job

### Service

- Python Django
- Node.js
- Python FastAPI

---

## BUG

- ⚠️ 启动时候报错 `Error: Cannot find module 'xxx/ER/gulpfile.ts'` - **调整 node 版本 - 建议 22.14**
- ✅ Rspack 配置调整与优化 - 目前不支持 development 模式，开发环境下编译运行报错
- ✅ 部分引入无法使用 import 引入，需要使用 require 引入。如 express - **使用 `import  * as xxx from "xxx"` 引入**
- ✅ 构建应用的时候报错 `⨯ ENOENT: no such file or directory, scandir 'xxx/app/node_modules/@mapbox/node-pre-gyp'  failedTask=build stackTrace=Error: ENOENT: no such file or directory, scandir '/Users/HuaYing/Desktop/resources/Local/ER/app/node_modules/@mapbox/node-pre-gyp'`  - **降低 electron 版本**
- ✅ 画布滚动缩放时，有时会出现画布错乱 - 如：网格线错格、重复 - **（可能）清除的时机不正确**
- ✅ 标尺刻度值显示不正确 - **值的显示不需要考虑画布缩放**
- ✅ 左侧标尺刻度显示偏离主刻度线太多 - **设置文本的旋转锚点为 0.5**
- ✅ 画布缩放时，layer 图层元素的坐标存在偏移的情况 - **不能直接把节点设置在 layer 图层，然后去设置 layer 的缩放**
- ✅ 重构后，构建完成打开时报错 `jsonp_chunk_loading:85 Uncaught ReferenceError: global is not defined` - **更改 web 代码的 target 由 electron-renderer 改为 web**
- ✅ 编译后的代码都是压缩的，可读性差，需要在开发模式下看到源代码映射 - **更改 loader 为 swc-loader**
- ✅ PIXI 创建的时机有问题，初次进入页面多创建了 canvas 元素，页面的网格与标尺不显示 - **pixi application 未正确的销毁，再次进入发生报错引起的**
- ✅ 升级 biome 依赖后，配置报错 - **执行`npx @biomejs/biome migrate --write`命令进行升级**

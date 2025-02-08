/**
 * @file app 模块相关属性与事件监听处理及实例方法
 * @description app 模块相关事件处理函数。
 */
import { app } from 'electron';
import { sep, join } from 'node:path';
import { getPlatform } from './platform';

/**
 * 获取 app 模块的属性值。
 * @description
 * - `accessibilitySupportEnabled`:
 *    - 是否启用 Chrome 的辅助功能(无障碍支持)，例如屏幕阅读;
 *    - 默认为 `false`，将此属性设置为 `true` 可启用支持，允许开发人员在应用程序设置中向用户开放无障碍切换;
 *    - **此 API 必须在 ready 事件触发后调用**;
 *    - _**渲染访问权限树可能会严重影响应用的性能**_;
 *    - 仅支持 _`Windows`_ | _`MacOS`_
 *
 * - `applicationMenu`: 获取或设置应用程序菜单;
 *
 * - `badgeCount`:
 *    - 获取或设置当前应用程序的右上角徽章计数(应用角标计数的 Integer 属性);
 *    - 将计数设置为 `0` 将隐藏角标;
 *    - 仅支持  _`Linux`_ | _`MacOS`_;
 *    - 在 `macOS` 上，为该属性设置任何非零整数，会显示在 `dock` 图标上;
 *    - 在 `Linux` 上，这个属性只适用于 Unity 启动器。但是，`Unity` 启动器需要一个 `.desktop` 文件才能工作;
 *    - 在 `macOS` 上，为了使该属性生效，需要确保应用程序具有显示通知的权限;
 *
 * - `commandLine`: (只读) `CommandLine` 对象，允许读取和操作 Chromium 使用的命令行参数;
 *
 * - `dock`:
 *    - (只读) `Dock` | `undefined` 对象，允许在 macOS 上的用户 dock 中对应用图标进行操作;
 *    - 仅支持 _`macOS`_
 *
 * - `isPackaged`:
 *    - (只读) 如果应用程序包被创建，则返回 `true`，否则返回 `false`;
 *    - 对于大多数应用程序，此属性可用于区分开发和生产环境;
 *
 * - `name`:
 *    - 指明当前应用程序的名称，即应用程序 `package.json` 文件中的名称;
 *    - 获取或设置应用程序的名称，默认为 `package.json` 中的 `productName` 或 `name` 字段，
 *      如果没有设置，则默认为 `process.execPath` 的 basename;
 *    - 根据 npm 的命名规则, 通常 `package.json` 中的 `name` 字段是一个短的小写字符串。
 *      通常还应该指定一个 `productName` 字段, 是首字母大写的完整名称，用于表示应用程序的名称。
 *      Electron 会优先使用这个字段作为应用名。
 *
 * - `userAgentFallback`:
 *    - Electron 用于全局回退的用户代理字符串;
 *    - 当用户代理在 `webContents` 或 `session` 级别没有被设置时，将使用此用户代理。
 *      有助于确保的整个应用程序具有相同的用户代理。
 *      在应用初始化中尽早设置为自定义值，以确保使用的是覆盖的值。
 *    - 获取或设置默认的 `User-Agent` 字符串，默认为 `Chromium` 的版本号，
 *      例如 `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) huaying/0.0.1 Chrome/128.0.6613.162 Electron/32.1.2 Safari/537.36`;
 *
 * - `runningUnderARM64Translation`:
 *    - 表明当前应用是否正在使用 `ARM64` 运行环境 (比如 macOS `Rosetta Translator Environment` 或者 Windows `WOW`);
 *    - 当用户在 `Rosetta` 或 `WOW` 下错误地运行 x64 版本时，可以使用此属性提示用户下载应用程序的 `arm64` 版本。
 * @param prop 属性名称
 * @returns 属性值
 */
export async function getAppProperty(
  prop: MainProcess.AppProperty
): Promise<unknown> {
  return app[prop];
}
/**
 * 常规类型事件处理函数，提供添加和移除事件监听器的功能。
 * @param eventName 事件名称
 * @param Listener 事件监听
 * @returns 返回一个函数，调用该函数将移除事件监听器。
 */
export function routineFeature<T>(
  eventName: T,
  Listener: (...args: any) => unknown
) {
  app.on(eventName as any, Listener);

  // 用于移除事件监听器
  return () => {
    app.off(eventName as any, Listener);
  };
}

/**
 * 获取输出路径
 * @param path 输出路径
 * @returns 输出路径
 */
export function getAppAsarOutput(path: string) {
  const AppAsar =
    app.getAppPath(); /* 项目路径 - 打包后对应着的是 app.asar */
  const baseOutput = app.isPackaged ? '' : 'app';
  return join(AppAsar, baseOutput, path);
}

/**
 * 获取应用程序相关路径信息
 * @returns 应用路径
 */
export function getAppPaths(): Record<string, string | boolean> {
  try {
    const paths: {
      [key: string]: string | boolean;
    } = {
      /* 是否打包 */
      packaged: app.isPackaged,

      /* 文件路径分隔符 */
      sep,

      /* 系统平台 */
      platform: getPlatform()
    };

    const about: Array<MainProcess.PathNames> = [
      'home', // 用户主目录
      'appData', // 应用程序数据目录
      'userData', // 用户数据目录
      'sessionData', // 会话数据目录
      'temp', // 临时文件目录
      'exe', // 可执行文件目录
      'module', // 模块目录
      'desktop', // 桌面目录
      'documents', // 文档目录
      'downloads', // 下载目录
      'music', // 音乐目录
      'pictures', // 图片目录
      'videos', // 视频目录
      // 'recent', // 最近访问文件目录 - 仅限于 windows
      'logs' // 日志文件目录
      // 'crashDumps' // 系统崩溃转储文件目录
    ];

    for (let index = 0; index < about.length; index++) {
      const name = about[index];
      paths[name] = app.getPath(name);
    }

    // 自定义工作空间位置
    paths.workspace = join(
      paths.appData as string,
      'com.huaying.app'
    );

    return paths;
  } catch (error) {
    console.error('getAppPath Error:', error);
    return {};
  }
}

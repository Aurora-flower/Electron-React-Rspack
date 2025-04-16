import { app } from "electron";
import { sep, join } from "node:path";
import { getPlatform, isWin } from "@main/helpers/function/platform";

export function getIsPackage() {
  return app.isPackaged;
}

export function getAppInfo() {
  try {
    const info: {
      sep: string;
      packaged: boolean;
      win32: boolean;
      platform: string;
      paths: Record<AppPathTypes, string>;
      workspace: string;
    } = {
      sep,
      packaged: app.isPackaged,
      win32: isWin(),
      platform: getPlatform() as string,
      workspace: "", // 自定义工作空间位置
      paths: {
        home: "", // 用户主目录
        appData: "", // 应用程序数据目录
        userData: "", // 用户数据目录
        sessionData: "", // 会话数据目录
        temp: "", // 临时文件目录
        exe: "", // 可执行文件目录
        module: "", // 模块目录
        desktop: "", // 桌面目录
        documents: "", // 文档目录
        downloads: "", // 下载目录
        music: "", // 音乐目录
        pictures: "", // 图片目录
        videos: "", // 视频目录
        logs: "", // 日志文件目录
        recent: "", // 最近访问文件目录 - 仅限于 windows
        crashDumps: "" // 系统崩溃转储文件目录
      }
    };

    const about = Object.keys(info.paths) as AppPathTypes[];
    for (let index = 0; index < about.length; index++) {
      const name = about[index];
      info.paths[name] = app.getPath(name);
    }
    info.workspace = join(info.paths.appData as string, "com.huaying.app");
    return info;
  } catch (error) {
    return null;
  }
}

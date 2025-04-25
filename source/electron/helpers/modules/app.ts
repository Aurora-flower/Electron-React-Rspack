import { app } from "electron";
import { sep, join } from "node:path";
import {
  getPlatform,
  isWin,
  PLATFORM
} from "@main/helpers/node/process/platform";

const FOLDER_NAMES = {
  Core: "core"
};

const FILE_NAMES = {};

export function getIsPackage() {
  return app.isPackaged;
}

export function getAppInfo() {
  try {
    const appFolder = app.getAppPath();
    const info: AppInfo = {
      name: app.getName(),
      appFolder,
      appUnpackFolder: appFolder.replace("app.asar", "app.asar.unpacked"),
      sep,
      win32: isWin(),
      version: app.getVersion(),
      packaged: app.isPackaged,
      platform: getPlatform() as string,
      paths: {
        home: "",
        appData: "",
        userData: "",
        sessionData: "",
        temp: "",
        exe: "",
        module: "",
        desktop: "",
        documents: "",
        downloads: "",
        music: "",
        pictures: "",
        videos: "",
        logs: "",
        recent: "",
        crashDumps: ""
      },
      core: "",
      workspace: ""
    };

    const about = Object.keys(info.paths) as AppPathTypes[];
    for (let index = 0; index < about.length; index++) {
      const name = about[index];
      info.paths[name] = app.getPath(name);
    }
    info.core = join(info.appUnpackFolder, FOLDER_NAMES.Core);
    return info;
  } catch (error) {
    return null;
  }
}

export function setupAppHooks() {
  app.on("window-all-closed", () => {
    if (getPlatform() !== PLATFORM.darwin) {
      app.quit();
    }
  });
}

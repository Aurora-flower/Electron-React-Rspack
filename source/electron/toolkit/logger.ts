import Logger from "electron-log";

export interface LogOptions {
  id: string;
  sign: string;
  level?: "log" | "error" | "warn" | "info";
}

export function logger(moduleId: string, sign: string, ...args: any[]) {
  // console.log(`>>> Source [ ${moduleId} ] - $_${sign}_$`, ...args);
  Logger.log(`>>> Source [ ${moduleId} ] - $_${sign}_$`, ...args);
}

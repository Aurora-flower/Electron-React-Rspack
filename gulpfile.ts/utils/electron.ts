import { errorMessage } from "./error";
import { spawn, type ChildProcess } from "node:child_process";

class ElectronProcess {
  private static instance: ElectronProcess | undefined;
  private electronProcess: ChildProcess | null = null;

  private constructor() {} // Enforce singleton

  static getInstance(): ElectronProcess {
    if (!this.instance) {
      this.instance = new ElectronProcess();
    }
    return this.instance;
  }

  start(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const electron = require("electron");
      try {
        this.electronProcess = spawn(electron, ["."], {
          stdio: "inherit",
        });

        this.electronProcess
          .on("spawn", () => {
            console.log("[Electron Running...]", this.electronProcess?.pid);
            resolve(true);
          })
          .on("close", (code: number) => {
            console.log(`Subprocess Quit code: ${code}`);
            this.electronProcess = null;
          })
          .on("error", (err: unknown) => {
            console.error("[Electron Error]", errorMessage(err));
            reject(err);
          });

        process.on("uncaughtException", (err: unknown) => {
          console.error("[Uncaught Exception]", errorMessage(err));
          reject(err);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  stop(): Promise<boolean> {
    return new Promise((resolve) => {
      const proc = this.electronProcess;
      if (!proc) return resolve(false);
      proc
        .once("exit", () => {
          console.log(`Stopped Process: ${proc.pid}`);
          this.electronProcess = null;
          resolve(true);
        })
        .kill();
    });
  }
}

export default ElectronProcess;

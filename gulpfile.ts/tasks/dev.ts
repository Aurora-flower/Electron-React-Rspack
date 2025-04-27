import { type WatchOptions, series, watch } from "gulp"
import ElectronProcess from "../utils/electron"
import compile from "./compile"

const instance = ElectronProcess.getInstance()

// const onceCompile = () => compile(false);
const watchCompile = () => compile(false)

async function Run() {
  // series(instance.stop(), instance.start())
  await instance.stop()
  await instance.start()
  console.log("[electron reload]")
}

async function WatchSource() {
  const options: WatchOptions = {
    // cwd: process.cwd(),
    ignoreInitial: false,
    // delay: 1000 * 1, // 延迟时间
    // alwaysStat: false, // 关闭不必要的 stat 信息
    // usePolling: false, // 禁用轮询模式
    // depth: 5, // 限制监控目录深度
    // atomic: true, // 处理原子保存操作
    awaitWriteFinish: {
      stabilityThreshold: 1000, // 文件稳定时间
      pollInterval: 1000 * 0.5 // 检查间隔
    }
  }
  watch(["source/electron/**/*"], options, Run)
}

export default series(watchCompile, WatchSource)

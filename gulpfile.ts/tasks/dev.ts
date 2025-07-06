import { series, watch } from "gulp"
import type { WatchOptions } from "gulp"
import { debounce } from "lodash"
import ElectronProcess from "../utils/electron"
import compile from "./compile"

const cli = ElectronProcess.getInstance()

// const onceCompile = () => compile(false);
const watchCompile = (): Promise<void> => compile(false)

const debouncedRun = debounce(async () => {
  await cli.stop()
  await cli.start()
  console.log("[Electron reload...]")
}, 3000)

async function Run(): Promise<void> {
  await debouncedRun()
}

async function WatchSource(): Promise<void> {
  const options: WatchOptions = {
    ignoreInitial: false, // 忽略初始事件
    usePolling: false, // 禁用轮询模式
    queue: true, // 启用队列模式
    persistent: true // 持续监听
    // cwd: process.cwd(),
    // delay: 1000 * 1.5, // 延迟时间
    // alwaysStat: false, // 关闭不必要的 stat 信息
    // depth: 5, // 限制监控目录深度
    // atomic: false // 处理原子保存操作
    // awaitWriteFinish: {
    // stabilityThreshold: 1000 * 5 // 文件稳定时间
    // pollInterval: 1000 * 1 // 检查间隔
    // }
  }
  const watcher = watch(["source/electron/**/*"], options, Run)
  // 处理可能的错误
  watcher.on("error", err => {
    console.error("Watcher error:", err)
  })
}

export default series(watchCompile, WatchSource)

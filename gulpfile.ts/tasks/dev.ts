import { series, watch } from "gulp"
import type { WatchOptions } from "gulp"
import ElectronProcess from "../utils/electron"
import compile from "./compile"

const cli = ElectronProcess.getInstance()

// const onceCompile = () => compile(false);
const watchCompile = (): Promise<void> => compile(false)

async function Run(): Promise<void> {
  // series(instance.stop(), instance.start())
  await cli.stop()
  await cli.start()
  console.log("[electron reload]")
}

async function WatchSource(): Promise<void> {
  const options: WatchOptions = {
    // cwd: process.cwd(),
    ignoreInitial: false,
    delay: 1000 * 1.5, // 延迟时间
    // alwaysStat: false, // 关闭不必要的 stat 信息
    usePolling: false, // 禁用轮询模式
    // depth: 5, // 限制监控目录深度
    atomic: false, // 处理原子保存操作
    awaitWriteFinish: {
      stabilityThreshold: 1000 * 5, // 文件稳定时间
      pollInterval: 1000 * 1 // 检查间隔
    }
  }
  watch(["source/electron/**/*"], options, Run)
}

export default series(watchCompile, WatchSource)

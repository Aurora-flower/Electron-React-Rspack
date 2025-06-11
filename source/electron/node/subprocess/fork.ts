import type { Serializable } from "node:child_process"
import { fork } from "node:child_process"

export function forkProcess(
  file: string,
  message: Serializable
): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = fork(file, {
      cwd: process.cwd(),
      env: process.env,
      stdio: "inherit"
    })
    child.send(message)
    child.on("message", msg => {
      if (msg === "任务完成") {
        resolve("任务完成")
        child.kill()
      } else {
        reject(new Error("任务失败"))
      }
    })
  })
}

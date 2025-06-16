import { app } from "electron"

/**
 * @summary 子进程意外消失时触发。
 * @description 这种情况通常因为进程崩溃或被杀死。 子进程不包括渲染器进程。
 */
function onChildProcessGone(): void {
  app.on("child-process-gone", (_event, _details) => {})
}

export default onChildProcessGone

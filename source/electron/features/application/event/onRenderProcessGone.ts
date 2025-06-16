import { app } from "electron"

/**
 * @summary 渲染器进程意外消失时触发。
 * @description 这种情况通常因为进程崩溃或被杀死。
 */
function onRenderProcessGone(): void {
  app.on("render-process-gone", (_event, _webContents, _details) => {})
}

export default onRenderProcessGone

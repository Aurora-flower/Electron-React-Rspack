import { app } from "electron"

/**
 * @summary 当应用程序完成基础的启动的时候被触发。
 * @remarks
 * - 在 `Windows` 和 `Linux` 中, `will-finish-launching` 事件与 `ready` 事件是相同的;
 * - 在 `macOS` 中，这个事件相当于 `NSApplication` 中的 `applicationWillFinishLaunching` 提示。
 * - 绝大部分情况下，必须在 ready 事件句柄中处理所有事务。
 */
function onWillFinishLaunching(): void {
  app.on("will-finish-launching", () => {})
}

export default onWillFinishLaunching

import { sendLog } from "@main/toolkit/logger"
import { app } from "electron"

/***
 * @summary 在应用程序退出时发出。
 */
function onWillQuit(): void {
  app.on("quit", (_event, exitCode) => {
    sendLog(
      {
        module: module?.id,
        sign: "quit"
      },
      `The application will quit with exit code ${exitCode}.`
    )
  })
}

export default onWillQuit

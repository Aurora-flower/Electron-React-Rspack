import { privilegedSchemes } from "@main/helpers/modules/protocol"
import { createAppServer } from "@main/server"
import Logger from "electron-log"

async function onAppReadyBefore() {
  createAppServer()
  privilegedSchemes()
  Logger.log("onAppReadyBefore")
}

export default onAppReadyBefore

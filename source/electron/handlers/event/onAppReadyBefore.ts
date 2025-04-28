import { privilegedSchemes } from "@main/helpers/modules/protocol"
import Logger from "electron-log"

async function onAppReadyBefore() {
  privilegedSchemes()
  Logger.log("onAppReadyBefore")
}

export default onAppReadyBefore

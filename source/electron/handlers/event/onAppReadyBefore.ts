import Logger from "electron-log";
import { privilegedSchemes } from "@main/helpers/modules/protocol";

async function onAppReadyBefore() {
  privilegedSchemes();
  Logger.log("onAppReadyBefore");
}

export default onAppReadyBefore;

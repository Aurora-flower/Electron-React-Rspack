import { privilegedSchemes } from "@main/helpers/modules/protocol";
import { protocol } from "electron";

async function onAppReadyBefore() {
  privilegedSchemes();
}

export default onAppReadyBefore;

import { registerIPCChannel } from "@main/handlers/channel";

async function onAppReadyAfter() {
  registerIPCChannel();
}

export default onAppReadyAfter;

import type { IpcMainEvent } from "electron"

async function synchronousMessage(event: IpcMainEvent): Promise<void> {
  event.returnValue = "sync-pong"
}

export default synchronousMessage

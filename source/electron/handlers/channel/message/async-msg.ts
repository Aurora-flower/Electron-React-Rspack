import type { IpcMainEvent } from "electron"

async function asynchronousMessage(event: IpcMainEvent): Promise<void> {
  event.sender.send("asynchronous-reply", "async-pong")
}

export default asynchronousMessage

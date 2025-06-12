import type { IpcMainEvent } from "electron"

export async function asynchronousMessage(event: IpcMainEvent): Promise<void> {
  event.sender.send("asynchronous-reply", "async-pong")
}

export async function synchronousMessage(event: IpcMainEvent): Promise<void> {
  event.returnValue = "sync-pong"
}

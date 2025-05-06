import { messagePort, transmit } from "@main/handlers/channel/message/sms"
import { type IpcMainEvent, type IpcMainInvokeEvent, ipcMain } from "electron"

export const channelSenderDisposer = createChannelHandler()

export const channelInvokeDisposer = createChannelHandler(true)

const CHANNLE_TYPE: Record<"Event" | "Invoke", ChannelType> = {
  Event: "event",
  Invoke: "invoke"
}

const HANDLER: ChannelConfig = {
  handler: channelSenderDisposer,
  name: "emitter",
  type: CHANNLE_TYPE.Event
}

const INVOKE: ChannelConfig = {
  handler: channelInvokeDisposer,
  name: "dispatch",
  type: CHANNLE_TYPE.Invoke
}

const PORT: ChannelConfig = {
  handler: messagePort,
  name: "port",
  type: CHANNLE_TYPE.Event
}

const CHANNELS: ChannelConfig[] = [HANDLER, INVOKE, PORT]

export function registerIPCChannel() {
  for (const { name, handler, type } of CHANNELS) {
    if (type === CHANNLE_TYPE.Invoke) {
      ipcMain.handle(name, handler as InvokeHandler)
    } else if (type === CHANNLE_TYPE.Event) {
      ipcMain.on(name, handler as OnHandler)
    }
  }
}

const LISTENERS = {
  /* ***** ***** ***** ***** Application ***** ***** ***** ***** */
  "sms:transmit": transmit
}

const IPC_HANDLERS = new Map<string, (...args: unknown[]) => unknown>(
  Object.entries(LISTENERS) as Array<[string, (...args: unknown[]) => unknown]>
)

function findListener(channel: ChannelName) {
  return IPC_HANDLERS.get(channel)
}

const prepareParams = (
  _event: IpcMainEvent | IpcMainInvokeEvent,
  _channel: ChannelName,
  args: unknown[]
) => {
  const params = [...args]
  // if (channel.startsWith('window:')) {
  // }
  return params
}

// function middlewar(event: IpcMainEvent | IpcMainInvokeEvent, channel: ChannelName,
//   ...args: unknown[]) {
//     const sender = event.sender;
//     sender.getProcessId(),
//     sender.getURL(),
// }

function createChannelHandler(
  isInvoke = false
  // middlewar?: (...args: unknown[]) => void
) {
  return (
    event: IpcMainEvent | IpcMainInvokeEvent,
    channel: ChannelName,
    ...args: unknown[]
  ) => {
    const listener = findListener(channel)
    if (!listener) return
    const params = prepareParams(event, channel, args)
    if (isInvoke) {
      return listener(...params)
    }
    listener(...params)
  }
}

import { transmit } from "@main/handlers/channel/message/sms"
import { getAppInfo } from "@main/helpers/modules/app"
import { type IpcMainEvent, type IpcMainInvokeEvent, ipcMain } from "electron"

const CHANNLE_TYPE: Record<"Event" | "Invoke", ChannelType> = {
  Event: "event",
  Invoke: "invoke"
}

const INVOKE_LISTENERS = {
  /* ***** ***** ***** ***** Application ***** ***** ***** ***** */
  "app:info": getAppInfo
}

const RECEIVER_LISTENERS = {
  /* ***** ***** ***** ***** Communication ***** ***** ***** ***** */
  "sms:transmit": transmit
}

const HANDLER: ChannelConfig = {
  handler: createEventHandler,
  name: "emitter",
  type: CHANNLE_TYPE.Event
}

const INVOKE: ChannelConfig = {
  handler: createInvokeHandler,
  name: "dispatch",
  type: CHANNLE_TYPE.Invoke
}

const CHANNELS: ChannelConfig[] = [HANDLER, INVOKE]

export function registerIPCChannel() {
  for (const { name, handler, type } of CHANNELS) {
    if (type === CHANNLE_TYPE.Invoke) {
      ipcMain.handle(name, handler as InvokeHandler)
    } else if (type === CHANNLE_TYPE.Event) {
      ipcMain.on(name, handler as OnHandler)
    }
  }
}

const IPC_HANDLERS = (isInvoke = false) =>
  new Map<string, (...args: unknown[]) => unknown>(
    Object.entries(isInvoke ? INVOKE_LISTENERS : RECEIVER_LISTENERS) as Array<
      [string, (...args: unknown[]) => unknown]
    >
  )

function findListener(channel: ChannelName, isInvoke = false) {
  return IPC_HANDLERS(isInvoke).get(channel)
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

function createEventHandler(
  event: IpcMainEvent,
  channel: string,
  ...args: unknown[]
) {
  const listener = findListener(channel, false)
  if (!listener) throw new Error(`Channel ${channel} has no handler`)
  // middleware
  const params = prepareParams(event, channel, args)
  listener(...params)
}

function createInvokeHandler(
  event: IpcMainInvokeEvent,
  channel: string,
  ...args: unknown[]
) {
  const listener = findListener(channel, true)
  if (!listener) throw new Error(`Channel ${channel} has no handler`)
  // middleware
  const params = prepareParams(event, channel, args)
  return listener(...params)
}

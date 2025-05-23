import { transmit } from "@main/handlers/channel/message/sms"
import { getAppInfo } from "@main/helpers/modules/app"
import type { IpcMainEvent, IpcMainInvokeEvent } from "electron"
import { ipcMain } from "electron"

const TRIGGER_LISTENERS: Record<TriggerChannelName, ChannelListener> = {
  /* ***** ***** ***** ***** Application ***** ***** ***** ***** */
  "app:info": getAppInfo as ChannelListener
}

const RECEIVER_LISTENERS: Record<ReceiverChannelName, ChannelVoidListener> = {}

const MESSAGE_LISTENERS: Record<MessagenerChannelName, ChannelVoidListener> = {
  /* ***** ***** ***** ***** Communication ***** ***** ***** ***** */
  "sms:transmit": transmit as ChannelVoidListener
}

const CHANNEL_CONFIG_MAP: ChannelConfigMap = {
  Receiver: {
    type: "Receiver",
    channel: "emitter",
    handler: setupReceiverHooks,
    listeners: RECEIVER_LISTENERS
  },
  Trigger: {
    type: "Trigger",
    channel: "dispatch",
    handler: setupTriggerHooks,
    listeners: TRIGGER_LISTENERS
  },
  Messenger: {
    type: "Messenger",
    channel: "sender",
    handler: setupMessageHooks,
    listeners: MESSAGE_LISTENERS
  }
}

async function setupReceiverHooks(
  event: IpcMainEvent,
  channel: TriggerChannelName,
  ...args: unknown[]
): Promise<void> {
  const listener = CHANNEL_CONFIG_MAP.Receiver.listeners?.[channel]
  if (!listener) throw new Error(`Channel ${channel} has no handler`)
  listener(...args)
}

async function setupTriggerHooks(
  event: IpcMainInvokeEvent,
  channel: ReceiverChannelName,
  ...args: unknown[]
): Promise<unknown> {
  const listener = CHANNEL_CONFIG_MAP.Trigger.listeners?.[channel]
  if (!listener) throw new Error(`Channel ${channel} has no handler`)
  return listener(...args)
}

async function setupMessageHooks(
  event: IpcMainEvent,
  channel: MessagenerChannelName,
  ...args: unknown[]
): Promise<void> {
  const listener = CHANNEL_CONFIG_MAP.Messenger.listeners?.[channel]
  if (!listener) throw new Error(`Channel ${channel} has no handler`)
  listener(...args)
}

export function registerIPCChannel(): void {
  for (const [key, config] of Object.entries(CHANNEL_CONFIG_MAP)) {
    const { channel, handler } = config
    if (["Receiver", "Messenger"].includes(key)) {
      ipcMain.on(channel, handler)
    } else if (key === "Trigger") {
      ipcMain.handle(channel, handler)
    }
  }
}

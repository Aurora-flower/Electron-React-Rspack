type ChannelType = "event" | "invoke"

type OnHandler = (
  event: IpcMainEvent,
  channel: ReceiverChannelName,
  ...args: unknown[]
) => void

type InvokeHandler = (
  event: IpcMainInvokeEvent,
  channel: ReplyChannelName,
  ...args: unknown[]
) => unknown

type ChannelHandler = OnHandler | InvokeHandler

interface ChannelConfig {
  handler: ChannelHandler
  name: "emitter" | "dispatch"
  type?: ChannelType
}

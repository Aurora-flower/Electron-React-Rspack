type ChannelType = "event" | "invoke"

type OnHandler = (
  event: IpcMainEvent,
  channel: SenderChannelName,
  ...args: unknown[]
) => void

type InvokeHandler = (
  event: IpcMainInvokeEvent,
  channel: InvokeChannelName,
  ...args: unknown[]
) => unknown

type ChannelHandler = OnHandler | InvokeHandler

interface ChannelConfig {
  handler: ChannelHandler
  name: string
  type?: ChannelType
}

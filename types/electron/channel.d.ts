type ChannelType = "event" | "invoke";
type ChannelName = string;
type InvokeChannelName = string;

type OnHandler = (
  event: IpcMainEvent,
  channel: ChannelName,
  ...args: unknown[]
) => void;

type InvokeHandler = (
  event: IpcMainInvokeEvent,
  channel: InvokeChannelName,
  ...args: unknown[]
) => unknown;

type ChannelHandler = OnHandler | InvokeHandler;

interface ChannelConfig {
  handler: ChannelHandler;
  name: string;
  type?: ChannelType;
}

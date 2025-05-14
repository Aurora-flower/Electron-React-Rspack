/**
 * @file Ipc 通信类型定义
 */

/**
 * @summary Ipc 通信名称与类型标记
 */
type IpcName = "emitter" | "dispatch" | "sender"
type ChannelType = "Receiver" | "Trigger" | "Messenger"

/**
 * @summary Ipc Channel 名称
 */
type TriggerChannelName = "app:info"
type ReceiverChannelName = string
type MessagenerChannelName = "sms:transmit"
type ChannelName =
  | TriggerChannelName
  | ReceiverChannelName
  | MessagenerChannelName

/**
 * @summary Ipc 监听函数
 */
type ChannelListener = (...args: any[]) => Promise<unknown> | unknown
type ChannelVoidListener = (...args: any[]) => Promise<void> | void

/**
 * @summary Ipc Channel 处理函数
 */
type ChannelHandler<T extends ChannelName> = (
  event: IpcMainInvokeEvent,
  channel: T,
  ...args: unknown[]
) => Promise<unknown>

/**
 * @summary Ipc Channel 配置
 */
interface ChannelConfig<T extends ChannelType> {
  type: T
  channel: IpcName
  handler: ChannelHandler
  listeners: Record<ChannelName, ChannelListener>
}

type ChannelConfigMap = {
  [K in ChannelType]: ChannelConfig<K>
}

/**
 * @summary SMS 消息类型定义
 */
interface Message {
  type: string
  data: unknown
  isJson?: boolean
}

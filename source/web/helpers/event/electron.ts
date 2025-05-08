export async function dispatch(
  channel: ReplyChannelName,
  ...args: unknown[]
): Promise<unknown> {
  if (!window.IPC) {
    return null
  }
  return window.IPC.dispatch(channel, ...args)
}

export async function sender(channel: ReceiverChannelName, ...args: unknown[]) {
  if (!window.IPC) {
    return null
  }
  return window.IPC.emitter(channel, ...args)
}

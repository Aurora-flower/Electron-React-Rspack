export async function dispatch(
  channel: InvokeChannelName,
  ...args: unknown[]
): Promise<unknown> {
  if (!window.IPC) {
    return null
  }
  return window.IPC.dispatch(channel, ...args)
}

export async function sender(channel: SenderChannelName, ...args: unknown[]) {
  if (!window.IPC) {
    return null
  }
  return window.IPC.emitter(channel, ...args)
}

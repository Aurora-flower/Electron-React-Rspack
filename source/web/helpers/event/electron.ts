export async function dispatch(
  channel: TriggerChannelName,
  ...args: unknown[]
): Promise<unknown> {
  if (!window.IPC) {
    return null
  }
  return window.IPC.dispatch(channel, ...args)
}

export async function emitter(
  channel: ReceiverChannelName,
  ...args: unknown[]
) {
  if (!window.IPC) {
    return null
  }
  return window.IPC.emitter(channel, ...args)
}

export async function sender(
  channel: MessagenerChannelName,
  ...args: unknown[]
) {
  if (!window.IPC) {
    return null
  }
  return window.IPC.sender(channel, ...args)
}

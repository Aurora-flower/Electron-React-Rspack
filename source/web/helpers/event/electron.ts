export async function dispatch(
  channel: InvokeChannelName,
  ...args: any[]
): Promise<any> {
  if (!window.IPC) {
    return null;
  }
  return window.IPC.dispatch(channel, ...args);
}

export async function sender(channel: SenderChannelName, ...args: any[]) {
  if (!window.IPC) {
    return null;
  }
  return window.IPC.emitter(channel, ...args);
}

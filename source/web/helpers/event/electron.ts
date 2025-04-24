export async function dispatch(channel: string, ...args: any[]): Promise<any> {
  if (!window.IPC) {
    return null;
  }
  return window.IPC.dispatch(channel, ...args);
}

export async function sender(channel: string, ...args: any[]) {
  if (!window.IPC) {
    return null;
  }
  return window.IPC.emitter(channel, ...args);
}

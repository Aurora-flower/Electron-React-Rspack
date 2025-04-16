import { ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";

const listenerChannels = {};

const IPC_HANDLERS = new Map<string, (...args: unknown[]) => unknown>(
  Object.entries(listenerChannels) as Array<
    [string, (...args: unknown[]) => unknown]
  >
);

function findListener(channel: string) {
  return IPC_HANDLERS.get(channel);
}

export const channeldispose = createChannelHandler();

export const channeldisposeInvoke = createChannelHandler(true);

const CHANNELS: ChannelConfig[] = [
  {
    handler: channeldispose,
    name: "handler"
  },
  {
    handler: channeldisposeInvoke,
    name: "dispatch",
    type: "invoke"
  }
];

export function registerChannel() {
  for (const { name, handler, type } of CHANNELS) {
    if (type === "invoke") {
      ipcMain.handle(name, handler as InvokeHandler);
    } else {
      ipcMain.on(name, handler as OnHandler);
    }
  }
}

const prepareParams = (
  _event: IpcMainEvent | IpcMainInvokeEvent,
  _channel: string,
  args: unknown[]
) => {
  const params = [...args];
  // if (channel.startsWith('window:')) {
  // }
  return params;
};

function createChannelHandler(
  isInvoke = false,
  middlewar?: (...args: unknown[]) => void
) {
  return function (
    event: IpcMainEvent | IpcMainInvokeEvent,
    channel: string,
    ...args: unknown[]
  ) {
    const sender = event.sender;
    const listener = findListener(channel);
    if (!listener) return;
    if (middlewar) {
      middlewar(...args);
      console.log(
        `[Received IPC] ${isInvoke ? "Invoke" : "Event"}`,
        sender.getProcessId(),
        sender.getURL(),
        channel,
        args
      );
    }
    const params = prepareParams(event, channel, args);
    return listener(...params);
  };
}

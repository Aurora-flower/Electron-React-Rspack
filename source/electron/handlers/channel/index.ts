import { ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import { transmit } from "@main/handlers/channel/sms";

export const channelSenderDisposer = createChannelHandler();

export const channelInvokeDisposer = createChannelHandler(true);

const HANDLER: ChannelConfig = {
  handler: channelSenderDisposer,
  name: "emitter",
  type: "event",
};

const INVOKE: ChannelConfig = {
  handler: channelInvokeDisposer,
  name: "dispatch",
  type: "invoke",
};

const CHANNELS: ChannelConfig[] = [HANDLER, INVOKE];

export function registerIPCChannel() {
  for (const { name, handler, type } of CHANNELS) {
    if (type === INVOKE.type) {
      ipcMain.handle(name, handler as InvokeHandler);
    } else if (type === HANDLER.type) {
      ipcMain.on(name, handler as OnHandler);
    }
  }
}

const LISTENERS = {
  /* ***** ***** ***** ***** Application ***** ***** ***** ***** */
  "sms:transmit": transmit,
};

const IPC_HANDLERS = new Map<string, (...args: unknown[]) => unknown>(
  Object.entries(LISTENERS) as Array<[string, (...args: unknown[]) => unknown]>
);

function findListener(channel: ChannelName) {
  return IPC_HANDLERS.get(channel);
}

const prepareParams = (
  _event: IpcMainEvent | IpcMainInvokeEvent,
  _channel: ChannelName,
  args: unknown[]
) => {
  const params = [...args];
  // if (channel.startsWith('window:')) {
  // }
  return params;
};

// function middlewar(event: IpcMainEvent | IpcMainInvokeEvent, channel: ChannelName,
//   ...args: unknown[]) {
//     const sender = event.sender;
//     console.log(
//     `[middlewar IPC]`,
//     sender.getProcessId(),
//     sender.getURL(),
//     channel,
//     args
//   );
// }

function createChannelHandler(
  isInvoke = false
  // middlewar?: (...args: unknown[]) => void
) {
  return function (
    event: IpcMainEvent | IpcMainInvokeEvent,
    channel: ChannelName,
    ...args: unknown[]
  ) {
    const listener = findListener(channel);
    if (!listener) return;
    const params = prepareParams(event, channel, args);
    if (isInvoke) {
      return listener(...params);
    } else {
      listener(...params);
    }
  };
}

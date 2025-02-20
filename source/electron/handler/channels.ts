/**
 * @file IPC 通讯管理 - 事件处理与分发
 * @description
 * 在 Electron 中，IPC 用于主进程（Main Process）与渲染进程（Renderer Process）之间的通信。
 * 由于主进程和渲染进程是两个不同的进程，彼此之间不能直接共享数据，因此需要使用 IPC 来交换信息。
 */

import debugLog from '@/electron/tools/log';

// TODO: 定义好事件的传参与处理逻辑 - 事件分发

const Panel = {};

export function channelEventDispatch(
  channel: string,
  ...args: unknown[]
) {
  debugLog(
    {
      id: module.id,
      sign: 'ChannelEventDispatch'
    },
    channel,
    ...args,
    Panel
  );
}

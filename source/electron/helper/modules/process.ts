import Helper from '@/electron/helper';
import { debugLog } from '@/common/helper/log';
import { spawn, exec } from 'node:child_process';
import { joinPath } from '@/electron/utils/path';

const ModuleID = module.id;

export function runProcess(
  _event: Electron.IpcMainInvokeEvent,
  ...params: string[]
): null {
  const script = joinPath(
    process.cwd(),
    'extend/scripts',
    'svn.js'
  );
  const nodeProcess = spawn('node', [script, ...params], {
    detached: true, // 分离的
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
  });
  const platform = Helper.getPlatform();
  const pid = nodeProcess.pid;
  const command =
    platform == 'win32' ? `tasklist /FI "PID eq"` : `kill -0`;
  exec(`${command} ${pid}`, (error, stdout, stderr) => {
    if (error) {
      debugLog(
        {
          id: ModuleID,
          sign: 'RunProcess Error',
          isMain: true
        },
        error?.message,
        `进程 ${pid} 不存在`
      );
    } else {
      debugLog(
        {
          id: ModuleID,
          sign: 'RunProcess',
          isMain: true
        },
        `进程 ${pid} 正在运行`,
        stdout,
        stderr
      );
    }
  });

  debugLog(
    {
      id: ModuleID,
      sign: 'RunProcess',
      isMain: true
    },
    params,
    nodeProcess.pid
  );
  return null;
}

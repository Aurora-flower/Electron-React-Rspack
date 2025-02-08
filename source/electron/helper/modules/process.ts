import Helper from '@/electron/helper';
import { debugLog } from '@/common/helper/log';
import { spawn, exec } from 'node:child_process';

const { joinPath, getPlatform } = Helper;

export function runProcess(
  _event: Electron.IpcMainInvokeEvent,
  ...params: any
): null {
  const script = joinPath(
    process.cwd(),
    'extend/scripts',
    'svn.js'
  );
  const nodeProcess: any = spawn('node', [script, ...params], {
    detached: true, // 分离的
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
  });
  const platform = getPlatform();
  const pid = nodeProcess.pid;
  const command =
    platform == 'win32' ? `tasklist /FI "PID eq"` : `kill -0`;
  exec(`${command} ${pid}`, (error, stdout, stderr) => {
    if (error) {
      debugLog(
        module.id,
        'RunProcess Error',
        true,
        error?.message,
        `进程 ${pid} 不存在`
      );
    } else {
      debugLog(
        module.id,
        'RunProcess',
        true,
        `进程 ${pid} 正在运行`,
        stdout,
        stderr
      );
    }
  });

  debugLog(module.id, 'RunProcess', params, nodeProcess.pid);
  return null;
}

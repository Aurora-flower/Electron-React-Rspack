import { debugLog } from '@/common/log';

/**
 * 服务器错误处理
 * @param err - 错误信息
 */
export function handleError(err: Error) {
  debugLog(
    'Error',
    `Failed to start the server: ${err.message}`,
    false
  );
}

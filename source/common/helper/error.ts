import { debugLog } from '@/common/helper/log';

/**
 * 服务器错误处理
 * @param err - 错误信息
 */
export function handleError(err: Error) {
  debugLog(
    {
      id: module.id,
      sign: 'Error'
    },
    `Failed to start the server: ${err.message}`
  );
}

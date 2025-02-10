/**
 * @file protocol 自定义协议
 **/
import { pathToFileURL } from 'node:url';
import { net, protocol } from 'electron';

/**
 * @constant 自定义协议类型
 */
const DefaultScheme: string = 'local';

/**
 * 检查指定的协议是否已经注册(并配置 handler)。
 * @param scheme 协议类型，指定要检查的协议名称。
 * @returns 协议是否注册
 */
export function isRegistered(
  scheme: string = DefaultScheme
): boolean {
  return protocol.isProtocolHandled(scheme);
}

/**
 * 注册特权协议方案, 可以绕过内容安全策略(CSP)
 * @param scheme 协议类型，指定要注册的协议名称。
 * @param options 配置选项
 *
 * @remarks
 * 此方法只能在 app 的 ready 事件触发前调用，且只能调用一次
 */
export function privilegedSchemes(
  scheme: string = DefaultScheme, // 多个的时候传入 null | ''
  options?: Array<Electron.CustomScheme>
) {
  let _option: Array<Electron.CustomScheme> = options || [];
  if (scheme) {
    const defaultOption = {
      scheme,
      privileges: {
        bypassCSP: true, // 是否允许通过 Content-Security-Policy 策略来加载跨域资源。
        standard: true, // 是否支持标准协议功能 - 标准协议，能够支持如 Web请求和资源加载等功能
        secure: true, // 是否被认为安全协议 - 允许使用某些安全相关的 API。
        supportFetchAPI: true // 支持 Fetch API，允许使用 fetch() 函数进行数据请求。
      }
    };
    const mergeOption = Object.assign(defaultOption, options);
    _option = [mergeOption];
  }
  protocol.registerSchemesAsPrivileged(_option);
}

/**
 * 配置协议处理函数
 * @param scheme - 协议类型。指定要注册的协议名称。
 * */
export function registerProtocolHandle(
  scheme: string = DefaultScheme
) {
  // 校验 scheme 是否为预期格式或值
  if (typeof scheme !== 'string' || scheme.trim() === '') {
    return new Error('scheme must be a string and not empty.');
  }

  async function protocolHander(
    request: GlobalRequest
  ): Promise<GlobalResponse> {
    // 校验 request.url 是否包含预期的协议头并格式正确
    if (!request.url.startsWith(`${scheme}://`)) {
      return Promise.reject(new Error('Invalid request URL.'));
    }

    const filePath = request.url.replace(`${scheme}:/`, '');
    // 处理异常
    try {
      const fileURL = pathToFileURL(filePath).toString();
      try {
        return await net.fetch(fileURL);
      } catch (error) {
        return await Promise.reject(error);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 注册协议处理函数
  protocol.handle(scheme, protocolHander);
}

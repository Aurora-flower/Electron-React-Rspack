/**
 * @file Navigator - Web API 相关
 * @description Navigator 接口代表了用户代理的状态和身份，它允许脚本对其进行查询并注册自身以便执行某些活动。
 *
 * 注意📢:
 * window 下的属性都是可以省略缩写的，如 window.navigator 可以简写为 navigator
 */

import { debugLog } from '@/common/helper/log';

/**
 * 获取平台信息
 * @description
 * 通过 web api - navigator.userAgent 获取平台信息。
 *
 * 注意📢:
 * navigator.platform 已经被废弃，随着隐私保护政策的增强，浏览器已经不再推荐使用它，因为它可能泄露过多的用户信息。
 */
export function getOS() {
  let os = '';
  if (window.navigator.userAgent.indexOf('Windows NT') > -1) {
    os = 'Windows';
  } else if (
    window.navigator.userAgent.indexOf('Mac OS X') > -1
  ) {
    os = 'MacOS';
  } else if (
    window.navigator.userAgent.indexOf('Android') > -1
  ) {
    os = 'Android';
  } else if (
    window.navigator.userAgent.indexOf('iPhone') > -1 ||
    window.navigator.userAgent.indexOf('iPad') > -1
  ) {
    os = 'iOS';
  } else {
    os = 'Other';
  }

  return os;
}

/**
 * 获取浏览器信息
 * @description
 * 通过 web api - navigator.userAgent 获取浏览器信息。
 */
export function getBrowser() {
  let browser = '';
  if (window.navigator.userAgent.indexOf('Chrome') > -1) {
    browser = 'Chrome';
  } else if (
    window.navigator.userAgent.indexOf('Firefox') > -1
  ) {
    browser = 'Firefox';
  } else if (window.navigator.userAgent.indexOf('Safari') > -1) {
    browser = 'Safari';
  }
  return browser;
}

/**
 * 获取剪贴板内容
 * @description
 * 通过 web api - navigator.clipboard.readText() 访问系统剪贴板，以便读取剪贴板中的文本内容。
 * 如果剪贴板为空或不包含文本，readText() 会返回空字符串。
 *
 * @remarks
 * 当未聚焦时，会报错 Uncaught (in promise) NotAllowedError: Failed to execute 'readText' on 'Clipboard': Document is not focused.
 */
export function getClipboardText() {
  try {
    // 确保文档处于焦点状态
    if (!document.hasFocus()) {
      throw new Error('Document is not focused');
    }
    const text = window.navigator.clipboard.readText();
    return text;
  } catch (error: any) {
    debugLog(
      module.id,
      'GetClipboardText',
      true,
      error?.message
    );
    return '';
  }
}

/**
 * 获取网络连接信息
 * @description
 * - 通过 web api - navigator.connection 获取网络连接信息。
 * - Navigator 接口的 connection 只读属性返回一个包含有关系统网络连接信息的 NetworkInformation 对象，
 * 例如用户设备的当前带宽或连接是否按流量计费。
 * - 这可以用于根据用户的连接状态来选择高清晰度内容或低清晰度内容。
 *
 * @remarks
 * - `navigator.connection.downlink` - 下载速度（单位：Mbps）
 * - `navigator.connection.rtt` - 往返时间（单位：ms）
 * - `navigator.connection.effectiveType` - 网络连接类型（e.g., '4g', '3g', '2g', 'slow-2g'）
 * - `navigator.connection.saveData` - 是否启用了数据保存模式（true/false）
 */
export function getConnectivity() {
  return window.navigator.connection;
}

/**
 * 获取 cookie
 * @description
 * `navigator.cookieEnabled` 只读属性返回一个布尔值，指示是否启用了 cookie。
 * @returns cookie 内容
 */
export function getCookie() {
  if (window.navigator.cookieEnabled) {
    return window.document.cookie;
  } else {
    /* 浏览器不支持或阻止设置 cookie。 */
    return '';
  }
}

/**
 * 向服务器发送认证结果进行验证
 * @description
 * 在使用 WebAuthn 进行认证后，需要将认证结果发送到服务器进行验证。
 * 服务器会验证用户凭据是否正确，并返回验证结果。
 * @param credential - 认证结果
 * @returns 验证结果
 */
async function sendToServerForVerification(credential: any) {
  return !credential;
}

/**
 * 使用传统登录方式进行认证
 * @description
 * 在使用 WebAuthn 进行认证后，如果浏览器不支持 WebAuthn 或发生错误，
 * 可以使用传统登录方式进行认证。
 * @returns 认证结果
 */
function fallbackToLegacyAuth() {
  // const username = document.querySelector<HTMLInputElement>('#username')!.value;
  // const password = document.querySelector<HTMLInputElement>('#password')!.value;

  // return fetch('/api/legacy-login', {
  //   method: 'POST',
  //   body: JSON.stringify({ username, password })
  // });
  return Promise.resolve(false);
}

/**
 * 实现 基于 WebAuthn 的认证流程（如指纹/安全密钥登录），并在浏览器不支持时回退传统登录方式。
 * @description
 * Navigator 接口的只读属性 credentials 返回与当前文档关联的 CredentialsContainer 对象，该对象暴露用于请求凭据的方法。
 * CredentialsContainer 接口还会在发生感兴趣的事件时通知用户代理，例如成功登录或注销。此接口可用于特性检测。
 * @remarks
 * - WebAuthn 认证流程
 *
 * | 步骤 | 	说明 |
 * | ----------- | ----------|
 * | challenge |  生成	服务器生成随机数用于防重放攻击（需替换为实际服务端生成值）|
 * | 凭证请求配置 | 	限定允许的凭证类型、传输方式等参数|
 * | 调用浏览器接口 | 	触发用户验证流程（如弹出指纹识别对话框）|
 * | 认证结果验证 | 	将客户端生成的签名数据发送到服务器验证|
 */
export async function getCredentials() {
  /* 现代认证流程 （WebAuthn） */
  if ('credentials' in navigator) {
    try {
      const publicKeyCredentialOptions: PublicKeyCredentialRequestOptions =
        {
          challenge: new Uint8Array(32), // 需替换为服务器生成的随机 challenge
          allowCredentials: [
            {
              type: 'public-key',
              id: new Uint8Array(64), // 需替换为已注册的凭证 ID
              transports: ['internal'] // 限定认证设备类型（如内置指纹识别器）
            }
          ],
          userVerification: 'required', // 需要用户主动验证（如指纹）
          timeout: 60000 // 60秒超时
        };

      // 调用浏览器 WebAuthn 接口
      const credential = (await navigator.credentials.get({
        publicKey: publicKeyCredentialOptions
      })) as PublicKeyCredential;

      // 将认证结果发送到服务器验证
      const verificationResult =
        await sendToServerForVerification({
          id: credential.id,
          rawId: Array.from(new Uint8Array(credential.rawId)),
          response: {
            clientDataJSON: Array.from(
              new Uint8Array(credential.response.clientDataJSON)
            ),
            authenticatorData: Array.from(
              new Uint8Array(
                (
                  credential.response as AuthenticatorAssertionResponse
                ).authenticatorData
              )
            ),
            signature: Array.from(
              new Uint8Array(
                (
                  credential.response as AuthenticatorAssertionResponse
                ).signature
              )
            ),
            userHandle: Array.from(
              new Uint8Array(
                (
                  credential.response as AuthenticatorAssertionResponse
                ).userHandle!
              )
            )
          }
        });

      return verificationResult;
    } catch (error) {
      console.error('WebAuthn 认证失败:', error);
      return fallbackToLegacyAuth(); // 降级到传统认证
    }
  } else {
    /* 传统认证流程 -- 通过账号密码请求认证 */
  }
}

/**
 * @file Navigator - Web API 相关
 * @description Navigator 接口代表了用户代理的状态和身份，它允许脚本对其进行查询并注册自身以便执行某些活动。
 *
 * 注意📢:
 * - window 下的属性都是可以省略缩写的，如 window.navigator 可以简写为 navigator
 * - 文件中的 🔺 表示此项功能仅在一些支持的浏览器的安全上下文（HTTPS）中可用。
 * 即，指浏览器要求该 API 必须运行在 `HTTPS` 协议下 或 `本地开发环境（localhost/127.0.0.1） 中才会生效。
 * - `window.isSecureContext` 可以获取当前页面是否在安全上下文（HTTPS）中运行。
 */
import { debugLog } from '@/common/helper/log';

/* ***** ***** ***** ***** Navigator 属性 API 相关 ***** ***** ***** ***** */

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
 *  🔺 获取剪贴板内容
 * @description
 * 通过 web api - navigator.clipboard.readText() 访问系统剪贴板，以便读取剪贴板中的文本内容。
 * 如果剪贴板为空或不包含文本，readText() 会返回空字符串。
 *
 * @remarks
 * 当未聚焦时，会报错 Uncaught (in promise) NotAllowedError: Failed to execute 'readText' on 'Clipboard': Document is not focused.
 *
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
 * - Navigator 接口的只读属性 connection 返回一个包含有关系统网络连接信息的 NetworkInformation 对象，
 * 例如用户设备的当前带宽或连接是否按流量计费。
 * - 这可以用于根据用户的连接状态来选择高清晰度内容或低清晰度内容。
 *
 * @remarks
 * - 属性:
 *    - `navigator.connection.downlink` - 下载速度（单位：Mbps）
 *    - `navigator.connection.rtt` - 往返时间（单位：ms）
 *    - `navigator.connection.effectiveType` - 网络连接类型（e.g., '4g', '3g', '2g', 'slow-2g'）
 *    - `navigator.connection.saveData` - 是否启用了数据保存模式（true/false）
 */
export function getConnectivity() {
  return window.navigator.connection;
}

/**
 * 获取 cookie
 * @description
 * Navigator 接口的只读属性 cookieEnabled 返回一个布尔值，指示是否启用了 cookie。
 * @returns {string} cookie 内容
 *
 * 注意📢:
 * - 当浏览器配置为阻止第三方的 cookie 时，如果在第三方 iframe 中调用 navigator.cookieEnabled，
 * 它会在 Safari、Edge Spartan 和 IE 中返回 true（而在此情况下尝试设置 cookie 会失败）。
 * 在 Firefox 和基于 Chromium 的浏览器中，它会返回 false。
 * - 在某些情况下，Web 浏览器可能会阻止写入某些 cookie。
 * 例如，基于 Chrome 的浏览器以及一些实验版本的 Firefox 不允许创建具有 SameSite=None 属性的 cookie，
 * 除非它们通过 HTTPS 创建并具有 Secure 属性。
 */
export function getCookie(): string {
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
async function sendToServerForVerification(credential: unknown) {
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
 *  🔺 实现 基于 WebAuthn 的认证流程（如指纹/安全密钥登录），并在浏览器不支持时回退传统登录方式。
 * @description
 * Navigator 接口的只读属性 credentials 返回与当前文档关联的 CredentialsContainer 对象，该对象暴露用于请求凭据的方法。
 * CredentialsContainer 接口还会在发生感兴趣的事件时通知用户代理，例如成功登录或注销。
 * 此接口可用于特性检测。
 * @remarks
 * - WebAuthn 认证流程
 *
 * | 步骤 | 	说明 |
 * | ----------- | ----------|
 * | challenge |  生成	服务器生成随机数用于防重放攻击（需替换为实际服务端生成值）|
 * | 凭证请求配置 | 	限定允许的凭证类型、传输方式等参数|
 * | 调用浏览器接口 | 	触发用户验证流程（如弹出指纹识别对话框）|
 * | 认证结果验证 | 	将客户端生成的签名数据发送到服务器验证|
 *
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

/**
 *  🔺 获取设备内存 （RAM）
 * @description
 * Navigator 接口的只读属性 deviceMemory 返回设备内存的近似值（以千兆字节为单位）。
 * 为了防止指纹识别，报告的值并不精确。
 *
 * @returns {number} 设备内存的近似值（以千兆字节为单位）
 * 该值通过向下取整到最接近的 2 的幂，然后将其除以 1024 来近似。
 * 之后，将其限制在上下限范围内，以保护内存非常低或非常高的设备的所有者的隐私。
 *
 */
export function getDeviceMemory() {
  if ('deviceMemory' in navigator) {
    const memory = window.navigator.deviceMemory;
    return memory;
  } else {
    return 0;
  }
}

/**
 *  🔺 获取地理位置信息
 * @description
 * Navigator 接口的只读属性 geolocation 返回 Geolocation 对象，该对象用于获取用户设备的位置信息
 * Geolocation API 允许 Web 应用程序访问设备上的位置信息，如经度和纬度。这允许网站或应用程序根据用户的位置提供定制化的结果。
 *
 * 注意📢:
 * - 出于安全考虑，当网页请求获取用户位置信息时，用户会被提示进行授权。
 * 注意，不同浏览器在请求权限时有不同的策略和方式。
 */
export function getGeolocation() {
  return window.navigator.geolocation;
}

/**
 * 获取硬件并发数
 * @description
 * Navigator 接口的只读属性 hardwareConcurrency 返回一个数字，表示当前设备的并发数。
 * 这表示当前设备可以同时运行线程的最大线程数(逻辑处理器数量)。
 *
 * 使用场景：根据可以运行最大线程数，创建了一个可用于稍后处理请求的 Worker 池。
 *
 * @returns {number} 一个介于 1 和用户代理可能使用的逻辑处理器数量之间的数字。
 * @remarks
 * - 现代计算机的 CPU 中有多个物理处理器核心（通常是两个或四个核心），但每个物理核心通常也能够使用先进的调度技术同时运行多个线程。
 * 例如，四核 CPU 可能提供八个逻辑处理器核心。
 * 逻辑处理器核心数量可以用来衡量能够有效同时运行的线程数量，而无需进行上下文切换。
 * - 但是，浏览器可能会选择报告更低的逻辑核心数量，以便更准确地表示可以同时运行的 Worker 数量，
 * 因此不要将其视为用户系统中核心数量的绝对测量值。
 *
 */
export function getHardwareConcurrencyNumber(): number {
  if ('hardwareConcurrency' in navigator) {
    const number = window.navigator.hardwareConcurrency;
    return number;
  } else {
    return 0;
  }
}

/**
 * 获取语言
 * @description
 * - Navigator 接口的只读属性 language 返回一个字符串，表示用户的首选语言，通常是浏览器 UI 的语言。
 * - Navigator 接口的只读属性 languages 返回一个字符串数组，表示用户的首选语言。在返回的数组中，它们按优先级排序，首选语言排在第一位。
 * navigator.language 的值是返回数组中的第一个元素。
 * - 用户浏览器发出的每个 HTTP 请求中的 Accept-Language HTTP 标头使用与 navigator.languages 属性相同的值，
 * 但额外包含 qvalues（权重值）字段（例如 en-US;q=0.8）。
 *
 * 使用场景：根据用户首选语言的区域设置格式化内容，提供适合用户阅读的页面内容。
 *
 * @returns {string} 一个表示语言版本的字符串，定义于 RFC 5646: 语言识别标签（也称为 BCP 47）中。
 * 有效的语言代码示例包括“en”、“en-US”、“fr”、“fr-FR”、“es-ES”等。
 *
 *
 * 注意📢:
 * 在 iOS 10.2 之前的 Safari 浏览器中，返回的国家代码是小写的
 */
// 注意📢: 这里是为了了解泛型 | 条件类型而定义的
type LanguageQueryType = 'preferred' | 'all';

// 明确区分单值和列表类型
type LanguageResult<T extends LanguageQueryType> =
  T extends 'preferred' ? string : ReadonlyArray<string>;

export function getLanguage<T extends LanguageQueryType>(
  type: T
): LanguageResult<T> {
  return (
    type === 'preferred'
      ? window.navigator.language
      : window.navigator.languages
  ) as LanguageResult<T>;
}

/**
 *  🔺 获取锁定管理器
 * @description
 * Navigator 接口的只读属性 locks 返回一个 LockManager 对象，该对象用于管理锁定，提供了请求新的 Lock 对象和查询现有的 Lock 对象的方法。。
 * 锁定是一个机制，用于阻止其他进程或线程访问共享资源，直到锁定被释放。
 *
 * 使用场景：
 * - 锁定管理器用于管理资源访问，例如文件、数据库等。
 * - 它可以防止多个进程或线程同时访问相同的资源，从而避免数据冲突和错误。
 *
 * @returns {LockManager} LockManager 对象，用于管理锁定。
 *
 */
export function getLockManager(): LockManager {
  return window.navigator.locks;
}

/**
 * 获取最大触控点数
 * @description
 * Navigator 接口的只读属性 maxTouchPoints 返回一个数字，表示用户设备的最大触控点数。
 * 这表示当前设备支持的最大同时按下的触控点数。
 *
 * 使用场景：
 * - 根据最大触控点数，可以创建一个适合用户设备的触控点数。
 * - 例如，如果用户设备的最大触控点数是 2，则可以创建两个触控点数，以便在用户设备上进行双
 */
export function getMaxTouchPoints(): number {
  return window.navigator.maxTouchPoints;
}

/**
 * 获取媒体约束
 * @description
 * - Navigator 接口的只读属性 mediaCapabilities 返回一个 MediaCapabilities 对象，该对象用于检查媒体源是否支持特定的编码格式和配置。
 * - 该对象可以暴露有关给定格式的解码和编码能力以及由媒体能力 API 定义的输出能力的信息。
 *
 * 使用场景：
 * - 根据媒体约束，可以创建一个适合用户设备的媒体源。
 * - 例如，如果媒体约束不支持特定的编码格式和配置，则可以创建一个适合用户设备的媒体源。
 *
 * @returns {MediaCapabilities} MediaCapabilities 对象，用于检查媒体源是否支持特定的
 */
export function getMediaConstraints(): MediaCapabilities {
  const mediaCapabilities = window.navigator.mediaCapabilities;
  // mediaCapabilities
  //   .decodingInfo({
  //     type: 'file',
  //     audio: {
  //       contentType: 'audio/mp3',
  //       channels: '2',
  //       bitrate: 132700,
  //       samplerate: 5200
  //     }
  //   })
  //   .then(result => {
  //     console.log(`${result.supported ? '' : '不'}支持此配置，`);
  //     console.log(`${result.smooth ? '' : '不'}流畅，`);
  //     console.log(`${result.powerEfficient ? '' : '不'}节能。`);
  //   });

  return mediaCapabilities;
}

/**
 * 🔺 获取媒体设备
 * @description
 * Navigator 接口的只读属性 mediaDevices 返回一个 MediaDevices 对象，该对象可提供对相机和麦克风等媒体输入设备以及屏幕共享的连接访问，如麦克风、摄像头等。
 *
 * 使用场景：
 * - 根据媒体设备，可以创建一个适合用户设备的媒体源。
 * - 例如，如果媒体设备不支持特定的编码格式和配置，则可以创建一个适合用户设备的媒体源。
 *
 * @returns {MediaDevices} MediaDevices 单例对象，用于访问媒体设备。 通常，只需直接使用此对象的成员，如：navigator.mediaDevices.getUserMedia()
 *
 */
export function getMediaDevices(): MediaDevices {
  return window.navigator.mediaDevices;
}

/**
 * 获取媒体会话 - 媒体会话是一个机制，用于管理媒体播放，例如播放状态、播放进度等。
 * @description
 * Navigator 接口的只读属性 mediaSession 返回一个 MediaSession 对象，该对象用于管理媒体会话，可用于与浏览器共享关于文档正在处理的媒体的当前播放状态的元数据和其他信息。
 * 提供了与媒体会话相关的属性和方法，如当前播放的媒体信息、播放状态等。
 *
 * 当前文档可以使用 MediaSession 对象来共享有关正在播放的媒体及其当前播放状态的信息。
 * 此信息可以包括典型元数据，例如正在播放的歌曲的标题、艺术家和专辑名称，以及可能包含专辑封面、艺术家照片等内容的一张或多张图片。
 *
 * 使用场景：
 * - 根据媒体会话，可以创建一个适合用户设备的媒体源。
 * - 例如，如果媒体会话不支持特定的编码格式和配置，则可以创建一个适合用户设备的媒体源。
 */
export function getMediaSession(): MediaSession {
  // if ('mediaSession' in navigator) {
  //   navigator.mediaSession.metadata = new MediaMetadata({
  //     title: '播客剧集标题',
  //     artist: '播客主持人',
  //     album: '播客名称',
  //     artwork: [{ src: '播客.jpg' }]
  //   });
  // }
  return window.navigator.mediaSession;
}

/* ***** ***** ***** ***** Navigator 实例方法 API ***** ***** ***** ***** */

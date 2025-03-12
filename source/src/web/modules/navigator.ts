/**
 * @file Navigator - Web API 相关
 * @description
 * - `Navigator` 接口代表了用户代理的状态和身份，它允许脚本对其进行查询并注册自身以便执行某些活动。
 * - 只读属性 `Window.navigator` 会返回一个 `Navigator` 对象的引用，可以用于请求运行当前代码的应用程序的相关信息。
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
      {
        id: module.id,
        sign: 'GetClipboardText'
      },
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
 *    - `navigator.connection.downlink` - 下载速度（单位: Mbps）
 *    - `navigator.connection.rtt` - 往返时间（单位: ms）
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
 * 使用场景: 根据可以运行最大线程数，创建了一个可用于稍后处理请求的 Worker 池。
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
 * 使用场景: 根据用户首选语言的区域设置格式化内容，提供适合用户阅读的页面内容。
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
 * 使用场景:
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
 * 使用场景:
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
 * 使用场景:
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
 * 使用场景:
 * - 根据媒体设备，可以创建一个适合用户设备的媒体源。
 * - 例如，如果媒体设备不支持特定的编码格式和配置，则可以创建一个适合用户设备的媒体源。
 *
 * @returns {MediaDevices} MediaDevices 单例对象，用于访问媒体设备。 通常，只需直接使用此对象的成员，如: navigator.mediaDevices.getUserMedia()
 *
 */
export function getMediaDevices(): MediaDevices {
  return window.navigator.mediaDevices;
}

/**
 * 获取媒体会话 - 媒体会话是一个机制，用于管理媒体播放，例如播放状态、播放进度等。
 * @description
 * Navigator 接口的只读属性 mediaSession 返回一个 MediaSession 对象，该对象用于管理媒体会话，
 * 可用于与浏览器共享关于文档正在处理的媒体的当前播放状态的元数据和其他信息。
 * 提供了与媒体会话相关的属性和方法，如当前播放的媒体信息、播放状态等。
 *
 * 这些信息可以进一步与设备和/或操作系统共享，以便使用设备的标准媒体控制用户体验来描述和控制媒体的播放。
 * 此外，MediaSession 接口还提供了 `setActionHandler()` 方法，该方法允许在用户使用设备控制（例如屏幕上或物理上的播放、暂停、跳转和其他类似控制）时接收事件。
 * 例如，网络电台应用程序可以使用 setActionHandler() 来让用户设备上的键盘或其他位置的媒体控制用于控制应用程序的媒体播放。
 *
 * 当前文档可以使用 MediaSession 对象来共享有关正在播放的媒体及其当前播放状态的信息。
 * 此信息可以包括典型元数据，例如正在播放的歌曲的标题、艺术家和专辑名称，以及可能包含专辑封面、艺术家照片等内容的一张或多张图片。
 *
 * 使用场景:
 * - 根据媒体会话，可以创建一个适合用户设备的媒体源。
 * - 例如，如果媒体会话不支持特定的编码格式和配置，则可以创建一个适合用户设备的媒体源。
 *
 * @returns {MediaSession} MediaSession 对象，用于管理媒体会话。
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

/**
 * 获取网络状态
 * @description
 * 在渲染进程中，在线/离线事件 的探测，是通过标准 HTML5 API 中 `navigator.onLine` 属性来实现的。
 * - Navigator 接口的只读属性 onLine 返回一个布尔值，表示当前网络是否可用。
 * - 当浏览器连接网络状态发生变化时，该属性会发送更新。
 * 更新发生在用户点击链接或脚本请求远程页面时。
 * 例如，当用户在失去互联网连接后立即点击链接时，该属性会返回 false。
 * - 可以通过监听 online 和 offline 事件来观察网络状态的变化。
 *
 *
 * @returns {boolean} 网络状态
 *
 * 注意📢:
 * - 由于许多情况都会返回 true，应该小心对待误报的情况。
 * - 不同浏览器对该属性的实现方式有所不同。
 * - 在 Chrome 和 Safari 中，如果浏览器无法连接到本地局域网（LAN）或路由器，则该浏览器处于离线状态
 * 而所有其他情况下，该属性都会返回 true。
 * - 在 Firefox 中，将浏览器切换到离线模式会发送一个 false 值。
 * 在 Firefox 41 之前，所有其他条件都返回一个 true 值；
 * 在 Windows 上对 Nightly 68 进行实际行为测试表明，它只会像 Chrome 和 Safari 一样查找 LAN 连接，从而产生假阳性的结果。
 * - 因此，虽然可以根据浏览器返回 false 值来判断其处于离线状态，但却不能断定 true 值就一定意味着浏览器可以访问互联网。
 * 例如，在运行虚拟化软件的计算机上，由于虚拟以太网适配器始终处于“已连接”状态，可能会得到假阳性的结果。
 * - 因此，如果需要准确判断浏览器的联网状态，建议开发额外的检测手段。
 */
export function getOnline(): boolean {
  /* 监听网络状态改变 */
  // window.addEventListener('offline', e => {
  //   console.log('离线');
  // });

  // window.addEventListener('online', e => {
  //   console.log('在线');
  // });
  return window.navigator.onLine;
}

/**
 * 获取浏览器标识
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/User-Agent User-Agent HTTP 标头格式}
 * @description
 * Navigator 接口的只读属性 userAgent 返回一个字符串，该字符串包含有关当前浏览器的信息，是当前浏览器的用户代理字符串。。
 * 该字符串包含浏览器的名称、版本号、操作系统、插件和浏览器引擎的信息。
 *
 * @returns {string} 浏览器标识 - 用于指定浏览器在 HTTP 标头以及当前属性和 Navigator 对象的其他相关方法的响应中提供的完整用户代理字符串。
 *
 * @remarks
 * - 规范要求浏览器尽可能减少通过此字段提供的信息
 * - 基于用户代理字符串来识别浏览器是不可靠的且不推荐，因为用户代理字符串是可以由用户配置的。
 */
export function getUserAgent(): string {
  return window.navigator.userAgent;
}

/**
 * 获取 PDF 查看器是否启用
 * @description
 * Navigator 接口的只读属性 pdfViewerEnabled 返回一个布尔值，用于指示浏览器是否支持在导航到 PDF 文件时以内联方式显示它们。
 *
 * @returns {boolean} 是否支持内联查看 PDF 文件
 *
 * 注意📢:
 * - 如果浏览器不支持内联显示，则 PDF 文件将被下载，并可能由外部应用程序处理。
 * - 此方法取代了多种传统的判断浏览器是否支持内联显示 PDF 文件的方法。
 */
export function getPdfViewerEnabled(): boolean {
  return window.navigator.pdfViewerEnabled;
}

/**
 * 获取权限
 * @description
 * Navigator 接口的只读属性 permissions 返回一个 Permissions 对象，可以用于查询或更新 Permissions API 涵盖的 API 权限状态。
 *
 * @returns {Permissions} Permissions 对象，用于管理权限。
 */
export function permission() {
  // window.navigator.permissions
  //   .query({
  //     name: 'geolocation'
  //   })
  //   .then(result => {
  //     if (result.state === 'granted') {
  //       // showMap();
  //     } else if (result.state === 'prompt') {
  //       // showButtonToEnableMap();
  //     }
  //     // 如果权限被拒绝，不要做任何操作。
  //   });
  return window.navigator.permissions;
}

/**
 *  🔺 获取 presentation
 * @description
 * Navigator 接口的只读属性 presentation 返回一个 Presentation 对象，用于管理 presentation API。
 *
 * @returns {Presentation} Presentation 对象，用于管理 presentation API。
 */
export function getPresentation() {
  // window.navigator.presentation
  //   .request()
  //   .then(connection => {
  //     // 获取连接信息
  //     connection.onconnect = () => {
  //       console.log('连接成功');
  //     };
  //     connection.ondisconnect = () => {
  //       console.log('连接断开');
  //     };
  //  })
  return window.navigator.presentation;
}

/**
 *  🔺 获取 Service Worker
 * @description
 * Navigator 接口的只读属性 serviceWorker 返回关联文档的 ServiceWorkerContainer 对象，
 * 用于提供 ServiceWorker 的注册、移除、升级和通信的访问。
 *
 * @returns {ServiceWorkerContainer} ServiceWorkerContainer 对象，用于管理 Service Worker API。
 *
 * 注意📢:
 * - 该特性可能无法在无痕模式下使用。
 * - worker 同样可以通过 WorkerNavigator.serviceWorker 访问文档的 ServiceWorkerContainer
 */
export function getSeviceWorker(): ServiceWorkerContainer | null {
  if ('serviceWorker' in navigator) {
    // 支持！
    return window.navigator.serviceWorker;
  } else {
    return null;
  }
}

/**
 *  🔺 获取 Storage
 * @description
 * Navigator 接口的只读属性 storage 返回一个单例的 StorageManager 对象，用于访问当前站点或应用程序的浏览器整体存储能力。
 * 返回的对象允许检查和配置数据存储的持久性，并了解浏览器可用于本地存储的剩余空间大小。
 *
 * @returns {StorageManager} StorageManager 对象，可用于维护存储数据的持久性，并估算存储数据的空间大小。
 */
export function getStorage(): StorageManager {
  return window.navigator.storage;
}

/**
 *  🔺 获取 USB
 * @description
 * Navigator 接口的只读属性 usb 返回一个 USB 对象，返回当前文档的 USB 对象，用于访问 WebUSB API 的功能。
 *
 * @returns {USB} USB 对象
 */
export function getUsb() {
  return window.navigator.usb;
}

/**
 *  🔺 获取 Wake Lock
 * @description
 * Navigator 接口的只读属性 wakeLock 返回一个允许文档获取屏幕唤醒锁的 WakeLock 接口。
 * 当屏幕唤醒锁处于激活状态时，用户代理将尝试阻止设备调暗屏幕、完全关闭屏幕或显示屏幕保护程序。
 *
 * @returns {WakeLock} WakeLock 对象，用于管理 Wake Lock API。
 */
export function getWakeLock(): WakeLock {
  return window.navigator.wakeLock;
}

/**
 *  🔺 获取 Webdriver
 * @description
 * Navigator 接口的只读属性 webdriver 表示用户代理是否由自动化控制。
 * 它定义了一种标准的方法，使得被控用户代理可以通知文档当前用户代理是由 WebDriver 控制的。
 * 例如，在自动化过程中触发替代代码路径。
 *
 * @remarks
 * `navigator.webdriver` 属性在以下情况下为 `true`:
 * - `Chrome`:
 *    使用了 `--remote-debugging-port` 或 `--headless` 标志或 `--enable-automation`。
 * - `Firefox`:
 *    使用了 `marionette.enabled` 首选项或 `--marionette` 标志。
 *
 * @returns {boolean} 是否支持 WebDriver API
 */
export function getWebdriver(): boolean {
  return window.navigator.webdriver;
}

/**
 *  🔺 获取 Window Controls Overlay
 * @description
 * - Navigator 接口的只读属性 windowControlsOverlay 返回一个 WindowControlsOverlay 对象，
 * 用于管理窗口控件叠加层（WCO）的 API。
 * - 该接口提供有关使用了窗口控件叠加层 API 的桌面渐进式 Web 应用程序的标题栏几何图形的信息。
 * - 安装在桌面操作系统上的渐进式 Web 应用程序可以通过在 Web 应用程序清单成员 `display_override` 中
 * 使用 `window-controls-overlay` 值来选择加入窗口控件叠加层特性。
 *  这样做会隐藏默认的窗口标题栏，并使应用程序可以访问应用程序窗口的整个区域。
 *
 * @remarks
 * WCO 是一种新的窗口装饰方案，它允许窗口装饰（如窗口边框、标题栏和窗口按钮）
 * 与窗口内容一起显示，而不是单独显示在屏幕上。
 *
 */
export function getWindowControlsOverlay() {
  if ('windowControlsOverlay' in navigator) {
    // const rect =
    // navigator.windowControlsOverlay.getTitlebarAreaRect();
    // 对标题栏矩形区域做一些处理。
  } else {
    // 窗口控件叠加层特性不可用。
  }
}
/* ***** ***** ***** ***** Navigator 实例方法 API ***** ***** ***** ***** */

/* ***** ***** ***** ***** Navigator - Web Share 相关 API ***** ***** ***** ***** */

/**
 *  🔺 开始共享
 * @description
 * - `canShare()`:
 *    - Navigator 接口的 `canShare()` 方法在对 `navigator.share()` 的等效调用能够成功时返回 `true`。
 *    - 如果数据无法通过验证，该方法将返回 false。
 *    数据可能无效的原因包括:
 *       - data 参数已被省略或仅包含具有未知值的属性。请注意，用户代理无法识别的任何属性都会被忽略
 *       - URL 格式错误
 *       - 指定了要分享的文件但用户代理实现不支持文件共享
 *       - 共享了将被用户代理视为“恶意共享”的指定数据
 *    - Web 共享 API 受 web-share 权限策略限制。如果支持该权限但尚未授予，则 canShare() 方法将返回 false
 *    - 参数: `data` - (可选)定义要测试的共享数据的对象。
 *      通常，如果此调用返回 true，则具有相同属性的对象将传递给 navigator.share()。
 *      用户代理未知的属性将被忽略；
 *      共享数据仅根据用户代理理解的属性进行评估。
 *      所有属性都是可选的，但必须至少指定一个已知的数据属性，否则该方法将返回 false。
 *      可能的值为:
 *       - url - (可选)表示要共享的 URL 的字符串。
 *       - text - (可选)表示要共享的文本的字符串。
 *       - title - (可选)表示要共享的标题的字符串。
 *       - files - (可选)表示要共享的文件的 File 对象数组。
 *    - 返回值: 如果指定的 data 参数可以等效成功调用 `Navigator.share()` 方法，则返回 true，否则返回 false。
 *
 * 注意📢:
 * 此方法功能测试特定数据属性是否有效且可共享。如果与单个 data 属性一起使用，则仅当该属性有效并且可以在平台上共享时才会返回 true。
 */
export function webShare() {
  // 可能不支持的功能
  // const testShare = { someNewProperty: '要共享的数据' };

  // 使用新数据属性的复杂数据
  // const shareData = {
  //   title: 'MDN',
  //   text: '在 MDN 上学习 Web 开发！',
  //   url: 'https://developer.mozilla.org',
  //   someNewProperty: '数据共享'
  // };

  // 常用字段
  // {
  //   title: '分享标题',
  //   text: '分享文本',
  //   url: 'https://www.baidu.com'
  // }

  // 共享之前测试新数据属性是否有效且受支持
  if (navigator.canShare()) {
    // 使用 navigator.share() 共享“shareData”
  } else {
    // 处理新数据属性无法共享的情况。
  }
}

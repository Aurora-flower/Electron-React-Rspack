/**
 * @file HTTP 状态码
 * @see {@link https://www.w3ccoo.com/tags/ref_httpmessages.html HTTP 消息参考手册}
 */
export const StatusCode = {
  /* ***** ***** ***** *****  1xx: 信息  ***** ***** ***** ***** */
  /* 
  服务器收到请求，需要请求者继续执行操作 
  - 服务器仅接收到部分请求，但是一旦服务器并没有拒绝该请求，客户端应该继续发送其余的请求 
  */
  Continue: 100,

  /* (服务器转换协议)服务器根据客户端的请求切换协议 */
  SwitchingProtocols: 101,

  /* 服务器已经接受请求，但是尚未完成 */
  Processing: 102,

  /* (EarlyHints)服务器提前返回响应头 - 用于 PUT 或者 POST 请求恢复失败时的恢复请求建议 */
  Checkpoint: 103,

  /* ***** ***** ***** *****  2xx: 成功 ***** ***** ***** ***** */
  /* 请求成功 */
  Ok: 200,

  /* 请求被创建完成，同时新的资源被创建。 */
  Created: 201,

  /* 供处理的请求已被接受，但是处理未完成 */
  Accepted: 202,

  /* 
  请求被执行，但返回的响应中只包含部分响应数据 
  - 文档已经正常地返回，但一些应答头可能不正确，因为使用的是文档的拷贝 
  */
  NonAuthoritativeInformation: 203,

  /* 
  请求被执行，但返回的响应中包含的资源数据是当前服务器的缓存数据 
  - 没有新文档。浏览器应该继续显示原来的文档。如果用户定期地刷新页面，而 Servlet 可以确定用户文档足够新，这个状态代码是很有用的
  */
  NoContent: 204,

  /* 
  请求被执行，但返回的响应中不包含任何内容
  - 没有新文档。但浏览器应该重置它所显示的内容。用来强制浏览器清除表单输入内容。
  */
  ResetContent: 205,

  /* 客户发送了一个带有 Range 头的 GET 请求，服务器完成了它 */
  PartialContent: 206,

  /* ***** ***** ***** *****  3xx: 重定向 ***** ***** ***** ***** */
  /* 多重选择。链接列表。用户可以选择某链接到达目的地。最多允许五个地址 */
  MultipleChoices: 300,

  /* 所请求的页面已经转移至新的 URL */
  MovedPermanently: 301,

  /* 所请求的页面已经临时转移至新的 URL */
  Found: 302,

  /* 所请求的页面可在别的 URL 下被找到 */
  SeeOther: 303,

  /* 
  未按预期修改文档。
  客户端有缓冲的文档并发出了一个条件性的请求（一般是提供 If-Modified-Since 头表示客户只想比指定日期更新的文档）。
  服务器告诉客户，原来缓冲的文档还可以继续使用 
  */
  NotModified: 304,

  /* 客户请求的文档应该通过 Location 头所指明的代理服务器提取 */
  UseProxy: 305,

  /* 此代码被用于前一版本。目前已不再使用，但是代码依然被保留 */
  Unused: 306,

  /* 被请求的页面已经临时移至新的 URL */
  TemporaryRedirect: 307,

  /* 用于 PUT 或者 POST 请求恢复失败时的恢复请求建议 */
  PermanentRedirect: 308,

  /* ***** ***** ***** *****  4xx: 客户端错误 ***** ***** ***** ***** */
  /* 服务器未能理解请求 */
  BadRequest: 400,

  /* 被请求的页面需要用户名和密码 */
  Unauthorized: 401,

  /* 此代码尚无法使用 */
  PaymentRequired: 402,

  /* 对被请求页面的访问被禁止 */
  Forbidden: 403,

  /* 服务器无法找到被请求的页面 */
  NotFound: 404,

  /* 请求中指定的方法不被允许 */
  MethodNotAllowed: 405,

  /* 服务器生成的响应无法被客户端所接受 */
  NotAcceptable: 406,

  /* 用户必须首先使用代理服务器进行验证，这样请求才会被处理 */
  ProxyAuthenticationRequired: 407,

  /* 请求超出了服务器的等待时间 */
  RequestTimeout: 408,

  /* 由于冲突，请求无法被完成 */
  Conflict: 409,

  /* 被请求的页面不可用 */
  Gone: 410,

  /* "Content-Length" 未被定义。如果无此内容，服务器不会接受请求 */
  LengthRequired: 411,

  /* 请求中的前提条件被服务器评估为失败 */
  PreconditionFailed: 412,

  /* 由于所请求的实体的太大，服务器不会接受请求 */
  PayloadTooLarge: 413,

  /* 由于 URL 太长，服务器不会接受请求。当 POST 请求被转换为带有很长的查询信息的 GET 请求时，就会发生这种情况 */
  URITooLong: 414,

  /* 由于媒介类型不被支持，服务器不会接受请求 */
  UnsupportedMediaType: 415,

  /* 服务器不能满足客户在请求中指定的 Range 头 */
  RangeNotSatisfiable: 416,

  /* 服务器不能满足客户在请求中指定的请求头 */
  ExpectationFailed: 417,

  /* 418 I'm a teapot - 用于幽默或测试目的 */
  ImATeapot: 418,

  /* 服务器无法在请求的范围内完成请求 */
  MisdirectedRequest: 421,

  /* 服务器拒绝处理请求，因为请求的负载超过了服务器的限制 */
  UnprocessableEntity: 422,

  /* 服务器无法处理请求，因为请求的负载格式不正确 */
  Locked: 423,

  /* 服务器无法处理请求，因为请求的资源被锁定 */
  FailedDependency: 424,

  /* 服务器拒绝处理请求，因为请求的负载格式不正确 */
  UpgradeRequired: 426,

  /* 服务器拒绝处理请求，因为请求的负载格式不正确 */
  PreconditionRequired: 428,

  /* 服务器拒绝处理请求，因为请求的负载格式不正确 */
  TooManyRequests: 429,

  /* 服务器拒绝处理请求，因为请求的负载格式不正确 */
  RequestHeaderFieldsTooLarge: 431,

  /* 451 Unavailable For Legal Reasons - 由于法律原因，请求的资源不可用 */
  UnavailableForLegalReasons: 451,

  /* 
  499 nginx HTTP/1.1 - 499 是一个非标准的 HTTP 状态码，
  它表示服务器成功处理了请求，但在返回响应之前，客户端主动关闭了连接 
  */
  ClientClosedRequest: 499,

  /* ***** ***** ***** *****  5xx: 服务器错误 ***** ***** ***** ***** */
  /* 请求未完成。服务器遇到不可预知的情况 */
  InternalServerError: 500,

  /* 请求未完成。服务器不支持所请求的功能 */
  NotImplemented: 501,

  /* 请求未完成。服务器从上游服务器收到一个无效的响应 */
  BadGateway: 502,

  /* 请求未完成。服务器临时过载或当机 */
  ServiceUnavailable: 503,

  /* 网关超时 */
  GatewayTimeout: 504,

  /* 服务器不支持请求中指明的 HTTP 协议版本 */
  HTTPVersionNotSupported: 505,

  /* 服务器遇到一个内部配置错误 */
  VariantAlsoNegotiates: 506,

  /* 服务器作为网关或代理工作时，为了完成请求，需要从上游服务器获取资源，但该服务器无法被找到 */
  InsufficientStorage: 507,

  /* 服务器无法完成请求，因为请求的负载格式不正确 */
  LoopDetected: 508,

  /* 服务器拒绝处理请求，因为请求的负载格式不正确 */
  NotExtended: 510,

  /* 用户需要提供身份验证来获取网络访问入口 */
  NetworkAuthenticationRequired: 511
};

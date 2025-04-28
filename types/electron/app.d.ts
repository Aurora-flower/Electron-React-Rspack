type AppPathTypes =
  /* 用户主目录 */
  | "home"
  /* 应用程序数据目录 */
  | "appData"
  /* 用户数据目录 */
  | "userData"
  /* 会话数据目录 */
  | "sessionData"
  /* 临时文件目录 */
  | "temp"
  /* 可执行文件目录 */
  | "exe"
  /* 模块目录 */
  | "module"
  /* 桌面目录 */
  | "desktop"
  /* 文档目录 */
  | "documents"
  /* 下载目录 */
  | "downloads"
  /* 音乐目录 */
  | "music"
  /* 图片目录 */
  | "pictures"
  /* 视频目录 */
  | "videos"
  /* 日志文件目录 */
  | "logs"
  /* 最近访问文件目录- 仅限于 windows */
  | "recent"
  /* 系统崩溃转储文件目录 */
  | "crashDumps"

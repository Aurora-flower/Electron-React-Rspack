// import net from "node:net"
const net = require("node:net")

const EXPECT_CODE = [
  /* 表示找不到主机 */
  "ENOTFOUND",
  /* 表示连接被拒绝 */
  "ECONNREFUSED"

  /* 表示地址被占用 */
  // 'EADDRINUSE',
  /* 表示连接被重置 */
  // 'ECONNRESET'
]

export function checkConnection(host: string, port: number): Promise<boolean> {
  return new Promise(resolve => {
    const socket = net.connect({ port, host }, () => {
      socket.destroy()
      resolve(true)
    })
    socket.on("error", (error: any) => {
      resolve(!EXPECT_CODE.includes(error.code))
    })
  })
}

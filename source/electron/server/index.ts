import * as http from "node:http"
import * as https from "node:https"
import { join } from "node:path"
import { getAppStaticPath } from "@main/features/app"
import { checkConnection } from "@main/node/net/connection"
import { sendLog } from "@main/toolkit/logger"
import type { Application } from "express"
import * as express from "express"

interface AppServerOptions {
  path: string
  port: number
  hostname: string
  isSafe?: boolean
  PRIVATE_KEY?: string
  CERTIFICATE?: string
}

export function applicationHooks(app: Application): void {
  app.get("/", (req, res) => {
    res.send("Hello World")
  })
}

export class AppServer {
  private _options: AppServerOptions | undefined
  private _instance!: AppServer
  private _application!: Application
  private _server!: http.Server | https.Server

  constructor(options?: AppServerOptions) {
    this.option = options
    if (options?.path) {
      this._application = express()
      // this._application.use((req, res, next) => {
      //   res.header("Access-Control-Allow-Origin", "*")
      //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
      //   res.header(
      //     "Access-Control-Allow-Headers",
      //     "Content-Type, Authorization"
      //   )
      //   next()
      // })
      const middleware = express.static(options.path)
      this._application.use(middleware)
      const page = join(options.path, "index.html")
      this._application.get("/", (req, res) => {
        res.sendFile(page)
      })
      // this._application.get("*", (/* req, res, next */) => {
      //   res.sendFile(page)
      // })
    }
  }

  private createHttpServer(): void {
    this._server = http.createServer(this._application)
    this._server.listen(this._options!.port, () => {
      sendLog(
        {
          level: "info",
          sign: "createHttpServer",
          module: module?.id
        },
        `App Server: http://${this._options?.hostname}:${this._options?.port}`
      )
    })
    // this._server.on("error", () => {})
  }

  private createHttpsServer(): void {
    const credentials = {
      key: this._options!.PRIVATE_KEY,
      cert: this._options!.CERTIFICATE
    }
    this._server = https.createServer(credentials, () => {
      sendLog(
        {
          level: "info",
          sign: "createHttpsServer",
          module: module?.id
        },
        `App Server: https://${this._options?.hostname}:${this._options?.port}`
      )
    })
  }

  start(): void {
    if (!this._application) return
    if (this._options?.PRIVATE_KEY && this._options?.CERTIFICATE) {
      this.createHttpsServer()
    } else {
      this.createHttpServer()
    }
  }

  stop(): void {
    if (!this._server) return
    this._server.close((): void => {
      sendLog(
        {
          level: "info",
          sign: "stopServer",
          module: module?.id
        },
        "Server Stopped"
      )
    })
  }

  get option(): AppServerOptions | undefined {
    return this._options
  }

  set option(options: AppServerOptions | undefined) {
    this._options = options
  }

  getInstance(): AppServer {
    if (!this._instance) {
      this._instance = new AppServer()
    }
    return this._instance
  }
}

export async function createAppServer(): Promise<void> {
  const staticPath = getAppStaticPath()
  const options = {
    path: staticPath,
    port: Number(process.env.DEV_SERVER_PORT ?? "3000"),
    hostname: process.env.DEV_SERVER_HOSTNAME ?? "127.0.0.1",
    isSafe: process.env.DEV_SAFE_MODE === "true"
    // PRIVATE_KEY: readFileSync("private/key.pem"),
    // CERTIFICATE: readFileSync("private/cert.pem")
  }
  const isConnected = await checkConnection(options.hostname, options.port)
  options.port = isConnected ? options.port + 1 : options.port // TODO: 端口冲突处理
  process.env.DEV_SERVER_URL = `${options.isSafe ? "https" : "http"}://${options.hostname}:${options.port}`
  sendLog(
    {
      level: "info",
      sign: "createAppServer",
      module: module?.id
    },
    `App Server: ${process.env.DEV_SERVER_URL}`,
    options
  )
  const appServer = new AppServer(options)
  appServer.start()
}

import * as http from "node:http"
import * as https from "node:https"
// import certificate from "@main/private/certificate.pem"
// import privateKey from "@main/private/private-key.pem"
import { errorMessage } from "@main/utils/error"
import Logger from "electron-log"
import express = require("express")
import { join } from "node:path"

interface AppServerOptions {
  path: string
  port: number
  hostname: string
  isSafe?: boolean
  privateKey?: string
  certificate?: string
}

export class AppServer {
  private _options: AppServerOptions | undefined
  private _instance!: AppServer
  private _application!: express.Application
  private _server!: http.Server | https.Server

  constructor(options?: AppServerOptions) {
    this.option = options
    if (options?.path) {
      this._application = express()
      const middleware = express.static(options.path)
      this._application.use(middleware)
      this._application.get("/", (req, res) => {
        res.sendFile(join(options.path, "index.html"))
        // res.send("Hello World")
      })
      Logger.log("PATH", join(options.path, "index.html"))
    }
  }

  private createHttpServer() {
    if (!this._application || !this._options) return
    this._server = http.createServer(this._application)
    this._server.listen(this._options.port, () => {
      Logger.log(`HTTP server listening on port ${this._options?.port}`)
    })
    this._server.on("error", err => {
      Logger.log("Server error", errorMessage(err))
    })
    Logger.log("createHttpServer", this._options.path)
  }

  private createHttpsServer() {
    if (!this._application || !this._options) {
      return
    }
    const credentials = {
      key: this._options.privateKey,
      cert: this._options.certificate
    }
    this._server = https.createServer(credentials, () => {
      Logger.log(`HTTPS server listening on port ${this._options?.port}`)
    })
  }

  start() {
    if (!this._application) return
    if (this._options?.privateKey && this._options?.certificate) {
      // this.createHttpsServer()
      this.createHttpServer()
    } else {
      this.createHttpServer()
    }
  }

  stop() {
    if (!this._server) return
    this._server.close(() => {})
  }

  get option() {
    return this._options
  }

  set option(options: AppServerOptions | undefined) {
    this._options = options
  }

  getInstance() {
    if (!this._instance) {
      this._instance = new AppServer()
    }
    return this._instance
  }
}

export function createAppServer() {
  const options = {
    path: "F:\\Project\\Electron-React-Rspack\\app\\public",
    port: 59098,
    hostname: "127.0.0.1",
    isSafe: true
    // privateKey,
    // certificate
  }
  const appServer = new AppServer(options)
  appServer.start()
}

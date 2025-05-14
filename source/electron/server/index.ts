import * as http from "node:http"
import * as https from "node:https"
import { join } from "node:path"
import { AppInfo } from "@main/helpers/modules/app"
import Logger from "electron-log"
import type { Application } from "express"
const express = require("express") // TODO(低优先级): 解决express模块引入问题，替换为import语法
// import express from "express"

interface AppServerOptions {
  path: string
  port: number
  hostname: string
  isSafe?: boolean

  [key: string]: any
}

export function applicationHooks(app: Application) {
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
      const middleware = express.static(options.path)
      this._application.use(middleware)
      this._application.get("/", (req, res) => {
        res.sendFile(join(options.path, "index.html"))
      })
    }
  }

  private createHttpServer() {
    this._server = http.createServer(this._application)
    this._server.listen(this._options!.port, () => {
      Logger.log(`HTTP server listening on port ${this._options?.port}`)
    })
  }

  // TODO(低优先级): 添加 HTTPS 支持
  private createHttpsServer() {
    const credentials = {
      key: this._options!.PRIVATE_KEY,
      cert: this._options!.CERTIFICATE
    }
    this._server = https.createServer(credentials, () => {
      Logger.log(`HTTPS server listening on port ${this._options?.port}`)
    })
  }

  start() {
    if (!this._application) return
    if (this._options?.PRIVATE_KEY && this._options?.CERTIFICATE) {
      this.createHttpsServer()
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
    path: join(AppInfo.getInstance().appFolder, "app", "public"),
    port: Number(process.env.DEV_SERVER_PORT ?? ""),
    hostname: process.env.DEV_SERVER_HOSTNAME ?? "127.0.0.1",
    isSafe: process.env.DEV_SAFE_MODE === "true"
    // PRIVATE_KEY: readFileSync("private/key.pem"),
    // CERTIFICATE: readFileSync("private/cert.pem")
  }
  process.env.DEV_SERVER_URL = `${options.isSafe ? "https" : "http"}://${options.hostname}:${options.port}`
  const appServer = new AppServer(options)
  appServer.start()
}
